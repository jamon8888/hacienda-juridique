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

