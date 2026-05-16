---
name: analyse-opposition-marque
description: >
  Analyse une opposition INPI reçue OU à former (délai 2 mois post-publication
  BOPI, CPI L.712-4). Décompose les motifs invoqués (risque de confusion
  L.713-2, marque renommée L.713-3, AOP/IGP, etc.), évalue chaque branche
  d'argumentation contre l'antériorité opposable, produit un projet de
  réponse INPI structuré. NE dépose PAS l'opposition formelle — préparation
  à valider par mandataire en marques ou avocat.
argument-hint: "[numero marque attaquée | --form (former opposition) | --respond (répondre opposition reçue)]"
---

# /analyse-opposition-marque

**Analyse ≠ procédure officielle.** Ce skill produit une **analyse argumentaire**
pour aider le mandataire en marques (CPI L.422-4) ou l'avocat à préparer une
opposition INPI. Il NE forme PAS l'opposition officielle (= télé-procédure
INPI), NE répond PAS au mémoire en réplique de la partie adverse, NE plaide
PAS en audience orale (procédure rare). **Le délai de 2 mois post-publication
BOPI (CPI L.712-4) est ferme** — manquer le délai = perte définitive du droit
d'opposer (recours en restauration L.712-4-1 strictement exceptionnel :
"circonstances indépendantes de la volonté" prouvées, tels force majeure ou
défaillance INPI).

## Examples

```
/hacienda-propriete-intellectuelle:analyse-opposition-marque --form FR4123456
```

(Former une opposition contre une marque tierce publiée au BOPI — scénario
typiquement alimenté par `surveillance-marque` V1.1.0 et l'agent
`bopi-watcher`.)

```
/hacienda-propriete-intellectuelle:analyse-opposition-marque --respond FR1234567
```

(Répondre à une opposition reçue contre notre propre marque — notification
INPI en main.)

```
/hacienda-propriete-intellectuelle:analyse-opposition-marque
```

(Sans flag — le skill demande quel mode `--form` ou `--respond` avant de
poursuivre.)

---

## ANALYSE ARGUMENTAIRE, PAS PROCÉDURE OFFICIELLE

**Reformuler en tête de chaque output. Ne jamais l'enlever. Ne jamais l'adoucir.**

> **Analyse argumentaire, pas procédure officielle.** Cette analyse décompose
> les motifs CPI invoqués (L.713-2 risque de confusion, L.713-3 1° marque
> renommée, L.711-3 droits antérieurs autres) en branches argumentaires,
> évalue la force probable de chacune (🟢 solide / 🟡 mixte / 🔴 faible) et
> propose un projet de mémoire INPI structuré (parties, faits, discussion en
> droit, demande, pièces). Elle NE remplace PAS la rédaction finale par un
> **mandataire en marques inscrit à l'INPI** (CPI L.422-4) ou un **avocat
> spécialisé en propriété industrielle**. Le délai d'opposition de **2 mois
> post-publication BOPI** (L.712-4) est ferme : manqué, le droit d'opposer
> est perdu définitivement (la restauration L.712-4-1 est strictement
> exceptionnelle — n'y jamais miser). La télé-procédure INPI (dépôt mémoire
> + paiement taxe ~325€) reste à exécuter par le mandataire. **Une opposition
> mal argumentée = rejet + perte des taxes, voire dommages-intérêts pour
> opposition abusive** (art. 1240 code civil).

C'est le garde-fou le plus visible du skill. Une analyse partielle finalisée
sans relecture mandataire = porte à sens unique (mémoire INPI déposé avec
motif insuffisant, opposition rejetée, marque adverse enregistrée
définitivement). Sur-flagger = porte à 2 sens, le mandataire élague. Rester
sur la porte à 2 sens.

---

## Charger le profil pratique avant de commencer

Avant tout, lire :
1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Récupérer :

