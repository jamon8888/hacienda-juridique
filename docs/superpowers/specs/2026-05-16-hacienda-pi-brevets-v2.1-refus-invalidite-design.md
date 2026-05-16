# Hacienda PI — Bloc Brevets V2.1 Refus INPI + Invalidité — Design

**Date** : 2026-05-16
**Plugin** : `hacienda-propriete-intellectuelle` v0.7.0 (extension de v0.6.0)
**Base** : main (V1.0 + V1.1.0 + V1.1.1 + V1.1.2 + V2.0 mergés)

---

## 1. Objectifs

Compléter le workflow brevets MVP (V2.0) avec les deux skills défensifs essentiels :

1. **`analyse-refus-inpi`** — analyse d'une notification de refus INPI (rapport de recherche préliminaire ou notification de motifs de refus, art. R.612-66 CPI) OU d'une Communication OEB selon Règle 132 EPC. Classifie les citations X/Y/A/E, identifie les caractéristiques distinctives non divulguées, propose des stratégies d'amendement (limitation revendications, reformulation, abandon partiel), produit un projet de réponse argumentée (FR pour INPI, EN pour OEB).

2. **`anteriorite-invalidite`** — argumentation d'**invalidité** (nullité) d'un brevet adverse, en attaque préventive ou en défense face à une action en contrefaçon. Recherche d'art antérieur destructeur de nouveauté (L.611-11) ou d'activité inventive (problème-solution OEB), structuration d'une argumentation pour action en nullité TJ Paris (L.613-25 CPI) ou défense contre action en contrefaçon (L.615-1).

Bump plugin v0.6.0 → v0.7.0.

Connecteur **Google Patents** différé V2.1.1 (V2.1 utilise INPI Data brevets + OEB Espacenet déjà disponibles depuis V2.0).

## 2. Non-objectifs

- Pas de connecteur Google Patents (différé V2.1.1)
- Pas de connecteur WIPO PatentScope (différé V2.2)
- Pas de gestion procédure orale OEB (chambres de recours — rare, mandataire spécialisé)
- Pas de gestion recours TJ Paris post-décision INPI (différé V6.0+ contentieux)
- Pas de calcul des taxes amendement / recours (mandataire vérifie)
- Pas de gestion CCP (Certificats Complémentaires de Protection — différé V2.3)
- Pas de gestion brevets pharma spécifiques (différé V3.0+ pharma)

## 3. Architecture

### 3.1 Plugin étendu

```
plugins/hacienda-propriete-intellectuelle/                v0.7.0
├── .claude-plugin/plugin.json                            [BUMP] 0.7.0
├── CLAUDE.md                                             [PATCH] section "Brevets" enrichie (refus + invalidité)
├── CHANGELOG.md                                          [PATCH] 0.7.0
├── README.md                                             [PATCH] V0.7
│
├── skills/
│   ├── analyse-refus-inpi/                               [NEW]
│   │   ├── SKILL.md                                       (~550-700 lignes style Anthropic FR)
│   │   └── references/
│   │       ├── classification-citations-oeb.md           (X/Y/A/E + jurisprudence)
│   │       └── strategies-amendement.md                  (limitation, reformulation, abandon partiel)
│   ├── anteriorite-invalidite/                           [NEW]
│   │   ├── SKILL.md                                       (~600-800 lignes)
│   │   └── references/
│   │       ├── motifs-nullite-brevet.md                  (L.613-25, L.611-10 à L.611-15)
│   │       └── procedure-nullite-tj-paris.md             (compétence L.615-1, déroulement, défense)
│   └── (autres skills intact)
│
└── references/
    └── ressources-pi-fr.md                               [PATCH] section "Procédures brevets INPI/OEB/TJ Paris"
```

Pas de nouveau code core (`@hacienda/core` inchangé). Réutilise les tools V2.0 : `inpi_search_brevets`, `inpi_brevet_details`, `espacenet_search`, `espacenet_brevet_details`.

### 3.2 Pas d'extension `@hacienda/core`

V2.1 = uniquement Markdown. Tous les tools nécessaires existent depuis V2.0.

### 3.3 Configuration utilisateur

