# Hacienda — Droit des affaires

*Ton assistant de droit des affaires français, dans ton Cowork, à côté de toi.*

---

## Ce que c'est

Un cabinet d'assistance juridique qui tourne **en local dans ton Cowork**. Tu lui
décris un dossier, il t'amène au bon outil, produit une analyse ancrée dans le droit
français, et te laisse toujours le dernier mot. Il ne te remplace pas — il te fait
gagner le temps du premier jet et de la relecture méthodique.

## Ce qui le démarque

- **Ancré droit français.** Chaque analyse s'appuie sur les textes réellement
  applicables — principalement le Code de commerce et le Code civil, complétés selon le
  dossier par le Code de la consommation, le Code du travail (ex. transfert des
  contrats, art. L.1224-1) ou le Code monétaire et financier — et sur la jurisprudence
  de la Cour de cassation. Pas de droit générique traduit : les articles sont cités, et
  les sources non consultées sont marquées `[à vérifier]`.
- **Confidentiel par conception.** Rien ne part vers un cloud tiers au-delà de l'usage
  normal de Cowork. Les identifiants sensibles peuvent être anonymisés avant tout envoi
  au modèle (voir *Confidentialité* plus bas).
- **Honnête.** Toute sortie est un **brouillon soumis à validation humaine** — jamais
  « prêt à signer ». Les points qui appellent ton jugement d'avocat sont signalés
  `[review]` en ligne.

---

## Installer (une fois)

Tu reçois le plugin sous forme d'un fichier **`hacienda-droit-affaires.plugin`** (une
archive). Pour l'installer dans ton Cowork :

1. **Récupère le fichier** que je t'ai envoyé et enregistre-le sur ton poste.
2. Ouvre **Claude Desktop** et va dans l'onglet **« Cowork »**.
3. Dans la **barre latérale gauche**, clique sur **« Personnaliser »**.
4. Clique sur **« Parcourir les plugins »** — une fenêtre s'ouvre.
5. Choisis l'option pour **télécharger un fichier de plugin personnalisé**, puis
   sélectionne `hacienda-droit-affaires.plugin`.

Le plugin est alors **enregistré localement sur ta machine** et **disponible
immédiatement** — pas d'étape d'activation supplémentaire. Rien ne quitte ton poste
pendant l'installation. Si tu utilises aussi `hacienda-ghost` pour l'anonymisation,
installe-le de la même façon.

