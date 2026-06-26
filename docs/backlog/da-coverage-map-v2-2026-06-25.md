# Cartographie de couverture réelle — hacienda-droit-affaires v2

**Date** : 2026-06-25  
**Base comparée** : `docs/backlog/da-coverage-map-2026-06-02.md`  
**Méthode** : lecture de la surface réelle des 31 `SKILL.md` présents dans `plugins/hacienda-droit-affaires/skills/*/SKILL.md` : description, exemples, intake, modes, sorties, hors-scope explicites, renvois croisés.  
**Objet** : matrice "workflows d'un cabinet M&A / corporate / droit des affaires FR" vs couverture Hacienda, par cycle. La typologie des workflows cabinet est une reconstruction de couverture produit, pas une source externe ; elle reste donc `[à vérifier]` si elle doit servir de benchmark marché strict.

---

## 1. Inventaire réel des 31 skills lus

### 1.1 Infrastructure / composables / routeurs (7)

| Skill | Surface réelle | Modes / limites |
|---|---|---|
| `cas` | Routeur front-door droit des affaires : contrat, impayé, M&A, difficulté, créance en procédure, vie sociale. | Oriente uniquement ; n'exécute aucune analyse juridique. Route distressed vers `asset-vs-share-distress` ou `distress-cedant`. |
| `check-pii` | Pré-flight PII léger : compte catégories A et B, seuil B, propose `hacienda-ghost`. | Ne remplace pas l'anonymisation ; sans ghost, données envoyées en clair. |
| `verifier-citations` | Post-flight de validation des articles / jurisprudence via Légifrance / Judilibre. | Mode dégradé si PISTE absent ; marque `[à vérifier]`, ne corrige pas silencieusement. |
| `entretien-demarrage` | Onboarding profil cabinet + diagnostic intégrations. | `--redo`, `--check-integrations`. |
| `consulter-digest` | Lecture fidèle d'un digest de veille. | Lecture seule, aucune analyse nouvelle, ne génère pas le digest. |
| `revue-tabulaire` | Extraction multi-docs en tableau, colonnes paramétrables. | Pas de criticité juridique ; brique consommée par DD. |
| `liste-de-points` | Issues list standardisée, standalone ou composant. | Produit tableau de négociation ; n'analyse pas le contrat source. |

### 1.2 Workflows métier (24)

| Cycle | Skills lus | Surface réelle dominante |
|---|---|---|
| M&A sain | `loi-term-sheet`, `due-diligence-dataroom`, `spa-review`, `gap-review`, `closing-checklist-fr` | LOI review/draft, DD, SPA/GAP review, signing/closing/formalités. |
| Vie sociale / corporate | `constitution-societe`, `gouvernance-ag`, `pacte-associes-review`, `financement-startup` | Constitution, AG/PV, pacte review, instruments startup. |
| Contrats / contentieux commercial | `reviser-contrat`, `reviser-nda`, `cgv-generator`, `mise-en-demeure-commerciale`, `analyser-rupture-brutale` | Review contrat/NDA, draft CGV, recouvrement précontentieux, rupture brutale. |
| Procédures collectives / restructuring | `prevention-difficultes`, `declaration-cessation-paiements`, `declaration-creance`, `responsabilite-dirigeant`, `defense-dirigeant` | Prévention, DCP, déclaration de créance + relevé, exposition dirigeant, trame défense. |
| Distressed M&A | `asset-vs-share-distress`, `distress-cedant`, `pre-pack-cession`, `reprise-a-la-barre`, `cession-actifs-isoles` | Routeurs et playbooks tactiques side-aware repreneur / cédant. |

---

## 2. Lecture synthétique par cycle

### 2.1 M&A sain

