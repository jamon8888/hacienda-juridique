# Hacienda Plugins Métiers — Spécification De Conception

## Objectif

Définir les plugins métiers de la marketplace Hacienda, en français, selon une architecture de qualité inspirée d'une architecture marketplace juridique de référence : un plugin par domaine, un profil de pratique, des skills orientés livrables, des agents de suivi et des connecteurs MCP.

Chaque plugin doit produire des livrables exploitables par des professionnels français du droit et du chiffre, avec sources officielles vérifiées via `hacienda-sources-officielles`.

## Règles Communes À Tous Les Plugins

Chaque plugin contient :

```text
.claude-plugin/plugin.json
.mcp.json
CLAUDE.md
README.md
skills/
agents/
hooks/
```

Chaque plugin possède :

- un entretien de démarrage ;
- un profil de pratique ;
- des règles de confidentialité ;
- une matrice de validation ;
- des livrables types ;
- une exigence de dossier de preuve ;
- des agents de suivi ou de veille lorsque le domaine le justifie.

Chaque livrable professionnel doit distinguer :

- sources officielles vérifiées ;
- sources éditoriales consultées ;
- hypothèses non vérifiées ;
- niveau de confiance ;
- relecture professionnelle requise.

## `hacienda-fiscal`

### Mission

Traiter les recherches et livrables de fiscalité française pour avocats fiscalistes, experts-comptables, directions fiscales et juristes patrimoniaux.

### Sources Prioritaires

- CGI.
- LPF.
- BOFiP.
- Jurisprudence du Conseil d'État.
- Jurisprudence judiciaire lorsque pertinente.
- Textes JORF et LODA pour les réformes.

### Skills

```text
entretien-demarrage
recherche-fiscale
verifier-bofip
analyse-tva
analyse-impot-societes
analyse-impot-revenu
controle-fiscal
rediger-rescrit
memo-contentieux-fiscal
analyse-abus-de-droit
analyse-plus-value
```

### Agents

```text
veilleur-bofip
suivi-controle-fiscal
veilleur-reformes-fiscales
suivi-delais-fiscaux
```

### Livrables

- consultation fiscale ;
- mémo fiscal court ;
- note de risque ;
- projet de rescrit ;
- réponse à proposition de rectification ;
- tableau CGI / BOFiP / jurisprudence.

### Critère Qualité

Aucune réponse fiscale complète ne sort sans croiser, lorsque disponible, texte légal et doctrine BOFiP. Si l'un manque, le livrable le signale.

## `hacienda-social`

### Mission

Traiter le droit du travail français : relations individuelles, relations collectives, conventions collectives, prud'hommes, CSE et politiques RH.

### Sources Prioritaires

- Code du travail.
- KALI/IDCC.
- Jurisprudence sociale.
- JORF et LODA.
- BOFiP uniquement pour les volets fiscalo-sociaux.

### Skills

```text
entretien-demarrage
analyser-licenciement
analyser-rupture-conventionnelle
analyser-convention-collective
analyser-temps-travail
analyser-cse
rediger-politique-rh
memo-risque-prudhomal
classification-emploi
analyse-remuneration-variable
```

### Agents

```text
veilleur-conventions-collectives
suivi-delais-sociaux
veilleur-jurisprudence-sociale
suivi-dossiers-prudhomaux
```

### Livrables

- note de licenciement ;
- analyse de convention collective ;
- mémo CSE ;
- note prud'homale ;
- matrice de risques RH ;
- projet de politique interne.

### Critère Qualité

Chaque analyse sociale doit vérifier si une convention collective ou un accord applicable modifie la règle de droit commun.

## `hacienda-contentieux`

### Mission

Assister les avocats dans les dossiers contentieux français : analyse des moyens, chronologie, pièces, conclusions, assignation, mise en demeure, stratégie et jurisprudence.

### Sources Prioritaires

- Code de procédure civile.
- Code de justice administrative pour le contentieux administratif.
- Textes de fond selon la matière.
- Jurisprudence officielle.
- Sources éditoriales via `hacienda-recherche-documentaire`.

### Skills

```text
entretien-demarrage
ouverture-dossier
chronologie
matrice-pieces
analyse-moyens
cartographie-jurisprudence
rediger-mise-en-demeure
rediger-assignation
rediger-conclusions
memo-risque-contentieux
strategie-transactionnelle
```

### Agents

```text
suivi-delais-contentieux
veilleur-jurisprudence-dossier
suivi-dossier
controleur-pieces
```

### Livrables

- chronologie ;
- tableau pièces / faits / preuve ;
- note de stratégie ;
- projet de conclusions ;
- projet d'assignation ;
- cartographie de jurisprudence.

### Critère Qualité

Le plugin doit séparer faits, preuves, règles de droit, arguments, risques adverses et demandes.

## `hacienda-contrats`

### Mission

Revue et rédaction de contrats commerciaux français : CGV, CGU, SaaS, NDA, distribution, prestations, baux commerciaux, clauses sensibles.

### Sources Prioritaires

