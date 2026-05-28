# Cohabitation `reviser-contrat` ↔ `PI:contrats-pi` — 5 cas test mixtes

> **But.** Valider le critère d'acceptance v1 §9 : « Cohabitation `reviser-contrat` ↔ `PI:contrats-pi` validée par renvois automatiques sur 5 cas test mixtes (contrat de licence + clauses commerciales). »

## Pourquoi 5 cas et pas 1

Le risque opérationnel du critère 9 n'est pas qu'un skill ne fonctionne pas — c'est que **l'utilisateur ne sache pas vers quel skill se diriger** quand un contrat est mixte. La cohabitation se mesure sur des cas qui exercent **les 5 décisions de routing possibles** :

| Cas | Type | Décision de routing attendue |
|---|---|---|
| 1 | Licence brevet pure | Route 100 % → `contrats-pi`, pas de revue commerciale |
| 2 | Coexistence marques + non-concurrence | Route principal → `contrats-pi`, revue commerciale partielle pour la non-conc |
| 3 | NDA R&D avec IP carve-out | `reviser-nda` d'abord, puis renvoi `contrats-pi` pour la clause IP |
| 4 | Cession fonds de commerce avec marque enseigne | `reviser-contrat` (matière commerciale dominante), renvoi ponctuel `contrats-pi` |
| 5 | SPA M&A avec portefeuille PI dans actifs cédés | `gap-review` (M&A), renvoi `contrats-pi` pour due diligence PI uniquement |

Les 5 cas couvrent **les 3 entry points** côté droit-affaires (`reviser-contrat`, `reviser-nda`, `gap-review`) et les 3 modes de cohabitation (route totale / route partielle / séquence).

## Structure

```
cohabitation-pi/
├── README.md              ← ce fichier
├── cas-1-licence-brevet.md
├── cas-2-coexistence-marques.md
├── cas-3-nda-rd-ip-carveout.md
├── cas-4-cession-fonds-marque.md
└── cas-5-spa-portefeuille-pi.md
```

Chaque fichier contient :
- **Le doc fictif** (extraits de clauses pilotes — 30-50 lignes, pas un contrat complet)
- **Vérité terrain** : skill à invoquer en premier + routing attendu + justification doctrinale
- **Critères de succès** : messages que le skill doit produire (renvoi explicite, options proposées)

## Protocole d'exécution

1. **Pré-requis :** plugin `hacienda-propriete-intellectuelle` installé et configuré, en plus de `hacienda-droit-affaires`.
2. **Pour chaque cas (1 à 5) :**
   - Lancer Claude Code dans le repo
   - Coller le doc du cas (uniquement, pas la vérité terrain) dans une nouvelle conversation
   - Invoquer **le skill annoncé dans la « Vérité terrain » du cas** comme entry point
   - Vérifier que le skill :
     - Détecte correctement la nature mixte
     - Propose le routing attendu (renvoi ou séquence) avec les 3 options canoniques de `reviser-contrat` : (a) lancer le skill cible à la place, (b) limiter le skill courant aux clauses non-PI, (c) faire les deux en séquence
3. **Documenter** dans `docs/superpowers/specs/2026-05-18-hacienda-droit-affaires-acceptance-results.md` (section critère 9) :
   - Cas par cas : verdict OUI/NON + extrait sortie skill
   - Total : N cas sur 5 réussis → critère 9 OUI si ≥ 4/5, NON sinon (tolérance 1 cas borderline)

## Scoring (critère acceptance v1 §9)

| Métrique | Cible |
|---|---|
| Cas avec routing correct du premier coup | ≥ 4/5 (80 %) |
| Cas où l'utilisateur doit re-poser une question pour comprendre le routing | ≤ 1/5 |
| Faux routing critique (skill traite à fond un contrat PI sans renvoi) | **0 toléré** |
| Mode « les deux en séquence » fonctionne sans perte d'information | OUI binaire |

## Hors scope de ces fixtures

- La **qualité juridique** de la revue (couverte par tests par skill §Tests par skill du design spec)
- La **performance** des skills sur un long contrat réel (couverte par tests personas)
- Les **versions PI v1.1 +** de `contrats-pi` (ces fixtures testent la version v1 actuelle)

---

*Fixtures constituées 2026-05-19 — Hacienda. Tous les noms, SIREN, marques et brevets sont fictifs.*