| Workflow cabinet `[à vérifier]` | Couverture Hacienda | Statut | Nature / commentaire |
|---|---|---|---|
| Origination / qualification deal | `cas` route ; pas de vrai intake deal autonome | 🟡 | [MODE] `cas` oriente mais ne construit pas une fiche deal complète. |
| LOI / term sheet review | `loi-term-sheet --review` | ✅ | Cartographie binding / non-binding, exclusivité, confidentialité, bonne foi. |
| LOI / term sheet draft | `loi-term-sheet --draft` | ✅ | Produit projet de LOI avec clauses binding / non-binding explicites. |
| Buy-side due diligence | `due-diligence-dataroom` + `revue-tabulaire` | ✅ | 7 thèmes, Q&A list, grille de matérialité, recommandations GAP. |
| Sell-side / vendor DD | `due-diligence-dataroom` | 🟡 | [MODE] Le ton mentionne le côté cédant/vendor DD, mais la surface reste surtout rapport DD + Q&A/disclosure ; pas de skill autonome de vendor DD / vendor assistance. |
| SPA review | `spa-review` | ✅ | Review architecture SPA, prix, CP, MAC, disclosure, DD -> protections ; modes courts `--red-flags`, `--issues-list`, `--signing-ready`, overlay `--distressed`. |
| SPA draft from scratch | Aucun | ❌ | [MODE] `spa-review` dit explicitement ne pas rédiger un SPA complet à partir de zéro. |
| Markup / redlines SPA | Aucun | ❌ | [BORD]/[MODE] Les sorties sont issues list, notes, formulations proposées ; pas de document redliné ou DOCX markup. |
| GAP review | `gap-review` | ✅ | Périmètre, mécanique financière, procédure, clauses sensibles, confrontation DD, overlay distressed. |
| GAP draft from scratch | Aucun | ❌ | [MODE] `gap-review` exclut la rédaction from scratch. |
| Signing / closing checklist | `closing-checklist-fr` | ✅ | CP, séquençage, documentation de closing, formalités post-closing. |
| Post-closing formalités | `closing-checklist-fr` | ✅ | Registre mouvements de titres, comptes d'associés, enregistrement, information tiers. |
| Post-closing intégration opérationnelle / TSA | `spa-review` signale transition services ; pas de playbook TSA | 🟡 | [SKILL] Couverture limitée à revue de clauses post-closing / checklist ; pas de TSA draft/review, pas de plan d'intégration. |
| Contrôle concentrations / FDI / sectoriel | Renvois `hacienda-reglementaire`, conseil concurrence | ❌ | [BORD] Le plugin DA recense les CP mais ne les instruit pas. |
| Fiscal M&A / droits / plus-values | Renvois `hacienda-fiscal`, expert-comptable | ❌ | [BORD] Signalement seulement ; aucun conseil fiscal. |

### 2.2 Vie sociale / corporate

| Workflow cabinet `[à vérifier]` | Couverture Hacienda | Statut | Nature / commentaire |
|---|---|---|---|
| Choix de forme sociale | `constitution-societe --comparer` | ✅ | SAS/SARL/SA, apports, régime social/fiscal signalé et renvoyé. |
| Statuts de constitution | `constitution-societe --draft` | ✅ | Brouillon assisté, points `[review]`, bifurcation SSP/notarié, commissaire aux apports. |
| Refonte statutaire / modifications statutaires | `gouvernance-ag` pour convocation/PV seulement | 🟡 | [SKILL] Le texte de modification statutaire est hors scope ; le skill produit convocation/PV. |
| Convocation AG | `gouvernance-ag --convocation` | ✅ | Délai, ordre du jour, pièces, statut par forme sociale. |
| PV d'assemblée | `gouvernance-ag --pv` | ✅ | Quorum/majorité, PV, contrôle cohérence votes. |
| Formalités greffe / publicité après AGE | Aucun | ❌ | [SKILL] `gouvernance-ag` exclut dépôt greffe et publicité. |
| Pacte d'associés review | `pacte-associes-review` | ✅ | 11 clauses, side fondateur / investisseur / société, renvoi PI si besoin. |
| Pacte d'associés draft | Aucun | ❌ | [MODE] Le skill dit review uniquement en v1.1. |
| Cession intra-groupe / intra-associés hors M&A | `closing-checklist-fr`, `pacte-associes-review` partiellement | 🟡 | [SKILL] Agrément/préemption et formalités sont couverts par morceaux, pas un workflow de cession standalone. |
| Conventions réglementées | Aucun skill dédié | ❌ | [SKILL] Gap inchangé, sauf mentions ponctuelles possibles en revue docs `[à vérifier]`. |
| Financement startup instruments | `financement-startup --comparer/--review` | ✅ | BSPCE/BSA/OC/OCA/augmentation de capital ; instruments uniquement. |
| Clauses de levée / pacte investisseur | `financement-startup` flag + `pacte-associes-review` | 🟡 | [MODE] `financement-startup` borne les clauses de pacte mais renvoie la revue détaillée. |

