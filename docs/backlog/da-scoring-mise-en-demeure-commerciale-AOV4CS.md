# Sparring scoring — `mise-en-demeure-commerciale` v2.0.0 — Code AOV4CS (1er cycle)

**Date** : 2026-06-04
**Méthode** : criteria atomiques tiered-gated (22 criteria) — **premier score** de ce skill.
**Marquage** : `[scoring blind protocole D.0]` — Phase 2 Codex HIGH (avec **vérification des sources sur Légifrance** : 1344, 1344-1, 1231-5, L.441-10, D.441-5, L.622-21 + arrêtés taux légal) ; Phase 3 session Claude fraîche ; Phase 4 Codex medium sans SKILL.md.

## Résultat agrégé (déterministe, niveau autoritatif ground-truth)

| Mesure | Valeur |
|---|---|
| **Statut** | **REJETÉ** (gate) |
| Score | 0.0 |
| Gate | **C-018** (CRITIQUE — garde-fou L.622-21 absent de la sortie) |
| Majeurs | 12/14 (**85,7 %**) |
| Mineurs | 3/4 (75 %) |
| FAIL | C-007, C-011, C-012, C-018 |

## Lecture — le skill est solide, rejeté sur la visibilité d'un garde-fou

**18/22 PASS.** Le livrable est doctrinalement correct : côté créancier, créance qualifiée certaine/liquide/exigible, sommes ventilées, forfait 40 €×2, **clause pénale exacte** (1 270,80 € = 10 590 × 12 %, > plancher 300 €), fondements cités sans article inventé, suite procédurale (injonction de payer), ton pro. Le **finding D** (garde-fous chiffrage) a porté : la clause pénale est propre et le skill **refuse d'inventer un taux**.

## Findings

### E1 — skill (gate) : rendre le garde-fou L.622-21 VISIBLE dans la sortie

C-018 (CRITIQUE) : le livrable **vérifie** bien l'absence de procédure collective (« aucune procédure collective connue », C-019 PASS) mais **n'énonce pas** la règle L.622-21 (si le débiteur était en procédure collective, la mise en demeure serait interdite → déclaration au passif). Le garde-fou — qui est la **signature de sécurité** du skill — est fait en silence, pas montré.
**Correctif** : forcer une ligne dans la note du relecteur : « BODACC vérifié — pas de procédure collective → poursuite possible (sinon L.622-21 : STOP + déclaration de créance) ». La vérif doit être **lisible**, jamais implicite. *(Mild calibration : le livrable étant correct sur les faits sans PC, le caractère rédhibitoire est discutable — mais pour CE skill, la traçabilité du garde-fou justifie le gate.)*

### E2 — tension calibrage × infra : finding D vs « fournir le taux vérifié » (C-011)

