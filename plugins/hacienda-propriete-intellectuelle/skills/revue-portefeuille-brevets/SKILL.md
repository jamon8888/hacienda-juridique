---
name: revue-portefeuille-brevets
description: >
  Gère le registre du portefeuille de brevets détenus (CRUD + audit). Modes :
  --report (rapport + dashboard HTML), --add, --update, --remove, --list,
  --audit. Réutilise le dashboard HTML standardisé V1.1.1 sans modification.
  NE renouvelle PAS — décision et paiement annuités INPI/OEB/national restent
  au mandataire en brevets (EQE) ou au partenaire annuités (Anaqua / CPA
  Global / Dennemeyer / Patrix).
argument-hint: "[--report [--dashboard] | --add | --update | --remove | --list | --audit]"
---

# /revue-portefeuille-brevets

**Registre ≠ paiement annuités.** Ce skill produit un **rapport** sur le
portefeuille consigné dans `portfolio-brevets.yaml`. Il NE renouvelle PAS
les brevets auprès de l'INPI/OEB/offices nationaux (= mandataire en brevets
EQE), NE paye PAS les annuités (= partenaire annuités tiers : CPA Global /
Dennemeyer / Patrix / Anaqua, ou mandataire local pour validations EP
nationales), NE dépose PAS de nouveau brevet (= `preparation-depot-brevet`
V0.4). **Une annuité non payée = perte du droit de brevet** sans
possibilité de réactivation (sauf grace period 6 mois avec surcharge, puis
restauration L.612-14 strictement exceptionnelle). **Un registre
désynchronisé du registre officiel INPI/OEB crée une fausse confiance** :
« annuité payée » dans `portfolio-brevets.yaml` ne veut PAS dire annuité
acceptée côté INPI. Cross-vérifier régulièrement contre la Base Brevets
INPI publique (https://data.inpi.fr) et OEB Register
(https://register.epo.org) avant tout déclenchement d'action.

## Examples

```
/hacienda-propriete-intellectuelle:revue-portefeuille-brevets
```
(défaut : `--report`)

```
/hacienda-propriete-intellectuelle:revue-portefeuille-brevets --add
```

```
/hacienda-propriete-intellectuelle:revue-portefeuille-brevets --audit
```

---

## REGISTRE INTERNE, PAS DÉMARCHE OFFICIELLE

**Reformuler en tête de chaque output. Ne jamais l'enlever.**

> **Registre interne, pas démarche officielle.** Ce rapport reflète l'état
> consigné dans `portfolio-brevets.yaml` à la date d'édition. Il ne
> remplace ni l'inscription au registre INPI/OEB/national, ni le paiement
> effectif des annuités, ni la notification officielle de l'office. Une
> entrée marquée « annuité payée » dans le registre interne doit être
> recoupée avec la Base Brevets INPI publique
> (https://data.inpi.fr) ou OEB Register (https://register.epo.org) — et
> les registres nationaux pour les validations EP — avant toute décision
> d'arrêt de maintenance ou de communication externe. Le paiement effectif
> des annuités relève du mandataire en brevets EQE (CPI / EPC) ou d'un
> partenaire annuités spécialisé (CPA Global / Dennemeyer / Patrix /
> Anaqua), avec mandataire local pour chaque pays validé EP. Une annuité
> ratée fait tomber le droit de brevet **sans possibilité de réactivation
> standard** (grace period 6 mois avec surcharge, puis restauration
> L.612-14 strictement exceptionnelle).

---

## Charger le profil pratique et le portefeuille

Avant tout travail, lire dans cet ordre :

1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`
3. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/portfolio-brevets.yaml`
4. **Optionnel** : `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/portfolio.yaml` (registre marques V1.1.1) — si présent, pour permettre la cross-référence via le champ `marques_associees` de chaque brevet.

Si `portfolio-brevets.yaml` est absent, le créer avec le squelette suivant :

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
  avocat inscrit / mandataire en brevets EQE (CPI L.422-5) / juriste
  interne / non-juriste avec accès avocat / non-juriste sans accès
- **Posture maintenance brevets** (extraite ou déduite du profil section
  Brevets) :
  - **systématique** : tous les brevets `core` et `important` sont
    renouvelés par défaut, abandon = décision motivée
  - **sélective** : décision case par case selon usage commercial et
    valeur estimée à chaque échéance annuité
- **Mandataires associés** : mandataire en brevets EQE pour FR/EP,
  mandataires locaux pour validations nationales (un par pays validé)
- **Partenaire annuités** : CPA Global (Clarivate) / Dennemeyer / Patrix /
  Anaqua / Questel / interne — service très spécialisé multi-offices
  multi-pays
- **Domaines techniques** (du profil section Brevets) : pharma /
  mécanique / électronique / logiciel / chimie / biotech — détermine si
  CCP applicable (pharma uniquement)
- **Cadence de revue portefeuille** (trimestrielle / annuelle) — défaut
  trimestrielle si absent. Les annuités annuelles brevets imposent
  cadence MINIMUM trimestrielle, contrairement aux marques décennales.
- **Format de rapport préféré** (Markdown seul / Markdown + dashboard
  HTML) — défaut « Markdown + dashboard si > 10 brevets »
- **Sync avec base INPI/OEB publique** (manuel trimestriel / au moment de
  chaque rapport) — défaut « manuel trimestriel »
- **Approbateurs** pour décisions d'abandon ou de continuation
  (typiquement mandataire EQE + Direction R&D + CFO si montant cumulé
  significatif sur la famille)

### Profil non configuré

Si le profil PI ou `company-profile.md` contient encore des marqueurs
`[A CONFIGURER]` :

- Proposer `/hacienda-propriete-intellectuelle:entretien-demarrage`
  (10-15 min) comme chemin nominal
- OU offrir un mode `provisoire` tagué : tous les outputs sont préfixés
  `[MODE PROVISOIRE — profil non configuré, défauts génériques appliqués]`
  et utilisent les défauts (rôle = mandataire EQE, posture systématique
  pour `core`/`important`, cadence trimestrielle, format Markdown +
  dashboard)

Pour `entretien-demarrage` lui-même et `--check-integrations`, ne pas
bloquer.

---

## Mode `--report [--dashboard]` (défaut)

Mode principal. Produit un rapport Markdown horodaté + (optionnellement) un
dashboard HTML standardisé **réutilisant strictement le module
`renderDashboard` V1.1.1 sans modification** — c'est la démonstration du
standard réutilisable du plugin.

### Étape 1 — Calcul de la prochaine annuité par asset

Pour chaque entrée dans `assets[]` du `portfolio-brevets.yaml` :

- Lire `prochaine_annuite.dateEcheance` (si présent — sinon flagger
  l'asset comme « ❓ à vérifier » et exclure des buckets)
- Conserver `prochaine_annuite.annee` (année 1 à 20) et
  `prochaine_annuite.montantEstime` pour l'affichage
- Pour information : noter `dateExpiration` (= `dateDepot` + 20 ans, CPI
  L.611-2) — sert à la section « Expirations programmées »

### Étape 2 — Bucketisation par sévérité

Calculer `j_restants = dateEcheance - today`.

| Bucket | Jours restants | Lecture |
|---|---|---|
| 🔴 | < 30 j | URGENCE — risque perte du droit si non-paiement, contacter partenaire annuités immédiatement |
| 🟠 | 30 à 90 j | À PRÉPARER — instruction au partenaire annuités à formaliser ce trimestre |
| 🟡 | 90 j à 6 mois | À PLANIFIER — entrée pipeline trimestriel |
| 🟢 | > 6 mois | STABLE — surveillance passive |
| ❓ | `prochaine_annuite` absente / `statut` ambigu / parsing en erreur | À VÉRIFIER |

**Note sévérité brevets vs marques.** Le seuil 🔴 < 30 j est plus
critique que pour les marques : une annuité ratée fait tomber le droit
**sans rétablissement standard** (grace period 6 mois avec surcharge,
puis restauration L.612-14 strictement exceptionnelle), alors qu'une
marque non renouvelée bénéficie d'une période de grâce 6 mois souple
(CPI L.712-9).

### Étape 3 — Cross-référence avec le portefeuille marques V1.1.1

Lire `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/portfolio.yaml`
(si présent — sinon ignorer cette étape).

Pour chaque brevet :

- Si le champ `marques_associees: ["TM-FR-001", ...]` est renseigné,
  vérifier que ces IDs existent dans `portfolio.yaml` et que la marque
  est en vigueur (statut `enregistree`, échéance future). Si la marque
  associée est radiée ou expirée → flag `[review]` :
  « brevet lié à une marque non en vigueur — vérifier cohérence
  stratégie produit ».

Pour chaque marque `core` du `portfolio.yaml` :

- Vérifier qu'au moins un brevet du `portfolio-brevets.yaml` la
  référence dans `marques_associees`. Sinon → flag transverse :
  « marque core sans brevet associé — gamme produit sans protection
  brevet ? » (peut être normal si brand-only, mais à vérifier).

### Étape 4 — Format de sortie Markdown

````markdown
[EN-TÊTE CONFIDENTIALITÉ — selon rôle utilisateur du profil]

# Portefeuille brevets — Rapport [YYYY-MM-DD]

> **Registre interne, pas démarche officielle.** [paragraphe garde-fou
> reformulé tel quel — voir section « REGISTRE INTERNE, PAS DÉMARCHE
> OFFICIELLE » ci-dessus]

> **⚠️ Note du relecteur**
> - **Registre :** [N brevets] / [N familles complètes (FR + EP +
>   nationales)]
> - **Cross-portefeuille marques :** [N brevets avec marque associée] /
>   [N total] · [N marques `core` sans brevet associé] ⚠️
> - **Annuités < 12 mois :** [N]
> - **Brevets expirant < 24 mois :** [N — planifier successeur ou
>   continuation]
> - **Dernier audit registre :** [last_audit ou « jamais »]
> - **Avant action :** vérifier Base Brevets INPI publique
>   (https://data.inpi.fr) + OEB Register (https://register.epo.org) +
>   valider avec mandataire EQE + coordonner partenaire annuités

**Résumé :** N total · N 🔴 · N 🟠 · N 🟡 · N 🟢 · N ❓

## 🔴 ANNUITÉ URGENTE (< 30 jours)

Pour chaque hit :

- **[Titre invention]** [numéro FR2700123 / EP1234567 / WO2020/123456] ·
  CIB [...] · statut [demande / publiée / délivré / opposition]
  - Prochaine annuité : **an [N] — date butoir [date]
    (N j restants)** — montant estimé [€]
  - Titulaire [...] · Mandataire EQE [...] · Partenaire annuités [...] ·
    Owner [...]
  - Niveau stratégique : [core / important / standard / heritage]
  - Famille brevets : [FR + EP + 5 validations nationales / FR seul /
    PCT + 8 entrées nationales]
  - Marques associées : [TM-FR-001 APEXLEAF / aucune]
  - Référence : annuité non payée → perte du droit (grace period 6 mois
    avec surcharge possible, puis restauration L.612-14 strictement
    exceptionnelle)

## 🟠 ANNUITÉ À PRÉPARER (30 à 90 j)

[même format]

## 🟡 ANNUITÉ PLANIFIÉE (90 j à 6 mois)

[même format]

## 🟢 STABLE (> 6 mois)

Liste compacte (ID · numéro · titre · prochaine annuité · niveau) — N
entries.

## ⚠️ EXPIRATIONS PROGRAMMÉES (< 24 mois)

Brevets approchant la fin de la durée 20 ans (CPI L.611-2) — planifier
successeur, continuation ou divisionnaire avant expiration.

- **[ID] [titre]** : expiration [date] · niveau [...]
  - Action recommandée : étudier opportunité divisionnaire (avant
    délivrance de la demande parente) ou nouvelle famille pour
    successeur commercial

## ❓ ASSETS À VÉRIFIER (données manquantes / statut incertain)

- **[ID] [titre]** : [nature de l'incohérence — `prochaine_annuite`
  absente, `statut` non standard, dateExpiration incohérente avec
  dateDepot + 20 ans, etc.]

## Findings transverses

- **Brevets `core` sans plan continuation :** [liste ID + titre] →
  recommander étude divisionnaire ou nouvelle famille (CPI R.612-34)
- **Familles incomplètes :** ex. FR sans EP correspondant alors que
  marché EU + posture extension EU systématique du profil → flag
- **Désynchronisation potentielle registre interne / INPI/OEB public :**
  dernier cross-check [date ou « jamais »] — ré-exécuter si > 90 jours
- **Marques associées en vigueur :** [N OK / N marques associées radiées
  ou expirées ⚠️]

**Une question hors de ma checklist :** [observation seconde-ordre —
omise si rien]

## Que veux-tu faire ?

1. **Préparer le paiement annuités urgentes** — je rédige une note pour
   le partenaire annuités sur les entrées 🔴 (avec liste des
   numéros + offices + montants estimés cumulés)
2. **Escalader** — note pour [mandataire EQE / Direction R&D / CFO selon
   montant total] sur les annuités 🔴 et brevets `core` expirant < 24 mois
3. **Compléter les faits** — sync Base Brevets INPI publique + OEB
   Register avant toute action
4. **Planifier successeur** — pour brevets expirant < 24 mois, étudier
   divisionnaire ou nouvelle famille (lien `preparation-depot-brevet` V0.4
   et `strategie-extension-internationale` V0.8)
5. **Autre chose** — dis-moi
````

### Étape 5 — Génération du dashboard HTML

Déclencheur :

- Flag `--dashboard` explicitement passé
- OU nombre d'assets > 10 (seuil par défaut, modifiable via le profil
  CLAUDE.md « Format de rapport préféré »)

**RÉUTILISATION DU MODULE V1.1.1** — ce skill ne crée AUCUN HTML
manuellement. Il appelle `renderDashboard` du module `@hacienda/core`
exactement comme `revue-portefeuille-marques`. C'est la démonstration du
standard réutilisable promis par V1.1.1.

Workflow (à exécuter par Claude depuis le skill) :

1. Construire l'objet `DashboardData` (importé de `@hacienda/core`)
2. Appeler `renderDashboard(data)` (escape XSS automatique côté core)
3. Écrire le HTML à côté du Markdown :
   `<output_dir>/portefeuille-brevets-YYYY-MM-DD.html`
4. Surfacer le chemin dans la sortie Markdown :
   `Dashboard généré : [chemin/portefeuille-brevets-YYYY-MM-DD.html]`

Squelette de l'objet `DashboardData` à construire (TypeScript pour
illustration — Claude doit reproduire la structure quand il appelle le
module) :

```ts
import { renderDashboard, type DashboardData } from "@hacienda/core";

const data: DashboardData = {
  title: `Portefeuille brevets — ${cabinet}`,
  generatedAt: new Date().toISOString().slice(0, 10),
  summary: [
    { label: "Total", value: assets.length, emoji: "📊" },
    { label: "🔴 Annuité <30j", value: countRed },
    { label: "🟠 30-90j", value: countOrange },
    { label: "🟡 90j-6mois", value: countYellow },
    { label: "Expirations 12 mois", value: countExpiring12 },
    { label: "Sans owner", value: countNoOwner },
  ],
  columns: [
    { key: "id", label: "ID", width: "100px" },
    { key: "numero", label: "Numéro" },
    { key: "type", label: "Type", width: "80px" },
    { key: "titre", label: "Titre" },
    { key: "cib", label: "CIB" },
    { key: "statut", label: "Statut", width: "120px" },
    { key: "expiration", label: "Expiration" },
    { key: "prochaine_annuite", label: "Prochaine annuité" },
    { key: "severite", label: "Sévérité", width: "100px" },
    { key: "owner", label: "Owner" },
    { key: "mandataire", label: "Mandataire" },
    { key: "famille", label: "Famille" },
    { key: "niveau", label: "Niveau" },
  ],
  rows: assets.map(a => ({
    id: a.id,
    numero: a.numero,
    type: a.type,
    titre: a.titre,
    cib: a.classificationCIB.join(", "),
    statut: a.statut,
    expiration: a.dateExpiration,
    prochaine_annuite: a.prochaine_annuite
      ? `an ${a.prochaine_annuite.annee} — ${a.prochaine_annuite.dateEcheance}`
      : "_n/a_",
    severite: severityFor(a),                  // emoji 🔴/🟠/🟡/🟢 — déclenche la
                                               // couleur de ligne dans le template
    owner: a.business_owner ?? "_non renseigné_",
    mandataire: a.mandataire ?? "_n/a_",
    famille: a.famille_brevets?.length
      ? `${a.famille_brevets.length} membres`
      : "FR seul",
    niveau: a.niveau_strategique,
  })),
  severityLegend: {
    "🔴": "Annuité < 30 jours",
    "🟠": "30-90 jours",
    "🟡": "90 jours - 6 mois",
    "🟢": "> 6 mois",
  },
  reviewerNote: "...", // bloc « Note du relecteur » du Markdown ci-dessus
};

const html = renderDashboard(data);
await fs.writeFile(
  `${outputDir}/portefeuille-brevets-${date}.html`,
  html,
  "utf8",
);
```

Le dashboard est autonome (zéro CDN, ouvrable hors-ligne, imprimable A4),
trie/filtre/recherche côté JS inline, et XSS-safe (escape côté
`renderDashboard`). **Toute évolution visuelle doit passer par le module
`@hacienda/core/dashboard/` — jamais par ce skill.** Voir
`references/dashboard-template.md` (Phase 3 V1.1.1) pour le détail du
pattern et les conventions visuelles.

---
