# Hacienda Hub Confiance

`hacienda-hub-confiance` est le centre de confiance de la marketplace Hacienda. Il applique le standard interne Hacienda pour installer, evaluer et maintenir des plugins juridiques dans un environnement francais soumis au secret professionnel, au RGPD, aux dossiers client et aux exigences de validation humaine.

## Mission

Le plugin sert a :

- inventorier les plugins et skills disponibles ;
- evaluer un skill ou un plugin avant installation ;
- personnaliser un plugin Cowork pour un cabinet ou une direction juridique ;
- auditer manifests, MCP, hooks, scripts, licences et README ;
- surveiller les mises a jour ;
- desactiver ou retirer un plugin a risque ;
- preparer un pack de publication interne ou marketplace.

## Premier Lancement

```text
/hacienda-hub-confiance:entretien-demarrage
```

L'entretien cree le profil de pratique dans :

```text
~/.claude/plugins/config/hacienda-juridique/hacienda-hub-confiance/CLAUDE.md
```

Ce profil de pratique conserve les registries autorises, les auteurs approuves, les connecteurs MCP acceptables, les seuils de validation humaine et les conventions de dossier de preuve.

## Principe De Confiance

Toute installation est une decision de confiance. Le hub applique quatre couches :

- source brute lue avant synthese ;
- allowlist de registries, auteurs et connecteurs ;
- scan d'injection, hooks, scripts, secrets et MCP ;
- validation humaine avant toute ecriture, activation, publication ou suppression.

Une source officielle n'est requise que si le plugin revendique une analyse normative. Sinon, les sources principales sont le depot, le manifest, la licence, les fichiers de skill et la configuration MCP. Tout element non lu reste `[a verifier]`.

## Connecteur Pappers

Pappers est un connecteur MCP externe optionnel pour les donnees d'entreprise, dirigeants, beneficiaires effectifs, comptes, BODACC, cartographies et signaux de risque. Il utilise `PAPPERS_API_KEY` via `https://mcp.pappers.fr/${PAPPERS_API_KEY}` et ne doit jamais etre configure avec une cle en clair dans le depot.

Pappers n'est pas une source officielle normative Hacienda. Les donnees Pappers peuvent enrichir le dossier de preuve, mais toute conclusion juridique ou citation normative doit etre recoupee avec `hacienda-sources-officielles` ou les pieces du dossier. Les champs PPE, sanctions, scoring financier et scoring non financier exigent une intention explicite et une validation humaine.

Usage prioritaire : audit du connecteur Pappers, classification des tools, controle des secrets, credits, PPE, sanctions, scoring et donnees personnelles.

## Skills

- `entretien-demarrage` : configure profil, allowlist, registries, connecteurs et gates.
- `audit-pappers-mcp` : audite le connecteur Pappers, ses tools, crédits, secrets et profils d'activation.
- `registre-plugins` : cartographie plugins installes, locaux, candidats et statuts.
- `evaluer-skill` : QA d'un skill contre design, securite, injection et usage juridique.
- `installer-plugin` : workflow d'installation gatee avec source brute et validation humaine.
- `personnaliser-plugin-cowork` : adapte un plugin Cowork a l'organisation.
- `audit-manifest` : controle manifest, chemins, branding, version, licence et metadata.
- `audit-mcp` : analyse connecteurs, scopes, secrets, donnees et risques.
- `surveiller-mises-a-jour` : compare versions, diffs, hooks, MCP et politique de confiance.
- `desactiver-plugin` : desactive ou retire un plugin sans toucher aux plugins first-party non cibles.
- `generer-pack-publication` : produit checklist de release, dossier de preuve et note de publication.

## Agents

- `veilleur-registres-plugins` : surveille registries autorises et nouveaux plugins pertinents.
- `surveillant-mises-a-jour` : surveille nouvelles versions et diffs sensibles.
- `auditeur-confiance` : relit periodiquement les decisions de confiance et exceptions.
- `gardien-connecteurs` : detecte nouveaux MCP, scopes sensibles et derive des secrets.
- `auditeur-pappers-mcp` : audite Pappers MCP, credits, secrets, profils et recoupements officiels.

Les agents n'installent rien. Ils produisent des alertes, des dossiers de preuve et une Note de revue.

## Livrables

- audit de plugin ;
- audit de skill ;
- audit MCP ;
- matrice de confiance ;
- pack publication ;
- rapport de mise a jour ;
- decision de validation humaine ;
- dossier de preuve ;
- Note de revue ;
- Arbre de decision.

## Mode Silencieux

Le Mode silencieux evite de redemander les registries, auteurs, connecteurs et seuils deja configures. Il ne permet jamais d'installer, mettre a jour, supprimer, publier ou activer un MCP sans validation humaine.

## Limites

Le hub n'est pas un scanner de securite exhaustif. Il reduit le risque en forçant la lecture source, la preuve, la revue humaine et le controle des connecteurs. Les plugins tiers restent du code ou des instructions executees avec les droits de l'environnement.
