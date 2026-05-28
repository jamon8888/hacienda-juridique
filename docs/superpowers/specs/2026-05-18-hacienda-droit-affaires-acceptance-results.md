# Résultats d'acceptance — hacienda-droit-affaires v1

> **Statut : DRAFT — à remplir pendant la phase de validation personas.**
>
> Ce document recense les résultats mesurés des critères d'acceptance v1
> définis dans `2026-05-18-hacienda-droit-affaires-design.md` §Critères
> d'acceptation. Les sections « Technique » sont pré-remplies (mesurées en
> session de développement 2026-05-20). Les sections « Datasets » et
> « Usage » sont à compléter par l'exécutant et les personas.
>
> **Décision finale :** bump `v0.1.0 → v1.0.0` UNIQUEMENT si tous les
> critères bloquants sont au vert.

---

## Métadonnées d'exécution

| Champ | Valeur |
|---|---|
| Version testée | 0.1.0 |
| Date début validation | _(à remplir)_ |
| Date fin validation | _(à remplir)_ |
| Exécutant technique | _(à remplir)_ |
| Persona M&A (frère) | _(à remplir — managing partner)_ |
| Persona procédures collectives (ami) | _(à remplir — indépendant)_ |
| Environnement | Claude Cowork / Claude Code CLI _(préciser)_ |
| Intégrations actives | PISTE : _oui/non_ · Pappers : _oui/non_ · Judilibre : _oui/non_ |

---

## 1. Critères techniques (mesurables)

### 1.1 — Suite automatisée — ✅ PASS (mesuré 2026-05-20)

| Critère | Cible | Résultat | Verdict |
|---|---|---|---|
| `npx vitest run` (packages/core) | vert | 306 passed / 3 skipped (live) / 0 failure — 72 fichiers | ✅ |
| `npm run typecheck` | 0 erreur | exit 0 (core + 3 mcp-servers dont droit-affaires) | ✅ |
| `npm run build` | tout compile | exit 0 | ✅ |
| `npm run branding:check` | PASS | « Branding Hacienda OK » | ✅ |
| `git diff --check` | propre | 0 whitespace error | ✅ |
| Smoke install Claude CLI | installable | `claude plugin install hacienda-droit-affaires@hacienda-juridique` → ✔ installed, 9 skills + 3 agents + 1 MCP server | ✅ |

**Commande de revérification :**
```bash
cd packages/core && npx vitest run && cd ../.. && npm run typecheck && npm run build && npm run branding:check && git diff --check
```

### 1.2 — `verifier-citations` — taux de détection ≥ 95 % (critère 3)

> **Protocole :** `plugins/hacienda-droit-affaires/tests/README.md` §1
> **Dataset :** `plugins/hacienda-droit-affaires/tests/datasets/citations-test.md` (20 citations)

**Mode 1 — PISTE + Judilibre configurés (nominal)**

| Métrique | Calcul | Cible | Résultat | Verdict |
|---|---|---|---|---|
| Taux global | (citations correctement classées) / 20 | ≥ 95 % (19/20) | _.../20_ | _ _ |
| Faux négatifs critiques | citation problématique classée ✅ en vigueur | 0 | _..._ | _ _ |
| Faux positifs | citation valide taguée problématique | ≤ 2 | _..._ | _ _ |
| Abrogations détectées | (4 abrogés détectés) / 4 | 100 % | _.../4_ | _ _ |
| Fictifs détectés | (4 fictifs flaggés) / 4 | 100 % | _.../4_ | _ _ |

**Mode 2 — PISTE absent (Légifrance KO) :** _(résultat — aucune hallucination de validation attendue)_

**Mode 3 — Judilibre KO :** _(résultat — jurisprudence taguée `[à vérifier]` attendue)_

Sortie brute `verifier-citations` (annotations) : _(coller ou lier)_

### 1.3 — `check-pii` — détection ≥ 90 % par catégorie sensible (critère 4)

> **Protocole :** `plugins/hacienda-droit-affaires/tests/README.md` §2
> **Dataset :** `plugins/hacienda-droit-affaires/tests/datasets/pii-test/` (5 documents)

