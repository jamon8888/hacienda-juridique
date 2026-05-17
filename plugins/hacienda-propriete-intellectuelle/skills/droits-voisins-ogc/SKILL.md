---
name: droits-voisins-ogc
description: >
  Droits voisins du droit d'auteur (artistes-interprètes, producteurs de phonogrammes
  et vidéogrammes, entreprises de communication audiovisuelle), organismes de gestion
  collective (SACEM, SCAM, SACD, ADAGP, SDRM, SPRE), IA générative et œuvres,
  NFT et tokenisation. Conforme CPI L.211-1 à L.217-3, directive UE 2019/790.
  Brouillon soumis à validation par un avocat.
version: "1.0.0"
authors: ["Hacienda"]
tags: [droits-voisins, OGC, SACEM, artistes-interpretes, producteurs, IA-generative, NFT, directive-2019-790]
---

# Skill — Droits voisins, OGC et IA générative

> **ANALYSE PRÉPARATOIRE, PAS AVIS JURIDIQUE.**
>
> Ce skill couvre le régime des droits voisins (distinct du droit d'auteur),
> les rapports avec les organismes de gestion collective (OGC), et les enjeux
> PI émergents liés à l'IA générative et aux NFT. Le droit applicable est
> en évolution rapide (directive UE 2019/790, AI Act UE 2024/1689).
>
> Les sorties sont des **brouillons**. Validation par un avocat spécialisé obligatoire.

## Examples

<example>
<user>Un artiste-interprète veut savoir quels droits il a sur un enregistrement. Analyse ses droits voisins.</user>
<response>Analyse droits voisins artiste-interprète (L.212-1+) : droit d'autoriser la fixation, reproduction, communication au public de sa prestation. Durée 50/70 ans. Rémunération équitable (L.214-1) pour diffusion radio/lieux publics. Droit moral de l'interprète (L.212-2) — respect du nom et de l'interprétation. Relations avec le producteur de phonogrammes (contrat, cession des droits patrimoniaux). Adhésion ADAMI/SPEDIDAM pour gestion collective.</response>
</example>

<example>
<user>Notre client utilise un modèle d'IA générative pour créer des visuels. Quels sont les risques PI ?</user>
<response>Analyse IA générative et PI : (1) Protégeabilité des outputs — pas d'originalité si pas d'empreinte personnelle humaine (position USCO + tendance FR), (2) Risque contrefaçon sur les données d'entraînement (art. 4 directive 2019/790 — exception TDM, opt-out art. 4(3)), (3) Obligation transparence AI Act (art. 50(2) — contenu généré par IA doit être marqué), (4) Recommandations : documenter l'intervention humaine créative, vérifier les conditions d'utilisation du modèle, clause PI dans contrats avec clients.</response>
</example>

---

## Chargement du profil

> Charger les préférences depuis le profil utilisateur :
> - **Secteur** (musique, audiovisuel, arts visuels, édition, numérique)
> - **OGC d'adhésion** (SACEM, SCAM, SACD, ADAGP, ADAMI, SPEDIDAM, etc.)
> - **Position sur IA générative** (utilisation encadrée / interdiction / case by case)

---

## Intake

1. **Sujet** — droits voisins / OGC / IA générative / NFT / combinaison
2. **Titulaire concerné** — artiste-interprète / producteur phonogrammes / producteur vidéogrammes / entreprise de communication audiovisuelle / éditeur de presse
3. **Contexte** — exploitation d'une prestation / adhésion OGC / utilisation IA pour création / tokenisation NFT
4. **Œuvre ou prestation** — description, support, date de fixation
5. **Territoire** — France / UE / international

---

## Étape 1 — Droits voisins (L.211-1 à L.217-3 CPI)

### Titulaires de droits voisins

| Titulaire | Fondement | Droits patrimoniaux | Durée |
|-----------|-----------|-------------------|-------|
| **Artistes-interprètes** | L.212-1 à L.212-11 | Fixation, reproduction, communication au public de la prestation | 50 ans (70 ans si phonogramme publié — directive 2011/77/UE) |
| **Producteurs de phonogrammes** | L.213-1 à L.213-2 | Reproduction, mise à disposition, communication au public du phonogramme | 50 ans (70 ans si publié — directive 2011/77/UE) |
| **Producteurs de vidéogrammes** | L.215-1 | Reproduction, mise à disposition de la première fixation | 50 ans |
| **Entreprises de communication audiovisuelle** | L.216-1 | Reproduction, mise à disposition de leurs programmes | 50 ans |
| **Éditeurs de presse** (droit voisin UE) | Directive 2019/790 art. 15 / L.218-1+ CPI | Reproduction et communication en ligne de leurs publications | 2 ans |

### Droit moral de l'artiste-interprète (L.212-2)

| Attribut | Contenu | Différence avec droit moral auteur |
|----------|---------|-----------------------------------|
| Respect du nom | Mention sur les supports et communications | Identique à L.121-1 |
| Respect de l'interprétation | Pas de modification dénaturante | Plus limité que le droit à l'intégrité auteur |
| Durée | Vie de l'artiste (pas perpétuel post-mortem comme L.121-1) | Différence majeure avec le droit d'auteur |
| Inaliénable | Oui | Identique |

### Rémunération équitable (L.214-1)

Quand un phonogramme publié à des fins de commerce est diffusé :
- **Radio/TV** : rémunération équitable partagée 50/50 artiste-interprète / producteur
- **Lieux publics** (bars, restaurants, magasins) : idem via la **SPRE** (Société pour la perception de la rémunération équitable)
- Collectée par la SPRE, répartie via ADAMI/SPEDIDAM (artistes) et SCPP/SPPF (producteurs)

### Contrat artiste-interprète / producteur

| Clause critique | Point d'attention |
|----------------|-------------------|
| Cession des droits patrimoniaux | Soumise à L.212-3 (consentement écrit pour chaque mode d'exploitation) |
| Rémunération | Distincte du cachet d'enregistrement ; proportionnelle si possible |
| Exclusivité | Fréquente dans l'industrie musicale (contrat d'artiste exclusif) |
| Durée | Souvent liée à la durée des droits voisins (50/70 ans) |
| Exploitation numérique | Streaming, téléchargement, sync — chaque mode doit être visé |
| Réédition / compilation | Autorisation distincte si non visée au contrat initial |

---

## Étape 2 — Organismes de gestion collective (OGC)

### Principaux OGC français

| OGC | Répertoire | Titulaires | Site |
|-----|-----------|-----------|------|
| **SACEM** | Musique (auteurs, compositeurs, éditeurs) | Auteurs + compositeurs | sacem.fr |
| **SACD** | Théâtre, audiovisuel, spectacle vivant | Auteurs dramatiques | sacd.fr |
| **SCAM** | Documentaire, multimédia, journalisme, radio | Auteurs multimédia | scam.fr |
| **ADAGP** | Arts visuels (peinture, sculpture, photo, design, architecture) | Artistes visuels | adagp.fr |
| **ADAMI** | Artistes-interprètes principaux (musique, audiovisuel) | Interprètes | adami.fr |
| **SPEDIDAM** | Artistes-interprètes non principaux (musiciens d'accompagnement) | Interprètes | spedidam.fr |
| **SCPP** | Producteurs de phonogrammes (majors) | Producteurs | scpp.fr |
| **SPPF** | Producteurs indépendants de phonogrammes | Producteurs | sppf.fr |
| **SPRE** | Perception rémunération équitable (L.214-1) | ADAMI+SPEDIDAM + SCPP+SPPF | spre.fr |
| **CFC** | Centre français d'exploitation du droit de copie (reprographie) | Auteurs + éditeurs | cfcopies.com |
| **SOFIA** | Société française des intérêts des auteurs de l'écrit | Auteurs + éditeurs livres | la-sofia.org |

### Adhésion à un OGC — points clés

| Aspect | Détail |
|--------|--------|
| Effet | Apport du répertoire à l'OGC (mandat exclusif de gestion) |
| Portée | L'OGC gère les droits pour TOUTES les œuvres/prestations — pas d'opt-out sélectif (sauf exceptions récentes directive 2014/26/UE) |
| Rémunération | Répartition selon règles internes de l'OGC (clé de répartition) |
| Contrôle | Commission de contrôle des OGC (art. L.321-13 CPI) |
| Résiliation | Possible avec préavis (6 mois à 1 an selon OGC) — récupération des droits |
| Multi-OGC | Possible si répertoires distincts (ex. SACEM pour musique + ADAGP pour arts visuels) |
| Transparence | Directive 2014/26/UE — obligations de transparence, de gouvernance et de reporting |

---

## Étape 3 — IA générative et propriété intellectuelle

### Protégeabilité des outputs IA

| Question | Analyse France/UE | Tendance |
|----------|------------------|----------|
| L'output IA est-il une « œuvre » ? | Exige originalité = empreinte de la personnalité (L.111-1, *Infopaq* CJUE) | Pas de protection si 100% généré par IA sans intervention humaine créative |
| Qui est l'auteur ? | Personne physique uniquement (L.111-1 al.1) — pas l'IA, pas l'opérateur sauf si intervention créative | Convergence avec position USCO (US) |
| Le prompt constitue-t-il un acte créatif ? | Débattu — un prompt détaillé avec choix esthétiques pourrait fonder la protection | Pas de jurisprudence FR établie [à vérifier] |
| Quid du fine-tuning / LoRA ? | Plus l'intervention humaine est importante et créative, plus la protection est défendable | Approche au cas par cas |

### Risques sur les données d'entraînement

| Risque | Fondement | Analyse |
|--------|-----------|---------|
| Contrefaçon par le training | L.122-3 CPI (reproduction) | Le scraping d'œuvres protégées pour entraîner un modèle = reproduction soumise à autorisation |
| Exception TDM (text and data mining) | Art. 4 directive 2019/790 / L.122-5-3 CPI | Exception pour recherche (art. 3) et usage commercial (art. 4) — SAUF opt-out du titulaire (art. 4(3)) |
| Opt-out art. 4(3) | robots.txt, métadonnées, CGU | Le titulaire peut réserver ses droits de manière « appropriée » (machine-readable) |
| Output reproduisant une œuvre d'entraînement | Contrefaçon classique (L.335-2) | Si l'output est substantiellement similaire à une œuvre protégée = contrefaçon |
| Risque droit moral | L.121-1 (paternité, intégrité) | Génération « dans le style de » = risque atteinte à l'intégrité/paternité si confusion |

### Obligations AI Act (règlement UE 2024/1689)

| Obligation | Article | Qui | Détail |
|-----------|---------|-----|--------|
| Marquage contenu IA | Art. 50(2) | Fournisseur du modèle | Contenu synthétique doit être marqué machine-readable |
| Transparence données entraînement | Art. 53(1)(d) | Fournisseur GPAI | Résumé détaillé des données d'entraînement (template Commission) |
| Respect du droit d'auteur | Art. 53(1)(c) | Fournisseur GPAI | Politique de respect du droit d'auteur UE, y compris opt-out art. 4(3) |
| Risque systémique | Art. 55 | Fournisseur GPAI systémique | Évaluation des risques + mesures d'atténuation |

---

## Étape 4 — NFT et tokenisation d'œuvres

### Nature juridique du NFT

| Aspect | Analyse |
|--------|---------|
| Le NFT n'est PAS l'œuvre | Le NFT est un jeton non fongible sur une blockchain, pointant vers un fichier (souvent sur IPFS) |
| Le NFT ne transfère PAS les droits d'auteur | Sauf clause explicite de cession (L.131-3 — 5 conditions) |
| Le NFT est un bien meuble incorporel | Susceptible de propriété, de vente, de nantissement |
| Smart contract ≠ contrat juridique | Le smart contract code l'exécution technique, pas les obligations juridiques |

### Risques PI liés aux NFT

| Risque | Description | Recommandation |
|--------|-------------|----------------|
| Mint sans autorisation | Tiers tokenise l'œuvre d'autrui | Action en contrefaçon + notification plateforme |
| Confusion titularité | Acheteur croit acquérir les droits d'auteur | CGV/contrat clair : « le NFT confère [licence limitée / droit de revente / affichage privé], pas la titularité des droits d'auteur » |
| Royalties on-chain | Smart contract prévoit redevance sur reventes | Pas de force juridique automatique (dépend de la plateforme et du standard ERC) |
| Droit de suite (L.122-8) | Applicable aux œuvres d'art originales | Le droit de suite est inaliénable et imprescriptible — il s'applique même si l'artiste n'a pas minté le NFT |
| Preuve de création | Blockchain comme preuve d'antériorité | Valeur probatoire limitée (horodatage du mint, pas de la création) |

---

## Étape 5 — Format de sortie

```markdown
# Analyse droits voisins / OGC / IA générative — [SUJET]

*Brouillon soumis à validation. Domaine en évolution rapide.*

## 1. Contexte et périmètre
[Titulaire(s), œuvre/prestation, territoire, question posée]

## 2. Droits voisins applicables (si pertinent)
[Titulaire, fondement CPI, droits patrimoniaux, durée, droit moral]

## 3. Relations OGC (si pertinent)
[OGC concerné(s), adhésion, répartition, obligations]

## 4. Analyse IA générative (si pertinent)
[Protégeabilité output, risques training data, obligations AI Act]

## 5. Analyse NFT (si pertinent)
[Nature juridique, transfert de droits, risques]

## 6. Recommandations
[Actions concrètes — contrat, adhésion OGC, documentation intervention humaine, etc.]

## 7. Limites et incertitudes
[Absence de jurisprudence FR, évolution AI Act, interprétation art. 4(3) directive 2019/790]
```

---

## Gate non-juriste

- [ ] Distinction claire entre droit d'auteur et droits voisins
- [ ] Titulaire de droits voisins correctement identifié (artiste / producteur / ECA / éditeur presse)
- [ ] Durée de protection correcte (50 ou 70 ans selon directive 2011/77/UE)
- [ ] OGC pertinent identifié et implications de l'adhésion expliquées
- [ ] IA générative : distinction protégeabilité output / risques training data / obligations AI Act
- [ ] NFT : clarification que le NFT ne transfère pas les droits d'auteur sauf cession L.131-3
- [ ] Incertitudes juridiques signalées (jurisprudence absente, droit en évolution)
- [ ] Directive 2019/790 et AI Act correctement référencés

---

## Emplacement des sorties

```
outputs/droits-voisins-ogc-<sujet-slug>-YYYY-MM-DD.md
```

---

## Ce skill ne fait pas

- Qualifier l'originalité d'une œuvre → utiliser `qualification-oeuvre`
- Rédiger un contrat de cession auteur → utiliser `cession-droit-auteur`
- Traiter la contrefaçon de droit d'auteur → utiliser `contrefacon-droit-auteur`
- Gérer les déclarations SACEM/SCAM/SACD (acte de l'adhérent sur le portail OGC)
- Auditer la conformité AI Act en détail (renvoi vers spécialiste réglementaire IA)
- Rédiger les smart contracts NFT (développement blockchain)
- Fournir un avis fiscal sur les NFT (régime fiscal des crypto-actifs)

---

## Ton

Technique, prospectif, prudent. Signaler systématiquement les incertitudes (pas de jurisprudence FR sur la protégeabilité des outputs IA, AI Act en cours d'entrée en application). Distinguer clairement le régime des droits voisins de celui du droit d'auteur. Rappeler que le droit applicable est en évolution rapide.
