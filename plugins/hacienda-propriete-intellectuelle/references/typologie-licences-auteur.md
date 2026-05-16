# Typologie des licences droit d'auteur

> Référence interne plugin `hacienda-propriete-intellectuelle`. Brouillon soumis à validation humaine.

---

## 1. Table comparative — 5 types principaux

| Type | Titularité | Exclusivité | Durée typique | Révocabilité | Coût typique | Cas d'usage |
|------|-----------|-------------|--------------|-------------|-------------|-------------|
| Exclusive | Auteur conserve | Oui — seul licencié dans le périmètre | 3-10 ans | À l'expiration ou résiliation | Redevance proportionnelle + minimum garanti | Partenariat éditorial, distribution stratégique |
| Non-exclusive | Auteur conserve | Non — plusieurs licenciés possibles | Variable | À l'expiration ou résiliation | Forfait ou redevance par usage | Photothèque, musique, contenus syndiqués |
| Libre (Creative Commons) | Auteur conserve | Non | Durée protection légale | Irrévocable pour utilisateurs actuels | Gratuite | Contenus open access, éducation, open data |
| EULA | Auteur/éditeur | Non-exclusive en général | Abonnement ou perpétuelle | Résiliation contrat | Licence + maintenance | Logiciel propriétaire packagé |
| SaaS / CGU | Plateforme ou auteur | Non-exclusive | Durée abonnement | À la résiliation du compte | Incluse dans l'abonnement | Plateforme collaborative, contenus utilisateurs |

---

## 2. Licences Creative Commons — 7 variantes

### Principes communs CC 4.0 International

- Licence mondiale, gratuite, sans frais
- Irrévocable une fois accordée publiquement
- Attribution (BY) toujours obligatoire dans toutes les variantes (sauf CC0)
- Compatibilité RGPD : la licence CC ne traite pas les données personnelles — un DPA reste nécessaire si des données personnelles sont incluses dans les contenus

### Table des 7 variantes

| Code | Nom complet | Attribution | Usage commercial | Modifications | Compatibilité |
|------|-------------|-------------|-----------------|--------------|---------------|
| CC BY | Attribution | Obligatoire | Oui | Libres | Très large |
| CC BY-SA | Attribution - Partage à l'identique | Obligatoire | Oui | Libres sous même licence | GPL v3, Free Art License |
| CC BY-ND | Attribution - Pas de modification | Obligatoire | Oui | Interdites | Aucune œuvre dérivée |
| CC BY-NC | Attribution - Pas d'usage commercial | Obligatoire | Non | Libres | Limitée |
| CC BY-NC-SA | Attribution - NC - SA | Obligatoire | Non | Libres sous même licence | Très limitée |
| CC BY-NC-ND | Attribution - NC - ND | Obligatoire | Non | Interdites | La plus restrictive |
| CC0 | Domaine public (renonciation) | Non requise | Oui | Libres | Universelle |

### Recommandations par contexte

| Contexte | Licence recommandée | Raison |
|----------|--------------------|----|
| Article scientifique / thèse | CC BY | Compatible open access (Plan S, HAL) |
| Photo de presse / éditoriale | CC BY ou CC BY-NC | Selon politique commerciale |
| Photo artistique | CC BY-NC-ND | Conservation intégrité + restriction commerciale |
| Contenu pédagogique | CC BY-SA | Partage des ressources éducatives libres |
| Données ouvertes (open data public) | CC0 ou Licence Ouverte Etalab 2.0 | Réutilisation maximale |
| Musique de fond (usage libre) | CC BY ou CC BY-NC | Selon monétisation souhaitée |
| Logiciel | Ne pas utiliser CC — préférer MIT, Apache, GPL | CC non adaptée au logiciel (renvoi `logiciels-pi`) |
| Base de données | CC0 ou ODbL | Renvoi `bases-de-donnees` |

### Mentions obligatoires (CC 4.0)

```
[Titre de l'œuvre] by [Nom de l'auteur] is licensed under CC BY[-SA/-ND/-NC/...] 4.0.
To view a copy of this license, visit https://creativecommons.org/licenses/by[...]/4.0/
```

Pour les modifications : ajouter « Modifications : [description] by [modificateur] ».

---

## 3. Licences EULA — Caractéristiques clés

### Structure type EULA propriétaire

1. **Octroi de licence** : non-exclusive, non-transférable, révocable, limitée à l'usage défini
2. **Périmètre utilisateurs** : nombre de postes, utilisateurs nommés, ou utilisateurs concurrents
3. **Restrictions** : interdiction de rétro-ingénierie (L.122-6-1 CPI), de décompilation (sauf interopérabilité L.122-6-1 II), de copie non autorisée
4. **Mises à jour** : incluses ou soumises à abonnement séparé
5. **Garantie limitée** : « en l'état », sans garantie d'adéquation à un usage particulier
6. **Responsabilité plafonnée** : généralement au prix de la licence sur 12 mois

### Dérogations légales non contractualisables (L.122-6-1)

Même si l'EULA les interdit, l'utilisateur conserve légalement le droit de :
- Effectuer une copie de sauvegarde (L.122-6-1 I)
- Observer, étudier, tester le logiciel lors de son utilisation normale (L.122-6-1 III)
- Décompiler pour assurer l'interopérabilité (L.122-6-1 II, conditions strictes)

---

## 4. Licences SaaS — Double niveau

### Niveau 1 : CGU / Contrat de service

Régit l'accès au service : disponibilité (SLA), support, prix, résiliation, propriété des données.

### Niveau 2 : Licence contenu utilisateur

L'utilisateur conserve la titularité de ses contenus mais accorde à la plateforme une licence nécessaire au fonctionnement du service :

- Droits minimaux : reproduction (serveur/CDN), adaptation (compression/format), communication au public (affichage)
- Durée : pendant l'abonnement actif + délai conservation légale/technique post-résiliation
- Sous-licence : à clarifier (partenaires CDN, sous-traitants techniques = sous-licence technique tolérée)
- Révocabilité : à la suppression du contenu / résiliation du compte

### Clause de portabilité des données (RGPD art. 20)

Si les contenus incluent des données personnelles, prévoir :
- Export dans un format standard (JSON, CSV, XML) pendant au minimum 90 jours post-résiliation
- Suppression certifiée des données du serveur après la période de conservation

---

## 5. Points de vigilance transversaux

| Risque | Description | Prévention |
|--------|-------------|-----------|
| Requalification en cession | Licence exclusive perpétuelle sur tous les droits | Limiter durée, prévoir révocabilité |
| Nullité L.131-3 | Droits/domaines/territoire/durée/rémunération non précisés | Checklist 5 conditions avant signature |
| Copyleft non maîtrisé | Intégration de contenus CC BY-SA dans un produit propriétaire | Audit licences entrants avant intégration |
| RGPD non couvert | Données personnelles dans les contenus sans DPA | Identifier dès l'intake, prévoir DPA séparé |
| Irrévocabilité CC | Diffusion prématurée sous CC impossible à annuler | Tester en interne avant diffusion publique |

---

*Sources : CPI L.122-1 à L.122-6-1, L.131-1 à L.131-5. Creative Commons 4.0 International. [à vérifier]*
