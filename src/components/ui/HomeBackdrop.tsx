/**
 * Subtle illustrative backdrop inspired by West African storytelling evenings
 * (warm Sahel horizon, baobab silhouette, discreet bogolan-inspired geometry).
 * Decorative only (aria-hidden), designed to preserve text contrast.
 */
export function HomeBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {/* Warm radial sunlight glow */}
      <div
        className="absolute -top-24 right-[-10%] h-[420px] w-[420px] rounded-full opacity-45 blur-3xl sm:h-[540px] sm:w-[540px]"
        style={{
          background:
            'radial-gradient(circle, rgba(232, 121, 36, 0.28) 0%, rgba(246, 232, 210, 0.35) 55%, rgba(255, 249, 240, 0) 75%)',
        }}
      />

      {/* Soft sand horizon wash */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 opacity-60"
        style={{
          background:
            'linear-gradient(to top, rgba(246, 232, 210, 0.85) 0%, rgba(255, 249, 240, 0) 100%)',
        }}
      />

      {/* Discreet bogolan-inspired geometric motif (top-right corner) */}
      <svg
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-6 right-6 hidden h-40 w-40 opacity-[0.09] md:block lg:h-52 lg:w-52"
      >
        <g stroke="#8B451F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 40L50 10L80 40L50 70Z" />
          <path d="M100 40L130 10L160 40L130 70Z" />
          <path d="M180 40L210 10L230 30" />
          <circle cx="50" cy="40" r="4" fill="#E87924" stroke="none" />
          <circle cx="130" cy="40" r="4" fill="#E87924" stroke="none" />
          <path d="M20 110L60 90L100 110L140 90L180 110L220 90" />
          <path d="M20 130L60 110L100 130L140 110L180 130L220 110" />
        </g>
      </svg>

      {/* Serene Sahel horizon & baobab silhouette */}
      <svg
        viewBox="0 0 1440 360"
        fill="none"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-x-0 bottom-0 h-44 w-full opacity-90 sm:h-56 lg:h-64"
      >
        {/* Distant warm dunes */}
        <path
          d="M0 270C220 220 440 240 680 265C940 292 1190 230 1440 250V360H0V270Z"
          fill="#F6E8D2"
        />
        <path
          d="M0 305C280 270 540 295 840 280C1080 268 1280 285 1440 295V360H0V305Z"
          fill="#EAD4B3"
          fillOpacity="0.6"
        />

        {/* Stylized baobab silhouette on the right */}
        <g transform="translate(1060 95)" fill="#8B451F" fillOpacity="0.16">
          {/* Trunk */}
          <path d="M122 195C118 155 114 128 118 98C121 76 135 66 150 66C165 66 177 78 180 100C184 130 179 158 184 195H122Z" />
          {/* Crown */}
          <ellipse cx="150" cy="58" rx="76" ry="26" />
          <ellipse cx="104" cy="68" rx="42" ry="18" />
          <ellipse cx="196" cy="68" rx="44" ry="19" />
          <ellipse cx="150" cy="42" rx="48" ry="20" />
        </g>

        {/* Warm setting sun */}
        <circle cx="1125" cy="185" r="46" fill="#E87924" fillOpacity="0.14" />
      </svg>
    </div>
  );
}
