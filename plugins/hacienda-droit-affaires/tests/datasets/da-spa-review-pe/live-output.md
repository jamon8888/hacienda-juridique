CONFIDENTIEL — DOCUMENT DE TRAVAIL — Secret professionnel art. 66-5 loi n°71-1130 du 31 décembre 1971

> **⚠️ Note du relecteur**
> - **Sources :** Légifrance ✗ (non connectée) / Judilibre ✗ (non connectée) / Pappers ✗ (non connectée) / BODACC ✗ (non connectée)
> - **Lecture :** scénario fictif Phase 1 (dataset de scoring blind) — données client communiquées sous forme textuelle ; aucun PDF/DOCX reçu — revue sur faits décrits, non sur le texte brut du SPA
> - **Signalé pour ton jugement :** 11 éléments marqués `[review]` en ligne
> - **Fraîcheur :** articles C.civ et C.com cités issus de la connaissance modèle — `[connaissance modèle — à vérifier]` sur toute citation ; Judilibre non consulté
> - **Avant de t'appuyer dessus :** (1) obtenir et lire le texte intégral du SPA ; (2) lever les 4 points bloquants (comptes locked box, leakage hors plafond GAP, CP financement résiduelle, disclosure letter) avant toute séance de négociation

---

# SPA review — Véloce Systèmes — côté sponsor (acquéreur) — mode PE

## Étape 1 — Pré-flight + identification

**Check PII.** Le scénario contient des données nominatives fictives (fondateurs Castagnet / Castagnet-Orval ; DGD Ferrard ; SIREN fictifs). Toutes les mentions sont déclarées fictives dans le dataset — hacienda-ghost non requis sur ce document de test.

**Profil cabinet.** Non configuré (`[A CONFIGURER]` présent dans CLAUDE.md du plugin). La revue est produite avec les paramètres explicites fournis : `--pe --side=sponsor`, prix 28 M€, locked box. Pour une utilisation cabinet, lancer `/h-da:entretien-demarrage` avant la prochaine revue.

**Document analysé.** Projet de SPA (version vendeur, version à négocier) — cession de la totalité des titres de **SAS Véloce Systèmes** (SIREN fictif `539 204 816`) par M. Henri Castagnet et Mme Sylvie Castagnet-Orval à **BidCo Véloce SAS** (SIREN fictif `812 047 391`), véhicule d'acquisition de **Meridian Capital Partners** (FPCI franco-belge).

**Type d'opération.** Cession de titres (100 % SAS Véloce Systèmes). Confirmé.

**Pièces transmises.** SPA (version vendeur) · pacte d'investissement préliminaire (annexe informelle, non définitif) · ECL Meridian Capital Partners GP S.à r.l. · DCL Hartex Finance + Banque Régionale du Centre-Ouest · accords de souscription BSA individuels (3 managers opérationnels).

**Pièces manquantes.** Comptes à la date locked box · disclosure letter · statuts BidCo Véloce à jour · pacte d'investissement définitif · montant des CCA à la date locked box · détail des autorisations réglementaires applicables.

---

## Résumé exécutif

Le SPA reçu présente **quatre points bloquants qui interdisent le signing en l'état** : le leakage non autorisé est soumis au plafond général de la GAP (violation directe de la logique locked box — le remboursement d'une valeur indûment extraite n'est pas un sinistre de garantie, 🔴) ; une condition suspensive de financement résiduelle dégrade le certain funds sans délai de caducité ni seuil de matérialité (🔴) ; les comptes à la date locked box sont absents, rendant impossible la validation de la base économique du prix fixe (🔴) ; la disclosure letter n'est pas jointe, le SPA étant structurellement incomplet (🔴). Par ailleurs, la clause de limitation de recours de l'ECL est régie par le droit luxembourgeois, ce qui sort du périmètre de cet overlay et impose l'avis d'un conseil luxembourgeois avant signing. La prochaine action prioritaire est de soumettre une liste de points formelle à la contrepartie, de réclamer les comptes locked box, la disclosure letter et une reformulation de la CP financement, et de lancer en parallèle `/h-da:gap-review --pe` et `/h-da:pacte-associes-review --pe`.

