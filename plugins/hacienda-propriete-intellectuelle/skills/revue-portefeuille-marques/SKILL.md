---
name: revue-portefeuille-marques
description: >
  Gère le registre du portefeuille de marques détenues (CRUD + audit). Modes :
  --report (rapport horodaté + dashboard HTML), --add, --update, --remove,
  --list, --audit. Produit un dashboard HTML standardisé local exploitable
  sans serveur. NE renouvelle PAS — décision et démarche INPI/EUIPO restent
  au mandataire en marques ou avocat.
argument-hint: "[--report [--dashboard] | --add | --update | --remove | --list | --audit]"
---

# /revue-portefeuille-marques

**Registre ≠ démarche officielle.** Ce skill produit un **rapport** sur le
portefeuille consigné dans `portfolio.yaml`. Il NE renouvelle PAS les marques
auprès de l'INPI/EUIPO/OMPI (= mandataire ou avocat), NE paye PAS les taxes
(= mandataire + cabinet tiers type CPA Global ou Dennemeyer), NE dépose PAS
de nouvelle marque (= `depot-marque-fr` V1.1.2). **Un registre désynchronisé
du registre officiel INPI/EUIPO crée une fausse confiance** : « renouvellement
payé » dans `portfolio.yaml` ne veut PAS dire renouvellement enregistré côté
INPI. Cross-vérifier régulièrement contre la base INPI publique
(https://data.inpi.fr) avant tout déclenchement d'action.

## Examples

```
/hacienda-propriete-intellectuelle:revue-portefeuille-marques
```
(défaut : `--report`)

```
/hacienda-propriete-intellectuelle:revue-portefeuille-marques --add
```

```
/hacienda-propriete-intellectuelle:revue-portefeuille-marques --report --dashboard
```

---

## REGISTRE INTERNE, PAS DÉMARCHE OFFICIELLE

**Reformuler en tête de chaque output. Ne jamais l'enlever.**

> **Registre interne, pas démarche officielle.** Ce rapport reflète l'état
> consigné dans `portfolio.yaml` à la date d'édition. Il ne remplace ni
> l'inscription au registre INPI/EUIPO/OMPI, ni le paiement effectif des
> taxes de renouvellement, ni la notification officielle de l'office. Une
> entrée marquée « renouvellement enregistré » dans le registre interne
> doit être recoupée avec la base INPI publique
> (https://data.inpi.fr/marques) ou EUIPO eSearch plus avant toute décision
> d'arrêt de surveillance ou de communication externe. La démarche
> officielle (dépôt de la requête de renouvellement, paiement, suivi de la
> publication BOPI) relève du mandataire en marques inscrit (CPI L.422-4)
> ou de l'avocat.

---

## Charger le profil pratique et le portefeuille

Avant tout travail, lire dans cet ordre :

1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`
3. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/portfolio.yaml`

Si `portfolio.yaml` est absent, le créer avec le squelette suivant :

```yaml
metadata:
  cabinet: "[depuis CLAUDE.md ; mettre 'à renseigner' si vide]"
  generated: "YYYY-MM-DD"
  last_audit: null
  source_system: "manual"
assets: []
```

et confirmer la création à l'utilisateur.

### Récupération depuis le profil

- **Rôle utilisateur** (`## Rôle de l'utilisateur courant` du profil PI) :
  avocat inscrit / mandataire en marques inscrit INPI (CPI L.422-4) /
  juriste interne / non-juriste avec accès avocat / non-juriste sans accès
- **Posture enforcement** (mesurée / agressive / conservatrice)
- **Mandataires associés** (cabinet de marques, correspondants étrangers)
- **Cadence de revue portefeuille** (trimestrielle / annuelle) — défaut
  trimestrielle si absent
- **Format de rapport préféré** (Markdown seul / Markdown + dashboard HTML)
  — défaut « Markdown + dashboard si > 10 marques »
- **Sync avec base INPI publique** (manuel trimestriel / au moment de chaque
  rapport) — défaut « manuel trimestriel »
- **Approbateurs** pour décisions de renouvellement non systématique

### Profil non configuré

Si le profil PI ou `company-profile.md` contient encore des marqueurs
`[A CONFIGURER]` :

- Proposer `/hacienda-propriete-intellectuelle:entretien-demarrage`
  (10-15 min) comme chemin nominal
- OU offrir un mode `provisoire` tagué : tous les outputs sont préfixés
  `[MODE PROVISOIRE — profil non configuré, défauts génériques appliqués]`
  et utilisent les défauts (rôle = avocat, posture mesurée, cadence
  trimestrielle, format Markdown + dashboard)

Pour `entretien-demarrage` lui-même et `--check-integrations`, ne pas
bloquer.

---
