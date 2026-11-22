import type { CharacterScene } from '../../domain/navigation';

interface DockCharacterProps {
  scene: CharacterScene;
  label: string;
}

/**
 * Minimalist stickman/pictogram mascot for the Zirin navigation dock.
 * Four contextual poses sharing one consistent silhouette:
 * - seated: Accueil (assis à une table)
 * - archer: Devinettes (debout visant une cible)
 * - reader: Contes (assis ouvrant un livre)
 * - writer: Contact (tendant un stylo)
 */
export function DockCharacter({ scene, label }: DockCharacterProps) {
  return (
    <div
      className="zirin-character-animate flex h-11 w-14 shrink-0 items-center justify-center rounded-full bg-zirin-sand/90 ring-1 ring-zirin-brown/15 transition-colors duration-200"
      role="img"
      aria-label={label}
      title={label}
    >
      <svg
        viewBox="0 0 56 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-9 w-12"
        aria-hidden="true"
      >
        {scene === 'seated' && (
          <g stroke="#33251D" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            {/* Table */}
            <line x1="28" y1="30" x2="48" y2="30" stroke="#8B451F" strokeWidth="2.4" />
            <line x1="33" y1="30" x2="33" y2="38" stroke="#8B451F" strokeWidth="2" />
            <line x1="44" y1="30" x2="44" y2="38" stroke="#8B451F" strokeWidth="2" />
            {/* Stickman seated */}
            <circle cx="19" cy="13" r="4.5" fill="#E87924" stroke="#33251D" strokeWidth="2" />
            <path d="M19 18V29" />
            <path d="M19 29H27V37" />
            <path d="M19 22L29 27" />
            {/* Small cup on table */}
            <path d="M36 26H41V29.5H36V26Z" fill="#E87924" stroke="#8B451F" strokeWidth="1.5" />
          </g>
        )}

        {scene === 'archer' && (
          <g stroke="#33251D" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            {/* Stickman standing */}
            <circle cx="15" cy="12" r="4.5" fill="#E87924" stroke="#33251D" strokeWidth="2" />
            <path d="M15 17V29" />
            <path d="M15 29L11 38" />
            <path d="M15 29L20 38" />
            {/* Arms drawing bow */}
            <path d="M15 21L26 20" />
            <path d="M15 21L10 20" />
            {/* Bow & arrow */}
            <path d="M25 13C29 17 29 23 25 27" stroke="#8B451F" strokeWidth="2.2" />
            <line x1="19" y1="20" x2="34" y2="20" stroke="#E87924" strokeWidth="1.8" />
            <path d="M32 18L35 20L32 22" stroke="#E87924" strokeWidth="1.8" />
            {/* Target */}
            <circle cx="46" cy="20" r="6" stroke="#8B451F" strokeWidth="2" fill="#FFF9F0" />
            <circle cx="46" cy="20" r="2.3" fill="#E87924" stroke="none" />
          </g>
        )}

        {scene === 'reader' && (
          <g stroke="#33251D" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            {/* Stickman seated reading */}
            <circle cx="20" cy="12" r="4.5" fill="#E87924" stroke="#33251D" strokeWidth="2" />
            <path d="M20 17V29" />
            <path d="M20 29H29L31 37" />
            <path d="M20 29L15 37" />
            <path d="M20 21L28 24" />
            {/* Open book */}
            <path
              d="M27 25C30 22.5 33 22.5 35 24.5C37 22.5 40 22.5 43 25V31C40 29 37 29 35 30.5C33 29 30 29 27 31V25Z"
              fill="#FFF9F0"
              stroke="#8B451F"
              strokeWidth="2"
            />
            <line x1="35" y1="24.5" x2="35" y2="30.5" stroke="#8B451F" strokeWidth="1.6" />
          </g>
        )}

        {scene === 'writer' && (
          <g stroke="#33251D" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            {/* Stickman offering pen */}
            <circle cx="19" cy="12" r="4.5" fill="#E87924" stroke="#33251D" strokeWidth="2" />
            <path d="M19 17V29" />
            <path d="M19 29L15 38" />
            <path d="M19 29L24 38" />
            <path d="M19 22L13 26" />
            <path d="M19 21L32 19" />
            {/* Pen */}
            <path d="M32 19L44 13" stroke="#8B451F" strokeWidth="2.6" />
            <path d="M44 13L46 12" stroke="#E87924" strokeWidth="2.6" />
            {/* Subtle spark */}
            <circle cx="46" cy="21" r="1.5" fill="#E87924" stroke="none" />
          </g>
        )}
      </svg>
    </div>
  );
}
