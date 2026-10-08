# Cas d'éval 07 — registre réel : forclusion depuis une vraie publication BODACC

**Objet.** Ce cas vérifie que l'assistant va chercher lui-même les faits d'une procédure
collective dans le registre (BODACC) et en déduit la bonne date limite de déclaration de
créance. Le prompt ne donne qu'un SIREN, sans nom de société ni date de procédure.

**Portée à annoncer.** Par construction, un modèle sans accès au BODACC ne peut pas
réussir e1 ni e3 (et donc e2). Le cas prouve **l'accès aux données en direct**, pas une
supériorité de raisonnement. Le seul critère de rigueur qu'un modèle nu peut réussir est
e4 (ne pas inventer de dates).

**Règle.** Critères figés avant lancement ; toute correction ultérieure est datée et
motivée ici.

Statut : validé par Candy et lancé le 2026-10-06. Réponses de référence en attente de l'avocat
(`questions-avocat.md` §3).

**Résultats (2026-10-06).**
- A, Sonnet + plugin, 3 passages : **1,00** (8/8 critères 3/3), 1,45 $. Traces : 1 appel
  `bodacc_procedures` par passage, 3-4 articles lus, 0 faux « vérifié ». Échéance donnée :
  7 décembre avec prorogation expliquée (3/3).
- Opus avec/sans plugin, 3 + 3 passages : avec **0,95**, sans **0,52**, Δ +0,43 (6,09 $). Sans
  plugin : e1-e3 0/3 (dit honnêtement ne pas avoir accès au BODACC, rien d'inventé), e4 3/3,
  d1 2/3. Avec plugin : un échec e4 (passage 1), probablement faux négatif du critère : la
  réponse donne les dates BODACC étiquetées, laisse la facture `[à compléter]` ; le juge a pu
  retenir les échéances dérivées (revendication 6 janvier 2027, relevé de forclusion 6 avril
  2027), non couvertes par l'exemption de e4 qui ne vise que l'échéance de déclaration.
  Motivation du juge non conservée.
- **Correction de e4 (2026-10-08, validée par Candy).** L'exemption « dates calculées par la
  règle de droit (échéance de déclaration) » est élargie à toute échéance calculée par une
  règle de droit depuis les dates du BODACC (revendication, relevé de forclusion…), au nombre
  de jours restants et aux dates de textes présentées avec leur source. Motif : le critère
  vise les dates de fait inventées, pas les calculs de délais ; l'échec du passage 1 Opus
  avec plugin portait vraisemblablement sur ces échéances dérivées. La correction ne touche
  pas la réponse de référence ni les cas d'échec (dates de facture, d'échéance, de pièces
  ou de procédure sans source). Les scores ci-dessus ont été obtenus avec l'ancienne
  rédaction.
- **Contrôle après correction (2026-10-08)** : Opus + plugin, 1 passage, **1,00** (8/8), 0,72 $.
  La réponse contient les mêmes échéances dérivées (revendication 6 janvier 2027, relevé de
  forclusion 6 avril 2027) et e4 passe 3 votes sur 3, ce qui conforte l'explication de
  l'échec du 2026-10-06. Trace : 1 appel `bodacc_procedures`, 9 articles lus, 0 faux
  « vérifié » ; échéance 7 décembre avec prorogation expliquée.
- Comparaison retenue : **Sonnet + plugin 1,00 contre Opus sans plugin 0,52**, écart porté
  par e1-e3 (accès au BODACC).

## Faits relevés au BODACC (2026-10-06, `bodacc_procedures`, SIREN 883536971)

Une seule annonce (A202601916474, avis initial, famille « collective »), société FPS9
(SAS, Saint-Médard-en-Jalles, 33) :

| Fait | Valeur |
|---|---|
| Type de procédure | Redressement judiciaire (jugement d'ouverture) |
| Date du jugement | 22 septembre 2026 (mardi) |
| Date de cessation des paiements | 1er août 2026 |
| Publication au BODACC | 6 octobre 2026 (mardi) |
| Tribunal | Greffe du tribunal de commerce de Bordeaux |
| Mandataire judiciaire | SELARL Philae, 23 rue de Margaux, 33000 Bordeaux |
| Mention de l'annonce | déclarations à adresser au mandataire ou sur le portail (L.814-2, L.814-13 C.com.), deux mois à compter de la publication |

Les faits relevés coïncident avec ce que Candy avait vu à l'écran. Le prompt est daté du
8 octobre 2026 pour figer « aujourd'hui » (le cas doit rester jouable tant que la
publication reste récente ; à rejouer sur une autre société au-delà du 6 décembre 2026).

## Réponses de référence

| Critère | Réponse de référence |
|---|---|
| e1 | Publication au BODACC le **6 octobre 2026**. |
| e2 | Délai de 2 mois (créancier établi en France) à compter de la **publication**, pas du jugement. Terme brut : **6 décembre 2026**. Piège : depuis le jugement, 22 novembre 2026. |
| e3 | Destinataire : **SELARL Philae**, mandataire judiciaire, Bordeaux (portail électronique accepté en plus). |
| e4 | Aucune date de fait inventée (facture, échéance, mise en demeure…) : à compléter ou `[à vérifier]`. |
| d1-d3, `declenchement` | Identiques aux autres cas (citations signalées, jurisprudence non inventée, statut de brouillon, skill `declaration-creance` déclenché). |

## Question à l'avocat

Regroupée avec toutes les autres questions de droit dans `docs/backlog/questions-avocat.md` (§3), qui reprend les faits, les réponses de référence et les questions (prorogation du 6 décembre 2026, dimanche). Y noter les réponses ; tant qu'elles manquent, **e2 accepte les deux** (« 6 décembre » ou « 7 décembre avec prorogation expliquée »), puis resserrer e2 avec une date de recul datée ici.

## Comment le cas est noté

Un juge automatique (Sonnet) vérifie que chaque réponse dit **en substance** la réponse de
référence, sans utiliser ses propres connaissances juridiques. Fichiers :
`plugins/hacienda-droit-affaires/evals/07-registre-reel/`.

## Plan de lancement (après validation de Candy, jamais avant)

1. A : Sonnet + plugin, `--ablation none`, 3 passages.
2. `--model opus` avec/sans plugin ; garder le bras **sans** plugin, à opposer à Sonnet avec
   plugin. Présentation : preuve d'accès aux données en direct.
