# Tests datasets — hacienda-droit-affaires v1

Datasets de référence pour mesurer les critères d'acceptance techniques v1 (cf. `docs/superpowers/specs/2026-05-18-hacienda-droit-affaires-design.md` §Critères d'acceptation).

## Structure

```
tests/
├── README.md              ← ce fichier — protocole d'exécution et scoring
└── datasets/
    ├── citations-test.md  ← 20 citations test pour verifier-citations (critère 3)
    └── pii-test/          ← 5 documents PII synthétiques pour check-pii (critère 4)
        ├── doc-1-iban.md
        ├── doc-2-nir.md
        ├── doc-3-montants.md
        ├── doc-4-sante.md
        └── doc-5-id.md
```

---

## Critère 3 — `verifier-citations` ≥ 95 % détection

### Dataset

`datasets/citations-test.md` — 20 citations annotées :
- 10 articles en vigueur (Code civil + Code commerce, droit affaires)
- 4 articles abrogés réforme 2016 (ancien 1108, 1134, 1147, 1382)
- 3 articles fictifs (numéros invraisemblables 9999, L.999-9, R.5555-55)
- 2 arrêts jurisprudence connus + 1 arrêt fictif

### Protocole d'exécution

1. **Lancer Claude Code dans le repo** (`claude` depuis la racine).
2. **Coller** le bloc « Texte porteur » (uniquement, pas l'inventaire annoté) dans une nouvelle conversation.
3. **Invoquer** :
   ```
   /h-da:verifier-citations
   ```
   sur le texte collé.
4. **Récupérer** la sortie annotée : chaque citation doit porter un tag `[Légifrance ✓]`, `[Judilibre ✓]`, `[abrogé]`, `[non trouvé]` ou `[à vérifier]`.
5. **Comparer** ligne à ligne avec l'inventaire annoté (vérité terrain).

### Scoring (cibles v1)

| Métrique | Calcul | Cible | Bloquant ? |
|---|---|---|---|
| Taux global | (citations correctement classées) / 20 | ≥ 95 % (19/20) | OUI |
| Faux négatifs critiques | Citation problématique classée ✅ en vigueur | **0 toléré** | OUI |
| Faux positifs | Citation valide taguée problématique | ≤ 2 | NON (sur-flag est récupérable, le sous-flag non) |
| Abrogations détectées | (4 abrogés détectés) / 4 | **100 %** | OUI |
| Fictifs détectés | (4 fictifs flaggés) / 4 | **100 %** | OUI |

### Modes dégradés à mesurer

Voir `datasets/citations-test.md` §« Modes dégradés à mesurer séparément » pour :
- Mode 1 — PISTE + Judilibre configurés (nominal)
- Mode 2 — PISTE absent (Légifrance KO)
- Mode 3 — Judilibre KO

### Documentation des résultats

Créer `docs/superpowers/specs/2026-05-18-hacienda-droit-affaires-acceptance-results.md` avec :
- Date d'exécution + mode (1/2/3)
- Sortie verifier-citations brute (annotations)
- Tableau de scoring rempli
- Verdict OUI/NON sur le critère 3
- Captures éventuelles de cas litigieux pour itération

---

## Critère 4 — `check-pii` ≥ 90 % détection par catégorie sensible

### Dataset

`datasets/pii-test/` — 5 documents synthétiques, 1 par catégorie B :
- `doc-1-iban.md` — IBAN FR valide (checksum OK) + IBAN UE
- `doc-2-nir.md` — NIR (numéro sécu) FR valide checksum
- `doc-3-montants.md` — Montants nominatifs > 10k€ (clause pénale, plafond GAP)
- `doc-4-sante.md` — Données de santé (lexique trigger : pathologie, ALD)
- `doc-5-id.md` — Numéros pièces d'identité (CNI, passeport)

### Protocole d'exécution

1. **Lancer Claude Code** sur la racine du repo.
2. Pour chaque fichier `doc-N-*.md` :
   ```
   /h-da:check-pii plugins/hacienda-droit-affaires/tests/datasets/pii-test/doc-N-X.md
   ```
3. **Vérifier** que le verdict du skill est :
   - Catégorie B atteinte (puisque chaque doc contient au moins 1 catégorie B)
   - Prompt utilisateur déclenché (politique défaut `active`)
   - Détail des catégories détectées présent en sortie
4. **Mesurer** : pour chaque catégorie B, le skill l'a-t-il détectée dans le doc dédié ?

### Scoring (cibles v1)

| Métrique | Calcul | Cible | Bloquant ? |
|---|---|---|---|
| Détection par catégorie | (catégories détectées) / 5 | **≥ 90 %** (5/5 idéal, 4/5 OK borderline) | OUI à 4/5 |
| Faux négatifs IBAN/NIR | IBAN ou NIR raté | **0 toléré** | OUI (checksum déterministe) |
| Seuil B déclenche prompt | Prompt utilisateur visible | 5/5 | OUI |
| Footer A si politique passive | Footer présent si politique forcée passive | manuel | NON |

### Documentation

Même fichier `acceptance-results.md` que pour critère 3.

---

## Critère 5 — En-tête de confidentialité + note du relecteur

Vérifié manuellement sur **chaque sortie** produite pendant les tests des critères 3 et 4 :

- [ ] En-tête présent (variante adaptée au rôle utilisateur configuré dans le profil)
- [ ] Note du relecteur 5 champs canoniques en gras présente
- [ ] Aucun caveat dispersé dans le corps du livrable (tout consolidé dans la note)

Cible : **100 % des sorties**. 1 manquement = critère NON.

---

## Critère 9 — Cohabitation reviser-contrat ↔ PI:contrats-pi

Voir item C1 du handoff `docs/handoff/latest.md` — 5 cas test mixtes à créer en passe ultérieure (non couvert par les datasets ci-dessus).

---

## Hors scope des datasets — Validation utilisateurs (4 semaines)

Les critères d'acceptance d'usage (6, 7 — sessions hebdo frère + dossiers ami) sont **mesurés en environnement personas réels**, pas en datasets synthétiques. Voir `docs/testing/2026-05-droit-affaires-poc-tracking.md` (à créer au démarrage du POC personas).

---

*Datasets constitués 2026-05-19 — Hacienda. Constitution à la main, articles vérifiés contre Légifrance pour les positifs, abrogations citent l'ordonnance 2016-131 du 10 février 2016. PII synthétique uniquement, aucune donnée personnelle réelle.*

---

## Méthodologie sparring scoring (applicable à toute future validation)

Tout sparring scoring DA justifiant une décision release doit suivre le
**protocole blind à 4 phases** défini dans
[`docs/methodology/sparring-scoring-protocol.md`](../../../docs/methodology/sparring-scoring-protocol.md).

Helper Codex scripté : [`scripts/codex-blind-scoring.py`](../../../scripts/codex-blind-scoring.py).

Les scorings DA historiques **K7M2PX** (`spa-review`) et **R7M2KX** / **R4VN9W** ont
été produits avant formalisation du protocole. Ils servent de référence
directionnelle mais ne sont pas release-grade au sens du protocole D.0. Toute
re-validation blind ultérieure suivra le protocole.
