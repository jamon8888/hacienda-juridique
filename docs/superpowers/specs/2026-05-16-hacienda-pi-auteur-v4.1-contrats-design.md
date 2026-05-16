# Hacienda PI — Bloc Droit d'auteur V4.1 Contrats — Design

**Date** : 2026-05-16
**Plugin** : `hacienda-propriete-intellectuelle` v0.10.0 (extension de v0.9.0)
**Base** : main (V1.0-V1.1.2 + V2.0-V2.2 + V4.0 mergés)

---

## 1. Objectifs

Compléter le bloc droit d'auteur après V4.0 qualification avec les 3 skills contractuels :

1. **`cession-droit-auteur`** — préparation contrat de cession de droits patrimoniaux. Respecte CPI L.131-3 (cession écrite + énumération droits + domaines d'exploitation + territoires + durée + rémunération). Gère les variantes : cession totale vs partielle, exclusive vs non-exclusive, cession future vs présente, contexte commande / salarié / partenariat. Génère projet de contrat avec clauses critiques.

2. **`licence-droit-auteur`** — préparation contrat de licence d'utilisation. Couvre : licence exclusive vs non-exclusive vs licence libre (open source / Creative Commons), licence logiciel propriétaire (EULA), licence SaaS. Distingue de la cession (la licence conserve la titularité chez le concédant).

3. **`bases-de-donnees`** — analyse régime juridique d'une base de données (double protection L.111-1 droit d'auteur sur structure + L.341-1 droit sui generis sur investissement), gestion accès tiers, conformité RGPD si données personnelles, modèles contractuels (licence d'utilisation, mise à disposition open data, contrat de scraping autorisé).

Bump plugin v0.9.0 → v0.10.0. V4.2 enforcement (`contrefacon-droit-auteur`) suivra pour atteindre v0.11.0 = bloc droit d'auteur quasi-complet (V4.3 droits voisins + OGC + IA générative restera optionnel).

## 2. Non-objectifs

- Pas de `contrefacon-droit-auteur` (V4.2)
- Pas de droits voisins (artistes-interprètes, producteurs phonogrammes) — V4.3 différé
- Pas de gestion SACEM / SCAM / SACD / SDRM (OGC) — différé V4.3+
- Pas de NFT / IA générative (régime en construction CJUE + UE AI Act) — V4.3+
- Pas de cession à titre gratuit (donation) — régime spécifique notarié, hors scope
- Pas de gestion succession ayants droit — différé V4.3+
- Pas d'export PDF des contrats générés (juste Markdown structuré comme drafts)

## 3. Architecture

### 3.1 Plugin étendu

```
plugins/hacienda-propriete-intellectuelle/                v0.10.0
├── .claude-plugin/plugin.json                            [BUMP] 0.10.0
├── CLAUDE.md                                             [PATCH] section "Droit d'auteur" enrichie
├── CHANGELOG.md                                          [PATCH] 0.10.0
├── README.md                                             [PATCH] V0.10
│
├── skills/
│   ├── cession-droit-auteur/                             [NEW]
│   │   ├── SKILL.md                                       (~700-900 lignes style Anthropic FR)
│   │   └── references/
│   │       ├── clauses-cession-L131-3.md                 (clauses obligatoires + recommandées)
│   │       └── jurisprudence-cession.md                  (cessions invalides + interprétation stricte)
│   ├── licence-droit-auteur/                             [NEW]
│   │   ├── SKILL.md                                       (~600-800 lignes)
│   │   └── references/
│   │       ├── typologie-licences-auteur.md              (exclusive / non-exclusive / libre / EULA / SaaS)
│   │       └── modeles-clauses-licence.md                (clauses standard + variations)
│   ├── bases-de-donnees/                                 [NEW]
│   │   ├── SKILL.md                                       (~500-700 lignes)
│   │   └── references/
│   │       ├── regime-sui-generis-L341.md                (L.341-1 à L.342-5 + jurisprudence)
│   │       └── modeles-licence-bdd.md                    (open data, scraping autorisé, mise à disposition)
│   └── (autres skills intact)
│
└── references/
    └── ressources-pi-fr.md                               [PATCH] section "Contrats droit d'auteur"
```

Pas de nouveau code TS. Pas de nouveau tool MCP. Réutilise tout l'infra existant.

### 3.2 Configuration utilisateur

Aucun nouveau fichier user-stable. Outputs vont dans `outputs/` existant :
- `cession-auteur-<oeuvre-slug>-YYYY-MM-DD.md`
- `licence-auteur-<oeuvre-slug>-YYYY-MM-DD.md`
- `bases-donnees-<projet-slug>-YYYY-MM-DD.md`

## 4. Le skill `cession-droit-auteur`

### 4.1 Frontmatter

```yaml
---
name: cession-droit-auteur
description: >
  Préparation d'un contrat de cession de droits patrimoniaux d'auteur conforme
  CPI L.131-3 (écrit obligatoire + énumération droits cédés + domaines
  d'exploitation + territoires + durée + rémunération). Gère cession totale
  vs partielle, exclusive vs non-exclusive, présente vs future, contextes
  commande / salarié / partenariat. NE signe PAS le contrat — validation
  avocat spécialisé PI + parties au contrat requise. Le droit moral
  (L.121-1) reste TOUJOURS à l'auteur (perpétuel, inaliénable, imprescriptible).
argument-hint: "[oeuvre slug | type cession totale/partielle | contexte commande/salarié/partenariat]"
---
```

### 4.2 Sections (~800 lignes, style Anthropic FR)

1. **Garde-fou loud** :
   > **Préparation projet de contrat ≠ signature.** Ce skill produit un **brouillon de cession** à valider et signer par l'avocat spécialisé PI + les parties. Il NE signe PAS, NE garantit PAS la validité finale, NE remplace PAS l'avocat. **CPI L.131-3 impose des conditions cumulatives strictes** : écrit obligatoire + **énumération précise** des droits cédés (reproduction, représentation, adaptation, distribution) + **domaines d'exploitation** (presse, édition, audiovisuel, numérique, etc.) + **territoires** (France, EU, monde) + **durée** (jusqu'à 70 ans post mortem max ou inférieure) + **rémunération** (proportionnelle aux recettes en principe — forfait exceptionnel L.131-4). **L'omission d'une seule condition entraîne la nullité partielle ou totale**. Le **droit moral (L.121-1) reste TOUJOURS à l'auteur** : perpétuel, inaliénable, imprescriptible — aucune clause ne peut le céder.

