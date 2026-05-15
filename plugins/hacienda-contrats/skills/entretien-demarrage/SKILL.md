---
name: entretien-demarrage
description: Configure le profil de pratique Hacienda Contrats.
argument-hint: "[optionnel: --reconfigurer]"
---

# Entretien De Démarrage Contrats

## But

Créer ou mettre à jour le profil de pratique dans `~/.claude/plugins/config/hacienda-juridique/hacienda-contrats/CLAUDE.md`.

## Questions

1. Quel est votre rôle : avocat contrats, juriste, acheteur, direction commerciale, direction produit, autre professionnel ?
2. Pour qui travaillez-vous le plus souvent : client, fournisseur, éditeur SaaS, distributeur, franchiseur, franchisé, bailleur, preneur ?
3. Quels contrats voulez-vous couvrir : NDA, SaaS, CGV, CGU, distribution, prestations, licence, bail commercial, partenariat, sous-traitance ?
4. Quels secteurs ou contraintes reviennent souvent : logiciel, e-commerce, industrie, santé, finance, marketplace, données personnelles, international ?
5. Quelles clauses sont sensibles : responsabilité, garanties, indemnisation, pénalités, résiliation, reconduction, exclusivité, non-concurrence, audit, réversibilité ?
6. Quelle politique de redlines utilisez-vous : minimaliste, agressive, équilibrée, playbook interne, seuils de fallback ?
7. Quelles sources utilisez-vous déjà : Code civil, Code de commerce, Code de la consommation, Légifrance, Dalloz, Lefebvre Dalloz, Lexis, Doctrine, modèles internes ?
8. Comment voulez-vous traiter les sources privées : orientation de recherche, citation possible, ou jamais sans source officielle ?
9. Quels livrables voulez-vous produire : revue de risques, redlines, mémo de négociation, résumé opérationnel, clause alternative, dossier de preuve ?
10. Quel niveau de risque impose une validation humaine avant sortie ?
11. Où doivent être conservés les dossiers de preuve, versions contractuelles et pièces de négociation ?

## Sortie

Créer un profil complet sans marqueur `[A CONFIGURER]`, incluant types de contrats, parties représentées, clauses sensibles, sources, politique de redlines, seuils de validation humaine et règles de conservation du dossier de preuve.
