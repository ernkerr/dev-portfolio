// Ported from OrderSync. Reusable polka-dot texture overlay for navy sections.
//
// Usage: put it as the first child of a `relative overflow-hidden` navy section,
// then wrap the real content in a sibling with `relative z-10`:
//
//   <section className="relative overflow-hidden bg-navy-1">
//     <PolkaDots />
//     <div className="relative z-10">...</div>
//   </section>
//
// The dot pattern itself lives in the `.dot-grid` utility (globals.css).
export function PolkaDots({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`dot-grid pointer-events-none absolute inset-0 opacity-50 ${className}`}
    />
  );
}
