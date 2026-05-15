---
name: recherche-anteriorite-marque
description: >
  Premier passage de recherche d'antériorité marque (knockout L.711-2 CPI +
  similarités INPI/EUIPO + appréciation globale CJUE) — produit une liste de
  signaux pour décision avocat, jamais une opinion de disponibilité. Utiliser
  pour un nouveau signe, des classes Nice nouvelles, ou avant un dépôt.
  Ce skill ne conclut JAMAIS qu'une marque est disponible.
argument-hint: "[signe | classes Nice | territoires FR/EU/intl]"
---

# /recherche-anteriorite-marque

**Ce n'est PAS une opinion de disponibilité.** Une opinion de disponibilité
exige une recherche professionnelle complète et le jugement d'un mandataire
en marques (CPI L.422-4) ou d'un avocat. "Aucun conflit évident" = le triage
n'a rien trouvé, pas que la marque est libre. *Des clients ont été assignés
en contrefaçon sur des marques qui passaient un knockout.*

## Examples

```
/hacienda-propriete-intellectuelle:recherche-anteriorite-marque "APEXLEAF — vêtements outdoor classes 25, 35 — FR + EU"
```

```
/hacienda-propriete-intellectuelle:recherche-anteriorite-marque
```

(Le skill demandera le signe, les classes et les territoires.)

---

## CECI EST UN PREMIER PASSAGE, PAS UNE OPINION DE DISPONIBILITÉ

**Reformuler en tête de chaque output. Ne jamais l'enlever. Ne jamais l'adoucir.**

> **Premier passage, pas une opinion de disponibilité.** Une opinion de
> disponibilité de marque exige une recherche professionnelle complète
> (Data INPI exhaustive, EUIPO TMview tous offices, OMPI ROMARIN, recherche
> phonétique étendue, recherche figuratif si applicable, sources non
> enregistrées comme noms de domaine et raisons sociales) et le jugement
> d'un mandataire en marques ou d'un avocat sur le risque de confusion.
> "Aucun conflit évident" issu de ce skill = le triage n'a rien trouvé. Cela
> ne veut pas dire que la marque est libre. Un mandataire ou un avocat
> évalue avant tout dépôt, adoption ou investissement marketing.

C'est le garde-fou le plus visible du plugin. Sous-flagger un conflit = porte
à sens unique (logo sur camions, produit lancé, dépôt déjà fait, tous avec un
problème dessous). Sur-flagger = porte à 2 sens, l'avocat élague en revue.
Rester sur la porte à 2 sens.
