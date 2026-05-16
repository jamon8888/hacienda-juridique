---
name: licence-droit-auteur
description: >
  Prépare un projet de contrat de licence d'une œuvre protégée par le droit d'auteur :
  analyse du type de licence adapté (exclusive, non-exclusive, libre, EULA, SaaS),
  vérification des conditions L.131-3, rédaction des clauses critiques.
  Conforme CPI. Brouillon soumis à validation par un avocat.
version: "1.0.0"
authors: ["Hacienda"]
tags: [droit-auteur, licence, creative-commons, open-source, SaaS, EULA, CPI]
---

# Skill — Licence droit d'auteur

> **PRÉPARATION PROJET, PAS SIGNATURE.**
>
> Ce skill produit un **projet de contrat de licence** à soumettre à un avocat spécialisé en propriété intellectuelle avant toute signature. Une licence mal rédigée peut être requalifiée en cession (transfert de titularité non voulu) ou être nulle si les conditions de L.131-3 CPI ne sont pas respectées — même pour une licence non-exclusive.
>
> **La distinction licence / cession est critique :** une licence laisse à l'auteur la titularité des droits et peut être révocable, une cession transfère définitivement la titularité. Choisir le mauvais instrument peut avoir des conséquences patrimoniales irréversibles.
>
> Les sorties de ce skill sont des **brouillons**. Elles ne constituent ni un avis juridique, ni une garantie de validité, ni un instrument signable.

## Examples

<example>
<user>Je veux accorder une licence exclusive à un éditeur pour mon roman pendant 5 ans en France.</user>
<response>Je prépare un projet de licence exclusive droit d'auteur : œuvre, parties, droits accordés (reproduction + représentation + distribution), domaine édition imprimée + numérique, territoire France, durée 5 ans, rémunération proportionnelle L.131-4, clauses droit moral, audit, résiliation. Brouillon à valider par votre avocat.</response>
</example>

<example>
<user>Je diffuse mes photos sous Creative Commons BY-SA 4.0 — qu'est-ce que cela implique exactement ?</user>
<response>Analyse de la licence CC BY-SA 4.0 : droits accordés (reproduction, adaptation, distribution), conditions (attribution obligatoire, partage à l'identique), irrévocabilité une fois la licence accordée, territoires (mondiale), durée (protection légale), compatibilité avec d'autres licences. Points d'attention avant diffusion.</response>
</example>

<example>
<user>Notre SaaS utilise des contenus créés par nos utilisateurs — on veut une licence pour les exploiter.</user>
<response>Je prépare un projet de licence non-exclusive SaaS : périmètre des droits accordés (reproduction serveur, adaptation affichage, communication au public), territoire mondial, durée (abonnement actif + conservation légale), RGPD si données personnelles dans les contenus, CGU-compatible, révocabilité à la résiliation du compte. Brouillon à valider par votre avocat.</response>
</example>

---

## Chargement du profil

> Si un fichier `CLAUDE.md` est présent dans le projet, charger les préférences suivantes :
> - **Stratégie type licence/cession** : licence préférée ou cession préférée, ou cas par cas
> - **Position défaut rémunération** : proportionnelle (L.131-4) ou forfaitaire si exception
> - **Approbateur contrats droit d'auteur**
> - **Politique bases de données** (si la licence porte sur une BDD)
>
> En l'absence de préférences configurées, appliquer les positions légales par défaut (proportionnelle, révision possible, droit moral respecté).

---

## Intake

Collecter les informations suivantes avant de produire le projet :

1. **Œuvre concernée** — titre, nature (texte, image, musique, logiciel, base de données, œuvre audiovisuelle…), référence à une qualification préalable si disponible (`qualification-oeuvre`)
2. **Type de licence souhaité** — exclusive / non-exclusive / libre (Creative Commons) / EULA logiciel / SaaS (CGU + licence contenu utilisateur)
3. **Concédant (licensor)** — auteur personne physique, co-auteurs, personne morale (avec vérification titularité)
4. **Licencié (licensee)** — identité, capacité contractuelle, usage prévu
5. **Périmètre des droits accordés** — droits spécifiques (reproduction, représentation, adaptation, distribution, communication au public, mise à disposition en ligne)
6. **Domaines d'exploitation** — édition, audiovisuel, numérique, SaaS, publicité, formation, open data…
7. **Territoires** — France, UE, monde, pays spécifiques
8. **Durée** — déterminée, durée de l'abonnement, durée de protection légale
9. **Rémunération** — gratuite (Creative Commons, open source), proportionnelle, forfaitaire, redevance d'usage
10. **Sous-licence autorisée ?** — oui / non / sous conditions
11. **RGPD applicable ?** — si la licence porte sur des contenus incluant des données personnelles

> **Mode provisoire :** si certaines informations sont manquantes, signaler les points à compléter et produire un projet avec des champs `[À COMPLÉTER]`.

---

## Étape 1 — Distinction Cession vs Licence

Avant de rédiger, clarifier l'instrument adapté.

| Critère | Cession (L.131-1+) | Licence |
|---------|--------------------|---------|
| Titularité des droits | Transférée définitivement au cessionnaire | Conservée par l'auteur |
| Durée | Peut être permanente | Généralement limitée ; révocable à terme |
| Réversibilité | Non (sauf résiliation pour faute) | Oui, à l'expiration ou résiliation |
| Conditions L.131-3 | Obligatoires | Obligatoires (Cass. 1re civ. 21 nov. 2006) |
| Cas d'usage typique | Édition, production audiovisuelle, acquisition de marque | SaaS, streaming, abonnement, CGU plateforme |

**Tests de requalification à éviter :**
- Une licence exclusive perpétuelle sur tous les droits = risque de requalification en cession
- Absence de droit à résiliation = risque de requalification
- Licence « irrévocable et définitive » sans limite = clause potentiellement nulle ou requalifiée

Si les réponses à l'intake pointent vers une cession, rediriger vers `cession-droit-auteur`.

---

## Étape 2 — Typologie des 5 types de licences

### A. Licence exclusive

**Caractéristiques :** seul le licencié peut exploiter l'œuvre dans le périmètre défini ; l'auteur lui-même ne peut plus exploiter l'œuvre dans ce périmètre pendant la durée.

**Cas d'usage :** partenariat éditorial stratégique, production audiovisuelle (hors L.132-24), distribution exclusive d'un logiciel.

**Clauses spécifiques :** clause de minimum garanti (exploitation effective), clause d'audit renforcée, clause de révision si non-exploitation, durée raisonnable (5-10 ans), territoire limité.

**Risques :** si l'auteur ne peut plus exploiter son œuvre, négocier un minimum garanti ; risque de blocage si le licencié n'exploite pas activement.

---

### B. Licence non-exclusive

**Caractéristiques :** l'auteur peut accorder la même licence à plusieurs licenciés simultanément ; il conserve le droit d'exploiter lui-même l'œuvre.

**Cas d'usage :** photothèque, musique de fond, contenu éditorial syndiqué, formation.

**Clauses spécifiques :** mention attribution, périmètre d'usage précis (support, nombre d'utilisateurs, géographie), durée, prix par usage ou forfait.

