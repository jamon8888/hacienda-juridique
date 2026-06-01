---
name: revue-open-source
version: "2.0.0"
description: >
  Audit OSS opérationnel à partir d'un inventaire fourni (SBOM, manifests,
  listes de dépendances). Qualifie licences, détecte contamination copyleft
  et conflits, inventorie les obligations de conformité (notice, attribution,
  source, modifications), priorise la remédiation. Brouillon soumis à
  validation humaine.
argument-hint: "[SBOM | liste de dépendances | repository ou manifest | policy interne] [--copyleft-only] [--obligations-only] [--remediation-plan]"
authors: ["Hacienda"]
tags: [open-source, OSS, licences, copyleft, SBOM, compliance, propriete-intellectuelle]
---

# Skill — Revue Open Source

> **BROUILLON, VALIDATION HUMAINE OBLIGATOIRE.**
>
> Ce skill est un **audit OSS opérationnel** réalisé à partir d'un **inventaire
> fourni** (SBOM CycloneDX / SPDX, package.json, requirements.txt, go.mod,
> Gemfile, pom.xml, export SCA). Il ne scanne pas le code source de manière
> autonome, ne remplace pas un outil SCA (Snyk, FOSSA, Black Duck,
> Dependency-Check, Syft) et ne certifie pas l'exhaustivité d'un repository
> sans inventaire structuré.
>
> **Frontière avec les autres skills.**
> - `revue-logiciel-donnees` : chaîne de titularité du code propriétaire,
>   contributions, datasets d'entraînement IA.
> - `audit-pi-ma` : consomme cet audit OSS dans une due diligence M&A globale.
> - `contrats-pi` : clauses OSS dans contrats partenaires, distribution,
>   intégrateurs.
> - `revue-clause-pi` : clauses OSS dans NDA ou accords de partenariat ponctuels.
> - `contentieux-pi` : si litige OSS effectif (mise en demeure SFLC, action
>   Versata, Patrick McHardy / BusyBox style).

---

## Examples

<example>
<user>/h-pi:revue-open-source ./sbom-saas-produit.json --copyleft-only</user>
<response>
Posture cabinet : whitelist permissives seulement (MIT/BSD/Apache), GPL/AGPL
interdites sauf isolation. SBOM CycloneDX produit SaaS avec mélange MIT,
Apache 2.0 et GPL-3.0 détecté.

Mode `--copyleft-only` : focus contamination.

Findings :
- 🔴 Dépendance `lib-x` GPL-3.0 liée statiquement au binaire SaaS exposé :
  contamination du code propriétaire ; refactor ou isolation par binaire
  séparé obligatoire.
- 🔴 Dépendance `lib-y` AGPL-3.0 utilisée côté serveur SaaS : section 13
  AGPL impose la mise à disposition du code source aux utilisateurs
  distants. Pas d'exception "SaaS hosted" applicable ici.
- 🟠 Dépendance `lib-z` LGPL-2.1 en dynamic linking : compatible si l'on
  préserve la possibilité de relinking et que les notices LGPL sont
  conservées `[review]`.

Renvoi `revue-logiciel-donnees` non requis (pas de question de titularité
du code propriétaire). Validation humaine avocat PI obligatoire.
</response>
</example>

<example>
<user>/h-pi:revue-open-source ./inventaire-cible-dd.csv --obligations-only --type=dd-ma</user>
<response>
Posture cabinet : case par case LGPL/MPL ; audit pour due diligence M&A
côté acquéreur.

Mode `--obligations-only` : focus inventaire des obligations par composant.

Tableau produit :

| Composant | Licence | Notice | Attribution | Source modifs | Redistribution |
|---|---|---|---|---|---|
| react 18.x | MIT | requise | requise (copyright + texte licence) | n/a | autorisée |
| openssl 3.x | Apache-2.0 | requise | requise + clause brevets | n/a | autorisée |
| mongo-driver | SSPL-1.0 | requise | requise | requise si modifié | bloquée si service tiers `[review]` |
| codec-x | MPL-2.0 | requise | par fichier modifié | fournir source des fichiers MPL modifiés | autorisée |

Obligations non respectées identifiées : 7 composants sans notice
agrégée dans le bundle de licence du produit. Renvoi vers `audit-pi-ma`
pour intégration dans le rapport DD global.
</response>
</example>

<example>
<user>/h-pi:revue-open-source ./sbom.json --remediation-plan</user>
<response>
Posture cabinet : interdiction GPL sauf isolation. Findings 🔴 connus :
contamination GPL-3.0 sur 2 composants liés statiquement.

