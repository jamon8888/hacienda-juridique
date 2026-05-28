---
name: pacte-associes-review
description: >
  Revue d'un pacte d'associés contre le playbook du cabinet : préemption,
  agrément, inaliénabilité, drag/tag-along, anti-dilution, good/bad leaver,
  promesses croisées, non-concurrence des associés, droits de véto, clauses
  d'information et de liquidité. Triage par criticité, liste de points de
  négociation. Renvoie vers PI:contrats-pi si apports/licences PI substantiels.
  Brouillon soumis à validation humaine (avocat).
version: "1.0.0"
authors: ["Hacienda"]
tags: [pacte-associes, societes, revue, drag-along, preemption, agrement]
---

# Skill — Revue de pacte d'associés

> **BROUILLON DE REVUE, PAS AVIS JURIDIQUE.**
>
> Analyse documentaire d'un pacte d'associés contre le playbook configuré.
> Identifie les clauses sensibles, propose des reformulations selon la posture
> du cabinet (protecteur fondateurs / équilibré / protecteur investisseurs),
> signale les risques. Toute sortie doit être validée par un avocat avant
> transmission, signature ou ouverture de négociation.
>
> **Si le pacte porte sur des apports ou licences de propriété intellectuelle
> substantiels** (apport d'un portefeuille de brevets, licence de marque
> structurante, transfert de savoir-faire R&D au capital) : renvoyer vers
> `/hacienda-propriete-intellectuelle:contrats-pi` pour le volet PI. Ce skill
> couvre la vie sociale et les rapports entre associés, pas le cœur PI.

---

## Examples

