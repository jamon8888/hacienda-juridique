# Backlog — Enrichissement module distressed-overlay : immunité conciliation L.611-10-1

**Origine :** sanity live `gap-review --distressed` (2026-06-25, post-merge PR #62 / v0.15.0).
**Priorité :** basse (enrichissement optionnel — pas un défaut bloquant).
**Statut :** à arbitrer.

## Constat

La sanity fonctionnelle du chemin GAP a confirmé que le module partagé
`references/distressed-overlay-fr.md` **suffit** pour la revue distressed (verdict
« module sufficient », 0 delta doctrinal bloquant). Aucun cycle blind dédié GAP n'est
justifié.

**Seul angle remonté, non bloquant :** le module ne traite pas l'**immunité de l'accord
de conciliation homologué** (art. **L.611-10-1 C.com.**). Quand une conciliation a été
ouverte puis l'accord homologué, certains actes/avances consentis dans ce cadre
bénéficient d'une protection (notamment le **privilège de new money**, L.611-11, et une
**immunité à l'égard de la nullité de la période suspecte** pour les actes mentionnés dans
l'accord homologué). Cela **module l'axe D1** (période suspecte / nullités) : un acte couvert
par un accord homologué n'est pas attaquable au titre de L.632-1/2 dans les mêmes conditions.

## Pourquoi ce n'est pas urgent

- C'est un **point de dossier spécifique** (suppose une conciliation effectivement
  homologuée), pas un axe doctrinal absent pour le cas général.
- La sanity l'a correctement remonté en « question hors checklist » sans le rater — le
  garde-fou « échafaudage pas œillères » a fonctionné.
- Le module renvoie déjà `pre-pack-cession` / `prevention-difficultes` en amont, où la
  conciliation est traitée au fond.

## Proposition (si retenu plus tard)

Ajouter dans `references/distressed-overlay-fr.md`, à l'axe **D1**, un encart :

> **D1 bis — Immunité conciliation homologuée (L.611-10-1 C.com.).** Si une conciliation a
> été ouverte et l'accord **homologué**, les actes et avances mentionnés dans l'accord
> bénéficient d'une protection (privilège de new money L.611-11 ; immunité partielle à la
> nullité de la période suspecte). Vérifier l'existence, la nature (constaté vs homologué)
> et le contenu de tout accord de conciliation avant de qualifier un acte de risque L.632
> `[review]` — un acte couvert par l'accord homologué n'est pas attaquable dans les mêmes
> conditions. Ne pas présumer l'existence d'une conciliation à partir d'une simple mention
> du cédant (gate de confirmation).

Articles à ajouter à l'index si absents : **L.611-10-1, L.611-11 C.com.**

## Si ce point est repris

C'est une **modification doctrinale du module partagé** → relèverait alors d'un (mini) cycle
de validation, et impacterait les deux skills (spa + gap) puisque le module est partagé. À ce
moment-là seulement, le cycle blind dédié GAP évoqué pourrait avoir du sens (tester le delta
réellement nouveau, pas la doctrine déjà ADMIS).
