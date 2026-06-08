NOTES DE TRAVAIL — Faire valider par l'avocat M&A référent avant tout usage externe.

> **⚠️ Note du relecteur**
> - **Sources :** Légifrance ✗ (non consultée dans cette session — articles cités à vérifier via `verifier-citations`) / Judilibre ✗ / Pappers ✗ / BODACC ✗
> - **Lecture :** scénario `faits.md` lu intégralement ; aucun document opérationnel (SPA, statuts NEXAPHARM, projet de mainlevée, lettre de financement) fourni — checklist générée sur la base de l'intake.
> - **Signalé pour ton jugement :** 9 éléments marqués `[review]` — principalement la qualification de l'organe d'agrément (statuts à relire), la qualification réglementaire de l'activité « distribution de dispositifs médicaux », l'affirmation du conseil acquéreur sur le transfert de propriété (cf. §4), et la condition « financement » (potestative côté acquéreur).
> - **Fraîcheur :** non vérifiée — formalité d'enregistrement et délai à reconfirmer auprès de l'expert-comptable (taux et délai relèvent de la fiscalité, hors périmètre de ce skill).
> - **Avant de t'appuyer dessus :** (1) **corriger sans délai** auprès de l'équipe acquéreur l'idée que « les formalités peuvent être régularisées plus tard » — l'inscription au registre de mouvements de titres et la mise à jour des comptes d'associés conditionnent l'opposabilité de la cession `[review]` ; (2) faire confirmer à l'expert-comptable / `hacienda-fiscal` la formalité et le délai d'enregistrement (taux NON chiffrés ici) ; (3) instruire la qualification réglementaire « distribution de dispositifs médicaux » (déclaration / autorisation) → renvoi `hacienda-reglementaire`.

> ⚠️ **Profil cabinet non configuré** — le bloc M&A / Corporate de `~/.claude/plugins/config/hacienda-juridique/hacienda-droit-affaires/CLAUDE.md` est en `[A CONFIGURER]`. Side `acquéreur` retenu à partir du paramètre du scénario ; matrice d'approbateurs non disponible — escalade par défaut « avocat M&A référent + sponsor business ». Lancer `/h-droit-affaires:entretien-demarrage` pour calibrer.

---

# Checklist de closing — Cession de 100 % des actions NEXAPHARM SAS

**Cadre.** Acquéreur : ALTAIR INVEST SAS. Cédants : OREN HOLDING SAS (majoritaire) + M. E et Mme F. Cible : NEXAPHARM SAS (distribution de dispositifs médicaux, ~70 salariés). Prix : 15 000 000 EUR. **Signing : 1er octobre 2026** (intervenu). **Closing visé : 31 octobre 2026.** Date de travail : 10 octobre 2026 → **J−21**.

**Point d'attention liminaire — affirmation du conseil acquéreur.** L'idée que « la signature de l'acte de cession au closing suffit à transférer la propriété des actions ; les formalités pourront être régularisées plus tard » est **inexacte pour les actions de SAS** : le transfert de propriété résulte de **l'inscription au registre de mouvements de titres** et de la **mise à jour des comptes d'associés** (art. L.228-1 et R.228-10 C.com. `[à vérifier]`). Tant que cette inscription n'est pas portée, la cession est **inopposable à la société et aux tiers** ; tarder expose en outre à pénalité d'enregistrement `[à vérifier]`. À corriger sans délai en interne acquéreur `[review]`.

---

## Étape 1 — Conditions suspensives (recensement)

Quatre conditions préalables (CPs) sont stipulées au SPA, complétées d'une condition réglementaire à instruire :

