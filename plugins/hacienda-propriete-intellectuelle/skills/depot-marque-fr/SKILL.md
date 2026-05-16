---
name: depot-marque-fr
description: >
  Aide à la préparation d'un dossier de dépôt marque (FR INPI, EU EUTM via
  EUIPO, ou international via Madrid OMPI). Structure le choix du signe, des
  classes Nice, des libellés produits/services et du territoire conformément
  à CPI L.711-1 et L.711-2. NE dépose PAS — la décision, la rédaction finale
  des libellés et le dépôt formel restent au mandataire en marques (CPI
  L.422-4) ou à l'avocat. Brouillon technique d'aide à la rédaction.
argument-hint: "[signe | classes Nice | territoire FR/EU/Madrid]"
---

# /depot-marque-fr

**Préparation ≠ dépôt.** Ce skill produit un **brouillon technique** structuré
pour aider le mandataire en marques (CPI L.422-4) ou l'avocat. Il NE rédige
PAS le dossier final, NE paye PAS les taxes (~190€ FR INPI 1 classe / ~850€
EUTM 1 classe en 2026), NE dépose PAS auprès de l'INPI / EUIPO / OMPI. La
rédaction des libellés produits/services est une **discipline juridique** où
chaque mot conditionne 10 ans de protection — un libellé trop large = refus
partiel ou forclusion pour défaut d'usage (CPI L.714-5, 5 ans), trop étroit =
protection insuffisante face aux contrefacteurs.

## Examples

```
/hacienda-propriete-intellectuelle:depot-marque-fr "APEXLEAF — vêtements outdoor classes 25, 35 — FR + EU"
```

```
/hacienda-propriete-intellectuelle:depot-marque-fr
```

(Le skill demandera le signe, les classes Nice, les libellés produits/services,
les territoires, le déposant, le mandataire et la priorité éventuelle.)

```
/hacienda-propriete-intellectuelle:depot-marque-fr "NEXAFLOW logiciel SaaS — classe 9, 42 — --territoire EU"
```

---

## PRÉPARATION TECHNIQUE, PAS RÉDACTION FINALE

**Reformuler en tête de chaque output. Ne jamais l'enlever. Ne jamais l'adoucir.**

> **Préparation technique, pas rédaction finale.** Ce brouillon est une
> ossature de dossier de dépôt marque (signe + type au sens CPI L.711-1,
> classes Nice retenues, libellés produits/services candidats, territoire
> envisagé, déposant et mandataire identifiés). Il NE remplace PAS la
> rédaction par un **mandataire en marques inscrit à l'INPI** (CPI L.422-4)
> ou un **avocat spécialisé en propriété industrielle**. La rédaction des
> libellés produits/services, en particulier, est une discipline où chaque
> mot pèse sur 10 ans de protection renouvelable. Un libellé trop large
> sera refusé partiellement par l'examinateur INPI/EUIPO, ou subira la
> forclusion pour défaut d'usage sérieux passé 5 ans (L.714-5 CPI) ; un
> libellé trop étroit donne une protection facile à contourner. **Une
> marque mal préparée se traduit par un refus, une opposition gagnée par un
> tiers, ou une déchéance partielle.** Ce skill propose ; le mandataire
> décide, rédige et dépose.

C'est le garde-fou le plus visible du skill. Un libellé trop large finalisé
sans relecture = porte à sens unique (refus partiel ou déchéance ultérieure).
Sur-flagger = porte à 2 sens, le mandataire élague. Rester sur la porte à 2
sens.

---

## Charger le profil pratique avant de commencer

Avant tout, lire :
1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Récupérer :
- **Rôle** depuis `## 1. Profil cabinet et profil de pratique PI` (avocat
  inscrit / mandataire en marques INPI L.422-4 / juriste interne / non-juriste —
  change l'en-tête confidentialité ET la formulation des avertissements en
  pied de brouillon, et active le gate non-juriste si applicable).
- **Juridictions et offices d'inscription** (INPI, EUIPO, OMPI Madrid) →
  défaut territoires si l'utilisateur n'en spécifie pas. Pas d'inscription EU
  + non-résident UE = mandataire obligatoire pour EUTM/Madrid.
- **Mandataire en marques associé** (depuis la table mandataires externes du
  profil) → identifié explicitement dans la section "Étapes suivantes" et
  dans le brief gate non-juriste.
- **Posture dépôt** par défaut → calibre la largeur initiale des libellés
  produits/services (agressive = libellés larges couvrant les en-têtes de
  classe + extensions plausibles ; mesurée = libellés ciblés sur l'activité
  réelle + 1 extension stratégique ; conservatrice = libellés strictement
  alignés sur la commercialisation effective sous 5 ans).
