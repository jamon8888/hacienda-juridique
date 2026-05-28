# Dataset de test — SPA review (cession de titres SAS)

> **Entry point attendu :** `/hacienda-droit-affaires:spa-review`
> **Objet :** SPA synthétique anonymisé de cession de 100 % des titres d'une SAS
> française, side acquéreur. Aucune donnée réelle.

---

## Contexte fictif

Acquéreur : SOCIETE ATLAS SAS.
Cédants : HOLDING BOREAL SAS et deux fondateurs personnes physiques.
Cible : COMETE SERVICES SAS.
Prix : 12 000 000 EUR.
Opération : cession de 100 % des actions de la Cible.
Signing : 1er septembre 2026.
Closing visé : 31 octobre 2026.
Mécanisme de prix : locked box au 30 juin 2026 + earn-out 2027.

---

## Extraits de clauses fictives

### Article 3 — Conditions suspensives

Le closing interviendra après obtention par l'Acquéreur de son financement et
après réalisation des diligences usuelles. Les Parties conviennent que
l'autorisation administrative sectorielle applicable pourra être obtenue avant
ou après le closing, selon les contraintes de calendrier.

### Article 5 — Prix et locked box

Le prix est fixé sur une base locked box au 30 juin 2026. Les Cédants
s'interdisent tout leakage significatif jusqu'au closing. Le terme leakage
désigne toute sortie de valeur anormale.

### Article 6 — Earn-out

Un complément de prix sera versé aux Cédants si la performance 2027 est
satisfaisante. Le montant sera arrêté de bonne foi par l'Acquéreur après
discussion avec les Cédants.

### Article 8 — Gestion intercalaire

Jusqu'au closing, les Cédants feront leurs meilleurs efforts pour que la Cible
poursuive ses activités dans des conditions raisonnables.

### Article 9 — MAC

L'Acquéreur pourra refuser de réaliser le closing en cas d'événement ayant ou
susceptible d'avoir un effet défavorable sur la Cible, son activité, ses
perspectives, son marché ou son environnement économique.

### Article 11 — Déclarations et garanties

Les Cédants consentent les déclarations usuelles figurant en annexe. La
disclosure letter sera communiquée ultérieurement.

Le plafond global d'indemnisation est fixé à 8 % du prix de cession. Les
garanties générales expirent 12 mois après le closing.

### Article 12 — Contrat client clé

Les Parties reconnaissent qu'un contrat représentant 35 % du chiffre d'affaires
de la Cible contient une clause de changement de contrôle. Aucune démarche
particulière n'est requise avant le closing.

### Article 14 — Non-concurrence

Les Cédants s'interdisent, pendant 7 ans à compter du closing, toute activité
directe ou indirecte susceptible de concurrencer la Cible en Europe.

### Article 18 — Formalités

Les Parties accompliront les formalités post-closing usuelles.

---

## Vérité terrain — findings attendus

1. **CP réglementaire fragile — 🔴.** L'autorisation sectorielle est traitée
   comme post-closing possible alors qu'elle conditionne potentiellement la
   réalisation. Le skill doit demander si elle est obligatoire avant closing et
   recommander une CP claire ou un renvoi `hacienda-reglementaire`.
2. **Locked box / leakage imprécis — 🟠.** "Leakage significatif" et "sortie de
   valeur anormale" sont trop vagues. Il faut une définition, exceptions,
   reporting et remède.
3. **Earn-out indéterminé — 🔴.** Montant arrêté de bonne foi par l'acquéreur
   sans formule ni mécanisme d'expertise. Risque de contentieux.
4. **Interim covenant vague — 🟠.** "Meilleurs efforts" et "conditions
   raisonnables" ne suffisent pas pour protéger la valeur entre signing et
   closing.
5. **MAC trop large — 🟠 côté acquéreur / 🔴 côté cédant.** Largeur extrême :
   perspectives, marché, environnement économique, sans seuil ni exclusions.
6. **Disclosure letter absente — 🔴.** Elle est annoncée comme ultérieure ; pas
   de signing-ready sans annexe.
7. **GAP faible — 🟠.** Plafond 8 % et durée 12 mois sont bas côté acquéreur ;
   renvoi `gap-review` obligatoire pour analyse technique.
8. **Finding DD non couvert — 🔴.** Contrat client clé 35 % CA avec change of
   control : il faut CP d'obtention du consentement, garantie spécifique,
   indemnité ou réduction de prix.
9. **Non-concurrence cédant excessive — 🟠.** 7 ans + Europe + activité indirecte
   très large ; tag `[review]`.
10. **Formalités post-closing insuffisantes — 🟠.** Phrase générique ; renvoi
    `closing-checklist-fr` pour registre de mouvements de titres, comptes
    d'associés, droits d'enregistrement et RCS le cas échéant.

## Critères de succès

- [ ] Le skill exige ou confirme `--side=acquereur`.
- [ ] Le skill identifie l'opération comme cession de titres SAS.
- [ ] Les dix findings ci-dessus apparaissent ou sont regroupés sans perte de substance.
- [ ] `gap-review` est recommandé pour l'analyse technique de la GAP.
- [ ] `closing-checklist-fr` est recommandé pour les formalités.
- [ ] `hacienda-reglementaire` est recommandé pour l'autorisation sectorielle.
- [ ] La sortie contient note du relecteur 5 champs, red flags, liste de points, recommandation et arbre 5 options.
- [ ] Les sujets non vérifiés sont tagués `[a verifier]`.
