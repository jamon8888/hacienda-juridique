# Modèle `portfolio-brevets.yaml` — registre brevets

Référence pour le skill `revue-portefeuille-brevets`. Décrit la structure
du registre interne, les conventions de remplissage et les bonnes
pratiques propres aux brevets (annuités annuelles, familles
internationales, validations EP nationales).

---

## Emplacement

`~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/portfolio-brevets.yaml`

Ce fichier est **user-stable** : il survit aux mises à jour du plugin.
Il est créé automatiquement par `revue-portefeuille-brevets --add` ou
`--report` lors du premier appel si absent. **Distinct de
`portfolio.yaml`** (registre marques V1.1.1) — la séparation évite la
confusion entre régimes (annuités annuelles vs renouvellement décennal)
et permet un cross-référencement explicite via le champ
`marques_associees`.

---

## Schéma complet commenté

```yaml
metadata:
  cabinet: "ACME Avocats"                 # repris depuis CLAUDE.md PI ou company-profile.md
  generated: "2026-05-16"                 # date de dernière régénération du fichier
  last_audit: "2026-05-16"                # date du dernier --audit (null si jamais)
  source_system: "manual"                 # "manual" ou nom de l'IPMS si import (Anaqua, Dennemeyer, CPA Global, ...)

assets:
  - id: "BR-FR-001"                       # convention : BR-{type}-{N}
    type: "FR"                            # FR | EP | PCT | national_post_EP | CCP
    numero: "FR2700123"                   # numéro tel que figurant sur le titre
    titre: "Procédé filtration eau utilisant graphène"
    classificationCIB: ["B01D 71/02", "B01D 67/00"]   # codes CIB (sections A-H)
    statut: "delivre"                     # demande | publiee | delivre | opposition | decheance | expire
    dateDepot: "2018-02-01"               # pivot — base de tous les calculs annuités + expiration
    dateDelivrance: "2021-03-15"          # null si encore en examen
    dateExpiration: "2038-02-01"          # = dateDepot + 20 ans (CPI L.611-2). Pour CCP : ajouter jusqu'à +5 ans (Règl. CE 469/2009)
    datePriorite: null                    # si revendiquée (Union de Paris ou priorité interne)
    prochaine_annuite:                    # PIVOT du --report — sévérité bucketée sur dateEcheance
      annee: 8                            # entier 1-20
      dateEcheance: "2026-02-01"          # ~ dateDepot + (annee-1) ans (à confirmer côté office)
      montantEstime: "200€"               # varie selon office et année — INPI an 5 ~80€, OEB an 10 ~1500€
    famille_brevets:                      # liens vers EP, PCT, validations nationales — array d'IDs
      - id: "BR-EP-001"
      - id: "BR-WO-001"
      - id: "BR-DE-001"                   # validation EP nationale — annuités séparées par pays
      - id: "BR-GB-001"
    deposant: "ACME SAS"                  # raison sociale + SIREN si dispo (cross-check contrats employés)
    inventeurs:                           # CPI L.611-7 — régime invention de salarié
      - "Marie Dupont"
      - "Jean Martin"
    mandataire: "Cabinet X"               # mandataire EQE pour EP/PCT, mandataire INPI pour FR, ou "interne"
    business_owner: "rd@acme.fr"          # email ou équipe — JAMAIS vide pour core/important
    niveau_strategique: "core"            # core | important | standard | heritage
    marques_associees: ["TM-FR-001"]      # cross-ref portfolio.yaml V1.1.1 (cohérence stratégie produit)
    notes: "Brevet phare, base de la gamme produit Aqua-G. Annuité 2026 programmée avec CPA Global."
    dateAjout: "2026-05-16"
    dernier_audit: null                   # date du dernier cross-check INPI/OEB public
```

---

## Définition des `niveau_strategique`

