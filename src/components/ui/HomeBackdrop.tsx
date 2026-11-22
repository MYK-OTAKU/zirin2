/**
 * Illustrative hero backdrop inspired by West African storytelling evenings
 * (warm Sahel horizon, baobab silhouette, discreet bogolan-inspired geometry).
 * Decorative only (aria-hidden), with a subtle ivory scrim on the left to
 * preserve text contrast across all viewport sizes.
 */
export function HomeBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      <img
        src="/images/hero-bg.jpg"
        alt=""
        decoding="async"
        fetchPriority="high"
        className="h-full w-full object-cover object-right-bottom"
      />

      {/* Soft ivory readability veil on the left for smaller viewports */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(255, 249, 240, 0.82) 0%, rgba(255, 249, 240, 0.45) 45%, rgba(255, 249, 240, 0) 75%)',
        }}
      />
    </div>
  );
}
