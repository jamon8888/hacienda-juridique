```
NOTES DE TRAVAIL INTERNES — Profil cabinet non configuré ([A CONFIGURER] présent).
En-tête provisoire. Relancer /h-da:entretien-demarrage pour paramétrer le profil
M&A avant toute utilisation opérationnelle. NE CONSTITUE PAS UN AVIS JURIDIQUE —
faire valider par un avocat M&A inscrit au barreau avant tout acte.
```

> **⚠️ Note du relecteur**
> - **Sources :** Légifrance ✗ (non consultée via API dans cette session) / Judilibre ✗ / Pappers ✗ / BODACC ✗ — toutes les références légales ci-après sont issues de [connaissance modèle — à vérifier] ; aucune source primaire n'a été interrogée en temps réel
> - **Lecture :** scénario fictif complet (scenario.md, 108 lignes) — **aucun SPA réel transmis** ; l'analyse porte sur les faits déclarés par le client ; certaines conclusions supposent que les termes du projet de SPA correspondent aux éléments communiqués oralement
> - **Signalé pour ton jugement :** 9 éléments `[review]`
> - **Fraîcheur :** articles L.632-1, L.632-2 C.com., L.227-15 C.com., L.2312-8 C.trav., L.23-10-7 C.com., art. 1304-3 C.civ. — non vérifiés en temps réel ; à confirmer sur Légifrance avant tout usage
> - **Avant de t'appuyer dessus :** (1) obtenir le texte complet du SPA et ses annexes ; (2) confirmer ou infirmer l'existence d'une procédure amiable en cours (mandat ad hoc / conciliation) ; (3) obtenir un état de passif total chiffré de Mécanoflex Industries (bilan intermédiaire + annexes) ; (4) valider les références légales sur Légifrance

---

# SPA review — Mécanoflex Industries — Side : acquéreur (Altivex Participations)

## Résumé exécutif

Ce SPA est en l'état **non signable** côté acquéreur. La GAP est économiquement illusoire (plafond égal au prix de 1 €, sans séquestre ni garantie autonome face à un cédant dont la solvabilité est douteuse), le passif total de la cible n'est pas chiffré, et deux signaux caractéristiques de la période suspecte — un nantissement consenti pour une dette antérieure et un paiement préférentiel de fournisseur — exposent la cession à un risque de nullité si une procédure collective s'ouvre après le closing. L'action immédiate est de suspendre la signature jusqu'à obtention d'un état de passif complet, confirmation du statut procédure amiable, refonte complète de la mécanique de garantie (séquestre / GAPD), et adjonction d'une condition suspensive « absence d'ouverture d'une procédure collective ».

---

## Deal facts

| Champ | Lecture |
|---|---|
| Type d'opération | Cession de titres (share deal) — 100 % des actions de la SAS Mécanoflex Industries |
| Cible | SAS Mécanoflex Industries, SIREN fictif 391 748 025, Roanne (42) — fabrication connecteurs mécaniques agroalimentaire/pharma — ~40 ETP |
| Cédant | M. Bertrand Nolhac, actionnaire unique et président |
| Acquéreur | Altivex Participations SAS, fonds PME industrielles en difficulté, Lyon |
| Prix | 1 € symbolique + reprise de passif total (montant **non chiffré**, aucune annexe) |
| Signing / closing | Non précisé (simultanés ou différés) |
| Mécanisme de prix | Prix fixe définitif — aucun mécanisme d'ajustement (ni locked-box, ni completion accounts, ni earn-out) |
| Droit applicable / juridiction | Non mentionné dans les faits communiqués |

---

## Red flags

