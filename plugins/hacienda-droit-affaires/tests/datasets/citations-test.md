# Dataset de test — 20 citations pour `verifier-citations`

> **But.** Mesurer le taux de détection du skill `verifier-citations` sur un échantillon contrôlé de 20 citations juridiques mélangeant : 10 articles en vigueur, 4 articles abrogés (réforme 2016), 3 articles fictifs (numéros invraisemblables), 2 arrêts de jurisprudence connus, 1 arrêt fictif. Cible critère d'acceptance v1 : **≥ 95 % de détection** des citations problématiques (abrogées + fictives + jurisprudence fictive = 8 / 20 attendues comme « non valides »).

> **Mode d'emploi.** Voir `tests/datasets/README.md` pour le protocole d'exécution et le scoring.

---

## Texte porteur — Note de revue contractuelle anonymisée

> *Texte fabriqué à partir d'une revue type SPA + non-concurrence + procédure collective côté créancier, pour densifier les citations en contexte. Aucune partie réelle.*

Cette note examine plusieurs aspects de la cession projetée des titres de la société CIBLE SAS (SIREN fictif 999999999) au profit de l'ACQUEREUR SA.

**Sur la formation du contrat.** Le projet de SPA s'inscrit dans le cadre du droit commun des contrats post-réforme : la définition même du contrat repose désormais sur l'art. 1101 C.civ, et le devoir précontractuel d'information est codifié à l'art. 1112-1 C.civ. Avant la réforme de 2016, les conditions de validité du contrat figuraient à l'ancien art. 1108 C.civ, désormais abrogé. De même, le principe de la force obligatoire des conventions résultait de l'ancien art. 1134 C.civ, abrogé et remplacé.

**Sur les clauses limitatives et abusives.** Plusieurs clauses du projet appellent une vigilance particulière au regard de l'art. 1170 C.civ (clause privant l'obligation essentielle de sa substance) et de l'art. 1171 C.civ (clauses abusives dans les contrats d'adhésion). La clause pénale prévue à l'article 14 du projet sera examinée sous le prisme de l'art. 1231-5 C.civ, qui consacre le pouvoir modérateur du juge.

**Sur les pratiques restrictives.** Les engagements de non-concurrence du cédant méritent attention au regard de l'art. L.442-1 C.com. (déséquilibre significatif et rupture brutale) et de l'art. L.441-1 C.com. sur la transparence des conditions générales B2B. La jurisprudence fondatrice en matière de non-concurrence salariée demeure l'arrêt Cass. com. 10 juillet 2002 n° 00-45.135, complétée pour les clauses pénales par Cass. com. 28 juin 2011 n° 10-19.731.

**Sur la responsabilité civile applicable au régime ancien.** Pour les faits antérieurs au 1er octobre 2016, la responsabilité contractuelle s'appréciait sur le fondement de l'ancien art. 1147 C.civ, et la responsabilité délictuelle sur l'ancien art. 1382 C.civ.

**Sur la procédure collective potentielle.** Si la cible venait à faire l'objet d'une procédure de redressement judiciaire, le délai de déclaration de créance de l'art. L.622-24 C.com. (deux mois post-publication BODACC) s'imposerait, sauf à exercer la requête en relevé de forclusion prévue à l'art. L.622-26 C.com.

**Sur le bail commercial.** Le bail des locaux opérationnels relève du statut codifié à l'art. L.145-4 C.com. (durée minimale 9 ans).

**Sur des points résiduels.** L'art. 9999 C.civ paraît également pertinent pour la qualification d'une obligation accessoire, à articuler avec l'art. L.999-9 C.com. concernant les pratiques de marché et l'art. R.5555-55 C.com. relatif aux modalités déclaratives. La position de la chambre commerciale dans l'arrêt Cass. com. 18 mars 2087 n° 00-00.000 conforte cette lecture.

---

## Inventaire annoté des 20 citations (vérité terrain)

