# Stratégie contentieuse — Contrefaçon droit d'auteur

> Référence interne plugin `hacienda-propriete-intellectuelle`. Brouillon soumis à validation humaine.

---

## 1. Arbre décisionnel — Choix de l'action

```
Atteinte constatée
├── Originalité démontrée ?
│   ├── Non → Évaluer parasitisme / concurrence déloyale (Code civil 1240) — hors CPI
│   └── Oui → Qualité pour agir ?
│       ├── Non (cessionnaire sans clause, licencié non-exclusif) → Pas de qualité directe
│       └── Oui (auteur, cessionnaire, licencié exclusif L.131-3) →
│           ├── Urgence ? (contenu en ligne, diffusion active)
│           │   ├── Oui → Notification hébergeur (LCEN) + Référé cessation
│           │   └── Non → Mise en demeure 15 jours
│           ├── Préjudice significatif et preuve à préserver ?
│           │   ├── Oui → Saisie-contrefaçon (L.332-1) + assignation 20 jours
│           │   └── Non → Action au fond directe
│           └── Relation commerciale à préserver ?
│               ├── Oui → Médiation / transaction
│               └── Non → Action judiciaire
```

---

## 2. Délais critiques

| Action | Délai | Base légale | Conséquence du dépassement |
|--------|-------|-------------|---------------------------|
| Prescription action civile | 5 ans (à compter de la connaissance des faits) | Code civil art. 2224 | Irrecevabilité |
| Prescription action pénale | 6 ans (délit) | CPP art. 8 | Extinction action publique |
| Assignation post-saisie-contrefaçon | 20 jours ouvrables | CPI L.332-3 | Nullité de la saisie |
| Notification hébergeur | Aucun délai imposé, agir vite | LCEN art. 6-I-5 | Perte de preuve si contenu retiré |
| Réponse attendue mise en demeure | 15 jours (usage) | — | Escalade judiciaire |

---

## 3. Qualité pour agir

| Titulaire | Qualité pour agir | Fondement |
|-----------|-------------------|-----------|
| Auteur personne physique | Oui (droits patrimoniaux + moral) | L.111-1 |
| Co-auteurs (œuvre de collaboration) | Chacun pour sa contribution / tous pour l'ensemble | L.113-3 |
| Cessionnaire des droits patrimoniaux | Oui, dans la limite des droits cédés | L.131-3 |
| Licencié exclusif | Oui, sauf clause contraire | Jurisprudence |
| Licencié non-exclusif | Non (sauf si le contrat le prévoit expressément) | Jurisprudence |
| Héritiers (droits patrimoniaux) | Oui, pendant la durée de protection | L.123-1 |
| Héritiers (droit moral) | Oui, perpétuellement | L.121-1 al.4 |
| Société de gestion collective (SACEM, etc.) | Oui, par mandat | Statuts OGC |
| Employeur (œuvre de salarié hors logiciel) | Non automatiquement — nécessite cession écrite | L.111-1 al.3 |
| Employeur (logiciel de salarié) | Oui automatiquement | L.113-9 |

---

## 4. Fondements complémentaires (cumulables avec la contrefaçon)

| Fondement | Conditions | Avantage |
|-----------|-----------|----------|
| Concurrence déloyale (C. civ. 1240) | Faute, préjudice, lien causal — pas besoin de protégeabilité | Contourne l'exigence d'originalité |
| Parasitisme (C. civ. 1240) | S'approprier indûment la valeur économique d'autrui | Pas besoin de concurrence directe |
| Atteinte au droit sui generis BDD (L.342-1) | Extraction/réutilisation substantielle | Cumul avec contrefaçon structure |
| Violation contractuelle | Clause anti-copie, NDA, licence | Fondement contractuel + délictuel |

---

## 5. Saisie-contrefaçon — Mode opératoire

### Étape 1 : Requête au président du TJ

- Rédiger requête (ex parte — sans adversaire)
- Joindre preuves d'originalité + preuves d'atteinte
- Préciser les lieux, les supports, les documents à saisir
- Demander si nécessaire : copie du disque dur, capture serveur, inventaire des stocks

### Étape 2 : Ordonnance et exécution

- Le président rend une ordonnance autorisant la saisie
- L'huissier se rend sur les lieux et procède
- L'huissier peut être assisté d'un expert technique (informatique)
- Le contrefacteur ne peut pas s'opposer à la saisie (exécution sur ordonnance)

### Étape 3 : Assignation obligatoire

- **Délai impératif : 20 jours ouvrables** à compter de l'exécution de la saisie
- Si non respecté : mainlevée de plein droit de la saisie, perte des preuves saisies
- L'assignation doit être rédigée AVANT la saisie pour respecter le délai

### Coûts indicatifs

| Poste | Estimation 2026 |
|-------|----------------|
| Requête + ordonnance | 3 000 - 8 000 € (avocat) |
| Frais d'huissier | 1 000 - 5 000 € (selon déplacement et complexité) |
| Expert technique (si informatique) | 2 000 - 10 000 € |
| Total saisie-contrefaçon | 6 000 - 23 000 € |

