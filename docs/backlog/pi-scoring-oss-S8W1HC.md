# Sparring scoring — `revue-open-source` — Code S8W1HC

> ⚠️ **`[scoring auto-référent — méthodologie pré-D.0]`** — ce scoring a été produit
> avant formalisation du protocole blind ([`docs/methodology/sparring-scoring-protocol.md`](../methodology/sparring-scoring-protocol.md)).
> L'auteur des datasets, de la vérité terrain et de l'orchestration du scoring est le même
> acteur (Claude Code en session unique). Les scores sont à traiter comme
> **borne supérieure indicative**, pas comme mesure release-grade. Re-validation
> blind prévue en D.3 (cf. `docs/superpowers/plans/2026-06-01-hacienda-pi-vague-d-release-readiness.md`).

---

**Scénario** : NEXUS PLATFORM SAS, scale-up SaaS B2B fintech, levée Series C 60M€ — DD OSS exigée par lead PE GROWTH IV avant SPA. Deux produits (NexusCore SaaS hosted + NexusEdge on-premises distribué). Posture cabinet : whitelist permissives, interdiction GPL/AGPL sauf isolation stricte.

**Skill évalué** : `plugins/hacienda-propriete-intellectuelle/skills/revue-open-source/SKILL.md` v2.0.0
**Évaluateur** : sparring critique style K7M2PX
**Date** : 2026-06-01

---

## Score global : **76 / 100 — 🟡 Acceptable mais durcissement nécessaire**

| Dimension | Poids | Score | Pondéré |
|---|---|---|---|
| Couverture du périmètre | 30 % | 22 / 30 | 22 |
| Détection nuances métier | 30 % | 22 / 30 | 22 |
| Qualité arbitrage subjectif | 20 % | 15 / 20 | 15 |
| Lisibilité partner-ready | 10 % | 9 / 10 | 9 |
| Résistance aux pièges | 10 % | 8 / 10 | 8 |
| **Total** | **100 %** | — | **76** |

---

## Verdict : 🟡 — Acceptable, MAIS dépendant d'un avocat senior pour combler les nuances

Un avocat PI lançant ce skill sur le scénario NEXUS **obtiendrait une structure d'audit correcte** (intake, classification, conflits, contamination, obligations, plan de remédiation, dashboard >10 composants), mais devrait fournir **lui-même** plusieurs analyses critiques que le skill ne sait pas formaliser explicitement :

- **Ffmpeg-libs LGPL→GPL par linking statique** : l'étape 7 mentionne « linking statique vs dynamique : impact sur LGPL et GPL différencié `[review]` » — c'est sous-spécifié. Le finding #1 du scénario (clause LGPL §6 — bascule GPL statique) n'est pas formalisé comme un pattern à détecter activement. Risque de rater LE finding bloquant.
- **Fork interne pdfkit GPL vs « isolation stricte »** : le skill évoque l'isolation par binaire séparé/IPC mais ne nomme pas explicitement le piège « fork modifié interne ≠ isolation ». Un junior pourrait classer le fork comme « interne, donc OK SaaS ».
- **AGPL section 13 conditionnelle (modification + interaction réseau)** : l'exemple 1 affirme « pas d'exception SaaS hosted applicable » de manière trop binaire. Le scénario montre exactement l'inverse : monitoring-agent NON modifié + NON exposé = pas d'obligation. Le skill risque le faux positif 🔴 AGPL.
- **Classpath exception fast-cgi** : non traitée. Aucune mention dans le skill des exceptions de licence (Classpath, FOSS exception MySQL, etc.) → l'avocat doit improviser.
- **Distinction SaaS hosted vs distribution on-prem pour un MÊME éditeur** : critique ici (NEXUS distribue les DEUX). Le skill demande le contexte d'usage à l'intake mais ne formalise pas une **matrice produit × licence** quand un éditeur opère les deux modèles en parallèle.