2. **Chargement profil** : rôle (avocat / juriste / non-juriste), secteurs (édition / audiovisuel / logiciel / design / mode / publicité / multimedia), posture conseil, position défaut cession auteur de commande, position défaut clauses droit moral, approbateurs.

3. **Intake** :
   - **Œuvre concernée** : référence à qualification préalable (recommandé : exécuter `/qualification-oeuvre` d'abord)
   - **Cédant (auteur)** : personne physique unique / multiple (collaboration) / personne morale (œuvre collective uniquement)
   - **Cessionnaire** : personne physique / morale, secteur d'activité, usage prévu
   - **Type de cession** :
     - **Totale** (tous droits patrimoniaux) vs **Partielle** (droits sélectionnés)
     - **Exclusive** (cessionnaire seul exploite) vs **Non-exclusive** (cédant garde possibilité de céder à d'autres)
     - **Présente** (œuvre existante) vs **Future** (œuvre à créer — risque L.131-1 cession globale d'œuvres futures interdite)
   - **Contexte** : commande, salarié (sauf logiciel L.113-9), partenariat, vente
   - **Rémunération envisagée** : proportionnelle aux recettes (principe L.131-4) vs forfaitaire (cas exceptionnels limités)

4. **Étape 1 — Vérification éligibilité cession (L.131-1 et 2)** :
   - **L.131-1 — Interdiction cession globale œuvres futures** : la cession globale d'œuvres futures est NULLE. Possible uniquement par contrat d'édition (L.132-4) ou cession d'œuvres déterminées ou déterminables
   - **L.131-2 — Forme écrite obligatoire** : contrats de représentation, d'édition, de production audiovisuelle, contrats de cession en général
   - **L.131-3 — Conditions cumulatives** (cœur du skill — voir Étape 3)
   - **L.131-4 — Principe de la rémunération proportionnelle aux recettes** (sauf exceptions)
   - **L.131-5 — Lésion** : si rémunération forfaitaire avec préjudice > 7/12 par rapport à recettes effectives, action en révision (5 ans)

5. **Étape 2 — Identification précise des parties + œuvre** :

   Clauses identification :
   - **Cédant** : nom complet + état civil + adresse (si personne morale : raison sociale + SIREN + représentant + adresse siège)
   - **Cessionnaire** : idem
   - **Œuvre cédée** : titre + nature + description précise + supports (manuscrits, fichiers, format), date création
   - **Garanties cédant** : titulaire des droits cédés, libre de toute autre cession antérieure (clause de garantie d'éviction)

6. **Étape 3 — Énumération des droits cédés (CONDITIONS CUMULATIVES L.131-3)** :

   **Conditions cumulatives obligatoires sous peine de nullité** :

   **(a) Droits cédés — énumération précise** :
   - **Droit de reproduction** (L.122-3) : fixation matérielle (impression, gravure, numérisation, captation)
   - **Droit de représentation** (L.122-2) : communication directe au public (récitation, projection, diffusion)
   - **Droit d'adaptation / traduction / transformation** (L.122-4) : œuvres dérivées
   - **Droit de distribution / location / prêt** : mise sur marché copies physiques
   - **Droit d'exploitation numérique** : usages internet, applications mobiles, formats électroniques
   - Combinaisons : préciser EXACTEMENT lesquels — pas de mention "tous droits" générique (nullité)

   **(b) Domaines d'exploitation — précision exigée** :
   - Édition imprimée (livre, presse, brochure)
   - Audiovisuel (cinéma, TV, plateformes streaming)
   - Numérique / internet (sites web, applications, réseaux sociaux)
   - Spectacle vivant (théâtre, concert, festival)
   - Phonogramme (CD, vinyle, fichier audio)
   - Merchandising / objets dérivés
   - Publicité / promotionnel
   - Note : **chaque domaine doit être listé explicitement** — "tous domaines" insuffisant

   **(c) Territoires** :
   - France métropolitaine + DROM-COM
   - Union Européenne
   - Monde entier
   - Pays spécifiques (lister)
   - Note : "monde entier" est admis comme territoire unique

   **(d) Durée** :
   - Pour la durée légale de protection (vie auteur + 70 ans post mortem)
   - Durée limitée (5 ans, 10 ans, etc. — fréquent en pratique)
   - Note : durée doit être déterminée ou déterminable

   **(e) Rémunération** :
   - **Principe (L.131-4) : proportionnelle aux recettes d'exploitation**
   - Pourcentage (5%, 10%, 15% des recettes brutes ou nettes)
   - Sur quelle assiette : prix public HT/TTC, recettes éditeur, etc.
   - Modalités versement : avance + à-valoir + comptes périodiques (semestriels typique)
   - **Exceptions forfaitaire** (L.131-4 al.2) limitatives :
     - Base de calcul ne peut être déterminée
     - Coûts vérification disproportionnés
     - Nature exploitation rend impossible application proportionnelle
     - Contribution intégrée dans œuvre composite/collective
     - Cession d'un logiciel
     - Cas particuliers édition (réimpressions techniques)

7. **Étape 4 — Clauses recommandées (non obligatoires mais critiques)** :
   - **Clause de garantie** : cédant garantit titularité + absence d'éviction
   - **Clause de respect du droit moral** : engagement cessionnaire à respecter intégrité, paternité, divulgation, repentir
   - **Clause d'audit** : possibilité pour cédant de vérifier comptes exploitation
   - **Clause de résiliation** : conditions de fin anticipée (non-exploitation, manquement, déchéance)
   - **Clause de cession à des tiers** : autorisation de sous-cession + conditions
   - **Clause de résolution des litiges** : juridiction compétente (TJ Paris recommandé droit auteur) + médiation préalable optionnelle
   - **Clause droit applicable** : droit français
   - **Clause de notification** : adresses, modalités

8. **Étape 5 — Cas particuliers par contexte** :

   **Cession dans cadre œuvre de commande** :
   - Commanditaire doit obtenir cession écrite (pas d'automaticité)
   - Erreurs fréquentes : facture qui ne mentionne pas cession explicite → titularité reste au créateur

   **Cession dans cadre salariat (sauf logiciel L.113-9)** :
   - Régime général : salarié titulaire, cession écrite requise
   - Contrat de travail peut prévoir cession des œuvres créées dans l'exercice des fonctions
   - Convention collective parfois aménage (presse L.132-36+)

   **Cession dans contrat d'édition (L.132-1 à 17)** :
   - Régime spécifique : forme écrite + obligation d'éditeur + reddition de comptes + résiliation pour non-exploitation
   - Cession d'œuvres futures admise (exception à L.131-1) dans 5 prochaines œuvres / 5 ans (L.132-4)

   **Cession audiovisuelle (L.132-23 à 31)** :
   - Présomption de cession au producteur (L.132-24) : "Le contrat qui lie le producteur aux auteurs d'une œuvre audiovisuelle, autres que l'auteur de la composition musicale avec ou sans paroles, emporte, sauf clause contraire et sans préjudice des droits reconnus à l'auteur par les dispositions des articles L. 111-3, L. 121-4, L. 121-5, L. 122-1 à L. 122-7, L. 131-2 à L. 131-7, L. 132-4 et L. 132-7, cession au profit du producteur des droits exclusifs d'exploitation de l'œuvre audiovisuelle."

9. **Format de sortie** (template Markdown inline quadruple fence) — projet de contrat structuré :

   ```markdown
   [EN-TÊTE CONFIDENTIALITÉ — selon profil]

   # Projet de Contrat de Cession de Droits d'Auteur — PROJET POUR VALIDATION AVOCAT

   > **Préparation projet ≠ signature.** [paragraphe garde-fou reformulé]

   > **⚠️ Note du relecteur**
   > - **Œuvre :** [titre + qualification effectuée ✓/✗]
   > - **Conditions L.131-3 :** [écrit ✓ / énumération droits ✓ / domaines ✓ / territoires ✓ / durée ✓ / rémunération ✓ — toutes vérifiées sous peine de nullité]
   > - **Cas particulier :** [commande / salarié / édition / audiovisuel / standard]
   > - **Droit moral L.121-1 :** non cessible — clauses respect intégrité + paternité prévues
   > - **Avant signature :** validation avocat spécialisé PI + relecture parties **OBLIGATOIRE**

   **Triage :** 🟢 CONFORME L.131-3 / 🟡 CLAUSES À AJUSTER / 🔴 RISQUE NULLITÉ — une phrase pourquoi

   ## Article 1 — Identification des parties
   [Cédant + Cessionnaire détaillés]

   ## Article 2 — Œuvre cédée
   [Titre + nature + description précise + supports]

   ## Article 3 — Garanties du cédant
   [Titularité + absence d'éviction]

   ## Article 4 — Droits cédés (L.131-3 condition a)
   [Énumération précise : reproduction, représentation, adaptation, distribution, exploitation numérique — selon cas]

   ## Article 5 — Domaines d'exploitation (L.131-3 condition b)
   [Liste explicite : édition imprimée, audiovisuel, numérique, etc.]

   ## Article 6 — Territoires (L.131-3 condition c)
   [France / EU / monde / pays spécifiques]

   ## Article 7 — Durée (L.131-3 condition d)
   [Durée légale 70 ans post mortem OU durée limitée X années]

   ## Article 8 — Rémunération (L.131-3 condition e + L.131-4)
   [Proportionnelle aux recettes (principe) — taux + assiette + modalités versement
   OU forfaitaire (cas exceptionnel L.131-4 al.2) — justification du cas]

   ## Article 9 — Respect du droit moral (L.121-1 inaliénable)
   [Engagements cessionnaire : intégrité + paternité + divulgation + repentir]

   ## Article 10 — Cession à des tiers
   [Autorisée / soumise à accord cédant / interdite]

   ## Article 11 — Audit et reddition de comptes
   [Modalités vérification recettes par cédant]

   ## Article 12 — Résiliation
   [Conditions fin anticipée : non-exploitation, manquement, déchéance]

   ## Article 13 — Droit applicable et juridiction
   [Droit français + TJ Paris recommandé]

   ## Article 14 — Notification
   [Adresses et modalités]

   ## Article 15 — Dispositions diverses
   [Intégralité, modifications par avenant écrit, etc.]

   Fait à [...] le [...]
   En deux exemplaires originaux.

   Le Cédant                           Le Cessionnaire
   ```

   Note du skill : ce projet est un **canevas** — l'avocat l'adapte et y intègre clauses spécifiques selon situation (clauses pénales, propriété industrielle annexe, RGPD si données personnelles, etc.).

10. **Gate non-juriste** : brief avocat (œuvre + cession envisagée + conditions L.131-3 vérifiées + cas particulier + 3 questions critiques).

11. **Emplacement** : `~/.claude/plugins/config/.../outputs/cession-auteur-<oeuvre-slug>-YYYY-MM-DD.md`.

12. **Ce que ce skill NE fait PAS** :
    - Signer le contrat (= parties + avocat)
    - Garantir la validité finale (= avocat in fine, juge en cas de contestation)
    - Remplacer l'avocat spécialisé PI
    - Évaluer la rémunération adéquate (négociation business + benchmark sectoriel)
    - Gérer cession à titre gratuit (donation, régime notarié spécifique)
    - Cession d'œuvres futures globalement (interdite L.131-1 sauf exception édition)
    - Traiter licences (= `licence-droit-auteur` V4.1)
    - Traiter bases de données spécifiquement (= `bases-de-donnees` V4.1)

13. **Ton** : juridique précis, formel, équilibré (présenter risques nullité + recommandations).

## 5. Le skill `licence-droit-auteur`

### 5.1 Frontmatter

```yaml
---
name: licence-droit-auteur
description: >
  Préparation d'un contrat de licence d'utilisation de droits d'auteur :
  licence exclusive vs non-exclusive, licence libre (open source / Creative
  Commons), licence logiciel propriétaire (EULA), licence SaaS. Distingue de
  la cession : la licence CONSERVE la titularité chez le concédant. NE signe
  PAS — validation avocat spécialisé PI requise. Coopère avec
  `cession-droit-auteur` (alternative juridique) et `logiciels-pi` (régime
  spécifique logiciel V0.9).
argument-hint: "[oeuvre slug | type licence : exclusive/non-exclusive/libre/EULA/SaaS]"
---
```

### 5.2 Sections (~700 lignes)

1. **Garde-fou loud** :
   > **Préparation projet ≠ signature.** Licence ≠ cession. Dans la **licence**, le concédant **conserve la titularité** des droits et autorise simplement l'utilisation. Dans la **cession** (cf. `cession-droit-auteur`), le cédant **transfère** la titularité au cessionnaire. La distinction est juridique critique — une "licence exclusive" mal rédigée peut être requalifiée en cession (perte titularité pour le concédant). Conditions L.131-3 (énumération + domaines + territoires + durée + rémunération) **s'appliquent aussi aux licences** par la jurisprudence (Cour de cass. 1re civ. 21 nov. 2006).

2. **Chargement profil** + Intake adapté (oeuvre, type licence : exclusive / non-exclusive / libre / EULA / SaaS).

3. **Étape 1 — Distinction Cession vs Licence** :

   | Aspect | Cession | Licence |
   |---|---|---|
   | Titularité droits | Transfert au cessionnaire | Reste au concédant |
   | Durée | Souvent jusqu'à 70 ans post mortem | Limitée (1 an, 5 ans, durée projet) |
   | Réversibilité | Difficile (déchéance possible) | Naturelle à expiration |
   | Conditions L.131-3 | Obligatoires | Recommandées (jurisprudence) |
   | Cas usage typique | Édition livre, audiovisuel, achat œuvre art | Logiciel, SaaS, photo banque, musique |

4. **Étape 2 — Typologie licences** :

   **Licence exclusive** :
   - Le licencié est SEUL à pouvoir exploiter dans le périmètre
   - Le concédant ne peut plus céder/licencier à d'autres dans le même périmètre
   - Rémunération généralement forfait + redevances
   - Risque : requalification en cession si trop large

   **Licence non-exclusive** :
   - Le concédant peut licencier à plusieurs licenciés en parallèle
   - Modèle SaaS classique, photo banque (Adobe Stock, Getty Images), musique sync (SACEM)
   - Rémunération généralement abonnement ou pay-per-use

   **Licence libre (open source / Creative Commons)** :
   - Licence offerte au public général sans contrat individuel
   - **Code** : MIT, BSD, Apache (permissives) / GPL, AGPL (copyleft) — voir `logiciels-pi` V0.9
   - **Contenu** : Creative Commons CC-BY, CC-BY-SA, CC-BY-NC, CC-BY-ND, CC-BY-NC-SA, CC-BY-NC-ND, CC0
   - Conditions de la licence acceptées par l'utilisateur au moment de l'utilisation (browse-wrap / click-wrap)

   **Licence logiciel propriétaire (EULA)** :
   - End User License Agreement
   - Conditions strictes : nombre utilisateurs, machines, durée, restrictions copie/modification/redistribution
   - Exceptions L.122-6-1 d'ordre public restent (sauvegarde, test, décompilation interopérabilité, correction erreurs)

   **Licence SaaS** :
   - Pas d'installation chez le client (utilisation à distance)
   - Souvent abonnement mensuel/annuel
   - Conditions générales d'utilisation (CGU) + conditions générales de vente (CGV)
   - SLA (Service Level Agreement) + RGPD si données personnelles traitées

   Référence : `references/typologie-licences-auteur.md`.

5. **Étape 3 — Clauses critiques par type** :

   Pour chaque type, lister les clauses critiques à inclure (référence `references/modeles-clauses-licence.md`) :
   - Durée + reconduction
   - Périmètre d'usage (utilisateurs autorisés, machines, géographie)
   - Modalités de mise à jour / maintenance
   - Limitations responsabilité concédant (LRC plafonnée)
   - Garanties contre éviction
   - Données personnelles (RGPD si applicable)
   - Résiliation + sort des données

6. **Étape 4 — Cas particuliers** :

   **Licence Creative Commons sur contenu** :
   - Choisir version (4.0 international = standard actuel)
   - Choisir options : BY (attribution obligatoire toujours) + SA (partage identique) ou NC (non commercial) ou ND (pas de modifications)
   - Marquage : copyright + référence licence + lien Creative Commons
   - Note : irrévocable une fois publié sous CC

   **Licence open source logiciel** : renvoyer vers `logiciels-pi` V0.9 (typologie complète + matrices compatibilité)

   **Licence SaaS B2B** :
   - CGU complètes : utilisation, sécurité, données, propriété, durée, résiliation
   - DPA (Data Processing Agreement) RGPD obligatoire si données personnelles
   - SLA : disponibilité, temps de réponse, pénalités

7. **Format de sortie** (template Markdown — projet de contrat de licence structuré, similaire à cession-droit-auteur mais avec articles spécifiques licence).

8. **Gate non-juriste** + Emplacement + Ne fait pas + Ton.

## 6. Le skill `bases-de-donnees`

### 6.1 Frontmatter

```yaml
---
name: bases-de-donnees
description: >
  Analyse régime juridique d'une base de données : double protection possible
  (L.111-1 droit d'auteur sur structure originale + L.341-1 droit sui generis
  sur investissement substantiel), gestion accès tiers, conformité RGPD si
  données personnelles, modèles contractuels (licence d'utilisation, mise à
  disposition open data, contrat de scraping autorisé). NE rédige PAS de
  contrat final — coopère avec `licence-droit-auteur`.
argument-hint: "[nom base | type accès : interne/SaaS/open data/scraping]"
---
```

### 6.2 Sections (~600 lignes)

1. **Garde-fou loud** :
   > **Analyse régime ≠ rédaction contractuelle.** Les bases de données ont un régime juridique **dual** : droit d'auteur sur la structure originale (L.111-1) ET droit sui generis sur l'investissement substantiel (L.341-1). Ce dernier est **indépendant** — une base peut être protégée par sui generis SANS droit d'auteur (annuaire mal structuré mais coûteux à compiler) et inversement. La durée sui generis est de **15 ans** à compter de l'achèvement (L.342-5) — **renouvelable si modification substantielle**, ce qui en pratique donne une protection quasi-illimitée pour bases actualisées régulièrement. **Si la base contient des données personnelles, le RGPD s'applique en plus** (régime indépendant).

2. **Chargement profil** + Intake (nom base, contenu, structure, type accès, RGPD applicable).

3. **Étape 1 — Double protection juridique** :

   **Droit d'auteur sur structure (L.111-1)** :
   - Condition : **originalité** de l'organisation, du choix ou de la disposition des données (critère CJUE Infopaq)
   - Bénéficiaire : auteur de la structure (personne physique sauf œuvre collective)
   - Durée : 70 ans post mortem (L.123-1)
   - Étendue : ne couvre PAS le contenu (les données elles-mêmes)

   **Droit sui generis (L.341-1)** :
   - Condition : **investissement substantiel** (financier, matériel, humain) pour constitution, vérification, présentation du contenu
   - Bénéficiaire : **producteur** (personne qui a fait l'investissement — souvent personne morale)
   - Durée : **15 ans** à compter de l'achèvement, **renouvelable si modification substantielle** (L.342-5)
   - Étendue : interdiction d'extraction ou réutilisation **substantielle** du contenu

   Cas combinés :
   - Base structurée originalement + investissement substantiel = double protection (cumul)
   - Base structurée originalement mais simple à compiler = droit d'auteur seul (15 ans selon L.342-5 si pas de modification)
   - Base banale structurellement mais coûteuse à compiler = sui generis seul (15 ans)
   - Base banale structurellement + simple compilation = aucune protection (cas rare)

4. **Étape 2 — Régimes d'accès** :

   **Accès interne (intra-entreprise)** :
   - Pas de contrat externe nécessaire (mais politique interne d'accès recommandée)
   - Gestion RGPD si données personnelles : finalités, durée conservation, sécurité

   **Accès SaaS (commercialisation)** :
   - Licence d'utilisation (renvoi `licence-droit-auteur`)
   - CGU + CGV + DPA RGPD
   - Limitations d'usage (nombre utilisateurs, volume requêtes, géographie)
   - SLA disponibilité

   **Open data (mise à disposition publique)** :
   - Licence Open Data type Licence Ouverte (LO) Etalab 2.0, ODbL (Open Database License)
   - Pour données publiques : décret 2017-331 (open data par défaut)
   - Marquage clair de la licence

   **Scraping autorisé / API publique** :
   - Conditions d'usage (rate limit, citation, redistribution interdite)
   - Contrat de licence d'accès ou CGU API
   - Risques scraping non autorisé : action sui generis L.342-1 (Cour de cass. com. 5 mars 2019 PMU vs Stanleybet)

5. **Étape 3 — Conformité RGPD** :

   Si base contient données personnelles :
   - **Base légale du traitement** (article 6 RGPD : consentement, contrat, obligation légale, intérêt vital, mission service public, intérêt légitime)
   - **Finalités** définies, légitimes, déterminées
   - **Minimisation** : seules les données nécessaires
   - **Durée de conservation** définie
   - **Droits des personnes** : information, accès, rectification, effacement, opposition, portabilité
   - **DPO** (Data Protection Officer) si requis
   - **DPIA** (Data Protection Impact Assessment) si traitement à risque élevé
   - **Cookies et trackers** : consentement explicite (CNIL)
   - **Transfert hors UE** : encadrement (SCC, BCR, adéquation)

   Note : ce skill **introduit** les obligations RGPD mais ne rédige PAS le DPA — renvoyer vers plugin RGPD dédié (V5.0 ou plugin spécialisé futur).

6. **Étape 4 — Modèles contractuels** :

   - Licence d'utilisation BDD propriétaire (commercial)
   - Licence Open Data type LO 2.0 ou ODbL
   - Contrat de scraping autorisé (rare mais existant — accords B2B)
   - Conditions Générales d'Utilisation API publique

   Référence : `references/modeles-licence-bdd.md`.

7. **Format de sortie** (template Markdown — analyse régime + recommandation type contrat + clauses critiques).

8. **Gate non-juriste** + Emplacement + Ne fait pas + Ton.

## 7. Critères de succès V4.1

- [ ] `npm test` vert (269)
- [ ] `npm run typecheck`, `npm run branding:check` verts
- [ ] `/cession-droit-auteur "<oeuvre + contexte>"` produit projet contrat structuré 15 articles conforme L.131-3
- [ ] `/licence-droit-auteur "<oeuvre + type licence>"` produit projet licence selon typologie
- [ ] `/bases-de-donnees "<nom base + type accès>"` produit analyse régime + recommandation contrat + flag RGPD
- [ ] Cross-références claires V4.0 (qualification → contrats) + V0.9 logiciels-pi (régime spécifique)
- [ ] Pas de régression
- [ ] Bump v0.9.0 → v0.10.0

## 8. Risques

| Risque | Mitigation |
|---|---|
| Cession invalide L.131-3 (omission condition) | Checklist 6 conditions cumulatives explicite + flag 🔴 si manquante |
| Licence requalifiée en cession (clauses trop larges) | Section distinction explicite + tests interprétatifs |
| Sous-estimation droit moral L.121-1 dans contrats | Article dédié dans tous modèles + garde-fou loud |
| Confusion CC libre commercial vs non commercial | Tableau récap Creative Commons + recommandation par contexte |
| RGPD oublié pour bases données personnelles | Section dédiée + renvoi plugin RGPD futur |

## 9. Plan de rollout

- **V4.1 (ce spec)** — contrats droit d'auteur (cession + licence + bases données)
- **V4.2** — `contrefacon-droit-auteur` (enforcement) — clôt bloc droit d'auteur de base
- **V4.3** — droits voisins + SACEM/OGC + NFT/IA générative (différé selon évolutions jurisprudentielles)
- **V3.0** — bloc Dessins & Modèles (3 skills)
- **V5.0** — Contrats PI + audit-pi-ma M&A
- **V6.0** — Contentieux & Enforcement
- **V1.2** — agent `contrefacon-web` (marques + droit d'auteur multi-domaines)

## 10. Annexes

### A — Articles CPI référencés (Livre I — Droit d'auteur)

- **L.111-1** : droit d'auteur né de la création
- **L.121-1** : droit moral perpétuel
- **L.121-2 / 4** : divulgation / retrait
- **L.122-1 à 12** : droits patrimoniaux
- **L.131-1** : interdiction cession globale œuvres futures
- **L.131-2** : forme écrite obligatoire
- **L.131-3** : conditions cumulatives cession (cœur)
- **L.131-4** : rémunération proportionnelle (principe + exceptions forfaitaires)
- **L.131-5** : lésion (action en révision si forfait préjudiciable)
- **L.131-6** : clause "tous droits"
- **L.132-1 à 17** : contrat d'édition (régime spécifique)
- **L.132-4** : cession œuvres futures limitée éditeur
- **L.132-23 à 31** : contrat de production audiovisuelle (présomption cession L.132-24)
- **L.132-36 et suiv.** : œuvres journalistiques (convention collective)
- **L.341-1** : droit sui generis BDD
- **L.342-5** : durée 15 ans renouvelable

### B — Jurisprudence clé

- **Cour de cass. 1re civ. 21 nov. 2006** : conditions L.131-3 s'appliquent aux licences (pas seulement cessions)
- **Cour de cass. 1re civ. 13 nov. 2008** : interprétation stricte cession ("tous droits" = nullité si non énumérés)
- **Cour de cass. com. 5 mars 2019** : PMU vs Stanleybet (sui generis BDD)
- **CJUE BHB C-203/02 (2004)** : critère investissement substantiel sui generis
- **CJUE Innoweb C-202/12 (2013)** : meta-recherche violant sui generis

### C — Inspirations

- V4.0 `qualification-oeuvre` (point d'entrée du bloc droit d'auteur)
- V0.9 `logiciels-pi` (régime spécifique logiciel L.113-9)
- V1.1.2 `depot-marque-fr` (structure préparation contrat avec checklist)

---

*Version 4.1 — mode autonome, suite V4.0.*