| Document | Catégorie B ciblée | Détectée ? | Seuil B → prompt ? | Verdict |
|---|---|---|---|---|
| doc-1-iban.md | IBAN (mod 97) | _oui/non_ | _oui/non_ | _ _ |
| doc-2-nir.md | NIR (clé) | _oui/non_ | _oui/non_ | _ _ |
| doc-3-montants.md | Montants > 10 k€ | _oui/non_ | _oui/non_ | _ _ |
| doc-4-sante.md | Données de santé | _oui/non_ | _oui/non_ | _ _ |
| doc-5-id.md | CNI / passeport | _oui/non_ | _oui/non_ | _ _ |

| Métrique | Cible | Résultat | Verdict |
|---|---|---|---|
| Détection par catégorie | ≥ 90 % (5/5 idéal, 4/5 borderline) | _.../5_ | _ _ |
| Faux négatifs IBAN / NIR | 0 (checksum déterministe) | _..._ | _ _ |
| Seuil B déclenche le prompt | 5/5 | _.../5_ | _ _ |

### 1.4 — En-tête confidentialité + note du relecteur (critère 5)

> Vérifié manuellement sur **chaque sortie** produite pendant les tests 1.2, 1.3 et 4.

| Contrôle | Cible | Résultat | Verdict |
|---|---|---|---|
| En-tête présent (variante adaptée au rôle) | 100 % des sorties | _..._ | _ _ |
| Note du relecteur 5 champs canoniques en gras | 100 % des sorties | _..._ | _ _ |
| Aucun caveat dispersé hors note du relecteur | 100 % | _..._ | _ _ |

### 1.5 — Modes dégradés (critères acceptance 1 & 2)

| Mode dégradé | Attendu | Résultat | Verdict |
|---|---|---|---|
| Sans Pappers | fallback BODACC public fonctionnel | _..._ | _ _ |
| Sans PISTE | `verifier-citations` mode dégradé, citations `[à vérifier]` | _..._ | _ _ |
| Sans `hacienda-ghost` | plugin fonctionne, `check-pii` avertit | _..._ | _ _ |

### 1.6 — Hallucinations d'article sur 50 sorties test

| Métrique | Cible | Résultat | Verdict |
|---|---|---|---|
| Articles fabriqués / abrogés présentés comme valides | 0 sur 50 sorties | _.../50_ | _ _ |

---

## 2. Cohabitation `reviser-contrat` ↔ `PI:contrats-pi` (critère 9)

> **Protocole :** `plugins/hacienda-droit-affaires/tests/datasets/cohabitation-pi/README.md`
> **Pré-requis :** plugin `hacienda-propriete-intellectuelle` installé et configuré.

| Cas | Routing attendu | Routing observé | Verdict |
|---|---|---|---|
| 1 — Licence brevet pure | Route 100 % → `contrats-pi` | _..._ | _ _ |
| 2 — Coexistence marques + non-conc | Mixte, option (c) séquence | _..._ | _ _ |
| 3 — NDA R&D + IP carve-out | `reviser-nda` puis renvoi `contrats-pi` art. 6 | _..._ | _ _ |
| 4 — Cession fonds + marque enseigne | `reviser-contrat` + renvoi ponctuel art. 3 | _..._ | _ _ |
| 5 — SPA M&A + portefeuille PI | `gap-review` + renvoi `contrats-pi` axe 5 | _..._ | _ _ |

| Métrique | Cible | Résultat | Verdict |
|---|---|---|---|
| Cas avec routing correct du premier coup | ≥ 4/5 | _.../5_ | _ _ |
| Faux routing critique (contrat PI traité à fond sans renvoi) | 0 | _..._ | _ _ |
| Mode « les deux en séquence » sans perte d'information | OUI binaire | _..._ | _ _ |

---

## 3. Critères d'usage — validation personas 4 semaines (critères 6 & 7)

### 3.1 — Persona frère (managing partner M&A)

| Semaine | Sessions | Skills utilisés | Retour qualitatif |
|---|---|---|---|
| S1 | _.../≥3_ | _..._ | _..._ |
| S2 | _.../≥3_ | _..._ | _..._ |
| S3 | _.../≥3_ | _..._ | _..._ |
| S4 | _.../≥3_ | _..._ | _..._ |