### 2.3 Contrats commerciaux / précontentieux

| Workflow cabinet `[à vérifier]` | Couverture Hacienda | Statut | Nature / commentaire |
|---|---|---|---|
| Revue contrat commercial entrant | `reviser-contrat` | ✅ | 15 clauses sensibles, taxonomie, enrichissement SIREN, alertes procédure collective. |
| Markup / redlines contrat | Aucun | ❌ | [BORD]/[MODE] Issues list et formulations proposées, mais pas de redline exploitable. |
| NDA triage rapide | `reviser-nda` | ✅ | Verdict vert/orange/rouge sur 9 points ; renvoie `reviser-contrat` si revue complète. |
| NDA complexe / clause-by-clause | `reviser-contrat` | ✅ | Couverture par tronc commercial, sauf PI-centric. |
| CGV/CGU draft | `cgv-generator --draft` | ✅ | B2B/B2C/mixte, mentions obligatoires, clauses abusives, points `[review]`. |
| Revue CGV existantes | `reviser-contrat` | ✅ | `cgv-generator` renvoie expressément la revue à `reviser-contrat`. |
| Mise en demeure / relance / sommation | `mise-en-demeure-commerciale` | ✅ | Nouveau depuis v1 : `--relance`, `--draft`, `--sommation`, BODACC gate L.622-21. |
| Injonction de payer / assignation | Aucun | ❌ | [SKILL] `mise-en-demeure-commerciale` produit trames précontentieuses, pas actes judiciaires. |
| Rupture brutale L.442-1 II | `analyser-rupture-brutale` | ✅ | Qualification relation établie, préavis, préjudice, dispense, renvois créance/PI. |
| Déséquilibre significatif L.442-1 I | `reviser-contrat` | 🟡 | [MODE] Couvert comme clause/risque contractuel, pas workflow contentieux autonome. |

### 2.4 Procédures collectives / restructuring

| Workflow cabinet `[à vérifier]` | Couverture Hacienda | Statut | Nature / commentaire |
|---|---|---|---|
| Prévention mandat ad hoc / conciliation | `prevention-difficultes --orienter/--draft` | ✅ | Gate CdP, mandat ad hoc, conciliation, accord constaté/homologué, new money signalé. |
| Sauvegarde accélérée | `prevention-difficultes` | 🟡 | [MODE] Oriente et pose conditions ; exclut la conduite de procédure, classes et vote. |
| Déclaration cessation paiements | `declaration-cessation-paiements` | ✅ | Gate CdP, 45 jours, tribunal, pièces R.631-1, squelette de déclaration. |
| Choix RJ vs LJ | `declaration-cessation-paiements`, `distress-cedant` | 🟡 | [MODE] Oriente sans trancher ; tribunal décide. |
| Déclaration de créance | `declaration-creance` | ✅ | BODACC, forclusion 2/4 mois, calcul créance, rang, réserve de propriété, courrier mandataire. |
| Relevé de forclusion | `declaration-creance --releve-forclusion` | ✅ | Nouveau mode : recevabilité 6 mois, cause, requête juge-commissaire, conséquences. |
| Contestation / admission de créance | Aucun | ❌ | [SKILL] `declaration-creance` exclut le suivi état des créances / contestation. |
| Responsabilité dirigeant exposition | `responsabilite-dirigeant` | ✅ | 4 axes : L.651-2/L.652-1, L.653, banqueroute nommée, cautions. |
| Défense dirigeant assigné | `defense-dirigeant` | ✅ | Trame de défense par axe réel ; ne rédige pas le mémoire. |
| Mémoire / conclusions devant tribunal | Aucun | ❌ | [BORD] Acte de l'avocat contentieuiste ; exclu explicitement. |
| Banqueroute pénale | Aucun | ❌ | [BORD] Nommée, renvoi pénaliste, jamais plaidée. |
| Plan de continuation / classes / vote | `prevention-difficultes` très partiel | ❌ | [SKILL] Pas de skill de conduite sauvegarde/RJ, plan, classes de parties affectées. |

