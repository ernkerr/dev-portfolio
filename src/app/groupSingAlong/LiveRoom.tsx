"use client";

import { Bricolage_Grotesque, Inter } from "next/font/google";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { LuMic, LuMinus, LuPlus, LuSearch, LuShare } from "react-icons/lu";
import { focusRing } from "@/components/site/links";
import { label } from "@/components/site/prose";

// The Group Sing Along room as it looked in January 2025 (web@6a337b4),
// rebuilt from its code so reviewers can try the one thing the product does:
// the host picks a song and every phone opens its lyrics. Colors, sizes and
// type are the product's own (Tailwind violet-400 → violet-300, shadcn grays,
// Bricolage Grotesque and Inter), not the portfolio's. The real app searched
// Deezer and synced phones over Pusher; here both phones share one state.
// Songs are public domain, and the covers are plain color squares.

const bricolage = Bricolage_Grotesque({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
});
const inter = Inter({ subsets: ["latin"], display: "swap" });

type Song = { title: string; artist: string; cover: string; lyrics: string };

const SONGS: Song[] = [
  {
    title: "Jingle Bells",
    artist: "James Lord Pierpont",
    cover: "#B91C1C",
    lyrics: `Dashing through the snow
In a one-horse open sleigh
O'er the fields we go
Laughing all the way
Bells on bobtail ring
Making spirits bright
What fun it is to ride and sing
A sleighing song tonight

Jingle bells, jingle bells
Jingle all the way
Oh, what fun it is to ride
In a one-horse open sleigh, hey`,
  },
  {
    title: "Auld Lang Syne",
    artist: "Robert Burns",
    cover: "#1E3A8A",
    lyrics: `Should auld acquaintance be forgot
And never brought to mind?
Should auld acquaintance be forgot
And auld lang syne?

For auld lang syne, my dear
For auld lang syne
We'll take a cup o' kindness yet
For auld lang syne`,
  },
  {
    title: "Take Me Out to the Ball Game",
    artist: "Jack Norworth",
    cover: "#047857",
    lyrics: `Take me out to the ball game
Take me out with the crowd
Buy me some peanuts and Cracker Jack
I don't care if I never get back

Let me root, root, root for the home team
If they don't win, it's a shame
For it's one, two, three strikes, you're out
At the old ball game`,
  },
  {
    title: "Row, Row, Row Your Boat",
    artist: "Traditional",
    cover: "#B45309",
    lyrics: `Row, row, row your boat
Gently down the stream
Merrily, merrily, merrily, merrily
Life is but a dream`,
  },
];

// The phone is laid out at a real 390px width, then scaled to fit its column,
// so every size inside matches the product.
const VIEW = { w: 390, h: 640 };

function Phone({ children }: { children: ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.7);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) =>
      setScale(entry.contentRect.width / VIEW.w),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={box}
      className="relative w-full overflow-hidden rounded-phone-screen bg-white shadow-float ring-1 ring-black/5"
      style={{ aspectRatio: `${VIEW.w} / ${VIEW.h}` }}
    >
      <div
        className={`${inter.className} absolute left-0 top-0 origin-top-left text-[#030712]`}
        style={{
          width: VIEW.w,
          height: VIEW.h,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-[#a78bfa] to-[#c4b5fd] p-6 text-white">
      <p
        className={`${bricolage.className} flex items-center gap-1 text-2xl leading-none`}
      >
        <LuMic aria-hidden="true" className="h-5 w-5" />
        Group Sing Along
      </p>
      <span className="inline-flex h-8 items-center gap-2 rounded-md bg-[#c4b5fd] px-3 text-xs font-medium text-white shadow-xl">
        <LuShare aria-hidden="true" className="h-3 w-3" />
        Share
      </span>
    </div>
  );
}

/** "Lyrics:" with the per-phone − / + buttons, and the lyrics themselves. */
function Lyrics({
  song,
  size,
  onSize,
}: {
  song: Song | null;
  size: number;
  onSize: (next: number) => void;
}) {
  const button = `flex h-8 w-8 items-center justify-center rounded-md border border-[#e5e7eb] bg-white shadow-sm transition-colors hover:bg-[#f3f4f6] ${focusRing}`;
  return (
    <div className="space-y-2">
      {song && (
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-[50px] w-[50px] shrink-0 rounded-lg"
            style={{ background: song.cover }}
          />
          <div>
            <p className="text-xl leading-7">{song.title}</p>
            <p className="text-base text-[#9ca3af]">{song.artist}</p>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Lyrics:</p>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Decrease font size"
            className={button}
            onClick={() => onSize(Math.max(size - 2, 10))}
          >
            <LuMinus aria-hidden="true" className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Increase font size"
            className={button}
            onClick={() => onSize(size + 2)}
          >
            <LuPlus aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </div>
      <pre
        className={`${inter.className} whitespace-pre-wrap break-words leading-loose`}
        style={{ fontSize: size }}
      >
        {song ? song.lyrics : "Waiting for the conductor to select a song..."}
      </pre>
    </div>
  );
}

export default function LiveRoom() {
  const [hostSong, setHostSong] = useState<Song | null>(null);
  const [singerSong, setSingerSong] = useState<Song | null>(null);
  const [hostSize, setHostSize] = useState(16);
  const [singerSize, setSingerSize] = useState(16);

  // The singer's phone gets the song a moment after the host picks it, the
  // way the broadcast arrived in the real app.
  useEffect(() => {
    if (!hostSong) return;
    const id = setTimeout(() => setSingerSong(hostSong), 350);
    return () => clearTimeout(id);
  }, [hostSong]);

  return (
    <div className="bg-[#E4DDFB] px-6 py-8 md:px-10 md:py-10">
      <div className="mx-auto grid max-w-64 gap-8 sm:max-w-xl sm:grid-cols-2">
        <div>
          <p className={`${label} mb-3 text-center`}>
            Host’s phone · tap a song
          </p>
          <Phone>
            <Header />
            <div className="space-y-4 px-6 py-3">
              <div className="flex gap-2">
                <span className="flex h-9 flex-1 items-center rounded-md border border-[#e5e7eb] px-3 text-sm text-[#6b7280] shadow-lg">
                  Search for a song
                </span>
                <span className="inline-flex h-9 items-center rounded-md bg-gradient-to-r from-[#a78bfa] to-[#c4b5fd] px-4 text-sm font-medium text-white shadow-lg">
                  <LuSearch aria-hidden="true" className="mr-1 h-4 w-4" />
                  Search
                </span>
              </div>
              <ul>
                {SONGS.map((s) => (
                  <li key={s.title}>
                    <button
                      type="button"
                      aria-pressed={hostSong?.title === s.title}
                      onClick={() => setHostSong(s)}
                      className={`w-full rounded-md p-4 text-left transition hover:bg-[#c4b5fd] ${
                        hostSong?.title === s.title ? "bg-[#ede9fe]" : ""
                      } ${focusRing}`}
                    >
                      {s.title} - {s.artist}
                    </button>
                  </li>
                ))}
              </ul>
              <Lyrics song={hostSong} size={hostSize} onSize={setHostSize} />
            </div>
          </Phone>
        </div>
        <div>
          <p className={`${label} mb-3 text-center`}>Singer’s phone</p>
          <Phone>
            <Header />
            <div className="px-6 py-3" aria-live="polite">
              <Lyrics
                song={singerSong}
                size={singerSize}
                onSize={setSingerSize}
              />
            </div>
          </Phone>
        </div>
      </div>
    </div>
  );
}
