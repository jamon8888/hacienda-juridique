# Sources Officielles

## Mission

Fournir le socle de preuve officiel pour Légifrance, BOFiP, JORF, KALI et jurisprudence officielle.

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
