---
name: revue-portefeuille-brevets
description: >
  Gère le registre du portefeuille de brevets détenus (CRUD + audit). Modes :
  --report (rapport + dashboard HTML), --add, --update, --remove, --list,
  --audit. Réutilise le dashboard HTML standardisé V1.1.1 sans modification.
  NE renouvelle PAS — décision et paiement annuités INPI/OEB/national restent
  au mandataire en brevets (EQE) ou au partenaire annuités (Anaqua / CPA
  Global / Dennemeyer / Patrix).
argument-hint: "[--report [--dashboard] | --add | --update | --remove | --list | --audit]"
---

# /revue-portefeuille-brevets

**Registre ≠ paiement annuités.** Ce skill produit un **rapport** sur le
portefeuille consigné dans `portfolio-brevets.yaml`. Il NE renouvelle PAS
les brevets auprès de l'INPI/OEB/offices nationaux (= mandataire en brevets
EQE), NE paye PAS les annuités (= partenaire annuités tiers : CPA Global /
Dennemeyer / Patrix / Anaqua, ou mandataire local pour validations EP
nationales), NE dépose PAS de nouveau brevet (= `preparation-depot-brevet`
V0.4). **Une annuité non payée = perte du droit de brevet** sans
possibilité de réactivation (sauf grace period 6 mois avec surcharge, puis
restauration L.612-14 strictement exceptionnelle). **Un registre
désynchronisé du registre officiel INPI/OEB crée une fausse confiance** :
« annuité payée » dans `portfolio-brevets.yaml` ne veut PAS dire annuité
acceptée côté INPI. Cross-vérifier régulièrement contre la Base Brevets
INPI publique (https://data.inpi.fr) et OEB Register
(https://register.epo.org) avant tout déclenchement d'action.

## Examples

```
/hacienda-propriete-intellectuelle:revue-portefeuille-brevets
```
(défaut : `--report`)

```
/hacienda-propriete-intellectuelle:revue-portefeuille-brevets --add
```

```
/hacienda-propriete-intellectuelle:revue-portefeuille-brevets --audit
```

---

## REGISTRE INTERNE, PAS DÉMARCHE OFFICIELLE

**Reformuler en tête de chaque output. Ne jamais l'enlever.**

> **Registre interne, pas démarche officielle.** Ce rapport reflète l'état
> consigné dans `portfolio-brevets.yaml` à la date d'édition. Il ne
> remplace ni l'inscription au registre INPI/OEB/national, ni le paiement
> effectif des annuités, ni la notification officielle de l'office. Une
> entrée marquée « annuité payée » dans le registre interne doit être
> recoupée avec la Base Brevets INPI publique
> (https://data.inpi.fr) ou OEB Register (https://register.epo.org) — et
> les registres nationaux pour les validations EP — avant toute décision
> d'arrêt de maintenance ou de communication externe. Le paiement effectif
> des annuités relève du mandataire en brevets EQE (CPI / EPC) ou d'un
> partenaire annuités spécialisé (CPA Global / Dennemeyer / Patrix /
> Anaqua), avec mandataire local pour chaque pays validé EP. Une annuité
> ratée fait tomber le droit de brevet **sans possibilité de réactivation
> standard** (grace period 6 mois avec surcharge, puis restauration
> L.612-14 strictement exceptionnelle).

---

## Charger le profil pratique et le portefeuille

Avant tout travail, lire dans cet ordre :

1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`
3. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/portfolio-brevets.yaml`
4. **Optionnel** : `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/portfolio.yaml` (registre marques V1.1.1) — si présent, pour permettre la cross-référence via le champ `marques_associees` de chaque brevet.

Si `portfolio-brevets.yaml` est absent, le créer avec le squelette suivant :

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
  avocat inscrit / mandataire en brevets EQE (CPI L.422-5) / juriste
  interne / non-juriste avec accès avocat / non-juriste sans accès
- **Posture maintenance brevets** (extraite ou déduite du profil section
  Brevets) :
  - **systématique** : tous les brevets `core` et `important` sont
    renouvelés par défaut, abandon = décision motivée
  - **sélective** : décision case par case selon usage commercial et
    valeur estimée à chaque échéance annuité
- **Mandataires associés** : mandataire en brevets EQE pour FR/EP,
  mandataires locaux pour validations nationales (un par pays validé)
- **Partenaire annuités** : CPA Global (Clarivate) / Dennemeyer / Patrix /
  Anaqua / Questel / interne — service très spécialisé multi-offices
  multi-pays
- **Domaines techniques** (du profil section Brevets) : pharma /
  mécanique / électronique / logiciel / chimie / biotech — détermine si
  CCP applicable (pharma uniquement)
- **Cadence de revue portefeuille** (trimestrielle / annuelle) — défaut
  trimestrielle si absent. Les annuités annuelles brevets imposent
  cadence MINIMUM trimestrielle, contrairement aux marques décennales.
- **Format de rapport préféré** (Markdown seul / Markdown + dashboard
  HTML) — défaut « Markdown + dashboard si > 10 brevets »
- **Sync avec base INPI/OEB publique** (manuel trimestriel / au moment de
  chaque rapport) — défaut « manuel trimestriel »
- **Approbateurs** pour décisions d'abandon ou de continuation
  (typiquement mandataire EQE + Direction R&D + CFO si montant cumulé
  significatif sur la famille)

### Profil non configuré

Si le profil PI ou `company-profile.md` contient encore des marqueurs
`[A CONFIGURER]` :

- Proposer `/hacienda-propriete-intellectuelle:entretien-demarrage`
  (10-15 min) comme chemin nominal
- OU offrir un mode `provisoire` tagué : tous les outputs sont préfixés
  `[MODE PROVISOIRE — profil non configuré, défauts génériques appliqués]`
  et utilisent les défauts (rôle = mandataire EQE, posture systématique
  pour `core`/`important`, cadence trimestrielle, format Markdown +
  dashboard)

Pour `entretien-demarrage` lui-même et `--check-integrations`, ne pas
bloquer.

---
