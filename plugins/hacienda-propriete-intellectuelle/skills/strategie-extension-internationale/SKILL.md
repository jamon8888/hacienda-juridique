---
name: strategie-extension-internationale
description: >
  Arbre décisionnel d'extension internationale d'un dépôt brevet : FR national /
  EP via OEB (CBE) / PCT international (WIPO). Calcule coûts indicatifs (2026),
  délais, fenêtre de priorité (Convention Union de Paris, 12 mois brevets),
  recommandations par marché cible et secteur. Conçu pour décision à 6-12 mois
  post-dépôt FR initial. NE dépose PAS — décision et démarche EP/PCT restent au
  mandataire en brevets (EQE) ou avocat spécialisé.
argument-hint: "[num brevet FR initial | marchés cibles | budget budget annuel]"
---

# /strategie-extension-internationale

**Décision stratégique ≠ démarche officielle.** Ce skill aide à la **décision
d'extension** d'un brevet à l'étranger (EP via OEB, PCT via WIPO, voies
nationales). Il NE dépose PAS les demandes EP ou PCT (= mandataire en brevets
EQE), NE paye PAS les taxes, NE traduit PAS les revendications (étape critique
post-délivrance EP — **traduction certifiée requise pour validation par pays**
sauf Accord de Londres pour FR/DE/GB qui acceptent FR/EN/DE). **La fenêtre de
12 mois post-dépôt FR initial (Convention Union de Paris, Art. 4) est ferme**
— manquer cette fenêtre = perte de la revendication de priorité = chaque dépôt
ultérieur devient potentiellement antériorité contre le brevet FR initial.

## Examples

```
/hacienda-propriete-intellectuelle:strategie-extension-internationale "FR2700123"
```

```
/hacienda-propriete-intellectuelle:strategie-extension-internationale "FR2700123 — marchés UE + US + Chine"
```

```
/hacienda-propriete-intellectuelle:strategie-extension-internationale "FR2700123 — budget 50k€ extension + 100k€ annuités 10 ans"
```

(Sans argument, le skill demandera le numéro de brevet FR initial, la date de
dépôt FR pour calculer la fenêtre 12 mois Union de Paris, les marchés cibles,
le budget extension et la posture maintenance.)

---

## DÉCISION STRATÉGIQUE, PAS DÉMARCHE OFFICIELLE

**Reformuler en tête de chaque output. Ne jamais l'enlever. Ne jamais l'adoucir.**

> **Décision stratégique, pas démarche officielle.** Cette analyse est une
> aide à la **décision d'extension internationale** d'un brevet FR initial :
> rester en FR seul, étendre via la voie EP (OEB / Convention sur le Brevet
> Européen — 38 pays), étendre via la voie PCT (WIPO / Patent Cooperation
> Treaty — 156+ pays), ou une voie hybride. Elle propose une recommandation
> calibrée sur les marchés cibles, le budget disponible et la posture
> maintenance. Elle NE dépose PAS la demande EP ou PCT — la démarche formelle
> auprès de l'OEB ou de l'OMPI est l'acte d'un **mandataire en brevets
> qualifié EQE** (Examen Européen de Qualification) ou d'un avocat
> spécialisé. Elle NE paye PAS les taxes (~2 000€ EP, ~3 500€ PCT, plus
> validations / entrées nationales par pays). Elle NE traduit PAS les
> revendications — étape critique post-délivrance EP où la **traduction
> certifiée est obligatoire pour validation par pays** (sauf Accord de
> Londres pour FR/DE/GB qui acceptent FR/EN/DE). **La fenêtre de 12 mois
> post-dépôt FR initial (Convention Union de Paris, Art. 4) est ferme** :
> au-delà, la revendication de priorité est perdue, et chaque dépôt
> ultérieur devient potentiellement antériorité contre le brevet FR initial
> lui-même. Ce skill propose ; le mandataire EQE décide, dépose et défend.

C'est le garde-fou le plus visible du skill. Une décision d'extension prise
sans validation mandataire = porte à sens unique (fenêtre priorité expirée
sans rattrapage possible, ou validations EP surdimensionnées difficiles à
abandonner sans perte sèche). Sur-flagger = porte à 2 sens, le mandataire
élague. Rester sur la porte à 2 sens.

