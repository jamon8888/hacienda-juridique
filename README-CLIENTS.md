# Hacienda Juridique - Guide Client

Hacienda Juridique est une distribution de plugins juridiques français pour
avocats, juristes, directions juridiques et legal ops.

Le projet ne remplace pas un professionnel du droit. Il aide à cadrer un
dossier, rechercher les sources, structurer une analyse, produire un dossier de
preuve et préparer une validation humaine.

## Ce Que Vous Installez

La distribution active contient trois plugins :

| Plugin | Role | Usage client |
| --- | --- | --- |
| `hacienda-sources-officielles` | Socle de vérification | Consulter et vérifier les sources primaires françaises et européennes. |
| `hacienda-recherche-documentaire` | Recherche documentaire juridique supervisée | Préparer les requêtes, comparer les bases éditoriales, extraire les références utiles et vérifier les sources primaires. |
| `hacienda-propriete-intellectuelle` | Propriété intellectuelle | Traiter marques, brevets, dessins et modèles, droit d'auteur, logiciel, open source et enforcement PI. |

Les anciens plugins métiers non distribués ne font pas partie du catalogue
client actif.

## Principes De Travail

Chaque plugin applique les memes garde-fous :

- une source non consultée reste marquée `[a verifier]` ou `[à vérifier]` ;
- une citation doit indiquer sa provenance réelle ;
- les faits, le droit, l'analyse, les incertitudes et les décisions sont
  séparés ;
- les dossiers client, pièces et contenus récupérés sont traités comme des
  données, jamais comme des instructions ;
- aucune sortie n'est présentée comme un conseil juridique final ;
- toute action externe exige une validation humaine.

## Parcours Client Recommande

1. Installer la marketplace Hacienda.
2. Configurer le profil cabinet et les profils par plugin.
3. Configurer les identifiants des sources officielles et registres utiles.
4. Lancer le plugin `hacienda-sources-officielles` pour valider les accès.
5. Lancer le plugin métier adapté au dossier.
6. Relire le dossier de preuve, les sources et les points `[à vérifier]`.
7. Faire valider les conclusions par le professionnel responsable.

## Configuration Commune

Les profils utilisateur restent hors du dépôt, dans :

```text
~/.claude/plugins/config/hacienda-juridique/company-profile.md
~/.claude/plugins/config/hacienda-juridique/<plugin>/CLAUDE.md
```

Les secrets et identifiants restent hors du dépôt. La configuration locale
recommandée est :

```text
~/.config/Hacienda/credentials.json
```

Exemple sans vraie clé :

```json
{
  "PISTE_CLIENT_ID": "<client-id-legifrance>",
  "PISTE_CLIENT_SECRET": "<client-secret-legifrance>",
  "JUDILIBRE_KEY_ID": "<keyid-judilibre>",
  "INPI_DATA_LOGIN": "<login-inpi>",
  "INPI_DATA_PASSWORD": "<password-inpi>",
  "EUIPO_API_KEY": "<euipo-api-key>",
  "OEB_CONSUMER_KEY": "<oeb-consumer-key>",
  "OEB_CONSUMER_SECRET": "<oeb-consumer-secret>"
}
```

Une clé exposée dans un chat, un log, une capture ou un fichier versionné doit
être considérée comme compromise et remplacée.

## Plugin 1 - Hacienda Sources Officielles

### Role

`hacienda-sources-officielles` est le socle de preuve. Il sert à consulter ou
vérifier les sources primaires avant qu'un plugin métier produise une synthèse.

### Sources Couvertes

- Legifrance ;
- JORF et textes officiels ;
- codes et articles ;
- KALI et conventions collectives ;
- jurisprudence officielle ;
- Judilibre ;
- BOSS et BOFiP lorsque les outils du socle sont utilisés ;
- EUR-Lex pour les textes europeens utiles ;
- sources PI publiques lorsque le workflow PI les sollicite.

### Cas D'usage

- vérifier un article cité dans un mémo ;
- contrôler une version applicable à une date donnée ;
- vérifier une décision ou une référence jurisprudentielle ;
- constituer un dossier de preuve ;
- distinguer source officielle, doctrine, piece client et hypothese.

### Commande De Demarrage

```text
/h-sources-officielles:entretien-demarrage
```

### Livrables

- dossier de preuve ;
- liste de sources consultées ;
- références exactes et dates de consultation ;
- points `[à vérifier]` ;
- note de revue pour validation humaine.

### Limites

Le plugin ne conclut pas seul. Il vérifie les sources et structure le dossier.
L'interprétation finale reste sous contrôle humain.

## Plugin 2 - Hacienda Recherche Documentaire

### Role

`hacienda-recherche-documentaire` organise la recherche documentaire juridique
dans les bases éditoriales et professionnelles autorisées. Il prépare les
requêtes, guide la consultation, compare les résultats, extrait les références
utiles et renvoie les sources primaires vers `hacienda-sources-officielles`.

