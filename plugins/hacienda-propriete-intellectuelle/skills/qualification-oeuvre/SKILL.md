---
name: qualification-oeuvre
description: >
  Qualification juridique d'une création au regard du droit d'auteur français
  (CPI Livre I) — analyse multi-étapes : (1) originalité L.111-1 + CJUE Infopaq,
  (2) catégorie L.112-2 (liste non exhaustive), (3) titularité initiale selon
  7 cas (créateur unique / collaboration / collective / composite / commande /
  salariat / posthume), (4) distinction droits patrimoniaux L.122-1+ vs droit
  moral L.121-1 (perpétuel inaliénable imprescriptible), (5) durée 70 ans post
  mortem L.123-1, (6) enjeux selon objectif (préventif / défensif / contentieux).
  Point d'entrée du bloc droit d'auteur V4. Ne rédige PAS de contrat de cession
  (= cession-droit-auteur V4.1), ne qualifie PAS une contrefaçon (=
  contrefacon-droit-auteur V4.2). Ce skill NE conclut JAMAIS à l'existence ou
  l'inexistence du droit d'auteur (= juge in fine).
argument-hint: "[description œuvre | nature | contexte création | objectif préventif/défensif/contentieux]"
---

# /qualification-oeuvre

> **Qualification juridique ≠ avis d'opportunité.** Ce skill produit une
> **analyse de qualification** pour aider l'avocat spécialisé en propriété
> littéraire et artistique. Il NE conclut PAS à l'existence ou à la
> non-existence du droit d'auteur (= rôle du juge, in fine), NE rédige PAS un
> contrat de cession ou de licence (= `cession-droit-auteur` V4.1 /
> `licence-droit-auteur` V4.1), NE qualifie PAS une contrefaçon (=
> `contrefacon-droit-auteur` V4.2). Le droit d'auteur **naît automatiquement à
> la création** (CPI L.111-1) sans formalité de dépôt — mais la **preuve de la
> date de création et de l'identité de l'auteur** reste critique en cas de
> litige (cf. `depot-preuve-creation` v0.1 préservé).

## Examples

```
/hacienda-propriete-intellectuelle:qualification-oeuvre "Roman littéraire 320 pages — auteur personne physique seule — édition envisagée chez éditeur tiers — objectif préventif"
```

```
/hacienda-propriete-intellectuelle:qualification-oeuvre "Logiciel SaaS B2B développé par équipe de 4 développeurs salariés — code source + interface graphique + base de données utilisateurs — objectif préventif avant levée de fonds"
```

```
/hacienda-propriete-intellectuelle:qualification-oeuvre "Contenu marketing — vidéo publicitaire 30 sec commandée à agence externe — diffusion TV + web prévue — objectif préventif avant lancement campagne"
```

(Le skill demandera la description, le contexte de création, la date, les preuves disponibles et l'objectif.)

---

## QUALIFICATION JURIDIQUE, PAS AVIS D'OPPORTUNITÉ

**Reformuler en tête de chaque output. Ne jamais l'enlever. Ne jamais l'adoucir.**

> **Qualification juridique, pas avis d'opportunité.** Ce skill produit une
> analyse de qualification au regard du droit d'auteur français — il
> identifie les critères d'originalité (L.111-1 + jurisprudence CJUE
> Infopaq), la catégorie applicable (L.112-2 — liste non exhaustive), le cas
> de titularité initiale (7 cas exhaustifs), le partage droits patrimoniaux
> vs droit moral, la durée de protection, et les enjeux selon l'objectif
> (préventif / défensif / contentieux). Il NE conclut PAS à l'existence ou
> à l'inexistence du droit d'auteur sur l'œuvre concrète — c'est le **juge**
> qui tranche in fine, après contestation, sur la base de la preuve apportée
> par les parties. Le droit d'auteur naît automatiquement à la création sans
> formalité de dépôt (CPI L.111-1), mais la qualification reste un exercice
> juridique nécessitant validation par un avocat spécialisé en propriété
> littéraire et artistique avant tout acte (exploitation, cession,
> contestation, action en contrefaçon). Une qualification erronée porte des
> conséquences à sens unique : cession invalide, action contrefaçon mal
> fondée (déboutement + dépens + risque concurrence déloyale), violation
> droit moral non anticipée (action en cessation + dommages-intérêts).

