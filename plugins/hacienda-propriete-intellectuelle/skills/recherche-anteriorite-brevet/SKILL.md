---
name: recherche-anteriorite-brevet
description: >
  Premier passage de recherche d'antériorité brevet (knockout exclusions
  L.611-10 CPI + recherche INPI Brevets / OEB Espacenet + appréciation
  nouveauté et activité inventive selon l'approche problème-solution OEB) —
  produit une liste de signaux pour décision mandataire en brevets ou avocat,
  jamais une opinion de brevetabilité ni de liberté d'exploitation. Utiliser
  pour une nouvelle invention, des codes CIB nouveaux, ou avant un dépôt
  FR/EP/PCT. Ce skill ne conclut JAMAIS qu'une invention est brevetable.
argument-hint: "[description invention | codes CIB | territoires FR/EP/PCT]"
---

# /recherche-anteriorite-brevet

**Ce n'est PAS une opinion de brevetabilité ni FTO (Liberté d'Exploitation).**
Une opinion de brevetabilité exige une recherche professionnelle exhaustive
(Data INPI + OEB Espacenet + Google Patents + littérature non-brevet) et le
jugement d'un **mandataire en brevets** inscrit à l'OEB (EQE) ou d'un avocat
spécialisé PI. "Aucune antériorité évidente" issu de ce skill = le triage n'a
rien trouvé. Cela ne veut pas dire que l'invention est brevetable. *Des
inventeurs ont perdu des années de R&D sur des brevets refusés pour
antériorité que le triage n'avait pas trouvée.*

## Examples

```
/hacienda-propriete-intellectuelle:recherche-anteriorite-brevet "Procédé de filtration membranaire à base de polymère X — CIB B01D 71/02 — FR + EP"
```

```
/hacienda-propriete-intellectuelle:recherche-anteriorite-brevet "Algorithme de compression vidéo basé sur réseau de neurones — CIB H04N 19, G06N 3 — PCT"
```

```
/hacienda-propriete-intellectuelle:recherche-anteriorite-brevet
```

(Le skill demandera la description, la classification CIB, la date de priorité et les territoires.)

---

## CECI EST UN PREMIER PASSAGE, PAS UNE OPINION DE BREVETABILITÉ

**Reformuler en tête de chaque output. Ne jamais l'enlever. Ne jamais l'adoucir.**

> **Premier passage, pas une opinion de brevetabilité.** Une opinion de
> brevetabilité exige une recherche professionnelle exhaustive (Data INPI
> brevets, OEB Espacenet OPS sur 160M+ documents mondiaux, Google Patents,
> WIPO PatentScope, et la **littérature non-brevet** — Google Scholar, IEEE,
> bases sectorielles), suivie d'une analyse revendication par revendication
> par un **mandataire en brevets** inscrit à l'OEB (qualifié EQE) ou d'un
> avocat spécialisé en propriété industrielle. "Aucune antériorité évidente"
> issu de ce skill = le triage n'a rien trouvé dans les bases interrogées.
> Cela ne veut pas dire que l'invention est nouvelle, ni qu'elle implique
> une activité inventive, ni qu'elle est brevetable. Cela ne dit RIEN sur
> la liberté d'exploitation (FTO) — un brevet en vigueur d'un tiers peut
> bloquer l'exploitation même d'une invention brevetable. Un mandataire en
> brevets ou un avocat évalue avant tout dépôt, toute communication
> publique, ou tout investissement industriel.

C'est le garde-fou le plus visible du plugin. Sous-flagger une antériorité
= porte à sens unique (R&D engagée, demande déposée, communication publique
faite, brevet accordé puis annulé en nullité, tous avec une antériorité
dessous). Sur-flagger = porte à 2 sens, le mandataire élague en revue.
Rester sur la porte à 2 sens.

---

## Charger le profil pratique avant de commencer

Avant tout, lire :
1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Récupérer :
- **Rôle** depuis `## 1. Profil cabinet et profil de pratique PI` (avocat
  inscrit / mandataire en brevets EQE / mandataire en marques INPI / juriste
  interne / non-juriste — change l'en-tête confidentialité ET le périmètre
  du secret professionnel).