Aucun nouveau fichier user-stable. Outputs vont dans `outputs/` existant :
- `refus-inpi-<brevet>-YYYY-MM-DD.md` (analyse d'une notification)
- `invalidite-<brevet-cible>-YYYY-MM-DD.md` (argumentation nullité)

## 4. Le skill `analyse-refus-inpi`

### 4.1 Frontmatter

```yaml
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
```

### 4.2 Sections (calque `tableau-contrefacon-brevet` V2.0 + cadre OEB Rule 132)

1. **Garde-fou loud** :
   > **Analyse ≠ réponse officielle.** Ce skill produit une **analyse argumentaire** pour aider le mandataire en brevets (EQE) ou l'avocat. Il NE répond PAS officiellement à l'INPI/OEB, NE dépose PAS l'amendement, NE plaide PAS en audition orale (chambres de recours OEB). **Délais fermes** : INPI ~2-4 mois selon notification (art. R.612-66 CPI), OEB Règle 132 EPC standard 4 mois prorogeable. Manquer le délai = **rejet définitif** de la demande (ou perte de la procédure de recours).

2. **Chargement profil** : rôle (avocat / mandataire EQE / non-juriste), juridictions inscrites (INPI/OEB), partenaire annuités, posture prosecution (abandon rapide si coût > valeur / défense systématique), approbateurs.

3. **Intake** :
   - Numéro brevet ou demande (déclencher `inpi_brevet_details` ou `espacenet_brevet_details` pour récupérer revendications)
   - Notification reçue : type (rapport recherche préliminaire / motifs refus INPI / Communication OEB Rule 132 / autre)
   - Texte de la notification (coller ou pointer fichier)
   - Délai restant pour répondre (calcul auto sévérité 🔴 <30j / 🟠 30-60j / 🟡 >60j)
   - Posture du déposant : défendre intégralement / accepter limitations / abandonner

4. **Classification des citations** (cadre OEB, applicable INPI car aligné) :

| Code | Signification | Implication |
|---|---|---|
| **X** | Antériorité destructrice de nouveauté (couvre toutes les caractéristiques d'une revendication indépendante) | Limitation obligatoire ou abandon |
| **Y** | Antériorité destructrice d'activité inventive **en combinaison** avec d'autres documents Y | Argumentation problème-solution requise |
| **A** | État de la technique pour information / contexte général | Pas de problème immédiat |
| **E** | Demande antérieure non publiée à la date de dépôt (antériorité relative — Art. 54(3) CBE) | Affecte nouveauté mais pas activité inventive |

Référence : `references/classification-citations-oeb.md`.

5. **Analyse élément par élément** :
   - Pour chaque document X/Y, mapper les caractéristiques divulguées contre les revendications attaquées
   - Identifier les **caractéristiques NON divulguées** dans la citation → **potentiel de distinction**
   - Lister les revendications totalement couvertes (à amender), partiellement (à reformuler), épargnées (à conserver telles quelles)

6. **Stratégies d'amendement** par revendication objectée :

   **Option A — Limitation par incorporation** :
   - Incorporer une caractéristique de revendication dépendante dans la revendication indépendante
   - Réduit l'étendue de protection mais établit la nouveauté
   - Vérifier que la caractéristique incorporée est supportée par la description (CPI L.612-6 non-extension)

   **Option B — Reformulation sans modification de l'étendue** :
   - Reformuler les termes pour distinguer de l'art antérieur sans réduire la protection
   - Risqué : peut être perçu comme tentative de contournement
   - Justifier par interprétation conforme à la description

   **Option C — Abandon revendication / repli sur dépendantes** :
   - Abandonner la revendication indépendante problématique
   - Promouvoir une revendication dépendante en indépendante
   - Solution si l'art antérieur couvre vraiment toute la revendication 1

   **Option D — Continuation en demande divisionnaire** (CPI L.612-4) :
   - Déposer une demande divisionnaire pour préserver les aspects controversés
   - Permet de continuer la prosecution sur deux fronts
   - Taxes supplémentaires (~600€ FR INPI 2026)

   Pour chaque option, lister : étendue de protection résiduelle, risque (validité, contestation future), coût estimé.

7. **Argumentation problème-solution OEB** (pour amendements activité inventive) :
   - Identifier l'état de la technique le plus proche (closest prior art)
   - Définir les caractéristiques distinctives apportées par l'amendement
   - Formuler le problème technique objectif résolu par ces caractéristiques
   - Démontrer que la solution n'était pas évidente pour l'homme du métier à la date de priorité

8. **Délais et procédure** :

   **INPI** :
   - Délai standard ~2-4 mois selon notification (art. R.612-66 CPI)
   - Prorogation possible 2 mois supplémentaires sur demande motivée
   - Réponse via télé-procédure INPI ou papier

   **OEB Règle 132 EPC** :
   - Délai standard 4 mois
   - Prorogation 2 mois sur demande (Règle 132(2) EPC)
   - Pas de réponse → demande réputée retirée (Art. 94(4) EPC)

9. **Format de sortie** (template Markdown inline quadruple fence) — incluant :
   - En-tête confidentialité
   - Garde-fou reformulé
   - Note du relecteur (sources, notification analysée, délai restant + sévérité)
   - Triage 🔴 URGENT / 🟠 À PRÉPARER / 🟡 STANDARD
   - Section "Brevet / demande" récap
   - Section "Notification analysée" : type + motifs invoqués
   - Section "Classification citations" : table X/Y/A/E
   - Section "Analyse élément par élément" : matrice revendication × citation × statut
   - Section "Stratégies d'amendement" par revendication objectée (options A/B/C/D)
   - Section "Argumentation problème-solution" si activité inventive contestée
   - Section "Projet de réponse" structure (INPI en FR / OEB en EN) :
     - Identification + dossier
     - Réponse aux motifs (par citation, par revendication)
     - Amendements proposés (marqués / non marqués)
     - Arguments problème-solution
     - Demande finale (acceptation / nouvel examen)
   - Section "Calendrier" : dépôt réponse, examen suivant, délais réplique
   - "Une question hors de ma checklist"
   - "Que veux-tu faire ?" (5 options : Itérer / Escalader / Compléter / Diviser / Autre)

10. **Gate non-juriste** : brief mandataire EQE (revendications + citations + stratégie amendement préliminaire + délai + 3 questions).

11. **Emplacement** : `~/.claude/plugins/config/.../outputs/refus-inpi-<brevet>-YYYY-MM-DD.md`.

12. **Ce que ce skill NE fait PAS** : répondre officiellement INPI/OEB, rédiger les revendications amendées définitives, plaider en audition orale chambres de recours OEB, déposer demande divisionnaire formelle, calculer taxes, gérer recours administratif post-décision finale.

13. **Ton** : technique, précis, équilibré (présenter les forces ET faiblesses de chaque stratégie d'amendement).

## 5. Le skill `anteriorite-invalidite`

### 5.1 Frontmatter

```yaml
---
name: anteriorite-invalidite
description: >
  Recherche et structure une argumentation d'invalidité (nullité) d'un brevet
  adverse — en attaque préventive (action en nullité TJ Paris L.613-25 CPI)
  ou en défense face à une action en contrefaçon (L.615-1 CPI). Identifie
  l'art antérieur destructeur (nouveauté L.611-11 ou activité inventive
  problème-solution OEB), structure les moyens de nullité pour exploitation
  judiciaire. NE plaide PAS — préparation à valider par mandataire EQE ou
  avocat spécialisé brevets.
argument-hint: "[num brevet cible | --attack (nullité préventive) | --defense (face contrefaçon)]"
---
```

### 5.2 Sections (workflow inédit, structure inspirée de `tableau-contrefacon-brevet` V2.0 inversé)

1. **Garde-fou loud** :
   > **Préparation argumentaire ≠ procédure judiciaire.** Ce skill prépare une **argumentation d'invalidité** pour aider le mandataire en brevets ou l'avocat spécialisé. Il NE forme PAS l'action en nullité, NE plaide PAS au TJ Paris (compétence exclusive L.615-1), NE négocie PAS de transaction avec le titulaire du brevet attaqué. **Une action en nullité ratée = condamnation aux dépens** (CPC art. 696) + risque d'action en concurrence déloyale si attaque jugée abusive. **Une défense en nullité mal construite = condamnation contrefaçon** + dommages-intérêts L.615-7 CPI.

2. **Chargement profil** : rôle, posture (agressif vs défensif), approbateurs, domaines techniques.

3. **Intake** (2 modes) :

   **Mode `--attack`** (nullité préventive) :
   - Numéro brevet cible (déclencher `inpi_brevet_details` ou `espacenet_brevet_details`)
   - Contexte : pourquoi attaquer ? (brevet bloque notre activité / dépôt frauduleux suspecté / barrière concurrentielle excessive)
   - Posture : nullité totale (toutes revendications) vs partielle (revendication 1 seulement)
   - Budget action : limité (ciblé sur 1 motif) vs étendu (multi-motifs cumulés)

   **Mode `--defense`** (face à action en contrefaçon reçue) :
   - Numéro brevet cible (celui qu'on nous oppose)
   - Notre produit incriminé (récap : link avec `tableau-contrefacon-brevet` V2.0 inversé)
   - Argumentaire contrefaçon adverse (que le demandeur invoque)
   - Notre stratégie : nullité brevet adverse + non-contrefaçon littérale + non-équivalence

4. **Recherche d'art antérieur destructeur** :
   - Déclencher `espacenet_search` avec mots-clés + CIB + date publication < date priorité du brevet attaqué
   - Déclencher `inpi_search_brevets` pour antériorités FR/EP
   - Filtrer par date publication strictement antérieure à la date de priorité revendiquée par le brevet cible
   - Classification trouvée : potentielles X (destructrices de nouveauté) ou Y (combinaisons activité inventive)
   - Note : si pas de connecteur dispo, bucket "Aucune base interrogée — recherche professionnelle Espacenet + Google Patents + NPL requise avant action"

5. **Motifs de nullité (CPI L.613-25)** :

   Le brevet peut être annulé pour :

   - **L.613-25 a)** — défaut de brevetabilité (L.611-10 exclusions, L.611-11 nouveauté, L.611-15 application industrielle)
   - **L.613-25 b)** — défaut de suffisance de description (L.612-5)
   - **L.613-25 c)** — extension de la portée au-delà du contenu de la demande initiale (L.612-6)
   - **L.613-25 d)** — défaut d'unité de l'invention (L.612-4)
   - **L.613-25 e)** — défaut de qualité du déposant (titularité réelle vs apparente)

   Pour chaque motif retenu, évaluer :
   - **Force probable** : 🟢 solide / 🟡 mixte / 🔴 faible
   - **Pièces requises** : art antérieur (citations Espacenet / Google Patents / NPL), expertise technique, généalogie déposant
   - **Précédent jurisprudentiel** : décision TJ Paris ou Cour de cass. com. pertinente

   Référence : `references/motifs-nullite-brevet.md`.

