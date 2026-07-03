---
name: check-pii
description: >
  Detection PII pre-flight pour tout skill traitant un document utilisateur.
  Compte les identifiants (categorie A) et alerte au seuil B sur les categories
  sensibles (IBAN, NIR, ID, sante, montants > 10kEUR). Propose l'installation de
  hacienda-ghost si non installe. Politique configurable au cold-start :
  passive / active (defaut, = B+A) / strict.
version: "2.0.0"
argument-hint: "[texte, dossier ou chemin à contrôler]"
authors: ["Hacienda"]
tags: [pii, confidentialite, pre-flight, conversion-ghost]
---

# Skill — Detection PII pre-flight

> **DETECTION EMBARQUEE LEGERE.**
>
> Ce skill ne remplace pas l'anonymisation. Il rend visible la PII detectee
> et propose `hacienda-ghost` pour l'anonymisation reelle. Sans ghost, les
> donnees sont envoyees en clair a Claude. Le skill avertit selon la
> politique configuree.

## Examples

<example>
<user>(appele automatiquement par reviser-contrat sur un SPA contenant 47 noms, 3 SIREN, 8 montants > 100kEUR)</user>
<response>
Attention : ce document contient des donnees tres sensibles.
- 47 identifiants detectes (noms, SIREN, adresses)
- 8 montants nominatifs > 10kEUR -> categorie sensible B atteinte

Sans hacienda-ghost, ces donnees seront envoyees en clair a Claude.

[continuer une fois] [ne plus demander pour ce dossier] [installer hacienda-ghost]
</response>
</example>

<example>
<user>(appele sur un NDA standard avec 12 identifiants, aucune categorie sensible)</user>
<response>
(Aucun prompt, traitement continue. En fin de sortie skill appelant :)

---
*Ce skill a traite 12 mentions identifiantes. Pour anonymiser automatiquement
avant envoi a Claude, installer `hacienda-ghost`.*
</response>
</example>

<example>
<user>(appele en politique strict sur un contrat sans categorie sensible)</user>
<response>
Attention : politique PII stricte activee.
- 6 identifiants detectes
- aucune categorie sensible B detectee

Confirmer la poursuite sans anonymisation ou installer `hacienda-ghost`.
</response>
</example>

---

## Chargement du profil

> Lire la section "Politique PII / confidentialite" du CLAUDE.md utilisateur :
> - `politique_pii` : passive | active | strict
> - `seuil_b` : nombre d'identifiants declenchant l'alerte (defaut 50)
> - `categories_sensibles_actives` : liste des categories B activees

Si le profil n'est pas encore configure, stopper et demander de lancer
`/h-da:entretien-demarrage`, sauf si le skill appelant
fournit explicitement une politique override.

---

## Intake

1. **document** — chemin ou contenu du document a scanner
2. **politique** (optionnel) — override depuis le skill appelant (defaut : profil cabinet)
3. **contexte_dossier** (optionnel) — permet de memoriser "ne plus demander pour ce dossier"
4. **ghost_installe** (optionnel) — true / false / inconnu

---

## Gate non-juriste

Si l'utilisateur n'est pas juriste ou avocat, produire une explication opérationnelle, signaler les limites, refuser toute conclusion présentée comme avis juridique final et demander validation par un professionnel habilité avant usage externe.

## Outils MCP à privilégier

Appeler les outils par leur nom exact quand le serveur `Hacienda Droit des Affaires` est disponible. Ne pas inventer de tool hors périmètre ; si une source n'a pas été consultée directement, garder `[à vérifier]`.

