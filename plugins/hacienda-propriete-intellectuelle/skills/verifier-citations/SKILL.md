---
name: verifier-citations
description: >
  Post-flight de validation juridique PI. Pour chaque article cité dans une
  sortie skill (CPI, RMUE, RDMC, CBE, RGPD), interroge Légifrance via
  packages/core pour vérifier existence + version en vigueur + non-abrogation.
  Étend la vérification aux numéros INPI / EUIPO / EUTM / OEB / EP et aux
  arrêts CJUE structurants en propriété intellectuelle (Sabel, Canon, Lloyd,
  Matratzen Concord, L'Oréal Bellure). Annote la sortie. Mode dégradé si
  PISTE non configuré.
version: "2.0.0"
argument-hint: "[sortie ou liste de citations à vérifier]"
authors: ["Hacienda"]
tags: [validation, legifrance, post-flight, citations, propriete-intellectuelle]
---

# Skill — Vérification des citations juridiques (PI)

> **POST-FLIGHT AUTOMATIQUE.**
>
> Ce skill est invoqué automatiquement par tous les skills PI produisant
> du texte juridique. Il vérifie que chaque article cité existe et n'est
> pas abrogé, et contrôle les numéros de titres PI (marques INPI/EUIPO,
> brevets FR/EP/PCT, dessins et modèles, droit d'auteur) ainsi que les
> arrêts CJUE structurants. Mode dégradé documenté si PISTE est absent.

## Examples

<example>
<user>(appelé automatiquement par cession-droit-auteur après production de la sortie)</user>
<response>
Analyse la sortie, extrait 9 citations :
- art. L.131-3 CPI → [Légifrance ✓] en vigueur
- art. L.131-4 CPI → [Légifrance ✓] en vigueur
- art. L.111-1 CPI → [Légifrance ✓] en vigueur
- art. L.113-9 CPI (logiciel) → [Légifrance ✓] en vigueur
- Cass. 1re civ. 27 nov. 2008 n° 07-21.762 → [Judilibre ✓] décision trouvée
- CJUE 16 juillet 2009 aff. C-5/08 Infopaq → [à vérifier] hors couverture Judilibre

Remonte en note du relecteur : « 1 citation CJUE à confirmer sur Eur-Lex / CURIA ».
</response>
</example>

<example>
<user>(appelé par contentieux-pi sur une analyse marques EU, PISTE configuré)</user>
<response>
Extraction marques + jurisprudence :
- art. 9 RMUE (UE 2017/1001) → [Eur-Lex ✓] en vigueur
- art. 8 §1 b) RMUE → [Eur-Lex ✓] en vigueur
- CJUE 11 nov. 1997 Sabel aff. C-251/95 → [arrêt connu — à confirmer Eur-Lex/CURIA]
- CJUE 29 sept. 1998 Canon aff. C-39/97 → [arrêt connu — à confirmer Eur-Lex/CURIA]
- EUTM 018 123 456 → [EUIPO eSearch — non interrogé cette session, à vérifier]

Note du relecteur : « 2 arrêts CJUE structurants à confirmer sur Eur-Lex, 1 numéro
EUTM à valider sur EUIPO eSearch avant production externe. »
</response>
</example>

<example>
<user>(appelé sur une sortie contenant 8 citations, PISTE non configuré)</user>
<response>
Sans PISTE : toutes citations taguées [à vérifier] (mode dégradé).
Note du relecteur : « verifier-citations non exécuté — clés PISTE absentes,
8 citations à valider manuellement contre Légifrance / Eur-Lex / Judilibre. »
</response>
</example>

<example>
<user>(appelé par mise-en-demeure-pi sur une lettre contrefaçon brevet)</user>
<response>
Extraction :
- art. L.613-3 CPI → [Légifrance ✓] en vigueur
- art. L.615-1 CPI (compétence TJ Paris) → [Légifrance ✓] en vigueur
- art. L.615-3 CPI (mesures provisoires) → [Légifrance ✓] en vigueur
- Brevet FR 2018 12345 → [INPI Data — non interrogé cette session, à vérifier]
- Cass. com. 14 déc. 2010 n° 09-66.319 → [Judilibre ✓] décision trouvée

Note du relecteur signale le numéro brevet à vérifier sur INPI Data avant envoi
externe (statut en vigueur, annuités à jour, opposabilité aux tiers).
</response>
</example>

---

## Chargement du profil

> Vérifier `loadConfig().credentialsSource` :
> - `"env"` ou `"file"` → mode opérationnel
> - `"none"` → mode dégradé

Le skill doit aussi respecter les tags de provenance canoniques du
`CLAUDE.md` PI : `[Légifrance]`, `[Judilibre]`, `[Eur-Lex]`, `[INPI Data]`,
`[EUIPO TMview]`, `[EUIPO eSearch]`, `[OEB Espacenet]`, `[OMPI Madrid Monitor]`,
`[à vérifier]`, `[review]`.

---

## Intake

1. **sortie** — texte de la sortie produit par le skill appelant
2. **type_citations** (optionnel) — `articles` | `jurisprudence` | `titres_pi` | `all` (défaut)
3. **mode_silencieux** (optionnel) — si true, ne retourner que la note relecteur + sortie annotée
4. **date_analyse** — date du jour pour tracer la vérification

---

## Gate non-juriste

Si l'utilisateur n'est pas juriste, mandataire ou avocat, produire une
explication opérationnelle, signaler les limites, refuser toute conclusion
présentée comme avis juridique final et demander validation par un
professionnel habilité avant usage externe.

## Outils MCP à privilégier

Appeler les outils par leur nom exact quand le serveur `Hacienda Propriété
Intellectuelle` est disponible. Ne pas inventer de tool hors périmètre ;
si une source n'a pas été consultée directement, garder `[à vérifier]`.

- Socle textes, jurisprudence et droit UE : `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `judilibre_get_decision`, `eurlex_recherche`, `eurlex_consulter`.
- Vérification numéros marques : `inpi_search_marques`, `inpi_marque_details`, `euipo_tmview_search`.
- Vérification numéros brevets : `inpi_search_brevets`, `inpi_brevet_details`, `espacenet_search`, `espacenet_brevet_details`.
- Tout résultat issu d'un corpus client ou d'un outil interne reste distingué des sources primaires officielles.

## Emplacement des sorties

Écrire les livrables dans le dossier de pratique ou de dossier configuré : `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/` ou `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/matters/<slug-dossier>/outputs/`.

## Sortie

Structurer la sortie avec : faits retenus, droit applicable, analyse, incertitudes, sources consultées, décisions proposées, prochaine action et validation humaine. Toute source non consultée directement reste `[à vérifier]`.

## Etape 1 — Extraction des citations

Appliquer les regex sur la sortie complète. Conserver `refRaw`, la position et
le contexte court (phrase ou ligne) pour permettre une annotation précise.
Dédoublonner les références identiques, mais conserver toutes les positions.

### Articles et codes

| Type | Pattern |
|---|---|
| Article CPI | `\bart(?:icle)?\.?\s*L\.?\s*(\d+-\d+(?:-\d+)?)\s*(?:du\s+)?CPI` |
| Article R. CPI | `\bart(?:icle)?\.?\s*R\.?\s*(\d+-\d+(?:-\d+)?)\s*(?:du\s+)?CPI` |
| Article C.civ | `\bart(?:icle)?\.?\s*(\d+(?:-\d+)?)\s*(?:du\s+)?C\.?civ(?:il)?` |
| Article C.com. | `\bart(?:icle)?\.?\s*L\.?\s*(\d+-\d+(?:-\d+)?)\s*(?:du\s+)?C\.?com(?:merce)?` |
| Article RMUE | `\bart(?:icle)?\.?\s*(\d+(?:\s*§?\d*)?)\s*RMUE` ou `règlement\s*\(UE\)\s*2017/1001` |
| Article RDMC | `\bart(?:icle)?\.?\s*(\d+)\s*RDMC` ou `règlement\s*\(CE\)\s*6/2002` |
| Article CBE | `\bart(?:icle)?\.?\s*(\d+)\s*CBE` ou `Convention\s+de\s+Munich` |
| Article RGPD | `\bart(?:icle)?\.?\s*(\d+(?:-\d+)?)\s*(?:du\s+)?RGPD` |
| Loi numérotée | `loi\s+n[°o]\s*(\d+-\d+)\s+du\s+(\d+\s+[\p{L}]+\s+\d+)` |

### Jurisprudence

| Type | Pattern |
|---|---|
| Arrêt Cour de cass. | `Cass\.\s+(com|civ(?:\.\s*\d+)?|soc|crim|ass)\.?\s+(\d+\s+[\p{L}]+\s+\d{4})(?:\s+n[°o]\s*(\d+-\d+\.\d+))?` |
| Arrêt CA Paris | `CA\s+Paris(?:\s+p[ôo]le\s+5)?\s+(\d+\s+[\p{L}]+\s+\d{4})(?:\s+n[°o]\s*(RG[\s\d/]+))?` |
| Arrêt CJUE | `CJUE\s+(\d+\s+[\p{L}]+\s+\d{4})(?:\s+aff\.\s+(C-\d+/\d+))?` |
| Arrêt Tribunal UE | `(?:TPI|Tribunal\s+UE)\s+(\d+\s+[\p{L}]+\s+\d{4})(?:\s+aff\.\s+(T-\d+/\d+))?` |

**Arrêts CJUE structurants PI à reconnaître comme références canoniques** :

| Arrêt | Référence | Domaine |
|---|---|---|
| Sabel | CJUE 11 nov. 1997 aff. C-251/95 | risque de confusion marques (appréciation globale) |
| Canon | CJUE 29 sept. 1998 aff. C-39/97 | similarité produits/services |
| Lloyd | CJUE 22 juin 1999 aff. C-342/97 | consommateur moyennement attentif |
| Matratzen Concord | TPI 23 oct. 2002 aff. T-6/01 | équivalents étrangers de marques |
| L'Oréal Bellure | CJUE 18 juin 2009 aff. C-487/07 | marques notoires, double identité |
| Infopaq | CJUE 16 juillet 2009 aff. C-5/08 | originalité droit d'auteur (test UE) |
| Painer | CJUE 1er déc. 2011 aff. C-145/10 | photographie originale |

Si l'utilisateur cite l'un de ces arrêts par son nom usuel sans référence
exacte, normaliser la `refRaw` vers la référence canonique ci-dessus avant
lookup.

### Numéros de titres PI

| Type | Pattern |
|---|---|
| Marque INPI FR | `\bmarque\s+(?:FR\s+)?(\d{7,8}|\d{2}/\d{6}|\d{4}\s\d{4})` |
| Marque EU (EUTM) | `\b(?:EUTM\|marque\s+UE)\s+(\d{8,9})` |
| Marque internationale (Madrid) | `\b(?:IR|marque\s+internationale)\s+(\d{6,7})` |
| Brevet FR | `\b(?:brevet\s+)?FR\s*(\d{7,8})|FR\s*(\d{4})\s*(\d{4,7})` |
| Brevet EP | `\bEP\s*(\d{7,8})` |
| Demande PCT | `\bPCT/(\w{2})(\d{4})/(\d{4,6})` |
| Dessin/modèle FR | `\b(?:D&M|DM)\s+FR\s+(\d{6,8})` |
| DM communautaire (DMC) | `\b(?:DMC|RCD)\s+(\d{9,12})` |

Retourner :

```json
[
  {
    "type": "article",
    "code": "CODE_PROPRIETE_INTELLECTUELLE",
    "refRaw": "art. L.131-3 CPI",
    "refNorm": "CPI L131-3",
    "positions": [842]
  },
  {
    "type": "jurisprudence_cjue",
    "refRaw": "CJUE 11 nov. 1997 Sabel aff. C-251/95",
    "refNorm": "CJUE C-251/95 Sabel",
    "positions": [1456]
  },
  {
    "type": "titre_pi",
    "subtype": "brevet_fr",
    "refRaw": "FR 2018 12345",
    "refNorm": "FR2018012345",
    "positions": [2103]
  }
]
```

Si aucune citation n'est détectée, retourner une note courte :
`Aucune citation juridique détectée dans la sortie.`

---

## Etape 2 — Lookup Légifrance (mode opérationnel)

Pour chaque article extrait :

```typescript
import { legifranceCheckArticle } from "@hacienda/core";

const result = await legifranceCheckArticle({
  code: "CODE_PROPRIETE_INTELLECTUELLE" | "CODE_CIVIL" | "CODE_COMMERCE",
  numero: "L131-3",
});
// -> { existe: bool, version_en_vigueur: bool, abroge: bool, dateMaj: string }
```

Mapping minimal des codes :

| Citation | Code Légifrance |
|---|---|
| CPI | `CODE_PROPRIETE_INTELLECTUELLE` |
| C.civ / Code civil | `CODE_CIVIL` |
| C.com / Code de commerce | `CODE_COMMERCE` |
| RMUE / RDMC / CBE | hors Légifrance — basculer vers Eur-Lex (`eurlex_recherche`) |
| RGPD | hors Légifrance strict → tag `[à vérifier]` sauf integration Eur-Lex disponible |

Si Légifrance retourne une erreur transitoire, ne pas inventer : taguer la
citation `[à vérifier]` et le signaler dans la note relecteur.

---

## Etape 3 — Lookup Judilibre + Eur-Lex (jurisprudence)

Pour chaque arrêt Cour de cassation ou CA Paris pôle 5 (chambre PI) :

Appeler `judilibre_recherche` avec la référence brute (`refRaw`), puis
`judilibre_get_decision` si un identifiant fiable est retourné. Si la décision
n'est pas retrouvée, marquer la citation `[à vérifier]`.

Pour CJUE / Tribunal UE / arrêts canoniques PI (Sabel, Canon, Lloyd, Matratzen,
L'Oréal Bellure, Infopaq, Painer) :

1. Tenter `eurlex_recherche` avec la `refNorm` (format `C-XXX/XX` ou `T-XXX/XX`).
2. Si trouvé → tag `[Eur-Lex ✓]`.
3. Si non trouvé mais arrêt dans la liste canonique → tag `[arrêt canonique connu — à confirmer]` et inscrire dans la note relecteur.
4. Sinon → `[à vérifier]`.

---

## Etape 4 — Lookup INPI / EUIPO / OEB (numéros de titres PI)

Pour chaque numéro de titre extrait :

| Subtype | Outil MCP |
|---|---|
| `marque_inpi_fr` | `inpi_search_marques` puis `inpi_marque_details` |
| `marque_eu` (EUTM) | `euipo_tmview_search` |
| `marque_internationale` | hors couverture core → `[à vérifier OMPI Madrid Monitor]` |
| `brevet_fr` | `inpi_search_brevets` puis `inpi_brevet_details` |
| `brevet_ep` | `espacenet_search` puis `espacenet_brevet_details` |
| `pct` | `espacenet_search` (couverture partielle) |
| `dessin_modele_fr` | hors couverture core directe → `[à vérifier INPI Data D&M]` |
| `dmc` | hors couverture core directe → `[à vérifier EUIPO eSearch]` |

**Garde-fou volume** : ne pas lancer plus de 5 lookups numéros de titres par
sortie sans accord explicite (coût API). Au-delà, conserver `[à vérifier]`
sur les numéros restants et signaler dans la note relecteur.

Pour chaque titre vérifié, contrôler :
- existence du titre ;
- statut (en vigueur, déchu, expiré, rejeté) ;
- titulaire actuel (si la sortie identifie un cédant ou un licencié) ;
- date de prochaine échéance (annuité brevet, renouvellement marque).

---

## Etape 5 — Annotation de la sortie

Ajouter un tag proche de chaque citation, sans alourdir inutilement le livrable.
Si une même citation apparaît plusieurs fois, annoter la première occurrence et
laisser les occurrences suivantes intactes sauf alerte bloquante.

| Résultat | Tag inline |
|---|---|
| Article CPI/C.civ/C.com en vigueur | `[Légifrance ✓]` |
| Article RMUE/RDMC/CBE en vigueur | `[Eur-Lex ✓]` |
| Article abrogé | `[abrogé 🔴]` |
| Version ancienne ou référence incertaine | `[obsolète 🟠]` |
| Arrêt Cour cass. ou CA Paris trouvé | `[Judilibre ✓]` |
| Arrêt CJUE / Tribunal UE trouvé | `[Eur-Lex ✓]` |
| Arrêt canonique PI connu mais non récupéré | `[arrêt canonique — à confirmer]` |
| Titre PI vérifié et en vigueur | `[INPI ✓]` / `[EUIPO ✓]` / `[OEB ✓]` |
| Titre déchu ou expiré | `[titre déchu 🔴]` |
| Non récupérable ou mode dégradé | `[à vérifier]` |

Toute citation abrogée, tout titre déchu ou tout arrêt introuvable dans une
base disponible doit remonter dans la note du relecteur. Ne pas corriger
silencieusement le fond du livrable.

---

## Etape 6 — Note relecteur

Si tout est vert :

```markdown
⚠️ Note du relecteur : Légifrance + Eur-Lex + Judilibre + INPI Data vérifiés
· {N} citations + {M} titres PI · aucun flag · prêt pour relecture
```

Si des abrogations, titres déchus ou incohérences sont détectés :

```markdown
- **Sources :** Légifrance ✓ / Eur-Lex ✓ / Judilibre ✓ / INPI Data ✓
- **Citations vérifiées :** 12 sur 12 · **Titres PI vérifiés :** 3 sur 4
- **ALERTE 🔴 : 1 titre déchu** — brevet FR 2018 12345, annuité 2022 non payée,
  titre déchu depuis le 12/06/2023. Ne PAS s'appuyer sur ce titre dans la mise
  en demeure projetée. À retirer ou remplacer.
- **ALERTE 🟠 : 1 arrêt canonique non confirmé** — CJUE C-251/95 Sabel,
  référence connue mais non récupérée via Eur-Lex cette session.
```

Si vérification partielle :

```markdown
- **Sources :** Légifrance ✓ / Eur-Lex erreur temporaire / Judilibre ✓
- **Citations vérifiées :** 9 sur 12
- **Action :** valider manuellement les 3 citations CJUE taguées [à vérifier]
```

---

## Mode dégradé (PISTE absent)

Si `loadConfig().credentialsSource === "none"` :

1. Ne pas appeler Légifrance ni Eur-Lex.
2. Ne pas présenter les articles comme vérifiés.
3. Taguer toutes les citations `[à vérifier]`.
4. Pour les numéros de titres PI : tenter Judilibre public et EUIPO TMview
   (souvent accessibles sans clé) ; sinon `[à vérifier]`.
5. Ajouter une note relecteur explicite :

```markdown
- **verifier-citations :** non exécuté en mode complet (clés PISTE absentes)
- **Action :** vérifier manuellement les {N} citations contre Légifrance / Eur-Lex
- **Pour activer :** configurer `PISTE_CLIENT_ID` et `PISTE_CLIENT_SECRET`
  dans `~/.config/Hacienda/credentials.json`, puis lancer
  `/h-pi:entretien-demarrage --check-integrations`
```

---

## Niveaux de criticité

Échelle canonique appliquée à toute appréciation subjective de ce skill :

| Niveau | Icône | Signification dans le contexte de ce skill |
|---|---|---|
| Faible | 🟢 | Toutes citations + titres vérifiés en vigueur, mode opérationnel complet. |
| Moyen | 🟡 | Vérifications partielles (1-2 sources temporairement indisponibles) ou arrêts canoniques connus mais non récupérés cette session. |
| Élevé | 🟠 | Article obsolète / référence incertaine détecté, ou ≥ 3 citations en mode dégradé. Note relecteur explicite requise. |
| Bloquant | 🔴 | Article abrogé cité comme en vigueur, OU titre PI déchu invoqué comme base d'une mise en demeure / contentieux / cession. Ne pas produire le livrable externe en l'état. |

Plancher cross-skill (CLAUDE.md §4) : ce skill peut REHAUSSER une cote du
skill amont si une abrogation ou un titre déchu est détecté ; il ne peut
jamais la dégrader silencieusement.

---

## Sortie — Format livrable

Retourner au skill appelant :

```json
{
  "sortieAnnotee": "...texte avec tags inline...",
  "citationsVerifiees": 12,
  "citationsDetectees": 12,
  "titresPiVerifies": 3,
  "titresPiDetectes": 4,
  "alertes": [
    {
      "type": "titre_dechu",
      "ref": "brevet FR 2018 12345",
      "date_decheance": "2023-06-12",
      "cause": "annuité 2022 non payée"
    },
    {
      "type": "abroge",
      "ref": "art. L.711-3 ancien CPI",
      "remplacement": "L.711-2 (ordonnance 2019-1169)"
    }
  ],
  "modeDegrade": false,
  "noteRelecteur": "- **Sources :** Légifrance ✓ / Eur-Lex ✓ / INPI ✓..."
}
```

En mode dégradé :

```json
{
  "sortieAnnotee": "...toutes citations taguées [à vérifier]...",
  "citationsVerifiees": 0,
  "citationsDetectees": 8,
  "titresPiVerifies": 0,
  "titresPiDetectes": 2,
  "alertes": [],
  "modeDegrade": true,
  "noteRelecteur": "- **verifier-citations :** non exécuté en mode complet..."
}
```

Le skill appelant insère `noteRelecteur` dans le bloc unique de note du
relecteur, puis utilise `sortieAnnotee` comme livrable propre.

---

## Ce skill ne fait pas

- Ne **réécrit pas** le fond du livrable pour corriger une citation abrogée — il signale, le skill appelant ou l'avocat décide.
- Ne **garantit pas** la pertinence d'un arrêt cité — il vérifie son existence, pas son adéquation au raisonnement.
- N'**interroge pas** OMPI Madrid Monitor, EUIPO eSearch (au-delà de TMview) ou les offices nationaux non couverts par le core PI — ces sources restent `[à vérifier]`.
- Ne **dépose pas** d'objection en cas de titre déchu — il alerte uniquement.

---

> Sortie brouillon soumise à **validation humaine** avant tout usage externe.
