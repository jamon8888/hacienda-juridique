---
name: preparation-depot-brevet
description: >
  Aide à la préparation d'un dossier de dépôt brevet (FR national, EP via OEB,
  ou PCT). Structure description, revendications (indépendantes + dépendantes),
  abrégé, conformément à CPI L.611-1 et Règlement CBE / PCT. NE dépose PAS —
  la décision, la rédaction finale et le dépôt formel restent au mandataire
  en brevets (EQE) ou à l'avocat. Brouillon technique d'aide à la rédaction.
argument-hint: "[description invention | classes CIB | territoire FR/EP/PCT]"
---

# /preparation-depot-brevet

**Préparation ≠ dépôt.** Ce skill produit un **brouillon technique** structuré
pour aider le mandataire en brevets ou l'avocat. Il NE rédige PAS le brevet
final, NE choisit PAS les revendications définitives, NE dépose PAS auprès de
l'INPI / OEB / WIPO. La rédaction des revendications est une **discipline
technico-juridique** où chaque mot a une conséquence sur 20 ans de protection
ou de contestabilité. **Un brevet mal rédigé est invalidable en contentieux.**

## Examples

```
/hacienda-propriete-intellectuelle:preparation-depot-brevet "Procédé de filtration membranaire à base de polymère greffé X — CIB B01D 71/02 — FR + EP"
```

```
/hacienda-propriete-intellectuelle:preparation-depot-brevet "Dispositif médical implantable mesure glycémie continue — CIB A61B 5/145 — PCT"
```

```
/hacienda-propriete-intellectuelle:preparation-depot-brevet
```

(Le skill demandera la description fonctionnelle, le domaine technique, les
modes de réalisation, l'art antérieur connu, les territoires cibles, la date
de divulgation prévue, et l'identité de l'inventeur et du déposant.)

---

## PRÉPARATION TECHNIQUE, PAS RÉDACTION FINALE

**Reformuler en tête de chaque output. Ne jamais l'enlever. Ne jamais l'adoucir.**

> **Préparation technique, pas rédaction finale.** Ce brouillon est une
> ossature de dossier de dépôt brevet (description structurée selon CPI
> L.611-1, revendications candidates, abrégé, classification CIB indicative,
> territoire envisagé). Il NE remplace PAS la rédaction par un **mandataire
> en brevets** inscrit à l'OEB (qualifié EQE) ou un **avocat spécialisé en
> propriété industrielle**. La rédaction des revendications, en particulier,
> est une discipline où chaque mot pèse sur 20 ans de protection. Un terme
> trop large rend la revendication attaquable pour insuffisance de
> description ou défaut de nouveauté ; un terme trop étroit donne une
> protection facile à contourner. **Un brevet mal rédigé est invalidable en
> contentieux** — et la rectification post-délivrance est encadrée (Art. 123
> CBE, L.613-24 CPI) avec interdiction d'extension de l'objet. Ce skill
> propose ; le mandataire décide, rédige et dépose.

C'est le garde-fou le plus visible du skill. Une revendication trop large
finalisée sans relecture = porte à sens unique (refus, ou délivrance avec
brevet vulnérable). Sur-flagger = porte à 2 sens, le mandataire élague.
Rester sur la porte à 2 sens.

---

## Charger le profil pratique avant de commencer

Avant tout, lire :
1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Récupérer :
- **Rôle** depuis `## 1. Profil cabinet et profil de pratique PI` (avocat
  inscrit / mandataire en brevets EQE / mandataire en marques INPI / juriste
  interne / non-juriste — change l'en-tête confidentialité ET la formulation
  des avertissements en pied de brouillon).
- **Juridictions et offices d'inscription** (INPI, OEB, OMPI/PCT) → défaut
  territoires si l'utilisateur n'en spécifie pas.
- **Domaines techniques principaux** (mécanique / chimie / pharma / biotech /
  informatique / électronique / télécom) → pondère la formulation du domaine
  technique de la description et la sélection de la CIB.
- **Mandataire en brevets associé** (depuis la table mandataires externes du
  profil) → identifié explicitement dans la section "Étapes suivantes" et
  dans le brief gate non-juriste.
- **Posture enforcement** par défaut → calibre la largeur initiale de la
  revendication indépendante (agressive = revendication la plus large
  défendable ; conservatrice = revendication étroite et solide).
- **Matrice d'approbateurs** pour les escalades de validation pré-dépôt.

Si le profil contient `[A CONFIGURER]`, surfacer :

