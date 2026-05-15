---
name: analyse-transferts
description: Analyse un transfert international de donnees personnelles hors UE/EEE.
argument-hint: "<flux, DPA, sous-traitant ou architecture>"
---

# Analyse Transferts

## Avant De Commencer

Lire le profil de pratique, le DPA, la cartographie des flux et l'espace dossier. Identifier pays, importateur, exportateur, role, donnees et acces effectif.

Toute affirmation sur adequation, SCC, TIA ou mesures supplementaires non verifiee contre une source officielle reste `[a verifier]`.

## Contexte Dossier

Documenter :

- pays de destination et pays d'acces support ;
- exportateur et importateur ;
- nature des donnees ;
- finalite du transfert ;
- mecanisme juridique ;
- sous-traitants en cascade ;
- chiffrement, clefs, support, logs et acces administrateur.

## Sources A Verifier

- RGPD articles 44 a 49 ;
- decisions d'adequation UE ;
- clauses contractuelles types ;
- recommandations EDPB sur transferts et mesures supplementaires ;
- doctrine CNIL ;
- DPA, SCC, TIA, annexe securite, liste sous-traitants.

## Workflow

1. Cartographier le flux et les acces.
2. Verifier si le pays est couvert par adequation.
3. Si SCC, verifier module, parties, annexe, mesures techniques et transfer impact assessment.
4. Tester mesures supplementaires : chiffrement, pseudonymisation, clefs, minimisation, support.
5. Identifier onward transfers et sous-traitants ulterieurs.
6. Evaluer le niveau de risque et les conditions.
7. Produire recommandations contractuelles et techniques.

## Garde-Fous Et Escalade

Escalade en validation humaine si pays tiers sensible, donnees sensibles, acces gouvernemental plausible, SCC incompletes, TIA absent, donnees RH ou sante, sous-traitance en cascade.

## Format De Sortie

Produire : table flux / pays / mecanisme / preuve / risque / mesures / decision.

### Note de revue

Lister sources officielles, DPA/SCC lus, pieces manquantes, points `[review]`, hypothese technique et validation humaine.

## Dossier De Preuve

Conserver cartographie, DPA, SCC, TIA, decision d'adequation, preuves techniques et decision finale.

## Arbre de decision

- Pas de transfert : documenter absence.
- Adequation prouvee : controle contractuel simple.
- SCC completes : TIA et mesures.
- Mecanisme absent : STOP.
- Risque residuel fort : escalade DPO/avocat.
