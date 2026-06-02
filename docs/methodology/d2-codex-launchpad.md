# D.2 — Launchpad Codex (29 skills, sprints D.2-a à D.2-g)

**Référence plan** : `docs/superpowers/plans/2026-06-01-hacienda-pi-vague-d-release-readiness.md` § D.2.
**Protocole blind** : `docs/methodology/sparring-scoring-protocol.md`.
**Helper script** : `scripts/codex-blind-scoring.py`.

Ce fichier contient les **29 commandes Phase 1 prêtes à copier-coller**, plus la liste des codes scoring suggérés, plus les descriptions neutres à utiliser pour Phase 2.

> **Note** : le plan annonçait 27 skills D.2. Le détail des sprints en donne **29** (39 total - 6 D.1 cibles - 4 exclusions par design = 29). Pas d'impact stratégique.

---

## Codes scoring suggérés

Codes générés par lots (commande `python3 -c "import secrets,string; [print(''.join(secrets.choice(string.ascii_uppercase+string.digits) for _ in range(6))) for _ in range(29)]"`). Tu peux les regénérer si tu veux — ce sont des suggestions.

| # | Skill | Code |
|---|---|---|
| 1 | analyse-opposition-marque | M4K2PA |
| 2 | analyse-refus-inpi | R7N3FB |
| 3 | anteriorite-invalidite | I8V5LC |
| 4 | depot-marque-fr | D9M1XD |
| 5 | revue-portefeuille-marques | P3R7QE |
| 6 | surveillance-marque | S5B2NF |
| 7 | certificat-complementaire-protection | C6P8WG |
| 8 | recherche-anteriorite-brevet | R2A4YH |
| 9 | revue-portefeuille-brevets | P7B1ZI |
| 10 | strategie-extension-internationale | E5X9KJ |
| 11 | tableau-contrefacon-brevet | T8C6MK |
| 12 | contrefacon-dessin-modele | C1D3LL |
| 13 | recherche-anteriorite-dm | A4D5NM |
| 14 | contrefacon-droit-auteur | C9A2OP |
| 15 | depot-preuve-creation | D6P4QQ |
| 16 | droits-voisins-ogc | V8R7TR |
| 17 | licence-droit-auteur | L3A1US |
| 18 | qualification-oeuvre | Q5W6VT |
| 19 | bases-de-donnees | B7D8WU |
| 20 | revue-logiciel-donnees | R2L9XV |
| 21 | logiciels-pi | L4S3YW |
| 22 | mise-en-demeure-pi | M6D5ZX |
| 23 | saisie-contrefacon | S8C7AY |
| 24 | strategie-defense-pi | D1F2BZ |
| 25 | tri-contrefacon | T3R4CA |
| 26 | audit-pi-ma | U5M6DB |
| 27 | contrats-pi | C7P8EC |
| 28 | revue-clause-pi | R9V1FD |
| 29 | portefeuille-pi | P2T3GE |

---

## Workflow général

Pour chaque skill :

1. **Phase 1 (Codex GPT-5.5 medium, session 1)** — copier la commande `phase1` ci-dessous, exécuter dans terminal pour générer le prompt, coller dans une nouvelle session Codex, sauvegarder l'output dans le `--output` indiqué.
2. **Phase 2 (Codex GPT-5.5 HIGH, session 2 distincte)** — copier la commande `phase2` correspondante, exécuter, coller dans nouvelle session Codex effort HIGH, sauvegarder.
3. **Phase 3 (Claude Code, session dédiée)** — invoquer `/h-pi:<skill>` sur `scenario.md` uniquement, sauvegarder sortie dans `live-output.md`.
4. **Phase 4 (Codex GPT-5.5 medium, session 4 distincte)** — copier la commande `phase4`, sauvegarder le rapport dans `docs/backlog/pi-scoring-d2-<skill>-<code>.md`.

---

## Sprint D.2-a — Marques (6 skills)

### 1. `analyse-opposition-marque` — M4K2PA

