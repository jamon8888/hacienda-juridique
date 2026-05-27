---
name: spa-review
description: >
  Revue d'un SPA / protocole de cession / acte de cession M&A de droit
  français. Analyse l'architecture du deal, prix, conditions suspensives,
  covenants d'interim, MAC, disclosure, garanties, indemnisation, renvois GAP,
  cohérence DD et readiness signing/closing. Side acquéreur ou cédant
  obligatoire. Brouillon soumis à validation avocat M&A.
version: "1.0.0"
authors: ["Hacienda"]
tags: [spa, ma, cession-titres, protocole-cession, signing, closing, gap]
---

# Skill — SPA review

> **BROUILLON, VALIDATION AVOCAT M&A OBLIGATOIRE.**
>
> Ce skill analyse un SPA / protocole de cession / acte de cession dans une
> opération M&A de droit français. Il produit une liste de points de négociation
> et un résumé partner-ready. Il ne signe pas le contrat, ne rédige pas un SPA
> complet à partir de zéro, et ne remplace pas une validation avocat.
>
> **Frontière avec les autres skills.** `spa-review` traite l'architecture du
> SPA et les points de cohérence. La GAP technique reste traitée par
> `/hacienda-droit-affaires:gap-review`. Le pilotage signing / closing /
> post-closing reste traité par `/hacienda-droit-affaires:closing-checklist-fr`.
> L'audit data-room reste traité par `/hacienda-droit-affaires:due-diligence-dataroom`.

---

## Examples

<example>
<user>/hacienda-droit-affaires:spa-review ./SPA-cible-X.pdf --side=acquereur --type=cession-titres --prix=12000000 --dd-findings=./rapport-dd.md</user>
<response>
1. Pré-flight `check-pii` sur le SPA et les findings DD.
2. Lecture profil cabinet, bloc M&A / Corporate.
3. Identification : SPA de cession de 100 % des titres d'une SAS, signing et closing différés, prix 12 M EUR.
4. Analyse des axes SPA : deal facts, pouvoirs, CP, interim covenants, MAC, prix, disclosure, GAP, DD, closing.
5. Findings principaux : disclosure letter absente 🔴 ; clause de changement de contrôle client clé non traitée 🔴 ; plafond GAP 8 % du prix 🟠 ; non-concurrence cédant 7 ans 🟠.
6. Renvoi `gap-review` pour la mécanique financière de garantie et `closing-checklist-fr` pour les CP / formalités.
7. Sortie partner-ready : résumé exécutif, red flags, liste de points, recommandation "ne pas signer en l'état".
</response>
</example>

<example>
<user>/hacienda-droit-affaires:spa-review ./SPA-sell-side.pdf --side=cedant --type=cession-titres --red-flags</user>
<response>
Mode `--red-flags`, côté cédant. La sortie se concentre sur les blocages : MAC trop large, garantie de la garantie non plafonnée, covenant d'interim empêchant l'exploitation normale, earn-out discrétionnaire. Les points mineurs sont reportés en annexe courte.
</response>
</example>

<example>
<user>/hacienda-droit-affaires:spa-review ./SPA.pdf --side=acquereur --signing-ready</user>
<response>
Gate signing-ready : le SPA n'est pas prêt à signer. Trois prérequis manquent : disclosure letter annexée, décisions sociales d'agrément, confirmation de levée d'une CP réglementaire. Le skill recommande de lancer `closing-checklist-fr` après correction.
</response>
</example>

<example>
<user>/hacienda-droit-affaires:spa-review ./SPA-portefeuille-PI.pdf --side=acquereur --type=cession-titres</user>
<response>
Détection d'un portefeuille PI structurant dans les actifs de la cible : marques, logiciel, open source, noms de domaine. `spa-review` traite l'architecture M&A et signale les protections SPA nécessaires, puis renvoie vers `/hacienda-propriete-intellectuelle:audit-pi-ma` ou `/hacienda-propriete-intellectuelle:contrats-pi` pour l'analyse PI approfondie.
</response>
</example>

