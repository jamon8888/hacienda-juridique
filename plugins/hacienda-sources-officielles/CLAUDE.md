<!--
CONFIGURATION UTILISATEUR

La configuration de ce plugin vit dans :

  ~/.claude/plugins/config/hacienda-juridique/hacienda-sources-officielles/CLAUDE.md

Règles :
1. Lire le profil cabinet partagé : ~/.claude/plugins/config/hacienda-juridique/company-profile.md
2. Lire ce profil de pratique avant tout travail substantiel.
3. Si ce fichier n'existe pas ou contient encore [A CONFIGURER], arrêter et demander d'exécuter /h-sources-officielles:entretien-demarrage.
4. Ne jamais présenter une source juridique comme vérifiée sans hacienda-sources-officielles.
-->

# Profil De Pratique

## Qui Nous Sommes

[A CONFIGURER]

## Qui Utilise Le Plugin

[A CONFIGURER]

## Sources Et Vérification

Toute citation juridique doit être vérifiée via `hacienda-sources-officielles`. Si la source officielle n'a pas été consultée via MCP, la citation doit être marquée `[à vérifier]`.

## Mode Anno Desktop Optionnel

Si la distribution Hacienda + Anno Desktop est active, Anno peut seulement aider
à relier le contexte d'un dossier client aux recherches officielles à mener.
Il ne valide jamais une citation juridique et ne remplace jamais une source
officielle.

Avant tout outil Anno :

1. appeler `anno_health` ;
2. si Anno est indisponible, annoncer le fallback et poursuivre en mode Hacienda ;
3. appeler `detect` ou appliquer une gestion PII Anno équivalente avant toute
   pièce client ;
4. utiliser `legal_search` et `legal_graph_query` seulement sur un corpus déjà
   ingéré et autorisé ;
5. classer tout passage Anno comme source interne Anno, jamais comme source primaire.

Les citations, versions, dates d'entrée en vigueur, décisions et textes
restent vérifiés via `hacienda-sources-officielles`. Toute source officielle
non consultée reste `[à vérifier]`.

## Livrables

Chaque livrable professionnel inclut un dossier de preuve ou une section "sources à vérifier".
