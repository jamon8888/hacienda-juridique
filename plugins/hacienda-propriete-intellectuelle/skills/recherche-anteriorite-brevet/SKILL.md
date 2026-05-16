---
name: recherche-anteriorite-brevet
description: >
  Premier passage de recherche d'antériorité brevet (knockout exclusions
  L.611-10 CPI + recherche INPI Brevets / OEB Espacenet + appréciation
  nouveauté et activité inventive selon l'approche problème-solution OEB) —
  produit une liste de signaux pour décision mandataire en brevets ou avocat,
  jamais une opinion de brevetabilité ni de liberté d'exploitation. Utiliser
  pour une nouvelle invention, des codes CIB nouveaux, ou avant un dépôt
  FR/EP/PCT. Ce skill ne conclut JAMAIS qu'une invention est brevetable.
argument-hint: "[description invention | codes CIB | territoires FR/EP/PCT]"
---

# /recherche-anteriorite-brevet

**Ce n'est PAS une opinion de brevetabilité ni FTO (Liberté d'Exploitation).**
Une opinion de brevetabilité exige une recherche professionnelle exhaustive
(Data INPI + OEB Espacenet + Google Patents + littérature non-brevet) et le
jugement d'un **mandataire en brevets** inscrit à l'OEB (EQE) ou d'un avocat
spécialisé PI. "Aucune antériorité évidente" issu de ce skill = le triage n'a
rien trouvé. Cela ne veut pas dire que l'invention est brevetable. *Des
inventeurs ont perdu des années de R&D sur des brevets refusés pour
antériorité que le triage n'avait pas trouvée.*

## Examples

```
/hacienda-propriete-intellectuelle:recherche-anteriorite-brevet "Procédé de filtration membranaire à base de polymère X — CIB B01D 71/02 — FR + EP"
```

```
/hacienda-propriete-intellectuelle:recherche-anteriorite-brevet "Algorithme de compression vidéo basé sur réseau de neurones — CIB H04N 19, G06N 3 — PCT"
```

```
/hacienda-propriete-intellectuelle:recherche-anteriorite-brevet
```

(Le skill demandera la description, la classification CIB, la date de priorité et les territoires.)

---

## CECI EST UN PREMIER PASSAGE, PAS UNE OPINION DE BREVETABILITÉ

**Reformuler en tête de chaque output. Ne jamais l'enlever. Ne jamais l'adoucir.**

> **Premier passage, pas une opinion de brevetabilité.** Une opinion de
> brevetabilité exige une recherche professionnelle exhaustive (Data INPI
> brevets, OEB Espacenet OPS sur 160M+ documents mondiaux, Google Patents,
> WIPO PatentScope, et la **littérature non-brevet** — Google Scholar, IEEE,
> bases sectorielles), suivie d'une analyse revendication par revendication
> par un **mandataire en brevets** inscrit à l'OEB (qualifié EQE) ou d'un
> avocat spécialisé en propriété industrielle. "Aucune antériorité évidente"
> issu de ce skill = le triage n'a rien trouvé dans les bases interrogées.
> Cela ne veut pas dire que l'invention est nouvelle, ni qu'elle implique
> une activité inventive, ni qu'elle est brevetable. Cela ne dit RIEN sur
> la liberté d'exploitation (FTO) — un brevet en vigueur d'un tiers peut
> bloquer l'exploitation même d'une invention brevetable. Un mandataire en
> brevets ou un avocat évalue avant tout dépôt, toute communication
> publique, ou tout investissement industriel.

C'est le garde-fou le plus visible du plugin. Sous-flagger une antériorité
= porte à sens unique (R&D engagée, demande déposée, communication publique
faite, brevet accordé puis annulé en nullité, tous avec une antériorité
dessous). Sur-flagger = porte à 2 sens, le mandataire élague en revue.
Rester sur la porte à 2 sens.

---
