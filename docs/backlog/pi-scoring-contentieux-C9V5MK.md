# Sparring scoring — `contentieux-pi` — Code C9V5MK

**Date** : 2026-06-01
**Évaluateur** : sparring critique style K7M2PX
**Skill évalué** : `plugins/hacienda-propriete-intellectuelle/skills/contentieux-pi/SKILL.md` (v2.0.0)
**Scénario** : `plugins/hacienda-propriete-intellectuelle/tests/datasets/v2-contentieux/scenario.md`
**Commande simulée** : `/h-pi:contentieux-pi attack` sur dossier PHARMAGEN c. ONCOGEN (brevet biosimilaire EP 3 567 890 B1)
**Question test** : un avocat contentieux PI senior qui lance ce skill produirait-il une recommandation **partner-ready** vers le DG PHARMAGEN, ou un mémo en surface qui valide la pression interne « 30 jours assignation » ?

---

## Score global : 64/100 — 🟠 Élevé (à durcir)

| Dimension | Poids | Score brut | Pondéré | Verdict |
|---|---|---|---|---|
| Couverture du périmètre | 30 | 20/30 | 20 | 🟠 |
| Détection nuances métier | 30 | 16/30 | 16 | 🟠 |
| Qualité arbitrage subjectif | 20 | 14/20 | 14 | 🟡 |
| Lisibilité partner-ready | 10 | 9/10 | 9 | 🟢 |
| Résistance aux pièges | 10 | 5/10 | 5 | 🟠 |
| **Total** | **100** | — | **64/100** | **🟠** |

**Verdict global** : 🟠 **Élevé — à durcir avant prod sur dossiers brevets pharma**. Le skill capte la structure générale (recevabilité, référé, budget, nullité reconventionnelle) mais ne *force* pas l'avocat à distinguer brevet de procédé / brevet de produit, ne mentionne nulle part **L.615-5-1 CPI** (renversement de preuve produit nouveau), ne mentionne nulle part **l'UPC** (compétence par défaut sur brevets unitaires depuis 2023), et n'a aucune doctrine sur la **séquence saisie-contrefaçon avant assignation** comme prérequis méthodologique sur brevet de procédé. Le risque concret est qu'un mémo généré « passe » la pression DG « 30 jours » sans le retoquage doctrinal qu'un partner ferait à l'oral.

---

## Détail des scores

### 1. Couverture du périmètre — 20/30 🟠

Le skill couvre nominalement les 7 findings attendus mais 3 sont sous-traités au point d'être manquables :

| Finding attendu | Couvert ? | Notes |
|---|---|---|
| 🔴 Procédé rev.1 non démontré chez ONCOSYN | **partiel** | Étape 6 mentionne « atteinte littérale ou par équivalence » génériquement, mais **aucune mention « brevet de procédé »** ni de la nécessité d'établir le procédé. Un junior peut le rater. |
| 🔴 Nullité reconventionnelle (Nature Biotech + Genentech + Novartis) | **oui** | Étape 6 + exemple `défense` listent antériorité / activité inventive / insuffisance description. Bien. |
| 🔴 Compétence UPC vs TJ Paris | **NON** | Aucune mention de l'UPC, du brevet unitaire, ni de l'opt-out art. 83 AUPC dans tout le SKILL.md. **C'est un gap structurel sur tout dossier brevet EP post-2023.** |
| 🟠 Risque référé Art. L.615-3 en l'état | **partiel** | Étape 7 liste les conditions (titre vraisemblablement valable + atteinte vraisemblable). Mais **aucun avertissement sur dommages art. 1240 / procès abusif** en cas d'échec référé. Exemple 1 va même jusqu'à coter référé « probable 🟡 » sans nuance. |
| 🟠 Préjudice L.615-7 | **oui** | Étape 8 liste les 4 méthodes alternatives correctement. |
| 🟡 Prescription L.615-8 | **oui** | Étape 4 traite. |
| 🟢 Profil cabinet aligné | **oui** | Chargement profil explicite. |

