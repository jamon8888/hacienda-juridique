---
name: revue-portefeuille-marques
description: >
  Gère le registre du portefeuille de marques détenues (CRUD + audit). Modes :
  --report (rapport horodaté + dashboard HTML), --add, --update, --remove,
  --list, --audit. Produit un dashboard HTML standardisé local exploitable
  sans serveur. NE renouvelle PAS — décision et démarche INPI/EUIPO restent
  au mandataire en marques ou avocat.
argument-hint: "[--report [--dashboard] | --add | --update | --remove | --list | --audit]"
---

# /revue-portefeuille-marques

**Registre ≠ démarche officielle.** Ce skill produit un **rapport** sur le
portefeuille consigné dans `portfolio.yaml`. Il NE renouvelle PAS les marques
auprès de l'INPI/EUIPO/OMPI (= mandataire ou avocat), NE paye PAS les taxes
(= mandataire + cabinet tiers type CPA Global ou Dennemeyer), NE dépose PAS
de nouvelle marque (= `depot-marque-fr` V1.1.2). **Un registre désynchronisé
du registre officiel INPI/EUIPO crée une fausse confiance** : « renouvellement
payé » dans `portfolio.yaml` ne veut PAS dire renouvellement enregistré côté
INPI. Cross-vérifier régulièrement contre la base INPI publique
(https://data.inpi.fr) avant tout déclenchement d'action.

## Examples

```
/hacienda-propriete-intellectuelle:revue-portefeuille-marques
```
(défaut : `--report`)

```
/hacienda-propriete-intellectuelle:revue-portefeuille-marques --add
```

```
/hacienda-propriete-intellectuelle:revue-portefeuille-marques --report --dashboard
```

---

## REGISTRE INTERNE, PAS DÉMARCHE OFFICIELLE

**Reformuler en tête de chaque output. Ne jamais l'enlever.**

> **Registre interne, pas démarche officielle.** Ce rapport reflète l'état
> consigné dans `portfolio.yaml` à la date d'édition. Il ne remplace ni
> l'inscription au registre INPI/EUIPO/OMPI, ni le paiement effectif des
> taxes de renouvellement, ni la notification officielle de l'office. Une
> entrée marquée « renouvellement enregistré » dans le registre interne
> doit être recoupée avec la base INPI publique
> (https://data.inpi.fr/marques) ou EUIPO eSearch plus avant toute décision
> d'arrêt de surveillance ou de communication externe. La démarche
> officielle (dépôt de la requête de renouvellement, paiement, suivi de la
> publication BOPI) relève du mandataire en marques inscrit (CPI L.422-4)
> ou de l'avocat.

---

## Charger le profil pratique et le portefeuille

Avant tout travail, lire dans cet ordre :

1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`
3. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/portfolio.yaml`

Si `portfolio.yaml` est absent, le créer avec le squelette suivant :

```yaml
metadata:
  cabinet: "[depuis CLAUDE.md ; mettre 'à renseigner' si vide]"
  generated: "YYYY-MM-DD"
  last_audit: null
  source_system: "manual"
assets: []
```

et confirmer la création à l'utilisateur.

### Récupération depuis le profil

- **Rôle utilisateur** (`## Rôle de l'utilisateur courant` du profil PI) :
  avocat inscrit / mandataire en marques inscrit INPI (CPI L.422-4) /
  juriste interne / non-juriste avec accès avocat / non-juriste sans accès
- **Posture enforcement** (mesurée / agressive / conservatrice)
- **Mandataires associés** (cabinet de marques, correspondants étrangers)
- **Cadence de revue portefeuille** (trimestrielle / annuelle) — défaut
  trimestrielle si absent
- **Format de rapport préféré** (Markdown seul / Markdown + dashboard HTML)
  — défaut « Markdown + dashboard si > 10 marques »
- **Sync avec base INPI publique** (manuel trimestriel / au moment de chaque
  rapport) — défaut « manuel trimestriel »
- **Approbateurs** pour décisions de renouvellement non systématique

### Profil non configuré

Si le profil PI ou `company-profile.md` contient encore des marqueurs
`[A CONFIGURER]` :

- Proposer `/hacienda-propriete-intellectuelle:entretien-demarrage`
  (10-15 min) comme chemin nominal
- OU offrir un mode `provisoire` tagué : tous les outputs sont préfixés
  `[MODE PROVISOIRE — profil non configuré, défauts génériques appliqués]`
  et utilisent les défauts (rôle = avocat, posture mesurée, cadence
  trimestrielle, format Markdown + dashboard)

Pour `entretien-demarrage` lui-même et `--check-integrations`, ne pas
bloquer.

---

## Mode `--report [--dashboard]` (défaut)

Mode principal. Produit un rapport Markdown horodaté + (optionnellement) un
dashboard HTML standardisé.

### Étape 1 — Calcul de la prochaine échéance par asset

Pour chaque entrée dans `assets[]` du `portfolio.yaml` :

- Parcourir `territoires[]`
- Identifier l'échéance de renouvellement la plus proche (champ
  `dateRenouvellement`) — c'est elle qui pilote la sévérité globale de
  l'asset
- Conserver l'office et le numéro associés (utile pour l'action)

