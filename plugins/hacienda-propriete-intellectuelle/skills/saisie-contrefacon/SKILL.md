---
name: saisie-contrefacon
description: >
  Préparation de requête en saisie-contrefaçon (brevets L.615-5, marques L.716-7,
  dessins et modèles L.521-4, droit d'auteur L.332-1) : projet de requête,
  choix du type de saisie, instructions huissier, délais d'assignation,
  gestion post-saisie. Brouillon soumis à validation par un avocat.
version: "1.0.0"
authors: ["Hacienda"]
tags: [saisie-contrefacon, requete, huissier, preuve, brevets, marques, dessins-modeles, droit-auteur]
---

# Skill — Saisie-contrefaçon

> **BROUILLON DE REQUÊTE ET INSTRUCTIONS, PAS ACTE DE PROCÉDURE.**
>
> Ce skill prépare la **requête en saisie-contrefaçon** et les instructions
> d'exécution. La requête doit être déposée par un avocat inscrit au barreau
> et l'exécution réalisée par un huissier de justice (commissaire de justice).
> Ce skill ne se substitue pas à l'avocat ni à l'huissier.
>
> Les sorties sont des **brouillons**. Validation avocat obligatoire avant dépôt.

## Examples

<example>
<user>Prépare une saisie-contrefaçon de brevet chez notre concurrent qui fabrique le produit litigieux.</user>
<response>Projet de requête en saisie-contrefaçon brevet (L.615-5) : identification du brevet, désignation des locaux (usine, entrepôt), type de saisie (description + réelle + documents comptables), commencement de preuve, nécessité d'un expert technique, instructions huissier, rappel délai 20 jours ouvrables ou 31 jours civils pour assigner (L.615-5 al.3).</response>
</example>

<example>
<user>On a trouvé des contrefaçons de notre marque sur un site e-commerce. Comment procéder à une saisie ?</user>
<response>Projet requête saisie-contrefaçon marque (L.716-7) : saisie sur internet (constat + capture technique par huissier), identification du site et de l'hébergeur, saisie descriptive (captures, prix, CGV, mentions légales), achat-test préalable recommandé comme commencement de preuve, délai 20 jours pour assigner.</response>
</example>

---

## Chargement du profil

> Charger les préférences depuis le profil utilisateur :
> - **Avocat PI référent** (constitution obligatoire)
> - **Huissier/commissaire de justice habituel**
> - **Expert technique habituel** (brevets)
> - **Budget saisie-contrefaçon indicatif**

---

## Intake

1. **Droit PI violé** — brevet (L.615-5) / marque (L.716-7) / D&M (L.521-4) / droit d'auteur (L.332-1) / cumul
2. **Titre** — numéro d'enregistrement, office, date, statut (en vigueur, annuités à jour)
3. **Contrefacteur présumé** — identité, adresse(s) des locaux visés
4. **Actes contrefaisants** — fabrication / stockage / vente / importation / en ligne
5. **Commencement de preuve** — constats antérieurs, achats-test, captures, témoignages
6. **Type de saisie souhaitée** — description / réelle / documents comptables / mixte
7. **Expert technique ?** — nécessaire si technicité élevée (brevets, logiciel)
8. **Urgence** — salon imminent, destruction de preuves crainte, expédition en cours
9. **Tribunal compétent** — TJ Paris (PI exclusive) ou autre juridiction

---

## Étape 1 — Cadre juridique par droit

### Textes fondateurs

| Droit | Article saisie-contrefaçon | Délai d'assignation | Particularités |
|-------|---------------------------|--------------------|--------------------|
| **Brevets** | L.615-5 CPI | 20 jours ouvrables ou 31 jours civils | Expert technique recommandé ; saisie réelle possible |
| **Marques** | L.716-7 CPI | 20 jours ouvrables ou 31 jours civils | Saisie e-commerce fréquente |
| **D&M** | L.521-4 CPI | 20 jours ouvrables ou 31 jours civils | Impression globale — bien décrire le design |
| **Droit d'auteur** | L.332-1 CPI | 20 jours ouvrables ou 31 jours civils | Pas de titre enregistré nécessaire (mais preuve d'originalité) |
| **Logiciel** | L.332-4 CPI | 20 jours ouvrables ou 31 jours civils | Saisie du code source possible (expert informatique) |

### Conditions communes