---

## Deal facts

| Champ | Lecture |
|---|---|
| Type d'opération | Cession de titres (100 % SAS Véloce Systèmes) |
| Cible | SAS Véloce Systèmes — fabrication/distribution systèmes contrôle de process pharma/cosmétique, Tours (37), ~85 ETP, SIREN fictif `539 204 816` |
| Acquéreur / sponsor | BidCo Véloce SAS (SPV, capital 1 000 €) pour Meridian Capital Partners (FPCI franco-belge) |
| Vendeurs | M. Henri Castagnet + Mme Sylvie Castagnet-Orval, fondateurs PP à parité, solidairement garants GAP |
| Prix | 28 M€ fixe |
| Mécanisme de prix | Locked box — date de référence = clôture dernier exercice (date indéterminée dans le scénario) |
| Financement | 12 M€ equity (ECL Meridian GP S.à r.l., entité Lux) + 16 M€ dette senior (DCL Hartex Finance + BRCO) |
| Signing / closing | Différés — 3 CP à lever |
| Droit applicable | Français (a priori — non confirmé dans le scénario `[review]`) |
| W&I / assurance transactionnelle | Aucune envisagée |
| Overlay PE | Actif — side sponsor (acquéreur) |

---

## Red flags

| # | Sujet | Statut | Pourquoi ça compte | Action |
|---|---|---|---|---|
| RF-1 | **Leakage soumis au plafond GAP** | 🔴 Bloquant | Le remboursement du leakage est capé à 30 % du prix (8,4 M€), soumis à la franchise (200 k€) et au panier (400 k€) de la GAP. En locked box, le leakage est une restitution euro pour euro d'une valeur indûment extraite — pas un sinistre de garantie. Le soumettre au plafond GAP vide la locked box de son effet protecteur pour le sponsor `[review]` | Clause autonome de remboursement du leakage hors plafond, hors franchise, hors panier GAP |
| RF-2 | **CP financement résiduelle (CP n°3)** | 🔴 Bloquant | La « confirmation bancaire » que les conditions de la DCL demeurent satisfaites à la date de closing est une condition de financement résiduelle dans le SPA, sans délai de caducité ni seuil de matérialité précisé. Elle compromet le certain funds et expose le sponsor à un non-closing sur décision unilatérale bancaire | Supprimer ou reformuler en obligation d'efforts maxima avec délai de caducité, critères objectifs et alignement strict sur la DCL |
| RF-3 | **Comptes locked box absents** | 🔴 Bloquant | Sans les comptes arrêtés et certifiés à la date locked box, la base économique du prix fixe ne peut pas être validée. Impossible de détecter un leakage ante-transaction, de vérifier le montant des CCA des fondateurs ou de calibrer la GAP sur une assiette réelle | Réclamer les comptes locked box certifiés avant la prochaine session |
| RF-4 | **Disclosure letter absente** | 🔴 Bloquant | Sans disclosure letter, les déclarations du vendeur dans la GAP ne sont pas assorties de leurs exceptions. Le SPA est structurellement incomplet. En l'absence de W&I, cette lacune est d'autant plus grave : l'acquéreur ne sait pas ce que le vendeur entend couvrir ou exclure | Exiger la transmission de la disclosure letter avant toute poursuite de la négociation |
| RF-5 | **Accession deed managers BSA non signée — pacte en cours de rédaction** | 🔴 Bloquant (closing) | Les trois managers opérationnels ont souscrit des BSA individuellement mais n'ont pas signé d'accession deed au pacte d'investissement BidCo, lequel est lui-même encore en cours de rédaction. Leurs obligations de leaver, non-compete pacte, drag/tag, good/bad leaver ne leur sont pas opposables avant adhésion | Conditionner le closing à la signature du pacte définitif ET des accession deeds par les trois managers et les fondateurs-rollovers |
| RF-6 | **Clause de limitation de recours ECL (droit luxembourgeois)** | 🟠 Gate France/Lux | L'ECL est émise par Meridian Capital Partners GP S.à r.l. (Lux SàRL) avec une clause de limitation de recours régie par le droit luxembourgeois. Le SPA renvoie à l'ECL « pour les modalités du certain funds » — le recours vendeur sur le sponsor passe donc par le droit luxembourgeois, hors périmètre de cet overlay | Obtenir l'avis d'un conseil luxembourgeois sur la validité et l'opposabilité de cette limitation avant signing |
| RF-7 | **Fondateurs-vendeurs cumulant trois qualités sans accession deed** | 🟠 Élevé `[review]` | Henri Castagnet et Sylvie Castagnet-Orval sont simultanément (i) vendeurs, (ii) garants solidaires de la GAP et (iii) investisseurs rollovers en actions BidCo Véloce. Ce cumul crée un risque de conflit d'intérêts : le garant peut être le même que le bénéficiaire d'un leakage post-locked box ; l'exercice de la GAP contre un co-investisseur est complexe. Ils n'ont pas signé d'accession deed au pacte BidCo | Exiger l'accession deed des fondateurs-rollovers avant ou au closing ; traiter les conflits dans le pacte (→ `/h-da:pacte-associes-review --pe`) |
| RF-8 | **Reserved matters trop larges — risque gestion de fait** | 🟠 Élevé `[review]` | Le pacte préliminaire attribue au sponsor un veto sur toute décision d'investissement > 50 k€, tout recrutement/licenciement de cadre, tout contrat > 30 k€/an, toute décision tarifaire et le budget annuel. Si ces reserved matters s'appliquent à la période intercalaire signing → closing, ils peuvent constituer un contrôle opérationnel continu de la cible par le fonds, exposant à une requalification en gestion de fait | Revoir le périmètre avec le conseil pacte ; exclure la période intercalaire ou cantonner aux décisions réellement exceptionnelles (→ `/h-da:pacte-associes-review --pe`) |
| RF-9 | **Définition du leakage trop étroite** | 🟠 Élevé | La définition couvre dividendes, remboursements CCA, opérations parties liées. Elle ne couvre pas explicitement : renonciations de créances, avantages indirects, rémunérations hors cours normal, management fees anticipés, avantages en nature, paiements sans contrepartie, variations de CCA hors cours normal `[review]` | Élargir la définition selon la pratique PE standard ; établir une liste de permitted leakage négociée ligne à ligne |
| RF-10 | **Absence de W&I sans security for claims suffisante** | 🟠 Élevé | Aucune W&I envisagée. Pas de séquestre, d'escrow ni de GAPD mentionné. La garantie repose sur la solvabilité future des fondateurs PP. Si leur patrimoine se dégrade post-closing (notamment après consommation du produit de cession), le recours en GAP devient théorique | Négocier un escrow / séquestre calibré sur le plafond et la durée de la GAP, ou étudier la W&I (→ `/h-da:gap-review --pe`) |
| RF-11 | **Montant des CCA à la date locked box inconnu** | 🟡 Moyen | Les remboursements de CCA sont couverts comme leakage interdit. Sans connaître leur montant à la date locked box, il est impossible de calibrer le risque de remboursement anticipé ou d'apurement non déclaré avant le closing | Réclamer l'état des CCA avec les comptes de référence |
| RF-12 | **CP réglementaires vague (antitrust / IEF / CSE)** | 🟡 Moyen `[à vérifier]` | La CP n°2 renvoie aux « autorisations réglementaires applicables » sans les identifier. Avec 85 ETP, la consultation CSE est vraisemblablement obligatoire si le deal déclenche l'obligation d'information-consultation (art. L.2312-8 C.trav. `[connaissance modèle — à vérifier]`) ; l'IEF pourrait s'appliquer selon les actifs et le secteur | Cartographier précisément les obligations réglementaires et leurs délais de levée avant signing |