---

## Charger le profil pratique avant de commencer

Avant tout, lire :
1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Récupérer :
- **Rôle** depuis `## 1. Profil cabinet et profil de pratique PI` (avocat
  inscrit / mandataire en brevets EQE / juriste interne / non-juriste — change
  l'en-tête confidentialité ET active le gate non-juriste si applicable).
- **Juridictions et offices d'inscription** (INPI, OEB, OMPI/PCT) → défaut
  voies d'extension envisagées si l'utilisateur n'en spécifie pas.
- **Mandataire en brevets associé** depuis `## Brevets` (interne / externe /
  N/A) → destinataire par défaut du brief de gate non-juriste.
- **Posture extension** (à inférer depuis posture FTO + posture refus INPI/OEB) :
  - **Systématique** : étendre par défaut FR + EP minimal + PCT si budget,
    portefeuille défensif global.
  - **Sélective** (défaut) : analyser cas par cas selon valeur commerciale
    estimée, marchés cibles, budget famille brevet.
  - **Défensive** : étendre uniquement si concurrent identifié sur marché
    précis, sinon FR seul ou abandon programmé.
- **Budget annuel R&D / PI cabinet** depuis `company-profile.md` ou volume
  estimé portefeuille → calibre l'enveloppe extension proposée.
- **Marchés stratégiques principaux** (FR / EU / US / Asie / mondial) →
  pondère les recommandations par voie.
- **Partenaire annuités** depuis `## Brevets` (cabinet tiers / logiciel
  annuités / interne) → mentionné en checklist post-décision.

**Mode provisoire** quand le profil contient `[A CONFIGURER]` : utiliser des
défauts conservateurs (rôle = avocat inscrit, posture = mesurée / sélective,
marchés = EU + US par défaut, budget = non communiqué — demander), produire
l'analyse en taguant `[non configuré — défauts appliqués]` et suggérer en pied
d'output : « Pour calibrer cette analyse à ta pratique, lance
`/hacienda-propriete-intellectuelle:entretien-demarrage`. »

---

## Intake — un seul batch de 5 questions

Demander **en une seule passe** (pas de ping-pong question par question), puis
analyser. Si l'utilisateur a déjà fourni des éléments dans la commande,
sauter les questions correspondantes et confirmer brièvement les valeurs
captées.

### Question 1 — Numéro brevet FR initial

Demander le numéro de publication ou de demande FR (format `FR2700123` ou
`FR1234567A1`). Avec ce numéro :

- Déclencher `inpi_brevet_details` (outil MCP `hacienda-sources-officielles`)
  pour récupérer : titre, déposant(s), inventeur(s), date de dépôt, date de
  priorité, date de publication, statut (demande / publié / délivré /
  abandonné), classification CIB principale.
- Si l'outil n'est pas disponible ou retourne vide : demander à l'utilisateur
  de coller les éléments-clés (date dépôt, statut, déposant) et taguer
  `[utilisateur fourni]` pour la suite.
- Si le brevet est déjà délivré et > 12 mois : la fenêtre Union de Paris est
  expirée. Le signaler immédiatement (sévérité 🟢 — extension toujours
  possible mais sans bénéfice priorité, donc avec risque antériorité du
  brevet FR initial contre lui-même dans les juridictions étrangères).

### Question 2 — Date dépôt FR (calcul fenêtre 12 mois Union de Paris)

À partir de la date de dépôt FR initial (récupérée via `inpi_brevet_details`
ou fournie par l'utilisateur), calculer **automatiquement** le nombre de
jours restants avant expiration de la fenêtre de priorité de 12 mois
(Convention de Paris pour la protection de la propriété industrielle, Art. 4).

Coter la sévérité :

- 🔴 **URGENT** : < 60 jours restants avant expiration priorité.
  → Escalation immédiate vers mandataire EQE **avant analyse complète**.
  Le skill propose une analyse rapide (1 page) et un brief mandataire
  prioritaire. Délai de préparation EP/PCT : 30-60 jours minimum incluant
  rédaction adaptée, traduction EN/DE si EP, validation cabinet.
- 🟠 **À préparer ce trimestre** : 60-180 jours restants. Décision et brief
  mandataire à boucler dans les 30 jours, dépôt EP/PCT à programmer 30 jours
  avant butoir.
- 🟡 **Planifier** : > 180 jours restants. Étude approfondie possible
  (étude marché, business case, validation budget Direction).
- 🟢 **Priorité expirée** : ≥ 12 mois depuis dépôt FR initial. Extension
  toujours possible mais SANS bénéfice de priorité — chaque dépôt EP/PCT
  ultérieur devient potentiellement opposable au brevet FR initial dans la
  juridiction visée (auto-antériorité). Signaler le risque et orienter vers
  mandataire pour stratégie de continuation ou de divisionnaire si pertinent.

### Question 3 — Marchés cibles

Demander les pays ou zones visées :

- **UE seul** (marché européen exclusif) → orienter vers Voie B (EP)
- **UE + US** (marché transatlantique classique) → Voie B + entrée US, ou
  Voie C (PCT pour gel décision)
- **UE + Asie** (marché EU + croissance Asie-Pacifique) → Voie C (PCT)
  prioritaire
- **Mondial** (couverture maximale) → Voie C (PCT) avec phase nationale large
- **Ciblage spécifique** : liste explicite de pays (ex. FR + DE + UK + US +
  CN + JP) → analyse hybride

### Question 4 — Budget extension

Demander l'enveloppe totale envisagée pour les 12 prochains mois (dépôts +
taxes initiales) ET pour les 10 prochaines années (annuités cumulées).
Estimations indicatives 2026 pour calibrer la conversation :

- **~7 000€** : FR seul, 10 ans annuités cumulées
- **~50 000€** : FR + EP avec 5 validations EU stratégiques (FR/DE/UK/IT/ES)
- **~150 000€** : FR + EP large 15 validations EU
- **~250 000€+** : FR + PCT avec 15 entrées nationales mondial

Si l'utilisateur ne sait pas : proposer une fourchette par voie et demander
quelle fourchette est compatible avec le budget cabinet.

### Question 5 — Posture maintenance annuités

Trois postures principales :

- **Annuités systématiques** : maintenir le brevet jusqu'à expiration 20 ans
  dans tous les pays validés. Posture défense long terme, portefeuille
  stratégique. Coût élevé mais valeur certaine.
- **Abandon programmé à 5 ans si non-commercialisation** : décision de
  maintien réévaluée à mi-vie selon usage commercial réel (chiffre
  d'affaires, licensing, contentieux). Posture économique, risque
  d'abandon de brevet potentiellement valorisable plus tard.
- **Mixte par pays** : maintien annuités dans pays cœur (FR/DE/US), abandon
  programmé sur pays secondaires si non-commercialisation à 5 ans. Posture
  équilibrée, gestion fine portefeuille.

---

### Si fenêtre < 60 jours → escalation immédiate avant analyse complète

Si la sévérité ressort 🔴 URGENT :

- Produire un mini-rapport (1 page) avec : brevet FR initial, date butoir
  exacte priorité, voies envisageables compte tenu du délai (privilégier EP
  direct ou PCT — PCT peut être déposé jusqu'au dernier jour de la fenêtre
  pour préserver la priorité, gel ensuite 30 mois pour décider EP).
- Brief mandataire EQE prioritaire à apporter dans la semaine.
- NE PAS dérouler l'analyse complète arbre 3 voies — le temps de la
  délibération business n'est plus compatible avec la préparation
  matérielle d'un dépôt EP/PCT (30-60 jours minimum).
- Si l'utilisateur insiste pour l'analyse complète : produire l'analyse
  taguée `[FENÊTRE PRIORITÉ CRITIQUE — décision mandataire prioritaire]` en
  tête de document.

---

## Arbre décisionnel — 3 voies principales

Une fois l'intake complété, dérouler l'analyse des 3 voies en explicitant
**coûts, marchés, avantages, inconvénients, recommandé si**. Adapter le
verdict de pertinence pour chaque voie au profil cabinet et aux marchés
cibles déclarés.

### Voie A — FR national seul (rester en FR)

- **Marché couvert** : France uniquement.
- **Coût dépôt initial** : ~38€ taxe dépôt INPI + ~520€ rapport de recherche
  préliminaire = ~560€ TTC.
- **Annuités progressives 10 ans** : ~38€ (an 2) → ~250€ (an 10), cumul
  ~1 500€ sur 10 ans.
- **Annuités progressives 20 ans** : ~810€ (an 20) — cumul total ~7 500€
  sur la durée maximale de protection.
- **Délai protection** : 18-36 mois examen INPI (variable selon backlog
  technique CIB).
- **Avantages** :
  - Économique (1 ordre de grandeur sous EP, 2 sous PCT).
  - Procédure simple, langue française, mandataire FR sans coordination
    multi-juridictions.
  - Examen relativement court, pas de procédure d'opposition INPI brevets
    (vs marques) — opposition limitée à action en nullité TJ Paris L.615-1.
- **Inconvénients** :
  - Aucune protection EU / US / international ; concurrents libres à
    l'étranger pour fabriquer et vendre l'invention.
  - Pas de bénéfice marketing / investisseurs « brevet européen » ou
    « famille internationale » (signal valorisation négatif en levée de
    fonds série A+).
  - Risque concurrent : un acteur étranger peut déposer une variante dans
    son pays sans contrainte (sauf si publication FR antérieure documentée).
- **Recommandé si** :
  - Invention purement nationale (filière agroalimentaire / terroir, marché
    local, service réglementé FR-spécifique).
  - Budget serré (< 10k€ enveloppe brevets).
  - Marché FR exclusif sans ambition internationale court / moyen terme.
  - Mode licensing FR uniquement (signal de marquage de marché national).

### Voie B — Extension EP (Brevet européen via OEB)

- **Marché couvert** : 38 États parties à la CBE (UE 27 + Royaume-Uni +
  Suisse + Norvège + Turquie + Liechtenstein + Monaco + autres). **Le Brexit
  n'a PAS affecté l'adhésion UK à la CBE** (la CBE n'est pas un instrument
  UE — UK reste membre).
- **Délai d'extension** : **12 mois post-FR initial** (Convention Union de
  Paris, Art. 4 — fenêtre ferme).
- **Coût dépôt EP** : ~120€ taxe dépôt + ~1 300€ examen + ~600€ recherche =
  ~2 000€ taxes officielles OEB. Frais mandataire : ~5-15k€ HT cabinet
  parisien selon complexité.
- **Coût annuités EP pré-délivrance** : ~510€/an dès la 3e année (gel des
  coûts pré-délivrance — annuité unique OEB indépendamment des pays
  désignés).
- **Validation post-délivrance** : choix des pays à valider — **traduction
  des revendications obligatoire** dans la langue du pays sauf **Accord de
  Londres** (FR/DE/GB acceptent FR/EN/DE sans traduction supplémentaire des
  revendications).
- **Coût validation par pays** : ~600-1 500€ selon pays (taxe nationale +
  mandataire local + traduction certifiée si hors Accord Londres).
- **Annuités nationales post-validation** : variable par pays (~150-600€/an
  chacun, croissance progressive).
- **Exemple** : EP délivré en 2030 avec 5 validations stratégiques
  (FR/DE/UK/IT/ES) = ~5 000€ validations + ~2 000€/an annuités cumulées
  post-validation = ~25 000€ sur 10 ans post-délivrance.
- **Avantages** :
  - Couverture EU large d'un seul dépôt et examen unique OEB (qualité
    examen + cohérence revendications).
  - Choix flexible des pays post-délivrance (pas besoin de figer la liste
    au dépôt — décision après examen, ~3-5 ans plus tard).
  - Signal valorisation fort (« brevet européen délivré » = standard
    marché ETI / multinationale).
