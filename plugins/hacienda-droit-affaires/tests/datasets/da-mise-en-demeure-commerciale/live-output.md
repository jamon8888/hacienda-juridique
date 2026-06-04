# Live output — Mise en demeure commerciale B2B (OPTIMA-FOURNITURES c/ NOVEXA SERVICES)

> **⚠️ Note du relecteur**
> - **Sources :** Légifrance ✓ (articles via index `references/articles-c-civ-c-com-index.md`) / BODACC ✗ (SIREN fictif, lookup `bodacc_procedures` non exécutable — repli sur déclaration du scénario : aucune procédure collective ouverte) / Judilibre ✗ (non requis pour ce livrable) / Pappers ✗ (SIREN fictif).
> - **Lecture :** 1 scénario de faits, 3 articles de CGV (art. 6 délai paiement, art. 7 intérêts, art. 8 clause pénale), 2 factures (FA-2025-0731, FA-2025-0802), 1 e-mail de relance amiable du 8/12/2025.
> - **Signalé pour ton jugement :** 3 éléments `[review]` — (i) taux légal professionnel du semestre applicable, (ii) montant exact des intérêts moratoires à arrêter à la date d'envoi, (iii) clause pénale 12 % (modérable art. 1231-5 C.civ).
> - **Fraîcheur :** taux légal pro 2nd semestre 2025 et 1er semestre 2026 NON consultés sur Légifrance/Banque de France → `[à vérifier]` avant arrêté du décompte. Pas de jurisprudence postérieure intégrée.
> - **Profil cabinet :** bloc « contrats commerciaux » + matrice d'approbateurs `[A CONFIGURER]` dans le profil réel. En contexte test blind, la posture « équilibré, ferme et factuel » est tirée du scénario. Avant envoi réel : exécuter `/h-droit-affaires:entretien-demarrage` pour fixer l'approbateur « Mise en demeure » et la posture cabinet.
> - **Avant de t'appuyer dessus :** (1) confirmer le taux légal pro du semestre courant, (2) figer la date d'envoi et arrêter le décompte d'intérêts à cette date, (3) faire viser par l'approbateur configuré.

---

## Synthèse (3 lignes décideur)

Créance certaine, liquide et exigible de **10 590 € TTC** sur NOVEXA SERVICES, factures FA-2025-0731 et FA-2025-0802 échues depuis le 14/11/2025 et le 3/12/2025, sans contestation, sans procédure collective ouverte. La relance amiable du 8/12/2025 étant restée sans réponse, le passage en **mise en demeure formelle LRAR** est la suite naturelle, ouvrant la voie à une **injonction de payer** (créance non sérieusement contestable, montant compatible). Risque dominant : aucun sur le caractère certain et liquide ; vigilance sur la clause pénale (12 %), modérable par le juge si jugée excessive (1231-5 C.civ).

## Sommes réclamées

| Poste | Base | Montant | Tag |
|---|---|---|---|
| Principal — FA-2025-0731 | facture du 15/10/2025, échue le 14/11/2025 | 4 380,00 € | [utilisateur fourni] |
| Principal — FA-2025-0802 | facture du 3/11/2025, échue le 3/12/2025 | 6 210,00 € | [utilisateur fourni] |
| **Sous-total principal** | | **10 590,00 €** | |
| Intérêts moratoires | CGV art. 7 : taux légal professionnel + 5 points, de plein droit depuis l'échéance (art. 1344-1, 1231-6 C.civ `[Légifrance]`) | à arrêter à la date d'envoi | [à vérifier] + [review] |
| Indemnité forfaitaire de recouvrement | 40 € par facture en retard (art. L.441-10, D.441-5 C.com. `[Légifrance]`) — 2 factures | 80,00 € | [à vérifier] |
| Clause pénale | CGV art. 8 : 12 % du principal, minimum 300 € — modérable art. 1231-5 C.civ `[Légifrance]` | 1 270,80 € | [review] |
| **Total réclamé hors intérêts** | | **11 940,80 €** + intérêts | |

