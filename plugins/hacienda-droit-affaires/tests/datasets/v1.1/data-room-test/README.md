# Dataset de test — data-room-test

Data-room synthétique pour le skill `due-diligence-dataroom` (V1.1, cluster
M&A deal-lifecycle). **Toutes les données sont fictives** — aucune donnée
réelle, aucune personne, société, SIREN ou montant authentique.

Cible fictive : **NÉBULA TECH SAS**, opération de cession de titres, side test
recommandé `--side=acquereur`.

---

## Documents du dossier

| Fichier | Thème DD | Rôle dans le test |
|---|---|---|
| `01-statuts-cible.md` | 1 — Corporate | Statuts SAS ; clause d'agrément ; statuts non à jour après augmentation de capital |
| `02-pv-ag-2023.md` | 1 — Corporate | PV d'AG mixte 2023 (augmentation de capital) ; PV 2022 et PV d'organes manquants |
| `03-contrat-client-alpha.md` | 2 — Contrats | Contrat client clé (35 % du CA) **avec clause de changement de contrôle** |
| `04-contrat-client-beta.md` | 2 — Contrats | Contrat client de comparaison, sans clause de changement de contrôle |
| `05-note-litige-en-cours.md` | 6 — Contentieux / 3 — Social | Litige prud'homal en cours non provisionné ; réclamation commerciale |
| `06-registre-traitements-rgpd.md` | 7 — RGPD | Registre des traitements incomplet (brouillon, champs vides, traitements manquants) |

Thèmes représentés : 1 (Corporate), 2 (Contrats), 3 (Social — via le litige
prud'homal), 6 (Contentieux), 7 (RGPD). Thèmes 4 (PI) et 5 (Fiscal) **non
représentés** : le rapport doit les traiter comme « documents manquants » /
non audités faute de pièces.

---

## Findings attendus par thème

### Thème 1 — Corporate / Gouvernance

- 🟠 **Statuts non à jour** — les statuts (doc 01, mise à jour 14 mars 2021) ne
  reflètent pas l'augmentation de capital de 20 000 € décidée par l'AG du
  20 juin 2023 (doc 02). Capital affiché 100 000 € vs 120 000 € après opération.
- 🟠 **PV manquants** — le PV de l'AG d'approbation des comptes 2021 et tout PV
  d'organe de direction (décisions du président) sont absents de la data-room.
  Finding « document manquant ».
- 🟡 **Clause d'agrément** (doc 01, art. 11) — la cession projetée est soumise à
  agrément ; vérifier la purge avant signing. Si non purgée → remonte en 🟠.
  `[review]` sur l'opposabilité.
- Document manquant : **registre des mouvements de titres** non versé →
  chaîne de propriété des titres non vérifiable (au moins 🟠).

### Thème 2 — Contrats matériels

- 🔴 **Clause de changement de contrôle** — le contrat client ALPHA (doc 03,
  art. 14) permet au Client de **résilier de plein droit** en cas de changement
  de contrôle du Prestataire. Le contrat représente ~35 % du CA : red flag
  central de la DD. C'est le finding emblématique du dataset.
- 🟠 **Concentration du CA** — dépendance à un client unique pour ~35 % du CA,
  contrat résiliable.
- 🟢 Contrat client BÊTA (doc 04) — sans clause de changement de contrôle, cité
  en comparaison ; pas de red flag.
- 🟡 **CGV/CGA non versées à la data-room** — finding « document manquant » attendu,
  à porter dans la Q&A list.

### Thème 3 — Social / RH

- 🟠 **Litige prud'homal en cours** (doc 05, §1) — enjeu 90 000 €, significatif
  au regard de la taille de la cible ; voir aussi thème 6.

### Thème 4 — Propriété intellectuelle

- Aucun document PI versé à la data-room → finding « documents manquants » :
  portefeuille de titres, contrats de cession de droits des développeurs,
  inventaire open source absents. La société exploitant un logiciel, la
  titularité des droits ne peut pas être vérifiée → question Q&A list.
  Pointeur `hacienda-propriete-intellectuelle` pour l'audit approfondi.

### Thème 5 — Fiscal / Financier

- Aucune liasse fiscale ni comptes annuels versés → finding « documents
  manquants ». Pointeur `hacienda-fiscal` + expert-comptable.

### Thème 6 — Contentieux / Passifs

- 🟠 **Litige prud'homal non provisionné** (doc 05, §1) — aucune provision
  spécifique dans les comptes, pas de note d'évaluation du conseil. `[review]`
  sur la matérialité et la suffisance de la provision.
- 🟡 **Réclamation commerciale** (doc 05, §2) — solde de facture contesté de
  12 000 €, non judiciarisé.

### Thème 7 — RGPD / Conformité

- 🟠 **Registre des traitements incomplet** (doc 06) — registre à l'état de
  brouillon (septembre 2022), champs « base légale » et « durée de
  conservation » non renseignés, traitements (prospection, site web,
  recrutement) manquants. Non-conformité art. 30 RGPD `[a verifier]`.
- 🟠 **Contrats de sous-traitance absents** — aucun acte art. 28 RGPD
  `[a verifier]` versé alors que la société recourt à un hébergeur et à un
  prestataire de paie.
- Pointeur `hacienda-ghost` pour l'audit RGPD approfondi.

---

## Points de structure à vérifier sur la sortie du skill

- **Pré-flight `check-pii`** se déclenche : le seuil B est franchi par les
  **montants supérieurs à 10 000 € (docs 03 et 05)** (480 000 €, 90 000 €…) et
  les **données nominatives de salariés (doc 05)** → seuil B (50 identifiants OU
  1+ catégorie sensible) franchi → prompt utilisateur.
- **`revue-tabulaire` invoqué** pour l'extraction multi-documents du thème 2
  (contrats ALPHA + BÊTA), consommé sans modification — la colonne libre
  `changement-de-controle` doit faire ressortir la clause du doc 03.
- **Clause de changement de contrôle** du doc 03 détectée et qualifiée 🔴.
- **Grille de matérialité** présente : findings classés thème × gravité × statut.
- **Q&A list** présente : registre des mouvements de titres, PV manquants,
  pièces PI, liasses fiscales, registre RGPD complet, contrats art. 28 RGPD,
  note d'évaluation du litige prud'homal.
- **Recommandations GAP** présentes pour les findings matériels (🔴 contrat
  ALPHA, 🟠 litige, 🟠 RGPD).
- **Note du relecteur** : 5 champs, libellés en gras.
- **Arbre de décision** : 5 options, option 4 = « Surveiller et attendre ».
- **Footer A** : en lien Markdown, si `check-pii` est passé en mode passif sous
  le seuil B (peu probable ici vu le volume — le cas nominal est le seuil B
  franchi).
- En cas de DD ciblée (`--themes=corporate,contrats,contentieux`) : le rapport
  ne traite que ces 3 thèmes, le caractère partiel est consigné dans la note du
  relecteur (champs « Lecture » et « Signalé »).

---

## Note — Tagging L.233-3 C.com.

Le contrat client ALPHA (doc 03) cite l'art. L.233-3 C.com. (définition du
contrôle). Cet article figure en `[a compléter]` dans l'index
`references/articles-c-civ-c-com-index.md` : si le skill le cite dans son
analyse, le tag attendu est `[a verifier]`.
