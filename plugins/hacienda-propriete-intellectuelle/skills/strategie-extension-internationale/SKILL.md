---
name: strategie-extension-internationale
description: >
  Arbre décisionnel d'extension internationale d'un dépôt brevet : FR national /
  EP via OEB (CBE) / PCT international (WIPO). Calcule coûts indicatifs (2026),
  délais, fenêtre de priorité (Convention Union de Paris, 12 mois brevets),
  recommandations par marché cible et secteur. Conçu pour décision à 6-12 mois
  post-dépôt FR initial. NE dépose PAS — décision et démarche EP/PCT restent au
  mandataire en brevets (EQE) ou avocat spécialisé.
argument-hint: "[num brevet FR initial | marchés cibles | budget budget annuel]"
---

# /strategie-extension-internationale

**Décision stratégique ≠ démarche officielle.** Ce skill aide à la **décision
d'extension** d'un brevet à l'étranger (EP via OEB, PCT via WIPO, voies
nationales). Il NE dépose PAS les demandes EP ou PCT (= mandataire en brevets
EQE), NE paye PAS les taxes, NE traduit PAS les revendications (étape critique
post-délivrance EP — **traduction certifiée requise pour validation par pays**
sauf Accord de Londres pour FR/DE/GB qui acceptent FR/EN/DE). **La fenêtre de
12 mois post-dépôt FR initial (Convention Union de Paris, Art. 4) est ferme**
— manquer cette fenêtre = perte de la revendication de priorité = chaque dépôt
ultérieur devient potentiellement antériorité contre le brevet FR initial.

## Examples

```
/hacienda-propriete-intellectuelle:strategie-extension-internationale "FR2700123"
```

```
/hacienda-propriete-intellectuelle:strategie-extension-internationale "FR2700123 — marchés UE + US + Chine"
```

```
/hacienda-propriete-intellectuelle:strategie-extension-internationale "FR2700123 — budget 50k€ extension + 100k€ annuités 10 ans"
```

(Sans argument, le skill demandera le numéro de brevet FR initial, la date de
dépôt FR pour calculer la fenêtre 12 mois Union de Paris, les marchés cibles,
le budget extension et la posture maintenance.)

---

## DÉCISION STRATÉGIQUE, PAS DÉMARCHE OFFICIELLE

**Reformuler en tête de chaque output. Ne jamais l'enlever. Ne jamais l'adoucir.**

> **Décision stratégique, pas démarche officielle.** Cette analyse est une
> aide à la **décision d'extension internationale** d'un brevet FR initial :
> rester en FR seul, étendre via la voie EP (OEB / Convention sur le Brevet
> Européen — 38 pays), étendre via la voie PCT (WIPO / Patent Cooperation
> Treaty — 156+ pays), ou une voie hybride. Elle propose une recommandation
> calibrée sur les marchés cibles, le budget disponible et la posture
> maintenance. Elle NE dépose PAS la demande EP ou PCT — la démarche formelle
> auprès de l'OEB ou de l'OMPI est l'acte d'un **mandataire en brevets
> qualifié EQE** (Examen Européen de Qualification) ou d'un avocat
> spécialisé. Elle NE paye PAS les taxes (~2 000€ EP, ~3 500€ PCT, plus
> validations / entrées nationales par pays). Elle NE traduit PAS les
> revendications — étape critique post-délivrance EP où la **traduction
> certifiée est obligatoire pour validation par pays** (sauf Accord de
> Londres pour FR/DE/GB qui acceptent FR/EN/DE). **La fenêtre de 12 mois
> post-dépôt FR initial (Convention Union de Paris, Art. 4) est ferme** :
> au-delà, la revendication de priorité est perdue, et chaque dépôt
> ultérieur devient potentiellement antériorité contre le brevet FR initial
> lui-même. Ce skill propose ; le mandataire EQE décide, dépose et défend.

C'est le garde-fou le plus visible du skill. Une décision d'extension prise
sans validation mandataire = porte à sens unique (fenêtre priorité expirée
sans rattrapage possible, ou validations EP surdimensionnées difficiles à
abandonner sans perte sèche). Sur-flagger = porte à 2 sens, le mandataire
élague. Rester sur la porte à 2 sens.

---
