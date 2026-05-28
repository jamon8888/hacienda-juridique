# Cas 4 — Cession de fonds de commerce incluant la marque de l'enseigne

> **Entry point attendu :** `/hacienda-droit-affaires:reviser-contrat`
> **Décision de routing attendue :** `reviser-contrat` traite le coeur (cession fonds = matière commerciale L.141+ C.com.) + renvoi PONCTUEL `contrats-pi` UNIQUEMENT pour la clause de cession de la marque. Cas inversé du cas 1.

---

## Document fictif

```
ACTE DE CESSION DE FONDS DE COMMERCE

Entre :
- CÉDANT : RESTAUR'EN-VILLE EURL, SIREN 442910437, M. Dupont gérant unique,
  exploitant un fonds de commerce de restauration à l'enseigne « LE
  POTAGER URBAIN » situé 12 rue de la Pépinière, 75008 Paris.
- CESSIONNAIRE : NOUVELLE-TABLE SAS, SIREN 552120222, présidente
  Mme Martin.

PRIX : 850 000 EUR, dont :
- Éléments incorporels (clientèle, enseigne, marque, droit au bail) :
  720 000 EUR
- Matériel et mobilier d'exploitation : 130 000 EUR

Article 1 — Éléments corporels cédés
Matériel de cuisine professionnelle, mobilier salle (50 couverts),
agencements, conformément à l'inventaire en Annexe 1.

Article 2 — Éléments incorporels cédés
- Clientèle et achalandage
- Enseigne « LE POTAGER URBAIN » (façade, devanture, signalétique)
- Marque française verbale « LE POTAGER URBAIN » n° INPI 4 567 890,
  déposée le 14 mars 2021, classes 43 (restauration), 35 (publicité)
- Numéro de téléphone professionnel + nom de domaine lepotagerurbain.fr
- Droit au bail commercial du 1er janvier 2019 (durée 9 ans, L.145-4 C.com.)
- Licence IV exploitation débits de boissons

Article 3 — Cession de la marque
La marque française INPI 4 567 890 est cédée pleinement au CESSIONNAIRE.
Le CÉDANT s'engage à signer l'acte d'inscription au Registre National des
Marques (RNM) dans les 15 jours du closing, condition d'opposabilité aux
tiers (L.714-7 CPI). Frais d'inscription à la charge du CESSIONNAIRE.

Article 4 — Déclarations du CÉDANT
Le CÉDANT déclare :
- Que le fonds est libre de tout privilège et nantissement (vérification
  Greffe TC Paris)
- Que la marque INPI 4 567 890 est sa propriété pleine et entière, non
  contestée, non opposée, non concédée en licence à un tiers
- Que le bail commercial est en cours et qu'aucune procédure de résiliation
  ou de refus de renouvellement n'a été initiée

Article 5 — Garantie d'éviction
Garantie d'éviction conforme art. 1626 C.civ. Le CÉDANT garantit
spécifiquement contre toute revendication par un tiers de droits PI sur
la marque ou l'enseigne, pendant 3 ans.

Article 6 — Non-concurrence cédant
Le CÉDANT s'engage à ne pas exploiter, directement ou indirectement, un
fonds de commerce de restauration à enseigne similaire dans un rayon de
2 km du fonds cédé, pendant 5 ans, en contrepartie de 80 000 EUR inclus
dans le prix.

Article 7 — Séquestre du prix
Le prix est consigné CARPA Paris pendant 5 mois et 5 jours (L.141-14
C.com., publicité des cessions de fonds de commerce + opposition créanciers).

Article 8 — Juridiction
Tribunal de commerce de Paris.
```

---

## Vérité terrain

### Routing attendu

`reviser-contrat` doit identifier :
- **Matière dominante = cession de fonds de commerce** (L.141+ C.com., séquestre 5 mois et 5 jours, opposition créanciers, etc.)
- **Termes PI présents mais accessoires** : marque (1 actif sur N), inscription RNM, L.714-7 CPI, garantie éviction PI
- → Détection : matière dominante NON PI, mais **clause article 3 (cession de marque) appelle une vérification PI ponctuelle**

Routing attendu :
- `reviser-contrat` produit la revue commerciale **complète** (clauses 1, 2, 4, 5, 6, 7, 8)
- Pour l'article 3 : note dédiée renvoyant vers `contrats-pi` avec mention : « La cession de marque article 3 mérite vérification spécifique : recherche d'antériorités INPI pour confirmer disponibilité, vérification absence de licence concédée non déclarée, contrôle classes 35/43 et leur usage effectif (déchéance pour défaut d'usage L.714-5 CPI). Lancer `/hacienda-propriete-intellectuelle:contrats-pi` sur ce seul article 3 si besoin. »

### Justification doctrinale

La cession d'un fonds de commerce est régie par le **droit commercial** (L.141-1 à L.141-22 C.com.) — séquestre, publicité, opposition créanciers, déclarations du cédant, garantie d'éviction. La marque y est **un actif parmi d'autres** (au même titre que la clientèle, le matériel, le droit au bail). Renvoyer 100 % vers `contrats-pi` serait absurde : le skill PI ne sait pas calculer le délai de séquestre L.141-14, ni gérer la publicité légale.

Mais l'inscription au RNM (L.714-7 CPI), la vérification que la marque est libre de licence, et le contrôle de l'usage effectif (déchéance L.714-5) sont des vérifications PI spécifiques que `reviser-contrat` ne sait pas approfondir. D'où le renvoi **ponctuel** sur le seul article 3.

### Critères de succès

- [ ] `reviser-contrat` produit sa revue commerciale standard (note relecteur 5 champs, en-tête confidentialité, liste de points)
- [ ] Article 3 traité avec mention « cession PI ponctuelle — renvoi `contrats-pi` recommandé pour vérifications spécifiques »
- [ ] Article 5 (garantie d'éviction PI) bien lié à l'article 3 (cohérence interne)
- [ ] Article 6 (non-concurrence cédant) traité commercialement : contrepartie 80 000 EUR identifiée, durée 5 ans + rayon 2 km validés contre playbook
- [ ] Article 7 (séquestre L.141-14) correctement identifié (5 mois et 5 jours, opposition créanciers)
- [ ] **PAS** de renvoi 100 % `contrats-pi` (la cession de fonds n'est pas PI-centric)

### Faux routing critique à NE PAS observer

- ❌ `reviser-contrat` route 100 % vers `contrats-pi` (manque la matière cession de fonds)
- ❌ `reviser-contrat` ignore complètement le volet PI (pas de mention RNM ni de renvoi ponctuel pour article 3)
- ❌ Aucune mention de L.141-14 (séquestre 5 mois et 5 jours) — bug commercial majeur
