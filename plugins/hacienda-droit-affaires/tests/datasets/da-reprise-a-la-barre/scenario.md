# Scénario blind — Reprise à la barre (candidat-repreneur sur entreprise en procédure)

> **INPUT BLIND UNIQUEMENT.** Ce fichier ne contient que les faits fictifs.
> Le corrigé attendu et les criteria sont dans `ground-truth.md` (NE PAS ouvrir
> en Phase 3). Aucune donnée réelle — parties, montants et chiffres fictifs.
>
> **Entry point :** `/h-da:reprise-a-la-barre ./faits.md`
> **Side :** candidat-repreneur (conseil de l'entité qui veut racheter).

---

## Faits fictifs

```
Société cible (fictive) :

- Cible : MÉRIDIAN OUTILLAGE SAS, fabrication d'outillage de coupe et de
  consommables pour l'usinage, France métropolitaine, environ 130 salariés,
  CA ~ 31 M EUR en recul de 25 % sur deux exercices. Deux sites : une usine en
  propriété (terrain + bâtiment) et un dépôt logistique loué.
- La société a été placée en redressement judiciaire il y a 5 semaines par le
  tribunal de commerce. Un administrateur judiciaire a été désigné. Une période
  d'observation est en cours.
- L'administrateur a fait savoir, dans une annonce et auprès des candidats
  pressentis, qu'il recherche un repreneur. Les offres doivent être déposées
  au plus tard le 3 juillet 2026 ; une audience est annoncée dans la foulée.

Client (notre conseil l'assiste) :

- Notre client est TRANCHANT INDUSTRIES SAS, un concurrent direct de la cible
  sur le marché des consommables d'usinage, adossé à un fonds (DELTA CROISSANCE)
  qui financerait l'opération. Le fonds est très intéressé par le fichier
  clients de MÉRIDIAN (grands comptes aéronautique) et par sa marque historique.
- À ce stade, notre client n'a transmis à l'administrateur qu'une lettre
  d'intention de deux pages, indicative, indiquant une « fourchette de prix »
  et la volonté de « poursuivre les discussions ». Aucun document chiffré
  détaillé, pas de plan de reprise, pas de liste de salariés ni de contrats
  visés n'a encore été remis.

Liens et montage évoqués par le client :

- L'ancien dirigeant et fondateur de MÉRIDIAN, M. V, n'est plus aux commandes
  depuis l'ouverture de la procédure. Le directeur commercial de notre client,
  TRANCHANT, est le beau-frère de M. V ; les deux familles se connaissent bien
  et M. V « pourrait aider à la transition » selon notre client.
- Pour « aller plus vite », le fonds DELTA CROISSANCE envisage de faire porter
  l'offre non pas par TRANCHANT INDUSTRIES directement mais par une société
  nouvelle (NEWCO), constituée pour l'occasion, dont une partie du capital
  pourrait être souscrite par un véhicule dans lequel M. V détiendrait une
  participation minoritaire. Rien n'est encore arrêté.

Concurrence sur le dossier :

- Un autre candidat, GROUPE FERRO, équipementier plus généraliste, a déjà
  déposé une offre auprès de l'administrateur. Son montant et son contenu ne
  sont pas connus de notre client, mais la rumeur du dépôt circule.

Actifs, sûretés et contrats :

- La banque historique de MÉRIDIAN bénéficie d'un nantissement sur le fonds de
  commerce. Un fournisseur de matières premières détient un gage sur un stock
  de carbure.
- Les actifs que notre client juge réellement stratégiques sont la marque
  « MÉRIDIAN », le fichier clients aéronautique et une licence d'exploitation
  d'un procédé de revêtement concédée à MÉRIDIAN par un tiers. Le client se
  demande à voix haute « si on est obligés de tout reprendre, ou si on peut
  ne prendre que la marque, le fichier et la licence, et laisser le reste ».
- Contrats clés que notre client voudrait conserver : le bail commercial du
  dépôt logistique, la licence de revêtement précitée, et un contrat-cadre
  d'approvisionnement avec un fournisseur d'acier. Le client ignore si ces
  contrats peuvent « suivre » automatiquement ou s'il faut l'accord des tiers.
- La cible dispose d'un CSE (130 salariés). Notre client envisage de ne
  reprendre qu'une partie des effectifs (environ 80 postes) et s'interroge sur
  le sort des autres salariés et sur ce qu'il doit dire, et quand.

Date d'aujourd'hui (cadre du travail) : 11 juin 2026.
```

---

## Ce que demande le client

1. Comment **maximiser nos chances** de l'emporter face à GROUPE FERRO, sachant
   qu'on n'a transmis qu'une lettre d'intention pour l'instant ?
2. Y a-t-il des **risques** liés au lien familial avec M. V et au montage via
   une NEWCO qu'il faille traiter avant de s'engager ?
3. Peut-on **se limiter aux seuls actifs** qui nous intéressent (marque, fichier
   clients, licence), et que deviennent les sûretés, les contrats et les
   salariés qu'on ne reprend pas ?

---

*Cadre : reprise à la barre, `--side=repreneur` ; sortie attendue dans* `live-output.md`.
*(Le code de cycle est généré au moment du scoring, hors de ce fichier blind.)*
