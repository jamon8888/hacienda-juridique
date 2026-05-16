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

## Argumentation problème-solution OEB (pour citations Y — activité inventive)

L'argument problème-solution est le **cadre officiel OEB** (Directives examen
partie G chapitre VII section 5), adopté en pratique par l'INPI pour
l'examen de l'activité inventive. À utiliser pour défendre tout amendement
contre une citation Y (destructrice d'activité inventive en combinaison).

**Démarche en 4 étapes** :

1. **État de la technique le plus proche** (*closest prior art*) —
   généralement la citation Y la plus pertinente, c'est-à-dire celle qui
   partage le plus de caractéristiques avec la revendication amendée. Si
   plusieurs citations Y sont équivalemment proches, traiter chaque
   combinaison séparément.

2. **Caractéristiques distinctives** apportées par l'amendement (versus
   *closest prior art*) — lister précisément ce que la revendication
   amendée a en plus / en différent du *closest prior art*.

3. **Problème technique objectif** que ces caractéristiques distinctives
   résolvent — formulation OEB type : « améliorer / résoudre [X] par
   rapport à [Y] ». Le problème doit être **objectif** (résultat technique
   mesurable, démontré dans la description ou les exemples) et non
   subjectif (« mieux », « plus efficace » sans chiffrage). Si l'effet
   technique n'est pas dans la description originale, on ne peut PAS
   l'inventer après coup (Art. 123(2) EPC).

4. **Non-évidence pour l'homme du métier** à la date de priorité — le test
   décisif : *l'homme du métier, partant du closest prior art et confronté
   au problème technique objectif, aurait-il modifié le closest prior art
   en s'aidant des autres citations Y pour aboutir à notre invention
   amendée ?*
   - Si **non** → activité inventive établie
   - Si **oui** → activité inventive contestée, l'amendement ne suffit pas

**Arguments classiques de non-évidence** :
- **Pas de motivation** dans le *closest prior art* à chercher une solution
  dans la direction de notre invention
- **Pas d'enseignement combinatoire** : les citations Y traitent de domaines
  techniques distincts, l'homme du métier n'aurait pas naturellement
  combiné
- **Effet technique inattendu** : la combinaison produit un résultat
  surprenant (synergie, effet contre-intuitif) — argument fort si démontré
  par exemples chiffrés dans la description originale
- **Préjugé technique** dans le domaine contre la voie que nous avons
  empruntée (jurisprudence OEB T 0024/81, T 0119/82)

Pour chaque citation Y dans la notification, construire l'argument structuré
selon ce gabarit dans le projet de réponse.

---

## Délais et procédure

### INPI — art. R.612-66 CPI

- **Délai standard** : 2 à 4 mois selon le type de notification
  - Rapport de recherche préliminaire : 3 mois pour répondre par observations
  - Notification de motifs de refus : 4 mois pour répondre
  - Délais précis indiqués dans la notification elle-même
