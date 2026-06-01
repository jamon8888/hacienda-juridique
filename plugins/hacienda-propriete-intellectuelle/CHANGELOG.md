# Changelog — hacienda-propriete-intellectuelle

Note : ce changelog resume les versions documentees du plugin. Certaines
versions intermediaires ont pu etre consolidees dans des jalons plus larges.

## 0.19.0 — 2026-05-31

### Vague A — Sécurité juridique (alignement DA)

- **Nouveau skill `check-pii`** porté depuis `hacienda-droit-affaires`, calibré
  sur catégories sensibles PI : IBAN ayant droits, NIR créateur, montants
  cession > 10k€, brevets pré-publication FR/EP/PCT (Art. R.612-39 CPI),
  inventeurs non publiés, secret industriel / savoir-faire. Détection
  embarquée locale (regex/heuristiques), aucune dépendance MCP externe.
- **Pattern lead magnet inversé `hacienda-ghost`** conservé : footer cas A
  discret (sous seuil B) + prompt cas B bloquant (≥ seuil B ou catégorie
  sensible) avec CTA `marketplace://hacienda-ghost`. Avertissement spécifique
  brevets non publiés ajouté au prompt B (L.611-11 CPI nouveauté).
- **Bloc `politique_pii`** ajouté à `CLAUDE.md` §1 PI : 3 modes
  (passive / active / strict) + seuil B 50 identifiants + tableau de
  catégories sensibles spécifique PI + calibrage explicite vs droit des
  affaires.
- **Pré-flight `check-pii`** ajouté aux 11 skills client-facing entre `Intake`
  et `Gate non-juriste` : `audit-pi-ma`, `contrats-pi`, `revue-clause-pi`,
  `cession-droit-auteur`, `licence-droit-auteur`, `contrefacon-droit-auteur`,
  `contrefacon-dessin-modele`, `contentieux-pi`, `mise-en-demeure-pi`,
  `saisie-contrefacon`, `tableau-contrefacon-brevet`.
- **Échelle canonique 🔴🟠🟡🟢** explicitée dans le corps de 33 SKILL.md
  supplémentaires sous la section `## Niveaux de criticité`, contextualisée
  par domaine (marques, brevets, D&M, droit d'auteur, logiciel/OSS,
  contentieux, transverse). Couverture finale : 36/38 SKILL.md
  (exclusions par design : `check-pii` méta-skill JSON, `clearance-marque`
  stub redirect). Plancher de sévérité cross-skill (CLAUDE.md §4) désormais
  opposable.
- **Tests reproductibles** : nouveau dossier `tests/datasets/` avec deux
  cas — `pii-cas-a` (sous seuil B, footer A attendu) et `pii-cas-b`
  (catégories sensibles PI multiples — IBAN cédant, NIR créateur, brevets
  pré-publication, secret industriel, NDA — prompt B attendu avec
  avertissement spécifique brevets non publiés).

## 0.18.14 — 2026-05-21

### Distribution et parite interne
- metadonnees de distribution alignees sur une structure plugin explicite tout
  en conservant le branding Hacienda ;
- versions visibles unifiees sur `0.18.14` entre manifest plugin,
  `version.json`, package MCP et lockfile ;
- ajout du repertoire `logs/`, d'un `.gitignore` de package et de tests de
  distribution PI ;
- version explicite et `argument-hint` presents sur tous les skills PI ;
- table README exhaustive des commandes de skills, workspaces de dossier
  operationnels et cookbooks d'agents managés.

### Alignement agents
- agents PI alignes sur les skills V2 et leurs gates ;
- stubs agents remplaces par des agents avec frontmatter/tools ;
- `bopi-watcher` raccorde a `Monitoring Gate`, `surveillance-marque`,
  `analyse-opposition-marque` et `revue-portefeuille-marques` ;
- `contrefacon-web` raccorde a la lane enforcement V2 ;
- ajout d'une grille d'audit agents reutilisable.

## 0.18.13 — 2026-05-21

### Alignement documentaire
- `contrats-pi` est harmonise explicitement en V2, avec `version: "2.0.0"`
  visible, reference de travail compacte, chargement de profil pratique
  explicite et garde-fous de brouillon V2 aligns sur les autres skills
  contractuels du plugin
- `revue-clause-pi` migre vers un contrat V2 strict de revue ciblee des
  clauses PI dans les contrats larges
- ajout d'un contrat d'entree ferme autour de `mode`, `contract_posture`,
  `ip_clause_focus`, `our_role`, `negotiation_posture` et
  `source_completeness`
- ajout d'un `Clause Review Readiness Gate` explicite (`ready`, `partial`,
  `blocked`) pour borner l'exploitabilite du brouillon selon le texte
  effectivement lu, la posture contractuelle, le focus PI et la couverture
  source
- sortie V2 stabilisee en 9 blocs, avec `Mode-Specific Deliverable` borne
  pour `review`, `fallback-redline` et `issue-list`, et `Decision Routing`
  ferme vers contrat PI complet, licence auteur, cession auteur, OSS,
  chaine logiciel / data, base de donnees ou contentieux
