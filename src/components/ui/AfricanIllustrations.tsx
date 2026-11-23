/**
 * Custom high-end SVG vector illustrations inspired by West African & Malian heritage.
 * Palette: Terracotta, African Gold, Deep Forest Green, Traditional Red, Earth Brown, Sand Ivory, Ebony.
 */

export function HeroAfricanIllustration({ className = 'w-full h-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 320"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Illustration d'un grand baobab au crépuscule africain avec motifs traditionnels"
    >
      <defs>
        {/* Warm Sunset Sky Gradient */}
        <linearGradient id="sky-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D35400" />
          <stop offset="45%" stopColor="#E06D28" />
          <stop offset="75%" stopColor="#E5A93C" />
          <stop offset="100%" stopColor="#F6E8D2" />
        </linearGradient>

        {/* Golden Sun Glow */}
        <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF2B2" stopOpacity="0.95" />
          <stop offset="40%" stopColor="#E5A93C" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#D35400" stopOpacity="0" />
        </radialGradient>

        {/* Earth Mound Gradient */}
        <linearGradient id="earth-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4A2E1B" />
          <stop offset="100%" stopColor="#1A1412" />
        </linearGradient>
      </defs>

      {/* Sky Canvas with rounded corners */}
      <rect width="600" height="320" rx="24" fill="url(#sky-gradient)" />

      {/* Subtle Bogolan Geometrics in Sky */}
      <g opacity="0.12" stroke="#FFF" strokeWidth="1.5">
        <path d="M40 30l12 12-12 12 M70 30l12 12-12 12 M100 30l12 12-12 12" />
        <path d="M480 40l14 14-14 14 M520 40l14 14-14 14 M560 40l14 14-14 14" />
        <circle cx="50" cy="80" r="3" fill="#FFF" />
        <circle cx="80" cy="80" r="3" fill="#FFF" />
        <circle cx="110" cy="80" r="3" fill="#FFF" />
      </g>

      {/* Majestic African Sun */}
      <circle cx="300" cy="150" r="110" fill="url(#sun-glow)" />
      <circle cx="300" cy="150" r="55" fill="#FFE898" />

      {/* Birds migrating over the Sahel */}
      <g fill="#1A1412" opacity="0.75">
        <path d="M160 80c4-4 8-2 12 1-4-2-8-1-12-1zm12 1c4-3 8-5 12-1-4-1-8 0-12 1z" />
        <path d="M185 68c3-3 6-2 9 1-3-2-6-1-9-1zm9 1c3-2 6-4 9-1-3-1-6 0-9 1z" />
        <path d="M210 85c2-2 5-1 7 1-2-1-5 0-7 0zm7 1c2-2 5-3 7-1-2-1-5 0-7 0z" />
      </g>

      {/* The Sahel Dunes / Rolling Red Earth */}
      <path
        d="M0 240c120-25 240-10 360-15 100-4 180-25 240-20v115H0V240z"
        fill="url(#earth-gradient)"
      />
      <path
        d="M0 270c140-15 280-35 420-15 80 11 120 5 180-2v67H0V270z"
        fill="#2A180E"
        opacity="0.85"
      />

      {/* The Mighty Baobab Silhouette */}
      <g fill="#1A1412">
        {/* Massive Trunk */}
        <path d="M275 290c-15-40-25-80-22-110 5-25 15-35 22-45 10-15 15-40 25-50 10 10 15 35 25 50 7 10 17 20 22 45 3 30-7 70-22 110h-50z" />
        {/* Heavy Roots */}
        <path d="M275 290c-25 5-55 10-85 18 30-10 60-15 85-18z M325 290c25 5 55 10 85 18-30-10-60-15-85-18z" stroke="#1A1412" strokeWidth="6" strokeLinecap="round" />
        {/* Spreading Crown & Branches */}
        <path d="M260 135c-35-15-70-15-100 5 25-15 60-12 85-2z" />
        <path d="M250 115c-30-30-65-35-100-25 30 0 65 10 85 30z" />
        <path d="M275 95c-15-35-35-60-70-70 25 15 45 40 55 70z" />
        <path d="M325 95c15-35 35-60 70-70-25 15-45 40-55 70z" />
        <path d="M350 115c30-30 65-35 100-25-30 0-65 10-85 30z" />
        <path d="M340 135c35-15 70-15 100 5-25-15-60-12-85-2z" />
      </g>

      {/* Stylized Storytelling Campfire with glowing embers */}
      <circle cx="300" cy="285" r="16" fill="#D35400" opacity="0.6" />
      <circle cx="300" cy="285" r="9" fill="#E5A93C" />
      <path d="M296 288c0-8 4-14 4-14s4 6 4 14c0 4-2 6-4 6s-4-2-4-6z" fill="#FFF6D1" />
      <circle cx="293" cy="272" r="1.5" fill="#FFEAA7" />
      <circle cx="307" cy="268" r="1.2" fill="#FFEAA7" />
      <circle cx="301" cy="262" r="1" fill="#FFEAA7" />

      {/* Bottom Border: Malian Geometric Frieze */}
      <g stroke="#E5A93C" strokeWidth="1.5" opacity="0.75" fill="none">
        <path d="M0 312h600" />
        <path d="M10 312l5-5 5 5-5 5z M30 312l5-5 5 5-5 5z M50 312l5-5 5 5-5 5z M530 312l5-5 5 5-5 5z M550 312l5-5 5 5-5 5z M570 312l5-5 5 5-5 5z" fill="#E5A93C" />
      </g>
    </svg>
  );
}