**Manquants structurels** : (i) saisie-contrefaçon Art. L.615-5 comme **prérequis méthodologique** sur brevet de procédé (seulement « renvoi » vers skill `saisie-contrefacon`, pas un signal de séquencement obligatoire) ; (ii) toute la dimension UPC ; (iii) distinction biosimilaire / FTO.

### 2. Détection nuances métier — 16/30 🟠

| Nuance attendue | Capté ? |
|---|---|
| L.615-5-1 CPI renversement charge preuve sur brevet de procédé / produit nouveau | **NON** — non cité une seule fois |
| Saisie-contrefaçon stratégique AVANT assignation comme angle dédié procédé | **partiel** — renvoi skill mais pas doctrine de séquence |
| UPC entré en vigueur 1er juin 2023, opt-out art. 83 | **NON** |
| Biosimilaire ≠ liberté d'exploitation (AMM ≠ FTO) | **NON** — aucun signal sur la confusion fréquente |
| Méthodes L.615-7 (manque à gagner / masse / licence forcée / bénéfices contrefacteur) | **OUI** |
| Risque procès abusif art. 1240 si référé rejeté | **NON** |
| 80%+ actions brevet pharma déclenchent nullité reconventionnelle (taux base) | **partiel** — risque listé sans taux |
| Pression sponsor interne à modérer (qualité > vitesse) | **partiel** — l'esprit « pas de findings de remplissage » + « probabilités explicites » va dans ce sens mais aucun signal **dédié** « ne pas accepter aveuglément l'échéance DG » |

Le skill connaît la **structure** judiciaire FR (CPC + CPI) très correctement, mais ne porte pas la **doctrine technique brevet pharma** qui distingue un partner d'un senior.

### 3. Qualité arbitrage subjectif — 14/20 🟡

Points forts :
- Issues canoniques par mode (`go` / `go conditionnel` / `settle first` / `no-go`) bien définies — pousse vers une recommandation conditionnelle plutôt que tranchée.
- Doctrine « préférer une issue conditionnelle quand le dossier est incomplet » explicite (§ Doctrine utile).
- Plancher cross-skill 🔴 amont respecté — empêche dégradation silencieuse.
- Mode `--budget-only` produit la fourchette chiffrée demandée.

Points faibles :
- **Aucun mécanisme structurel** pour produire la recommandation attendue *« assignation TROP TÔT — saisie d'abord »*. Un junior peut écrire « `go conditionnel` après vérifications » sans imposer la séquence saisie → analyse → décision.
- **Aucun template de plan chronologique** (semaines 1-9 dans la vérité terrain). Le skill décrit le calendrier procédural *après assignation* (Étape 5) mais pas le calendrier *de préparation pré-saisine*.
- L'exemple 1 du skill (cumul brevet+marque) **valide explicitement** « référé probable 🟡 » sur seule base d'un constat huissier — c'est le pattern exact à ne pas reproduire sur brevet de procédé. Anti-pattern intégré dans la doctrine du skill.

### 4. Lisibilité partner-ready — 9/10 🟢

- Format de sortie bien cadré : résumé exécutif 3 phrases, deal facts contentieux, red flags, analyse par axes, mémo de décision, renvois, validation humaine, question hors checklist, arbre 5 options.
- « Mode silencieux livrables externes » documenté pour DG / sponsor business.
- Ton « avocat contentieux PI senior, partner-ready » explicitement posé.
- Seul accroc : la section « Étape 1 — Pré-flight check-pii » reste affichée dans le format livrable, ce qui n'est pas partner-ready si non assaini en mode silencieux.

### 5. Résistance aux pièges — 5/10 🟠

| Piège | Skill évite ? |
|---|---|
| Assigner sans saisie préalable sur brevet de procédé | **NON** — rien dans la doctrine ne l'interdit |
| Lancer référé en l'état | **NON** — exemple 1 valide explicitement |
| Omettre vérification statut UPC | **NON** — UPC absent du skill |
| Accepter pression DG « 30 jours » | **partiel** — doctrine prudentielle générale, pas de garde-fou dédié |
| Oublier nullité dans le budget | **OUI** — listée Étape 9 |
| Conclure « atteinte établie » sur seule présence produit | **NON** — Étape 6 ne distingue pas procédé / produit |
| Confondre biosimilaire / FTO | **NON** — absent |

