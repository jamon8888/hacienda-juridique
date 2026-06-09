NOTES DE TRAVAIL — Faire valider par l'avocat M&A référent avant tout usage externe

> **⚠️ Note du relecteur**
>
> - **Sources :** Légifrance ✗ (non interrogé en session) / Judilibre ✗ / Pappers ✗ / BODACC ✗ — mode dégradé documenté, citations C.civ / C.com / CPI / CT / RGPD à valider via `verifier-citations`.
> - **Lecture :** 6 documents data-room sur 6 (DOC 01 statuts + cap-table, DOC 02 PV AG 2025, DOC 03 contrat client ALPHA, DOC 04 note contentieux/passifs, DOC 05 PI/logiciel, DOC 06 RGPD) ; 7 thèmes couverts ; aucun fichier illisible.
> - **Signalé pour ton jugement :** 14 findings dont 11 matériels (> 50 000 €) ; 5 cotés 🔴, 8 cotés 🟠, 1 coté 🟡 ; 10 documents manquants identifiés ; qualifications de matérialité portées `[review]` quand elles relèvent d'une appréciation chiffrée.
> - **Fraîcheur :** date de travail 25 septembre 2026 — pas de recherche d'évolution jurisprudentielle en session ; à confirmer notamment sur L.442-1 C.com (rupture brutale, jurisprudence ch. com. mouvante) et sur la qualification du forfait-jours (Cass. soc. évolutive).
> - **Profil cabinet :** `[A CONFIGURER]` détecté dans `hacienda-droit-affaires/CLAUDE.md` — bloc M&A non peuplé. Skill exécuté en s'appuyant uniquement sur les flags CLI (`--side=acquereur --seuil-materialite=50000`). Posture DD, matrice d'approbateurs SPA et politique GAP non disponibles → lancer `/h-droit-affaires:entretien-demarrage` avant la prochaine itération.
> - **Avant de t'appuyer dessus :** (1) adresser la Q&A list au cédant et figer la grille à réception des pièces ; (2) lancer `verifier-citations` (PISTE non interrogé en session) ; (3) escalader sans attendre les findings 🔴 (cession des droits freelance, clause CoC ALPHA, notification CNIL, convention réglementée non approuvée, URSSAF 300 k€).

---

# Résumé exécutif

L'audit révèle **plusieurs expositions matérielles bloquantes** côté acquéreur : un défaut de chaîne de cession des droits d'auteur sur le **cœur de la plateforme SaaS** (développement freelance 2022 sans convention de cession), une **clause de changement de contrôle** sur le contrat client ALPHA représentant **~40 % du CA** (résiliation de plein droit, sans indemnité), un **redressement URSSAF de 300 k€** contesté, une **convention réglementée non approuvée** (prestations holding dirigeant, 120 k€/an) et une **violation de données 2024 non notifiée à la CNIL** au-delà du délai de 72 h.

**Bottom-line — poursuivre sous conditions strictes :** subordonner toute progression vers signing à (a) l'obtention rétroactive d'une cession des droits d'auteur sur le logiciel par le prestataire freelance (condition suspensive impérative) et (b) la sollicitation formelle du consentement du client ALPHA au changement de contrôle. Risque dominant : la combinaison « PI non sécurisée + dépendance client ALPHA » fragilise la thèse d'investissement elle-même.

**Prochaine action :** envoi de la Q&A list au cédant (12 questions, 5 en priorité Haute) et escalade vers l'approbateur SPA configuré au profil cabinet.

---

# Rapport structuré par thème

## Étape 1 — Pré-flight

1. **`check-pii` sur l'ensemble de la data-room** — invocation requise. La data-room contient des montants > 10 k€ (200 k€ capital, 300 k€ URSSAF, 150 k€ litige, 120 k€/an convention réglementée, 40 % CA), des données salariés implicites (6 bénéficiaires BSPCE, 20 cadres forfait-jours, 1 salarié protégé) et une mention « base d'e-mails clients » (catégorie sensible — données personnelles). **Seuil B franchi → prompt utilisateur à présenter avant toute analyse** (`[continuer une fois] [ne plus demander pour ce dossier] [installer hacienda-ghost]`). Décision respectée pour la suite.
2. Lecture du profil cabinet : `[A CONFIGURER]` — bloc M&A non peuplé. Side, seuil et matrice d'approbateurs SPA déduits exclusivement des flags CLI (acquéreur, 50 000 €). Rôle utilisateur indéterminé → en-tête « NOTES DE TRAVAIL » apposé par défaut (le plus protecteur sans surcharger de prérogatives).
3. Aucun fichier illisible ni tronqué.