```bash
python3 scripts/codex-blind-scoring.py phase1 \
  --skill analyse-opposition-marque \
  --domain marques \
  --mode "analyse offensive opposition INPI L.712-4" \
  --specificites "motifs absolus L.711-2 ; restauration L.712-4-1 ; appréciation globale CJUE Sabel/Canon/Lloyd ; marques notoires L.713-3 et L'Oréal Bellure C-487/07" \
  --code M4K2PA \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-analyse-opposition-marque/scenario.md
```

Phase 2 — description neutre : `Skill d'analyse offensive ou défensive d'une opposition à un dépôt de marque devant l'INPI. Produit un livrable partner-ready avec findings cotés et recommandation.`

### 2. `analyse-refus-inpi` — R7N3FB

```bash
python3 scripts/codex-blind-scoring.py phase1 \
  --skill analyse-refus-inpi \
  --domain marques \
  --mode "réponse à notification de refus INPI motifs absolus L.711-2" \
  --specificites "motifs absolus L.711-2 (distinctivité, descriptivité, déceptivité) ; délai R.712-11 réponse refus ; limitation classes / produits ; argumentation acquise par usage L.711-2 al.4" \
  --code R7N3FB \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-analyse-refus-inpi/scenario.md
```

Phase 2 — description neutre : `Skill de réponse à une notification de refus INPI ou OEB. Produit un livrable partner-ready avec analyse des motifs, stratégie de réponse et recommandation.`

### 3. `anteriorite-invalidite` — I8V5LC

```bash
python3 scripts/codex-blind-scoring.py phase1 \
  --skill anteriorite-invalidite \
  --domain marques-brevets \
  --mode "attaque en nullité d'un titre PI tiers" \
  --specificites "L.714-3 nullité marques motifs absolus ; L.714-4 sur antériorités ; L.613-25 nullité brevets ; prescription action en nullité ; Cass. ch. com. nullité absolue / nullité relative ; recevabilité demande reconventionnelle" \
  --code I8V5LC \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-anteriorite-invalidite/scenario.md
```

Phase 2 — description neutre : `Skill d'analyse de validité ou de stratégie d'attaque en nullité d'un titre PI tiers (marque ou brevet). Produit un livrable partner-ready avec recevabilité, moyens de nullité et recommandation.`

### 4. `depot-marque-fr` — D9M1XD

```bash
python3 scripts/codex-blind-scoring.py phase1 \
  --skill depot-marque-fr \
  --domain marques \
  --mode "préparation dépôt marque France INPI" \
  --specificites "motifs absolus L.711-2 self-check ; classes Nice cohérentes avec exploitation ; libellé classe précis vs générique ; recherche antériorité préalable ; télé-procédure data.inpi.fr ; taxes INPI" \
  --code D9M1XD \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-depot-marque-fr/scenario.md
```

Phase 2 — description neutre : `Skill de préparation de dépôt de marque française devant l'INPI. Produit un brief de dépôt partner-ready avec qualification du signe, classes Nice et recommandation.`

### 5. `revue-portefeuille-marques` — P3R7QE

```bash
python3 scripts/codex-blind-scoring.py phase1 \
  --skill revue-portefeuille-marques \
  --domain marques \
  --mode "revue de portefeuille marques multi-territoires" \
  --specificites "déchéance L.714-5 défaut d'usage 5 ans ; renouvellement L.712-9 (10 ans) ; cap watchlist surveillance ; couverture territoriale vs exploitation actuelle ; classes Nice à élargir ou élaguer" \
  --code P3R7QE \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-revue-portefeuille-marques/scenario.md
```

Phase 2 — description neutre : `Skill de revue de portefeuille marques (échéances, usage, déchéance, couverture). Produit un livrable partner-ready avec actions priorisées par titre.`

### 6. `surveillance-marque` — S5B2NF

