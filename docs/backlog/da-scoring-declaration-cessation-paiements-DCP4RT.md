# Scoring blind — declaration-cessation-paiements — SYNTHÈSE RELEASE

> **Verdict final : ADMIS · score 1,0 · gate-clean (7/7 CRITIQUE) · 25/25 MAJEUR · cycle DCP4RT.**
> Protocole blind 4 phases (CLAUDE.md). Grille (ground-truth.md) verrouillée dès
> la Phase 2, inchangée sur les 4 cycles. Live en Sonnet (barre Cowork).

| Cycle | Statut | Score | Gates | majeur_rate | Cause |
|---|---|---|---|---|---|
| DCP1RT | REJETÉ | 0,0 | C-008, C-029 | 0,68 | date fabriquée + ancrée sur 1er impayé ; pièces R.631-1 incomplètes |
| DCP2RT | RÉSERVES | 0,872 | — (clean) | 0,84 | gates corrigés ; 4 MAJEUR résiduels |
| DCP3RT | REJETÉ | 0,0 | C-029 | 0,92 | 3 MAJEUR corrigés mais régression : fourchette convertie en dates calendaires |
| **DCP4RT** | **ADMIS** | **1,0** | **— (clean)** | **1,0** | anti-fabrication de dates verrouillé (semaines relatives, jamais de date calendaire) |

**Fragilité récurrente identifiée et corrigée :** la **fabrication de dates** sur entrée
vague (axe C-008/C-029) ressurgissait à chaque run sous une forme différente ; la
parade décisive est l'interdiction explicite de convertir une approximation en date
calendaire ou en jours de retard précis (rester en semaines relatives).

**Note méthodo :** `SEUIL_ADMIS = 1.0` (tous MAJEUR) est très sensible à la variance
run+scorer ; un run unique peut basculer sur un critère borderline. DCP4 confirme la
capacité du skill à un run propre et complet. Artefacts par cycle conservés
(`verdicts-DCPxRT.json`, `live-output-DCPxRT.md`).

---

## Détail Phase 4 (DCP4RT — justification par critère)

C-001 — PASS — Le livrable applique bien le test « actif disponible / passif exigible » et non un simple constat d’impayés.

C-002 — PASS — Il retient « Total actif disponible retenu : 62 000 € » et exige de vérifier que la ligne bancaire est « toujours valide et sans condition suspensive ».

C-003 — PASS — Les créances clients de 40 000 € sont exclues car « recouvrement à 60 jours — non immédiatement réalisables ».

C-004 — PASS — La dette URSSAF est provisoirement exclue puisque le moratoire la fait sortir « du passif immédiatement exigible tant que le moratoire est honoré ».

C-005 — PASS — Le livrable chiffre « Total passif exigible retenu (hypothèse basse) : 113 000 € », avec réserves sur le moratoire et la déchéance du terme.

C-006 — PASS — Il ne conclut pas à l’absence de cessation, mais à une « Cessation des paiements probable ».

C-007 — PASS — Il calcule une « Insuffisance provisoire : 113 000 − 62 000 = ~51 000 € » à confirmer par une situation datée.

C-008 — PASS — Il précise que le premier impayé est « un indice, pas la date de CdP » et refuse de le convertir automatiquement en date légale.

C-009 — PASS — Il rappelle les « 45 jours à compter de la date réelle de CdP » et indique qu’« aucune échéance exacte [n’est] calculable ».

C-010 — PASS — Le dépassement est présenté conditionnellement comme « vraisemblablement dépassé — à confirmer ».

C-011 — PASS — Le texte indique qu’un dépassement « exposerait » à une interdiction de gérer, sans la présenter comme automatique.

C-012 — PASS — Il vise le risque en cas d’« omission consciente de déclarer » et recommande de « documenter la chronologie ».

C-013 — PASS — Il affirme explicitement : « dépôt = obligation à brève échéance, ne pas temporiser ».

C-014 — PASS — Il désigne le « Tribunal de commerce de Tours (37) » et demande de confirmer le siège et les modalités du greffe.

C-015 — PASS — Le projet est établi au nom de M. Marchand, « gérant » et « dirigeant de droit habilité ».

C-016 — PASS — Il distingue le redressement possible de la liquidation lorsque le redressement est manifestement impossible, en rappelant : « C’est le tribunal qui qualifie et décide. »

C-017 — PASS — Il ne garantit aucune procédure et réclame trésorerie prévisionnelle, financement, rentabilité et carnet de commandes chiffré.

C-018 — PASS — La caution personnelle de 80 000 € n’est pas intégrée au passif exigible de la SARL et son analyse est réservée à l’avocat.

C-019 — PASS — Sont demandés les « comptes annuels du dernier exercice » et une « situation de trésorerie datée de moins d’un mois ».

C-020 — PASS — Le bordereau prévoit l’« état du passif exigible et de l’actif disponible ».

C-021 — PASS — Il demande un « état chiffré des créances et dettes avec noms et domiciles des créanciers ».

C-022 — PASS — Il prévoit l’« état actif et passif des sûretés + engagements hors bilan », incluant la caution de 80 000 €.

C-023 — PASS — Il demande un « inventaire sommaire des biens » sans inventer son contenu.

C-024 — PASS — Le nombre de salariés est repris et les « nom et adresse des représentants du personnel (CSE) » restent à compléter.

C-025 — PASS — Le projet contient l’attestation sur l’honneur relative au mandat ad hoc et à la conciliation durant les dix-huit derniers mois.

C-026 — PASS — Le SIREN est indiqué, le chiffre d’affaires reste « à compléter » et les documents ICPE sont demandés « si activité classée ».

C-027 — PASS — Le livrable traite la datation, la signature, la certification, le délai de sept jours sous réserve de vérification et la motivation des pièces absentes.

C-028 — PASS — La section « Déclaration de cessation des paiements — projet » fournit un canevas structuré et directement exploitable.

C-029 — PASS — Les informations absentes restent signalées par des champs « à compléter » et aucune date, personne ou valeur manquante n’est fabriquée.

C-030 — PASS — Le bordereau et les options finales donnent une liste précise des informations et justificatifs à obtenir en urgence.

C-031 — PASS — Si la cessation n’est finalement pas établie, le texte renvoie au mandat ad hoc ou à la conciliation et borne cette dernière à une cessation ne dépassant pas 45 jours.

C-032 — PASS — Le livrable sépare qualification, délai, compétence, orientation, projet, pièces, réserves et validation humaine.

C-033 — PASS — Il est expressément présenté comme « NOTES DE TRAVAIL » à « faire valider […] avant tout usage externe » et à valider avec un avocat avant dépôt.

{"criteria":[{"id":"C-001","niveau":"CRITIQUE","verdict":"PASS"},{"id":"C-002","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-003","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-004","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-005","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-006","niveau":"CRITIQUE","verdict":"PASS"},{"id":"C-007","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-008","niveau":"CRITIQUE","verdict":"PASS"},{"id":"C-009","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-010","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-011","niveau":"CRITIQUE","verdict":"PASS"},{"id":"C-012","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-013","niveau":"CRITIQUE","verdict":"PASS"},{"id":"C-014","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-015","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-016","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-017","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-018","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-019","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-020","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-021","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-022","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-023","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-024","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-025","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-026","niveau":"MINEUR","verdict":"PASS"},{"id":"C-027","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-028","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-029","niveau":"CRITIQUE","verdict":"PASS"},{"id":"C-030","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-031","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-032","niveau":"MAJEUR","verdict":"PASS"},{"id":"C-033","niveau":"CRITIQUE","verdict":"PASS"}]}