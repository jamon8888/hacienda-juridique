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

## 2. 🟠 Délai tombant un jour non ouvrable (cas d'éval 07)

Détail : `docs/backlog/eval-07-registre-reel-validation-avocat.md`. Exemple : 6 octobre + 2 mois = **dimanche
6 décembre 2026**.

1. La prorogation au premier jour ouvrable suivant (lundi 7 décembre 2026) s'applique-t-elle au délai de déclaration
   de créance (art. 642 CPC) ? Le skill l'applique déjà, sans validation à ce jour.
2. Conseil pratique : déposer avant le vendredi 4 décembre pour ne pas dépendre de la prorogation ?
3. « 6 octobre + 2 mois = 6 décembre » est-il le bon calcul (art. 641 CPC, mois quantième à quantième) ?

*Réponse :* (à compléter)

---

## 3. 🟠 Caution d'une société en redressement judiciaire (cas d'éval 06)

Détail et réponses de référence : `docs/backlog/eval-06-caution-rj-validation-avocat.md`. Points déjà confirmés par
l'avocat : suspension des poursuites contre la caution personne physique, pas d'arrêt du cours des intérêts, bénéfice du
plan selon la date d'ouverture (±1er octobre 2021). Restent à valider :

1. Les réponses 4 (holding, personne morale) et 5 (liquidation) sont-elles exactes telles que rédigées ?
2. Les réponses 1 à 3 restent-elles exactes **dans ce dossier précis** (facilité de caisse de onze mois, procédure
   ouverte le 2 juin 2026) ?
3. Une nuance indispensable manque-t-elle (mesures conservatoires pendant la suspension, mise en demeure permise ou
   non) ?
4. Erreur courante à tester ?

*Réponse :* (à compléter)

---

## 4. 🟠 Délais de paiement réécrits au 1er janvier 2027 (L.441-9 à L.441-11 C.com.)

Ces articles (délais de paiement, pénalités de retard, indemnité forfaitaire de 40 €) sont **en vigueur aujourd'hui mais
abrogés au 2027-01-01** (statut « abrogation différée » ; une version `VIGUEUR_DIFF` de L.441-9 existe déjà). Le texte
modificatif n'est pas identifié. Impacte `cgv-generator`, `mise-en-demeure-commerciale`, `declaration-creance`.

1. Quel texte réécrit ces articles et à quelle date entrent en vigueur les nouvelles règles ?
2. Faut-il, dès maintenant, adapter les modèles de CGV et de mise en demeure (clause à effet au-delà de 2027) ?

*Réponse :* (à compléter)

---

## 5. 🟡 Réponse de fond du modèle sans plugin sur la caution (argument de valeur)

Sur l'éval B 02, le bras sans plugin affirme qu'en redressement judiciaire la caution n'est pas protégée (L.622-28 ne la
prévoirait que pour la sauvegarde), ce qui est contraire au point confirmé en §3. À faire valider avant d'utiliser cet
exemple comme argument de valeur.

*Réponse :* (à compléter)