> Le profil pratique n'est pas configuré — c'est ce qui adapte le territoire
> par défaut, les domaines techniques, le mandataire en brevets associé et
> la chaîne d'approbation à votre cabinet ou service.
>
> **Deux choix :**
> - Lancer `/hacienda-propriete-intellectuelle:entretien-demarrage` (10-15 min)
> - Dire **"provisoire"** et je lance avec les défauts génériques (rôle
>   avocat, FR + EP, posture mesurée, domaines techniques tous, sans
>   mandataire pré-désigné) — chaque sortie sera taggée `[PROVISOIRE —
>   configurer le profil pour une sortie sur mesure]`.

### Mode provisoire

Si l'utilisateur dit "provisoire", lancer normalement avec : posture mesurée,
rôle avocat, FR + EP, domaines techniques tous, pas de mandataire désigné.
Tagger la note du relecteur et chaque finding `[PROVISOIRE]`. À la fin,
ajouter :

> "C'était un run générique avec les hypothèses par défaut. Lancer
> `/hacienda-propriete-intellectuelle:entretien-demarrage` pour calibrer sur
> VOTRE pratique — votre mandataire en brevets associé, vos juridictions de
> dépôt usuelles, vos domaines techniques."

---

## Intake

Demander en un seul batch (pas de jeu de questions à rallonge) :

> Quelques questions avant de structurer le dossier de dépôt :
>
> 1. **Description fonctionnelle de l'invention.** Le **problème technique**
>    résolu + la **solution** apportée, en 3-5 phrases. Pas le pitch
>    commercial — la substance technique : quelles entrées, quel traitement,
>    quelles sorties, quel effet technique mesurable.
> 2. **Domaine technique + classification CIB probable.** Si la CIB est
>    connue (ex. `B01D 71/02`, `A61B 5/145`), la fournir. Sinon décrire le
>    domaine et je proposerai les codes hiérarchiques — tu confirmes.
> 3. **Mode(s) de réalisation envisagé(s).** Au moins un, idéalement 2-3
>    variantes. Plus tu fournis de modes, plus la description est solide
>    (suffisance de description — L.612-5 CPI) et plus la matière à
>    revendications dépendantes est riche.
> 4. **Art antérieur connu de l'inventeur.** Publications, brevets,
>    produits, thèses, conférences déjà identifiés. La distinction se
>    formule par rapport à ce qui existe — sans connaître l'art antérieur,
>    la revendication 1 sera soit trop large (couvrant l'existant), soit
>    trop étroite (par sur-précaution). Si pas de recherche faite, je
>    recommanderai `/recherche-anteriorite-brevet` avant de figer.
> 5. **Territoires cibles prioritaires.** FR national (INPI) / EP (OEB
>    désignant FR + UE) / PCT international (phase nationale à 30 mois).
>    Défaut depuis le profil. Le choix territoire conditionne la stratégie
>    (priorité de l'Union de Paris à 12 mois, taxes, langue de procédure).
> 6. **Date de divulgation publique** envisagée ou déjà eue. **Critique** :
>    toute divulgation antérieure au dépôt détruit la nouveauté (L.611-11
>    CPI, Art. 54 CBE), sauf délai de grâce limité (L.611-13 CPI : 6 mois
>    pour abus évident ou exposition officielle reconnue). Une démo
>    publique, une publication scientifique, un communiqué de presse, une
>    présentation à un investisseur sans NDA — tout ceci compte.
> 7. **Inventeur(s) et déposant.** Les inventeurs (personnes physiques) et
>    le déposant (personne morale ou physique) sont distincts. Si l'invention
>    a été faite par un salarié, vérifier le régime de l'invention de
>    salarié (L.611-7 CPI) : invention de mission, hors mission attribuable,
>    hors mission non attribuable — chacun a un régime distinct de cession
>    et de rémunération supplémentaire. Sans cession claire, le dépôt par
>    l'employeur peut être contesté en revendication de propriété.

Attendre la réponse. Si la **description fonctionnelle est vague** (< 50
mots, "appli IA", "nouveau matériau" sans précision), pousser une fois :

> Donne ce que l'invention fait techniquement — quelles entrées, quel
> traitement, quelles sorties, quel effet technique mesurable, et en quoi
> ça résout un problème objectif que l'état antérieur de la technique ne
> résout pas. La description du brevet et la revendication indépendante en
> dépendent directement. Sans précision technique, le brouillon sera soit
> creux (description insuffisante au sens L.612-5), soit purement
> spéculatif (revendications non supportées au sens L.611-1).

---
