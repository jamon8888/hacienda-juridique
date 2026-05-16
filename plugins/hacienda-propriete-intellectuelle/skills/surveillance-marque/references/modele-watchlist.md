# Modèle de watchlist

Fichier : `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/watchlist.yaml`

Le skill `surveillance-marque` lit, écrit et audite ce fichier. Schéma Zod validé côté skill.

## Structure

```yaml
metadata:
  cabinet: "Cabinet exemple"          # depuis CLAUDE.md
  generated: "2026-05-16"
  last_audit: "2026-05-16"
  source_system: "manual"              # ou import IPMS

watches:
  - id: "WATCH-001"
    motCle: "APEXLEAF"
    motCleAlternatives: ["APEX LEAF", "APEXLEAVE"]
    classes: ["25", "35"]                            # Nice 1-45
    titulaire: null                                  # ou raison sociale concurrent
    territoires: ["FR", "EM"]                        # INPI, EUIPO, autres offices
    niveauAlerte: "haut"                              # haut / moyen / bas
    destinataires: ["#legal-marques"]
    business_owner: "marketing@acme.fr"
    notes: "Marque produit phare, surveillance étroite"
    dateAjout: "2026-05-16"
    derniereExecution: "2026-05-15"
    publicationsDetectees:
      - dateDetection: "2026-05-15"
        publicationDate: "2026-05-09"
        numero: "FR4123456"
        signe: "APEXLEAVE"
        titulaire: "Concurrent SAS"
        decisionPrise: "opposition_preparee"          # libre, traçabilité
```

## Bonnes pratiques

- **Pas de motCle générique** (< 3 chars, mot du dictionnaire). Trop d'alertes = ignorées.
- **Classes précises** plutôt que "toutes". L'API delta accepte un filtre classes — exploitez-le.
- **Niveau "haut" rare** : réservez aux marques où une opposition rate = perte commerciale réelle.
- **business_owner toujours rempli** : sinon les alertes 🔴 finissent dans une boîte vide.
- **Audit régulier** : `--audit` une fois par trimestre pour purger les surveillances obsolètes.