C-011 (MAJEUR) révèle une **vraie tension** : le skill, suivant le garde-fou D, a **refusé d'inventer** le taux (« taux NON consultés », `[à vérifier]`) — comportement honnête. Mais la grille (Codex Phase 2, **avec Légifrance connecté**) attend les taux réels vérifiés (7,76 % S2-2025 ; 7,62 % S1-2026). 
**Résolution** : le skill devrait **consulter Légifrance/PISTE** pour le taux quand l'outil est disponible ; `[à vérifier]` n'est que le repli **mode dégradé** (la session Phase 3 n'avait pas PISTE). Donc : (a) **brancher PISTE pour un scoring représentatif**, et/ou (b) **assouplir C-011** pour accepter un `[à vérifier]` correctement tagué en mode dégradé. On ne peut pas à la fois exiger « ne jamais inventer » et pénaliser le `[à vérifier]` honnête.

### E3 — skill (mineur)

- C-007 : la lettre porte « Roubaix, le [date d'envoi] » au lieu de la dater (5 janvier 2026). → dater depuis la date du dossier.
- C-012 : intérêts non qualifiés « à parfaire jusqu'au complet paiement ». → ajouter la formule.

### Note de process

Le `ground-truth.md` avait été sauvé en **markdown** (réponse Codex complète, avec une utile ligne « Sources officielles vérifiées »), pas en JSON pur → `tiered_scoring` ne pouvait pas le lire. Réécrit en **JSON pur** (sources préservées dans `_sources`). **Règle** : sauver le ground-truth comme le **bloc JSON seul** (ou améliorer le loader pour extraire le JSON d'un markdown — follow-up tooling).

## Verdict

**Premier score honnête et plutôt bon** : skill doctrinalement solide (85,7 % majeurs), rejeté sur la **non-visibilité du garde-fou L.622-21** (E1, vrai correctif) et une **tension calibrage/infra sur le taux** (E2, à trancher). Aucun de ces points n'est une erreur de droit dans le livrable. Cibles avant re-score : E1 (rendre le garde-fou visible) + décision E2 (PISTE ou assouplir C-011) + E3.

---

## Détail par criterion (Phase 4 Codex GPT-5.5 medium)

C-001 — PASS — Le livrable est bien côté créancier : « Mise en demeure commerciale B2B (OPTIMA-FOURNITURES c/ NOVEXA SERVICES) » et « nous vous METTONS EN DEMEURE » au nom d’OPTIMA.

C-002 — PASS — Il se limite au scénario et signale les sources non consultées : « BODACC ✗ (SIREN fictif… repli sur déclaration du scénario) » et « Pappers ✗ (SIREN fictif) ».

C-003 — PASS — La relation professionnelle est correctement qualifiée : « Mise en demeure commerciale B2B » et « créances entre professionnels ».

C-004 — PASS — La créance est présentée comme certaine, liquide et exigible : « Créance certaine, liquide et exigible de 10 590 € TTC » et « livrées et réceptionnées sans réserve ».

C-005 — PASS — Les échéances sont exactes : « échues depuis le 14/11/2025 et le 3/12/2025 » et le tableau reprend « 14 nov. 2025 » / « 3 déc. 2025 ».

C-006 — PASS — Le principal est exact : « Sous-total principal — 10 590,00 € » composé de « 4 380,00 € » et « 6 210,00 € ».

C-007 — FAIL — La mise en demeure est claire, mais la lettre n’est pas datée au 5 janvier 2026 : elle contient seulement « Roubaix, le [date d’envoi] ».

C-008 — PASS — Le délai est déterminé et praticable : « dans un délai de QUINZE (15) JOURS à compter de la réception du présent courrier ».

C-009 — PASS — Les intérêts sont rattachés aux CGV et dus sans rappel préalable : « CGV art. 7… de plein droit depuis l’échéance » et « sans mise en demeure préalable ».

C-010 — PASS — L’article 1344-1 est cité pour l’effet moratoire, non pour le forfait ou la clause pénale : « intérêts moratoires prévus aux articles 1231-6 et 1344-1 ».

C-011 — FAIL — Le livrable identifie la formule, mais ne donne pas les taux attendus de 7,76 % et 7,62 % : « taux légal pro 2nd semestre 2025 et 1er semestre 2026 NON consultés ».

C-012 — FAIL — Les intérêts ne sont pas indiqués « à parfaire jusqu’au complet paiement » et ne sont pas chiffrés : « Intérêts non chiffrés ici » et « à arrêter à la date d’envoi ».

C-013 — PASS — Le forfait est correctement réclamé par facture : « Indemnité forfaitaire de recouvrement (2 × 40 €) ...... 80,00 € ».

C-014 — PASS — La clause pénale est correctement calculée : « 1 270,80 € (= 10 590 × 12 %), strictement supérieure au plancher de 300 € ».

C-015 — PASS — La modération judiciaire est signalée : « le juge pourra la modérer (1231-5 C.civ) ».

C-016 — PASS — Le total hors intérêts est exact : « Total à régler ........................... 11 940,80 € + intérêts ».

C-017 — PASS — La suite procédurale est juridiquement adaptée : « notamment une procédure d’injonction de payer devant le tribunal de commerce compétent ».

C-018 — FAIL — Le livrable ne contient pas le garde-fou L.622-21 exigé sur l’arrêt/interdiction des poursuites en cas de procédure collective ouverte.

C-019 — PASS — Le livrable ne prétend pas à une vérification réelle définitive : « BODACC ✗… repli sur déclaration du scénario » et « aucune procédure collective connue ».

C-020 — PASS — Les principaux fondements attendus sont cités : « L.441-10 et D.441-5 », « article 1344 », « 1344-1 », « 1231-5 » ; aucun article inventé ou abrogé n’est utilisé comme fondement principal.

C-021 — PASS — Le ton est professionnel et factuel : « Sauf erreur ou omission de notre part » et « restant à votre disposition ».

C-022 — PASS — Le livrable distingue les sommes, fondements, réserves et validation humaine : « Sommes réclamées », « Notes de calcul », « [à vérifier] + [review] » et « faire viser par l’approbateur ».

```json
{"criteria":[{"id":"C-001","niveau":"CRITIQUE","verdict":"PASS"},{"id":"C-002","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-003","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-004","niveau":"CRITIQUE","verdict":"PASS"},{"id":"C-005","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-006","niveau":"CRITIQUE","verdict":"PASS"},{"id":"C-007","niveau":"MAJEUR","verdict":"FAIL"},{"id":"C-008","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-009","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-010","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-011","niveau":"MAJEUR","verdict":"FAIL"},{"id":"C-012","niveau":"MINEUR","verdict":"FAIL"},{"id":"C-013","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-014","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-015","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-016","niveau":"MINEUR","verdict":"PASS"},{"id":"C-017","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-018","niveau":"CRITIQUE","verdict":"FAIL"},{"id":"C-019","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-020","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-021","niveau":"MINEUR","verdict":"PASS"},{"id":"C-022","niveau":"MINEUR","verdict":"PASS"}]}
```
