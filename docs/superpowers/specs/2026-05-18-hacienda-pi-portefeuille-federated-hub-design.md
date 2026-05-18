# Portefeuille PI - Design hub fédéré multi-actifs

Date: 2026-05-18
Statut: valide pour la Task 4.1
Portee: cadrage produit avant reécriture de `portefeuille-pi`

## Decision

La V1 de `portefeuille-pi` sera un **hub fédéré multi-actifs**.

Cette decision exclut pour la premiere passe :

- un simple orchestrateur passif qui se contente de relancer des skills existants sans produire de lecture produit propre ;
- un nouveau registre canonique multi-actifs qui dupliquerait les registres internes deja tenus par `revue-portefeuille-marques` et `revue-portefeuille-brevets`.

## Options evaluees

### Option retenue - hub fédéré multi-actifs

`portefeuille-pi` devient un point d'entree produit unique qui :

- lit le registre marques via `revue-portefeuille-marques` ;
- lit le registre brevets via `revue-portefeuille-brevets` ;
- produit une vue consolidee multi-actifs ;
- met en avant les echeances, les trous de couverture et les limites du registre.

Cette option permet d'obtenir une lecture portefeuille PI transverse sans casser les modeles existants ni ouvrir une migration de donnees supplementaire.

### Option non retenue en V1 - orchestrateur de skills existants

Un simple orchestrateur serait trop mince sur le plan produit. Il ne ferait guere plus que rediriger vers les deux skills existants ou concatener leurs sorties. Cela ne suffit pas pour :

- prioriser les echeances entre classes d'actifs ;
- faire ressortir les gaps de couverture entre marques et brevets ;
- expliquer clairement les limites du dispositif portefeuille global.

En pratique, cette option n'apporte pas une vraie capability `portefeuille-pi`. Elle reste un patron d'appel, pas un hub.

### Option non retenue en V1 - nouveau registre canonique multi-actifs

Un registre canonique multi-actifs n'est pas cree en V1.

Raisons principales :

- il dupliquerait des registres internes deja robustes et deja orientes usage ;
- il ouvrirait un chantier de synchronisation supplementaire entre au moins trois sources internes ;
- il augmenterait le risque de divergence silencieuse et donc de fausse confiance ;
- il obligerait a redefinir des schemas, des conventions de maintenance et des workflows CRUD sans besoin immediat ;
- il melangerait trop tot des actifs qui n'ont pas le meme rythme ni les memes logiques de suivi.

La V1 doit d'abord prouver la valeur d'une lecture consolidee avant d'introduire une nouvelle source de verite.

## Pourquoi le hub fédéré est le bon choix maintenant

Le codebase possede deja deux skills portefeuille riches, distincts et explicites sur leurs limites :

- `revue-portefeuille-marques` pour le registre interne des marques et leurs renouvellements ;
- `revue-portefeuille-brevets` pour le registre interne des brevets et leurs annuites.

Ces deux skills ne sont pas des demarches officielles. Ce sont des **registres internes de travail**. Le hub doit respecter cette nature et ne pas la travestir en registre officiel unifie.

Le choix du hub fédéré permet :

- de conserver chaque registre au plus pres de son metier ;
- de ne pas casser les usages existants ;
- de construire une lecture transverse utile a la direction juridique, au PI lead ou au business owner ;
- de reporter la question d'un eventuel registre canonique a une phase ulterieure, si un besoin concret de gouvernance ou d'automatisation apparait.

## Role produit du hub

`portefeuille-pi` en V1 doit servir a produire une **vue consolidee portefeuille PI** et non a administrer une nouvelle base.

La V1 est une **lecture seule**.

Le hub doit repondre a quatre besoins produit :

- **Vue consolidee** : reunir dans une meme lecture les actifs marques et brevets, avec statut, responsables et priorites.
- **Echeances** : faire ressortir les renouvellements, annuites et autres points d'attention imminents par niveau d'urgence.
- **Couverture et gaps** : montrer les angles morts evidents, par exemple marque strategique sans protection technique associee, ou actif critique sans owner clair.
- **Limites officielles** : rappeler qu'aucune donnee du hub ne vaut inscription, paiement, renouvellement ou validation officielle aupres d'un office.

Le hub ne remplace ni les skills sources ni une verification humaine aupres des registres officiels.

## Perimetre V1

La premiere passe est explicitement bornee a un **hub fédéré**.

### Entrees V1

- lecture consolidee de `revue-portefeuille-marques` ;
- lecture consolidee de `revue-portefeuille-brevets`.

### Ce que la V1 ne fait pas

- V1 ne cree, ne modifie et ne supprime aucun actif ; toute maintenance reste dans `revue-portefeuille-marques` et `revue-portefeuille-brevets` ;
- ne cree pas de nouvelle source canonique multi-actifs ;
- ne remplace pas `portfolio.yaml` ni `portfolio-brevets.yaml` ;
- ne fait pas de synchronisation officielle INPI, EUIPO, OEB, OMPI ou registre national ;
- ne transforme pas les registres internes en preuve d'accomplissement d'une formalite officielle ;
- ne gere pas encore d'autres classes d'actifs PI au-dela du couple marques / brevets.

## Contrat produit attendu pour la reécriture du skill

La reécriture ulterieure de `portefeuille-pi` devra assumer un role de hub et non de registre.

Les sorties federées attendues sont au minimum :

- `Vue des actifs`
- `Echeances`
- `Trous de couverture`
- `Limites du registre`

Le hub devra montrer clairement, dans chaque sortie, quelles informations viennent du registre marques et quelles informations viennent du registre brevets.

## Garde-fous de formulation

Le wording du futur hub doit rester coherent avec les skills sources :

- parler de **registre interne** et de **vue consolidee** ;
- ne pas promettre de registre officiel unifie ;
- ne pas laisser entendre qu'une echeance traitee dans le hub vaut paiement ou renouvellement effectif ;
- signaler toute information non verifiee comme `[a verifier]` quand la source officielle n'a pas ete consultee.

## Critere de succes pour la suite

La V1 est reussie si `portefeuille-pi` devient un point d'entree credible pour lire le portefeuille PI global sans :

- dupliquer la tenue des registres existants ;
- brouiller la limite entre registre interne et demarche officielle ;
- introduire une troisieme base interne a maintenir.

Le registre canonique multi-actifs reste une option ulterieure, mais seulement si un besoin reel de gouvernance transverse depasse les couts de duplication et de synchronisation.
