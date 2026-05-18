# Licences open source — typologie, compatibilité, outils SCA, CLA

> **Statut documentaire.** Référence interne pour le skill `logiciels-pi`.
> Citations licences à vérifier sur les textes officiels (OSI, FSF, Apache
> Software Foundation, Eclipse Foundation, Mozilla) avant analyse engageante.

---

## Tableau synthétique par licence

### Licences permissives (faible réciprocité)

| Licence | Permissions | Conditions | Limitations |
|---|---|---|---|
| **MIT** | Utilisation commerciale, modification, distribution, sous-licence, usage privé | Inclure copyright + notice licence | Aucune garantie ; pas de responsabilité |
| **BSD-2-Clause** (Simplified BSD) | Idem MIT | Inclure copyright + notice | Aucune garantie |
| **BSD-3-Clause** (New BSD) | Idem | Idem + clause de non-endorsement (interdiction d'utiliser le nom des auteurs pour promouvoir des dérivés sans accord écrit) | Aucune garantie |
| **Apache 2.0** | Idem MIT + protection brevet explicite (patent grant) | Inclure copyright + notice + fichier NOTICE + indiquer modifications + texte de la licence | Aucune garantie ; **résiliation automatique du patent grant en cas d'action en contrefaçon brevet par le licencié** |
| **ISC** | Idem MIT (formulation simplifiée) | Inclure copyright + notice | Aucune garantie |
| **0BSD** (Zero-Clause BSD) | Tout autorisé sans condition | Aucune | Aucune garantie |

### Licences copyleft fort (réciprocité totale)

| Licence | Permissions | Conditions | Limitations |
|---|---|---|---|
| **GPL v2** | Utilisation commerciale, modification, distribution, usage privé | **Tout logiciel dérivé doit être distribué sous GPL v2** ; code source fourni à tout distributaire ; conserver copyright + licence | Pas de sous-licence sous licence plus restrictive ; risque "contamination virale" pour produits propriétaires |
| **GPL v3** | Idem GPL v2 + protection brevet (patent grant) explicite | Idem GPL v2 + clause **anti-tivoization** (interdit le verrouillage matériel empêchant l'utilisateur d'exécuter version modifiée) | Compatible Apache 2.0 (problème historique résolu) ; incompatible avec GPL v2 stricte |
| **AGPL v3** | Idem GPL v3 + extension SaaS | Idem GPL v3 + **utilisation sur serveur = redistribution** → obligation de fournir code source aux utilisateurs distants (clause §13) | Bloque tout SaaS propriétaire intégrant du code AGPL |

### Licences copyleft faible (réciprocité limitée)

| Licence | Permissions | Conditions | Limitations |
|---|---|---|---|
| **LGPL v2.1** | Idem GPL v2 + **liaison dynamique** depuis logiciel propriétaire autorisée | Modifications du code LGPL restent LGPL ; le logiciel propriétaire qui lie reste propriétaire | Liaison statique plus contestée (interprétations FSF restrictives vs pratique industrielle plus souple) |
| **LGPL v3** | Idem LGPL v2.1 + protection brevet | Idem + clause anti-tivoization | Idem ambiguïté liaison statique |
| **MPL 2.0** (Mozilla) | Utilisation commerciale, modification, distribution | Copyleft **fichier par fichier** — modifications d'un fichier MPL restent MPL, mais d'autres fichiers du projet peuvent être propriétaires (compartimentation) | Doit conserver notice MPL dans les fichiers modifiés |
| **EPL 2.0** (Eclipse) | Idem MPL avec spécificités plugin Eclipse | Idem fichier par fichier | — |

### Licences Creative Commons (généralement non recommandées pour code)

| Licence | Permissions | Conditions principales |
|---|---|---|
| **CC-BY** | Utilisation commerciale, modification, distribution | Attribution auteur |
| **CC-BY-SA** | Idem | Attribution + ShareAlike (dérivés sous même licence) |
| **CC-BY-NC** | Modification, distribution **non commerciale** | Attribution + non commercial |
| **CC-BY-NC-SA** | Distribution non commerciale | Attribution + non commercial + ShareAlike |
| **CC-BY-ND** | Distribution sans modification | Attribution + NoDerivatives |
| **CC0** | Domaine public (dans la mesure permise par le droit applicable) | Aucune |

**Note** : les CC sont rédigées pour des œuvres au sens droit d'auteur
général (textes, images, musique, documentation) — **généralement
inadaptées au code source** (pas de patent grant, pas de gestion des
formats binaires/sources, pas de mécanisme de distribution adapté).

### Licences "source-available" non reconnues OSI

| Licence | Caractéristique |
|---|---|
| **BSL** (Business Source License) | Source disponible + restrictions commerciales + bascule automatique vers open source après période (ex : 4 ans) |
| **SSPL** (Server Side Public License — MongoDB) | Inspiré AGPL avec extension serveur plus large ; rejeté par OSI |
| **Elastic License v2** | Source disponible + restrictions usage SaaS concurrent |
| **Commons Clause** (add-on) | Add-on bloquant la vente commerciale ; peut être combiné à Apache 2.0 ou MIT |

**Analyse spécifique requise** — ces licences ne sont pas open source au
sens OSI et imposent des restrictions commerciales qui peuvent bloquer des
modèles business. `[review]` selon contexte.

---

## Matrices de compatibilité détaillées

### Compatibilité par paire (intégration code amont → projet)

| Amont \ Projet | Propriétaire | MIT/BSD/Apache | LGPL (dyn) | GPL v2 | GPL v3 | AGPL v3 |
|---|---|---|---|---|---|---|
| **MIT / BSD / ISC** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Apache 2.0** | ✅ | ✅ | ✅ | ❌ (historique) | ✅ | ✅ |
| **LGPL v2.1 / v3** | ✅ (liaison dynamique) | ✅ | ✅ | ✅ | ✅ | ✅ |
| **MPL 2.0** | ✅ (fichier par fichier) | ✅ | ✅ | ✅ (clause de compatibilité) | ✅ | ✅ |
| **GPL v2** | ❌ | ❌ | ❌ | ✅ | ⚠️ (sauf si "GPL v2 or later") | ⚠️ |
| **GPL v3** | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| **AGPL v3** | ❌ (même non SaaS) | ❌ | ❌ | ❌ | ⚠️ (sous conditions) | ✅ |
| **Creative Commons NC** | ❌ (si commercial) | ❌ | ❌ | ❌ | ❌ | ❌ |
| **SSPL / BSL / Elastic v2** | ⚠️ Analyse spécifique `[review]` | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |

Légende : ✅ Compatible / ⚠️ Vigilance — conditions spécifiques / ❌ Incompatible

### Risques typiques par licence

- **Contamination** (GPL / AGPL) : virale, force la mise sous licence
  copyleft de tout le projet intégrant.
- **Obligation source** (GPL / AGPL) : code source fourni à tout
  distributaire (GPL) ou utilisateur distant (AGPL).
- **Attribution** (MIT / BSD / Apache) : conserver copyright + notice +
  fichier NOTICE pour Apache.
- **Patent grant** (Apache 2.0 / GPL v3 / AGPL v3 / LGPL v3) : protection
  contre les actions brevet du licencié contre le projet ; clause de
  résiliation automatique.
- **Anti-tivoization** (GPL v3 / AGPL v3 / LGPL v3) : interdiction du
  verrouillage matériel.
- **Restriction commerciale** (CC NC / SSPL / BSL / Elastic v2) : peut
  bloquer le modèle business propriétaire ou concurrent SaaS.

---

## Outils SCA (Software Composition Analysis) recommandés

| Outil | Modèle | URL | Notes |
|---|---|---|---|
| **Snyk** | Commercial + free tier | https://snyk.io | Couverture large, intégration CI/CD, scan vulnérabilités + licences |
| **FOSSA** | Commercial | https://fossa.com | Focus conformité licences open source, génère SBOM SPDX/CycloneDX |
| **Black Duck Synopsys** | Commercial entreprise | https://www.synopsys.com/software-integrity/security-testing/software-composition-analysis.html | Référence grand compte, audit DD M&A |
| **GitHub Dependabot** | Gratuit (intégré GitHub) | https://github.com/dependabot | Alertes vulnérabilités + mises à jour automatiques |
| **OWASP Dependency-Check** | Open source | https://owasp.org/www-project-dependency-check | Gratuit, autohébergeable |
| **OWASP Dependency-Track** | Open source | https://dependencytrack.org | Gestion SBOM continue |
| **Trivy** (Aqua Security) | Open source | https://github.com/aquasecurity/trivy | Scan conteneurs + dépendances |

**Formats SBOM standards** :
- **SPDX** (Software Package Data Exchange) — ISO/IEC 5962:2021
- **CycloneDX** (OWASP) — standard concurrent, focus sécurité

---

## Modèles CLA (Contributor License Agreement)

| Modèle | URL | Usage |
|---|---|---|
| **Apache ICLA / CCLA** | https://www.apache.org/licenses/contributor-agreements.html | Individuel (ICLA) + Corporate (CCLA) — référence Apache Software Foundation |
| **FSF Contributor Agreement** | https://www.fsf.org/licensing/copyright-assignment | Cession totale au profit FSF (modèle GNU) |
| **Salesforce CLA** | https://cla.salesforce.com | Template populaire pour projets d'éditeurs commerciaux pratiquant dual licensing |
| **Eclipse Contributor Agreement (ECA)** | https://www.eclipse.org/legal/ECA.php | Modèle Eclipse Foundation |
| **Developer Certificate of Origin (DCO)** | https://developercertificate.org | Alternative légère au CLA — signature par "Signed-off-by" dans les commits Git ; pas une cession mais une attestation de droit de contribuer (utilisé par projet Linux, GitLab, etc.) |

**Mise en œuvre technique** :
- **CLA Assistant** (https://cla-assistant.io) — bot GitHub bloquant les
  pull requests jusqu'à signature.
- **CLA Bot** (alternative).
- **DCO check** intégré GitHub (vérifie présence Signed-off-by).

---

## Politique cabinet type

### Whitelist (utilisation sans validation préalable)

- MIT, BSD-2-Clause, BSD-3-Clause, ISC, 0BSD
- Apache 2.0
- MPL 2.0 (compartimentation respectée)

### Validation case par case

- LGPL v2.1 / v3 — OK si **liaison dynamique exclusivement** ; vigilance
  liaison statique
- EPL 2.0
- Licences custom source-available (Elastic License v2, BSL avec date de
  bascule, Commons Clause)
- Licences exotiques ou non OSI

### Blacklist (interdit sauf isolation stricte microservice séparé)

- GPL v2, GPL v3
- AGPL v3
- SSPL
- Creative Commons NC (NonCommercial) si usage commercial visé

### Procédure recommandée

1. Revue licence **obligatoire avant merge** en branche main (revue PR
   incluant analyse licence)
2. Scan SCA **mensuel minimum** (hebdomadaire en phase de croissance ou
   pré-levée)
3. SBOM tenu à jour (SPDX ou CycloneDX) — disponible en data room
4. Responsable conformité désigné (souvent CTO ou DPO)
5. Watch des changements de licence amont (alerte sur dépendances
   critiques)

---

## Jurisprudence open source FR

- **TGI Paris 28 mars 2007, Free vs Welte** — **premier précédent FR**
  reconnaissant l'applicabilité de la GPL en droit français ; la licence
  est qualifiée de contrat synallagmatique opposable. `[verify]`
- **TGI Paris 16 septembre 2009, Edu4 vs AFPA** — confirme l'applicabilité
  de la GPL dans un contexte commercial (contrat de prestation entre
  société et organisme public) ; importance du respect strict des
  obligations GPL (fourniture du code source). `[verify]`
- **CA Paris 16 septembre 2009** — confirmation d'appel Edu4 vs AFPA ;
  consacre l'opposabilité de la GPL en droit FR. `[verify]`

### Jurisprudence base de données — sui generis L.341-1

- **CJUE Innoweb C-202/12 (2013)** — l'utilisation d'un méta-moteur de
  recherche exploitant en temps réel les données d'une base tierce constitue
  une "réutilisation" d'une partie substantielle au sens L.342-1 / Directive
  base de données 96/9/CE.
- **CJUE Football Dataco C-604/10 (2012)** — précision sur le critère
  d'originalité pour la protection par droit d'auteur sur la structure
  (critère du choix créatif).

---

## Lien avec les autres skills du plugin

- `logiciels-pi` (SKILL.md) — utilise ce document comme référence pour
  l'analyse de compatibilité licences et le choix de licence open source.
- `cession-droit-auteur` (V4.1 à venir) — pour les CLA et les cessions
  cofondateur / contributeur.
- `licence-droit-auteur` (V4.1 à venir) — pour la rédaction effective de
  la licence d'utilisation (propriétaire ou open source).
- `revue-open-source` — pour la structure de l'audit de conformité open
  source.

---

*Note : citations licences à vérifier sur les textes officiels (sites OSI,
FSF, Apache, Eclipse, Mozilla) ; jurisprudence FR à vérifier sur la base
Cour de cassation Open Data + CJUE Curia avant transmission externe.*
