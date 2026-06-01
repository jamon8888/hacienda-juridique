# Tests `hacienda-propriete-intellectuelle`

Suite de tests reproductibles pour la validation interne du plugin PI.

## Structure

```
tests/
├── README.md                           # ce fichier
└── datasets/
    ├── pii-cas-a/                      # corpus sous seuil B → footer A
    ├── pii-cas-b/                      # corpus avec catégorie sensible PI → prompt B
    ├── v2-marque/                      # vague C — scoring `recherche-anteriorite-marque`
    ├── v2-brevet/                      # vague C — scoring `preparation-depot-brevet`
    ├── v2-dm/                          # vague C — scoring `depot-dessin-modele`
    ├── v2-auteur/                      # vague C — scoring `cession-droit-auteur`
    ├── v2-oss/                         # vague C — scoring `revue-open-source`
    └── v2-contentieux/                 # vague C — scoring `contentieux-pi`
```

## Mode d'emploi

Les datasets sont des corpus **fictifs** destinés à valider le comportement des
skills PI. Toute ressemblance avec des dossiers, marques, brevets ou personnes
réelles serait fortuite.

### Tests PII (vague A)

Lancer manuellement depuis Claude Cowork avec le plugin PI installé :

```
/h-pi:check-pii plugins/hacienda-propriete-intellectuelle/tests/datasets/pii-cas-a/dossier.md
```

**Résultats attendus** :

| Dossier | Résultat attendu | Politique testée |
|---|---|---|
| `pii-cas-a` | footer A discret en fin de sortie, pas de prompt bloquant | `active` (défaut) |
| `pii-cas-b` | prompt B bloquant avec CTA `marketplace://hacienda-ghost`, avertissement spécifique brevets pré-publication | `active` (défaut) |

### Tests métier (vague C — à venir)

Voir `docs/superpowers/plans/2026-05-31-hacienda-pi-alignement-da-vagues-abc.md` §
Vague C pour la grille de scoring sparring K7M2PX.

## Convention

- Datasets en Markdown autonome (un seul fichier `dossier.md` par cas).
- Préfixe `pii-*` pour les tests pré-flight PII.
- Préfixe `v2-*` pour les tests de scoring métier (alignement nommage DA).
- Préfixe `d2-*` pour les tests de scoring blind protocole D.0 (un dossier par skill avec `scenario.md` + `ground-truth.md` + `live-output.md` séparés).

## Méthodologie sparring scoring

Tout dataset destiné à servir de support à un sparring scoring justifiant une
décision release doit suivre le **protocole blind à 4 phases** défini dans
[`docs/methodology/sparring-scoring-protocol.md`](../../../docs/methodology/sparring-scoring-protocol.md).

Concrètement :
- Phase 1 (scenario) et Phase 2 (ground-truth) sont produites dans des sessions
  et modèles différents (Codex GPT-5.5).
- La vérité terrain est conservée dans un fichier séparé `ground-truth.md`,
  non accessible à l'exécuteur Phase 3 (Claude Code).
- Le scoring Phase 4 est conduit par un acteur distinct des trois précédentes
  sans accès au SKILL.md du skill évalué.

Helper Codex scripté : [`scripts/codex-blind-scoring.py`](../../../scripts/codex-blind-scoring.py).

Les datasets `v2-*` créés en vague C (2026-05-31) ont été produits **avant
formalisation du protocole** et sont marqués rétroactivement
`[scoring auto-référent — méthodologie pré-D.0]`. La re-validation blind
des 6 skills cœur correspondants est prévue en D.3 du plan vague D
(`docs/superpowers/plans/2026-06-01-hacienda-pi-vague-d-release-readiness.md`).
