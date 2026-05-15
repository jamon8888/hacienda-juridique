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

- Simple MCP configuration: `docs/integrations/mcp-configuration-simple.md`
- PISTE connection guide: `docs/integrations/piste-connection.md`
- Pappers MCP hybrid validation: `docs/integrations/pappers-mcp-validation.md`
- Pappers agents and skills doctrine: `docs/integrations/pappers-agents-skills.md`

### Configuration MCP Simple

Hacienda suit la logique Claude Cowork Legal : `.mcp.json` declare les connecteurs disponibles, le profil utilisateur vit dans `~/.claude/plugins/config/hacienda-juridique/<plugin>/CLAUDE.md`, et un connecteur n'est marque connecte qu'apres test live. Guide : `docs/integrations/mcp-configuration-simple.md`.

### PISTE Via Hacienda Sources Officielles

PISTE n'est pas installe comme MCP externe. L'utilisateur installe le serveur MCP local `Hacienda Sources Officielles`, qui lit les credentials locaux, gere OAuth pour Legifrance et transforme les API PISTE en tools MCP Hacienda.

Configuration minimale :

- Legifrance : `PISTE_CLIENT_ID`, `PISTE_CLIENT_SECRET`, `PISTE_ENV=production`.
- Judilibre : `JUDILIBRE_KEY_ID`, `JUDILIBRE_ENV=production`.

Pour les clients GUI qui ne transmettent pas toujours les variables d'environnement, creer un fichier local :

```text
~/.config/Hacienda/credentials.json
```

Exemple sans vraie cle :

```json
{
  "PISTE_CLIENT_ID": "<client-id OAuth Legifrance>",
  "PISTE_CLIENT_SECRET": "<client-secret OAuth Legifrance>",
  "PISTE_ENV": "production",
  "JUDILIBRE_KEY_ID": "<KeyId Judilibre>",
  "JUDILIBRE_ENV": "production"
}
```

Validation rapide apres installation :

```text
piste_status
legifrance_get_article articleId=LEGIARTI000032041571
judilibre_status
judilibre_recherche query="licenciement" pageSize=2
```

`invalid_client` indique un mauvais couple OAuth Legifrance. `subscription required` indique que les credentials marchent mais que l'application PISTE n'a pas souscrit a l'API. Un `400` Judilibre indique en general un `KeyId` absent, mauvais ou rattache au mauvais environnement.

Guide installateur complet : `docs/integrations/piste-connection.md`.

### Pappers MCP Hybride

Pappers est integre comme connecteur MCP externe optionnel pour les donnees d'entreprise : identification SIREN/SIRET, dirigeants, beneficiaires effectifs, comptes, cartographie de groupe, signaux BODACC, solvabilite, risques contractuels et signaux contentieux.

Pappers n'est pas une source officielle normative Hacienda. Toute conclusion juridique, citation opposable, decision de signature, strategie contentieuse, analyse fiscale ou avis client doit etre recoupe avec `hacienda-sources-officielles`, les pieces du dossier ou les registres officiels pertinents.

Le connecteur est declare dans les plugins suivants :

- `hacienda-societes` : due diligence entreprise, groupe, dirigeants, beneficiaires, comptes et BODACC.
- `hacienda-contrats` : verification cocontractant, pouvoirs du signataire et adaptation contractuelle au risque.
- `hacienda-contentieux` : solvabilite adverse, procedures collectives, actifs, groupe et signaux de decisions.
- `hacienda-fiscal` : contexte business des dossiers fiscaux, sans conclusion fiscale sans BOFiP, loi et source officielle.
- `hacienda-hub-confiance` : audit du connecteur, profils, credits, secrets et activation full power.

Agents Pappers ajoutes :

- `investigateur-pappers-entreprise`
- `veilleur-bodacc-pappers`
- `controleur-pouvoirs-pappers`
- `enqueteur-solvabilite-pappers`
- `auditeur-pappers-mcp`

Skills Pappers principaux :

- `due-diligence-cocontractant`
- `verification-pouvoir-signataire`
- `analyse-solvabilite-adversaire`
- `audit-pappers-mcp`

Statuts operationnels obligatoires :

- `missing_key` : `PAPPERS_API_KEY` absent.
- `tools_visible` : decouverte MCP OK.
- `credits_insufficient` : credits Pappers insuffisants, activation metier live refusee.
- `needs_official_recoupement` : signal utile mais non recoupe.
- `validated` : appel credite, donnees structurees, dossier de preuve et validation humaine.
- `blocked` : secret expose, profil sensible non valide ou garde-fou manquant.

Activation locale :

```bash
npm install
```

```powershell
$env:PAPPERS_API_KEY = "<rotated-key>"
node scripts/pappers-mcp-discover.mjs
```

La cle Pappers ne doit jamais etre commitee. Les cles exposees dans un chat, un log ou un fichier doivent etre considerees compromises et remplacees.

## Regle De Preuve

Toute citation juridique doit indiquer sa provenance reelle. Une source officielle non consultee dans la session reste marquee `[a verifier]`.

Les livrables sont des brouillons professionnels avec validation humaine, Note de revue, Arbre de decision et dossier de preuve.

## Licence

Le code source est distribue sous licence AGPL-3.0-or-later. Les donnees juridiques recuperees depuis les sources publiques restent soumises aux conditions de leurs producteurs respectifs, notamment les licences applicables aux contenus publics francais.