| Niveau | Lecture | Action de routine annuités |
|---|---|---|
| `core` | Brevet socle, base d'une gamme produit phare. Perte = dommage critique direct sur le CA. | **Renouvellement systématique**, jamais laisser dériver. Audit trimestriel. Étude continuation/divisionnaire avant expiration. |
| `important` | Brevet de produit ou de procédé, valeur commerciale forte. | Renouvellement systématique sauf circonstances exceptionnelles (perte du marché, contournement avéré, brevet bloquant tombé). Audit semestriel. |
| `standard` | Brevet secondaire, défensif ou variante. | Décision case par case selon usage commercial réel à chaque échéance d'annuité. Annuités tardives (an 10+) souvent abandonnées si pas de produit associé. |
| `heritage` | Brevet historique non commercialisé, conservé par précaution. | Évaluation business à chaque annuité — souvent abandonnés après an 12-15 sauf valeur défensive avérée (FTO concurrent). |

---

## Exemple 1 — Brevet FR seul (PME, marché national)

Minimum viable. Pas de famille internationale, marché domestique uniquement.

```yaml
- id: "BR-FR-005"
  type: "FR"
  numero: "FR2103456"
  titre: "Dispositif d'arrosage automatique pour balcon"
  classificationCIB: ["A01G 27/00"]
  statut: "delivre"
  dateDepot: "2021-04-12"
  dateDelivrance: "2023-09-08"
  dateExpiration: "2041-04-12"
  datePriorite: null
  prochaine_annuite:
    annee: 6
    dateEcheance: "2026-04-12"
    montantEstime: "100€"
  famille_brevets: []
  deposant: "JardinPlus SARL"
  inventeurs: ["Pierre Leblanc"]
  mandataire: "interne"
  business_owner: "ceo@jardinplus.fr"
  niveau_strategique: "important"
  marques_associees: []
  notes: "Brevet FR seul, pas d'extension prévue (marché national)."
  dateAjout: "2026-05-16"
  dernier_audit: null
```

---

## Exemple 2 — Famille FR + EP + 5 validations nationales (ETI européenne)

Exemple complet avec validations nationales EP. **Chaque pays validé est
une entrée séparée** car les annuités, mandataires et registres sont
distincts par pays.

```yaml
- id: "BR-FR-001"
  type: "FR"
  numero: "FR2700123"
  titre: "Procédé filtration eau utilisant graphène"
  classificationCIB: ["B01D 71/02", "B01D 67/00"]
  statut: "delivre"
  dateDepot: "2018-02-01"
  dateDelivrance: "2021-03-15"
  dateExpiration: "2038-02-01"
  datePriorite: null
  prochaine_annuite:
    annee: 8
    dateEcheance: "2026-02-01"
    montantEstime: "200€"
  famille_brevets:
    - id: "BR-EP-001"
    - id: "BR-DE-001"
    - id: "BR-GB-001"
    - id: "BR-IT-001"
    - id: "BR-ES-001"
    - id: "BR-NL-001"
  deposant: "ACME SAS"
  inventeurs: ["Marie Dupont", "Jean Martin"]
  mandataire: "Cabinet X (EQE : Mme Bernard)"
  business_owner: "rd@acme.fr"
  niveau_strategique: "core"
  marques_associees: ["TM-FR-001"]
  notes: "Brevet phare gamme Aqua-G. Annuités multi-pays via CPA Global."
  dateAjout: "2026-05-16"
  dernier_audit: "2026-04-01"

- id: "BR-EP-001"
  type: "EP"
  numero: "EP3456789"
  titre: "Procédé filtration eau utilisant graphène"
  classificationCIB: ["B01D 71/02", "B01D 67/00"]
  statut: "delivre"
  dateDepot: "2019-01-30"
  dateDelivrance: "2022-11-10"
  dateExpiration: "2039-01-30"
  datePriorite: "2018-02-01"          # priorité FR
  prochaine_annuite:
    annee: 8
    dateEcheance: "2027-01-30"
    montantEstime: "1500€"
  famille_brevets:
    - id: "BR-FR-001"
    - id: "BR-DE-001"
    - id: "BR-GB-001"
    - id: "BR-IT-001"
    - id: "BR-ES-001"
    - id: "BR-NL-001"
  deposant: "ACME SAS"
  inventeurs: ["Marie Dupont", "Jean Martin"]
  mandataire: "Cabinet X (EQE : Mme Bernard)"
  business_owner: "rd@acme.fr"
  niveau_strategique: "core"
  marques_associees: ["TM-FR-001"]
  notes: "Validation dans 5 pays après délivrance OEB."
  dateAjout: "2026-05-16"
  dernier_audit: "2026-04-01"
```

