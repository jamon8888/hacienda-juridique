# Dataset de test V1.1 — Checklist de closing (cession de titres de SAS)

> **Entry point attendu :** `/hacienda-droit-affaires:closing-checklist-fr`
> **Objet :** scénario synthétique anonymisé d'une cession de 100 % des titres
> d'une SAS, comportant deux conditions suspensives et un volet post-closing.
> Aucune donnée réelle — sociétés, personnes, montants et dates sont fictifs.

---

## Scénario fictif

```
PROJET DE CESSION DE TITRES — SCÉNARIO DE TRAVAIL

Opération :  cession de 100 % des titres de la société NOVA SYSTÈMES SAS
             (la « Cible »), société par actions simplifiée au capital de
             50 000 euros, divisé en 5 000 actions.

Parties :    M. DELTA et Mme GAMMA, les « Cédants », associés de la Cible.
             SOCIÉTÉ PHÉNIX SAS, l'« Acquéreur ».

Prix :       2 400 000 euros, payables à 100 % au closing.

Calendrier : SPA signé le 1er juin 2026 (signing).
             Closing visé au 30 septembre 2026.

CONDITIONS SUSPENSIVES (article 8 du SPA)

CP n° 1 — Agrément du conseil.
Les statuts de la Cible comportent une clause d'agrément : toute cession
d'actions à un tiers est soumise à l'agrément préalable du conseil de la
société. La cession au profit de l'Acquéreur est donc subordonnée à
l'obtention de cet agrément. À la date du signing, la demande d'agrément a
été déposée mais n'a pas encore été examinée par le conseil.
Statut : en cours.

CP n° 2 — Obtention d'un financement par l'Acquéreur.
La réalisation de l'opération suppose l'obtention par l'Acquéreur d'un
financement bancaire à hauteur de 1 800 000 euros. À la date du signing,
l'Acquéreur a déposé un dossier auprès de son établissement bancaire ;
l'accord de financement n'a pas encore été délivré.
Statut : à lever.

ACTES PRÉVUS AU CLOSING (article 11 du SPA)

Le jour du closing, les parties prévoient de signer : les ordres de
mouvement de titres au profit de l'Acquéreur, la constatation de la levée
des deux conditions suspensives, la quittance de prix, ainsi que les actes
de démission des dirigeants en place et de nomination des nouveaux
dirigeants.

POST-CLOSING (article 12 du SPA)

L'article 12 prévoit que, après la réalisation, la société procédera aux
formalités nécessaires et que la cession sera enregistrée auprès du service
des impôts compétent. Le SPA ne détaille pas davantage ces formalités.
```

---

## Vérité terrain — éléments attendus dans la checklist

La checklist doit être rendue en **4 volets sous forme de tableaux** :
conditions suspensives, séquençage signing / closing, documentation de
closing, formalités post-closing.

### Volet 1 — Conditions suspensives

- [ ] **CP n° 1 — Agrément du conseil** recensée : statut `en cours`,
      responsable = la Cible / les Cédants (faire approuver par l'organe
      compétent), échéance = avant le closing du 30 septembre 2026. La clause
      d'agrément statutaire d'une SAS relève de l'art. L.227-14 C.com. —
      présent dans l'index avec un LEGIARTI réel → tag `[Légifrance]` attendu.
- [ ] **CP n° 2 — Financement de l'Acquéreur** recensée : statut `à lever`,
      responsable = l'Acquéreur, échéance = avant le closing. Point de
      vigilance : une CP de financement dépend pour partie de la volonté de la
      partie bénéficiaire — vérifier qu'elle n'est pas rédigée de façon
      potestative `[review]`.
- [ ] Mention explicite qu'**aucun closing ne peut intervenir tant qu'une CP
      demeure pendante**, sauf renonciation expresse par la partie bénéficiaire.
- [ ] Chaque CP porte un **statut**, un **responsable** et une **échéance**.

### Volet 2 — Séquençage signing / closing

- [ ] **Distinction signing / closing explicite** : signing = 1er juin 2026
      (signature du SPA) ; closing = 30 septembre 2026 (réalisation, transfert
      des titres, paiement du prix) ; période intercalaire entre les deux,
      consacrée à la levée des CP.
- [ ] Les **actes à signer le jour du closing** sont identifiés : ordres de
      mouvement de titres, constatation de la levée des CP, quittance de prix,
      démission et nomination des dirigeants.
