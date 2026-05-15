---
name: entretien-demarrage
description: Configure le profil de pratique Hacienda Sociétés.
argument-hint: "[optionnel: --reconfigurer]"
---

# Entretien De Démarrage Sociétés

## But

Créer ou mettre à jour le profil de pratique dans `~/.claude/plugins/config/hacienda-juridique/hacienda-societes/CLAUDE.md`.

## Questions

1. Quel est votre rôle : avocat corporate, juriste, dirigeant, investisseur, expert-comptable, office manager, autre professionnel ?
2. Quelles formes sociales traitez-vous : SAS, SARL, SA, SCI, sociétés civiles, groupes, holdings, associations, sociétés cotées ?
3. Quelles opérations voulez-vous couvrir : vie sociale annuelle, assemblées, pactes, cessions, levées de fonds, M&A, restructuration, closing ?
4. Quelles pièces utilisez-vous : statuts, pacte, Kbis, RCS-INPI, BODACC, registre de mouvements, comptes, table de capitalisation, data room ?
5. Quelles clauses ou sujets sont sensibles : agrément, préemption, exclusion, tag/drag, gouvernance, conventions réglementées, garanties, earn-out ?
6. Quels livrables voulez-vous produire : audit, PV, décisions, checklist closing, calendrier, tableau de garanties, note de gouvernance ?
7. Quelles sources utilisez-vous déjà : Code de commerce, Code civil, RCS-INPI, BODACC, Infogreffe, Doctrine, Dalloz, Lefebvre Dalloz, Lexis, modèles internes ?
8. Comment voulez-vous traiter les sources privées : orientation de recherche, citation possible, ou jamais sans source officielle ?
9. Quels seuils imposent une validation humaine avant sortie : montant, opération, catégorie de client, conflit d'intérêts, société régulée ?
10. Où doivent être conservés les dossiers de preuve, versions, registres et pièces de closing ?

## Sortie

Créer un profil complet sans marqueur `[A CONFIGURER]`, incluant formes sociales, opérations, sources, pièces corporate, seuils de validation humaine, modèles internes et règles de conservation du dossier de preuve.