```bash
python3 scripts/codex-blind-scoring.py phase1 \
  --skill surveillance-marque \
  --domain marques \
  --mode "surveillance BOPI watchlist hebdomadaire" \
  --specificites "délai opposition L.712-4 (2 mois ferme post-publication BOPI) ; restauration L.712-4-1 strictement exceptionnelle ; cadence BOPI hebdomadaire vendredi ; calibrage cap watchlist 50 entrées ; niveaux d'alerte" \
  --code S5B2NF \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-surveillance-marque/scenario.md
```

Phase 2 — description neutre : `Skill de surveillance des publications BOPI contre une watchlist de marques surveillées. Produit un rapport partner-ready avec hits cotés et recommandation d'opposition.`

---

## Sprint D.2-b — Brevets (5 skills)

### 7. `certificat-complementaire-protection` — C6P8WG

```bash
python3 scripts/codex-blind-scoring.py phase1 \
  --skill certificat-complementaire-protection \
  --domain brevets \
  --mode "préparation CCP médicament Règl. CE 469/2009" \
  --specificites "délai 6 mois post-AMM Art. 7 Règl. 469/2009 ; brevet de base en vigueur à la délivrance CCP ; produit revendiqué vs brevet de base ; calcul durée CCP (5 ans max post-expiration brevet) ; CCP phytopharmaceutique Règl. 1610/96" \
  --code C6P8WG \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-certificat-complementaire-protection/scenario.md
```

Phase 2 — description neutre : `Skill de préparation d'un certificat complémentaire de protection (CCP) pour médicament ou produit phytopharmaceutique. Produit un livrable partner-ready avec readiness CCP, calcul de durée et recommandation.`

### 8. `recherche-anteriorite-brevet` — R2A4YH

```bash
python3 scripts/codex-blind-scoring.py phase1 \
  --skill recherche-anteriorite-brevet \
  --domain brevets \
  --mode "recherche antériorité brevet Espacenet préalable au dépôt" \
  --specificites "Art. 54 CBE nouveauté + Art. 56 CBE activité inventive ; état de la technique antérieure à la date de priorité ; brevets US non validés EP (état de l'art mais pas opposables EP) ; jurisprudence OEB chambres de recours" \
  --code R2A4YH \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-recherche-anteriorite-brevet/scenario.md
```

Phase 2 — description neutre : `Skill de recherche d'antériorité technique brevet préalable à un dépôt FR/EP/PCT. Produit un livrable partner-ready avec impact sur la portée des revendications.`

### 9. `revue-portefeuille-brevets` — P7B1ZI

```bash
python3 scripts/codex-blind-scoring.py phase1 \
  --skill revue-portefeuille-brevets \
  --domain brevets \
  --mode "revue de portefeuille brevets FR + EP + PCT" \
  --specificites "annuités FR / EP + délais de grâce avec surtaxes ; validations EP par pays (UK post-Brexit) ; FTO bloquant ; divisionnaires Art. 76 CBE ; UPC opt-out / opt-in pour brevets EP classiques (depuis 1er juin 2023)" \
  --code P7B1ZI \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-revue-portefeuille-brevets/scenario.md
```

Phase 2 — description neutre : `Skill de revue de portefeuille brevets (annuités, validations EP, opt-out UPC, FTO). Produit un livrable partner-ready avec actions priorisées.`

### 10. `strategie-extension-internationale` — E5X9KJ

```bash
python3 scripts/codex-blind-scoring.py phase1 \
  --skill strategie-extension-internationale \
  --domain brevets-marques \
  --mode "arbitrage routes internationales FR/EP/PCT/Madrid" \
  --specificites "Art. 4 CUP délai priorité 12 mois ; Art. 22 PCT entrée phase nationale 30 mois ; UPC compétence par défaut brevet unitaire ; Madrid Protocol désignations explicites ; budget annuités cumulé vs exploitation territoriale" \
  --code E5X9KJ \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-strategie-extension-internationale/scenario.md
```