- Code civil.
- Code de commerce.
- Code de la consommation si B2C.
- Jurisprudence commerciale.
- Sources éditoriales en complément.

### Skills

```text
entretien-demarrage
reviser-contrat
reviser-nda
reviser-saas
reviser-cgv-cgu
analyser-distribution
analyser-rupture-brutale
reviser-bail-commercial
proposer-redlines
resume-operationnel
```

### Agents

```text
veilleur-renouvellements
controleur-derogations-playbook
proposeur-mise-a-jour-playbook
```

### Livrables

- mémo de revue contractuelle ;
- redlines proposées ;
- tableau des écarts au playbook ;
- résumé pour opérationnels ;
- clause alternative prête à insérer.

### Critère Qualité

Chaque risque contractuel doit contenir clause concernée, risque juridique, risque commercial, proposition de correction et position de repli.

## `hacienda-societes`

### Mission

Assister les opérations de droit des sociétés, gouvernance, M&A et vie sociale.

### Sources Prioritaires

- Code de commerce.
- Code civil.
- Textes JORF/LODA.
- Jurisprudence commerciale.
- Sources éditoriales en complément.

### Skills

```text
entretien-demarrage
audit-societes
reviser-pacte-associes
reviser-cession-titres
preparer-assemblee
rediger-proces-verbal
checklist-closing
calendrier-vie-sociale
tableau-garanties
```

### Agents

```text
suivi-obligations-societes
suivi-closing
veilleur-dataroom
```

### Livrables

- checklist closing ;
- note de gouvernance ;
- tableau de due diligence ;
- projet de PV ;
- tableau des conditions suspensives ;
- note de risque pacte ou cession.

### Critère Qualité

Le plugin doit distinguer les obligations légales, les obligations statutaires, les stipulations contractuelles et les usages de place.

## `hacienda-donnees-personnelles`

### Mission

Traiter RGPD, CNIL, contrats de traitement, AIPD, droits des personnes, cookies et violations de données.

### Sources Prioritaires

- RGPD.
- Loi Informatique et Libertés.
- CNIL.
- CEPD.
- Légifrance pour textes français.

### Skills

```text
entretien-demarrage
reviser-dpa
generer-aipd
registre-traitements
reponse-droits-personnes
conformite-cookies
reponse-violation-donnees
analyse-transferts
```

### Agents

```text
veilleur-cnil
suivi-demandes-droits
controleur-politique-confidentialite
```

### Livrables

- AIPD ;
- registre de traitement ;
- mémo DPA ;
- plan de réponse violation ;
- analyse cookies ;
- note transfert hors UE.

### Critère Qualité

Toute analyse doit préciser les rôles des parties : responsable de traitement, sous-traitant, responsable conjoint ou destinataire.

## `hacienda-produit-consommation`

### Mission

Revue juridique de lancement produit, marketing, parcours utilisateur, droit de la consommation, plateformes et pratiques commerciales.

### Sources Prioritaires

- Code de la consommation.
- Code civil.
- RGPD et CNIL si données personnelles.
- DSA/DMA lorsque pertinent.
- Jurisprudence et lignes directrices d'autorités.

### Skills

```text
entretien-demarrage
revue-lancement-produit
controle-allegations-marketing
analyse-droit-consommation
analyse-dark-patterns
reviser-conditions-service
analyse-risque-fonctionnalite
```

### Agents

```text
suivi-lancements
veilleur-allegations
controleur-conditions-service
```

### Livrables

- fiche de lancement ;
- matrice risques produit ;
- revue claims marketing ;
- note conformité consommation ;
- résumé décisionnel produit.

### Critère Qualité

Le plugin doit différencier B2B, B2C, marketplace, plateforme et service réglementé.

## `hacienda-reglementaire`

### Mission

Veille réglementaire française et européenne : JORF, LODA, autorités sectorielles, changements de textes, écarts entre politiques internes et droit applicable.

### Sources Prioritaires

- JORF.
- LODA.
- Codes.
- Autorités sectorielles selon configuration.
- Sources éditoriales en complément.

### Skills

```text
entretien-demarrage
veille-jorf
veille-reglementaire
comparer-politique
detecter-ecarts
suivi-delais-commentaires
digest-hebdomadaire
```

### Agents

```text
veilleur-jorf
veilleur-ecarts-politiques
digest-reglementaire
```

### Livrables

- digest réglementaire ;
- tableau des changements ;
- analyse d'écart ;
- calendrier d'entrée en vigueur ;
- note d'impact.

### Critère Qualité

Chaque élément de veille doit indiquer entrée en vigueur, texte source, impact possible et action recommandée.

## `hacienda-gouvernance-ia`

### Mission

Gouvernance IA : AI Act, RGPD, usages internes, contrats fournisseurs IA, politiques internes, analyse des risques.

### Sources Prioritaires

- AI Act.
- RGPD.
- CNIL.
- CEPD.
- Textes français de transposition ou d'application.
- Contrats et politiques internes fournis par l'utilisateur.

### Skills

```text
entretien-demarrage
triage-cas-usage-ia
analyse-impact-ia
reviser-contrat-ia
rediger-politique-ia
analyse-donnees-entrainement
analyse-ecart-reglementaire-ia
```