- ajout du memo compact
  `skills/revue-clause-pi/references/revue-clause-pi-routing-and-output.md`
- `README.md` realigne pour retirer `revue-clause-pi` de la table legacy et
  l'afficher dans la liste principale des skills V2

## 0.18.12 — 2026-05-21

### Alignement documentaire
- `droits-voisins-ogc` migre vers un contrat V2 strict de readiness droits
  voisins + OGC, recentre sur les artistes-interpretes, producteurs de
  phonogrammes, producteurs de videogrammes, entreprises de communication
  audiovisuelle et editeurs de presse quand reellement pertinents
- ajout d'un contrat d'entree ferme autour de `primary_track`,
  `management_posture`, `rights_chain_status`, `exploitation_mode`,
  `emerging_signal` et `territory_scope`
- ajout d'un `Neighboring Rights Readiness Gate` explicite (`ready`,
  `partial`, `blocked`) pour borner l'exploitabilite du brouillon selon
  l'identification du titulaire, de l'acte d'exploitation, de la chaine de
  droits, de la posture OGC et de la base source consultee et datee
- logique centrale reconstruite autour du titulaire voisins, de la carte
  exploitation / consentement, de la duree apparente, de la remuneration
  equitable et de la gestion collective, avec maintien obligatoire de
  `[PROVISOIRE]`, `[à vérifier]` et `[A COMPLETER]` en sortie partielle
- `gen-ai-signal` et `nft-signal` maintenus comme branches secondaires
  strictement bornees, avec reroutage si le sujet principal devient IA,
  contractuel ou contentieux
- sortie V2 stabilisee en 9 blocs, avec `Decision Routing` ferme entre
  `proceed-with-neighboring-rights-brief`, `clarify-title-chain`,
  `clarify-exploitation-scope`,
  `review-ogc-membership-and-remuneration`,
  `route-to-work-qualification`, `route-to-copyright-license`,
  `route-to-copyright-assignment`,
  `route-to-copyright-infringement`, `route-to-pi-litigation` et
  `hold-insufficient-basis`
- ajout du memo compact
  `skills/droits-voisins-ogc/references/droits-voisins-ogc-routing-and-output.md`
  pour le role, le gate, la logique centrale, la matrice de risque et le
  routing ferme
- frontieres explicites avec `qualification-oeuvre`,
  `licence-droit-auteur`, `cession-droit-auteur`,
  `contrefacon-droit-auteur`, `contentieux-pi` et `contrats-pi`

## 0.18.11 — 2026-05-20

### Alignement documentaire
- `certificat-complementaire-protection` migre vers un contrat V2 strict de
  readiness CCP, centre sur `eligibility` et `apply`, avec `check` borne comme
  verification secondaire
- ajout d'un `CCP Readiness Gate` explicite (`ready`, `partial`, `blocked`)
  pour borner l'exploitabilite du brouillon selon le brevet de base, la
  posture autorisation / premiere AMM UE, le match revendications / produit,
  la duplication CCP apparente, la duree et la fenetre de depot
- contrat d'entree ferme autour de `mode`, `product_track`,
  `base_patent_status`, `authorization_posture`, `claim_match_posture`,
  `pediatric_extension_status` et `waiver_posture`
- logique centrale reconstruite autour de l'article 3, du calcul de duree, de
  la fenetre de depot article 7 et de l'extension pediatrique, avec
  marqueurs `[PROVISOIRE]`, `[à vérifier]`, `[A COMPLETER]` obligatoires en
  sortie partielle
- signal `manufacturing-waiver-signal` borne mais complete par les
  notifications / formalites a verifier et la pression apparente d'entree
  generique ou de stockage
- sortie V2 stabilisee en 9 blocs, avec `Decision Routing` ferme entre
  `prepare-ccp-application`, `prepare-ccp-application-with-caution`,
  `hold-for-claim-scope-review`, `hold-for-first-amm-review`,
  `hold-for-duplicate-ccp-review`, `signal-manufacturing-waiver-posture`,
  `route-to-patent-invalidity-review`, `route-to-patent-portfolio-review` et
  `hold-insufficient-basis`
- ajout d'un memo compact `certificat-complementaire-protection-routing-and-output`
  avec resume du role, gate, logique centrale, routing ferme et matrice de
  risque
- frontieres explicites avec `analyse-refus-inpi`,
  `anteriorite-invalidite`, `revue-portefeuille-brevets`,
  `recherche-anteriorite-brevet` et `preparation-depot-brevet`

## 0.18.10 — 2026-05-20

### Alignement documentaire
- `recherche-anteriorite-dm` est documente en V2 comme skill strict de
  premier passage disponibilite D&M, distinct de la preparation de depot, de
  la contrefacon et d'une clearance juridique finale
- ajout d'un `Prior Art Readiness Gate` explicite (`ready`, `partial`,
  `blocked`) pour borner l'exploitabilite du brouillon selon
  l'identifiabilite du design, la date pivot, la consultation du minimum
  registres et la qualite de la preuve
- contrat d'entree ferme autour de `research_mode`, `territory_scope`,
  `design_visibility_status`, `locarno_status`,
  `search_coverage_target` et `evidence_posture`