---

## Overlay PE — side sponsor (acquéreur)

### S1 — Mécanisme de prix PE (Locked box)

**Finding.** Locked box avec date de référence = clôture du dernier exercice. La date est désignée « date locked box » dans le SPA mais non fixée précisément, et les comptes correspondants ne sont pas transmis — la base économique du prix fixe est donc non validable (🔴 RF-3). La définition du leakage est trop étroite (🟠 RF-9). Le remboursement du leakage non autorisé est soumis au plafond général de la GAP — c'est le point contractuellement le plus grave de ce SPA (🔴 RF-1) : le leakage doit être remboursé hors plafond, hors franchise, hors panier, à titre d'obligation autonome. Le montant des CCA à la date locked box est inconnu (🟡 RF-11).

**Position sponsor.** Exiger : (i) date locked box précisément définie + comptes certifiés annexés avant signing (`[à compléter]`) ; (ii) élargissement de la définition du leakage à la liste standard PE ; (iii) liste limitative de permitted leakage négociée ligne à ligne ; (iv) clause autonome de remboursement du leakage hors tout plafond ou mécanisme GAP ; (v) état des CCA à la date locked box.

> Ne pas chiffrer le leakage potentiel (`[à compléter]`). Durée de la période intercalaire exprimée en semaines relatives.