Mode `--remediation-plan` : plan chiffré.

| Composant | Option | Coût estimé | Délai | Risque résiduel |
|---|---|---|---|---|
| lib-gpl-A | Remplacement par lib MIT équivalente | 2 j dev | 1 sprint | aucun |
| lib-gpl-A | Refactor pour isolation par binaire séparé + IPC | 5-8 j dev | 2 sprints | dépend de la jurisprudence sur "œuvre dérivée" `[review]` |
| lib-gpl-B | Ouverture du code module concerné sous GPL-3.0 compatible | impact business majeur | 1 mois (validation Dir. produit + GC) | perte d'avantage concurrentiel |
| lib-gpl-B | Isolation par SaaS hosted exception | non applicable (AGPL section 13) | n/a | n/a |

Recommandation : option 1 (remplacement) pour les deux. Validation humaine
avocat PI + Direction technique obligatoire.
</response>
</example>

<example>
<user>/h-pi:revue-open-source ./package.json ./requirements.txt</user>
<response>
Audit initial sans posture explicite configurée dans le profil. Mode normal.

1. Pré-flight `check-pii`.
2. Inventaire complet : 142 dépendances Node + 38 dépendances Python.
3. Classification : 87 % permissives, 8 % LGPL/MPL, 3 % GPL/AGPL, 2 %
   inconnues.
4. Aucune contamination 🔴 détectée en l'état (pas de distribution
   externe déclarée).
5. 🟠 Sur les 3 % GPL/AGPL : à confronter à l'usage réel (build-only vs
   runtime distribué).

Recommandation : adopter une **policy OSS interne** avant de scaler.
Modèle proposé en annexe (whitelist permissives, liste grise LGPL/MPL au
cas par cas, liste rouge GPL/AGPL sauf isolation documentée). Validation
humaine GC + Direction technique obligatoire.
</response>
</example>

---

## Chargement du profil