- couverture source reconstruite autour de `registers-minimum`,
  `registers-plus-open-web` et `enhanced-sector-scan`, avec limites
  residuelles de divulgation hors registre explicites
- sortie V2 stabilisee en 9 blocs, avec findings centres sur source, date,
  classe, proximite visuelle, risque nouveaute, risque caractere individuel
  et liberte du createur
- `Decision Routing` ferme entre `prepare-filing`,
  `prepare-filing-with-caution`, `hold-for-design-adjustment`,
  `hold-for-expanded-search`, `signal-reverse-nullity-posture`,
  `route-to-design-infringement-analysis` et `hold-insufficient-basis`
- branche `reverse-nullity-signal` maintenue comme issue secondaire bornee,
  limitee au signal d'art anterieur destructeur plausible, a la preuve a
  securiser et au reroutage vers `contrefacon-dessin-modele`
- frontieres explicites avec `depot-dessin-modele` et
  `contrefacon-dessin-modele`

## 0.18.9 — 2026-05-20

### Alignement documentaire
- `depot-dessin-modele` migre vers un contrat V2 strict de preparation au
  depot de dessin ou modele enregistre
- ajout d'un `Filing Readiness Gate` explicite (`ready`, `partial`,
  `blocked`) pour borner l'exploitabilite du brouillon selon la qualite des
  visuels, de la classification, de la priorite et de l'identification des
  parties
- lanes fermees `fr`, `eu`, `hague`, `sequenced`, avec maintien d'un signal
  `DMCNE` strictement borne et secondaire
- sortie V2 stabilisee en 9 blocs, centree sur la lane, les reproductions, la
  priorite, la publication et la mecanique de depot
- `Decision Routing` ferme entre `prepare-fr-filing`,
  `prepare-eu-filing`, `prepare-hague-filing`,
  `prepare-sequenced-filing`, `hold-for-prior-art-review`,
  `hold-for-visual-cleanup`, `signal-unregistered-eu-design-posture` et
  `hold-insufficient-basis`
- frontieres explicites avec `recherche-anteriorite-dm` et
  `contrefacon-dessin-modele`

## 0.18.8 — 2026-05-19

### Alignement documentaire
- `cession-droit-auteur` est documente en V2 comme skill strict de
  preparation d'une cession de droits patrimoniaux d'auteur
- ajout d'un `Assignment Readiness Gate` explicite (`ready`, `partial`,
  `blocked`) pour borner l'exploitabilite du dossier selon la qualite de la
  qualification, de la chaine de titre, du contexte de creation et de la
  structure economique
- sortie V2 stabilisee en 9 blocs, centree sur les preconditions oeuvre /
  titre, le track retenu, la structure de droits, l'economie, la cleanup
  bornee et le routage ferme
- `Decision Routing` ferme entre `prepare-full-assignment-draft`,
  `prepare-partial-assignment-draft`,
  `prepare-exclusive-assignment-draft`,
  `prepare-non-exclusive-assignment-draft`,
  `route-to-work-qualification`,
  `route-to-license-instead`,
  `route-to-title-chain-cleanup`,
  `route-to-software-regime-review`,
  `route-to-broader-pi-contract` et `hold-insufficient-basis`
- frontieres explicites avec `qualification-oeuvre`,
  `licence-droit-auteur`, `logiciels-pi` et `contrats-pi`

## 0.18.7 — 2026-05-19

### Alignement documentaire
- `licence-droit-auteur` est documente en V2 comme skill de preparation
  stricte d'une licence de droits d'auteur
- ajout d'un `License Readiness Gate` explicite (`ready`, `partial`,
  `blocked`) pour borner l'exploitabilite du brouillon selon la qualification
  de l'oeuvre, la titularite, la structure de la demande et le risque de
  glissement vers une cession
- lanes fermees `exclusive`, `non-exclusive`, `creative-commons`,
  `software-eula`, `saas-user-content`, avec maintien borne de
  `creative-commons` comme politique de diffusion ouverte standardisee
- sortie V2 stabilisee en 9 blocs, centree sur les preconditions oeuvre /
  titre, la lane retenue, la structure economique, les clauses critiques, les
  risques de requalification et le routage de decision
- `Decision Routing` ferme entre `prepare-exclusive-license-draft`,
  `prepare-non-exclusive-license-draft`,
  `prepare-creative-commons-release`, `prepare-software-eula-draft`,
  `prepare-saas-user-content-license`, `route-to-work-qualification`,
  `route-to-assignment`, `route-to-software-regime-review`,
  `route-to-database-regime-review`, `route-to-broader-pi-contract`,
  `hold-for-rgpd-review` et `hold-insufficient-basis`
- frontieres explicites avec `qualification-oeuvre`, `cession-droit-auteur`,
  `logiciels-pi`, `bases-de-donnees`, `contrats-pi` et le plugin donnees
  personnelles

## 0.18.6 — 2026-05-19

### Alignement documentaire
- `bases-de-donnees` est documente en V2 comme skill de qualification stricte
  des regimes de protection des bases de donnees
