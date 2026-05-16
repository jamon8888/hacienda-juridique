---
name: qualification-oeuvre
description: >
  Qualification juridique d'une création au regard du droit d'auteur français
  (CPI Livre I) — analyse multi-étapes : (1) originalité L.111-1 + CJUE Infopaq,
  (2) catégorie L.112-2 (liste non exhaustive), (3) titularité initiale selon
  7 cas (créateur unique / collaboration / collective / composite / commande /
  salariat / posthume), (4) distinction droits patrimoniaux L.122-1+ vs droit
  moral L.121-1 (perpétuel inaliénable imprescriptible), (5) durée 70 ans post
  mortem L.123-1, (6) enjeux selon objectif (préventif / défensif / contentieux).
  Point d'entrée du bloc droit d'auteur V4. Ne rédige PAS de contrat de cession
  (= cession-droit-auteur V4.1), ne qualifie PAS une contrefaçon (=
  contrefacon-droit-auteur V4.2). Ce skill NE conclut JAMAIS à l'existence ou
  l'inexistence du droit d'auteur (= juge in fine).
argument-hint: "[description œuvre | nature | contexte création | objectif préventif/défensif/contentieux]"
---

# /qualification-oeuvre

> **Qualification juridique ≠ avis d'opportunité.** Ce skill produit une
> **analyse de qualification** pour aider l'avocat spécialisé en propriété
> littéraire et artistique. Il NE conclut PAS à l'existence ou à la
> non-existence du droit d'auteur (= rôle du juge, in fine), NE rédige PAS un
> contrat de cession ou de licence (= `cession-droit-auteur` V4.1 /
> `licence-droit-auteur` V4.1), NE qualifie PAS une contrefaçon (=
> `contrefacon-droit-auteur` V4.2). Le droit d'auteur **naît automatiquement à
> la création** (CPI L.111-1) sans formalité de dépôt — mais la **preuve de la
> date de création et de l'identité de l'auteur** reste critique en cas de
> litige (cf. `depot-preuve-creation` v0.1 préservé).

## Examples

```
/hacienda-propriete-intellectuelle:qualification-oeuvre "Roman littéraire 320 pages — auteur personne physique seule — édition envisagée chez éditeur tiers — objectif préventif"
```

```
/hacienda-propriete-intellectuelle:qualification-oeuvre "Logiciel SaaS B2B développé par équipe de 4 développeurs salariés — code source + interface graphique + base de données utilisateurs — objectif préventif avant levée de fonds"
```

```
/hacienda-propriete-intellectuelle:qualification-oeuvre "Contenu marketing — vidéo publicitaire 30 sec commandée à agence externe — diffusion TV + web prévue — objectif préventif avant lancement campagne"
```

(Le skill demandera la description, le contexte de création, la date, les preuves disponibles et l'objectif.)

---

## QUALIFICATION JURIDIQUE, PAS AVIS D'OPPORTUNITÉ

**Reformuler en tête de chaque output. Ne jamais l'enlever. Ne jamais l'adoucir.**

> **Qualification juridique, pas avis d'opportunité.** Ce skill produit une
> analyse de qualification au regard du droit d'auteur français — il
> identifie les critères d'originalité (L.111-1 + jurisprudence CJUE
> Infopaq), la catégorie applicable (L.112-2 — liste non exhaustive), le cas
> de titularité initiale (7 cas exhaustifs), le partage droits patrimoniaux
> vs droit moral, la durée de protection, et les enjeux selon l'objectif
> (préventif / défensif / contentieux). Il NE conclut PAS à l'existence ou
> à l'inexistence du droit d'auteur sur l'œuvre concrète — c'est le **juge**
> qui tranche in fine, après contestation, sur la base de la preuve apportée
> par les parties. Le droit d'auteur naît automatiquement à la création sans
> formalité de dépôt (CPI L.111-1), mais la qualification reste un exercice
> juridique nécessitant validation par un avocat spécialisé en propriété
> littéraire et artistique avant tout acte (exploitation, cession,
> contestation, action en contrefaçon). Une qualification erronée porte des
> conséquences à sens unique : cession invalide, action contrefaçon mal
> fondée (déboutement + dépens + risque concurrence déloyale), violation
> droit moral non anticipée (action en cessation + dommages-intérêts).

C'est le garde-fou le plus visible du skill. Sous-qualifier l'originalité =
porte à sens unique (exploitation engagée, cession signée, dépôt fait sans
mesures de preuve). Sur-qualifier = porte à 2 sens, l'avocat affine.
Rester sur la porte à 2 sens.

---
