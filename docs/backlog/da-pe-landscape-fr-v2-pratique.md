# Cartographie pratique-first Private Equity FR — droit des affaires

**Date :** 2026-06-25
**Statut :** backlog exploratoire — aucun skill cree ni modifie.
**Objet :** cartographie pratique-first de la pratique Private Equity d'un cabinet d'affaires francais, pour enrichir `plugins/hacienda-droit-affaires`.

> **Garde-fou.** Ce document n'est pas un avis juridique, fiscal, social, reglementaire ou financier. Il sert a cadrer des besoins produit Hacienda. Toute source non consultee directement reste `[à vérifier]`. Aucun article de loi n'est cite comme valide. Tout sujet fiscal ou social, notamment la requalification des gains managers, est seulement signale et renvoye a validation humaine specialisee.

## Methode et sources non-Legifrance

Le renversement de cadrage est assumé : on part de ce que l'avocat PE fait et nomme en pratique, puis seulement ensuite on rattache au droit formel quand c'est utile.

Sources consultees, sans dependance a Legifrance :

- AMF, [Investir via un fonds de capital-investissement (FCPR, FCPI, FIP)](https://www.amf-france.org/fr/espace-epargnants/comprendre-les-produits-financiers/placements-collectifs/capital-investissement-fcpr-fcpi-fip) : typologie capital-risque / developpement / transmission-LBO / retournement, risques, illiquidite, FCPR/FCPI/FIP.
- AMF, [Obligations en matière de commercialisation des FIA par les CIF](https://www.amf-france.org/fr/actualites-publications/actualites/obligations-en-matiere-de-commercialisation-des-fia-par-les-cif) : FIA professionnels francais, FPCI/FPS/SLP, commercialisation, documentation et adequation.
- France Invest, [Fonds de capital-investissement : FCPR/FPCI/SLP](https://www.franceinvest.eu/formation/fonds-de-capital-investissement-fcpr-fcpi-fip-fpci-slp/) : documents constitutifs, clauses de reglement, souscription, gouvernance, equity bridge facilities, master/feeder, carried interest.
- France Invest, [Decrypter les solutions de liquidite pour les fonds de capital-investissement](https://www.franceinvest.eu/formation/decrypter-les-solutions-de-liquidite-pour-les-fonds-de-capital-investissement/) : LP-led / GP-led secondaries, continuation funds, tender, stapled tender, NAV facility, preferred equity, GP stake.
- CMS, [European M&A Study 2026](https://cms.law/en/int/publication/CMS-European-M-A-Study-2026) : pratique M&A europeenne sur pricing mechanisms, locked box, earn-outs, MAC, caps, baskets, limitation periods, security for claims, W&I.
- Sources internes Hacienda consultees : `docs/backlog/da-pe-landscape-fr.md`, `pacte-associes-review`, `spa-review`, `gap-review`, `financement-startup`, `due-diligence-dataroom`, `closing-checklist-fr`.

Regle de registre :

- `[jargon marché]` = mot effectivement employe en pratique PE FR, souvent anglais, meme si le document juridique francais porte un autre nom.
- `[formel]` = rattachement juridique/documentaire francais utile, sans validation doctrinale.
- `[à vérifier]` = point de droit, fiscalite, social, AMF, qualification, ou article non verifie en source primaire.

## 1. Glossaire PE FR praticien

| Terme marche | Sens pratique | Equivalent / terme juridique formel si pertinent | Notes / verification |
|---|---|---|---|
| Private equity / PE | Capital-investissement, investissement en titres non cotes. | Capital-investissement. | AMF emploie capital-investissement / private equity. |
| LBO | Acquisition avec effet de levier, souvent via holding de reprise. | Capital-transmission, acquisition financee par dette et fonds propres. | Dette, CP financement, management package et pacte sont les zones de friction. |
| Sponsor | Fonds ou investisseur financier qui porte l'operation. | Investisseur financier / acquereur indirect. | Cote SPA, le sponsor agit souvent via BidCo/NewCo. |
| Fund / fonds | Vehicule d'investissement PE. | FCPR, FPCI, FPS, SLP, autre FIA. | Fonds Lux hors perimetre sauf effets FR. |
| GP | General Partner / sponsor gestionnaire dans le langage marche. | Societe de gestion / associe commandite selon structure. | Sur fonds FR, ne pas surtraduire : identifier le role reel. |
| LP | Limited Partner / investisseur du fonds. | Porteur de parts / associe commanditaire / investisseur. | `[à vérifier]` selon vehicule. |
| LPA | Document de fonds appele "LPA" par usage marche. | Reglement du fonds, statuts de SLP, documentation de souscription. | `[jargon marché]` courant meme si fonds FR != limited partnership agreement. |
| PPM / IM | Memorandum d'information investisseur. | Document d'information / memorandum de placement prive. | Commercialisation et informations investisseurs `[à vérifier]`. |
| Term sheet fonds | Resume economique et juridique du fonds avant docs definitifs. | Projet de conditions de souscription / reglement / statuts. | Douleur : coherences avec side letters et closing investors. |
| Subscription booklet | Pack de souscription investisseur. | Bulletin de souscription, KYC, declarations investisseur. | Souvent tres operationnel, source d'allers-retours. |
| Commitment | Engagement total de souscription d'un LP. | Engagement de souscription / engagement d'apport. | Ne pas confondre avec equity commitment d'un deal. |
| Capital call / drawdown | Appel de fonds fait aux LP. | Appel de fonds / liberation progressive. | Critique pour funds flow d'acquisition. |
| Defaulting LP | LP qui ne repond pas a un appel de fonds. | Porteur defaillant. | Sanctions et dilution/cession forcee `[à vérifier]`. |
| Closing fonds / final closing | Date(s) d'entree d'investisseurs dans le fonds. | Cloture de souscription initiale / finale. | Attention equalisation, retrocession frais, late interest. |
| Equalisation | Mise a niveau economique des LP entrant apres premier closing. | Ajustement d'entree tardive. | `[à vérifier]` selon reglement. |
| Management fee | Remuneration de gestion prelevee par la societe de gestion. | Frais de gestion. | Base commitment / invested capital : point economique central. |
| Carried interest / carry | Part de performance revenant a l'equipe de gestion. | Parts/actions de carried, droits specifiques. | Fiscalite du carried = signaler et renvoyer, jamais traiter au fond. |
| Waterfall | Ordre de distribution des produits du fonds. | Clause de repartition/distribution. | Hurdle, catch-up, carry, clawback a modeliser. |
| Hurdle / preferred return | Rendement preferentiel a atteindre avant carry. | Rendement prioritaire. | `[jargon marché]` habituel. |
| Catch-up | Rattrapage permettant au GP de toucher le carry apres hurdle. | Mecanisme de rattrapage. | Douleur : formule mal relue = economie fausse. |
| Clawback | Restitution si carry trop verse au regard de la perf finale. | Mecanisme de restitution / ajustement. | Souvent lie a escrow / garantie. |
| Escrow / holdback carry | Mise en reserve d'une partie du carry. | Sequestre / retenue. | Sert a securiser clawback. |
| GP commitment | Investissement propre du GP / equipe. | Souscription de la societe de gestion / equipe. | Alignement d'interets. |
| LPAC / advisory committee | Comite consultatif d'investisseurs. | Comite consultatif / comite de gouvernance. | Conflits, waivers, valuations, related-party deals. |
| Key person | Clause liee au depart ou indisponibilite de personnes cle. | Clause homme-cle. | Suspension investments / no-fault divorce `[à vérifier]`. |
| No-fault divorce | Droit des LP de mettre fin a la periode d'investissement ou de remplacer le GP sans faute. | Revocation / suspension sans faute. | Jargon courant fonds. |
| For-cause removal | Eviction du GP pour faute. | Revocation pour faute. | Seuil de vote et consequences economiques sensibles. |
| MFN | Most favoured nation, clause d'alignement des LP sur meilleurs droits. | Clause de traitement le plus favorise. | Side letters : matrice MFN chronophage. |
| Side letter | Lettre d'accord individuelle avec un LP. | Lettre d'engagement / accord lateral. | Douleur : coherence reglement, egalite de traitement, disclosure. |
| Excuse right / exclusion | Droit d'un LP de ne pas participer a un investissement interdit pour lui. | Clause d'excuse / exclusion. | ESG, sanctions, fiscal, regulatory. |
| Co-invest | Investissement direct d'un LP aux cotes du fonds. | Coinvestissement. | Allocation, frais, conflits. |
| Parallel fund | Fonds parallele pour certains investisseurs/juridictions. | Fonds parallele. | France/Lux frequent, gate obligatoire. |
| Master-feeder | Structure de collecte via feeders vers master. | Fonds nourricier / maitre. | France Invest cite master/feeder comme structuration complexe. |
| Continuation fund | Fonds de continuation pour conserver un actif. | Vehicule de continuation. | GP-led secondary ; valorisation et conflits. |
| LP-led secondary | Cession de parts de fonds initiee par un LP. | Transaction secondaire sur parts. | France Invest l'identifie comme solution de liquidite. |
| GP-led secondary | Operation secondaire initiee par le GP. | Restructuration / continuation / tender. | Conflits, fairness opinion, LPAC. |
| Tender offer / stapled tender | Offre de liquidite aux LP, parfois liee a un engagement dans un nouveau fonds. | Offre de rachat de parts / souscription liee. | Jargon marche. |
| NAV facility | Financement adosse a la valeur du portefeuille du fonds. | Financement sur valeur d'actif net. | Dette au niveau fonds ; hors M&A cible sauf effet sur closing. |
| Subscription line / equity bridge | Ligne de credit adossee aux commitments LP. | Financement relais d'appels de fonds. | France Invest parle d'equity bridge facilities. |
| Preferred equity fonds | Financement hybride prioritaire au niveau fonds/portefeuille. | Financement preferentiel. | A ne pas confondre avec actions de preference de BidCo. |
| GP stake | Prise de participation dans la societe de gestion. | Acquisition/cession de titres de SGP. | France Invest : consolidation SGP, changement d'actionnariat, AMF. |
| BidCo / NewCo | Holding d'acquisition qui achete la cible. | Societe holding de reprise. | Peut etre FR meme si fonds sponsor Lux. |
| HoldCo / MidCo / TopCo | Etages de holding. | Holdings intermediaires. | Identifier qui signe quoi : SPA, pacte, dette, management. |
| Equity ticket | Montant de fonds propres investi dans le deal. | Apport en fonds propres. | Par sponsor, co-investors, managers. |
| Sources & uses | Tableau des sources de financement et emplois au closing. | Plan de financement / funds flow. | Artefact cle closing. |
| Equity commitment letter / ECL | Engagement du sponsor d'apporter les fonds propres a BidCo. | Lettre d'engagement de fonds propres. | Conditions, cap, beneficiaire, recours vendeur. |
| Debt commitment letter / DCL | Engagement de dette bancaire. | Lettre de financement dette. | CP financement et certain funds. |
| Certain funds | Financement disponible de facon quasi certaine au closing. | Engagement de financement ferme sous conditions limitees. | Concept marche ; formalisation a verifier. |
| Funds flow | Sequence des virements au closing. | Tableau de flux / instructions de virement. | Tres forte valeur IA : reconciliation sources & uses / closing bible. |
| Locked box | Prix fixe fonde sur comptes historiques avec protection leakage. | Mecanisme de prix fixe avec date de reference economique. | CMS suit locked box comme pricing mechanism. |
| Leakage | Sortie de valeur interdite entre locked box date et closing. | Distribution / paiement non autorise. | Doit etre rembourse hors plafond GAP cote acquereur `[review]`. |
| Permitted leakage | Leakage autorise liste contractuellement. | Sorties autorisees. | Liste souvent negociee ligne par ligne. |
| Completion accounts | Prix ajuste sur comptes de closing. | Comptes de realisation / ajustement dette nette-BFR. | Source de litiges post-closing. |
| Net debt / working capital adjustment | Ajustement dette nette et BFR. | Ajustement de prix. | Definitions et sample statement critiques. |
| Earn-out | Complement de prix lie a performance future. | Complement de prix. | CMS note les earn-outs comme pricing-related terms. |
| MAC / MAE | Material adverse change/effect. | Changement defavorable significatif. | CMS suit les MAC clauses ; definition et exclusions sensibles. |
| Interim covenants | Engagements de gestion entre signing et closing. | Engagements de periode intercalaire. | Equilibre entre controle acquereur et gestion normale. |
| CP / conditions precedent | Conditions a lever avant closing. | Conditions suspensives. | Financement, autorisations, agrément, CSE, antitrust, FDI `[à vérifier]`. |
| W&I / RWI | Warranty & indemnity insurance. | Assurance de garantie de passif / assurance transactionnelle. | Articulation GAP / exclusions / retention. |
| GAP | Garantie d'actif et de passif. | Garantie d'actif et de passif FR. | Socle Hacienda existant ; ne pas calquer R&W US. |
| Disclosure letter | Lettre listant exceptions aux garanties. | Lettre de revelation / exceptions aux declarations. | En FR, articulation avec devoir d'information `[à vérifier]`. |
| Fundamental warranties | Garanties fondamentales : titre, capacite, pouvoirs. | Declarations fondamentales. | Souvent hors cap ou cap specifique. |
| Specific indemnity | Indemnisation dediee a un risque identifie. | Garantie specifique / indemnité specifique. | Issue DD -> SPA/GAP. |
| Knowledge qualifier | Garantie limitee a la connaissance du garant. | Limitation par connaissance. | Side-dependent : vendeur aime, acquereur resiste. |
| De minimis / basket | Seuil unitaire et panier de declenchement. | Seuils de reclamation / franchise. | CMS suit baskets / de minimis. |
| Cap | Plafond de responsabilite. | Plafond d'indemnisation. | Peut varier : general, fondamental, fiscal/social `[à vérifier]`. |
| Retention | Part de risque conservee hors assurance W&I. | Franchise / retention police. | A articuler avec GAP et escrow. |
| Security for claims | Garantie de paiement des claims. | Sequestre, garantie autonome, caution, holdback. | CMS suit security for claims. |
| Management package / MEP | Incentive equity des managers. | Instruments + pacte + promesses + leaver. | Fiscal/social = danger majeur `[à vérifier]`. |
| Sweet equity | Titres souscrits a economics asymetriques favorables aux managers. | BSA, ADP, AO, actions de preference, autres instruments. | Requalification remuneration/salaire signalee, non traitee. |
| Envy ratio | Ratio d'investissement sponsor/managers rapporté a leur part de valeur. | Indicateur economique non juridique. | Douleur : perception d'iniquite, fiscal/social `[à vérifier]`. |
| Ratchet | Mecanisme d'ajustement de participation / rendement. | Clause anti-dilution ou relution / ajustement. | Attention startup ratchet != MEP ratchet. |
| Vesting | Acquisition progressive des droits. | Acquisition conditionnelle / promesses echelonnees. | Souvent lie au temps et a la presence. |
| Reverse vesting | Perte progressive si depart avant terme. | Promesse de cession/rachat conditionnelle. | Source de contentieux leaver. |
| Good leaver | Depart favorable ou non fautif. | Cas de depart non sanctionne. | Deces, invalidite, retraite, revocation sans cause : a calibrer. |
| Bad leaver | Depart fautif ou concurrence. | Cas de depart sanctionne. | Prix nominal/decote : risque confiscatoire `[review]`. |
| Early / intermediate leaver | Depart avant jalons ou entre deux periodes. | Categorie intermediaire de leaver. | Evite binaire good/bad trop brutal. |
| Rollover / reinvest | Reinvestissement d'une partie du prix par managers/vendeurs. | Reinvestissement en titres de BidCo/HoldCo. | Sequence cash-out -> reinvest -> pacte. |
| Liquidity right | Droit de liquidite manager/minoritaire. | Promesse de vente/achat, sortie conjointe, put/call. | Le vrai besoin manager : sortie possible. |
| Drag / tag | Sortie forcee / sortie conjointe. | Clause d'entrainement / sortie conjointe. | Deja coeur de `pacte-associes-review`. |
| ROFR / preemption | Droit de premier refus / preemption. | Preemption contractuelle/statutaire. | Precedence statuts-pacte critique. |
| Reserved matters / veto | Decisions reservees au sponsor/LP/manager. | Droits de veto / autorisations prealables. | Attention gestion de fait / blocage `[review]`. |
| Information rights | Reporting du sponsor/LP/minoritaire. | Droit d'information contractuel. | A calibrer avec confidentialite et banques. |
| Exit | Sortie sponsor : trade sale, secondary buyout, IPO. | Cession, introduction, restructuration. | Pacte pilote la liquidite et drag. |
| Add-on / build-up | Acquisition complementaire par plateforme PE. | Croissance externe. | SPA repeats + financement + integration. |
| Change of control | Clause declenchee par changement de controle. | Consentement / resiliation de contrat cle. | DD cible : red flag recurrent. |
| Vendor DD / VDD | DD preparee cote vendeur. | Audit vendeur. | Sert a accelerer process et disclosure. |
| Q&A | Questions/reponses dataroom. | Liste de questions complementaires. | Artefact operationnel fort pour IA. |
| Red flag report | Rapport court sur risques majeurs. | Rapport de DD red flags. | Partner-ready, utile en PE. |
| Closing bible | Dossier final des actes signes et preuves. | Bible de closing. | Post-closing et audit trail. |

## 2. Grands jobs PE : clauses, douleurs, jargon, mapping skills

### 2.1 Vehicle fonds

**Ce que l'avocat fait.** Structurer ou relire le vehicule de fonds, ses organes, sa societe de gestion, son depositaire, ses investisseurs cibles, sa strategie, ses frais et ses documents constitutifs.

**Taxonomie clauses / jargon.**

- Structure : FCPR, FPCI, FPS, SLP, feeder, master, parallel fund, compartment, evergreen, closed-ended.
- Parties/roles : GP, LP, societe de gestion, depositaire, LPAC, CAC, delegates.
- Fonctionnement : commitment, subscription period, closing, capital calls, defaulting LP, transfer of interests, valuation, reporting.
- Gouvernance : investment committee, advisory committee, conflicts, related-party transactions, key person, no-fault divorce, for-cause removal.
- Economie : management fee, carried interest, waterfall, GP commitment, expenses, organisational costs.

**Douleurs recurrentes.**

- Traduire l'usage "LPA" vers le bon support FR sans perdre les economics.
- Verifier que les side letters ne contredisent pas le reglement/statuts.
- Cartographier qui decide : societe de gestion, LPAC, commandites, investisseurs.
- Gate Luxembourg : ne pas couvrir un fonds Lux ou SCSp comme si c'etait un fonds FR.

**Mapping Hacienda.**

- `pacte-associes-review` : reuse faible, seulement gouvernance/transfert si SLP societe.
- `spa-review` : hors coeur.
- `gap-review` : hors coeur.
- `financement-startup` : hors coeur.
- Decision : **skill neuf ou mode leger `fonds-pe-fr-triage`**, seulement si Hacienda veut servir les equipes fonds. Sinon gate et renvoi humain.

### 2.2 Term sheet fonds

**Ce que l'avocat fait.** Transformer des economics de fonds en points negociables avant redaction lourde : strategy, term, target size, hard cap, fees, carry, hurdle, key person, investor governance.

**Taxonomie clauses / jargon.**

- Economics : target size, hard cap, minimum commitment, management fee step-down, waterfall, hurdle, catch-up, GP commitment.
- Gouvernance : LPAC, key person, suspension, removal, no-fault divorce, extension.
- Investissements : investment period, follow-on, recycling, borrowing, concentration limits, co-invest, ESG/sanctions exclusions.

**Douleurs recurrentes.**

- Les termes economiques sont souvent figes tres tot : une ambiguite de waterfall ou catch-up devient tres couteuse.
- Les LP demandent des points side letter avant que le reglement soit stabilise.
- Les fiscal/social/regulatory items sont tentants a traiter ; Hacienda doit seulement les signaler `[à vérifier]`.

**Mapping Hacienda.**

- `financement-startup` : analogie instruments/term sheet utile mais perimetre startup, reuse faible.
- `pacte-associes-review` : methode de triage clauses de gouvernance reutilisable.
- Decision : **skill neuf fonds**, pas prioritaire en premiere vague PE M&A.

### 2.3 Side letters investisseurs

**Ce que l'avocat fait.** Revoir les demandes LP et les articuler avec le reglement/statuts : MFN, reporting, excuse rights, sanctions, ESG, co-invest, confidentiality, transfers.

**Taxonomie clauses / jargon.**

- MFN, most favoured nation election, side letter matrix.
- Excuse/exclusion, sanctions, ERISA-like constraints, tax blockers `[à vérifier]`.
- Reporting/information rights, ESG side undertakings, co-invest allocation, advisory committee seat.
- Transfers, confidentiality, sovereign immunity, jurisdiction.

**Douleurs recurrentes.**

- Construire la matrice MFN et reperer les droits non offerts aux autres LP.
- Eviter qu'un droit LP bloque une acquisition sponsor cote BidCo.
- Distinguer droit du fonds et effet deal : un side letter peut interdire un secteur ou imposer un reporting post-closing.

**Mapping Hacienda.**

- `pacte-associes-review` : patterns droits d'information / transfert / gouvernance, mais contexte fonds distinct.
- Decision : **mode fonds/side-letter neuf**, faible priorite si scope M&A cible.

### 2.4 Waterfall / carry

**Ce que l'avocat fait.** Relire la formule economique de distribution et les clauses de protection : hurdle, catch-up, carry, escrow, clawback, GP commitment.

**Taxonomie clauses / jargon.**

- European waterfall vs deal-by-deal waterfall, preferred return/hurdle, catch-up, carried interest, GP catch-up.
- Clawback, escrow, net-of-tax, holdback, giveback, final true-up.
- Allocation expenses, broken-deal costs, recycling, recallable distributions.

**Douleurs recurrentes.**

- Les erreurs ne sont pas seulement juridiques : elles sont de calcul et de sequence.
- Fiscalite carried = zone rouge `[à vérifier]`; ne jamais confirmer regime, taux, conditions.
- Alignement avec side letters et PPM.

**Mapping Hacienda.**

- `financement-startup` : peut aider sur instruments mais pas waterfall.
- Decision : **skill neuf specialise seulement si pratique fonds assumee**. Pour premiere vague, simple glossaire + gate.

### 2.5 Acquisition sponsor

**Ce que l'avocat fait.** Piloter l'achat par sponsor : LOI, DD, SPA, financement, management, W&I, pacte post-closing, closing.

**Taxonomie clauses / jargon.**

- Structure : BidCo/NewCo/HoldCo/MidCo/TopCo, sources & uses, equity ticket, debt package, funds flow.
- Prix : locked box, leakage, permitted leakage, completion accounts, earn-out, net debt, working capital.
- Execution : CP, MAC, interim covenants, antitrust/FDI `[à vérifier]`, CSE/social `[à vérifier]`, third-party consents.
- Protection : GAP, W&I/RWI, disclosure letter, specific indemnities, caps, baskets, escrow.
- Management : rollover, MEP, leaver, non-compete, reinvest.

**Douleurs recurrentes.**

- Les documents sont interdependants : SPA, GAP, W&I, debt commitment, equity commitment, pacte, management package.
- Locked box mal protegee par leakage, ou completion accounts sans definitions calculables.
- CP financement trop discretionnaire ou incoherente avec DCL/ECL.
- MAC importee sans seuil ni carve-outs adaptes.

**Mapping Hacienda.**

- `spa-review` : **mode PE sponsor prioritaire**.
- `gap-review` : extension PE pour W&I / disclosure / specific indemnities.
- `pacte-associes-review` : renvoi pacte d'investissement et management.
- `financement-startup` : renvoi instruments du management package seulement.
- Decision : **mode `spa-review --pe`**, tres fort ratio valeur/reuse.

### 2.6 Equity / debt commitment

**Ce que l'avocat fait.** Verifier que le vendeur peut compter sur les fonds au closing et que BidCo peut tirer dette/equity selon les memes conditions que le SPA.

**Taxonomie clauses / jargon.**

- ECL : cap, conditions, beneficiaries, third-party rights, enforcement, sponsor fund authority, termination.
- DCL : certain funds, CP dette, market flex, security package, drawstop, fees, long-stop.
- SPA : CP financement, reverse break fee, efforts covenant, cooperation covenant.
- Closing : funds flow, evidence of funds, pay-off letters, release of security.

**Douleurs recurrentes.**

- CP financement du SPA incoherente avec DCL/ECL.
- Lettre d'engagement signee par la mauvaise entite du fonds.
- Conditions "a discretion" qui donnent un faux confort.
- Funds flow qui ne reconcilie pas dette, equity, prix, frais, escrow, rollover.

**Mapping Hacienda.**

- `spa-review` : extension CP financement / signing-ready.
- `closing-checklist-fr` hors mapping demande mais brique naturelle.
- `gap-review` : peu pertinent.
- `financement-startup` : instruments non.
- Decision : **mode PE de `spa-review` + extension closing**, skill neuf dette seulement plus tard.

### 2.7 Management package

**Ce que l'avocat fait.** Structurer ou revoir l'alignement managers/sponsor : instruments, prix d'entree, upside, downside, retention, liquidite, leaver, fiscal/social en renvoi.

**Taxonomie clauses / jargon.**

- Instruments : sweet equity, ordinary shares, ADP, BSA, BSPCE, AGA, options, OC/OCA, preferred shares `[à vérifier]`.
- Economics : envy ratio, ratchet, hurdle, vesting, reverse vesting, fully diluted, dilution, exit proceeds.
- Leaver : good/bad/early/intermediate leaver, leaver price, fair market value, nominal value, cause, disability/death/retirement.
- Liquidite : drag, tag, put/call, IPO lock-up, secondary exit, sponsor exit.
- Protection sponsor : non-compete, non-solicit, confidentiality, IP, exclusivity, governance.

**Douleurs recurrentes.**

- Requalification fiscale/sociale des gains managers : signaler, renvoyer fiscaliste/socialiste, ne pas traiter.
- Les managers signent souvent plusieurs documents : SPA rollover, subscription, pacte, promises, employment/mandat docs.
- Bad leaver a prix nominal trop large : risque de clause confiscatoire `[review]`.
- Envy ratio et ratchet mal expliques : risque d'incomprehension client et de contentieux.
- Frontiere instruments vs clauses de pacte : aujourd'hui le socle Hacienda coupe le sujet en deux.

**Mapping Hacienda.**

- `financement-startup` : instruments BSA/BSPCE/AGA/OC, reuse partiel mais contexte startup.
- `pacte-associes-review` : leaver, vesting, liquidite, drag/tag, veto, non-compete, reuse fort.
- `spa-review` : rollover et covenants managers.
- `gap-review` : garanties managers si managers cédants.
- Decision : **candidat skill neuf `management-package-pe`**, orchestrateur des deux skills existants, avec garde-fous fiscal/social tres stricts.

### 2.8 Rollover / reinvest managers

**Ce que l'avocat fait.** Organiser cash-out partiel et reinvestissement managers dans BidCo/HoldCo, avec sequence closing et adhesion au pacte.

**Taxonomie clauses / jargon.**

- Rollover percentage, reinvestment obligation, net proceeds, gross-up `[à vérifier]`, subscription price.
- Contribution/cession/apport, exchange, roll-over equity, locked-in equity.
- Promesses de vente/achat, liquidity, leaver, drag/tag, tax/social renvoi.
- Funds flow : paiement prix sortant puis souscription/reinvest.

**Douleurs recurrentes.**

- Precedence entre SPA, pacte existant, pacte d'investissement, statuts.
- Sequencage : le manager doit recevoir du cash et reinvestir le meme jour, parfois avec financement personnel.
- Fiscalite plus-values / report / apport-cession : signaler `[à vérifier]`, renvoi.
- Un manager vendeur peut aussi etre garant GAP : conflit d'interets.

**Mapping Hacienda.**

- `spa-review` : mode PE, clause rollover et closing sequence.
- `pacte-associes-review` : liquidite/leaver post-closing.
- `financement-startup` : instruments de souscription.
- Decision : **mode PE dans `spa-review` + `pacte-associes-review`**, pas skill neuf seul.

### 2.9 Pacte d'investissement

**Ce que l'avocat fait.** Revoir la gouvernance post-closing et les droits economiques/transfert entre sponsor, managers, co-investors et minoritaires.

**Taxonomie clauses / jargon.**

- Governance : board composition, reserved matters, veto, quorum, deadlock, information rights.
- Economics : liquidation preference, anti-dilution, ratchet, priority returns, sweet equity mechanics.
- Transfers : lock-up, permitted transfers, ROFR, preemption, drag, tag, IPO, exit, secondary sale.
- Managers : vesting, leaver, non-compete, non-solicit, exclusivity, liquidity.
- Precedence : statuts, pacte existant, accession deed, termination, amendment.

**Douleurs recurrentes.**

- Pacte d'investissement superpose a un pacte existant sans clause de precedence claire.
- Veto sponsor trop large : risque de blocage et, selon contexte, gestion de fait `[review]`.
- Drag sans seuil, sans egalite de prix/conditions, ou imposant garanties personnelles excessives aux minoritaires.
- Leaver et non-concurrence melangent qualite d'associe, salarie, mandataire.

**Mapping Hacienda.**

- `pacte-associes-review` : **mode PE prioritaire** avec playbook sponsor/manager.
- `financement-startup` : renvoi instruments/anti-dilution si titres.
- `spa-review` : coherences SPA/pacte/statuts.
- `gap-review` : seulement garanties personnelles managers/cédants.
- Decision : **meilleur premier chantier PE**.

### 2.10 W&I / assurance GAP

**Ce que l'avocat fait.** Articuler SPA/GAP, disclosure et police W&I : exclusions, retention, subrogation, claims process, recourse contre cédants.

**Taxonomie clauses / jargon.**

- Policy, insured, insurer, broker, underwriting, non-binding indication, binder.
- Retention, de minimis, cap/policy limit, exclusions, known matters, tax/social/environment exclusions `[à vérifier]`.
- Fundamental warranties, title/capacity, synthetic warranties, bring-down.
- No recourse / recourse, subrogation waiver, fraud carve-out, disclosure, data room.

**Douleurs recurrentes.**

- Croire que W&I remplace la GAP : elle la recopie souvent avec exclusions.
- GAP et police ont des definitions differentes.
- Exclusions W&I laissent des risques identifies sans indemnity specifique.
- Timings underwriting / disclosure / signing tres serres.
- Garantie de la garantie : qui paie si cédant fragile ? escrow, W&I, specific indemnity.

**Mapping Hacienda.**

- `gap-review` : **mode W&I PE prioritaire**.
- `spa-review` : articulation SPA / disclosure / CP.
- `pacte-associes-review` : peu.
- `financement-startup` : hors sujet.
- Decision : **extension de `gap-review`, pas skill neuf au depart**.

### 2.11 Due diligence cible PE

**Ce que l'avocat fait.** Produire une DD red flags orientee prix, SPA/GAP, CP, W&I et integration post-closing.

**Taxonomie clauses / jargon.**

- Process : VDD, buyside DD, Q&A, red flag report, reliance letter, materiality threshold.
- Corporate : cap table, chain of title, statuts, pactes, registre mouvements titres, approvals.
- Commercial contracts : change of control, exclusivity, termination for convenience, customer concentration, most favoured customer.
- Finance/debt : existing debt, change of control defaults, security releases, cash pooling.
- Social/tax : management status, incentives, audits, payroll, CSE, tax exposures `[à vérifier]`.
- Regulatory/IP/RGPD : permits, data protection, open source, key licences, sanctions.

**Douleurs recurrentes.**

- DD de volume : trop de docs, pas assez de temps, besoin de red flags actionnables.
- Red flags non convertis en protections SPA/GAP/W&I/CP.
- Change of control dans contrats cles oublie avant closing.
- Fiscal/social trop vite conclus : Hacienda doit signaler et renvoyer.

**Mapping Hacienda.**

- `spa-review` : consomme findings DD -> protections SPA.
- `gap-review` : axe confrontation DD -> garanties.
- `pacte-associes-review` : cap table/pactes/statuts.
- `financement-startup` : instruments management.
- Hors mapping demande : `due-diligence-dataroom` est deja la brique naturelle ; **mode PE red-flags** a forte valeur.

### 2.12 Closing / funds flow

**Ce que l'avocat fait.** Piloter CP, actes, flux financiers, release de sûretés, rollover, appels de fonds, dette, equity, formalites post-closing.

**Taxonomie clauses / jargon.**

- CP tracker, long-stop date, waiver, bring-down, closing deliverables.
- Funds flow, sources & uses, wiring instructions, pay-off letters, release letters, escrow agreement.
- Equity calls, ECL draw, debt drawdown, management rollover, fees, leakage payment, W&I premium.
- Closing bible, register update, titres, post-closing filings, KYC.

**Douleurs recurrentes.**

- Table funds flow incoherente avec SPA, DCL/ECL, escrow, management reinvest.
- Appels de fonds LP pas alignes avec closing date.
- Release de sûretés ou pay-off letters manquantes.
- Formalites titres et enregistrement traitees comme accessoires alors qu'elles conditionnent l'opposabilite / fiscalite `[à vérifier]`.

**Mapping Hacienda.**

- `spa-review` : readiness signing/closing et CP.
- `gap-review` : claims/security only.
- `pacte-associes-review` : adhesion managers/pacte.
- `financement-startup` : souscription instruments managers.
- Hors mapping demande : `closing-checklist-fr` doit recevoir un **mode PE funds flow**.

## 3. Top 5 des douleurs où l'IA apporte le plus

| Rang | Douleur PE | Pourquoi l'IA aide | Valeur x frequence x risque |
|---|---|---|---|
| 1 | **Precedence SPA / statuts / pacte existant / pacte d'investissement / management docs** | Extraction des clauses de precedence, accession, termination, restrictions de transfert, puis matrice de conflits. | Tres eleve : frequent, bloque le closing, reutilise `pacte-associes-review` et `spa-review`. |
| 2 | **Management package : leaver / vesting / sweet equity / ratchet / fiscal-social en renvoi** | L'IA peut cartographier les documents, nommer les economics et produire une liste de questions fiscal/social sans donner d'avis. | Tres eleve : valeur client forte, risque fort, mais garde-fous stricts. |
| 3 | **Articulation GAP / W&I / disclosure / DD findings** | Reconciliation de definitions, exclusions, caps, retention, garanties fondamentales et specific indemnities. | Eleve : tres pratique, fort reuse `gap-review`. |
| 4 | **CP financement + ECL/DCL + funds flow** | Verification croisee SPA, commitment letters, sources & uses, closing checklist et virements. | Eleve : capote tard, gros cout de stress, bon candidat automatisation. |
| 5 | **DD red flags transformes en protections deal** | Transformer change of control, litiges, dette, social/tax `[à vérifier]` en CP, indemnities, price chips et Q&A list. | Eleve : deja proche de `due-diligence-dataroom`, `spa-review`, `gap-review`. |

## 4. Short-list candidats skill / mode PE — priorite valeur pratique

| Priorite | Candidat | Livrable attendu | Reutilisation socle durci | Pourquoi maintenant |
|---|---|---|---|---|
| 1 | `pacte-associes-review --mode=pe` | Revue pacte d'investissement / management clauses : drag/tag, leaver, vesting, liquidite, veto, anti-dilution, precedence. | **80-90 %** | Douleur la plus frequente, deja dans le playbook, peu de doctrine nouvelle si on reste clauses. |
| 2 | `spa-review --mode=pe-sponsor` | Revue SPA sponsor : locked box/completion accounts, CP financement, MAC, W&I, rollover, funds flow renvois. | **70-80 %** | Persona M&A deja servi ; ajoute le vocabulaire PE sans refaire tout le skill. |
| 3 | `gap-review --mode=wi-pe` | Matrice GAP/W&I/disclosure/exclusions/retention/specific indemnities. | **70 %** | Forte valeur, risque circonscrit, extension naturelle du socle GAP. |
| 4 | `closing-checklist-fr --mode=pe-funds-flow` | CP tracker + sources & uses + funds flow + ECL/DCL + rollover + release security. | **60-70 %** | Tres operationnel ; reduit les erreurs de closing. |
| 5 | `management-package-pe` | Orchestrateur instruments + pacte + SPA rollover + check fiscal/social a renvoyer. | **50-60 %** | Valeur tres forte mais risque fiscal/social : a lancer avec garde-fous avant toute analyse de fond. |
| 6 | `due-diligence-dataroom --mode=pe-red-flags` | Rapport red flags PE converti en CP / GAP / W&I / price chips / Q&A. | **60 %** | Utile, mais peut venir apres SPA/GAP pour consommer mieux les outputs. |
| 7 | `fonds-pe-fr-triage` | Triage non definitif de reglement/statuts/side letters FPCI/FCPR/SLP. | **20-30 %** | Pratique fonds distincte, AMF/fiscal plus lourds ; a differer si cible produit = M&A sponsor. |

Premiere vague recommandee : **ne pas commencer par le fonds**. Commencer par la specialisation M&A PE : pacte d'investissement, SPA sponsor, GAP/W&I, closing/funds flow. Le fonds FR vient ensuite si Hacienda veut couvrir les equipes funds.

## 5. Frontiere France / Luxembourg

### Gate obligatoire

Avant toute sortie PE, poser le gate :

1. Le fonds / sponsor est-il francais, luxembourgeois ou autre ?
2. Quelle entite signe le SPA : fonds, BidCo FR, LuxCo, autre ?
3. Quels documents sont regis par droit francais ?
4. Le management package est-il emis par une societe francaise ?
5. Le pacte vise-t-il une SAS/HoldCo FR ou une entite luxembourgeoise ?

### Dedans / dehors / mixte

| Zone | Hacienda DA peut couvrir | A exclure / renvoyer | Comment le dire |
|---|---|---|---|
| Cible FR | DD, SPA/protocole FR, GAP, CP, closing, formalites societaires FR `[à vérifier]`. | Fiscal/social/reglementaire specialises. | Dedans, avec renvois. |
| BidCo / NewCo FR | Statuts/pacte FR, equity commitment effects, funds flow, management rollover FR. | Dette et sûretés complexes si hors skill. | Dedans si droit FR. |
| Pacte d'investissement SAS/HoldCo FR | Drag/tag, leaver, veto, information, liquidite, precedence, non-concurrence associe. | Pacte Lux / shareholders agreement Lux. | Dedans pour pacte FR. |
| Management package FR | BSA/BSPCE/AGA/ADP, leaver, vesting, liquidite, renvoi fiscal/social. | Traitement fiscal/social definitif ; instruments Lux. | Dedans seulement en triage prudent. |
| Fonds FR FPCI/FCPR/FPS/SLP | Triage documents constitutifs, side letters, LPAC, commitments, carry, avec AMF/fiscal `[à vérifier]`. | Avis reglementaire/fiscal fonds definitif. | Mixte ; skill fonds requis. |
| Fonds Lux / SCSp / RAIF / Lux GP/AIFM | Effets factuels sur deal FR, contraintes a signaler. | Documents constitutifs Lux, LPA Lux, side letters Lux, AIFM/depositaire Lux. | Dehors : renvoi avocat Lux. |
| Fonds Lux -> BidCo FR -> cible FR | SPA FR, BidCo FR, GAP, pacte FR, management FR, closing FR. | LPA Lux, subscription docs Lux, side letters Lux. | Mixte : couvrir la jambe FR, gate Lux explicite. |

Formulation type a integrer dans les futurs modes PE :

> "Je traite la jambe francaise de l'operation : cible FR, SPA/GAP/pacte/management package regis par droit francais et closing FR. Les documents constitutifs du fonds luxembourgeois, son LPA/side letters, son AIFM, son depositaire et les contraintes de droit luxembourgeois sont hors perimetre Hacienda DA et doivent etre valides par un conseil luxembourgeois."

## Synthese produit

Le bon produit PE Hacienda n'est pas d'abord un encyclopedie de fonds. C'est un **copilote M&A sponsor FR** qui parle le langage reel du cabinet : BidCo, locked box, W&I, ECL/DCL, funds flow, management package, rollover, pacte d'investissement, leaver, sweet equity, envy ratio, drag/tag.

La premiere vague devrait donc livrer :

1. **Mode PE de `pacte-associes-review`** pour pacte d'investissement et management clauses.
2. **Mode PE de `spa-review`** pour acquisition sponsor, pricing, CP financement, W&I et rollover.
3. **Mode PE/W&I de `gap-review`** pour articulation GAP / assurance / disclosure / DD.
4. **Mode PE funds flow de `closing-checklist-fr`** pour transformer le signing-ready en closing-ready.
5. Ensuite seulement, **skill `management-package-pe`** si les garde-fous fiscal/social sont verrouilles.