- ajout d'un `Database Protection Readiness Gate` explicite (`ready`,
  `partial`, `blocked`) pour borner l'exploitabilite du dossier selon la
  structure, l'investissement, la posture d'acces et le signal RGPD
- sortie V2 stabilisee en 9 blocs, centree sur la structure auteur, le droit
  sui generis, le producteur / titulaire, l'acces / reutilisation, le signal
  RGPD et la posture contractuelle secondaire
- `Decision Routing` ferme entre `route-to-copyright-structure-review`,
  `route-to-investment-documentation`, `prepare-proprietary-license`,
  `prepare-open-data-release`, `prepare-api-access-license`,
  `prepare-scraping-enforcement-brief`, `hold-for-rgpd-review` et
  `hold-insufficient-basis`
- la posture contractuelle reste secondaire et ne remplace ni une licence
  detaillee ni un audit privacy complet
- frontieres explicites avec `qualification-oeuvre`, `logiciels-pi`,
  `contrefacon-droit-auteur`, `licence-droit-auteur`, le plugin donnees
  personnelles et `contentieux-pi`

## 0.18.5 — 2026-05-19

### Alignement documentaire
- `contrefacon-dessin-modele` est documente en V2 comme skill d'analyse D&M
  stricte, distinct du depot, de la saisie, de la lettre et du contentieux
  global
- ajout d'un `Design Infringement Readiness Gate` explicite (`ready`,
  `partial`, `blocked`) pour borner l'exploitabilite du dossier selon le
  titre, la comparaison, les actes argués et la preuve
- sortie V2 stabilisee en 9 blocs, centree sur le titre, l'impression
  globale, les actes, la preuve, l'exposition aux defenses et la branche
  secondaire fallback
- `Decision Routing` ferme entre `route-to-prior-art-review`,
  `route-to-title-regularization`, `prepare-cease-and-desist`,
  `prepare-seizure-brief`, `prepare-litigation-brief`,
  `prepare-fallback-unfair-competition` et `hold-insufficient-basis`
- branche concurrence deloyale / parasitisme maintenue comme issue
  secondaire bornee, sans remplacer l'analyse D&M
- frontieres explicites avec `recherche-anteriorite-dm`,
  `depot-dessin-modele`, `mise-en-demeure-pi`, `saisie-contrefacon` et
  `contentieux-pi`

## 0.18.4 — 2026-05-19

### Alignement documentaire
- `contrefacon-droit-auteur` est documente en V2 comme skill d'analyse au
  fond stricte de la contrefacon auteur
- ajout d'un `Copyright Infringement Readiness Gate` explicite (`ready`,
  `partial`, `blocked`) pour borner l'exploitabilite du dossier selon
  l'originalite mobilisable, la titularite, la comparaison et la preuve
- sortie V2 stabilisee en 9 blocs, centree sur l'originalite, la
  comparabilite, les atteintes patrimoniales et morales, la preuve,
  l'exposition aux defenses et la posture plateforme
- `Decision Routing` ferme entre `route-to-proof-hardening`,
  `route-to-originality-review`, `prepare-cease-and-desist`,
  `prepare-platform-notice`, `prepare-seizure-brief`,
  `prepare-litigation-brief`, `route-to-database-analysis` et
  `hold-insufficient-basis`
- branche plateforme / LCEN maintenue comme issue secondaire bornee, sans
  remplacer l'analyse au fond du dossier
- frontieres explicites avec `qualification-oeuvre`,
  `depot-preuve-creation`, `mise-en-demeure-pi`, `saisie-contrefacon`,
  `contentieux-pi` et `bases-de-donnees`

## 0.18.3 — 2026-05-19

### Alignement documentaire
- `saisie-contrefacon` est documente en V2 comme skill multi-droits de
  preparation stricte de mesure probatoire
- ajout d'un `Seizure Readiness Gate` explicite (`ready`, `partial`,
  `blocked`) pour borner l'exploitabilite de la mesure selon le titre, la
  preuve, la localisation et la proportionnalite
- sortie V2 stabilisee en 9 blocs, centree sur la requete, le perimetre de
  saisie, les contraintes d'execution, le secret des affaires et le routage
  post-saisie
- `Decision Routing` ferme entre `prepare-filing-pack`,
  `prepare-execution-pack`, `prepare-post-seizure-assignment`,
  `prepare-evidence-hardening`,
  `route-to-substantive-infringement-review` et
  `hold-insufficient-basis`
- frontieres explicites avec `tri-contrefacon`, `mise-en-demeure-pi`,
  `contentieux-pi`, `tableau-contrefacon-brevet`,
  `contrefacon-droit-auteur` et `contrefacon-dessin-modele`

## 0.18.2 — 2026-05-19

### Alignement documentaire
- `revue-portefeuille-marques` est documente en V2 comme hub portefeuille,
  centre sur `report` et `audit`, et non plus comme skill CRUD + audit a
  parts egales
- ajout d'un `Portfolio Readiness Gate` explicite (`ready`, `partial`,
  `blocked`) pour borner l'exploitabilite des rapports et audits selon la
  qualite du registre interne
