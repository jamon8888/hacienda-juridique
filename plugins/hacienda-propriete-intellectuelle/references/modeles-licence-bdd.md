# Modèles de licences — Bases de données

> Référence interne plugin `hacienda-propriete-intellectuelle`. Brouillon soumis à validation humaine. Adapter au contexte avant tout usage contractuel.

---

## 1. Licence BDD propriétaire — B2B commerciale

### Structure type

```markdown
# CONTRAT DE LICENCE — BASE DE DONNÉES [NOM]

*Projet — Brouillon soumis à validation avocat. Non signable en l'état.*

**Concédant :** [Dénomination, adresse, SIRET]
**Licencié :** [Dénomination, adresse, SIRET]

## Article 1 — Objet

Le Concédant concède au Licencié, à titre non-exclusif et non-transférable,
le droit d'accéder et d'utiliser la base de données [NOM] (ci-après « la Base »),
dans les conditions définies aux présentes.

## Article 2 — Droits accordés

Le Licencié est autorisé à :
- Accéder à la Base via [API / interface web / export fichier]
- Extraire les données nécessaires à [usage interne / intégration produit / analyse]
- [Autres droits spécifiques]

Le Licencié ne peut pas :
- Redistribuer tout ou partie de la Base à des tiers
- Utiliser la Base pour entraîner des modèles d'intelligence artificielle
- Réaliser des extractions massives au-delà des limites définies à l'Article 4

## Article 3 — Périmètre utilisateurs

[X utilisateurs nommés / X accès simultanés / périmètre entité]

## Article 4 — Limites d'usage (rate limiting)

Le Licencié s'engage à respecter les limites techniques suivantes :
- Requêtes API : [X] appels/heure, [Y] appels/jour
- Volume d'extraction : [Z] enregistrements/mois maximum
- Fréquence de synchronisation : [quotidienne / hebdomadaire]

## Article 5 — Durée

[Durée déterminée / abonnement annuel renouvelable]

## Article 6 — Rémunération

[Redevance annuelle / mensuelle / à l'usage — montant + modalités de paiement]

## Article 7 — Attribution et mention source

Le Licencié s'engage à mentionner : « Source : [NOM BASE], [NOM PRODUCTEUR],
[ANNÉE] » sur tout document ou interface utilisant les données de la Base.

## Article 8 — Protection des données (RGPD)

Si la Base contient des données à caractère personnel, un Accord de traitement
des données (DPA) conforme à l'article 28 RGPD sera annexé aux présentes
et en fera partie intégrante.

## Article 9 — Confidentialité

Le Licencié s'engage à traiter la Base comme information confidentielle
et à ne pas la divulguer à des tiers non autorisés.

## Article 10 — Résiliation

[Résiliation pour faute, préavis, sort des données à l'expiration]

## Article 11 — Limitation de responsabilité

[Plafond : montant des redevances des 12 derniers mois]

## Article 12 — Droit applicable et juridiction

Droit français. Tribunal judiciaire de [Paris / compétent].
```

---

## 2. Licence Ouverte Etalab 2.0

### Présentation

Licence officielle française pour la réutilisation des données publiques. Compatible avec la Loi pour une République numérique (2016) et le décret 2017-331 sur la politique de la donnée.

**URL canonique :** https://www.etalab.gouv.fr/licence-ouverte-open-licence

### Droits accordés

Le réutilisateur est autorisé à :
- Reproduire, copier, publier et transmettre les informations
- Diffuser et redistribuer les informations
- Adapter, modifier, extraire et transformer à partir des informations (y compris pour créer de nouvelles bases de données)
- Exploiter les informations à titre commercial (y compris les produits ou services à valeur ajoutée)

### Obligations du réutilisateur

```
Mention obligatoire à apposer sur toute réutilisation :

« Ces données sont issues de [NOM DE LA SOURCE] — [NOM DU PRODUCTEUR] —
mises à disposition sous Licence Ouverte v2.0
https://www.etalab.gouv.fr/licence-ouverte-open-licence
Date des données : [DATE] »
```

### Compatibilité

Compatible avec : CC BY 4.0, Open Government Licence v3.0 (UK), CC BY IGO 3.0 (organisations internationales).

---

## 3. ODbL — Open Database License

### Présentation

Licence copyleft pour bases de données open data. Choisir ODbL si l'on veut que toute base dérivée reste également ouverte (partage à l'identique).

**URL canonique :** https://opendatacommons.org/licenses/odbl/1-0/

### Droits accordés

- Utilisation libre de la base, y compris commerciale
- Redistribution de la base ou d'extraits
- Création de bases dérivées

### Obligations du réutilisateur

1. **Attribution :** mentionner le nom du producteur et la licence ODbL
2. **Partage à l'identique (Share-Alike) :** toute base de données dérivée doit être publiée sous ODbL
3. **Accès ouvert :** si une base dérivée est distribuée, la rendre accessible sous ODbL

### Mention obligatoire