Phase 2 — description neutre : `Skill de stratégie d'extension internationale brevets ou marques. Produit un livrable partner-ready avec arbitrage chiffré et recommandation de route.`

### 11. `tableau-contrefacon-brevet` — T8C6MK

```bash
python3 scripts/codex-blind-scoring.py phase1 \
  --skill tableau-contrefacon-brevet \
  --domain brevets \
  --mode "matrice atteinte revendication par revendication" \
  --specificites "L.613-3 contrefaçon par reproduction ; doctrine des équivalents (fonction / moyen / résultat) ; caractéristiques essentielles revendication indépendante ; revendications dépendantes ; L.615-5-1 renversement charge preuve produit nouveau" \
  --code T8C6MK \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-tableau-contrefacon-brevet/scenario.md
```

Phase 2 — description neutre : `Skill de construction d'une matrice d'atteinte brevet revendication par revendication. Produit un livrable partner-ready avec cotation par revendication et synthèse.`

---

## Sprint D.2-c — D&M (2 skills)

### 12. `contrefacon-dessin-modele` — C1D3LL

```bash
python3 scripts/codex-blind-scoring.py phase1 \
  --skill contrefacon-dessin-modele \
  --domain dessins-modeles \
  --mode "action en contrefaçon D&M FR ou DMC" \
  --specificites "L.521-1 CPI contrefaçon D&M FR ; art. 89 RDMC contrefaçon DMC ; test impression globale utilisateur averti (CJUE PepsiCo C-281/10) ; art. 6 RDMC caractère individuel ; mesures provisoires L.521-4" \
  --code C1D3LL \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-contrefacon-dessin-modele/scenario.md
```

Phase 2 — description neutre : `Skill d'action ou défense en contrefaçon de dessins et modèles FR ou DMC. Produit un livrable partner-ready avec cotation impression globale et recommandation.`

### 13. `recherche-anteriorite-dm` — A4D5NM

```bash
python3 scripts/codex-blind-scoring.py phase1 \
  --skill recherche-anteriorite-dm \
  --domain dessins-modeles \
  --mode "recherche antériorité visuelle D&M préalable au dépôt" \
  --specificites "art. 5 RDMC nouveauté ; art. 6 RDMC caractère individuel ; classes Locarno ; délai grâce 12 mois Art. 7 §2 RDMC ; état de l'art visuel (registres + collections public + e-commerce)" \
  --code A4D5NM \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-recherche-anteriorite-dm/scenario.md
```

Phase 2 — description neutre : `Skill de recherche d'antériorité visuelle dessins et modèles préalable à un dépôt FR ou DMC. Produit un livrable partner-ready avec antériorités cotées.`

---

## Sprint D.2-d — Droit auteur (5 skills)

### 14. `contrefacon-droit-auteur` — C9A2OP

```bash
python3 scripts/codex-blind-scoring.py phase1 \
  --skill contrefacon-droit-auteur \
  --domain droit-auteur \
  --mode "action contrefaçon droit d'auteur civile et pénale" \
  --specificites "L.335-2 et L.335-3 contrefaçon pénale ; L.331-1 civil ; test originalité empreinte personnalité (CJUE Infopaq C-5/08 + Painer C-145/10) ; L.122-4 reproduction ; mesures provisoires L.332-1" \
  --code C9A2OP \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-contrefacon-droit-auteur/scenario.md
```

Phase 2 — description neutre : `Skill d'action en contrefaçon de droit d'auteur (civile et/ou pénale). Produit un livrable partner-ready avec qualification originalité et recommandation.`

### 15. `depot-preuve-creation` — D6P4QQ

```bash
python3 scripts/codex-blind-scoring.py phase1 \
  --skill depot-preuve-creation \
  --domain droit-auteur \
  --mode "constitution preuve d'antériorité création protégée par droit d'auteur" \
  --specificites "L.111-1 protection dès création ; absence de formalité de dépôt obligatoire ; enveloppe Soleau INPI ; horodatage qualifié eIDAS ; dépôt huissier ; blockchain ; valeur probante comparée" \
  --code D6P4QQ \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-depot-preuve-creation/scenario.md
```