- sortie `report` stabilisee en 9 blocs, avec priorisation renouvellements,
  couverture owner / mandataire, signaux watchlist et `Decision Routing`
  ferme
- `audit` recentre sur la sante portefeuille, les findings critiques, leur
  severite et les regularisations attendues
- maintien du dashboard HTML via `renderDashboard` de `@hacienda/core`,
  sans template parallele
- modes `add`, `update`, `remove`, `list` conserves mais explicitement
  relegues au rang de maintenance secondaire du registre

## 0.18.1 — 2026-05-19

### Alignement documentaire
- `revue-portefeuille-brevets` est documente en V2 comme hub portefeuille,
  centre sur `report` et `audit`, et non plus comme skill CRUD + audit a
  parts egales
- ajout d'un `Portfolio Readiness Gate` explicite (`ready`, `partial`,
  `blocked`) pour borner l'exploitabilite des rapports et audits selon la
  qualite du registre interne
- sortie `report` stabilisee en 9 blocs, avec priorisation annuites,
  expirations, couverture owner / mandataire, signaux cross-registry et
  `Decision Routing` ferme
- `audit` recentre sur la sante portefeuille, les findings critiques, leur
  severite et les regularisations attendues
- maintien du dashboard HTML via `renderDashboard` de `@hacienda/core`,
  sans template parallele
- modes `add`, `update`, `remove`, `list` conserves mais explicitement
  relegues au rang de maintenance secondaire du registre

## 0.18.0 — 2026-05-19

### Alignement documentaire
- `strategie-extension-internationale` est documente en V2 comme skill
  territorial et de sequencement d'un brevet FR initial, avec contrat
  d'entree ferme, `Extension Readiness Gate` et routage final ferme
- ajout d'une sortie stabilisee en 9 blocs pour le skill, centree sur le
  perimetre territorial, la priorite, le budget et la maintenance annuitaire
- ajout d'un jeu ferme de routes :
  `stay-fr-only`, `prepare-ep-route`, `prepare-pct-route`,
  `prepare-sequenced-route`, `hold-for-market-clarification`,
  `hold-for-budget-clarification`, `hold-priority-risk`
- ajout du memo de reference
  `skills/strategie-extension-internationale/references/strategie-extension-internationale-routing-and-output.md`
- `strategie-extension-internationale` reste distinct de
  `preparation-depot-brevet`, `analyse-refus-inpi`, `anteriorite-invalidite`
  et `tableau-contrefacon-brevet`, sans devenir un orchestrateur de
  portefeuille

## 0.17.1 — 2026-05-19

### Alignement documentaire
- `analyse-refus-inpi` est documente en V2 comme skill bi-office `INPI` /
  `OEB` de reponse a notification, centre sur l'analyse argumentaire et non
  sur la reponse officielle deposee
- ajout d'un `Response Readiness Gate` explicite (`ready`, `partial`,
  `blocked`) pour borner l'exploitabilite de la reponse selon la notification,
  le delai, les revendications et les citations disponibles
- frontiere explicite avec `recherche-anteriorite-brevet`,
  `preparation-depot-brevet`, `strategie-extension-internationale` et
  `anteriorite-invalidite`
- positionnement de la sortie V2 autour d'une cartographie objections /
  citations, d'une faisabilite d'amendement, d'une strategie argumentative et
  d'un `Decision Routing` ferme

## 0.17.0 — 2026-05-18

### Packaging du plugin
- Ajout de `version.json` comme source de vérité de version du plugin PI
- Version unifiée entre `.claude-plugin/plugin.json`, `version.json`, `mcp-server/package.json` et runtime MCP
- `.mcp.json` converti en déclaration `stdio` exécutable pour le serveur MCP PI local

### Structure MCP
- Le serveur `hacienda-propriete-intellectuelle` déclare explicitement ses groupes de tools utiles à la PI
- Le toolset PI garde les recherches juridiques utiles (Legifrance, Judilibre, EUR-Lex) et les registres PI (INPI, EUIPO, BOPI, OEB)
- Les tools hors périmètre PI direct (`bofip_*`, `boss_*`, `legifrance_api_call`, `piste_cache_clear`) restent réservés au serveur sources officielles

### Alignement documentaire
- README PI et documentation d'intégration réalignés avec le runtime réellement livré
- Nettoyage des références résiduelles de benchmark externe dans les fichiers livrés du plugin
- `audit-pi-ma` passe d'un rapport monolithique a un orchestrateur M&A PI
  structure avec routing, findings normalises et sorties `buyer-dd`,
  `seller-clean-room`, `red-flag` et `deal-summary`
- `contrats-pi` passe d'un flux lineaire a une structure par familles
  (`patent-tech-transfer`, `nda-secret-knowhow`, `rnd-collaboration`,
  `trademark-coexistence-franchise`, `mta-life-sciences`)
- frontiere explicite entre `contrats-pi` (contrats PI complets) et
  `revue-clause-pi` (clauses PI dans contrats larges)
- contrat d'entree et blocs de sortie normalises pour `draft` et `review`
- `contentieux-pi` passe d'un flux mixte a un scope judiciaire strict
- introduction de `contentious_track` et `procedure_stage`
- frontiere explicite avec `strategie-defense-pi`, `tri-contrefacon`,
  `mise-en-demeure-pi` et `depot-preuve-creation`