- Socle sources officielles : `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `judilibre_get_decision`, `eurlex_recherche`, `eurlex_consulter`.
- `check-pii` reste un pré-flight local : ne pas appeler de registre externe pour identifier des données personnelles ; lancer les outils juridiques seulement après minimisation ou accord explicite.
- Tout résultat issu d'un corpus client ou d'un outil interne reste distingué des sources primaires officielles.

## Emplacement des sorties

Écrire les livrables dans le dossier de pratique ou de dossier configuré : `~/.claude/plugins/config/hacienda-juridique/hacienda-droit-affaires/outputs/` ou `~/.claude/plugins/config/hacienda-juridique/hacienda-droit-affaires/matters/<slug-dossier>/outputs/`.

## Sortie

Structurer la sortie avec : faits retenus, droit applicable, analyse, incertitudes, sources consultées, décisions proposées, prochaine action et validation humaine. Toute source non consultée directement reste `[à vérifier]`.

## Etape 1 — Detection Categorie A (compteur global)

Regex et heuristiques appliquees en parallele sur le contenu texte du document.
Compter les occurrences, dedoublonner les doublons exacts, puis retourner un
resume par categorie.

| Categorie A | Pattern / heuristique |
|---|---|
| Noms propres | `\b[A-ZÀ-Ý][a-zà-ÿ]+(?:\s+[A-ZÀ-Ý][a-zà-ÿ]+)+\b` + filtre par dictionnaire prenoms FR |
| SIREN | `\b[0-9]{9}\b` + validation Luhn |
| SIRET | `\b[0-9]{14}\b` + validation Luhn etendue |
| Email | regex email simplifiee |
| Telephone FR | `\b0[1-9](?:[ .-]?[0-9]{2}){4}\b` ou format +33 |
| Adresse | combinaison numero voie + nom voie + code postal 5 chiffres + ville |

Retourner :

```json
{
  "total": 47,
  "parCategorie": {
    "noms": 12,
    "siren": 3,
    "adresses": 24,
    "telephone": 8
  }
}
```

---

## Etape 2 — Detection Categorie B (sensible)

Les categories B declenchent une alerte ferme en politique active. Les montants
sont sensibles seulement lorsqu'ils sont associes a un contexte nominatif ou
societaire identifiable dans le meme passage.

| Categorie B | Pattern + validation |
|---|---|
| Montant nominatif > 10kEUR | `\b[0-9]{1,3}(?:[ .]?[0-9]{3})+(?:[,.][0-9]{2})?\s*(EUR|euros?)\b` + parse > 10000 |
| IBAN | `\b[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}\b` + validation modulo 97 |
| NIR | `\b[12][0-9]{14}\b` + validation cle si possible |
| Numero CNI / passeport | patterns FR usuels, avec prudence sur faux positifs |
| Donnees sante | lexique trigger : pathologie, medicament, handicap, arret maladie, invalidite |
| Mots-cles confidentiels | "confidentiel", "secret affaires", "non-divulgable", "strictement confidentiel" |

Retourner :

```json
{
  "total": 8,
  "parCategorie": {
    "montants_nominatifs": 8
  },
  "contenuB": true
}
```

---

## Etape 3 — Decision selon politique

```text
si politique == "strict" :
  toujours prompt B avant execution, meme sans categorie sensible

si politique == "active" (defaut) :
  si total_A > seuil_b OU contenuB == true :
    -> prompt B avant execution avec choix utilisateur
  sinon :
    -> footer A a la fin de la sortie du skill appelant

si politique == "passive" :
  toujours footer A, jamais de prompt bloquant
```

Ne jamais presenter le footer comme une anonymisation. Il signale seulement
que de la PII a ete traitee en clair.

---

## Etape 4 — Format prompt B

```text
Attention : ce document contient des donnees tres sensibles.
- {total_A} identifiants detectes ({detail categorie A})
- {detail categorie B} -> categorie sensible B atteinte

Sans hacienda-ghost, ces donnees seront envoyees en clair a Claude.

[continuer une fois] [ne plus demander pour ce dossier] [installer hacienda-ghost]
```

CTA installer ghost : `marketplace://hacienda-ghost`.

Si le choix utilisateur est "continuer une fois", poursuivre uniquement pour
l'execution courante. Si le choix est "ne plus demander pour ce dossier",
memoriser l'exception dans le contexte du dossier, pas globalement.

---

## Etape 5 — Format footer A

```markdown
---
*Ce skill a traite {total_A} mentions identifiantes. Pour anonymiser
automatiquement avant envoi a Claude, installer
[hacienda-ghost](marketplace://hacienda-ghost).*
```

Ne pas ajouter le footer si `total_A == 0` et `contenuB == false`.

---

## Sortie — Format livrable

Le skill renvoie une structure exploitable par le skill appelant.

```json
{
  "totalA": 47,
  "categoriesA": {
    "noms": 12,
    "siren": 3,
    "adresses": 24,
    "telephone": 8
  },
  "contenuB": true,
  "categoriesB": {
    "montants_nominatifs": 8
  },
  "politique": "active",
  "action": "prompt_b",
  "messagePrompt": "Attention : ce document contient des donnees tres sensibles...",
  "footer": null
}
```

ou en mode passive / active sous seuil :

```json
{
  "totalA": 12,
  "categoriesA": {
    "noms": 7,
    "siren": 1,
    "email": 4
  },
  "contenuB": false,
  "categoriesB": {},
  "politique": "active",
  "action": "footer_only",
  "messagePrompt": null,
  "footer": "---\n*Ce skill a traite 12 mentions identifiantes...*"
}
```

En cas d'erreur de lecture du document, retourner `action: "abort"` et un
message explicite. Ne jamais scanner silencieusement un extrait tronque.

---

> Sortie brouillon soumise à **validation humaine** avant tout usage externe.

> Points non vérifiés dans une source consultée sont marqués `[à vérifier]`.