- **CP-1 — Agrément de la cession.** Les statuts soumettent toute cession à **l'agrément préalable de la collectivité des associés** (SAS — liberté statutaire, art. L.227-13 et L.227-14 C.com. `[à vérifier]`). L'organe d'agrément est ici **la collectivité des associés** (et non un conseil, comme dans les variantes courantes) `[review]` — relire les statuts pour vérifier (i) quorum / majorité, (ii) délai de réponse, (iii) effets du silence, (iv) procédure d'achat-substitution. Statut au 10/10/2026 : **non recueilli**. Responsable : cédants (notamment OREN HOLDING, majoritaire), pour convocation et tenue de la consultation. Bénéficiaire de la CP : usuellement l'acquéreur.
- **CP-2 — Financement acquéreur.** Obtention par ALTAIR INVEST de son financement. Caractère **potentiellement potestatif** côté acquéreur `[review]` — vérifier que le SPA encadre la condition par des « reasonable best efforts » (engagements de moyens), un calendrier de tirage et des certain funds. Statut : à confirmer. Responsable : ALTAIR INVEST. Bénéficiaire : acquéreur.
- **CP-3 — Mainlevée du nantissement sur les actions cédées.** Sûreté inscrite au profit d'une banque sur les actions NEXAPHARM. Statut : **non confirmée** au 10/10/2026. Responsable : cédants (qui doivent obtenir l'accord du créancier nanti et la radiation de l'inscription au registre de mouvements de titres / comptes d'associés). Bénéficiaire : acquéreur. Risque opérationnel : sans mainlevée, l'ordre de mouvement de titres ne peut pas être valablement inscrit `[review]`.
- **CP-4 — Démissions / nominations des mandataires sociaux.** Remise des lettres de démission des mandataires en place (président SAS, éventuels DG / membres d'organes statutaires) et nomination des nouveaux dirigeants désignés par l'acquéreur. Statut : à organiser. Responsable : cédants (démissions) et acquéreur (nominations via décisions des associés post-closing ou concomitantes selon statuts). Bénéficiaire : acquéreur.
- **CP-5 (à instruire) — Qualification réglementaire de l'activité.** « Distribution de dispositifs médicaux » est susceptible de relever d'**obligations déclaratives ou d'autorisation administrative** (statut de distributeur, traçabilité, matériovigilance, art. L.5211-1 et s. CSP `[à vérifier]`). Non tranché dans le dossier `[review]`. **Ce skill ne tranche pas — renvoi `hacienda-reglementaire`.** Si une autorisation s'avère requise, l'opération peut entraîner une obligation de déclaration de changement d'exploitant. À traiter avant le closing — ou, à défaut, stipulé en covenant post-closing avec calendrier explicite.
- **Bonus à vérifier — contrôle des concentrations / IEF.** Prix de 15 M€ et activité « dispositifs médicaux » : seuils de contrôle des concentrations probablement non atteints en France, mais à vérifier (chiffres d'affaires Cible) `[review]`. Activité « santé / dispositifs médicaux » : vérifier l'éventuel champ du **contrôle des investissements étrangers** (R.151-3 CMF) si l'acquéreur ou ses associés sont (in)directement extra-UE `[review]`.

### Volet 1 — Tableau des CPs

| # | Condition suspensive | Statut | Responsable | Échéance | Sévérité |
|---|---|---|---|---|---|
| CP-1 | Agrément de la cession par la collectivité des associés (statuts) | à lever | Cédants (convocation + tenue) | J−10 (≤ 21/10/2026) | 🔴 |
| CP-2 | Obtention du financement acquéreur | en cours `[review]` potestative | ALTAIR INVEST | J−7 (≤ 24/10/2026) — certain funds avant closing | 🟠 |
| CP-3 | Mainlevée du nantissement bancaire sur les actions cédées | à lever — non confirmée | Cédants + banque créancière | J−7 (≤ 24/10/2026) — radiation effective au closing | 🔴 |
| CP-4 | Démissions des mandataires sortants + nominations entrantes | à organiser | Cédants (démissions) / Acquéreur (nominations) | Le jour du closing | 🟡 |
| CP-5 | Qualification réglementaire « dispositifs médicaux » (déclaration / autorisation) `[review]` — renvoi `hacienda-reglementaire` | à instruire | Acquéreur (sous-traitance conseil sectoriel) | À trancher avant signing du closing memorandum, sinon covenant post-closing chiffré | 🟠 |
| CP-6 | Contrôle des concentrations (seuils CA) et IEF (R.151-3 CMF) `[review]` | à instruire | Acquéreur | Sans délai (préalable à toute notification éventuelle) | 🟡 |

**Lecture acquéreur.** Trois CPs sont sous la maîtrise des cédants (CP-1, CP-3, partie de CP-4) ; ALTAIR doit (a) **suivre activement** la convocation et la levée du nantissement, (b) ne pas laisser CP-2 dégénérer en levier potestatif, (c) **ne pas renoncer** à CP-3 sous prétexte d'avancer le closing — la mainlevée conditionne la régularité du registre de mouvements de titres.

---

## Étape 2 — Séquençage signing / closing

Le signing étant **intervenu** le 1er octobre 2026, l'opération est en **période intercalaire** jusqu'au 31 octobre 2026 (closing visé). La séquence ci-dessous combine les actions résiduelles d'interim, les actes du closing day et les premières actions post-closing.

### Volet 2 — Tableau de séquençage

| # | Étape | Acte / livrable | Moment | Responsable |
|---|---|---|---|---|
| 2.1 | Avant signing | SPA + GAP signés ; engagements d'interim ; conditions définies | 1er octobre 2026 (fait) | Conseils des deux parties |
| 2.2 | Interim — gouvernance courante | Respect des covenants d'interim (gestion en bon père de famille, absence d'opérations hors cours normal) | 02/10 → 31/10/2026 | Cédants + mandataires Cible |
| 2.3 | Interim — agrément (CP-1) | Convocation de la collectivité des associés ; PV d'agrément | J−21 → J−10 (≤ 21/10/2026) | Cédants + président SAS |
| 2.4 | Interim — financement (CP-2) | Confirmation des banques / fonds ; certain funds letter | ≤ J−7 (24/10/2026) | ALTAIR INVEST |
| 2.5 | Interim — mainlevée nantissement (CP-3) | Accord banque, mainlevée, radiation inscription au RMT | ≤ J−5 (26/10/2026) ; effet au closing | Cédants + banque |
| 2.6 | Interim — réglementaire (CP-5) | Note de qualification ; décision « pré-closing » ou « post-closing covenant » | ≤ J−7 | ALTAIR + conseil sectoriel |
| 2.7 | Interim — démissions / nominations (CP-4) | Lettres de démission datées du closing ; projets de décisions des associés | ≤ J−3 | Cédants / Acquéreur |
| 2.8 | Interim — réunion de pré-closing | Disclosure update ; bring-down certificate ; check pièces de closing | J−2 / J−1 | Tous |
| 2.9 | Closing day — constatation levée des CPs | Certificat de levée des CPs (CP-1, CP-2, CP-3, CP-4, CP-5 le cas échéant) signé par les parties | 31/10/2026 (matin) | Conseils |
| 2.10 | Closing day — ordres de mouvement de titres | OMT signés par chaque cédant (OREN, M. E, Mme F) au profit d'ALTAIR | 31/10/2026 | Cédants |
| 2.11 | Closing day — inscription au RMT et MAJ comptes d'associés | Inscription contemporaine au registre de mouvements de titres + mise à jour des comptes d'associés individuels | 31/10/2026 — **acte d'opposabilité** | Président / mandataire de la Cible |
| 2.12 | Closing day — paiement du prix | Virement TARGET2 prix de 15 000 000 EUR (ou via escrow / séquestre selon SPA) ; quittance | 31/10/2026 | ALTAIR INVEST → cédants |
| 2.13 | Closing day — gouvernance | Décisions des associés (nouvel actionnaire) : nominations nouveaux dirigeants ; constatation démissions ; le cas échéant modification statutaire | 31/10/2026 (après inscription RMT) | ALTAIR INVEST |
| 2.14 | Closing day — closing memorandum | Closing memorandum signé listant tous les actes échangés | 31/10/2026 | Conseils |
| 2.15 | Post-closing | Voir Étape 4 | À partir du 01/11/2026 | — |

**Point d'ordonnancement `[review]`.** L'inscription au RMT (2.11) intervient **après** la signature des OMT (2.10) et **avant** la décision des associés portant nomination des nouveaux dirigeants (2.13), de sorte que la décision soit prise par le nouvel actionnariat. Le paiement du prix (2.12) intervient classiquement **contre** la délivrance des OMT signés et de l'attestation d'inscription au RMT — séquence à arbitrer selon SPA (« simultaneous closing » ou « escrow release on registry confirmation »).

---

## Étape 3 — Documentation de closing (closing bible)

Liste des pièces à réunir et à signer au closing. Statut au 10/10/2026 ; côté acquéreur, ALTAIR doit confirmer la production / réception de chaque pièce.

### Volet 3 — Tableau de documentation

| # | Document | Volet | Statut | Responsable de la production |
|---|---|---|---|---|
| 3.1 | SPA + amendments éventuels | Actes principaux | Signé 01/10/2026 | Conseils des parties |
| 3.2 | GAP (convention de garantie d'actif et de passif) | Actes principaux | Signé 01/10/2026 — vérifier articulation avec disclosure update | Conseils |
| 3.3 | Disclosure letter / disclosure update | Annexes GAP | À actualiser à J−2 | Cédants |
| 3.4 | Ordres de mouvement de titres (un par cédant : OREN, M. E, Mme F) | Transfert titres | À produire — projets à circulariser J−5 | Cédants |
| 3.5 | Registre de mouvements de titres de NEXAPHARM (à jour) | Transfert titres — opposabilité | À vérifier (cohérence avec OMT existants et inscription du nantissement) | Cible / président |
| 3.6 | Comptes d'associés individuels (à jour, fermeture côté cédants, ouverture côté ALTAIR) | Transfert titres — opposabilité | À mettre à jour le jour du closing | Cible / président |
| 3.7 | PV de la collectivité des associés portant agrément de la cession (CP-1) | Levée CPs | À produire ≤ J−10 | Cédants |
| 3.8 | Lettre de confirmation de financement / certain funds (CP-2) | Levée CPs | À produire ≤ J−7 | ALTAIR / banques |
| 3.9 | Acte de mainlevée du nantissement bancaire + lettre de la banque + mention au RMT (CP-3) | Levée CPs / Sûretés | À produire ≤ J−5 | Cédants + banque |
| 3.10 | Lettres de démission des mandataires sortants (CP-4) | Gouvernance | À produire — datées du jour du closing | Cédants |
| 3.11 | Décisions des associés post-closing — nominations nouveaux dirigeants | Gouvernance | À préparer — projet J−3 | ALTAIR INVEST |
| 3.12 | Certificat de levée des CPs (bring-down) | Closing day | À produire 31/10/2026 | Conseils |
| 3.13 | Quittance de prix | Closing day | À produire 31/10/2026 | Cédants |
| 3.14 | Instructions de virement / convention d'escrow le cas échéant | Closing day | À confirmer | ALTAIR / agent escrow |
| 3.15 | Attestations sociales et fiscales de la Cible | DD / GAP — confirmation | À produire ≤ J−5 | Cédants |
| 3.16 | Attestation de non-procédure collective (cédants + Cible) | DD / GAP | À produire ≤ J−5 | Cédants |
| 3.17 | Statuts à jour de NEXAPHARM | Gouvernance | À vérifier — version contemporaine pour identifier la clause d'agrément | Cible |
| 3.18 | Formulaire CERFA d'enregistrement de la cession (préparation post-closing) | Fiscal | À préparer — voir Étape 4 | Acquéreur / rédacteur |
| 3.19 | Note de qualification réglementaire « dispositifs médicaux » (CP-5) `[review]` | Réglementaire | À produire — renvoi `hacienda-reglementaire` | ALTAIR + conseil sectoriel |
| 3.20 | Closing memorandum | Closing day | À produire 31/10/2026 | Conseils |
| 3.21 | Information / consultation CSE (si applicable — ~70 salariés) | Social | À instruire — renvoi `hacienda-social` `[review]` | Cédants / Cible |

**Pièce critique manquante au 10/10/2026.** Statuts à jour de NEXAPHARM (3.17) : sans eux, impossible de confirmer la portée exacte de la clause d'agrément (organe, quorum, délai, achat-substitution) ni la portée des clauses statutaires sur les cessions intra-groupe / changement de contrôle.

---

## Étape 4 — Formalités post-closing

Cession d'**actions** de SAS : les formalités post-closing sont **constitutives d'opposabilité** (RMT) ou **fiscalement contraignantes** (enregistrement). Ne pas les confondre avec de simples diligences administratives.

### Volet 4 — Tableau des formalités post-closing

| # | Formalité | Délai | Statut | Responsable |
|---|---|---|---|---|
| 4.1 | **Inscription au registre de mouvements de titres** de NEXAPHARM + **mise à jour des comptes d'associés** individuels (clôture côté cédants, ouverture côté ALTAIR) — **acte qui emporte le transfert opposable des actions** à la société et aux tiers (art. L.228-1 et R.228-10 C.com. `[à vérifier]`) | Sans délai — réalisée le jour même du closing | À faire 31/10/2026 | Président NEXAPHARM (ou mandataire) |
| 4.2 | **Radiation de l'inscription du nantissement** au RMT (CP-3) | Concomitante à la mainlevée — au closing | À faire 31/10/2026 | Président + banque |
| 4.3 | **Enregistrement de la cession** auprès du service des impôts (formulaire CERFA dédié) — **droits d'enregistrement dus** ; **taux et assiette `[à vérifier]` — renvoi expert-comptable / `hacienda-fiscal`** ; le **délai propre** d'enregistrement court à compter de l'acte ; son dépassement expose à **pénalité fiscale** `[à vérifier]` | Délai propre — `[à vérifier]` (1 mois usuel `[à vérifier]`) | À faire post-closing | Acquéreur / rédacteur de l'acte |
| 4.4 | Décisions des associés constatant le changement de gouvernance (si non concomitantes) ; dépôt au greffe et inscription RCS des changements de dirigeants | Délai légal de publicité (1 mois usuel `[à vérifier]`) | À faire post-closing | Cible / président |
| 4.5 | Mise à jour des registres légaux de la Cible (registre des décisions, registre des bénéficiaires effectifs au RCS — pour ALTAIR si nouveau bénéficiaire effectif `[à vérifier]`) | Sans délai / 30 jours `[à vérifier]` pour BE | À faire post-closing | Cible / président |
| 4.6 | Information des cocontractants soumis à clause de **changement de contrôle** (clients, fournisseurs, bailleurs, banques, assureurs) | Selon contrats — idéalement préalable, à défaut post-closing immédiat | À recenser via DD | ALTAIR / Cible |
| 4.7 | Information / consultation du CSE le cas échéant (Cible ~70 salariés — seuils d'information/consultation `[à vérifier]`) — renvoi `hacienda-social` | Délais propres — instruire en amont si possible | À instruire `[review]` | Cible / DRH |
| 4.8 | Déclarations / notifications réglementaires « dispositifs médicaux » (CP-5, si requises — changement d'exploitant, traçabilité) — renvoi `hacienda-reglementaire` | Délais sectoriels `[à vérifier]` | À instruire `[review]` | ALTAIR + conseil sectoriel |
| 4.9 | Notifications banques / assureurs / bailleurs si clause de changement de contrôle (subset de 4.6) | Selon contrats | À recenser | ALTAIR / Cible |
| 4.10 | Migration des pouvoirs bancaires, signataires, délégations | Sans délai opérationnel | À organiser | ALTAIR |

**Rappel `[review]`.** L'affirmation du conseil acquéreur selon laquelle « les formalités pourront être régularisées plus tard » est doublement risquée : (i) sur le plan **civil**, tant que l'inscription au RMT n'est pas portée, ALTAIR n'est **pas opposable** comme associé à la société et aux tiers — risque sur les décisions prises immédiatement après le closing (nominations dirigeants, financements) ; (ii) sur le plan **fiscal**, l'enregistrement de la cession a un délai propre court — le dépasser génère une pénalité `[à vérifier]`. À corriger en interne ALTAIR.

---

## Étape 5 — Post-flight

- `verifier-citations` : **non exécuté en session** (PISTE non confirmée connectée). Toutes les références d'articles C.civ / C.com. ci-dessus sont taguées `[à vérifier]` et doivent être validées avant usage. Citations à valider : L.228-1 C.com., R.228-10 C.com., L.227-13 C.com., L.227-14 C.com., R.151-3 CMF, L.5211-1 CSP.
- Mode dégradé documenté dans la note du relecteur.
- Aucun taux fiscal n'a été chiffré dans cette checklist ; toute mention de droits d'enregistrement est renvoyée à l'expert-comptable / `hacienda-fiscal`.

---

# Une question hors de ma checklist habituelle

Le SPA prévoit la cession de **100 %** des actions avec une **clause d'agrément** soumettant la cession à l'agrément de la **collectivité des associés**. Or les cédants OREN HOLDING + M. E + Mme F sont, par hypothèse, **les seuls associés** appelés à voter sur l'agrément d'une cession qu'ils consentent eux-mêmes : l'agrément est mécaniquement acquis dès lors qu'ils votent favorablement, ce qui fait de CP-1 une **formalité interne** plutôt qu'une condition substantielle. La vraie question est ailleurs : la **mainlevée du nantissement (CP-3)** est, opérationnellement, la condition la plus à risque dans ce calendrier — une banque créancière peut conditionner sa mainlevée au remboursement effectif de l'encours sur les fonds du closing, ce qui impose une **mécanique de flux à trois temps** (paiement ALTAIR → règlement banque → radiation → libération du solde aux cédants) à structurer dans le closing memorandum. Si ce n'est pas câblé d'ici J−5, le 31/10 ne tient pas.

---

# Que veux-tu faire ? Choisis une option et je la déroule :

1. **Rédiger** — je produis le **closing memorandum** (script du closing day, ordre des actes, flux financiers à trois temps banque-cédants, points de contrôle) et la **closing bible** (table des pièces à réunir avec hyperliens et statut par responsable), prêts à circulariser entre conseils.
2. **Escalader** — je rédige une **note d'escalade interne ALTAIR** (1 page) à destination de l'avocat M&A référent + du sponsor business, alertant sur (i) le risque RMT / opposabilité contre la position du conseil, (ii) l'état des CPs critiques (CP-1, CP-3, CP-5) au 10/10/2026, (iii) la décision attendue : maintenir le closing au 31/10 ou décaler.
3. **Compléter les faits** — je prépare la **liste de questions** à adresser (a) aux cédants (statuts à jour, projet de mainlevée, calendrier de convocation, dossier réglementaire dispositifs médicaux, CSE), (b) à la banque créancière (modalités et calendrier de mainlevée, exigence de remboursement), (c) à l'expert-comptable (taux et délai d'enregistrement, optimisation éventuelle).
4. **Surveiller et attendre** — j'ajoute la checklist au tracker du deal avec dates de revisite jalonnées : J−10 (21/10 — confirmation agrément + financement), J−5 (26/10 — mainlevée + démissions), J−1 (30/10 — bring-down), J+15 (15/11 — confirmation enregistrement et RCS).
5. **Autre** — précise ce que tu veux en faire.

---

*Sources consultées : aucun outil MCP exécuté en session (mode dégradé). Citations vérifiées : non — voir Étape 5. Date d'analyse : 2026-06-05 (date système).*
