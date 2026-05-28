# Revue Portefeuille Brevets V2 - Routing And Output

## Role

`revue-portefeuille-brevets` est un hub portefeuille centré sur :

- `report`
- `audit`
- dashboard HTML optionnel
- priorisation annuites / expirations / regularisations

Les modes `add`, `update`, `remove`, `list` restent une maintenance secondaire
du registre `portfolio-brevets.yaml`.

## Closed Intake For `report` / `audit`

- `portfolio_source_status`: `present` / `missing` / `partial`
- `annuity_visibility_status`: `clear` / `partial` / `blocked`
- `ownership_visibility_status`: `clear` / `partial` / `blocked`
- `cross_registry_status`: `available` / `missing` / `partial`
- `dashboard_mode`: `markdown-only` / `markdown-plus-dashboard` /
  `dashboard-required`
- `portfolio_readiness`: `ready` / `partial` / `blocked`

## Minimal Fact Set

- `portfolio_path`
- `asset_count`
- `last_audit`
- `annuity_entries_present`
- `expiring_assets_present`
- `strategic_levels_present`
- `business_owner_coverage`
- `mandataire_coverage`
- `cross_reference_marques_status`

## Portfolio Readiness Gate

### `ready`

- registre present ;
- annuites exploitables ;
- owners et mandataires suffisants ;
- priorisation credible.

### `partial`

- registre present mais incomplet ;
- findings ou buckets possibles avec `[à vérifier]`.

### `blocked`

- registre absent ou inexploitable ;
- annuites trop lacunaires ;
- owners / mandataires trop incomplets ;
- regularisation necessaire avant vrai rapport.

## `report` Output Contract

1. `Portfolio Snapshot`
2. `Portfolio Readiness Gate`
3. `Annuity Priority`
4. `Expirations And Lifecycle`
5. `Ownership And Coverage`
6. `Cross-Registry Signals`
7. `Critical Gaps`
8. `Decision Routing`
9. `Human Validation`

## `audit` Output Contract

1. `Portfolio Readiness Gate`
2. `Critical Findings`
3. `Severity`
4. `Regularization Actions`
5. `Human Validation`

## Dashboard Rules

- reutiliser strictement `renderDashboard` de `@hacienda/core`
- ne pas maintenir un template HTML parallele
- dashboard coherent avec le Markdown
- valeurs incertaines marquees `[à vérifier]`
- valeurs provisoires marquees `[PROVISOIRE]`

## Closed Routing

- `prepare-annuity-escalation`
- `prepare-portfolio-cleanup`
- `prepare-succession-review`
- `prepare-cross-registry-review`
- `hold-for-registry-regularization`

## Boundaries

- `preparation-depot-brevet`: brief de depot
- `strategie-extension-internationale`: sequencement territorial
- `analyse-refus-inpi`: notification office
- `anteriorite-invalidite`: validite adverse
- `tableau-contrefacon-brevet`: claim chart offensif
- `audit-pi-ma`: lecture transactionnelle multi-actifs
- `portefeuille-pi`: lecture consolidee federée
