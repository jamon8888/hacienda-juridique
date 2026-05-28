# Dataset de test V2a — Analyse de rupture brutale (L.442-1, II)

> **Entry point attendu :** `/h-droit-affaires:analyser-rupture-brutale`
> **Mode visé :** `--review` (mode unique v2a)
> **Objet :** scénario synthétique d'une rupture de relation de distribution
> exclusive de 8 ans avec préavis effectivement accordé de 3 mois. Le scénario
> teste la qualification 🟢 « relation établie », la fourchette de préavis
> raisonnable estimée (règle de pouce ≈ 1 mois par année d'ancienneté, majorée
> par dépendance économique forte), l'estimation du préjudice (marge brute
> manquante), la non-invocabilité du safe harbor 18 mois côté auteur (préavis
> effectif < 18 mois) et la défensibilité (faible) d'une dispense pour
> inexécution grave non alléguée.
> Aucune donnée réelle. Toutes les parties, montants et SIREN sont fictifs.

---

## Scénario — Rupture de distribution exclusive 8 ans, préavis 3 mois

> **Commande type :** `/h-droit-affaires:analyser-rupture-brutale ./contrat-A-B.pdf ./notification-rupture.pdf --review --side=victime`

### Faits fictifs

```
Parties (fictives) :

- FOURNISSEUR A — SAS, SIREN-FICTIF-111111111, France métropolitaine.
  Industriel français, fabrique des équipements techniques.
- DISTRIBUTEUR B — SARL, SIREN-FICTIF-222222222, France métropolitaine.
  Distributeur indépendant, revend les équipements de A sur le marché FR.

Relation commerciale :

- Contrat-cadre de distribution exclusive France signé le 1er mars 2018
  (il y a 8 ans à la date de notification ci-dessous).
- Renouvellement annuel par tacite reconduction, sans manquement signalé.
- Exclusivité territoriale ET exclusivité d'approvisionnement : B ne peut
  s'approvisionner qu'auprès de A pour la gamme contractuelle, et A
  s'interdit de vendre directement ou via d'autres distributeurs sur le
  territoire FR.
- Volume : les ventes des équipements de A représentent environ 70 %
  du chiffre d'affaires de B sur les trois derniers exercices clos
  (2023, 2024, 2025).
- B a investi en 2019 dans une plateforme logistique dédiée à la gamme de A
  (amortissement linéaire 10 ans, valeur nette comptable résiduelle
  significative).
- B emploie 3 commerciaux dédiés exclusivement à la gamme de A.

Événement de rupture :

- Lettre recommandée du 15 février 2026 de A à B :
  "Cher Partenaire, nous vous informons par la présente, en application
  de l'article X du contrat-cadre, de notre décision de mettre fin à notre
  relation commerciale à effet du 15 mai 2026, soit un préavis de trois
  mois. Cette décision s'inscrit dans une réorganisation stratégique de
  notre réseau de distribution. Nous vous remercions pour la qualité de
  notre collaboration passée."
- Aucune inexécution n'est alléguée contre B dans la lettre.
- Aucune force majeure n'est invoquée.
- A ne s'engage à aucune indemnisation.
- A précise qu'il ne reprendra pas le stock résiduel.

Données comptables (fournies par B) :

- Chiffre d'affaires moyen de B sur les ventes de la gamme A :
  ≈ 2 000 000 € HT / an sur 2023-2024-2025.
- Marge brute de B sur la gamme A : ≈ 30 % du CA HT.
- Marge brute mensuelle moyenne de B sur la gamme A :
  ≈ 50 000 € (= 2 000 000 × 30 % ÷ 12).
- Stock résiduel non repris par A à la date d'effet : ≈ 180 000 € HT
  (à écouler par B sur le marché secondaire à perte probable).
- Investissement plateforme logistique 2019 : VNC résiduelle ≈ 220 000 €.
```

### Vérité terrain — résultat attendu

**Étape 1 — Pré-flight et identification.**

- `check-pii` : volume modéré simulé (parties + montants + SIREN fictifs +
  dates), seuil B simulé selon politique du profil. Verdict attendu :
  `prompt` ou `continue` selon la politique configurée.
