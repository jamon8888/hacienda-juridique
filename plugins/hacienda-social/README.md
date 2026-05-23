# Hacienda Social

## Mission

`hacienda-social` est le plugin de droit social français de la marketplace Hacienda. Il aide à produire des recherches, mémos, chronologies et revues de risques pour les avocats, juristes sociaux, DRH et professionnels supervisés.

Le plugin reste déclaratif : il ne remplace pas l'analyse de l'avocat. Toute conclusion sociale doit être rattachée à des sources officielles vérifiées et à un dossier de preuve.

## Sources Prioritaires

Ce plugin dépend de `hacienda-sources-officielles` pour vérifier les sources primaires :

- Code du travail ;
- conventions collectives KALI ;
- IDCC et champ d'application conventionnel ;
- JORF et LODA ;
- jurisprudence de la Cour de cassation ;
- Conseil d'État lorsque la décision administrative est en cause ;
- pièces utilisateur : contrats, avenants, bulletins, courriers, PV CSE, accords, calendriers.

Les bases privées utilisées par les avocats peuvent orienter la recherche, mais elles ne remplacent pas le contrôle des sources officielles.

## Règle De Preuve

- Toute source non consultée reste marquée `[à vérifier]`.
- Toute conclusion sensible doit citer Code du travail, KALI/IDCC, jurisprudence ou pièce contrôlée.
- Toute contradiction entre loi, convention collective, accord d'entreprise et jurisprudence doit être remontée en validation humaine.
- Le dossier de preuve conserve références, versions, dates de consultation, pièces, hypothèses et calculs.

## Commande De Démarrage

```text
/h-social:entretien-demarrage
```

## Skills

- `entretien-demarrage` : configure le profil social, les conventions collectives et les seuils de validation.
- `recherche-sociale` : structure une recherche de droit social français.
- `analyser-licenciement` : analyse motif, procédure, délais, indemnités et risque prud'homal.
- `analyser-rupture-conventionnelle` : vérifie consentement, calendrier, homologation et indemnité.
- `analyser-convention-collective` : identifie et contrôle une convention collective KALI/IDCC.
- `analyser-temps-travail` : analyse forfait jours, heures supplémentaires, repos, astreintes et preuve.
- `analyser-cse` : contrôle information-consultation, expertise, élections et risques d'entrave.
- `rediger-politique-rh` : prépare une politique RH ou un règlement interne avec garde-fous.
- `memo-risque-prudhomal` : structure demandes, moyens, pièces, chiffrage et stratégie.
- `classification-emploi` : analyse coefficient, statut, grille conventionnelle et rappel de salaire.
- `analyse-remuneration-variable` : analyse bonus, commissions, objectifs et modification de rémunération.

## Agents

- `veilleur-conventions-collectives` : surveille KALI/IDCC, avenants et extensions.
- `suivi-contentieux-prudhomal` : suit demandes, moyens, pièces et risques prud'homaux.
- `suivi-procedure-licenciement` : suit calendrier, procédure, motifs et risques de nullité.
- `veilleur-reformes-sociales` : surveille réformes, entrées en vigueur et impacts RH.

Les agents sont sans outil par défaut. Ils doivent demander ou utiliser Hacienda Sources Officielles avant toute conclusion.

## Livrables

- dossier de preuve social ;
- note de recherche ;
- mémo de risque RH ;
- chronologie prud'homale ;
- tableau Code du travail / KALI / jurisprudence / pièces ;
- calendrier de procédure ;
- projet de courrier ou politique RH ;
- points de validation humaine.
