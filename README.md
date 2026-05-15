# Hacienda Juridique

Hacienda est une marketplace de plugins juridiques francais pour avocats, juristes, fiscalistes, experts-comptables et equipes conformite.

Le depot contient un socle de sources officielles, des plugins metiers et des garde-fous de revue humaine. Tous les plugins suivent la meme posture : aider a structurer le travail juridique, documenter les sources, conserver un dossier de preuve et laisser la decision finale a un professionnel habilite.

## Plugins

- `hacienda-sources-officielles` : Legifrance, BOFiP, JORF, KALI, Judilibre, BOSS et sources primaires.
- `hacienda-recherche-documentaire` : recherche supervisée dans les bases professionnelles, avec verification des sources primaires.
- `hacienda-fiscal` : fiscalite francaise, BOFiP, CGI, LPF, TVA, controle fiscal et rescrit.
- `hacienda-social` : droit social, conventions collectives, CSE, licenciement et prud'hommes.
- `hacienda-contrats` : contrats commerciaux, CGV/CGU, SaaS, NDA, distribution et baux commerciaux.
- `hacienda-societes` : gouvernance, assemblees, pactes, cessions, closing et vie sociale.
- `hacienda-contentieux` : chronologie, pieces, moyens, conclusions, assignations et strategie.
- `hacienda-donnees-personnelles` : RGPD, CNIL, DPA, AIPD, cookies et violations de donnees.
- `hacienda-produit-consommation` : lancement produit, claims, prix, parcours consommateur et plateformes.
- `hacienda-reglementaire` : veille JORF/LODA/UE, autorites sectorielles, gaps et consultations.
- `hacienda-gouvernance-ia` : AI Act, RGPD, registre IA, AIA, fournisseurs et politique interne.
- `hacienda-propriete-intellectuelle` : marques, PI, logiciel, open source, preuves et enforcement.
- `hacienda-droit-public` : commande publique, urbanisme, collectivites, fonction publique et contentieux administratif.
- `hacienda-permanences-juridiques` : accueil supervise, conflits, pieces, delais, memos et handoffs.
- `hacienda-hub-confiance` : installation, evaluation et maintenance de plugins juridiques tiers.

## Installation Dev

```bash
npm install
npm test
npm run typecheck
npm run build
```

## Marketplace

Le fichier marketplace est :

```text
.claude-plugin/marketplace.json
```

Chaque plugin Hacienda contient :

- `.claude-plugin/plugin.json`
- `.mcp.json`
- `CLAUDE.md`
- `README.md`
- `skills/*/SKILL.md`
- `agents/*.md` quand le domaine a besoin de suivi
- `hooks/hooks.json`

## Integrations

- Pappers MCP hybrid validation: `docs/integrations/pappers-mcp-validation.md`
- Pappers agents and skills doctrine: `docs/integrations/pappers-agents-skills.md`

## Regle De Preuve

Toute citation juridique doit indiquer sa provenance reelle. Une source officielle non consultee dans la session reste marquee `[a verifier]`.

Les livrables sont des brouillons professionnels avec validation humaine, Note de revue, Arbre de decision et dossier de preuve.

## Licence

Le code source est distribue sous licence AGPL-3.0-or-later. Les donnees juridiques recuperees depuis les sources publiques restent soumises aux conditions de leurs producteurs respectifs, notamment les licences applicables aux contenus publics francais.
