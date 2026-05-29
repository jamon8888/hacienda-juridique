# Backlog — Améliorations spa-review post-validation interne

> **Statut :** identifié en test interne pré-personas (2026-05-29). À traiter dans une vague d'améliorations groupée avec les retours frère/ami.
> **Skill concerné :** `plugins/hacienda-droit-affaires/skills/spa-review/SKILL.md`
> **Test de référence :** scoring K7M2PX en aveugle — verdict 🟢 VERT (87 % pondéré, 0 faux positif pur, 2/2 pièges résistés).

## Contexte

Test mené avec un dataset SPA synthétique généré par un LLM tiers (cession 100 % titres SAS MEDICORE, secteur dispositifs médicaux classe II, acquéreur étranger groupe allemand, prix 34 M€ + earn-out 6 M€). L'analyse spa-review en aveugle a été comparée à une vérité terrain plantée puis scorée par un LLM neutre. Le verdict est suffisant pour validation persona, mais 3 trous structurels ont été identifiés.

## Améliorations à intégrer

### 1. Tabuler systématiquement les red flags formalités / agrément SAS

**Trou identifié.** L'analyse a signalé l'absence de purge d'agrément SAS en commentaire d'axe ("pas mention purge agrément SAS `[à vérifier statuts]`") au lieu de le tabuler comme red flag autonome. Le raisonnement implicite : la pose du red flag est conditionnée à la lecture des statuts.

**Pourquoi c'est un faux négatif systémique.** L'article L.227-14 C.com. permet aux statuts de prévoir un agrément, mais en pratique la plupart des SAS comportent une clause d'agrément. La purge (ou la confirmation de l'absence de clause) doit être posée proactivement à chaque cession de titres SAS, sans dépendre de la consultation préalable des statuts. La consultation des statuts sert à identifier les exemptions, pas à autoriser la pose du red flag.

**Action SKILL.md.** À l'Étape 3 (Capacité, pouvoirs et restrictions sur titres), ajouter un point explicite :

> Pour toute cession de titres SAS, poser systématiquement la question de la purge d'agrément (L.227-14 C.com.). Le SPA doit attester soit (i) l'absence de clause d'agrément dans les statuts, soit (ii) la purge effective via décision sociale. Sans cette confirmation, classer 🟠 minimum avec tag `[review]` "vérification statuts SAS requise — agrément susceptible d'invalider la cession".

### 2. Approfondir l'analyse des contradictions procédurales (clauses droit applicable / juridiction)

**Trou identifié.** L'analyse a détecté la mention "clause compromissoire" dans un article attribuant compétence au Tribunal de commerce — mais l'a qualifiée de "vestige de template" sans analyse du risque procédural sous-jacent.

**Pourquoi c'est insuffisant.** Une contradiction entre clause compromissoire (arbitrage) et clause attributive de juridiction (juridiction étatique) déclenche le principe **compétence-compétence** (Cass. civ. 1re, jurisprudence constante) : seul le tribunal arbitral peut, en premier lieu, statuer sur sa propre compétence. Conséquence pratique : si un litige survient et que la contradiction n'a pas été corrigée, l'acquéreur peut subir un détour procédural (saisine arbitre → décision sur compétence → recours → saisine juge étatique) qui retarde le contentieux de 12-24 mois et augmente significativement les coûts.

**Action SKILL.md.** À l'Étape 10 (Renvois et liste de points) ou en sous-section de l'analyse axe 10 du livrable (Choix de loi / juridiction / arbitrage), ajouter :

> Si le SPA contient une mention résiduelle d'arbitrage ou de clause compromissoire dans un article attribuant compétence à une juridiction étatique (ou inversement), poser 🟠 minimum avec note "ambiguïté procédurale — principe compétence-compétence peut imposer un détour par tribunal arbitral avant tout recours étatique, source de retard contentieux 12-24 mois". Action : corriger la rédaction avant signing.

### 3. Calibrer la sévérité de l'earn-out potestatif en double temporalité

**Trou identifié.** L'analyse a sous-sévérisé l'earn-out potestatif (article 3) à 🟠 au lieu de 🔴 attendu, parce qu'elle a privilégié la lecture court-terme côté acquéreur ("c'est confortable pour l'acquéreur") au lieu de la lecture long-terme (risque de requalification potestatif sous 1304-2 C.civ. + dommages-intérêts pour manquement bonne foi en cas de litige post-closing).

**Pourquoi c'est un biais d'analyse.** Un earn-out où l'acquéreur conserve "une latitude entière" sans engagement de bonne foi ni mécanisme d'expertise tierce est une bombe à retardement, pas un cadeau. Le risque 🔴 réside dans le contentieux post-closing potentiel, pas dans l'opportunité contractuelle immédiate.

**Action SKILL.md.** À l'Étape 6 (Prix, ajustements et paiement), reformuler la directive sur l'earn-out pour forcer l'analyse 2 temporalités :

> Un earn-out où l'acquéreur conserve une latitude entière sur la conduite des affaires sans engagement de bonne foi ni mécanisme d'expertise est 🔴 quelle que soit la side. Côté cédant, le risque est l'absence de versement ; côté acquéreur, le risque est la requalification potestative (1304-2 C.civ.) avec dommages-intérêts. Ne jamais sous-sévériser au prétexte d'un confort court terme.

## Méthodologie de traitement

- À combiner avec les retours frère et ami après période de test.
- Une seule PR groupée pour l'ensemble des améliorations spa-review post-personas.
- Mettre à jour la version du SKILL.md (actuelle 2.0.0 → 2.1.0).
- Mettre à jour le dataset interne `v2-spa/spa-review-scenario.md` si les 3 patterns ci-dessus ne sont pas encore représentés.

## Référence test

- Bloc A (vérité terrain) et Bloc B (analyse blind) du scoring K7M2PX archivés hors repo (échange utilisateur ↔ LLM scoreur).
- Verdict scoring : 🟢 VERT — voir détails dans le rapport de scoring transmis le 2026-05-29.
