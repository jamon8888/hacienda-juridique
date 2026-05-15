---
name: analyse-gap-cnil-rgpd
description: Compare une pratique, politique ou procedure a un referentiel RGPD/CNIL et produit un plan de remediation.
argument-hint: "<politique, procedure, registre, DPA ou referentiel>"
---

# Analyse Gap CNIL RGPD

## Avant De Commencer

Lire le profil de pratique, le document a analyser et le referentiel cible. Si le referentiel officiel n'a pas ete consulte dans la session, marquer le gap `[a verifier]`.

## Contexte Dossier

Identifier :

- document ou pratique analysee ;
- date et version ;
- source normative cible ;
- audience : avocat, DPO, produit, RH, marketing, RSSI ;
- niveau attendu : diagnostic rapide, memo, plan d'action, tableau de remediation.

## Sources A Verifier

- RGPD et Loi Informatique et Libertes ;
- doctrine CNIL pertinente ;
- lignes directrices EDPB ;
- sanctions ou decisions utiles ;
- politiques, procedures, registres, DPA, tickets et preuves client.

## Workflow

1. Construire une grille exigence / preuve / ecart.
2. Classer les ecarts : critique, eleve, moyen, faible.
3. Relier chaque ecart a une source, piece ou hypothese.
4. Proposer correction, proprietaire, delai et preuve attendue.
5. Identifier les ecarts qui exigent validation humaine.
6. Produire un plan de remediation priorise.

## Garde-Fous Et Escalade

Escalade si l'ecart expose a sanction CNIL, droits des personnes, violation non traitee, transfert illicite, base legale fragile ou traitement a risque eleve.

## Format De Sortie

Table : exigence, constat, preuve, ecart, severite, action, owner, date cible, statut source.

### Note de revue

Indiquer le referentiel lu, les sources non verifiees, points `[review]`, hypotheses et validation humaine.

## Dossier De Preuve

Conserver referentiel, version du document, table d'ecarts, preuves et decisions de remediation.

## Arbre de decision

- Referentiel officiel absent : brouillon `[a verifier]`.
- Ecart critique : escalade.
- Ecart moyen/faible : plan d'action.
- Preuve manquante : demander piece.
