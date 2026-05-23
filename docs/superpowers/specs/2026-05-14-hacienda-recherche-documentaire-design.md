# Hacienda Recherche Documentaire — Spécification De Conception

## Objectif

Créer `hacienda-recherche-documentaire`, un plugin qui orchestre les recherches dans les bases juridiques payantes ou éditoriales utilisées par les avocats français, tout en respectant leurs conditions d'usage, la confidentialité des dossiers et la propriété intellectuelle des contenus.

Le plugin utilise Claude dans Chrome en mode supervisé lorsque l'utilisateur est connecté à ses plateformes. Il ne contourne aucune restriction technique ou contractuelle. Il extrait des références, compare les résultats et fait vérifier les sources primaires via `hacienda-sources-officielles`.

## Positionnement

`hacienda-sources-officielles` répond à la question : **la source primaire existe-t-elle, dans quelle version et avec quel contenu exact ?**

`hacienda-recherche-documentaire` répond à la question : **quelles bases, commentaires, revues, analyses et pistes doctrinales un avocat devrait-il consulter pour traiter le sujet sans angle mort ?**

Le plugin ne se substitue pas à Doctrine, Lexis, Lefebvre Dalloz, Lextenso, Lexbase, Dalloz, Navis, Elnet ou Lamyline. Il aide l'utilisateur à mieux exploiter les abonnements dont il dispose déjà.

## Modes D'Utilisation

### Mode Manuel Sécurisé

Hacienda prépare les requêtes, l'utilisateur les exécute dans ses bases, puis colle les références utiles dans Claude.

Avantages :

- compatible avec toutes les plateformes ;
- faible risque contractuel ;
- pas d'accès navigateur nécessaire ;
- adapté aux cabinets prudents.

Limites :

- moins automatisé ;
- dépend de la discipline de l'utilisateur ;
- moins performant pour comparer plusieurs bases.

### Mode Chrome Supervisé

Claude dans Chrome navigue dans les sites autorisés par l'utilisateur, dans un plan approuvé à l'avance.

Règles :

- uniquement sur domaines explicitement listés ;
- mode "demander avant d'agir" ;
- pas d'upload de pièces client sans validation ;
- pas de téléchargement massif ;
- pas de copie longue ;
- arrêt immédiat si CAPTCHA, blocage ou comportement inattendu.

### Mode Connecteur Officiel

Si un éditeur fournit un MCP, une API officielle ou une intégration contractuellement autorisée, Hacienda peut l'utiliser.

Règles :

- connecteur déclaré dans `.mcp.json` ;
- OAuth ou authentification officielle ;
- respect des scopes ;
- journal des sources consultées ;
- désactivation possible par profil cabinet.

## Plateformes Ciblées

Première vague :

- Doctrine.
- Lefebvre Dalloz / GenIA-L.
- Lexis 360 / Lexis+ AI.
- Lextenso.

Deuxième vague :

- Lexbase.
- Dalloz.
- Navis.
- Elnet.
- Lamyline.

Les plateformes sont configurables dans le profil cabinet. Le plugin ne suppose jamais que l'utilisateur a accès à toutes.

## Commandes

```text
/h-recherche-documentaire:preparer-recherche
/h-recherche-documentaire:rechercher-dans-bases
/h-recherche-documentaire:comparer-resultats
/h-recherche-documentaire:extraire-references
/h-recherche-documentaire:verifier-sources-officielles
/h-recherche-documentaire:constituer-dossier
/h-recherche-documentaire:veille-documentaire
```

## Skills

```text
entretien-demarrage
preparation-requete
recherche-doctrine
recherche-lefebvre-dalloz
recherche-lexis
recherche-lextenso
recherche-lexbase
comparaison-bases
extraction-references
controle-copyright
verification-sources-primaires
dossier-documentaire
```

## Agents

```text
veilleur-documentaire
consolidateur-recherche
controleur-sources
controleur-droits-editeur
```

## Workflow De Recherche

### Étape 1 — Qualification

Le plugin identifie :

- domaine de droit ;
- juridiction ;
- période ;
- type de livrable ;
- profondeur attendue ;
- plateformes disponibles ;
- sources officielles à vérifier.

### Étape 2 — Recherche Source Primaire Initiale

Avant les bases éditoriales, le plugin appelle `hacienda-sources-officielles` pour établir un socle :

- textes applicables ;
- jurisprudence officielle ;
- BOFiP si fiscal ;
- convention collective si social ;
- version applicable.

### Étape 3 — Préparation Des Requêtes

Le plugin produit des requêtes adaptées par plateforme :