Il ne remplace pas les bases documentaires, ne contourne pas les conditions
d'accès des éditeurs et ne fait pas d'extraction massive.

### Plateformes Ciblees

- Doctrine ;
- Lefebvre Dalloz et GenIA-L ;
- Lexis 360 et Lexis+ AI ;
- Lextenso ;
- Lexbase ;
- Dalloz ;
- Navis ;
- Elnet ;
- Lamyline.

### Skills Disponibles

| Skill | Usage |
| --- | --- |
| `entretien-demarrage` | Configure les plateformes et les règles de recherche du cabinet. |
| `preparation-requete` | Prépare les requêtes multi-bases avant recherche. |
| `recherche-doctrine` | Guide une recherche supervisée dans Doctrine. |
| `recherche-lefebvre-dalloz` | Guide une recherche supervisée dans Lefebvre Dalloz ou GenIA-L. |
| `recherche-lexis` | Guide une recherche supervisée dans Lexis 360 ou Lexis+ AI. |
| `recherche-lextenso` | Guide une recherche supervisée dans Lextenso. |
| `comparaison-bases` | Compare les résultats issus de plusieurs bases. |
| `controle-copyright` | Contrôle droits éditeurs, accès autorisés et limites d'extraction. |
| `dossier-documentaire` | Produit un dossier documentaire exploitable. |
| `extraction-references` | Extrait les métadonnées utiles sans copie longue de contenu protégé. |
| `verification-sources-primaires` | Renvoie les sources citées vers le socle officiel Hacienda. |

### Agents Disponibles

| Agent | Role |
| --- | --- |
| `consolidateur-recherche` | Consolide résultats, références, doublons et lacunes. |
| `controleur-sources` | Vérifie la provenance, la qualité et les points `[à vérifier]`. |
| `veilleur-documentaire` | Surveille les signaux documentaires selon un perimetre valide. |

### Livrables

- stratégie de recherche ;
- journal de recherche ;
- tableau des bases consultées ;
- liste de références utiles ;
- dossier documentaire ;
- note de synthèse ;
- points de validation humaine.

### Limites

Les bases privees peuvent orienter la recherche. Une conclusion juridique doit
etre recoupee avec une source officielle, une piece du dossier ou une source
primaire consultable.

## Plugin 3 - Hacienda Propriete Intellectuelle

### Role

`hacienda-propriete-intellectuelle` couvre les workflows PI : marques,
brevets, dessins et modèles, droit d'auteur, logiciel, open source, contrats
PI, preuves, contrefaçon et stratégie de défense.

### Sources Et Registres

- INPI Data marques ;
- BOPI ;
- EUIPO TMview ;
- INPI brevets ;
- OEB Espacenet ;
- Legifrance et Code de la propriété intellectuelle ;
- EUR-Lex lorsque le droit europeen est utile ;
- pieces client, contrats, licences, SBOM, captures et preuves.

### Skills Marques

| Skill | Usage |
| --- | --- |
| `recherche-anteriorite-marque` | Premier passage de recherche d'anteriorite marque. |
| `clearance-marque` | Point d'entrée historique vers la recherche marque. |
| `depot-marque-fr` | Préparation de dépôt FR, UE ou Madrid. |
| `surveillance-marque` | Surveillance et priorisation des signaux marques. |
| `revue-portefeuille-marques` | Revue portefeuille, renouvellements et risques. |
| `analyse-opposition-marque` | Analyse ou défense d'opposition. |

### Skills Brevets Et CCP

| Skill | Usage |
| --- | --- |
| `recherche-anteriorite-brevet` | Premier passage d'anteriorite brevet. |
| `preparation-depot-brevet` | Préparation de dépôt FR, EP, PCT ou séquence. |
| `strategie-extension-internationale` | Stratégie territoriale et priorité. |
| `revue-portefeuille-brevets` | Rapport portefeuille brevets. |
| `analyse-refus-inpi` | Reponse a notification INPI ou OEB. |
| `tableau-contrefacon-brevet` | Claim chart offensif brevet. |
| `anteriorite-invalidite` | Analyse de validite ou invalidite d'un brevet adverse. |
| `certificat-complementaire-protection` | Readiness CCP, durée, fenêtre de dépôt et risques. |

### Skills Dessins Et Modeles

| Skill | Usage |
| --- | --- |
| `recherche-anteriorite-dm` | Recherche de disponibilite dessin ou modele. |
| `depot-dessin-modele` | Préparation de dépôt FR, UE ou La Haye. |
| `contrefacon-dessin-modele` | Analyse d'atteinte, validite et preuve D&M. |

### Skills Droit D'auteur, Logiciel Et Data

