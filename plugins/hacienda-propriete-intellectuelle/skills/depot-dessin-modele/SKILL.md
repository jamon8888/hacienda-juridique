---
name: depot-dessin-modele
description: >
  Préparation de dépôt de dessin ou modèle : dossier complet pour enregistrement
  auprès de l'INPI (D&M français), EUIPO (DMC communautaire), ou OMPI (système de La Haye).
  Vérifie conditions L.511-1 à L.511-4, prépare reproductions, libellé Locarno, revendication
  de priorité. Brouillon soumis à validation par un avocat ou mandataire.
version: "1.0.0"
authors: ["Hacienda"]
tags: [dessins-modeles, depot, INPI, EUIPO, La-Haye, Locarno, reproductions]
---

# Skill — Préparation de dépôt dessin ou modèle

> **BROUILLON DE DOSSIER, PAS DÉPÔT EFFECTIF.**
>
> Ce skill prépare un **dossier de dépôt** de dessin ou modèle (reproductions, classification, formulaire). Il ne procède pas au dépôt lui-même (acte réservé au déposant ou à son mandataire). Les reproductions graphiques doivent être préparées par un professionnel (photographe, designer 3D) conformément aux exigences techniques de chaque office.
>
> Les sorties sont des **brouillons**. Elles ne garantissent pas l'enregistrement.

## Examples

<example>
<user>Prépare le dépôt de ma lampe design auprès de l'INPI. J'ai les photos sous 7 vues. Classe Locarno 26-05.</user>
<response>Dossier dépôt D&M INPI : vérification conditions (nouveauté + caractère individuel), classification Locarno 26-05 (luminaires), checklist reproductions 7 vues (face, dos, côtés, dessus, dessous, perspective), formulaire INPI pré-rempli, calcul taxes, recommandations (ajournement publication, priorité unioniste si extension UE prévue).</response>
</example>

<example>
<user>On veut protéger notre packaging en UE. Dépôt DMC auprès de l'EUIPO pour 3 variantes de notre flacon.</user>
<response>Dossier dépôt DMC multiple (3 dessins, même classe Locarno 09-01) : reproductions conformes aux Guidelines EUIPO, indication de produit, demande groupée (réduction taxes), option ajournement 30 mois, revendication priorité Paris si dépôt FR antérieur < 6 mois.</response>
</example>

---

## Chargement du profil

> Charger les préférences depuis le profil utilisateur :
> - **Juridictions et offices préférés** (INPI, EUIPO, OMPI La Haye)
> - **Secteurs des clients dominants** (mode, packaging, mobilier, automobile, électronique…)
> - **Mandataire habituel** (CPI, avocat)
> - **Stratégie d'ajournement par défaut**

---

## Intake

1. **Design à déposer** — description textuelle + visuels (photos, rendus 3D, croquis)
2. **Classification Locarno** — classe et sous-classe (vérifier via classification officielle OMPI)
3. **Territoire(s) visé(s)** — France (INPI) / UE (EUIPO DMC) / International (La Haye)
4. **Déposant** — personne physique ou morale, adresse, nationalité
5. **Créateur** — identité (obligatoire FR L.511-2, facultatif EUIPO)
6. **Reproductions disponibles** — nombre de vues, format (JPEG/PNG/TIFF), résolution
7. **Nombre de dessins** — dépôt simple ou multiple (même classe Locarno obligatoire pour multiple FR)
8. **Priorité unioniste ?** — dépôt antérieur < 6 mois dans un pays de l'Union de Paris (art. 4 CUP)
9. **Ajournement de publication ?** — FR : 3 ans max (L.512-10) / UE : 30 mois max (art. 50 RDMC)
10. **Recherche antériorité effectuée ?** — si non, recommander `recherche-anteriorite-dm` d'abord

---

## Étape 1 — Vérification des conditions de fond

### Conditions cumulatives (L.511-1 à L.511-4 CPI / art. 3-9 RDMC)

