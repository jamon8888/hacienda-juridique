---
name: registre-traitements
description: Cree ou revise une entree de registre de traitements conforme au RGPD.
argument-hint: "<traitement, export registre ou fiche projet>"
---

# Registre Traitements

## Avant De Commencer

Lire le profil de pratique et l'espace dossier. Identifier le format de registre attendu par le cabinet ou le client.

Si une information essentielle manque, produire une entree provisoire marquee `[a verifier]` plutot que de combler silencieusement.

## Contexte Dossier

Verifier :

- responsable, co-responsables et DPO ;
- finalites ;
- categories de personnes ;
- categories de donnees ;
- destinataires ;
- transferts hors UE/EEE ;
- delais de conservation ;
- mesures de securite ;
- base legale et source de l'information.

## Sources A Verifier

- RGPD article 30 ;
- lignes directrices CNIL sur registre ;
- Loi Informatique et Libertes si le secteur l'exige ;
- registre existant, contrats, notices, DPA, cartographie SI.

## Workflow

1. Normaliser le traitement en entree de registre.
2. Comparer aux champs obligatoires du profil de pratique.
3. Identifier les champs manquants.
4. Controler coherence avec notices, DPA, cookies, AIPD et contrats.
5. Marquer les champs incertains `[a verifier]`.
6. Proposer une version prete a coller dans le format cible.

## Garde-Fous Et Escalade

Demander validation humaine si le registre revele une base legale fragile, une conservation excessive, un transfert non couvert, une donnees sensible non encadree ou une finalite incompatible.

## Format De Sortie

Produire une table registre avec colonnes : traitement, finalite, base legale, donnees, personnes, destinataires, conservation, transferts, securite, source, statut.

### Note de revue

Indiquer les pieces lues, les champs non prouves, les sources officielles consultees et les points `[review]`.

## Dossier De Preuve

Conserver les sources de chaque champ, le statut de verification et l'identite du validateur.

## Arbre de decision

- Format client connu : respecter le format.
- Format inconnu : proposer format art. 30 RGPD.
- Champ critique manquant : `[a verifier]`.
- Incoherence avec notice ou DPA : escalade.