---

## Chargement du profil

> Lire `~/.claude/plugins/config/hacienda-juridique/hacienda-droit-affaires/CLAUDE.md`, bloc M&A / Corporate :
> - **Side habituel M&A** — cédant / acquéreur / conseil des deux.
> - **Posture SPA** — protecteur / équilibré / facilitateur.
> - **Taille de deals typique** — pour calibrer matérialité et niveau de détail.
> - **Matrice d'approbateurs** — ligne "Signature SPA".
> - **Posture GAP par défaut** — pour détecter les écarts grossiers avant renvoi `gap-review`.
> - **Politique PII** — `passive` / `active` / `strict` + seuil B.

Si le profil n'est pas encore peuplé (`[A CONFIGURER]` présent), stopper et
demander `/hacienda-droit-affaires:entretien-demarrage` avant toute revue SPA
substantielle.

---

## Intake

1. **Mode** — `--review` par défaut ; options de sortie `--red-flags`, `--issues-list`, `--signing-ready`.
2. **Fichier SPA** — chemin du PDF / DOCX / Markdown.
3. **Side** — `--side=acquereur` | `--side=cedant` (**obligatoire**). Une analyse neutre d'un SPA n'a pas de sens praticien.
4. **Type d'opération** — `--type=cession-titres` | `--type=cession-fonds` | `--type=asset-deal` | `--type=fusion`. Si absent, auto-détecter puis demander confirmation.
5. **Prix** — `--prix=12000000` si disponible ; sert à calibrer seuils, escrow, plafonds et matérialité.
6. **Findings DD** — `--dd-findings=./rapport-dd.md` optionnel ; active la confrontation DD -> protections SPA.
7. **GAP séparée** — `--gap=./GAP-annexe.pdf` optionnel ; si fourni, renvoyer explicitement vers `gap-review` pour l'analyse technique.

---

## Étape 1 — Pré-flight + identification

1. Invoquer `check-pii` sur le SPA et, le cas échéant, sur les findings DD.
2. Lire le profil cabinet et identifier le side.
3. Identifier le document : SPA / protocole de cession / acte de cession / asset purchase agreement.
4. Confirmer le type d'opération : cession de titres, cession de fonds, asset deal ou fusion.
5. Identifier parties, cible, prix, signing, closing, droit applicable, juridiction, annexes mentionnées.
6. Détecter SIREN cible si présent et tenter l'enrichissement `companyFullProfile` via les outils core disponibles.

---

## Étape 2 — Deal facts et périmètre

Vérifier :

- titres ou actifs cédés ;
- pourcentage cédé ;
- prix fixe, prix ajustable, locked box, completion accounts, earn-out ;
- date d'effet économique ;
- signing / closing simultanés ou différés ;
- annexes nécessaires au périmètre : cap table, statuts, comptes, dette nette, BFR, liste des contrats clés.

Tout périmètre ambigu est au minimum 🟠, car il contamine le prix, la GAP et le closing.

---

## Étape 3 — Capacité, pouvoirs et restrictions sur titres

Vérifier :

- pouvoirs des signataires ;
- décisions sociales d'autorisation ;
- agrément, préemption, inaliénabilité, droit de sortie conjointe ou forcée ;
- nantissements ou sûretés sur titres ;
- restrictions statutaires ou pacte d'associés.

Si le sujet relève d'une revue de pacte ou statuts complexe, renvoyer vers
`pacte-associes-review` ou `gouvernance-ag` selon le besoin.

---

## Étape 4 — Conditions suspensives et consentements

Recenser chaque CP : objet, bénéficiaire, responsable, délai, preuve de levée,
faculté de renonciation. Vérifier notamment financement, agrément corporate,
autorisation réglementaire, contrôle des investissements étrangers, contrôle
des concentrations, consentements de cocontractants clés.

