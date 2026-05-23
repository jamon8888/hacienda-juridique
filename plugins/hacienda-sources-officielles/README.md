# Sources Officielles

## Mission

Fournir le socle de preuve officiel pour Légifrance, BOFiP, JORF, KALI et jurisprudence officielle.

## Connexion PISTE

PISTE n'est pas un MCP externe a installer. PISTE est l'API officielle appelee par le serveur MCP local `Hacienda Sources Officielles`.

L'utilisateur installe ce plugin, configure `PISTE_CLIENT_ID` et `PISTE_CLIENT_SECRET`, puis utilise le tool `piste_status` pour verifier OAuth, souscription API et acces live.

Guide complet : `docs/integrations/piste-connection.md`

## Sources

Ce plugin fournit le socle `hacienda-sources-officielles` pour les sources primaires.

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