Phase 2 — description neutre : `Skill de constitution de preuve d'antériorité d'une œuvre protégée par le droit d'auteur. Produit un livrable partner-ready avec recommandation du mode de preuve adapté.`

### 16. `droits-voisins-ogc` — V8R7TR

```bash
python3 scripts/codex-blind-scoring.py phase1 \
  --skill droits-voisins-ogc \
  --domain droits-voisins \
  --mode "gestion droits voisins artistes-interprètes et producteurs via OGC" \
  --specificites "L.212-1+ artistes-interprètes ; L.213-1+ producteurs phonogrammes ; L.215-1+ vidéogrammes ; L.216-1+ com. audiovisuelle ; L.218-1+ éditeurs de presse (post-2019) ; OGC SACEM/SACD/SCPP/ADAMI compétents ; barèmes applicables" \
  --code V8R7TR \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-droits-voisins-ogc/scenario.md
```

Phase 2 — description neutre : `Skill de qualification et de gestion des droits voisins (artistes-interprètes, producteurs, éditeurs de presse) avec routage OGC. Produit un livrable partner-ready avec OGC compétent et barème applicable.`

### 17. `licence-droit-auteur` — L3A1US

```bash
python3 scripts/codex-blind-scoring.py phase1 \
  --skill licence-droit-auteur \
  --domain droit-auteur \
  --mode "préparation licence patrimoniale droit d'auteur exclusive ou non-exclusive" \
  --specificites "L.131-3 mention durée + territoire + modes + étendue ; L.131-4 rémunération proportionnelle vs forfait limitatif ; exclusivité vs non-exclusivité ; obligation d'exploitation L.132-12 (édition) ou clause spécifique ; reddition de comptes" \
  --code L3A1US \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-licence-droit-auteur/scenario.md
```

Phase 2 — description neutre : `Skill de préparation d'une licence patrimoniale en droit d'auteur (exclusive ou non, durée déterminée). Produit un livrable partner-ready avec clauses calibrées et recommandation rémunération.`

### 18. `qualification-oeuvre` — Q5W6VT

```bash
python3 scripts/codex-blind-scoring.py phase1 \
  --skill qualification-oeuvre \
  --domain droit-auteur \
  --mode "qualification juridique d'une œuvre (originalité, type, co-création)" \
  --specificites "L.112-1 et L.112-2 oeuvres protégeables ; test originalité (empreinte personnalité, CJUE Infopaq C-5/08) ; œuvre composite L.113-2 ; œuvre collective L.113-2 al.3 ; œuvre de collaboration L.113-3 ; L.113-9 logiciel employeur ; L.132-25 présomption AV" \
  --code Q5W6VT \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-qualification-oeuvre/scenario.md
```

Phase 2 — description neutre : `Skill de qualification juridique d'une œuvre protégeable par le droit d'auteur (type, originalité, co-création, régime applicable). Produit un livrable partner-ready avec qualification et recommandation chaîne titularité.`

---

## Sprint D.2-e — Logiciel / BdD (3 skills)

### 19. `bases-de-donnees` — B7D8WU

```bash
python3 scripts/codex-blind-scoring.py phase1 \
  --skill bases-de-donnees \
  --domain logiciel-bdd \
  --mode "protection base de données sui generis et droit d'auteur sur structure" \
  --specificites "L.341-1+ régime sui generis producteur ; L.342-1 extraction substantielle ; L.342-2 extractions répétées substantielles ; durée 15 ans renouvelable si investissement substantiel nouveau ; protection structure originale par droit d'auteur ; RGPD si données personnelles" \
  --code B7D8WU \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-bases-de-donnees/scenario.md
```

Phase 2 — description neutre : `Skill d'analyse de la protection d'une base de données (régime sui generis + droit d'auteur sur structure). Produit un livrable partner-ready avec stratégie de protection et recommandation.`

