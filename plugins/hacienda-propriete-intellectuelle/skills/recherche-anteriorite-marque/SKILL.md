---
name: recherche-anteriorite-marque
description: >
  Premier passage de recherche d'antériorité marque (knockout L.711-2 CPI +
  similarités INPI/EUIPO + appréciation globale CJUE) — produit une liste de
  signaux pour décision avocat, jamais une opinion de disponibilité. Utiliser
  pour un nouveau signe, des classes Nice nouvelles, ou avant un dépôt.
  Ce skill ne conclut JAMAIS qu'une marque est disponible.
argument-hint: "[signe | classes Nice | territoires FR/EU/intl]"
---

# /recherche-anteriorite-marque

**Ce n'est PAS une opinion de disponibilité.** Une opinion de disponibilité
exige une recherche professionnelle complète et le jugement d'un mandataire
en marques (CPI L.422-4) ou d'un avocat. "Aucun conflit évident" = le triage
n'a rien trouvé, pas que la marque est libre. *Des clients ont été assignés
en contrefaçon sur des marques qui passaient un knockout.*

## Examples

```
/hacienda-propriete-intellectuelle:recherche-anteriorite-marque "APEXLEAF — vêtements outdoor classes 25, 35 — FR + EU"
```

```
/hacienda-propriete-intellectuelle:recherche-anteriorite-marque
```

(Le skill demandera le signe, les classes et les territoires.)

---

## CECI EST UN PREMIER PASSAGE, PAS UNE OPINION DE DISPONIBILITÉ

**Reformuler en tête de chaque output. Ne jamais l'enlever. Ne jamais l'adoucir.**

> **Premier passage, pas une opinion de disponibilité.** Une opinion de
> disponibilité de marque exige une recherche professionnelle complète
> (Data INPI exhaustive, EUIPO TMview tous offices, OMPI ROMARIN, recherche
> phonétique étendue, recherche figuratif si applicable, sources non
> enregistrées comme noms de domaine et raisons sociales) et le jugement
> d'un mandataire en marques ou d'un avocat sur le risque de confusion.
> "Aucun conflit évident" issu de ce skill = le triage n'a rien trouvé. Cela
> ne veut pas dire que la marque est libre. Un mandataire ou un avocat
> évalue avant tout dépôt, adoption ou investissement marketing.

C'est le garde-fou le plus visible du plugin. Sous-flagger un conflit = porte
à sens unique (logo sur camions, produit lancé, dépôt déjà fait, tous avec un
problème dessous). Sur-flagger = porte à 2 sens, l'avocat élague en revue.
Rester sur la porte à 2 sens.

---

## Charger le profil pratique avant de commencer

