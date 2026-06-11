---
name: pre-pack-cession
description: >
  Cadre le montage d'un pre-pack cession : cession négociée confidentiellement
  en amont (mandat ad hoc / conciliation, L.611-x) puis réalisée via une
  procédure collective sous forme de plan de cession (L.642-1 s., L.642-2),
  donnant au repreneur les protections de la cession judiciaire. Double gate :
  (1) cessation des paiements (±45 j) qui détermine le véhicule — sauvegarde
  accélérée (L.628-1 s.) ou RJ (L.631-19-1) ; (2) faisabilité pre-pack
  (confidentialité L.611-15, repreneur crédible, prospection L.611-7, période
  suspecte L.632-1). Note de cadrage side-aware (débiteur / repreneur). Pont
  amont `prevention-difficultes` → aval `spa-review` / `gap-review` /
  `closing-checklist-fr`. Ne rédige pas l'acte de cession. Brouillon,
  validation humaine (avocat) OBLIGATOIRE.
version: "2.0.0"
argument-hint: "[note de cadrage (mode unique), état cessation des paiements, repreneur identifié ?, side débiteur|repreneur]"
authors: ["Hacienda"]
tags: [pre-pack, plan-de-cession, distressed-m&a, restructuring, l642, l611, sauvegarde-acceleree, redressement-judiciaire]
---

# Skill — Pre-pack cession (montage cession préparée → procédure collective)

> **BROUILLON, VALIDATION HUMAINE (AVOCAT) OBLIGATOIRE.**
>
> **🔴 Double gate.**
> - **Gate 1 — cessation des paiements (±45 j)** : détermine le **véhicule** de
>   bascule (sauvegarde accélérée L.628-1 s. *vs* RJ L.631-19-1 → plan de cession).
> - **Gate 2 — faisabilité pre-pack** : 4 conditions cumulatives. Si l'une tombe,
>   ce n'est pas un pre-pack → STOP + renvoi motivé.
>
> **Point pivot.** Le mandat ad hoc / la conciliation **ne réalisent pas** la
> cession : ils la *préparent*. La purge du passif et l'opposabilité erga omnes
> ne s'obtiennent que par le **plan de cession arrêté par le tribunal**
> (L.642-2). « Tout boucler en amiable » est juridiquement impossible.

## Examples

1. **Bascule RJ.** SAS en cessation des paiements depuis ~60 j, repreneur
   identifié en mandat ad hoc. → Gate 1 : > 45 j ferme la conciliation/sauvegarde
   accélérée → **RJ (L.631-19-1) puis plan de cession (L.642-1 s.)**. Le pre-pack
   reste possible mais le véhicule est le redressement, pas l'amiable.

2. **Gate 2 tombe (pas de repreneur réel).** Difficulté avérée mais aucun candidat
   sérieux, simple intention vague. → Gate 2 « repreneur crédible » FAIL : ce
   n'est pas un pre-pack mais une **cession judiciaire ordinaire** → renvoi
   `prevention-difficultes` / dispositif collectif de droit commun.

3. **Nominal — sauvegarde accélérée.** Pas en cessation des paiements, accord
   majoritaire des créanciers en vue, repreneur identifié, prospection organisée
   par le conciliateur. → Gate 1 : amiable ouvert → **sauvegarde accélérée
   (L.628-1 s.)** pour adopter le plan ; le pre-pack joue à plein.

## Chargement du profil