- contrat de sortie stabilise en 8 blocs, avec `Decision Memo` borne a un jeu
  ferme d'issues
- `recherche-anteriorite-marque` passe a un premier passage strict de
  recherche de marque, distinct d'une clearance juridique finale
- frontiere explicite avec la clearance professionnelle, `depot-marque-fr`,
  `surveillance-marque` et `analyse-opposition-marque`
- cadrage explicite des motifs absolus, de la couverture de recherche et du
  balayage de famille adjacente dans le workflow marques
- `depot-marque-fr` est documente en V2 comme skill strict de preparation au
  depot, distinct du premier passage de recherche, de l'opposition et de la
  surveillance
- structuration explicite des lanes FR / EU / Madrid avec readiness gate avant
  toute recommandation de depot effectif
- `surveillance-marque` est documente en V2 comme skill strict de monitoring
  et de priorisation, distinct du premier passage de recherche, de la
  substance de l'opposition et de l'enforcement
- clarification des modes de surveillance et ajout d'un monitoring gate avant
  toute recommandation d'escalade
- `recherche-anteriorite-brevet` est documente en V2 comme premier passage
  strict de recherche brevet, distinct de la redaction / preparation de depot,
  de la revue d'invalidite et de la comparaison contrefacon
- ajout d'un search coverage gate pour borner la couverture de recherche avant
  toute recommandation de suite
- `preparation-depot-brevet` est documente en V2 comme skill de preparation
  stricte au depot, distinct du premier passage d'anteriorite, de la revue
  d'invalidite et du claim chart contrefacon
- ajout d'un Filing Readiness Gate et structuration explicite des lanes
  `FR`, `EP`, `PCT` et `sequenced`, avec branche de priorite bornee
- `tableau-contrefacon-brevet` est documente en V2 comme skill offensif strict
  de claim chart brevet, distinct de la defense / invalidite et de la
  qualification juridique finale
- ajout d'un `Chart Readiness Gate` et d'un routage ferme vers
  `mise-en-demeure-pi`, `saisie-contrefacon` ou `contentieux-pi`
- `anteriorite-invalidite` est documente en V2 comme skill de validite stricte
  du brevet adverse, avec modes `attack` / `defense`, distinct du claim chart,
  de la preparation de depot et de la recherche amont
- ajout d'un `Invalidity Readiness Gate` et d'un positionnement ferme vis-a-vis
  de `tableau-contrefacon-brevet`, `recherche-anteriorite-brevet`,
  `preparation-depot-brevet` et `contentieux-pi`
- `analyse-opposition-marque` passe a un skill d'opposition INPI strict,
  borne par un gate procedurale explicite
- cartographie stabilisee des droits invoques, des motifs et de leur
  articulation pour former ou repondre a l'opposition
- branche coexistence / transaction maintenue mais bornee, sans diluer le role
  principal d'analyse contentieuse administrative INPI
- `qualification-oeuvre` passe a une structure V2 avec contrat d'entree
  explicite (`objective_mode`, `work_type`, `creation_context`)
- routage centralise vers `revue-logiciel-donnees`,
  `depot-preuve-creation`, `cession-droit-auteur`,
  `licence-droit-auteur` et `contrefacon-droit-auteur`
- contrat de sortie stabilise en 9 blocs, avec `Next Step Routing` borne a un
  jeu ferme d'issues
- `logiciels-pi` passe a une structure V2 avec contrat d'entree explicite
  (`development_model`, `distribution_model`, `oss_posture`)
- frontieres explicites avec `revue-open-source`,
  `revue-logiciel-donnees`, `cession-droit-auteur`,
  `licence-droit-auteur` et `contrefacon-droit-auteur`
- contrat de sortie stabilise en 9 blocs, avec `Next Step Routing` borne a un
  jeu ferme d'issues

## 0.9.0 — 2026-05-16

### Ajouts — Droit d'auteur Qualification (démarrage bloc V4)
- Skill `qualification-oeuvre` (originalité L.111-1 + CJUE Infopaq, catégories L.112-2, titularité 7 cas, droits patrimoniaux vs moral L.121-1, durée 70 ans post mortem, ~1020 lignes)
- Skill `logiciels-pi` (régime dérogatoire L.113-9 employeur titulaire, droit utilisation L.122-6, exceptions L.122-6-1, typologie licences open source + matrices compatibilité, ~970 lignes)
- Références : `articles-cpi-droit-auteur`, `jurisprudence-originalite`, `regime-logiciel-cpi`, `licences-open-source`
- Section CLAUDE.md template "Droit d'auteur" (8 repères pratiques)
- Section `references/ressources-pi-fr.md` "Droit d'auteur — sources et juridictions"

### Suite sobre
- Les extensions du bloc droit d'auteur sont documentees dans les versions suivantes du changelog.

### Distinction critique avec régime US
- Droit FR : pas de formalité (≠ US Copyright Office), droit moral central perpétuel inaliénable (vs VARA US limité), L.113-9 logiciel = inverse du US work-for-hire général