Si plusieurs territoires partagent la même échéance, lister les offices
concernés ensemble.

### Étape 2 — Bucketisation par sévérité

Calculer le nombre de jours entre aujourd'hui et l'échéance la plus proche
(j_restants = dateRenouvellement - today).

| Bucket | Jours restants | Lecture |
|---|---|---|
| 🔴 | < 30 j | URGENCE — renouvellement à enclencher immédiatement |
| 🟠 | 30 à 90 j | À PRÉPARER — instruction mandataire à formaliser |
| 🟡 | > 90 j et ≤ 365 j | À PLANIFIER — entrée dans le pipeline trimestriel |
| 🟢 | > 365 j | STABLE — surveillance passive |
| ❓ | dateRenouvellement absente / `statut` inconnu / parsing en erreur | À VÉRIFIER |

### Étape 3 — Cross-référence avec la watchlist V1.1.0

Lire `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/watchlist.yaml`
(si présent — sinon ignorer cette étape).

Pour chaque asset :

- Chercher une entrée watchlist dont `motCle` ou `motCleAlternatives` matche
  le `signe` (égalité insensible à la casse, suppression des espaces)
- Si match → marquer `surveillance: ✓ WATCH-XXX`
- Sinon → marquer `surveillance: ❌ unwatched_asset`

Le pattern « unwatched asset » est un finding important pour les marques
`niveau_strategique = "core"` ou `"important"`.

### Étape 4 — Format de sortie Markdown

````markdown
[EN-TÊTE CONFIDENTIALITÉ — selon rôle utilisateur du profil]

# Portefeuille marques — Rapport [YYYY-MM-DD]

> **Registre interne, pas démarche officielle.** [paragraphe garde-fou
> reformulé tel quel — voir section « REGISTRE INTERNE, PAS DÉMARCHE
> OFFICIELLE » ci-dessus]

> **⚠️ Note du relecteur**
> - **Registre :** [N marques] sur [N territoires cumulés]
> - **Cross-watchlist :** [N marques surveillées] / [N total] · [N marques
>   `core` non surveillées] ⚠️
> - **Échéances < 12 mois :** [N]
> - **Dernier audit registre :** [last_audit ou « jamais »]
> - **Avant action :** vérifier base INPI publique
>   (https://data.inpi.fr/marques) ou EUIPO eSearch plus + valider avec
>   mandataire en marques

**Résumé :** N total · N 🔴 · N 🟠 · N 🟡 · N 🟢 · N ❓

## 🔴 ÉCHÉANCE URGENTE (< 30 jours)

Pour chaque hit :

- **[signe]** ([type]) · classes Nice [...] · territoires [...]
  - Renouvellement [office] [numero] : **[dateRenouvellement] —
    N j restants**
  - Titulaire [...] · Mandataire [...] · Business owner [...]
  - Niveau stratégique : [core / important / standard / heritage]
  - Surveillance watchlist : [✓ WATCH-XXX / ❌ unwatched]
  - Référence CPI L.712-9 (durée 10 ans renouvelable)

## 🟠 ÉCHÉANCE À PRÉPARER (30 à 90 j)

[même format]

## 🟡 ÉCHÉANCE PLANIFIÉE (90 j à 12 mois)

[même format]

## 🟢 STABLE (> 12 mois)

Liste compacte (ID · signe · prochaine échéance · niveau) — N entries.

## ❓ ASSETS À VÉRIFIER (données manquantes / statut incertain)

- **[ID] [signe]** : [nature de l'incohérence — `dateRenouvellement` vide,
  `statut` non standard, territoires sans numero, etc.]

## Findings transverses

- **Marques `core` ou `important` non surveillées :** [liste ID + signe]
  → recommander l'ajout à la watchlist via
  `surveillance-marque --add`
- **Désynchronisation potentielle registre interne / INPI public :** dernier
  cross-check INPI [date ou « jamais »] — ré-exécuter si > 90 jours

**Une question hors de ma checklist :** [observation seconde-ordre — omis
si rien]

## Que veux-tu faire ?

1. **Préparer un renouvellement** — je rédige une note pour le mandataire
   sur l'entrée 🔴 de ton choix
2. **Escalader** — note pour [approbateur du profil] sur les marques
   `core` non surveillées
3. **Compléter les faits** — sync base INPI publique avant toute action
4. **Ajouter à la watchlist** — pour chaque marque `core` non surveillée,
   j'ouvre `surveillance-marque --add`
5. **Autre chose** — dis-moi
````

### Étape 5 — Génération du dashboard HTML

Déclencheur :

- Flag `--dashboard` explicitement passé
- OU nombre d'assets > 10 (seuil par défaut, modifiable via le profil
  CLAUDE.md « Format de rapport préféré »)

