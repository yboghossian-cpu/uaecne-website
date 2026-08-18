type MedallionProps = {
  size?: number;
  className?: string;
};

// Quatrefoil interlace medallion — the signature mark.
// Renders <use href="#med" />; the symbol geometry lives in IconSymbols.
// Fill/stroke are currentColor, so callers set color via CSS `color`.
export default function Medallion({ size = 40, className }: MedallionProps) {
  return (
    <svg width={size} height={size} aria-hidden="true" className={className}>
      <use href="#med" />
    </svg>
  );
}
