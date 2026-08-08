// Abstract, subtly-animated home background: slow-drifting monochrome light orbs
// over a faint masked dot-grid. Fixed behind all content, non-interactive, and
// low-opacity so it stays out of the way. CSS-only (see globals.css).
export default function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="bg-grid" />
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />
    </div>
  );
}