## 0.8.0 — 2026-05-16

### Ajouts — Extension internationale + Portefeuille brevets (clôt bloc brevets)
- Skill `strategie-extension-internationale` (arbre décisionnel FR/EP/PCT, coûts indicatifs 2026, recommandations par profil cabinet, ~680 lignes)
- Skill `revue-portefeuille-brevets` (6 modes CRUD + audit, dashboard HTML réutilisation V0.5, gestion familles brevets, cross-ref portfolio marques, ~680 lignes)
- Référentiel `portfolio-brevets.yaml` user-stable (familles + annuités + CCP)
- Références : `couts-brevets-2026`, `arbre-decision-extension`, `modele-portfolio-brevets`
- Section CLAUDE.md "Brevets" enrichie (extension + portefeuille)
- Section ressources "Annuités brevets et services tiers"

### Positionnement de la version
- Cette version ajoute l'extension internationale et la revue de portefeuille brevets au socle brevets deja present.

### Réutilisation cross-version
- `revue-portefeuille-brevets` réutilise le standard dashboard HTML introduit plus tot dans le plugin.

## 0.7.0 — 2026-05-16

### Ajouts — Refus INPI + Invalidité brevets (workflow brevets défensif complet)
- Skill `analyse-refus-inpi` (analyse notifications INPI R.612-66 / OEB Règle 132 EPC, classification citations X/Y/A/E, stratégies amendement A/B/C/D, problème-solution OEB, projet de réponse FR/EN, ~840 lignes)
- Skill `anteriorite-invalidite` (argumentation nullité L.613-25, bi-mode `--attack`/`--defense`, recherche art antérieur destructeur, projet écritures TJ Paris, ~1040 lignes)
- Références : `classification-citations-oeb`, `strategies-amendement`, `motifs-nullite-brevet`, `procedure-nullite-tj-paris`
- Section CLAUDE.md template "Brevets" enrichie (postures refus + nullité, délais clés, approbateurs)
- Section `references/ressources-pi-fr.md` "Procédures brevets INPI / OEB / TJ Paris" ajoutée

### Workflow brevets complet (V2.0 + V2.1)
- Recherche antériorité (V2.0) → Préparation dépôt (V2.0) → Réponse refus INPI/OEB (V2.1) → Claim chart contrefaçon (V2.0) → Nullité défensive ou attaque (V2.1) = **boucle fermée**

### Coordination V2.0 + V2.1
- `tableau-contrefacon-brevet --form` (V2.0) prépare l'offensive contrefaçon
- → `anteriorite-invalidite --defense` (V2.1) prépare la défense face à action contrefaçon adverse
- → `analyse-refus-inpi` (V2.1) prépare la réponse aux notifications INPI/OEB durant prosecution

### À venir (V2.1.1 / V2.2)
- Connecteur Google Patents (complément Espacenet)
- `strategie-extension-internationale` (arbre EP/PCT/national)
- `revue-portefeuille-brevets` (réutilise dashboard HTML V1.1.1)

## 0.6.0 — 2026-05-16

### Ajouts — Dépôt + Opposition marques (ferme workflow marques)
- Skill `depot-marque-fr` (préparation dossier FR INPI / EU EUTM / Madrid, libellés P&S conformes directives examen, arbre décisionnel territoire, checklist 10 points, ~660 lignes)
- Skill `analyse-opposition-marque` (analyse motifs L.713-2/L.713-3/L.711-3, calcul délai L.712-4 2 mois post-BOPI, projet de mémoire INPI structuré, bi-mode `--form`/`--respond`, ~810 lignes)
- Références : `structure-depot-inpi.md`, `redaction-libelles-nice.md`, `motifs-opposition-cpi.md`, `procedure-opposition-inpi.md`
- Section CLAUDE.md template "Dépôt et opposition" ajoutée
- Section `references/ressources-pi-fr.md` "Procédures INPI marques" ajoutée

### Workflow marques complet (V1.0 + V1.1.0 + V1.1.1 + V1.1.2)
- Recherche antériorité → Dépôt → Surveillance BOPI quotidienne → Opposition → Portefeuille avec dashboard HTML = **boucle fermée**

### Coordination V1.1.0 + V1.1.2
- `bopi-watcher` (V1.1.0) détecte une marque concurrente publiée au BOPI
- → `analyse-opposition-marque --form` (V1.1.2) prépare l'opposition dans les 2 mois L.712-4
- → mandataire INPI dépose l'opposition formelle via télé-procédure

### À venir (V1.2)
- Agent `contrefacon-web` (monitoring marketplaces / réseaux sociaux / noms domaine)
- Connecteur OMPI Madrid Monitor (international)
- Étude liberté d'exploitation (FTO)

## 0.5.0 — 2026-05-16