| Condition | Vérification | Référence |
|-----------|-------------|-----------|
| Apparence d'un produit | Le design porte sur les caractéristiques visuelles (lignes, contours, couleurs, forme, texture, matériaux, ornementation) | L.511-1 / art. 3 RDMC |
| Nouveauté | Aucun D&M identique divulgué antérieurement (différences non insignifiantes) | L.511-2 / art. 5 RDMC |
| Caractère individuel | Impression globale différente sur l'utilisateur averti | L.511-4 / art. 6 RDMC |
| Pas d'exclusion | Pas dicté uniquement par la fonction technique (L.511-8) ni contraire à l'ordre public (L.512-2) | L.511-8, L.512-2 |

### Exclusions (L.511-8 CPI / art. 8 RDMC)

- Caractéristiques dictées **uniquement** par la fonction technique
- Caractéristiques d'interconnexion (pièces de rechange "must-fit") — sauf clause de réparation UE
- Atteinte à l'ordre public ou aux bonnes mœurs
- Utilisation abusive d'emblèmes protégés (drapeaux, signes d'État)

---

## Étape 2 — Exigences par office

### INPI — Dessin ou modèle français

| Élément | Exigence |
|---------|----------|
| Formulaire | Demande en ligne via e-procédures INPI |
| Reproductions | 1 à 10 reproductions par dessin, format JPEG ≤ 20 Mo, fond neutre, pas de mise en scène |
| Indication de produit | Obligatoire, en français |
| Classification Locarno | Obligatoire (classe + sous-classe) |
| Dépôt multiple | Jusqu'à 100 dessins, **même classe Locarno** obligatoire (R.512-3) |
| Créateur | Désignation obligatoire (L.511-2 al.3) |
| Ajournement | Publication différée jusqu'à 3 ans (L.512-10), levée avant expiration sinon déchéance |
| Taxes (2025) | 39 € (1er dessin) + 23 € par dessin supplémentaire + 52 € publication (si non ajournée) |
| Durée | 5 ans renouvelables jusqu'à 25 ans maximum (L.513-1) |

### EUIPO — Dessin ou modèle communautaire (DMC)

| Élément | Exigence |
|---------|----------|
| Formulaire | Demande en ligne via EUIPO eFilings |
| Reproductions | 1 à 7 vues par dessin, JPEG/PNG/TIFF ≤ 2 Mo par fichier, fond neutre uni |
| Indication de produit | Obligatoire, en langue officielle UE |
| Classification Locarno | Obligatoire |
| Dépôt multiple | Jusqu'à 99 dessins, même classe Locarno |
| Créateur | Facultatif |
| Ajournement | Publication différée jusqu'à 30 mois (art. 50 RDMC) |
| Taxes (2025) | 350 € (1er dessin, avec publication) / 175 € ajournement ; 2e-10e : 175 € ; 11e+ : 80 € |
| Durée | 5 ans renouvelables jusqu'à 25 ans maximum (art. 12 RDMC) |

### OMPI — Système de La Haye (enregistrement international)

| Élément | Exigence |
|---------|----------|
| Formulaire | DM/1 via Hague eFilings (WIPO) |
| Reproductions | Conformes au règlement d'exécution commun (max 7 vues par dessin) |
| Désignations | Choix des parties contractantes (pays/régions), désignation UE possible |
| Classification Locarno | Obligatoire |
| Dépôt multiple | Jusqu'à 100 dessins, même classe Locarno |
| Taxes | Taxe de base 397 CHF + taxe de publication + désignation individuelle variable par pays |
| Durée | 5 ans initial, renouvelable selon législation de chaque désignation (max 15 ou 25 ans) |
| Priorité | Revendication priorité Union de Paris (6 mois) |

---

## Étape 3 — Checklist reproductions

Les reproductions sont l'élément **le plus critique** du dépôt : elles définissent l'étendue de la protection.

### Règles communes

- [ ] Fond neutre et uniforme (blanc ou gris clair recommandé)
- [ ] Pas d'objet tiers, pas de mise en scène, pas de main tenant le produit
- [ ] Produit seul, bien cadré, occupant au moins 80% du cadre
- [ ] Éclairage uniforme sans ombres marquées
- [ ] Résolution suffisante (300 dpi minimum pour impression)
- [ ] Traits en pointillés pour les parties non revendiquées (disclaimers visuels)
- [ ] Vues cohérentes entre elles (même produit, même échelle relative)

### Vues recommandées

