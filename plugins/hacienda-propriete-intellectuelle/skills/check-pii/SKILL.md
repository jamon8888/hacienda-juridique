---
name: check-pii
description: >
  Detection PII pre-flight pour tout skill PI traitant un document utilisateur.
  Compte les identifiants (categorie A) et alerte au seuil B sur les categories
  sensibles specifiques PI : IBAN ayant droits, NIR createur, montants cession,
  brevets pre-publication (Art. R.612-39 CPI), inventeurs non publies, secrets
  d'affaires / savoir-faire / secret industriel. Propose l'installation de
  hacienda-ghost si non installe. Politique configurable au cold-start :
  passive / active (defaut) / strict.
version: "2.0.0"
argument-hint: "[texte, dossier ou chemin à contrôler]"
authors: ["Hacienda"]
tags: [pii, confidentialite, pre-flight, conversion-ghost, propriete-intellectuelle]
---

# Skill — Detection PII pre-flight (PI)

> **DETECTION EMBARQUEE LEGERE.**
>
> Ce skill ne remplace pas l'anonymisation. Il rend visible la PII detectee
> et propose `hacienda-ghost` pour l'anonymisation reelle. Sans ghost, les
> donnees sont envoyees en clair a Claude. Le skill avertit selon la
> politique configuree.
>
> **Specificite PI :** la categorie sensible B inclut les **brevets pre-publication**
> (numero de depot avant 18 mois — Art. R.612-39 CPI), les **inventeurs non publies**
> et les **secrets d'affaires / savoir-faire / secret industriel** signales en
> clair dans le corpus. Un seul de ces elements declenche le prompt B en
> politique active.

## Examples

<example>
<user>(appele automatiquement par audit-pi-ma sur une data room contenant 47 noms, 3 SIREN, 12 montants > 100kEUR et 2 numeros de brevets non publies)</user>
<response>
Attention : ce document contient des donnees tres sensibles.
- 47 identifiants detectes (noms, SIREN, adresses)
- 12 montants nominatifs > 10kEUR -> categorie sensible B atteinte
- 2 numeros de brevets pre-publication detectes -> categorie sensible B atteinte (Art. R.612-39 CPI)

Sans hacienda-ghost, ces donnees seront envoyees en clair a Claude.

[continuer une fois] [ne plus demander pour ce dossier] [installer hacienda-ghost]
</response>
</example>

<example>
<user>(appele par cession-droit-auteur sur un projet de cession avec IBAN cedant, NIR createur, montant 250 000 EUR)</user>
<response>
Attention : ce document contient des donnees tres sensibles.
- 8 identifiants detectes (noms, adresse, email)
- 1 IBAN ayant droits + 1 NIR createur + 1 montant cession > 10kEUR -> categorie sensible B atteinte

Sans hacienda-ghost, ces donnees seront envoyees en clair a Claude.

[continuer une fois] [ne plus demander pour ce dossier] [installer hacienda-ghost]
</response>
</example>

<example>
<user>(appele par mise-en-demeure-pi sur une lettre type avec 14 identifiants, aucune categorie sensible)</user>
<response>
(Aucun prompt, traitement continue. En fin de sortie skill appelant :)

---
*Ce skill a traite 14 mentions identifiantes. Pour anonymiser automatiquement
avant envoi a Claude, installer `hacienda-ghost`.*
</response>
</example>