**Risques :** concurrence entre licenciés ; surveiller la clause de sous-licence (souvent exclue).

---

### C. Licence libre (Creative Commons)

**Caractéristiques :** licence standardisée mondiale, irrévocable une fois accordée, gratuite, fondée sur la copyleft à degrés variables.

**7 variantes :**

| Licence | Code | Conditions |
|---------|------|-----------|
| Attribution | CC BY | Citer l'auteur |
| Attribution - Partage à l'identique | CC BY-SA | Citer + même licence œuvres dérivées |
| Attribution - Pas de modification | CC BY-ND | Citer + pas d'adaptation |
| Attribution - Pas d'usage commercial | CC BY-NC | Citer + usage non commercial uniquement |
| Attribution - NC - SA | CC BY-NC-SA | Citer + non commercial + même licence |
| Attribution - NC - ND | CC BY-NC-ND | Citer + non commercial + pas d'adaptation |
| Domaine public (renonciation) | CC0 | Aucune condition |

**Irrévocabilité :** une licence CC accordée publiquement ne peut pas être retirée pour les utilisateurs ayant reçu l'œuvre sous cette licence. Importance de choisir soigneusement avant diffusion.

**Recommandations par contexte :**
- Photo éditoriale → CC BY ou CC BY-NC
- Contenu scientifique → CC BY (compatible open access)
- Logiciel → préférer une licence open source dédiée (MIT, GPL — renvoi `logiciels-pi`)
- Musique → CC BY ou CC BY-NC-SA selon politique commerciale

*Référence : `references/typologie-licences-auteur.md`*

---

### D. Licence EULA (logiciel propriétaire)