Workflow (à exécuter par Claude depuis le skill) :

1. Construire l'objet `DashboardData` (importé de `@hacienda/core`)
2. Appeler `renderDashboard(data)` (escape XSS automatique côté core)
3. Écrire le HTML à côté du Markdown :
   `<output_dir>/portefeuille-YYYY-MM-DD.html`
4. Surfacer le chemin dans la sortie Markdown :
   `Dashboard généré : [chemin/portefeuille-YYYY-MM-DD.html]`

Squelette de l'objet `DashboardData` à construire (TypeScript pour
illustration — Claude doit reproduire la structure quand il appelle le
module) :

```ts
import { renderDashboard, type DashboardData } from "@hacienda/core";

const data: DashboardData = {
  title: `Portefeuille marques — ${cabinet}`,
  generatedAt: new Date().toISOString().slice(0, 10),
  summary: [
    { label: "Total", value: assets.length, emoji: "📊" },
    { label: "🔴 < 30 j", value: countRed },
    { label: "🟠 30-90 j", value: countOrange },
    { label: "🟡 90 j - 12 mois", value: countYellow },
  ],
  columns: [
    { key: "id", label: "ID", width: "100px" },
    { key: "signe", label: "Marque" },
    { key: "type", label: "Type", width: "80px" },
    { key: "classes", label: "Classes Nice" },
    { key: "territoires", label: "Territoires" },
    { key: "renouvellement", label: "Renouvellement" },
    { key: "severite", label: "Sévérité", width: "100px" },
    { key: "owner", label: "Owner" },
    { key: "mandataire", label: "Mandataire" },
    { key: "surveillance", label: "Surveillance" },
    { key: "niveau", label: "Niveau" },
  ],
  rows: assets.map(a => ({
    id: a.id,
    signe: a.signe,
    type: a.type,
    classes: a.classes.join(", "),
    territoires: a.territoires.map(t => t.office).join(", "),
    renouvellement: nearestRenouvellement(a),
    severite: severityFor(a),                  // emoji 🔴/🟠/🟡/🟢 — déclenche la
                                               // couleur de ligne dans le template
    owner: a.business_owner ?? "_non renseigné_",
    mandataire: a.mandataire ?? "_n/a_",
    surveillance: isWatched(a, watchlist) ? "✓" : "❌ unwatched",
    niveau: a.niveau_strategique,
  })),
  severityLegend: {
    "🔴": "< 30 jours",
    "🟠": "30-90 jours",
    "🟡": "90 j - 12 mois",
    "🟢": "> 12 mois",
  },
  reviewerNote: "...", // bloc « Note du relecteur » du Markdown ci-dessus
};

const html = renderDashboard(data);
await fs.writeFile(
  `${outputDir}/portefeuille-${date}.html`,
  html,
  "utf8",
);
```

Le dashboard est autonome (zéro CDN, ouvrable hors-ligne, imprimable A4),
trie/filtre/recherche côté JS inline, et XSS-safe (escape côté
`renderDashboard`). Voir `references/dashboard-template.md` (Phase 3) pour
le détail du pattern et les conventions visuelles.

---

## Mode `--add`

Walk interactif. Toutes les valeurs sont validées Zod avant écriture.

1. **signe** (chaîne, ≥ 2 caractères). Refus si < 2 caractères ou chaîne
   vide après trim — proposer une variante précise.
2. **type** : `mot` / `figuratif` / `composite` (mot + figuratif). Aucune
   autre valeur acceptée.
3. **classes** Nice (1 à 45, au moins une). Validation : entiers en chaîne,
   pas de doublon, dans la plage [1, 45].