- **Inconvénients** :
  - Coût significatif (5-15× FR seul selon nombre de validations).
  - Examen long (3-5 ans en moyenne, parfois plus selon CIB).
  - Procédure d'opposition OEB possible 9 mois post-délivrance par tout
    tiers — risque révocation centralisée pour les 38 pays d'un coup.
  - Annuités EP pré-délivrance + annuités nationales post-validation =
    double comptage à anticiper (~510€/an pré + somme annuités nationales
    post).
- **Recommandé si** :
  - Marché EU significatif (> 30% revenus actuels ou potentiels).
  - ETI ou multinationale avec capacité de gestion portefeuille
    multi-pays.
  - Budget moyen-grand (> 30k€ pour la famille brevet sur 10 ans).
  - Nécessité de signal valorisation (levée de fonds série B+, M&A,
    licensing).

### Voie C — PCT international (WIPO)

- **Marché couvert** : 156+ pays signataires PCT (mondial sauf quelques
  exceptions notables : Argentine, Taïwan, certains pays africains hors
  OAPI/ARIPO).
- **Délai d'extension** : **12 mois post-FR initial** (Convention Union de
  Paris, Art. 4).
- **Coût dépôt PCT** : ~1 330€ taxe internationale OMPI + ~140€ taxe
  transmission INPI + ~2 000€ recherche internationale (ISA, EPO comme ISA
  par défaut pour déposants français) = ~3 500€ taxes officielles. Frais
  mandataire : ~6-18k€ HT cabinet parisien.