Une CP nécessaire mais absente est 🔴. Une CP rédigée de façon potestative ou
trop discrétionnaire est 🟠 avec tag `[review]`.

---

## Étape 5 — Période intercalaire, MAC et résiliation

Vérifier :

- covenants d'interim : ordinary course, dette, investissements, embauches, contrats clés ;
- information de l'acquéreur pendant l'interim period ;
- clause MAC : définition, exclusions, seuil, effet ;
- droit de résiliation pré-closing ;
- leakage interdit ou autorisé en locked box.

La MAC et les covenants sont side-dependent : côté acquéreur, rechercher une
protection réelle ; côté cédant, limiter les clauses trop discrétionnaires ou
paralysantes.

---

## Étape 6 — Prix, ajustements et paiement

Vérifier :

- mécanisme locked box ou completion accounts ;
- leakage autorisé / interdit ;
- earn-out : formule déterminable, durée, gouvernance post-closing, audit ;
- séquestre / escrow ;
- mécanisme d'expertise ;
- calendrier de paiement.

Un earn-out sans formule déterminable ou sans gouvernance post-closing est 🟠
ou 🔴 selon matérialité.

---

## Étape 7 — Déclarations, garanties, indemnisation et disclosure

Analyser l'architecture générale :

- déclarations fondamentales ;
- déclarations business ;
- disclosure letter et annexes ;
- exclusions ;
- indemnisation ;
- articulation avec GAP.

Ne pas refaire `gap-review`. Si les clauses de garantie sont substantielles,
renvoyer vers `/hacienda-droit-affaires:gap-review` avec les paramètres déjà
extraits : side, prix, fichiers et findings DD.

---

## Étape 8 — Confrontation DD -> protections SPA

Si `--dd-findings` est fourni, créer un tableau :

| Finding DD | Gravité DD | Protection SPA attendue | Protection trouvée | Statut |
|---|---|---|---|---|

Pour chaque finding matériel, vérifier qu'il est traité par au moins une
protection : CP, déclaration spécifique, indemnité spécifique, escrow, réduction
de prix, engagement post-closing ou abandon documenté.

Si aucun finding DD n'est fourni, mentionner : "Confrontation DD non exécutée ;
un SPA ne peut pas être considéré signing-ready sans revue des findings DD."

---

## Étape 9 — Covenants restrictifs et post-closing

Vérifier non-concurrence cédant, non-sollicitation, confidentialité,
accompagnement post-closing, transition services, obligations de coopération.
Taguer `[review]` sur durée, territoire, activité et contrepartie.

---

## Étape 10 — Renvois et liste de points

Produire les renvois actifs :

- `gap-review` pour la GAP technique ;
- `closing-checklist-fr` pour CP, signing, closing, post-closing ;
- `due-diligence-dataroom` si les findings DD manquent ;
- `hacienda-propriete-intellectuelle` pour PI ;
- `hacienda-fiscal` pour fiscalité ;
- `hacienda-social` pour social ;
- `hacienda-reglementaire` pour autorisations sectorielles.

Appeler mentalement le format `liste-de-points` : tableau trié par criticité
décroissante, sans doublon, avec position souhaitée et formulation proposée.

---

## Étape 11 — Post-flight `verifier-citations`

Vérifier les citations d'articles et de jurisprudence. Les points non vérifiés
restent `[a verifier]`. Les sujets fiscaux, sociaux, PI, AMF ou réglementaires
non traités par une source primaire consultée restent `[a verifier]`.

---

## Sortie

### Format livrable