Notes de calcul :
- Intérêts non chiffrés ici : le taux légal pro 2nd semestre 2025 / 1er semestre 2026 n'a pas été consulté sur source officielle ; ne pas inventer un chiffre. Méthode : `(Principal × (taux légal pro + 5 pts) × nb jours) / 365`, par facture, depuis l'échéance jusqu'à la date d'envoi de la mise en demeure (CGV art. 7 — intérêts dus « de plein droit et sans mise en demeure préalable »).
- Clause pénale : retenue à 1 270,80 € (= 10 590 × 12 %), strictement supérieure au plancher de 300 €. Réclamation possible dès la mise en demeure ; le juge pourra la modérer (1231-5 C.civ). À calibrer avec la posture cabinet `[review]`.
- Prescription : action commerciale 5 ans (art. L.110-4 C.com. `[Légifrance]`), aucun risque (créances de fin 2025).

---

## Projet de mise en demeure (livrable externe — à signer)

```
SAS OPTIMA-FOURNITURES                                 SAS NOVEXA SERVICES
[adresse siège — Roubaix (59)]                         [adresse siège — Lille (59)]
SIREN 555 111 222                                       SIREN 666 333 444

                                                        Lettre recommandée avec accusé de réception
                                                        et copie par courriel

                                                        Roubaix, le [date d'envoi]

Objet : MISE EN DEMEURE DE PAYER — factures FA-2025-0731 et FA-2025-0802
Vos références : compte client NOVEXA SERVICES ouvert depuis 2022

Madame, Monsieur,

Sauf erreur ou omission de notre part, nos écritures comptables font apparaître
que vous restez redevable à notre égard des factures suivantes, échues et
impayées à ce jour :

  | Référence    | Date facture | Échéance       | Montant TTC     |
  |--------------|--------------|----------------|-----------------|
  | FA-2025-0731 | 15 oct. 2025 | 14 nov. 2025   | 4 380,00 €      |
  | FA-2025-0802 | 3 nov. 2025  | 3 déc. 2025    | 6 210,00 €      |
  | TOTAL                                         | 10 590,00 €     |

Les marchandises correspondantes vous ont été livrées et réceptionnées sans
réserve, ainsi qu'en attestent les bons de livraison signés par vos services.
Aucune contestation ne nous est parvenue ni sur la livraison, ni sur la
facturation.

Notre relance amiable adressée le 8 décembre 2025 est restée sans réponse, ce
qui nous contraint à formaliser la présente demande.

En application de l'article 7 de nos conditions générales de vente, que vous
avez acceptées à l'ouverture du compte en 2022, le défaut de paiement à
l'échéance entraîne, de plein droit et sans mise en demeure préalable :

  - des intérêts de retard calculés au taux d'intérêt légal applicable aux
    créances entre professionnels majoré de cinq points, à compter de la date
    d'échéance de chaque facture ;
  - l'indemnité forfaitaire pour frais de recouvrement de 40 € par facture
    prévue aux articles L.441-10 et D.441-5 du Code de commerce.

L'article 8 de nos conditions générales stipule en outre, en cas de
recouvrement contentieux, une indemnité au titre de clause pénale égale à 12 %
des sommes dues en principal, avec un minimum de 300 €.

Les sommes dues à ce jour s'établissent ainsi qu'il suit :

  - Principal ............................................. 10 590,00 €
  - Intérêts de retard depuis l'échéance ................. [arrêté au jour de
                                                             l'envoi]
  - Indemnité forfaitaire de recouvrement (2 × 40 €) ......     80,00 €
  - Clause pénale (12 % du principal) .................... 1 270,80 €
                                                          ------------
  - Total à régler ........................... 11 940,80 € + intérêts

En conséquence, et par la présente, nous vous METTONS EN DEMEURE, au sens de
l'article 1344 du Code civil, de procéder au règlement intégral des sommes
ci-dessus, intérêts en sus, dans un délai de QUINZE (15) JOURS à compter de la
réception du présent courrier.

Le règlement sera effectué par virement sur notre compte habituel, dont les
coordonnées vous ont été communiquées à plusieurs reprises et peuvent vous
être confirmées par retour de courriel.

À défaut de règlement intégral dans ce délai, nous nous réservons le droit,
sans nouvel avis, d'engager toute voie de droit utile au recouvrement de notre
créance, et notamment une procédure d'injonction de payer devant le tribunal
de commerce compétent, ou une action au fond, avec demande de l'ensemble des
intérêts, indemnités, clause pénale et frais accessoires, ainsi que des
condamnations au titre de l'article 700 du Code de procédure civile et des
dépens.

Nous vous rappelons que la présente lettre vaut mise en demeure au sens de
l'article 1344 du Code civil et fait courir, pour la période postérieure le
cas échéant, les intérêts moratoires prévus aux articles 1231-6 et 1344-1 du
Code civil, et qu'elle met à votre charge le risque de la chose due (art.
1344-2 du Code civil).

Dans l'attente de votre règlement, et restant à votre disposition pour
convenir, en cas de difficulté ponctuelle de trésorerie, d'un échéancier
formalisé qui devrait nous parvenir avant l'expiration du délai ci-dessus,

Nous vous prions d'agréer, Madame, Monsieur, l'expression de nos salutations
distinguées.

                                          Pour la SAS OPTIMA-FOURNITURES
                                          [Nom, qualité du signataire]

Pièces jointes :
  - Copie de la facture FA-2025-0731 du 15 octobre 2025
  - Copie de la facture FA-2025-0802 du 3 novembre 2025
  - Copie des bons de livraison signés
  - Copie de l'e-mail de relance amiable du 8 décembre 2025
  - Extrait des CGV OPTIMA-FOURNITURES en vigueur au jour de la commande
```