> Lire :
> 1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
> 2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`
>
> Champs à extraire :
> - **Politique licences open source** — whitelist permissives (MIT/BSD/Apache)
>   seulement / validation case par case LGPL/MPL / interdiction GPL/AGPL sauf
>   isolation.
> - **Secteur des clients dominants** — SaaS / on-prem / mixte (calibre la
>   gravité AGPL).
> - **Politique PII** — `passive` / `active` / `strict` + seuil B.
> - **Matrice d'approbateurs** — ligne "licence logiciel" / "contrats droit
>   d'auteur".

Si le profil est absent, incomplet ou contient `[A CONFIGURER]`, demander
`/h-pi:entretien-demarrage` et garder les marqueurs `[à vérifier]` visibles.

---

## Pré-flight `check-pii`

Avant toute analyse substantielle, exécuter `/h-pi:check-pii` sur les
entrées :

- **SBOM et manifests** : généralement données techniques sans PII forte,
  mais peuvent inclure URLs internes, noms de mainteneurs, e-mails de
  contact, identifiants de tickets internes.
- **Code source partiel** parfois sensible (secrets, tokens commités par
  erreur, identifiants de schéma de base de données interne).
- **Policy interne** : peut citer nominativement des décideurs, des
  contreparties ou des dossiers passés.

Suivre la politique PII configurée (`passive` / `active` / `strict`) et
le seuil B. En cas de catégorie sensible PI détectée (secret d'affaires
revendiqué, code marqué confidentiel, identifiants techniques internes),
appliquer le prompt cas B avant de continuer.

---

## Intake

1. **Mode** — défaut, `--copyleft-only`, `--obligations-only`, `--remediation-plan`.
2. **Entrées disponibles** — préciser explicitement ce qui est fourni :
   - **SBOM** : CycloneDX, SPDX, export SCA, tableau équivalent.
   - **Manifests** : `package.json`, `requirements.txt`, `go.mod`, `Gemfile`,
     `pom.xml`, `Cargo.toml`, image Docker, mono-repo, sous-modules.
   - **Liste de dépendances** : packages, versions, composants embarqués,
     librairies front/back, images, snippets ou forks identifiés.
   - **Policy interne** : liste verte/noire, seuils copyleft, contraintes
     SaaS, exigences notice/source, process d'approbation.
3. **Contexte d'usage** — build only / runtime / distribution binaire /
   distribution source / SaaS hosted / on-prem client.
4. **Type d'opération** — audit initial / DD M&A / mise à jour annuelle /
   incident remontée / préparation release.
5. **Findings antérieurs** — si remédiation chiffrée demandée, présupposer
   des findings 🔴 ou 🟠 connus.

Si une entrée manque, l'indiquer comme telle au lieu d'inventer un
inventaire. Toujours séparer :

- **Inventaire fourni**
- **Hypothèses de qualification**
- **Composants au statut `non identifié`**

---

## Gate non-juriste

- [ ] Profil cabinet lu, politique licences OSS confirmée.
- [ ] `check-pii` exécuté.
- [ ] Inventaire fourni (au moins une entrée structurée).
- [ ] Contexte d'usage clarifié (SaaS / on-prem / distribution).
- [ ] Renvois `revue-logiciel-donnees` / `audit-pi-ma` / `contrats-pi`
      faits quand nécessaires.
- [ ] Findings cotés 🔴🟠🟡🟢 sans dégradation silencieuse cross-skill.
- [ ] Citations vérifiées ou taguées `[à vérifier]`.
- [ ] Sortie contient note 5 champs + arbre 5 options + footer PII.
- [ ] Si livrable destiné à un public non-juriste : mode silencieux appliqué.

---

## Mode Anno Desktop Optionnel

Si la distribution Hacienda + Anno Desktop est active, `revue-open-source`
utilise Anno pour relier localement SBOM, notices, contrats et pièces déjà
autorisés du dossier, jamais comme source primaire et jamais comme scanner SCA
autonome. Appeler `anno_health` avant tout outil Anno ; si Anno est
indisponible, poursuivre en `fallback_hacienda`. L'audit OSS reste soumis à
validation humaine.

Borner l'audit dans un `matter_vault` (périmètre produit, version, scope
d'exploitation) et appliquer un `workflow_blueprint` `pi-oss-audit-v1`. Quand
Anno Tabular est disponible, créer une revue tabulaire avec `tabular_review_create` :
composants en lignes, licence + classification + obligations + plan de
remédiation en colonnes, `review_status`, `decision_status`, responsable,
échéance, citation et `validation_status` par cellule. Toute cellule faible,
non citée ou avec licence `inconnu` reste `[à vérifier]`.

Outils Anno spécifiques :
- `legal_search` pour retrouver les composants, notices, exceptions et
  décisions internes déjà ingérés ;
- `legal_risk_review` pour prioriser les conflits de licences et obligations ;
- `legal_graph_query` pour relier composants, produits, usages, owners et
  décisions de remédiation ;
- ne jamais présenter Anno comme scanner SCA autonome.

Utiliser `grid_to_work_product` seulement après validation des cellules utiles
pour produire le rapport et le dashboard HTML. Tout résultat Anno est une
source interne Anno, jamais comme source primaire. Les licences, notices et
sources officielles doivent rester vérifiées via `hacienda-sources-officielles`,
les registres de packages ou les pièces fournies.

## Outils MCP à privilégier

Appeler les outils par leur nom exact quand le serveur `Hacienda Propriété
Intellectuelle` est disponible. Ne pas inventer de tool hors périmètre ;
si une source n'a pas été consultée directement, garder `[à vérifier]`.

- Socle textes, jurisprudence et droit UE : `piste_status`,
  `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`,
  `judilibre_get_decision`, `eurlex_recherche`, `eurlex_consulter`.
- Recherche de licence sur un composant inconnu : fallback recherche
  manuelle sur registre du package (npm, PyPI, Maven Central, crates.io,
  pkg.go.dev) ; taguer `[recherche web — à vérifier]`.
- Anno, quand disponible, reste une source interne de dossier : jamais un
  registre officiel ni un scanner SCA autonome.

---

## Emplacement des sorties

Écrire les livrables dans le dossier de pratique ou de dossier configuré :

- `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/`
- `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/matters/<slug-dossier>/outputs/`

---

## Niveaux de criticité

Échelle canonique appliquée à toute appréciation subjective de ce skill :

| Niveau | Icône | Signification dans le contexte de ce skill |
|---|---|---|
| Faible | 🟢 | Composants sous licences permissives uniquement (MIT, BSD, Apache 2.0) ; notices et attributions conformes ; inventaire complet et versions figées ; usage aligné avec la policy interne. |
| Moyen | 🟡 | Inventaire partiel ou versions non figées (risque de dérive entre build et distribution) ; composants `non identifié` ponctuels ; ambiguïtés sur la portée d'usage (build vs distribution) ne déclenchant pas d'obligation copyleft. |
| Élevé | 🟠 | Composant copyleft faible (LGPL, MPL, EPL) ou source-available avec obligations non respectées : absence de notices, défaut de fourniture des sources des modifications, dynamic linking non isolé, attribution manquante en distribution. |
| Bloquant | 🔴 | Composant copyleft fort (GPL, AGPL) lié à du code propriétaire distribué ou exposé en SaaS sans isolation — contamination avérée du code produit ; ou conflit policy rouge sur composant critique sans plan de remplacement. |

Plancher cross-skill (CLAUDE.md §4) : ce skill ne peut pas dégrader
silencieusement une cote 🔴 amont sans déclaration explicite.

---

## Sortie

### Format livrable

```
[En-tête de confidentialité selon le rôle utilisateur]

