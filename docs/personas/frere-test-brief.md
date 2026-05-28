# Brief de test — hacienda-droit-affaires

> Document à transmettre au testeur (frère, cabinet M&A). Calibré pour ~1h30 au total, étalable sur 2-3 semaines, asynchrone.

---

Hello,

Merci d'accepter de tester le plugin sur tes dossiers réels. J'ai calibré le protocole pour te prendre **environ 1h30 au total**, étalable sur 2-3 semaines à ton rythme. Pas d'appel live avec moi — tu remplis le formulaire de feedback au fil de l'eau, par mail ou comme tu veux.

## Le pari

Tu m'as dit que claude-for-legal d'Anthropic t'avait fait gagner un temps fou sur une revue de SPA. `hacienda-droit-affaires` reprend ce type de workflows en les ancrant explicitement dans le droit français (Code civil, Code de commerce, jurisprudence Cour de cass.) et en s'intégrant à `hacienda-ghost` pour l'anonymisation. Le test ci-dessous vise à savoir si ça t'apporte autant — voire mieux — avec en plus la confidentialité native.

Le plugin couvre maintenant le parcours cabinet M&A complet :

| Moment du deal | Skill |
|---|---|
| NDA / confidentialité data-room | `reviser-nda` |
| NBO / LOI / Term Sheet | `loi-term-sheet` |
| Due diligence data-room | `due-diligence-dataroom` |
| **SPA / protocole de cession** | **`spa-review`** ← entrée naturelle |
| Garantie d'Actif et de Passif | `gap-review` |
| Signing / closing / post-closing | `closing-checklist-fr` |

`spa-review` est l'orchestrateur du flux : sur un SPA complet, il appelle ou recommande `gap-review` pour la GAP embarquée, renvoie vers `due-diligence-dataroom` pour les findings DD, et prépare `closing-checklist-fr` pour le pilotage signing/closing.

## Confidentialité

Le plugin tourne en local dans ton Cowork — aucune donnée ne quitte ton poste vers un cloud tiers (au-delà de l'usage normal de Cowork). Si tu installes `hacienda-ghost` à côté, les identifiants sensibles (parties nommées, montants > 10 k€, IBAN, numéros de pièce…) sont anonymisés automatiquement avant tout envoi au modèle. Sans ghost, le plugin affiche un compteur et un avertissement avant de traiter les documents les plus sensibles — c'est toi qui décides à chaque fois.

## Le protocole — 2 skills prioritaires (~1h) + 1 optionnel (~30 min)

J'ai restructuré le protocole autour des priorités de la V2b. **Calibrage : ~1h sur les 2 tests obligatoires**, + 30 min optionnels si tu tombes dessus naturellement. Pour chacun : tu lances la commande sur **un dossier que tu allais traiter de toute façon**, tu lis la sortie, tu remplis le formulaire (5 min).

---

### Test 1 — SPA review ⭐ (priorité absolue)

```
/hacienda-droit-affaires:spa-review <chemin/du/SPA.pdf> --side=acquereur
```
(ou `--side=cedant` selon ton dossier)

Le skill produit : analyse clause par clause du SPA, identification des red flags (locked box, earn-out, MAC, plafonds GAP, disclosure letter), issues list triée par criticité 🟢🟡🟠🔴, recommandation signer / négocier / refuser, arbre de décision en 5 options. Pour un SPA complet, il recommande `gap-review` pour la GAP embarquée et `closing-checklist-fr` pour le closing.

**Si tu n'as pas de SPA sous la main au moment du test**, un dataset synthétique est disponible dans le plugin : `plugins/hacienda-droit-affaires/tests/datasets/v2-spa/spa-review-scenario.md`. C'est un SPA fictif de cession 100 % titres SAS (prix 12 M€, locked box + earn-out 2027) avec 10 red flags intentionnellement plantés — CP réglementaire fragile, locked box imprécis, earn-out indéterminé, MAC trop large, disclosure letter absente, plafond GAP à 8 % (faible), finding DD non couvert, non-concurrence excessive. Lance le skill dessus pour voir s'il les capte tous, puis compare avec un SPA réel si tu en as un.

**Anchor comparatif** : c'est l'équivalent direct de ce que claude-for-legal t'avait apporté. Compare expressément.

---

### Test 2 — Garantie d'actif et de passif (GAP)

```
/hacienda-droit-affaires:gap-review <chemin/de/la/GAP.pdf> --side=acquereur
```
(ou `--side=cedant` selon ton dossier)

5 axes couverts : périmètre de la garantie, mécanique financière (plafond / franchise / panier / durée), procédure de mise en œuvre, clauses sensibles (knowledge qualifier, best knowledge, garantie de la garantie), et confrontation avec les findings de la DD via `--dd-findings=...`.

Spécificité franco-française sans équivalent direct en R&W US — c'est le test qui démontre le mieux la valeur de l'ancrage FR. Le skill peut aussi être appelé depuis `spa-review` sur un SPA intégrant la GAP.

---

### Test 3 (optionnel) — Due diligence data-room

```
/hacienda-droit-affaires:due-diligence-dataroom <chemin/de/la/dataroom/> --side=acquereur
```

7 thèmes : Corporate / Gouvernance · Contrats matériels · Social-RH · PI · Fiscal-Financier · Contentieux-Passifs · RGPD-Conformité. Rapport structuré + grille de matérialité + questions complémentaires + recommandations pour la GAP.

**Nouveau** : le plugin peut maintenant enrichir l'identification des cibles via SIREN — outils BODACC (annonces publiques, procédures collectives) + Pappers si tu as une clé API. Utile pour un company profile cible en DD. Hors protocole principal, mais si tu tombes dessus, remonte-moi.

*Ce test est hors calibrage 1h30 — ne le lance que si tu as une vraie data-room sous la main.*

---

## Le formulaire de feedback (~5 min par skill)

Pour chaque skill, réponds à ces 3 questions :

1. **Gain de temps** — Combien de minutes (ou heures) cette sortie t'a fait gagner vs ce que tu aurais produit à la main ou délégué à un collab ?

2. **Plus grand miss** — Quelle est la faute, l'oubli ou l'hallucination la plus gênante de la sortie ? (Si rien à signaler : « rien ».)

3. **Tu gardes ?** — Tu intègres ce skill dans ton workflow ? `Oui` / `Non` / `Conditionnel à [...]`.

**Pour `spa-review` uniquement — 4e question** :
4. **Vs claude-for-legal sur ton SPA** — Mieux / pareil / moins bien, et pourquoi en une phrase ? (Et si tu l'as testé sur le dataset synthétique : combien de red flags sur 10 il a captés ?)

Renvoie-moi par mail (ou comme tu veux), pas besoin de format particulier.

## Ce que je ne te demande PAS

- Pas de test exhaustif des 19 skills du plugin. J'ai sélectionné les 2 tests obligatoires qui matchent ton flux M&A le plus dense ; les autres skills M&A (`loi-term-sheet`, `closing-checklist-fr`, `reviser-contrat`, `revue-tabulaire`) sont disponibles si tu tombes dessus naturellement, mais hors protocole.
- Pas de revue de format ni de code — je m'en charge.
- Pas de feedback live ni de réunion. Tout asynchrone.

## Si quelque chose plante

Capture l'erreur (texte ou screenshot) + le skill utilisé + ce que tu faisais, envoie-moi. Je débugge.

---

*Brief calibré sur ton temps. Si même 1h c'est trop, dis-le-moi et on réduit à 1 seul skill — `spa-review` sur le dataset synthétique (30 min, zéro préparation).*
