/**
 * Field "shapes" for the admin page editor. A shape is worked out from every
 * existing document in a collection, so the editor knows that, say,
 * `contactOverride.fax` is text and `gallery` is a list of photos even on a
 * page where that field is still empty.
 */

export type Kind = "string" | "number" | "boolean" | "null" | "object" | "array";

export type Shape = {
  types: Kind[];
  fields?: Record<string, Shape>;
  /** Field keys in their usual order. */
  order?: string[];
  /** Keys that some documents leave out entirely. */
  optional?: string[];
  item?: Shape;
  long?: boolean;
  image?: boolean;
};

const IMAGE_RE = /^\/.+\.(jpe?g|png|webp|gif|svg|avif)$/i;
const LONG_KEYS = /(paragraph|body|description|text|intro|bio|quote|excerpt|note|caption|summary|message|address)/i;

function kindOf(v: unknown): Kind {
  if (v === null || v === undefined) return "null";
  if (Array.isArray(v)) return "array";
  const t = typeof v;
  if (t === "string" || t === "number" || t === "boolean") return t;
  return "object";
}

export function inferShape(values: unknown[], key = ""): Shape {
  const types = new Set<Kind>();
  const objs: Record<string, unknown>[] = [];
  const arrayItems: unknown[] = [];
  let long = LONG_KEYS.test(key);
  let image = key === "src" || /^(photo|emblem|logo|image|cover)$/i.test(key);
  for (const v of values) {
    const k = kindOf(v);
    types.add(k);
    if (k === "object") objs.push(v as Record<string, unknown>);
    else if (k === "array") arrayItems.push(...(v as unknown[]));
    else if (k === "string") {
      const s = v as string;
      if (s.length > 90 || s.includes("\n")) long = true;
      if (IMAGE_RE.test(s)) image = true;
    }
  }
  const shape: Shape = { types: [...types] };
  if (types.has("string")) {
    if (long) shape.long = true;
    if (image) shape.image = true;
  }
  if (objs.length) {
    const order: string[] = [];
    const counts = new Map<string, number>();
    for (const o of objs)
      for (const k of Object.keys(o)) {
        if (!counts.has(k)) order.push(k);
        counts.set(k, (counts.get(k) ?? 0) + 1);
      }
    shape.order = order;
    shape.fields = {};
    for (const k of order)
      shape.fields[k] = inferShape(
        objs.map((o) => o[k]),
        k,
      );
    const optional = order.filter((k) => (counts.get(k) ?? 0) < objs.length);
    if (optional.length) shape.optional = optional;
  }
  if (types.has("array")) shape.item = inferShape(arrayItems, key.replace(/s$/, ""));
  return shape;
}

/** A blank value for a shape — used when adding an item or a section. */
export function blankFor(shape: Shape | undefined): unknown {
  if (!shape) return "";
  const t = shape.types;
  if (t.includes("object") && shape.fields) {
    const out: Record<string, unknown> = {};
    for (const k of shape.order ?? Object.keys(shape.fields)) {
      if (shape.optional?.includes(k)) continue;
      const f = shape.fields[k];
      out[k] = f.types.includes("null") ? null : blankFor(f);
    }
    return out;
  }
  if (t.includes("array")) return [];
  if (t.includes("string")) return "";
  if (t.includes("number")) return 0;
  if (t.includes("boolean")) return false;
  return null;
}

/** Checks a document against the shape; returns the first problem found. */
export function checkShape(value: unknown, shape: Shape | undefined, path = "page"): string | null {
  if (!shape) return null; // field not seen in any existing page — allowed
  const k = kindOf(value);
  if (value === undefined) return null;
  const allowed = new Set(shape.types);
  // Text fields may be emptied to null, and numbers typed as text.
  if (k === "null" && (allowed.has("string") || allowed.has("object") || allowed.has("array"))) {
    if (!allowed.has("null") && allowed.has("string")) return `${path} cannot be empty`;
    return null;
  }
  if (!allowed.has(k)) return `${path} has the wrong type (${k}; expected ${shape.types.join(" or ")})`;
  if (k === "object" && shape.fields) {
    for (const [key, v] of Object.entries(value as Record<string, unknown>)) {
      const err = checkShape(v, shape.fields[key], `${path} › ${key}`);
      if (err) return err;
    }
  }
  if (k === "array" && shape.item) {
    const arr = value as unknown[];
    for (let i = 0; i < arr.length; i++) {
      const err = checkShape(arr[i], shape.item, `${path} › item ${i + 1}`);
      if (err) return err;
    }
  }
  return null;
}

const LABELS: Record<string, string> = {
  cta: "Call to action",
  kchag: "KCHAG notice",
  estYear: "Established (year)",
  isNew: "Marked as new",
  mapsUrl: "Google Maps link",
  src: "Image",
  alt: "Image description",
  hy: "Armenian",
};

export function humanize(key: string): string {
  if (LABELS[key]) return LABELS[key];
  const hy = /Hy$/.test(key);
  const base = key
    .replace(/Hy$/, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .toLowerCase();
  const label = base.charAt(0).toUpperCase() + base.slice(1);
  return hy ? `${label} (Armenian)` : label;
}