---

### S2 — Certain funds & financement

**Finding.** Structure BidCo SPV (capital 1 000 €, sans actif propre avant closing) financée par ECL (12 M€, Meridian GP S.à r.l., entité Lux) et DCL (16 M€, Hartex Finance + BRCO). La CP n°3 (confirmation bancaire) est une condition de financement résiduelle, sans délai de caducité ni seuil de matérialité — elle dégrade structurellement le certain funds (🔴 RF-2). Le SPA renvoie à l'ECL pour « les modalités du certain funds » sans reprendre la limitation de recours dans son corps : désalignement potentiel entre la protection vendeur et la limitation Lux. Gate France/Lux activée sur la clause de limitation de recours ECL (🟠 RF-6).

**Position sponsor.** (i) Supprimer ou reformuler la CP n°3 en obligation d'efforts maxima avec délai de caducité et critères objectifs ; (ii) aligner strictement les CP du SPA sur les conditions de l'ECL et de la DCL ; (iii) vérifier si le vendeur dispose d'un droit d'invoquer directement l'ECL (`[review]`) ; (iv) mandater un conseil luxembourgeois sur la clause de limitation de recours avant signing — ce point sort du périmètre de cet overlay.

---

### S3 — MAC & période intercalaire

**Finding.** Aucune clause MAC décrite dans le scénario — son existence et son contenu dans le SPA sont inconnus. Les covenants d'interim du SPA ne sont pas décrits. Les reserved matters du pacte préliminaire sont très larges (🟠 RF-8) ; s'ils s'appliquent à la période intercalaire, le risque de gestion de fait est sérieux. La CP n°2 est vague sur l'antitrust/IEF/CSE (🟡 RF-12).

**Position sponsor.** (i) Vérifier la présence et le contenu de la clause MAC dans le texte du SPA ; (ii) s'assurer que les covenants intercalaires sont calibrés sur l'ordinary course (et non sur les reserved matters du pacte) ; (iii) cartographier les obligations réglementaires et fixer des délais de levée précis ; (iv) pour le CSE, vérifier si l'opération déclenche l'obligation d'information-consultation avant closing `[à vérifier]`.

---

### S4 — Rollover & management package