- [ ] L'ordre place la levée des deux CP **avant** la réunion de closing.

### Volet 3 — Documentation de closing

- [ ] Documents listés : ordres de mouvement de titres signés par les Cédants,
      décision d'agrément du conseil (preuve de levée CP n° 1), lettre / accord
      de financement bancaire (preuve de levée CP n° 2), quittance de prix,
      actes de démission et de nomination des dirigeants, registre de
      mouvements de titres et comptes d'associés à jour, statuts à jour.
- [ ] Toute pièce non encore disponible est signalée comme **à produire**,
      jamais omise silencieusement.

### Volet 4 — Formalités post-closing — CONTRÔLE CENTRAL DU TEST

- [ ] **Inscription au registre de mouvements de titres + mise à jour des
      comptes d'associés** figure explicitement dans le volet post-closing. Le
      skill doit indiquer que **c'est cette inscription — et non le seul acte
      de cession — qui rend le transfert des actions opposable** à la société
      et aux tiers. Responsable : la Cible (ou son mandataire). Échéance : sans
      délai après le closing. Omission → risque d'inopposabilité de la cession
      `[review]`.
- [ ] **Enregistrement de la cession — droits d'enregistrement** figure
      explicitement dans le volet post-closing : la cession de droits sociaux
      est soumise à une **formalité d'enregistrement** assortie d'un **délai
      propre**, dont le dépassement expose à une **pénalité fiscale**. Un
      formulaire CERFA est déposé.
- [ ] **Le taux des droits d'enregistrement n'est PAS chiffré.** Il est tagué
      `[a verifier]` et renvoyé à l'expert-comptable ou au plugin
      `hacienda-fiscal`. Le skill rappelle la formalité et le délai, jamais le
      taux comme une certitude.
- [ ] **Information des tiers** présente : cocontractants liés par une clause
      de changement de contrôle, organes sociaux, salariés selon le cas (renvoi
      `hacienda-social` pour l'information-consultation, sans l'instruire).
- [ ] Le cas échéant, dépôt au greffe des actes modificatifs si la cession
      s'accompagne d'une modification statutaire (changement de dirigeant).

### Vérification de structure de la sortie

- [ ] **Note du relecteur** : 5 champs, libellés EN GRAS — **Sources** /
      **Lecture** / **Signalé pour ton jugement** / **Fraîcheur** /
      **Avant de t'appuyer dessus**.
- [ ] Les **4 volets** (CP / séquençage / documentation / post-closing) sont
      présents sous forme de **tableaux** avec statut et responsable.
- [ ] **Arbre de décision** : exactement **5 options**, l'option 4 =
      « **Surveiller et attendre** ».
- [ ] **Footer A** (rappel PII) présent sous forme de **lien Markdown** si
      `check-pii` passe en mode passif sous le seuil B.
- [ ] **Tags de provenance sans backticks** dans les cellules de tableau,
      placés **après** la citation (backticks admis dans le corps narratif).
- [ ] En-tête de confidentialité adapté au rôle de l'utilisateur (CLAUDE.md §2).

### Faux comportements à NE PAS observer

- ❌ Omettre l'inscription au registre de mouvements de titres dans le volet
  post-closing, ou la traiter comme une simple formalité accessoire.
- ❌ Présenter le seul acte de cession comme suffisant à rendre le transfert
  des actions opposable, sans mentionner l'inscription au registre.
- ❌ Chiffrer un taux de droits d'enregistrement comme une certitude au lieu de
  le taguer `[a verifier]` et de renvoyer à l'expert-comptable / `hacienda-fiscal`.
- ❌ Omettre la formalité d'enregistrement ou son délai propre dans le
  post-closing.
- ❌ Confondre signing et closing, ou ne pas identifier les actes à signer le
  jour du closing.
- ❌ Citer l'art. L.227-14 C.com. sans le tag `[a verifier]` (en `[a compléter]`
  dans l'index).
- ❌ Donner un conseil fiscal détaillé sur le régime des plus-values ou
  l'assiette des droits.
- ❌ Arbre de décision avec un nombre d'options différent de 5, ou option 4
  ≠ « Surveiller et attendre ».
- ❌ Note du relecteur dont les 5 champs ne sont pas en gras.
- ❌ Backticks autour des tags de provenance dans les cellules de tableau.