- Side identifié : **victime** (B, distributeur).
- Aucune composante PI dominante (pas de licence de marque structurante
  signalée dans les faits) → pas de renvoi `PI:contrats-pi` automatique.
- Aucune procédure collective signalée → pas de renvoi `declaration-creance`.

**Étape 2 — Qualification de la « relation commerciale établie » : 🟢 établie.**

Le skill doit conclure 🟢 sur la base du faisceau d'indices :

- Ancienneté **8 ans** ✓ (largement caractérisée).
- Stabilité ✓ (contrat-cadre + tacite reconduction annuelle sans incident).
- Régularité ✓ (flux récurrents sur 8 années, pas de relation sporadique).
- Volume ✓ (≈ 2 M€/an, dimension économique caractérisée).
- Exclusivité ✓ (double exclusivité contractuelle, territoriale et d'approvisionnement).
- Intuitu personae ✓ (3 commerciaux dédiés, plateforme logistique dédiée — l'investissement caractérise un traitement préférentiel).
- Dépendance économique ✓ (≈ 70 % du CA de B — niveau élevé).

Fondement cité : **art. L.442-1, II C.com.** (ex-L.442-6, I, 5°) `[stable]`.

**Étape 3 — Évaluation du préavis raisonnable : 🔴 manifestement insuffisant.**

| Champ | Valeur attendue |
|---|---|
| Ancienneté | 8 ans |
| Plancher règle de pouce | 8 mois (= 1 mois × 8 ans) |
| Facteurs de modulation à la hausse | Exclusivité totale + dépendance ≈ 70 % CA + investissement spécifique non amorti + intuitu personae fort |
| Préavis raisonnable estimé | **Fourchette 10 à 12 mois** `[review]` (8 mois plancher majoré pour dépendance forte et investissement spécifique) |
| Préavis effectivement accordé | **3 mois** (15 février 2026 → 15 mai 2026) |
| Différentiel | 7 à 9 mois manquants |
| Statut | 🔴 **manifestement insuffisant** (Z = 3 mois < bas de fourchette 10 mois) |

**Safe harbor 18 mois** : NON invocable par A. A n'a accordé que 3 mois.
Le skill doit explicitement mentionner que le safe harbor ne s'applique
**pas** ici (protection défensive réservée à l'auteur qui a effectivement
accordé ≥ 18 mois), avec tag `[review]` sur la mention de non-applicabilité.

> Le skill ne doit **JAMAIS** présenter le safe harbor 18 mois comme un
> plafond du préavis dû. Toute formulation du type « le préavis dû ne peut
> excéder 18 mois » ou « la victime ne peut réclamer plus de 18 mois »
> est **incorrecte** et serait un bug critique du skill.

**Étape 4 — Estimation du préjudice indemnisable.**

Base : **marge brute** (jurisprudence constante), pas le chiffre d'affaires.

```
Préjudice principal = (10 à 12 mois − 3 mois) × 50 000 €/mois
                    = 7 à 9 mois × 50 000 €/mois
                    = 350 000 € à 450 000 € `[review]`
```

Postes accessoires à documenter (sans chiffrage figé) :
- VNC résiduelle de la plateforme logistique dédiée (≈ 220 000 €) — invocable
  selon jurisprudence sur les investissements spécifiques `[review]`.
- Perte probable sur écoulement du stock résiduel non repris (≈ 180 000 €
  brut, à actualiser par taux de décote secondaire) `[review]`.
- Éventuelles indemnités de licenciement des commerciaux dédiés si licenciement
  économique consécutif `[review]` (à confirmer côté social).

**Fourchette consolidée attendue** : ordre de grandeur 400-700 k€ tous postes
confondus `[review]`, avec mention que le préjudice principal (marge brute
manquante) reste le poste dominant et le plus solide juridiquement.

**Étape 5 — Cas de dispense de préavis : aucune base solide.**

| Cas | Allégué par A ? | Défensibilité |
|---|---|---|
| Inexécution grave de B | Non | Sans objet — A n'a allégué aucune inexécution |
| Force majeure | Non | Sans objet — A n'a invoqué aucun événement |
| Exonératoires sectoriels | Non | Sans objet |

Le motif invoqué par A (« réorganisation stratégique du réseau de
distribution ») n'est **pas** une dispense légale de préavis. C'est une
décision unilatérale qui justifie l'application du régime L.442-1, II
C.com., pas son écartement.

Conclusion attendue : aucune dispense défensible → l'auteur n'a pas de
défense de fond solide sur le terrain de la dispense.

**Étape 6 — Liste de points.**

Tableau attendu (ordre indicatif) :

| # | Point | Statut | Risque | Position souhaitée | Action proposée |
|---|---|---|---|---|---|
| 1 | Préavis effectif 3 mois vs raisonnable 10-12 mois `[review]` | 🔴 | Indemnisation 350-450 k€ marge manquante | Engager action L.442-1, II | Mise en demeure puis assignation TC |
| 2 | Stock résiduel non repris (≈ 180 k€) | 🟠 | Perte sèche probable | Demande de reprise / indemnisation complémentaire | Inclure dans mise en demeure |
| 3 | VNC plateforme logistique dédiée (≈ 220 k€) | 🟠 | Investissement spécifique non amorti | Poste accessoire d'indemnisation `[review]` | Documenter dans assignation |
| 4 | Safe harbor 18 mois non invocable par A `[review]` | 🟢 | Sans portée défensive ici | Mentionner en anticipation d'argumentation | Pas d'action propre |
| 5 | Aucune dispense de préavis défensible | 🟢 | Renforce le dossier B | À documenter dans la mise en demeure | Pas d'action propre |

**Recommandation attendue : Engager.**

Trois lignes :
- Dossier solide côté B (qualification 🟢, préavis 🔴, dispense sans base).
- Risque dominant : durée et coût du contentieux ; non-existence du dossier comme limite.
- Prochaine action : mise en demeure circonstanciée chiffrée, puis assignation TC sous 4-6 semaines en l'absence de proposition transactionnelle de A.

**Question hors checklist — exemple acceptable :**

> Une question hors de ma checklist habituelle : la plateforme logistique
> dédiée représente un investissement spécifique non amorti significatif.
> Au-delà de l'indemnisation de la marge brute, l'argumentaire gagnerait à
> caractériser l'intuitu personae renforcé par cet investissement, ce qui
> peut justifier la majoration de la fourchette de préavis raisonnable
> au-delà de 12 mois — à confirmer Judilibre.

(Cette question est un exemple ; le skill peut produire une question
différente, ou omettre la ligne s'il n'a rien d'honnête à observer.)

**Arbre de décision — option attendue par défaut côté victime : 1. Rédiger**
(projet de mise en demeure chiffrée). Toutes les autres options doivent
être listées, option 4 « Surveiller et attendre » présente (utile si une
mise en demeure préalable est déjà en cours d'échange).

**Footer A PII attendu** si la politique PII passive a laissé passer les
montants et SIREN sans anonymisation : ligne renvoyant vers
`[hacienda-ghost](marketplace://hacienda-ghost)`.

### Notes de test

1. Le scénario teste la non-confusion **L.442-1, I** (déséquilibre
   significatif — non applicable ici, on n'analyse pas une clause) vs
   **L.442-1, II** (rupture brutale — fondement applicable). Le skill
   doit citer strictement « L.442-1, **II** C.com. » et non « L.442-1 »
   sans précision.
2. Le scénario teste l'ex-numérotation **L.442-6, I, 5°** — le skill doit
   la mentionner pour traçabilité des sources antérieures à l'ord. 2019-359
   du 24 avril 2019.
3. Le scénario teste l'expression du préavis en **fourchette** et non en
   chiffre figé. Un chiffre unique (par exemple « 11 mois ») sans
   fourchette serait une dégradation du livrable.
4. Le scénario teste le traitement strict du **safe harbor 18 mois**. Toute
   formulation présentant le safe harbor comme un plafond du préavis dû
   est un bug critique.
5. Le scénario ne contient **aucune donnée réelle** : SIREN au format
   `SIREN-FICTIF-XXXXXXXXX` (non valide Luhn intentionnellement, pour
   éviter tout enrichissement Pappers/BODACC accidentel sur des
   identifiants qui correspondraient par hasard à une entité réelle),
   raisons sociales « FOURNISSEUR A » / « DISTRIBUTEUR B », montants
   arrondis.