- **Juridictions et offices d'inscription** (INPI, OEB, OMPI/PCT — défaut
  territoires si l'utilisateur n'en spécifie pas).
- **Domaines techniques principaux** depuis le secteur des clients dominants
  (mécanique / chimie / pharma / biotech / informatique / électronique /
  télécom — pondère la lecture des CIB et la pertinence des familles
  voisines).
- **Partenaire annuités** (essentiel : un brevet sans paiement d'annuités
  tombe en domaine public — mentionne dans la sortie qui suivra le portefeuille).
- **Posture FTO (liberté d'exploitation)** depuis la posture enforcement par
  défaut (agressive / mesurée / conservatrice — calibre le ton des recommandations).
- **Matrice d'approbateurs** pour les escalades.

Ce skill ne conclut JAMAIS "invention brevetable" ni "liberté d'exploitation
acquise".

Si le profil contient `[A CONFIGURER]`, surfacer :

> Le profil pratique n'est pas configuré — c'est ce qui adapte la posture, les
> juridictions, les domaines techniques et la chaîne d'approbation à votre
> cabinet ou service.
>
> **Deux choix :**
> - Lancer `/hacienda-propriete-intellectuelle:entretien-demarrage` (10-15 min)
> - Dire **"provisoire"** et je lance avec les défauts génériques (rôle
>   avocat, FR + EP, posture mesurée, domaines techniques tous, sans
>   playbook) — chaque sortie sera taggée `[PROVISOIRE — configurer le
>   profil pour une sortie sur mesure]`.

### Mode provisoire

Si l'utilisateur dit "provisoire", lancer normalement avec : posture mesurée,
rôle avocat, FR + EP, domaines techniques tous, pas de playbook (analyse
complète plutôt que matching contre une position list). Tagger la note du
relecteur et chaque finding `[PROVISOIRE]`. À la fin, ajouter :

> "C'était un run générique avec les hypothèses par défaut. Lancer
> `/hacienda-propriete-intellectuelle:entretien-demarrage` pour calibrer sur
> VOTRE pratique — votre playbook, vos juridictions, vos domaines techniques,
> votre tolérance au risque sur la FTO."

---

## Intake

Demander en un seul batch (pas de jeu de questions à rallonge) :

> Quelques questions avant le triage :
>
> 1. **Description de l'invention.** Le **problème technique** que résout
>    l'invention + la **solution** apportée, en 2-3 phrases. Pas le pitch
>    commercial — la substance technique.
> 2. **Domaine technique principal + classification CIB.** Si la CIB est
>    déjà connue (ex. `B01D 71/02` ou `H04N 19/176`), la fournir. Sinon
>    décrire le domaine et je proposerai les codes probables — tu confirmes.
> 3. **Date de priorité visée.** Date de premier dépôt envisagée, ou date
>    de divulgation publique imminente. **Critique** : tout art antérieur
>    publié avant cette date détruit la nouveauté ; tout ce qui est publié
>    après est hors-jeu (sauf demandes antérieures non publiées au sens
>    Art. 54(3) CBE — citation de classe E).
> 4. **Territoires cibles.** FR national (INPI) / EP (OEB désignant FR + UE) /
>    PCT international (phase nationale ultérieure). Défaut depuis le
>    profil.
> 5. **Art antérieur déjà connu de l'inventeur.** Publications
>    scientifiques, brevets concurrents, produits commercialisés, thèses,
>    conférences — tout ce que l'inventeur a déjà identifié. Une recherche
>    qui ignore le contexte connu de l'inventeur passe à côté de
>    l'évidence.

Attendre la réponse. Si la description est vague ("appli IA",
"nouveau matériau"), pousser une fois :

> Donne ce que l'invention fait techniquement — quelles entrées, quel
> traitement, quelles sorties, quel effet technique mesurable. La CIB et
> les antériorités pertinentes en dépendent. Sans précision technique, le
> triage cherchera dans le mauvais voisinage.

---

## Knockout — exclusions de brevetabilité L.611-10 CPI

Avant toute recherche en bases, vérifier les exclusions intrinsèques qui
condamnent une invention indépendamment de toute antériorité. L'article
L.611-10 du Code de la propriété intellectuelle (transposition Art. 52 CBE)
liste ce qui n'est **pas considéré comme une invention**, et ce qui est
**exclu de la brevetabilité** pour des raisons éthiques ou de politique
publique. Pour chaque exclusion, évaluer franchement et flagger. Ne pas
rationaliser un problème évident.

| Exclusion (L.611-10 CPI) | Ce que ça veut dire | Flagger quand |
|---|---|---|
| **Découvertes, théories scientifiques** | Loi naturelle pure, observation sans application | L'invention = observation d'un phénomène (constante physique, séquence génétique non isolée) sans procédé ou produit technique exploitant cette observation |
| **Méthodes mathématiques** | Algorithme abstrait sans effet technique | Formule, méthode de calcul ou modèle décrit sans application technique tangible (signal traité, machine commandée, mesure physique transformée) |
| **Créations esthétiques** | Œuvres de l'esprit | Apparence, forme purement décorative — relève du droit d'auteur ou du dessin et modèle, pas du brevet |
| **Plans, principes, méthodes** (intellectuelles, commerciales, jeux) | Business methods, règles de jeu, schémas d'enseignement | Pas de mise en œuvre technique — règle abstraite appliquée par l'humain ou par un ordinateur générique sans effet technique sur la machine elle-même |
| **Logiciel "en tant que tel"** | Algorithme pur sans effet technique sortant du domaine logiciel | Programme dont la contribution se limite au flux d'instructions, sans effet technique sur le système (traitement signal, contrôle processus, économie ressource physique mesurable). **Distinct des inventions mises en œuvre par ordinateur (CIB G06F) qui restent brevetables si elles résolvent un problème technique** — cf. OEB *Vicom* T-208/84 (1987), confirmé *IBM* T-1173/97 (1998) |
| **Présentations d'informations** | Affichage UI sans solution technique | Mise en forme d'information à l'attention de l'utilisateur sans résolution d'un problème technique (le contenu informationnel n'est pas en soi brevetable) |
| **Méthodes chirurgicales, thérapeutiques, de diagnostic** (sur corps humain ou animal) | Acte médical exécuté sur le corps | Méthode pratiquée par un praticien sur un patient. **À distinguer** : les **produits et dispositifs** (médicaments, implants, instruments) eux-mêmes restent brevetables (L.611-16 CPI, Art. 53(c) CBE) — seule la *méthode* est exclue |

