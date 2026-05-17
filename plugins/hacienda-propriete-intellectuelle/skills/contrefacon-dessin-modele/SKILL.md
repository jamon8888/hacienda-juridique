---
name: contrefacon-dessin-modele
description: >
  Qualification et stratégie contentieuse en contrefaçon de dessins et modèles :
  comparaison impression globale, constitution dossier de preuves, saisie-contrefaçon
  (L.521-4), mise en demeure, référé/fond, évaluation préjudice.
  Conforme CPI L.521-1 à L.521-8. Brouillon soumis à validation par un avocat.
version: "1.0.0"
authors: ["Hacienda"]
tags: [dessins-modeles, contrefacon, impression-globale, saisie-contrefacon, prejudice, contentieux]
---

# Skill — Contrefaçon de dessins et modèles

> **ANALYSE PRÉPARATOIRE, PAS ACTE DE PROCÉDURE.**
>
> Ce skill qualifie une atteinte potentielle à un dessin ou modèle enregistré et prépare
> la stratégie contentieuse. Il ne remplace pas l'intervention d'un avocat pour les actes
> de procédure (assignation, saisie-contrefaçon, conclusions).
>
> Les sorties sont des **brouillons**. Elles ne constituent pas un avis juridique.

## Examples

<example>
<user>Un concurrent vend une chaise identique à notre modèle déposé. Comment agir ?</user>
<response>Qualification contrefaçon D&M : comparaison impression globale sur utilisateur averti (L.521-1 + L.511-4), vérification validité du titre (enregistrement en vigueur, annuités payées), identification actes contrefaisants (fabrication L.521-1, commercialisation, importation), constitution dossier preuves (constat huissier, achat-test, captures web), recommandation saisie-contrefaçon (L.521-4), projet mise en demeure, stratégie (référé interdiction + fond indemnisation).</response>
</example>

<example>
<user>On nous accuse de contrefaire un modèle EUIPO pour notre emballage. Comment se défendre ?</user>
<response>Stratégie de défense : vérification validité du DMC adverse (nouveauté + caractère individuel — action reconventionnelle en nullité art. 85 RDMC), comparaison impression globale (différences significatives ?), moyens de défense (antériorité destructrice, absence de contrefaçon par impression différente, exception de réparation, droit de possession personnelle antérieure art. 22 RDMC), préparation conclusions en défense.</response>
</example>

---

## Chargement du profil

> Charger les préférences depuis le profil utilisateur :
> - **Juridictions et tribunaux compétents** (TJ Paris 3e chambre, EUIPO Chambre de recours)
> - **Posture contentieuse par défaut** (agressif / modéré / défensif)
> - **Budget contentieux indicatif**
> - **Mandataire habituel** (avocat PI)

---

## Intake

1. **Mode** — `--attack` (titulaire agissant en contrefaçon) ou `--defense` (accusé de contrefaçon)
2. **Titre D&M du demandeur** — numéro d'enregistrement, office, date, classe Locarno, statut (en vigueur ?)
3. **Design contrefaisant allégué** — description + visuels + source (produit concurrent, site web, marketplace)
4. **Actes reprochés** — fabrication, importation, commercialisation, offre à la vente, détention, exportation
5. **Territoire** — France (TJ) / UE (DMC — tribunaux des dessins communautaires) / international
6. **Preuves disponibles** — constats, achats-test, captures, catalogues, factures
7. **Urgence** — atteinte en cours (référé) / historique (fond)
8. **Objectif** — cessation + indemnisation / cessation seule / transaction amiable

---

## Étape 1 — Vérification de la validité du titre

Avant toute action, vérifier que le titre D&M est **valide et opposable** :

| Vérification | Détail | Conséquence si défaut |
|-------------|--------|----------------------|
| Enregistrement publié | Publication effective (ou ajournement levé) | Titre inopposable aux tiers |
| Annuités à jour | Renouvellements payés (périodes de 5 ans) | Déchéance du titre |
| Nouveauté maintenue | Pas d'antériorité destructrice découverte | Nullité (L.512-4) — moyen de défense |
| Caractère individuel | Impression globale distincte de l'art antérieur | Nullité (L.512-4) |
| Pas d'exclusion | Design pas purement fonctionnel (L.511-8) | Nullité |
| Titulaire légitime | Chaîne de titularité valide (cession enregistrée si applicable) | Irrecevabilité |

**En mode `--defense` :** cette étape sert à identifier les **failles du titre adverse** pour fonder une action reconventionnelle en nullité (L.512-4 / art. 85(1) RDMC).

---

## Étape 2 — Qualification de la contrefaçon

### Test de l'impression globale (L.521-1 + L.511-4 CPI / art. 10 RDMC)

La contrefaçon D&M s'apprécie par l'**impression globale** produite sur l'**utilisateur averti**, pas par une comparaison point par point.

