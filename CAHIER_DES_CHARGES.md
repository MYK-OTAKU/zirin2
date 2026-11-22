# Zirin — Cahier des charges fonctionnel (MVP)
Statut : cadrage initial — 21 novembre 2026. Ce document distingue les décisions confirmées des propositions à valider.

## 1. Vision et objectif
Zirin est une plateforme culturelle de contes et devinettes d'inspiration principalement malienne et africaine. Le premier livrable est une **maquette interactive responsive**, crédible, navigable et rapide à produire, et non une plateforme complète. Accroche validée : **« Les contes de notre enfance reprennent vie. »**

## 2. Public et accès
- Public : toute personne disposant de l'URL, avec une attention particulière à l'expérience des enfants.
- MVP : un seul profil fonctionnel, **visiteur anonyme** ; aucune inscription, authentification, base de données, API métier ou administration.
- Les contenus sont chargés depuis des fichiers JSON locaux. Aucune donnée personnelle n'est requise.

## 3. Périmètre MVP
### 3.1 Accueil
- Une introduction courte, accroche validée et CTA vers les contes et les devinettes.
- Visuel immersif sobre, fond illustré éventuellement flouté.
- Dock de navigation commun : Accueil, Devinettes, Contes, Contact/Suggestions.
- Personnage animé associé aux quatre destinations : assis à une table sur l'accueil ; archer visant une cible sur les devinettes ; lecteur ouvrant un livre sur les contes ; personnage tendant un stylo sur le contact.
- Transition entre pages inspirée d'une page de livre, avec repli accessible et sans ralentir la navigation.

### 3.2 Devinettes
- Choix d'un niveau de difficulté (niveaux exacts à définir).
- Présentation ludique, inspirée d'une machine de jeu ; disposition desktop avec contrôles et niveau d'un côté, question de l'autre.
- Réponse par **quatre propositions plausibles**, pas de réponse libre.
- Les propositions ne sont pas forcément visibles immédiatement : réflexion d'abord, indice facultatif et affichage des choix ensuite (orientation retenue, détails à tester).
- L'utilisateur doit sélectionner une proposition pour voir le résultat ; pas de révélation directe.
- Après validation : feedback immédiat juste/faux, bonne réponse et courte explication ; bouton « Devinette suivante ».
- À la fin de la sélection : message de fin et possibilité de recommencer.
- Compteur de bonnes réponses uniquement en session : proposition non encore définitivement validée.
- Cas limites : aucun contenu pour un niveau, choix déjà validé, indice absent, dernière devinette, contenu JSON invalide.

### 3.3 Catalogue de contes
- Grand titre, recherche, filtres d'âge et de catégorie/type.
- Deux carrousels horizontaux de cartes : contenus mis en avant/populaires et autres contes ; ordre exact et critères à confirmer.
- Carte : illustration, titre, description courte ; clic vers une **page de détail**.
- État vide pour recherche sans résultat ; gestion des images manquantes.

### 3.4 Détail d'un conte
- Page distincte du catalogue, accessible depuis une carte.
- Titre, illustration, introduction et lecture textuelle agréable ; illustrations contextuelles par section lorsque disponibles.
- Inspiration d'ergonomie YouTube Music/Spotify, **sans mettre l'audio au premier plan**.
- Permettre lecture seule, écoute seule ou lecture et écoute ensemble lorsque l'audio est fourni. Pour une maquette, des contenus audio de démonstration peuvent être optionnels : ne pas simuler un audio inexistant.
- La synchronisation mot à mot / section par section, les langues et voix multiples restent **post-MVP** ; l'interface doit pouvoir les accueillir plus tard.
- Lecture longue : défilement **dans la zone de lecture** sur ordinateur, pas de scroll global imposé.
- Cas limites : audio absent, sections sans image, histoire longue, lecture audio impossible, URL de conte inconnue.

### 3.5 Contact / Suggestions
- Écran public de contact et proposition de contes ou devinettes.
- **Canal de réception à définir** : le MVP sans backend ne doit pas promettre d'enregistrer ou d'envoyer un formulaire. Pour la maquette, présenter un formulaire démonstratif clairement signalé, ou un lien mailto si une adresse est fournie et validée.
- Contrôles de champs, états d'erreur et de succès uniquement lorsque l'action est réellement opérationnelle.

