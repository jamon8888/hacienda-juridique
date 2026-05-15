---
name: conformite-cookies
description: Analyse une posture cookies, traceurs, CMP et mesure d'audience au regard CNIL/ePrivacy.
argument-hint: "<site, politique cookies, export CMP ou liste de tags>"
---

# Conformite Cookies

## Avant De Commencer

Lire le profil de pratique, l'espace dossier, la politique cookies et toute configuration CMP fournie. Si aucun inventaire de traceurs n'est fourni, demander l'export ou marquer l'analyse `[a verifier]`.

## Contexte Dossier

Identifier :

- site ou application ;
- CMP et version ;
- liste des tags ;
- finalites ;
- preuve du consentement ;
- mecanisme de refus ;
- duree de conservation ;
- tiers publicitaires, analytics, reseaux sociaux ou AB testing.

## Sources A Verifier

- doctrine CNIL cookies et traceurs ;
- ePrivacy et Code des postes et communications electroniques ;
- RGPD pour consentement et preuve ;
- politique cookies, bannieres, exports CMP, screenshots, tag manager.

## Workflow

1. Classer les traceurs : strictement necessaires, mesure d'audience, personnalisation, publicite, reseaux sociaux, autres.
2. Tester exemption ou consentement requis.
3. Verifier que refuser est aussi simple qu'accepter.
4. Verifier preuve et duree du consentement.
5. Comparer CMP, politique cookies et interface reelle.
6. Identifier ecarts et actions de correction.

## Garde-Fous Et Escalade

Escalade si publicite comportementale, donnees mineurs, profilage sensible, absence de refus, dark pattern ou transfert hors UE/EEE non documente.

## Format De Sortie

Produire une table traceur / finalite / base / consentement / risque / correction / source.

### Note de revue

Inclure preuves visuelles, sources CNIL consultees, zones `[a verifier]`, points `[review]` et validation humaine avant mise en production.

## Dossier De Preuve

Conserver screenshots, export CMP, liste tags, politique cookies, date d'audit et decisions.

## Arbre de decision

- Traceur necessaire : documenter exemption.
- Consentement requis absent : correction obligatoire.
- Politique incoherente : mise a jour.
- Preuve absente : `[a verifier]` et remediation.
