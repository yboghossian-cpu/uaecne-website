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

import type { SocialLinks } from "@/lib/social";

export type School = {
  id: string;
  country: string;
  name: string;
  slug: string;
  photo: string | null;
  emblem: string | null;
  // Official website / social accounts, shown under "Our Location".
  social?: SocialLinks;
};

export const schools: School[] = [
  {
    id: "school-aec",
    country: "Lebanon",
    name: "Armenian Evangelical College",
    slug: "armenian-evangelical-college",
    photo: "/school-armenian-evangelical-college.jpeg",
    emblem: "/school-armenian-evangelical-college-emblem.jpeg",
    social: { facebook: "https://www.facebook.com/aecollege.lb/", instagram: "https://www.instagram.com/aecollege/", website: "https://aecbeirut.edu.lb/" },
  },
  {
    id: "school-central-high",
    country: "Lebanon",
    name: "Armenian Evangelical Central High School",
    slug: "armenian-evangelical-central-high-school",
    photo: "/school-central-high-school.jpg",
    emblem: "/school-central-high-school-emblem.jpeg",
    social: { facebook: "https://www.facebook.com/HighSchoolAshrafieh/", instagram: "https://www.instagram.com/centralhighschoolashrafieh/", website: "https://www.aechs.com/" },
  },
  {
    id: "school-shamlian-tatikian",
    country: "Lebanon",
    name: "Armenian Evangelical Shamlian-Tatikian Secondary School",
    slug: "armenian-evangelical-shamlian-tatikian-secondary-school",
    photo: "/school-shamlian-tatikian.jpeg",
    emblem: "/school-shamlian-tatikian-emblem.jpg",
    social: { facebook: "https://www.facebook.com/shamlian.tatigian/", instagram: "https://www.instagram.com/aessbh/", website: "https://shamlian-tatigian.com/" },
  },
  {
    id: "school-anjar",
    country: "Lebanon",
    name: "Armenian Evangelical Secondary School, Anjar",
    slug: "armenian-evangelical-secondary-school-anjar",
    photo: null,
    emblem: "/school-anjar-emblem.jpg",
    social: { facebook: "https://www.facebook.com/AESSAnjar/", instagram: "https://www.instagram.com/aessanjar/" },
  },
  {
    id: "school-acg",
    country: "Syria",
    name: "Aleppo College for Girls",
    slug: "aleppo-college-for-girls",
    photo: "/school-aleppo-college-for-girls-hero.jpg",
    emblem: "/school-aleppo-college-for-girls-emblem.png",
    social: { facebook: "https://www.facebook.com/profile.php?id=100057130793531", instagram: "https://www.instagram.com/acg.aleppo/", website: "https://apcsy.org/pages/aleppo-college-for-girls-school" },
  },
  {
    id: "school-bethel-secondary",
    country: "Syria",
    name: "Armenian Evangelical Bethel Secondary School",
    slug: "bethel-secondary-school",
    photo: "/school-bethel-secondary-school-hero.jpg",
    emblem: "/school-bethel-secondary-school-emblem.png",
    social: { facebook: "https://www.facebook.com/AEBSS.aleppo", instagram: "https://www.instagram.com/bethel_sec_school/", website: "https://apcsy.org/pages/armenian-evangelical-bethel-secondary-school" },
  },
  {
    id: "school-emmanuel-al-ressaleh",
    country: "Syria",
    name: "Armenian Evangelical Emmanuel School (Al Ressaleh)",
    slug: "emmanuel-al-ressaleh-school",
    photo: "/school-emmanuel-al-ressaleh-hero.jpg",
    emblem: "/school-emmanuel-al-ressaleh-emblem.png",
    social: { facebook: "https://www.facebook.com/alressaleh.eschool", instagram: "https://www.instagram.com/alressaleh/", website: "https://apcsy.org/pages/armenian-evangelical-emmanuel-school" },
  },
  {
    id: "school-damascus-kenats-al-hayat",
    country: "Syria",
    name: "Damascus Armenian Evangelical \"Kenats\" School (Al-Hayat)",
    slug: "damascus-kenats-al-hayat-school",
    photo: "/school-damascus-kenats-al-hayat-hero.jpg",
    emblem: "/school-damascus-kenats-al-hayat-emblem.png",
    social: { facebook: "https://www.facebook.com/profile.php?id=100063832424966", website: "https://apcsy.org/pages/armenian-evangelical-kenats-school-damascus" },
  },
  {
    id: "school-syriac-evangelical",
    country: "Syria",
    name: "Syriac Evangelical School",
    slug: "syriac-evangelical-school",
    photo: "/school-syriac-evangelical-hero.jpg",
    emblem: "/school-syriac-evangelical-emblem.png",
    social: { facebook: "https://www.facebook.com/profile.php?id=100063903311523", instagram: "https://www.instagram.com/syriac_evangelical_school/", website: "https://apcsy.org/pages/syriac-evangelical-school" },
  },
  {
    id: "school-kessab-martyrs",
    country: "Syria (Kessab)",
    name: "Armenian Evangelical Martyrs' School, Kessab",
    slug: "kessab-martyrs-school",
    photo: "/school-kessab-martyrs-hero.jpg",
    emblem: "/school-kessab-martyrs-emblem.png",
    social: { facebook: "https://www.facebook.com/ArmenianEvangelicalMartyrsSchool", website: "https://apcsy.org/pages/the-armenian-evangelical-martyrs-school-kessab" },
  },
];