---

## 6. Référé cessation — Procédure d'urgence

### Conditions (CPC art. 834 / 835)

- Trouble manifestement illicite OU dommage imminent
- Pas de contestation sérieuse (référé art. 834)
- OU urgence + mesures provisoires (art. 835)

### Mesures obtenues en référé

- Interdiction de poursuivre la diffusion/reproduction sous astreinte
- Retrait du contenu en ligne
- Blocage d'accès (si hébergeur non coopératif)
- Provision sur dommages-intérêts

### Délai : audience dans les semaines suivant la saisine

---

## 7. Évaluation du préjudice — Méthodes détaillées

### Méthode 1 : Conséquences économiques négatives (L.331-1-3 al.1)

```
Préjudice total = Manque à gagner + Bénéfices contrefacteur + Préjudice moral

Manque à gagner :
  = Redevance habituelle × Nombre d'exploitations illicites
  OU = CA perdu démontrable (baisse ventes constatée)

Bénéfices contrefacteur :
  = CA contrefacteur attribuable × Marge
  (le contrefacteur doit communiquer ses comptes — astreinte possible)

Préjudice moral :
  = Appréciation souveraine du juge (1 000 - 50 000 € en général)
  Facteurs : notoriété auteur, gravité atteinte, mauvaise foi, récidive
```

### Méthode 2 : Somme forfaitaire (L.331-1-3 al.3)

```
Indemnité forfaitaire ≥ Redevance due si autorisation avait été demandée

Souvent appliquée quand le manque à gagner est difficile à chiffrer.
Barèmes de référence :
  - Photo : barème UPP × coefficient contrefaçon (×2 à ×5)
  - Texte : tarif auteur (€/feuillet) × coefficient
  - Musique : barème SACEM applicable × coefficient
  - Logiciel : prix licence × nombre d'installations illicites
```

### Méthode 3 : Totalité des bénéfices (L.331-1-3 al.2)

```
Utilisée quand le contrefacteur a tiré profit de la contrefaçon
et que le titulaire ne peut démontrer un manque à gagner équivalent.

Bénéfices intégraux = CA contrefaisant − Coûts directs
(Le contrefacteur ne peut pas déduire ses frais généraux)
```

### Coefficient de contrefaçon (majoration)

La jurisprudence admet souvent un coefficient multiplicateur :
- ×2 : contrefaçon de bonne foi, première atteinte, retrait rapide
- ×3 : contrefaçon en connaissance de cause, refus de retirer
- ×5 : contrefaçon délibérée, récidive, mauvaise foi caractérisée

---

## 8. Moyens de défense adverses (à anticiper)

| Moyen de défense | Réponse |
|-----------------|---------|
| « L'œuvre n'est pas originale » | Documenter les choix créatifs, prouver l'empreinte personnelle |
| « Les idées sont de libre parcours » | Distinguer l'idée (non protégeable) de la forme originale (protégée) |
| « Courte citation L.122-5 3°a » | Vérifier brièveté, mention source/auteur, justification par contexte |
| « Parodie L.122-5 4° » | Pas de confusion possible, intention humoristique, respect du genre |
| « Création indépendante » | Prouver l'accès à l'œuvre première (diffusion, publication antérieure) |
| « Œuvre dans le domaine public » | Vérifier la durée de protection (70 ans post mortem, L.123-1) |
| « Licence tacite / tolérance » | Distinguer tolérance (passivité) de licence (acte positif volontaire) |
| « Prescription (5 ans) » | Vérifier le point de départ (date de connaissance des faits, pas date des faits) |

---

## 9. Publication judiciaire (mesure complémentaire)

Le tribunal peut ordonner (L.331-1-4) :
- Publication du jugement dans des journaux ou sur des sites web
- Aux frais du contrefacteur
- Effet : réparation du préjudice moral + effet dissuasif

---

## 10. Voie pénale (alternative ou cumul)

### Délit de contrefaçon (L.335-2 à L.335-4)

- 3 ans d'emprisonnement + 300 000 € d'amende (personnes physiques)
- 1 500 000 € d'amende (personnes morales, L.335-8)
- Circonstances aggravantes : bande organisée, internet (L.335-2-1)

### Quand choisir la voie pénale ?

- Contrefaçon à grande échelle (piratage commercial)
- Récidive
- Effet dissuasif recherché
- Impossibilité d'identifier le contrefacteur (la police enquête)
- Constitution de partie civile devant le juge pénal

### Limites de la voie pénale

- Procédure plus longue et moins prévisible
- Le parquet peut classer sans suite
- Moins de contrôle sur le calendrier
- Dommages-intérêts souvent inférieurs au civil

---

*Sources : CPI L.111-1, L.121-1, L.122-1 à L.122-6, L.122-5, L.331-1-3, L.331-1-4, L.332-1 à L.332-4, L.335-2 à L.335-8. LCEN art. 6-I-5. CPC art. 834-835. Code civil art. 1240, 2224. [à vérifier]*
