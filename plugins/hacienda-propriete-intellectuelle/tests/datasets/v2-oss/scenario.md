# Dataset test — `revue-open-source` — Code S8W1HC

**Domaine** : Logiciel / Open source / SBOM
**Skill cible** : `/h-pi:revue-open-source`
**Mode** : audit complet, posture cabinet « interdiction GPL/AGPL sauf isolation stricte »

---

## Scénario fictif

NEXUS PLATFORM SAS, scale-up SaaS B2B fintech (200 collaborateurs, ARR 18M€,
client base 350 entreprises dont 30 banques européennes), prépare une **levée
Series C 60M€** en septembre 2026.

L'investisseur lead (private equity européen GROWTH IV) **exige un audit OSS
complet** dans la data room (DD juridique PI) avant signature SPA.

NEXUS distribue **2 produits** :
- **NexusCore SaaS** (hébergé chez NEXUS) — plateforme web + API REST.
- **NexusEdge** (on-premises, distribué aux clients sous licence commerciale propriétaire) — agent edge installé sur infra client pour synchronisation données critiques.

**Posture cabinet NEXUS** :
- Whitelist permissives (MIT, BSD, Apache 2.0, ISC) — autorisation directe.
- Liste grise (LGPL, MPL, EPL) — validation case par case par juridique.
- **Interdiction GPL/AGPL** sauf isolation stricte démontrée.

---

## Pièces fournies

### SBOM CycloneDX consolidé (extrait des composants critiques)

**NexusCore SaaS — 247 composants** (dépendances Python + JS + Java) :

| Composant | Version | Licence déclarée | Type usage |
|---|---|---|---|
| `requests` | 2.31.0 | Apache-2.0 | Python, prod |
| `flask` | 3.0.0 | BSD-3-Clause | Python, prod |
| `pandas` | 2.1.4 | BSD-3-Clause | Python, prod |
| `numpy` | 1.26.0 | BSD-3-Clause | Python, prod |
| `pyjwt` | 2.8.0 | MIT | Python, prod |
| `cryptography` | 42.0.5 | Apache-2.0 + BSD-3-Clause | Python, prod |
| `psycopg2-binary` | 2.9.9 | **LGPL-3.0** | Python, prod (driver PostgreSQL) |
| `react` | 18.2.0 | MIT | JS, prod |
| `axios` | 1.6.5 | MIT | JS, prod |
| `lodash` | 4.17.21 | MIT | JS, prod |
| `mariadb-jdbc` | 3.3.1 | **LGPL-2.1** | Java, prod |
| `kafka-clients` | 3.6.1 | Apache-2.0 | Java, prod |
| `monitoring-agent` | 1.4.0 | **AGPL-3.0** | Java, prod (interne — monitoring centralisé) |
| `pdfkit` | 1.0.0 | **GPL-2.0** | Python, prod (génération PDF rapports clients) |

**NexusEdge on-premises — 124 composants** (Java + C++) :

| Composant | Version | Licence déclarée | Type usage |
|---|---|---|---|
| `boost` | 1.83 | BSL-1.0 (Boost) | C++, prod |
| `openssl` | 3.1.4 | Apache-2.0 | C++, prod |
| `protobuf` | 24.4 | BSD-3-Clause | C++/Java, prod |
| `grpc-java` | 1.59.0 | Apache-2.0 | Java, prod |
| `jackson-databind` | 2.16.0 | Apache-2.0 | Java, prod |
| `slf4j-api` | 2.0.9 | MIT | Java, prod |
| `**embedded-postgres**` | 16.1 | **PostgreSQL License** | C++, prod (BdD intégrée client) |
| `**libtorch**` | 2.1.0 | BSD-3-Clause | C++, prod (modèles ML embedded) |
| `**fast-cgi**` | 2.4.2 | **GPL-2.0 with Classpath exception** | C++, prod |
| `**ffmpeg-libs**` | 6.1 | **LGPL-2.1 (option GPL-2.0)** | C++, prod (processing média) |

### Notices et obligations identifiées (extrait)

