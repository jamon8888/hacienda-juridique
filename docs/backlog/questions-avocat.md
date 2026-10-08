# Questions ouvertes pour l'avocat — point d'entrée unique

**Dernière mise à jour :** 2026-10-06. Ce fichier **regroupe** toutes les questions de droit que le plugin
`hacienda-droit-affaires` ne peut pas trancher seul. Les dossiers détaillés (dossier fictif, réponses de
référence) restent dans leurs fichiers ; ici, chaque question est reformulée pour être répondue sans lire le code.

**À chaque réponse :** noter la date, la réponse et la source (article, arrêt) sous la question, puis reporter
le résultat dans le skill concerné et dans `docs/handoff/latest.md`. Tant qu'une question est ouverte, le plugin
la marque `[à vérifier]` ou n'encode pas la règle.

Légende : 🔴 le plugin peut donner un mauvais délai ou un mauvais conseil ; 🟠 point de fond à valider ; 🟡 affinage.

---

## 1. 🔴 Délai de déclaration de créance : créancier « étranger » (M8, audit du 2026-10-06)

**Ce que dit le plugin.** `declaration-creance` (étape 2 et description) et `bodacc-procedures-watcher` : délai de
**2 mois**, porté à **4 mois** « si le créancier est hors UE/EEE ».

**Ce que dit le texte, lu en direct sur Légifrance (art. R.622-24 C.com., en vigueur depuis le 2014-07-02).**
Délai de deux mois à compter de la publication du jugement d'ouverture au BODACC. Si la juridiction a son siège en
**France métropolitaine**, le délai est augmenté de deux mois pour les créanciers qui **ne demeurent pas sur ce
territoire**. Si elle siège en **outre-mer**, le délai est augmenté de deux mois pour les créanciers qui ne demeurent
pas dans ce département ou cette collectivité.

**Écart.** Le critère est la **résidence par rapport au territoire de la juridiction**, pas l'appartenance à l'UE ou à
l'EEE. Conséquence pratique : un créancier belge ou allemand a 4 mois (le plugin lui en donne 2, donc une échéance
trop courte, côté prudent) ; un créancier d'outre-mer face à un tribunal métropolitain a 4 mois aussi.

**Questions.**
1. Confirmez-vous la lecture ci-dessus de R.622-24, y compris pour la liquidation judiciaire et le redressement
   (renvois L.631-14 et L.641-3) ?
2. Le calcul se fait-il « à partir de la publication au BODACC » dans tous les cas, ou la date de publication au BODACC
   et celle du jugement peuvent-elles se confondre dans un cas pratique ?
3. Formulation à retenir dans le skill pour le créancier (« ne demeure pas en France métropolitaine » / « hors du
   territoire de la juridiction ») ?

*Réponse :* (à compléter)

---

## 2. 🟠 Cas d'éval 06 — caution d'une société en redressement judiciaire

**Pourquoi.** Ce cas vérifie qu'un assistant juridique répond **juste en droit** sur le sort d'une caution quand la
société débitrice est en redressement judiciaire. Chaque réponse produite est comparée aux réponses de référence
ci-dessous : elles doivent donc être exactes, c'est ce qui vous est demandé. Elles sont validées **avant** tout
lancement et ne sont plus modifiées après avoir vu les résultats (toute correction ultérieure est datée et motivée).

**Le dossier (fictif).**
- Atelier Marbot SAS, en **redressement judiciaire ouvert le 2 juin 2026**, période d'observation en cours, aucun plan
  présenté.
- Créancier : Banque du Lys, **facilité de caisse de 150 000 € consentie pour onze mois**, utilisée à 138 000 € au jour
  du jugement.
- Deux cautions solidaires : **M. Marbot (personne physique)** et **Marbot Participations SARL (personne morale, sa
  holding)**.
- La banque met M. Marbot en demeure de payer sous huit jours, intérêts compris, sous menace d'assignation.

La durée de onze mois est voulue : elle fait porter la question des intérêts sur la règle propre au redressement, et non
sur l'exception des prêts d'un an ou plus.

**Réponses de référence à valider.**

