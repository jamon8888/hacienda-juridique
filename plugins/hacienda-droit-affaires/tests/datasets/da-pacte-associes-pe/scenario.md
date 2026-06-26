# Scénario fictif — revue d'un pacte d'investissement PE (mode --pe)

> Fact pattern fictif, sans solution. Tous les noms, chiffres et entités sont
> inventés. À ne pas confondre avec un dossier réel.

## Requête utilisateur (telle que reçue dans Cowork)

« Notre cliente est entrée en LBO il y a quelques semaines. Elle représente le
pool management. On vient de recevoir le projet de pacte d'investissement du
sponsor. Il y a aussi un pacte d'associés signé il y a deux ans entre les
fondateurs — le sponsor dit que le nouveau pacte "prévaut", mais la clause de
précédence n'est pas formalisée. Tu peux faire la revue en mode PE ? »

## Faits communiqués par le client

### Parties et structure

**HoldCo :** **SAS CapVerdi Holding** (holding de tête du LBO), SIREN fictif
`822 514 039`, siège à Paris 8e. Capital de 10 000 €, divisé en actions
ordinaires (AO) et actions de préférence (AP) de catégories A, B, C.
Fondée pour les besoins de l'opération.

**Société cible (OpCo) :** **SAS Thermis Industrie**, fabrication d'équipements
thermiques industriels, SIREN fictif `491 063 724`, siège à Nantes (44).
Chiffre d'affaires annuel : ~18 M€. Salariés : ~90 ETP. Filiale à 100 % de
CapVerdi Holding post-closing.

**Sponsor (fonds) :** **Ardequin Capital IV FCPR** (fonds de capital-investissement,
domicilié en France). Souscrit des AP de catégorie A et B représentant ~75 % du
capital dilué de CapVerdi Holding.

**Management pool :** Mme **Isabelle Fontanet** (CEO, directrice générale de
Thermis Industrie), M. **Romain Delcourt** (CFO), et trois cadres supérieurs
(collectivement « Managers »). Détiennent des AP de catégorie C (mécanisme de
sweet equity) et une participation résiduelle en AO.

**Rollover fondateurs :** M. **Gérard Vanteuil** et Mme **Corinne Vanteuil**
(fondateurs historiques de Thermis Industrie, vendeurs dans le LBO), conservent
~8 % de CapVerdi Holding en AO dans le cadre d'un rollover partiel.

### Documents fournis

1. **Projet de pacte d'investissement** daté J+15 post-signing (transmis par le
   conseil du sponsor, version non négociée, V1).
2. **Pacte d'associés historique** signé entre les fondateurs Vanteuil, M. Delcourt
   et Mme Fontanet lors d'une augmentation de capital il y a deux ans (V2024,
   ci-après « Ancien Pacte »).
3. **Extrait du term sheet** de l'opération LBO.
4. **Statuts de CapVerdi Holding** (version post-closing signée).
5. **Note d'actionnariat** (tableau de capitalisation dilué).
6. **Mémorandum relatif au mécanisme de sweet equity** (une page, préparé par le
   conseil du sponsor).
7. **Annexe 7 au pacte d'investissement** : « Share Purchase Agreement for
   Management Shares governed by the laws of the Grand Duchy of Luxembourg »
   (SPA des titres management signé par les Managers en faveur du fonds pour les
   AP de catégorie C — document satellite, droit luxembourgeois applicable).

### Clauses du projet de pacte d'investissement (V1)

#### Article 2 — Précédence et hiérarchie des pactes

> « Le présent Pacte d'Investissement régit les relations entre les Parties et
> prévaut sur tout accord antérieur entre certaines d'entre elles relatif à la
> Société. »