Avant tout, lire :
1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Récupérer :
- **Rôle** depuis `## Qui utilise ce plugin` (avocat / mandataire / non-juriste — change l'en-tête confidentialité).
- **Juridictions inscrites** depuis `## Profil pratique PI` (défaut territoires si l'utilisateur n'en spécifie pas).
- **Intégrations** depuis `## Intégrations disponibles` (INPI Data ✓/✗, EUIPO TMview ✓/✗ — détermine quelles bases sont interrogées).
- **Posture de décision** — ce skill ne conclut JAMAIS "absence de risque de confusion".

Si le profil contient `[A CONFIGURER]`, surfacer :

> Le profil pratique n'est pas configuré — c'est ce qui adapte la posture, les
> juridictions et la chaîne d'approbation à votre cabinet.
>
> **Deux choix :**
> - Lancer `/hacienda-propriete-intellectuelle:entretien-demarrage` (10-15 min)
> - Dire **"provisoire"** et je lance avec les défauts génériques (FR + EU,
>   posture mesurée, rôle avocat, sans playbook) — chaque sortie sera taggée
>   `[PROVISOIRE — configurer le profil pour une sortie sur mesure]`.

### Mode provisoire

Si l'utilisateur dit "provisoire", lancer normalement avec : posture mesurée,
rôle avocat, FR + EU, pas de playbook (analyse complète plutôt que matching
contre une position list). Tagger la note du relecteur et chaque finding
`[PROVISOIRE]`. À la fin, ajouter :

> "C'était un run générique avec les hypothèses par défaut. Lancer
> `/hacienda-propriete-intellectuelle:entretien-demarrage` pour calibrer sur
> VOTRE pratique — votre playbook, vos juridictions, votre tolérance au risque."

---

## Intake

Demander en un seul batch (pas de jeu de questions à rallonge) :

> Quelques questions avant le triage :
>
> 1. **Signe proposé.** Texte exact, stylisation éventuelle, et type :
>    mot / figuratif / composite.
> 2. **Produits ou services.** Ce qui sera réellement vendu sous ce signe.
>    Une ou deux phrases — je proposerai les classes Nice et confirmerai.
> 3. **Classes Nice.** Si déjà connues, lister. Sinon décrire les
>    produits/services et je proposerai les classes probables.
> 4. **Territoires.** FR / EU / Madrid international / pays spécifiques.
>    Défaut depuis `Profil pratique PI > juridictions inscrites`.
> 5. **Apparence en marché.** Tagline, dénominations adjacentes (gamme),
>    trade dress, éléments visuels qui apparaîtront avec.

Attendre la réponse. Si la description est vague ("appli IA", "plateforme"),
pousser une fois :

> Donne ce qu'un client voit concrètement — appli mobile grand public, API
> entreprise, produit physique, service. Les classes en dépendent.

---

## Knockout — motifs absolus L.711-2 CPI

Avant toute recherche en bases, vérifier les motifs intrinsèques qui
condamnent un signe indépendamment de toute antériorité. Pour chaque motif,
évaluer franchement et flagger. Ne pas rationaliser un problème évident.

| Motif (L.711-2 CPI) | Ce que ça veut dire | Flagger quand |
|---|---|---|
| **Caractère distinctif insuffisant** (1°) | Le signe ne permet pas d'identifier un produit | Le signe désigne directement le type de produit |
| **Descriptif** (2°) | Décrit espèce, qualité, quantité, destination, valeur, provenance, époque | Un consommateur lit le signe et sait ce que fait le produit sans imagination |
| **Devenu usuel** (3°) | Entré dans le langage courant ou les habitudes professionnelles | Mot devenu synonyme générique de la catégorie |
| **Forme imposée** (5°) | Forme nécessaire à la fonction technique du produit | Marque figurative — et la forme assure une fonction |
| **Atteinte ordre public / bonnes mœurs** (7°) | Symboles d'État, AOP/IGP non autorisées, signes contraires | Signe contient un élément protégé ou choquant |
| **Trompeur** (8°) | Risque de tromper le public sur nature, qualité, provenance | Le signe suggère une qualité que le produit n'a pas, et cette qualité importerait au consommateur |

**Sortie** : pour chaque motif, soit "aucun problème identifié", soit un flag
spécifique avec une ligne de raison. Ne pas produire un tableau plat de "pass".

---

## Recherche similaires

L'objectif : **trouver des marques antérieures potentiellement confuses**, pas
décider si la confusion est probable. C'est le rôle de l'avocat / mandataire.

### Ce que l'utilisateur a connecté

Lire `## Intégrations disponibles` du profil :

- **Data INPI ✓ et EUIPO TMview ✓** : exécuter
  - `inpi_search_marques({ query, classes, similarite: "proche", limite: 50 })`
  - `inpi_search_marques({ query, classes, similarite: "phonetique", limite: 30 })`
  - `euipo_tmview_search({ query, classes, offices: ["EM", "FR"], limite: 50 })`
  - Attribuer chaque résultat à sa source (`[INPI Data]` ou `[EUIPO TMview]`).
  - Noter date de recherche et scope (classes, exact-vs-fuzzy).
- **Data INPI seul** : INPI seul + ajouter une note "EUIPO non interrogé,
  recherche EU recommandée avant adoption."
- **Aucun MCP marques mais `hacienda-sources-officielles`** : recherche
  jurisprudence opposition INPI via `recherche` (`base-jurisprudence INPI`).
- **Aucun connecteur** : annonce explicite (voir bloc ci-dessous) — ne PAS
  inférer des résultats depuis la connaissance modèle pour les présenter
  comme des findings.

### Fallback sans accès bases

Écrire littéralement dans la sortie :

> **Aucune base de données interrogée.** Ce triage n'a pas hit Data INPI,
> EUIPO TMview, OMPI ROMARIN, base-jurisprudence INPI, ni aucune source
> non enregistrée (noms de domaine, raisons sociales). Une recherche
> complète sur ces bases est requise avant toute conclusion sur la
> disponibilité. Le triage ci-dessous est limité à l'analyse intrinsèque
> des motifs absolus et aux facteurs structurés contre les marques que
> l'utilisateur a citées ou qui apparaissent dans la conversation.

Puis continuer — les checks intrinsèques + l'analyse facteurs restent utiles,
juste honnêtement étiquetés.

### Pour chaque marque similaire trouvée (ou fournie)

Capturer :
- **Marque** (caractères exacts, stylisation éventuelle)
- **Source** (numéro INPI / numéro EUTM / décision opposition / nom de
  domaine / raison sociale — précis)
- **Classes / désignation produits-services** depuis le registre
- **Titulaire**
- **Statut** (enregistrée / déposée / abandonnée / déchue — une marque
  morte n'est pas un obstacle mais peut être pertinente pour la renommée
  ou les droits d'un prédécesseur)
- **Date de dépôt si disponible**

**Pas de supplémentation silencieuse.** Si on cite un numéro INPI, il vient
de la recherche exécutée ; si on décrit une marque que l'utilisateur a
mentionnée, le dire. Ne jamais inventer un numéro et ne jamais "remplir"
un détail que le record ne supporte pas. Si la recherche n'a pas retourné
une date de dépôt, écrire "date de dépôt non disponible dans le résultat"
— ne pas deviner.

---

## Balayage des familles adjacentes (requis avant de conclure)

Une recherche qui ne couvre que les exacts et les très proches manque les
marques qu'un concurrent a adoptées *parce que* la vôtre était prise. Avant
de conclure, identifier 3-5 familles adjacentes à balayer et **demander
confirmation** à l'utilisateur.

Familles adjacentes = substituts catégorie-conventionnels qu'un concurrent
raisonnable considérerait quand le signe direct est indisponible.

### Pour un signe comme `NEXUS HOME` (smart home), familles minimales :

- **Synonymes catégoriels** de NEXUS : `HUB`, `NEST`, `CORE`, `LINK`,
  `CONNECT`, `BRIDGE`, `CENTRAL`, `GATEWAY`.
- **Noms style assistant** dans la catégorie : `ALEXA`, `ECHO`, `SIRI`,
  `GOOGLE HOME`, `CORTANA`, `HOMEY`, `HOMEBASE`.
- **Variantes HOME / HOUSE / SMART** : `SMART HOME`, `HOUSEHOLD`, `HOUSE`,
  `MAISON`, `CASA`, `DOM`.
- **Jumeaux phonétiques FR** sur la racine : `NEXIS`, `NEXXUS`, `NECTIS`.

### Quand des juridictions non-anglophones sont visées

L'analyse phonétique uniquement EN manque la source la plus fréquente de
conflits cross-border. Ajouter :

- **Équivalents traduits** : signe traduit dans EN / ES / IT / DE (top 5
  langues EU TMview). **Doctrine des équivalents étrangers EUIPO** —
  jurisprudence Matratzen Concord T-6/01 traite la traduction comme la
  même marque pour le risque de confusion.
- **Translitération** : signe écrit dans le script pertinent (Cyrillic,
  CJK, arabe). Équivalence phonétique entre scripts est une base de
  conflit reconnue.
- **Variations de script** : marques enregistrées dans un script non-Latin
  qui sonnent comme votre signe en romanisation.

Si l'analyse cross-langue n'est pas faisable, dire : "Analyse phonétique
cross-langue et équivalents traduits non effectuée — c'est la source la
plus fréquente de conflits cross-border. Une recherche professionnelle
en [juridiction] doit l'inclure."

### Bloc de confirmation

Sortir un bloc avant de conclure :

> **Familles adjacentes à balayer (confirmer ou compléter) :**
>
> - [famille 1 — ex. HUB / NEST / LINK / CONNECT]
> - [famille 2 — ex. ALEXA-style assistant names]
> - [famille 3 — ex. HOME / HOUSE / SMART variants]
> - [famille 4 — jumeaux phonétiques FR sur la racine]
> - [famille 5 — équivalents traduits EN/ES/IT/DE si EU visé]
>
> Une recherche qui ne checke que exact + proche manque les marques qu'un
> concurrent a adoptées parce que la vôtre était prise. Confirmer cette
> liste avant que je continue.

Si MCP marques connecté, **re-exécuter** la recherche sur chaque famille
confirmée et ajouter les résultats à la table similaires avec source
"Famille adjacente : [famille]". Sinon, lister explicitement les familles
comme input next-step pour la recherche professionnelle complète — ne pas
sauter silencieusement.

---

## Appréciation globale du risque de confusion

> **Cadre FR/UE — pas de test multi-facteurs US.** La CJUE applique
> l'**appréciation globale** (Sabel/Puma C-251/95, Canon C-39/97, Lloyd
> Schuhfabrik C-342/97) — interdépendance des facteurs analysée du point
> de vue du **consommateur moyen normalement informé, raisonnablement
> attentif et avisé**.
>
> Ne JAMAIS appliquer du Pont / Polaroid / Sleekcraft à des faits FR/UE.

Pour chaque facteur, produire un **signal**, pas un verdict. Chaque facteur
dit ce qui pèse de chaque côté et où est l'incertitude :

- **Similitude des signes** (visuelle / auditive / conceptuelle / impression
  d'ensemble). Considérées **ensemble**, pas isolément (CJUE Sabel).
- **Similitude des produits/services** (Canon). Pas l'identité — la
  perception du consommateur quant à une origine commune.
- **Pouvoir distinctif** intrinsèque + acquis par usage de la marque
  antérieure. Une marque renommée a une protection plus large.
- **Public concerné et niveau d'attention**. Achat impulsif vs. achat
  délibéré professionnel change le standard.
- **Principe d'interdépendance** : faible similitude des signes peut être
  compensée par forte similitude des produits, et inversement (Canon).

Conformément à `## Posture de décision sur jugements subjectifs` du
`CLAUDE.md` :

- **Ne JAMAIS conclure "absence de risque de confusion".**
- Si incertain, écrire : "Marques similaires trouvées ; appréciation à mener
  par l'avocat avant adoption." OU "Facteurs ambigus ; jugement avocat
  requis."
- "Aucune marque similaire trouvée dans les bases interrogées" est
  acceptable *uniquement* si une vraie recherche a été exécutée — sinon
  bucket "Aucune base interrogée".

---

## Recommandations & prochaines étapes

Chaque sortie ferme par des prochaines étapes concrètes, bucketées :

- **Si knockout flaggé** : reformuler le signe, ou accepter le caractère
  descriptif et planifier l'acquisition de distinctivité par usage ;
  router vers mandataire/avocat avant adoption.
- **Si marques similaires trouvées en bases** : revue avocat requise avant
  adoption, dépôt ou marketing. Souvent étape suivante = recherche
  professionnelle complète.
- **Si aucune marque similaire mais aucune base interrogée** : recherche
  complète requise avant adoption. Nommer les bases qu'il faut hit.
- **Si marques similaires mais titulaire faible / abandonné / classe
  différente** : flag pour revue avocat — le triage ne fait pas ce call.
- **Toujours** : opinion de disponibilité complète d'un mandataire/avocat,
  proportionnée à l'investissement que portera le signe. Une marque qui
  ira sur une gamme produit + une campagne TV pèse plus qu'une marque pour
  un pop-up unique.

---

## Format de sortie

Préfixer l'en-tête confidentialité depuis `CLAUDE.md` `## Sorties standardisées`.

````markdown
[EN-TÊTE CONFIDENTIALITÉ — selon rôle]

# Recherche d'antériorité marque — Premier passage (PAS UNE OPINION)

> **Premier passage, pas une opinion de disponibilité.** [paragraphe garde-fou
> en tête, reformulé tel quel]

> **⚠️ Note du relecteur**
> - **Sources :** [INPI Data ✓ vérifié | EUIPO TMview ✓ | OMPI ✗]
> - **Lu :** [N résultats sur N]
> - **Signalé :** [N éléments [review]]
> - **Fraîcheur :** [base INPI vendredi YYYY-MM-DD]
> - **Avant de s'appuyer :** [1-2 actions concrètes]

**Triage :** 🟢 VERT / 🟡 ORANGE / 🔴 ROUGE — une phrase pourquoi

## Signe proposé

- **Signe :** [texte exact, stylisation notée]
- **Type :** [mot / figuratif / composite]
- **Produits / services :** [description]
- **Classes Nice :** [numéros + libellés courts]
- **Territoires :** [FR / EU / Madrid / pays]
- **Cadre confusion appliqué :** Appréciation globale CJUE (Sabel/Canon/Lloyd)

## Knockout — motifs absolus L.711-2 CPI

| Motif | Flag | Note |
|---|---|---|
| Caractère distinctif (1°) | [aucun / flaggé] | [si flaggé : 1 ligne] |
| Descriptif (2°) | ... | ... |
| Devenu usuel (3°) | ... | ... |
| Forme imposée (5°) | ... | ... |
| Atteinte ordre public (7°) | ... | ... |
| Trompeur (8°) | ... | ... |

## Recherche similaires

**Bases interrogées :** [INPI Data 2026-05-12 (classes 25,35) | EUIPO TMview
2026-05-12 (offices EM,FR) | OMPI non interrogé]
**Scope :** [classes, exact-vs-fuzzy, figuratif inclus ou non]

**Familles adjacentes balayées (confirmées avec utilisateur) :**
- [famille 1]
- [famille 2]
- [famille 3]
- [famille 4]

*Si aucune famille n'a été balayée (pas de connecteur, temps), elles sont
listées explicitement comme next-step pour la recherche professionnelle
complète — pas silencieusement skip.*

| Marque | Source | Classes | Titulaire | Statut | Date dépôt | Note |
|---|---|---|---|---|---|---|
| [exact] | [num INPI / EUTM / autre] | [classes] | [titulaire] | [statut] | [date / non disp.] | [pourquoi ça compte — exact / famille adjacente] |

*Si aucune recherche n'a été exécutée :* **Aucune base de données interrogée.**
[bloc fallback complet]

## Appréciation globale du risque de confusion — éléments pour avocat

| Facteur (CJUE) | Signal | Direction |
|---|---|---|
| Similitude des signes (visuelle/auditive/conceptuelle/ensemble) | [note] | [pèse vers / contre conflit / mixte] |
| Similitude des produits/services (Canon) | [note] | [direction] |
| Pouvoir distinctif intrinsèque + acquis | [note] | [direction] |
| Public concerné + niveau d'attention | [note] | [direction] |
| Interdépendance | [note] | [direction] |

**Conclusion :** *Ce skill ne conclut pas.* Une de :
- "Marques similaires trouvées ; appréciation à mener par l'avocat avant adoption."
- "Aucune marque similaire dans les bases interrogées ; recherche complète requise avant adoption."
- "Facteurs ambigus ; jugement avocat requis."

## Recommandations & prochaines étapes

- [étape 1 — ex. "Recherche professionnelle complète Data INPI exhaustive +
  EUIPO TMview tous offices + OMPI ROMARIN avant adoption"]
- [étape 2 — ex. "Design-around revue de la marque APEXLEAF en classe 25 si
  intent procéder"]
- [étape 3 — ex. "Reformuler le signe — actuel descriptif, requiert
  acquisition de distinctivité"]
- [routing depuis le profil — mandataire INPI ou avocat PI]

## Vérification des citations

Chaque numéro INPI, numéro EUTM, citation jurisprudence et résultat de base
dans ce mémo doit être vérifié contre la source autoritative avant que l'on
s'y appuie. Les numéros, classifications et dates de dépôt sont les sites
les plus fréquents d'erreur. Ne pas citer un résultat qu'on ne peut pas
ouvrir.

**Une question hors de ma checklist :** [observation seconde-ordre — omis si rien]

## Que veux-tu faire ?

1. **Préparer le dépôt** — je rédige le projet de dépôt INPI ou EUIPO
2. **Escalader** — note pour [approbateur du profil]
3. **Compléter les faits** — questions au PM / client / engineering
4. **Surveiller et attendre** — j'ajoute au tracker (V1.1 `bopi-watcher`)
5. **Autre chose** — dis-moi
````