> **⚠️ Note du relecteur**
> - **Sources :** Légifrance ✓ / Judilibre ✓ / Eurlex ✓ / registres packages ✓ (cocher ✗ si non connectée)
> - **Lecture :** intégrale ({N} composants) | partielle (top {K} par criticité)
> - **Signalé pour ton jugement :** {N} éléments marqués [review] | aucun
> - **Fraîcheur :** recherche jurisprudence FOSS post-{date} — {N} mises à jour | rien trouvé
> - **Avant de t'appuyer dessus :** {action concrète : remédier / valider policy / escalader / prêt pour relecture}

# Revue open source — {produit} — {contexte usage}

## Étape 1 — Pré-flight `check-pii`

Exécuter `check-pii` sur SBOM, manifests et toute pièce annexe. Détecter
secrets oubliés, e-mails de mainteneurs, identifiants techniques internes,
fragments de code marqués confidentiel.

---

## Étape 2 — Lecture profil cabinet

Identifier la politique licences open source configurée :
- whitelist permissives (MIT/BSD/Apache) seulement ;
- validation case par case LGPL/MPL ;
- interdiction GPL/AGPL sauf isolation documentée.

Identifier également le contexte sectoriel (SaaS / on-prem) qui calibre la
gravité AGPL et SSPL.

---

## Étape 3 — Lecture inventaire fourni

Lire l'entrée structurée fournie :

- SBOM CycloneDX / SPDX ;
- `package.json`, `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock` ;
- `requirements.txt`, `Pipfile.lock`, `pyproject.toml` ;
- `go.mod`, `go.sum` ;
- `Gemfile`, `Gemfile.lock` ;
- `pom.xml`, manifest Maven, `build.gradle` ;
- `Cargo.toml`, `Cargo.lock`.

Ne pas inférer ce qui n'est pas dans l'inventaire. Tout composant absent
du fichier reste hors périmètre de l'audit.

---

## Étape 4 — Inventaire licences déclarées et détection licences inconnues

Pour chaque composant :

| Composant | Version | Licence déclarée | Source | Confiance | Statut |
|---|---|---|---|---|---|

Pour les composants au statut `non identifié` ou à licence inconnue :
fallback recherche manuelle sur le registre du package, taguer
`[recherche web — à vérifier]`. Ne pas inventer une licence sur la base
du nom du composant.

---

## Étape 5 — Classification

Classer chaque composant :

- **Permissives** : MIT, BSD-2-Clause, BSD-3-Clause, Apache-2.0, ISC, Zlib, Unlicense.
- **Copyleft faible** : LGPL-2.1, LGPL-3.0, MPL-2.0, EPL-2.0, CDDL.
- **Copyleft fort** : GPL-2.0, GPL-3.0, AGPL-3.0.
- **Source-available** : BSL (Business Source License), SSPL, Elastic License v2, Confluent Community License.
- **Proprietary** : licences propriétaires explicites.
- **Inconnu / non identifié** : à investiguer ou `[à vérifier]`.

---

## Étape 6 — Détection conflits inter-licences

Croiser les licences présentes :

- Compatibilité GPL/Apache : Apache 2.0 → GPLv3 compatible, mais Apache 2.0
  → GPLv2 incompatible (clause brevets).
- GPL/MIT : MIT compatible avec GPL (la GPL absorbe).
- Linking statique vs dynamique : impact sur LGPL et GPL différencié
  `[review]`.
- Présence simultanée GPL-2.0-only et Apache-2.0 dans un même binaire
  distribué : conflit.

Préciser pour chaque conflit le scénario d'usage (build only / dynamic
linking / statique / distribution binaire / SaaS) qui déclenche ou non
le conflit.

---

## Étape 7 — Détection contamination

Repérer les chemins de contamination :

