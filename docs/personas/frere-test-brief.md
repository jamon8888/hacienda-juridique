# Brief de test — hacienda-droit-affaires

> Document à transmettre au testeur (frère, cabinet M&A). Calibré pour ~1h30 au total, étalable sur 2-3 semaines, asynchrone.

---

Hello,

Merci d'accepter de tester le plugin sur tes dossiers réels. J'ai calibré le protocole pour te prendre **environ 1h30 au total**, étalable sur 2-3 semaines à ton rythme. Pas d'appel live avec moi — tu remplis le formulaire de feedback au fil de l'eau, par mail ou comme tu veux.

## Le pari

Tu m'as dit que claude-for-legal d'Anthropic t'avait fait gagner un temps fou sur une revue de SPA. `hacienda-droit-affaires` reprend ce type de workflows en les ancrant explicitement dans le droit français (Code civil, Code de commerce, jurisprudence Cour de cass.) et en s'intégrant à `hacienda-ghost` pour l'anonymisation. Le test ci-dessous vise à savoir si ça t'apporte autant — voire mieux — avec en plus la confidentialité native.

## Confidentialité

Le plugin tourne en local dans ton Cowork — aucune donnée ne quitte ton poste vers un cloud tiers (au-delà de l'usage normal de Cowork). Si tu installes `hacienda-ghost` à côté, les identifiants sensibles (parties nommées, montants > 10 k€, IBAN, numéros de pièce…) sont anonymisés automatiquement avant tout envoi au modèle. Sans ghost, le plugin affiche un compteur et un avertissement avant de traiter les documents les plus sensibles — c'est toi qui décides à chaque fois.

## Le protocole — 3 skills × 1 dossier × ~30 min

J'ai sélectionné les 3 skills qui matchent le mieux ton volume M&A. Pour chacun : tu lances la commande sur **un dossier que tu allais traiter de toute façon**, tu lis la sortie, tu remplis le formulaire (5 min).

---

### Test 1 — Revue de contrat (sur un SPA)

```
/hacienda-droit-affaires:reviser-contrat <chemin/du/SPA.pdf> --review
```

Le skill produit : revue clause par clause vs un playbook cabinet, liste de points (issues list) triée par criticité 🟢🟡🟠🔴, recommandation signer / négocier / refuser, et un arbre de décision en 5 options en fin de sortie.

**Anchor comparatif** : c'est le skill le plus directement comparable à claude-for-legal sur ton expérience SPA. Compare expressément.

---

### Test 2 — Garantie d'actif et de passif (GAP)

```
/hacienda-droit-affaires:gap-review <chemin/de/la/GAP.pdf> --side=acquereur
```
(ou `--side=cedant` selon ton dossier)

5 axes couverts : périmètre de la garantie, mécanique financière (plafond / franchise / panier / durée), procédure de mise en œuvre, clauses sensibles (knowledge qualifier, best knowledge, garantie de la garantie), et confrontation avec les findings de la DD si tu lui passes un rapport DD existant via `--dd-findings=...`.

C'est une spécificité franco-française sans équivalent direct en R&W US — claude-for-legal ne le couvre pas correctement, c'est probablement le test qui démontre le mieux la valeur de l'ancrage FR.

---

### Test 3 — Due diligence data-room

```
/hacienda-droit-affaires:due-diligence-dataroom <chemin/de/la/dataroom/> --side=acquereur
```

7 thèmes couverts : Corporate / Gouvernance · Contrats matériels · Social-RH · PI · Fiscal-Financier · Contentieux-Passifs · RGPD-Conformité. Produit un rapport structuré par thème + grille de matérialité + liste de questions complémentaires à poser au cédant + recommandations pour la GAP.

Si tu as une vraie data-room sous la main, c'est le test le plus impressionnant. Sinon, mêmes 3 thèmes sur 3-4 docs sélectionnés, ça suffit pour juger.

---

## Le formulaire de feedback (~5 min par skill)

Pour chaque skill, réponds à ces 3 questions :

1. **Gain de temps** — Combien de minutes (ou heures) cette sortie t'a fait gagner vs ce que tu aurais produit à la main ou délégué à un collab ?

2. **Plus grand miss** — Quelle est la faute, l'oubli ou l'hallucination la plus gênante de la sortie ? (Si rien à signaler : « rien ».)

3. **Tu gardes ?** — Tu intègres ce skill dans ton workflow ? `Oui` / `Non` / `Conditionnel à [...]`.

**Pour `reviser-contrat` uniquement — 4e question** :
4. **Vs claude-for-legal sur ton SPA** — Mieux / pareil / moins bien, et pourquoi en une phrase ?

Renvoie-moi par mail (ou comme tu veux), pas besoin de format particulier.

## Ce que je ne te demande PAS

- Pas de test exhaustif des 18 skills du plugin. J'ai sélectionné les 3 qui matchent ton flux M&A le plus dense ; les 4-5 autres skills M&A (`loi-term-sheet`, `closing-checklist-fr`, `pacte-associes-review`, `revue-tabulaire`) sont disponibles si tu tombes dessus naturellement, mais hors protocole.
- Pas de revue de format ni de code — je m'en charge.
- Pas de feedback live ni de réunion. Tout asynchrone.

## Si quelque chose plante

Capture l'erreur (texte ou screenshot) + le skill utilisé + ce que tu faisais, envoie-moi. Je débugge.

---

*Brief calibré sur ton temps. Si même 1h30 c'est trop, dis-le-moi et on réduit à 1 seul skill (probablement `reviser-contrat` pour rester sur ton anchor claude-for-legal).*