L'Ancien Pacte (V2024) contient une clause de durée de 5 ans et une clause de
solidarité entre les signataires sur les engagements de non-dilution. L'Ancien
Pacte n'a pas été résilié, aucun acte de résiliation ou d'avenant n'a été signé.
Le projet de pacte d'investissement V1 ne prévoit pas de clause formelle de
résiliation de l'Ancien Pacte ni de mécanisme de dérogation article par article.

#### Article 5 — Gouvernance et droit de veto du sponsor

> « Toute décision relative à (i) l'approbation des comptes annuels et des
> budgets, (ii) le recrutement ou le licenciement de tout Dirigeant Clé, (iii)
> la conclusion de tout contrat dont la valeur excède 50 000 € par an, (iv) tout
> investissement ou désinvestissement supérieur à 25 000 €, (v) toute
> modification des conditions générales de vente ou d'achat, (vi) toute
> embauche créant un poste permanent, (vii) l'octroi de toute sûreté ou garantie,
> (viii) tout litige d'un montant supérieur à 10 000 €, et (ix) toute décision
> de politique commerciale structurante, requiert l'accord préalable écrit du
> Sponsor ou de son représentant au Conseil. »

Mme Fontanet est directrice générale de Thermis Industrie avec les pouvoirs
standard de représentation légale. Sa délégation est sans réserve dans les
statuts de Thermis Industrie (non modifiés par le LBO sur ce point).

#### Article 8 — Cession et mécanisme de leaver

**8.1 Good leaver.** En cas de départ d'un Manager pour un motif qualifié de
*good leaver* (décès, invalidité, démission à l'initiative du sponsor ou
licenciement sans cause réelle et sérieuse), le Manager cédant ses AP de
catégorie C au prix égal à la **Juste Valeur Marchande** calculée selon la
méthode DCF convenue en Annexe 3.

**8.2 Bad leaver.** En cas de départ pour tout autre motif (incluant notamment
la démission volontaire, la faute grave, la faute lourde, et « tout départ
survenant dans les 3 ans de la Date de Closing »), le Manager cédant ses AP de
catégorie C au prix égal à la **valeur nominale** des AP de catégorie C, soit
**1 € par action**, sans distinction selon la date effective du départ, la
valeur créée depuis le closing ni les circonstances spécifiques entourant la
cessation des fonctions.

**8.3 Clause balai.** Tout départ non expressément qualifié de *good leaver* à
l'article 8.1 est traité comme un *bad leaver*.

#### Article 11 — Liquidation préférentielle et distribution

Le mécanisme de liquidation préférentielle prévoit :
- AP de catégorie A (sponsor) : remboursement prioritaire du montant souscrit
  + intérêts capitalisés au taux de 8 % par an ;
- AP de catégorie B (sponsor) : second rang, mêmes conditions, taux de 6 % ;
- AP de catégorie C (Managers) : participation résiduelle après remboursement
  des catégories A et B, déclenchée si et seulement si le multiple d'investissement
  global (MOIC) dépasse 2,0× sur les capitaux investis par le fonds.

Le projet ne prévoit pas de clause d'accélération en cas de licenciement sans
cause réelle et sérieuse ni en cas de départ *good leaver* hors décès/invalidité.

### Le mécanisme de sweet equity (mémorandum, 1 page)

Le mémorandum d'une page transmis par le conseil du sponsor décrit les AP de
catégorie C comme suit :

> « Les AP de catégorie C constituent un mécanisme d'intéressement économique
> destiné à aligner les intérêts des Managers sur ceux du Fonds. Elles sont
> souscrites à une valeur symbolique (1 € par action). La plus-value éventuelle
> à la sortie dépend de l'atteinte du seuil de déclenchement (MOIC > 2,0×). »

Le mémorandum ne contient aucune qualification fiscale ni sociale du mécanisme.
Il ne précise pas si les AP de catégorie C ont fait l'objet d'une valorisation
indépendante à la souscription, ni quel régime d'imposition s'appliquera à la
plus-value de cession (régime des plus-values mobilières de droit commun,
requalification en salaires, régime BSPCE, etc.). Il ne mentionne pas de
déclaration URSSAF ni de consultation des organismes sociaux.

