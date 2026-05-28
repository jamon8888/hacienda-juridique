# Hacienda Droit des Affaires — M&A UX + SPA Review Design

Date: 2026-05-26
Status: Proposed
Scope: Amélioration UX pour cabinet M&A autour du cycle deal et ajout d'un skill dédié `spa-review`. Vague courte, parallel-safe, développée en parallèle des validations personas V1/V1.1/V1.2/V2a, sans toucher aux skills existants autrement que par routage documentaire.

Specs de référence :
- V1 : `docs/superpowers/specs/2026-05-18-hacienda-droit-affaires-design.md`
- V1.1 : `docs/superpowers/specs/2026-05-20-hacienda-droit-affaires-v1.1-design.md`
- V1.2 : `docs/superpowers/specs/2026-05-21-hacienda-droit-affaires-v1.2-design.md`
- V2a : `docs/superpowers/specs/2026-05-26-hacienda-droit-affaires-v2a-design.md`

---

## Contexte

Le plugin `hacienda-droit-affaires` couvre déjà la matière M&A par assemblage :

- `reviser-nda` pour les NDA commerciaux et NDA M&A ;
- `loi-term-sheet` pour LOI / term sheet ;
- `due-diligence-dataroom` pour l'audit data-room ;
- `reviser-contrat` pour la revue contractuelle générale, incluant SPA ;
- `gap-review` pour la Garantie d'Actif et de Passif ;
- `closing-checklist-fr` pour signing / closing / post-closing.

La couverture juridique est correcte, mais l'UX n'est pas encore celle d'un cabinet M&A. Un avocat ou collaborateur pense naturellement : "je révise le SPA", pas "je lance une revue de contrat généraliste, puis un focus GAP, puis une checklist closing". Le moment SPA est donc trop dispersé.

La présente vague crée un point d'entrée naturel : `spa-review`. Ce skill orchestre les briques existantes, clarifie les frontières et rend le cycle M&A lisible de bout en bout.

## Personas

| Persona | Rôle |
|---|---|
| Frère — managing partner cabinet M&A | Validateur principal. UX attendue : résultat partner-ready, liste de points claire, pas de dispersion entre skills. |
| Collaborateur M&A du cabinet | Utilisateur opérationnel. Besoin : savoir quel skill lancer et obtenir une liste de points exploitable en négociation. |
| Ami — droit des sociétés / entreprises en difficulté | Validateur secondaire sur les sujets corporate, CP, cessions de titres, procédures collectives incidentes. |

## Goals

1. Ajouter `spa-review` comme entrée naturelle pour un SPA / protocole de cession / acte de cession M&A.
2. Améliorer l'UX de routage M&A : NDA -> NBO/LOI/Term Sheet -> DD -> SPA -> GAP -> Closing.
3. Rendre `NBO / Non-Binding Offer` explicitement reconnu et routé vers `loi-term-sheet`.
4. Ne pas dupliquer `gap-review` : `spa-review` traite l'architecture SPA et appelle ou recommande `gap-review` pour le focus Garantie d'Actif et de Passif.
5. Ne pas dupliquer `closing-checklist-fr` : `spa-review` vérifie la cohérence signing / closing, puis renvoie au skill closing pour le pilotage opérationnel.
6. Rester parallel-safe : aucune modification des skills V1/V1.1/V1.2/V2a existants pendant la validation personas.

## Non-Goals

1. Pas de rédaction complète d'un SPA à partir de zéro.
2. Pas de redline Word automatique ni production DOCX.
3. Pas de revue fiscale détaillée des droits d'enregistrement, plus-values, intégration fiscale ou régime de faveur — renvoi `hacienda-fiscal`.
4. Pas de revue sociale complète des transferts de contrats, information-consultation CSE, management package — signalement et renvoi.
5. Pas de revue PI approfondie — renvoi `hacienda-propriete-intellectuelle` pour portefeuille PI, logiciel, open source, marques, brevets.
6. Pas de droit boursier complet ni cibles cotées AMF — simple signalement `[a verifier]`, futur v3+.
7. Aucun nouvel outil `packages/core`, aucun agent, aucun MCP server métier.
8. Pas d'activation des workspaces de dossier.

## Contrainte directrice — parallélisme sûr

La vague se développe sur `main` en mode additif :

1. Nouveau skill `spa-review` uniquement.
2. Nouveau dataset de test interne.
3. Mises à jour documentaires limitées : taxonomie de routage, README, CHANGELOG et handoff.
4. Aucune modification de `reviser-contrat`, `gap-review`, `due-diligence-dataroom`, `loi-term-sheet`, `closing-checklist-fr` ou `packages/core`.
5. Si un bug persona est remonté sur un skill existant, il reste prioritaire et se corrige dans un commit séparé.

## Périmètre