- **Phase internationale 30 mois** : durant cette période, OMPI publie la
  demande PCT (à 18 mois de la priorité) + ISA fournit recherche
  internationale + opinion préliminaire d'examen écrite (option : examen
  préliminaire international sous Chapitre II pour ~2 000€ supplémentaires).
- **Avantage clé** : **gel des coûts 30 mois** — temps pour étudier les
  marchés réels (chiffre d'affaires, partenariats locaux, concurrents
  identifiés) et décider quels pays entrer en phase nationale.
- **Phase nationale (à 30 mois post-priorité)** : entrée dans chaque pays
  choisi (taxes nationales par pays + mandataire local + traduction si pays
  non-anglophone).
- **Coût phase nationale par pays** : ~1 500-4 000€ selon pays (USA
  ~2 000€, Japon ~3 500€ traduction japonaise incluse, Chine ~1 800€,
  Brésil ~2 500€).
- **Exemple** : PCT déposé en 2027 avec 5 entrées nationales en 2030
  (US/CN/JP/KR/IN) = ~12 000€ entrées + ~3 000-5 000€/an annuités cumulées
  post-entrée = ~50 000€ sur 10 ans post-entrée.
- **Avantages** :
  - Gel maximal de la flexibilité décisionnelle (30 mois pour décider pays
    réels vs 12 mois Union de Paris).
  - Couverture mondiale possible (156+ pays signataires).
  - Opinion préliminaire ISA aide la décision pays (pré-évaluation
    nouveauté + activité inventive).
  - EP est une « désignation » parmi les 156+ pays PCT — possibilité
    d'entrer en phase régionale EP via PCT à 30 mois (pas besoin de déposer
    EP séparément).
