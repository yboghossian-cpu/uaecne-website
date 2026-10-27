import SocialLinks from "@/components/shared/SocialLinks";
import { hasSocial, type SocialLinks as Links } from "@/lib/social";
import styles from "./FollowBand.module.css";

// For institution pages without a Location card: a slim centred band
// carrying the same "Follow Us" links.
export default function FollowBand({ social, name }: { social: Links | null | undefined; name: string }) {
  if (!hasSocial(social)) return null;
  return (
    <section className={styles.band} aria-label={`${name} online`}>
      <div className={styles.inner}>
        <SocialLinks social={social} name={name} />
      </div>
    </section>
  );
}
