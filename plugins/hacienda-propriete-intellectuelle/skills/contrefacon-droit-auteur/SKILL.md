---
name: contrefacon-droit-auteur
description: >
  Analyse un cas de contrefaçon de droit d'auteur : qualification de l'atteinte
  (reproduction, représentation, adaptation illicites), tableau comparatif
  œuvre originale vs œuvre contrefaisante, préparation du paquet d'entrée vers `mise-en-demeure-pi`,
  stratégie contentieuse (TJ Paris, saisie-contrefaçon, préjudice).
  Conforme CPI L.122-4, L.335-2 et suivants. Brouillon soumis à validation par un avocat.
version: "1.0.0"
authors: ["Hacienda"]
tags: [droit-auteur, contrefacon, enforcement, mise-en-demeure, CPI, L335, prejudice]
---

# Skill — Contrefaçon droit d'auteur

> **ANALYSE ET PRÉPARATION STRATÉGIQUE, PAS ACTION JUDICIAIRE.**
>
> Ce skill produit une **analyse de contrefaçon** et prépare les éléments nécessaires à l'action (tableau comparatif, paquet de faits pour l'enforcement, stratégie contentieuse). Il ne remplace ni la saisie d'un avocat, ni l'appréciation judiciaire de la contrefaçon.
>
> **Contrefaçon = atteinte aux droits patrimoniaux ou moraux de l'auteur.** L'article L.335-2 CPI prévoit jusqu'à 3 ans d'emprisonnement et 300 000 € d'amende. L'action civile (L.331-1-3) permet la réparation intégrale du préjudice.
>
> Les sorties sont des **brouillons**. Elles ne constituent ni un avis juridique, ni une garantie de condamnation, ni un instrument utilisable sans validation avocat.

## Examples

<example>
<user>Un site reprend intégralement mes photographies sans autorisation ni crédit. Je veux agir.</user>
<response>Analyse contrefaçon par reproduction illicite (L.122-3) + atteinte au droit moral de paternité (L.121-1). Tableau comparatif établi (identité visuelle, métadonnées EXIF si disponibles). Préparation du paquet d'entrée pour `mise-en-demeure-pi`. Stratégie : notification hébergeur (LCEN art. 6-I-5) en parallèle + référé cessation TJ Paris si non-conformité. Évaluation préjudice : barème photographe + préjudice moral.</response>
</example>

<example>
<user>Notre concurrent a copié la structure et 60% du contenu de notre base de données clients.</user>
<response>Double fondement : contrefaçon droit auteur sur la structure originale (L.122-4 si originalité démontrée) + extraction illicite sui generis (L.342-1). Tableau comparatif structure + contenu. Préparation du paquet d'entrée pour `mise-en-demeure-pi` si une lettre ou une réponse structurée est retenue sur ce double fondement. Stratégie : saisie-contrefaçon (L.332-1) pour préserver la preuve, puis action au fond TJ Paris. Renvoi `bases-de-donnees` pour qualification détaillée du régime de protection.</response>
</example>

<example>
<user>Un artiste a repris mon personnage de bande dessinée dans ses illustrations vendues en ligne.</user>
<response>Analyse contrefaçon par adaptation illicite (L.122-4) : personnage protégeable si caractéristiques originales identifiables. Tableau comparatif traits distinctifs (graphisme, attributs, nom). Préparation du paquet d'entrée pour `mise-en-demeure-pi`, puis notification plateforme de vente si la stratégie le retient. Stratégie : preuve par constat d'huissier, assignation en contrefaçon TJ Paris, demande interdiction + dommages-intérêts + publication judiciaire.</response>
</example>

---

## Chargement du profil

> Charger les préférences depuis le profil utilisateur :
> - **Posture enforcement** : agressive / mesurée / conservatrice
> - **Approbateur mise en demeure PI**
> - **Approbateur assignation**
> - **Posture conseil** : préventif / réactif / contentieux
>
> En l'absence de préférences, appliquer la posture mesurée par défaut (contact informel d'abord, escalade si absence de réponse ou impact commercial réel).

---

## Intake

Collecter avant analyse :

