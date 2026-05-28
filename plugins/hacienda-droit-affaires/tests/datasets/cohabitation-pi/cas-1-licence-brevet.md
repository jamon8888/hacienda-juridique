# Cas 1 — Licence d'exploitation de brevet pure

> **Entry point attendu :** `/hacienda-droit-affaires:reviser-contrat`
> **Décision de routing attendue :** Route 100 % → `/hacienda-propriete-intellectuelle:contrats-pi`. Pas de revue commerciale par `reviser-contrat`.

---

## Document fictif

```
CONTRAT DE LICENCE D'EXPLOITATION DE BREVET

Entre :
- LICENCIEUR : INVENTECH SAS, SIREN 442910437, représentée par M. Dupont,
  titulaire du brevet français n° FR 21 12345 délivré le 14 mars 2023
  (procédé d'extraction électrochimique de métaux rares).
- LICENCIÉ : INDUS-MINING SA, SIREN 552120222, représentée par Mme Martin.

Article 1 — Objet
Le LICENCIEUR concède au LICENCIÉ une licence d'exploitation NON EXCLUSIVE
du brevet français n° FR 21 12345 ainsi que des perfectionnements brevetés
ultérieurement.

Article 2 — Périmètre des revendications licenciées
La licence couvre les revendications 1, 4 et 7 du brevet. Les revendications
2, 3, 5, 6 sont expressément exclues.

Article 3 — Territoire
France métropolitaine + Polynésie française uniquement.

Article 4 — Sous-licence et cession
Interdiction de sous-licence sans accord écrit du LICENCIEUR. Cession soumise
à droit de préemption du LICENCIEUR.

Article 5 — Redevances
Royalties forfaitaires de 25 000 EUR par an + redevance proportionnelle de
3,5 % du chiffre d'affaires net réalisé sur produits couverts. Audit annuel
par expert-comptable indépendant.

Article 6 — Inscription au RNB
Le LICENCIEUR procèdera à l'inscription de la présente licence au Registre
National des Brevets (RNB) dans les 30 jours du signing.

Article 7 — Garantie d'éviction et garantie de validité du brevet
Le LICENCIEUR garantit la jouissance paisible mais ne garantit PAS la validité
du brevet face à une action en nullité.

Article 8 — Durée
20 ans à compter du signing ou expiration du brevet, la première des dates.

Article 9 — Juridiction
Tribunal judiciaire de Paris, compétent exclusif (L.615-17 CPI).
```

---

## Vérité terrain

### Routing attendu

`reviser-contrat` doit détecter :
- **Termes dominants** : « brevet », « revendications », « RNB », « licence exclusive » (et son contraire), « L.615-17 CPI »
- → Test PI-centric POSITIF (≥ 3 termes dominants PI)
- → **Renvoi vers `contrats-pi`** avec les 3 options canoniques :
  1. (a) lancer `/hacienda-propriete-intellectuelle:contrats-pi` à la place
  2. (b) limiter `reviser-contrat` aux clauses commerciales (paiement, audit, juridiction)
  3. (c) faire les deux en séquence

### Justification doctrinale

Un contrat de licence de brevet relève du droit spécial PI (CPI L.611+ pour les brevets, L.613-8 pour les licences). Le coeur du contrat — périmètre des revendications licenciées, exclusivité/non-exclusivité, inscription RNB pour opposabilité aux tiers — est PI. Les clauses commerciales (paiement, juridiction) sont des **clauses accessoires** dont l'analyse autonome n'a pas de sens praticien.

Le bon comportement de `reviser-contrat` est donc de **proposer** le renvoi mais de **laisser l'utilisateur trancher** (les 3 options canoniques). Refuser tout traitement serait sur-rigide ; traiter à fond serait sous-spécialisé.

### Critères de succès

- [ ] `reviser-contrat` détecte le caractère PI-centric et le **dit explicitement** dans sa réponse
- [ ] Les 3 options sont proposées textuellement (a/b/c)
- [ ] Le renvoi cite le bon skill : `/hacienda-propriete-intellectuelle:contrats-pi`
- [ ] **Aucune analyse clause par clause** n'est produite avant que l'utilisateur ait choisi
- [ ] La justification du renvoi mentionne au minimum 2 termes dominants PI détectés

### Faux routing critique à NE PAS observer

- ❌ `reviser-contrat` produit une revue complète clause par clause sans mentionner le renvoi PI
- ❌ Renvoi vers le mauvais skill (ex. `surveillance-marque` au lieu de `contrats-pi`)
- ❌ Renvoi sans options — décision tranchée unilatéralement
