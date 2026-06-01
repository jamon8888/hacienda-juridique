# Sparring scoring — `cession-droit-auteur` — Code A2T6JL

> ⚠️ **`[scoring auto-référent — méthodologie pré-D.0]`** — ce scoring a été produit
> avant formalisation du protocole blind ([`docs/methodology/sparring-scoring-protocol.md`](../methodology/sparring-scoring-protocol.md)).
> L'auteur des datasets, de la vérité terrain et de l'orchestration du scoring est le même
> acteur (Claude Code en session unique). Les scores sont à traiter comme
> **borne supérieure indicative**, pas comme mesure release-grade. Re-validation
> blind prévue en D.3 (cf. `docs/superpowers/plans/2026-06-01-hacienda-pi-vague-d-release-readiness.md`).

---

**Date** : 2026-06-01
**Skill évalué** : `cession-droit-auteur` v2.0.0 (post-vague-B PI v0.20.0)
**Scénario** : `tests/datasets/v2-auteur/scenario.md` — cession totale scénario série TV « LES OMBRES DE NORD » (ATLAS / Mathieu Lefevre), forfait 100k€, médias inconnus à venir, co-écriture Camille Bernard salariée ATLAS
**Méthode** : sparring scoring K7M2PX adapté domaine droit d'auteur

---

## Score pondéré