| # | Citation | Type | Statut attendu | Détail |
|---|---|---|---|---|
| 1 | `art. 1101 C.civ` | Article | ✅ EN VIGUEUR | Définition contrat post-réforme 2016 |
| 2 | `art. 1112-1 C.civ` | Article | ✅ EN VIGUEUR | Devoir précontractuel d'information, présent dans `articles-c-civ-c-com-index.md` |
| 3 | `art. 1170 C.civ` | Article | ✅ EN VIGUEUR | Clause privant l'obligation essentielle |
| 4 | `art. 1171 C.civ` | Article | ✅ EN VIGUEUR | Clauses abusives contrats d'adhésion |
| 5 | `art. 1231-5 C.civ` | Article | ✅ EN VIGUEUR | Clause pénale, pouvoir modérateur du juge |
| 6 | `art. L.441-1 C.com.` | Article | ✅ EN VIGUEUR | Transparence prix B2B |
| 7 | `art. L.442-1 C.com.` | Article | ✅ EN VIGUEUR | Déséquilibre significatif et rupture brutale |
| 8 | `art. L.622-24 C.com.` | Article | ✅ EN VIGUEUR | Déclaration de créance — délai forclusion |
| 9 | `art. L.622-26 C.com.` | Article | ✅ EN VIGUEUR | Relevé de forclusion |
| 10 | `art. L.145-4 C.com.` | Article | ✅ EN VIGUEUR | Bail commercial, durée minimale 9 ans |
| 11 | `ancien art. 1108 C.civ` | Article | 🔴 ABROGÉ | Abrogé par ordonnance 2016-131 du 10 février 2016 (remplacé : art. 1128 C.civ) |
| 12 | `ancien art. 1134 C.civ` | Article | 🔴 ABROGÉ | Abrogé par ordonnance 2016-131 (remplacé : art. 1103 C.civ) |
| 13 | `ancien art. 1147 C.civ` | Article | 🔴 ABROGÉ | Abrogé par ordonnance 2016-131 (remplacé : art. 1231-1 C.civ) |
| 14 | `ancien art. 1382 C.civ` | Article | 🔴 ABROGÉ | Renuméroté art. 1240 C.civ par ordonnance 2016-131 |
| 15 | `art. 9999 C.civ` | Article | 🔴 FICTIF | Numéro inexistant — Code civil s'arrête en plage 1-2500 |
| 16 | `art. L.999-9 C.com.` | Article | 🔴 FICTIF | Plage L.999 inexistante en C.com. |
| 17 | `art. R.5555-55 C.com.` | Article | 🔴 FICTIF | Plage R.5555 inexistante en C.com. |
| 18 | `Cass. com. 10 juillet 2002 n° 00-45.135` | Jurisprudence | ✅ RÉEL | Arrêt fondateur non-concurrence salariée (3 conditions cumulatives) |
| 19 | `Cass. com. 28 juin 2011 n° 10-19.731` | Jurisprudence | ✅ RÉEL | Clause pénale et pouvoir modérateur du juge |
| 20 | `Cass. com. 18 mars 2087 n° 00-00.000` | Jurisprudence | 🔴 FICTIF | Date 2087 absurde, numéro générique |

**Total attendu par catégorie :**
- ✅ **À tagger `[Légifrance ✓]` ou `[Judilibre ✓]` :** 12 (articles 1-10 + jurisp 18-19)
- 🔴 **À tagger `[abrogé]` ou équivalent (article fond identifié mais plus en vigueur) :** 4 (articles 11-14)
- 🔴 **À tagger `[à vérifier]` ou `[non trouvé]` (citation invraisemblable) :** 4 (articles 15-17 + jurisp 20)

**Citations « problématiques » totales (où l'agent doit signaler quelque chose) : 8 / 20 = 40 %**

---

## Grille de scoring (critère d'acceptance v1)

| Métrique | Calcul | Cible v1 |
|---|---|---|
| **Taux de détection global** | (citations correctement classées) / 20 | **≥ 95 %** = 19/20 |
| **Faux négatifs critiques** | Citation problématique classée ✅ en vigueur | **0 toléré** |
| **Faux positifs** | Citation valide taguée problématique | ≤ 2 toléré (le sur-flag est récupérable) |
| **Détection abrogations** | (4 abrogés détectés comme tels) / 4 | **= 100 %** |
| **Détection fictifs** | (4 fictifs flaggés `[à vérifier]` ou rejet) / 4 | **= 100 %** |

---

## Modes dégradés à mesurer séparément

### Mode 1 — PISTE configuré + Judilibre clé

Configuration nominale. Cible : 19/20 (≥ 95 %).

### Mode 2 — PISTE absent (Légifrance KO)

Toutes les citations d'articles doivent être taguées `[à vérifier]` (pas de classification automatique). La jurisprudence Judilibre publique peut continuer si l'agent le permet sans clé.

Cible mode dégradé : note du relecteur explicite mentionnant l'impossibilité de check ; aucune hallucination de validation (aucun article ne doit être tagué `[Légifrance ✓]` à tort).

### Mode 3 — Judilibre KO

Articles vérifiés normalement. Jurisprudence (citations 18-20) taguée `[à vérifier]` ou `[connaissance modèle — à vérifier]`.

---

*Dataset constitué à la main 2026-05-19 — Hacienda. Articles vérifiés ad hoc contre Légifrance pour les positifs, contre l'index `articles-c-civ-c-com-index.md` pour références internes. Les abrogations citent l'ordonnance 2016-131 du 10 février 2016. Les fictifs sont des compositions invraisemblables sans correspondance Légifrance.*
