---
name: tableau-contrefacon-brevet
description: >
  Claim chart — confrontation des revendications d'un brevet (FR / EP / PCT)
  contre la documentation technique d'un produit incriminé, élément par
  élément. Évalue contrefaçon littérale ET contrefaçon par équivalence
  (CPI L.613-3, Cour de cass. com. 5 mai 2009 n°08-13.586). Produit un
  tableau exploitable par mandataire en brevets ou avocat PI pour préparer
  mise en demeure, saisie-contrefaçon (CPC art. 59) ou action TJ Paris
  (compétence exclusive L.615-1). Ne conclut PAS à la contrefaçon —
  qualification juridique = mandataire/avocat.
argument-hint: "[num brevet | doc produit | théorie : littérale/équivalence/les deux]"
---

# /tableau-contrefacon-brevet

**Confrontation ≠ qualification de contrefaçon.** Ce skill produit un
**tableau d'analyse technique** pour aider le mandataire en brevets ou
l'avocat à préparer une stratégie d'enforcement. Il NE qualifie PAS la
contrefaçon (= rôle du juge ou du mandataire/avocat), NE rédige PAS de mise
en demeure (= rôle `mise-en-demeure-pi`), NE prépare PAS la requête en
saisie-contrefaçon (= `saisie-contrefacon` V6.0 future). **La qualification
de contrefaçon est une décision juridique aux conséquences lourdes** :
risques d'action en concurrence déloyale en cas de mise en demeure abusive,
dommages-intérêts si saisie injustifiée (CPC art. 78). **Toujours valider
par mandataire/avocat avant toute action externe.**

## Examples

```
/hacienda-propriete-intellectuelle:tableau-contrefacon-brevet "Brevet FR2700123 (membrane graphène) | notice produit AquaPur X9 + fiche tech | les deux"
```

```
/hacienda-propriete-intellectuelle:tableau-contrefacon-brevet "EP3456789 (algorithme compression vidéo) | repository GitHub public + doc API | littérale"
```

```
/hacienda-propriete-intellectuelle:tableau-contrefacon-brevet
```

(Le skill demandera le brevet, la documentation produit, la théorie souhaitée
et le contexte business.)

---

## CONFRONTATION TECHNIQUE, PAS QUALIFICATION DE CONTREFAÇON

**Reformuler en tête de chaque output. Ne jamais l'enlever. Ne jamais l'adoucir.**

> **Confrontation technique, pas qualification de contrefaçon.** Ce skill
> confronte élément par élément les revendications d'un brevet à la
> documentation d'un produit incriminé et produit un **claim chart** —
> tableau d'analyse technique destiné au mandataire en brevets ou à
> l'avocat PI. Il NE qualifie PAS la contrefaçon, NE rédige PAS la mise en
> demeure, NE prépare PAS la saisie-contrefaçon (CPC art. 59) ni
> l'assignation devant le TJ Paris (compétence exclusive CPI L.615-1).
> La qualification de contrefaçon est une **décision juridique** aux
> conséquences lourdes : une mise en demeure abusive expose à une action
> en concurrence déloyale ; une saisie-contrefaçon injustifiée expose à
> des dommages-intérêts (CPC art. 78) ; une action infondée expose à
> l'article 700 et à la réputation. **Toujours valider par mandataire en
> brevets ou avocat PI avant toute action externe.**

C'est le garde-fou le plus visible du skill. Le claim chart est un outil
puissant : mal lu, il peut décider à tort d'envoyer une mise en demeure ou
de saisir. Le tableau **trie et rend lisible** ; il ne conclut pas. Garder
la posture "porte à deux sens" (sur-flagger les éléments douteux en `❓` ou
`[review]`, laisser l'avocat trancher) plutôt que "porte à sens unique"
(décider tacitement à la place du mandataire).