<example>
<user>/hacienda-droit-affaires:pacte-associes-review ./pacte-associes-startup.pdf --review --side=fondateur</user>
<response>
1. Pré-flight `check-pii` (31 identifiants, aucune catégorie sensible → sous seuil B → continue)
2. Lecture profil cabinet (posture pacte = protecteur fondateurs, matrice d'approbateurs, politique PII)
3. Identification : pacte d'associés, SAS, 3 fondateurs + 1 investisseur, droit français
4. Pas de composante PI substantielle détectée → pas de renvoi PI
5. Analyse clause par clause contre `clauses-pacte-associes-fr.md` (préemption, agrément, inaliénabilité, drag/tag-along, anti-dilution, leaver, promesses croisées, non-concurrence, véto, information/liquidité)
6. Liste de points triée par criticité (🔴 → 🟢) via skill `liste-de-points`
7. Post-flight `verifier-citations` (articles C.com. et C.civ. vérifiés contre l'index)
8. Sortie : en-tête confidentialité + note du relecteur (5 champs) + résumé exécutif + liste de points + recommandation + question hors checklist + arbre de décision 5 options
</response>
</example>

<example>
<user>/hacienda-droit-affaires:pacte-associes-review ./pacte-v2.pdf</user>
<response>
Identification : pacte d'associés, SAS. Détection d'une clause d'inaliénabilité de 15 ans.
Finding 🔴 — clause d'inaliénabilité :
- En SAS, l'inaliénabilité statutaire est plafonnée à 10 ans par l'art. L.227-13 C.com. [Légifrance]. Une durée de 15 ans excède le plafond légal : la clause statutaire est nulle, à tout le moins réductible à 10 ans [review].
- Même stipulée dans le pacte seul, une inaliénabilité de 15 ans est très exposée : sa validité suppose une durée raisonnable et un intérêt sérieux et légitime (transposition art. 900-1 C.civ [a verifier]). 15 ans sans justification explicite est disproportionné [review].
Recommandation : ramener la durée à une valeur conforme (≤ 10 ans en SAS, idéalement 3 à 5 ans) et documenter l'intérêt légitime au préambule. Sortie complète avec liste de points et formulations alternatives selon posture.
</response>
</example>

<example>
<user>/hacienda-droit-affaires:pacte-associes-review ./pacte-jv-techno.pdf</user>
<response>
Détection d'une composante PI substantielle : le pacte organise l'apport au capital d'un portefeuille de brevets et une licence croisée de savoir-faire entre les associés. Renvoi taxonomie :
"Ce pacte comporte un volet propriété intellectuelle substantiel — apport de brevets au capital et licence de savoir-faire entre associés. Le skill le mieux adapté pour ce volet est `/hacienda-propriete-intellectuelle:contrats-pi`, qui couvre les spécificités PI (évaluation des apports, périmètre de licence, inscription au RNB pour opposabilité). Souhaites-tu (a) lancer `contrats-pi` à la place pour le volet PI, (b) continuer avec `pacte-associes-review` sur les seules clauses de vie sociale (préemption, agrément, drag/tag, leaver, véto), ou (c) faire les deux en séquence ?"
</response>
</example>

---

## Chargement du profil

> Lire `~/.claude/plugins/config/hacienda-juridique/hacienda-droit-affaires/CLAUDE.md` :
> - **Posture pacte d'associés** — protecteur fondateurs / équilibré / protecteur investisseurs (bloc « vie sociale »)
> - **Formes sociales pratiquées** — SAS / SARL / SA / SNC / SCI / autres (bloc « vie sociale »)
> - **Positions playbook** — préemption, agrément, inaliénabilité, drag/tag, leaver, non-concurrence des associés
> - **Matrice d'approbateurs** — par type d'acte
> - **Politique PII** — `passive` / `active` (défaut) / `strict` + seuil B + catégories sensibles

Si le profil n'est pas encore peuplé (`[A CONFIGURER]` présent) : stopper et
demander `/hacienda-droit-affaires:entretien-demarrage` avant toute revue
substantielle. Voir aussi `~/.claude/plugins/config/hacienda-juridique/company-profile.md` pour les
éléments cabinet partagés cross-plugins.

---

## Intake

1. **Mode** — `--review` (analyser un pacte existant, défaut)
2. **Fichier pacte** — chemin du PDF / DOCX / Markdown
3. **Side** (optionnel) — `--side=fondateur` | `--side=investisseur` | `--side=societe` (auto-détecté si non précisé ; détermine la posture appliquée)
4. **Forme sociale concernée** (optionnel) — `--forme=SAS` | `--forme=SARL` | `--forme=SA` (auto-détectée à partir du document si non précisée ; conditionne les fondements d'agrément et d'inaliénabilité)

---

## Étape 1 — Pré-flight + identification

1. Invoquer `check-pii` sur le document avec la politique du profil. Selon le verdict (continue / prompt / abort), respecter la décision utilisateur.
2. Lire le profil cabinet (CLAUDE.md droit-affaires) et `~/.claude/plugins/config/hacienda-juridique/company-profile.md`. Identifier la posture pacte (protecteur fondateurs / équilibré / protecteur investisseurs) et les formes sociales pratiquées.
3. Identifier la **forme sociale** de la société dont les titres sont visés (SAS, SARL, SA…) et les **parties** (fondateurs, managers, investisseurs, société elle-même si signataire), leur qualité et le side de l'utilisateur. La forme sociale conditionne les fondements applicables :
   - SAS → agrément art. L.227-14 C.com. ; inaliénabilité statutaire art. L.227-13 C.com. (plafond 10 ans) ; décisions collectives art. L.227-9 C.com.
   - SARL → agrément légal des cessions à tiers art. L.223-14 C.com. ; décisions art. L.223-29 `[a verifier]` / L.223-30 C.com.
   - SA / société par actions non cotée → clause d'agrément statutaire art. L.228-23 C.com., procédure art. L.228-24 C.com.
4. **Test composante PI.** Si le pacte organise un apport au capital de droits de PI substantiels (brevets, marques, logiciels, savoir-faire R&D) ou une licence de PI structurante entre associés → renvoyer vers `/hacienda-propriete-intellectuelle:contrats-pi` pour ce volet, avec les options (a) lancer ce skill pour le volet PI, (b) limiter `pacte-associes-review` aux clauses de vie sociale, (c) les deux en séquence. Ne pas analyser le volet PI à fond ici.

---

## Étape 2 — Analyse clause par clause

Pour chaque clause de pacte identifiée (voir `references/clauses-pacte-associes-fr.md`, 11 clauses), produire une ligne de tableau :

| Champ | Contenu |
|---|---|
| Citation | Numéro d'article du pacte + libellé court (5-15 mots) |
| Comparaison playbook | Conforme / écart léger / écart majeur, par rapport à la posture pacte configurée |
| Statut | 🟢 OK / 🟡 À discuter / 🟠 À négocier / 🔴 Bloquant |
| Article applicable | art. xxx + `[tag provenance]` (voir `articles-c-civ-c-com-index.md`) |
| Risque | 1-2 phrases concrètes pour le client |
| Position souhaitée | Selon posture pacte (protecteur fondateurs / équilibré / protecteur investisseurs) |
| Formulation proposée | Texte de remplacement prêt à coller |

**Règles d'analyse :**

- Les articles cités doivent exister dans `articles-c-civ-c-com-index.md`. Un article absent de l'index, ou présent en `[a compléter]`, est tagué `[a verifier]`. À ce jour : L.227-13, L.227-14, L.227-15, L.223-14, L.228-24, L.227-9, L.223-30, L.225-100, 1231-5, 1170, 1592 sont dans l'index avec un identifiant Légifrance réel ; L.227-1, L.228-23, 1123, 1124, 1102, 1843-4, 1844-1, 900-1, L.225-132 ne le sont pas (→ `[a verifier]`).
- Tag de provenance placé **après** la citation, sans backticks dans les cellules de tableau.
- Les arrêts cités sont tagués `[Judilibre]` si consultés en session ou `[connaissance modèle — à vérifier]` / `[a verifier]` sinon. Pas de fausse jurisprudence.
- Tag inline `[review]` sur les jugements subjectifs : proportionnalité d'une non-concurrence d'associé (durée / périmètre / activités), caractère raisonnable d'une durée d'inaliénabilité borderline, caractère confiscatoire d'une décote bad leaver, qualification d'une promesse de rachat en clause léonine, risque de gestion de fait sur un véto large.
- Respecter le plancher de sévérité cross-skill : si `check-pii` ou `verifier-citations` remonte 🔴, ne pas dégrader silencieusement.

**Points de fond à ne pas manquer :**

- **Inaliénabilité (clause 3).** En SAS, l'inaliénabilité statutaire est plafonnée à 10 ans (art. L.227-13 C.com.). Une durée supérieure → 🔴 (nullité ou réduction). Toute inaliénabilité, même de pacte, suppose une durée limitée et un intérêt sérieux et légitime.
- **Non-concurrence des associés (clause 9).** L'exigence de contrepartie financière de la jurisprudence Cass. soc. 10 juil. 2002 ne s'applique **pas** à l'associé qui s'oblige en sa seule qualité d'associé : l'absence de contrepartie n'entraîne pas la nullité. La clause reste soumise au **contrôle de proportionnalité** (durée / périmètre géographique / activités). Ne pas reprocher l'absence de contrepartie ; reprocher, le cas échéant, la disproportion. Si le débiteur cumule la qualité de salarié, vérifier le risque de requalification.
- **Agrément (clause 2).** Distinguer agrément statutaire (opposable, violation → nullité, art. L.227-15 C.com. en SAS) et agrément du pacte (effet relatif, violation → dommages-intérêts). Fondement par forme sociale : L.227-14 (SAS), L.223-14 (SARL), L.228-23 (clause statutaire en société par actions non cotée).
- **Drag-along (clause 4).** Une clause de drag-along sans seuil de déclenchement chiffré est un défaut rédactionnel majeur → 🟠/🔴. Vérifier aussi l'égalité des conditions et le périmètre des garanties imposées au minoritaire.

---

## Étape 3 — Liste de points

Appel interne au skill `liste-de-points` pour produire un tableau consolidé, trié par criticité décroissante (🔴 → 🟠 → 🟡 → 🟢) :

```
| # | Clause | Statut | Risque | Position souhaitée | Formulation proposée |
|---|---|---|---|---|---|
```

La liste de points est l'artefact central transmis à la contrepartie ou à l'équipe de négociation. Une ligne par clause. Pas de doublon. Tri stable par numéro de clause à criticité égale.

Si le pacte n'a aucun écart par rapport au playbook : retourner une liste vide explicite — `Aucun point de vigilance identifié contre le playbook configuré. Lecture intégrale sans alerte.` — et ne pas fabriquer de findings de remplissage.

---

## Étape 4 — Post-flight

Appel automatique de `verifier-citations` sur la sortie complète, mode défaut (`articles` + `jurisprudence`). Le skill :

- Extrait toutes les citations (art. NNN C.civ, L.NNN-N C.com., arrêts Cass.).
- Vérifie l'existence et la version en vigueur via Légifrance / Judilibre.
- Annote la sortie : `[Légifrance ✓]`, `[Judilibre ✓]`, `[abrogé]`, ou `[a verifier]` en mode dégradé.

Si une citation `[abrogé]` est remontée → ligne dédiée dans la note du relecteur en 🔴 avec le remplacement applicable.

Si PISTE n'est pas configuré → mode dégradé documenté en note du relecteur (« `verifier-citations` non exécuté — N citations à valider manuellement contre Légifrance »).

---

## Sortie

### Format livrable

```
[En-tête de confidentialité selon le rôle utilisateur — voir CLAUDE.md §2]

> **⚠️ Note du relecteur**
> - **Sources :** Légifrance ✓ / Judilibre ✓ / Pappers ✓ / BODACC ✓ (cocher ✗ si non connectée)
> - **Lecture :** intégrale ({N} pages) | partielle (pages X à Y)
> - **Signalé pour ton jugement :** {N} éléments marqués [review] | aucun
> - **Fraîcheur :** recherche des évolutions depuis {date} — {N} mises à jour intégrées | rien trouvé
> - **Avant de t'appuyer dessus :** {1-2 actions concrètes OU « prêt pour relecture »}

# Résumé exécutif

{Trois phrases pour fondateur / DG / sponsor. Pas de jargon. Une ligne de
bottom-line : signer en l'état / négocier sur N points / refuser. Une ligne
de risque dominant. Une ligne de prochaine action attendue.}

# Liste de points

| # | Clause | Statut | Risque | Position souhaitée | Formulation proposée |
|---|---|---|---|---|---|
| ... | ... | 🔴/🟠/🟡/🟢 | ... | ... | ... |

# Recommandation

{Signer / Négocier / Refuser} — justification 2-3 lignes liée à la posture
pacte configurée et aux points 🔴 / 🟠.

# Une question hors de ma checklist habituelle

{Observation transversale qu'un relecteur attentif ferait. Omettre la ligne
si rien d'honnête à dire — ne pas fabriquer.}

# Que veux-tu faire ? Choisis une option :

1. **Rédiger** — je produis un projet de courrier de négociation reprenant la liste de points priorisée.
2. **Escalader** — note d'escalade vers {approbateur configuré} avec faits-clés, risque dominant et décision attendue.
3. **Compléter les faits** — questions ouvertes à poser à {fondateurs / investisseur / société / conseil} avant d'avancer.
4. **Surveiller et attendre** — j'ajoute le sujet au tracker du dossier avec note motivée et date de revisite.
5. **Autre** — précise ce que tu veux en faire.

{Footer A — si check-pii est passé en mode passif sous le seuil B :
[Ce skill a traité {N} mentions identifiantes. Pour anonymiser automatiquement avant envoi à Claude, installer hacienda-ghost.](https://hacienda.diy/ghost)
Sinon, rien.}
```

### Mode silencieux (livrable externe)

Si l'utilisateur précise que la sortie est destinée à une contrepartie (co-associés, investisseur) ou à un destinataire non-juriste :
- Conserver l'en-tête de confidentialité (s'il protège le document) et la note du relecteur.
- Retirer la narration de skill et les renvois inter-commandes (les placer dans un message séparé).
- Le livrable doit se lire comme s'il avait été rédigé par un associé.

---

## Emplacement des sorties

```
outputs/revue-pacte-associes-<parties-slug>-YYYY-MM-DD.md
```

Si la liste de points dépasse 10 lignes ou contient des dates / montants
sérialisables, générer en parallèle un dashboard HTML autonome via
`renderDashboard()` de `@hacienda/core` (voir `references/dashboard-template.md`).

---

## Gate non-juriste

- [ ] Forme sociale correctement identifiée (conditionne les fondements d'agrément et d'inaliénabilité)
- [ ] Pré-flight `check-pii` exécuté et décision utilisateur respectée
- [ ] Profil cabinet lu et posture pacte applicable identifiée
- [ ] Renvoi PI effectué si le pacte comporte un volet PI substantiel (pas de revue PI forcée)
- [ ] 11 clauses passées en revue contre `clauses-pacte-associes-fr.md`
- [ ] Distinction non-concurrence d'associé / non-concurrence salariée correctement appliquée (pas de reproche sur l'absence de contrepartie)
- [ ] Liste de points triée par criticité décroissante, sans doublon, sans remplissage
- [ ] Citations vérifiées via `verifier-citations` ou taguées `[a verifier]`
- [ ] Sortie comprend : en-tête confidentialité + note du relecteur (5 champs) + résumé exécutif + liste de points + recommandation + question hors checklist + arbre de décision 5 options + footer A si applicable

---

## Ce skill ne fait pas

- Signer ou exécuter le pacte (acte des associés).
- Rédiger un pacte d'associés depuis zéro (revue uniquement en v1.1).
- Revoir le volet PI d'un pacte → renvoyer `PI:contrats-pi`.
- Rédiger ou réviser les statuts de la société → autre skill « vie sociale ».
- Faire le focus GAP M&A → renvoyer `gap-review` (v1).
- Donner un avis fiscal détaillé (régime des BSA de relution, plus-values de cession) — signalement uniquement.
- Donner un avis social complet sur un dirigeant cumulant un contrat de travail — la clause est analysée, la stratégie sociale est renvoyée au plugin compagnon.

---

## Ton

Technique, structuré, factuel. Identifier clairement le side du client
(fondateur / investisseur / société) et appliquer la posture pacte
correspondante. Signaler systématiquement les risques majeurs : inaliénabilité
excédant le plafond légal SAS, non-concurrence d'associé disproportionnée,
drag-along sans seuil de déclenchement, promesse de rachat à prix garanti
risquant la clause léonine. Rappeler que la sortie est un brouillon soumis à
validation humaine (avocat) avant toute transmission, signature ou ouverture de
négociation formelle.