- **`psycopg2-binary` LGPL-3.0** : NexusCore SaaS l'utilise via linking dynamique Python. SaaS hosted = pas de distribution au sens GPL classique.
- **`mariadb-jdbc` LGPL-2.1** : NexusCore SaaS, linking dynamique Java. SaaS = pas de distribution classique mais clause AGPL-style absente de LGPL.
- **`monitoring-agent` AGPL-3.0** : utilisé en interne uniquement, pas exposé au client. Mais **AGPL clause section 13** : « if you modify the Program, your modified version must prominently offer all users interacting with it remotely through a computer network an opportunity to receive the Corresponding Source... » — usage interne SaaS = ne déclenche PAS forcément l'obligation si pas modifié + pas exposé aux utilisateurs.
- **`pdfkit` GPL-2.0** (NexusCore SaaS) : génère PDF côté serveur, **livré aux clients NEXUS**. Question : est-ce une « distribution » du logiciel pdfkit, ou seulement de sa sortie (le PDF) ? Jurisprudence : la sortie n'est PAS soumise à GPL. MAIS si le PDF généré inclut du code pdfkit (rare mais possible avec certaines fonctionnalités), alors contamination.
- **`embedded-postgres` PostgreSQL License** (NexusEdge) : permissive, OK.
- **`fast-cgi` GPL-2.0 with Classpath exception** (NexusEdge) : Classpath exception permet le linking sans contamination. **Mais** : Classpath exception est spécifique à GNU Classpath et OpenJDK, son application à fast-cgi est discutable. Risque interprétatif.
- **`ffmpeg-libs` LGPL-2.1 (option GPL-2.0)** : LGPL si linking dynamique, GPL si statique. NexusEdge utilise linking statique pour performance → bascule GPL → **contamination potentielle NexusEdge entier**.

### Inventaire scope d'exploitation

- NexusCore SaaS : hébergé chez NEXUS, accessible via API REST. Pas de code source client. Distribution = aucune (SaaS).
- NexusEdge : code compilé livré sur infrastructure client (binaire C++ + JAR Java). Distribution = oui.
- Modifications NEXUS : `monitoring-agent` AGPL n'a PAS été modifié (vendor stock). `pdfkit` GPL a été modifié pour intégration interne (fork interne 2024).

---

## Vérité terrain attendue

### Findings critiques que le skill DOIT capter

🔴 **Bloquant — `ffmpeg-libs` linkée statiquement dans NexusEdge** :
- LGPL-2.1 + linking statique → bascule sous GPL-2.0 (clause LGPL §6).
- NexusEdge est **distribué** au client (binaire on-premises).
- → **Contamination GPL-2.0 de l'ensemble du binaire NexusEdge distribué**.
- Conséquence : obligation de fournir le code source de NexusEdge ENTIER sous GPL-2.0, ou refactor obligatoire vers linking dynamique.
- **Action urgente** : refactor immédiat → linking dynamique ffmpeg (LGPL OK) OU remplacer ffmpeg par alternative permissive (GStreamer permet certains usages, libavif, etc.).

🔴 **Bloquant — `pdfkit` modifié interne, posture cabinet « interdiction GPL »** :
- `pdfkit` GPL-2.0 a été **modifié en fork interne 2024** = clause GPL §5 « modifications » active.
- Usage SaaS (NexusCore hosted) = peut-être pas distribution **stricto sensu**.
- MAIS : posture cabinet « interdiction GPL sauf isolation stricte démontrée » → fork interne n'est PAS une isolation stricte.
- Conséquence : violation de la policy interne, à régulariser **AVANT** DD signature SPA.
- **Action** : remplacer pdfkit par alternative permissive (ReportLab BSD, fpdf2 LGPL OK en SaaS, WeasyPrint BSD).

🟠 **Élevé — `monitoring-agent` AGPL-3.0 en SaaS** :
- AGPL section 13 ne s'active strictement que si **modification** + **interaction utilisateurs réseau**.
- Usage interne pur monitoring (pas modifié, pas exposé) = pas d'obligation source disclosure.
- MAIS : posture cabinet « interdiction AGPL sauf isolation stricte » → l'isolation est démontrée ici (interne, non exposé).
- **Action** : documenter l'isolation (architecture diagram + contrôle d'accès réseau) pour la DD, OU remplacer par alternative permissive (Prometheus Apache, Grafana AGPL — non !, OpenTelemetry Apache).

🟠 **Élevé — `fast-cgi` Classpath exception ambiguë** :
- Classpath exception conçue pour OpenJDK / GNU Classpath, application à fast-cgi questionnable.
- Risque interprétatif élevé : si l'investisseur GROWTH IV refuse l'interprétation extensive, fast-cgi peut basculer en GPL.
- **Action** : remplacer fast-cgi par alternative permissive (lighttpd FastCGI BSD, nginx FastCGI BSD).

🟠 **Élevé — `psycopg2-binary` LGPL-3.0 + `mariadb-jdbc` LGPL-2.1 en SaaS** :
- LGPL en SaaS = pas de distribution classique = obligations relaxées (notices uniquement).
- MAIS : si la DD GROWTH IV est strict, considérer ces composants comme « liste grise » à documenter.
- **Action** : maintenir, documenter linking dynamique, fournir notices.

