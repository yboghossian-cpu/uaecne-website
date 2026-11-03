/** School and church emblems are shown in a round badge. A few official
 *  logos are square, and cropping them to a circle cuts off their text, so
 *  those get a rounded-square badge with the whole logo visible. */
const SQUARE_EMBLEMS = new Set(["/school-central-high-school-emblem.jpeg"]);

export function isSquareEmblem(src: string | null | undefined): boolean {
  return Boolean(src && SQUARE_EMBLEMS.has(src));
}