### 20. `revue-logiciel-donnees` — R2L9XV

```bash
python3 scripts/codex-blind-scoring.py phase1 \
  --skill revue-logiciel-donnees \
  --domain logiciel \
  --mode "audit chaîne titularité code propriétaire + droits sur données entraînement IA" \
  --specificites "L.113-9 logiciel employeur ; chaîne contributeurs freelance / consultants externes ; cessions explicites ad hoc ; régime données entraînement IA ; texte and data mining L.122-5-3 exception ; bases de données entraînement régime sui generis" \
  --code R2L9XV \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-revue-logiciel-donnees/scenario.md
```

Phase 2 — description neutre : `Skill d'audit de la chaîne de titularité du code logiciel propriétaire et des droits sur les données d'entraînement (IA, ML). Produit un livrable partner-ready avec findings cotés.`

### 21. `logiciels-pi` — L4S3YW

```bash
python3 scripts/codex-blind-scoring.py phase1 \
  --skill logiciels-pi \
  --domain logiciel \
  --mode "qualification juridique du logiciel et de ses éléments protégeables" \
  --specificites "L.112-2 13° logiciel oeuvre de l'esprit ; éléments protégeables (code source, code objet, documentation préparatoire) ; éléments non protégeables (fonctionnalités, langages, algorithmes) ; CJUE SAS Institute C-406/10 ; régime employé L.113-9" \
  --code L4S3YW \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-logiciels-pi/scenario.md
```

Phase 2 — description neutre : `Skill de qualification juridique d'un logiciel et de ses éléments protégeables par le droit d'auteur. Produit un livrable partner-ready avec périmètre de protection et recommandation.`

---

## Sprint D.2-f — Contentieux / Enforcement (4 skills)

### 22. `mise-en-demeure-pi` — M6D5ZX

```bash
python3 scripts/codex-blind-scoring.py phase1 \
  --skill mise-en-demeure-pi \
  --domain contentieux-pi \
  --mode "lettre d'assertion contre tiers contrefacteur présumé" \
  --specificites "posture cabinet (aggressive / mesurée / conservatrice) ; matrice approbateurs + escalades automatiques ; risque procès abusif art. 1240 C.civ + L.123-2 C.com. ; verification destination secret professionnel ; mode silencieux livrable externe" \
  --code M6D5ZX \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-mise-en-demeure-pi/scenario.md
```

Phase 2 — description neutre : `Skill de rédaction de mise en demeure PI avec posture calibrée. Produit la lettre + note relecteur partner-ready.`

### 23. `saisie-contrefacon` — S8C7AY

```bash
python3 scripts/codex-blind-scoring.py phase1 \
  --skill saisie-contrefacon \
  --domain contentieux-pi \
  --mode "requête ex parte saisie-contrefaçon Art. L.615-5 brevet" \
  --specificites "L.615-5 brevets ; L.716-7 marques ; L.521-4 D&M ; L.332-1 droit auteur ; motivation urgence + subsidiarité ; étendue opérations (lieux, copies, échantillons) ; mainlevée et rétractation ; jurisprudence chambres saisies CA Paris" \
  --code S8C7AY \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-saisie-contrefacon/scenario.md
```

Phase 2 — description neutre : `Skill de préparation d'une requête ex parte en saisie-contrefaçon (brevet, marque, D&M, droit d'auteur). Produit un livrable partner-ready avec motivation et étendue.`

### 24. `strategie-defense-pi` — D1F2BZ

```bash
python3 scripts/codex-blind-scoring.py phase1 \
  --skill strategie-defense-pi \
  --domain contentieux-pi \
  --mode "posture défensive attaque contrefaçon présumée" \
  --specificites "défense par nullité reconventionnelle ; usage antérieur L.613-7 brevet ; FTO documentée ; bonne foi ; mesures conservatoires défensives ; transaction privilégiée selon profil cabinet ; calcul exposition maximum" \
  --code D1F2BZ \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-strategie-defense-pi/scenario.md
```