```markdown
## Tableau comparatif — Impression globale

| Élément visuel | Design protégé | Design argué de contrefaçon | Analyse |
|---------------|---------------|----------------------------|---------|
| Forme générale | [description] | [description] | Identique / Similaire / Différent |
| Proportions | [description] | [description] | ... |
| Lignes et contours | [description] | [description] | ... |
| Couleurs/matériaux | [description] | [description] | ... |
| Ornementation | [description] | [description] | ... |
| Texture/finition | [description] | [description] | ... |

**Impression globale utilisateur averti :** [même / différente]
**Liberté du créateur dans le secteur :** [contrainte / moyenne / large]
**Conclusion :** [contrefaçon caractérisée / risque moyen / pas de contrefaçon]
```

### Actes constitutifs de contrefaçon (L.521-1 CPI)

| Acte | Description | Preuve type |
|------|-------------|-------------|
| Fabrication | Produire le design contrefaisant | Constat usine, factures sous-traitant |
| Offre à la vente | Proposer à la commercialisation | Captures site web, catalogues, salons |
| Mise sur le marché | Vendre effectivement | Factures, achat-test |
| Importation | Introduire sur le territoire | Documents douaniers, constat en douane |
| Exportation | Expédier hors du territoire | Documents transport |
| Détention | Stocker en vue de la commercialisation | Constat entrepôt |
| Usage | Utiliser le design (même sans commercialisation) | Constats, publications |

---

## Étape 3 — Constitution du dossier de preuves

### Saisie-contrefaçon (L.521-4 CPI)

Procédure **spécifique PI** permettant de faire constater la contrefaçon et saisir des échantillons/documents avant l'assignation.

| Étape | Détail |
|-------|--------|
| Requête | Requête au président du TJ compétent (L.521-4) |
| Ordonnance | Autorisation de saisie (description / réelle / documents comptables) |
| Exécution | Huissier + éventuellement expert technique (24h pour assigner après saisie réelle) |
| Délai d'assignation | **20 jours ouvrables** ou 31 jours civils (L.521-4 al. 5) — sinon mainlevée |
| EUIPO / DMC | Règlement (CE) 6/2002 art. 88 — renvoi au droit national de l'État membre |

### Autres modes de preuve

- [ ] Constat d'huissier (internet, point de vente, salon)
- [ ] Achat-test (produit + facture + ticket)
- [ ] Captures d'écran horodatées (site web, marketplace, réseaux sociaux)
- [ ] Catalogues, brochures, publicités du contrefacteur
- [ ] Documents comptables (si saisie-contrefaçon autorisée)
- [ ] Attestations de tiers (distributeurs, clients)
- [ ] Rapports d'enquête douanière (retenue en douane — règlement UE 608/2013)

---

## Étape 4 — Stratégie contentieuse

### Arbre décisionnel

```
Urgence ? (atteinte en cours, salon imminent, lancement produit)
├── OUI → Référé-interdiction (L.521-6) ou mesures provisoires (art. 90 RDMC)
│   ├── Cessation immédiate sous astreinte
│   ├── Rappel des circuits commerciaux
│   └── Puis assignation au fond pour indemnisation
├── NON → Assignation au fond directe (TJ Paris 3e ch. / tribunal D&M communautaire)
│   ├── Cessation + interdiction
│   ├── Indemnisation du préjudice
│   ├── Publication judiciaire
│   └── Destruction des produits contrefaisants
└── AMIABLE PRÉFÉRÉ → Mise en demeure → Transaction / Licence forcée
```

### Tribunaux compétents

| Titre | Juridiction | Fondement |
|-------|-------------|-----------|
| D&M français (INPI) | TJ Paris (compétence exclusive PI — R.211-7 COJ) | L.521-3-1 CPI |
| DMC enregistré (EUIPO) | Tribunaux des dessins communautaires (TJ Paris en France) | Art. 80-81 RDMC |
| DMCNE (non enregistré UE) | Tribunal du défendeur ou du lieu de contrefaçon | Art. 82 RDMC |
| D&M international (La Haye) | Selon désignation nationale — mêmes règles que titre national | Convention La Haye |

### Prescription

- **France** : 5 ans à compter des faits (L.521-3 CPI, renvoi art. 2224 CC)
- **UE (DMC)** : selon droit national applicable (5 ans en France)

---

## Étape 5 — Évaluation du préjudice

### Trois méthodes (L.521-7 CPI — transposition directive 2004/48/CE)

| Méthode | Calcul | Quand l'utiliser |
|---------|--------|-----------------|
| **Conséquences économiques négatives** | Manque à gagner + perte subie + préjudice moral | Méthode principale — preuve des ventes perdues |
| **Bénéfices du contrefacteur** | CA contrefaçon × marge nette | Si ventes perdues difficiles à prouver |
| **Redevance hypothétique** | Licence qu'aurait dû payer le contrefacteur | Forfaitaire — plancher minimum |

### Postes de préjudice

- Manque à gagner (ventes détournées)
- Perte de marge sur ventes conservées (érosion des prix)
- Préjudice moral / atteinte à l'image de marque
- Frais engagés pour faire cesser la contrefaçon
- Banalisation du design (perte de distinctivité)

