---
name: revue-tabulaire
description: >
  Extraction structurée de N documents en parallèle vers un tableau, colonnes
  paramétrables. Brique atomique : remplace la revue manuelle "10 NDA à
  passer en revue". Réutilisée comme building block par
  due-diligence-dataroom (v1.1). Exemple : extraire durée + non-conc + loi
  + juridiction sur 12 NDA d'un coup.
version: "1.0.0"
authors: ["Hacienda"]
tags: [extraction, multi-docs, tableau, brique-atomique]
---

# Skill — Revue tabulaire multi-documents

> **EXTRACTION STRUCTURÉE PARALLÈLE.**
>
> Brique atomique : prend N documents + une liste de colonnes, retourne
> un tableau. Pas d'analyse juridique en profondeur — utiliser
> `reviser-contrat` pour ça. Idéal pour comparer un portefeuille de
> contrats sur quelques critères clés.
>
> Ce skill **n'attribue pas de criticité juridique** : les colonnes
> contiennent les valeurs extraites du texte. Les lignes incomplètes
> sont signalées `⚠️ à vérifier`, les informations absentes = `—`.
> Pour l'analyse approfondie clause par clause, passer ensuite à
> `reviser-contrat` ou `reviser-nda`.

---

## Examples

<example>
<user>/hacienda-droit-affaires:revue-tabulaire ./ndas/*.pdf --colonnes="durée,non-concurrence,loi-applicable,juridiction"</user>
<response>
1. Pré-flight `check-pii` sur l'ensemble du lot (12 fichiers, 347 mentions identifiantes → seuil B → prompt utilisateur)
2. Lecture profil cabinet (politique PII active)
3. Paramètres : 12 NDA, 4 colonnes (durée / non-concurrence / loi-applicable / juridiction)
4. Extraction parallèle — chaque document lu une fois, valeurs extraites pour les 4 colonnes
5. Tableau 12 lignes × 4 colonnes produit, lignes incomplètes signalées ⚠️ à vérifier
6. 2 NDA avec durée illisible ou absente → — dans la cellule, signalé en note du relecteur
7. Sortie : en-tête confidentialité + note du relecteur + tableau + question hors checklist + arbre de décision
</response>
</example>

<example>
<user>/hacienda-droit-affaires:revue-tabulaire ./contrats-distribution/*.pdf --colonnes="parties,date-signature,date-expiration,exclusivite,territoire,droit-applicable"</user>
<response>
Lot de 8 contrats de distribution → extraction 6 colonnes :
- Lecture rapide de chaque document, extraction des valeurs textuelles
- Cellules vides ou ambiguës : — (information absente) ou ⚠️ à vérifier (présente mais illisible/contradictoire)
- Aucune attribution de criticité (🔴/🟠/🟡/🟢) — ce skill ne fait pas l'analyse : utiliser reviser-contrat si besoin
- Sortie tableau 8 lignes × 6 colonnes + note du relecteur + arbre de décision
</response>
</example>

---

## Chargement du profil

> Lire `~/.claude/plugins/config/hacienda-juridique/hacienda-droit-affaires/CLAUDE.md` :
> - **Politique PII** — `passive` / `active` (défaut) / `strict` + seuil B + catégories sensibles
> - **Rôle de l'utilisateur courant** — pour l'en-tête de confidentialité

Si le profil n'est pas encore peuplé (`[A CONFIGURER]` présent) : stopper et
demander `/hacienda-droit-affaires:entretien-demarrage` avant toute extraction
substantielle.

---

## Intake

1. **Pattern documents** — chemin ou glob vers les fichiers à analyser
   (ex : `./ndas/*.pdf`, `./lot-contrats/`, liste de chemins séparés par des espaces)
2. **Colonnes** — liste des colonnes à extraire, sous forme d'alias séparés par des virgules
   (ex : `--colonnes="durée,non-concurrence,loi-applicable,juridiction"`)
3. **Format sortie** (optionnel) — `--format=markdown` (défaut) | `--format=csv`
   (pour export tableur)
4. **Limit** (optionnel) — `--limit=N` pour ne traiter que les N premiers documents
   du lot (utile pour valider la configuration des colonnes avant de lancer sur tout le lot)

### Alias de colonnes disponibles

| Alias | Signification | Valeur extraite |
|---|---|---|
| durée | Durée contractuelle | Valeur texte (ex : "3 ans", "indéterminée") |
| date-signature | Date de signature | Date ou — |
| date-expiration | Date d'expiration ou d'échéance | Date ou — |
| date-effet | Date d'entrée en vigueur | Date ou — |
| parties | Raison sociale des parties | Noms extraits |
| loi-applicable | Clause de loi applicable | Droit identifié (ex : "droit français") |
| juridiction | Clause attributive de juridiction | Tribunal ou cour identifiée |
| non-concurrence | Présence et périmètre clause non-concurrence | Résumé ou — |
| exclusivite | Présence et périmètre clause d'exclusivité | Résumé ou — |
| territoire | Périmètre géographique du contrat | Valeur texte |
| prix | Prix, rémunération ou plafond financier | Valeur texte ou — |
| paiement | Délai et modalités de paiement | Valeur texte ou — |
| resiliation | Conditions et préavis de résiliation | Valeur texte |
| confidentialite | Présence et durée clause de confidentialité | Résumé ou — |
| force-majeure | Présence clause de force majeure | Présente / Absente / ⚠️ à vérifier |
| limitation-resp | Présence et plafond clause de limitation de responsabilité | Résumé ou — |
| clause-penale | Présence et montant clause pénale | Résumé ou — |

> **Colonnes libres.** Si un alias n'est pas dans le tableau ci-dessus, le skill
> tente l'extraction en interprétant le libellé en langage naturel. Signaler dans
> la note du relecteur si l'interprétation est incertaine.

---

## Étape 1 — Pré-flight

1. Invoquer `check-pii` sur l'ensemble du lot avec la politique du profil.
   Respecter la décision utilisateur (continue / prompt / abort).
2. Lire le profil cabinet (CLAUDE.md droit-affaires) — politique PII et rôle
   utilisateur pour l'en-tête de confidentialité.
3. Inventorier les fichiers du lot : compter N documents, vérifier que les
   formats sont lisibles (PDF, DOCX, Markdown). Si un fichier est illisible ou
   tronqué : le signaler explicitement dans la note du relecteur, ne pas l'omettre
   silencieusement du tableau.
4. Si `--limit=N` est actif : traiter uniquement les N premiers fichiers, signaler
   le lot restant dans la note du relecteur.

---

## Étape 2 — Extraction parallèle

Pour chaque document du lot, lire le document et extraire les valeurs pour chacune
des colonnes demandées.

**Règles d'extraction :**

- Extraire la valeur textuelle telle qu'elle apparaît dans le document, sans
  paraphrase excessive. Si la clause est présente mais ambiguë : citer le libellé
  court entre guillemets et ajouter `[review]`.
- Information absente dans le document : cellule `—`.
- Information présente mais illisible, contradictoire, ou dont l'extraction est
  incertaine : cellule `⚠️ à vérifier`.
- **Pas de criticité (🔴/🟠/🟡/🟢)** dans les cellules du tableau — ce skill
  extrait, il n'analyse pas. Exception : si une valeur extraite déclenche
  manifestement un risque signalé dans `clauses-sensibles-fr.md` (ex : non-concurrence
  sans contrepartie visible), ajouter une note `[review]` dans la cellule sans
  changer la valeur.
- Tags de provenance dans les cellules : **sans backticks**. Ex : [Pappers],
  [utilisateur fourni], [a verifier].
- Si une colonne `parties` est demandée et qu'un SIREN de 9 chiffres est détecté,
  tenter l'enrichissement via `companyFullProfile` de `@hacienda/core`. Annoter
  la cellule avec [Pappers] si l'API a répondu, [BODACC] si fallback public.

---

## Étape 3 — Consolidation du tableau

Produire un tableau Markdown avec :
- Une ligne d'en-tête : `# Doc` + une colonne par alias demandé
- Une ligne par document, dans l'ordre du lot (pas de re-tri automatique)
- Lignes incomplètes (au moins une cellule `⚠️ à vérifier`) : comptabilisées
  séparément dans la note du relecteur

```
| # | Fichier | Colonne 1 | Colonne 2 | ... |
|---|---|---|---|---|
| 1 | nda-fournisseur-A.pdf | 3 ans | — | droit français | TC Paris |
| 2 | nda-fournisseur-B.pdf | 5 ans | 2 ans sans contrepartie [review] | droit anglais [review] | LCIA |
| 3 | nda-partenaire-C.pdf | ⚠️ à vérifier | — | droit français | TC Paris |
```

Si le lot dépasse 10 lignes, générer en parallèle un fichier HTML autonome
via `renderDashboard()` de `@hacienda/core` (sortable, filtrable, ouvrable
hors-ligne, zéro CDN, XSS-safe). Voir `references/dashboard-template.md`.

---

## Étape 4 — Post-flight

Appel automatique de `verifier-citations` uniquement si les colonnes demandées
contiennent des références normatives (ex : loi applicable mentionnant un article).
Pour une extraction pure de valeurs contractuelles (durée, parties, territoire) :
`verifier-citations` n'est pas déclenché — noter `sans objet` dans la note du
relecteur champ Fraîcheur.

---

## Sortie

```
[En-tête de confidentialité selon le rôle utilisateur — 4 variantes]

> ⚠️ Note du relecteur
> - **Sources :** [bases consultées : Légifrance ✓ / Pappers ✓ / BODACC ✓ — ou ✗ si non connectée | sans objet si extraction pure]
> - **Lecture :** [{N} documents traités sur {N} dans le lot | {N} fichiers sautés : [liste]]
> - **Signalé pour ton jugement :** [{N} cellules marquées [review] | aucune]
> - **Fraîcheur :** [sans objet (extraction, pas d'analyse normative) | vérifier [règles] si colonnes normatives]
> - **Avant de t'appuyer dessus :** [{N} lignes incomplètes (⚠️ à vérifier) à contrôler manuellement | prêt pour relecture]

# Revue tabulaire — {slug-lot} — {date}

**Lot :** {N} documents · **Colonnes :** {liste} · **Format :** Markdown

| # | Fichier | {Colonne 1} | {Colonne 2} | ... |
|---|---|---|---|---|
| ... | ... | ... | ... | ... |

{Si > 10 lignes : "Dashboard HTML généré → outputs/revue-tabulaire-{slug}-YYYY-MM-DD.html"}

## Une question hors de ma checklist habituelle

{Observation transversale qu'un relecteur attentif ferait (ex : documents de
langues différentes dans le lot, dates d'expiration imminentes détectées, absence
systématique d'une clause dans tout le lot). Omettre la ligne si rien d'honnête
à dire — ne pas fabriquer.}

## Que veux-tu faire ? Choisis une option :

1. **Rédiger une note de synthèse comparative** — je produis une note structurée
   identifiant les divergences entre documents sur les colonnes clés.
2. **Escalader** — note d'escalade vers {approbateur configuré} sur les lignes
   marquées [review] ou ⚠️ à vérifier, avec décision attendue.
3. **Compléter les faits** — questions ciblées à poser aux parties ou à la
   contrepartie pour résoudre les cellules ⚠️ à vérifier.
4. **Surveiller et attendre** — ajouter le tableau au tracker du dossier avec
   date de revisite et note motivée.
5. **Autre** — précise.

{Footer A si check-pii est passé en mode passif sous le seuil B :
"Ce skill a traité {N} mentions identifiantes. Pour anonymiser automatiquement
avant envoi à Claude, installer [hacienda-ghost](marketplace://hacienda-ghost)."
Sinon, rien.}
```

### En-tête de confidentialité — 4 variantes selon rôle

| Rôle | En-tête à apposer |
|------|-------------------|
| Avocat inscrit à un barreau français | `CONFIDENTIEL — DOCUMENT DE TRAVAIL — Secret professionnel art. 66-5 loi n°71-1130 du 31 décembre 1971` |
| Notaire (officier public) | `CONFIDENTIEL — TRAVAIL NOTARIAL — Devoir de discrétion art. 23 loi 25 ventôse an XI` |
| Juriste in-house (non avocat) | `NOTES DE TRAVAIL INTERNES — NE CONSTITUE PAS UN AVIS JURIDIQUE — Faire valider par un avocat avant tout acte` |
| Non-juriste avec accès avocat | `NOTES DE TRAVAIL — Faire valider par [avocat référent configuré] avant tout usage externe` |

---

## Emplacement des sorties

```
outputs/revue-tabulaire-{slug}-YYYY-MM-DD.md
```

Si le lot dépasse 10 lignes, générer en parallèle :
```
outputs/revue-tabulaire-{slug}-YYYY-MM-DD.html
```
via `renderDashboard()` de `@hacienda/core` (format autonome, ouvrable hors-ligne).

---

## Gate non-juriste

- [ ] Pré-flight `check-pii` exécuté sur l'ensemble du lot, décision utilisateur respectée
- [ ] Profil cabinet lu, rôle utilisateur identifié pour l'en-tête de confidentialité
- [ ] Lot inventorié : N documents comptés, fichiers illisibles signalés
- [ ] Colonnes demandées reconnues (alias ou libellé libre interprété et noté)
- [ ] Extraction sans criticité (🔴/🟠/🟡/🟢) dans les cellules du tableau
- [ ] Cellules vides = `—`, incertaines = `⚠️ à vérifier` (jamais vide sans raison)
- [ ] Tags de provenance sans backticks dans les cellules
- [ ] Sortie comprend : en-tête confidentialité (4 variantes) + note du relecteur
  (5 champs canoniques) + tableau + question hors checklist + arbre de décision 5 options
- [ ] Dashboard HTML généré si > 10 lignes

---

## Ce skill ne fait pas

- Analyse juridique clause par clause → utiliser `reviser-contrat`.
- Triage NDA avec verdict 🟢/🟠/🔴 → utiliser `reviser-nda`.
- Revue avec attribution de criticité par clause → `liste-de-points` (mode standalone).
- Due diligence dataroom complète → `due-diligence-dataroom` (v1.1, ce skill en est
  un building block).
- Donner un avis juridique sur les valeurs extraites — le tableau est un outil de
  repérage, pas d'analyse.

---

> Sortie brouillon soumise à **validation humaine** avant tout usage externe.