| Composant | Type | Statut |
|---|---|---|
| `spa-review` | Nouveau skill `--review` | A créer |
| `tests/datasets/v2-spa/spa-review-scenario.md` | Dataset synthétique | A créer |
| `references/taxonomie-contrats-fr.md` | Routage M&A actualisé | Modification documentaire |
| `README.md` | Parcours cabinet M&A | Modification documentaire |
| `CHANGELOG.md` | Section non publiée | Modification documentaire |

## Ordre de construction

```
Tâche 0   Préliminaires
          - Lire les derniers specs/plans V2a.
          - Vérifier worktree et préserver les changements utilisateur.
          - Confirmer qu'aucun outil core n'est nécessaire.

Wave 1   Skill spa-review + dataset

Wave 2   UX de routage M&A
          - Taxonomie : NBO -> loi-term-sheet ; SPA -> spa-review.
          - README : parcours M&A cabinet.
          - CHANGELOG : section non publiée.

Tâche finale   Vérifications + handoff
```

## Détail du skill

### `spa-review` — mode `--review`

Analyse un SPA / protocole de cession / acte de cession dans une opération M&A de droit français. Le skill produit une liste de points de négociation et un résumé partner-ready. Il traite l'architecture du SPA, pas seulement des clauses commerciales génériques.

**Modes / flags :**

- `--review` : mode par défaut, revue complète du SPA.
- `--red-flags` : sortie concentrée sur les blocages critiques.
- `--issues-list` : sortie courte orientée liste de points pour négociation.
- `--signing-ready` : gate de signature, vérifie si le SPA est prêt à signer ou s'il manque des conditions / annexes / validations.

**Intake :**

1. Fichier SPA / protocole / acte de cession.
2. Side obligatoire : `--side=acquereur` ou `--side=cedant`.
3. Type d'opération : `--type=cession-titres`, `--type=cession-fonds`, `--type=asset-deal`, `--type=fusion`.
4. Prix ou fourchette de prix, si disponible.
5. Option `--dd-findings=...` pour confronter le SPA aux findings DD.
6. Option `--gap=...` si la GAP est dans une annexe ou un fichier séparé.

### Axes d'analyse

1. **Deal facts et périmètre** : parties, cible, titres ou actifs cédés, prix, date d'effet, signing / closing, locked box vs completion accounts, earn-out, complément de prix.
2. **Capacité et pouvoirs** : qualité des signataires, décisions sociales nécessaires, agrément, préemption, droits de tiers, pouvoirs du représentant.
3. **Conditions suspensives** : financement, autorisations corporate, autorisations réglementaires, contrôle des investissements étrangers, concurrence, consentements contractuels.
4. **Période intercalaire** : covenants d'interim, ordinary course, opérations interdites, leakage, gestion des contrats clés, information de l'acquéreur.
5. **MAC / résiliation pré-closing** : définition du Material Adverse Change, déclenchement, exclusions, remèdes, asymétrie side-dependent.
6. **Prix et ajustements** : locked box leakage, completion accounts, earn-out, mécanisme d'expertise, calendrier de paiement, séquestre / escrow.
7. **Déclarations, garanties et indemnisation** : architecture générale, disclosure letter, exclusions, plafond / franchise / durée, renvoi `gap-review` pour l'analyse technique.
8. **Confrontation DD** : chaque finding matériel doit avoir une protection SPA : CP, déclaration spécifique, indemnité spécifique, réduction de prix, escrow, ou abandon documenté.
9. **Covenants restrictifs** : non-concurrence cédant, non-sollicitation, confidentialité, clauses de transition, accompagnement post-closing.
10. **Governing law / litiges / formalités** : droit applicable, juridiction / arbitrage, formalités post-closing, renvoi `closing-checklist-fr`.

### Renvois actifs

| Situation | Renvoi |
|---|---|
| GAP substantielle ou annexe GAP séparée | `gap-review` |
| Besoin de piloter CP, signing, closing, post-closing | `closing-checklist-fr` |
| Data-room non analysée ou findings DD absents | `due-diligence-dataroom` |
| Portefeuille PI, logiciel, open source, marque, brevet | `hacienda-propriete-intellectuelle` |
| Fiscalité, droits d'enregistrement, plus-values, régime d'intégration | `hacienda-fiscal` |
| Social / transfert salariés / CSE / management package | `hacienda-social` ou signalement `[a verifier]` si le plugin n'est pas disponible |
| Autorisation réglementaire sectorielle | `hacienda-reglementaire` |
| Cible cotée / AMF | Signalement hors scope `[a verifier]`, futur v3+ |

## Format de sortie

`spa-review` suit les patterns canoniques V1/V1.1/V1.2 :

