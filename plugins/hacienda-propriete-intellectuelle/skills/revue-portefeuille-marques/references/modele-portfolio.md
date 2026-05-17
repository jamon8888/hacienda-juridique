# Modèle `portfolio.yaml` — registre marques

Référence pour le skill `revue-portefeuille-marques`. Décrit la structure
du registre interne, les conventions de remplissage et les bonnes pratiques.

---

## Emplacement

`~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/portfolio.yaml`

Ce fichier est **user-stable** : il survit aux mises à jour du plugin. Il
est créé automatiquement par `revue-portefeuille-marques --add` ou
`--report` lors du premier appel si absent.

---

## Schéma complet commenté

```yaml
metadata:
  cabinet: "ACME Avocats"                 # repris depuis CLAUDE.md PI ou company-profile.md
  generated: "2026-05-16"                 # date de dernière régénération du fichier
  last_audit: "2026-05-16"                # date du dernier --audit (null si jamais)
  source_system: "manual"                 # "manual" ou nom de l'IPMS si import (Anaqua, Dennemeyer, ...)

assets:
  - id: "TM-FR-001"                       # convention : TM-{office_principal}-{N}
    signe: "APEXLEAF"                     # le signe tel qu'enregistré
    type: "mot"                           # mot | figuratif | composite
    classes: ["25", "35"]                 # classes Nice 1-45 (chaînes pour préserver les zéros)
    territoires:
      - office: "FR"                      # FR=INPI · EM=EUIPO · WO=OMPI Madrid · autres codes ISO
        numero: "1234567"                 # numéro tel que figurant sur le titre
        dateDepot: "2020-01-15"
        dateEnregistrement: "2020-08-01"  # null si encore en examen
        dateRenouvellement: "2030-01-15"  # = dateDepot + 10 ans (FR/EU)
        statut: "enregistree"             # en_examen | enregistree | opposee | radiee | expiree
      - office: "EM"
        numero: "018789012"
        dateDepot: "2020-02-01"
        dateEnregistrement: "2020-09-15"
        dateRenouvellement: "2030-02-01"
        statut: "enregistree"
    titulaire: "ACME SAS"                 # raison sociale exacte (cross-check RCS)
    mandataire: "Cabinet X"               # cabinet de marques associé, ou "interne"
    business_owner: "marketing@acme.fr"   # email ou équipe — JAMAIS vide pour core/important
    niveau_strategique: "core"            # core | important | standard | heritage
    notes: "Marque produit phare, surveillance étroite"
    dateAjout: "2026-05-16"
    dernier_audit: null                   # date du dernier cross-check INPI public
```

---

## Définition des `niveau_strategique`

| Niveau | Lecture | Action de routine |
|---|---|---|
| `core` | Marque socle, identité de l'entreprise. Perte = dommage critique. | Renouvellement systématique, surveillance obligatoire (watchlist V1.1.0), audit trimestriel. |
| `important` | Marque produit ou ligne, valeur commerciale forte. | Renouvellement systématique, surveillance recommandée, audit semestriel. |
| `standard` | Marque secondaire, défensive ou de variante. | Renouvellement décidé au cas par cas selon usage business. |
| `heritage` | Marque historique non exploitée, conservée par précaution. | Évaluation business à chaque échéance — peut être abandonnée. |

---

## Exemple 1 — marque mot multi-territoires

```yaml
- id: "TM-FR-001"
  signe: "APEXLEAF"
  type: "mot"
  classes: ["25", "35"]
  territoires:
    - office: "FR"
      numero: "1234567"
      dateDepot: "2020-01-15"
      dateEnregistrement: "2020-08-01"
      dateRenouvellement: "2030-01-15"
      statut: "enregistree"
    - office: "EM"
      numero: "018789012"
      dateDepot: "2020-02-01"
      dateEnregistrement: "2020-09-15"
      dateRenouvellement: "2030-02-01"
      statut: "enregistree"
  titulaire: "ACME SAS"
  mandataire: "Cabinet X"
  business_owner: "marketing@acme.fr"
  niveau_strategique: "core"
  notes: "Marque produit phare, surveillance étroite"
  dateAjout: "2026-05-16"
  dernier_audit: null
```

