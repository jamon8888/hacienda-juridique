# ⚠️ ARCHIVE — Document obsolète

> **Cette stratégie a été abandonnée en mai 2026.** Le repo `hacienda/jurisconsultes-marketplace` n'a jamais été créé. À la place, le manifeste `marketplace.json` a été placé **directement à la racine du monorepo `jamon8888/hacienda-juridique`** (cf. `.claude-plugin/marketplace.json`). Un seul repo, plus besoin de second repo séparé.
>
> **Architecture actuelle** : voir `CLAUDE.md` à la racine du monorepo.
>
> **Commande d'install actuelle** : `/plugin marketplace add jamon8888/hacienda-juridique` puis `/plugin install <plugin>@hacienda-suite` (où `<plugin>` est `hacienda`, `hacienda-affaires` ou `hacienda-social`).
>
> Le contenu ci-dessous est conservé pour l'historique uniquement.

---

# Création du repo marketplace `hacienda/jurisconsultes-marketplace` (abandonné)

Ce repo (`hacienda`) contient le plugin lui-même. Pour le distribuer aux utilisateurs Cowork et Claude Code, il faut un **second repo public** qui sert de marketplace.

## Étapes

1. **Créer le repo GitHub public** `hacienda/jurisconsultes-marketplace` (visibilité **public** — requis pour la distribution externe).

2. **Structure cible** :
   ```
   hacienda/jurisconsultes-marketplace/
   ├── .claude-plugin/
   │   └── marketplace.json
   ├── hacienda/                  # ce plugin (copie ou submodule)
   │   ├── .claude-plugin/plugin.json
   │   ├── .mcp.json
   │   ├── mcp-server/
   │   ├── agents/
   │   ├── skills/
   │   ├── commands/
   │   └── …
   └── README.md
   ```

3. **`marketplace.json`** : copier `.claude-plugin/marketplace-template.json` du présent repo.

4. **Inclusion du plugin** — deux options :

   **Option A (submodule, recommandé pour itération)** :
   ```bash
   cd jurisconsultes-marketplace
   git submodule add https://github.com/jamon8888/hacienda-juridique hacienda
   git commit -m "Add hacienda plugin as submodule"
   ```

   **Option B (copie)** : copier les fichiers du repo `hacienda` dans un sous-dossier `hacienda/`. Plus simple côté installation utilisateur, mais demande à synchroniser manuellement à chaque release.

5. **Commit + push** :
   ```bash
   git add -A
   git commit -m "Initial marketplace with hacienda plugin"
   git push origin main
   ```

6. **Test depuis un compte différent** :

   **Claude Code** :
   ```bash
   claude
   > /plugin marketplace add hacienda/jurisconsultes-marketplace
   > /plugin install hacienda@jurisconsultes-marketplace
   > /plugin   # vérifier que hacienda est listé sans erreur
   ```

   **Cowork** : Customize → + → Add marketplace from GitHub → coller l'URL → installer hacienda.

## Checklist Cowork pré-publication (spec §8bis.4)

- [ ] Le plugin charge sans erreur dans Claude Code en `--plugin-dir` local
- [ ] Le plugin charge sans erreur dans Cowork en mode "uploadé localement" (Customize → Upload plugin)
- [ ] Test install via marketplace GitHub depuis un compte Cowork différent de celui de dev
- [ ] La saisie des credentials PISTE fonctionne dans l'UI Cowork
- [ ] Les slash commands (`/hacienda:recherche`, `/hacienda:veille`) sont visibles dans le menu `/` Cowork
- [ ] Les sub-agents (dupin, cassin, colbert, portalis) apparaissent et sont invocables
- [ ] Scénario E2E complet exécuté dans Cowork (recherche → synthèse → export Word via skill `docx` si dispo)

## Évolutions à monitorer

Cf. spec §8bis.5 :
- Marketplaces privées d'organisation (offre clé en main par cabinet)
- Provisioning automatique par admin Enterprise
- Branding personnalisé Team/Enterprise

Ces fonctionnalités ouvrent un second modèle commercial : marketplace privée customisée par cabinet (déploiement clé en main + agents métier + branding).