```
[En-tête de confidentialité selon le rôle utilisateur]

> **⚠️ Note du relecteur**
> - **Sources :** Légifrance ✓ / Judilibre ✓ / Pappers ✓ / BODACC ✓ (cocher ✗ si non connectée)
> - **Lecture :** intégrale ({N} pages SPA + {M} annexes) | partielle (pages X à Y)
> - **Signalé pour ton jugement :** {N} éléments marqués [review] | aucun
> - **Fraîcheur :** recherche juridique post-{date} — {N} mises à jour intégrées | rien trouvé
> - **Avant de t'appuyer dessus :** {action concrète : négocier / compléter / escalader / prêt pour relecture}

# SPA review — {cible} — {side}

## Résumé exécutif

{Trois phrases partner-ready : bottom-line, risque dominant, prochaine action.}

## Deal facts

| Champ | Lecture |
|---|---|
| Type d'opération | ... |
| Cible | ... |
| Prix | ... |
| Signing / closing | ... |
| Mécanisme de prix | locked box / completion accounts / earn-out / autre |

## Red flags

| # | Sujet | Statut | Pourquoi ça compte | Action |
|---|---|---|---|---|

## Analyse par axes

1. Deal facts et périmètre
2. Capacité / pouvoirs / restrictions sur titres
3. Conditions suspensives
4. Interim covenants / MAC
5. Prix / ajustements / paiement
6. Garanties / indemnisation / disclosure
7. DD -> protections SPA
8. Covenants restrictifs / post-closing

## Liste de points

| # | Clause | Statut | Risque | Position souhaitée ({side}) | Formulation proposée |
|---|---|---|---|---|---|

## Renvois recommandés

| Sujet | Skill |
|---|---|

## Recommandation

{Signer / Négocier / Ne pas signer / Compléter} — justification 2-3 lignes.

## Une question hors de ma checklist habituelle

{Observation transversale, ou omission si rien d'honnête à dire.}

## Que veux-tu faire ? Choisis une option :

1. **Rédiger** — je prépare un courrier de négociation ou une liste de points prête à envoyer.
2. **Escalader** — je rédige une note vers {approbateur SPA configuré}.
3. **Compléter les faits** — je liste les questions à poser à l'équipe deal, au client ou à la contrepartie.
4. **Surveiller et attendre** — j'ajoute le sujet au tracker du dossier avec date de revisite.
5. **Autre** — précise.

[Ce skill a traité {N} mentions identifiantes. Pour anonymiser automatiquement avant envoi à Claude, installer hacienda-ghost.](https://hacienda.diy/ghost)
```

### Modes courts

- `--red-flags` : ne produire que Note du relecteur, Résumé exécutif, Red flags, Recommandation, Arbre 5 options.
- `--issues-list` : ne produire que Note du relecteur, Deal facts, Liste de points, Renvois, Arbre 5 options.
- `--signing-ready` : produire un verdict `Prêt à signer` / `Pas prêt à signer` / `Prêt sous conditions`, avec conditions manquantes.

## Gate non-juriste

- [ ] Side fourni ou confirmé.
- [ ] Type d'opération fourni ou confirmé.
- [ ] `check-pii` exécuté.
- [ ] Profil M&A lu.
- [ ] Renvois GAP / closing / DD / PI / fiscal / social / réglementaire faits quand nécessaires.
- [ ] Liste de points triée par criticité, sans doublon.
- [ ] Citations vérifiées ou taguées `[a verifier]`.
- [ ] Sortie contient note 5 champs + arbre 5 options + footer PII.

## Ce skill ne fait pas

- Rédiger un SPA complet à partir de zéro.
- Signer ou valider définitivement le SPA.
- Refaire l'analyse technique de la GAP : utiliser `gap-review`.
- Piloter le closing : utiliser `closing-checklist-fr`.
- Auditer une data-room complète : utiliser `due-diligence-dataroom`.
- Donner un avis fiscal, social, PI, réglementaire ou AMF détaillé.

## Ton

Technique, direct, partner-ready. Toujours rappeler le side. Prioriser les
points qui changent la négociation, le signing ou le prix. Ne pas fabriquer de
findings de remplissage.
