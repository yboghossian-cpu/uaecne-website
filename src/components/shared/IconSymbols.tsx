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
      </defs>
    </svg>
  );
}
