# Zirin — Changelog
Toutes les évolutions effectives du produit sont consignées ici ; ne pas confondre décision de cadrage et fonctionnalité livrée.

## [Unreleased] — 2026-11-21
### Cadrage
- Vision et périmètre du MVP de démonstration définis.
- Parcours : accueil, devinettes, catalogue, détail d'un conte, contact/suggestions.
- Accroche validée : « Les contes de notre enfance reprennent vie. »
- Architecture documentaire initiale et backlog post-MVP créés.
### À développer
- Aucune fonctionnalité de l'application n'est déclarée implémentée à ce stade.


## [0.1.0 — Phase 1 : Socle et Accueil] — 2026-11-21
### Ajouté
- Initialisation du socle React 19 + Vite 6 + TypeScript strict + Tailwind CSS v4 + Lucide React + React Router.
- Configuration ESLint (TypeScript + React Hooks + React Refresh) et vérification de build (`tsc -b && vite build`).
- Design system centralisé (`src/styles/tokens.css`, `src/styles/global.css`) avec palette provisoire Zirin, focus visible et support `prefers-reduced-motion`.
- Architecture modulaire initiale (`app/`, `pages/`, `components/ui/`, `components/navigation/`, `components/layout/`, `domain/`, `styles/`).
- Première maquette interactive et responsive de la page d'accueil (`HomePage`) : identité Zirin provisoire, accroche validée, description courte, CTA vers Contes et Devinettes, fond illustratif inspiré de l'univers culturel malien et ouest-africain.
- Dock de navigation flottant (`AppDock`) avec 4 destinations (Accueil, Devinettes, Contes, Contact), icônes Lucide React, états actifs et accessibilité clavier.
- Mascotte stickman SVG (`DockCharacter`) avec 4 scènes contextuelles (assis à une table, archer, lecteur, stylo tendu) et repli statique sous `prefers-reduced-motion`.
- Transition légère entre vues (`PageTransition`), gestion globale d'erreurs (`ErrorBoundary`) et écrans d'attente honnêtes pour les pages non encore développées.

## [Documentation V2] — 2026-11-21
### Décisions
- Stack React + Vite + TypeScript + Tailwind CSS confirmée.
- Corpus cible de 20 devinettes et 15 contes fixé.
- Personnage du dock orienté stickman/sticker.
- Maquettes à développer directement en React.
- Formulaire Contact/Suggestions limité à une démonstration visuelle.
- Envoi d'e-mails réel reporté après le MVP.
### Documentation
- Ajout de `DESIGN_SYSTEM.md`.
- Aucun développement applicatif n'est déclaré livré.