- **Rôle** depuis `## 1. Profil cabinet et profil de pratique PI` (avocat
  inscrit à un barreau / mandataire en marques INPI L.422-4 / juriste interne /
  non-juriste avec ou sans accès avocat). Change l'en-tête confidentialité,
  la formulation des avertissements en pied de mémoire ET active le gate
  non-juriste si applicable.
- **Posture enforcement** (agressive / mesurée / conservatrice) → calibre
  directement le ton du mémoire d'opposition :
  - *Agressive* = invoquer tous les motifs disponibles cumulativement, viser
    opposition totale, ne pas proposer transaction sauf demande explicite.
  - *Mesurée* = invoquer le motif principal (typiquement L.713-2) +
    subsidiairement les autres, signaler en parallèle l'option transaction
    amiable si le déposant tiers semble de bonne foi.
  - *Conservatrice* = invoquer uniquement les motifs solides (🟢), suggérer
    transaction en première intention si chances de succès < 70 %.
- **Matrice d'approbateurs** (qui valide / signe une opposition INPI ?). Par
  défaut : avocat PI + sponsor business. Pour `--respond`, ajouter
  l'approbateur "réponse à opposition" s'il diffère.
- **Calendriers de surveillance** (cadence `bopi-watcher`) — utile pour
  confirmer comment la marque attaquée a été détectée et combien de jours
  restent réellement avant le butoir L.712-4.
- **Mandataire en marques associé** depuis la table mandataires externes du
  profil → identifié explicitement dans la section "Étapes suivantes" et dans
  le brief gate non-juriste.

Si le profil contient `[A CONFIGURER]`, surfacer :

> Le profil pratique n'est pas configuré — c'est ce qui calibre le ton du
> mémoire (agressif / mesuré / conservateur), la matrice d'approbation
> opposition, le mandataire en marques associé et la chaîne d'escalade pour
> un délai 🔴 URGENT.
>
> **Deux choix :**
> - Lancer `/hacienda-propriete-intellectuelle:entretien-demarrage` (10-15 min)
> - Dire **"provisoire"** et je lance avec les défauts génériques (rôle
>   avocat, posture mesurée, opposition partielle préférée, sans mandataire
>   pré-désigné) — chaque sortie sera taggée `[PROVISOIRE — configurer le
>   profil pour une analyse calibrée]`.

### Mode provisoire

Si l'utilisateur dit "provisoire", lancer normalement avec : posture mesurée,
rôle avocat, pas de mandataire désigné, approbation par défaut "avocat PI".
Tagger la note du relecteur et chaque finding `[PROVISOIRE]`. À la fin,
ajouter :

> "C'était un run générique avec les hypothèses par défaut. Lancer
> `/hacienda-propriete-intellectuelle:entretien-demarrage` pour calibrer le
> ton du mémoire et la chaîne d'approbation sur VOTRE pratique."

---

## Intake — choix du mode

Si l'utilisateur n'a pas précisé `--form` ou `--respond`, demander d'abord :

> **Quel est le scénario ?**
>
> - **`--form`** — vous voulez **former** une opposition contre une marque
>   tierce qui vient d'être publiée au BOPI (typiquement signalée par
>   `surveillance-marque` / `bopi-watcher`). Délai : 2 mois post-publication
>   BOPI, ferme (L.712-4).
> - **`--respond`** — vous avez **reçu** une notification d'opposition de
>   l'INPI contre votre propre marque. Délai pour le mémoire en défense : 2
>   mois post-notification.

Une fois le mode confirmé, demander en un seul batch :

### Mode `--form` (former une opposition)

