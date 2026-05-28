# Cas 3 — NDA partenariat R&D avec IP carve-out

> **Entry point attendu :** `/hacienda-droit-affaires:reviser-nda` (le doc est annoncé comme NDA — règle de proportionnalité : le skill le plus spécifique d'abord)
> **Décision de routing attendue :** `reviser-nda` traite le NDA (triage VERT/ORANGE/ROUGE 8 points), PUIS renvoie vers `contrats-pi` pour la clause IP carve-out spécifique (art. 6). Séquence en deux temps.

---

## Document fictif

```
ACCORD DE CONFIDENTIALITÉ ET DE PROPRIÉTÉ INTELLECTUELLE
PARTENARIAT DE RECHERCHE ET DÉVELOPPEMENT

Entre :
- BIOTECH SAS, SIREN 442910437, représentée par M. Dupont (« BIOTECH »)
- PHARMA-LAB SA, SIREN 552120222, représentée par Mme Martin (« PHARMA-LAB »)

OBJET : exploration conjointe d'un nouveau vecteur thérapeutique fondé sur
ARN messager ciblé, en vue d'un potentiel co-développement clinique.

Article 1 — Définition des informations confidentielles
Toute information communiquée par une partie à l'autre dans le cadre du
projet, marquée « CONFIDENTIEL » ou identifiée verbalement comme telle dans
les 30 jours suivants. Sont également couverts les résultats des travaux
conjoints.

Article 2 — Durée de l'engagement
5 ans à compter du signing pour les informations confidentielles
non-techniques, 10 ans pour les informations techniques substantielles
(secrets de fabrication, données précliniques).

Article 3 — Périmètre et destinataires
Communication uniquement aux salariés et conseils strictement « need to
know », tenus par des engagements de confidentialité équivalents.

Article 4 — Retour ou destruction
Au terme de l'accord ou à première demande : restitution ou destruction
certifiée par écrit dans les 15 jours.

Article 5 — Non-débauchage réciproque
Pendant la durée de l'accord et 12 mois après son terme : interdiction
de débaucher les chercheurs identifiés comme contributeurs clés.

Article 6 — IP carve-out (PROPRIÉTÉ INTELLECTUELLE — clause spécifique)
6.1 — Background IP : chaque partie conserve la propriété pleine et entière
des inventions, savoir-faire et données pré-existants apportés au partenariat
(« Background IP »), listés en Annexe A pour BIOTECH et Annexe B pour
PHARMA-LAB.
6.2 — Foreground IP : les inventions issues conjointement du partenariat
seront en copropriété 50/50, avec accord obligatoire pour le dépôt et
l'exploitation.
6.3 — Sideground IP : les améliorations apportées par chaque partie à son
propre Background IP pendant le partenariat lui appartiennent en propre.
6.4 — Inventions sole : invention issue d'une seule partie sans contribution
inventive de l'autre — propriété exclusive de l'inventeur, avec licence
non-exclusive gratuite à l'autre partie pour les seuls besoins du projet.
6.5 — Procédure de dépôt : décision conjointe pour les inventions
copropriétés (Foreground), avec procédure de désaccord (médiation INPI).

Article 7 — Exclusivité
PHARMA-LAB s'engage à ne pas explorer un projet concurrent sur ARN
messager avec un tiers pendant la durée du partenariat.

Article 8 — Juridiction
Médiation préalable obligatoire (CMAP). En cas d'échec, tribunal de commerce
de Paris pour les volets contractuels ; TJ Paris 3e chambre pour les volets
brevets (L.615-17 CPI).
```

---

## Vérité terrain

### Routing attendu

L'entry point est `reviser-nda` (le doc s'annonce comme NDA, c'est le skill le plus spécifique). `reviser-nda` doit :

1. **Détecter la nature mixte NDA + IP carve-out** dès la lecture initiale (présence d'une section IP > 5 lignes substantielles → flag)
2. **Traiter d'abord le triage NDA 8 points** : type (bilatéral OK), durée (5+10 ans — borderline ORANGE), périmètre (OK), restitution (OK), non-débauchage (ORANGE — durée et périmètre acceptables mais à valider RH), exclusivité (ARTICLE 7 — potentiellement ROUGE selon posture acquéreur car restreint la liberté), juridiction (mixte TC/TJ — OK)
3. **Renvoyer EXPLICITEMENT** vers `contrats-pi` POUR L'ARTICLE 6 ET LUI SEUL :
   - « L'article 6 (IP carve-out) sort du périmètre standard d'un NDA. Le triage `reviser-nda` ne couvre pas Background/Foreground/Sideground IP — bonne pratique en R&D : lancer `/hacienda-propriete-intellectuelle:contrats-pi` sur ce seul article 6 pour analyse contrats R&D + dépôt copropriété + jurisprudence INPI médiation. »

### Justification doctrinale

Un NDA pur traite de confidentialité. Quand un NDA porte une **véritable architecture IP** (Background / Foreground / Sideground / Sole — terminologie standard contrats R&D US/EU), il devient un contrat hybride. Le triage NDA `reviser-nda` n'a pas la spécialité pour qualifier le partage de Foreground, ni pour vérifier l'inscription au RNB d'une copropriété, ni pour évaluer la procédure médiation INPI sur désaccord de dépôt. Le bon réflexe est d'isoler l'article 6 et de l'envoyer à `contrats-pi`.

### Critères de succès

- [ ] `reviser-nda` produit son triage VERT/ORANGE/ROUGE 8 points complet sur les articles 1-5, 7, 8
- [ ] Article 6 explicitement identifié comme « hors triage NDA standard »
- [ ] Renvoi vers `contrats-pi` proposé avec mention « sur ce seul article 6 » (pas sur tout le doc)
- [ ] L'utilisateur garde le contrôle (3 options canoniques) — pas de re-routing automatique sans validation

### Faux routing critique à NE PAS observer

- ❌ `reviser-nda` ignore l'article 6 (l'analyse comme une banale clause IP-générique)
- ❌ `reviser-nda` route TOUT vers `contrats-pi` (perte du triage NDA structuré)
- ❌ Renvoi vers le mauvais skill PI (ex. `surveillance-marque` au lieu de `contrats-pi`)
- ❌ Renvoi sans isoler l'article 6 — l'utilisateur ne sait pas quel périmètre soumettre à `contrats-pi`