## 4. UX et design
- **Mobile-first**, responsive, Tailwind CSS.
- Sur desktop, expérience immersive occupant idéalement le viewport ; éviter le scroll global pour les quatre écrans principaux. Le détail du conte peut défiler localement.
- Sur mobile, défilement vertical autorisé selon la lisibilité ; ne pas forcer 100vh au détriment de l'accessibilité.
- Design system : palette, typographies, espacements, rayons, ombres, états, icônes et composants réutilisables. **Couleurs exactes non validées** ; prévoir 2–3 propositions en harmonie avec le logo existant.
- Le logo actuel reste la référence tant qu'une alternative n'est pas explicitement approuvée.
- Contrastes suffisants, navigation clavier, focus visible, tailles tactiles adaptées, préférences de réduction des animations.

## 5. Qualité du contenu
- Devinettes maliennes et africaines stimulantes, sans réponses triviales ni distracteurs absurdes.
- Contes culturellement ancrés, riches en narration et en enseignements ; éviter le contenu générique.
- Vérifier origine, qualité éditoriale, droits d'auteur, droits des images et des voix. Les adaptations protégées ne doivent pas être recopiées sans autorisation.
- Chaque contenu doit avoir un identifiant stable, un niveau/catégorie ou une tranche d'âge cohérente, et des textes soignés.

## 6. Hors périmètre MVP — backlog futur
- Comptes utilisateurs, connexion email et Google.
- Points, progression, historique de lecture, historique de devinettes.
- Recommandation personnalisée : contenus non consultés/non tentés, priorité aux contenus récemment validés et publiés.
- Administration : création, modification, validation, publication, archivage de contenus et paramètres du site.
- Gestion de plusieurs langues, versions audio, voix et synchronisation texte-audio.
- Base de données, backend et workflow éditorial complet.

## 7. Règles métier et validation
- Une devinette validée ne peut plus recevoir un second choix dans la même tentative ; le résultat est explicite.
- Une proposition correcte exactement par devinette ; les autres restent crédibles.
- Aucune progression durable ni points personnels dans le MVP.
- Les filtres et la recherche n'affichent que des contenus disponibles et cohérents.
- Les données JSON sont considérées comme non fiables : validation de schéma au chargement, état d'erreur lisible.
- Aucun envoi de suggestions fictif ne doit être présenté comme réel.

## 8. Critères d'acceptation de la maquette
- Navigation opérationnelle entre les quatre rubriques et le détail d'un conte.
- Mise en page adaptée au mobile, à la tablette et au desktop.
- Recherche et filtres de contes fonctionnels sur données locales.
- Choix du niveau et parcours complet d'une devinette avec résultat.
- Lecture textuelle fonctionnelle ; audio seulement si une ressource réelle est disponible.
- Absence de débordements majeurs, console sans erreurs critiques, focus clavier visible.
- Documentation à jour et limites de la démonstration explicitement indiquées.

## 9. Hypothèses / questions ouvertes
- Logo et fichiers de marque à intégrer ; palette finale non fixée.
- Choix précis du framework SPA, bibliothèques d'animation et polices.
- Nombre initial de contes et de devinettes, niveaux, catégories et tranches d'âge.
- Disponibilité d'enregistrements audio et d'illustrations sous licence.
- Moyen concret de réception des suggestions sans backend.
- Stratégie de déploiement et URL cible.


## Décisions complémentaires — V2 (21 novembre 2026)
- Stack **validée** : React + Vite + TypeScript + Tailwind CSS.
- Corpus initial : **20 devinettes** et **15 contes** dans des fichiers JSON locaux.
- Le personnage du dock est un **stickman / personnage pictogramme**, style emoji ou sticker, à tête ronde et formes simples, avec animations contextuelles légères.
- Les maquettes seront réalisées directement dans l'application React, sans étape obligatoire sur Stitch ou Figma, afin d'accélérer la livraison.
- La page Contact/Suggestions est **une démonstration visuelle** pour le MVP : aucun message n'est réellement envoyé. Ne pas afficher de confirmation trompeuse.
- **Post-MVP** : brancher un service d'envoi d'e-mails pour transférer les formulaires à une boîte de réception. Le fournisseur évoqué oralement comme « Voiceen » doit être identifié et validé avant intégration.
- Le logo précédent étant indisponible, une nouvelle proposition graphique sera produite séparément ; elle ne sera considérée comme validée qu'après approbation.
- La charte graphique et les règles UX/UI sont définies dans `DESIGN_SYSTEM.md`.
