import type { SVGProps } from 'react';

/**
 * Authentic Bogolan geometric background pattern (Malian mud cloth).
 * Uses traditional symbols: "Bwamba" chevron rows, clay dots, and river zigzags.
 */
export function BogolanBackground({
  className = 'text-zirin-brown/10',
}: {
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="bogolan-grid"
            width="64"
            height="64"
            patternUnits="userSpaceOnUse"
          >
            {/* Fine broken lines */}
            <path
              d="M0 16h18 M26 16h12 M46 16h18 M0 48h18 M26 48h12 M46 48h18"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Chevrons and triangles */}
            <path
              d="M16 0l8 8-8 8 M48 0l8 8-8 8 M16 32l8 8-8 8 M48 32l8 8-8 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Traditional clay dots */}
            <circle cx="8" cy="8" r="1.5" fill="currentColor" />
            <circle cx="40" cy="8" r="1.5" fill="currentColor" />
            <circle cx="24" cy="24" r="1.5" fill="currentColor" />
            <circle cx="56" cy="24" r="1.5" fill="currentColor" />
            <circle cx="8" cy="40" r="1.5" fill="currentColor" />
            <circle cx="40" cy="40" r="1.5" fill="currentColor" />
            <circle cx="24" cy="56" r="1.5" fill="currentColor" />
            <circle cx="56" cy="56" r="1.5" fill="currentColor" />
            {/* Small diamond accents */}
            <path
              d="M32 16l3 3-3 3-3-3z M32 48l3 3-3 3-3-3z"
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bogolan-grid)" />
      </svg>
    </div>
  );
}

/**
 * Malian geometric decorative frieze (Bambara textile & pottery border).
 */
export function MalianFrieze({
  className = 'text-zirin-primary/40',
}: {
  className?: string;
}) {
  return (
    <div className={`flex w-full items-center overflow-hidden py-1 ${className}`} aria-hidden="true">
      <svg
        className="h-3 w-full"
        preserveAspectRatio="repeat-x"
        viewBox="0 0 120 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <pattern id="malian-frieze-pattern" width="40" height="12" patternUnits="userSpaceOnUse">
          {/* Linked diamonds */}
          <path
            d="M0 6l6-5 6 5-6 5z M12 6l6-5 6 5-6 5z M24 6l6-5 6 5-6 5z M36 6l4-3.3"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
          />
          {/* Center dots */}
          <circle cx="6" cy="6" r="1.2" fill="currentColor" />
          <circle cx="18" cy="6" r="1.2" fill="currentColor" />
          <circle cx="30" cy="6" r="1.2" fill="currentColor" />
          {/* Top/bottom accent marks */}
          <path d="M6 0v2 M18 0v2 M30 0v2 M6 10v2 M18 10v2 M30 10v2" stroke="currentColor" strokeWidth="1" />
        </pattern>
        <rect width="100%" height="12" fill="url(#malian-frieze-pattern)" />
      </svg>
    </div>
  );
}

/**
 * Adinkra Nyansapo (The Knot of Wisdom) symbol.
 * Universal African symbol of intelligence, ingenuity, wisdom and patience.
 */
export function AdinkraNyansapo({
  className = 'h-6 w-6 text-zirin-gold-warm',
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      {/* Central stylized wisdom knot loops */}
      <path
        d="M32 10c-6.6 0-12 5.4-12 12 0 4.1 2.1 7.7 5.2 9.8-5.3 1.9-9.2 6.9-9.2 12.8 0 7.4 6 13.4 13.4 13.4 5.9 0 10.9-3.9 12.8-9.2 1.9 5.3 6.9 9.2 12.8 9.2 7.4 0 13.4-6 13.4-13.4 0-5.9-3.9-10.9-9.2-12.8 3.1-2.1 5.2-5.7 5.2-9.8 0-6.6-5.4-12-12-12-4.1 0-7.7 2.1-9.8 5.2-2.1-3.1-5.7-5.2-9.8-5.2zm0 6c3.3 0 6 2.7 6 6 0 1.9-.9 3.6-2.3 4.7l-3.7 2.8-3.7-2.8c-1.4-1.1-2.3-2.8-2.3-4.7 0-3.3 2.7-6 6-6zm-10.6 22c2.1-1.6 4.7-2.6 7.6-2.8v6.8l-4.8 3.6c-1.7-1.3-2.8-3.3-2.8-5.6 0-1.1.3-2.1.8-3l-.8 1zm21.2 0c.5.9.8 1.9.8 3 0 2.3-1.1 4.3-2.8 5.6l-4.8-3.6v-6.8c2.9.2 5.5 1.2 7.6 2.8l-.8-1zm-10.6 6.8l4.8 3.6c-1.3 1.7-3.3 2.8-5.6 2.8-2.3 0-4.3-1.1-5.6-2.8l4.8-3.6c.5.4 1 .4 1.6 0z"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}

/**
 * Malian Toron pillar accent (inspired by the Sudano-Sahelian architecture of Djenné).
 */
export function MalianToronAccent({ className = 'text-zirin-terracotta' }: { className?: string }) {
  return (
    <svg
      className={`h-4 w-12 ${className}`}
      viewBox="0 0 48 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2 14h44 M8 14V4l4-2 4 2v10 M28 14V4l4-2 4 2v10 M12 6h8 M32 6h8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="14" cy="2" r="1.5" fill="currentColor" />
      <circle cx="34" cy="2" r="1.5" fill="currentColor" />
    </svg>
  );
}
