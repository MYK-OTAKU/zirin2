# Zirin — Architecture cible du MVP (proposition)
## 1. Principes
SPA frontend uniquement, données locales JSON, séparation des responsabilités. L'architecture prépare l'évolution sans installer prématurément un backend.

## 2. Choix à valider
- Framework : **React + Vite + TypeScript** recommandé pour un prototype SPA léger ; alternative : Angular si souhaité.
- Styles : **Tailwind CSS**, explicitement retenu.
- Routing : bibliothèque adaptée au framework choisi.
- Animation : CSS natif d'abord ; animation JS légère si les tests le justifient. Ne pas imposer Three.js pour un dock décoratif.
- Validation de données : schéma runtime (bibliothèque à choisir).
Aucun choix non validé n'est présenté comme définitif.

## 3. Arborescence suggérée
```text
src/
  app/                 # bootstrap, router, providers
  pages/               # accueil, devinettes, contes, detail, contact
  features/
    riddles/           # logique de session, questions, résultat
    tales/             # recherche, filtres, lecture, audio facultatif
    suggestions/       # présentation et canal éventuel
  components/
    ui/                # boutons, champs, cartes, carrousels
    navigation/        # dock, personnage, transitions
  domain/              # modèles, règles métier pures
  data/
    json/              # contenu de démonstration
    repositories/      # interfaces et adaptateurs JSON
    schemas/           # validation de contenu
  styles/              # tokens et styles globaux
  assets/              # images et illustrations autorisées
  tests/
docs/                  # documentation vivante
```

## 4. Flux
Vue → cas d'usage/feature → interface de repository → adaptateur JSON → contenu local.
Ne jamais coupler les composants aux chemins JSON : le remplacement ultérieur par une API doit rester localisé.

## 5. Modèles conceptuels
- Tale : id, slug, title, summary, category, ageRange, cover, sections[], optionalAudio.
- TaleSection : id, text, optionalIllustration, order.
- Riddle : id, difficulty, prompt, options[4], correctOptionId, explanation, optionalHint.
- RiddleSession : niveau choisi, ordre des questions, réponses de session, compteur facultatif.
Ce sont des **propositions de modèle**, pas un schéma figé.

## 6. Décisions d'UX techniques
- Mobile-first, zones tactiles confortables.
- Desktop : écran immersif, lecture longue dans conteneur scrollable.
- Navigation accessible sans animations, prise en charge de `prefers-reduced-motion`.
- Images dimensionnées et chargées progressivement ; pas de bibliothèque lourde sans bénéfice mesuré.
- Lecteur audio conditionnel : masquer ou désactiver honnêtement si aucun fichier n'est disponible.

## 7. Migration post-MVP
- Remplacer adaptateur JSON par API, conserver interfaces de domaine.
- Ajouter identité, permissions et stockage seulement après cadrage métier.
- Prévoir l'historique de lecture/tentatives pour la personnalisation, avec consentement et minimisation des données.


## Décision technique V2 — validée
Le socle frontend est **React + Vite + TypeScript + Tailwind CSS**. L'architecture reste une SPA à données JSON locales, avec séparation `domain / features / repositories / UI`.
Les maquettes interactives sont construites directement dans ce socle, sans outil de maquettage externe obligatoire.

### Implémentation Phase 1 (21 novembre 2026)
- **Bundler & Styles** : Vite 6 + `@tailwindcss/vite` (Tailwind CSS v4) avec tokens centralisés via `@theme` dans `src/styles/tokens.css`.
- **Routing** : `react-router-dom` v7 (`BrowserRouter`) pour les 4 routes principales (`/`, `/devinettes`, `/contes`, `/contact`) et redirection de repli vers `/`.
- **Icônes** : `lucide-react` exclusivement pour les icônes d'interface ; SVG dédié (`DockCharacter`) pour la mascotte stickman.
- **Typographie provisoire** : `Fraunces` (titres) et `Plus Jakarta Sans` (corps), chargées via Google Fonts avec polices système de repli.
- **Résilience** : `ErrorBoundary` global autour de l'application.

### Préparation de l'envoi d'e-mails post-MVP
Créer plus tard une interface de service `SuggestionSubmissionService` sans l'implémenter réellement dans le MVP.
Un service tiers d'envoi de courriels doit être appelé **côté serveur** pour protéger les clés API, valider les entrées, limiter le spam et journaliser les erreurs sans données sensibles.
