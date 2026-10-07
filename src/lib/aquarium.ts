// What the aquarium's page (src/app/fun/aquarium) and its API
// (src/app/api/aquarium) agree on.

export const NAME_MAX = 24;

// The longest a drawing can be, in pixels, once it's trimmed to the fish.
export const FISH_MAX = { w: 360, h: 240 };

export type Fish = {
  id: string;
  src: string;
  name: string;
  at: number;
  mine: boolean;
  waiting: boolean;
};

// A name as it's kept: trimmed, single spaces, no control characters.
export const tidyName = (name: string) =>
  name
    .replace(/[\p{C}]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, NAME_MAX);

// Names can't be links or addresses.
export const looksLikeLink = (name: string) =>
  /https?:|www\.|\.(com|net|org|io|gg|co|ly|me|app|xyz)\b|@\w/i.test(name);
