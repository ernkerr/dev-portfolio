import { del, list, put, rename } from "@vercel/blob";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import {
  mkdir,
  readdir,
  readFile,
  rename as move,
  unlink,
  writeFile,
} from "node:fs/promises";
import path from "node:path";

// The photos visitors leave on the About page's camera (src/app/about/
// Camera.tsx). A photo left waits until I approve it: only whoever left
// it sees it, then everyone does. My own photos aren't here: they're files
// in public/images/about/camera, which nobody can delete.
//
//   GET     the shown photos, plus the asker's own waiting ones, oldest
//           first; with ?review, every waiting one too, for me
//   POST    leaves one, a JPEG in the body; it waits
//   DELETE  ?id= takes one away, for whoever left it, or me with ?review
//   PATCH   ?id= approves a waiting one (?review only), so it's shown
//
// Each photo's name says when it was left and, hashed, who left it:
// "<ms>-<owner>-<random>.jpg". Whoever leaves a photo sends a secret token
// their browser keeps (x-camera-owner), and only that token's hash can see
// it waiting or delete it, so no database is needed. Reviewing takes the
// key in CAMERA_REVIEW_KEY (x-camera-review); locally it needs none. The
// review page is /about/review.
//
// Photos go to Vercel Blob once a Blob store is connected to the project
// (BLOB_READ_WRITE_TOKEN or BLOB_STORE_ID), under camera/waiting/ and
// camera/shown/. Without one, while developing, they go to .data/camera in
// the project (ignored by git), so the camera works locally; in production
// it says leaving photos isn't set up yet.

export const dynamic = "force-dynamic";

type Status = "waiting" | "shown";
const MAX_BYTES = 600_000; // the camera sends about 100 KB
const NAME = /^(\d{13})-([0-9a-f]{16})-[0-9a-f]{8}\.jpg$/;
const TOKEN = /^[\w-]{16,100}$/;

const inBlob = () =>
  Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
const inFolder = () => !inBlob() && process.env.NODE_ENV !== "production";
const prefix = (status: Status) => `camera/${status}/`;
const folder = (status: Status) =>
  path.join(process.cwd(), ".data", "camera", status);

const hash = (text: string) => createHash("sha256").update(text).digest();
const ownerOf = (token: string) => hash(token).toString("hex").slice(0, 16);
const asker = (request: Request) => {
  const token = request.headers.get("x-camera-owner") ?? "";
  return TOKEN.test(token) ? ownerOf(token) : null;
};

// Whether this is me, reviewing: with ?review and the right key
const reviewing = (request: Request): "yes" | "no" | "unset" | "wrong" => {
  if (!new URL(request.url).searchParams.has("review")) return "no";
  const key = process.env.CAMERA_REVIEW_KEY;
  if (!key) return process.env.NODE_ENV === "production" ? "unset" : "yes";
  const given = request.headers.get("x-camera-review") ?? "";
  return timingSafeEqual(hash(given), hash(key)) ? "yes" : "wrong";
};

type Photo = {
  id: string;
  src: string;
  at: number;
  owner: string;
  waiting: boolean;
};

const photo = (name: string, src: string, status: Status): Photo | null => {
  const match = NAME.exec(name);
  return match
    ? {
        id: name,
        src,
        at: Number(match[1]),
        owner: match[2],
        waiting: status === "waiting",
      }
    : null;
};

async function photosIn(status: Status) {
  const photos: Photo[] = [];
  if (inBlob()) {
    let cursor: string | undefined;
    do {
      const page = await list({ prefix: prefix(status), cursor, limit: 1000 });
      for (const blob of page.blobs) {
        const name = blob.pathname.slice(prefix(status).length);
        const p = photo(name, blob.url, status);
        if (p) photos.push(p);
      }
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
  } else if (inFolder()) {
    const names = await readdir(folder(status)).catch(() => [] as string[]);
    for (const name of names) {
      const src = `/api/camera?file=${name}&status=${status}`;
      const p = photo(name, src, status);
      if (p) photos.push(p);
    }
  }
  return photos;
}

const json = (body: unknown, status = 200) =>
  Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });

const refused = (review: "unset" | "wrong") =>
  json(
    {
      error:
        review === "unset"
          ? "Reviewing isn't set up yet: add CAMERA_REVIEW_KEY."
          : "That key didn't work.",
    },
    401,
  );

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;

  // Locally, the photo files themselves
  const file = params.get("file");
  if (file !== null) {
    const status = params.get("status") === "shown" ? "shown" : "waiting";
    if (!inFolder() || !NAME.test(file))
      return new Response(null, { status: 404 });
    try {
      const bytes = await readFile(path.join(folder(status), file));
      return new Response(bytes, {
        headers: { "Content-Type": "image/jpeg", "Cache-Control": "no-store" },
      });
    } catch {
      return new Response(null, { status: 404 });
    }
  }

  const review = reviewing(request);
  if (review === "unset" || review === "wrong") return refused(review);
  const owner = asker(request);
  const [shown, waiting] = await Promise.all([
    photosIn("shown"),
    photosIn("waiting"),
  ]);
  const photos = [
    ...shown,
    ...waiting.filter((p) => review === "yes" || p.owner === owner),
  ].sort((a, b) => a.at - b.at);
  return json({ photos, canLeave: inBlob() || inFolder() });
}

export async function POST(request: Request) {
  if (!inBlob() && !inFolder())
    return json({ error: "Leaving photos isn't set up yet." }, 503);
  const owner = asker(request);
  if (!owner) return json({ error: "Missing who left it." }, 400);
  const bytes = Buffer.from(await request.arrayBuffer());
  // A JPEG, starting FF D8 FF, and not too big
  const jpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (!jpeg || bytes.length > MAX_BYTES)
    return json({ error: "That photo can't be saved." }, 400);

  const name = `${Date.now()}-${owner}-${randomBytes(4).toString("hex")}.jpg`;
  let src: string;
  if (inBlob()) {
    const blob = await put(prefix("waiting") + name, bytes, {
      access: "public",
      contentType: "image/jpeg",
    });
    src = blob.url;
  } else {
    await mkdir(folder("waiting"), { recursive: true });
    await writeFile(path.join(folder("waiting"), name), bytes);
    src = `/api/camera?file=${name}&status=waiting`;
  }
  return json({ photo: photo(name, src, "waiting") }, 201);
}

export async function DELETE(request: Request) {
  const id = new URL(request.url).searchParams.get("id") ?? "";
  const match = NAME.exec(id);
  if (!match) return json({ error: "Not found." }, 404);
  const review = reviewing(request);
  if (review === "unset" || review === "wrong") return refused(review);
  if (review !== "yes" && match[2] !== asker(request))
    return json({ error: "Only whoever left a photo can delete it." }, 403);
  if (inBlob()) await del([prefix("waiting") + id, prefix("shown") + id]);
  else if (inFolder())
    await Promise.all(
      (["waiting", "shown"] as const).map((s) =>
        unlink(path.join(folder(s), id)).catch(() => {}),
      ),
    );
  return json({ deleted: id });
}

export async function PATCH(request: Request) {
  const id = new URL(request.url).searchParams.get("id") ?? "";
  if (!NAME.test(id)) return json({ error: "Not found." }, 404);
  const review = reviewing(request);
  if (review !== "yes")
    return review === "no"
      ? json({ error: "Only I can approve photos." }, 403)
      : refused(review);
  if (!inBlob() && !inFolder())
    return json({ error: "Leaving photos isn't set up yet." }, 503);
  try {
    let src: string;
    if (inBlob()) {
      const from = prefix("waiting") + id;
      const blob = await rename(from, prefix("shown") + id, {
        access: "public",
        contentType: "image/jpeg",
      });
      src = blob.url;
    } else {
      await mkdir(folder("shown"), { recursive: true });
      await move(
        path.join(folder("waiting"), id),
        path.join(folder("shown"), id),
      );
      src = `/api/camera?file=${id}&status=shown`;
    }
    return json({ photo: photo(id, src, "shown") });
  } catch {
    return json({ error: "That photo isn't waiting anymore." }, 404);
  }
}