4. **territoires[]** — pour chaque territoire :
   - `office` : code (`FR` = INPI, `EM` = EUIPO, autres codes OMPI/OAPI/USPTO
     selon besoin)
   - `numero` : numéro de dépôt / d'enregistrement
   - `dateDepot` (YYYY-MM-DD)
   - `dateEnregistrement` (YYYY-MM-DD, optionnel si encore en cours
     d'examen)
   - `dateRenouvellement` (YYYY-MM-DD — typiquement dateDepot + 10 ans pour
     FR/EU)
   - `statut` : `en_examen` / `enregistree` / `opposee` / `radiee` /
     `expiree`
5. **titulaire** (raison sociale exacte — important pour audit cross-check
   contrats).
6. **mandataire** (cabinet de marques associé, ou « interne » si géré en
   propre).
7. **business_owner** (email ou équipe propriétaire métier — ne JAMAIS
   laisser vide pour les marques `core`/`important`, sinon alertes
   orphelines).
8. **niveau_strategique** : `core` / `important` / `standard` / `heritage`.
   Voir `references/modele-portfolio.md` pour la définition de chaque
   niveau.
9. **notes** (libre).

Avant écriture :

- Générer un identifiant `TM-{office_principal}-{N+1}` (ex : `TM-FR-007`)
  en incrémentant le dernier ID existant pour ce code office
- Sauvegarder `portfolio.yaml.bak.YYYY-MM-DDTHHMMSS` (backup horodaté)
- Écrire la nouvelle entrée + `dateAjout: today` + `dernier_audit: null`
- Confirmer à l'utilisateur l'ajout + l'identifiant attribué

---

## Mode `--update`

`/revue-portefeuille-marques --update TM-FR-007`

- Lire l'entrée par ID
- Afficher en YAML
- Demander quels champs modifier (interactif)
- Valider Zod
- Backup `.bak` horodaté
- Écrire

Refus si l'ID n'existe pas — proposer `--list` pour vérifier.

---

## Mode `--remove`

`/revue-portefeuille-marques --remove TM-FR-007`

- Lire l'entrée
- Si `niveau_strategique = "core"` : confirmation explicite **+ raison
  obligatoire** (la raison est inscrite en commentaire dans le backup `.bak`
  pour traçabilité ultérieure)
- Si `important` : confirmation simple + raison recommandée
- Si `standard` / `heritage` : confirmation simple suffit
- Backup `.bak` horodaté
- Supprimer l'entrée

Rappeler à l'utilisateur que la suppression du registre interne
**N'EFFACE PAS** l'enregistrement INPI/EUIPO. Pour radier officiellement
une marque, voir le mandataire (procédure de renonciation art. R.714-1
CPI).

---

## Mode `--list`

Affiche le registre en table Markdown :

| ID | Signe | Type | Classes | Territoires | Échéance + proche | Niveau | Owner |
|---|---|---|---|---|---|---|---|
| TM-FR-001 | APEXLEAF | mot | 25, 35 | FR, EM | 2030-01-15 | core | marketing@acme.fr |

Tri par défaut : échéance la plus proche en premier. Filtres optionnels via
flags futurs : `--niveau core`, `--office FR`, `--statut enregistree`.

Si registre vide, afficher : « Registre vide. Lance
`/revue-portefeuille-marques --add` pour ajouter une marque. »

---

## Mode `--audit`

Health check du registre (équivalent du `--audit` de `surveillance-marque`).

Findings types :

- **Renouvellements < 12 mois sans plan déclaré** : aucune `notes` mentionnant
  une instruction mandataire ni `dernier_audit` récent
- **Marques absentes de la watchlist V1.1.0** : surtout pour `core` /
  `important` — recommander `surveillance-marque --add`
- **Classes Nice manquantes vs domaine business du profil** : ex. profil
  dit « SaaS / logiciel » mais aucune classe 9 (logiciels) ni 42 (services
  informatiques) sur les marques `core` → flag
- **Titulaires obsolètes** : raison sociale différente entre `portfolio.yaml`
  et `company-profile.md` → cross-check contrats / changement raison
  sociale au RCS
- **`niveau_strategique` vide ou non standard** : forcer la classification
- **`business_owner` vide sur `core` / `important`** : marques orphelines
  → escalation
- **Désynchronisation INPI public** : aucun cross-check INPI depuis > 90 j
  (champ `dernier_audit` ancien ou null)
- **Cap > 100 assets** : recommander un IPMS commercial (Anaqua,
  Dennemeyer, Questel, Alt Legal) — la gestion manuelle YAML n'est plus
  raisonnable à ce volume

Sortie : tableau des findings + recommandations bucketées par sévérité,
sans dashboard HTML (audit court). Mettre à jour `metadata.last_audit` à
la date du jour après exécution.

---
