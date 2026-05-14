# Hacienda Fiscal

## Mission

`hacienda-fiscal` est le plugin de fiscalité française de la marketplace Hacienda. Il sert à produire des recherches, mémos et suivis fiscaux utilisables par des avocats fiscalistes, experts-comptables, directions fiscales et juristes patrimoniaux.

Le plugin reste déclaratif : il ne remplace pas la validation professionnelle. Toute conclusion fiscale doit être reliée à des sources officielles vérifiées et conservée dans un dossier de preuve.

## Sources Prioritaires

Ce plugin dépend de `hacienda-sources-officielles` pour vérifier les sources primaires :

- CGI ;
- LPF ;
- BOFiP ;
- JORF et LODA ;
- Conseil d'État ;
- juridictions judiciaires ou européennes lorsque le sujet fiscal l'exige.

Les bases doctrinales ou professionnelles privées peuvent orienter la recherche, mais elles ne remplacent pas le contrôle des sources officielles.

## Règle De Preuve

- Toute source non consultée reste marquée `[à vérifier]`.
- Toute position sensible doit citer le texte, la doctrine ou la jurisprudence contrôlée.
- Toute contradiction CGI / LPF / BOFiP / jurisprudence doit être remontée en validation humaine.
- Le dossier de preuve doit conserver références, dates de consultation, hypothèses et pièces utilisées.

## Commande De Démarrage

```text
/hacienda-fiscal:entretien-demarrage
```

## Skills

- `entretien-demarrage` : configure le profil fiscal, les sources et les seuils de validation.
- `recherche-fiscale` : structure une recherche fiscale française.
- `verifier-bofip` : contrôle une doctrine BOFiP et son articulation avec le droit positif.
- `analyse-tva` : analyse TVA, territorialité, taux, exigibilité, déduction et facturation.
- `analyse-impot-societes` : analyse IS, résultat fiscal, régimes spéciaux et restructurations.
- `analyse-impot-revenu` : analyse IR, revenus catégoriels et fiscalité patrimoniale.
- `controle-fiscal` : prépare une analyse de procédure et de rectification.
- `rediger-rescrit` : structure une demande de rescrit fiscal.
- `memo-contentieux-fiscal` : prépare un mémo de réclamation ou contentieux.
- `analyse-abus-de-droit` : analyse abus de droit et mini-abus de droit.
- `analyse-plus-value` : analyse plus-values professionnelles, mobilières ou immobilières.

## Agents

- `veilleur-bofip` : veille les évolutions BOFiP liées au profil fiscal.
- `suivi-controle-fiscal` : suit les étapes, délais et risques d'un contrôle fiscal.
- `veilleur-reformes-fiscales` : surveille les réformes, entrées en vigueur et impacts pratiques.
- `suivi-delais-fiscaux` : prépare le calendrier et les alertes de délais fiscaux.

Les agents sont sans outil par défaut. Ils doivent demander ou utiliser la couche Hacienda Sources Officielles avant toute conclusion.

## Livrables

- dossier de preuve fiscal ;
- note de recherche ;
- mémo de conseil ou contentieux ;
- tableau sources / statut de vérification ;
- chronologie de contrôle fiscal ;
- calendrier de délais ;
- points de validation humaine.
