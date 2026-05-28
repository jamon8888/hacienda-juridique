# Revue Portefeuille Marques V2 - Routing And Output

## Role

`revue-portefeuille-marques` est un hub portefeuille centre sur :

- `report`
- `audit`
- dashboard HTML optionnel
- priorisation renouvellements / regularisations / gaps de surveillance

Les modes `add`, `update`, `remove`, `list` restent une maintenance
secondaire du registre `portfolio.yaml`.

## Closed Intake For `report` / `audit`

- `portfolio_source_status`: `present` / `missing` / `partial`
- `renewal_visibility_status`: `clear` / `partial` / `blocked`
- `ownership_visibility_status`: `clear` / `partial` / `blocked`
- `watchlist_status`: `available` / `missing` / `partial`
- `dashboard_mode`: `markdown-only` / `markdown-plus-dashboard` /
  `dashboard-required`
- `portfolio_readiness`: `ready` / `partial` / `blocked`

## Minimal Fact Set

- `portfolio_path`
- `asset_count`
- `last_audit`
- `renewal_entries_present`
- `territory_entries_present`
- `strategic_levels_present`
- `business_owner_coverage`
- `mandataire_coverage`
- `watchlist_cross_reference_status`

## Portfolio Readiness Gate

### `ready`

- registre present ;
- echeances exploitables ;
- owners et mandataires suffisants ;
- priorisation credible.

### `partial`

- registre present mais incomplet ;
- findings ou buckets possibles avec `[à vérifier]`.

### `blocked`

- registre absent ou inexploitable ;
- echeances trop lacunaires ;
- owners / mandataires trop incomplets ;
- regularisation necessaire avant vrai rapport.

## `report` Output Contract

1. `Portfolio Snapshot`
2. `Portfolio Readiness Gate`
3. `Renewal Priority`
4. `Coverage And Territories`
5. `Ownership And Coverage`
6. `Watchlist Signals`
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

- `prepare-renewal-escalation`
- `prepare-watchlist-regularization`
- `prepare-portfolio-cleanup`
- `prepare-territory-review`
- `hold-for-registry-regularization`

## Boundaries

- `recherche-anteriorite-marque`: premier passage recherche
- `depot-marque-fr`: preparation de depot
- `surveillance-marque`: monitoring publication / watchlist
- `analyse-opposition-marque`: opposition INPI
- `audit-pi-ma`: lecture transactionnelle multi-actifs
- `portefeuille-pi`: lecture consolidee federée
