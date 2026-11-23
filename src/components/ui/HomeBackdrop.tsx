/**
 * Illustrative hero backdrop inspired by West African storytelling evenings
 * (warm Sahel horizon, baobab & acacia silhouettes, griot storytelling scene).
 * Decorative only (aria-hidden), positioned so the griot sits cleanly between
 * the hero CTA buttons and the bottom navigation dock without any blurry veil.
 */
export function HomeBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      <img
        src={`${import.meta.env.BASE_URL}images/hero-bg-circle.jpg`}
        alt=""
        decoding="async"
        fetchPriority="high"
        className="h-full w-full object-cover object-center"
      />

      {/* Ultra-light central glow so both the griot behind the text and the typography stay crisp */}
      <div
        className="absolute "
        style={{
          background:
            'radial-gradient(ellipse 46% 36% at 50% 46%, rgba(255, 249, 240, 0.28) 0%, rgba(255, 249, 240, 0) 100%)',
        }}
      />
    </div>
  );
}
