# Hacienda Contrats

## Mission

`hacienda-contrats` est le plugin contrats commerciaux français de la marketplace Hacienda. Il aide à revoir, rédiger, négocier et résumer des contrats pour avocats, juristes, directions achats, directions commerciales et équipes produit supervisées.

Le plugin reste déclaratif : il ne remplace pas l'analyse de l'avocat. Toute conclusion contractuelle doit être rattachée à des sources officielles vérifiées, à la version contractuelle analysée et à un dossier de preuve.

## Sources Prioritaires

Ce plugin dépend de `hacienda-sources-officielles` pour vérifier les sources primaires :

- Code civil ;
- Code de commerce ;
- Code de la consommation ;
- JORF et LODA ;
- jurisprudence de la Cour de cassation ;
- textes sectoriels lorsque le contrat touche paiement, données, santé, finance ou consommation ;
- pièces utilisateur : contrat, annexes, CGV/CGU, DPA, bon de commande, emails de négociation, playbook.

Les bases privées ou modèles internes peuvent orienter la recherche, mais ils ne remplacent pas le contrôle des sources officielles.

## Connecteur Pappers

Pappers est un connecteur MCP externe optionnel pour les donnees d'entreprise, dirigeants, beneficiaires effectifs, comptes, BODACC, cartographies et signaux de risque. Il utilise `PAPPERS_API_KEY` via `https://mcp.pappers.fr/${PAPPERS_API_KEY}` et ne doit jamais etre configure avec une cle en clair dans le depot.

Pappers n'est pas une source officielle normative Hacienda. Les donnees Pappers peuvent enrichir le dossier de preuve, mais toute conclusion juridique ou citation normative doit etre recoupee avec `hacienda-sources-officielles` ou les pieces du dossier. Les champs PPE, sanctions, scoring financier et scoring non financier exigent une intention explicite et une validation humaine.

Usage prioritaire : verification cocontractant, pouvoirs du signataire, solvabilite et adaptation des clauses au risque.

## Règle De Preuve

- Toute source non consultée reste marquée `[à vérifier]`.
- Toute conclusion sensible doit citer texte, jurisprudence, clause ou pièce contrôlée.
- Toute contradiction entre texte, jurisprudence, version contractuelle et position de négociation doit être remontée en validation humaine.
- Le dossier de preuve conserve références, versions, dates de consultation, clauses, hypothèses et pièces.

## Commande De Démarrage

```text
/hacienda-contrats:entretien-demarrage
```

## Skills

- `entretien-demarrage` : configure les types de contrats, clauses sensibles et politique de redlines.
- `verification-pouvoir-signataire` : vérifie l'identité du cocontractant et les pouvoirs apparents du signataire.
- `recherche-contractuelle` : structure une recherche contractuelle française.
- `reviser-contrat` : produit revue de risques, sources et recommandations.
- `reviser-nda` : contrôle confidentialité, secret des affaires et clauses assimilées.
- `reviser-saas` : analyse SaaS, SLA, réversibilité, sécurité, données et responsabilité.
- `reviser-cgv-cgu` : vérifie CGV/CGU B2B/B2C et parcours contractuel.
- `analyser-distribution` : analyse distribution, franchise, agent commercial et réseau.
- `analyser-rupture-brutale` : évalue le risque de rupture brutale de relation commerciale établie.
- `reviser-bail-commercial` : contrôle bail commercial, renouvellement, congé et clauses sensibles.
- `proposer-redlines` : propose clauses alternatives et positions de négociation.
- `resume-operationnel` : produit un résumé métier avec obligations, risques et actions.

## Agents

- `veilleur-clauses-sensibles` : surveille les clauses contractuelles à risque.
- `suivi-negociation-contractuelle` : suit positions, concessions, fallbacks et points ouverts.
- `suivi-renouvellements-resiliations` : suit échéances, préavis, reconductions et résiliations.
- `veilleur-reformes-contractuelles` : surveille réformes et impacts sur modèles contractuels.

Les agents sont sans outil par défaut. Ils doivent demander ou utiliser Hacienda Sources Officielles avant toute conclusion.

## Livrables

- dossier de preuve contractuel ;
- revue de contrat ;
- matrice clauses / risques / sources ;
- redlines ou clauses alternatives ;
- mémo de négociation ;
- résumé opérationnel ;
- calendrier de renouvellement ou résiliation ;
- points de validation humaine.