1. **Titre valide et opposable** (sauf droit d'auteur — preuve d'originalité suffit)
2. **Commencement de preuve** (apparence sérieuse de contrefaçon — pas de preuve complète exigée)
3. **Localisation des objets contrefaisants** (adresse précise des locaux)
4. **Proportionnalité** (ne pas paralyser l'activité du saisi au-delà du nécessaire)

---

## Étape 2 — Types de saisie

| Type | Objet | Résultat | Quand l'utiliser |
|------|-------|----------|-----------------|
| **Saisie descriptive** | Description détaillée des produits/procédés contrefaisants | PV de description | Cas standard — preuve de la contrefaçon |
| **Saisie réelle** | Prélèvement d'échantillons (produits, composants) | Objets saisis + PV | Nécessité d'analyse technique (chimie, méca, électronique) |
| **Saisie de documents** | Comptabilité, factures, bons de commande, correspondance | Documents copiés/saisis | Évaluation du préjudice (volume de ventes) |
| **Saisie mixte** | Combinaison des trois | PV + objets + documents | Recommandé quand possible — maximise les preuves |
| **Saisie internet** | Captures techniques d'un site web (pages, code source, métadonnées) | PV de constat numérique | E-commerce, marketplaces, réseaux sociaux |

### Limites de la saisie

- Pas de saisie dans un domicile privé (sauf autorisation du JLD)
- Respect du secret des affaires du saisi (documents sous scellés si contestation — L.615-5 al.4)
- Pas de saisie des pièces couvertes par le secret professionnel avocat
- Proportionnalité : ne pas bloquer la production si la contrefaçon est marginale

---

## Étape 3 — Projet de requête

```markdown
# Requête en saisie-contrefaçon — [DROIT] — [TITRE N°]

*Brouillon — à finaliser et déposer par l'avocat constitué*

## AU PRÉSIDENT DU TRIBUNAL JUDICIAIRE DE [VILLE]

### I. Requérant
[Identité complète du titulaire du droit, SIREN, siège social, représenté par Me X avocat au barreau de Y]

### II. Titre invoqué
[Nature du droit (brevet / marque / D&M / droit d'auteur), numéro d'enregistrement, date de dépôt, date de publication, revendications ou reproduction, statut en vigueur, annuités à jour]

### III. Faits — Commencement de preuve de contrefaçon
[Description des actes contrefaisants constatés, avec pièces justificatives :
- Pièce 1 : constat d'huissier du [date]
- Pièce 2 : achat-test du [date] (facture + produit)
- Pièce 3 : captures d'écran horodatées
- etc.]

### IV. Nécessité de la saisie
[Motivation : les preuves sont entre les mains du contrefacteur, risque de disparition, nécessité d'accéder aux locaux pour constater les actes de contrefaçon et leur ampleur]

### V. Mesures sollicitées
[Cocher / adapter selon le cas :]
- [ ] Saisie descriptive : autoriser l'huissier à se rendre dans les locaux sis [adresse] pour décrire les produits/procédés contrefaisants
- [ ] Saisie réelle : autoriser le prélèvement de [N] échantillons
- [ ] Saisie de documents : autoriser la copie des documents comptables relatifs à la fabrication/commercialisation des produits argués de contrefaçon
- [ ] Désignation d'un expert technique : [nom, spécialité] pour assister l'huissier
- [ ] Mesures conservatoires : séquestre des produits saisis

### VI. Locaux visés
[Adresses précises — usine, entrepôt, siège social, boutique, data center]

### VII. Fondement juridique
[L.615-5 / L.716-7 / L.521-4 / L.332-1 CPI selon le droit concerné]

### VIII. Pièces jointes
1. Certificat d'enregistrement du titre (ou preuve d'originalité)
2. Constats/preuves antérieurs
3. Extrait K-bis du requérant
4. Justificatifs du paiement des annuités (brevets/D&M)

## PAR CES MOTIFS

Plaise au Président du Tribunal judiciaire de [ville] d'autoriser les mesures de saisie-contrefaçon sollicitées ci-dessus.

[Signature avocat]
```

---

## Étape 4 — Instructions huissier (commissaire de justice)

```markdown
# Instructions d'exécution — Saisie-contrefaçon

*À transmettre à l'huissier désigné après obtention de l'ordonnance*

## Ordonnance
[Référence ordonnance, date, tribunal, juge]

## Locaux à visiter
[Adresses + horaires d'accès recommandés (heures ouvrables)]

## Personnes à requérir
- Huissier instrumentaire : [nom]
- Expert technique (si désigné) : [nom, spécialité]
- Serrurier (si accès forcé autorisé) : [coordonnées]
- Force publique (si autorisée) : commissariat de [quartier]

## Opérations à réaliser
1. Signifier l'ordonnance au saisi (ou à son représentant sur place)
2. Procéder à la description détaillée des [produits/procédés] contrefaisants
3. [Si saisie réelle] Prélever [N] échantillons et les placer sous scellés
4. [Si saisie documents] Copier les documents comptables (factures, bons de commande, registres de ventes) relatifs aux produits litigieux
5. Consigner toute déclaration du saisi
6. Photographier les lieux, les produits, les étiquetages, l'organisation de la production

## Points de vigilance
- NE PAS excéder le périmètre de l'ordonnance
- Si le saisi invoque le secret des affaires : placer les documents contestés sous scellés (tri ultérieur par le juge — L.615-5 al.4)
- Si résistance : ne pas forcer sans autorisation JLD ; constater le refus au PV
- Durée recommandée : [X] heures maximum

## Délai critique
**Assigner dans les 20 JOURS OUVRABLES ou 31 JOURS CIVILS suivant l'exécution.**
À défaut : mainlevée de la saisie et nullité des preuves (L.615-5 al.3 / L.716-7 / L.521-4).

## Remise du PV
- Au requérant (avocat) : sous 48h
- Copie au saisi : dans les mêmes délais (contradictoire)
```

---

## Étape 5 — Gestion post-saisie

### Délais impératifs

| Étape | Délai | Conséquence du non-respect |
|-------|-------|---------------------------|
| Assignation au fond | **20 jours ouvrables ou 31 jours civils** après exécution | Mainlevée + nullité des preuves |
| Référé-rétractation par le saisi | Pas de délai fixe (urgence) | Risque d'annulation de l'ordonnance |
| Contestation secret des affaires | Avant l'audience de tri | Documents sous scellés, accès différé |

### Actions post-saisie

1. **Analyser le PV de saisie** — confirmer la contrefaçon à la lecture du PV
2. **Préparer l'assignation au fond** — dans le délai de 20/31 jours
3. **Évaluer le préjudice** — à partir des documents comptables saisis
4. **Décider sur le référé-interdiction** — si urgence (L.615-3 brevets, L.716-6 marques)
5. **Gérer les scellés** — si contestation secret des affaires, demander audience de tri

### Risques de rétractation (par le saisi)

| Motif | Fréquence | Parade |
|-------|-----------|--------|
| Défaut de commencement de preuve | Élevée | Produire pièces solides dans la requête |
| Disproportion de la mesure | Moyenne | Limiter le périmètre au strict nécessaire |
| Atteinte au secret des affaires | Moyenne | Accepter le tri sous scellés |
| Vice de forme (signification) | Faible | Vérifier la qualité de la signification |
| Titre PI invalide | Rare au stade requête | Vérifier validité en amont |

---

## Étape 6 — Spécificités par droit

### Brevets (L.615-5)

- Expert technique quasi-systématique (compréhension du procédé)
- Saisie réelle fréquente (prélèvement de pièces pour analyse)
- Attention à la théorie des équivalents (L.613-3) : décrire les variantes aussi
- Secret de fabrication du saisi : placer sous scellés pour tri judiciaire

### Marques (L.716-7)

- Saisie e-commerce très fréquente (marketplace, réseaux sociaux)
- Achat-test = meilleur commencement de preuve (produit contrefaisant en main)
- Documenter la confusion (emballage, étiquetage, signes distinctifs)
- Importation : coordination avec douanes (retenue douanière règlement UE 608/2013)

### Dessins et modèles (L.521-4)

- Impression globale : photographier sous tous les angles (cf. reproductions du titre)
- Saisie descriptive primordiale (les visuels sont la preuve centrale)
- DMCNE (non enregistré UE) : preuve de la date de divulgation par le titulaire

### Droit d'auteur (L.332-1)

- Pas de titre enregistré : fournir preuve de paternité + originalité
- Dépôt APP/enveloppe Soleau/horodatage blockchain comme preuve de date
- Saisie de logiciel (L.332-4) : expert informatique obligatoire pour copie code source
- Agent assermenté possible (art. L.331-2 — organismes professionnels)

---

## Gate non-juriste

- [ ] Titre PI valide, en vigueur, annuités à jour (ou preuve originalité pour droit d'auteur)
- [ ] Commencement de preuve solide (constat, achat-test, captures)
- [ ] Type de saisie adapté (descriptive, réelle, documents, mixte)
- [ ] Locaux précisément identifiés
- [ ] Expert technique prévu si nécessaire (brevets, logiciel)
- [ ] Délai d'assignation rappelé en gras (20 jours ouvrables / 31 jours civils)
- [ ] Risques de rétractation anticipés
- [ ] Secret des affaires : procédure de tri sous scellés prévue
- [ ] Coordination douanes mentionnée si importation (règlement UE 608/2013)

---

## Emplacement des sorties

```
outputs/saisie-contrefacon-<affaire-slug>-YYYY-MM-DD.md
```

---

## Ce skill ne fait pas

- Déposer la requête (acte d'avocat au barreau)
- Exécuter la saisie (acte d'huissier/commissaire de justice)
- Rédiger l'assignation au fond (skill futur `assignation-contrefacon`)
- Traiter le référé-interdiction (procédure distincte)
- Gérer la retenue douanière (renvoi vers procédure douanière UE 608/2013)
- Qualifier la contrefaçon elle-même → utiliser `tableau-contrefacon-brevet`, `contrefacon-dessin-modele`, `contrefacon-droit-auteur`, `tri-contrefacon` (marques)
- Évaluer le préjudice en détail (analyse financière post-saisie)

---

## Ton

Procédural, précis, urgent. Insister sur les délais impératifs (20/31 jours) et les conséquences de leur non-respect (mainlevée = perte des preuves). Rappeler systématiquement que la requête est déposée par l'avocat et exécutée par l'huissier. Anticiper les risques de rétractation.