| # | Sujet | Statut | Pourquoi ça compte | Action |
|---|---|---|---|---|
| RF-1 | GAP — plafond = 1 € | 🔴 | La garantie est plafonnée au prix de cession symbolique : toute mise en jeu > 1 € est inopérante. Dans un share deal de cible en difficulté, la GAP est la protection centrale — là elle est économiquement nulle | Refonte complète : plafond indexé sur l'exposition réelle (passif latent à chiffrer) + séquestre ou GAPD |
| RF-2 | GAP — absence de garantie de la garantie (séquestre / GAPD / caution bancaire) | 🔴 | M. Nolhac est potentiellement insolvable au moment d'un appel en garantie ; une GAP nue sur un cédant fragile est une protection théorique | Exiger séquestre sur compte bloqué ou GAPD bancaire calibrée sur les passifs fiscaux, sociaux et environnementaux latents |
| RF-3 | Absence de CS « absence d'ouverture d'une procédure collective » | 🔴 | Entre signing et closing, la cible peut basculer en RJ ou LJ ; l'acquéreur n'a aucun droit contractuel de sortie | Introduire une CS explicite : absence de cessation des paiements et d'ouverture d'une procédure collective à la date de closing |
| RF-4 | Signaux de période suspecte — nullités potentielles L.632-1 / L.632-2 C.com. `[connaissance modèle — à vérifier]` | 🔴 `[review]` | (i) Nantissement fonds de commerce consenti quelques mois avant le deal pour garantir un crédit-bail souscrit antérieurement = sûreté pour dette antérieure → nullité de droit L.632-1 si dans la période suspecte ; (ii) paiement intégral d'un fournisseur alors que d'autres créanciers de même rang restent impayés = paiement préférentiel → nullité facultative L.632-2 si connaissance de la cessation des paiements prouvée. Si la cible est mise en procédure collective après le closing, ces actes — et potentiellement la cession elle-même si le prix est jugé déséquilibré — peuvent être annulés | Déclaration spécifique du cédant sur l'absence de cessation des paiements au jour du SPA + indemnisation hors plafond GAP + séquestre dédié (durée : au moins 18 mois post-closing, horizon de la période suspecte maximale) `[review]` |
| RF-5 | Passif total non chiffré | 🔴 | L'acquéreur s'engage à reprendre « l'ensemble des dettes figurant au bilan à la date de réalisation » sans annexe chiffrée : l'engagement économique réel est indéterminé. Un passif indéterminable heurte les exigences de déterminabilité du prix (art. 1163 C.civ `[connaissance modèle — à vérifier]`) | Exiger un bilan intermédiaire récent certifié + annexe détaillant le passif repris avant tout signing |
| RF-6 | Absence de disclosure letter | 🔴 | Aucune disclosure letter mentionnée : les déclarations du cédant couvrent un champ inconnu, et l'acquéreur ne peut pas apprécier le périmètre réel des exceptions à la GAP | Exiger une disclosure letter exhaustive, annexée et datée avant le signing |
| RF-7 | Vérification DGFiP en cours — non chiffrée, non individualisée | 🟠 | Rappel fiscal potentiel d'un montant inconnu, couvert par la GAP « sans individualisation en annexe » : la couverture est non opposable clairement ; si un rappel intervient post-closing, l'acquéreur ne pourra pas se prévaloir d'une déclaration spécifique | Individualiser le risque fiscal en annexe GAP avec estimation provisoire ; exiger indemnité dédiée hors plafond ou ajustement de prix |
| RF-8 | ICPE — absence de diagnostic environnemental | 🟠 | Atelier sous régime déclaration (solvants) sur bail commercial tiers : absence d'étude de sol, risque de passif environnemental (remise en état) inconnu et non couvert par une déclaration ou indemnité dédiée dans le SPA | Obtenir diagnostic environnemental préalable au signing ; introduire une déclaration spécifique + indemnité hors plafond pour tout passif ICPE antérieur au closing |
| RF-9 | Cautions personnelles de M. Nolhac non communiquées | 🟠 | Si Nolhac a consenti des cautions au profit de créanciers de la cible, leur mise en jeu post-closing peut générer des litiges entre cédant et acquéreur ; impact direct sur la valeur pratique de la GAP nue (actif disponible de Nolhac grevé) | Déclaration spécifique du cédant sur l'exhaustivité et le montant des cautions personnelles consenties |
| RF-10 | Possible procédure amiable en cours (mandat ad hoc / conciliation) non confirmée | 🟠 `[review]` | Si une conciliation est en cours et que le SPA est signé sans en tenir compte, des questions de confidentialité, d'opposabilité et de conflit avec les engagements pris envers le conciliateur peuvent surgir | Obtenir confirmation écrite de l'avocat du cédant sur l'existence ou non d'un mandat ad hoc ou d'une conciliation ; adapter les CS et déclarations en conséquence |
| RF-11 | Absence de clause MAC | 🟠 | Si signing et closing sont différés, une dégradation matérielle de la situation de la cible (procédure collective, perte d'un contrat clé, aggravation du passif) n'ouvre aucun droit de sortie à l'acquéreur hors RF-3 | Introduire une clause MAC visant explicitement l'aggravation financière et l'ouverture d'une procédure collective |
| RF-12 | Absence de non-concurrence cédant | 🟡 | M. Nolhac, actionnaire unique et président, a toute l'expertise métier (connecteurs mécaniques agroalimentaire/pharma) ; absence de clause de non-concurrence/non-sollicitation → risque de départ concurrent post-closing | Introduire une clause de non-concurrence (durée, territoire, activité à préciser) avec contrepartie `[review]` |

---

## Overlay difficulté (mode `--distressed`)

**Gate barre :** La cible n'est pas en RJ/LJ avec appel d'offres ouvert à la date du scénario. Deal privé — overlay intégralement applicable.

**D1 — Période suspecte / nullités L.632-1 / L.632-2 C.com. `[connaissance modèle — à vérifier]`**

Deux signaux identifiés au stade de la due diligence préliminaire :

1. **Nantissement de fonds de commerce pour garantir un crédit-bail antérieur** — consenti quelques mois avant la cession, alors que la dette garantie (le crédit-bail) avait été souscrite plusieurs mois auparavant. Profil : sûreté consentie pour une dette antérieurement contractée → nullité de **droit** L.632-1 C.com., si l'acte tombe dans la période suspecte. La période suspecte court de la date de cessation des paiements (fixée rétroactivement par le tribunal, jusqu'à 18 mois avant le jugement) jusqu'au jugement d'ouverture. Si une procédure collective s'ouvre dans les 18 mois suivant le closing, ce nantissement peut être annulé, libérant un créancier chirographaire non désintéressé — ce qui affecte directement la valeur de la cible reprise. `[review]`

