/**
 * Schools directory — typed data for the Schools index. Mirrors the shape
 * of src/data/churches.ts (see that file for the fuller sourcing pattern).
 * Photos and emblems verified real, MD5-checked against
 * Schools/Schools Pagge, 2026-08-19. Lebanon's 4 schools were built first;
 * Aleppo College for Girls (Syria) is the first non-Lebanon entry, added
 * once a verified reference (design-reference/
 * uaecne-school-aleppo-college-girls.html) existed for it — do not invent
 * entries for other countries without one.
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
  {
    id: "school-acg",
    country: "Syria",
    name: "Aleppo College for Girls",
    slug: "aleppo-college-for-girls",
    photo: "/school-aleppo-college-for-girls-hero.jpg",
    emblem: "/school-aleppo-college-for-girls-emblem.png",
  },
  {
    id: "school-bethel-secondary",
    country: "Syria",
    name: "Armenian Evangelical Bethel Secondary School",
    slug: "bethel-secondary-school",
    photo: "/school-bethel-secondary-school-hero.jpg",
    emblem: "/school-bethel-secondary-school-emblem.png",
  },
];
