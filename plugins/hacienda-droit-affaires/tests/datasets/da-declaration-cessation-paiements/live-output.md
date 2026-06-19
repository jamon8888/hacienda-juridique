# Sortie live — Déclaration de cessation des paiements (DCP3RT)

> Phase 3 — Exécution live Claude Code natif (claude-sonnet-4-6), sans accès au ground-truth.md.
> Date d'exécution : 2026-06-19.

`NOTES DE TRAVAIL — Faire valider par [avocat référent non configuré] avant tout usage externe`
`Profil cabinet non configuré ([A CONFIGURER]) — apposer l'en-tête définitif après /h-da:entretien-demarrage`

---

> **⚠️ Note du relecteur**
> - **Sources :** Légifrance ✗ (PISTE non connecté — articles cités `[connaissance modèle — à vérifier]`) · Judilibre ✗ · Pappers ✗ · BODACC ✗ (pré-procédure — sans objet)
> - **Lecture :** éléments financiers fournis : trésorerie (12 k€), ligne bancaire confirmée par écrit (50 k€), créances clients (40 k€ / 60 j), fournisseurs échus (95 k€ + 2 MED), moratoire URSSAF (30 k€ / 12 mensualités à compter du mois prochain), échéance emprunt impayée (18 k€), capital emprunt équipement (120 k€, caution personnelle M. Marchand 80 k€). Aucun compte annuel, aucune situation de trésorerie datée formelle, aucun inventaire.
> - **Pré-flight PII :** seuil B atteint (dénomination + dirigeant + montants > 10 k€) — données explicitement fictives (dataset scoring blind Phase 3), traitement poursuivi sans blocage ; en données réelles, confirmation utilisateur requise.
> - **Signalé pour ton jugement :** date de CdP non arrêtée `[review]` · inclusion ligne bancaire dans actif disponible `[review]` · effet moratoire URSSAF sur passif exigible `[review]` · risque déchéance du terme emprunt équipement `[review]` · orientation RJ/LJ `[review]` · exposition caution personnelle M. Marchand `[review]`
> - **Fraîcheur :** jurisprudence ch. com. post-2023 sur date de CdP et réserves de crédit non vérifiée (Judilibre indisponible) `[à vérifier]`
> - **Avant de t'appuyer dessus :** (1) faire établir une situation de trésorerie datée par l'expert-comptable pour confirmer la CdP et arrêter la date ; (2) vérifier si l'impayé de l'échéance bancaire (18 k€) a déclenché une clause de déchéance du terme sur le capital restant (120 k€) — impact direct sur passif exigible et orientation ; (3) soumettre le projet de déclaration à un avocat avant tout dépôt au greffe

---

## 1. Qualification de la cessation des paiements (L.631-1 C.com.)

### Actif disponible