- **Inconvénients** :
  - Très coûteux à grande échelle (couverture mondiale 15+ pays =
    250-500k€ sur 10 ans).
  - Complexe (multi-juridictions, multi-mandataires locaux à coordonner).
  - Examen national parfois redondant (chaque pays peut re-examiner même
    après examen ISA + opinion préliminaire).
  - Risque de déchéance complète si oubli phase nationale à 30 mois (pas
    de récupération — le compteur PCT ne s'arrête pas).
- **Recommandé si** :
  - Marché mondial visé (US + Asie + EU).
  - ETI ou multinationale avec ressources de gestion portefeuille.
  - Besoin de flexibilité temporelle (30 mois pour décider — startup en
    croissance, marchés émergents incertains).
  - Budget grand (> 50k€ pour la famille brevet sur 10 ans).

### Voies hybrides

- **FR + EP direct (sans PCT)** : marché EU exclusif, coût optimisé EU.
  Recommandé pour ETI européennes avec marchés clients EU établis.
- **FR + PCT (sans EP direct)** : flexibilité 30 mois pour décider EP en
  phase nationale via WIPO (EP = désignation PCT). Recommandé pour startups
  série B+ avec trajectoire incertaine.
- **FR + EP + PCT (rare)** : ETI très internationale, gel maximum + couverture
  EU certifiée d'emblée. Recommandé pour multinationales avec famille
  brevet stratégique.
- **FR + voies nationales sélectionnées (rare)** : pour pays critiques hors
  CBE/PCT (Taïwan par exemple — dépôt national direct). Recommandé pour
  secteurs spécifiques (semi-conducteurs avec exposition Taïwan).

---
