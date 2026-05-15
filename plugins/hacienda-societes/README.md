# Hacienda Sociétés

## Mission

`hacienda-societes` est le plugin droit des sociétés français de la marketplace Hacienda. Il aide à préparer audits corporate, gouvernance, assemblées, pactes, cessions de titres, M&A, closing et vie sociale.

Le plugin reste déclaratif : il ne remplace pas l'analyse de l'avocat. Toute conclusion corporate doit être rattachée à des sources officielles vérifiées, aux pièces de la société et à un dossier de preuve.

## Sources Prioritaires

Ce plugin dépend de `hacienda-sources-officielles` pour vérifier les sources primaires :

- Code de commerce ;
- Code civil ;
- Code monétaire et financier si titres financiers ou opération régulée ;
- JORF et LODA ;
- jurisprudence de la Cour de cassation ;
- RCS-INPI, Kbis, bénéficiaires effectifs, dépôts et formalités ;
- BODACC ;
- pièces utilisateur : statuts, pacte, registres, PV, décisions, table de capitalisation, data room.

Les bases privées ou modèles internes peuvent orienter la recherche, mais ils ne remplacent pas le contrôle des sources officielles et des pièces corporate.

## Règle De Preuve

- Toute source ou pièce non consultée reste marquée `[à vérifier]`.
- Toute conclusion sensible doit citer texte, jurisprudence, statuts, pacte, registre ou formalité contrôlée.
- Toute contradiction entre Code de commerce, Code civil, statuts, pacte, registre et pratique doit être remontée en validation humaine.
- Le dossier de preuve conserve références, versions, dates, pièces, hypothèses, registres et formalités.

## Commande De Démarrage

```text
/hacienda-societes:entretien-demarrage
```

## Skills

- `entretien-demarrage` : configure formes sociales, opérations, sources et seuils de validation.
- `recherche-societes` : structure une recherche corporate française.
- `audit-societes` : contrôle statuts, registres, RCS-INPI, dépôts, décisions et risques.
- `reviser-pacte-associes` : analyse pactes, préemption, agrément, tag/drag, bad leaver et gouvernance.
- `reviser-cession-titres` : revoit cession, promesse, SPA, pouvoirs, agréments et formalités.
- `preparer-assemblee` : prépare convocation, ordre du jour, résolutions, quorum et majorité.
- `rediger-proces-verbal` : prépare PV ou décisions avec mentions, votes et formalités.
- `checklist-closing` : suit conditions, signatures, pouvoirs, KYC, registres et post-closing.
- `calendrier-vie-sociale` : planifie approbation des comptes, dépôts, mandats et formalités.
- `tableau-garanties` : structure garanties, disclosure, limitations et pièces de data room.
- `analyse-gouvernance` : cartographie organes, pouvoirs, conventions et conflits.

## Agents

- `veilleur-vie-sociale` : surveille obligations, dépôts, décisions et échéances.
- `suivi-closing` : suit conditions, pièces, signatures et post-closing.
- `suivi-gouvernance` : suit pouvoirs, délégations, conventions et conflits.
- `veilleur-reformes-corporate` : surveille réformes et impacts sur formalités et modèles.

Les agents sont sans outil par défaut. Ils doivent demander ou utiliser Hacienda Sources Officielles avant toute conclusion.

## Livrables

- dossier de preuve corporate ;
- audit corporate ;
- note de gouvernance ;
- projet de PV ou décisions ;
- checklist de closing ;
- calendrier de vie sociale ;
- tableau garanties / risques / pièces ;
- points de validation humaine.
