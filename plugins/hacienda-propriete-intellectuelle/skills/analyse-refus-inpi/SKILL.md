---
name: analyse-refus-inpi
description: >
  Analyse une notification de refus INPI (rapport de recherche préliminaire,
  notification de motifs de refus art. R.612-66 CPI) ou une Communication
  OEB selon Règle 132 EPC. Classifie les citations art antérieur (X/Y/A/E),
  identifie caractéristiques distinctives, propose stratégies d'amendement,
  produit un projet de réponse argumentée. NE répond PAS officiellement —
  validation mandataire en brevets (EQE) ou avocat requise avant envoi INPI/OEB.
argument-hint: "[num brevet | notification INPI/OEB | délai réponse restant]"
---

# /analyse-refus-inpi

**Analyse ≠ réponse officielle.** Ce skill produit une **analyse argumentaire**
pour aider le mandataire en brevets inscrit OEB (EQE — European Qualifying
Examination) ou l'avocat spécialisé. Il NE répond PAS officiellement à
l'INPI/OEB, NE dépose PAS l'amendement, NE plaide PAS en audition orale
(chambres de recours OEB). **Délais fermes** :

- INPI ~2-4 mois selon notification (art. R.612-66 CPI), prorogation 2 mois
  sur demande motivée
- OEB Règle 132 EPC standard 4 mois, prorogation 2 mois maximum

Manquer le délai = **rejet définitif** de la demande (INPI) ou **demande
réputée retirée** (OEB, Art. 94(4) EPC).

## Examples

```
/hacienda-propriete-intellectuelle:analyse-refus-inpi "FR2700123 | rapport recherche préliminaire INPI du 2026-03-15 | 45 jours restants"
```