C'est le garde-fou le plus visible du skill. Sous-qualifier l'originalité =
porte à sens unique (exploitation engagée, cession signée, dépôt fait sans
mesures de preuve). Sur-qualifier = porte à 2 sens, l'avocat affine.
Rester sur la porte à 2 sens.

---

## Charger le profil pratique avant de commencer

Avant tout, lire :
1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Récupérer :
- **Rôle** depuis `## 1. Profil cabinet et profil de pratique PI` (avocat
  inscrit au barreau / juriste interne / non-juriste — change l'en-tête de
  confidentialité ET le périmètre du secret professionnel). Le droit d'auteur
  relève du droit commun de la propriété littéraire et artistique — il N'EXISTE
  PAS de profession réglementée « mandataire en droit d'auteur » équivalente au
  mandataire INPI marques ou OEB brevets. Le rôle pertinent est donc **avocat
  spécialisé en propriété littéraire et artistique** (ou à défaut PI générale).
- **Secteurs des clients dominants** (édition / audiovisuel / logiciel / design
  / mode / publicité / multimedia / transversal — calibre les exemples et la
  vigilance sur les régimes spéciaux : L.113-9 logiciels, L.113-7 audiovisuel,
  L.132-36 journalistes, L.341-1 bases de données).
- **Posture conseil par défaut** (préventif vs réactif — calibre le ton :
  préventif = anticipation contractuelle, réactif = analyse défensive d'une
  contestation ou préparation contentieuse).
- **Matrice d'approbateurs** pour les escalades (avocat spécialisé PI / GC /
  Direction selon enjeu).

Ce skill ne conclut JAMAIS « œuvre protégée par le droit d'auteur » ni
« titularité acquise sans contestation possible » — il identifie les critères
applicables et les zones de risque.

Si le profil contient `[A CONFIGURER]`, surfacer :

> Le profil pratique n'est pas configuré — c'est ce qui adapte la posture, les
> secteurs, et la chaîne d'approbation à ta pratique. Tu peux continuer en
> mode provisoire (réponses génériques taguées `[non configuré]`) ou lancer
> `/hacienda-propriete-intellectuelle:entretien-demarrage` (10 à 15 minutes).

---

## Intake — 5 questions en batch unique

Avant toute analyse, poser les 5 questions ci-dessous **en une seule fois**.
Ne pas dérouler le workflow tant que les réponses ne sont pas obtenues — ou
explicitement marquées « non applicable » par l'utilisateur.

**1. Description de l'œuvre**
- **Nature** : texte / image / musique / vidéo / logiciel / design / multimedia
  / autre
- **Forme tangible** : manuscrit / fichier numérique (préciser format) /
  partition / maquette / code source (préciser langage) / autre