/**
 * Facile Category Illustration: The Agile Savannah Gazelle & Acacia.
 * Palette: Forest Green, African Gold, Warm Sand.
 */
export function GazelleIllustration({ className = 'w-full h-full' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Illustration de gazelle africaine pour le niveau facile"
    >
      <defs>
        <linearGradient id="facile-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1E5128" />
          <stop offset="60%" stopColor="#2D6A38" />
          <stop offset="100%" stopColor="#4A8B58" />
        </linearGradient>
      </defs>

      {/* Badge container */}
      <rect width="160" height="160" rx="20" fill="url(#facile-bg)" />

      {/* Decorative sun ring */}
      <circle cx="110" cy="50" r="32" fill="#E5A93C" opacity="0.35" />
      <circle cx="110" cy="50" r="20" fill="#E5A93C" opacity="0.9" />

      {/* Savannah landscape base */}
      <path d="M0 125c40-10 80-5 160-5v40H0v-35z" fill="#13361A" />
      <path d="M0 140c50-5 100-15 160-5v25H0v-20z" fill="#0C2411" />

      {/* Acacia tree silhouette */}
      <path
        d="M35 130c2-15 4-28 6-36 6-10 16-16 26-18-8 0-16 4-22 10-2-6 2-14 8-18-8 2-14 8-16 16-3-6-8-10-15-10 5 4 8 10 8 18-3 12-5 24-7 38h12z"
        fill="#E5A93C"
        opacity="0.8"
      />
      <ellipse cx="48" cy="74" rx="22" ry="5" fill="#E5A93C" opacity="0.7" />
      <ellipse cx="32" cy="84" rx="16" ry="4" fill="#E5A93C" opacity="0.6" />

      {/* Leaping Gazelle / Antelope in African Gold */}
      <g fill="#FFF5D6">
        {/* Head and elegant curved horns */}
        <path d="M112 72c-2-4-5-8-6-12 3-1 7 2 9 6l-3 6z" />
        <path d="M106 68c-4-8-7-18-5-26 3 4 5 12 7 18l-2 8z" fill="#E5A93C" />
        <path d="M108 67c-2-8-3-17-1-24 2 4 3 11 4 17l-3 7z" fill="#FFF5D6" />
        {/* Slender body in full leap */}
        <path d="M85 96c10-14 24-18 32-15 5 2 4 8-2 11-10 5-20 12-30 4z" />
        {/* Front legs extended */}
        <path d="M110 88l16 14-3 3-17-15z" />
        <path d="M106 91l12 18-3 2-13-18z" />
        {/* Back legs springing backward */}
        <path d="M88 94l-18 16 3 2 17-14z" />
        <path d="M84 97l-22 18 3 2 21-17z" />
      </g>

      {/* Bogolan Border dots */}
      <g fill="#E5A93C" opacity="0.8">
        <circle cx="16" cy="16" r="2.5" />
        <circle cx="28" cy="16" r="1.5" />
        <circle cx="40" cy="16" r="2.5" />
        <circle cx="144" cy="16" r="2.5" />
        <circle cx="132" cy="16" r="1.5" />
        <circle cx="120" cy="16" r="2.5" />
      </g>
    </svg>
  );
}

/**
 * Moyen Category Illustration: The Sacred Baobab & Golden Engraved Calabash.
 * Palette: African Gold, Terracotta Orange, Earth Brown.
 */