> Quelques questions avant de bâtir l'analyse :
>
> 1. **Marque attaquée.** Numéro INPI (FRxxxxxxx) de la marque tierce
>    publiée au BOPI. Si tu as repéré la marque via `surveillance-marque`
>    sans avoir noté le numéro, donne-moi le signe + la date d'alerte BOPI,
>    je relance `inpi_search_marques` pour retrouver le numéro.
> 2. **Date de publication BOPI.** Format YYYY-MM-DD. C'est le point de
>    départ du délai de 2 mois L.712-4. Si tu ne l'as pas, je la récupère
>    via `inpi_marque_details` à partir du numéro.
> 3. **Marque(s) antérieure(s) opposable(s).** Numéros INPI / EUTM /
>    enregistrement international Madrid que tu détiens (ou licence
>    exclusive avec droit d'opposition contractuel). Une opposition exige
>    un droit antérieur enregistré (ou droit antérieur non enregistré pour
>    L.711-3 : nom commercial, enseigne, nom de domaine, AOP/IGP). Si tu ne
>    sais pas quelles marques de ton portefeuille sont pertinentes, donne-moi
>    ton secteur + classes de la marque attaquée, je relance
>    `inpi_search_marques` sur ton portefeuille.
> 4. **Motifs invoqués.** Lister ceux retenus parmi :
>    - **L.713-2** — risque de confusion (motif le plus fréquent, ~80 %
>      des oppositions INPI)
>    - **L.713-3 1°** — marque renommée (réservé aux marques avec preuve
>      de renommée solide, parts marché significatives)
>    - **L.711-3** — droits antérieurs autres : nom commercial / enseigne /
>      nom de domaine antérieur / AOP-IGP / mauvaise foi du déposant /
>      droit au nom / droit d'auteur
> 5. **Stratégie.** Opposition **totale** (rejet enregistrement marque
>    attaquée pour toutes les classes désignées) vs **partielle** (rejet
>    pour certaines classes / certains libellés seulement). Une opposition
>    partielle est statistiquement plus admise par l'INPI (cible mieux
>    l'argumentaire) mais laisse subsister la marque adverse sur les
>    classes non visées.
> 6. **Posture transaction.** Es-tu prêt(e) à négocier coexistence /
>    licence / rachat de la marque adverse avant ou pendant la procédure ?
>    Ou opposition pure sans ouverture transactionnelle ? (Affecte la
>    recommandation stratégique en fin d'analyse.)

### Mode `--respond` (répondre à opposition reçue)

> Quelques questions avant de bâtir l'analyse en défense :
>
> 1. **Notre marque attaquée.** Numéro INPI (FRxxxxxxx) de votre marque
>    qui fait l'objet de l'opposition. C'est nécessairement une marque
>    récemment déposée par votre cabinet / client.
> 2. **Date de notification INPI.** Format YYYY-MM-DD. Point de départ du
>    délai de 2 mois pour déposer le mémoire en défense.
> 3. **Marque(s) opposante(s) invoquée(s).** Numéros INPI/EUTM/Madrid
>    invoqués par l'opposant dans sa notification. Si vous ne les avez pas
>    notés, je relance `inpi_marque_details` pour récupérer l'historique
>    complet (date dépôt, classes, statut renouvellement, déchéance
>    éventuelle pour défaut d'usage L.714-5).
> 4. **Motifs invoqués par l'opposant.** Recopier depuis la notification
>    INPI (L.713-2 / L.713-3 / L.711-3, et la sous-branche précise — risque
>    de confusion / renommée / nom commercial antérieur / etc.).
> 5. **Votre position envisagée :**
>    - **Transiger** (coexistence amiable, rachat marque opposante,
>      licence) — préserve les relations, économique, mais laisse la
>      marque adverse en vie.
>    - **Modifier notre dépôt** (limitation de classes ou de libellés
>      P&S pour éviter le chevauchement) — solution intermédiaire, à
>      arbitrer selon l'ampleur de la limitation.
>    - **Contester intégralement** l'opposition — défendre le maintien de
>      notre dépôt tel qu'il est.

Pour les deux modes : si l'utilisateur ne peut pas fournir les numéros
INPI, déclencher les tools (`inpi_search_marques`, `inpi_marque_details`)
en amont pour aider à identifier la marque concernée. Ne pas refuser
l'analyse pour défaut de numéro — proposer la recherche.

---

## Analyse motifs invoqués (cadre CPI)

Pour chaque motif retenu (mode `--form`) ou invoqué par l'opposant (mode
`--respond`), produire une table d'évaluation détaillée. Le mémoire INPI
sera structuré motif par motif, avec un verdict de force probable
(🟢 solide / 🟡 mixte / 🔴 faible), les pièces requises et un précédent
jurisprudentiel pertinent.

Référence détaillée : `references/motifs-opposition-cpi.md`.

### L.713-2 — Risque de confusion (motif principal, ~80 % des oppositions)

Trois branches d'analyse **cumulatives** — toutes doivent être positives
pour conclure au risque de confusion (CJUE *Sabel* C-251/95, principe
d'appréciation globale ensemble).

**Branche 1 — Comparaison des signes** (visuelle / auditive / conceptuelle,
appréciation d'ensemble *Sabel*) :

- **Similitude visuelle** : structure du mot, longueur (nombre de caractères),
  lettres communes en position similaire, stylisation (police, couleur,
  élément figuratif). Comparer en majuscules normalisées pour éliminer le
  bruit typographique.
- **Similitude auditive** : nombre de syllabes, voyelles dominantes, point
  d'accentuation tonique, prononciation en français standard (pas en anglais
  même si le signe est anglophone — le consommateur français lit le signe
  en français sauf renommée internationale prouvée).
- **Similitude conceptuelle** : signification dans la langue du public
  pertinent, traduction directe, évocation indirecte, allusion sectorielle.
  Si l'un des signes est un mot inventé sans signification, la branche
  conceptuelle ne s'applique pas (à dire explicitement, ne pas la forcer).
- **Élément dominant et distinctif** : identifier l'élément qui retient
  l'attention du consommateur (souvent le premier mot, le mot le plus long,
  ou l'élément figuratif central). Un élément descriptif ou faiblement
  distinctif (ex. "tech", "shop") ne peut être l'élément dominant.

**Branche 2 — Comparaison des produits/services** (CJUE *Canon* C-39/97) :

- **Identité ou similitude** : pas seulement classe Nice (les classes sont
  un outil administratif, pas un critère de similitude — depuis *IP
  TRANSLATOR* C-307/10). Comparer les libellés effectifs.
- **Nature** des produits/services (matériels, logiciels, services
  intellectuels, biens de consommation, etc.).
- **Destination et utilisation** : à quoi servent-ils, dans quel contexte
  d'usage ?
- **Caractère complémentaire ou concurrent** : produits qui s'utilisent
  ensemble (complémentaires) ou qui répondent au même besoin (concurrents).
- **Canaux de distribution** : mêmes points de vente, mêmes plateformes
  e-commerce, mêmes prescripteurs ?

**Branche 3 — Appréciation globale** (CJUE *Lloyd Schuhfabrik* C-342/97) :

- **Interdépendance des facteurs** : une faible similitude des signes peut
  être compensée par une forte similitude des produits/services, et
  inversement. L'analyse n'est jamais mécanique.
- **Pouvoir distinctif** de la marque antérieure :
  - *Intrinsèque* : mot inventé > évocateur > suggestif > descriptif limite.
  - *Acquis par usage* : preuves d'usage massif (parts marché, communication,
    présence médiatique) renforcent la protection accordée.
- **Public concerné** :
  - Consommateur moyen (achat impulsif, attention modérée → confusion plus
    probable).
  - Public spécialisé (B2B, achat raisonné, attention élevée → confusion
    plus rare).
- **Risque de confusion ou d'association** : confusion directe (le public
  croit que c'est le même produit) ou confusion par association (le public
  croit qu'il existe un lien économique entre les deux entreprises).

**Évaluation requise pour ce motif :**

| Branche | Force | Pièces / arguments clés |
|---|---|---|
| Comparaison signes | 🟢/🟡/🔴 | [détail visuel / auditif / conceptuel / ensemble] |
| Comparaison P&S | 🟢/🟡/🔴 | [classes + libellés comparés] |
| Appréciation globale | 🟢/🟡/🔴 | [distinctivité + public + interdépendance] |
| **Verdict L.713-2** | 🟢/🟡/🔴 | [synthèse argumentaire en 2-3 phrases] |

### L.713-3 1° — Marque renommée (motif subsidiaire, exigeant)

Trois critères **cumulatifs** (CJUE *General Motors Chevy* C-375/97, *Intel*
C-252/07, *L'Oréal* C-487/07). Réservé aux marques avec preuves de renommée
solides — typiquement marques avec > 5 ans d'usage intensif, parts marché
significatives (> 10 %), reconnaissance institutionnelle.

**Critère 1 — Renommée prouvée :**

- Parts de marché dans le secteur pertinent (chiffres certifiés ou études
  type Xerfi, Nielsen, GfK).
- Intensité, étendue géographique et durée de l'usage (présence physique +
  digitale, ancienneté, continuité).
- Investissements publicitaires (budget annuel, campagnes mémorables).
- Notoriété auprès du public concerné (sondages de notoriété spontanée et
  assistée, BVA / Ipsos / Médiamétrie).
- Reconnaissance institutionnelle (presse, classements sectoriels, prix
  professionnels, citations dans la doctrine ou la jurisprudence).

**Critère 2 — Lien entre les signes** (sans exigence de risque de confusion
direct, *Intel* C-252/07) :

- Le public concerné établit un **lien mental** entre les deux signes,
  même s'il n'y a pas confusion sur l'origine commerciale.
- Ce lien peut résulter de la similitude des signes, **même si les produits
  sont éloignés** (justement la force de L.713-3 par rapport à L.713-2 qui
  exige proximité P&S).

**Critère 3 — Profit indu / atteinte :**

- **Profit indûment tiré** de la renommée ou du caractère distinctif
  (parasitisme — le tiers exploite la notoriété acquise par l'opposant
  sans contrepartie économique).
- **Atteinte au caractère distinctif** (dilution — le tiers banalise le
  signe en le diffusant dans des contextes hétérogènes, érosion progressive
  du pouvoir distinctif).
- **Atteinte à la renommée** (ternissement — association à des produits de
  qualité inférieure, à un contexte dévalorisant, à une connotation
  négative).

**Évaluation requise :**

| Critère | Force | Pièces / arguments clés |
|---|---|---|
| Renommée prouvée | 🟢/🟡/🔴 | [parts marché + sondages + ancienneté + presse] |
| Lien entre signes | 🟢/🟡/🔴 | [analyse similitude + public concerné] |
| Profit indu / atteinte | 🟢/🟡/🔴 | [parasitisme / dilution / ternissement, lequel] |
| **Verdict L.713-3** | 🟢/🟡/🔴 | [synthèse] |

### L.711-3 — Droits antérieurs autres que marques

Plusieurs sous-branches, chacune autonome.

- **Nom commercial / enseigne** (antériorité d'usage, portée géographique
  limitée au territoire d'exploitation effective — jurisprudence Cour de
  cass. com.). Preuve : extrait Kbis avec date d'immatriculation, factures
  continues, documents publicitaires datés.
- **Nom de domaine antérieur** (preuve de réservation auprès du registrar
  + preuve d'usage commercial actif, pas seulement réservation passive).
  Preuve : facture domaine, captures Wayback Machine, factures hébergement,
  trafic Analytics.
- **Dépôt frauduleux** (preuve de mauvaise foi du déposant tiers — CJUE
  *Lindt* C-529/07). Indices : connaissance du signe antérieur (relations
  d'affaires passées, présence sur le même marché), intention de bloquer
  notre activité (chantage au rachat, dépôt préemptif), absence d'intention
  réelle d'usage.
- **AOP / IGP** (Indications Géographiques Protégées — règlement UE
  1151/2012 + CPI L.722-1). Ex. "Champagne", "Roquefort", "Cognac". La
  protection s'étend à toute évocation, même si le signe attaqué ne
  reproduit pas l'appellation à l'identique.
- **Droit au nom / pseudonyme** (personnes physiques célèbres ou non —
  art. 9 code civil, droit au respect du nom). Le titulaire du nom peut
  s'opposer à son dépôt comme marque par un tiers sans autorisation.
- **Droit d'auteur antérieur** sur un signe artistique (logo, illustration,
  composition graphique). L'antériorité doit être prouvée (datation
  certaine, dépôt SACD / SCAM / horodatage notarial / dépôt
  `depot-preuve-creation`).

**Évaluation requise** (par sous-branche invoquée) :

| Sous-branche | Force | Pièces requises | Précédent jurisprudentiel |
|---|---|---|---|
| Nom commercial / enseigne | 🟢/🟡/🔴 | Kbis + factures + portée géographique | Cass. com. [arrêt pertinent] |
| Nom de domaine | 🟢/🟡/🔴 | Facture + Wayback + usage actif | TGI / TJ Paris [arrêt] |
| Dépôt frauduleux | 🟢/🟡/🔴 | Preuves connaissance + intention | CJUE *Lindt* C-529/07 |
| AOP / IGP | 🟢/🟡/🔴 | Cahier des charges + reconnaissance UE | CJUE [arrêt sectoriel] |
| Droit au nom | 🟢/🟡/🔴 | Identité + notoriété du porteur | TGI Paris [arrêt] |
| Droit d'auteur | 🟢/🟡/🔴 | Datation certaine antériorité | Cass. 1re civ. [arrêt] |
| **Verdict L.711-3** | 🟢/🟡/🔴 | [synthèse motif principal retenu] |

---

## Recherche complémentaire (avant rédaction de l'analyse)

Avant de produire l'analyse argumentaire, déclencher systématiquement :

- **`inpi_marque_details`** sur la **marque attaquée** (mode `--form`) ou sur
  **notre marque attaquée** (mode `--respond`) — récupérer :
  - Historique opposition complet (cette marque a-t-elle déjà fait l'objet
    d'oppositions abandonnées ou en cours ? modifications de classes en
    cours d'examen ? retrait partiel du dépôt par le déposant suite à
    observations INPI ?).
  - Statut procédural (en examen / publiée / enregistrée / retirée).
  - Représentant désigné par le déposant (utile pour orienter une éventuelle
    négociation amiable).
- **`inpi_marque_details`** sur la **marque opposante invoquée** (les nôtres
  en mode `--form`, celles de l'opposant en mode `--respond`) — vérifier :
  - Marque encore en vigueur (pas déchue, pas retirée).
  - **Pas de déchéance encourue pour défaut d'usage** (L.714-5 CPI, 5 ans —
    si la marque opposante n'a pas été exploitée sérieusement dans les 5
    dernières années, le défendeur peut soulever cette exception en
    opposition INPI depuis l'ordonnance 2019-1169, et l'opposition tombe).
  - Statut de renouvellement (échéance décennale L.712-9 — si renouvellement
    expiré, opposition irrecevable).
  - Chaîne de titularité (cession, fusion, transmission — vérifier que
    l'opposant a bien la qualité pour agir).
- **`euipo_tmview_search`** pour vérifier les antériorités cross-EU si le
  signe est exploité sur plusieurs territoires (la marque opposante FR
  peut être doublée d'une EUTM ou inversement — l'opposition devant l'INPI
  ne porte que sur le territoire FR, mais le choix de la marque opposable
  affecte la stratégie : EUTM = couverture 27 États si extension future,
  FR = couverture nationale seule).
- **Base-jurisprudence INPI** (https://opposition.inpi.fr/decisions) :
  rechercher des décisions d'opposition antérieures portant sur un signe
  similaire (même racine, même secteur) ou sur le même secteur Nice — un
  précédent INPI favorable est un argument puissant à citer dans la
  discussion en droit. Tagger toute décision citée `[base-jurisprudence
  INPI]` ou `[connaissance modèle — à vérifier]` selon provenance.

Si l'un de ces tools n'est pas disponible cette session (intégration MCP
non connectée), le signaler dans la note du relecteur avec `[recherche
impossible cette session — vérifier manuellement avant transmission
mandataire]`. Ne pas inventer un statut.

---

## Calcul du délai

Le délai d'opposition (mode `--form`) et le délai de mémoire en défense
(mode `--respond`) sont tous deux de **2 mois**, mais avec des points de
départ différents.

### Mode `--form` — délai d'opposition L.712-4

- **Point de départ** : date de publication BOPI de la marque attaquée
  (BOPI hebdomadaire, parution chaque vendredi).
- **Point d'arrivée** : date BOPI + 2 mois calendaires (calcul de quantième
  à quantième, art. 642 CPC ; si le quantième n'existe pas dans le mois
  d'arrivée — ex. 31 mars + 2 mois = 31 mai existe, mais 31 août + 2 mois =
  31 octobre existe ; cas critique : 30/31 décembre + 2 mois → 28/29 février).
- **Effet du dépassement** : déchéance définitive du droit d'opposer. La
  marque attaquée poursuit son chemin vers l'enregistrement (sauf
  intervention d'un autre opposant ou observations tierces INPI).
- **Recours en restauration L.712-4-1** : strictement exceptionnel —
  "circonstances indépendantes de la volonté du titulaire" prouvées (force
  majeure, défaillance INPI documentée). Cas acceptés rares (catastrophe
  naturelle, panne télé-procédure INPI prouvée par horodatage). Cas refusés
  fréquents (oubli, surcharge cabinet, congé mandataire, erreur de
  transmission interne, simple négligence). **Ne jamais miser sur la
  restauration dans la stratégie initiale.**

### Mode `--respond` — délai mémoire en défense

- **Point de départ** : date de notification INPI de l'opposition
  (notification électronique sur compte mandataire INPI ou courrier
  recommandé selon le profil du défendeur).
- **Point d'arrivée** : date de notification + 2 mois.
- **Effet du dépassement** : opposition jugée non contestée, l'INPI rend sa
  décision sur le seul mémoire de l'opposant — perte quasi-certaine pour
  le défendeur sur les classes/libellés visés.

### Seuils de sévérité (identiques pour les deux modes)

| Délai restant | Sévérité | Action |
|---|---|---|
| < 30 jours | 🔴 URGENT | Escalation immédiate vers l'approbateur du profil + notification mandataire en marques cette journée ; télé-procédure INPI lancée cette semaine sans délai supplémentaire ; toute négociation amiable parallèle ne doit PAS retarder le dépôt du mémoire (déposer puis négocier, jamais l'inverse — l'opposition peut toujours être retirée). |
| 30-45 jours | 🟠 À PRÉPARER | Préparer le mémoire cette semaine ; validation mandataire J+5 ; dépôt INPI J+10 max ; marge de sécurité contre aléas (vérification pièces, congé approbateur, modification 11e heure). |
| > 45 jours | 🟡 STANDARD | Planifier dans le mois ; jalons : analyse cette semaine, première version mémoire J+10, validation mandataire J+20, dépôt J+30 ; relire avant dépôt avec œil neuf. |

### Matrice procédure complète (mode `--respond` notamment)

| Étape | Délai post-événement | Notre statut | Action |
|---|---|---|---|
| Notification opposition (INPI) | T0 | Reçue ✓ | n/a — point de départ |
| Mémoire en défense | T0 + 2 mois | À déposer | 🔴/🟠/🟡 selon délai restant |
| Réplique opposant (facultative) | T0 + ~4 mois | À recevoir | Préparer arguments anticipés |
| Contre-réplique défendeur | T0 + ~6 mois | À déposer si réplique reçue | Suivre instruction INPI |
| Décision INPI | T0 + ~8-10 mois | Attendue | Préparer plan post-décision |
| Recours Cour d'appel Paris (L.411-4) | Décision + 1 mois | Optionnel | Différé `contentieux-marques` V6.0+ |

Les délais > T0+2 mois sont indicatifs (variables selon charge INPI et
complexité du dossier). Les délais ≤ T0+2 mois (mémoire défense /
opposition initiale) sont **fermes et opposables**.

---
