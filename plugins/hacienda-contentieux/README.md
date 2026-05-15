# Hacienda Contentieux

## Mission

`hacienda-contentieux` est le plugin contentieux français de la marketplace Hacienda. Il aide les avocats à structurer dossiers, chronologies, pièces, moyens, jurisprudence, actes, conclusions, audiences et transactions.

Le plugin reste déclaratif : il ne remplace pas la stratégie de l'avocat. Toute conclusion contentieuse doit être rattachée à des sources officielles vérifiées, aux pièces du dossier et à un dossier de preuve.

## Sources Prioritaires

Ce plugin dépend de `hacienda-sources-officielles` pour vérifier les sources primaires :

- Code de procédure civile ;
- Code civil ;
- Code de commerce selon le fond du litige ;
- Code de justice administrative ;
- Code de l'organisation judiciaire ;
- JORF et LODA ;
- jurisprudence de la Cour de cassation ;
- jurisprudence du Conseil d'État ;
- pièces utilisateur : contrats, courriers, emails, actes, décisions, constats, bordereaux, RPVA, calendriers.

Les bases privées peuvent orienter la recherche, mais elles ne remplacent pas le contrôle des sources officielles et des pièces.

## Connecteur Pappers

Pappers est un connecteur MCP externe optionnel pour les donnees d'entreprise, dirigeants, beneficiaires effectifs, comptes, BODACC, cartographies et signaux de risque. Il utilise `PAPPERS_API_KEY` via `https://mcp.pappers.fr/${PAPPERS_API_KEY}` et ne doit jamais etre configure avec une cle en clair dans le depot.

Pappers n'est pas une source officielle normative Hacienda. Les donnees Pappers peuvent enrichir le dossier de preuve, mais toute conclusion juridique ou citation normative doit etre recoupee avec `hacienda-sources-officielles` ou les pieces du dossier. Les champs PPE, sanctions, scoring financier et scoring non financier exigent une intention explicite et une validation humaine.

Usage prioritaire : solvabilite adversaire, procedures collectives, actifs immobiliers, cartographie groupe et decisions associees.

## Règle De Preuve

- Toute source ou pièce non consultée reste marquée `[à vérifier]`.
- Toute conclusion sensible doit citer procédure, fond, jurisprudence ou pièce contrôlée.
- Toute contradiction entre procédure, fond, jurisprudence et pièces doit être remontée en validation humaine.
- Le dossier de preuve conserve références, dates, pièces, charge de preuve, hypothèses et statut.

## Commande De Démarrage

```text
/hacienda-contentieux:entretien-demarrage
```

## Skills

- `entretien-demarrage` : configure juridictions, actes, sources, pièces et seuils de validation.
- `analyse-solvabilite-adversaire` : analyse solvabilité, procédures, groupe et actifs d'une partie adverse.
- `ouverture-dossier` : qualifie dossier, juridiction, fondements, délais et pièces.
- `chronologie` : construit une chronologie probatoire et procédurale.
- `matrice-pieces` : relie pièces, faits, moyens, demandes et recevabilité.
- `analyse-moyens` : analyse demandes, défenses, exceptions, incidents et fins de non-recevoir.
- `cartographie-jurisprudence` : classe jurisprudence favorable, défavorable et incertaine.
- `rediger-mise-en-demeure` : prépare une mise en demeure avec fondements et preuves.
- `rediger-assignation` : prépare un projet d'assignation ou équivalent procédural.
- `rediger-conclusions` : prépare conclusions ou mémoire avec dispositif et pièces.
- `memo-risque-contentieux` : synthétise risque, scénarios, preuve, quantum et stratégie.
- `strategie-transactionnelle` : prépare offres, concessions, protocole et BATNA.

## Agents

- `suivi-delais-procedure` : suit prescription, forclusion, appel, mise en état et échéances.
- `veilleur-jurisprudence-contentieux` : surveille jurisprudence utile aux dossiers.
- `suivi-mise-en-etat` : suit conclusions, pièces, incidents, clôture et audience.
- `suivi-transaction-contentieuse` : suit offres, concessions, protocole et renonciations.
- `enqueteur-solvabilite-pappers` : prepare solvabilite, procedures, groupe et actifs via Pappers avec recoupement.

Les agents sont sans outil par défaut. Ils doivent demander ou utiliser Hacienda Sources Officielles avant toute conclusion.

## Livrables

- dossier de preuve contentieux ;
- note d'ouverture de dossier ;
- chronologie ;
- matrice de pièces ;
- cartographie des moyens ;
- projet d'acte ou conclusions ;
- mémo de risque ;
- stratégie transactionnelle ;
- points de validation humaine.