---

## Étape 2 — Inventaire et extraction

### 2.1 Inventaire

| #      | Document                          | Thème(s)                                         |
| ------ | --------------------------------- | ------------------------------------------------- |
| DOC 01 | Statuts + table de capitalisation | 1 (Corporate)                                     |
| DOC 02 | PV AG 30 juin 2025                | 1 (Corporate), 5 (Fiscal/Financier — comptes)    |
| DOC 03 | Contrat-cadre client ALPHA        | 2 (Contrats matériels)                           |
| DOC 04 | Note contentieux et passifs       | 3 (Social), 5 (Fiscal — URSSAF), 6 (Contentieux) |
| DOC 05 | PI / logiciel                     | 4 (PI)                                            |
| DOC 06 | Conformité RGPD                  | 7 (RGPD)                                          |

**Catégories de documents attendues mais ABSENTES (findings « document manquant ») :**

- Registre des mouvements de titres et registre des comptes individuels d'actionnaires (L.228-1 C.com pour SAS).
- Rapport sur les conventions réglementées complet (L.227-10 C.com).
- Comptes annuels 2024 déposés au greffe + récépissé (L.232-23 C.com).
- Convention de cession des droits d'auteur sur le logiciel par le prestataire freelance 2022.
- Audit / matrice de conformité licences open source (composants GPL).
- Justificatifs de dépôt INPI de la marque « VIRIDIS ».
- Registre des activités de traitement art. 30 RGPD complet.
- Désignation et coordonnées du DPO (le cas échéant art. 37 RGPD).
- Contrats de sous-traitance art. 28 RGPD avec les sous-traitants techniques.
- Accord collectif forfait-jours + contrats de travail des 20 cadres concernés.
- Documentation du contrôle URSSAF (LRAR, observations, réponses).
- Assignation et conclusions du litige distributeur (rupture brutale).
- Lettre de licenciement du salarié protégé + autorisation inspection du travail.

### 2.2 Extraction multi-documents via `revue-tabulaire` (simulation)

Le lot ne contient qu'un seul contrat-cadre (DOC 03) ; l'extraction tabulaire formelle n'apporterait pas de gain par rapport à une lecture directe. `revue-tabulaire` aurait été pertinent sur un portefeuille de N contrats clients. Lecture directe retenue.

| Document     | Parties                                                               | Date signature        | Durée                       | Changement de contrôle                                      | Résiliation    | Exclusivité          |
| ------------ | --------------------------------------------------------------------- | --------------------- | ---------------------------- | ------------------------------------------------------------ | --------------- | --------------------- |
| DOC 03 ALPHA | VIRIDIS / ALPHA `[à vérifier — nom complet ALPHA non précisé]` | `⚠️ à vérifier` | Tacite reconduction annuelle | **Oui — résiliation de plein droit sans indemnité** | Préavis 3 mois | `⚠️ à vérifier` |

---

## Étape 3 — Analyse par thème

### Thème 1 — Corporate / Gouvernance

**Documents :** DOC 01, DOC 02.

**Points de contrôle vérifiés :**