- **Description précise** (objet, contenu, finalité — viser ≥ 30 mots ; si
  description vague, push pour précision : « pour qualifier l'originalité
  sérieusement, j'ai besoin de comprendre les choix créatifs concrets — peux-tu
  décrire l'œuvre plus en détail ? »)

**2. Contexte de création**
- **Créateur(s)** : personne physique seule / plusieurs personnes physiques
  (préciser nombre et rôles)
- **Commande** : oui / non ; si oui, par qui (client externe / employeur /
  personne morale) et selon quel cadre contractuel (devis signé / contrat de
  commande explicite / mail informel / rien d'écrit)
- **Salariat** : oui / non ; si oui, fonctions du salarié (la création
  relève-t-elle de ses **fonctions habituelles** définies au contrat de
  travail ou de la fiche de poste, ou bien a-t-elle été créée **hors fonctions**
  voire sur temps personnel ?) — distinction critique pour L.113-9 (logiciels)
  et pour le régime salarié droit commun.
- **Collaboration** : plusieurs créateurs avec apports identifiables et
  séparables (œuvre de collaboration L.113-2 al.1) ? Apports fusionnés sans
  séparation possible (indice œuvre de collaboration unitaire ou œuvre
  collective selon initiative) ?
- **Œuvre collective** : initiative + édition + diffusion sous le nom d'une
  personne morale (encyclopédie, dictionnaire, périodique, site web
  institutionnel) ? Critère cumulatif L.113-2 al.3.

**3. Date de création + preuves disponibles**
- **Date de création** : YYYY-MM-DD ou approximation (préciser fourchette
  si incertain — « début 2024 », « courant T2 2025 »)
- **Preuves disponibles** : manuscrits horodatés / mails datés contenant
  fichiers attachés / dépôts copyright.fr / constat d'huissier ou commissaire
  de justice / enveloppe Soleau INPI (déposée — date à confirmer) / dépôt
  notarié / publication antérieure horodatée / aucune preuve formelle
- Si **aucune preuve formelle**, signaler immédiatement : « la qualification
  est possible, mais en cas de litige tu auras besoin de constituer la preuve
  de date — je le note en recommandation de fin et je peux ouvrir
  `depot-preuve-creation` (v0.1) ensuite. »

**4. Catégorie suspectée** (référence non exhaustive L.112-2)
- Littéraire / artistique (peinture, sculpture, dessin, photographie) /
  musicale / audiovisuelle (cinéma, télévision, vidéo) / logicielle / base de
  données (structure et/ou contenu) / design (arts appliqués) / dramatique /
  chorégraphique / graphique / typographique / multimédia (composition de
  plusieurs catégories) / autre
- En cas d'œuvre hybride (ex : site web = design + texte + logiciel +
  éventuellement musique), lister TOUTES les catégories applicables — le
  régime juridique peut différer par composant.

**5. Objectif de la qualification**
- **Préventif** : avant exploitation / diffusion / cession / dépôt produit —
  on veut sécuriser titularité, anticiper les cessions nécessaires, planifier
  les clauses droit moral.
- **Défensif** : contestation reçue d'un tiers (lettre, mise en demeure,
  action) — on veut établir notre titularité, l'originalité de l'œuvre,
  l'absence d'antériorité tierce.
- **Contentieux** : action en contrefaçon en préparation contre un tiers —
  on prépare le dossier, on évalue les preuves de date et de titularité,
  on identifie les droits violés.

L'objectif **change l'orientation finale du livrable** : le squelette
d'analyse reste identique (étapes 1 à 5), mais l'étape 6 « Enjeux identifiés »
et la section « Recommandations » sont calibrées différemment.

Si l'utilisateur ne sait pas trancher entre 2 objectifs, demander : « décris
le déclencheur — qu'est-ce qui t'amène à qualifier cette œuvre maintenant ? »

---

## Étape 1 — Analyse de l'originalité (L.111-1 + CJUE Infopaq)

C'est le **cœur** de la qualification. Sans originalité = pas de droit d'auteur,
quelle que soit la qualité de l'œuvre, son utilité ou sa valeur marchande.

### Critère central