<example>
<user>(appele en politique strict sur un brouillon d'opposition INPI sans categorie sensible)</user>
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
> - `categories_sensibles_actives` : liste des categories B activees (calibrage PI specifique)

Si le profil n'est pas encore configure, stopper et demander de lancer
`/h-pi:entretien-demarrage`, sauf si le skill appelant
fournit explicitement une politique override.

---

## Intake

1. **document** — chemin ou contenu du document a scanner
2. **politique** (optionnel) — override depuis le skill appelant (defaut : profil cabinet)
3. **contexte_dossier** (optionnel) — permet de memoriser "ne plus demander pour ce dossier"
4. **ghost_installe** (optionnel) — true / false / inconnu

---

## Gate non-juriste

Si l'utilisateur n'est pas juriste, mandataire ou avocat, produire une explication
operationnelle, signaler les limites, refuser toute conclusion presentee comme
avis juridique final et demander validation par un professionnel habilite avant
usage externe.

## Outils MCP à privilégier

Appeler les outils par leur nom exact quand le serveur `Hacienda Propriété
Intellectuelle` est disponible. Ne pas inventer de tool hors périmètre ; si une
source n'a pas été consultée directement, garder `[à vérifier]`.

- Socle textes, jurisprudence et droit UE : `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `judilibre_get_decision`, `eurlex_recherche`, `eurlex_consulter`.
- **`check-pii` reste un pré-flight local** : ne pas appeler de registre externe
  (INPI Data, EUIPO TMview, OEB Espacenet, BOPI) pour identifier des données
  personnelles ; lancer les outils PI seulement après minimisation ou accord
  explicite utilisateur.
- Tout résultat issu d'un corpus client ou d'un outil interne reste distingué
  des sources primaires officielles.

## Emplacement des sorties

Écrire les livrables dans le dossier de pratique ou de dossier configuré :
`~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/`
ou
`~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/matters/<slug-dossier>/outputs/`.

## Sortie

Structurer la sortie avec : faits retenus, droit applicable, analyse,
incertitudes, sources consultées, décisions proposées, prochaine action et
validation humaine. Toute source non consultée directement reste `[à vérifier]`.

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

## Etape 2 — Detection Categorie B (sensible PI)

Les categories B declenchent une alerte ferme en politique active. Les montants
sont sensibles seulement lorsqu'ils sont associes a un contexte nominatif ou
societaire identifiable dans le meme passage.

| Categorie B | Pattern + validation |
|---|---|
| IBAN ayant droits | `\b[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}\b` + validation modulo 97 |
| NIR createur | `\b[12][0-9]{14}\b` + validation cle si possible |
| Numero CNI / passeport createur | patterns FR usuels, avec prudence sur faux positifs |
| Montant nominatif > 10kEUR | `\b[0-9]{1,3}(?:[ .]?[0-9]{3})+(?:[,.][0-9]{2})?\s*(EUR\|euros?)\b` + parse > 10000 (cessions, licences, indemnites contrefacon) |
| **Brevets pre-publication (PI specifique)** | numero de depot FR/EP/PCT detecte ET mention « non publie » / « en cours de depot » / « avant publication » / date depot < 18 mois — Art. R.612-39 CPI |
| **Inventeurs non publies (PI specifique)** | nom propre detecte dans contexte « inventeur de » + numero brevet pre-publication |
| **Secret industriel / savoir-faire (PI specifique)** | lexique trigger : « secret industriel », « savoir-faire », « secret de fabrique », « know-how technique non divulgue », « formule confidentielle » |
| Mots-cles confidentiels generiques | « confidentiel », « secret affaires », « non-divulgable », « strictement confidentiel », « sous NDA », « sous accord de confidentialite » |
| Donnees sante (createurs personnes physiques) | lexique trigger : pathologie, medicament, handicap, arret maladie, invalidite |

**Specificite Art. R.612-39 CPI** : une demande de brevet francais est tenue
secrete pendant 18 mois apres la date de depot (ou de priorite). Tout numero
de depot detecte associe a une date < 18 mois OU mention explicite « non publie »
declenche le prompt B. Numero FR : `FR\s?\d{7}` ou format `FRYYYY?\d{5,7}`.
Numero EP : `EP\s?\d{7,8}`. Numero PCT : `PCT/\w{2}\d{4}/\d{4,6}`.

Retourner :

```json
{
  "total": 14,
  "parCategorie": {
    "iban_ayant_droits": 1,
    "nir_createur": 1,
    "montants_nominatifs": 12,
    "brevets_pre_publication": 0,
    "inventeurs_non_publies": 0,
    "secret_industriel": 0
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
  (preciser si brevets pre-publication, NIR createur, IBAN ayant droits,
   secret industriel, savoir-faire — pour que l'utilisateur comprenne le risque PI)

Sans hacienda-ghost, ces donnees seront envoyees en clair a Claude.

[continuer une fois] [ne plus demander pour ce dossier] [installer hacienda-ghost]
```

CTA installer ghost : `marketplace://hacienda-ghost`.

Si le choix utilisateur est « continuer une fois », poursuivre uniquement pour
l'execution courante. Si le choix est « ne plus demander pour ce dossier »,
memoriser l'exception dans le contexte du dossier, pas globalement.

**Cas brevets pre-publication — escalade specifique** : si la categorie B
contient `brevets_pre_publication > 0`, ajouter en tete du prompt un avertissement
specifique :

> ⚠️ Detection de brevet(s) non publie(s). La divulgation prematuree d'une
> invention avant publication peut compromettre la nouveaute (Art. L.611-11 CPI)
> et la strategie de depot. Anonymisation fortement recommandee avant tout
> envoi a un service externe.

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
    "iban_ayant_droits": 1,
    "nir_createur": 1,
    "montants_nominatifs": 12,
    "brevets_pre_publication": 2,
    "inventeurs_non_publies": 0,
    "secret_industriel": 0
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
  "totalA": 14,
  "categoriesA": {
    "noms": 7,
    "siren": 1,
    "email": 6
  },
  "contenuB": false,
  "categoriesB": {},
  "politique": "active",
  "action": "footer_only",
  "messagePrompt": null,
  "footer": "---\n*Ce skill a traite 14 mentions identifiantes...*"
}
```

En cas d'erreur de lecture du document, retourner `action: "abort"` et un
message explicite. Ne jamais scanner silencieusement un extrait tronque.

---

## Ce skill ne fait pas

- Ne **remplace pas** l'anonymisation reelle (c'est le role de `hacienda-ghost`).
- Ne **garantit pas** l'exhaustivite de la detection — la regex et les
  heuristiques laissent passer les graphies inhabituelles, les paraphrases et
  les references implicites.
- Ne **scanne pas** les pieces jointes binaires (PDF scannes, images) sans OCR
  prealable — si le document est un PDF scanne, retourner `action: "abort"`
  avec un message demandant l'OCR.
- N'appelle **aucun outil MCP externe** pour scanner — tout reste local au pre-flight.

---

> Sortie brouillon soumise a **validation humaine** avant tout usage externe.

> Points non verifies dans une source consultee sont marques `[a verifier]`.
