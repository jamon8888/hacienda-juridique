# Cas d'éval 06 — caution en redressement judiciaire : validation avocat

**Objet.** Ce cas sert à vérifier qu'un assistant juridique répond **juste en droit**
sur le sort d'une caution quand la société débitrice est en redressement judiciaire.
Chaque réponse produite est comparée aux « réponses de référence » ci-dessous. Elles
doivent donc être exactes : c'est ce qui est demandé à l'avocat.

**Règle.** Ces réponses sont validées **avant** tout lancement et ne sont plus
modifiées après avoir vu les résultats. Toute correction ultérieure est datée et
motivée ici.

Statut : **en attente de validation** (2026-10-06).

## Le dossier (résumé)

- Atelier Marbot SAS, en **redressement judiciaire ouvert le 2 juin 2026**, période
  d'observation en cours, aucun plan présenté.
- Créancier : Banque du Lys, **facilité de caisse de 150 000 € consentie pour onze
  mois**, utilisée à 138 000 € au jour du jugement.
- Deux cautions solidaires : **M. Marbot (personne physique)** et **Marbot
  Participations SARL (personne morale, sa holding)**.
- La banque met M. Marbot en demeure de payer sous huit jours, intérêts compris,
  sous menace d'assignation.

Le contrat a volontairement une durée **inférieure à un an**, pour que la question des
intérêts porte sur la règle propre au redressement et non sur l'exception des prêts
d'un an ou plus.

## Réponses de référence

| # | Question | Réponse de référence | Statut |
|---|---|---|---|
| 1 | La banque peut-elle poursuivre M. Marbot maintenant ? | **Non.** Pendant la période d'observation, les poursuites contre la caution personne physique sont suspendues (L.631-14 renvoyant à L.622-28). | Confirmé par l'avocat le 2026-09-24/25 (« suspension des poursuites oui ») — à reconfirmer sur ce dossier |
| 2 | Les intérêts courent-ils contre lui ? | **Oui.** En redressement, la caution ne peut pas se prévaloir de l'arrêt du cours des intérêts (L.631-14, écartant L.622-28 al. 1). | Confirmé le 2026-09-25 |
| 3 | Peut-il se prévaloir d'un plan de redressement ? | **Oui**, procédure ouverte après le 1er octobre 2021 : la caution personne physique peut se prévaloir des dispositions du plan (L.626-11 via L.631-19 I). Ce n'est pas une extinction de son engagement. | Confirmé le 2026-09-25 (règle selon la date d'ouverture) |
| 4 | Et la holding ? | **Non** sur les deux plans : caution personne morale, elle ne bénéficie ni de la suspension des poursuites (réservée aux personnes physiques) ni des dispositions du plan (L.626-11 al. 2 les exclut). La banque peut agir contre elle dès maintenant. | **À valider** |
| 5 | En cas de liquidation, est-il libéré ? | **Non.** La liquidation ne libère pas la caution ; même après clôture pour insuffisance d'actif, la caution reste actionnable (L.643-11). | **À valider** |

## Questions à l'avocat

Regroupées avec toutes les autres questions de droit dans `docs/backlog/questions-avocat.md` (§2), qui reprend le dossier, les réponses de référence et les questions. Y noter les réponses.

## Comment le cas est noté

Un juge automatique (Sonnet) lit chaque réponse et vérifie qu'elle dit **en
substance** la réponse de référence ; il n'utilise pas ses propres connaissances
juridiques. Fichiers : `plugins/hacienda-droit-affaires/evals/06-caution-rj/`.
Comparaison prévue : Sonnet **avec** le plugin contre Opus **sans** le plugin.