**Finding.** Rollover des fondateurs-vendeurs en numéraire, réinvestissement en actions ordinaires BidCo aux mêmes conditions économiques que le sponsor, sans sweet equity. Management package BSA (3 managers opérationnels, prix d'exercice très bas, upside subordonné à un TRI minimum). Points critiques :

- **Fondateurs-rollovers** : cumulent trois qualités (vendeur + garant GAP solidaire + investisseur rollover) sans accession deed signée au pacte BidCo — conflit d'intérêts structurel (🟠 RF-7).
- **Managers BSA** : accession deed non signée, pacte en cours de rédaction — obligations de leaver, non-compete pacte, drag/tag non opposables (🔴 RF-5).
- **Clause bad leaver** (pacte préliminaire) : rachat à valeur nominale d'émission, sans mécanisme d'expert, sans référence à la valeur de marché — à analyser via `/h-da:pacte-associes-review --pe` (risque de requalification judiciaire de la valeur de rachat en dessous de la valeur de marché des titres sous-jacents `[review]`).
- **Requalification fiscale/sociale BSA** : un BSA à prix d'exercice très bas avec clause de TRI minimum dans une structure LBO est exposé à une requalification en revenu professionnel ou avantage en nature selon les conditions de souscription. `[à vérifier]` — nommé et renvoyé vers fiscaliste/socialiste spécialisé ; non traité au fond dans ce module.

**Position sponsor.** (i) Conditionner le closing à la signature du pacte définitif et des accession deeds (fondateurs + 3 managers) ; (ii) réviser la clause bad leaver (→ `/h-da:pacte-associes-review --pe`) ; (iii) faire analyser les instruments BSA et la fiscalité du management package avant closing (→ `/h-da:financement-startup` + fiscaliste spécialisé).

---

### S5 — Garanties, W&I & funds flow

**Finding.** Aucune W&I envisagée. Garantie fondée sur les fondateurs PP solidairement (30 mois, plafond 30%, franchise 200 k€, panier 400 k€). Absence de disclosure letter (🔴 RF-4). Aucun séquestre/escrow ni GAPD mentionné (🟠 RF-10). Leakage soumis au plafond GAP (🔴 RF-1). Funds flow (réconciliation ECL 12 M€ + DCL 16 M€ = prix 28 M€ + frais) non documenté dans le scénario — `[à compléter]`.

**Position sponsor.** (i) Négocier un escrow calibré sur le plafond GAP et sa durée, ou étudier la souscription d'une W&I ; (ii) exiger la disclosure letter avant signing ; (iii) faire établir le funds flow complet (→ `/h-da:closing-checklist-fr`) ; (iv) lancer `/h-da:gap-review --pe` pour l'analyse technique de la GAP (durée, paramètres, articulation leakage/GAP, security for claims).

---

## Analyse par axes (revue standard)

### 1 — Deal facts et périmètre

Cession de 100 % des titres d'une SAS à objet industriel, cible saine et rentable (EBITDA positif sur trois exercices), effectif significatif (~85 ETP). Mécanique locked box retenue avec prix fixe. Périmètre clair (totalité des titres, pas d'actifs isolés, pas d'earn-out). Aucune ambiguïté sur le périmètre stricto sensu.

### 2 — Capacité, pouvoirs et restrictions sur titres

Statuts de BidCo Véloce à jour non transmis — impossible de vérifier la capacité et les pouvoirs des signataires BidCo. Statuts de Véloce Systèmes non mentionnés comme transmis — clauses d'agrément, de préemption ou d'inaliénabilité inconnues. En l'absence de confirmation, le transfert des titres pourrait heurter une clause statutaire d'agrément (art. L.227-15 C.com. `[connaissance modèle — à vérifier]`) `[review]`. Au closing, le transfert s'opère par inscription au registre de mouvements de titres + mise à jour des comptes d'associés (→ `/h-da:closing-checklist-fr`).

### 3 — Conditions suspensives

CP n°1 (absence de procédure collective sur Véloce Systèmes) : standard, cohérente avec l'état sain de la cible. CP n°2 (autorisations réglementaires) : vague — antitrust, IEF, CSE à préciser et délais à fixer (🟡 RF-12). CP n°3 (confirmation bancaire) : 🔴 condition de financement résiduelle (RF-2).

### 4 — Interim covenants / MAC

Clause MAC non décrite dans le scénario. Covenants d'interim du SPA non décrits — seul le pacte préliminaire contient des reserved matters très larges. Risque de gestion de fait si ces reserved matters s'appliquent à la période intercalaire (🟠 RF-8).

### 5 — Prix / ajustements / paiement

Locked box avec comptes de référence absents (🔴 RF-3). Leakage soumis au plafond GAP (🔴 RF-1). Définition du leakage trop étroite (🟠 RF-9). Montant des CCA inconnu (🟡 RF-11). Aucun earn-out, aucun escrow décrit.

### 6 — Garanties / indemnisation / disclosure

GAP : 30 mois, plafond 30 % (8,4 M€), franchise 200 k€, panier 400 k€ — paramètres à analyser techniquement par `/h-da:gap-review --pe`. Disclosure letter absente (🔴 RF-4). Aucune W&I ni security for claims alternatives suffisantes (🟠 RF-10).

### 7 — DD → protections SPA

Aucun rapport DD fourni. Confrontation DD → protections SPA non exécutée. Un SPA ne peut pas être considéré signing-ready sans revue des findings DD et leur traduction en protections contractuelles (déclarations spécifiques, indemnités dédiées, escrow, réduction de prix). Lancer `/h-da:due-diligence-dataroom` si la data-room n'a pas été structurellement revue.

### 8 — Covenants restrictifs / post-closing

Aucune clause de non-concurrence cédant identifiée dans le scénario — son existence et son contenu dans le SPA sont inconnus `[review]`. Pour une cible à forte composante technique (pharma/cosmétique) avec deux fondateurs actifs depuis l'origine, une non-concurrence est indispensable (durée, périmètre géographique et d'activité, contrepartie si cédants salariés `[à vérifier]`). Accompagnement post-closing / TSA non décrit.