| # | Question posée à l'assistant | Réponse de référence | Statut |
|---|---|---|---|
| 1 | La banque peut-elle poursuivre M. Marbot maintenant ? | **Non.** Pendant la période d'observation, les poursuites contre la caution personne physique sont suspendues (L.631-14 renvoyant à L.622-28). | Confirmé par l'avocat les 24-25/09/2026 (« suspension des poursuites oui ») ; à reconfirmer sur ce dossier |
| 2 | Les intérêts courent-ils contre lui ? | **Oui.** En redressement, la caution ne peut pas se prévaloir de l'arrêt du cours des intérêts (L.631-14, écartant L.622-28 al. 1). | Confirmé le 25/09/2026 |
| 3 | Peut-il se prévaloir d'un plan de redressement ? | **Oui**, procédure ouverte après le 1er octobre 2021 : la caution personne physique peut se prévaloir des dispositions du plan (L.626-11 via L.631-19 I). Ce n'est pas une extinction de son engagement. | Confirmé le 25/09/2026 (règle selon la date d'ouverture) |
| 4 | Et la holding ? | **Non** sur les deux plans : caution personne morale, elle ne bénéficie ni de la suspension des poursuites (réservée aux personnes physiques) ni des dispositions du plan (L.626-11 al. 2 les exclut). La banque peut agir contre elle dès maintenant. | **À valider** |
| 5 | En cas de liquidation, est-il libéré ? | **Non.** La liquidation ne libère pas la caution ; même après clôture pour insuffisance d'actif, la caution reste actionnable (L.643-11). | **À valider** |

**Questions.**
1. Les réponses 4 et 5 sont-elles exactes telles que rédigées ?
2. Les réponses 1 à 3 restent-elles exactes **dans ce dossier précis** (facilité de caisse de onze mois, procédure
   ouverte le 2 juin 2026) ?
3. Une nuance qu'une bonne réponse **devrait** mentionner manque-t-elle (par exemple : mesures conservatoires possibles
   contre la caution pendant la suspension ; mise en demeure elle-même permise ou non) ? Elle ne sera ajoutée comme
   critère que si vous la jugez indispensable.
4. Y a-t-il une erreur courante sur ce sujet, vue chez des confrères ou des clients, qu'il faudrait tester ?

*Réponses :* (à compléter, avec date)

Détail de notation du cas : `docs/backlog/eval-06-caution-rj-validation-avocat.md`.

---

## 3. 🟠 Cas d'éval 07 — forclusion depuis une vraie publication au BODACC

**Pourquoi.** Ce cas vérifie que l'assistant va chercher lui-même les faits d'une procédure collective dans le registre
(BODACC) et en déduit la bonne date limite de déclaration de créance. Le prompt ne donne qu'un SIREN, sans nom de
société ni date de procédure. Un modèle sans accès au BODACC ne peut pas y répondre : le cas prouve l'accès aux données
en direct, pas une supériorité de raisonnement.

**Faits relevés au BODACC le 2026-10-06 (société réelle, SIREN 883536971, une seule annonce).**