### 2.5 Distressed M&A

| Workflow cabinet `[à vérifier]` | Couverture Hacienda | Statut | Nature / commentaire |
|---|---|---|---|
| Côté repreneur : arbitrage titres vs actifs | `asset-vs-share-distress` | ✅ | Routeur amont, passif non purgé en share deal, période suspecte, L.1224-1, fiscal flag. |
| Côté cédant/débiteur : sauver / céder / déposer | `distress-cedant` | ✅ | Routeur miroir, pivot 45 jours, exposition dirigeant, renvoi prévention/pre-pack/DCP. |
| Pre-pack cession | `pre-pack-cession` | ✅ | Cadrage side-aware débiteur/repreneur, gates CdP et faisabilité, séquençage amiable -> collectif. |
| Reprise à la barre / offre de reprise | `reprise-a-la-barre` | ✅ | Côté repreneur, RJ/LJ + appel d'offres, offre ferme L.642-2, éligibilité L.642-3. |
| Cession actifs isolés en LJ | `cession-actifs-isoles` | ✅ | Côté repreneur, actif isolé L.642-19, juge-commissaire, sûretés, contrats, salariés. |
| Côté débiteur dans cession judiciaire subie | `distress-cedant` signale rôle limité | ❌ | [SKILL] Pas de feuille débiteur dédiée à la vente à la barre subie / organes pilotent. |
| Acte de cession distressed / SPA judiciaire | `spa-review`, `gap-review`, `closing-checklist-fr` aval | 🟡 | [MODE] Les playbooks distressed renvoient aval ; aucun draft d'acte/offre final par défaut. |
| Conseil fiscal distressed | Aucun | ❌ | [BORD] Tous les skills distressed excluent conseil fiscal et renvoient externe. |

---

## 3. Réévaluation des 5 white spaces du 2 juin

| White space juin | Verdict v2 | Pourquoi |
|---|---|---|
| **Modalité markup/redline** | ❌ Gap confirmé | Aucun `SKILL.md` ne produit un document redliné. Les sorties sont notes, issues lists, tableaux et formulations proposées. Nature : [BORD]/[MODE]. |
| **Private Equity** | 🟡 Partiel | `financement-startup` couvre instruments startup et renvoie les clauses de pacte ; `pacte-associes-review` couvre pacte investisseur/fondateur ; `due-diligence-dataroom` et `spa-review` sont utiles sponsor. Mais pas de skill PE dédié : LBO, management package, term sheet sponsor, waterfall, sweet equity, debt package. Nature : [SKILL]. |
| **Financement d'acquisition dette / sûretés** | ❌ Gap confirmé | `financement-startup` exclut le financement d'acquisition : BSPCE/BSA/OC/augmentation de capital. Les sûretés sont traitées en incident M&A/distressed, pas comme documentation de financement. Nature : [SKILL]. |
| **Sell-side / vendor due diligence** | 🟡 Partiel | `due-diligence-dataroom` mentionne côté cédant/vendor DD et Q&A/disclosure, mais pas un vrai process vendor DD avec rapport vendeur, reliance, clean-up data-room, vendor assistance. Nature : [MODE] ou [SKILL] selon ambition. |
| **Post-closing / TSA** | 🟡 Partiel | `closing-checklist-fr` couvre formalités post-closing ; `spa-review` vérifie covenants post-closing et transition services. Il manque TSA draft/review, intégration, carve-out separation, notices opérationnelles. Nature : [SKILL]. |

---

## 4. Gaps priorisés v2

Notation : **Priorité** = valeur utilisateur / fréquence / risque ; **Effort** = ordre de grandeur produit ; **Persona** = principal bénéficiaire.