```
Cette base de données est mise à disposition sous licence ODbL 1.0.
Source : [NOM DE LA BASE] — [PRODUCTEUR] — [ANNÉE]
https://opendatacommons.org/licenses/odbl/1-0/
```

### Distinction ODbL vs LO Etalab

| Critère | LO Etalab 2.0 | ODbL |
|---------|--------------|------|
| Copyleft | Non | Oui (bases dérivées) |
| Usage commercial | Oui | Oui |
| Attribution | Obligatoire | Obligatoire |
| Modification | Libre | Libre mais sous ODbL |
| Recommandé pour | Open data public FR | Données communautaires |

---

## 4. CGU API publique

### Clauses essentielles

```markdown
# CONDITIONS D'UTILISATION — API [NOM]

## 1. Accès et authentification

L'accès à l'API est conditionné à l'obtention d'une clé API nominative.
La clé API est personnelle et non-transférable.

## 2. Limites d'usage (rate limiting)

- [X] requêtes par minute
- [Y] requêtes par jour
- [Z] Mo de données par mois

Le dépassement de ces limites entraîne la suspension temporaire de l'accès.

## 3. Usages autorisés

- Intégration dans des applications tierces
- Affichage et visualisation des données
- Agrégation à des fins d'analyse non commerciale [ou commerciale selon politique]

## 4. Usages interdits

- Revente directe des données brutes de l'API
- Utilisation pour entraîner des modèles d'IA sans accord écrit préalable
- Extraction massive (scraping) au-delà des limites définies
- Mise en cache de plus de [24h / 7 jours] sans accord

## 5. Attribution obligatoire

Toute utilisation des données doit mentionner :
« Source : [NOM] — [URL] — Données mises à jour le [DATE] »

## 6. Disponibilité

Le service est fourni sans garantie de disponibilité continue.
SLA : [99,X %] sur les 30 derniers jours glissants.

## 7. Modification des conditions

[NOM] se réserve le droit de modifier les présentes conditions avec un préavis
de [30] jours notifié par email ou via la documentation de l'API.
```

---

## 5. Contrat de scraping autorisé B2B

### Quand l'utiliser

Lorsqu'un partenaire commercial souhaite accéder régulièrement et automatiquement aux données d'une base, de manière plus intensive qu'une API publique standard, dans le cadre d'un accord formel.

### Clauses spécifiques

```markdown
# CONTRAT D'ACCÈS AUTOMATISÉ AUX DONNÉES — [NOM BASE]

## Article 1 — Objet

Le Producteur autorise le Partenaire à accéder automatiquement aux données
publiquement accessibles de la Base [NOM] par des moyens techniques automatisés
(ci-après « Accès automatisé »), dans les strictes conditions définies aux présentes.

## Article 2 — Fréquence et volume autorisés

- Fréquence maximale de crawl : [1 fois par heure / jour / semaine]
- Volume maximal par session : [X] enregistrements
- Intervalle minimal entre requêtes : [Y] secondes
- User-Agent obligatoire : [IDENTIFICATION DU BOT DU PARTENAIRE]

## Article 3 — Données autorisées

L'Accès automatisé est limité aux données suivantes : [liste précise].
Toute collecte de données hors périmètre est interdite.

## Article 4 — Interdictions

- Redistribution des données collectées à des tiers sans accord écrit
- Utilisation pour entraîner des modèles d'IA sans avenant spécifique
- Contournement des mesures techniques de protection (CAPTCHA, rate limit, robots.txt)
- Collecte de données à caractère personnel non incluses dans le périmètre autorisé

## Article 5 — Attribution

Toute utilisation des données issues de l'Accès automatisé doit mentionner :
« Source : [NOM BASE], [PRODUCTEUR], [DATE EXTRACTION] »

## Article 6 — Durée et résiliation

[Durée + résiliation immédiate pour violation des conditions techniques]

## Article 7 — Responsabilité

Le Partenaire est seul responsable de l'utilisation des données collectées
et de la conformité de ses traitements avec la réglementation applicable,
notamment le RGPD si les données collectées incluent des données personnelles.
```

---

## 6. Marquage des licences — Mentions obligatoires

| Licence | Mention minimale | URL canonique |
|---------|-----------------|--------------|
| LO Etalab 2.0 | « Source : [NOM] sous Licence Ouverte v2.0 » | https://www.etalab.gouv.fr/licence-ouverte-open-licence |
| ODbL 1.0 | « [NOM] sous ODbL 1.0 » | https://opendatacommons.org/licenses/odbl/1-0/ |
| CC0 | « [NOM] — Domaine public / CC0 » | https://creativecommons.org/publicdomain/zero/1.0/ |
| Propriétaire | « © [ANNÉE] [PRODUCTEUR] — Tous droits réservés » | N/A |
| API publique | Selon CGU, mention source obligatoire | URL documentation API |

---

*Sources : CPI L.341-1 à L.343-7. Directive 96/9/CE. Licence Ouverte Etalab 2.0. ODbL 1.0 (Open Data Commons). RGPD art. 28. [à vérifier]*
