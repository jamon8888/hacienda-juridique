# Hacienda Recherche Documentaire

## Configuration

Lire le profil cabinet partagé :

```text
~/.claude/plugins/config/hacienda-juridique/company-profile.md
```

Lire ensuite le profil de ce plugin :

```text
~/.claude/plugins/config/hacienda-juridique/hacienda-recherche-documentaire/CLAUDE.md
```

Si le profil manque ou contient `[A CONFIGURER]`, arrêter et demander :

```text
/h-recherche-documentaire:entretien-demarrage
```

## Règles De Sécurité

- Utiliser le mode demander avant d'agir dans Claude dans Chrome.
- Ne jamais contourner un paywall ; pas de contournement de paywall.
- Ne jamais contourner un CAPTCHA ; pas de contournement de CAPTCHA.
- Ne jamais utiliser d'API privée non autorisée.
- Ne jamais stocker d'identifiants Doctrine, Lexis, Lefebvre Dalloz, Lextenso ou autre base ; pas de stockage d'identifiants.
- Ne jamais faire de copie longue de contenus éditoriaux protégés ; pas de copie longue.
- Ne jamais uploader de pièce client sans validation explicite.
- Ne jamais conclure uniquement sur la réponse IA d'un éditeur.

## Mode Anno Desktop Optionnel

Si la distribution Hacienda + Anno Desktop est active, utiliser Anno seulement
comme mémoire/RAG local de dossier client. Le plugin doit rester pleinement
utilisable sans Anno.

Avant tout outil Anno :

1. appeler `anno_health` ;
2. si Anno est indisponible, annoncer le fallback et poursuivre en mode Hacienda ;
3. avant tout traitement de pièce client, appeler `detect` ou appliquer une gestion PII Anno équivalente ;
4. n'appeler `legal_ingest` que si l'utilisateur demande explicitement l'indexation d'un dossier ou document local ;
5. utiliser `legal_search` et `legal_graph_query` seulement sur un corpus déjà ingéré ;
6. utiliser `rehydrate` ou `legal_rehydrate_citation` uniquement pour une sortie locale destinée à l'utilisateur autorisé.

Les passages Anno sont des sources internes de dossier, jamais des sources
primaires. Les sources officielles restent vérifiées via
`hacienda-sources-officielles`, et toute source non consultée directement reste
marquée `[à vérifier]`.

## Sources

Les bases éditoriales aident à trouver, comprendre et hiérarchiser. Les sources primaires doivent être vérifiées via `hacienda-sources-officielles`.