| # | Gap | Nature | Persona | Priorité | Effort | Justification |
|---|---|---|---|---|---|---|
| 1 | Markup / redlines DOCX contractuels | [BORD]/[MODE] | M&A + contrats | 🔴 | L | Gap transversal à forte valeur : tous les skills review sortent des issues lists, pas un document négociable. |
| 2 | Acquisition finance : dette, commitment letter, sûretés | [SKILL] | frère M&A / PE | 🔴 | M/L | Toujours gap malgré croissance ; absent de `financement-startup`. |
| 3 | Vendor DD / sell-side readiness | [MODE]/[SKILL] | frère M&A sell-side | 🟠 | M | Partiel dans DD, mais pas un workflow cédant complet de préparation de data-room/disclosure. |
| 4 | TSA / post-closing integration | [SKILL] | M&A / carve-out | 🟠 | M | Formalités couvertes, opérationnel non couvert. |
| 5 | Pacte d'associés draft | [MODE] | corporate / startup | 🟠 | M | Review solide ; draft explicitement exclu. |
| 6 | SPA / GAP draft from scratch | [MODE] | M&A | 🟠 | L | Review solide, mais drafting haute valeur exclu. |
| 7 | Conduite plan de continuation / sauvegarde / classes | [SKILL] | restructuring débiteur | 🟠 | L | Prévention oriente ; pas de conduite de procédure collective de continuation. |
| 8 | Contestation / admission de créance | [SKILL] | créancier / mandataire | 🟡 | M | Déclaration et relevé sont couverts ; suivi contentieux/admission absent. |
| 9 | Formalités corporate post-AGE / RCS / publicité | [SKILL] | vie sociale | 🟡 | S/M | `gouvernance-ag` exclut dépôt et publicité ; extension naturelle du cycle AG. |
| 10 | Conventions réglementées | [SKILL] | vie sociale | 🟡 | S/M | Toujours pas de workflow dédié. |
| 11 | Côté débiteur dans cession judiciaire subie | [SKILL] | restructuring débiteur | 🟡 | M | `distress-cedant` signale rôle limité ; pas de feuille pour préparer le débiteur avec les organes. |
| 12 | Contrôle concentrations / FDI / sectoriel minimal | [BORD] | M&A | 🟡 | décision | Les skills recensent/renvoient ; décider si DA absorbe un triage minimal ou laisse au plugin réglementaire. |

---

## 5. Ordre suggéré

1. **Markup/redlines transverses** : ajouter une modalité de sortie commune aux reviews (`reviser-contrat`, `spa-review`, `gap-review`, `pacte-associes-review`, `reviser-nda`). Même une v1 "table de clauses + texte proposé" exportable en DOCX serait un saut d'utilité.
2. **Acquisition finance** : créer un skill dette/sûretés couvrant term sheet dette, CP financement, sûretés titres/fonds/actifs, intercreditor en version FR-light `[à vérifier]`.
3. **Vendor DD / sell-side readiness** : étendre `due-diligence-dataroom` ou créer un skill dédié pour préparer data-room, rapport vendeur, disclosure, Q&A anticipée.
4. **TSA / post-closing integration** : créer un skill `tsa-post-closing` : revue/draft TSA, notices tiers, transition IT/RH/finance, calendrier d'intégration.
5. **Pacte draft puis SPA/GAP draft** : après les sorties markup, ajouter les modes `--draft` là où le playbook de review est déjà mature.
6. **Restructuring continuation / contestation créance** : combler les trous qui restent après le moat distressed : plan de continuation/classes et suivi/contestation de créance.

---

## 6. Conclusion stratégique

La conclusion du 2 juin doit être fortement révisée. Le plugin n'est plus faible en procédures collectives : il dispose maintenant d'un moat cohérent autour de `prevention-difficultes`, `declaration-cessation-paiements`, `declaration-creance --releve-forclusion`, `responsabilite-dirigeant`, `defense-dirigeant`, et du sous-ensemble distressed M&A (`asset-vs-share-distress`, `distress-cedant`, `pre-pack-cession`, `reprise-a-la-barre`, `cession-actifs-isoles`).

La nouvelle faiblesse principale n'est plus "absence de restructuring", mais **absence de production négociable** : redlines, drafts M&A complexes, acquisition finance et sell-side/TSA. Le coeur M&A/contrats est très solide en **review + issues list + routage**, et le distressed est devenu un vrai avantage produit. Pour un cabinet, le prochain cran de valeur est de transformer ces analyses en artefacts directement actionnables dans la négociation.