**Caractéristiques :** licence d'utilisation d'un logiciel (droit d'utilisation L.122-6 CPI), non-exclusive, non-transférable, limitée à l'usage défini.

**Cas d'usage :** logiciel packagé (B2C ou B2B), SaaS monoposte, outil professionnel.

**Clauses spécifiques :** nombre de postes/utilisateurs autorisés, interdiction de rétro-ingénierie (L.122-6-1 sauf interopérabilité), mises à jour incluses/exclues, garantie limitée, responsabilité plafonnée.

**Renvoi :** pour le régime détaillé des logiciels, utiliser `logiciels-pi`.

---

### E. Licence SaaS (CGU + licence contenu utilisateur)

**Caractéristiques :** double niveau — licence d'accès au service (CGU) + licence accordée par l'utilisateur à la plateforme sur ses contenus uploadés.

**Cas d'usage :** plateforme collaborative, réseau social, outil créatif en ligne, marketplace de contenus.

**Clauses spécifiques :**
- Périmètre : reproduction serveur, affichage, indexation, adaptation format
- Durée : pendant l'abonnement actif + délai de conservation légale post-résiliation
- Révocabilité : à la suppression du compte
- Sous-licence : si la plateforme peut redistribuer les contenus à des tiers
- RGPD : si les contenus incluent des données personnelles, prévoir DPA (renvoi plugin RGPD)

*Référence : `references/modeles-clauses-licence.md`*

---

## Étape 3 — Clauses critiques par type

### Durée et reconduction

```
La présente licence est consentie pour une durée de [X ans / durée de l'abonnement]
à compter de la date de signature. Elle [sera / ne sera pas] renouvelée tacitement
par période de [Y mois / ans], sauf dénonciation par l'une des parties par lettre
recommandée avec accusé de réception dans un délai de [Z mois] avant l'échéance.
```

### Périmètre utilisateurs (SaaS / EULA)

```
La présente licence autorise [X utilisateurs nommés / X postes simultanés /
un usage illimité au sein de l'entité signataire]. Toute extension du périmètre
est soumise à un avenant écrit.
```

### Limitation de responsabilité

```
La responsabilité du Concédant au titre de la présente licence est limitée
au montant des redevances effectivement versées par le Licencié au cours
des [12] mois précédant le fait générateur du dommage. Le Concédant n'est
pas responsable des dommages indirects, pertes de données ou manque à gagner.
```

### Garanties

```
Le Concédant garantit être titulaire des droits nécessaires à la concession
de la présente licence et que l'exploitation de l'Œuvre dans les conditions
convenues ne porte pas atteinte aux droits de tiers.
```

### Article RGPD / DPA (si données personnelles dans l'œuvre/contenu)

```
Dans l'hypothèse où l'exploitation de l'Œuvre implique le traitement de données
à caractère personnel, les parties concluront un Accord de traitement des données
(DPA) conforme à l'article 28 du Règlement (UE) 2016/679 (RGPD) préalablement
à tout traitement.
```

### Résiliation et sort des données

```
En cas de résiliation, le Licencié cessera toute exploitation de l'Œuvre
dans un délai de [30] jours. Pour les licences SaaS, le Concédant s'engage
à restituer les données du Licencié dans un format standard pendant [90] jours
suivant la résiliation, puis à les supprimer.
```

---

## Étape 4 — Cas particuliers

### Creative Commons — Points d'attention avant diffusion

1. **Irrévocabilité :** une fois accordée publiquement, la licence ne peut être retirée aux utilisateurs qui ont reçu l'œuvre sous cette licence
2. **Compatibilité SA :** CC BY-SA est compatible avec GNU GPL v3 (mais pas GPL v2) ; vérifier avant de mixer des œuvres
3. **Usage commercial :** les variantes NC interdisent toute exploitation commerciale y compris les modèles freemium
4. **Marquage obligatoire :** mentionner le nom de l'auteur, le titre, l'URL de la licence CC, et signaler les modifications

### Open source logiciel

Les licences open source (MIT, Apache 2.0, GPL, LGPL, AGPL…) relèvent du régime spécifique des logiciels CPI L.122-6. Renvoi vers `logiciels-pi` pour l'analyse de compatibilité et les obligations copyleft.

### SaaS B2B — CGU + DPA + SLA

Un déploiement SaaS B2B combine généralement :
- CGU / Conditions générales de service (accès, usage, responsabilité)
- DPA (Data Processing Agreement) si données personnelles — art. 28 RGPD
- SLA (Service Level Agreement) : disponibilité, support, pénalités
- Licence contenu utilisateur si applicable

Ne pas confondre ces instruments ; le DPA est obligatoire dès lors que des données personnelles des clients sont traitées.

---

## Format de sortie

Produire un projet de licence structuré en Markdown, dans un bloc de code quadruple fence :

````markdown
# CONTRAT DE LICENCE — [TYPE] — [NOM ŒUVRE]

*Projet — Brouillon soumis à validation par un avocat. Non signable en l'état.*

**Entre :**
- **Concédant :** [Nom / Dénomination sociale, adresse, SIRET si PM]
- **Licencié :** [Nom / Dénomination sociale, adresse, SIRET si PM]

**Date de signature envisagée :** [À COMPLÉTER]

---

## Article 1 — Objet

La présente licence a pour objet de définir les conditions dans lesquelles
le Concédant accorde au Licencié le droit d'exploiter l'Œuvre suivante :
[Description de l'œuvre, référence qualification si disponible].

## Article 2 — Droits accordés (L.131-3.a)

Le Concédant accorde au Licencié, à titre [exclusif / non-exclusif], les droits suivants :
- Droit de reproduction (L.122-3) : [préciser]
- Droit de représentation (L.122-2) : [préciser]
- Droit d'adaptation (L.122-4) : [préciser]
- Droit de distribution (L.122-1) : [préciser]
- [Autres droits spécifiques]

## Article 3 — Domaines d'exploitation (L.131-3.b)

La présente licence est consentie pour les domaines suivants : [liste].

## Article 4 — Territoires (L.131-3.c)

La présente licence est consentie pour le territoire suivant : [territoire].

## Article 5 — Durée (L.131-3.d)

[Durée déterminée + reconduction / durée abonnement / durée protection légale]

## Article 6 — Rémunération (L.131-3.e + L.131-4)

[Gratuite (CC) / Proportionnelle : taux + assiette / Forfaitaire : montant + justification exception]

## Article 7 — Droit moral (L.121-1)

Le Licencié s'engage à mentionner le nom du Concédant sur tout support
d'exploitation. Le Licencié s'engage à ne pas modifier l'Œuvre sans
accord préalable écrit du Concédant.

## Article 8 — Sous-licence

[Autorisée / Interdite / Autorisée sous conditions]

## Article 9 — Garanties

[Clause garantie éviction]

## Article 10 — Limitation de responsabilité

[Clause plafonnée]

## Article 11 — RGPD (si applicable)

[Clause DPA ou renvoi à DPA séparé]

## Article 12 — Résiliation

[Conditions, préavis, sort des données]

## Article 13 — Droit applicable et juridiction

Le présent contrat est soumis au droit français. Tout litige sera soumis
à la compétence exclusive du Tribunal judiciaire de Paris.

## Article 14 — Dispositions diverses

[Intégralité, nullité partielle, modification par avenant, notifications]

---

*Ce projet de licence a été préparé par Hacienda à titre de support de travail.
Il doit être relu et validé par un avocat spécialisé avant toute signature.*
````

---

## Gate non-juriste

Avant de transmettre le projet à l'avocat, vérifier :

- [ ] Type de licence choisi correspond aux besoins (exclusive vs non-exclusive vs libre vs SaaS)
- [ ] Distinction licence / cession clarifiée et validée
- [ ] Les 5 conditions L.131-3 sont toutes présentes dans le projet
- [ ] Droit moral respecté (mention auteur, pas de renonciation)
- [ ] Rémunération conforme au principe de L.131-4
- [ ] RGPD : DPA prévu si données personnelles impliquées
- [ ] Durée et reconduction claires
- [ ] Juridiction et droit applicable mentionnés

**Brief avocat recommandé :** transmettre ce projet avec :
1. La description de l'œuvre et son contexte d'exploitation
2. Le type de licence choisi et la justification (vs cession)
3. Les questions ouvertes (sous-licence, périmètre exact, RGPD)
4. Les contraintes business (durée souhaitée, territoire, budget)

---

## Emplacement des sorties

```
outputs/licence-auteur-<oeuvre-slug>-YYYY-MM-DD.md
```

---

## Ce skill ne fait pas

- Signer ou valider juridiquement le contrat de licence
- Remplacer l'avis d'un avocat spécialisé en propriété intellectuelle
- Traiter une cession de droits → utiliser `cession-droit-auteur`
- Gérer les licences logicielles open source → utiliser `logiciels-pi`
- Rédiger un DPA / accord RGPD complet → utiliser le plugin données personnelles
- Analyser la protection d'une base de données → utiliser `bases-de-donnees`
- Évaluer la valeur économique des droits ou négocier les taux

---

## Ton

Juridique, précis, équilibré. Mettre en évidence les risques de requalification et les conditions L.131-3 sans dramatiser. Toujours rappeler que le projet est un brouillon soumis à validation humaine.