🟡 **Moyen — Inventaire incomplet sur 124+247 composants** :
- SBOM ne couvre que les dépendances directes ? Vérifier transitives.
- Versions non figées (`^1.0.0`, `~2.0.0`) → dérive licence possible lors d'upgrades.
- **Action** : verrouiller versions dans le SBOM ; audit transitives.

🟢 **Faible — Composants permissives majoritaires** :
- 80 %+ des composants en MIT/BSD/Apache = pas de risque structurel.
- Boost License (`boost`) = permissive OK.
- PostgreSQL License (`embedded-postgres`) = permissive OK.

### Nuances métier subtiles à valoriser

- **Distinction SaaS vs distribution classique pour GPL/LGPL** : la GPL-2.0 et la LGPL ne déclenchent leurs obligations qu'à la **distribution** du logiciel. SaaS hosted = pas de distribution classique = pas de contamination (sauf AGPL section 13). **C'est la raison de la création d'AGPL.**
- **AGPL section 13** : ne s'active que si modification ET interaction utilisateurs réseau. Usage purement interne sans interface réseau utilisateur = pas d'obligation.
- **LGPL linking statique vs dynamique (clause LGPL §6)** : statique = bascule GPL. Dynamique = LGPL préservée.
- **Classpath exception** : permet linking sans contamination, mais son origine est OpenJDK/GNU Classpath. Application à d'autres projets parfois contestée.
- **Posture cabinet** : « interdiction GPL/AGPL sauf isolation stricte démontrée » → la démonstration est sur la NEXUS, pas sur le composant. Documentation architecture + contrôles requise.
- **DD M&A perspective** : un investisseur strict (lead PE) inclura souvent une rep&warranty OSS dans le SPA. Risque chiffré à anticiper.
- **Jurisprudence FOSS** : Versata (Allemagne 2014) GPL contamination ; Patrick McHardy actions GPL en Allemagne 2015-2018 (controversé). Pas de jurisprudence française récente significative.

### Pièges à ne pas tomber dedans

1. **Ne pas appliquer GPL en SaaS** automatiquement — la distinction distribution/SaaS est centrale (sauf AGPL).
2. **Ne pas confondre fork interne avec isolation stricte** — un fork modifié est une modification au sens GPL §5.
3. **Ne pas surestimer la portée AGPL** — section 13 est conditionnelle (modification + réseau utilisateur).
4. **Ne pas oublier le linking statique LGPL** — la contamination ffmpeg est le finding #1 à ne pas manquer.
5. **Ne pas confondre `embedded-postgres` PostgreSQL License avec PostgreSQL le projet** — la licence est permissive de type BSD.
6. **Ne pas conclure « compliant » sans documentation isolation + linking** — la DD demandera des preuves architecturales.

### Recommandation attendue

**Statut : Non-prêt pour DD SPA** — 2 findings 🔴 à régulariser avant data room :
1. Refactor immédiat `ffmpeg-libs` → linking dynamique OU remplacement permissive.
2. Remplacement `pdfkit` par ReportLab/WeasyPrint (posture cabinet interdit fork GPL).

**Plan d'action — mode `--remediation-plan`** :
- **Sprint 1 (2 semaines)** : refactor ffmpeg dynamique + remplacement pdfkit. Coût engineering ~80h.
- **Sprint 2 (1 semaine)** : remplacement fast-cgi (alternative permissive) + documentation isolation monitoring-agent AGPL.
- **Sprint 3 (1 semaine)** : verrouillage versions SBOM + audit transitives. Production policy interne formalisée.
- **Sprint 4** : data room SPA — fournir SBOM verrouillé + rapport NEXUS + diagramme architecture isolation + dossier conformité.

---

## Critères de scoring K7M2PX adapté

| Dimension | Poids | Indicateurs |
|---|---|---|
| Couverture du périmètre | 30 % | 6 findings 🔴/🟠 (ffmpeg statique, pdfkit fork, monitoring-agent isolation, fast-cgi, psycopg2/mariadb LGPL, inventaire transitives) |
| Détection nuances métier | 30 % | SaaS vs distribution, LGPL §6 statique vs dynamique, AGPL section 13 conditionnelle, Classpath exception ambiguë, posture cabinet stricte |
| Qualité arbitrage subjectif | 20 % | Plan remédiation 4 sprints, cotation 🔴/🟠/🟡 calibrée |
| Lisibilité partner-ready | 10 % | Tableau composants/licence/finding + plan chiffré + dashboard HTML > 10 composants |
| Résistance aux pièges | 10 % | N'a pas appliqué GPL en SaaS, n'a pas surévalué AGPL, n'a pas raté linking statique ffmpeg |