### Le document satellite luxembourgeois (Annexe 7)

L'Annexe 7 au pacte d'investissement est un **Share Purchase Agreement**
rédigé en anglais, signé entre les Managers (vendeurs) et Ardequin Capital IV
FCPR (acheteur), portant sur les AP de catégorie C souscrites dans CapVerdi
Holding. L'article 12 de ce SPA stipule :

> « This Agreement shall be governed by and construed in accordance with the
> laws of the Grand Duchy of Luxembourg. Any dispute arising out of or in
> connection with this Agreement shall be submitted to the exclusive jurisdiction
> of the courts of Luxembourg City. »

Le SPA luxembourgeois contient une clause de *bad leaver* reproduisant
substantiellement l'article 8.2 du pacte d'investissement (rachat à valeur
nominale, motifs identiques, clause balai identique). Il ajoute une clause de
**drag-along** permettant au fonds d'obliger les Managers à céder leurs AP de
catégorie C au prix et aux conditions proposés à l'acquéreur tiers, sans
mécanisme de prix plancher.

Le conseil du client n'a pas identifié ce document comme soumis à un droit
étranger dans sa liste de pièces initiale. Il l'a transmis comme « annexe
habituelle » au pacte.

### Situation de l'Ancien Pacte (V2024)

L'Ancien Pacte, signé entre M. Vanteuil, Mme Vanteuil, M. Delcourt et
Mme Fontanet, prévoyait notamment :

- Une clause de **droit de préemption** au profit des fondateurs en cas de
  cession par les cadres de leurs titres dans la société OpCo (Thermis
  Industrie) ;
- Une clause de **non-dilution** : engagement solidaire des signataires de
  voter contre toute augmentation de capital ne respectant pas les droits
  préférentiels de souscription existants ;
- Une clause de **durée** : « le présent pacte est conclu pour une durée de
  5 ans à compter de sa signature » (soit jusqu'en 2029).

L'Ancien Pacte portait sur les titres de **Thermis Industrie** (OpCo), alors que
le pacte d'investissement V1 porte sur les titres de **CapVerdi Holding** (HoldCo).
Les fondateurs Vanteuil sont actionnaires des deux entités (rollover HoldCo +
titres résiduels Thermis Industrie non cédés dans le LBO, soit ~2 % du capital
de l'OpCo restant en dehors du périmètre du LBO).

### Posture cabinet configurée (fictive)

**Cabinet fictif :** Étude Marceau-Séverin, Paris (cabinet d'avocats d'affaires,
10 associés).
**Side :** conseil du pool management (Managers).
**Rôle :** avocat inscrit à un barreau français.
**Seuil de matérialité :** clauses bloquantes 🔴 → escalade associé senior ;
clauses 🟠 → note de négociation à soumettre au client.
**Approbateur :** associé senior M. Théodore Marceau pour tout point 🔴.

### Données NON fournies ou non confirmées

- Absence de valorisation indépendante des AP de catégorie C à la souscription.
- Qualification fiscale et sociale du mécanisme de sweet equity non précisée par
  le conseil du sponsor ni par le client.
- Aucun avis fiscal ou social fourni sur le régime des AP de catégorie C.
- Modalités exactes de calcul de la Juste Valeur Marchande (Annexe 3) non
  transmises.
- Texte complet de l'Ancien Pacte (V2024) non transmis — seul un résumé de
  trois clauses est disponible (voir ci-dessus).
- État des engagements de non-dilution de l'Ancien Pacte post-LBO non confirmé
  (augmentation de capital de CapVerdi Holding est-elle une violation de
  l'Ancien Pacte ?).
- Droit luxembourgeois applicable au SPA Annexe 7 : aucun conseil luxembourgeois
  désigné par le client à ce stade.