```text
Doctrine : requête large + filtres jurisprudence récente + liens de graphe.
Lexis : requête jurisprudence + JurisClasseur + revues + JurisData.
Lefebvre Dalloz : requête GenIA-L + fonds pratiques + mémentos.
Lextenso : requête revues + Gazette du Palais + doctrine.
```

### Étape 4 — Navigation Chrome Ou Exécution Manuelle

En mode Chrome supervisé, le plugin propose un plan :

```text
Sites à ouvrir :
- doctrine.fr
- lexisnexis.com/fr-fr
- lefebvre-dalloz.fr
- labase-lextenso.fr

Actions :
- lancer les requêtes préparées ;
- lire uniquement les pages de résultats et fiches pertinentes ;
- extraire les références bibliographiques ;
- relever les sources primaires citées ;
- ne pas télécharger en masse ;
- ne pas copier les contenus longs.
```

L'utilisateur approuve ou modifie le plan avant exécution.

### Étape 5 — Extraction Contrôlée

Le plugin extrait uniquement :

- titre ;
- auteur ;
- revue ou base ;
- date ;
- référence ;
- lien ;
- type de document ;
- citation courte utile ;
- sources primaires citées ;
- intérêt pour le dossier.

Le plugin ne reproduit pas de longs passages éditoriaux.

### Étape 6 — Vérification Primaire

Toutes les sources primaires relevées sont renvoyées à `hacienda-sources-officielles` :

- articles ;
- textes ;
- décisions ;
- BOFiP ;
- conventions collectives ;
- références JORF.

La sortie distingue ce qui est vérifié de ce qui reste éditorial.

### Étape 7 — Dossier Documentaire

Le livrable final suit ce format :

```markdown
# Dossier Documentaire Hacienda

## Question

## Hypothèses

## Sources Officielles Vérifiées

## Résultats Doctrine

## Résultats Lexis

## Résultats Lefebvre Dalloz

## Résultats Lextenso

## Convergences

## Divergences

## Sources Primaires Confirmées

## Sources À Relire Manuellement

## Pistes D'Argumentation

## Angles Morts
```

## Garde-Fous

Le plugin refuse :

- tout contournement de paywall ;
- tout usage d'API privée non autorisée ;
- tout contournement de CAPTCHA ;
- toute extraction massive ;
- toute copie longue de contenus protégés ;
- tout stockage d'identifiants éditeur ;
- toute action sur un site non approuvé ;
- tout upload de document client sans validation explicite ;
- toute conclusion fondée uniquement sur une réponse IA d'éditeur.

Le plugin signale :

- source éditoriale non vérifiée ;
- source primaire introuvable ;
- divergence entre éditeurs ;
- doctrine minoritaire ;
- contenu possiblement obsolète ;
- restriction d'accès ou de citation.

## Intégration Avec Les Plugins Métiers

### Fiscal

`hacienda-fiscal` utilise la recherche documentaire pour trouver commentaires, mémentos, revues fiscales et analyses doctrinales, puis vérifie CGI, LPF et BOFiP via sources officielles.

### Social

`hacienda-social` utilise la recherche documentaire pour enrichir l'analyse des conventions collectives, du licenciement, du CSE et du contentieux prud'homal.

### Contentieux

`hacienda-contentieux` utilise la recherche documentaire pour cartographier jurisprudence, doctrine, revues et arguments.

### Contrats

`hacienda-contrats` utilise la recherche documentaire pour comparer clauses, tendances jurisprudentielles et positions doctrinales.

### Sociétés

`hacienda-societes` utilise la recherche documentaire pour enrichir pactes, opérations, gouvernance et M&A.

## Sécurité Chrome

Les règles d'utilisation de Claude dans Chrome sont :

- utiliser un profil Chrome dédié au travail juridique ;
- autoriser uniquement les domaines nécessaires ;
- préférer le mode "demander avant d'agir" ;
- valider le plan avant exécution ;
- arrêter si le site demande une action sensible ;
- ne pas utiliser l'autonomie complète sur des dossiers confidentiels ;
- vérifier les captures visibles avant d'ouvrir l'extension.

## Critères D'Acceptation

- Le plugin est entièrement en français.
- Les plateformes disponibles sont configurées par profil cabinet.
- Le mode manuel fonctionne sans Chrome.
- Le mode Chrome demande un plan approuvé.
- Les résultats éditoriaux sont séparés des sources officielles.
- Les sources primaires citées sont vérifiées via `hacienda-sources-officielles`.
- Les contenus protégés ne sont pas copiés longuement.
- Les livrables indiquent les angles morts et les sources à relire manuellement.
