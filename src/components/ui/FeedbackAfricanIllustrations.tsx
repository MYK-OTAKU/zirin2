/**
 * Festive Success & Friendly Thinker African Artwork (Vector SVG).
 * Guaranteed zero empty states, ultra-responsive and beautifully animated.
 */

export function SuccessCelebrationArt({ className = 'w-full h-full' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 160"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Célébration festive africaine"
    >
      <defs>
        <linearGradient id="festive-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1E5128" />
          <stop offset="50%" stopColor="#2D6A38" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
      </defs>

      <rect width="200" height="160" rx="16" fill="url(#festive-bg)" opacity="0.15" />

      {/* Floating Gold & Terracotta Confetti & Ribbons */}
      <circle cx="30" cy="30" r="3" fill="#E5A93C" />
      <circle cx="170" cy="25" r="4" fill="#D35400" />
      <circle cx="160" cy="80" r="3" fill="#E5A93C" />
      <circle cx="40" cy="110" r="3.5" fill="#1E5128" />
      <circle cx="180" cy="130" r="2.5" fill="#E5A93C" />

      {/* Confetti diamonds */}
      <polygon points="50,45 54,49 50,53 46,49" fill="#D35400" />
      <polygon points="145,40 149,44 145,48 141,44" fill="#E5A93C" />
      <polygon points="150,110 154,114 150,118 146,114" fill="#1E5128" />

      {/* Festoon / Ribbon Streamers */}
      <path
        d="M20 20c30 20 60-10 90 15s60-5 80 15"
        stroke="#E5A93C"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M10 50c40 15 80-20 120 10s50-10 65 5"
        stroke="#D35400"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        fill="none"
      />

      {/* Central Trophy Drum (Mini Djembé or Calabash of Victory) */}
      <g transform="translate(100, 85)">
        {/* Glow */}
        <circle cx="0" cy="0" r="32" fill="#E5A93C" opacity="0.3" />

        {/* Small Golden Crown / Sunburst */}
        <path
          d="M-18 -18l6 14 12-10 12 10 6-14-12 3-6-3-6 3z"
          fill="#E5A93C"
          stroke="#4A2E1B"
          strokeWidth="1"
        />

        {/* Traditional Joyful Drum Silhouette */}
        <path
          d="M-14 -2h28l-4 18c-2 6-6 10-10 10s-8-4-10-10l-4-18z"
          fill="#4A2E1B"
          stroke="#E5A93C"
          strokeWidth="1.5"
        />
        <ellipse cx="0" cy="-2" rx="14" ry="4" fill="#E5A93C" />

        {/* Drum lacing */}
        <path d="M-10 2l4 14 M-2 2l2 14 M6 2l-2 14 M10 2l-4 14" stroke="#FFEAA7" strokeWidth="1" />

        {/* Star sparkles */}
        <path d="M-28 -8l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" fill="#E5A93C" />
        <path d="M28 -12l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" fill="#E5A93C" />
      </g>
    </svg>
  );
}

export function PuzzledThinkerArt({ className = 'w-full h-full' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 160"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Personnage pensif cherchant la solution"
    >
      <defs>
        <linearGradient id="puzzled-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E5A93C" />
          <stop offset="100%" stopColor="#D35400" />
        </linearGradient>
      </defs>

      <rect width="200" height="160" rx="16" fill="url(#puzzled-bg)" opacity="0.12" />

      {/* Floating Curious Question Marks / Thought Bubbles with African motifs */}
      <g stroke="#D35400" strokeWidth="2" strokeLinecap="round" fill="none">
        {/* Playful Stylized Question Mark */}
        <path d="M145 35c0-8 6-12 12-12s12 5 12 11c0 8-12 10-12 17" />
        <circle cx="157" cy="60" r="1.5" fill="#D35400" />

        <path d="M45 45c0-6 4-9 9-9s9 4 9 8c0 6-9 8-9 13" strokeWidth="1.5" />
        <circle cx="54" cy="64" r="1.2" fill="#D35400" />
      </g>

      {/* Stylized African Thinker Character */}
      <g transform="translate(100, 80)">
        {/* Soft Halo */}
        <circle cx="0" cy="0" r="30" fill="#E5A93C" opacity="0.25" />

        {/* Head */}
        <circle cx="0" cy="-14" r="16" fill="#4A2E1B" />

        {/* Thoughtful Eyebrows & Eyes */}
        <path d="M-7 -18c2 -2 5 -2 7 0" stroke="#FFEAA7" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M2 -20c2 -2 6 0 7 2" stroke="#FFEAA7" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="-3" cy="-14" r="1.5" fill="#FFEAA7" />
        <circle cx="5" cy="-14" r="1.5" fill="#FFEAA7" />

        {/* Smirking thoughtful mouth */}
        <path d="M-2 -8q4 3 8 0" stroke="#FFEAA7" strokeWidth="1.2" fill="none" strokeLinecap="round" />

        {/* Shoulders & Hand to Chin in reflection */}
        <path d="M-18 20c2-12 10-18 20-18s16 6 18 18z" fill="#D35400" />

        {/* Hand touching chin */}
        <path
          d="M8 -4c-2 4-6 6-6 8 0 3 2 6 5 6s6-3 6-8l-5-6z"
          fill="#4A2E1B"
          stroke="#E5A93C"
          strokeWidth="1"
        />
        {/* Swirl of thoughts */}
        <path
          d="M-20 -28c10-10 30-10 40 0"
          stroke="#E5A93C"
          strokeWidth="1.5"
          strokeDasharray="2 3"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
}
