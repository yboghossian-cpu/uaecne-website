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
      </defs>
    </svg>
  );
}