**4 pièges sur 7 ne sont pas verrouillés.** Sur brevet pharma, c'est le talon d'Achille principal.

---

## Gaps DESIGN du skill (à intégrer pour V2.1)

1. **§ Brevet de procédé vs brevet de produit — doctrine dédiée**. Distinction explicite. Quand `branche = brevet-infringement` ET au moins une revendication indépendante est un procédé, déclencher checklist :
   - Le procédé peut-il être démontré chez le défendeur sur pièces ouvertes (RCP, notice, étiquette, communications) ? Si non → **saisie-contrefaçon prérequise**.
   - Le produit issu du procédé est-il **« nouveau »** au sens L.615-5-1 CPI à la date de priorité ? Si oui → renversement charge de preuve mobilisable.
   - Si non démontrable + non nouveau → **action prématurée — coter 🔴 et router vers `saisie-contrefacon`**.

2. **§ Compétence UPC — nouvelle gate recevabilité**. Ajouter à l'Étape 4 :
   - Brevet EP avec effet unitaire ? → UPC compétent par défaut (Accord JUB art. 32).
   - Brevet EP classique post-1er juin 2023 ? → UPC compétent par défaut SAUF opt-out art. 83 AUPC exercé.
   - Brevet FR pur national ? → TJ Paris L.615-17.
   - Vérification statut UPC obligatoire avant choix de forum. Sans elle, coter 🔴.

3. **§ Référé Art. L.615-3 — garde-fou risque abusif**. Étape 7 doit avertir : « Un référé brevet rejeté faute de vraisemblance du titre ou de l'atteinte peut entraîner condamnation pour procédure abusive (art. 1240 C.civ + L.123-2) et dommages au défendeur. Coter 🔴 si soit la validité du titre, soit la démonstration de l'atteinte, présente une fragilité matérielle. »

4. **§ Séquence pré-saisine pour brevet — calendrier de préparation**. Ajouter en amont de l'Étape 5 un calendrier-type pré-saisine sur brevet : audit revendications + antériorités → vérif statut UPC → saisie-contrefaçon ex parte → analyse pièces saisies → décision référé / fond / transaction. Plage 6-12 semaines. C'est ce qui produit la recommandation chronologique attendue.

5. **§ Biosimilaire / pharma — note de spécialité**. Une ligne suffit dans § Doctrine utile : « AMM (FR ou centralisée EMA) ne vaut **pas** liberté d'exploitation. Un biosimilaire autorisé peut être contrefaisant d'un brevet de procédé ou de composition tiers. »

6. **§ Gestion de la pression sponsor business**. Ajouter dans § Ton : « Si le sponsor business impose une échéance (« assignation sous N jours »), confronter explicitement la faisabilité méthodologique. Une assignation prématurée sur brevet de procédé sans saisie préalable est plus coûteuse en réputation et en exposition art. 1240 qu'un report de 6 semaines. La pression interne n'est pas un argument de droit. »

7. **§ Exemples — l'exemple 1 actuel est un anti-pattern**. Il coter « référé probable 🟡 » sur cumul brevet+marque avec seul constat huissier. À réécrire pour montrer la séquence saisie → analyse → décision référé, ou à neutraliser pour ne plus servir de gabarit.

8. **§ Probabilité succès au fond**. La vérité terrain attend une fourchette (50-65 % ici). Le skill demande « probabilités explicites » en § Ton mais ne donne aucune échelle ni ancrage. Ajouter une grille indicative : titre fort + atteinte démontrée + pas d'antériorité crédible = 70-85 % / titre fragilisé par antériorité + atteinte démontrable = 45-65 % / titre fragile + atteinte non démontrée = < 30 %.

---

## Recommandation V2.1

Bloquer toute promo en prod sur dossiers brevets pharma tant que **gaps 1, 2, 3, 7** ne sont pas intégrés. Gaps 4-6, 8 sont du durcissement de qualité, intégrables en parallèle. L'investissement est < 1 jour d'édition SKILL.md + références.

---

*Sparring critique — pas un avis juridique — validation humaine requise avant intégration.*
