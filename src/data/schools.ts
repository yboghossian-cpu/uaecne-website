/**
 * Schools directory — typed data for the Schools index. Mirrors the shape
 * of src/data/churches.ts (see that file for the fuller sourcing pattern).
 * Photos and emblems verified real, MD5-checked against
 * Schools/Schools Pagge, 2026-08-19. Only Lebanon is built for now — no
 * verified schools directory exists yet for other countries; do not invent.
 */

export type School = {
  id: string;
  country: string;
  name: string;
  slug: string;
  photo: string | null;
  emblem: string | null;
};

export const schools: School[] = [
  {
    id: "school-aec",
    country: "Lebanon",
    name: "Armenian Evangelical College",
    slug: "armenian-evangelical-college",
    photo: "/school-armenian-evangelical-college.jpeg",
    emblem: "/school-armenian-evangelical-college-emblem.jpeg",
  },
  {
    id: "school-central-high",
    country: "Lebanon",
    name: "Armenian Evangelical Central High School",
    slug: "armenian-evangelical-central-high-school",
    photo: "/school-central-high-school.jpg",
    emblem: "/school-central-high-school-emblem.jpeg",
  },
  {
    id: "school-shamlian-tatikian",
    country: "Lebanon",
    name: "Armenian Evangelical Shamlian-Tatikian Secondary School",
    slug: "armenian-evangelical-shamlian-tatikian-secondary-school",
    photo: "/school-shamlian-tatikian.jpeg",
    emblem: "/school-shamlian-tatikian-emblem.jpg",
  },
  {
    id: "school-anjar",
    country: "Lebanon",
    name: "Armenian Evangelical Secondary School, Anjar",
    slug: "armenian-evangelical-secondary-school-anjar",
    photo: null,
    emblem: "/school-anjar-emblem.jpg",
  },
];