| Vue | Description | Obligatoire ? |
|-----|-------------|---------------|
| Face | Vue frontale | Recommandée |
| Dos | Vue arrière | Si différente de la face |
| Côté gauche | Profil gauche | Recommandée |
| Côté droit | Profil droit | Si asymétrique |
| Dessus | Vue plongeante | Si caractéristique |
| Dessous | Vue en contre-plongée | Si visible en usage normal |
| Perspective | Vue 3/4 donnant le volume | Fortement recommandée |

---

## Étape 4 — Stratégie de dépôt

### Arbre décisionnel territoire

```
Protection souhaitée ?
├── France uniquement → Dépôt INPI direct
├── UE entière → DMC EUIPO (protection 27 États)
├── France + extension UE prévue < 6 mois → INPI + priorité → EUIPO
├── Multiple pays hors UE → Système de La Haye (OMPI)
└── France + UE + hors UE → INPI (priorité) → La Haye désignant UE + pays tiers
```

### Ajournement de publication

| Situation | Recommandation |
|-----------|---------------|
| Produit pas encore commercialisé | ✅ Ajourner (garder le design secret) |
| Lancement imminent (< 3 mois) | ⚠️ Ajourner si secret commercial important |
| Produit déjà sur le marché | ❌ Pas d'intérêt (déjà divulgué) |
| Recherche d'investisseurs/licenciés | ✅ Ajourner (lever sous NDA seulement) |

### Priorité unioniste (Convention de Paris, art. 4)

- Délai : **6 mois** à compter du premier dépôt
- Effet : la date de priorité est celle du premier dépôt (antériorités entre les deux dates inopposables)
- Obligatoire de la revendiquer dans la demande (pas de rajout a posteriori)

---

## Étape 5 — Format de sortie

```markdown
# Dossier dépôt D&M — [NOM DESIGN]

*Brouillon soumis à validation. Ne constitue pas le dépôt effectif.*

## 1. Déposant et créateur
[Identité déposant + créateur + qualité + adresse]

## 2. Design
[Description textuelle + classification Locarno + indication de produit]

## 3. Territoire et stratégie
[Office(s) visé(s) + arbre décisionnel + priorité + ajournement]

## 4. Reproductions
[Liste des vues préparées + conformité checklist + disclaimers visuels]

## 5. Dépôt multiple (si applicable)
[Nombre de dessins + cohérence classe Locarno]

## 6. Calcul des taxes
[Détail taxes par office + total]

## 7. Délais et prochaines étapes
[Calendrier : dépôt → publication (ou ajournement) → enregistrement → renouvellements]

## 8. Recommandations
[Ajournement ? Priorité ? Extension ? Recherche antériorité préalable ?]
```

---

## Gate non-juriste

- [ ] Conditions de fond vérifiées (nouveauté + caractère individuel + pas d'exclusion)
- [ ] Classification Locarno correcte et cohérente avec le produit
- [ ] Reproductions conformes aux exigences de l'office visé
- [ ] Priorité unioniste vérifiée si dépôt antérieur < 6 mois
- [ ] Taxes calculées et à jour (vérifier barèmes annuels)
- [ ] Ajournement recommandé si produit non encore divulgué
- [ ] Recherche antériorité préalable recommandée si non effectuée
- [ ] Disclaimers visuels pour parties non revendiquées

---

## Emplacement des sorties

```
outputs/depot-dm-<design-slug>-YYYY-MM-DD.md
```

---

## Ce skill ne fait pas

- Déposer effectivement le design (acte réservé au déposant/mandataire)
- Préparer les reproductions graphiques (travail de photographe/designer)
- Rechercher les antériorités → utiliser `recherche-anteriorite-dm`
- Traiter la contrefaçon D&M → utiliser `contrefacon-dessin-modele`
- Gérer le portefeuille D&M existant → utiliser `portefeuille-dessins-modeles` (futur)
- Rédiger les réponses aux notifications d'examen (EUIPO/OMPI)
- Couvrir les dessins et modèles non enregistrés (DMCNE — protection automatique 3 ans UE)

---

## Ton

Technique, méthodique. Insister sur la qualité des reproductions (élément le plus critique). Toujours rappeler que le dossier est un brouillon et que le dépôt effectif relève du déposant ou de son mandataire agréé.