export function BaobabIllustration({ className = 'w-full h-full' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Illustration de baobab et calebasse d'or pour le niveau moyen"
    >
      <defs>
        <linearGradient id="moyen-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D35400" />
          <stop offset="55%" stopColor="#C0392B" />
          <stop offset="100%" stopColor="#4A2E1B" />
        </linearGradient>

        <radialGradient id="calabash-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFEAA7" />
          <stop offset="70%" stopColor="#E5A93C" />
          <stop offset="100%" stopColor="#D35400" />
        </radialGradient>
      </defs>

      {/* Container */}
      <rect width="160" height="160" rx="20" fill="url(#moyen-bg)" />

      {/* Golden aura */}
      <circle cx="80" cy="80" r="50" fill="#E5A93C" opacity="0.25" />

      {/* Ground */}
      <path d="M0 130c45-8 90-8 160 2v28H0v-30z" fill="#301A0E" />

      {/* Baobab in background silhouette */}
      <g fill="#4A2E1B" opacity="0.75">
        <path d="M72 130c-4-25-8-45-6-60 2-10 6-18 14-22 8 4 12 12 14 22 2 15-2 35-6 60h-16z" />
        <path d="M74 58c-12-8-24-12-36-4 10-6 22-4 32 2z M86 58c12-8 24-12 36-4-10-6-22-4-32 2z" />
        <path d="M80 50c-6-15-14-22-26-25 10 5 18 14 22 24z M80 50c6-15 14-22 26-25-10 5-18 14-22 24z" />
      </g>

      {/* Traditional Engraved Calabash (Calebasse africaine) */}
      <g>
        {/* Calabash Body */}
        <circle cx="80" cy="105" r="30" fill="url(#calabash-glow)" />
        <ellipse cx="80" cy="78" rx="14" ry="7" fill="#F39C12" stroke="#4A2E1B" strokeWidth="1.5" />
        <ellipse cx="80" cy="76" rx="10" ry="4" fill="#FFEAA7" />

        {/* Geometric Bogolan Engravings on the Calabash */}
        <path
          d="M60 105c6 8 14 12 20 12s14-4 20-12"
          stroke="#4A2E1B"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="3 3"
        />
        <path
          d="M66 95l4 4-4 4 M94 95l-4 4 4 4 M76 102l4-4 4 4-4 4z"
          stroke="#4A2E1B"
          strokeWidth="1.2"
          fill="#4A2E1B"
        />
        {/* Star wisdom sparkles rising */}
        <path d="M80 44l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#FFF" />
        <path d="M106 58l1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5-1.5-3.5-3.5-1.5 3.5-1.5z" fill="#FFEAA7" />
        <path d="M54 62l1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5-1.5-3.5-3.5-1.5 3.5-1.5z" fill="#FFEAA7" />
      </g>

      {/* Decorative corners */}
      <g stroke="#E5A93C" strokeWidth="1.5" fill="none">
        <path d="M12 24V12h12 M148 24V12h-12" />
        <circle cx="18" cy="18" r="1.5" fill="#E5A93C" />
        <circle cx="142" cy="18" r="1.5" fill="#E5A93C" />
      </g>
    </svg>
  );
}

/**
 * Difficile Category Illustration: The Mystical Dogon/Kanaga Mask.
 * Palette: Traditional Red, African Gold, Deep Ebony Black.
 */
export function DogonMaskIllustration({ className = 'w-full h-full' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Illustration de masque traditionnel Dogon pour le niveau difficile"
    >
      <defs>
        <linearGradient id="difficile-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#741B1B" />
          <stop offset="50%" stopColor="#962D2D" />
          <stop offset="100%" stopColor="#1A1412" />
        </linearGradient>
      </defs>

      {/* Container */}
      <rect width="160" height="160" rx="20" fill="url(#difficile-bg)" />

      {/* Spiritual radiating ring */}
      <circle cx="80" cy="80" r="46" stroke="#E5A93C" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
      <circle cx="80" cy="80" r="54" stroke="#E5A93C" strokeWidth="0.8" strokeDasharray="2 6" opacity="0.4" />

      {/* The Dogon Kanaga Cross / Celestial Structure */}
      <g stroke="#E5A93C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {/* Upper double crossbar (arms reaching heaven) */}
        <path d="M46 36h68 M46 36V26 M114 36V26" />
        {/* Lower double crossbar (arms reaching earth) */}
        <path d="M46 54h68 M46 54v10 M114 54v10" />
        {/* Central vertical spine */}
        <path d="M80 20v50" />
      </g>

      {/* Carved Wooden Face / Mask */}
      <g fill="#1A1412" stroke="#E5A93C" strokeWidth="1.5">
        {/* Mask Outlines */}
        <path
          d="M62 70c0-4 8-8 18-8s18 4 18 8v38c0 14-8 24-18 28-10-4-18-14-18-28V70z"
          fill="#1A1412"
        />

        {/* Deep Eyes (rectangles of ancestral vision) */}
        <rect x="68" y="82" width="8" height="12" rx="2" fill="#E5A93C" />
        <rect x="84" y="82" width="8" height="12" rx="2" fill="#E5A93C" />

        {/* Slender nose ridge */}
        <path d="M80 78v24" stroke="#FFF" strokeWidth="1.5" />

        {/* Traditional Chevrons on Cheeks */}
        <path d="M66 102l5 4-5 4 M94 102l-5 4 5 4" stroke="#962D2D" strokeWidth="1.5" fill="none" />

        {/* Mouth of Wisdom */}
        <rect x="74" y="116" width="12" height="4" rx="2" fill="#E5A93C" stroke="none" />
      </g>

      {/* Sacred geometric dots and diamonds */}
      <g fill="#E5A93C">
        <polygon points="80,64 83,69 80,74 77,69" />
        <circle cx="80" cy="130" r="2.5" />
        <circle cx="30" cy="30" r="2" opacity="0.8" />
        <circle cx="130" cy="30" r="2" opacity="0.8" />
        <circle cx="30" cy="130" r="2" opacity="0.8" />
        <circle cx="130" cy="130" r="2" opacity="0.8" />
      </g>
    </svg>
  );
}