### Ajouts — Portefeuille + Dashboard HTML
- Skill `revue-portefeuille-marques` (6 modes CRUD + audit, standard portefeuille PI adapté FR, ~400 lignes)
- Module `@hacienda/core/dashboard/` (renderDashboard + escape XSS-safe + template HTML standalone)
- Premier **dashboard HTML standardisé** : format autonome (zéro CDN), XSS-safe, sortable/filtrable, imprimable A4
- Référentiel `portfolio.yaml` user-stable validé Zod
- Référence `references/dashboard-template.md` (guide d'utilisation pour skills futurs)
- Référence `references/modele-portfolio.md`
- Section CLAUDE.md template "Portefeuille" + "Dashboard offer" activée

### Cible future
- V2.2 `revue-portefeuille-brevets` réutilisera le même `renderDashboard`
- V5.0 `audit-pi-ma` (M&A) utilisera le dashboard pour les findings multi-actifs

### À venir (V1.1.2)
- `depot-marque-fr` (préparation dossier dépôt INPI/EUIPO)
- `analyse-opposition-marque` (argumentation INPI sur opposition reçue)

## 0.4.0 — 2026-05-16

### Ajouts — bloc Brevets (MVP V2.0)
- Skill `recherche-anteriorite-brevet` (standard structuré adapté FR, classifications X/Y/A/E OEB, approche problème-solution OEB, exclusions L.611-10 CPI, ~750 lignes)
- Skill `preparation-depot-brevet` (structure CPI L.611-1, rédaction revendications, choix territoire FR/EP/PCT, ~790 lignes)
- Skill `tableau-contrefacon-brevet` (claim chart Harvey-grade, théorie équivalence L.613-3 + Cour de cass. com. 5 mai 2009, ~1090 lignes)
- Tools MCP : `inpi_search_brevets`, `inpi_brevet_details`, `espacenet_search`, `espacenet_brevet_details`
- Client `InpiBrevetsClient` (réutilise OAuth password grant V1.0)
- Client `EspacenetClient` (OEB OPS, OAuth2 client_credentials, quota 4 Go/sem)
- Référentiels : `classifications-cib.md`, `structure-revendications.md`, `theorie-equivalence.md`, `articles-cpi-brevets.md`
- Section CLAUDE.md template "Brevets" ajoutée

### À venir (V2.1)
- Skill `analyse-refus-inpi` (office action FR + OEB Rule 132 EPC)
- Skill `anteriorite-invalidite` (argumentation nullité pour action contrefaçon)
- Connecteur Google Patents
- Refactor OAuth INPI partagé entre marques et brevets

## 0.3.0 — 2026-05-16

### Ajouts
- Skill `surveillance-marque` (6 modes : --report/--add/--update/--remove/--list/--audit, standard portefeuille PI adapté FR)
- Agent `bopi-watcher` quotidien (escalation immédiate sur 🔴 OPPOSITION URGENTE < 30 j post-BOPI L.712-4)
- Tool MCP `inpi_marques_publications_recentes` (delta API depuis date X, fenêtre max 30 j)
- Référentiel `watchlist.yaml` user-stable validé Zod
- Référentiel `references/modele-watchlist.md`
- Section CLAUDE.md template "Brand protection" enrichie
- Section "Bulletins officiels" dans ressources-pi-fr.md

### À venir (V1.1.1)
- `revue-portefeuille-marques` + premier dashboard HTML standardisé
- `depot-marque-fr` + `analyse-opposition-marque`

## 0.2.0 — 2026-05-15

### Ajouts
- Skill `recherche-anteriorite-marque` (standard structuré PI, ~300 lignes)
- MCP server avec 4 nouveaux tools : `inpi_search_marques`,
  `inpi_marque_details`, `euipo_tmview_search`,
  `bopi_dernieres_publications` (squelette)
- CLAUDE.md template adapté droit FR (secret professionnel art. 66-5,
  appréciation globale CJUE Sabel/Puma)
- `entretien-demarrage` refondu — profil user-stable
  `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`
- Référentiels : `references/ressources-pi-fr.md` + `classifications-nice.md`

### Migration des anciens skills PI
- `depot-preuve-creation` devient la brique probatoire canonique du plugin PI
- `tri-contrefacon` devient l'intake enforcement marques
- `mise-en-demeure-pi` devient le moteur de lettre PI
- `revue-open-source` devient l'audit OSS operationnel
- `revue-logiciel-donnees` est recentre sur la chaine de droits logiciel/data
- `portefeuille-pi` devient un hub federé marques + brevets en lecture seule
- `revue-clause-pi` devient la revue ciblee des clauses PI dans les contrats larges
- `strategie-defense-pi` devient un orchestrateur leger de defense et de routage
- `clearance-marque` reste maintenu pour compatibilite historique et redirige
  vers `recherche-anteriorite-marque`

### Migration structurante des skills legacy
- `tri-contrefacon` et `mise-en-demeure-pi` sont maintenant alignes comme meme
  chantier d'enforcement
- `depot-preuve-creation` alimente les skills preuves, opposition et defense
- `portefeuille-pi` adopte le modele de hub federé en lecture seule
- `clearance-marque` reste volontairement en alias/sunset plutot qu'en faux
  workflow autonome

### À venir (V1.1)
- Agent `bopi-watcher` (parser BOPI hebdomadaire)
- Skill `surveillance-marque`
- Skill `revue-portefeuille-marques` + tableau de bord HTML
- extensions futures au-dessus de ce socle V1
