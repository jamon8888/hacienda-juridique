---
name: declaration-cessation-paiements
description: >
  Côté débiteur/dirigeant : prépare la déclaration de cessation des paiements
  (« dépôt de bilan ») à déposer au greffe quand l'entreprise ne peut plus faire
  face à son passif exigible avec son actif disponible (art. L.631-1 C.com.).
  Qualifie la cessation des paiements, calcule le délai légal de 45 jours
  (L.631-4 RJ / L.640-4 LJ), ALERTE si la déclaration est tardive (faute de
  gestion possible, L.651-2 insuffisance d'actif, période suspecte rallongée),
  liste les pièces obligatoires R.631-1 C.com., oriente tribunal compétent et
  RJ vs LJ, et rédige le squelette de la déclaration avec [à compléter] sur les
  chiffres. Gate : si l'entreprise n'est PAS encore en cessation des paiements,
  renvoi `prevention-difficultes` (mandat ad hoc / conciliation / sauvegarde).
  Ne fabrique jamais les chiffres du client ; n'évalue pas la responsabilité du
  dirigeant (la nomme et renvoie à un avocat). Brouillon, validation humaine
  (avocat) OBLIGATOIRE.
version: "2.0.0"
argument-hint: "[forme sociale, date présumée de cessation des paiements (ou actif disponible / passif exigible), RJ ou LJ envisagé ; côté débiteur]"
authors: ["Hacienda"]
tags: [procedures-collectives, cessation-paiements, depot-de-bilan, debiteur, l631-4]
---

# Skill — Déclaration de cessation des paiements (L.631-4)

> **BROUILLON, validation humaine (avocat) OBLIGATOIRE.**
>
> Le délai de **45 jours** pour déclarer la cessation des paiements (art. L.631-4
> C.com. pour le redressement, L.640-4 C.com. pour la liquidation `[Légifrance]`)
> est une **règle dure** : la déclaration tardive est une faute de gestion
> classiquement sanctionnée (interdiction de gérer, art. L.653-8 C.com. ;
> contribution à l'insuffisance d'actif, art. L.651-2 C.com. `[Légifrance]`).
> Le délai ne court pas si une **conciliation** (L.611-4) a été demandée dans
> l'intervalle.
>
> La **date de cessation des paiements** est un **jugement** (actif disponible
> vs passif exigible, art. L.631-1 C.com.) lourd de conséquences : la **période
> suspecte** (nullités L.632-1 / L.632-2) court à rebours depuis elle, et le
> tribunal peut la reporter jusqu'à **18 mois** avant le jugement (L.631-8).
> Toujours taguer la date retenue `[review]`.
>
> La déclaration déposée au greffe est un **livrable externe** : retirer
> l'en-tête de confidentialité avocat (cf. CLAUDE.md plugin §2).

---

## Examples

<example>
<user>/h-da:declaration-cessation-paiements — SAS, trésorerie épuisée, passif fournisseurs+URSSAF exigible depuis 3 semaines, redressement espéré</user>
<response>
1. Pré-flight `check-pii` (dénominations + montants + dirigeant → seuil B fréquent).
2. Gate CdP (L.631-1) : passif exigible > actif disponible confirmé → cessation des paiements établie. Date présumée de CdP `[review]` : ~3 semaines.
3. Délai 45 j (L.631-4) : CdP + 45 j → ~24 j restants → 🟠 — déposer sous quelques jours.
4. Tribunal : SAS = société commerciale → tribunal de commerce.
5. Orientation : redressement espéré → demander RJ (le tribunal tranche RJ/LJ).
6. Pièces R.631-1 + squelette de déclaration ([à compléter] : chiffres trésorerie, état créances/dettes, inventaire).
</response>
</example>

<example>
<user>/h-da:declaration-cessation-paiements — SARL, cessation des paiements remonte à ~4 mois, activité arrêtée</user>
<response>
Gate CdP : établie. Date de CdP ~4 mois `[review]`.
Délai 45 j : **DÉPASSÉ d'environ 75 jours** → 🔴🔴.
ALERTE déclaration tardive : faute de gestion possible (interdiction de gérer L.653-8 ; insuffisance d'actif L.651-2 `[Légifrance]`) ; la période suspecte court depuis la date de CdP (nullités L.632-1/2). Ces risques visent **personnellement le dirigeant** — fais évaluer ta responsabilité par un avocat (un futur skill dédié couvrira l'analyse). Déposer **immédiatement** (le retard aggrave l'exposition, il ne l'efface pas).
Activité arrêtée + pas de redressement envisageable → orientation LJ (L.640-1), le tribunal tranche.
</response>
</example>

<example>
<user>/h-da:declaration-cessation-paiements — on a des tensions de trésorerie mais un moratoire URSSAF en cours et une ligne de crédit dispo</user>
<response>
Gate CdP (L.631-1) : les **réserves de crédit** et **moratoires** obtenus entrent dans l'actif disponible — s'ils permettent de faire face au passif exigible, il n'y a **pas** cessation des paiements. → Probablement **pas** en CdP `[review]`.
Renvoi `/h-da:prevention-difficultes` : tant qu'il n'y a pas CdP, la **sauvegarde** (L.620-1) et les dispositifs amiables (mandat ad hoc, conciliation) restent ouverts — souvent préférables au dépôt de bilan. Ne pas déclarer une CdP qui n'est pas caractérisée.
</response>
</example>

---

## Chargement du profil

> Lire `~/.claude/plugins/config/hacienda-juridique/hacienda-droit-affaires/CLAUDE.md`, bloc procédures collectives :
> - **Position** — débiteur (cas dominant ici, à confirmer)
> - **Tribunaux habituels** — repérage du greffe compétent
> - **Qualité signataire** — dirigeant de droit habilité (gérant, président, DG)
> - **Politique PII** — `passive` / `active` (défaut) / `strict` + seuil B

Si le bloc est `[A CONFIGURER]` : stopper et demander `/h-da:entretien-demarrage`.

---

## Intake

1. **Forme sociale / qualité du débiteur** — SAS, SARL, SA, SNC, EI, profession libérale… (**obligatoire** — détermine le tribunal compétent et l'éligibilité L.631-2)
2. **Cessation des paiements** — date présumée, OU éléments pour la qualifier : **actif disponible** (trésorerie, valeurs réalisables immédiatement, réserves de crédit, moratoires) vs **passif exigible** (dettes échues et exigées) (**obligatoire**)
3. **Procédure envisagée** — `RJ` (redressement, si poursuite d'activité envisageable) ou `LJ` (liquidation, si redressement manifestement impossible) ; à défaut, orienter
4. **Conciliation/mandat ad hoc en cours ?** (optionnel) — si une conciliation a été demandée, le délai de 45 j est suspendu/neutralisé (L.631-4) `[review]`
5. **Données financières** (optionnel à ce stade) — fournies plus tard pour compléter la déclaration ; le skill ne les invente pas

Si la forme sociale ou les éléments de CdP sont absents : stopper et demander. Pas de valeur par défaut.

---

## Gate non-juriste

- [ ] Forme sociale et éléments de cessation des paiements fournis (refus du défaut)
- [ ] Pré-flight `check-pii` exécuté et décision utilisateur respectée
- [ ] Profil cabinet bloc procédures collectives lu ; qualité signataire (dirigeant de droit) identifiée
- [ ] **Gate CdP** : qualification L.631-1 explicite (actif disponible vs passif exigible, réserves de crédit/moratoires pris en compte). Si **pas** de CdP → renvoi `prevention-difficultes`, ne pas rédiger de déclaration
- [ ] Date de cessation des paiements taguée `[review]` (jugement, point de départ période suspecte)
- [ ] Calcul délai 45 j vérifié (cohérent avec la date du jour ; neutralisé si conciliation demandée)
- [ ] Si délai **dépassé** : alerte tardive explicite (faute de gestion, L.653-8 ; insuffisance d'actif L.651-2) + renvoi évaluation responsabilité à un avocat — **nommée, pas évaluée**
- [ ] Tribunal compétent identifié (TC vs tribunal judiciaire selon la qualité du débiteur)
- [ ] Orientation RJ/LJ donnée AVEC mention que le tribunal décide (le dirigeant demande)
- [ ] Checklist pièces R.631-1 complète ; chiffres client en `[à compléter]`, jamais fabriqués
- [ ] Sortie comprend : statut délai + qualification CdP + orientation RJ/LJ + projet déclaration + pièces + note du relecteur + question hors checklist + arbre 5 options

---

## Mode Anno Desktop Optionnel

Pour reconstruire la chronologie de trésorerie, échéances et impayés, appeler `anno_health`, puis `detect`. Utiliser `legal_timeline`, `legal_validate_field` et `legal_search` sur corpus déjà ingéré. Les données financières restent fournies/validées par le client ; rien n'est fabriqué.

## Outils MCP à privilégier

Appeler les outils par leur nom exact quand le serveur `Hacienda Droit des Affaires` est disponible. Ne pas inventer de tool hors périmètre ; si une source n'a pas été consultée directement, garder `[à vérifier]`.

- Socle sources officielles : `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `judilibre_get_decision`, `eurlex_recherche`, `eurlex_consulter`.
- Identité entreprise (forme sociale, dirigeants) : `company_full_profile`, `bodacc_by_siren`.
- **Pas de lookup procédure** (`bodacc_procedures`) : la DCP est **pré-procédure**, aucune annonce n'existe encore.
- Tout résultat issu d'un corpus client ou d'un outil interne reste distingué des sources primaires officielles.

## Emplacement des sorties

```
outputs/declaration-cessation-paiements-<denomination-ou-siren>-<date-cdp>.md
```
Format date : `YYYY-MM-DD`.

---

## Sortie

Structurer la sortie avec : faits retenus, droit applicable, analyse, incertitudes, sources consultées, décisions proposées, prochaine action et validation humaine. Toute source non consultée directement reste `[à vérifier]`.

## Étape 1 — Pré-flight et gate CdP (L.631-1)

1. Invoquer `check-pii`. Probabilité élevée seuil B (dénomination + dirigeant + montants). Respecter la décision utilisateur.
2. Lire profil cabinet (bloc procédures collectives) et `~/.claude/plugins/config/hacienda-juridique/company-profile.md`.
3. **Qualifier la cessation des paiements** (art. L.631-1 C.com. `[Légifrance]`) : *impossibilité de faire face au passif exigible avec l'actif disponible*.
   - **Actif disponible** = liquidités + valeurs réalisables immédiatement + **réserves de crédit** et **moratoires** dont bénéficie le débiteur (L.631-1 al. 2).
   - **Passif exigible** = dettes échues **et** exigées (réclamées).
   - Si actif disponible ≥ passif exigible (notamment grâce à un moratoire/ligne de crédit) → **pas de CdP** → **stopper la rédaction** et renvoyer `/h-da:prevention-difficultes` (sauvegarde + amiable encore ouverts).
4. Si CdP établie : retenir une **date présumée de cessation des paiements**, la taguer `[review]` (le tribunal la fixera et peut la reporter jusqu'à 18 mois, L.631-8 `[Légifrance]` ; elle est le point de départ de la période suspecte, L.632-1/L.632-2).

## Étape 2 — Calcul du délai 45 j (règle dure) + alerte tardive

```
date_cdp = date présumée de cessation des paiements [review]
date_limite_declaration = date_cdp + 45 jours (art. L.631-4 C.com. RJ / L.640-4 C.com. LJ [Légifrance])
si une conciliation (L.611-4) a été demandée avant l'échéance : délai neutralisé tant que la conciliation court [review]
si date_limite tombe un samedi/dimanche/jour férié : prorogée au 1er jour ouvrable suivant (art. 642 CPC [Légifrance])
jours_restants = date_limite_declaration - aujourd'hui
```

**Échelle d'alerte :**

| Jours restants | Statut | Action |
|---|---|---|
| > 15 j | 🟢 | Préparer le dépôt sans précipitation |
| 1-15 j | 🟠 | Déposer en priorité |
| 0 | 🔴 | Déposer aujourd'hui |
| < 0 (tardif) | 🔴🔴 | **DÉCLARATION TARDIVE** — déposer immédiatement + alerte responsabilité dirigeant |

**Alerte tardive (si jours_restants < 0) — NOMMER, ne pas évaluer :**
> La déclaration tardive expose **personnellement le dirigeant** : faute de gestion pouvant justifier une **interdiction de gérer** (art. L.653-8 C.com. `[Légifrance]`) et une **action en contribution à l'insuffisance d'actif** (art. L.651-2 C.com. `[Légifrance]`) ; la **période suspecte** court depuis la date de CdP (nullités L.632-1/L.632-2). **Déposer immédiatement** — le retard aggrave l'exposition, il ne l'efface pas. L'**évaluation** de cette responsabilité (faute caractérisée, quantum, moyens de défense, sort des cautions) relève d'un avocat. `[review]`

## Étape 3 — Tribunal compétent

| Qualité du débiteur | Juridiction |
|---|---|
| Commerçant, artisan, société commerciale (SAS, SARL, SA, SNC…) | **Tribunal de commerce** |
| Profession libérale, agriculteur, association, société civile, autre personne morale de droit privé non commerçante | **Tribunal judiciaire** |

Fondement : éligibilité L.631-2 C.com. `[Légifrance]` ; compétence selon la qualité du débiteur `[à vérifier]` (confirmer le greffe compétent localement).

## Étape 4 — Orientation RJ vs LJ

- **Redressement judiciaire (RJ)** — activité poursuivie, redressement **possible** (L.631-1).
- **Liquidation judiciaire (LJ)** — redressement **manifestement impossible** (art. L.640-1 C.com. `[Légifrance]`).
- Mention obligatoire : **c'est le tribunal qui qualifie et décide** ; le dirigeant *demande* l'ouverture de la procédure qui lui paraît adaptée. `[review]`

## Étape 5 — Pièces à joindre (R.631-1 C.com.)

Checklist (art. R.631-1 C.com. `[à vérifier]` — confirmer la liste en vigueur sur Légifrance) — tabulaire → **dashboard HTML auto** :

| # | Pièce | Source | Statut |
|---|---|---|---|
| 1 | Comptes annuels du dernier exercice | client | [à compléter] |
| 2 | Situation de trésorerie datée de moins d'un mois | client | [à compléter] |
| 3 | Nombre de salariés + montant du chiffre d'affaires (dernier exercice) | client | [à compléter] |
| 4 | État chiffré des créances et des dettes avec noms et domiciles des créanciers | client | [à compléter] |
| 5 | État actif et passif des sûretés + engagements hors bilan | client | [à compléter] |
| 6 | Inventaire sommaire des biens | client | [à compléter] |
| 7 | Nom et adresse des représentants du personnel (CSE) | client | [à compléter] |
| 8 | Le cas échéant, liste des membres tenus solidairement / indéfiniment du passif | client | [à compléter] |

Ne **jamais** renseigner ces chiffres à la place du client : `[à compléter]` partout où la donnée n'est pas fournie.

## Étape 6 — Rédaction de la déclaration (squelette)

```
[Identité débiteur : dénomination, forme sociale, SIREN, siège, représentant légal]

À : Monsieur/Madame le Président du [Tribunal de commerce / Tribunal judiciaire] de [ville]

OBJET : DÉCLARATION DE CESSATION DES PAIEMENTS — DEMANDE D'OUVERTURE D'UNE PROCÉDURE DE [REDRESSEMENT / LIQUIDATION] JUDICIAIRE

Le débiteur soussigné déclare se trouver en état de cessation des paiements au sens de l'art. L.631-1 C.com. [Légifrance], étant dans l'impossibilité de faire face à son passif exigible avec son actif disponible.

- Date de cessation des paiements : [date] [review]
- Actif disponible : [à compléter — €]
- Passif exigible : [à compléter — €]
- Procédure demandée : [redressement judiciaire (L.631-4) / liquidation judiciaire (L.640-4)] [Légifrance]

Conformément à l'art. R.631-1 C.com., sont jointes les pièces listées au bordereau ci-annexé.

Fait à [ville], le [date].
Signature, qualité du signataire (dirigeant de droit habilité : [gérant / président / DG]).
```

## Étape 7 — Post-flight `verifier-citations`

Appel automatique sur la sortie complète. Articles à vérifier : **L.631-1, L.631-2, L.631-4, L.631-8, L.632-1, L.632-2, L.640-1, L.640-4, L.651-2, L.653-8 C.com., R.631-1 C.com., art. 642 CPC**. Tag `[Légifrance]` uniquement si vérifié (présent dans `references/articles-c-civ-c-com-index.md` ou consulté via PISTE) ; sinon `[à vérifier]`. Si PISTE non configuré : mode dégradé documenté.

## Étape 8 — Sortie

### Format livrable

```
[En-tête de confidentialité selon le rôle utilisateur — voir CLAUDE.md du plugin]

> ⚠️ Note du relecteur
> - **Sources :** Légifrance ✓ / Pappers ✓ (cocher ✗ si non connectée)
> - **Lecture :** éléments financiers fournis : {liste} | aucun (squelette seul)
> - **Signalé pour ton jugement :** date de CdP [review] ; orientation RJ/LJ [review] ; {alerte tardive le cas échéant}
> - **Fraîcheur :** vérification jurisprudence post-{date} sur la date de CdP / déclaration tardive — {N} arrêts [Judilibre] | recherche impossible
> - **Avant de t'appuyer dessus :** {action concrète — ex. faire confirmer la date de CdP et l'actif disponible par l'expert-comptable} | « prêt pour dépôt au greffe »

# 🟢/🟠/🔴/🔴🔴 Statut délai de déclaration
- Date de cessation des paiements : [date] [review]
- Délai légal : 45 jours (L.631-4 / L.640-4)
- Date limite de déclaration : [date prorogée 1er jour ouvrable si week-end/férié]
- Jours restants : [N]
- {Alerte tardive si < 0 : bloc responsabilité dirigeant}

# Qualification de la cessation des paiements
- Actif disponible vs passif exigible (L.631-1) : [synthèse] [review]
- {Si pas de CdP : renvoi prevention-difficultes — pas de déclaration}

# Tribunal compétent et orientation
- Tribunal : [TC / TJ de ville]
- Procédure demandée : [RJ / LJ] — le tribunal décide [review]

# Déclaration de cessation des paiements — projet
[texte complet du template Étape 6]

# Pièces à joindre (R.631-1)
[checklist Étape 5]

# Une question hors de ma checklist habituelle
{Observation transversale — ex. caution personnelle du dirigeant, compte courant d'associé débiteur, actif immobilier susceptible de modifier l'orientation LJ. Omettre si rien d'honnête.}

# Que veux-tu faire ? Choisis une option et je la déroule :
1. **Rédiger** — je complète la déclaration et le bordereau de pièces dès que tu fournis les chiffres.
2. **Escalader** — note vers {approbateur / avocat référent configuré} : faits-clés, délai, exposition dirigeant.
3. **Compléter les faits** — questions à l'expert-comptable / dirigeant (actif disponible exact, date précise de CdP, état des créances).
4. **Surveiller et attendre** — j'ajoute l'échéance des 45 j au tracker ; rappel avant dépôt.
5. **Autre** — précise.
```

### Mode silencieux (livrable externe — déclaration déposée au greffe)

La déclaration est un livrable externe (CLAUDE.md §2) : retirer l'en-tête de confidentialité avocat dans la version déposée ; conserver la note du relecteur dans le message d'accompagnement, pas dans la déclaration ; couper la narration de skill et les renvois inter-commandes ; consolider les tags `[Légifrance]` en pied si besoin.

---

## Ce skill ne fait pas

- La **qualification définitive** de la date de cessation des paiements (le tribunal la fixe, L.631-8) — le skill propose une date `[review]`.
- L'**évaluation** de la responsabilité du dirigeant (faute de gestion, insuffisance d'actif L.651-2, sanctions, sort des cautions) → futur skill dédié / avocat. Le skill **nomme** l'exposition, il ne l'évalue pas.
- Le **dépôt physique** au greffe et la comparution (actes du dirigeant / de l'avocat).
- Le **choix amiable vs collectif** quand il n'y a pas (encore) cessation des paiements → `prevention-difficultes`.
- Le **montage de cession** (pre-pack, plan de cession) → `pre-pack-cession` / avocat restructuring.
- Le conseil fiscal lié à la défaillance → hors scope, renvoi.

---

## Ton

Technique, factuel, **urgence calibrée par les jours restants**. Sur la déclaration tardive : honnêteté directe (l'exposition dirigeant est réelle et personnelle) sans dramatiser ni évaluer — nommer, renvoyer à l'avocat. Sur l'absence de CdP : ne pas pousser au dépôt de bilan quand la prévention reste ouverte (le dépôt est rarement la meilleure option si la sauvegarde est encore accessible). La déclaration engage l'ouverture d'une procédure et la date de période suspecte : le brouillon est soumis à validation humaine (avocat) avant dépôt.