---

## Étape 6 — Mise en demeure (projet)

```markdown
# Projet de mise en demeure — Contrefaçon D&M

*Brouillon — à adapter et signer par l'avocat du titulaire*

## Expéditeur
[Titulaire du D&M / son conseil]

## Destinataire
[Contrefacteur présumé — dénomination + adresse]

## Objet
Mise en demeure — Atteinte au dessin/modèle n° [numéro] enregistré le [date]

## Corps
1. Rappel du titre (numéro, date, office, classe Locarno, reproductions en annexe)
2. Description des actes contrefaisants constatés
3. Fondement juridique (L.521-1, L.521-7 CPI ou art. 19, 89 RDMC)
4. Demandes : cessation immédiate + retrait du marché + indemnisation réservée
5. Délai de réponse : [15 jours]
6. À défaut : saisie-contrefaçon + assignation

## Annexes
- Copie certificat d'enregistrement
- Reproductions du D&M protégé
- Preuves de la contrefaçon (constats, captures)
```

---

## Étape 7 — Moyens de défense (mode `--defense`)

| Moyen | Fondement | Effet |
|-------|-----------|-------|
| Nullité du titre (reconventionnelle) | L.512-4 CPI / art. 85(1) RDMC | Anéantit le titre — pas de contrefaçon |
| Absence d'impression globale identique | L.521-1 + L.511-4 | Pas de contrefaçon |
| Antériorité destructrice de nouveauté | L.511-2 | Nullité du titre adverse |
| Exclusion fonctionnelle | L.511-8 | Design non protégeable |
| Droit de possession personnelle antérieure | Art. 22 RDMC (UE) / L.513-6 CPI (FR) | Exonération |
| Épuisement des droits | L.513-8 / art. 21 RDMC | Produit mis sur le marché UE par le titulaire |
| Prescription | L.521-3 (5 ans) | Irrecevabilité si faits > 5 ans |
| Exception de réparation (clause de réparation) | Art. 110 RDMC (pièces détachées auto) | Non-contrefaçon pour pièces visibles réparation |

---

## Format de sortie

```markdown
# Dossier contrefaçon D&M — [NOM AFFAIRE]

*Brouillon soumis à validation avocat. Ne constitue pas un acte de procédure.*

## 1. Titre D&M invoqué
[Numéro, office, date, classe Locarno, statut, validité]

## 2. Design argué de contrefaçon
[Description + source + visuels]

## 3. Comparaison impression globale
[Tableau comparatif — cf. Étape 2]

## 4. Qualification
[Contrefaçon caractérisée / risque moyen / absence de contrefaçon]
[Actes constitutifs identifiés]

## 5. Dossier de preuves
[Preuves réunies + preuves manquantes + saisie-contrefaçon recommandée ?]

## 6. Stratégie contentieuse
[Référé / Fond / Amiable — tribunal compétent — délais]

## 7. Évaluation préjudice (estimation)
[Méthode retenue + postes + fourchette]

## 8. Projet mise en demeure
[Si phase amiable — cf. Étape 6]

## 9. Moyens de défense (si mode --defense)
[Analyse point par point — cf. Étape 7]
```

---

## Gate non-juriste

- [ ] Validité du titre vérifiée (enregistrement, annuités, pas de nullité évidente)
- [ ] Impression globale analysée sur l'utilisateur averti (pas comparaison point par point)
- [ ] Liberté du créateur dans le secteur prise en compte
- [ ] Actes contrefaisants précisément identifiés (L.521-1)
- [ ] Preuves inventoriées et lacunes signalées
- [ ] Délai saisie-contrefaçon rappelé (20 jours ouvrables pour assigner)
- [ ] Prescription vérifiée (< 5 ans)
- [ ] En défense : moyens de nullité reconventionnelle explorés

---

## Emplacement des sorties

```
outputs/contrefacon-dm-<affaire-slug>-YYYY-MM-DD.md
```

---

## Ce skill ne fait pas

- Rédiger les actes de procédure (assignation, conclusions, requête saisie-contrefaçon)
- Effectuer la saisie-contrefaçon (acte d'huissier sous autorisation judiciaire)
- Représenter en justice (monopole de l'avocat)
- Rechercher les antériorités → utiliser `recherche-anteriorite-dm`
- Préparer un dépôt → utiliser `depot-dessin-modele`
- Traiter la contrefaçon de marques → utiliser `tri-contrefacon`
- Traiter la contrefaçon de droit d'auteur → utiliser `contrefacon-droit-auteur`
- Gérer les procédures douanières (retenue, destruction simplifiée)

---

## Ton

Technique, stratégique, prudent. Distinguer clairement l'attaque (titulaire) de la défense (accusé). Toujours rappeler que les actes de procédure et la représentation en justice sont réservés aux avocats. Signaler les délais impératifs (20 jours saisie-contrefaçon, prescription 5 ans).