- **Seuils business owner** (taille déposant, secteur, ambition territoriale)
  → conditionne la recommandation FR seul vs FR + EU vs Madrid.

Si le profil contient `[A CONFIGURER]`, surfacer :

> Le profil pratique n'est pas configuré — c'est ce qui adapte le territoire
> par défaut, le mandataire en marques associé, la posture de dépôt et la
> chaîne d'approbation à votre cabinet ou service.
>
> **Deux choix :**
> - Lancer `/hacienda-propriete-intellectuelle:entretien-demarrage` (10-15 min)
> - Dire **"provisoire"** et je lance avec les défauts génériques (rôle
>   avocat, FR + EU, posture mesurée, sans mandataire pré-désigné) — chaque
>   sortie sera taggée `[PROVISOIRE — configurer le profil pour une sortie
>   sur mesure]`.

### Mode provisoire

Si l'utilisateur dit "provisoire", lancer normalement avec : posture mesurée,
rôle avocat, FR + EU, pas de mandataire désigné. Tagger la note du relecteur
et chaque finding `[PROVISOIRE]`. À la fin, ajouter :

> "C'était un run générique avec les hypothèses par défaut. Lancer
> `/hacienda-propriete-intellectuelle:entretien-demarrage` pour calibrer sur
> VOTRE pratique — votre mandataire en marques associé, vos juridictions de
> dépôt usuelles, votre posture portefeuille."

---

## Intake

Demander en un seul batch (pas de jeu de questions à rallonge) :

> Quelques questions avant de structurer le dossier de dépôt :
>
> 1. **Signe.** Texte exact (orthographe, casse, accents), stylisation
>    éventuelle, et **type** au sens CPI L.711-1 étendu par l'ordonnance
>    2019-1169 : mot / figuratif / composite (mot + figuratif) / sonore /
>    position / multimédia / hologramme. Pour un signe figuratif ou composite,
>    fournir le visuel (PNG/JPG haute définition). Pour un signe sonore, le
>    fichier audio + une représentation graphique normalisée (portée musicale
>    ou sonogramme).
> 2. **Produits / services réels.** Ce qui sera réellement vendu sous le
>    signe, en 1 à 3 phrases. Pas le pitch commercial — la nature concrète
>    de l'offre : produit physique, logiciel SaaS, service de conseil,
>    formation, contenu numérique, vêtement, aliment, etc.
> 3. **Classes Nice connues.** Si les classes sont déjà identifiées, les
>    lister (numéros 1 à 45). Sinon je proposerai les classes probables à
>    partir de la description produits/services et tu confirmeras. La
>    classification Nice (édition 12, en vigueur 2026) distingue les classes
>    1-34 (produits) des classes 35-45 (services).
> 4. **Territoires.** FR INPI (France seule) / EU EUTM (27 États membres
>    via EUIPO) / Madrid OMPI (international, sélection de pays). Préciser
>    les pays désignés pour Madrid (États-Unis, Chine, Japon, Royaume-Uni,
>    Suisse, etc.). Défaut depuis le profil. **Madrid requiert une marque
>    de base FR ou EU déjà déposée ou enregistrée** — pas de dépôt Madrid
>    isolé.
> 5. **Déposant.** Raison sociale exacte + numéro SIREN si personne morale
>    + adresse complète (siège social). Ces éléments sont utilisés tels
>    quels sur le formulaire INPI/EUIPO — vérifier l'exactitude contre les
>    registres officiels (Infogreffe, registres consulaires) avant dépôt.
>    Pour une personne physique : nom, prénom, adresse, nationalité.
> 6. **Mandataire.** Avocat inscrit à un barreau français ou mandataire
>    inscrit à l'INPI (CPI L.422-4). **Obligatoire** pour EUTM si le
>    déposant n'est pas résident UE, fortement recommandé pour Madrid OMPI.
>    Pour FR INPI seul, optionnel si le déposant est résident UE.
> 7. **Priorité revendiquée.** Dépôt antérieur à invoquer au titre de la
>    Convention d'Union de Paris (Art. 4) : la priorité doit être revendiquée
>    dans les **6 mois post-priorité** pour les marques (à distinguer des
>    12 mois pour les brevets). Pertinent pour une stratégie internationale
>    en deux temps (par ex. FR puis EU à 6 mois en revendiquant la
>    priorité FR).

Attendre la réponse. Si la **description produits/services est vague**
(< 30 mots, "appli IA", "marque de mode" sans précision), pousser une fois :

