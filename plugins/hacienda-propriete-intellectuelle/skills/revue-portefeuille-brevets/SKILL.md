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