(BR-DE-001, BR-GB-001, etc. suivraient le même pattern avec leurs
mandataires locaux respectifs : Patentanwalt pour DE, Patent Attorney
pour GB, Consulente Brevettuale pour IT, etc.)

---

## Exemple 3 — PCT + 8 entrées nationales (multinationale)

Maximaliste. Demande PCT internationale puis entrées nationales/régionales
dans 8 pays/régions à 30 mois (ou 31 mois selon office).

```yaml
- id: "BR-WO-001"
  type: "PCT"
  numero: "WO2020/123456"
  titre: "Catalyseur platine-iridium pour pile à hydrogène"
  classificationCIB: ["H01M 4/92", "B01J 23/42"]
  statut: "publiee"                    # PCT n'est jamais "delivre" — phase nationale obligatoire
  dateDepot: "2020-06-15"
  dateDelivrance: null
  dateExpiration: "2040-06-15"         # 20 ans depuis dépôt PCT (référence pour calcul phases nationales)
  datePriorite: "2019-07-01"           # priorité FR antérieure (Union de Paris)
  prochaine_annuite: null              # le PCT lui-même n'a pas d'annuités — chaque entrée nationale a les siennes
  famille_brevets:
    - id: "BR-FR-002"                  # priorité parente
    - id: "BR-EP-002"                  # entrée régionale EP (puis validations nationales en cascade)
    - id: "BR-US-001"
    - id: "BR-CN-001"
    - id: "BR-JP-001"
    - id: "BR-KR-001"
    - id: "BR-IN-001"
    - id: "BR-BR-001"
    - id: "BR-CA-001"
  deposant: "MegaCorp SA"
  inventeurs: ["Sophie Mercier", "Thomas Kim", "Anna Schmidt"]
  mandataire: "Cabinet Y (EQE + agréé OMPI)"
  business_owner: "ip-team@megacorp.com"
  niveau_strategique: "core"
  marques_associees: ["TM-FR-042", "TM-EM-018"]
  notes: "PCT phare hydrogène. Entrées nationales 8 pays. Annuités via Anaqua + correspondants locaux."
  dateAjout: "2026-05-16"
  dernier_audit: "2026-05-01"
```

---

## Bonnes pratiques

- **Toujours renseigner `business_owner`.** Un brevet sans propriétaire
  métier devient orphelin : personne ne reçoit l'alerte d'annuité,
  personne ne valide l'abandon. Le `--audit` flag tout brevet
  `core`/`important` sans owner.
- **`niveau_strategique` n'est pas décoratif.** Il pilote la décision
  d'audit, la posture de renouvellement (systématique vs case par cas),
  et l'inclusion en revue trimestrielle obligatoire :
  - `core` = renouvellement systématique, jamais d'oubli toléré
  - `important` = renouvellement systématique sauf circonstances
    exceptionnelles
  - `standard` = case par case selon usage commercial réel
  - `heritage` = peut être abandonné après évaluation business (souvent
    brevets > an 15 non commercialisés)
- **Cross-référencer avec `portfolio.yaml` marques V1.1.1 via
  `marques_associees`.** La cohérence stratégie brevet + marque pour
  un produit est critique pour évaluer la protection complète d'un
  produit phare. Une marque `core` sans brevet associé peut signaler
  une opportunité de dépôt brevet ratée (ou un produit brand-only
  délibéré).
- **Modéliser les familles brevets complètes** (FR + EP + validations
  nationales + PCT entrées). **Une incohérence familiale = risque
  perte du droit régional par oubli annuité dans un pays**. Pour
  les validations EP nationales, créer **une entrée séparée par
  pays validé** ET utiliser le champ `famille_brevets` pour les lier.
  Chaque pays a ses propres annuités annuelles, son propre mandataire
  local, son propre registre national.
