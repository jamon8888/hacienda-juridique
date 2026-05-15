# Hacienda Produit Consommation

`hacienda-produit-consommation` est le plugin product counsel francais de la marketplace Hacienda. Il aide a revoir lancements, parcours consommateur, claims marketing, prix, promotions, CGV/CGU, plateformes et risques produit.

Chaque sortie est un brouillon a relire par un professionnel. Le plugin conserve une Note de revue, un Arbre de decision, des points `[a verifier]`, la source officielle consultee ou non, et un dossier de preuve.

## Premier Lancement

```text
/hacienda-produit-consommation:entretien-demarrage
```

Le profil de pratique est stocke dans :

```text
~/.claude/plugins/config/hacienda-juridique/hacienda-produit-consommation/CLAUDE.md
```

## Sources Prioritaires

- Code de la consommation ;
- Code civil ;
- Code de commerce ;
- DGCCRF ;
- droit europeen consommation ;
- CNIL/RGPD pour donnees et consentement ;
- ARPP ou autorites sectorielles ;
- PRD, maquettes, screenshots, tickets, copy, CGV/CGU, pricing.

## Skills

- `entretien-demarrage` : configure profil, produits, seuils et seed reviews.
- `revue-lancement` : revue juridique de lancement produit.
- `revue-parcours-consommateur` : analyse tunnel, consentement, information et friction.
- `revue-claims-marketing` : qualifie claims objectifs, comparatifs, absolus et implicites.
- `qualification-pratique-commerciale` : detecte pratiques trompeuses, agressives ou deloyales.
- `revue-cgv-cgu` : relit conditions, clauses sensibles, abonnement et responsabilite.
- `analyse-prix-promotions` : controle prix, promotions, reduction, reconduction et abonnement.
- `controle-marketplace-plateforme` : obligations plateforme, vendeurs, avis, moderation et DSA.
- `note-risque-produit` : produit une note de risque pour direction produit/juridique.
- `surveillance-lancements` : suit les lancements et changements de risque.

## Agents

- `veilleur-lancements` : surveille lancements proches.
- `veilleur-pratiques-commerciales` : surveille DGCCRF et signaux pratiques commerciales.
- `surveillant-claims` : surveille claims nouvelles ou modifiees.
- `registre-risques-produit` : maintient les risques et decisions de validation humaine.

## Livrables

- checklist de lancement ;
- memo de risque ;
- revue de claims ;
- revue parcours ;
- matrice actions avant go-live ;
- dossier de preuve ;
- Note de revue.

## Mode Silencieux

Le Mode silencieux reutilise les seuils du profil de pratique, mais ne remplace pas la validation humaine d'un lancement ou d'une claim.