### Agents

```text
veilleur-reglementation-ia
suivi-registre-cas-usage
controleur-conditions-fournisseurs-ia
```

### Livrables

- registre cas d'usage ;
- analyse d'impact IA ;
- note AI Act ;
- politique interne IA ;
- revue fournisseur IA.

### Critère Qualité

Chaque cas d'usage doit être classé par finalité, données utilisées, utilisateurs affectés, niveau de risque et obligations associées.

## `hacienda-propriete-intellectuelle`

### Mission

Propriété intellectuelle française : droit d'auteur, logiciel, marques, open source, clauses PI, contrefaçon, titularité.

### Sources Prioritaires

- Code de la propriété intellectuelle.
- Jurisprudence.
- INPI lorsque l'intégration sera disponible.
- Sources éditoriales en complément.

### Skills

```text
entretien-demarrage
reviser-clause-pi
analyse-droit-auteur
analyse-logiciel
conformite-open-source
recherche-marque
triage-contrefacon
rediger-mise-en-demeure-pi
```

### Agents

```text
veilleur-portefeuille-pi
controleur-open-source
veilleur-marques
```

### Livrables

- note PI ;
- revue clause ;
- matrice open source ;
- première analyse marque ;
- projet de mise en demeure.

### Critère Qualité

Le plugin doit distinguer titularité, cession, licence, garantie, contrefaçon et preuve d'antériorité.

## `hacienda-droit-public`

### Mission

Droit public français : commande publique, urbanisme, collectivités, fonction publique, contentieux administratif.

### Sources Prioritaires

- Code de la commande publique.
- Code général des collectivités territoriales.
- Code de l'urbanisme.
- Code de justice administrative.
- Jurisprudence administrative.

### Skills

```text
entretien-demarrage
reviser-marche-public
memo-commande-publique
analyse-urbanisme
contentieux-administratif
conseil-collectivite
cartographie-jurisprudence-ce
```

### Agents

```text
veilleur-droit-public
suivi-delais-administratifs
veilleur-jurisprudence-administrative
```

### Livrables

- note droit public ;
- analyse marché public ;
- note urbanisme ;
- mémoire contentieux administratif ;
- calendrier de procédure.

### Critère Qualité

Toute analyse contentieuse doit préciser juridiction, délai, décision attaquée, intérêt à agir et office du juge.

## `hacienda-permanences-juridiques`

### Mission

Assister des permanences juridiques, cliniques professionnelles ou dispositifs pro bono supervisés.

### Sources Prioritaires

- Sources officielles selon matière.
- Documents fournis par l'utilisateur.
- Référent professionnel indiqué dans le profil.

### Skills

```text
entretien-demarrage
accueil-client
qualification-probleme
lettre-langage-clair
controle-eligibilite
statut-dossier
controle-delais
memo-handoff
```

### Agents

```text
suivi-delais-dossier
suivi-handoff
controleur-informations-manquantes
```

### Livrables

- fiche d'accueil ;
- note de qualification ;
- lettre claire ;
- mémo de transmission ;
- checklist de pièces.

### Critère Qualité

Le plugin doit rester sous supervision professionnelle et signaler les cas où une orientation vers un avocat ou une structure compétente est nécessaire.

## `hacienda-hub-confiance`

### Mission

Permettre l'installation, l'évaluation, la désactivation et la mise à jour de skills ou plugins tiers avec une couche de confiance adaptée aux environnements juridiques.

### Skills

```text
entretien-demarrage
naviguer-registre
installer-skill
evaluer-skill
mise-a-jour-automatique
desactiver-skill
desinstaller-skill
controle-connecteurs
controle-licence
controle-injection
```

### Agents

```text
synchroniseur-registres
veilleur-mises-a-jour
controleur-confiance
```

### Critère Qualité

Le hub est restrictif par défaut. Toute source, licence ou connecteur non allowlisté est refusé ou soumis à validation explicite selon le mode configuré.

## Ordre De Construction

1. `hacienda-sources-officielles`
2. `hacienda-fiscal`
3. `hacienda-recherche-documentaire`
4. `hacienda-social`
5. `hacienda-contentieux`
6. `hacienda-contrats`
7. `hacienda-societes`
8. `hacienda-donnees-personnelles`
9. `hacienda-reglementaire`
10. `hacienda-produit-consommation`
11. `hacienda-gouvernance-ia`
12. `hacienda-propriete-intellectuelle`
13. `hacienda-droit-public`
14. `hacienda-permanences-juridiques`
15. `hacienda-hub-confiance`

## Critères D'Acceptation

- Chaque plugin a un nom français.
- Chaque plugin a un périmètre clair et non redondant.
- Chaque plugin dépend conceptuellement de `hacienda-sources-officielles`.
- Les plugins n'utilisent pas de noms de personnages.
- Les commandes et skills sont en français.
- Les livrables sont adaptés à la pratique française.
- Les plugins ne créent pas de conclusion juridique non vérifiée par source officielle.