| Dimension | Poids | Score | Pondéré | Justification |
|---|---|---|---|---|
| Couverture du périmètre | 30 % | 75 % | 22,5 % | Étapes 4-8 couvrent L.131-3 / L.131-4 / L.121-1 / chaîne de titularité. Mais aucune mention explicite de L.131-1 « œuvres futures » dans l'étape rédaction clause, et la mécanique « médias inconnus à venir = nullité » n'est pas verrouillée. |
| Détection nuances métier | 30 % | 55 % | 16,5 % | L.113-9 logiciel-only correctement isolé ; L.131-4 al. 2 listé exhaustivement (6 cas) ; L.113-7 audiovisuelle nommé. Gaps : Cass. 1re civ. 9 oct. 1991 (médias futurs) absente, L.132-25 (présomption producteur AV) absente, L.112-4 al. 2 (protection titre) absente, droit à l'image personnages réels absent, articulation scénario-avant-AV vs L.132-25 non traitée. |
| Qualité arbitrage subjectif | 20 % | 80 % | 16,0 % | Échelle canonique 🔴🟠🟡🟢 reprise verbatim avec définitions adaptées (nullité L.131-3, L.131-1 œuvres futures, forfait injustifié L.131-4 al. 2). Plancher cross-skill nommé. Routage fermé sur 10 valeurs incluant `hold-insufficient-basis` et `route-to-license-instead`. Mais aucune fourchette chiffrée (% NRA) proposée. |
| Lisibilité partner-ready | 10 % | 85 % | 8,5 % | Sortie 9 blocs strictement verrouillée + note relecteur unique + arbre 5 options + mode silencieux externe documenté. Brouillon de clauses prêtes à substituer prévu via mode `--clause-only`. Plan multi-sprints absent (le skill produit clauses, pas plan d'action séquencé). |
| Résistance aux pièges | 10 % | 60 % | 6,0 % | Forfait écarté par défaut (exemple 1 explicite « forfait écarté car cas exceptionnels non remplis ») → piège 1 bloqué. Piège 2 (droit moral inaliénable) bloqué par étape 8. Piège 3 (Camille Bernard) seulement partiellement : la chaîne de titularité oblige à auditer coauteurs mais aucune mention que L.113-9 NE s'applique PAS aux scénarios → un assistant zélé pourrait l'invoquer à tort. Piège 4 (médias futurs) non explicitement bloqué dans le SKILL — l'étape 6 cite « supports connus / inconnus à la date du contrat » sans nullité. Piège 5 (titre antérieur ATLAS) hors radar. Piège 6 (L.132-25 vs L.131-3) hors radar. |
| **Total pondéré** | **100 %** | — | **69,5 %** | **Verdict 🟠 (sous le seuil 75 %)** |

---

## Justification détaillée par dimension

### Couverture du périmètre (poids 30 %, score 75 %)

Le SKILL.md verrouille un workflow correct sur L.131-3 (étape 6 — énumération distincte, durée, territoire, supports), L.131-4 (étape 7 — principe proportionnel + 5 exceptions al. 2 listées), L.121-1 (étape 8 — inaliénable mentionné comme planche), L.111-1 (étape 4 — auteur initial), L.113-2/7/9 (étape 5 — collaboration/AV/logiciel). Le contrat d'entrée fermé impose `creation_context` incluant `commissioned-work` et `audiovisual` — donc le cas Lefevre/ATLAS rentre proprement dans la grille.

Manques :
- **L.131-1 (interdiction cession globale œuvres futures)** est cité dans la liste des articles à privilégier et dans la grille de criticité 🔴 mais l'étape 6 « Rédaction clause L.131-3 conforme » ne mentionne ni « médias inconnus à venir = clause nulle » ni la jurisprudence Cass. 1991. Un assistant suivant la lettre du skill pourrait valider la formulation ATLAS « tous médias connus à ce jour et à venir » en l'amendant à la marge.
- Pas de checklist explicite « titre de l'œuvre » dans les faits minimums requis.
- Pas de checklist « personnages inspirés personnes réelles ».

### Détection nuances métier (poids 30 %, score 55 %)

**Points forts** :
- L.113-9 correctement bordé : section « Frontière avec les autres skills » renvoie explicitement à `revue-logiciel-donnees` et la cote 🔴 du seuil de préparation cite `route-to-software-regime-review`. Donc le risque qu'un assistant invoque L.113-9 pour le scénario de Camille Bernard est partiellement bloqué — mais pas l'inverse : le skill ne dit pas que L.113-9 NE s'applique PAS aux œuvres non-logicielles dans le corps de la rédaction (uniquement par routage).
- L.131-4 al. 2 listé exhaustivement (6 cas) — un assistant peut donc cocher case par case et conclure que le forfait n'est justifié dans aucun.
- L.113-7 audiovisuelle nommée dans le contrat d'entrée et l'étape 10.

**Gaps significatifs** :
- **Cass. 1re civ. 9 oct. 1991 absente** — pourtant pivot du domaine pour les médias futurs. Le skill ne pousse pas vers cette jurisprudence ; la mention « supports connus / inconnus à la date du contrat » à l'étape 6 est ambiguë et ne tranche pas la nullité.
- **L.132-25 absent** — la nuance critique « scénario écrit AVANT production AV = L.131-3 classique ≠ présomption producteur L.132-25 » n'est nulle part. Un assistant pourrait conclure à tort que la cession est implicite.
- **L.112-4 al. 2 (protection titre)** absent — le titre « LES OMBRES DE NORD » et l'antériorité ATLAS sur slogan publicitaire ne sont pas captés.
- **Droit à l'image / vie privée des personnages réels** : aucun garde-fou. La garantie d'éviction Art. 9 du contrat ATLAS est insuffisante mais le skill ne le verra pas.
- **Droit moral perpétuel post mortem (L.121-1 al. 4)** : mentionné comme « inaliénable, imprescriptible, perpétuel » mais l'articulation « héritiers peuvent contester les modifications anticipativement autorisées » n'est pas tirée.
- **Cass. 1re civ. 11 déc. 2008** (limites du forfait audiovisuel) absente — utile pour ne pas céder à l'argument ATLAS « 25 % du budget production ».

### Qualité arbitrage subjectif (poids 20 %, score 80 %)

L'échelle canonique 🔴🟠🟡🟢 est reprise verbatim avec définitions tirées du domaine : « cession sans mention obligatoire L.131-3 (nullité encourue), ou portant sur œuvre future indéterminée (L.131-1), ou rémunération forfaitaire injustifiée au regard de L.131-4 al.2 » = exactement les 3 cotes 🔴 attendues par la vérité terrain. Le seuil fermé `ready` / `partial` / `blocked` discipline la sortie. Le routage fermé sur 10 valeurs (incluant `route-to-license-instead` et `hold-insufficient-basis`) empêche la prose libre.

Manque : aucune fourchette chiffrée pour le proportionnel (la vérité terrain attend « 1-3 % NRA recettes nettes producteur »). Le skill délègue le chiffrage à la pratique du cabinet sans guide.

### Lisibilité partner-ready (poids 10 %, score 85 %)

Sortie 9 blocs strictement verrouillée (`Synthèse`, `Seuil`, `Work And Title Preconditions`, `Branche`, `Rights Scope`, `Economic Structure`, `Title-Chain Cleanup Or Blocking Points`, `Routage`, `Validation humaine`) + note relecteur unique + arbre 5 options + mode silencieux externe documenté. Mode `--clause-only` permet de livrer 3 clauses prêtes à substituer (Art. 3 / Art. 5 / Art. 7). En-tête confidentialité différencié par rôle. Un livrable produit selon le template est directement partner-ready.

Léger défaut : pas de prévision d'un plan multi-sprints (Sprint 1 / 2 / 3) comme attendu par la vérité terrain. Le skill produit clauses + routage mais pas séquencement.

### Résistance aux pièges (poids 10 %, score 60 %)

- **Piège 1 (valider forfait au motif « pratique audiovisuelle »)** — bloqué : exemple 1 du skill cite explicitement « forfait écarté car cas exceptionnels non remplis » et l'étape 7 énumère les 6 cas limitatifs.
- **Piège 2 (confondre moral / patrimonial)** — bloqué : étape 8 + ton (« Rappeler systématiquement que le droit moral L.121-1 est inaliénable »).
- **Piège 3 (oublier Camille Bernard)** — partiellement : la chaîne L.113-9 est correctement isolée au logiciel via routage mais le SKILL n'écrit nulle part « L.113-9 ne s'applique pas aux scénarios ». Un lecteur diagonal peut manquer la co-écriture.
- **Piège 4 (valider médias futurs)** — non bloqué : étape 6 cite « supports connus / inconnus à la date du contrat » sans verrouiller la nullité de l'inclusion des médias inconnus.
- **Piège 5 (oublier titre antérieur ATLAS)** — non bloqué : aucune référence à L.112-4 al. 2.
- **Piège 6 (confondre L.132-25 et L.131-3)** — non bloqué : L.132-25 n'apparaît pas dans le SKILL.

---

## Gaps DESIGN du skill identifiés (mini-backlog)

🔴 **Cass. 1re civ. 9 oct. 1991 et nullité « médias inconnus à venir »** — le skill cite L.131-1 dans la grille de cotation mais ne verrouille pas la nullité dans l'étape 6 rédaction. À ajouter une note dure : « toute formulation incluant les "modes d'exploitation à venir" ou "supports inconnus" est nulle de plein droit (Cass. 1re civ. 9 oct. 1991) — exiger soit une énumération exhaustive des modes connus, soit une clause de rendez-vous explicite avec rémunération recalculée ».

🔴 **L.132-25 vs L.131-3 — scénario AV avant production** — la nuance pivot « scénario écrit avant la production audiovisuelle ne bénéficie pas de la présomption producteur L.132-25, il reste sous L.131-3 classique » est absente. À ajouter étape 5 (qualité auteur) un sous-paragraphe : « œuvre audiovisuelle achevée → L.132-25 présomption producteur ; scénario / bible / dialogues livrés avant production → L.131-3 classique, pas de présomption ».

🟠 **L.112-4 al. 2 protection du titre absent** — à ajouter en étape 4 (audit titre auteur initial) un sous-paragraphe explicite : « le titre de l'œuvre est protégé par L.112-4 al. 2 — vérifier antériorité d'usage par le cessionnaire ou un tiers, clarifier si la cession porte sur l'œuvre, le titre, ou les deux ».

🟠 **L.113-9 « ne s'applique PAS aux non-logiciels » non écrit en dur** — le routage isole correctement le logiciel, mais aucune phrase n'empêche un assistant d'invoquer L.113-9 par analogie pour Camille Bernard salariée ATLAS. À ajouter étape 5 un encart : « pour les œuvres non-logicielles d'un salarié, PAS de cession automatique à l'employeur — exiger une cession écrite expresse (contrat de travail ou cession ad hoc) ».

🟠 **Personnages inspirés de personnes réelles** — la garantie d'éviction de l'étape 5 (« contrats freelance et prestataires : cession écrite expresse requise ») ne couvre pas le risque droit à l'image / vie privée. À ajouter dans les faits minimums requis : « personnes réelles représentées dans l'œuvre — vérifier autorisations écrites » + sous-section dans l'étape 4 ou 5.

🟡 **Fourchettes chiffrées proportionnelles absentes** — l'étape 7 traite l'arbitrage proportionnel / forfait sans donner de fourchette de pratique (1-3 % NRA recettes nettes producteur en audiovisuel). À ajouter en référence externe (`references/baremes-remuneration-cession.md`) sans figer dans le SKILL.

🟡 **Cass. 1re civ. 11 déc. 2008 absente** — utile pour neutraliser l'argument cessionnaire « le forfait représente X % du budget production ». À ajouter en bas de l'étape 7.

🟡 **Droit moral perpétuel post mortem (L.121-1 al. 4)** — mentionné comme caractère mais l'articulation avec les renonciations anticipatives n'est pas tirée. À ajouter en étape 8 : « les héritiers peuvent contester ex post les modifications anticipativement autorisées par l'auteur — préférer une autorisation contextuelle, non générale ».

🟡 **Plan d'action multi-sprints non prévu** — la vérité terrain attend un séquencement Sprint 1 (clauses) / Sprint 2 (autorisations) / Sprint 3 (signature + RFA). Le skill produit clauses + routage mais pas plan séquencé. À considérer pour le mode `full-assignment` complet.

`[bonus]` Le skill enforce mieux que la vérité terrain la séparation des modes courts (`--chain-of-title` / `--clause-only` / `--remuneration-only`) et le routage fermé sur 10 valeurs. La grille de criticité 🔴 cite directement « œuvre future indéterminée (L.131-1) » et « forfaitaire injustifiée L.131-4 al. 2 » — c'est plus disciplinant qu'attendu pour ces deux pièges spécifiques.

---

## Recommandations pour vague ultérieure

1. **Étape 6 — verrouiller la nullité médias futurs** : ajouter une mention dure Cass. 1re civ. 9 oct. 1991 et la règle « modes d'exploitation prévisibles à la date du contrat uniquement ; clause de rendez-vous obligatoire pour les médias futurs ».
2. **Étape 5 — distinguer scénario vs œuvre AV finalisée** : ajouter sous-paragraphe L.131-3 classique vs L.132-25 présomption producteur.
3. **Étape 4 — audit du titre** : ajouter L.112-4 al. 2 et vérification antériorité d'usage du titre.
4. **Étape 5 / Faits minimums** : ajouter contrôle « salarié non-logiciel — cession explicite requise » + « personnes réelles représentées — autorisations écrites requises ».
5. **Référence externe** : `baremes-remuneration-cession.md` avec fourchettes de pratique audiovisuelle (1-3 % NRA).
6. **Frontmatter** : ajouter `L.131-1`, `L.132-25`, `L.112-4`, `L.121-1-al-4` aux `tags:`.