2. **Paiement préférentiel d'un fournisseur** — paiement intégral d'une facture importante alors que des créanciers de même rang et plus anciens demeurent impayés. Profil : paiement de dette échue avec inégalité de traitement → nullité **facultative** L.632-2, si le bénéficiaire avait connaissance de la cessation des paiements. La « préservation d'une relation commerciale stratégique » peut constituer un indice de cette connaissance. `[review]`

**Conséquence pour le SPA :** le projet de SPA ne contient aucune déclaration du cédant sur l'absence de cessation des paiements, aucune indemnité spécifique couvrant le risque de nullité d'actes antérieurs, et aucun séquestre dédié. En l'état, l'acquéreur prend en charge un risque de nullité de plein droit sans protection contractuelle.

> Ne pas dater la cessation des paiements (semaines relatives — fixation par le tribunal, rétroactive). Ne pas conclure à la nullité : qualifier le risque `[review]`.

**D2 — Passif non purgé (share deal)**

Le share deal ne purge aucun passif : Altivex hérite de l'intégralité des dettes et des litiges de Mécanoflex Industries. Sont notamment non chiffrés ou non confirmés : dettes bancaires et fournisseurs (montant total inconnu), passif fiscal (vérification DGFiP en cours), passif social (contrôle URSSAF à solde partiellement inconnu), passif environnemental (ICPE, aucun diagnostic), et cautions personnelles du cédant susceptibles de générer des appels en garantie croisés. La GAP est la protection centrale — mais son architecture actuelle la rend inopérante (voir D3).

