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

      {/* Soft centered ivory readability veil */}
      <div
        className="absolute "
        style={{
          background:
            'radial-gradient(ellipse 75% 65% at 50% 48%, rgba(255, 249, 240, 0.78) 0%, rgba(255, 249, 240, 0.42) 60%, rgba(255, 249, 240, 0.12) 100%)',
        }}
      />
    </div>
  );
}
