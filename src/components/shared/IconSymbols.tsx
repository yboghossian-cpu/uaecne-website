// Shared SVG <symbol> sprite, referenced elsewhere via <use href="#..." />.
// Mount once (root layout) so every <use> reference resolves app-wide.
// Geometry copied verbatim from design-reference/uaecne-homepage-concept.html
// and uaecne-church-template.html (identical in both).
export default function IconSymbols() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <symbol id="med" viewBox="0 0 100 100">
          <g fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="50" cy="50" r="47" />
            <circle cx="50" cy="50" r="41" strokeWidth="1" />
            <circle cx="50" cy="33" r="17" />
            <circle cx="67" cy="50" r="17" />
            <circle cx="50" cy="67" r="17" />
            <circle cx="33" cy="50" r="17" />
          </g>
          <g fill="currentColor">
            <circle cx="50" cy="16" r="2" />
            <circle cx="84" cy="50" r="2" />
            <circle cx="50" cy="84" r="2" />
            <circle cx="16" cy="50" r="2" />
            <path
              d="M50 44 v12 M44 50 h12"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </g>
        </symbol>

        <symbol id="ic-user" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="12" cy="8.5" r="3.6" />
            <path d="M5 20c0-3.7 3.1-6 7-6s7 2.3 7 6" />
          </g>
        </symbol>

        <symbol id="seal-light" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="var(--color-gold-decorative)"
            strokeWidth="2"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="rgba(255,253,247,.5)"
            strokeWidth="1"
          />
          <path
            d="M50 32 v26 M40 42 h20"
            stroke="var(--color-gold-decorative)"
            strokeWidth="3.4"
            strokeLinecap="round"
          />
          <path
            d="M34 66 c6 -3 12 -3 16 0 c4 -3 10 -3 16 0"
            fill="none"
            stroke="rgba(255,253,247,.7)"
            strokeWidth="1.6"
          />
        </symbol>

        <symbol id="ic-church" viewBox="0 0 24 24">
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2v3M10.5 3.5h3" />
            <path d="M4 11l8-4.5 8 4.5" />
            <path d="M6 11v10h12V11" />
            <path d="M10 21v-4a2 2 0 0 1 4 0v4" />
          </g>
        </symbol>

        <symbol id="ic-youth" viewBox="0 0 24 24">
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3l9 17H3z" />
            <path d="M12 3v17" />
            <path d="M9 20l3-6 3 6" />
          </g>
        </symbol>

        <symbol id="ic-edu" viewBox="0 0 24 24">
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 8l10-4 10 4-10 4z" />
            <path d="M6 10v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" />
            <path d="M22 8v5" />
          </g>
        </symbol>

        <symbol id="ic-culture" viewBox="0 0 24 24">
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3v18" />
            <path d="M6 9h12" />
            <circle cx="12" cy="9" r="2.4" />
            <path d="M8 6.5h8" />
          </g>
        </symbol>

        <symbol id="ic-care" viewBox="0 0 24 24">
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 20C4 14 4 7.5 8.4 6.4 10.7 5.8 12 8 12 8s1.3-2.2 3.6-1.6C20 7.5 20 14 12 20z" />
            <path d="M12 10.5v4M10 12.5h4" />
          </g>
        </symbol>

        <symbol id="ic-arrow" viewBox="0 0 16 16">
          <path
            d="M3 8h9M9 4l4 4-4 4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </symbol>

        <symbol id="ic-media" viewBox="0 0 24 24">
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6c3-1 5.5-1 8 0 2.5-1 5-1 8 0v11c-3-1-5.5-1-8 0-2.5-1-5-1-8 0z" />
            <path d="M12 6v11" />
          </g>
        </symbol>

        {/* Church-template contact-row / programs-list icons — geometry
            copied verbatim from design-reference/uaecne-church-*.html's
            #pin/#phone/#mail/#dot symbols. */}
        <symbol id="ic-pin" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            d="M12 21s7-6.3 7-11a7 7 0 0 0-14 0c0 4.7 7 11 7 11z"
          />
          <circle cx="12" cy="10" r="2.4" fill="currentColor" />
        </symbol>

        <symbol id="ic-phone" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            d="M5 4h4l2 5-3 2c1 2 3 4 5 5l2-3 5 2v4c0 1-1 2-2 2A16 16 0 0 1 3 6c0-1 1-2 2-2z"
          />
        </symbol>

        <symbol id="ic-mail" viewBox="0 0 24 24">
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </symbol>

        <symbol id="ic-dot" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4" fill="currentColor" />
        </symbol>

        {/* School Mission principle icons — geometry copied verbatim from
            design-reference/uaecne-school-aec-reference.html's
            .mission-grid .principle .arch svg paths. */}
        <symbol id="ic-mission-person" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="12" cy="8" r="3" />
            <path d="M5 20c0-4 3-6 7-6s7 2 7 6" />
          </g>
        </symbol>

        <symbol id="ic-mission-star" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5-5-2.6-5 2.6 1-5.5-4-3.9 5.5-.8z"
          />
        </symbol>

        {/* AESSA Inclusive Support Services / Signature Programs generic
            badge icons — geometry copied verbatim from
            design-reference/uaecne-school-anjar-template.html's own
            <symbol> defs. Used only where no real program logo file
            exists (Boarding Shelter, PEP); Healing Harbour and WeNEEDle use
            their real logo images instead. */}
        <symbol id="ic-home" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 11l8-6 8 6" />
            <path d="M6 11v9h12v-9" />
            <path d="M10 20v-5h4v5" />
          </g>
        </symbol>

        <symbol id="ic-book" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
            <path d="M4 6c3-1 5.5-1 8 0 2.5-1 5-1 8 0v11c-3-1-5.5-1-8 0-2.5-1-5-1-8 0z" />
            <path d="M12 6v11" />
          </g>
        </symbol>

        <symbol id="ic-leaf" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 19c0-8 6-13 14-13 0 8-5 14-13 14-1 0-1-1-1-1z" />
            <path d="M6 18C10 14 13 12 17 11" />
          </g>
        </symbol>

        <symbol id="ic-mission-cross" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            d="M12 3v18M6 9h12"
          />
        </symbol>
      </defs>
    </svg>
  );
}