## Exemple 2 — marque figurative FR-only

```yaml
- id: "TM-FR-014"
  signe: "Logo feuille stylisée tricolore"
  type: "figuratif"
  classes: ["25"]
  territoires:
    - office: "FR"
      numero: "4123987"
      dateDepot: "2018-06-10"
      dateEnregistrement: "2019-01-12"
      dateRenouvellement: "2028-06-10"
      statut: "enregistree"
  titulaire: "ACME SAS"
  mandataire: "interne"
  business_owner: "design@acme.fr"
  niveau_strategique: "important"
  notes: "Logo associé à APEXLEAF — couplé au dépôt mot par convention interne"
  dateAjout: "2026-05-16"
  dernier_audit: "2026-04-01"
```

---

## Bonnes pratiques

- **Toujours renseigner `business_owner`.** Une marque sans propriétaire
  métier devient orpheline : personne ne reçoit l'alerte de
  renouvellement, personne ne valide l'abandon. Le `--audit` flag toute
  marque `core`/`important` sans owner.
- **`niveau_strategique` n'est pas décoratif.** Il pilote la cadence
  d'audit, l'inclusion en watchlist, et la décision de renouvellement
  systématique vs cas par cas. Toute marque `core` qui dérive (échéance
  manquée, owner parti) est un finding rouge.
- **Cross-référencer avec `watchlist.yaml` (V1.1.0).** Toute marque `core`
  doit avoir une entrée correspondante dans la watchlist (motCle =
  signe). Sinon : `unwatched_asset` lors du `--report`.
- **Sync trimestriel avec la base INPI publique.** Vérifier les dates de
  renouvellement officielles via https://data.inpi.fr/marques (gratuit,
  pas d'authentification) ou EUIPO eSearch plus
  (https://euipo.europa.eu/eSearch/) avant tout déclenchement d'action.
  Mettre à jour `dernier_audit` après chaque cross-check.
- **Ne JAMAIS écrire les credentials INPI/EUIPO dans `portfolio.yaml`.**
  Les identifiants techniques (API keys INPI Data, comptes EUIPO User
  Area) vont **uniquement** dans `~/.config/Hacienda/credentials.json`
  ou les variables d'environnement. Le `portfolio.yaml` ne contient que
  des données métier.
- **Backup avant écriture.** Le skill produit automatiquement
  `portfolio.yaml.bak.YYYY-MM-DDTHHMMSS` avant chaque mutation. Conserver
  les `.bak` au moins 6 mois pour traçabilité.
- **Cap > 100 assets.** Au-delà, la gestion manuelle YAML n'est plus
  raisonnable. Envisager un IPMS commercial (Anaqua, Dennemeyer, Questel,
  Alt Legal) avec import/export YAML pour préserver la compatibilité du
  skill.

---

## Lien `portfolio.yaml` ↔ skill ↔ dashboard HTML

```
portfolio.yaml  ──lit──▶  revue-portefeuille-marques  ──génère──▶  portefeuille-YYYY-MM-DD.md
                                       │
                                       └──si > 10 assets ou --dashboard──▶  portefeuille-YYYY-MM-DD.html
                                                                            (renderDashboard de @hacienda/core)
```

Le dashboard HTML reflète **fidèlement** l'état du `portfolio.yaml` au
moment de la génération — il n'est pas mis à jour dynamiquement. Pour le
rafraîchir, ré-exécuter `--report --dashboard`.

Pour le détail du module `renderDashboard` (signature, conventions
visuelles, sécurité XSS, cible de réutilisation V2.2 brevets / V5.0 M&A),
voir `references/dashboard-template.md` (référence transverse plugin,
créée Phase 3).
