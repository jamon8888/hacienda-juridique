---
name: surveillance-politique-confidentialite
description: Surveille la coherence entre politique de confidentialite, traitements reels, DPA, AIPD et registre.
argument-hint: "<politique, registre ou dossier de produit>"
---

# Surveillance Politique Confidentialite

## Avant De Commencer

Lire le profil de pratique, la politique de confidentialite, le registre, les DPA, les AIPD et l'espace dossier. Si un document manque, continuer seulement avec un statut `[a verifier]`.

## Contexte Dossier

Relever :

- version de politique ;
- publics vises ;
- traitements couverts ;
- nouveaux produits ou finalites ;
- changements de sous-traitants ;
- changements de transferts ;
- demandes de droits et incidents recents ;
- engagements marketing ou contractuels.

## Sources A Verifier

- RGPD articles 12, 13 et 14 ;
- doctrine CNIL transparence ;
- Loi Informatique et Libertes ;
- lignes directrices EDPB si utiles ;
- registre, DPA, AIPD, politiques, tickets produit, changelog.

## Workflow

1. Comparer chaque traitement du registre avec la politique.
2. Comparer chaque DPA ou sous-traitant nouveau avec les mentions.
3. Verifier droits des personnes, contacts, bases legales, durees, transferts.
4. Identifier promesses de confidentialite incompatibles avec la pratique reelle.
5. Proposer changements de texte ou questions au client.
6. Produire un tableau de drift.

## Garde-Fous Et Escalade

Escalade si la politique omet un traitement sensible, un transfert hors UE/EEE, une base legale fragile, un profilage, une IA, une violation ou une promesse contractuelle contradictoire.

## Format De Sortie

Produire : resume, table de drift, modifications proposees, sources, questions et validation humaine.

### Note de revue

Lister versions lues, documents manquants, sources officielles, points `[review]` et prochain validateur.

## Dossier De Preuve

Conserver versions de politiques, registre, DPA, AIPD, table de drift et decisions.

## Arbre de decision

- Drift mineur : correction de texte.
- Drift majeur : validation DPO/avocat.
- Source absente : `[a verifier]`.
- Changement produit sensible : relancer qualification ou AIPD.
