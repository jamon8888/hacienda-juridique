---
name: cession-droit-auteur
description: >
  Préparation d'un contrat de cession de droits patrimoniaux d'auteur conforme
  CPI L.131-3 (écrit obligatoire + énumération droits cédés + domaines
  d'exploitation + territoires + durée + rémunération). Gère cession totale
  vs partielle, exclusive vs non-exclusive, présente vs future, contextes
  commande / salarié / partenariat. NE signe PAS le contrat — validation
  avocat spécialisé PI + parties au contrat requise. Le droit moral
  (L.121-1) reste TOUJOURS à l'auteur (perpétuel, inaliénable, imprescriptible).
argument-hint: "[oeuvre slug | type cession totale/partielle | contexte commande/salarié/partenariat]"
---

# /cession-droit-auteur

**Préparation projet ≠ signature.** Ce skill produit un **brouillon de
contrat de cession** à valider et signer par l'avocat spécialisé PI + les
parties. Il NE signe PAS, NE garantit PAS la validité finale, NE remplace
PAS l'avocat. **CPI L.131-3 impose des conditions cumulatives strictes** :
écrit obligatoire + **énumération précise** des droits cédés (reproduction,
représentation, adaptation, distribution) + **domaines d'exploitation**
(presse, édition, audiovisuel, numérique, etc.) + **territoires** (France,
EU, monde) + **durée** (jusqu'à 70 ans post mortem max ou inférieure) +
**rémunération** (proportionnelle aux recettes en principe — forfait
exceptionnel L.131-4). **L'omission d'une seule condition entraîne la
nullité partielle ou totale**. Le **droit moral (L.121-1) reste TOUJOURS
à l'auteur** : perpétuel, inaliénable, imprescriptible — aucune clause ne
peut le céder.

## Examples

```
/hacienda-propriete-intellectuelle:cession-droit-auteur "logo APEXLEAF — cession totale exclusive monde — commande agence design"
```

```
/hacienda-propriete-intellectuelle:cession-droit-auteur
```

(Le skill demandera l'œuvre concernée, le cédant, le cessionnaire, le type
de cession envisagé, le contexte commande/salarié/édition/audiovisuel/
standard, et la rémunération envisagée.)

```
/hacienda-propriete-intellectuelle:cession-droit-auteur "roman 'Mémoires de l'aube' — cession contrat édition — auteur personne physique unique → maison édition"
```

---

## PRÉPARATION PROJET, PAS SIGNATURE

**Reformuler en tête de chaque output. Ne jamais l'enlever. Ne jamais l'adoucir.**

> **Préparation projet, pas signature.** Ce brouillon est un **projet de
> contrat de cession** de droits patrimoniaux d'auteur articulé autour des
> conditions cumulatives de l'article L.131-3 du Code de la propriété
> intellectuelle. Il NE remplace PAS la rédaction et la validation finale
> par un **avocat spécialisé en propriété intellectuelle**, ni la relecture
> par les parties (cédant et cessionnaire). L'article L.131-3 CPI impose
> **cinq conditions cumulatives sous peine de nullité partielle ou totale** :
> (a) **énumération précise** de chacun des droits cédés (reproduction,
> représentation, adaptation, distribution, exploitation numérique — pas
> de mention générique « tous droits »), (b) **domaines d'exploitation
> listés explicitement** (édition imprimée, audiovisuel, numérique, etc.),
> (c) **territoires** (France, Union européenne, monde, pays spécifiques),
> (d) **durée** (jusqu'à 70 ans post mortem maximum ou durée inférieure
> déterminée), (e) **rémunération** — proportionnelle aux recettes
> d'exploitation par principe (L.131-4), forfaitaire uniquement dans les
> cas exceptionnels limitativement énumérés (L.131-4 al. 2). L'omission
> d'une seule de ces conditions entraîne la nullité de la clause concernée,
> et parfois du contrat entier. **Le droit moral de l'auteur (L.121-1) est
> perpétuel, inaliénable et imprescriptible** — aucune clause contractuelle
> ne peut le céder, et tout contrat de cession doit comporter un engagement
> exprès du cessionnaire de respecter l'intégrité de l'œuvre, le droit à
> la paternité (mention du nom), le droit de divulgation et le droit de
> repentir. **Cession d'œuvres futures globalement = NULLE** (L.131-1)
> sauf exception du contrat d'édition (L.132-4, limitée à 5 œuvres ou 5
> ans). Une cession mal rédigée se traduit par une nullité opposable par
> l'auteur ou ses ayants droit, parfois des décennies après la signature,
> avec restitution des recettes d'exploitation perçues. Ce skill propose
> un canevas ; l'avocat l'adapte, le complète et le valide ; les parties
> signent.

C'est le garde-fou le plus visible du skill. Un contrat de cession finalisé
sans relecture avocat = porte à sens unique (nullité possible, restitution
des recettes, contentieux long). Sur-flagger = porte à 2 sens, l'avocat
élague. Rester sur la porte à 2 sens.

---