| Critère | Cible | Résultat | Verdict |
|---|---|---|---|
| Sessions hebdomadaires | ≥ 3/sem sur 4 semaines | _..._ | _ _ |
| Skills jugés « à garder » | ≥ 2 sur 7 user-facing | _..._ | _ _ |

### 3.2 — Persona ami (indépendant procédures collectives)

| Dossier | Type | `declaration-creance` utilisé ? | Calcul forclusion correct ? |
|---|---|---|---|
| 1 | _..._ | _oui/non_ | _oui/non_ |
| 2 | _..._ | _oui/non_ | _oui/non_ |
| 3 | _..._ | _oui/non_ | _oui/non_ |
| 4 | _..._ | _oui/non_ | _oui/non_ |
| 5 | _..._ | _oui/non_ | _oui/non_ |

| Critère | Cible | Résultat | Verdict |
|---|---|---|---|
| Dossiers réels traités | ≥ 5 | _.../5_ | _ _ |
| Erreurs de calcul forclusion | 0 | _..._ | _ _ |

### 3.3 — Transversal

| Critère | Cible | Résultat | Verdict |
|---|---|---|---|
| Erreurs juridiques bloquantes signalées | 0 | _..._ | _ _ |
| Note du relecteur jugée utile (vs bruit) | OUI binaire | _..._ | _ _ |

---

## 4. Synthèse et décision

### 4.1 — Tableau de bord des 10 critères d'acceptance

| # | Critère d'acceptance | Bloquant ? | Verdict |
|---|---|---|---|
| 1 | Installable sans ghost / Pappers / PISTE — mode dégradé tagué | oui | _ _ |
| 2 | Avec Pappers + PISTE : toutes sources opérationnelles | oui | _ _ |
| 3 | `verifier-citations` ≥ 95 % sur 20 citations | oui | _ _ |
| 4 | `check-pii` ≥ 90 % par catégorie + prompt B au seuil | oui | _ _ |
| 5 | En-tête confidentialité + note du relecteur sur toutes les sorties | oui | _ _ |
| 6 | Frère ≥ 3 sessions/sem × 4 sem + ≥ 2 skills « à garder » | oui | _ _ |
| 7 | Ami ≥ 5 dossiers via `declaration-creance`, 0 erreur forclusion | oui | _ _ |
| 8 | `npm test` / `typecheck` / `build` / `branding:check` / `git diff --check` verts | oui | ✅ (2026-05-20) |
| 9 | Cohabitation `reviser-contrat` ↔ `contrats-pi` validée sur 5 cas | oui | _ _ |
| 10 | Déprécation `hacienda-contrats` / `hacienda-societes` planifiée v2 et documentée | oui | ✅ (roadmap CHANGELOG + design spec) |

### 4.2 — Décision

- [ ] **Tous les critères bloquants au vert** → bump `v0.1.0 → v1.0.0`
  ```bash
  # Mettre à jour plugin.json (version), CHANGELOG.md, README.md (header)
  git commit -m "chore(droit-affaires): bump 0.1.0 → 1.0.0 — acceptance v1 validée"
  ```
- [ ] **Un ou plusieurs critères au rouge** → consigner les écarts ci-dessous, itérer, ne pas bumper.

### 4.3 — Écarts constatés et plan d'itération

_(à remplir — pour chaque critère au rouge : description de l'écart, hypothèse de cause, action corrective, skill/fichier concerné)_

| Critère | Écart constaté | Cause probable | Action corrective |
|---|---|---|---|
| _..._ | _..._ | _..._ | _..._ |

---

## Annexe — Références

- Spec design : `docs/superpowers/specs/2026-05-18-hacienda-droit-affaires-design.md`
- Plan d'implémentation : `docs/superpowers/plans/2026-05-18-hacienda-droit-affaires-v1.md`
- Protocoles datasets : `plugins/hacienda-droit-affaires/tests/README.md`
- Cas cohabitation PI : `plugins/hacienda-droit-affaires/tests/datasets/cohabitation-pi/README.md`
- Suivi POC personas (à créer) : `docs/testing/2026-05-droit-affaires-poc-tracking.md`

---

*Draft créé 2026-05-20 — Hacienda. Sections « Technique 1.1 » pré-remplies en session de développement ; le reste est à mesurer en phase de validation.*
