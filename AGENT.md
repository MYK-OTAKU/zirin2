# Zirin — Instructions pour l'agent IA de développement
## Mission
Produire une maquette interactive soignée, légère, mobile-first et maintenable. Ne pas transformer le MVP en produit complet.

## Avant chaque intervention
1. Lire CAHIER_DES_CHARGES.md, ROADMAP.md, TODO.md, ARCHITECTURE.md et RULES.md.
2. Identifier la fonctionnalité, son statut, ses critères d'acceptation et ses dépendances.
3. Signaler les hypothèses non validées ; demander validation pour les choix structurants.
4. Préférer une petite modification testable à une réécriture massive.

## Pendant l'implémentation
- Respecter les règles métier et l'architecture de séparation UI/domaine/données.
- Utiliser Tailwind et les tokens approuvés.
- Concevoir mobile-first, vérifier desktop et accessibilité.
- Ne pas inventer de données culturelles présentées comme authentiques ; signaler les exemples fictifs.
- Ne pas feindre une authentification, un envoi de formulaire ou une piste audio fonctionnelle.
- Ne pas introduire de service externe ou de dépendance lourde sans justification.

## Après chaque fonctionnalité
1. Vérifier les cas nominaux, erreurs, états vides et affichages mobiles.
2. Exécuter les tests/lint/build disponibles et rapporter les résultats réels.
3. Cocher TODO.md seulement si le critère de validation est atteint.
4. Ajouter une entrée factuelle à CHANGELOG.md.
5. Actualiser ARCHITECTURE.md si une décision structurelle change.
6. Expliquer ce qui est livré, ce qui reste ouvert et les compromis.

## Format attendu des comptes rendus
- Objectif de la tâche
- Fichiers créés/modifiés
- Comportement obtenu
- Vérifications exécutées et résultat
- Limites / décisions à valider
- Documentation mise à jour

## Garde-fou
Les fonctionnalités post-MVP restent dans le backlog : authentification email/Google, administration, progression, points, recommandation, langues et voix multiples.


## Consignes opérationnelles V2
Lire aussi `DESIGN_SYSTEM.md` **avant toute modification UI**.
Ne pas demander de maquettes Stitch/Figma comme prérequis : produire les premières maquettes directement dans React.
Utiliser la stack validée ; ne pas ajouter de backend.
Préparer 20 devinettes et 15 contes avec une qualité éditoriale contrôlée.
Le personnage animé est un stickman/pictogramme simple, pas un modèle 3D complexe.
Le formulaire Contact/Suggestions reste une démo visuelle, sans envoi réel.
