import type { Metadata } from "next";
import Image from "next/image";
import Medallion from "@/components/shared/Medallion";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Central Committee — UAECNE",
};

const members = [
  {
    name: "Rev. Mgrdich Karagoezian",
    role: "President Emeritus",
    photo: "/central-committee-mgrdich-karagoezian.png",
  },
  {
    name: "Rev. Dr. Paul Haidostian",
    role: "Acting President",
    photo: "/central-committee-paul-haidostian.jpg",
  },
  {
    name: "Rev. Hrayr Cholakian",
    role: "Chair",
    photo: "/central-committee-hrayr-cholakian.jpg",
  },
  {
    name: "Mrs. Takouhi Sarkisian",
    role: "Clerk",
    photo: "/central-committee-takouhi-sarkisian.jpg",
  },
  {
    name: "Mr. Garbis Deyirmenjian",
    role: "Treasurer",
    photo: "/central-committee-garbis-deyirmenjian.jpg",
  },
  {
    name: "Rev. Dr. Haroutune Selimian",
    role: "Vice-Chair",
    photo: "/central-committee-haroutune-selimian.jpg",
  },
  {
    name: "Pastor Simon Der Sahagian",
    role: "Vice-Clerk",
    photo: "/central-committee-simon-der-sahagian.jpg",
  },
  {
    name: "Mrs. Liza Keshishian",
    role: "Vice-Treasurer",
    photo: "/central-committee-liza-keshishian.jpg",
  },
  {
    name: "Pastor Datev Basmajian",
    role: "Member at Large · Lebanon",
    photo: "/central-committee-datev-basmajian.jpg",
  },
  {
    name: "Rev. Hagop Akbasharian",
    role: "Member at Large · Lebanon",
    photo: "/central-committee-hagop-akbasharian.jpeg",
  },
  {
    name: "Rev. Jirair Ghazarian",
    role: "Member at Large · Lebanon",
    photo: "/central-committee-jirair-ghazarian.jpg",
  },
  {
    name: "Mr. Samuel Sevadjian",
    role: "Member at Large · Lebanon",
    photo: "/central-committee-samuel-sevadjian.jpg",
  },
  {
    name: "Mrs. Talin Ishkhanian",
    role: "Member at Large · Syria",
    photo: "/central-committee-talin-ishkhanian.jpg",
  },
  {
    name: "Mrs. Vera Parechanian",
    role: "Member at Large · Syria",
    photo: "/central-committee-vera-parechanian.jpg",
  },
  {
    name: "Rev. Salim Sabounji",
    role: "Ex Officio",
    photo: "/central-committee-salim-sabounji.jpeg",
  },
  {
    name: "Rev. L. Nishan Bakalian",
    role: "Ex Officio",
    photo: "/central-committee-nishan-bakalian.jpg",
  },
];

export default function CentralCommitteePage() {
  return (
    <>
      <section className={styles.banner}>
        <div className={styles.bannerInner}>
          <h1 className={styles.bannerHeading}>Central Committee</h1>
          <span className={styles.updated}>Last updated · May 2026</span>
        </div>
      </section>

      <section className={styles.committee}>
        <Medallion size={340} className={styles.wm} />
        <Medallion size={300} className={styles.wmLeft} />
        <div className={styles.grid}>
          {members.map((member) => (
            <article key={member.name} className={styles.person}>
              <div className={styles.pic}>
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className={styles.photo}
                  />
                ) : (
                  <span className={styles.glyph}>
                    <svg className={styles.glyphIcon}>
                      <use href="#ic-user" />
                    </svg>
                    <span className={styles.glyphCaption}>Photo pending</span>
                  </span>
                )}
              </div>
              <div className={styles.info}>
                <span className={styles.name}>{member.name}</span>
                <div className={styles.role}>{member.role}</div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
