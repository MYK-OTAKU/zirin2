import { Link } from 'react-router-dom';

interface ZirinBrandProps {
  className?: string;
}

/**
 * Provisional typographic brand mark for Zirin.
 * To be replaced once the final logo is approved (see CAHIER_DES_CHARGES.md).
 */
export function ZirinBrand({ className = '' }: ZirinBrandProps) {
  return (
    <Link
      to="/"
      aria-label="Zirin — Retour à l'accueil"
      className={`group inline-flex items-center gap-2.5 rounded-full py-1 pr-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zirin-primary ${className}`}
    >
      <span
        aria-hidden="true"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-zirin-brown text-zirin-ivory shadow-sm transition-transform duration-200 group-hover:scale-105"
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="16" cy="11" r="4.5" fill="#E87924" />
          <path
            d="M7 22.5C10 19.5 13 18.5 16 18.5C19 18.5 22 19.5 25 22.5"
            stroke="#FFF9F0"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M11 25.5C12.8 24.3 14.4 23.8 16 23.8C17.6 23.8 19.2 24.3 21 25.5"
            stroke="#F6E8D2"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-zirin-brown">
        Zirin
      </span>
    </Link>
  );
}