> **CPI L.111-1** : « L'auteur d'une œuvre de l'esprit jouit sur cette œuvre,
> du seul fait de sa création, d'un droit de propriété incorporelle exclusif
> et opposable à tous. »
>
> **Critère central de la jurisprudence française** : « l'œuvre porte la
> marque de la personnalité de son auteur » (Cour de cass. 1re civ., formule
> classique reprise dans de nombreuses décisions).
>
> **Reformulation européenne harmonisante** : **CJUE Infopaq C-5/08 (16 juillet
> 2009)** — « création intellectuelle propre à son auteur ». La directive
> 2001/29/CE sur le droit d'auteur dans la société de l'information est
> interprétée par la CJUE comme imposant un critère d'originalité
> autonome au droit de l'Union, applicable à toutes les œuvres relevant des
> droits harmonisés (reproduction, communication au public, distribution).
>
> L'originalité s'apprécie **au cas par cas**, en fonction des choix créatifs
> réellement opérés par l'auteur. **Pas de seuil minimal absolu** (une œuvre
> très courte peut être originale) ni de notion de « qualité artistique » :
> la jurisprudence rappelle régulièrement que **le juge ne porte pas
> d'appréciation esthétique** (principe de neutralité du juge en matière
> artistique — formule récurrente : « il n'appartient pas au juge de porter
> une appréciation sur la valeur artistique de l'œuvre »).

### Exemples par catégorie

**Œuvres dont l'originalité est généralement contestable** :
- **Annuaire téléphonique** (compilation alphabétique mécanique) → pas
  d'originalité par lui-même au sens du droit d'auteur (peut éventuellement
  bénéficier du droit sui generis sur les bases de données L.341-1 si
  investissement substantiel — régime distinct).
- **Photographie simple de catalogue** (produit cadré frontalement sur fond
  neutre) → originalité contestable si aucune mise en scène, aucun choix
  d'éclairage, d'angle, de cadrage personnels. La CJUE (Painer C-145/10) a
  toutefois rappelé que même une photographie documentaire peut être
  originale si l'auteur a exercé des choix libres.