> Lire `~/.claude/plugins/config/hacienda-juridique/hacienda-droit-affaires/CLAUDE.md`, bloc procédures collectives + bloc M&A :
> - **Position dominante** — débiteur (orchestration) / repreneur (exposition) / mandataire / mixte
> - **Tribunaux habituels** — tribunal compétent (commerce / judiciaire selon l'activité)
> - **Politique PII** — `passive` / `active` (défaut) / `strict` + seuil B

Si le bloc est `[A CONFIGURER]` : stopper et demander `/h-da:entretien-demarrage`.

---

## Intake

1. **Side** (**obligatoire**) — `débiteur` (orchestration du montage) ou `repreneur` (évaluation de l'exposition). Pas de mode neutre.
2. **État de cessation des paiements** — non / oui depuis ≤ 45 j / oui depuis > 45 j / incertain (**déterminant** — voir Gate 1). Si incertain : poser la question avant d'avancer (passif exigible vs actif disponible).
3. **Repreneur identifié ?** — candidat sérieux approché en phase amiable / simple intention / aucun (**déterminant** — voir Gate 2).
4. **Phase amiable en cours** — mandat ad hoc (L.611-3) / conciliation (L.611-4 s.) ouverte ? mandataire ad hoc ou conciliateur désigné ?
5. **Confidentialité / urgence** — risque de fuite (clients, presse, salariés), tension de trésorerie, échéance qui presse.
6. **Périmètre cédé** — actifs (fonds, immeuble, contrats), salariés repris, **actifs PI** (marques, brevets) ?

---

## Gate non-juriste

- [ ] Pré-flight `check-pii` exécuté et décision utilisateur respectée
- [ ] **Gate 1 — cessation des paiements tranché** : ≤ 45 j → véhicule amiable/sauvegarde accélérée ; > 45 j → RJ + plan de cession ; incertain → poser la question avant d'avancer
- [ ] **Gate 2 — faisabilité pre-pack tranchée** (les 4, cumulatifs) : confidentialité tenable (L.611-15) · repreneur crédible identifié · prospection régulière organisée par le conciliateur/mandataire ad hoc (L.611-7) · **pas d'acte à risque période suspecte** (L.632-1). Si l'une tombe → STOP + renvoi
- [ ] **Point pivot rappelé** : la cession ne se réalise que par le plan de cession arrêté par le tribunal (L.642-2), pas en mandat ad hoc seul
- [ ] Side déclaré ; focale de la note adaptée (débiteur = orchestration / repreneur = exposition)
- [ ] Confidentialité L.611-15 : **aucun document destiné à des tiers** produit pendant la phase amiable
- [ ] Durées et seuils réglementaires tagués `[à vérifier]` (45 j cessation des paiements, délais sauvegarde accélérée, calendrier offres/tribunal)
- [ ] Citations vérifiées via `verifier-citations` ou taguées `[à vérifier]`

---

## Outils MCP à privilégier

- Identification entreprise + procédures publiées : `company_full_profile`, `bodacc_by_siren`, `bodacc_procedures` (vérifier l'état des procédures déjà ouvertes sur la cible).
- Socle sources officielles : `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `eurlex_recherche`, `eurlex_consulter`.

---

## Emplacement des sorties

```
outputs/pre-pack-cession-<entreprise-slug>-YYYY-MM-DD.md
```

---

## Sortie

### Format livrable

```
[En-tête de confidentialité selon le rôle — CONSERVÉ (phase amiable confidentielle L.611-15)]

> ⚠️ Note du relecteur
> - **Sources :** Légifrance ✓ / BODACC ✓ / Judilibre ✓ (cocher ✗ si non connectée)
> - **Lecture :** situation décrite + {N} pièces
> - **Signalé pour ton jugement :** {N} éléments [review] (date cessation des paiements, crédibilité repreneur, risque période suspecte) | aucun
> - **Fraîcheur :** réforme du 15 septembre 2021 (ord. transposition directive restructuration) — vérifier durées/seuils en vigueur | recherche impossible
> - **Avant de t'appuyer dessus :** {action — ex. confirmer la date exacte de cessation des paiements} | « prêt pour relecture »

# Pre-pack cession — note de cadrage [CÔTÉ {débiteur | repreneur}]

# 1. Diagnostic & gates
- **Gate 1 — cessation des paiements** : {non / ≤ 45 j / > 45 j / incertain [review]} → véhicule retenu.
- **Gate 2 — faisabilité pre-pack** (4 critères tranchés ✅/🔴) :
  confidentialité (L.611-15) · repreneur crédible · prospection (L.611-7) · période suspecte (L.632-1).
  {Si un critère 🔴 → conclusion : pas de pre-pack, renvoi.}

# 2. Véhicule & séquençage
- **Véhicule** : {sauvegarde accélérée L.628-1 s. | RJ L.631-19-1 → plan de cession L.642-1 s., L.642-2}.
- **Séquençage** : phase amiable (mandat ad hoc / conciliation, prospection L.611-7) → bascule collective → dépôt et examen des offres → jugement arrêtant le plan de cession.
- **Qui fait quoi** : débiteur / conciliateur ou mandataire ad hoc (prospecteur) / tribunal / CSE. Calendrier indicatif `[à vérifier]`.

# 3. Points de vigilance (ancrés sur l'article tranchant — focale {côté})
{Côté débiteur : prospection régulière et traçable (L.611-7), confidentialité (L.611-15), consultation CSE/CSEC préalable, intervention AGS, requête au tribunal, sort des sûretés (nantissement fonds).}
{Côté repreneur : purge du passif et contrats repris désignés par le tribunal (L.642-7), irrévocabilité de l'offre une fois déposée (L.642-2), voies de recours / contestation (L.661-6), report des sûretés spéciales (L.642-12), risque période suspecte (L.632-1) sur les actes du débiteur.}

# 4. Renvois & prochaines étapes
- **Amont** : `/h-da:prevention-difficultes` (choix mandat ad hoc / conciliation).
- **Aval** : `/h-da:spa-review` / `/h-da:gap-review` / `/h-da:closing-checklist-fr` (l'acte de cession et son closing).
- **Latéral** : `/h-da:declaration-creance` (créanciers) ; `/h-pi:contrats-pi` si actifs PI substantiels dans le périmètre cédé.

# Une question hors de ma checklist habituelle
{Observation transversale — ex. articulation prix de cession / désintéressement des créanciers, sort du contrat de location-gérance du site, soutien abusif. Omettre si rien d'honnête.}

# Que veux-tu faire ? Choisis une option :
1. **Rédiger** — je prépare la requête d'ouverture (sauvegarde accélérée / RJ) ou la trame du cahier des charges de cession.
2. **Escalader** — note vers {approbateur configuré} pour décision d'engager le montage.
3. **Compléter les faits** — questions (date exacte de cessation des paiements, état du passif exigible/actif disponible, fermeté de l'offre repreneur, actes des 18 derniers mois).
4. **Surveiller et attendre** — suivi avec point de revisite (avant que la cessation des paiements n'atteigne 45 j).
5. **Autre** — précise.
```

### Note de confidentialité (pas un « mode silencieux »)

La phase amiable est **strictement confidentielle** (L.611-15). Ne produire **aucun** document destiné à un tiers (repreneur compris au-delà du strict nécessaire encadré par le mandataire) tant que la cession n'est pas portée devant le tribunal. Le livrable reste interne au débiteur et à ses conseils.

---

## Étape 1 — Pré-flight et Gate 1 (cessation des paiements)

1. Invoquer `check-pii`. Lire le profil cabinet (blocs procédures collectives + M&A) et le **side** déclaré.
2. Vérifier via `bodacc_procedures` l'état des procédures déjà ouvertes sur la cible.
3. **Trancher la cessation des paiements** (art. L.631-1 C.com. `[Légifrance]`) : passif exigible vs actif disponible, date de survenance.
   - Non / prévisible, ou ≤ 45 j → voie amiable ouverte → véhicule **sauvegarde accélérée (L.628-1 s.)** si accord majoritaire des créanciers en vue. Étape 2.
   - Oui > 45 j → conciliation/sauvegarde accélérée fermées → véhicule **RJ (L.631-19-1) → plan de cession (L.642-1 s., L.642-2)**. Rappeler l'obligation de déclarer la cessation des paiements (L.631-4 C.com. `[à vérifier]`). Étape 2.
   - Incertain → poser la question, ne pas présumer.

## Étape 2 — Gate 2 (faisabilité pre-pack)

Trancher les **4 critères cumulatifs**. Si l'un tombe → STOP + renvoi motivé.
1. **Confidentialité tenable** (L.611-15) — si la difficulté est déjà publique / la fuite inévitable, l'intérêt du pre-pack (discrétion) s'effondre → `[review]`.
2. **Repreneur crédible identifié** en phase amiable — sinon ce n'est pas un pre-pack mais une cession judiciaire ordinaire → renvoi.
3. **Prospection régulière organisée** par le conciliateur / mandataire ad hoc (L.611-7) — un repreneur unique sans appel à candidatures fragilise l'opposabilité de l'offre devant le tribunal et expose à contestation. `[review]`.
4. **Pas d'acte à risque période suspecte** (L.632-1) — repérer les actes anormaux des derniers mois (sûreté pour dette antérieure, paiement préférentiel, vente sous-évaluée) : nullités de droit/facultatives si la date de cessation des paiements est reportée. `[review]`.

## Étape 3 — Séquençage de la phase amiable

Mandat ad hoc (L.611-3) / conciliation (L.611-4 s.) : confier au conciliateur / mandataire ad hoc un **mandat de prospection** (L.611-7) pour rechercher et présélectionner le repreneur. Documenter la démarche (traçabilité) sans rompre la confidentialité (L.611-15). Préparer le cahier des charges de cession et le périmètre.

## Étape 4 — Bascule en procédure collective et plan de cession

Ouvrir le véhicule retenu (sauvegarde accélérée L.628-1 s. *ou* RJ L.631-19-1). Déposer/recueillir les offres de reprise ; le **tribunal arrête le plan de cession** (L.642-1 s., L.642-2) et désigne les **contrats cédés** (L.642-7). Articuler : **consultation du CSE/CSEC** préalable, intervention de l'**AGS** pour les créances salariales, sort des **sûretés** (report L.642-12), **irrévocabilité de l'offre** déposée (L.642-2). Tous délais/calendrier `[à vérifier]`.

## Étape 5 — Vigilance side-aware

Dérouler les points du Bloc 3 selon le side : **débiteur** = orchestration (prospection, confidentialité, CSE, AGS, requête) ; **repreneur** = exposition (purge réelle, contrats repris L.642-7, recours L.661-6, report des sûretés L.642-12, irrévocabilité L.642-2, risque période suspecte L.632-1).

## Étape 6 — Post-flight `verifier-citations`

Lancer `verifier-citations` sur tous les articles cités. Tout article non confirmé reste `[à vérifier]`.

---

## Ce skill ne fait pas

- **Rédiger l'acte de cession ni l'offre de reprise** → renvoi `/h-da:spa-review`, `/h-da:gap-review`, `/h-da:closing-checklist-fr`.
- **Produire un document destiné à des tiers** pendant la phase amiable (confidentialité L.611-15).
- **Trancher l'opportunité** d'une procédure collective de droit commun hors logique de cession préparée → renvoi `/h-da:prevention-difficultes`.
- Tout seuil / durée post-réforme 2021 reste `[à vérifier]` si non confirmé en source primaire.

---

## Ton

Technique, prudent, **piloté par le double gate** : tant que le Gate 1 (cessation des paiements) et le Gate 2 (4 critères) ne sont pas tranchés, ne pas valider le montage. Marteler le **point pivot** (la cession se réalise par le plan de cession du tribunal, pas en amiable) et la **confidentialité** de la phase amiable (L.611-15). Adapter la focale au **side** (débiteur = orchestrer ; repreneur = mesurer son exposition). Rappeler que le pre-pack n'a d'intérêt que si la discrétion et un repreneur crédible existent réellement — sinon, le dire et renvoyer. Brouillon soumis à validation humaine (avocat) avant toute saisine du tribunal.