1. **Œuvre originale** — titre, nature (texte, photo, musique, logiciel, base de données, personnage, design…), date de création, preuve de paternité (dépôt, publication datée, enveloppe Soleau, constat huissier)
2. **Auteur / titulaire des droits** — personne physique, cession antérieure ?, qualité pour agir
3. **Œuvre contrefaisante** — description, URL ou support, date de découverte, auteur/éditeur identifié ?
4. **Type d'atteinte constatée** — reproduction (copie servile), représentation (communication non autorisée), adaptation (œuvre dérivée non autorisée), atteinte au droit moral (non-mention auteur, dénaturation)
5. **Preuves disponibles** — captures écran datées, constat huissier, comparaison fichiers, métadonnées, témoignages
6. **Impact** — commercial (perte CA, concurrence déloyale), moral (atteinte réputation, dénaturation), volume (nombre de copies, audience)
7. **Contexte** — première atteinte / récidive, relation avec le contrefacteur (client, concurrent, inconnu), tentatives de résolution antérieures

> **Mode provisoire :** si des preuves manquent (pas de constat huissier, pas de preuve de date de création), signaler les faiblesses du dossier et recommander les actes préparatoires.

---

## Étape 1 — Qualification de l'originalité de l'œuvre

Avant toute action en contrefaçon, vérifier que l'œuvre est protégeable :

**Critère :** l'œuvre doit être **originale** — porter l'empreinte de la personnalité de son auteur (Cass. ass. plén. 7 mars 1986, Pachot ; CJUE Infopaq C-5/08).

| Question | Si oui | Si non |
|----------|--------|--------|
| L'œuvre reflète-t-elle des choix créatifs libres et arbitraires de l'auteur ? | Originalité probable | Risque de rejet |
| L'œuvre se distingue-t-elle du banal, de l'évidence technique, des contraintes fonctionnelles ? | Originalité probable | Fonctionnel = non protégeable (sauf logiciel L.122-6) |
| L'auteur peut-il documenter son processus créatif (croquis, versions, choix esthétiques) ? | Preuve renforcée | Faiblesse probatoire |

**Si l'originalité est douteuse :** signaler le risque, recommander de documenter les choix créatifs avant d'agir, et évaluer les fondements alternatifs (parasitisme, concurrence déloyale — hors CPI).

Renvoi vers `qualification-oeuvre` pour une analyse détaillée si nécessaire.

---

## Étape 2 — Qualification de l'atteinte (types de contrefaçon)

### A. Reproduction illicite (L.122-3)

**Définition :** fixation matérielle de l'œuvre par tout procédé permettant de la communiquer au public de manière indirecte. Inclut : copie intégrale, copie partielle substantielle, téléchargement, impression, stockage serveur.

**Critère :** la partie reproduite est-elle protégeable (originale en elle-même) ?

**Cas fréquents :** photocopie, copier-coller web, republication sans autorisation, contrefaçon numérique (streaming, téléchargement).

---

### B. Représentation illicite (L.122-2)

**Définition :** communication de l'œuvre au public par un procédé quelconque. Inclut : diffusion en ligne, projection, exécution publique, mise à disposition sur plateforme.

**Critère :** la communication est-elle faite sans autorisation du titulaire à un public qui ne fait pas partie du cercle de famille ?

**Cas fréquents :** streaming non autorisé, projection publique sans licence, mise en ligne sur réseau social/site web, communication par hyperlien (CJUE Svensson C-466/12 : lien vers contenu licitement en ligne ≠ contrefaçon ; mais lien vers contenu illicite = oui, GS Media C-160/15).

---

### C. Adaptation illicite (L.122-4)

**Définition :** transformation, traduction, arrangement ou toute autre modification de l'œuvre sans autorisation.

**Critère :** l'œuvre seconde reprend-elle les éléments originaux caractéristiques de l'œuvre première ?

**Cas fréquents :** adaptation audiovisuelle non autorisée, traduction, remix musical, reprise de personnage, œuvre dérivée (fan fiction publiée commercialement), compilation non autorisée.