---

## Liste de points

| # | Clause | Statut | Risque | Position souhaitée (sponsor) | Formulation proposée |
|---|---|---|---|---|---|
| P-01 | Remboursement du leakage — soumis au plafond GAP | 🔴 Bloquant | La restitution d'une valeur indûment extraite est traitée comme un sinistre de garantie, plafonnée et soumise à la franchise — protection locked box anéantie | Clause autonome de remboursement euro pour euro hors tout mécanisme GAP | « Tout leakage non autorisé constaté entre la date locked box et le closing sera remboursé par les vendeurs, solidairement, à l'acquéreur, euro pour euro, indépendamment de tout plafond, franchise ou panier de la garantie d'actif et de passif » |
| P-02 | CP n°3 — Confirmation bancaire (financement résiduel) | 🔴 Bloquant | Condition de financement résiduelle dans le SPA, sans délai ni seuil : certain funds compromis | Supprimer ou reformuler en obligation d'efforts maxima avec délai de caducité et critères objectifs, alignée sur les conditions de la DCL | Délai de caducité de [X] semaines à compter du signing, obligation d'efforts maxima du sponsor ; à défaut de levée, désengagement sans reverse break fee au-delà du plafond ECL |
| P-03 | Comptes locked box — absence | 🔴 Bloquant | Prix fixe non validable ; leakage ante-transaction non détectable ; calibration GAP impossible | Transmission et annexion des comptes certifiés à la date locked box avant signing | Condition préalable au signing |
| P-04 | Disclosure letter — absence | 🔴 Bloquant | SPA incomplet ; déclarations GAP sans exceptions ; en l'absence de W&I, le risque non disclosé est intégralement supporté par l'acquéreur | Transmission de la disclosure letter complète avant la prochaine session de négociation | Condition préalable au signing |
| P-05 | Accession deed managers BSA + fondateurs rollovers — non signée | 🔴 Bloquant (closing) | Obligations pacte non opposables aux managers et fondateurs-rollovers avant adhésion effective | Conditionner le closing à la signature du pacte définitif et des accession deeds de tous les investisseurs | CP supplémentaire de closing |
| P-06 | Définition du leakage — trop étroite | 🟠 Élevé | Renonciations de créances, avantages indirects, rémunérations hors cours normal, management fees anticipés, avantages en nature non couverts | Définition élargie + liste limitative de permitted leakage négociée ligne à ligne | Définition standard PE |
| P-07 | Security for claims — absente (sans W&I) | 🟠 Élevé | Recours GAP théorique si solvabilité des fondateurs PP se dégrade post-closing | Escrow / séquestre calibré sur le plafond (8,4 M€) et la durée de la GAP (30 mois) ; à défaut, GAPD bancaire ; ou étudier la W&I | Escrow constitué au closing, libéré selon mécanique convenue |
| P-08 | Clause de limitation de recours ECL (droit luxembourgeois) | 🟠 Gate Lux | Portée et validité du recours vendeur sur le sponsor régies par le droit Lux — hors périmètre overlay FR | Avis conseil luxembourgeois avant signing | — |
| P-09 | Fondateurs-rollovers : triple qualité, accession deed non signée | 🟠 Élevé `[review]` | Conflit vendeur/garant/investisseur ; engagements pacte inopposables aux fondateurs avant adhésion | Accession deed fondateurs au closing ; traitement des conflits dans le pacte | → `/h-da:pacte-associes-review --pe` |
| P-10 | Reserved matters — risque gestion de fait | 🟠 Élevé `[review]` | Veto sur décisions opérationnelles > 50 k€, recrutements, contrats > 30 k€/an → contrôle opérationnel du fonds sur la cible | Restreindre aux décisions réellement exceptionnelles ; exclure la période intercalaire du périmètre pacte | → `/h-da:pacte-associes-review --pe` |
| P-11 | Clause MAC — contenu inconnu | 🟡 Moyen | Protection acquéreur non vérifiable sans le texte | Vérifier contenu, calibrer pour la cible, exclure risques market-wide et inclure risques spécifiques cible | À analyser sur le texte du SPA |
| P-12 | Non-concurrence cédants — contenu inconnu | 🟡 Moyen `[review]` | Absence ou clause insuffisante : risque de recréation de concurrence par les fondateurs dans un secteur technique à forte expertise | Clause non-concurrence fondateurs (durée, périmètre géographique et d'activité, contrepartie si cédants salariés `[à vérifier]`) | À analyser sur le texte du SPA |
| P-13 | Statuts BidCo et Véloce Systèmes — non transmis | 🟡 Moyen | Restrictions sur titres inconnues (agrément, préemption, inaliénabilité) ; pouvoirs des signataires non vérifiés ; risque de nullité du transfert (art. L.227-15 C.com. `[connaissance modèle — à vérifier]`) | Transmission et revue des statuts des deux entités avant signing | Condition préalable au signing |
| P-14 | CP réglementaires — antitrust / IEF / CSE | 🟡 Moyen `[à vérifier]` | Obligations réglementaires et délais de levée non identifiés ; CSE probablement requis (~85 ETP) | Cartographie précise avant signing ; fixer délais de levée et responsables | → hacienda-reglementaire · hacienda-social |
| P-15 | Requalification fiscale/sociale BSA | 🟡 `[à vérifier]` | BSA à prix très bas + TRI minimum → risque de requalification en revenu professionnel ou avantage en nature | Avis fiscaliste spécialisé avant structuration définitive | → `/h-da:financement-startup` + fiscaliste |
| P-16 | Montant des CCA à la date locked box | 🟡 Moyen | Leakage potentiel sur CCA non quantifiable | Transmission de l'état des CCA avec les comptes de référence | Condition préalable au signing |

---

## Confrontation DD → protections SPA

Aucun rapport DD fourni. Confrontation non exécutée. Un SPA ne peut pas être considéré signing-ready sans revue des findings DD et leur traduction en protections contractuelles. Lancer `/h-da:due-diligence-dataroom` si la data-room n'a pas été structurellement revue.

---

## Renvois recommandés

| Sujet | Skill |
|---|---|
| Analyse technique GAP (durée, plafond, franchise, W&I, security for claims, articulation leakage) | `/h-da:gap-review --pe` |
| Pacte d'investissement (gouvernance, leaver bad/good, clause bad leaver valeur nominale, drag/tag, liquidation preference, ratchet, accession deed) | `/h-da:pacte-associes-review --pe` |
| Instruments management package (BSA, structuration, valorisation) | `/h-da:financement-startup` |
| Closing (CP, signing, formalités sociétaires, registre de mouvements de titres, funds flow) | `/h-da:closing-checklist-fr` |
| Audit data-room / due diligence | `/h-da:due-diligence-dataroom` |
| Obligations réglementaires (antitrust, IEF, CSE, information-consultation) | `hacienda-reglementaire` · `hacienda-social` |
| Requalification fiscale/sociale management package BSA | Fiscaliste/socialiste spécialisé (hors scope plugin) |
| Clause de limitation de recours ECL — droit luxembourgeois | Conseil luxembourgeois (hors périmètre overlay FR) |

---

## Recommandation

**Ne pas signer en l'état.** Quatre points bloquants interdisent le signing : leakage soumis au plafond GAP, CP financement résiduelle dégradant le certain funds, comptes locked box absents, disclosure letter manquante. Avant la prochaine session de négociation : soumettre une liste de points formelle sur P-01 à P-05 à la contrepartie, réclamer les comptes locked box et l'état des CCA, demander la disclosure letter en avant-première, et mandater un conseil luxembourgeois sur la clause de limitation de recours ECL. Lancer en parallèle `/h-da:gap-review --pe` et `/h-da:pacte-associes-review --pe` — ces deux axes conditionnent également la décision de signing.

---

## Une question hors de ma checklist habituelle

Les fondateurs réinvestissent « aux mêmes conditions économiques que le sponsor, sans sweet equity » — cette parité complète est inhabituelle dans un LBO où le sponsor cherche à distinguer son exposition de celle du rollover fondateur. Est-ce une position de principe des fondateurs, une concession sponsor, ou le reflet d'un pacte d'investissement encore non finalisé ? La réponse change l'analyse de la clause bad leaver (rachat à valeur nominale vs valeur de marché) et la lecture du pouvoir de veto dans les reserved matters. `[review]`.

---

## Que veux-tu faire ? Choisis une option :

1. **Rédiger** — je produis une liste de points formelle en format courrier de négociation, prête à envoyer à la contrepartie (items P-01 à P-16, triés par priorité).
2. **Escalader** — je rédige une note vers l'associé responsable du dossier avec bottom-line, risques bloquants et décision attendue avant la prochaine session.
3. **Compléter les faits** — je liste les questions à poser à la contrepartie (comptes locked box, disclosure letter, statuts, CP réglementaires, MAC, non-concurrence).
4. **Surveiller et attendre** — j'ajoute les points en suspens au tracker du dossier Véloce avec dates de revisite.
5. **Autre** — précise.

---

```
Sources consultées : [connaissance modèle — à vérifier] sur tous les articles C.civ et C.com cités
Légifrance ✗ · Judilibre ✗ · Pappers ✗ · BODACC ✗ (serveurs non connectés en mode dataset Phase 1 scoring blind)
Citations vérifiées : non — à vérifier systématiquement avant tout usage externe
Date d'analyse : 2026-06-29
```

[Ce skill a traité 9 mentions nominatives fictives (Meridian Capital Partners, BidCo Véloce, Véloce Systèmes, Castagnet, Castagnet-Orval, Ferrard, Hartex Finance, Banque Régionale du Centre-Ouest, Meridian Capital Partners GP S.à r.l.). Pour anonymiser automatiquement avant envoi à Claude, installer hacienda-ghost.](https://hacienda.diy/ghost)