---

## Suite de la procédure (note interne — ne pas joindre à l'envoi)

1. **J+15 sans paiement intégral** : passage en `--sommation` (commandement par commissaire de justice) ou bascule directe en **injonction de payer** devant le tribunal de commerce (art. 1405 CPC `[à vérifier]`) — créance non sérieusement contestable, montant et nature compatibles.
2. **J+15 avec contestation tardive** : réévaluer le caractère « non sérieusement contestable » avant injonction de payer (risque de rejet) ; arbitrer entre référé-provision (art. 873 al. 2 CPC `[à vérifier]`) et assignation au fond.
3. **Proposition d'échéancier** : à examiner si reçue avant J+15 ; formaliser par avenant écrit avec reconnaissance de dette (intérêt : interrompt la prescription, art. 2240 C.civ `[à vérifier]`).
4. **Tracker recouvrement** : ajouter NOVEXA SERVICES avec relance LRAR à J+15, bascule sommation/injonction à J+20.

## Une question hors de ma checklist habituelle

La clause pénale CGV à 12 % est calculée sur le **principal** et s'ajoute aux intérêts moratoires conventionnels (taux légal pro + 5 pts). Le cumul intérêts + clause pénale + indemnité forfaitaire est licite en principe, mais un juge saisi pourrait estimer la clause pénale manifestement excessive au regard de la modicité de l'enjeu (10 590 €) et du faible retard (≈ 1 à 2 mois à la date d'envoi), et la réduire d'office sur le fondement de l'art. 1231-5 al. 2 C.civ `[Légifrance]`. À calibrer selon la posture cabinet : la réclamer pleinement (ferme), la lisser au minimum de 300 € (équilibré, signe une volonté d'ouvrir une régularisation), ou la réserver pour le contentieux (facilitateur) `[review]`.

## Que veux-tu faire ? Choisis une option :

1. **Rédiger** — je finalise la lettre LRAR (taux légal pro confirmé, intérêts arrêtés à la date d'envoi, signataire identifié, pièces numérotées), prête à signer.
2. **Escalader** — je rédige une note courte vers l'approbateur « Mise en demeure » (à configurer dans le profil cabinet) avec faits, sommes, posture proposée sur la clause pénale et risque résiduel.
3. **Compléter les faits** — questions au service compta/commercial : (a) taux légal pro CGV effectivement appliqué historiquement, (b) coordonnées exactes du correspondant NOVEXA destinataire de la LRAR, (c) un échéancier oral a-t-il été évoqué depuis le 8/12 ?
4. **Surveiller et attendre** — ajout au tracker recouvrement (J+15 LRAR / J+20 bascule sommation ou injonction de payer), pas d'envoi immédiat.
5. **Autre** — précise.

---

Sources consultées : `[Légifrance]` (1344, 1344-1, 1344-2, 1231-5, 1231-6 C.civ ; L.441-10, L.110-4 C.com.) ; `[BODACC]` non exécutable (SIREN fictif).
Citations vérifiées : partiel — articles présents dans `references/articles-c-civ-c-com-index.md` → `[Légifrance]` ; D.441-5 C.com., art. 1405 et 873 CPC, art. 2240 C.civ → `[à vérifier]` (non indexés).
Date d'analyse : 2026-01-05.
