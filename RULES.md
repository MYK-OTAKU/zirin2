# Zirin — Règles de développement
1. **Métier avant code** : chaque fonctionnalité possède règles, cas normaux, limites, erreurs et critères d'acceptation.
2. **SOLID avec discernement** : responsabilité unique, dépendances vers interfaces lorsque cela apporte une vraie souplesse ; pas d'abstractions inutiles.
3. **Composants réutilisables** : composants UI sans logique métier ; cas d'usage testables hors UI.
4. **TypeScript strict** si stack React/TypeScript validée ; pas de `any` de confort.
5. **Données sûres** : validation JSON runtime ; aucun HTML non fiable injecté ; aucune donnée secrète dans le frontend.
6. **Sécurité** : pas de clés privées, pas de secrets codés en dur, pas de fausses garanties d'envoi.
7. **Design system** : utiliser tokens pour couleurs, typographie, espaces, rayons et états ; éviter les valeurs arbitraires répétées.
8. **Mobile-first et accessibilité** : HTML sémantique, navigation clavier, focus visible, contraste, labels, animations réduites.
9. **Performance** : lazy loading des pages et médias, optimisation des images, animations non bloquantes.
10. **Qualité** : formatage, lint, build, tests unitaires des règles métier et tests de parcours essentiels.
11. **Erreurs** : messages utiles, fallback images/audio, états vides ; aucune erreur silencieuse.
12. **Nommage** : anglais cohérent pour code et chemins ; français soigné pour les textes d'interface.
13. **Documentation vivante** : mettre à jour TODO, CHANGELOG et ARCHITECTURE pour tout changement significatif.
14. **Droits et éthique** : ne pas reproduire sans autorisation les textes, illustrations ou narrations protégés.
15. **Discipline MVP** : pas de backend, authentification, scoring durable ou recommandation personnalisée sans changement de périmètre explicite.


## Règles complémentaires V2
- La charte `DESIGN_SYSTEM.md` est normative pour toute interface.
- Ne pas multiplier les longs paragraphes dans les pages de navigation ; privilégier microcopy et hiérarchie visuelle.
- Les 20 devinettes et 15 contes doivent être de qualité éditoriale, avec provenance/droits vérifiés.
- Ne jamais présenter un formulaire de démonstration comme un envoi réellement effectué.
- Ne jamais exposer une clé d'API d'envoi d'e-mails dans le frontend.