- GPL/AGPL lié à code propriétaire distribué ou exposé en SaaS sans
  isolation = atteinte par propagation.
- AGPL section 13 : utilisateurs distants d'un service modifié
  doivent recevoir le code source — pas d'exception "SaaS hosted".
- SSPL : exigence de fourniture de l'intégralité du stack (orchestration,
  monitoring) si service offert à des tiers.
- BSL : restrictions d'usage commercial selon le change date.

Coter 🔴 toute contamination avérée sur code propriétaire distribué ou SaaS.

---

## Étape 8 — Obligations de conformité

Lister pour chaque composant ou groupe homogène :

| Composant | Notice | Attribution | Texte licence | Source modifs | Redistribution |
|---|---|---|---|---|---|

Détail :
- **Notice** : conservation et affichage des mentions copyright.
- **Attribution** : crédit aux auteurs, copyright holder, texte complet.
- **Texte de licence** : inclusion du fichier LICENSE.
- **Source des modifications** : pour LGPL, MPL, GPL si modifié.
- **Redistribution** : conditions de redistribution binaire / source.
- **Vigilance AGPL en SaaS** : section 13 mise à disposition source.

---

## Étape 9 — Priorités de remédiation

Trier :

1. **🔴 composants contaminants** : remédier en priorité (remplacement,
   refactor, isolation par binaire séparé / IPC, ouverture du code,
   exception SaaS hosted si applicable).
2. **🟠 obligations non respectées** : ajouter notices, bundles licence,
   fournir source des modifications, mettre à jour pages crédits.
3. **🟡 inventaire à finaliser** : versions non figées, composants
   `non identifié`, licences inconnues à investiguer.
4. **🟢 conformes** : documenter pour audit ultérieur.

---

## Étape 10 — Findings cotés et plan d'action

Tableau de findings :

| # | Composant | Licence | Risque | Cote | Action recommandée |
|---|---|---|---|---|---|

Plan d'action avec responsable, échéance, coût estimé. Si > 10
composants à traiter, générer le dashboard HTML.

---

## Étape 11 — Post-flight `verifier-citations`

Rare en revue OSS (peu de citations légales). Vérifier toutefois si la
sortie cite :

- Jurisprudence FOSS : `Versata v. Ameriprise`, `Patrick McHardy`,
  `SFC v. Vizio`, `BusyBox` (États-Unis principalement, valeur
  argumentative en FR).
- Articles CPI sur logiciel : L.113-9 CPI, L.122-6 CPI.
- Décisions CJUE en matière de logiciel (`SAS Institute`, `UsedSoft`).

Sinon, mentionner "rien à vérifier — pas de citation légale dans la
sortie".

---

## Étape 12 — Sortie

- Rapport Markdown selon le format livrable.
- Dashboard HTML automatique si > 10 composants tabulaires.
- Arbre 5 options de décision.
- Footer PII.

---

## Résumé exécutif

{Trois phrases partner-ready : bottom-line, risque dominant, prochaine action.}

## Inventaire des licences

| Composant | Version | Licence | Source | Usage | Confiance | Statut |
|---|---|---|---|---|---|---|

## Matrice de conflits

| Licences en présence | Mode d'usage | Compatible | Raison |
|---|---|---|---|

## Obligations

| Composant | Notice | Attribution | Source modifs | Redistribution |
|---|---|---|---|---|

## Findings

| # | Composant | Cote | Risque | Action |
|---|---|---|---|---|

## Plan de remédiation

| Priorité | Composant | Option | Coût | Délai | Responsable |
|---|---|---|---|---|---|

## Renvois recommandés

| Sujet | Skill |
|---|---|
| Titularité code propriétaire / contributions | `revue-logiciel-donnees` |
| DD M&A globale | `audit-pi-ma` |
| Clauses OSS dans contrats partenaires | `contrats-pi` |
| Clauses OSS dans NDA | `revue-clause-pi` |
| Litige OSS effectif | `contentieux-pi` |
| Question RGPD sur données embarquées | `bases-de-donnees` ou DPO |

## Recommandation

{Conforme / Conforme sous réserve / Remédiation requise / Bloquant} —
justification 2-3 lignes.

## Une question hors de ma checklist habituelle