Phase 2 — description neutre : `Skill de définition d'une stratégie de défense PI face à une attaque en contrefaçon. Produit un livrable partner-ready avec axes de défense priorisés et recommandation transaction vs combat.`

### 25. `tri-contrefacon` — T3R4CA

```bash
python3 scripts/codex-blind-scoring.py phase1 \
  --skill tri-contrefacon \
  --domain contentieux-pi \
  --mode "pré-qualification rapide signaux contrefaçon (web, marketplace, salon)" \
  --specificites "scoring contrefaçon manifeste vs probable vs douteux ; volume commercial significatif ; contrefacteur identifiable ; identité chiffrée vs anonyme ; orientation routage (notification retrait / mise en demeure / saisie / abandon)" \
  --code T3R4CA \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-tri-contrefacon/scenario.md
```

Phase 2 — description neutre : `Skill de pré-qualification rapide de signaux de contrefaçon (web, marketplace, salon). Produit un livrable partner-ready avec scoring et routage enforcement.`

---

## Sprint D.2-g — Transverse (4 skills)

### 26. `audit-pi-ma` — U5M6DB

```bash
python3 scripts/codex-blind-scoring.py phase1 \
  --skill audit-pi-ma \
  --domain transverse \
  --mode "audit due diligence PI dans opération M&A" \
  --specificites "inventaire multi-actifs (marques, brevets, D&M, auteur, logiciel, OSS, secrets) ; chaîne titularité L.131-3, L.113-9, inscriptions registres ; antériorités bloquantes ; valorisation (relief-from-royalty, DCF, cost approach) ; reps & warranties + escrow + conditions suspensives" \
  --code U5M6DB \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-audit-pi-ma/scenario.md
```

Phase 2 — description neutre : `Skill d'audit due diligence PI dans une opération M&A. Produit un livrable partner-ready avec findings cotés, valorisation indicative et recommandations transactionnelles.`

### 27. `contrats-pi` — C7P8EC

```bash
python3 scripts/codex-blind-scoring.py phase1 \
  --skill contrats-pi \
  --domain transverse \
  --mode "rédaction ou revue contrat PI autonome (licence, cession, R&D, transfert tech)" \
  --specificites "L.131-3 cession auteur ; L.613-8 licence brevet ; TTBER UE 316/2014 transfert de technologie ; formalités opposabilité (inscription RNB brevets, RNM marques) ; clauses sensibles (non-contestation, no-challenge, grant-back, audit, change of control) ; jurisprudence Windsurfing" \
  --code C7P8EC \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-contrats-pi/scenario.md
```

Phase 2 — description neutre : `Skill de rédaction ou de revue de contrat PI autonome (licence, cession, R&D collaborative, transfert technologie, MTA, NDA). Produit un livrable partner-ready avec clauses calibrées et formalités opposabilité.`

### 28. `revue-clause-pi` — R9V1FD

```bash
python3 scripts/codex-blind-scoring.py phase1 \
  --skill revue-clause-pi \
  --domain transverse \
  --mode "revue ciblée des clauses PI dans contrat plus large (NDA, partenariat, prestation)" \
  --specificites "clause cession globale œuvres futures (L.131-1 nullité) ; clause non-contestation (atteinte ordre public ?) ; clause grant-back ; clause de no-challenge ; portée territoriale et temporelle ; rémunération vs cession" \
  --code R9V1FD \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-revue-clause-pi/scenario.md
```

Phase 2 — description neutre : `Skill de revue ciblée des clauses PI dans un contrat plus large (NDA, partenariat, prestation, contrat commercial). Produit un livrable partner-ready avec clauses cotées et reformulations.`

### 29. `portefeuille-pi` — P2T3GE

