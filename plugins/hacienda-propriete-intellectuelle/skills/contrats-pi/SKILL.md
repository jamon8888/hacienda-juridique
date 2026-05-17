---
name: contrats-pi
description: >
  Revue et rédaction de contrats de propriété intellectuelle transversaux :
  licences de technologie/brevet, accords de coexistence marques, NDA/accords
  de confidentialité, contrats R&D collaborative, franchise PI, transferts de
  technologie. Identifie clauses critiques, risques, et produit projet de contrat
  ou note de revue. Brouillon soumis à validation par un avocat.
version: "1.0.0"
authors: ["Hacienda"]
tags: [contrats, licence-brevet, coexistence, NDA, R&D, franchise, transfert-technologie]
---

# Skill — Contrats de propriété intellectuelle

> **BROUILLON DE CONTRAT OU NOTE DE REVUE, PAS ACTE DÉFINITIF.**
>
> Ce skill couvre les contrats PI **transversaux** (multi-droits ou hors droit d'auteur pur).
> Pour les contrats spécifiques au droit d'auteur (cession L.131-3, licence auteur, BDD),
> utiliser `cession-droit-auteur`, `licence-droit-auteur`, `bases-de-donnees`.
>
> Les sorties sont des **brouillons**. Elles nécessitent une validation par un avocat
> avant signature.

## Examples

<example>
<user>Rédige un accord de coexistence entre notre marque SOLARIS et la marque SOLARA déposée par un concurrent en classe 9.</user>
<response>Projet d'accord de coexistence marques : délimitation territoriale et/ou par produits, engagement réciproque de non-opposition, clause de non-confusion (différenciation visuelle), durée et résiliation, loi applicable. Vérification préalable risque de confusion résiduel (L.713-3).</response>
</example>

<example>
<user>On veut licencier notre brevet de procédé à un industriel japonais. Prépare le contrat.</user>
<response>Projet licence de brevet exclusive/non-exclusive : territoire Japon, champ technique (revendications licenciées), durée (vie du brevet ou limitée), redevances (forfait + running royalty), sous-licence, garanties brevetabilité, clause de non-contestation, perfectionnements, résiliation, loi applicable et arbitrage (CCI).</response>
</example>

<example>
<user>Revois ce NDA qu'on nous propose avant un partenariat R&D. Identifie les risques.</user>
<response>Note de revue NDA : définition informations confidentielles (trop large ? trop étroite ?), exceptions standard (domaine public, développement indépendant, obligation légale), durée de l'obligation (> 5 ans risqué), sort des informations PI générées pendant discussions, clause residuals (mémoire non écrite), juridiction et loi applicable.</response>
</example>

---

## Chargement du profil

> Charger les préférences depuis le profil utilisateur :
> - **Posture contractuelle par défaut** (protecteur titulaire / équilibré / facilitateur preneur)
> - **Juridiction par défaut** (droit français / common law anglais / mixte)
> - **Modèles de clauses internes** (si disponibles)
> - **Approbateur contrats PI**

---

## Intake

1. **Mode** — `--draft` (rédaction projet de contrat) ou `--review` (revue d'un contrat existant)
2. **Type de contrat** — cf. typologie ci-dessous
3. **Parties** — identité, qualité (titulaire/licencié/partenaire), pays d'établissement
4. **Objet PI** — droits concernés (brevet(s), marque(s), D&M, savoir-faire, logiciel, données)
5. **Territoire** — géographique (France, UE, mondial, pays spécifiques)
6. **Durée** — fixe / vie du titre / indéterminée
7. **Exclusivité** — exclusive / non-exclusive / sole licence
8. **Contrepartie financière** — forfait / redevance proportionnelle / mixte / gratuit (R&D)
9. **Contexte** — partenariat R&D / exploitation commerciale / règlement de litige / M&A / franchise
10. **Contraintes spécifiques** — droit de la concurrence (UE/FR), contrôle des exportations, RGPD

---

## Étape 1 — Typologie des contrats PI

### Contrats couverts par ce skill

| Type | Objet | Articles clés | Particularités |
|------|-------|---------------|----------------|
| **Licence de brevet** | Autorisation d'exploiter un brevet | L.613-8 CPI | Inscription au RNB obligatoire pour opposabilité aux tiers |
| **Cession de brevet** | Transfert de propriété | L.613-8 al.1 CPI | Inscription RNB obligatoire ; peut porter sur une partie des revendications |
| **Accord de coexistence marques** | Partage de marques similaires | Liberté contractuelle + L.713-3 | Risque antitrust si partition de marché (art. 101 TFUE) |
| **NDA / Accord de confidentialité** | Protection savoir-faire et PI avant divulgation | Art. 1100 et s. CC + L.151-1 (secret affaires) | Nécessaire avant toute discussion PI |
| **Contrat R&D collaborative** | PI générée conjointement | Liberté contractuelle + L.611-7 (salarié) | Clause d'attribution PI critique (copropriété vs répartition par domaine) |
| **Licence de savoir-faire** | Transmission know-how non breveté | Règlement UE 316/2014 (TTBER) | Secret + substantiel + identifié (art. 1 TTBER) |
| **Franchise (volet PI)** | Licence marque + savoir-faire + signes distinctifs | L.330-3 C.com (DIP) + TTBER | Obligation DIP 20 jours avant signature |
| **Transfert de technologie** | Package brevet + savoir-faire + assistance | Règlement UE 316/2014 (TTBER) | Exemption par catégorie si parts de marché < 20%/30% |
| **Accord de recherche conjointe** | Partenariat recherche sans exploitation immédiate | Règlement UE 1217/2010 (R&D) | Exemption par catégorie si parts < 25% |
| **MTA (Material Transfer Agreement)** | Transfert de matériel biologique/chimique | Liberté contractuelle | Biotech/pharma — restrictions d'usage recherche vs commercial |

### Contrats NON couverts (renvoi vers autres skills)

| Type | Skill dédié |
|------|-------------|
| Cession de droits d'auteur (L.131-3) | `cession-droit-auteur` |
| Licence de droits d'auteur / Creative Commons | `licence-droit-auteur` |
| Licence de base de données | `bases-de-donnees` |
| Contrat de travail (clause PI) | `revue-clause-pi` |
| Contrat commercial (clauses PI insérées) | `revue-clause-pi` |

---

## Étape 2 — Clauses critiques par type de contrat

### Licence de brevet / transfert de technologie

| Clause | Points d'attention | Risque si absente/mal rédigée |
|--------|-------------------|-------------------------------|
| Objet et revendications licenciées | Lister précisément les numéros de brevet et revendications | Litige sur périmètre |
| Territoire | Pays ou régions couverts | Exploitation hors champ = contrefaçon |
| Exclusivité | Exclusive / sole / non-exclusive | L'exclusive interdit au titulaire d'exploiter lui-même (sauf réserve) |
| Durée | Fixe ou vie du brevet | Au-delà expiration brevet = risque antitrust (redevance post-brevet) |
| Redevances | Forfait initial + running royalty (% CA net ou prix de vente) | Assiette mal définie = litige |
| Sous-licence | Autorisée / interdite / soumise à accord | Perte de contrôle si autorisée sans restriction |
| Perfectionnements (grant-back) | Licence retour sur améliorations du licencié | Clause exclusive = risque art. 101 TFUE |
| Non-contestation | Licencié s'engage à ne pas attaquer le brevet | Licéité limitée post-*Windsurfing* (CJUE) |
| Garanties | Validité, titularité, non-contrefaçon de tiers | Responsabilité du concédant |
| Inscription RNB | Publication au Registre national des brevets (L.613-9) | Inopposabilité aux tiers si non inscrite |

### Accord de coexistence marques

| Clause | Points d'attention |
|--------|-------------------|
| Délimitation | Par territoire / classes / canaux de distribution / éléments visuels |
| Engagement de non-opposition | Réciproque (dépôts actuels et futurs dans le périmètre) |
| Mesures anti-confusion | Différenciation obligatoire (couleur, logo, packaging) |
| Durée et résiliation | Liée à la vie des marques ou fixe avec renouvellement |
| Clause de cession | Droit de préemption si l'une des parties cède sa marque |
| Limites antitrust | Pas de partition de marché déguisée (art. 101 TFUE) |

### NDA / Accord de confidentialité

| Clause | Points d'attention |
|--------|-------------------|
| Définition des informations confidentielles | Trop large (tout = rien) vs trop étroite (omissions) |
| Exceptions | Domaine public, développement indépendant, obligation légale, accord écrit |
| Durée de l'obligation | 2-5 ans standard ; > 5 ans = contestable ; secrets d'affaires = illimitée tant que secret maintenu |
| Usage autorisé | Limité à l'évaluation du projet (pas d'exploitation commerciale) |
| Restitution / destruction | Obligation de restituer ou détruire à la fin des discussions |
| Clause residuals | Mémoire non écrite du personnel exposé — risque de vidage du NDA |
| PI générée | Sort des inventions/créations issues des discussions préliminaires |
| Juridiction | Loi applicable + tribunal compétent ou arbitrage |

### Contrat R&D collaborative

| Clause | Points d'attention |
|--------|-------------------|
| Background IP | PI apportée par chaque partie (description exhaustive) |
| Foreground IP | PI générée pendant le projet — attribution (copropriété / répartition par domaine / par contribution) |
| Sideground IP | PI développée en parallèle hors projet mais connexe |
| Accès et licences croisées | Licence sur background pour exploiter le foreground |
| Publication | Délai de revue avant publication scientifique (brevetabilité L.611-11 — nouveauté absolue) |
| Exploitation commerciale | Droits d'exploitation des résultats (exclusifs / partagés / par territoire) |
| Financement | Répartition des coûts de protection (dépôts, annuités) |
| Sortie / défaillance | Sort de la PI si un partenaire se retire ou fait faillite |

---

## Étape 3 — Vérification droit de la concurrence

### Règlement TTBER (UE 316/2014) — Accords de transfert de technologie

| Critère | Seuil | Effet |
|---------|-------|-------|
| Parts de marché combinées (concurrents) | ≤ 20% | Exemption par catégorie |
| Parts de marché de chaque partie (non-concurrents) | ≤ 30% | Exemption par catégorie |
| Au-delà des seuils | > 20%/30% | Analyse individuelle art. 101(3) TFUE |

### Clauses noires (restrictions caractérisées — jamais exemptées)

- Fixation de prix de revente (RPM)
- Limitation de production (sauf accord de licence)
- Répartition de marchés ou de clientèles entre concurrents
- Restriction de ventes passives

### Clauses grises (exclues de l'exemption mais pas nulles en soi)

- Grant-back exclusif sur perfectionnements du licencié
- Non-contestation de validité du titre (post-*Windsurfing* CJUE C-193/83)
- Restriction de R&D du licencié dans des domaines non couverts

---

## Étape 4 — Formalités d'opposabilité

| Droit | Formalité | Registre | Effet |
|-------|-----------|----------|-------|
| Brevet FR | Inscription au RNB (L.613-9) | INPI | Inopposable aux tiers si non inscrit |
| Brevet EP | Inscription au registre EP ou national selon validation | OEB / offices nationaux | Idem par pays |
| Marque FR | Inscription au RNM (L.714-7) | INPI | Inopposable aux tiers |
| Marque UE | Inscription au registre EUIPO (art. 22 RMUE) | EUIPO | Inopposable aux tiers |
| D&M FR | Inscription au registre D&M | INPI | Inopposable |
| Savoir-faire | Aucune inscription (pas de titre) | — | Protection contractuelle seule |

---

## Étape 5 — Format de sortie

### Mode `--draft` (rédaction)

```markdown
# Projet de contrat — [TYPE] — [PARTIES]

*Brouillon soumis à validation avocat. Ne constitue pas un acte définitif.*

## Préambule
[Contexte, motivations, rappel des droits PI concernés]

## Article 1 — Définitions
[Termes clés : PI concédée, Territoire, Produits contractuels, etc.]

## Article 2 — Objet
[Description précise des droits concédés/transférés]

## Article 3 — Territoire et durée
[Périmètre géographique + durée + renouvellement]

## Article 4 — Exclusivité
[Nature de la licence + réserves du concédant]

## Article 5 — Redevances et conditions financières
[Forfait / Running royalty / Minimum garanti / Échéances]

## Article 6 — Sous-licence
[Conditions + limitations]

## Article 7 — Perfectionnements
[Sort des améliorations + grant-back éventuel]

## Article 8 — Garanties du concédant
[Titularité, validité, non-contrefaçon de tiers]

## Article 9 — Obligations du licencié/preneur
[Exploitation effective, qualité, reporting, non-contestation]

## Article 10 — Confidentialité
[Obligations réciproques + durée post-contrat]

## Article 11 — Propriété intellectuelle générée
[Attribution PI nouvelle créée pendant l'exécution]

## Article 12 — Responsabilité et indemnisation
[Limitation, plafond, cas d'exclusion]

## Article 13 — Résiliation
[Cas de résiliation anticipée + sort des droits + stock]

## Article 14 — Formalités de publicité
[Inscription registres + frais]

## Article 15 — Droit applicable et règlement des litiges
[Loi applicable + juridiction ou arbitrage CCI/CMAP]

## Annexes
- Annexe 1 : Liste des titres PI concédés
- Annexe 2 : Territoire(s)
- Annexe 3 : Conditions financières détaillées
- Annexe 4 : Background IP (si R&D collaborative)
```

### Mode `--review` (revue)

```markdown
# Note de revue — [TYPE DE CONTRAT] — [PARTIES]

*Brouillon soumis à validation. Ne constitue pas un avis juridique.*

## 1. Synthèse
[Résumé du contrat en 5 lignes + qualification juridique]

## 2. Points forts
[Clauses favorables à notre client]

## 3. Points de vigilance
| # | Clause | Risque | Niveau | Recommandation |
|---|--------|--------|--------|----------------|
| 1 | [clause] | [risque identifié] | 🔴/🟡/🟢 | [modification proposée] |
| ... | ... | ... | ... | ... |

## 4. Clauses manquantes
[Clauses importantes absentes du projet]

## 5. Analyse droit de la concurrence
[TTBER applicable ? Clauses noires ? Clauses grises ?]

## 6. Formalités requises
[Inscriptions aux registres + délais]

## 7. Recommandations
[Négocier / Signer en l'état / Refuser — avec justification]
```

---

## Gate non-juriste

- [ ] Type de contrat correctement identifié et qualifié
- [ ] Objet PI précisément délimité (numéros de titre, revendications, classes)
- [ ] Exclusivité / territoire / durée clairement définis
- [ ] Conditions financières complètes (assiette redevance, échéances, minimum garanti)
- [ ] Vérification droit de la concurrence (TTBER si transfert techno)
- [ ] Formalités d'opposabilité identifiées (inscription registres)
- [ ] Clauses de résiliation et sort des droits post-contrat
- [ ] Loi applicable et juridiction/arbitrage
- [ ] En mode `--review` : risques cotés et recommandations actionables

---

## Emplacement des sorties

```
outputs/contrat-pi-<type>-<parties-slug>-YYYY-MM-DD.md
```

---

## Ce skill ne fait pas

- Signer ou exécuter le contrat (acte des parties)
- Rédiger les contrats droit d'auteur pur → utiliser `cession-droit-auteur` / `licence-droit-auteur`
- Reviser les clauses PI insérées dans des contrats commerciaux → utiliser `revue-clause-pi`
- Effectuer le due diligence PI complet → utiliser `audit-pi-ma`
- Gérer les inscriptions aux registres (acte INPI/EUIPO)
- Fournir un avis sur le droit de la concurrence au-delà du TTBER (renvoi vers spécialiste)
- Rédiger les contrats de travail (clause d'invention de salarié L.611-7)

---

## Ton

Technique, structuré, équilibré. Identifier clairement la position de chaque partie. Signaler systématiquement les risques antitrust (TTBER). Rappeler les formalités d'opposabilité. Toujours indiquer que le projet nécessite validation par un avocat avant signature.
