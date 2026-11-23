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
        className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-zirin-brown/15 bg-zirin-ivory shadow-sm transition-transform duration-200 group-hover:scale-105"
      >
        <img
          src={`${import.meta.env.BASE_URL}images/zirin-logo.jpg`}
          alt=""
          className="h-full w-full object-cover"
        />
      </span>
      <span className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-zirin-brown">
        Zirin
      </span>
    </Link>
  );
}