| Fait | Valeur |
|---|---|
| Société | FPS9 (SAS, Saint-Médard-en-Jalles, 33) |
| Type de procédure | Redressement judiciaire (jugement d'ouverture) |
| Date du jugement | 22 septembre 2026 (mardi) |
| Date de cessation des paiements | 1er août 2026 |
| Publication au BODACC | 6 octobre 2026 (mardi) |
| Tribunal | Greffe du tribunal de commerce de Bordeaux |
| Mandataire judiciaire | SELARL Philae, 23 rue de Margaux, 33000 Bordeaux |
| Mention de l'annonce | déclarations à adresser au mandataire ou sur le portail (L.814-2, L.814-13 C.com.), deux mois à compter de la publication |

**Réponses de référence (rédigées par nous, non encore validées).**

| Critère | Réponse de référence |
|---|---|
| e1 | Publication au BODACC le **6 octobre 2026**. |
| e2 | Délai de 2 mois (créancier établi en France) à compter de la **publication**, pas du jugement. Terme brut : **6 décembre 2026**. Piège : compter depuis le jugement donnerait le 22 novembre 2026. |
| e3 | Destinataire : **SELARL Philae**, mandataire judiciaire, Bordeaux (portail électronique accepté en plus). |
| e4 | Aucune date de fait inventée (facture, échéance, mise en demeure…) : à compléter ou `[à vérifier]`. |

**Questions (non tranchées : la règle n'est pas encodée tant que vous n'avez pas répondu).** Le 6 décembre 2026 est un
**dimanche** : le terme brut du délai de deux mois tombe un jour non ouvrable.
1. La prorogation au premier jour ouvrable suivant (lundi **7 décembre 2026**) s'applique-t-elle au délai de déclaration
   de créance (art. 642 CPC) ? Le skill `declaration-creance` l'applique déjà (case « Prorogation appliquée »), sans
   validation à ce jour.
2. Quelle date faut-il conseiller au client en pratique : déposer avant le vendredi **4 décembre 2026** pour ne pas
   dépendre de la prorogation ?
3. Le calcul « 6 octobre + 2 mois = 6 décembre » est-il le bon (art. 641 CPC, délai en mois quantième à quantième) ?

En attendant votre réponse, le critère e2 accepte les deux : « 6 décembre » ou « 7 décembre avec prorogation expliquée ».

**Ce que le plugin a répondu (passages du 2026-10-06, 6 sur 6 avec plugin, Sonnet et Opus).** Toujours : « échéance
brute dimanche 6 décembre 2026, prorogée au lundi 7 décembre 2026 (art. 642 CPC) », délai compté depuis la publication,
destinataire SELARL Philae. Si la prorogation ne devait pas s'appliquer, ou s'il faut conseiller une date de prudence,
c'est donc la réponse actuelle du skill qui est à corriger.

*Réponses :* (à compléter, avec date)

Détail de notation et plan de lancement : `docs/backlog/eval-07-registre-reel-validation-avocat.md`.

---

## 4. 🟠 Délais de paiement réécrits au 1er janvier 2027 (L.441-9 à L.441-11 C.com.)

Ces articles (délais de paiement, pénalités de retard, indemnité forfaitaire de 40 €) sont **en vigueur aujourd'hui mais
abrogés au 2027-01-01** (statut « abrogation différée » ; une version `VIGUEUR_DIFF` de L.441-9 existe déjà). Impacte
`cgv-generator`, `mise-en-demeure-commerciale`, `declaration-creance`.

**Piste sur le texte modificatif (2026-10-08, `[à vérifier]`).** La relecture automatique de la PR #73 désigne
l'**ordonnance n° 2026-671 du 27 juillet 2026** (L.441-9, L.441-10) et l'**ordonnance n° 2025-1247 du 17 décembre 2025**
(L.441-11), entrée en vigueur au 1er janvier 2027. Vérifié sur Légifrance : ces deux ordonnances existent et portent sur
la recodification de la TVA dans le code des impositions sur les biens et services (L.441-10 renvoie aujourd'hui à
l'article 289 du CGI). **Non vérifié** : qu'elles modifient bien ces articles, et si la réécriture ne fait que mettre à
jour des renvois ou change aussi les règles de fond (délais, pénalités, indemnité de 40 €).

1. Ces deux ordonnances sont-elles bien les textes modificatifs ? La réécriture au 1er janvier 2027 change-t-elle le
   fond (délais, pénalités, indemnité) ou seulement des renvois au CGI ?
2. Faut-il, dès maintenant, adapter les modèles de CGV et de mise en demeure (clause à effet au-delà de 2027) ?

*Réponse :* (à compléter)

---

## 5. 🟡 Réponse de fond du modèle sans plugin sur la caution (argument de valeur)

Sur l'éval B 02, le bras sans plugin affirme qu'en redressement judiciaire la caution n'est pas protégée (L.622-28 ne la
prévoirait que pour la sauvegarde), ce qui est contraire au point confirmé en §2. À faire valider avant d'utiliser cet
exemple comme argument de valeur.

*Réponse :* (à compléter)