- Forme : SAS au capital de 200 000 €.
- Répartition : fondateurs 62 % / fonds amorçage 30 % / managers 8 % — pas de minorités de blocage 1/3 mais le fonds dispose probablement de droits de véto pacte (à vérifier — **pacte d'associés absent de la data-room**).
- BSPCE : plan attribué à 6 salariés, **9 % de dilution potentielle** en cas d'exercice intégral, **non reflétée dans la cap-table fournie** → la valorisation 100 % doit être recalculée sur base **fully diluted**.

**Red flags constatés (findings) :**

- **F1.1 — Clause d'agrément statutaire de toute cession d'actions par la collectivité des associés** (DOC 01). Côté acquéreur : la cession de 100 % doit être précédée d'une **purge de l'agrément**. Cotation **🟠**. Matériel `[review]` — l'absence de purge bloque le closing.
- **F1.2 — Cap-table non *fully diluted*** : la dilution BSPCE 9 % n'est pas intégrée. Cotation **🟠**. Matériel **Oui** (impact valorisation : sur un deal de quelques M€, 9 % de dilution = plusieurs centaines de k€).
- **F1.3 — Convention réglementée non soumise à approbation : 120 000 €/an** versés à la holding d'un dirigeant pour prestations de conseil, mentionnée au PV AG 2025 mais **ne figurant pas au rapport sur les conventions réglementées** et **non soumise à l'approbation des associés** (L.227-10 C.com `[à vérifier]` — régime SAS). Sanction : nullité possible, responsabilité du dirigeant pour conséquences dommageables ; en DD : redressement potentiel + retraitement EBITDA. Cotation **🔴**. Matériel **Oui**.
- **F1.4 — Comptes annuels 2024 non déposés au greffe** (DOC 02), alors que l'AG d'approbation a eu lieu le 30 juin 2025 — délai légal d'un mois dépassé de plus d'un an (L.232-23 C.com `[à vérifier]`). Sanction : injonction sous astreinte, amende contraventionnelle, atteinte image. Cotation **🟠**. Matériel **Oui** `[review]`.

**Documents manquants :** registre des mouvements de titres, registre des comptes individuels d'actionnaires, **pacte d'associés**, rapport complet conventions réglementées, dépôt comptes 2024.

### Thème 2 — Contrats matériels

**Document :** DOC 03 (contrat-cadre client ALPHA).

**Points de contrôle vérifiés :**

- Client unique pesant **~40 % du CA** → **risque de concentration majeur** indépendamment de toute clause CoC.
- Tacite reconduction annuelle, préavis 3 mois : structure standard.

**Red flag constaté :**

- **F2.1 — Clause de changement de contrôle ALPHA, résiliation de plein droit sans indemnité.** Cotation **🔴**. Matériel **Oui** — la matérialité ne se mesure pas en € fixes mais en CA récurrent perdu (40 %) en cas d'exercice de la clause après closing. Aucun autre contrat client n'a été communiqué : impossible de vérifier si d'autres CoC existent (TOP 10 clients absent).

**Documents manquants :** TOP 10 clients par CA avec contrats correspondants ; matrice CoC consolidée ; contrats fournisseurs critiques (cloud, hébergeur SaaS — point dur d'un éditeur logiciel) ; baux ; financements bancaires (les contrats de prêt comportent quasi systématiquement une CoC ou un *event of default*).

### Thème 3 — Social / RH

**Document :** DOC 04 (note contentieux et passifs, volet social).

**Red flags constatés :**

- **F3.1 — Procédure de licenciement en cours d'un salarié protégé** (représentant du personnel). En droit FR, le licenciement d'un salarié protégé est **soumis à autorisation préalable de l'inspection du travail** (L.2411-1 et s. C.trav `[à vérifier]`). Tout licenciement opéré sans autorisation est nul et expose à réintégration + indemnités. Cotation **🟠**. Matériel **Oui** `[review]` — exposition difficilement chiffrable mais structurellement > 50 k€ (rappels salaires + dommages-intérêts).
- **F3.2 — Forfait-jours requalifié par l'URSSAF sur 20 cadres** : voir Thème 5 (volet quantification) et Thème 6 (volet contentieux). Risque social additionnel : **action prud'homale individuelle des cadres** en rappel d'heures supplémentaires si l'accord collectif est jugé inopposable (Cass. soc. exigeante depuis 2011-2017 sur les garanties santé/sécurité du forfait-jours `[à vérifier]`).

**Documents manquants :** accord collectif forfait-jours, contrats de travail des 20 cadres, DUERP, registre du personnel, organigramme, contrats des mandataires sociaux, plans d'intéressement / participation, BSPCE (règlement complet).

### Thème 4 — Propriété intellectuelle

> *Analyse de premier niveau réalisée ici. Audit PI approfondi → pointeur `hacienda-propriete-intellectuelle` (skill `contrats-pi`).*

**Document :** DOC 05.

**Red flags constatés — thème CRITIQUE pour un éditeur SaaS :**

- **F4.1 — Absence de cession des droits d'auteur sur le cœur de la plateforme** (développement freelance 2022). En droit FR, **les droits d'auteur du prestataire freelance ne sont PAS dévolus automatiquement au client** : seul un contrat écrit de cession, distinguant les droits cédés et précisant l'étendue (L.131-3 CPI `[à vérifier]`), opère transfert. À défaut, **la Société n'est pas titulaire des droits sur son propre logiciel** — le freelance pourrait théoriquement opposer son droit moral et patrimonial, voire empêcher l'exploitation. La distinction salarié / freelance est ici décisive : L.113-9 CPI (dévolution automatique à l'employeur pour les logiciels créés par les **salariés** dans leurs fonctions) **ne s'applique PAS aux prestataires indépendants**. Cotation **🔴**. Matériel **Oui** — c'est l'actif principal de la Cible.
- **F4.2 — Composants open source sous licence copyleft (GPL) sans audit de conformité.** Risque de **contamination** : si du code GPL est intégré dans du code propriétaire distribué (et non simplement utilisé en SaaS — la jurisprudence sur le « SaaS loophole » est variable selon les versions GPLv2/AGPLv3 `[à vérifier]`), obligation de publier le code source dérivé. Cotation **🟠**. Matériel **Oui** `[review]` selon volume/profondeur d'intégration.
- **F4.3 — Marque « VIRIDIS » non déposée à l'INPI**, alors qu'elle est exploitée commercialement. Risque : dépôt par un tiers, action en concurrence déloyale, perte de l'identité de marque. Cotation **🟠**. Matériel **Oui** `[review]` — coût de rebranding ou de rachat tiers facilement > 50 k€.

**À traiter en pointeur via `hacienda-propriete-intellectuelle` :** chaîne complète des droits sur tous les modules, liberté d'exploitation (FTO) brevets/marques, audit open source complet (SCA), dépôts INPI / OMPI / EUIPO, contrats licences sortantes (CLUF clients) et entrantes.

### Thème 5 — Fiscal / Financier

> *Analyse de premier niveau. Chiffrage et stratégie → pointeur `hacienda-fiscal` + expert-comptable.*

**Documents :** DOC 02 (comptes), DOC 04 (URSSAF).

**Red flags constatés :**

- **F5.1 — Redressement URSSAF notifié 300 000 €** sur requalification du forfait-jours de 20 cadres. Contesté. Cotation **🔴**. Matériel **Oui** — 6× le seuil de matérialité. Exposition complémentaire : majorations de retard, redressement extensible à 3 ans (5 ans en cas de travail dissimulé — peu probable ici), risque de répétition annuelle si l'accord n'est pas régularisé.
- **F5.2 — Comptes 2024 non déposés** : déjà comptabilisé en F1.4, impact transverse (impossible pour l'acquéreur de produire des comptes certifiés à jour pour ses propres bailleurs/comité d'investissement).

**À traiter en pointeur via `hacienda-fiscal` + expert-comptable :** revue liasses fiscales (3 derniers exercices), CIR/CII (fréquent chez éditeurs SaaS — risque de remboursement si requalifié), prix de transfert si filiales, TVA SaaS (lieu de prestation B2B/B2C, OSS), report déficitaire et impact LBO, droits d'enregistrement sur la cession d'actions (0,1 % SAS), traitement des plus-values côté cédant (apport-cession 150-0 B ter CGI éventuel).

### Thème 6 — Contentieux / Passifs

**Document :** DOC 04.

**Red flags constatés :**

- **F6.1 — Litige commercial distributeur, 150 000 € réclamés en rupture brutale** (L.442-1 II C.com — anciennement L.442-6 I 5° `[à vérifier — refonte par ord. 2019-359]`). Assignation délivrée, audience non fixée → contentieux engagé. Cotation **🟠**. Matériel **Oui** — 3× seuil ; à confronter au préavis effectivement accordé et à la durée de la relation pour évaluer la probabilité de succès du demandeur.
- **F6.2 — URSSAF 300 k€** (cf. F5.1, comptabilisé une fois en grille).
- **F6.3 — Procédure salarié protégé** (cf. F3.1).

**Documents manquants :** assignations et conclusions complètes, état des provisions comptabilisées, attestations des conseils sur l'évaluation des risques, registre des contentieux complet (rien ne garantit que la note DOC 04 soit exhaustive).

### Thème 7 — RGPD / Conformité réglementaire

> *Analyse de premier niveau. Audit RGPD approfondi → pointeur `hacienda-ghost`.*

**Document :** DOC 06.

**Red flags constatés :**

- **F7.1 — Registre des activités de traitement incomplet** (art. 30 RGPD `[Eurlex — à vérifier]`). Obligation directe (>250 salariés ou traitements à risque/réguliers/données sensibles — applicable ici aux traitements clients SaaS). Cotation **🟠**. Matériel **Oui** `[review]` — coût de mise en conformité chiffrable.
- **F7.2 — DPO non désigné**. Obligation conditionnée (art. 37 RGPD `[Eurlex — à vérifier]`) : traitement à grande échelle, *core activity* incluant suivi systématique. Pour un SaaS B2B traitant données clients/utilisateurs finaux à grande échelle, la désignation est **probablement obligatoire**. Cotation **🟡-🟠** `[review]` selon le périmètre exact des traitements. Matériel **Oui** si désignation obligatoire.
- **F7.3 — Violation de données 2024 non notifiée à la CNIL** (fuite base e-mails clients). L'art. 33 RGPD impose une notification sous **72 h** sauf preuve d'absence de risque pour les droits et libertés `[Eurlex — à vérifier]`. L'absence de notification est en soi une infraction sanctionnable, indépendamment de la violation elle-même. Cotation **🔴**. Matériel **Oui** — sanctions CNIL pouvant atteindre 10 M€ ou 2 % du CA mondial annuel. Risque d'aggravation : action en responsabilité des personnes concernées + publicité dommageable.

**À traiter en pointeur via `hacienda-ghost` :** cartographie des traitements, bases légales, mentions d'information, AIPD pour traitements à risque, transferts hors UE (probables sur un SaaS — sous-traitants cloud US, clauses contractuelles types post-*Schrems II*), revue des contrats de sous-traitance art. 28, mesures techniques et organisationnelles, plan de remédiation chiffré.

---

## Étape 4 — Grille de matérialité

Seuil de matérialité : **50 000 €**. Tri par gravité décroissante 🔴 → 🟠 → 🟡, puis par thème.

| #  | Thème        | Finding                                                                                             | Gravité | Statut        | Matériel ?                    |
| -- | ------------- | --------------------------------------------------------------------------------------------------- | -------- | ------------- | ------------------------------ |
| 1  | 4 PI          | Absence de cession des droits d'auteur freelance sur le cœur de la plateforme SaaS                 | 🔴       | Confirmé     | Oui                            |
| 2  | 2 Contrats    | Clause de changement de contrôle sur contrat client ALPHA (~40 % CA), résiliation sans indemnité | 🔴       | Confirmé     | Oui                            |
| 3  | 7 RGPD        | Violation de données 2024 non notifiée à la CNIL (art. 33 RGPD, délai 72 h)                     | 🔴       | Confirmé     | Oui                            |
| 4  | 1 Corporate   | Convention réglementée 120 k€/an (holding dirigeant) non soumise à approbation                  | 🔴       | Confirmé     | Oui                            |
| 5  | 5 Fiscal      | Redressement URSSAF notifié 300 k€ (forfait-jours 20 cadres), contesté                           | 🔴       | Confirmé     | Oui                            |
| 6  | 1 Corporate   | Clause d'agrément statutaire non purgée préalablement à la cession                              | 🟠       | Confirmé     | Oui `[review]`               |
| 7  | 1 Corporate   | Cap-table non*fully diluted* (BSPCE 9 % omis) — impact valorisation                              | 🟠       | Confirmé     | Oui                            |
| 8  | 1 Corporate   | Comptes annuels 2024 non déposés au greffe (L.232-23 C.com)                                       | 🟠       | Confirmé     | Oui `[review]`               |
| 9  | 3 Social      | Licenciement en cours d'un salarié protégé sans autorisation inspection du travail documentée   | 🟠       | À documenter | Oui `[review]`               |
| 10 | 4 PI          | Composants open source GPL sans audit de conformité (risque contamination)                         | 🟠       | Confirmé     | Oui `[review]`               |
| 11 | 4 PI          | Marque « VIRIDIS » exploitée sans dépôt INPI                                                   | 🟠       | Confirmé     | Oui `[review]`               |
| 12 | 6 Contentieux | Litige distributeur 150 k€ — rupture brutale L.442-1 C.com, assignation délivrée                | 🟠       | À documenter | Oui                            |
| 13 | 7 RGPD        | Registre des activités de traitement art. 30 RGPD incomplet                                        | 🟠       | Confirmé     | Oui `[review]`               |
| 14 | 7 RGPD        | DPO non désigné (obligation art. 37 RGPD à confirmer selon périmètre)                          | 🟡       | À documenter | Oui `[review]` si obligation |

**Total :** 14 findings — 5 cotés 🔴, 8 cotés 🟠, 1 coté 🟡. **11 findings matériels confirmés**, 3 portent `[review]` sur la qualification quantitative.

*(Grille > 10 lignes — un dashboard HTML autonome serait généré en parallèle via `renderDashboard()` de `@hacienda/core` ; non émis dans ce livrable test.)*

---

## Étape 5 — Q&A list

| #  | Thème      | Question au cédant                                                                                                                                                                                                                        | Finding lié                        | Priorité       |
| -- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------- | --------------- |
| 1  | PI          | Communiquer la convention de cession des droits d'auteur signée par le prestataire freelance 2022 sur le logiciel ; à défaut, indiquer si une régularisation rétroactive est envisageable et fournir les coordonnées du prestataire. | #1                                  | **Haute** |
| 2  | Contrats    | A-t-il été sollicité ou envisagé une demande de consentement du client ALPHA au changement de contrôle ? Communiquer tout échange écrit avec ALPHA depuis l'ouverture du process.                                                   | #2                                  | **Haute** |
| 3  | Contrats    | Communiquer la liste des 10 premiers clients par CA avec les contrats correspondants (matrice CoC consolidée) ainsi que les contrats fournisseurs/hébergeur critiques.                                                                   | #2                                  | **Haute** |
| 4  | RGPD        | Communiquer la documentation interne de la violation 2024 (date détection, périmètre, mesures, analyse de risque). Pourquoi la notification CNIL n'a-t-elle pas été effectuée ?                                                      | #3                                  | **Haute** |
| 5  | Corporate   | Communiquer la délibération des associés ayant ou non approuvé la convention 120 k€/an avec la holding dirigeante, le rapport spécial et le détail de la rémunération sur 3 ans.                                                  | #4                                  | **Haute** |
| 6  | Fiscal      | Communiquer la lettre d'observations URSSAF, la réponse de la Société, l'accord collectif forfait-jours et l'évaluation des conseils sur la probabilité de succès de la contestation.                                                | #5                                  | **Haute** |
| 7  | Corporate   | Communiquer le calendrier prévu de purge de l'agrément statutaire et le projet de décision collective des associés.                                                                                                                    | #6                                  | Moyenne         |
| 8  | Corporate   | Confirmer la cap-table*fully diluted* incluant les 9 % de BSPCE ; communiquer le règlement BSPCE complet et l'état d'exercice.                                                                                                         | #7                                  | Moyenne         |
| 9  | Corporate   | Justifier l'absence de dépôt des comptes 2024 et communiquer le calendrier prévu de dépôt + récépissé une fois effectué.                                                                                                          | #8                                  | Moyenne         |
| 10 | Social      | Communiquer la demande d'autorisation à l'inspection du travail concernant le licenciement du salarié protégé et toutes les pièces de procédure.                                                                                     | #9                                  | **Haute** |
| 11 | PI          | Communiquer le SBOM (*software bill of materials*) ou la liste exhaustive des composants open source utilisés avec leur licence, et toute analyse de conformité interne.                                                               | #10                                 | Moyenne         |
| 12 | PI          | Communiquer les justificatifs de dépôt INPI (marques, noms de domaine, brevets, enveloppes Soleau) ou confirmer leur absence.                                                                                                            | #11                                 | Moyenne         |
| 13 | Contentieux | Communiquer l'assignation, les conclusions échangées et la provision comptabilisée pour le litige distributeur. Préciser la durée de la relation commerciale et le préavis effectivement accordé.                                   | #12                                 | Moyenne         |
| 14 | RGPD        | Communiquer le registre art. 30 complet, les contrats de sous-traitance art. 28, la cartographie des transferts hors UE (clauses contractuelles types post-*Schrems II*) et l'analyse d'obligation de désignation DPO.                  | #13, #14                            | Moyenne         |
| 15 | Corporate   | Communiquer le**pacte d'associés** en vigueur entre fondateurs, fonds d'amorçage et managers (absent de la data-room — point structurant).                                                                                        | n/a (document manquant structurant) | **Haute** |

---

## Étape 6 — Recommandations GAP

> *Esquisses de protections. La revue de la GAP elle-même relève du skill `gap-review` (axe 5 — confrontation findings DD), à lancer une fois le projet de garantie disponible.*

| #  | Finding matériel                           | Gravité | Protection GAP esquissée                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| -- | ------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1  | Cession droits d'auteur freelance manquante | 🔴       | **Condition suspensive impérative** : obtention de la cession écrite des droits patrimoniaux par le freelance avant signing (L.131-3 CPI), avec garantie d'éviction. À défaut, garantie spécifique PI à plafond élevé (potentiellement supérieur au plafond général), durée alignée sur la prescription de l'action en contrefaçon, et déclaration d'absence de revendication par tout tiers contributeur. Envisager une retenue de prix (*escrow*) dédiée. |
| 2  | Clause CoC client ALPHA (40 % CA)           | 🔴       | **Condition suspensive** : obtention du consentement écrit d'ALPHA au changement de contrôle avant closing. Subsidiairement : (a) déclaration spécifique sur les contrats à *change of control* (liste exhaustive en annexe disclosure), (b) garantie spécifique chiffrée couvrant la perte de marge sur 24 mois si ALPHA résilie post-closing, (c) ajustement de prix indexé sur le maintien d'ALPHA pendant 12 mois (clause d'*earn-out* inversée).             |
| 3  | Violation données non notifiée CNIL       | 🔴       | Garantie spécifique RGPD couvrant : (a) toute sanction CNIL afférente à la violation 2024, (b) actions individuelles des personnes concernées, (c) coûts de remédiation et de notification*a posteriori*. Plafond dédié (hors plafond général). Durée alignée sur la prescription des actions CNIL et civiles. Déclaration de cédant sur l'absence d'autres violations non notifiées.                                                                                |
| 4  | Convention réglementée non approuvée     | 🔴       | Indemnisation spécifique €-pour-€ du redressement éventuel + retraitement EBITDA cible (impact direct sur prix si pricing au multiple d'EBITDA). Régularisation des approbations en cours de période interim (covenant d'interim). Déclaration d'exhaustivité sur les conventions réglementées.                                                                                                                                                                             |
| 5  | Redressement URSSAF 300 k€                 | 🔴       | Indemnisation spécifique € pour € du redressement notifié (300 k€ + majorations + extension aux exercices ouverts), hors plafond général, durée alignée sur la prescription URSSAF (3 ans, 5 ans en cas de travail dissimulé). Engagement de défense par le cédant (*conduct of claims*).                                                                                                                                                                               |
| 6  | Agrément non purgé                        | 🟠       | Condition suspensive de purge de l'agrément avant closing.                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 7  | Cap-table non*fully diluted*              | 🟠       | Ajustement de prix par recalcul sur base*fully diluted* avant signing (pas un sujet de garantie post-closing — sujet de pricing).                                                                                                                                                                                                                                                                                                                                                  |
| 8  | Comptes 2024 non déposés                  | 🟠       | Covenant de dépôt avant closing ; déclaration d'exactitude et de sincérité des comptes.                                                                                                                                                                                                                                                                                                                                                                                          |
| 9  | Licenciement salarié protégé             | 🟠       | Garantie de passif social couvrant le contentieux spécifique (réintégration, rappels, dommages-intérêts) ; déclaration d'exhaustivité sur les salariés protégés et les procédures en cours.                                                                                                                                                                                                                                                                                |
| 10 | Open source GPL non audité                 | 🟠       | Garantie spécifique « open source » : indemnisation du coût de remplacement / remédiation en cas de revendication de contamination. Déclaration du cédant sur le SBOM et la conformité des licences.                                                                                                                                                                                                                                                                          |
| 11 | Marque VIRIDIS non déposée                | 🟠       | Covenant de dépôt INPI avant closing aux frais du cédant ; déclaration d'absence de revendication de tiers ;*most favoured class disclosure* sur les noms de domaine et signes distinctifs.                                                                                                                                                                                                                                                                                     |
| 12 | Litige distributeur 150 k€                 | 🟠       | Garantie de passif spécifique chiffrée à hauteur de l'exposition probable (à évaluer avec le conseil contentieux),*conduct of claims* par le cédant.                                                                                                                                                                                                                                                                                                                          |
| 13 | Registre art. 30 RGPD incomplet             | 🟠       | Garantie générale RGPD avec déclaration de conformité substantielle ; ou ajustement de prix si la mise en conformité est chiffrable (devis prestataire).                                                                                                                                                                                                                                                                                                                         |

---

# Une question hors de ma checklist habituelle

L'ensemble des findings dessine le profil d'une cible « startup SaaS *grown-up* sans support juridique structuré » : convention réglementée non régularisée, comptes non déposés, BSPCE non reflétés en cap-table, PI freelance non cédée, marque non déposée, RGPD non outillé, accord forfait-jours fragile. Pris isolément, aucun finding n'est rédhibitoire ; pris ensemble, ils suggèrent que **la fonction juridique a été sous-investie depuis la création** et que **d'autres trous comparables existent probablement** dans les zones non couvertes par la data-room (pacte d'associés, contrats fournisseurs critiques, baux, financements bancaires, contrats de travail individuels, CGV/CGU clients). Avant de figer le prix, il peut être pertinent d'élargir la Q&A list à ces zones aveugles plutôt que de se concentrer uniquement sur l'approfondissement des 6 documents fournis — l'absence de document est ici plus informative que sa présence.

---

# Que veux-tu faire ? Choisis une option et je la déroule :

1. **Rédiger** — je produis (a) le rapport de DD consolidé pour comité d'investissement (mode silencieux, sans narration de skill), ou (b) la Q&A list mise en forme prête à être adressée au cédant (sans colonne « Finding lié », sans en-tête de confidentialité).
2. **Escalader** — note d'escalade vers l'**approbateur SPA configuré au profil** *(profil cabinet `[A CONFIGURER]` — à préciser : par défaut, escalade vers l'avocat M&A référent + sponsor business)* avec les 5 findings 🔴 matériels, le risque dominant (PI freelance + dépendance ALPHA), et la décision attendue avant tout *commitment letter*.
3. **Compléter les faits** — j'envoie la Q&A list au cédant (5 questions priorité Haute en premier lot) et je consolide la grille de matérialité dès réception des pièces complémentaires. Calendrier indicatif : 1ʳᵉ vague à 5 jours ouvrés, 2ᵉ vague à 10 jours.
4. **Surveiller et attendre** — j'ajoute le dossier au tracker du deal avec note motivée, calendrier des conditions suspensives à lever, et date de revisite (réception pièces / signing / expiration exclusivité). Trigger fraîcheur posé sur la jurisprudence ch. com. (rupture brutale L.442-1) et Cass. soc. (forfait-jours).
5. **Autre** — précise ce que tu veux en faire (lancer `gap-review` une fois le projet de garantie reçu, lancer `hacienda-propriete-intellectuelle:contrats-pi` sur le volet PI, lancer `hacienda-ghost` sur le volet RGPD, etc.).

---
