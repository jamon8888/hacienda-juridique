# Sources Officielles

## Mission

Fournir le socle de preuve officiel pour Légifrance, BOFiP, JORF, KALI et jurisprudence officielle.

## Installation Et Packaging

`hacienda-sources-officielles` existe sous deux formes complémentaires :

| Surface | Format | Usage |
| --- | --- | --- |
| Plugin Cowork / Claude Code | Dossier plugin dans la marketplace Hacienda | Profil, skill de démarrage, règles de preuve et référence par les autres plugins |
| Connector Claude Desktop | `plugins/hacienda-sources-officielles.mcpb` | Serveur MCP Sources Officielles local bundled |

Le bundle `.mcpb` installe seulement le serveur MCP local comme Connector
Claude Desktop. Le plugin Cowork reste la forme complète pour les workflows
Hacienda.

## Connexion PISTE

PISTE n'est pas un MCP externe a installer. PISTE est l'API officielle appelee par le serveur MCP local `Hacienda Sources Officielles`.

L'utilisateur installe ce plugin, configure `PISTE_CLIENT_ID` et `PISTE_CLIENT_SECRET`, puis utilise le tool `piste_status` pour verifier OAuth, souscription API et acces live.

Guide complet : `docs/integrations/piste-connection.md`

## Sources

Ce plugin fournit le socle `hacienda-sources-officielles` pour les sources primaires.

## Mode Anno Desktop Optionnel

Dans la distribution Hacienda + Anno Desktop, Anno sert uniquement à retrouver
le contexte local du dossier et à préparer les recherches officielles. Il ne
valide jamais une citation juridique.

Règles d'usage :

- appeler `anno_health` avant tout outil Anno ;
- appeler `detect` ou appliquer une gestion PII Anno équivalente avant toute
  pièce client ;
- utiliser `legal_search` et `legal_graph_query` seulement sur un corpus déjà
  ingéré et autorisé ;
- traiter chaque passage Anno comme source interne Anno, jamais comme source primaire ;
- si Anno est indisponible, poursuivre en mode Hacienda sans mémoire/RAG local.

La vérification opposable reste faite par `hacienda-sources-officielles` :
Légifrance, BOFiP, JORF, KALI, Judilibre, BOSS et autres sources officielles
connectées. Une source officielle non consultée reste `[à vérifier]`.

## Commande De Démarrage

```text
/h-sources-officielles:entretien-demarrage
```

## Outils MCP Exposés

Le serveur MCP bundled expose les outils officiels par noms explicites :

- `piste_status`, `piste_cache_clear` ;
- `legifrance_recherche`, `legifrance_get_article`, `legifrance_get_code`,
  `legifrance_get_loda`, `legifrance_get_jurisprudence`,
  `legifrance_get_jorf`, `legifrance_get_circulaire`, `legifrance_api_call` ;
- `judilibre_recherche`, `judilibre_get_decision` ;
- `eurlex_recherche`, `eurlex_consulter` ;
- `bofip_rechercher`, `bofip_consulter` ;
- `boss_recherche`, `boss_get_document` ;
- `inpi_search_marques`, `inpi_marque_details`, `inpi_search_brevets`,
  `inpi_brevet_details`, `espacenet_search`, `espacenet_brevet_details` ;
- `bodacc_by_siren`, `bodacc_procedures`, `company_full_profile`.

## Skills Prévus

- `entretien-demarrage`
- `verifier-citation`
- `dossier-preuve`
- `verifier-version`
- `cartographier-sources`
- `classer-autorite`

## Livrables

- dossier de preuve ;
- note ou mémo professionnel ;
- sources vérifiées ;
- points à relire manuellement.