| Élément | Montant | Inclus ? | Note |
|---|---|---|---|
| Trésorerie disponible (solde bancaire) | 12 000 € | ✓ | Immédiatement disponible |
| Ligne bancaire « crédit de campagne », non utilisée | 50 000 € | ✓ | Réserve de crédit confirmée par écrit (Banque Régionale de l'Ouest, courrier du mois dernier) — incluse dans l'actif disponible (L.631-1 al. 2 `[connaissance modèle — à vérifier]`) `[review]` |
| Créances clients | 40 000 € | ✗ | Recouvrement à 60 jours — non immédiatement réalisables |

**Total actif disponible retenu : 62 000 €**

> Si la ligne bancaire était révoquée ou conditionnée, l'actif disponible tomberait à 12 000 € et l'insuffisance serait de ~101 000 €. Vérifier que le courrier de confirmation est toujours valide et sans condition suspensive.

### Passif exigible

| Élément | Montant | Exigible ? | Note |
|---|---|---|---|
| Fournisseurs (factures échues, relances, 2 MED) | 95 000 € | ✓ | Échus et réclamés |
| URSSAF | 30 000 € | ✗ (provisoire) | Moratoire signé — 12 mensualités à compter du mois prochain → **sort du passif immédiatement exigible tant que le moratoire est honoré** ; un défaut sur une mensualité le réintègre `[review]` |
| Emprunt bancaire — échéance échue et impayée | 18 000 € | ✓ | Échue et impayée |
| Emprunt équipement — capital restant dû | 120 000 € | ? | Non échu à ce stade ; **risque de déchéance du terme** en raison de l'impayé sur l'échéance — à vérifier dans le contrat de prêt `[review]` |

**Total passif exigible retenu (hypothèse basse) : 113 000 €**

> **Caveat moratoire URSSAF :** défaut d'une mensualité → 30 000 € réintègrent le passif exigible → insuffisance portée à ~81 000 €.
>
> **Caveat déchéance du terme :** si prononcée par la banque sur l'emprunt équipement, le passif exigible atteindrait ~233 000 € (ou ~203 000 € avec URSSAF moratoriée). À vérifier impérativement dans le contrat de prêt — impact décisif sur l'orientation RJ/LJ.

### Bilan — Cessation des paiements **probable**

**Insuffisance provisoire : 113 000 − 62 000 = ~51 000 €** `[review]`

Cessation des paiements **probable** au sens de l'art. L.631-1 C.com. `[connaissance modèle — à vérifier]` — **non établie** : les chiffres sont déclaratifs, sans situation de trésorerie datée formelle. Ne pas écrire « établie » avant confirmation par l'expert-comptable.

Même en incluant les créances clients à 60 jours (actif porté à ~102 000 €), l'insuffisance resterait d'environ ~11 000 €.

**Voie préventive — à garder ouverte tant que la CdP n'est pas confirmée sur pièces :** si la situation de trésorerie datée n'établit finalement pas la cessation, renvoyer vers `/h-da:prevention-difficultes` (mandat ad hoc / conciliation L.611-4 C.com. `[connaissance modèle — à vérifier]`). La conciliation reste accessible tant qu'il n'y a pas CdP **depuis plus de 45 jours** — souvent préférable au dépôt de bilan (pas de publication BODACC à l'ouverture, plus grande souplesse). Cette fenêtre dépend directement de la date de CdP qui sera arrêtée `[review]`.

---

## 2. Statut du délai de déclaration (conditionnel)

### Date de cessation des paiements — non arrêtée

La date de CdP est celle à laquelle l'actif disponible est devenu insuffisant pour couvrir le passif exigible. Elle est **fixée par le tribunal** (L.631-8 C.com. — report possible jusqu'à 18 mois avant le jugement d'ouverture `[connaissance modèle — à vérifier]`) et détermine le point de départ de la **période suspecte** (nullités L.632-1 / L.632-2 C.com. `[connaissance modèle — à vérifier]`).

| Élément chronologique fourni | Valeur | Rôle |
|---|---|---|
| Premier impayé fournisseur significatif | ~10 semaines | Indice — non la date de CdP |
| Mises en demeure reçues | ~5 et ~3 semaines | Indices d'aggravation du passif réclamé |
| Perception de M. Marchand | « il y a encore un mois, on pensait s'en sortir » | Appréciation subjective — non constitutive de la date |

**Date retenue : `[à compléter — date exacte à arrêter avec l'expert-comptable sur pièces datées]`** `[review]`

Le premier impayé à ~10 semaines est un **indice**, pas la date de CdP. Ne pas convertir cette approximation en date calendaire.

### Délai légal de 45 jours

45 jours à compter de la date réelle de CdP — art. L.631-4 C.com. (RJ) / L.640-4 C.com. (LJ) `[connaissance modèle — à vérifier]`. Neutralisé si une conciliation (L.611-4) a été demandée dans l'intervalle. **Aucune démarche engagée ici → délai non neutralisé.**

**Aucune échéance exacte calculable tant que la date de CdP n'est pas arrêtée.**

Lecture conditionnelle :
- Si la CdP se confirme autour de **~10 semaines**, le délai de 45 jours serait **vraisemblablement dépassé — à confirmer une fois la date arrêtée sur pièces datées**.
- Si la CdP est plus récente (**~3 à 4 semaines**), le délai serait en cours ou venant d'expirer — urgence immédiate dans tous les cas.
- **Dans tous les cas : dépôt = obligation à brève échéance, ne pas temporiser.**

---

### ⚠️ Alerte — Exposition personnelle de M. Hervé Marchand (conditionnelle) `[review]`

Un dépassement des 45 j exposerait **personnellement M. Marchand** :

- **Interdiction de gérer** (art. L.653-8 C.com. `[connaissance modèle — à vérifier]`) — sanction pour faute de gestion.
- **Action en contribution à l'insuffisance d'actif** (art. L.651-2 C.com. `[connaissance modèle — à vérifier]`) — mise en cause patrimoniale personnelle à hauteur de l'insuffisance d'actif.
- **Période suspecte courant depuis la date de CdP** : actes passés depuis lors susceptibles de nullité (L.632-1 / L.632-2 C.com. `[connaissance modèle — à vérifier]`).

Le risque se cristallise en cas d'**omission consciente de déclarer** en l'absence de toute démarche amiable — situation exacte de M. Marchand. La demande de conciliation, même tardive si le délai n'est pas encore formellement dépassé, neutralise le délai et atténue le reproche.

**Action immédiate recommandée :** M. Marchand doit **documenter la chronologie** — dates précises des premiers impayés, moment de la prise de conscience effective de la cessation, démarches amiables tentées. C'est la pièce maîtresse de sa défense.

L'**évaluation** de cette responsabilité (faute caractérisée, quantum, moyens de défense, sort des cautions) relève d'un avocat. Ce skill nomme, il n'évalue pas. **Agir sans délai.**

---

## 3. Tribunal compétent

**Tribunal de commerce de Tours (37)**

SARL Atelier Boréal = société commerciale → tribunal de commerce (art. L.631-2 C.com. `[connaissance modèle — à vérifier]`). Confirmer l'adresse exacte du greffe et les modalités de dépôt.

---

## 4. Orientation RJ / LJ (sans trancher)

| Critère | Élément disponible |
|---|---|
| Activité en cours | ✓ — atelier au ralenti, deux chantiers en cours |
| Trésorerie opérationnelle | ✗ — plus de fonds pour acheter la matière première |
| Carnet de commandes | Mentionné mais non chiffré |
| Trésorerie prévisionnelle | Non fournie |
| Financement post-procédure | Non évalué |
| Données de viabilité | Absentes |

Les données conditionnant l'évaluation du redressement (trésorerie prévisionnelle, financement disponible, rentabilité, carnet chiffré) sont absentes. Sans elles, le redressement ne peut être ni confirmé ni exclu.

→ Présenter **les deux voies** :
- **Redressement judiciaire (L.631-1 C.com. `[connaissance modèle — à vérifier]`)** : si un redressement est possible — activité poursuivie, plan soumis au tribunal.
- **Liquidation judiciaire (L.640-1 C.com. `[connaissance modèle — à vérifier]`)** : si le redressement est manifestement impossible.

**C'est le tribunal qui qualifie et décide.** M. Marchand demande l'ouverture de la procédure. `[review]`

---

## 5. Déclaration de cessation des paiements — projet

> Livrable externe : retirer l'en-tête de confidentialité dans la version déposée au greffe. Conserver la note du relecteur dans le dossier interne. Valider avec un avocat avant tout dépôt.

---

```
À : Monsieur/Madame le Président
    du Tribunal de commerce de Tours
    [adresse exacte du greffe — à compléter]

OBJET : DÉCLARATION DE CESSATION DES PAIEMENTS
        DEMANDE D'OUVERTURE D'UNE PROCÉDURE DE [REDRESSEMENT / LIQUIDATION]
        JUDICIAIRE

Je soussigné, M. Hervé Marchand, gérant de la SARL Atelier Boréal,
immatriculée au Registre du commerce et des sociétés de Tours sous
le numéro 812 345 678, ayant son siège social à [adresse complète —
à compléter], Tours (37),

déclare que la société se trouve en état de cessation des paiements
au sens de l'article L.631-1 du Code de commerce, étant dans
l'impossibilité de faire face à son passif exigible avec son actif
disponible.

───────────────────────────────────────────
SITUATION FINANCIÈRE À LA DATE DE LA DÉCLARATION
───────────────────────────────────────────

Actif disponible :
  Trésorerie disponible :                         12 000 €
  Réserve de crédit (ligne bancaire confirmée) :  50 000 €
  TOTAL ACTIF DISPONIBLE :                        62 000 €
  [à compléter et certifier sur situation de trésorerie datée]

Passif exigible :
  Dettes fournisseurs échues :                    95 000 €
  Échéance emprunt bancaire échue et impayée :    18 000 €
  TOTAL PASSIF EXIGIBLE :                        113 000 €
  [à compléter et certifier sur situation datée]

Insuffisance :                                    ~51 000 €
  [à confirmer par situation de trésorerie datée — expert-comptable]

───────────────────────────────────────────
DATE DE CESSATION DES PAIEMENTS
───────────────────────────────────────────

[à compléter — date exacte à arrêter avec l'expert-comptable
 sur la base des pièces comptables datées] [review]

───────────────────────────────────────────
PROCÉDURE DEMANDÉE
───────────────────────────────────────────

[ ] Redressement judiciaire (art. L.631-4 C.com.)
[ ] Liquidation judiciaire  (art. L.640-4 C.com.)

[Cocher après concertation avec l'avocat]

───────────────────────────────────────────
INFORMATIONS COMPLÉMENTAIRES
───────────────────────────────────────────

Forme sociale :           SARL
SIREN :                   812 345 678
Secteur d'activité :      Menuiserie d'agencement
Nombre de salariés :      9
Chiffre d'affaires
  (dernier exercice) :    [à compléter — €]
Représentants du
  personnel (CSE) :       [nom et adresse — à compléter]

───────────────────────────────────────────
ATTESTATION SUR L'HONNEUR
───────────────────────────────────────────

Je certifie sur l'honneur que la société SARL Atelier Boréal n'a
pas fait l'objet d'une demande de mandat ad hoc ou de l'ouverture
d'une procédure de conciliation au cours des dix-huit mois précédant
la présente déclaration.
[Si inexact : préciser la nature et la date de la procédure amiable.]

Conformément à l'art. R.631-1 du Code de commerce [à vérifier sur
Légifrance], les pièces listées au bordereau ci-annexé sont jointes
à la présente déclaration. Elles sont datées, signées et certifiées
sincères et véritables. Les pièces non disponibles à ce jour seront
produites dans le délai réglementaire [à vérifier — R.631-1] ; leur
absence est motivée au bordereau.

Fait à Tours, le [date].

Signature :
M. Hervé Marchand
Gérant — SARL Atelier Boréal
(dirigeant de droit habilité)
```

---

## 6. Pièces à joindre (R.631-1 C.com.) `[confirmer la liste en vigueur sur Légifrance]`

| # | Pièce | Source | Statut |
|---|---|---|---|
| 1 | Comptes annuels du dernier exercice | client / expert-comptable | `[à compléter]` |
| 2 | Situation de trésorerie datée de moins d'un mois | expert-comptable | `[à compléter]` — **priorité absolue** |
| 3 | **État du passif exigible et de l'actif disponible** établissant la cessation | expert-comptable | `[à compléter]` |
| 4 | État chiffré des créances et dettes avec noms et domiciles des créanciers | client | `[à compléter]` — fournisseurs (dont 2 MED), URSSAF (moratoire), banque |
| 5 | État actif et passif des sûretés + engagements hors bilan | client | `[à compléter]` — **dont caution personnelle M. Marchand (80 k€ sur emprunt équipement)** |
| 6 | Inventaire sommaire des biens (matériel, stocks, outillage) | client | `[à compléter]` |
| 7 | Nombre de salariés (9) + SIREN (812 345 678) + CA dernier exercice | client | Partiel — CA `[à compléter]` |
| 8 | Nom et adresse des représentants du personnel (CSE) | client | `[à compléter]` — vérifier seuil de mise en place CSE `[à vérifier]` |
| 9 | **Attestation sur l'honneur** d'absence de mandat ad hoc / conciliation dans les 18 derniers mois | M. Marchand | À rédiger et signer |
| 10 | Courrier de confirmation ligne bancaire (Banque Régionale de l'Ouest) | client | Disponible — à joindre (justifie l'inclusion dans actif disponible) |
| 11 | Contrat de moratoire URSSAF signé | client | Disponible — à joindre (justifie la sortie du passif exigible immédiat) |
| 12 | Liste des membres tenus solidairement / indéfiniment du passif | client | `[à vérifier — a priori sans objet SARL sauf exception]` `[review]` |
| 13 | Documents ICPE si activité classée | client | `[à vérifier — menuiserie : solvants, poussières de bois → classer ICPE ?]` `[review]` |

**Formalités :** chaque pièce doit être **datée, signée et certifiée sincère et véritable** par le gérant. Toute pièce non disponible au dépôt peut être produite dans un **délai de 7 jours** `[à vérifier — R.631-1 sur Légifrance]` ; toute absence doit être **motivée** dans la déclaration.

---

## Une question hors de ma checklist habituelle

**La caution personnelle de M. Marchand (80 000 €) crée une asymétrie procédurale déterminante entre RJ et LJ.**

En redressement judiciaire, les poursuites contre les cautions personnes physiques dirigeantes sont suspendues pendant la période d'observation (art. L.622-28 C.com. `[connaissance modèle — à vérifier]`) — protection temporaire pour M. Marchand. En liquidation judiciaire, cette protection disparaît : la banque peut actionner la caution sans attendre la clôture. Ce paramètre constitue un argument pour demander d'abord le RJ, indépendamment de la viabilité de l'activité — mais la décision relève d'une appréciation avocat et des données de viabilité. La situation patrimoniale personnelle de M. Marchand devrait être évaluée en parallèle. `[review]`

---

## Que veux-tu faire ? Choisis une option et je la déroule :

1. **Rédiger** — je complète la déclaration et le bordereau R.631-1 dès que tu fournis la situation de trésorerie datée, la liste exhaustive des créanciers, le CA et la décision RJ/LJ.
2. **Escalader** — je rédige une note d'escalade courte vers l'avocat référent : faits-clés, insuffisance provisoire ~51 k€, délai conditionnel possiblement dépassé, exposition personnelle M. Marchand (caution 80 k€ + L.651-2 / L.653-8), décision attendue.
3. **Compléter les faits** — je rédige les questions à soumettre à l'expert-comptable (situation de trésorerie datée, date de CdP à arrêter sur pièces, état exhaustif créances/dettes, trésorerie prévisionnelle) et à M. Marchand (déchéance du terme activée par la banque ? données de viabilité ? chronologie à documenter).
4. **Surveiller et attendre** — j'ajoute le suivi des 45 j au tracker avec note motivée et date de revisite à 48 h dès que la date de CdP est arrêtée.
5. **Autre** — précise.

---

```
Sources consultées : [connaissance modèle — à vérifier]
  Articles cités : L.631-1, L.631-2, L.631-4, L.631-8, L.632-1, L.632-2,
  L.640-1, L.640-4, L.651-2, L.653-8 C.com. ; R.631-1 C.com. ;
  L.611-4, L.622-21, L.622-28 C.com.
Citations vérifiées : Non — PISTE/Légifrance non connecté, mode dégradé
Date d'analyse : 2026-06-19
```