- **Sync trimestriel** avec :
  - Base Brevets INPI publique (https://data.inpi.fr) pour FR
  - OEB Register (https://register.epo.org) pour EP
  - Patentscope WIPO (https://patentscope.wipo.int) pour PCT
  - Registres nationaux pour validations EP : DPMA (DE), IPO (GB),
    UIBM (IT), OEPM (ES), USPTO (US), JPO (JP), CNIPA (CN), etc.
- **Ne JAMAIS écrire les credentials API (INPI Data, OEB Open Patent
  Services, etc.) dans `portfolio-brevets.yaml`.** Les identifiants
  techniques vont **uniquement** dans `.claude/settings.local.json`
  (gitignored) ou les variables d'environnement. Le
  `portfolio-brevets.yaml` ne contient que des données métier.
- **Backup avant écriture.** Le skill produit automatiquement
  `portfolio-brevets.yaml.bak.YYYY-MM-DDTHHMMSS` avant chaque mutation.
  Conserver les `.bak` au moins 12 mois pour traçabilité (annuités
  annuelles → cycle de revue plus long que marques décennales).

---

## Liens vers autres skills

- `strategie-extension-internationale` (V0.8) — pour planifier de
  nouvelles familles brevets (FR seul vs EP vs PCT, calendrier Union
  de Paris 12 mois)
- `analyse-refus-inpi` (V0.7 / V2.1) — pour traiter les notifications
  INPI/OEB en cours d'examen sur des brevets `pending`
- `revue-portefeuille-marques` (V0.5 / V1.1.1) — pour cross-référence
  avec marques associées (cohérence stratégie produit marque + brevet)
- `preparation-depot-brevet` (V0.4) — pour préparer le dépôt d'un
  nouveau brevet ou d'un divisionnaire avant expiration de la demande
  parente

---

## Recommandation IPMS commercial (> 50 brevets actifs)

Au-delà de 50 brevets actifs, la gestion manuelle YAML devient risquée
— surtout pour les familles avec nombreuses validations EP nationales
(10+ pays). Envisager un IPMS commercial :

| Outil | Spécialité | Cible |
|---|---|---|
| **Anaqua** | Plateforme complète portefeuille + annuités + workflow + collaboration | ETI / grand cabinet / multinationale |
| **Dennemeyer** | Service paiement annuités multi-pays + reporting + plateforme DIAMS | Cabinets et corporates de toutes tailles |
| **CPA Global (Clarivate)** | Service annuités leader marché + IPfolio (suite intégrée) | Multinationales et grands cabinets |
| **Patrix** | Alternative économique pour petits cabinets et PME | PME / petits cabinets |
| **Clarivate IPfolio** | Suite intégrée portefeuille + recherche (Derwent) + analytics | ETI / grand cabinet |
| **Questel** | Recherche brevets + gestion portefeuille (Orbit Asset) | Recherche-intensive (R&D, biotech) |

**Coûts indicatifs** :

- Service annuités tiers : ~10-30€ frais de gestion par annuité +
  commission mandataire local + montant de l'annuité officielle
- Plateforme IPMS complète : licence ~5-50k€/an selon volume et modules
  (portefeuille, annuités, IDS, workflow, intégration ERP)

Tous ces outils proposent import/export YAML ou CSV pour préserver la
compatibilité avec `portfolio-brevets.yaml` si migration ultérieure.

---

## Lien `portfolio-brevets.yaml` ↔ skill ↔ dashboard HTML

```
portfolio-brevets.yaml ──lit──▶ revue-portefeuille-brevets ──génère──▶ portefeuille-brevets-YYYY-MM-DD.md
                                            │
                                            └──si > 10 brevets ou --dashboard──▶ portefeuille-brevets-YYYY-MM-DD.html
                                                                                  (renderDashboard de @hacienda/core — RÉUTILISATION V1.1.1)
```

Le dashboard HTML reflète **fidèlement** l'état du
`portfolio-brevets.yaml` au moment de la génération — il n'est pas mis
à jour dynamiquement. Pour le rafraîchir, ré-exécuter
`--report --dashboard`.

**RÉUTILISATION STRICTE** : le dashboard brevets utilise exactement le
même module `renderDashboard` que le dashboard marques V1.1.1 — aucune
modification du module, seules les données passées (`DashboardData`)
diffèrent. C'est la démonstration du standard réutilisable du plugin.
Pour le détail du module (signature, conventions visuelles, sécurité
XSS, cibles de réutilisation V2.2 brevets / V5.0 M&A), voir
`../../revue-portefeuille-marques/references/dashboard-template.md`.