- **Formulaire standard** (déclaration d'impôt, formulaire administratif) →
  généralement pas d'originalité, fonctionnel et imposé.
- **Liste d'ingrédients d'une recette** (l'arrangement créatif du texte
  qui présente la recette peut être original ; la liste brute non).

**Œuvres dont l'originalité est généralement présumée** :
- **Œuvre littéraire** (roman, essai, nouvelle, poésie) → présomption forte
  dès qu'il y a écriture personnelle.
- **Œuvre cinématographique / audiovisuelle** → présomption forte
  (succession de choix : scénario, montage, dialogues, prises de vue).
- **Logiciel** → critère reformulé par Cour de cass. 1re civ. 7 mars 1986
  (Pachot) : « effort personnalisé allant au-delà de la simple mise en
  œuvre d'une logique automatique et contraignante ». Voir aussi
  CJUE BSA C-393/09 (2010) sur le statut de l'interface graphique (non
  protégée par le droit d'auteur logiciel mais éventuellement protégée par
  le droit d'auteur général).
- **Œuvre musicale** → présomption d'originalité forte sauf reprise pure
  (la combinaison mélodie + harmonie + rythme suffit généralement).
- **Œuvre de design** → originalité reconnue si choix créatifs au-delà de
  la fonction technique pure (CJUE Cofemel C-683/17 (2019) : le critère
  d'originalité au sens du droit d'auteur est autonome et ne dépend pas d'un
  critère esthétique — cumul possible avec dessin et modèle enregistré).

### Tests pratiques pour évaluer l'originalité (à appliquer au cas concret)

1. **Test des choix libres vs choix techniques imposés** : le créateur a-t-il
   pu opérer des **choix libres** (forme, structure, expression, agencement,
   couleurs, mots) ? Ou tous les choix étaient-ils dictés par une **contrainte
   technique** (norme à respecter, format imposé, fonction unique possible) ?
   Plus les choix sont libres, plus l'originalité est probable.

2. **Test de l'identifiabilité** : l'œuvre est-elle **reconnaissable** par
   rapport à d'autres créations du même genre ? Un lecteur averti pourrait-il
   distinguer cette œuvre d'une production banale du même secteur ? Cette
   « empreinte personnelle » est un indice d'originalité.

3. **Test de l'effort intellectuel créatif** : y a-t-il un **effort
   intellectuel personnel** au-delà de la simple **compilation mécanique** ou
   de la **production automatique** (génération aléatoire pure, mise en page
   automatique sans choix éditorial) ? Ce test élimine les productions
   purement mécaniques ou automatiques.

### Verdict

- **🟢 Originalité probable** : oui aux 3 tests. L'œuvre porte clairement
  l'empreinte de choix créatifs personnels.
- **🟡 Originalité à argumenter** : résultats mixtes (par exemple choix libres
  oui mais identifiabilité faible ; ou effort intellectuel oui mais sur fond
  de contrainte technique forte). Il faut **construire l'argumentation
  juridique** en s'appuyant sur les éléments concrets de choix créatifs.
- **🔴 Originalité douteuse** : non aux 3 tests. Création strictement
  utilitaire, mécanique, ou imposée par les contraintes techniques. Le droit
  d'auteur est probablement inapplicable ; envisager d'autres régimes (droit
  sui generis bases de données, dessin et modèle, concurrence déloyale).

**Sortie de l'étape 1** : verdict 🟢/🟡/🔴 + 2-3 lignes de justification
basée sur l'application concrète des 3 tests à l'œuvre analysée (pas une
récitation des règles — un raisonnement appliqué).

> **Note** : ce verdict est une **appréciation prima facie** pour orienter
> l'analyse — il ne préjuge pas de la décision d'un juge sur le fond, qui
> peut diverger sur la base d'éléments de preuve supplémentaires apportés
> par les parties. Tag `[review]` systématique sur les cas 🟡.

---

## Étape 2 — Catégorie L.112-2 (liste NON exhaustive)

L'article L.112-2 du CPI énumère les catégories d'œuvres protégeables.
**Cette liste est explicitement non exhaustive** (« sont considérées
notamment comme œuvres de l'esprit … ») : toute création **originale**, même
ne relevant d'aucune catégorie listée, est protégeable dès lors que les
critères de l'originalité (étape 1) sont remplis.

### Catégories principales

| Catégorie | Exemples typiques | Régime |
|---|---|---|
| **Littéraires** | Livres, brochures, articles, manuels, conférences, allocutions, sermons, plaidoiries | Droit commun |
| **Artistiques** | Peintures, sculptures, dessins, photographies (originales), illustrations, cartes géographiques, gravures, lithographies | Droit commun |
| **Musicales** | Compositions avec ou sans paroles | Droit commun (interaction droits voisins L.211-1+) |
| **Dramatiques / chorégraphiques / pantomimes** | Pièces de théâtre, ballets, mimes | Droit commun |
| **Cinématographiques + audiovisuelles** | Films, séries, documentaires, vidéos | L.113-7 — œuvre de collaboration ; présomption d'auteurs : scénariste, adaptateur, dialoguiste, auteur des compositions musicales spécialement créées, réalisateur |
| **Graphiques / typographiques** | Œuvres typographiques, calligraphies, créations graphiques | Droit commun |
| **Arts appliqués (design)** | Mobilier, mode, objets, packaging | Droit commun + cumul possible avec dessin et modèle enregistré (cf. CJUE Cofemel) |
| **Logiciels** | Code source + code objet + matériel de conception préparatoire | **Régime spécial** — L.113-9 (titularité employeur si salarié dans ses fonctions) ; protection de l'expression du code, pas des idées / algorithmes ; voir skill dédié `revue-logiciel-donnees` |
| **Multimedia** | Sites web créatifs, applications interactives, jeux vidéo | **Régime hybride** — composition de plusieurs catégories ; pas de qualification unifiée par la jurisprudence (jeux vidéo : Cour de cass. 25 juin 2009 retient une qualification distributive) |
| **Bases de données** | Bases structurées de données | **Double protection possible** : (a) droit d'auteur sur la **structure** originale (L.112-3) ; (b) droit sui generis sur le **contenu** L.341-1 si investissement substantiel — régime distinct durée 15 ans renouvelable (L.342-5) |
| **Traductions / adaptations / arrangements** | Œuvres dérivées | Œuvre composite (L.113-2 al.2) — protégée mais sous réserve des droits de l'œuvre préexistante |

**Note critique** : la qualification de **catégorie** détermine souvent le
**régime de titularité** (cas C ci-après pour l'audiovisuel L.113-7 ; cas F
spécial pour le logiciel L.113-9 ; cas spécial L.132-36 pour les œuvres
journalistiques en convention collective). Ne pas se contenter d'une
catégorie générale — pousser jusqu'au régime spécial le cas échéant.

> **Œuvres hybrides** : pour un livrable composite (ex : site web =
> design graphique + textes + code + base de données + éventuellement
> musique d'ambiance), lister **toutes les catégories applicables** et
> qualifier chaque composant séparément si les régimes diffèrent. La
> qualification globale d'« œuvre multimédia » n'évacue PAS la nécessité
> de qualifier le composant logiciel sous L.113-9 si pertinent.

---

## Étape 3 — Titularité initiale (7 cas exhaustifs A à G)

**Règle générale** (L.111-1) : la titularité naît automatiquement sur la tête
de **l'auteur personne physique**, du seul fait de la création. Les cas
suivants déclinent cette règle selon le contexte de création.

### Cas A — Créateur personne physique unique

**Configuration** : une seule personne physique a créé l'œuvre, hors commande
et hors salariat.

**Titularité** :
- **Droits patrimoniaux** : dévolus au créateur (L.111-1).
- **Droit moral** : dévolu au créateur (L.121-1) — perpétuel, inaliénable,
  imprescriptible.
- **Présomption L.113-1** : « la qualité d'auteur appartient, sauf preuve
  contraire, à celui ou à ceux sous le nom de qui l'œuvre est divulguée » —
  la mention du nom de l'auteur sur l'œuvre crée une présomption simple.

**Cas le plus simple. Risques** : aucun majeur, sauf preuve de date si
contestation ultérieure de l'antériorité.

### Cas B — Œuvre de collaboration (L.113-2 al.1)

**Configuration** : plusieurs personnes physiques ont participé à la création
de l'œuvre, avec des apports créatifs identifiables (mais l'œuvre est
exploitée comme un tout).

**Titularité** :
- **Cotitularité** entre les coauteurs (L.113-3).
- Répartition des droits proportionnelle aux contributions — **présomption
  d'égalité** faute de preuve contraire (souvent égalitaire en pratique).
- Chaque coauteur peut **faire valoir ses droits sur sa contribution
  distincte** si elle est séparable et exploitable indépendamment (L.113-3
  al.4) — sous réserve de ne pas porter préjudice à l'exploitation de
  l'œuvre commune.
- **Exploitation de l'œuvre commune** : requiert **l'accord de tous les
  coauteurs** (unanimité) — **risque majeur de blocage** en cas de
  désaccord ; en cas de litige, le juge tranche (L.113-3 al.3).

**Exemples** : livre coécrit (deux auteurs au nom indiqué), scénario écrit à
plusieurs mains, composition musicale en duo (musique + paroles).

**Risque critique** : **absence de pacte d'auteurs** dès le démarrage du
projet — proposer systématiquement la rédaction d'un pacte de coauteurs
définissant clés de répartition, modalités d'exploitation, gestion des
décisions, sortie d'un coauteur. (Renvoi vers `cession-droit-auteur` V4.1
pour la rédaction.)

### Cas C — Œuvre collective (L.113-2 al.3 et L.113-5)

**Configuration cumulative — 3 critères** :
1. L'œuvre est créée à l'**initiative** d'une personne physique ou morale ;
2. Cette personne **édite, publie et diffuse** l'œuvre **sous sa direction
   et son nom** ;
3. Les contributions individuelles **se fondent dans l'ensemble**, sans qu'il
   soit possible d'attribuer à chaque contributeur un droit distinct sur sa
   part.

**Titularité** :
- **Exception majeure au droit commun L.111-1** : la **personne morale (ou
  physique) commanditaire** est **titulaire ab initio** des droits sur
  l'œuvre collective (L.113-5).
- Les contributeurs individuels ne peuvent **pas** revendiquer un droit
  d'auteur individuel sur leur contribution à l'œuvre collective (sauf si
  cette contribution est exploitée séparément avec leur accord).

**Exemples typiques** : encyclopédies (Larousse, Universalis), dictionnaires,
anthologies, périodiques (journaux, magazines), sites web institutionnels
créés par une équipe sous direction éditoriale d'une entreprise, bases de
données rédactionnelles.

**Vigilance** : la qualification « œuvre collective » est **souvent invoquée
à tort** par les employeurs pour éviter de payer une cession de droits aux
contributeurs. La jurisprudence est **stricte** : il faut prouver les 3
critères cumulatifs, en particulier la **fusion** des contributions (Cour de
cass. 1re civ., décisions récurrentes refusant la qualification quand les
contributions restent identifiables).

### Cas D — Œuvre composite (L.113-2 al.2)

**Configuration** : œuvre nouvelle dans laquelle est **incorporée** une
œuvre préexistante, **sans la collaboration** de son auteur.

**Titularité** :
- L'auteur de l'œuvre composite est **titulaire de droits sur l'œuvre
  composite** (L.113-4).
- **MAIS** sous **réserve des droits de l'auteur de l'œuvre préexistante** :
  l'incorporation requiert l'autorisation préalable du titulaire des droits
  de l'œuvre préexistante (sauf exception L.122-5).

**Exemples** : adaptation cinématographique d'un roman, traduction d'un
texte, arrangement musical, remix, sample musical, mashup, recueil d'œuvres
préexistantes commentées.

**Risque critique** : **chaîne de droits cassée** si l'autorisation
préalable de l'auteur préexistant n'a pas été obtenue ou est mal documentée
— l'œuvre composite peut être qualifiée de contrefaçon, peu importe son
originalité propre. Vérifier systématiquement la chaîne de cessions amont.

### Cas E — Œuvre de commande

**Configuration** : œuvre créée par un créateur (personne physique
indépendante, freelance, agence) à la demande d'un commanditaire (personne
physique ou morale).

