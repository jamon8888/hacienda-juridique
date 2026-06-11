---
name: reprise-a-la-barre
description: >
  Playbook tactique côté candidat-repreneur pour construire, optimiser et
  défendre une offre de reprise sur une entreprise déjà placée en redressement
  ou liquidation judiciaire, dans le cadre d'un appel d'offres ouvert (plan de
  cession, L.642-1 s.). Double gate : (1) porte d'entrée — la cible est-elle déjà
  en RJ/LJ avec appel d'offres ouvert ? sinon, si la cession peut être préparée
  confidentiellement en amont, renvoi `pre-pack-cession` ; (2) recevabilité de
  l'offre — éligibilité du repreneur (L.642-3, interdictions / interposition
  prohibée) et offre ferme et écrite (L.642-2), pas une LOI indicative. Opère les
  mentions de l'offre (L.642-2), les contrats repris désignés (L.642-7), les
  critères de choix du tribunal (L.642-5), le sort des sûretés (L.642-12) et les
  voies de recours (L.661-6). Côté repreneur uniquement. Ne rédige pas l'acte de
  cession → `spa-review` / `gap-review` / `closing-checklist-fr`. Brouillon,
  validation humaine (avocat) OBLIGATOIRE.
version: "2.0.0"
argument-hint: "[note tactique (mode unique), cible en RJ ou LJ ?, appel d'offres ouvert ?, offre ferme ou LOI ?, côté repreneur]"
authors: ["Hacienda"]
tags: [reprise-a-la-barre, plan-de-cession, distressed-m&a, restructuring, l642, offre-de-reprise, redressement-judiciaire, liquidation-judiciaire]
---

# Skill — Reprise à la barre (offre de reprise en plan de cession)

> **BROUILLON, VALIDATION HUMAINE (AVOCAT) OBLIGATOIRE.**
>
> **🔴 Double gate.**
> - **Gate 1 — porte d'entrée** : ce skill ne joue que si la cible est **déjà en
>   RJ ou LJ avec un appel d'offres ouvert**. Si aucune procédure n'est ouverte et
>   que la cession peut être **préparée confidentiellement** (mandat ad hoc /
>   conciliation) → ce n'est pas une reprise à la barre → **renvoi
>   `pre-pack-cession`**.
> - **Gate 2 — recevabilité de l'offre** : (a) **éligibilité du repreneur
>   (L.642-3)** — dirigeants, parents et alliés jusqu'au 2nd degré, interposition
>   de personne sont **interdits d'acquérir** → offre **nulle** ; (b) **offre ferme
>   et écrite (L.642-2)** — une **LOI / lettre d'intention indicative n'est pas**
>   une offre judiciaire recevable, et l'offre déposée est **irrévocable**.
>
> **Point pivot.** Le **tribunal** choisit l'offre sur les critères de **L.642-5**
> (pérennité de l'emploi, paiement des créanciers, garanties d'exécution) — **pas**
> le prix le plus élevé seul, ni la préférence du dirigeant. Une offre optimisée se
> construit sur ces trois axes.

## Examples

1. **LOI ≠ offre.** Le candidat n'a déposé qu'une lettre d'intention indicative
   avant la date limite. → Gate 2 (b) : une LOI n'est **pas** une offre L.642-2 →
   convertir en **offre ferme et écrite** (périmètre, contrats, prix, financement,
   emplois, garanties, date) avant le dépôt, sinon irrecevable.

2. **Repreneur inéligible.** Le candidat est contrôlé par un parent de l'ancien
   dirigeant, via une holding interposée. → Gate 2 (a) : **interdiction d'acquérir
   (L.642-3)** → l'offre serait **nulle**. STOP : signaler l'inéligibilité avant
   tout travail sur l'offre ; une dérogation du tribunal est exceptionnelle.

3. **Cession encore préparable.** Aucune procédure ouverte, le dirigeant veut
   organiser discrètement la vente. → Gate 1 : pas d'appel d'offres ouvert →
   ce n'est pas une reprise à la barre → **renvoi `pre-pack-cession`** (montage
   confidentiel amont).

## Chargement du profil