{Observation transversale, ou omission si rien d'honnête à dire.}

## Que veux-tu faire ? Choisis une option :

1. **Rédiger** — je prépare un projet de policy OSS interne, une note de
   remédiation chiffrée, ou un courrier de demande de clarification au
   mainteneur d'un composant.
2. **Escalader** — je rédige une note vers {approbateur licence logiciel
   configuré}.
3. **Compléter les faits** — je liste les questions à poser à la Direction
   technique (contexte d'usage réel, distribution, isolation).
4. **Surveiller et attendre** — j'ajoute les composants 🟡 au tracker du
   dossier avec date de revisite.
5. **Autre** — précise.

[Ce skill a traité {N} mentions identifiantes. Pour anonymiser
automatiquement avant envoi à Claude, installer hacienda-ghost.](https://hacienda.diy/ghost)
```

---

## Modes courts

- `--copyleft-only` : focus exclusif sur la détection de contamination
  GPL/AGPL/LGPL et les obligations de propagation. Ne produit pas
  d'inventaire complet, ni de plan de remédiation chiffré. Sortie :
  Note du relecteur, Findings copyleft, Recommandation, Arbre 5 options.
- `--obligations-only` : focus inventaire des obligations (notice,
  attribution, texte de licence, source des modifications, redistribution)
  par composant. Ne fait pas de classification contaminant /
  non-contaminant. Sortie : Note du relecteur, Tableau obligations,
  Arbre 5 options.
- `--remediation-plan` : focus plan de remédiation chiffré (refactor,
  remplacement, ouverture du code, isolation par binaire séparé / SaaS
  hosted exception). Présuppose des findings 🔴 ou 🟠 connus en amont
  (ou produits par un audit précédent). Sortie : Note du relecteur,
  Findings repris, Plan de remédiation détaillé, Arbre 5 options.

---

## Mode silencieux pour livrables externes

Quand le rapport est destiné à une direction technique non-juriste, à un
sponsor produit, ou à une équipe DevOps :

- **En-tête de confidentialité** : conserver si destinataire dans le
  périmètre du secret professionnel ; retirer pour communication externe.
- **Note du relecteur** : conserver.
- **Narration interne** ("j'utilise le skill X qui normalement...") :
  couper.
- **Renvois inter-skills** : sortir du livrable, placer dans une note
  séparée pour le juriste.
- **« J'ai lu les fichiers suivants… »** : couper.
- **Conserver** : tableau actif / licence / statut / action, plan d'action
  priorisé, dashboard HTML si > 10 composants.

Le livrable doit se lire comme une note d'ingénieur produit relue par un
juriste senior, pas comme une narration d'audit.

---

## Ton

Conseiller PI sénior orienté tech / SaaS. Direct, opérationnel, factuel.
Calibrer la fermeté à la posture cabinet :

- Posture **whitelist permissives** : fermeté immédiate sur tout copyleft.
- Posture **case par case LGPL/MPL** : nuance par contexte d'usage,
  ouverture aux scénarios d'isolation documentée.
- Posture **interdiction GPL sauf isolation** : exiger preuve d'isolation
  technique (binaire séparé, IPC, processus distinct) avant d'autoriser.

Ne pas fabriquer de findings de remplissage. Si l'inventaire est propre,
le dire et passer à la policy interne.

---

## Ce skill ne fait pas

- **Pas de scan automatique du code source** : ne lit pas l'AST, ne
  détecte pas les imports non déclarés, ne fait pas d'analyse statique.
- **Pas de substitut à un outil SCA** : ne remplace pas Snyk, FOSSA,
  Black Duck, OWASP Dependency-Check, Syft, Trivy. Peut les recommander
  pour compléter l'audit.
- **Pas de chaîne de titularité des contributeurs** : la qualification de
  la titularité du code propriétaire, des contributions individuelles, des
  cessions et des CLA relève de `revue-logiciel-donnees`.
- **Pas d'audit RGPD des données embarquées** : si un composant traite ou
  embarque des données personnelles, renvoyer vers `bases-de-donnees` ou
  le DPO.
- **Pas de rédaction de policy OSS interne complète** : peut proposer un
  modèle structurant (whitelist / liste grise / liste rouge), mais la
  rédaction finale relève d'une décision Direction technique + GC.
- **Pas d'action contentieuse** : si un litige OSS est en cours (mise en
  demeure SFLC reçue, action engagée), renvoyer vers `contentieux-pi`.
- **Couverture limitée des exceptions FOSS / SaaS hosted** : signale
  l'existence des exceptions mais ne tranche pas la validité juridique
  d'un montage d'isolation au-delà de la mention `[review]`.
- **Pas de qualification d'une licence "exotique"** : si une licence
  sortie d'un cadre OSI / FSF est rencontrée (custom EULA, hybrid
  source-available), renvoyer en `[review]` avocat PI.