```bash
python3 scripts/codex-blind-scoring.py phase1 \
  --skill portefeuille-pi \
  --domain transverse \
  --mode "revue de portefeuille PI multi-domaines (marques + brevets + D&M + auteur)" \
  --specificites "échéances renouvellement marques L.712-9 ; annuités brevets ; formalités opposabilité ; couverture territoriale vs exploitation ; complétude inventaire actifs PI ; recommandation IPMS au-delà de 50 titres" \
  --code P2T3GE \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-portefeuille-pi/scenario.md
```

Phase 2 — description neutre : `Skill de revue de portefeuille PI multi-domaines (marques + brevets + D&M + droit auteur). Produit un livrable partner-ready avec actions priorisées par titre.`

---

## Commandes Phase 2 type

Pour chaque skill, après la sauvegarde du `scenario.md` Phase 1, lancer :

```bash
python3 scripts/codex-blind-scoring.py phase2 \
  --skill <skill> \
  --skill-description "<description neutre ci-dessus>" \
  --domain <domain> \
  --mode "<mode>" \
  --scenario plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-<skill>/scenario.md \
  --output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-<skill>/ground-truth.md
```

Coller dans une **session Codex distincte de Phase 1**, effort **HIGH**.

---

## Commandes Phase 4 type

Une fois `scenario.md` + `ground-truth.md` + `live-output.md` disponibles :

```bash
python3 scripts/codex-blind-scoring.py phase4 \
  --skill <skill> \
  --skill-version 2.0.0 \
  --code <code> \
  --scenario plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-<skill>/scenario.md \
  --ground-truth plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-<skill>/ground-truth.md \
  --live-output plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-<skill>/live-output.md \
  --date 2026-06-XX \
  --output docs/backlog/pi-scoring-d2-<skill>-<code>.md
```

Coller dans une **session Codex distincte des Phases 1, 2 et 3**, effort medium.

---

## Phase 3 — Exécution live Claude Code (à toi)

Phase 3 reste manuelle dans Claude Code après que Phases 1 + 2 soient livrées pour un skill. Le workflow :

1. Ouvrir Claude Cowork avec le plugin PI v0.21.0 installé.
2. Dossier `tests/datasets/d2-<skill>/scenario.md` ouvert dans le contexte de la conversation.
3. Invoquer `/h-pi:<skill> <mode> tests/datasets/d2-<skill>/scenario.md`.
4. Récupérer la sortie complète, la sauvegarder dans `tests/datasets/d2-<skill>/live-output.md`.

**Ne pas ouvrir `ground-truth.md` dans la conversation Claude Code Phase 3** — anti-leakage manuel.

---

## Suivi état d'avancement

Mettre à jour un tableau de suivi au fur et à mesure :

| # | Skill | Code | Phase 1 | Phase 2 | Phase 3 | Phase 4 | Score |
|---|---|---|---|---|---|---|---|
| 1 | analyse-opposition-marque | M4K2PA | ⏳ | ⏳ | ⏳ | ⏳ | — |
| 2 | analyse-refus-inpi | R7N3FB | ⏳ | ⏳ | ⏳ | ⏳ | — |
| ... | ... | ... | ... | ... | ... | ... | ... |

Quand les 29 cycles sont complets : agrégation dans `docs/backlog/pi-content-improvements-vague-d2.md` (livrable D.2.8).

---

## Estimation budget Codex

Pour 29 skills × 3 sessions Codex (Phase 1 medium + Phase 2 HIGH + Phase 4 medium) :
- Phase 1 medium : ~5-10 min/skill × 29 = 2.5 à 5 h équivalent humain Codex
- Phase 2 HIGH : ~10-20 min/skill × 29 = 5 à 10 h Codex
- Phase 4 medium : ~5-10 min/skill × 29 = 2.5 à 5 h Codex
- **Total Codex** : ~10 à 20 h, parallélisable en batch (plusieurs onglets / sessions Codex simultanées).

Pour 29 Phase 3 Claude Code : ~3-5 min/skill × 29 = ~2 h Claude Code.

**Total chemin long D.2 estimé** : ~12 à 22 h équivalent humain réparti Codex + Claude Code.