> Lire `~/.claude/plugins/config/hacienda-juridique/hacienda-droit-affaires/CLAUDE.md`, bloc procédures collectives + bloc M&A :
> - **Position dominante** — ce skill suppose le **côté repreneur** (le candidat à la reprise)
> - **Tribunaux habituels** — tribunal compétent (commerce / judiciaire selon l'activité)
> - **Politique PII** — `passive` / `active` (défaut) / `strict` + seuil B

Si le bloc est `[A CONFIGURER]` : stopper et demander `/h-da:entretien-demarrage`.

---

## Intake

1. **Côté** — **repreneur** (le candidat à la reprise). Pas de mode neutre ; si l'utilisateur est côté débiteur/orchestration, renvoyer `pre-pack-cession` ou `prevention-difficultes`.
2. **État de la procédure** — la cible est-elle **déjà** en RJ / LJ ? appel d'offres **ouvert** ? date limite de dépôt des offres ? administrateur désigné ? (**déterminant** — voir Gate 1). Si aucune procédure ouverte → Gate 1 renvoie `pre-pack-cession`.
3. **Nature de l'intérêt du repreneur** — offre **ferme et écrite** déjà prête / simple **LOI indicative** / intention (**déterminant** — voir Gate 2 (b)).
4. **Éligibilité** — le candidat a-t-il un lien avec le dirigeant / un parent / une société interposée ? (**déterminant** — voir Gate 2 (a), L.642-3).
5. **Périmètre visé** — actifs (fonds, immeuble), **contrats à reprendre** (bail, licence, fournisseur), **emplois repris**, **actifs PI** (marques, brevets) ; risque de cherry-picking ?
6. **Concurrence** — d'autres offres déposées ? surenchère possible ? **sûretés** sur les actifs (nantissement, gage) ?

---

## Gate non-juriste

- [ ] Pré-flight `check-pii` exécuté et décision utilisateur respectée
- [ ] **Gate 1 — porte d'entrée tranchée** : cible **déjà en RJ/LJ avec appel d'offres ouvert** → ce skill ; sinon (cession préparable confidentiellement) → STOP + renvoi `pre-pack-cession`
- [ ] **Gate 2 (a) — éligibilité (L.642-3)** : pas de dirigeant / parent / interposition prohibée ; si lien suspect → STOP, offre potentiellement nulle, `[review]`
- [ ] **Gate 2 (b) — offre ferme et écrite (L.642-2)** : ce qui est sur la table est-il une **offre** (périmètre, contrats, prix, financement, emplois, garanties, date) ou une **LOI** ? une LOI est irrecevable
- [ ] **Point pivot rappelé** : le tribunal choisit sur **L.642-5** (emploi, créanciers, garanties), pas le prix seul
- [ ] Côté repreneur déclaré ; focale = exposition et optimisation de l'offre
- [ ] Durées / délais procéduraux (dépôt des offres, audience) tagués `[à vérifier]`
- [ ] Citations vérifiées via `verifier-citations` ou taguées `[à vérifier]`

---

## Outils MCP à privilégier

- Identification entreprise + procédures publiées : `company_full_profile`, `bodacc_by_siren`, `bodacc_procedures` (confirmer la procédure ouverte sur la cible, le type RJ/LJ, l'administrateur, les dates).
- Socle sources officielles : `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `eurlex_recherche`, `eurlex_consulter`.

---

## Emplacement des sorties

```
outputs/reprise-a-la-barre-<entreprise-slug>-YYYY-MM-DD.md
```

---

## Sortie

### Format livrable

```
[En-tête de confidentialité selon le rôle]

> ⚠️ Note du relecteur
> - **Sources :** Légifrance ✓ / BODACC ✓ / Judilibre ✓ (cocher ✗ si non connectée)
> - **Lecture :** situation décrite + {N} pièces
> - **Signalé pour ton jugement :** {N} éléments [review] (éligibilité du repreneur, fermeté de l'offre, périmètre) | aucun
> - **Fraîcheur :** réforme du 15 septembre 2021 (ord. transposition directive restructuration) — vérifier durées/seuils en vigueur | recherche impossible
> - **Avant de t'appuyer dessus :** {action — ex. confirmer l'absence de lien d'interposition} | « prêt pour relecture »

# Reprise à la barre — note tactique [CÔTÉ repreneur]

# 1. Diagnostic & recevabilité
- **Gate 1 — porte d'entrée** : cible en {RJ / LJ} ✅, appel d'offres ouvert, date limite {date [review]}, administrateur {nom}. {Si pas de procédure ouverte → pas une reprise à la barre, renvoi pre-pack-cession.}
- **Gate 2 (a) — éligibilité (L.642-3)** : {OK / 🔴 lien dirigeant-parent-interposition → offre nulle}.
- **Gate 2 (b) — offre ferme L.642-2** : {offre ferme ✅ / 🔴 simple LOI indicative → irrecevable, à convertir}.

# 2. Construction de l'offre (mentions L.642-2)
- **Périmètre des actifs** ; **contrats repris désignés** (L.642-7) ; **prix et affectation** ; **financement** ; **emplois maintenus** ; **garanties d'exécution** ; **date de réalisation**.
- **Activité autonome (L.642-1)** : alerter si le périmètre isole des actifs clés (marque + fichier) au point de **vider l'activité** (cherry-picking) → risque de rejet.

# 3. Optimisation vs critères du tribunal (L.642-5)
- **Pérennité de l'emploi** : nombre d'emplois maintenus, plan social éventuel.
- **Paiement des créanciers** : prix offert, affectation, sûretés.
- **Garanties d'exécution** : solidité financière, garanties apportées.
- **Positionnement vs offres concurrentes** : points faibles à couvrir, surenchère possible.

# 4. Risques & suites
- **Sûretés** : report / quote-part du prix (L.642-12) ; **inexécution / résolution** du plan de cession (L.642-11).
- **Voies de recours (L.661-6)** : la sienne (en cas de rejet) et celles des **candidats évincés** (qui peuvent contester le plan retenu).
- **Irrévocabilité** de l'offre une fois déposée (L.642-2).

# Renvois & prochaines étapes
- **Amont** : `/h-da:pre-pack-cession` si la cession peut être préparée en amont.
- **Aval** : `/h-da:spa-review` / `/h-da:gap-review` / `/h-da:closing-checklist-fr` (l'acte de cession et son closing).
- **Latéral** : `/h-pi:contrats-pi` si actifs PI substantiels dans le périmètre repris.

# Une question hors de ma checklist habituelle
{Observation transversale — ex. articulation prix / désintéressement des créanciers privilégiés, sort d'un contrat de location-gérance, clean team si repreneur concurrent. Omettre si rien d'honnête.}

# Que veux-tu faire ? Choisis une option :
1. **Rédiger** — je prépare la trame de l'offre de reprise ferme (mentions L.642-2) ou la note d'analyse des offres concurrentes.
2. **Escalader** — note vers {approbateur configuré} pour décision d'engager / surenchérir.
3. **Compléter les faits** — questions (lien éventuel avec le dirigeant, date limite exacte de dépôt, contrats à reprendre, état des sûretés).
4. **Surveiller et attendre** — suivi avec point de revisite (avant la date limite de dépôt des offres).
5. **Autre** — précise.
```

---

## Étape 1 — Pré-flight et Gate 1 (porte d'entrée)

1. Invoquer `check-pii`. Lire le profil cabinet (blocs procédures collectives + M&A) et confirmer le **côté repreneur**. Raisonner **à la date du jour** (dates absolues) avec un **rétroplanning** : date limite de dépôt des offres, audience.
2. Vérifier via `bodacc_procedures` / `bodacc_by_siren` que la cible est **bien en RJ/LJ** : type de procédure, date du jugement d'ouverture, administrateur désigné.
3. **Trancher la porte d'entrée** : procédure ouverte + appel d'offres en cours → ce skill. **Aucune procédure ouverte** et cession préparable confidentiellement → ce n'est pas une reprise à la barre → **renvoi `/h-da:pre-pack-cession`** (montage amont). Ne pas avancer sans avoir tranché.

## Étape 2 — Gate 2 (recevabilité de l'offre)

Trancher les **deux** verrous. Si l'un tombe → STOP + signalement motivé.
1. **Éligibilité (L.642-3 C.com. `[Légifrance]`)** — dirigeants de droit ou de fait, parents et alliés jusqu'au 2nd degré inclus, et toute **interposition de personne** sont **interdits de se porter acquéreurs**. Une offre émanant d'une telle personne est **nulle**. Repérer toute holding interposée, prête-nom, lien familial. Dérogation du tribunal exceptionnelle. `[review]`.
2. **Offre ferme et écrite (L.642-2 C.com. `[Légifrance]`)** — l'offre doit comporter périmètre, contrats repris, prix, financement, emplois maintenus, garanties, date. Une **LOI / lettre d'intention indicative n'est pas** une offre recevable. Une fois déposée, l'offre est **irrévocable** et ne peut être modifiée que dans un sens plus favorable.

## Étape 3 — Construction de l'offre (L.642-2 / L.642-7 / L.642-1)

Bâtir l'offre sur les **mentions obligatoires (L.642-2)**. Identifier les **contrats à reprendre** : ce sont ceux **désignés par le tribunal** dans le jugement de cession (L.642-7), cédés de plein droit au cessionnaire — lister ceux qui sont nécessaires à l'activité (bail, licence, fournisseurs). Vérifier que le périmètre forme une **activité autonome (L.642-1)** : alerter sur tout cherry-picking (isoler la marque + le fichier clients) qui viderait l'activité et exposerait l'offre au rejet.

## Étape 4 — Optimisation vs critères du tribunal (L.642-5)

Le **tribunal arrête le plan de cession** en retenant l'offre qui assure le mieux, sur les trois critères de **L.642-5** : (1) la **pérennité de l'emploi**, (2) le **paiement des créanciers**, (3) les **garanties d'exécution**. Optimiser l'offre sur ces axes (pas le prix seul). En cas d'**offre(s) concurrente(s)**, identifier les points faibles relatifs et la marge de surenchère (l'offre ne peut être modifiée que dans un sens plus favorable, L.642-2). Si le repreneur est un **concurrent**, prévoir NDA / clean team / limitation des données sensibles (clients, prix) en data-room.

## Étape 5 — Risques post-arrêté (L.642-12 / L.642-11 / L.661-6)

- **Sûretés** : report du droit de suite et **quote-part du prix** affectée aux créanciers inscrits (L.642-12) — le cessionnaire qui paie le prix peut purger ; anticiper la quote-part.
- **Inexécution du plan** : si le cessionnaire n'exécute pas ses engagements, le tribunal peut prononcer la **résolution du plan de cession** (L.642-11) — mesurer l'exposition.
- **Voies de recours (L.661-6 C.com. `[Légifrance]`)** : appel des décisions arrêtant ou rejetant le plan de cession — la sienne en cas de rejet, et celles des **candidats évincés** qui peuvent contester le plan retenu (aléa et calendrier).

## Étape 6 — Post-flight `verifier-citations`

Lancer `verifier-citations` sur tous les articles cités (L.642-1, L.642-2, L.642-3, L.642-5, L.642-7, L.642-11, L.642-12, L.661-6). Tout article non confirmé reste `[à vérifier]`.

---

## Ce skill ne fait pas

- **Rédiger l'acte de cession / le SPA** → renvoi `/h-da:spa-review`, `/h-da:gap-review`, `/h-da:closing-checklist-fr`.
- **Cadrer le montage amont confidentiel** (mandat ad hoc / conciliation, double gate cessation des paiements) → renvoi `/h-da:pre-pack-cession`.
- **Traiter le côté débiteur / organes de la procédure** (orchestration, prospection) — ce skill est côté repreneur uniquement.
- **Cession d'actifs isolés en LJ (L.642-19)** hors plan de cession — hors périmètre v1.
- Tout seuil / durée procédurale post-réforme 2021 reste `[à vérifier]` si non confirmé en source primaire.

---

## Ton

Technique, prudent, **piloté par le double gate** : tant que le Gate 1 (porte d'entrée) et le Gate 2 (éligibilité L.642-3 + offre ferme L.642-2) ne sont pas tranchés, ne pas travailler l'offre. Marteler le **point pivot** (le tribunal choisit sur L.642-5 — emploi, créanciers, garanties — pas le prix seul) et l'**irrévocabilité** de l'offre déposée. Côté repreneur : mesurer l'exposition (purge réelle des sûretés, contrats repris désignés par le tribunal, recours des évincés) et optimiser sur les trois critères. Si la cession est encore préparable en amont, le dire et renvoyer `pre-pack-cession`. Brouillon soumis à validation humaine (avocat) avant tout dépôt d'offre.