*(Guide officiel Cowork : [Utiliser les plugins dans Cowork](https://support.claude.com/fr/articles/13837440-utiliser-les-plugins-dans-cowork).)*

---

## Démarrer

**1. La première fois — configure ton cabinet (10-15 min).**

```
/h-da:entretien-demarrage
```

Renseigne ta pratique (side habituel, formes sociales, matrice d'approbateurs,
politique de confidentialité). **Tous les skills relisent ce profil** avant chaque
exécution : sans lui, les sorties restent génériques.

**2. Ensuite — si tu ne sais pas quel outil lancer, décris ton dossier.**

```
/h-da:cas j'ai un dossier de reprise d'une société en difficulté, par où je commence ?
```

`cas` est ta **porte d'entrée**. Décris ta situation en langage naturel — il trie, te
rappelle d'activer l'anonymisation avant de coller des données client, et t'amène au
bon skill. Si tu sais déjà quoi faire, lance directement le skill (« révise ce
contrat », « rédige une mise en demeure »).

**3. Le réflexe à connaître — c'est toi qui tranches.**

À la fin de chaque analyse, le skill te propose :

> **Que veux-tu faire ? Choisis une option et je la déroule :**
> **1. Rédiger** · **2. Escalader** · **3. Compléter les faits** · **4. Surveiller** · **5. Autre**

Le skill propose, **tu** tranches, il déroule. C'est le cœur de l'expérience.

---

## La palette — trouve ta situation

Chaque entrée suit le même format : **la situation** → *la commande* → ce que ça te
rend → **et ensuite** (ce qui s'enchaîne).

### A. Faire vivre la société

- **« Je crée une société, j'hésite sur la forme. »**
  `/h-da:constitution-societe --comparer` — aide au choix SAS/SARL/SA, motivé.
  **Et ensuite :** `--draft` pour un brouillon de statuts, puis le pacte ci-dessous.
- **« J'ai un pacte d'associés à relire. »**
  `/h-da:pacte-associes-review --review` — les 11 clauses sensibles triées par criticité.
  **Et ensuite :** `--pe` si c'est un LBO ; `financement-startup` si levée.
- **« Je dois convoquer une AG / rédiger un PV. »**
  `/h-da:gouvernance-ag --convocation` ou `--pv` — délais, quorum, majorité adaptés à la forme.
- **« On lève des fonds / on met en place des BSPCE. »**
  `/h-da:financement-startup --comparer` ou `--review` — instruments et term sheet de levée.

### B. Faire un deal (M&A)

Le parcours complet, dans l'ordre du deal — chaque skill prépare le suivant.

- **« Je reçois un NDA de data-room. »**
  `/h-da:reviser-nda` — triage VERT / ORANGE / ROUGE en 8 points.
- **« J'ai une LOI / un term sheet à valider. »**
  `/h-da:loi-term-sheet --side=acquereur` — binding vs non-binding, déséquilibres, reformulations.
- **« J'ouvre une due diligence. »**
  `/h-da:due-diligence-dataroom --side=acquereur` — 7 thèmes, grille de matérialité, Q&A.
  **Et ensuite :** les findings alimentent la GAP.
- **« J'ai un SPA à relire. »** ⭐
  `/h-da:spa-review --side=acquereur` — analyse clause par clause, red flags, issues list 🟢🟡🟠🔴.
  **Et ensuite :** il enchaîne sur `gap-review` et prépare `closing-checklist-fr`.
- **« Je révise la garantie d'actif et de passif. »**
  `/h-da:gap-review --side=acquereur` — 5 axes, confrontation aux findings DD.
- **« J'organise le closing. »**
  `/h-da:closing-checklist-fr` — conditions suspensives, séquençage signing/closing, formalités. `--pe` pour un LBO.
- **« Je cartographie un management package (LBO). »**
  `/h-da:management-package-pe` — instruments, economics, risque de clause confiscatoire, questions fiscal/social.

*Overlay Private Equity : `pacte-associes-review`, `spa-review`, `gap-review`,
`closing-checklist-fr` acceptent `--pe` pour la lentille LBO.*

### C. Traverser une difficulté

Deux **routeurs d'orientation** t'amènent au bon dispositif — ils décident, ils
n'exécutent pas.

- **« Mon client dirigeant hésite : sauver, céder ou déposer ? »**
  `/h-da:distress-cedant` — note d'orientation côté cédant/débiteur, route vers la bonne suite.
- **« Je veux racheter une cible en difficulté — titres ou actifs ? »**
  `/h-da:asset-vs-share-distress` — arbitrage de structuration côté repreneur.

Les dispositifs vers lesquels ils routent :

- **Prévention** — `/h-da:prevention-difficultes` (mandat ad hoc, conciliation, sauvegarde).
- **Dépôt de bilan** — `/h-da:declaration-cessation-paiements` (délai des 45 jours, pièces, RJ vs LJ).
- **Déclarer une créance** — `/h-da:declaration-creance` (forclusion L.622-24 calculée depuis le BODACC).
- **Reprendre** — `/h-da:pre-pack-cession`, `/h-da:reprise-a-la-barre`, `/h-da:cession-actifs-isoles`.
- **Exposition du dirigeant** — `/h-da:responsabilite-dirigeant`, et `/h-da:defense-dirigeant` si une action est engagée.

### D. Le quotidien — contrats, impayés, contentieux

- **« J'ai un contrat entrant à relire. »**
  `/h-da:reviser-contrat` — analyse clause par clause, issues list par criticité.
- **« Je dois générer des CGV / CGU. »**
  `/h-da:cgv-generator` — B2B (Code de commerce) ou B2C (Code de la consommation).
- **« J'envoie une mise en demeure. »**
  `/h-da:mise-en-demeure-commerciale` — sommes dues, intérêts, délai raisonnable, fermeté calibrée.
- **« Une relation commerciale a été rompue brutalement. »**
  `/h-da:analyser-rupture-brutale --review` — qualification, préavis raisonnable, préjudice (L.442-1, II).
- **« J'ai beaucoup de documents à passer au crible. »**
  `/h-da:revue-tabulaire` — extraction comparée multi-documents (utilisé aussi par la due diligence).

---

## Confidentialité

<!-- [review] — Candy : caler le statut exact de hacienda-ghost (à venir / bêta / optionnel) avant diffusion. -->

Le plugin tourne en local. Pour les documents les plus sensibles :

- **Avec `hacienda-ghost`** *(compagnon d'anonymisation — statut à préciser)* : les
  identifiants sensibles (parties nommées, montants > 10 k€, IBAN, numéros de pièce…)
  sont anonymisés **automatiquement** avant tout envoi au modèle.
- **Sans ghost** : le plugin affiche un **compteur** et un **avertissement** avant de
  traiter les documents sensibles — **c'est toi qui décides à chaque fois**. Tu peux
  aussi lancer `/h-da:check-pii` en pré-vol sur un document.

## Un mot sur le périmètre

Ce guide couvre **`hacienda-droit-affaires`**. Le plugin fait partie d'une marketplace
Hacienda plus large (propriété intellectuelle, sources officielles, recherche
documentaire) — à découvrir séparément.

**Rappel permanent :** toute sortie est un brouillon. La décision — signer, refuser,
déposer, escalader — reste la tienne, après validation humaine.