**D3 — Garantie de la garantie `[review]`**

| Point | État actuel | Niveau | Exigence minimale côté acquéreur |
|---|---|---|---|
| Plafond GAP | 1 € (= prix symbolique) | 🔴 | Plafond indexé sur passif latent chiffré — `[à compléter]` |
| Panier | 15 000 € | 🟠 | Panier à négocier selon matérialité du dossier |
| Franchise | 5 000 € | 🟡 | Cohérente si le panier est maintenu |
| Séquestre / escrow | Absent | 🔴 | Séquestre sur compte bloqué (fraction du passif latent estimé) |
| GAPD / caution bancaire | Absent | 🔴 | GAPD bancaire ou caution solidaire d'une entité solvable |
| Durée 36 mois | Probablement insuffisante (vérif. DGFiP en cours, ICPE) | 🟠 | Au moins 5 ans pour couvrir prescription fiscale ; durée à caler sur les délais de prescription des passifs identifiés `[review]` |

Renvoi impératif : `/h-da:gap-review --distressed` pour la refonte complète de la mécanique GAP.

**D4 — Transferts & solidarités (cross-link, renvois)**

- **L.1224-1 C.trav. `[connaissance modèle — à vérifier]`** : share deal pur — la société persiste, pas de transfert automatique au sens strict. Mais si une restructuration post-closing est envisagée par Altivex (cession d'actifs ou d'une branche d'activité), le transfert automatique des contrats de travail s'appliquera. À anticiper. Renvoi : conseil social.
- **Solidarité fiscale** : L.1684 CGI `[connaissance modèle — à vérifier]` vise principalement la cession de fonds de commerce — moins directement applicable à une cession de titres pure. Mais la vérification DGFiP en cours peut aboutir à un rappel que la cible devra acquitter, supporté in fine par l'acquéreur via le share deal. 🟠 Renvoi : `hacienda-fiscal`.
- **Passif environnemental ICPE `[connaissance modèle — à vérifier]`** : L.171-8 C.env. — obligations de remise en état, exécution d'office possible. Bail commercial sur locaux tiers : vérifier clauses de restitution du bail, responsabilité du preneur en cas de pollution. Aucun diagnostic de sol fourni → passif inconnu. 🟠 `[review]`

**D5 — MAC & conditions suspensives spécifiques**

- Aucune clause MAC dans le projet de SPA → 🔴 si signing/closing différés.
- Aucune CS « absence de cessation des paiements / ouverture procédure collective » → 🔴 (voir RF-3).
- La seule CS bancaire (maintien du crédit-bail) ne protège pas contre un basculement en procédure collective.

**Exposition dirigeant cédant**

M. Nolhac est président depuis la création, avec des pertes d'exploitation sur ~3 exercices et des capitaux propres négatifs. Ces éléments appellent une analyse de son exposition personnelle (contribution à l'insuffisance d'actif, sanctions personnelles, banqueroute selon les circonstances). Les cautions personnelles non chiffrées participent de la même problématique. **Nommer et renvoyer — ne pas évaluer ici.** Renvoi : `/h-da:responsabilite-dirigeant`.

---

## Analyse par axes

### 1. Deal facts et périmètre

Le périmètre économique réel est inconnu. Le prix de 1 € est formel ; l'engagement réel de l'acquéreur est la reprise d'un passif non chiffré. La formulation « ensemble des dettes figurant au bilan à la date de réalisation » est une clause d'adhésion à un inconnu. Aucun bilan intermédiaire ni aucune annexe chiffrant le passif n'a été transmis. 🔴

### 2. Capacité, pouvoirs et restrictions sur titres

M. Nolhac est actionnaire unique : a priori, pas de co-cédant ni de droits de préemption ou d'agrément à solliciter auprès d'autres associés. **Mais :** les statuts à jour n'ont pas été transmis ; une clause d'agrément en faveur d'un tiers (investisseur historique, partenaire industriel) ne peut être écartée sans lecture des statuts. `[review]` 🟠

Nantissement de fonds de commerce au profit de la banque principale : ce nantissement grève un actif de la société (pas directement les titres), mais il constitue un signal de période suspecte (voir D1) et peut, selon son exécution, réduire la valeur de l'actif social après cession.

Comptes courants d'associé de M. Nolhac : existence et solde non confirmés. Dans un share deal, les CCA du cédant restent dans la cible après la cession (sauf remboursement pré-closing) : ils constituent un passif interne que l'acquéreur reprend. À chiffrer et à traiter explicitement (remboursement, abandon, ou conversion). 🟠

### 3. Conditions suspensives

| CS | Statut |
|---|---|
| Accord bancaire maintien crédit-bail | Présente — délai et modalités non précisés → à encadrer |
| Absence de cessation des paiements / procédure collective | Absente → 🔴 à introduire |
| Financement acquéreur | Non mentionné — à confirmer (Altivex fonds propres ou LBO ?) |
| Diligences satisfaisantes | Non mentionnée → recommandée |
| Autorisations réglementaires (contrôle concentrations, IEF) | Non mentionnées → à vérifier selon seuils |

La CS bancaire existante est la seule prévue. Son caractère potentiellement potestatif (dépend d'un tiers — la banque — mais son obtention peut être influencée par les parties) mérite une rédaction encadrée avec obligation d'efforts `[review]`.

### 4. Interim covenants / MAC

Aucun covenant d'interim et aucune clause MAC mentionnés dans le projet de SPA. Si signing et closing sont simultanés, l'absence de covenants est moins problématique. Si différés, l'absence totale de protection (ni ordinary course, ni MAC, ni CS procédure) expose l'acquéreur à signer une cible dont la situation se serait encore dégradée. 🟠/🔴 selon le délai signing-closing.

### 5. Prix, ajustements et paiement

Prix fixe 1 €, définitif. Cohérent avec la logique de deal distressed (la valeur est dans la reprise de passif). L'absence de mécanisme locked-box ou completion accounts est acceptable en théorie si le passif repris est précisément défini en annexe — ce qui n'est pas le cas ici. La formulation actuelle crée un engagement à géométrie variable, potentiellement contraire aux exigences de déterminabilité du prix (art. 1163 C.civ. `[connaissance modèle — à vérifier]`). `[review]` 🟠

### 6. Garanties, indemnisation, disclosure

Architecture GAP entièrement à refondre (voir RF-1, RF-2, D3). La durée de 36 mois est probablement insuffisante au regard des délais de prescription fiscale (3 ans pour l'IS mais 10 ans en cas de manœuvres frauduleuses `[connaissance modèle — à vérifier]`) et de la vérification DGFiP en cours. Le panier de 15 000 € et la franchise de 5 000 € sont sans effet pratique si le plafond est à 1 €.

L'absence de disclosure letter est un défaut structurant : sans disclosure, l'acquéreur ne peut pas apprécier le périmètre réel des risques couverts et des exceptions que le cédant entend opposer.

### 7. Confrontation DD → protections SPA

Aucun rapport DD formalisé n'a été fourni. Tableau des signaux identifiés vs protections SPA :

| Signal identifié | Gravité | Protection SPA attendue | Protection trouvée | Statut |
|---|---|---|---|---|
| Nantissement pour dette antérieure | 🔴 | Déclaration absence CdP + indemnité hors plafond + séquestre | Aucune | ✗ absent |
| Paiement préférentiel fournisseur | 🔴 | Déclaration + indemnité hors plafond | Aucune | ✗ absent |
| Vérification DGFiP en cours | 🟠 | Déclaration spécifique + indemnité dédiée + estimation | GAP globale non individualisée | ✗ insuffisant |
| Contrôle URSSAF (redressement partiel) | 🟠 | Déclaration spécifique + montant + indemnité dédiée | GAP globale non individualisée | ✗ insuffisant |
| ICPE / passif environnemental | 🟠 | Déclaration + diagnostic + indemnité hors plafond | Absent | ✗ absent |
| Cautions personnelles Nolhac | 🟠 | Déclaration exhaustive | Absent | ✗ absent |
| Procédure amiable possible | 🟠 | CS confirmation absence + déclaration | Absent | ✗ absent |
| CCA cédant | 🟡 | Traitement explicite (remboursement / abandon) | Non mentionné | ✗ absent |

**Confrontation DD non complète** : aucun rapport DD formalisé transmis — le SPA ne peut pas être considéré signing-ready sans revue complète des findings DD.

### 8. Covenants restrictifs / post-closing

Aucune clause de non-concurrence, de non-sollicitation, de confidentialité ou d'accompagnement post-closing mentionnée. Pour un deal distressed avec un cédant-dirigeant opérationnel (président fondateur, expertise métier unique dans un secteur de niche), l'absence de non-concurrence est un risque pratique réel. 🟠

**Obligations sociales :**
- Avec ~40 ETP, le seuil de 11 salariés pour la mise en place du CSE est franchi. Vérifier l'information-consultation obligatoire (art. L.2312-8 / L.2312-37 C.trav. `[connaissance modèle — à vérifier]`). 🟠 `[review]`
- Information des salariés (art. L.23-10-7 C.com. `[connaissance modèle — à vérifier]`) applicable aux PME lors d'une cession de participation majoritaire — à vérifier selon les conditions de taille. 🟠

**Formalités closing (titres SAS) :** L'absence des statuts à jour empêche de vérifier les clauses d'agrément. Au closing, le transfert de propriété des actions s'opère par inscription au registre de mouvements de titres + mise à jour des comptes d'actionnaires (art. L.227-15 C.com. `[connaissance modèle — à vérifier]`). Renvoi : `/h-da:closing-checklist-fr`.

---

## Liste de points

| # | Clause / Sujet | Statut | Risque | Position souhaitée (acquéreur) | Formulation proposée |
|---|---|---|---|---|---|
| 1 | GAP — plafond 1 € | 🔴 | Protection économiquement nulle | Plafond indexé sur passif latent réel — `[à compléter après chiffrage]` | « Le plafond de la garantie est fixé à [X] € correspondant à l'estimation du passif latent détaillé en annexe [X] » |
| 2 | GAP — absence de garantie de la garantie | 🔴 | Cédant insolvable → appel impossible | Séquestre sur compte bloqué ou GAPD bancaire irrévocable | « À titre de sûreté de l'exécution de la garantie, le cédant ouvre à la date de closing un compte séquestre auprès de [banque] d'un montant de [X] € détenu pendant [durée] » |
| 3 | CS — absence de condition « absence de procédure collective » | 🔴 | Closing possible après ouverture RJ/LJ | Introduire CS explicite | « La réalisation de la cession est subordonnée à la condition que, à la date de closing, aucun état de cessation des paiements n'ait été constaté et aucune procédure collective n'ait été ouverte à l'égard de la cible » |
| 4 | Période suspecte — déclarations cédant absentes | 🔴 | Nullités L.632-1/2 sans indemnisation `[review]` | Déclaration spécifique + indemnité hors plafond + séquestre dédié | « Le cédant déclare qu'à la date de signature, la cible ne se trouve pas en état de cessation des paiements et n'a pas fait l'objet d'un tel état au cours des 18 derniers mois » |
| 5 | Passif total — absence d'annexe chiffrée | 🔴 | Engagement économique indéterminé | Bilan intermédiaire certifié + annexe exhaustive avant signing | « Le passif repris correspond aux seules dettes figurant à l'annexe [X] au présent acte, arrêtée au [date], certifiée par le commissaire aux comptes / expert-comptable de la cible » |
| 6 | Disclosure letter absente | 🔴 | Périmètre des exceptions GAP inconnu | Disclosure letter exhaustive annexée et datée | « La disclosure letter annexée au présent acte sous l'annexe [X] constitue l'unique document de divulgation opposable au titre de la garantie » |
| 7 | Passif fiscal DGFiP (vérification en cours) — non individualisé | 🟠 | Rappel fiscal hors GAP effective | Déclaration spécifique + estimation provisoire + indemnité dédiée hors plafond et hors franchise | « Par dérogation aux dispositions générales de la garantie, le passif lié à la vérification de comptabilité DGFiP portant sur les exercices [N] et [N-1] fera l'objet d'une indemnisation intégrale, hors plafond et hors franchise, dans la limite de [montant — à compléter] » |
| 8 | ICPE — absence de diagnostic environnemental | 🟠 | Passif environnemental inconnu (remise en état) | Diagnostic de sol préalable + déclaration + indemnité hors plafond | « Le cédant déclare avoir fourni l'intégralité des informations disponibles sur l'exploitation ICPE de l'atelier [référence] ; tout passif environnemental antérieur au closing engage la garantie sans limitation de plafond ni franchise » |
| 9 | Cautions personnelles Nolhac non communiquées | 🟠 | Impact sur valeur réelle GAP + litiges croisés | Déclaration exhaustive | « Le cédant déclare avoir communiqué en annexe [X] l'intégralité des cautions et sûretés personnelles consenties au profit de créanciers de la cible » |
| 10 | Procédure amiable possible (mandat ad hoc / conciliation) | 🟠 `[review]` | Conflits d'engagements, opposabilité | Confirmation écrite du conseil du cédant avant signing | « Le cédant déclare qu'à la date de signature, aucun mandat ad hoc ni aucune procédure de conciliation n'est en cours à l'égard de la cible ou de sa personne » |
| 11 | CCA cédant — existence et solde non confirmés | 🟠 | Passif interne repris sans visibilité | Déclaration + traitement explicite (remboursement pré-closing ou abandon) | « Les comptes courants d'associés du cédant s'élevant à [montant] sont [remboursés / abandonnés] préalablement ou concomitamment au closing » |
| 12 | MAC — absence de clause | 🟠 | Aucune sortie si aggravation avant closing | Introduire une MAC visant spécifiquement la dégradation financière et l'ouverture d'une procédure | « Constitue un Changement Défavorable Significatif toute ouverture d'une procédure collective, toute dégradation du passif de plus de [seuil] € ou tout événement entraînant la perte d'un contrat représentant plus de [X] % du CA » |
| 13 | Non-concurrence cédant — absente | 🟡 | Risque de départ concurrent (expertise métier niche) | Clause de non-concurrence post-closing | « Pendant [durée] à compter du closing, dans le secteur [connecteurs mécaniques agroalimentaire/pharma], sur le territoire [à préciser], M. Nolhac s'engage à ne pas exercer d'activité concurrente, moyennant contrepartie financière de [montant] `[review]` » |
| 14 | CS bancaire — modalités non précisées | 🟡 | Ambiguïté sur délai et caractère potestatif `[review]` | Critères objectifs + obligation d'efforts + date butoir | « L'acquéreur s'engage à déployer tous efforts raisonnables pour obtenir l'accord bancaire dans un délai de [X] jours ; à défaut, chaque partie peut dénoncer le protocole sans indemnité » |

---

## Renvois recommandés

| Sujet | Skill |
|---|---|
| Refonte complète de la mécanique GAP (plafond, garantie de la garantie, durée, axes distressed) | `/h-da:gap-review --distressed` |
| Formalités closing (transfert titres, CSE, statuts) | `/h-da:closing-checklist-fr` |
| Audit de la data-room complète (bilan, passif fiscal/social, ICPE) | `/h-da:due-diligence-dataroom` |
| Exposition personnelle de M. Nolhac (faute de gestion, banqueroute, cautions) | `/h-da:responsabilite-dirigeant` |
| Arbitrage share deal vs asset deal (si l'orientation est encore ouverte) | `/h-da:asset-vs-share-distress` |
| Passif fiscal DGFiP / solidarités fiscales | `hacienda-fiscal` (renvoi) |
| Obligations sociales (CSE, information salariés, L.1224-1) | `hacienda-social` (renvoi) |
| Passif environnemental ICPE (remise en état, bail) | Renvoi conseil environnement |

---

## Recommandation

**Ne pas signer en l'état.**

Trois raisons structurantes : (i) la GAP est inopérante (plafond 1 €, sans garantie de la garantie face à un cédant probablement insolvable) ; (ii) le passif total repris n'est pas chiffré — l'engagement économique réel d'Altivex est indéterminé ; (iii) deux signaux de période suspecte (nantissement pour dette antérieure, paiement préférentiel) exposent la cession à un risque de nullité si une procédure collective s'ouvre après le closing, sans aucune déclaration ni indemnité contractuelle en regard. La signature est conditionnée à la refonte complète des axes RF-1 à RF-6, à l'obtention d'un bilan intermédiaire certifié avec annexe de passif, et à la confirmation du statut procédure amiable.

---

## Une question hors de ma checklist habituelle

La reprise d'une cible avec capitaux propres négatifs et pertes depuis ~3 exercices par un fonds spécialisé comme Altivex Participations suggère une thèse de retournement pré-établie. Y a-t-il un plan de restructuration opérationnel (cessions d'actifs, réduction d'effectifs, refonte du modèle commercial) qui conditionne la viabilité du deal ? Si oui, ce plan peut déclencher des obligations sociales anticipées (information-consultation CSE sur orientations stratégiques) et modifier l'analyse de la période suspecte si la cible était déjà en cessation des paiements lors des actes préparatoires (LOI, exclusivité, financement). Cette thèse mérite d'être documentée avant le signing, pas après. `[review]`

---

## Que veux-tu faire ? Choisis une option :

1. **Rédiger** — je prépare une liste de points / courrier de négociation structuré à transmettre au conseil du cédant, reprenant les 14 points ci-dessus par ordre de criticité.
2. **Escalader** — je rédige une note d'escalade vers le sponsor business d'Altivex ou le comité d'investissement, avec bottom-line, 3 risques bloquants et décision attendue avant signing.
3. **Compléter les faits** — je liste les questions à poser en priorité au conseil de M. Nolhac (statut procédure amiable, cautions, bilan intermédiaire, statuts à jour, état des CCA) avant toute décision.
4. **Surveiller et attendre** — j'ajoute le dossier Mécanoflex au tracker avec les 6 prérequis identifiés et une date de revisite.
5. **Autre** — précise.

---

```
Sources consultées : [connaissance modèle — à vérifier] (L.632-1/2 C.com., L.227-15 C.com.,
art. 1163/1304-3 C.civ., L.1224-1 / L.2312-8 / L.23-10-7 C.com. / C.trav., L.171-8 C.env.,
L.1684 CGI, L.267 LPF) — Légifrance, Judilibre, Pappers, BODACC non consultés en temps réel
Citations vérifiées : non — tagger [connaissance modèle — à vérifier] sur toutes les références légales
Date d'analyse : 2026-06-25
```

[Ce skill a traité 4 mentions identifiantes fictives (Bertrand Nolhac, Altivex Participations SAS,
Mécanoflex Industries, SIREN 391 748 025). Pour anonymiser automatiquement avant envoi à Claude,
installer hacienda-ghost.](https://hacienda.diy/ghost)