6. **Argumentation problème-solution inverse (pour activité inventive)** :
   - Identifier l'état de la technique le plus proche
   - Démontrer que les caractéristiques distinctives du brevet attaqué étaient évidentes pour l'homme du métier (l'inverse de la défense en prosecution)
   - Citer documents Y combinés (au moins 2) qui rendaient évidente la solution
   - Anticiper la défense du titulaire (effet technique inattendu, problème non posé par l'art antérieur)

7. **Calcul de la prescription / délai** :

   - **Action en nullité** : pas de prescription (CPI L.613-25 — l'action est imprescriptible tant que le brevet est en vigueur, +20 ans après dépôt)
   - **Défense en nullité dans action contrefaçon** : prescription 5 ans à compter du jour où le titulaire a connu ou aurait dû connaître les faits (CPI L.615-8) → la défense en nullité reste valable tant que l'action en contrefaçon est recevable
   - **Sévérité délai** : pour `--defense`, calculer le délai jusqu'à audience TJ Paris (souvent 6-18 mois post-assignation), prioriser argumentation

8. **Format de sortie** template Markdown inline (quadruple fence) :
   - En-tête confidentialité
   - Garde-fou reformulé
   - Note du relecteur (sources, mode, motifs analysés, force prob)
   - Triage 🟢 ARGUMENTATION SOLIDE / 🟡 MIXTE / 🔴 FAIBLE
   - Section "Brevet cible" récap (revendications, déposant, date priorité, statut)
   - Section "Art antérieur destructeur identifié" : table par doc (numéro, source, date pub, pertinence X/Y)
   - Section "Motifs de nullité retenus" par branche (force, pièces, précédent)
   - Section "Argumentation problème-solution inverse" (si activité inventive contestée)
   - Section "Projet d'écritures" structure pour mandataire/avocat :
     - Mode `--attack` : conclusions en nullité TJ Paris
     - Mode `--defense` : conclusions de défense + demande reconventionnelle en nullité
   - Section "Calendrier procédural" (TJ Paris ~12-24 mois avec recours possible)
   - "Une question hors de ma checklist"
   - "Que veux-tu faire ?" (5 options : Itérer / Escalader / Compléter recherche art antérieur / Négocier transaction / Autre)

9. **Gate non-juriste** : brief mandataire EQE ou avocat spécialisé (récap brevet + motifs + art antérieur + force prob + 3 questions critiques).

10. **Emplacement** : `~/.claude/plugins/config/.../outputs/invalidite-<brevet>-YYYY-MM-DD.md`.

11. **Ce que ce skill NE fait PAS** : former l'action en nullité (= démarche TJ Paris formelle via avocat habilité), plaider en audience, négocier transaction (licence, rachat, coexistence), évaluer dommages-intérêts (L.615-7 — avocat), gérer recours Cour d'appel Paris ou Cour de cass.

12. **Ton** : technique, rigoureux, **équilibré** (présenter les forces du brevet attaqué avant les faiblesses — anticiper la défense du titulaire). Mandataire/avocat lit en 15 min et prépare l'écriture finale.

## 6. Articles CPI / CBE référencés

### CPI
- **L.611-10** — exclusions brevetabilité
- **L.611-11** — état de la technique (nouveauté)
- **L.611-15** — application industrielle
- **L.612-4** — demande divisionnaire (Option D amendement)
- **L.612-5** — suffisance de description (motif nullité b)
- **L.612-6** — non-extension (motif nullité c)
- **L.613-25** — motifs de nullité (a/b/c/d/e)
- **L.615-1** — TJ Paris exclusivement compétent
- **L.615-7** — calcul du préjudice
- **L.615-8** — prescription action en contrefaçon (5 ans)
- **R.612-66** — délais réponse notification INPI

### CBE / OEB
- **Art. 54** EPC — nouveauté
- **Art. 54(3)** EPC — antériorité relative E
- **Art. 56** EPC — activité inventive
- **Art. 83** EPC — suffisance description
- **Art. 84** EPC — clarté revendications
- **Art. 94(4)** EPC — réputée retirée si pas de réponse
- **Règle 132** EPC — délais de réponse (4 mois standard, prorogation 2 mois)

## 7. Critères de succès V2.1

- [ ] `npm test` vert (≥ 269 — Markdown only)
- [ ] `npm run typecheck`, `npm run build`, `npm run branding:check` verts
- [ ] `/analyse-refus-inpi <brevet> <notification>` produit projet de réponse avec classification X/Y/A/E + stratégies amendement A/B/C/D
- [ ] `/anteriorite-invalidite --attack <brevet>` produit argumentation nullité avec motifs L.613-25 forces 🟢/🟡/🔴
- [ ] `/anteriorite-invalidite --defense <brevet>` produit défense + demande reconventionnelle nullité
- [ ] Coordination V2.0 + V2.1 : claim chart adverse → invalidité défensive → analyse refus si dépôt continuation
- [ ] Pas de régression
- [ ] Bump v0.6.0 → v0.7.0

## 8. Risques

| Risque | Mitigation |
|---|---|
| Délai INPI/OEB raté | Section délai explicite + sévérité 🔴 si < 30j + escalation immédiate |
| Amendement abusif violant L.612-6 non-extension | Vérifier systématiquement le support de l'amendement dans la description originale |
| Action nullité abusive → dommages-intérêts | Garde-fou loud + équilibrage forces/faiblesses systématique |
| Skills confondus avec `tableau-contrefacon-brevet` V2.0 | Frontmatter explicite "défense" + cross-ref ("pour analyser une contrefaçon réciproque, voir V2.0") |
| Connecteurs Google Patents / NPL absents | Bucket "Aucune base interrogée" + recommandation recherche professionnelle |

## 9. Plan de rollout

- **V2.1 (ce spec)** — analyse-refus-inpi + anteriorite-invalidite (workflow brevets défensif complet)
- **V2.1.1** — connecteur Google Patents (complément Espacenet pour recherche)
- **V2.2** — strategie-extension-internationale + revue-portefeuille-brevets (réutilise dashboard HTML V1.1.1)
- **V2.3** — CCP (Certificats Complémentaires de Protection pour pharma)
- **V3.0** — bloc Dessins/Modèles
- **V4.0** — bloc Droit d'auteur
- **V5.0** — Contrats PI + audit-pi-ma M&A
- **V6.0** — Contentieux & Enforcement (saisie-contrefaçon, action TJ Paris)

## 10. Annexes

### A — Inspirations

- `tableau-contrefacon-brevet/SKILL.md` V2.0 (claim chart, théorie équivalence)
- `analyse-opposition-marque/SKILL.md` V1.1.2 (bi-mode `--form`/`--respond` ↔ `--attack`/`--defense`)
- `recherche-anteriorite-brevet/SKILL.md` V2.0 (cadre OEB problème-solution réutilisé)
- Doc origine `plan-propriete-intellectuelle-fr.md` §4.2 (`analyse-refus-inpi`) + workflow `anteriorite-invalidite`

### B — Sources externes

- Directives examen INPI brevets (édition courante)
- Directives examen OEB partie G (Brevetabilité) + partie H (Amendements)
- Manuel Procédure OEB (MoPP)
- Lignes directrices TJ Paris brevets (jurisprudence récente)

---

*Version 2.1 — mode autonome, suite V1.1.2.*