**Titularité — règle clé** :
- Le commanditaire **ne reçoit PAS automatiquement** les droits
  patrimoniaux. Le **créateur reste titulaire** tant qu'aucune cession écrite
  conforme n'a été conclue.
- **Cession écrite obligatoire** — formalisme L.131-3 al.1 : « la
  transmission des droits de l'auteur est subordonnée à la condition que
  chacun des droits cédés fasse l'objet d'une mention distincte dans l'acte
  de cession et que le domaine d'exploitation des droits cédés soit délimité
  quant à son **étendue** et à sa **destination**, quant au **lieu** et
  quant à la **durée** ».
- 5 mentions obligatoires cumulatives : (a) **énumération** droit par droit
  des prérogatives cédées (reproduction, représentation, adaptation,
  traduction…), (b) **étendue** et **destination** d'exploitation, (c)
  **lieu** (territoires), (d) **durée**, (e) **rémunération** (en principe
  proportionnelle L.131-4, forfait dérogatoire dans les cas listés).
- À défaut d'une seule de ces mentions, la cession peut être déclarée
  **nulle** par le juge — totalement ou partiellement.

**Erreur fréquente** : une agence de communication livre un logo à un client
sur la base d'un devis signé sans clause de cession explicite. Le client
suppose la cession implicite « j'ai payé donc c'est à moi ». **Faux** : le
créateur reste titulaire, peut s'opposer à toute utilisation au-delà de la
livraison initiale (rebranding, déclinaisons, support nouveau, exploitation
internationale), et peut même demander réparation pour exploitation non
autorisée.