- **Prorogation** : 2 mois supplémentaires sur **demande motivée**, déposée
  **AVANT l'expiration** du délai initial (R.618-3 CPI). La prorogation
  n'est pas automatique mais largement accordée si la motivation est
  raisonnable (complexité technique, attente d'éléments de preuve).
- **Modalité de réponse** : télé-procédure INPI obligatoire depuis 2017
  (portail data.inpi.fr / espace mandataire).
- **Sanction du défaut** : pas de réponse dans le délai → notification de
  **rejet** de la demande (R.612-70 CPI). Recours possible auprès du
  directeur INPI puis devant la CA Paris (L.411-4 CPI).

### OEB — Règle 132 EPC

- **Délai standard** : **4 mois** (Règle 132(2) EPC)
- **Prorogation** : 2 mois supplémentaires maximum, sur demande déposée
  **AVANT expiration** (Règle 132(2) seconde phrase EPC). Acceptée
  largement.
- **Modalité de réponse** : portail MyEPO (dépôt électronique standard).
- **Sanction du défaut** : la demande est **réputée retirée** (Art. 94(4)
  EPC). Conséquence sévère mais **rattrapable** par **procédure de
  poursuite** (*further processing* — Art. 121 EPC) : demande recevable dans
  les **2 mois** suivant la notification de réputation retirée, sur
  paiement d'une **taxe** (~280 €). Si la procédure de poursuite est elle
  aussi manquée → demande définitivement perdue.

### Calcul automatique de la sévérité

| Délai restant | Sévérité | Action |
|---|---|---|
| < 7 jours | 🔴 CRITIQUE | Stop analyse — brief 1 page + demande prorogation immédiate |
| 7-14 jours | 🔴 URGENT | Analyse en parallèle d'une demande de prorogation |
| 14-30 jours | 🔴 PRESSÉ | Escalation mandataire EQE cette semaine |
| 30-60 jours | 🟠 À PRÉPARER | Préparer cette semaine, finaliser avec mandataire d'ici 2 semaines |
| > 60 jours | 🟡 STANDARD | Planifier dans le mois |

**Règle** : si délai < 14 jours, recommander **systématiquement** de déposer
une demande de prorogation **en parallèle** de l'analyse. Une prorogation
demandée à temps coûte zéro en taxes (INPI) ou est inclus (OEB), et donne
2 mois de marge supplémentaire pour finaliser proprement la réponse.

---

## Format de sortie

Produire un **document Markdown unique**, structure ci-dessous. Inline dans
le chat ET sauvegardé dans le répertoire outputs (voir section Emplacement).

````markdown
[EN-TÊTE CONFIDENTIALITÉ — selon profil, voir CLAUDE.md plugin §2]

# Analyse refus brevet [INPI / OEB] — [Brevet/demande N°] (ANALYSE ARGUMENTAIRE, PAS RÉPONSE OFFICIELLE)

> **Analyse argumentaire, pas réponse officielle.** Cette analyse classifie
> les citations art antérieur (cadre OEB X/Y/A/E), identifie les
> caractéristiques distinctives par revendication, propose 4 stratégies
> d'amendement et produit un projet de réponse. Elle NE remplace PAS la
> rédaction finale par un mandataire en brevets (EQE) ou un avocat
> spécialisé. **Délais fermes** : INPI ~2-4 mois (art. R.612-66 CPI), OEB
> 4 mois Règle 132 EPC. Manquer le délai = rejet définitif (INPI) ou demande
> réputée retirée (OEB Art. 94(4) EPC).

> **⚠️ Note du relecteur**
> - **Notification analysée :** [type + date YYYY-MM-DD]
> - **Délai restant :** [N jours] — sévérité [🔴 / 🟠 / 🟡]
> - **Sources :** [INPI Brevets ✓ | OEB Espacenet ✓ — fiche brevet récupérée | connaissance modèle si non récupéré]
> - **Citations analysées :** [N citations X / N Y / N A / N E]
> - **Avant envoi INPI/OEB :** validation mandataire en brevets (EQE) ou avocat **OBLIGATOIRE**

**Triage :** 🔴 URGENT (< 30j) / 🟠 À PRÉPARER (30-60j) / 🟡 STANDARD (>60j) — une phrase pourquoi cette catégorie.

## Brevet / demande analysé

- **Numéro :** [FR2700123 / EP1234567A1 / PCT/FR2025/050123]
- **Déposant :** [titulaire — depuis fiche INPI/Espacenet]
- **Statut :** [demande publiée / en examen / pre-grant / autre]
- **Date de priorité :** [YYYY-MM-DD]
- **Revendications :** [N indépendantes + N dépendantes — N total]

## Notification analysée

- **Type :** [rapport recherche préliminaire INPI / motifs refus INPI art. R.612-66 / Communication OEB Règle 132 / autre]
- **Date notification :** [YYYY-MM-DD]
- **Délai butoir :** [YYYY-MM-DD] (N jours restants depuis aujourd'hui)
- **Motifs invoqués :** [résumé : N revendications objectées, N citations X, N citations Y, N citations A, N citations E]
- **Examinateur (si indiqué) :** [nom + division d'examen]

## Classification des citations

| Document | Code | Pertinence | Caractéristiques divulguées (résumé) | Revendications attaquées |
|---|---|---|---|---|
| FR2700123 | X | destructrice nouveauté rev. 1 | 1a, 1b, 1c (procédé filtration membrane graphène) | 1, 4 |
| EP1234567 | Y | activité inventive en combinaison avec FR2700123 | structure multi-couches, support polymère | 2, 3 |
| US2020/1234 | A | contexte général filtration eau | n/a (contexte) | n/a |

## Analyse élément par élément

[Matrice citation × revendication, statut ❌ / ⚠️ / ✅ par cellule — voir
section "Format de mapping" pour le gabarit. Une matrice par citation
significative, ou matrice unique si peu de citations.]

## Stratégies d'amendement par revendication objectée

### Revendication 1 (objectée par FR2700123 — X)

**Option A — Limitation par incorporation** ✅ recommandée
- Incorporer la caractéristique 5c (agent de réticulation polyamine) de la
  revendication dépendante 5 dans la revendication 1
- Étendue résiduelle : ~75 % de la portée originale
- Support description : caractéristique 5c décrite § 0023 description + rev. 5
  → OK L.612-6 CPI
- Risque : ⚪ faible — caractéristique 5c non divulguée par FR2700123

**Option B — Reformulation** ⚠️ secondaire
- Reformuler « membrane à base de graphène » en « membrane comprenant
  essentiellement du graphène mono-feuillet » pour distinguer FR2700123
  (membrane multi-feuillet)
- Risque : 🟡 modéré — l'examinateur pourrait considérer la précision
  comme non distinctive si l'ancrage technique n'est pas chiffré dans la
  description

**Option C — Abandon rev. 1, promotion rev. 5** ⚠️ option de repli
- Si Option A échoue à l'examen suivant, replier sur rev. 5 promue
  indépendante
- Étendue résiduelle : ~60 % de la portée originale

**Option D — Divisionnaire** 🟡 envisageable
- Préserver l'aspect « multi-feuillet » dans une demande divisionnaire FR
- Coût : ~600 € INPI + frais mandataire ~1 500 €
- Recommandée si l'aspect divisé a une valeur commerciale propre

| Option | Étendue résiduelle | Risque | Coût | Reco |
|---|---|---|---|---|
| A | ~75 % | ⚪ faible | inclus | ✅ |
| B | ~95 % | 🟡 modéré | inclus | ⚠️ |
| C | ~60 % | ⚪ faible | inclus | ⚠️ |
| D | parent 75 % + div. 95 % | ⚪ faible | ~600 € + mandataire | 🟡 |

### Revendication 2 (objectée par EP1234567 — Y, combinaison avec FR2700123)

[même format que rev. 1]

## Argumentation problème-solution OEB

*(Pour chaque revendication amendée objectée par citation Y)*

**Revendication 1 amendée (avec Option A — caractéristique 5c)**

- **Closest prior art :** EP1234567 (Y le plus pertinent — partage
  caractéristiques 1a, 1b, 1c)
- **Caractéristiques distinctives après amendement :** présence agent de
  réticulation polyamine (caractéristique 5c)
- **Problème technique objectif :** améliorer la durabilité de la membrane
  filtration en conditions acides (pH < 4) — démontré § 0042 description
  originale + exemple 3 chiffré (durée de vie multipliée par 4 versus
  membrane sans réticulation polyamine)
- **Non-évidence :** EP1234567 enseigne réticulation polysiloxane (pH
  neutre uniquement) ; combinaison avec FR2700123 (sans réticulation
  spécifique) n'aurait pas motivé l'homme du métier à choisir polyamine ;
  effet technique inattendu (résistance pH < 4 démontrée par exemple
  chiffré)

→ Argumentation **solide** pour activité inventive de la revendication 1
amendée.

## Projet de réponse [INPI en FR / OEB en EN — selon office]

### 1. Identification et dossier

- Numéro demande : [...]
- Mandataire désigné : [...]
- Référence interne cabinet : [...]
- Date de la notification : [...]
- Date du présent mémoire en réponse : [...]

### 2. Réponse aux motifs (par citation et par revendication)

**2.1 Concernant la citation FR2700123 (X) sur la revendication 1**

La revendication 1 est amendée pour incorporer la caractéristique 5c (agent
de réticulation polyamine) de la revendication dépendante 5 (support
description § 0023). Cette caractéristique n'est pas divulguée par
FR2700123, qui décrit uniquement des membranes graphène sans agent de
réticulation polyamine spécifique. La nouveauté de la revendication 1
amendée est donc établie au sens de l'art. L.611-11 CPI [INPI] / Art. 54 EPC
[OEB].

**2.2 Concernant la citation EP1234567 (Y) sur la revendication 2**

[Argumentation problème-solution complète selon la section ci-dessus.]

### 3. Amendements proposés (marqués / non marqués)

**Revendication 1 (marquée — additions soulignées)** :

« Procédé de filtration d'eau utilisant une membrane à base de graphène,
caractérisé en ce que ladite membrane comprend (a) une couche support en
polymère poreux, (b) une couche active de graphène d'épaisseur 5-50 nm,
__et (c) un agent de réticulation polyamine__. »

**Revendication 1 (non marquée — version propre)** :

« Procédé de filtration d'eau utilisant une membrane à base de graphène,
caractérisé en ce que ladite membrane comprend (a) une couche support en
polymère poreux, (b) une couche active de graphène d'épaisseur 5-50 nm, et
(c) un agent de réticulation polyamine. »

**Revendications dépendantes 2 à 10** : inchangées, à l'exception de la
suppression de l'ancienne revendication 5 (intégrée dans la revendication
1).

### 4. Demande finale

- Maintien de la demande dans la version amendée
- Réexamen sur cette base
- À titre subsidiaire : si la division d'examen estime que les amendements
  ne lèvent pas les objections, organisation d'une **audition orale** (Art.
  116 EPC) [si OEB] ou audition du déposant (R.612-66-1 CPI) [si INPI]

### 5. Pièces jointes

- Mémoire d'amendements (marqué + version propre)
- Si nécessaire : déclaration d'expert sur l'effet technique chiffré
- Si nécessaire : article scientifique illustrant le préjugé technique

## Calendrier

| Étape | Date prévue | Action | Responsable |
|---|---|---|---|
| Validation mémoire | J-7 (avant butoir) | Relecture mandataire EQE + déposant | mandataire + déposant |
| Dépôt réponse | J-1 (avant butoir) | Mandataire dépose télé-procédure INPI / MyEPO | mandataire |
| Accusé réception | J+1 (auto) | n/a | office |
| Communication examinateur suivante | J+0 + 3-6 mois | Nouvelle notification ou avis intention délivrer | examinateur |
| Si nouveau refus | J+0 + 3-6 mois | Re-analyser via ce skill | mandataire |
| Décision finale | J+0 + 12-18 mois | Brevet délivré ou rejet définitif | examinateur |

**Une question hors de ma checklist :** [observation seconde-ordre que le
relecteur attentif ferait — omettre cette ligne si rien ne vient honnêtement]

## Que veux-tu faire ?

1. **Itérer les amendements** — j'ajuste l'argumentation, propose variantes par revendication
2. **Escalader** — note pour mandataire EQE / avocat / direction R&D
3. **Compléter les faits** — recherche jurisprudence OEB sur cas similaire, étude effet technique
4. **Préparer demande divisionnaire** — Option D détaillée si pertinent
5. **Autre chose** — dis-moi
````

---

## Gate non-juriste

Si le profil de pratique indique **non-juriste sans accès avocat** ou
**non-juriste avec accès avocat**, ne pas livrer le projet de réponse
formaté à la place du livrable standard. Livrer à la place le **brief
escalation** suivant :

> **Cette analyse est un préparatoire, pas une réponse officielle INPI/OEB.**
> Envoyer une réponse sans validation mandataire en brevets (EQE) ou avocat
> a des **conséquences juridiques** :
> - **Amendement violant L.612-6 CPI / Art. 123(2) EPC** (extension de
>   portée) = motif de nullité ultérieure (L.613-25 c CPI) — le brevet
>   délivré pourrait être annulé 5 ans plus tard dans une action contre un
>   contrefacteur
> - **Argumentation faible** = refus définitif, demande perdue, taxes
>   d'examen non récupérables
> - **Prolongation manquée** = demande **réputée retirée** (OEB Art. 94(4))
>   ou rejetée (INPI R.612-70)
> - **Audition orale OEB** mal préparée = perte du recours possible
>
> Voici un **brief 1 page** à apporter au mandataire :
>
> ---
> **Brief mandataire EQE / avocat PI**
>
> - **Brevet / demande :** [numéro + statut]
> - **Notification reçue :** [type + date + délai butoir]
> - **Citations classées :** [N X / N Y / N A / N E] — résumé citations
>   destructrices
> - **Stratégie d'amendement préliminaire :** Option [A/B/C/D] recommandée
>   sur revendication [N], parce que [raison une phrase]
> - **Délai restant :** [N jours] — [sévérité]
> - **3 questions critiques à valider** :
>   1. L'amendement Option A est-il supporté par la description originale
>      (L.612-6 CPI / Art. 123(2) EPC) ?
>   2. L'argument problème-solution résiste-t-il à un effet technique non
>      démontré dans la description (test d'opposabilité OEB) ?
>   3. Vaut-il mieux Option C (abandon rev. 1, repli sur rev. 5) que
>      Option A (limitation par incorporation) compte tenu de la valeur
>      commerciale résiduelle ?
> ---
>
> **Annuaires** :
> - **INPI — Conseils en propriété industrielle (CPI L.422-4)** : https://www.inpi.fr/conseils-en-propriete-industrielle
> - **OEB — Liste Mandataires Européens (EQE qualifiés CBE)** : https://www.epo.org/learning/eqe.html
> - **Conseil National des Barreaux (avocats spécialistes PI)** : https://www.avocat.fr

---

## Emplacement de sortie

Sauvegarder le livrable Markdown à :

```
~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/refus-inpi-<brevet>-YYYY-MM-DD.md
```

où `<brevet>` est le numéro normalisé (ex. `FR2700123`, `EP1234567`,
`PCT-FR2025-050123`) et `YYYY-MM-DD` la date du jour. Si le répertoire
n'existe pas, le créer.

Mentionner le chemin dans la note du relecteur ou en fin de message :
« Sauvegardé : `outputs/refus-inpi-FR2700123-2026-05-16.md` ».

---

## Ce que ce skill NE fait PAS

Liste explicite des limites — à rappeler si l'utilisateur demande à aller
au-delà :

- **NE répond PAS officiellement** à l'INPI ou à l'OEB. Le dépôt de la
  réponse passe obligatoirement par la **télé-procédure INPI**
  (data.inpi.fr / espace mandataire) ou le **portail MyEPO**. Le mandataire
  exécute le dépôt.
- **NE rédige PAS les revendications amendées définitives**. Le projet
  d'amendement produit ici est un **gabarit** ; le mandataire ajuste mot
  par mot la version finale (ponctuation revendicative, terminologie
  exacte, cohérence avec dépendantes).
- **NE plaide PAS en audition orale OEB** devant les chambres de recours
  (Art. 116 EPC). Ce sont des audiences techniques où un mandataire
  spécialisé doit défendre les amendements oralement — préparation
  spécifique requise.
- **NE dépose PAS de demande divisionnaire formelle** (Option D). C'est
  une démarche mandataire avec nouvelles taxes (~600 € INPI / ~2 500 € OEB),
  formulaire dédié, mémoire de divulgation à recadrer.
- **NE calcule PAS les taxes** définitives. Le mandataire vérifie le
  barème INPI / OEB courant (les barèmes évoluent annuellement) et la
  qualification éventuelle pour réduction (PME, micro-entité OEB Règle 6
  EPC).
- **NE gère PAS le recours administratif** post-décision finale
  (recours auprès du directeur INPI puis CA Paris L.411-4 ; recours
  devant les chambres de recours OEB Art. 106 EPC). Ce sera couvert par
  un skill contentieux V6.0+.
- **NE garantit PAS le résultat** — l'acceptation de la réponse relève
  de l'autorité (examinateur INPI ou division d'examen OEB). Le skill
  prépare au mieux mais le verdict reste extérieur.

---

## Ton

Le ton est **technique, précis, équilibré**. Les destinataires sont des
mandataires EQE ou des avocats spécialisés en propriété industrielle ;
ils lisent en 15 minutes et prennent les décisions finales. Conséquences
pour la rédaction :

- **Présenter forces ET faiblesses** de chaque stratégie d'amendement —
  jamais une option présentée comme « la bonne » sans son revers
  (sur-limitation, risque Art. 123(2), coût divisionnaire)
- **Citer précisément** les articles CPI / EPC, les décisions de la Grande
  Chambre OEB (G 2/98, G 1/03, G 2/10), les Directives OEB partie G —
  sources stables et reconnues
- **Tagger systématiquement** la provenance des éléments factuels (cf.
  CLAUDE.md plugin §4) : `[INPI Brevets]`, `[OEB Espacenet]`, `[connaissance
  modèle — à vérifier]`, `[stable — vérifié le YYYY-MM-DD]`
- **Ne jamais trancher** un jugement subjectif (par ex. « la rev. 5 a-t-elle
  une valeur commerciale propre ? ») — flagger `[review]` et laisser le
  mandataire et la direction R&D décider
- **Mode silencieux** (cf. CLAUDE.md plugin §2) pour le projet de réponse
  destiné à l'INPI/OEB : retirer toute narration de skill, conserver
  uniquement le contenu juridique pur
- **Préserver l'en-tête de confidentialité** correspondant au rôle déclaré
  (avocat = secret professionnel art. 66-5 ; mandataire EQE = travaux de
  mandataire dans le périmètre INPI/OEB)

---