L'avocat senior compense ; un junior livrerait un rapport faussement rassurant ou faussement alarmiste.

---

## Détail par dimension

### Couverture du périmètre — 22 / 30

**Capté** :
- ✅ Inventaire SBOM CycloneDX + manifests multi-langages (étape 3).
- ✅ Classification permissives / copyleft faible / fort / source-available / inconnu (étape 5).
- ✅ Détection contamination GPL/AGPL (étape 7).
- ✅ Obligations notice / attribution / source modifs / redistribution (étape 8).
- ✅ Priorités de remédiation et plan chiffré (étapes 9–10, mode `--remediation-plan`).
- ✅ Dashboard HTML >10 composants — utile sur 247+124 composants NEXUS.
- ✅ Renvoi `audit-pi-ma` pour DD M&A (correct ici).

**Manqué ou sous-spécifié** :
- ❌ Pas de **matrice produit × licence** pour éditeurs opérant SaaS + on-prem simultanément. Critique pour NEXUS.
- ❌ Pas de checklist explicite **« versions non figées / transitives »** — mentionné en niveau 🟡 mais pas opérationnalisé en étape dédiée.
- ❌ Pas de section explicite **« exceptions de licence »** (Classpath, FOSS exception, OpenSSL exception) — angle mort pour fast-cgi.
- ⚠️ Étape 7 confond contamination AGPL et SaaS hosted (« pas d'exception SaaS hosted applicable » — trop binaire).

### Détection nuances métier — 22 / 30

**Capté** :
- ✅ LGPL/MPL en liste grise, posture cabinet calibrée (étape 2, ton).
- ✅ AGPL section 13 mentionnée comme distincte de la GPL classique.
- ✅ Linking statique vs dynamique évoqué (étape 6).
- ✅ SSPL et BSL distingués.
- ✅ Posture cabinet « interdiction GPL sauf isolation » → exiger preuve d'isolation technique (ton).

**Manqué** :
- ❌ **LGPL §6 (clause de relinking)** non nommée — la nuance qui fait basculer ffmpeg statique en GPL n'a pas son ancre textuelle dans le skill.
- ❌ **AGPL section 13 conditionnelle (modification ET interaction réseau utilisateur)** : le skill traite l'AGPL comme déclencheur quasi-automatique en SaaS. C'est l'erreur inverse du scénario.
- ❌ **Exceptions de licence** (Classpath, etc.) absentes.
- ❌ **« Fork interne ≠ isolation »** non formalisé comme piège anti-junior.
- ⚠️ Jurisprudence FOSS listée (Versata, McHardy, Vizio, BusyBox) — bien — mais sans calibrage de portée FR (valeur argumentative seulement).

### Qualité arbitrage subjectif — 15 / 20

**Capté** :
- ✅ Échelle 🔴🟠🟡🟢 cohérente avec plancher cross-skill.
- ✅ Plan de remédiation chiffré avec options coût/délai/risque résiduel (exemple 3).
- ✅ Cinq options de décision en arbre final.
- ✅ Mode `--remediation-plan` aligné avec le besoin Sprint 1–4 du scénario.

**Manqué** :
- ❌ Pas d'arbitrage explicite **« non-prêt pour DD SPA »** comme statut formel — la recommandation type est « Conforme / Conforme sous réserve / Remédiation requise / Bloquant » mais sans lien explicite avec un calendrier deal-driven (data room, signing, closing).
- ⚠️ Pas de **scoring du risque rep&warranty OSS** pour le SPA — angle DD majeur.
- ⚠️ Cotation 🔴 vs 🟠 sur AGPL non modifiée/non exposée : le skill risque la sur-cote (faux positif).

### Lisibilité partner-ready — 9 / 10

- ✅ Note du relecteur 5 champs.
- ✅ Tableaux structurés (inventaire, conflits, obligations, findings, plan).
- ✅ Mode silencieux pour direction technique non-juriste.
- ✅ Résumé exécutif 3 phrases.
- ⚠️ Manque éventuel d'un **tableau récap produit × licence × statut** en synthèse haute.

### Résistance aux pièges — 8 / 10

| Piège | Skill résiste ? | Note |
|---|---|---|
| Appliquer GPL en SaaS automatiquement | ⚠️ Partiel | Bonne intuition générale, mais l'exemple 1 et l'étape 7 sur l'AGPL sont trop binaires. |
| Confondre fork interne avec isolation | ❌ Non | Non formalisé comme piège explicite. |
| Surévaluer AGPL en interne non modifiée | ❌ Non | Risque de faux positif 🔴. |
| Oublier linking statique LGPL → GPL | ⚠️ Partiel | Mention `[review]` insuffisante face à l'enjeu ffmpeg. |
| Confondre `embedded-postgres` PostgreSQL License avec PostgreSQL projet | ✅ Oui | Classification permissive correcte. |
| Conclure « compliant » sans preuve d'isolation | ✅ Oui | Le ton exige preuve d'isolation technique. |

---

## Gaps DESIGN du skill (à corriger)

1. **Ajouter une étape « Matrice produit × usage × licence »** pour les éditeurs opérant SaaS + on-prem simultanément. Sans cela, le skill manque la criticité différenciée NexusCore (SaaS) vs NexusEdge (distribué).

2. **Formaliser la clause LGPL §6 (relinking)** dans l'étape 6 (conflits) et 7 (contamination). Le linking statique LGPL → bascule GPL est LA nuance #1 à expliciter, pas un `[review]` flottant.

3. **Reformuler l'AGPL section 13 en règle conditionnelle** : « ne s'active que si (a) modification ET (b) interaction utilisateurs distants via réseau ». Corriger l'exemple 1 qui affirme « pas d'exception SaaS hosted applicable » sans distinguer ces deux conditions.

4. **Ajouter une section « Exceptions de licence »** : Classpath exception (origine OpenJDK), FOSS exception MySQL, OpenSSL exception. Avec règle de prudence : « application à un projet hors origine = `[review]` ».

5. **Ajouter un piège explicite « Fork interne ≠ isolation stricte »** dans les pièges à éviter ou dans le ton. La modification interne déclenche la clause GPL §5 même sans distribution externe — la posture cabinet « interdiction sauf isolation » bloque alors le fork.

6. **Ajouter un statut formel « Non-prêt pour DD SPA »** dans les recommandations, avec liaison calendrier deal (data room, signing, closing) et estimation rep&warranty OSS résiduelle.

7. **Opérationnaliser « versions non figées / transitives »** en étape dédiée plutôt qu'un niveau 🟡 isolé. Sur 247+124 composants, la dérive transitives est le second risque DD.

8. **Calibrer la jurisprudence FOSS pour la France** : les arrêts Versata (DE), McHardy (DE), Vizio (US) ont valeur argumentative en FR, pas autorité directe. Le préciser explicitement.

9. **Renforcer l'arbre de remédiation par option** : actuellement « remplacement / refactor isolation / ouverture du code / SaaS hosted exception ». Ajouter « passage statique → dynamique » (ffmpeg) et « bascule fork interne → vendor stock + patch externe » (pdfkit) comme patterns nommés.

**Total gaps : 9.**

---

## Synthèse — recommandation au maintainer

Le skill est **structurellement solide** (étapes 1–12 cohérentes, modes utiles, dashboard auto, arbre de décision) mais **sous-spécifie les nuances qui font la différence en DD M&A** : clause LGPL §6, AGPL section 13 conditionnelle, exceptions de licence, fork interne vs isolation. Sur le scénario NEXUS, un avocat senior compense ; un junior produirait un rapport partiellement faux. Priorité 1 : corriger l'exemple 1 (faux binaire AGPL/SaaS) et formaliser LGPL §6 + Classpath exception en étapes opérationnelles.