**Sécurisation** : exiger un **contrat de cession explicite L.131-3 conforme**
avant toute exploitation — la simple facture, le simple devis, le mail
informel ne suffisent jamais.

### Cas F — Œuvre de salarié

**Configuration** : œuvre créée par un salarié dans le cadre de son contrat
de travail.

**Titularité — règle clé contre-intuitive** :
- **Régime de droit commun** : le **salarié reste titulaire** des droits
  d'auteur, même si l'œuvre a été créée dans l'exercice de ses fonctions et
  sur le temps de travail (CPI L.111-1 — exception au principe Code du
  travail selon lequel l'employeur est propriétaire du travail du salarié).
- Cette règle est **contre-intuitive** pour beaucoup d'employeurs : la
  qualification de salarié **n'emporte PAS** cession automatique des droits
  d'auteur. **Une cession écrite L.131-3 reste nécessaire**.

**Exceptions au droit commun** (cession ou titularité directe au profit de
l'employeur) :
- **Logiciels (L.113-9)** : les droits patrimoniaux sur le logiciel créé
  par un ou plusieurs employés **dans l'exercice de leurs fonctions ou
  d'après les instructions de leur employeur** sont **dévolus à l'employeur**
  directement (régime dérogatoire). Le droit moral reste sur le salarié.
  **Vigilance** : cette dévolution ne couvre PAS les créations hors
  fonctions (week-end, projet personnel non lié, contribution open source
  personnelle) — la frontière « dans l'exercice des fonctions » est
  appréciée concrètement (lien avec les missions, utilisation des moyens de
  l'entreprise, temps de travail). Voir skill dédié `revue-logiciel-donnees`.
- **Œuvres journalistiques (L.132-36 à L.132-45)** : cession encadrée par
  **convention collective des journalistes** (CCNTJ) et accord d'entreprise
  — régime spécifique avec rémunération de référence (« titre de presse »
  d'origine + exploitation autre support).
- **Agents publics (L.111-1 al.4 et L.131-3-1+)** : régime spécifique pour
  les fonctionnaires — cession à l'État ou collectivité dans la mesure
  strictement nécessaire à l'accomplissement de la mission de service public,
  avec intéressement aux produits d'exploitation commerciale.

**Risque critique** : entreprises qui supposent automatiquement détenir les
droits sur les créations de leurs salariés (logos refaits par graphiste
salarié, textes marketing, vidéos, designs) — sans cession écrite, le
salarié peut, en cas de départ conflictuel ou de litige, contester
l'exploitation. La cession L.131-3 doit figurer dans le **contrat de
travail** (clause de cession) ou faire l'objet d'un avenant pour chaque
œuvre ou catégorie d'œuvres (cession globale d'œuvres futures encadrée
L.131-1 — prohibée sauf exceptions, en pratique on cède au fur et à mesure
ou par catégorie déterminée).

### Cas G — Œuvre posthume

**Configuration** : œuvre divulguée après le décès de l'auteur, ou auteur
décédé avec droits transmis aux héritiers.

**Titularité** :
- **Droits patrimoniaux** : dévolus aux **ayants droit** (héritiers et/ou
  cessionnaires antérieurs au décès), selon les règles de droit successoral.
  Durée standard 70 ans post mortem (L.123-1) à compter de l'année suivant
  le décès.
- **Droit moral** : transmissible **par voie testamentaire** aux héritiers
  (L.121-1 al.4) — perpétuel (ne s'éteint jamais), donc transmis de
  génération en génération.
- **Œuvres divulguées post mortem** (L.123-4) : pour les œuvres divulguées
  **après l'expiration du monopole d'exploitation** du droit commun (typique
  œuvres inédites retrouvées), durée spéciale de **25 ans** à compter de
  l'année de divulgation, au profit du propriétaire du manuscrit ou de
  l'ayant droit divulgateur.

**Risque** : indivision successorale entre héritiers — exploitation requiert
l'accord de tous les ayants droit (cf. cas B sur l'unanimité) ; en cas de
désaccord persistant, recours possible au juge.

---