**Distinction avec l'inspiration légitime :** reprendre un **style**, un **genre** ou une **idée** n'est pas une contrefaçon (les idées sont de libre parcours). Seule la reprise de la **forme originale** est illicite.

---

### D. Atteinte au droit moral (L.121-1 à L.121-4)

| Composante | Atteinte | Exemple |
|------------|---------|---------|
| Droit de paternité (L.121-1) | Non-mention du nom de l'auteur | Photo republiée sans crédit |
| Droit au respect de l'intégrité (L.121-1) | Dénaturation, modification sans accord | Recadrage déformant, colorisation non autorisée |
| Droit de divulgation (L.121-2) | Publication d'une œuvre inédite sans accord | Diffusion de brouillons volés |
| Droit de retrait (L.121-4) | — | Exercé par l'auteur uniquement |

**Le droit moral est perpétuel, inaliénable et imprescriptible.** L'atteinte au droit moral peut fonder une action indépendamment de toute atteinte patrimoniale.

---

## Étape 3 — Tableau comparatif (cœur de la preuve)

Produire un tableau de confrontation entre l'œuvre originale et l'œuvre contrefaisante :

```markdown
## Tableau comparatif — Contrefaçon

| Élément | Œuvre originale | Œuvre contrefaisante | Analyse |
|---------|----------------|---------------------|---------|
| [Élément 1 — ex. composition photo] | [Description] | [Description] | Identique / Similaire / Différent |
| [Élément 2 — ex. texte paragraphe X] | [Citation] | [Citation] | Reproduction intégrale / partielle |
| [Élément 3 — ex. trait personnage] | [Description] | [Description] | Reprise caractéristique originale |
| ... | | | |

**Conclusion :** [X] éléments originaux reproduits/repris sur [Y] éléments analysés.
Atteinte qualifiée : [reproduction / représentation / adaptation / droit moral].
```

