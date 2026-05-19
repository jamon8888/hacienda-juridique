# Surveillance marque - routing and output

Reference de travail non normative. Elle sert d'aide-memo rapide pour
l'intake V2 du rapport, le monitoring gate, les routes aval et les blocs de
sortie. En cas d'ecart, seul
`plugins/hacienda-propriete-intellectuelle/skills/surveillance-marque/SKILL.md`
fait foi.

## 1. Report intake dimensions

- `report_window`
- `watch_scope`
- `source_coverage`
- `monitoring_gate`
- `alert_pressure`

Bloc de faits :

- `watch_ids_in_scope`
- `window_dates`
- `sources_checked`
- `new_publications_detected`
- `deduplication_status`
- `record_limitations`

## 2. Monitoring gate minimum

- watchlist exploitable
- sources interrogees
- fenetre reelle connue
- deduplication visible
- integrite minimale du registre

Gate values :

- `healthy`
- `needs-review`
- `degraded`
- `blocked`

## 3. Route boundaries

- `recherche-anteriorite-marque`
  - hit detecte mais premier passage de confusion encore requis
- `analyse-opposition-marque`
  - opposition ou defense d'opposition devient le sujet principal
- `mise-en-demeure-pi`
  - usage exploite ou action amiable a preparer
- `tri-contrefacon`
  - sujet enforcement / usage litigieux a qualifier
- stay in `surveillance-marque`
  - besoin principal = monitorer, dedoublonner et prioriser

## 4. Report output blocks

- `Monitoring Scope Snapshot`
- `Monitoring Gate`
- `Source Coverage`
- `Priority Queue`
- `Critical Alerts`
- `Watchlist Integrity and Gaps`
- `Escalation Candidates`
- `Decision Routing`
- `Human Validation`

## 5. Closed Decision Routing values

- `continue-monitoring`
- `run-first-pass-search`
- `prepare-opposition-review`
- `prepare-cease-and-desist`
- `open-enforcement-triage`
- `repair-watchlist`
- `insufficient-monitoring-coverage`
- `deadline-critical-escalation`
