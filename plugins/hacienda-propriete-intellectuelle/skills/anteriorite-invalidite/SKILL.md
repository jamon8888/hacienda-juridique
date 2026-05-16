---
name: anteriorite-invalidite
description: >
  Recherche et structure une argumentation d'invalidité (nullité) d'un brevet
  adverse — en attaque préventive (action en nullité TJ Paris L.613-25 CPI)
  ou en défense face à une action en contrefaçon (L.615-1 CPI). Identifie
  l'art antérieur destructeur (nouveauté L.611-11 ou activité inventive
  problème-solution OEB), structure les moyens de nullité pour exploitation
  judiciaire. NE plaide PAS — préparation à valider par mandataire EQE ou
  avocat spécialisé brevets.
argument-hint: "[num brevet cible | --attack (nullité préventive) | --defense (face contrefaçon)]"
---

# /anteriorite-invalidite

**Préparation argumentaire ≠ procédure judiciaire.** Ce skill prépare une
**argumentation d'invalidité** pour aider le mandataire en brevets (EQE —
European Qualifying Examination) ou l'avocat spécialisé brevets. Il NE
forme PAS l'action en nullité (= démarche TJ Paris formelle via avocat
habilité), NE plaide PAS au TJ Paris (compétence exclusive L.615-1 CPI),
NE négocie PAS de transaction avec le titulaire du brevet attaqué.

**Conséquences d'une argumentation faible** :

- **Action en nullité ratée** = condamnation aux dépens (CPC art. 696) +
  risque d'action en concurrence déloyale si attaque jugée abusive (Code
  civil art. 1240)
- **Défense en nullité mal construite** dans une action en contrefaçon
  adverse = condamnation contrefaçon + dommages-intérêts CPI L.615-7
  (réparation intégrale + atteinte morale)

Le brevet attaqué est **présumé valide** jusqu'à décision contraire — la
charge de la preuve d'invalidité pèse sur l'attaquant.

## Examples

```
/hacienda-propriete-intellectuelle:anteriorite-invalidite --attack FR2700123
```

(Mode attaque : nullité préventive contre un brevet adverse qui bloque
notre activité commerciale. Action en nullité devant TJ Paris.)

```
/hacienda-propriete-intellectuelle:anteriorite-invalidite --defense FR2700123
```

(Mode défense : nous avons reçu une assignation en contrefaçon sur le
brevet FR2700123. Préparer la défense en nullité — demande reconventionnelle
ou exception — combinée à la non-contrefaçon.)

```
/hacienda-propriete-intellectuelle:anteriorite-invalidite
```

(Sans flag — le skill demande quel mode utiliser et déroule l'intake.)

---

## PRÉPARATION ARGUMENTAIRE, PAS PROCÉDURE JUDICIAIRE

**Reformuler en tête de chaque output. Ne jamais l'enlever. Ne jamais l'adoucir.**

> **Préparation argumentaire, pas procédure judiciaire.** Ce skill prépare
> une **argumentation d'invalidité** d'un brevet adverse — en attaque
> préventive (action en nullité TJ Paris) ou en défense face à une action
> en contrefaçon reçue. Il NE forme PAS l'action en nullité (démarche TJ
> Paris formelle nécessitant avocat habilité), NE plaide PAS en audience
> (compétence exclusive L.615-1 CPI), NE négocie PAS de transaction avec
> le titulaire. **Les enjeux sont lourds** : une action en nullité ratée
> expose aux dépens (CPC art. 696) et à une action en concurrence déloyale
> si l'attaque est jugée abusive (Code civil art. 1240) ; une défense en
> nullité mal construite expose à la condamnation pour contrefaçon et aux
> dommages-intérêts CPI L.615-7 (réparation intégrale + atteinte morale).
> Le brevet attaqué est **présumé valide** — la charge de la preuve pèse
> sur l'attaquant. **Toujours valider par mandataire en brevets EQE ou
> avocat spécialisé brevets avant toute action externe.**

C'est le garde-fou le plus visible du skill. L'argumentation d'invalidité
est un outil puissant : mal préparée, elle peut décider à tort d'engager
une action coûteuse et risquée, ou de bâcler une défense critique. La
posture est "porte à deux sens" (sur-flagger les motifs faibles `🔴` ou
`[review]`, laisser le mandataire/avocat trancher) plutôt que "porte à
sens unique" (décider tacitement à la place du professionnel).

---