(Analyse d'un rapport de recherche préliminaire INPI sur brevet FR — citations
X/Y/A/E à classifier, stratégies d'amendement à proposer.)

```
/hacienda-propriete-intellectuelle:analyse-refus-inpi EP1234567
```

(Analyse d'une Communication OEB Règle 132 EPC sur demande EP — le skill
demandera la notification et le délai restant.)

```
/hacienda-propriete-intellectuelle:analyse-refus-inpi
```

(Sans args — le skill déroule l'intake en 4 questions.)

---

## ANALYSE ARGUMENTAIRE, PAS RÉPONSE OFFICIELLE

**Reformuler en tête de chaque output. Ne jamais l'enlever. Ne jamais l'adoucir.**

> **Analyse argumentaire, pas réponse officielle.** Cette analyse classifie
> les citations d'art antérieur (cadre OEB X/Y/A/E appliqué INPI), identifie
> les caractéristiques distinctives par revendication, propose 4 stratégies
> d'amendement (A limitation par incorporation / B reformulation / C abandon
> et repli sur dépendantes / D demande divisionnaire) et produit un **projet
> de réponse** structuré (FR pour INPI, EN pour OEB). Elle NE remplace PAS la
> rédaction finale par un **mandataire en brevets inscrit OEB (EQE)** ou un
> **avocat spécialisé en propriété industrielle**. **Délais fermes** : INPI
> ~2-4 mois (art. R.612-66 CPI, prorogation 2 mois sur demande motivée), OEB
> Règle 132 EPC 4 mois (prorogation 2 mois maximum). Manquer le délai =
> **rejet définitif** de la demande (INPI) ou **demande réputée retirée**
> (OEB, Art. 94(4) EPC) — la procédure de poursuite Art. 121 EPC est
> exceptionnelle. La télé-procédure INPI (portail data.inpi.fr / espace
> mandataire) ou OEB (MyEPO) reste à exécuter par le mandataire. **Un
> amendement mal rédigé peut violer L.612-6 CPI / Art. 123(2) EPC
> (non-extension) et provoquer la nullité ultérieure du brevet** (L.613-25 c
> CPI).

C'est le garde-fou le plus visible du skill. Une analyse partielle finalisée
sans relecture mandataire EQE = porte à sens unique (amendement déposé,
violation de non-extension non détectée, nullité prononcée 5 ans plus tard
en action contre un contrefacteur). Sur-flagger = porte à 2 sens, le
mandataire élague. Rester sur la porte à 2 sens.

---

## Charger le profil pratique avant de commencer

Avant tout, lire :
1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Récupérer :

- **Rôle** depuis `## 1. Profil cabinet et profil de pratique PI`
  (avocat inscrit à un barreau français / mandataire en brevets inscrit OEB
  (EQE) / mandataire en marques INPI / juriste interne / non-juriste avec ou
  sans accès avocat). Change l'en-tête confidentialité, la formulation des
  avertissements en pied de projet de réponse ET active le gate non-juriste
  si applicable.
- **Juridictions et offices d'inscription** (section `## 1`) : INPI seul / OEB
  seul / les deux / autre. Conditionne la langue du projet de réponse (FR
  pour INPI, EN pour OEB).
- **Pratique brevets** (section `## Brevets`) : FR national / EP / PCT /
  international. Si la notification analysée concerne une juridiction hors
  périmètre déclaré → flagger en tête de l'analyse.
- **Domaines techniques principaux** : pharma / mécanique / électronique /
  logiciel / biotech → calibre les exemples concrets dans les options
  d'amendement.
- **Partenaire annuités** : permet d'estimer le coût d'une demande
  divisionnaire (Option D) si pertinent.
- **Posture prosecution** [A CONFIGURER — abandon rapide si coût > valeur
  commerciale / défense systématique / pragmatique] → calibre la
  recommandation entre Options A à D :
  - *Abandon rapide* = privilégier C (abandon revendication problématique) si
    portée résiduelle reste commercialement utile, ne pas pousser D
    divisionnaire.
  - *Défense systématique* = privilégier A (limitation par incorporation) et
    D (divisionnaire pour préserver tous les aspects), accepter le coût.
  - *Pragmatique* = A en première intention, C en repli, D uniquement si
    l'aspect divisé a une valeur commerciale propre identifiable.
- **Matrice d'approbateurs** : qui valide une réponse INPI/OEB ? Typiquement
  mandataire EQE seul, ou mandataire + directeur R&D + GC pour brevets
  stratégiques.

**Mode provisoire** : si le profil contient des valeurs `[A CONFIGURER]` sur
les champs critiques (rôle, juridictions, posture prosecution), continuer
mais flagger en tête : « Profil de pratique partiellement configuré — analyse
produite sur cadre par défaut (mandataire EQE, posture pragmatique). Lance
`/hacienda-propriete-intellectuelle:entretien-demarrage` pour calibrer. »

---

## Intake — 4 questions en batch unique

Poser les 4 questions ensemble (pas une à une) pour réduire les allers-retours :

1. **Numéro de brevet ou de demande** (FR / EP / PCT — ex : FR2700123,
   EP1234567A1, PCT/FR2025/050123). Dès reçu, déclencher en parallèle :
   - `inpi_brevet_details(numero)` si FR — récupérer revendications,
     déposant, statut, date de priorité, état procédure
   - `espacenet_brevet_details(numero)` si EP / PCT — idem côté OEB
   - Si l'outil retourne 404 ou erreur, signaler `[INPI Data — non récupéré]`
     ou `[OEB Espacenet — non récupéré]` et demander à l'utilisateur de
     coller manuellement les revendications.

2. **Notification reçue** : préciser
   - **Type** : rapport de recherche préliminaire INPI / notification de
     motifs de refus INPI (art. R.612-66 CPI) / Communication OEB Règle 132
     EPC / autre (préciser)
   - **Date de notification** (YYYY-MM-DD)
   - **Texte intégral** : coller dans le chat OU pointer un fichier
     (PDF / MD / TXT). Si fichier illisible, appliquer la règle « Échec de
     lecture de fichier » du plugin CLAUDE.md.

3. **Délai restant pour répondre** : date butoir (YYYY-MM-DD). **Calcul auto
   de la sévérité** depuis la date du jour :
   - 🔴 **< 30 jours** = URGENT — escalation immédiate mandataire EQE
   - 🟠 **30-60 jours** = à préparer cette semaine
   - 🟡 **> 60 jours** = standard, planifier dans le mois
   - **Si délai < 14 jours** : recommander **en parallèle** de l'analyse de
     déposer immédiatement une demande de prorogation (INPI : 2 mois sur
     demande motivée ; OEB : Règle 132(2) EPC, 2 mois supplémentaires).
   - **Si délai < 7 jours** : **stop** l'analyse approfondie, produire
     uniquement le brief escalation 1 page vers mandataire EQE avec mention
     « DÉLAI CRITIQUE — prorogation à demander aujourd'hui ».

4. **Posture du déposant** : défendre intégralement la portée (combat
   maximal) / accepter des limitations raisonnables (compromis) / abandonner
   partiellement les revendications problématiques (concentrer le combat sur
   les revendications de valeur). Cette posture cale le poids relatif des
   Options A (limitation) vs C (abandon) vs D (divisionnaire).

**Ne pas poursuivre tant que les 4 réponses ne sont pas obtenues.** Si
l'utilisateur ne donne que partiellement, redemander les manquants en bloc.

---

## Classification des citations — cadre OEB X/Y/A/E (appliqué INPI)

L'INPI utilise les **mêmes codes que l'OEB** pour cohérence pratique avec
les Directives d'examen OEB (partie B chapitre X et partie G). Maîtriser ces
codes est la base de toute réponse argumentée.

| Code | Signification | Implication pratique |
|---|---|---|
| **X** | Antériorité destructrice de **nouveauté** (couvre TOUTES les caractéristiques d'une revendication indépendante) | **Limitation obligatoire** ou abandon — la revendication telle quelle ne peut subsister |
| **Y** | Antériorité destructrice d'**activité inventive** **en combinaison** avec d'autres documents Y | **Argumentation problème-solution requise** — démontrer la non-évidence pour l'homme du métier |
| **A** | État de la technique pour **information / contexte général** | **Pas de problème immédiat** — citer pour montrer la connaissance du domaine technique |
| **E** | Demande antérieure **non publiée à la date de dépôt** (antériorité relative — Art. 54(3) CBE) | Affecte **nouveauté** mais **PAS l'activité inventive** (jurisprudence OEB G 2/98) |

### Notes importantes

- **L'INPI applique le même cadre que l'OEB** depuis l'alignement sur les
  Directives OEB (cohérence pratique pour les mandataires inscrits aux deux
  offices). Toutefois, l'INPI est historiquement **moins exhaustif sur les
  combinaisons Y** que l'OEB — un rapport de recherche préliminaire INPI peut
  citer un document en Y sans détailler la combinaison envisagée, alors que
  l'examinateur OEB explicite généralement la combinaison Y1 + Y2.
- **E (Art. 54(3) CBE) — antériorité relative** : c'est une demande déposée
  avant mais publiée après notre date de dépôt. Elle peut **détruire la
  nouveauté** (test : si la demande E divulgue toutes les caractéristiques
  d'une revendication indépendante) mais **ne peut JAMAIS détruire l'activité
  inventive** (jurisprudence OEB **G 2/98**, confirmée G 1/03). Si une
  citation E est mal codée par l'INPI/OEB en Y → contester la classification.
- **Codes étendus parfois utilisés** : O (antériorité orale — conférence, ex.
  Art. 54(2) CBE), P (publication intermédiaire entre priorité et dépôt), T
  (théorie sous-jacente, rare). Voir `references/classification-citations-oeb.md`.
- **Si la notification utilise des codes non-standard** (rare mais arrive
  pour notifications anciennes ou traductions) → demander clarification au
  mandataire, ne pas deviner la classification.

### Erreurs courantes à signaler

Quand l'analyse de la notification révèle l'une de ces erreurs, la signaler
en `[review]` dans le projet de réponse :

1. **Confusion X / Y** : l'examinateur cite un document en X (destructrice de
   nouveauté à elle seule) alors qu'il manque manifestement une
   caractéristique pour couvrir toute la revendication → reclassifier en Y
   et préparer argument problème-solution.
2. **Traitement de A comme problématique** : A = simple contexte ; ne PAS
   amender en réaction à une citation A.
3. **E utilisée pour attaquer l'activité inventive** : violation directe
   G 2/98 → contester formellement la classification dans la réponse.

Référence : `references/classification-citations-oeb.md` (exemples concrets
par domaine technique, codes étendus, jurisprudence OEB).

---


## Analyse élément par élément (claim-by-claim mapping)

Pour chaque document X et Y cité dans la notification :

1. **Mapper les caractéristiques divulguées** de la citation contre **chaque
   revendication attaquée** (par numéro).
2. **Identifier les caractéristiques NON divulguées** dans la citation par
   rapport à la revendication → ce sont les **bases de distinction**
   exploitables pour l'amendement.
3. **Classer les revendications en 3 groupes** :
   - **Totalement couvertes** par une citation X → à amender (Options A / B
     / C) ou abandonner (C / D)
   - **Partiellement couvertes** → à reformuler ou limiter pour distinguer
     (Options A / B)
   - **Épargnées** (aucune citation pertinente) → à conserver telles quelles

### Format de mapping — table par citation × revendication

| Citation | Code | Revendication 1 | Revendication 2 | Revendication 3 | Revendication 5 (dépendante) |
|---|---|---|---|---|---|
| FR2700123 | X | ❌ toutes caractéristiques couvertes (1a, 1b, 1c) | ⚠️ partielle (3a couvert, 3b absent) | ✅ caractéristique 5c distincte | ✅ aucun chevauchement |
| EP1234567 | Y | ⚠️ 4/5 caractéristiques (manque agent réticulation) | ✅ caractéristique 3c distincte | ✅ aucun chevauchement | ✅ aucun chevauchement |
| US2020/1234 | A | n/a (contexte général filtration) | n/a | n/a | n/a |

Légende : ❌ = entièrement couverte (problème majeur) / ⚠️ = partielle
(distinction possible) / ✅ = épargnée (à conserver).

**Lecture du tableau** : les colonnes avec ❌ pour une citation X identifient
les revendications nécessitant un amendement obligatoire. Les colonnes ⚠️
identifient les caractéristiques absentes de la citation → **base
d'amendement par incorporation** (Option A) ou de **reformulation
distinctive** (Option B).

---

## Stratégies d'amendement — 4 options par revendication objectée

Pour **chaque revendication objectée** (X ou Y), évaluer les 4 options
ci-dessous et recommander une priorité selon la posture cabinet.

### Option A — Limitation par incorporation

**Mécanisme** : incorporer une caractéristique d'une revendication
**dépendante** dans la revendication **indépendante** (déplacement de
caractéristique). Exemple : ajouter à la revendication 1 la caractéristique
5c de la revendication dépendante 5.

**Effet** :
- Réduit la portée mais établit la **nouveauté** contre la citation X (si la
  caractéristique incorporée n'est PAS divulguée par X)
- Conserve la structure des revendications dépendantes restantes
- Réduit l'étendue de protection commerciale

**Vérifications obligatoires** :
- **Support description (CPI L.612-6 / Art. 123(2) EPC non-extension)** : la
  caractéristique incorporée doit être **décrite explicitement** dans la
  description originale (idéalement avec son effet technique). Une
  caractéristique présente uniquement dans une revendication dépendante mais
  pas dans la description peut suffire si l'enchaînement est clair, mais
  c'est plus risqué (jurisprudence OEB G 2/10 sur intermediate
  generalisation).
- **Pas de combinaison non originellement divulguée** : si on incorpore
  plusieurs caractéristiques de revendications dépendantes différentes
  (5c + 7b + 9a), vérifier qu'au moins une réalisation décrite combine ces
  caractéristiques. Sinon = intermediate generalisation = violation
  Art. 123(2) EPC.

**Risque** : ⚪ faible si la caractéristique est clairement décrite. 🟡
modéré si extraite d'une revendication dépendante sans support description
détaillé.

**Recommandation par posture** :
- *Défense systématique* → Option A en première intention
- *Pragmatique* → Option A si support description solide, sinon C
- *Abandon rapide* → A uniquement si la portée résiduelle reste
  commercialement utile

### Option B — Reformulation sans modification de l'étendue

**Mécanisme** : reformuler les termes (synonymes techniques, précisions
linguistiques) pour distinguer de l'art antérieur **sans réduire la
protection**. Exemple : remplacer « membrane à base de graphène » par
« membrane comprenant essentiellement du graphène mono-feuillet » pour
distinguer un FR2700123 qui divulgue des membranes graphène multi-feuillet.

**Effet** :
- Conserve l'étendue de protection apparente
- Risqué : l'examinateur peut considérer la reformulation comme un
  contournement non distinctif (« essentiellement » = trop vague)
- Risque de violation Art. 123(2) EPC si la précision n'est pas dans la
  description originale

**Justification requise** : interprétation conforme à la description et aux
schémas, idéalement appuyée par un exemple ou un effet technique chiffré
dans la description.

**Risque** : 🟡 modéré (peut être perçu comme tentative de contournement)
voire 🔴 élevé si la précision est purement linguistique sans ancrage
technique.

**Recommandation** : Option B **secondaire** — à utiliser en combinaison avec
A, rarement seule. Si l'examinateur conteste, replier sur A ou C.

### Option C — Abandon revendication / repli sur dépendantes

**Mécanisme** : **abandonner** la revendication indépendante problématique
et **promouvoir une revendication dépendante** en indépendante (la rev. 5
dépendante devient la nouvelle rev. 1).

**Effet** :
- Solution si l'art antérieur couvre vraiment toute la revendication 1
  originale (citation X imparable)
- Simple et défendable juridiquement (pas d'extension de matière)
- Réduction significative de la portée (typiquement 50-70 % de la portée
  originale selon les caractéristiques cumulées)

**Vérifications** :
- La revendication dépendante promue doit elle-même être distincte des
  citations X (vérifier le mapping)
- Garder une cohérence numérotation et renvois (rev. 2 originale qui
  référençait rev. 1 doit être adaptée à la nouvelle rev. 1)

**Risque** : ⚪ faible juridiquement, mais 🟠 commercial (portée réduite).

**Recommandation** : Option C est le **repli sûr** quand Option A ne tient
pas (pas de support description). Privilégié en posture *abandon rapide* ou
*pragmatique* si la rev. dépendante a une valeur commerciale propre.

### Option D — Demande divisionnaire (CPI L.612-4 / Règle 36 EPC)

**Mécanisme** : **déposer une demande divisionnaire** parallèle pour
préserver les aspects controversés sur un **nouveau dossier**, tout en
amendant la demande parent pour passer l'examen. Permet de continuer la
prosecution sur **2 fronts** (parent + divisionnaire).

**Conditions** :
- Dépôt possible tant que la demande parent est **pendante** (avant
  délivrance ou rejet définitif)
- **Pas d'extension de matière** : la divisionnaire doit porter sur de la
  matière déjà divulguée dans la demande parent (sinon violation Art. 76 EPC
  / L.612-4 CPI)

**Effet** :
- Permet de **séparer les combats** : on amende fortement le parent pour
  passer, et on défend la portée pleine sur la divisionnaire
- Donne **plus de temps** pour la divisionnaire (nouveau cycle d'examen)
- **Taxes supplémentaires** : ~600 € INPI FR (taxe dépôt + examen) /
  ~2 500 € OEB (dépôt + recherche + examen) + frais mandataire
- Charge prosecution doublée (2 dossiers à suivre)
- 🟠 **Penalty OEB divisionnaires en cascade** : Règle 38(4) EPC, taxe
  additionnelle progressive si divisionnaire de divisionnaire

**Risque** : ⚪ juridique faible, 🟠 budgétaire modéré à élevé.

**Recommandation par posture** :
- *Défense systématique* → Option D systématique si aspect divisé a valeur
  commerciale identifiée
- *Pragmatique* → Option D uniquement si (a) la portée que l'on abandonne
  dans le parent a une **valeur commerciale propre identifiable**, (b) le
  budget annuités le permet
- *Abandon rapide* → ne pas pousser D

### Synthèse — comment présenter les options dans la réponse

Pour chaque revendication objectée, présenter un mini-tableau :

| Option | Étendue résiduelle | Risque juridique | Coût | Recommandation cabinet |
|---|---|---|---|---|
| A (limitation rev. 5c) | ~75 % | ⚪ faible | inclus examen | ✅ première intention |
| B (reformulation) | ~95 % | 🟡 modéré | inclus examen | ⚠️ secondaire |
| C (abandon, repli rev. 5) | ~60 % | ⚪ faible | inclus examen | ⚠️ repli |
| D (divisionnaire) | parent ~75 % + divisionnaire ~95 % | ⚪ faible | ~600 € + mandataire | 🟡 si valeur commerciale propre |

Référence : `references/strategies-amendement.md`.

---
