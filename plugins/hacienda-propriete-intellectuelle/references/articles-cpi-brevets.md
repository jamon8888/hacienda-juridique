# Articles CPI — brevets

Référence des articles du Code de la propriété intellectuelle utilisés par les
skills brevets du plugin (V0.4 — bloc Brevets MVP). Chaque article est résumé
en quelques lignes avec son contexte d'usage par skill.

> **Source primaire :** Légifrance (https://www.legifrance.gouv.fr). Toute citation
> dans une sortie doit être taguée `[Légifrance]` si vérifiée à la session, sinon
> `[connaissance modèle — à vérifier]`. Voir `CLAUDE.md` §4 — Tags de provenance.

---

## Conditions de brevetabilité et structure du dépôt

### L.611-1 — Structure du dépôt

Le titre de propriété industrielle qu'est le brevet protège une invention par
la délivrance d'un titre conférant un droit exclusif d'exploitation. La demande
comprend obligatoirement : **description** (suffisante pour exécution par
l'homme du métier), **revendications** (qui définissent l'étendue de la
protection), **abrégé** (résumé technique), et **dessins** si nécessaires à la
compréhension.

- **Utilisé par :** `preparation-depot-brevet` — section structure du dépôt /
  checklist livrable.

### L.611-7 — Invention de salarié

Régime des inventions faites par un salarié : les inventions de mission
appartiennent à l'employeur ; les inventions hors mission attribuables peuvent
être attribuées à l'employeur moyennant rémunération supplémentaire ou juste
prix ; les inventions hors mission non attribuables appartiennent au salarié.
Régime d'ordre public.

- **Utilisé par :** `preparation-depot-brevet` — section intake (qui est
  l'inventeur ? quel rapport contractuel ?) et cession de droits avant dépôt.

### L.611-10 — Exclusions de brevetabilité

Sont brevetables les inventions nouvelles, impliquant une activité inventive
et susceptibles d'application industrielle. **Ne sont PAS considérées comme
des inventions au sens du brevet :**

1. Les découvertes, théories scientifiques, méthodes mathématiques.
2. Les créations esthétiques.
3. Les plans, principes et méthodes pour l'exercice d'activités intellectuelles,
   les règles de jeu, les méthodes économiques (« business methods »).
4. Les programmes d'ordinateur **en tant que tels** (admissibles si effet
   technique au-delà de l'exécution du programme — alignement OEB G 3/08).
5. Les présentations d'informations.
6. Les méthodes de traitement chirurgical / thérapeutique du corps humain ou
   animal et les méthodes de diagnostic appliquées au corps.
7. Les variétés végétales et races animales (procédés essentiellement
   biologiques) — protections distinctes (COV, etc.).

- **Utilisé par :** `recherche-anteriorite-brevet` — knockout amont (étape 2,
  « exclusions L.611-10 »). Si l'invention tombe dans une exclusion, stop avant
  recherche de nouveauté.

### L.611-11 — État de la technique

L'état de la technique est constitué par tout ce qui a été rendu accessible au
public **avant la date de dépôt** de la demande, par une description écrite ou
orale, un usage ou tout autre moyen. **Nouveauté absolue** : pas de limitation
territoriale ni linguistique. Inclut aussi les demandes FR / EP désignant FR
non publiées mais ayant date de dépôt antérieure (effet « secret prior art »
limité à la nouveauté, pas à l'activité inventive).

- **Utilisé par :** `recherche-anteriorite-brevet` — fondement de toute la
  recherche (étapes 3-5).

### L.611-13 — Délai de grâce (divulgation non-opposable)

Une divulgation de l'invention par l'inventeur ou son ayant cause **dans les
6 mois précédant le dépôt** n'est pas opposable si elle résulte (a) d'un abus
évident à l'égard de l'inventeur, ou (b) du fait que l'inventeur a exposé
l'invention dans une exposition officielle internationale reconnue. Régime
beaucoup plus strict que le « grace period » US (12 mois, toute divulgation).

- **Utilisé par :** `preparation-depot-brevet` — section intake (l'invention
  a-t-elle été divulguée ? quand ? par qui ?) et `recherche-anteriorite-brevet`
  — qualification d'une divulgation propre.

### L.611-15 — Application industrielle

Une invention est considérée comme susceptible d'application industrielle si
son objet peut être fabriqué ou utilisé dans tout genre d'industrie, y compris
l'agriculture. Critère rarement bloquant en pratique sauf domaines limites
(méthodes purement mentales, perpetuum mobile).

- **Utilisé par :** `recherche-anteriorite-brevet` — knockout amont (étape 2).

---

## Procédure de dépôt et modifications

### L.612-4 — Demande divisionnaire

Une demande peut être divisée jusqu'à un délai fixé par voie réglementaire
(en pratique : tant que la demande mère est en instance). La demande divisionnaire
conserve la date de dépôt et le bénéfice de priorité de la demande initiale,
sous réserve de ne pas étendre l'objet au-delà du contenu de la demande
initiale.

- **Utilisé par :** `preparation-depot-brevet` — section stratégie (anticiper
  divisionnaires si pluralité d'inventions).

### L.612-5 — Suffisance de description

La description doit exposer l'invention de manière suffisamment claire et
complète pour qu'un homme du métier puisse l'exécuter. Insuffisance de
description = motif de nullité (L.613-25).

- **Utilisé par :** `preparation-depot-brevet` — section rédaction description.

### L.612-6 — Non-extension (amendements en cours de procédure)

Les revendications peuvent être modifiées en cours de procédure (réponse à
notification INPI, opposition, recours), mais **les modifications ne peuvent
étendre l'objet de la demande au-delà du contenu de la demande telle que
déposée**. Extension = motif de nullité ultérieur.

- **Utilisé par :** `preparation-depot-brevet` — alerte de rédaction (prévoir
  fallback positions dans description pour amendements futurs).

---

## Droits conférés et contrefaçon

### L.613-3 — Droits conférés / actes de contrefaçon directe + équivalence

Sont interdits, à défaut de consentement du titulaire : (a) la fabrication,
l'offre, la mise dans le commerce, l'utilisation, l'importation ou la détention
aux fins précitées du **produit** objet du brevet ; (b) l'utilisation d'un
**procédé** objet du brevet ou, lorsque le tiers sait ou que les circonstances
rendent évident que l'utilisation est interdite sans consentement, l'offre de
son utilisation sur le territoire français ; (c) l'offre, la mise dans le
commerce, l'utilisation, l'importation ou la détention du **produit obtenu
directement par le procédé** objet du brevet.

**Théorie de l'équivalence** (jurisprudentielle, ancrée sur L.613-3) :
**Cour de cass. com. 5 mai 2009, n° 08-15.479** (et lignée). Test français :
constitue contrefaçon par équivalence l'utilisation d'un moyen qui (i) **exerce
la même fonction** (ii) **pour obtenir un résultat de même nature, sinon de
même degré** que celui obtenu par le moyen revendiqué. Test fonctionnel et
non strictement formel.

- **Utilisé par :** `tableau-contrefacon-brevet` — fondement de l'analyse
  contrefaçon directe (mappage élément par élément revendication ↔ produit
  argué) et de l'analyse équivalence (section dédiée).

### L.613-25 — Nullité du brevet

Le brevet est déclaré nul par décision de justice : (a) si son objet n'est pas
brevetable au sens des articles L.611-10 et suivants (défaut de nouveauté,
défaut d'activité inventive, exclusion, défaut d'application industrielle) ;
(b) s'il n'expose pas l'invention de façon suffisante (L.612-5) ; (c) si son
objet s'étend au-delà du contenu de la demande telle que déposée (L.612-6) ;
(d) si le titulaire n'avait pas droit à l'obtenir.

- **Utilisé par :** `tableau-contrefacon-brevet` — alerte risque reconventionnel
  (« le défendeur peut soulever nullité — anticiper »). À venir V2.1 :
  skill `anteriorite-invalidite` dédié.

---

## Contentieux brevets

### L.615-1 — Action en contrefaçon — compétence TJ Paris exclusivement

Les actions civiles et les demandes en matière de brevets relèvent de la
**compétence exclusive du Tribunal judiciaire de Paris**. Compétence
d'attribution d'ordre public. Pôle 5 chambre 1 spécialisé PI.

- **Utilisé par :** `tableau-contrefacon-brevet` — chaque livrable mentionne
  TJ Paris dans la section recommandations. CLAUDE.md template — section
  Brevets confirme la compétence par défaut.

### L.615-5 — Saisie-contrefaçon

Procédure probatoire spécifique aux droits de PI : sur ordonnance sur requête
du Président du TJ Paris, un huissier peut procéder à la description détaillée
ou à la saisie réelle des produits et des documents relatifs à l'activité
contrefaisante. **L'assignation au fond doit être délivrée dans un délai
(20 jours ouvrables ou 31 jours calendaires, le plus long) à peine de
nullité de la saisie.**

- **Utilisé par :** `tableau-contrefacon-brevet` — section recommandations
  (option « saisie-contrefaçon préalable » si preuves à consolider avant
  assignation).

### L.615-7 — Calcul du préjudice (réparation intégrale + atteinte morale)

Pour fixer les dommages-intérêts, la juridiction prend en considération
distinctement : (a) les **conséquences économiques négatives** subies par la
partie lésée (manque à gagner, perte subie) ; (b) le **préjudice moral** causé
au titulaire ; (c) les **bénéfices réalisés par le contrefacteur**, y compris
les économies d'investissements intellectuels, matériels et promotionnels.
Alternativement, à la demande du titulaire, **redevance indemnitaire** au
moins égale à ce qu'aurait été la redevance d'une licence consentie.

- **Utilisé par :** `tableau-contrefacon-brevet` — section impact / quantum
  prévisionnel.

### L.615-8 — Prescription de l'action en contrefaçon

L'action en contrefaçon se prescrit par **5 ans à compter du jour où le
titulaire du droit a connu ou aurait dû connaître** le dernier fait lui
permettant de l'exercer (alignement sur Cass. com. 14 nov. 2018,
n° 17-22.539 — point de départ glissant).

- **Utilisé par :** `tableau-contrefacon-brevet` — section recommandations
  (vérifier prescription avant d'engager).

---

## Renvois croisés

| Skill | Articles principaux mobilisés |
|---|---|
| `recherche-anteriorite-brevet` | L.611-10 (exclusions), L.611-11 (état de la technique), L.611-13 (délai de grâce), L.611-15 (application industrielle) |
| `preparation-depot-brevet` | L.611-1 (structure), L.611-7 (salarié), L.611-13 (grâce), L.612-4 (divisionnaire), L.612-5 (suffisance), L.612-6 (non-extension) |
| `tableau-contrefacon-brevet` | L.613-3 (droits + équivalence Cass. com. 5 mai 2009), L.613-25 (nullité reconventionnelle), L.615-1 (TJ Paris), L.615-5 (saisie), L.615-7 (préjudice), L.615-8 (prescription) |

Pour les sources techniques (INPI Data brevets, OEB Espacenet OPS), voir
`references/ressources-pi-fr.md` §2.
