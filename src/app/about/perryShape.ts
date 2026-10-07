// The patch of the closet Perry, my 3D printer, is drawn in (Perry.tsx),
// with his base's bottom left corner at 0, 0, in the closet's units. A
// plain module, so the closet's drawing on the server can place him; a
// "use client" file's exports only reach the server as references.
export const PERRY_VIEW = { x: -34, y: -134, w: 158, h: 136 };