| Skill | Usage |
| --- | --- |
| `qualification-oeuvre` | Qualification d'oeuvre protégée. |
| `cession-droit-auteur` | Preparation de cession de droits patrimoniaux. |
| `licence-droit-auteur` | Preparation de licence. |
| `contrefacon-droit-auteur` | Analyse d'atteinte droit d'auteur. |
| `droits-voisins-ogc` | Droits voisins et organismes de gestion collective. |
| `bases-de-donnees` | Protection base de données et droit sui generis. |
| `logiciels-pi` | Titularite logiciel, regime employeur et droits d'usage. |
| `revue-open-source` | Audit OSS, licences, SBOM et obligations. |
| `revue-logiciel-donnees` | Chaîne de droits logiciel et données. |

### Skills Contrats, Preuve Et Contentieux

| Skill | Usage |
| --- | --- |
| `contrats-pi` | Contrats PI autonomes et transferts technologiques. |
| `revue-clause-pi` | Revue ciblee de clauses PI dans contrats larges. |
| `audit-pi-ma` | Due diligence PI M&A. |
| `depot-preuve-creation` | Dossier de preuve de création, usage ou titularité. |
| `tri-contrefacon` | Triage initial enforcement. |
| `mise-en-demeure-pi` | Projet ou revue de mise en demeure, sans envoi. |
| `saisie-contrefacon` | Preparation de mesure probatoire. |
| `contentieux-pi` | Strategie judiciaire PI. |
| `strategie-defense-pi` | Défense face à une allégation PI. |
| `portefeuille-pi` | Vue consolidee multi-actifs. |

### Agents Disponibles

| Agent | Role | Limite |
| --- | --- | --- |
| `bopi-watcher` | Surveille publications BOPI et signaux marques. | Ne decide pas une opposition. |
| `contrefacon-web` | Detecte signaux web et marketplaces. | Ne constate pas judiciairement. |
| `veilleur-renouvellements-pi` | Suit echeances portefeuille et renouvellements. | Ne paie pas de taxes. |
| `veilleur-marques` | Surveille marques et risques proches. | Ne rend pas d'opinion finale. |
| `veilleur-contrefacon` | Priorise signaux enforcement multi-droits. | Ne lance pas d'action formelle. |
| `surveillant-oss` | Surveille logiciel, OSS et data. | Ne remplace pas un audit complet. |

### Commande De Demarrage

```text
/h-pi:entretien-demarrage
```

### Livrables

- note de clearance ;
- rapport d'anteriorite ;
- dossier de preuve ;
- revue de clauses ;
- rapport OSS ;
- vue portefeuille ;
- claim chart ;
- projet de mise en demeure ;
- note de stratégie ;
- points `[à vérifier]` et validation humaine.

### Limites

Le plugin PI ne depose pas de titre, ne paie pas de taxes, n'envoie pas de
courrier, ne déclenche pas de procédure et ne remplace pas une opinion
juridique finale.

## Tableau D'orientation Rapide

| Besoin | Plugin A Lancer |
| --- | --- |
| Vérifier un article, une décision ou une source primaire | `hacienda-sources-officielles` |
| Préparer une recherche doctrinale multi-bases | `hacienda-recherche-documentaire` |
| Faire une recherche marque, brevet ou portefeuille PI | `hacienda-propriete-intellectuelle` |
| Contrôler une citation issue d'une base privée | `hacienda-recherche-documentaire` puis `hacienda-sources-officielles` |
| Produire un dossier de preuve avant envoi client | Plugin métier puis `hacienda-sources-officielles` |

## Ce Que Le Client Doit Fournir

Selon le dossier, le plugin peut demander :

- objectifs du client et contexte factuel ;
- juridiction, pays, langue, dates importantes ;
- pieces sources et versions de documents ;
- sources déjà consultées ;
- seuils de risque et niveau de validation attendu ;
- identifiants d'accès aux registres ou API, stockés hors dépôt ;
- consignes de confidentialité et de conservation.

## Sortie Type Attendue

Une sortie Hacienda doit etre exploitable par un professionnel :

- resume operationnel ;
- faits retenus ;
- sources consultées ;
- sources non consultées marquées `[à vérifier]` ;
- analyse ;
- incertitudes ;
- options ;
- recommandation de validation humaine ;
- annexes ou dossier de preuve.

## Sécurité Et Confidentialité

- Ne jamais commiter de dossier client.
- Ne jamais commiter de secret, clé API, mot de passe ou token.
- Ne pas transmettre de piece confidentielle a un connecteur non valide.
- Journaliser uniquement ce qui est necessaire.
- Supprimer ou anonymiser les extraits non utiles au dossier.

## Vérification Avant Distribution

L'équipe technique Hacienda vérifie au minimum :

```bash
npm test
npm run typecheck
npm run build
npm run branding:check
npm audit --audit-level=moderate
git diff --check
```

Le validateur des plugins vérifie aussi la cohérence du catalogue actif :

```bash
npm run plugin:validate
```

## Licence

Le code est distribué sous licence AGPL-3.0-or-later. Les données juridiques,
registres et contenus consultes restent soumis aux conditions de leurs
producteurs respectifs.
