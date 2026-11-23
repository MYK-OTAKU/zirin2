# Zirin — Changelog
Toutes les évolutions effectives du produit sont consignées ici ; ne pas confondre décision de cadrage et fonctionnalité livrée.

## [Unreleased] — 2026-11-21
### Ajouté
- Intégration du corpus local de 15 contes, avec validation de structure et de slugs avant affichage.
- Catalogue avec recherche, filtres par catégorie et âge, compte de résultats et état vide.
- Pages de lecture par slug avec récit complet, morale, indication éditoriale et absence honnête d'audio non fourni.
### Cadrage
- Vision et périmètre du MVP de démonstration définis.
- Parcours : accueil, devinettes, catalogue, détail d'un conte, contact/suggestions.
- Accroche validée : « Les contes de notre enfance reprennent vie. »
- Architecture documentaire initiale et backlog post-MVP créés.
### À développer
- Aucune fonctionnalité de l'application n'est déclarée implémentée à ce stade.


## [0.4.0 — Collection d'illustrations, Boutons & Ambiance sonore africaine] — 2026-11-22
### Ajouté
- Collection d'illustrations originales dans `src/assets/images/devinettes/` : Bannière village malien et cases en terre (`banniere.jpg`), Enfants sous l'arbre pour le niveau Facile (`facile.jpg`), Scène de réflexion pour le niveau Moyen (`moyen.jpg`), Ancien sage pour le niveau Difficile (`difficile.jpg`), Célébration festive (`reussite.jpg`), avec fallback vectoriel animé (`FeedbackAfricanIllustrations.tsx`).
- Refonte complète des boutons avec identité africaine :
  - Bouton « Commencer » : Fond terre cuite, texte blanc, motif africain discret, animation et élévation au clic.
  - Bouton « Vérifier ma réponse » : Fond vert profond, icône de validation, animation de pression au clic.
  - Bouton « Voir la réponse » : Jaune or, icône œil, apparition progressive de la solution.
  - Bouton « Devinette suivante » : Fond orange, icône flèche, transition latérale.
  - Bouton « Rejouer » : Vert profond, icône renouvellement et animation de rotation.
- Refonte des cartes de niveaux selon le cahier des charges :
  - Facile : Vert naturel, enfants africains, icône Sourire (`Smile`), texte « Pour commencer en douceur ».
  - Moyen : Orange et jaune, personnage pensif, icône Cerveau (`Brain`), texte « Mets ton intelligence à l'épreuve ».
  - Difficile : Rouge profond et noir, sage africain, icône Ampoule (`Lightbulb`), texte « Réservé aux grands esprits ».
- Moteur d'ambiance sonore Web Audio API (`africanAudio.ts`) avec synthèse balafon, djembé et kora (son de démarrage, validation bonne réponse, feedback mauvaise réponse, triomphe de fin de niveau) et bouton d'activation/désactivation du son.

## [0.3.0 — Refonte Direction Artistique Ouest-Africaine & Malienne] — 2026-11-22
### Ajouté
- Refonte visuelle complète de la rubrique Devinettes inspirée du patrimoine culturel du Mali et d'Afrique de l'Ouest.
- Palette de couleurs authentiques : Orange terre cuite, Jaune or africain, Vert profond, Rouge traditionnel, Brun terre, Beige sable, Noir ébène.
- Composants de motifs décoratifs vectoriels : motifs textiles Bogolan (`BogolanBackground`), frises géométriques bambara (`MalianFrieze`), contreforts de Djenné (`MalianToronAccent`), symbole Adinkra Nyansapo de la sagesse (`AdinkraNyansapo`).
- 4 illustrations originales haute définition générées sur-mesure (Héros veillée sous baobab, Gazelle bondissante pour le niveau Facile, Calebasse d'or gravée pour le niveau Moyen, Masque cérémoniel Dogon Kanaga pour le niveau Difficile).
- Design immersif de la carte de devinette centrale et de l'écran de résultats inspiré des veillées traditionnelles et cours royales du Mandé.

## [0.2.0 — Module Devinettes : Interface, jeu interactif & persistance] — 2026-11-22
### Ajouté
- Hub moderne pour les Devinettes africaines (`RiddleHubView`) avec en-tête (« Devinettes africaines », sous-titre, badge 45 devinettes), 3 cartes de catégories (Facile: 1 pt, Moyen: 2 pts, Difficile: 3 pts) et section de progression globale (réussies, restantes, score, complétion).
- Jeu interactif par champ de saisie (`RiddlePlayCard`) avec boutons « Vérifier ma réponse », « Voir la réponse », navigation « Devinette précédente » et « Devinette suivante ».
- Moteur de comparaison sémantique et tolérante (`answerMatcher.ts`) gérant casse, accents, ponctuation, articles définis/indéfinis, alias culturels et distance d'édition.
- Système de score strict sans doublons par question et respect des points par niveau (1, 2, 3 pts).
- Écran de résultats complet (`RiddleResultsView`) avec 4 statistiques clés, message adapté au taux de réussite, accordéon des réponses et les trois boutons obligatoires (« Rejouer », « Choisir un autre niveau », « Retour aux devinettes »).
- Système de sauvegarde locale (`riddleStorage.ts`) dans `localStorage` conservant le meilleur score, les parties jouées, les devinettes résolues, la reprise de session en cours et bouton de réinitialisation avec confirmation.
- Suite de tests de validation (`src/tests/verifyRiddlesModule.cjs`).

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