**Règles du tableau :**
- Seuls les éléments **originaux** de l'œuvre première sont pertinents (pas les éléments banals ou fonctionnels)
- Quantifier : nombre d'éléments repris / total, pourcentage de contenu copié si textuel
- Distinguer identité (copie servile) de similarité (adaptation)
- Signaler les éléments ajoutés par le contrefacteur (ne compensent pas la contrefaçon mais affectent l'évaluation du préjudice)

---

## Étape 4 — Constitution du dossier de preuves

### Preuves recommandées (avant toute action)

| Preuve | Mode d'obtention | Force probante |
|--------|-----------------|---------------|
| Constat d'huissier (web/physique) | Huissier de justice — constat internet ou sur site | Très forte — date certaine, opposable |
| Capture écran datée + URL + timestamp | Capture manuelle ou outil automatisé | Moyenne — contestable si non certifiée |
| Métadonnées fichier (EXIF, PDF metadata) | Extraction technique | Variable — falsifiable |
| Preuve de création antérieure (enveloppe Soleau, dépôt INPI, publication datée) | Dépôt préalable | Forte — prouve l'antériorité |
| Témoignage / attestation art. 202 CPC | Témoins directs | Complémentaire |
| Historique de versioning (Git, Google Drive, etc.) | Export technique | Complémentaire |

### Saisie-contrefaçon (L.332-1 CPI)

Procédure d'urgence permettant de faire constater par huissier (sur ordonnance du président du TJ) la réalité de la contrefaçon et de saisir des exemplaires ou documents.

**Conditions :**
- Requête au président du TJ (ex parte)
- Désigner les lieux, les objets recherchés
- Huissier mandaté procède à la saisie
- Le demandeur doit assigner dans les **20 jours ouvrables** suivant la saisie (L.332-3) sous peine de nullité

---

## Étape 5 — Orientation vers la lettre ou la réponse

Si une prise de contact formelle, une réponse à grief ou une escalade écrite est
retenue, préparer le paquet d'entrée et router vers `mise-en-demeure-pi`.

Transmettre au minimum :

- `mode` ;
- `droits invoques` ;
- `faits resumes` ;
- `pieces disponibles` ;
- `objectif de ton` ;
- `niveau d'escalade` ;
- et, pour `draft` / `escalate` si pertinent : `cible exploitable`, `points faibles connus`, `demande principale`, `contrainte calendrier`.

### Notification hébergeur (LCEN art. 6-I-5)

En parallèle de la lettre adressée au contrefacteur, notifier l'hébergeur (si contenu en ligne) :
- Identification du notifiant
- Description des faits litigieux et localisation (URL)
- Fondement juridique (CPI L.122-3/4 + LCEN art. 6-I-5)
- Copie de la lettre adressée au contrefacteur

L'hébergeur doit agir « promptement » pour retirer le contenu ou en rendre l'accès impossible.

---

## Étape 6 — Stratégie contentieuse

### Juridictions compétentes

| Juridiction | Compétence | Délai |
|-------------|-----------|-------|
| TJ Paris (3e ch. PI) | Compétence concurrente pour le droit d'auteur | Fond : 12-24 mois |
| TJ du domicile du défendeur | Compétence alternative | Variable |
| Référé (président du TJ) | Cessation urgente en cas d'atteinte manifestement illicite | Semaines |
| Tribunal de commerce | Concurrence déloyale / parasitisme (fondements complémentaires) | Variable |

### Options d'action

| Option | Quand | Avantage | Coût estimé |
|--------|-------|----------|-------------|
| Mise en demeure seule | Premier contact, contrefacteur de bonne foi | Rapide, économique | < 2 000 € |
| Référé cessation | Urgence, atteinte manifestement illicite | Rapide (semaines) | 5-15 000 € |
| Saisie-contrefaçon + action au fond | Preuve à préserver, préjudice significatif | Preuve solide | 15-50 000 € |
| Médiation / transaction | Relation commerciale à préserver | Confidentiel, rapide | Variable |

### Évaluation du préjudice (L.331-1-3)

Le tribunal peut évaluer le préjudice selon trois méthodes (cumul possible) :

**Méthode 1 — Conséquences économiques négatives (L.331-1-3 al.1) :**
- Manque à gagner (redevances non perçues)
- Bénéfices réalisés par le contrefacteur
- Préjudice moral (systématiquement accordé en droit d'auteur)

**Méthode 2 — Somme forfaitaire (L.331-1-3 al.3) :**
- Au minimum le montant des redevances qui auraient été dues si le contrefacteur avait demandé l'autorisation

**Méthode 3 — Bénéfices du contrefacteur (L.331-1-3 al.2) :**
- Intégralité des bénéfices réalisés grâce à la contrefaçon

**Barèmes de référence (indicatifs) :**
- Photographie : barèmes UPP (Union des Photographes Professionnels) + coefficient de contrefaçon (x2 à x5)
- Texte : redevance au mot/feuillet + coefficient
- Musique : barèmes SACEM + préjudice moral
- Logiciel : coût de la licence × nombre d'utilisateurs illicites

---

## Étape 7 — Cas particuliers

### Contrefaçon en ligne (internet)

- Double action possible : contrefacteur + hébergeur (LCEN)
- Preuve par constat d'huissier internet recommandée (force probante supérieure aux captures d'écran)
- Jurisprudence CJUE liens hypertextes : lien vers contenu illicite = contrefaçon si le lieur savait ou devait savoir (GS Media C-160/15)

### Contrefaçon de logiciel

- Régime spécifique L.122-6 : reproduction non autorisée du code (source ou objet)
- Exception décompilation pour interopérabilité (L.122-6-1 II)
- Comparaison code source si disponible ; sinon analyse fonctionnelle + structure
- Renvoi `logiciels-pi` pour la qualification du régime

### Contrefaçon d'œuvre audiovisuelle

- Streaming illicite = représentation non autorisée (L.122-2)
- Téléchargement = reproduction (L.122-3)
- Titulaire = producteur (présomption L.132-24) sauf droit moral des auteurs
- Action pénale possible via ARCOM (Autorité de régulation de la communication audiovisuelle)

### Plagiat (œuvre littéraire ou scientifique)

- Le plagiat n'est pas une catégorie juridique autonome — c'est une contrefaçon par reproduction ou adaptation
- Analyser : reprise des éléments originaux de la forme (pas des idées, méthodes, informations)
- Outils : comparaison textuelle (% similitude), structure du plan, formulations caractéristiques

### Contrefaçon partielle

- La contrefaçon peut porter sur une partie seulement de l'œuvre, à condition que cette partie soit elle-même originale
- Cass. 1re civ. 4 fév. 1992 : la reprise d'éléments même fragmentaires peut constituer une contrefaçon si ces éléments sont originaux

---

## Format de sortie

Produire une analyse structurée en Markdown :

````markdown
# Analyse contrefaçon — [NOM ŒUVRE] vs [SOURCE ATTEINTE]

*Brouillon soumis à validation par un avocat. Non utilisable comme pièce judiciaire en l'état.*

## 1. Qualification de l'œuvre originale

- Nature : [type]
- Originalité : [analyse — éléments de choix créatif identifiés]
- Titulaire : [nom + qualité pour agir]
- Preuve d'antériorité : [type de preuve + date]

## 2. Atteinte constatée

- Type : [reproduction / représentation / adaptation / droit moral]
- Support : [URL / physique / autre]
- Date de découverte : [date]
- Contrefacteur identifié : [oui/non + identité si connue]

## 3. Tableau comparatif

[Tableau détaillé éléments originaux vs éléments repris]

## 4. Forces et faiblesses du dossier

| Forces | Faiblesses |
|--------|-----------|
| [point fort 1] | [point faible 1] |
| [point fort 2] | [point faible 2] |

## 5. Stratégie recommandée

[Option retenue + justification + étapes + calendrier]

## 6. Évaluation préjudice (indicative)

[Méthode retenue + estimation fourchette]

## 7. Prochaines étapes

1. [Action immédiate]
2. [Action à court terme]
3. [Action si échec]
````

---

## Gate non-juriste

Avant de transmettre l'analyse à l'avocat :

- [ ] Originalité de l'œuvre vérifiée (pas d'action sur une œuvre non protégeable)
- [ ] Type d'atteinte qualifié précisément (reproduction / représentation / adaptation / moral)
- [ ] Tableau comparatif établi avec éléments originaux identifiés
- [ ] Preuves disponibles listées et lacunes signalées
- [ ] Qualité pour agir vérifiée (auteur / cessionnaire / licencié exclusif)
- [ ] Prescription vérifiée (5 ans — art. 2224 Code civil)
- [ ] Stratégie proportionnée au préjudice et au contexte