- frontmatter YAML ;
- bloc disclaimer en citation ;
- 3-4 exemples ;
- `## Chargement du profil` ;
- `## Intake` numérotée ;
- `## Étape N` ;
- `## Sortie` avec note du relecteur 5 champs en gras, arbre de décision 5 options dont option 4 "Surveiller et attendre", footer A PII.

Sortie attendue :

1. En-tête de confidentialité selon rôle.
2. Note du relecteur.
3. Résumé exécutif partner-ready.
4. Deal facts.
5. Tableau red flags.
6. Analyse par axes.
7. Liste de points consolidée triée par criticité.
8. Gaps DD -> protections SPA.
9. Renvois vers skills spécialisés.
10. Recommandation : signer / négocier / ne pas signer / compléter.
11. Question hors checklist.
12. Arbre de décision 5 options.

## Dataset de test

Créer `plugins/hacienda-droit-affaires/tests/datasets/v2-spa/spa-review-scenario.md`.

Scénario : SPA de cession de 100 % des titres d'une SAS française, side acquéreur, prix 12 M EUR, signing et closing différés.

Pièges attendus :

- CP d'autorisation réglementaire rédigée comme facultative alors qu'elle conditionne l'opération ;
- locked box sans clause leakage suffisamment précise ;
- earn-out sans méthode de calcul déterminable ;
- MAC très large, favorable acquéreur mais potentiellement trop discrétionnaire ;
- covenant d'interim trop vague ;
- disclosure letter mentionnée mais non annexée ;
- plafond GAP à 8 % du prix, sous fourchette buy-side ;
- finding DD sur contrat client clé avec clause de changement de contrôle non traité par CP ni garantie spécifique ;
- non-concurrence cédant de 7 ans, territoire trop large ;
- formalités post-closing réduites à une phrase, sans registre de mouvements de titres ni droits d'enregistrement.

## Tests

| Composant | Vérification |
|---|---|
| `spa-review` | Structure canonique : frontmatter, disclaimer, examples, chargement profil, intake, étapes, sortie, note 5 champs, arbre 5 options, footer A |
| Dataset SPA | Le skill doit détecter les red flags listés et produire une liste de points priorisée |
| Taxonomie | `SPA / protocole de cession` route vers `spa-review`, `NBO / Non-Binding Offer` route vers `loi-term-sheet` |
| README | Le parcours M&A cabinet est lisible en 1 écran |
| Non-régression | `npm test`, `npm run typecheck`, `npm run build`, `npm run branding:check`, `git diff --check` |

## Risques

### R1 — Duplication avec `gap-review`

Le SPA contient souvent la GAP. Risque : `spa-review` refait `gap-review`.

Mitigation : `spa-review` vérifie l'architecture et les points de cohérence, puis renvoie à `gap-review` pour les paramètres techniques de garantie : plafond, franchise, durée, procédure, knowledge qualifiers, confrontation fine aux findings DD.

### R2 — Duplication avec `closing-checklist-fr`

Le SPA prépare le closing, mais ne pilote pas les formalités.

Mitigation : `spa-review` identifie les manques de CP, actes et formalités ; `closing-checklist-fr` reste l'outil de pilotage signing / closing / post-closing.

### R3 — Skill trop large

Un SPA touche fiscal, social, PI, réglementaire, concurrence.

Mitigation : analyse de premier niveau seulement ; renvois explicites vers plugins spécialisés. Les sujets hors index sont tagués `[a verifier]`.

### R4 — Confusion SPA / APA / cession de fonds

Le terme SPA peut être utilisé improprement pour asset deal.

Mitigation : intake `--type` obligatoire ou auto-détection suivie d'une confirmation. Les formalités et risques sont distincts selon cession de titres, fonds, actifs ou fusion.

## Acceptance Criteria

1. `spa-review` existe au format canonique et s'installe comme skill du plugin.
2. Le skill exige ou confirme le side `acquereur` / `cedant`.
3. Le skill distingue SPA de cession de titres, cession de fonds, asset deal et fusion.
4. Le skill produit une analyse par axes et une liste de points priorisée.
5. Le skill renvoie vers `gap-review` pour la GAP technique et vers `closing-checklist-fr` pour le pilotage closing.
6. Le skill confronte les findings DD fournis aux protections SPA.
7. `NBO / Non-Binding Offer` est explicitement routé vers `loi-term-sheet`.
8. `SPA / protocole de cession` est explicitement routé vers `spa-review`.
9. Le parcours M&A cabinet est documenté dans le README.
10. Aucun skill V1/V1.1/V1.2/V2a existant ni `packages/core` n'est modifié.
11. Vérifications finales vertes : `npm test`, `npm run typecheck`, `npm run build`, `npm run branding:check`, `git diff --check`.

---

*Version 1.0 — spec M&A UX + SPA review à utiliser pour le plan d'implémentation.*