**Note importante sur le logiciel.** La jurisprudence OEB (notamment *Vicom*
T-208/84 et la lignée qui suit) a établi que le critère opérationnel est la
présence d'un **effet technique supplémentaire** (further technical effect)
au-delà des interactions normales entre logiciel et matériel. Un algorithme
de compression d'image qui réduit l'occupation mémoire d'un capteur,
un protocole qui économise la batterie d'un IoT, un contrôleur PID
implémenté en logiciel : ce sont des inventions mises en œuvre par
ordinateur classées en CIB G06F (informatique) ou H04 (télécommunications)
et brevetables. À l'inverse, une méthode de comptabilité analytique
implémentée par un tableur reste un business method non-brevetable, même
emballée en logiciel.

**Note importante sur le médical.** L'exclusion porte sur la *méthode*
appliquée *in vivo* (sur le corps). Un médicament (substance + posologie),
un implant, un dispositif de diagnostic *in vitro*, un nouvel usage
thérapeutique d'une substance connue (revendication de type "swiss-type" ou
de type EPC 2000) restent brevetables. La frontière est jurisprudentielle —
flagger en `[review]` toute invention qui mêle dispositif et méthode.

**Sortie** : pour chaque exclusion, soit "aucun problème identifié", soit un
flag spécifique avec une ligne de raison. Ne pas produire un tableau plat de
"pass" sans analyse — l'objectif est de forcer l'inventeur et le mandataire
à objectiver chacun des 7 motifs avant de dépenser en recherche d'antériorité.

---