**Brief avocat :** transmettre avec :
1. L'analyse complète ci-dessus
2. Les preuves collectées (constat, captures, antériorité)
3. Le contexte relationnel avec le contrefacteur
4. Le budget et la disponibilité pour une action judiciaire

---

## Emplacement des sorties

```
outputs/contrefacon-auteur-<oeuvre-slug>-YYYY-MM-DD.md
```

---

## Ce skill ne fait pas

- Engager une action judiciaire ou signer une assignation
- Remplacer l'avis d'un avocat spécialisé en PI
- Produire ou envoyer la lettre de mise en demeure ou la réponse structurée elle-même → router vers `mise-en-demeure-pi` avec le paquet d'entrée adapté
- Réaliser un constat d'huissier (acte officiel)
- Évaluer le montant exact du préjudice (appréciation judiciaire)
- Traiter l'intake et la qualification d'un dossier de contrefaçon de marques → utiliser `tri-contrefacon`
- Traiter la contrefaçon de brevets → utiliser `tableau-contrefacon-brevet`
- Traiter le contentieux en cours (audience, conclusions) → utiliser le plugin contentieux
- Gérer les plateformes de signalement (ARCOM, YouTube Content ID) — hors scope V4.2

---

## Ton

Factuel, rigoureux, stratégique. Distinguer clairement les éléments de preuve solides des faiblesses du dossier. Rester objectif — une analyse de contrefaçon doit aussi anticiper les moyens de défense adverses (libre parcours des idées, exception de courte citation L.122-5, parodie L.122-5 4°). Toujours rappeler que l'analyse est un brouillon soumis à validation humaine.
