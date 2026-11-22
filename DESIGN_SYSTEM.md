# DESIGN_SYSTEM.md — Zirin MVP V2
Statut : charte de travail, palette provisoire à valider avec le nouveau logo.

## 1. Direction artistique
Une expérience culturelle, chaleureuse, immersive, **minimaliste et non flashy**.
Inspirations : livres de contes, terre et artisanat ouest-africain, stickers animés, interface éditoriale contemporaine.
Éviter les interfaces surchargées, les pavés de texte hors lecture, les gradients excessifs, les effets gratuits et les composants incohérents.

## 2. Palette provisoire
| Token | Couleur | Usage |
|---|---|---|
| `primary` | `#E87924` | CTA et éléments actifs |
| `brown` | `#8B451F` | Identité et titres |
| `sand` | `#F6E8D2` | Surfaces secondaires |
| `ivory` | `#FFF9F0` | Fond de lecture |
| `ink` | `#33251D` | Texte |
Les nuances ne sont **pas définitivement approuvées**. Vérifier le contraste texte/fond ; ne pas utiliser automatiquement l'orange comme texte sur fond clair.

## 3. Typographie
Choisir une paire de polices lisibles : une police expressive pour les titres, une police sobre pour le corps.
Familles exactes à valider. Taille du texte de lecture confortable, largeur de ligne maîtrisée, interlignage généreux.

## 4. Hiérarchie et microcopy
- Un objectif principal par écran et un CTA dominant lorsque pertinent.
- Titres courts ; sous-titres brefs ; éviter les paragraphes marketing longs.
- Ne jamais tronquer le contenu narratif d'un conte dans sa page de lecture.
- Pas d'accumulation de badges, icônes et boutons sans fonction.
- Libellés simples, compréhensibles pour les enfants et les accompagnants.

## 5. Layout
- Mobile-first ; responsive tablette et desktop.
- Desktop : expérience immersive de hauteur de viewport, dock visible et navigation sans scroll global dans les écrans principaux.
- Les zones de lecture longues **défilent localement** ; sur mobile, autoriser le défilement naturel.
- Espacements cohérents via échelle Tailwind ; grilles et cartes aérées.
- Aucune coupure de contenu causée par un `100vh` rigide.

## 6. Composants
- `AppDock` : quatre destinations, état actif, focus clavier, libellés.
- `DockCharacter` : stickman/sticker minimaliste, tête ronde, corps et membres stylisés.
- `PageTransition` : transition de page de livre légère et réversible.
- `TaleCard` : illustration, titre, résumé bref, cible tactile accessible.
- `TaleCarousel` : navigation accessible, pause au survol/focus ; éviter le mouvement automatique incessant.
- `SearchField`, `FilterChips`, `DifficultySelector`, `RiddleChoice`, `ResultPanel`, `StoryReader`, `ContactFormDemo`.
- États hover, focus, disabled, loading, empty et error cohérents.

## 7. Personnage animé
Accueil : personnage assis. Devinettes : il se lève et vise une cible. Contes : il s'assoit et ouvre un livre. Contact : il tend un stylo.
Ces scènes doivent paraître appartenir au **même personnage**, avec transitions simples.
Préférer SVG/CSS et animation légère ; Three.js n'est pas nécessaire par défaut.
Prévoir `prefers-reduced-motion` : personnage statique, transitions instantanées.

## 8. Écrans
**Accueil** : accroche « Les contes de notre enfance reprennent vie. », description très courte, deux CTA, décor discret.
**Devinettes** : niveau à gauche / question et choix à droite sur desktop ; ordre vertical sur mobile. Résultat immédiat, explication et suite.
**Contes** : titre, recherche, filtres et deux carrousels de cartes, sans surcharge.
**Détail conte** : couverture et texte organisé en sections ; illustrations contextuelles ; commandes audio seulement si média disponible ; lecture prioritaire.
**Contact/Suggestions** : formulaire épuré, explicitement démonstratif tant qu'aucun service n'envoie les données.

## 9. Accessibilité et performance
Contraste contrôlé, labels explicites, focus visible, navigation clavier, zones tactiles confortables, images optimisées et textes alternatifs.
Animations non bloquantes, performance mobile prioritaire, aucune dépendance lourde injustifiée.

## 10. Gouvernance
Toute modification de palette, typographie, dock, composants ou animation doit être répercutée dans ce fichier et, si structurante, dans `ARCHITECTURE.md` et `CHANGELOG.md`.