> Donne ce qui sera concrètement vendu sous ce signe — produit physique,
> logiciel SaaS, service de conseil, vêtements (lesquels), aliments
> (lesquels), formation (sur quoi). Les classes Nice et la rédaction des
> libellés en dépendent directement. Sans précision, le brouillon sera soit
> trop large (refus partiel INPI/EUIPO), soit purement spéculatif (déchéance
> probable pour défaut d'usage à 5 ans, L.714-5 CPI).

---


## Recherche antériorité préalable

**Préalable obligatoire.** Un dépôt sans recherche d'antériorité préalable
expose à : (a) refus pour conflit avec marque antérieure identique sur classes
identiques (rare en examen INPI/EUIPO qui ne juge pas la confusion d'office,
mais bloquant en cas d'opposition), (b) opposition gagnée par un tiers
titulaire d'une marque similaire dans les 2 mois post-publication BOPI FR ou
3 mois post-Bulletin EUTM, (c) action en contrefaçon ultérieure si la marque
passe l'enregistrement mais empiète sur une marque non opposante.

**Action.**
- Si la recherche n'est PAS encore faite, **recommander
  `/hacienda-propriete-intellectuelle:recherche-anteriorite-marque`** avant
  d'aller plus loin. Refuser de produire un brouillon de dépôt tant que
  l'utilisateur n'a pas, au minimum, balayé les classes-cibles + les
  familles adjacentes pertinentes.
- Si la recherche a déjà été faite, demander à l'utilisateur de **coller le
  rapport** (output Markdown du skill `recherche-anteriorite-marque`) ou de
  **pointer le fichier** dans
  `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/`.
  Intégrer les résultats dans la note du relecteur (cote 🟢/🟡/🔴 reportée
  comme PLANCHER selon §4 Garde-fous partagés du `CLAUDE.md`).
- Si la recherche est partielle (FR seul alors que dépôt visé FR + EU), le
  signaler comme `[review]` et recommander l'extension du périmètre de
  recherche AVANT le dépôt.

---

## Vérification des motifs absolus L.711-2 CPI

L'article L.711-2 du Code de la propriété intellectuelle (transposition de
la directive UE 2015/2436) énumère les motifs intrinsèques qui condamnent
un signe **indépendamment de toute antériorité tierce**. Pour chaque motif,
évaluer franchement et flagger. Ne pas rationaliser un problème évident :
un refus INPI/EUIPO sur motif absolu = perte des taxes (~190€ FR, ~850€
EUTM) + signal négatif pour le mandataire et le déposant.

| Motif (L.711-2 CPI) | Ce que ça veut dire | Flagger quand |
|---|---|---|
| **Caractère distinctif insuffisant** (1°) | Le signe ne permet pas d'identifier un produit ou service comme provenant d'une entreprise déterminée | Le signe désigne directement le type de produit ou ne se distingue pas du langage courant du secteur |
| **Descriptif** (2°) | Décrit l'espèce, la qualité, la quantité, la destination, la valeur, la provenance géographique ou l'époque de la production | Un consommateur lit le signe et comprend ce que fait le produit sans aucun effort d'imagination |
| **Devenu usuel** (3°) | Entré dans le langage courant ou les habitudes loyales et constantes de la profession | Mot devenu synonyme générique de la catégorie (ex. "frigidaire" pour réfrigérateur) |
| **Forme imposée** (5°) | Forme imposée par la nature, la fonction technique ou conférant une valeur substantielle au produit | Marque figurative tridimensionnelle — et la forme assure une fonction ou est inhérente au produit |
| **Atteinte à l'ordre public / bonnes mœurs** (7°) | Symboles d'État protégés (art. 6ter Convention de Paris), AOP/IGP non autorisées, signes choquants, contraires à l'ordre public | Le signe contient un emblème officiel non autorisé, une appellation protégée, ou un élément manifestement choquant |
| **Trompeur** (8°) | De nature à tromper le public sur la nature, la qualité ou la provenance géographique du produit ou service | Le signe suggère une qualité, origine ou caractéristique que le produit n'a pas, et cette qualité importerait au consommateur dans sa décision d'achat |

**Note importante — acquisition de distinctivité par usage** (L.711-2,
dernier alinéa). Si le signe est descriptif ou faiblement distinctif mais
que l'utilisateur souhaite quand même déposer, mentionner la stratégie
d'**acquisition de distinctivité par l'usage** : preuves d'usage sérieux et
prolongé (chiffres d'affaires, parts de marché, sondages de notoriété,
investissement publicitaire) permettant de démontrer que le public pertinent
identifie le signe comme provenant d'une entreprise déterminée. Cette
stratégie est lourde, coûteuse et longue (typiquement 5+ ans d'usage
intensif), et ne fonctionne que pour les motifs 1°, 2° et 3° (pas pour les
motifs 5°, 7°, 8°). À cadrer avec le mandataire.

**Sortie attendue.** Pour chaque motif, soit "aucun problème identifié",
soit un flag spécifique avec une ligne de raison. Ne pas produire un tableau
plat de "pass" — distinguer ce qui a été regardé activement de ce qui est
non-applicable.

---
