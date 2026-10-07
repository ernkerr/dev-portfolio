import { list, put } from "@vercel/blob";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { inBlob, inFolder } from "@/lib/serverStore";

// Months saved by the daily cron job (src/app/api/cron/gin-months), so the
// new-users chart keeps every month after Apple deletes its report a year
// later. One small JSON file per month: in Vercel Blob under gin/months/, or
// in .data/gin-months while developing. Without either, nothing is kept and
// the chart has savedMonths.ts plus the last year from Apple.

const PREFIX = "gin/months/";
const FOLDER = path.join(process.cwd(), ".data", "gin-months");
const NAME = /^(\d{4}-\d{2})\.json$/;

/** Saved months, as YYYY-MM to new users. */
export async function keptMonths(): Promise<Record<string, number>> {
  const found: { month: string; read: () => Promise<string> }[] = [];
  if (inBlob()) {
    let cursor: string | undefined;
    do {
      const page = await list({ prefix: PREFIX, cursor, limit: 1000 });
      for (const blob of page.blobs) {
        const name = NAME.exec(blob.pathname.slice(PREFIX.length));
        if (name)
          found.push({
            month: name[1],
            read: () =>
              fetch(blob.url, { cache: "no-store" }).then((r) => r.text()),
          });
      }
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
  } else if (inFolder()) {
    const names = await readdir(FOLDER).catch(() => [] as string[]);
    for (const file of names) {
      const name = NAME.exec(file);
      if (name)
        found.push({
          month: name[1],
          read: () => readFile(path.join(FOLDER, file), "utf8"),
        });
    }
  }
  const months: Record<string, number> = {};
  await Promise.all(
    found.map(async ({ month, read }) => {
      try {
        const { users } = JSON.parse(await read()) as { users: number };
        if (Number.isFinite(users)) months[month] = users;
      } catch {
        // A file that can't be read is left out, not shown as 0.
      }
    }),
  );
  return months;
}

/** Saves a finished month. False when there's nowhere to keep it. */
export async function keepMonth(month: string, users: number) {
  const body = JSON.stringify({ month, users });
  if (inBlob()) {
    await put(`${PREFIX}${month}.json`, body, {
      access: "public",
      contentType: "application/json",
      allowOverwrite: true,
    });
    return true;
  }
  if (inFolder()) {
    await mkdir(FOLDER, { recursive: true });
    await writeFile(path.join(FOLDER, `${month}.json`), body);
    return true;
  }
  return false;
}
