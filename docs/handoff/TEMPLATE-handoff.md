# Template — Handoff de session

> Usage : à la fin de chaque session de développement, copier ce template dans `docs/handoff/latest.md` et le remplir.
> Avant écrasement du `latest.md`, archiver l'ancien dans `docs/handoff/archive/YYYY-MM-DD-session-NN.md`.

---

```markdown
# Handoff — hacienda-droit-affaires v1

## Session courante

- **Date :** YYYY-MM-DD
- **Agent / outil :** Claude Code / Cursor / Aider / Windsurf / autre
- **Modèle :** Sonnet 4.x / Opus 4.x / GPT-5 / Gemini / autre
- **Durée approx :** X heures

## Progression dans le plan

- **Dernière task complétée :** Task X.Y — `<titre court>`
- **Commit hash de fin de task :** `abc1234`
- **Tests passants à ce jour :**
  - `packages/core` : ✅ N tests verts / 🔴 N tests rouges (préciser lesquels)
  - `plugins/hacienda-droit-affaires` : skills implémentés `<liste>`
  - `npm test` global : ✅ / 🔴
  - `npm run typecheck` : ✅ / 🔴
  - `npm run build` : ✅ / 🔴
  - `npm run branding:check` : ✅ / 🔴

## Prochaine task à attaquer

- **ID :** Task X.Y — `<titre>`
- **Pourquoi celle-ci en premier** (si plusieurs candidates parallèles)
- **Dépendances satisfaites :** liste

## Blockers actifs

- (liste, ou "aucun")
- Pour chaque blocker : description, qui peut débloquer (utilisateur / autre agent / aucun), tentatives faites

## Décisions prises hors spec depuis dernier handoff

- (liste, ou "aucune")
- Format pour chaque décision :
  - **Décision :** X
  - **Raison :** Y
  - **Impact spec :** section Z à updater / aucun
  - **Validation utilisateur :** OUI / NON / à demander

## État GitNexus

- Index à jour ? `npx gitnexus analyze` lancé le YYYY-MM-DD après commit `abc1234`
- Symboles ajoutés à core depuis dernière session : liste

## Notes pour le suivant

- Tout ce qui n'est pas évident à la simple lecture du plan
- Pièges rencontrés et solutions
- Tests qui passent mais qui mériteraient un coup d'œil critique
```

---

## Procédure d'archivage

Avant de remplacer `latest.md` par une nouvelle session :

```bash
# Compter les sessions archivées pour le mois courant
NUM=$(ls docs/handoff/archive/$(date +%Y-%m)* 2>/dev/null | wc -l | tr -d ' ')
NEXT=$((NUM + 1))

# Archiver
mkdir -p docs/handoff/archive
cp docs/handoff/latest.md docs/handoff/archive/$(date +%Y-%m-%d)-session-$NEXT.md

# Puis écraser latest.md avec le nouveau contenu
```
