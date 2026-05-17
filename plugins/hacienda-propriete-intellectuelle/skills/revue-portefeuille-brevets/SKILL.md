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

## Mode `--add`

Walk interactif. Toutes les valeurs sont validées Zod avant écriture.

1. **numero** brevet — format selon type :
   - **FR** : `FR2700123` (national INPI)
   - **EP** : `EP1234567` (brevet européen OEB)
   - **PCT** : `WO2020/123456` (demande internationale OMPI)
   - **national post-EP** : numéro du registre national après validation
     (ex : DE60012345, GB1234567, IT0098765)
   - **CCP** : `FR15C0001` (Certificat Complémentaire de Protection —
     pharma uniquement)
2. **type** : `FR` / `EP` / `PCT` / `national_post_EP` / `CCP`. Aucune
   autre valeur acceptée.
3. **titre** invention (chaîne, ≥ 5 caractères, descriptif technique).
4. **classificationCIB** (multi-valeur, au moins une) — codes
   Classification Internationale des Brevets (sections A à H, sous-classes
   et groupes). Exemple : `["B01D 71/02", "B01D 67/00"]` pour membranes
   de filtration. Validation : format `[A-H][0-9]{2}[A-Z] [0-9/]+`
   (souple, espaces autorisés).
5. **statut** : `demande` / `publiee` / `delivre` / `opposition` /
   `decheance` / `expire`. Aucune autre valeur acceptée.
6. **Dates** :
   - **dateDepot** (YYYY-MM-DD, obligatoire) — pivot de tous les calculs
   - **dateDelivrance** (YYYY-MM-DD, obligatoire si statut = `delivre`,
     sinon null)
   - **dateExpiration** : calcul automatique = `dateDepot + 20 ans` (CPI
     L.611-2). **Attention CCP** : ajouter jusqu'à 5 ans supplémentaires
     pour pharma (Règlement CE 469/2009 art. 13). Demander confirmation
     manuelle pour les CCP.
   - **datePriorite** (YYYY-MM-DD, optionnel) — date de priorité Union
     de Paris ou priorité interne, si revendiquée
7. **prochaine_annuite** :
   - **annee** (entier 1-20) — l'année de l'annuité à payer (an 2 = 2e
     annuité, an 20 = dernière)
   - **dateEcheance** (YYYY-MM-DD) — calcul auto suggéré :
     `dateDepot + (annee - 1) ans` (à confirmer manuellement, l'office
     INPI/OEB peut décaler la date butoir)
   - **montantEstime** — varie fortement selon office et année (ex : INPI
     an 5 ~80€, OEB an 10 ~1500€, validations nationales selon pays)
8. **famille_brevets** (optionnel) : array d'IDs des FR/EP/PCT/nationales
   liés. Pour un PCT, lister toutes les entrées nationales / régionales
   issues. Pour un EP, lister toutes les validations nationales ET la FR
   parente si revendication de priorité interne.
9. **deposant** : raison sociale + SIREN si disponible (cross-check
   contrats employés / cession de droits).
10. **inventeurs** : array de noms (CPI L.611-7 — important pour le régime
    de l'invention de salarié, distinction invention de mission vs
    invention attribuable hors mission, et droit à rémunération
    supplémentaire).
11. **mandataire** : nom du mandataire en brevets (EQE inscrit OEB pour
    les brevets EP/PCT, mandataire INPI pour FR), ou « interne » si géré
    en propre par un mandataire salarié.
12. **business_owner** (email ou équipe propriétaire métier — ne JAMAIS
    laisser vide pour les brevets `core`/`important`, sinon alertes
    orphelines au `--audit`).
13. **niveau_strategique** : `core` / `important` / `standard` /
    `heritage`. Voir `references/modele-portfolio-brevets.md` pour la
    définition de chaque niveau.
14. **marques_associees** (optionnel) : array d'IDs de marques du
    `portfolio.yaml` V1.1.1 si le brevet protège une technologie liée à
    un produit commercialisé sous une marque enregistrée. Cross-référence
    stratégique majeure pour évaluer la couverture totale d'un produit
    phare (marque + brevet + DM le cas échéant).
15. **notes** (libre).

Avant écriture :

- Générer un identifiant `BR-{type}-{N+1}` (ex : `BR-FR-007`,
  `BR-EP-003`, `BR-WO-002`) en incrémentant le dernier ID existant pour
  ce code type
- Sauvegarder `portfolio-brevets.yaml.bak.YYYY-MM-DDTHHMMSS` (backup
  horodaté)
- Écrire la nouvelle entrée + `dateAjout: today` + `dernier_audit: null`
- Confirmer à l'utilisateur l'ajout + l'identifiant attribué

---

## Mode `--update`

`/revue-portefeuille-brevets --update BR-FR-007`

- Lire l'entrée par ID
- Afficher en YAML
- Demander quels champs modifier (interactif)
- Valider Zod
- Backup `.bak` horodaté
- Écrire

**Cas d'usage le plus fréquent** : mettre à jour `prochaine_annuite`
après chaque paiement annuel (incrémenter `annee`, recalculer
`dateEcheance` = `dateDepot + (nouvelle_annee - 1) ans`, mettre à jour
`montantEstime` selon barème INPI/OEB de l'année). Le skill rappelle :
**l'écriture de la nouvelle annuité dans le registre interne ne paye
PAS l'annuité — coordonner avec le partenaire annuités**.

Refus si l'ID n'existe pas — proposer `--list` pour vérifier.

---

## Mode `--remove`

`/revue-portefeuille-brevets --remove BR-FR-007`

- Lire l'entrée
- Si `niveau_strategique = "core"` : confirmation explicite **+ raison
  obligatoire** (la raison est inscrite en commentaire dans le backup
  `.bak` pour traçabilité ultérieure)
- Si `important` : confirmation simple + raison recommandée
- Si `standard` / `heritage` : confirmation simple suffit
- **Si `statut` = `opposition` ou si une procédure (nullité, contrefaçon)
  est en cours** : confirmation supplémentaire — supprimer le registre
  interne d'un brevet sous procédure peut faire perdre la trace de
  l'historique procédural utile pour la suite
- Backup `.bak` horodaté
- Supprimer l'entrée

Rappeler à l'utilisateur que la suppression du registre interne
**N'EFFACE PAS** l'enregistrement INPI/OEB/national. Pour radier
officiellement un brevet, voir le mandataire (procédure de renonciation
art. L.613-24 CPI / Règle 71 EPC pour EP) ou laisser le brevet tomber
en déchéance par non-paiement d'annuité (économiquement équivalent).

---

## Mode `--list`

Affiche le registre en table Markdown :

| ID | Numéro | Type | Titre | Statut | Expiration | Annuité prochaine | Niveau | Owner |
|---|---|---|---|---|---|---|---|---|
| BR-FR-001 | FR2700123 | FR | Procédé filtration eau graphène | delivre | 2038-02-01 | an 8 — 2026-02-01 | core | rd@acme.fr |

Tri par défaut : prochaine annuité la plus proche en premier. Filtres
optionnels via flags futurs : `--niveau core`, `--type EP`,
`--statut delivre`.

Si registre vide, afficher : « Registre vide. Lance
`/revue-portefeuille-brevets --add` pour ajouter un brevet. »

---

## Mode `--audit`

Health check du registre brevets. Plus exigeant que l'audit marques car
les annuités sont annuelles et la perte du droit immédiate.

Findings types :

- **Annuités à payer dans 3 mois sans plan déclaré** : pas de mention
  « paiement programmé » ni « instruction partenaire annuités » dans
  `notes`, ni `dernier_audit` récent — risque oubli avec perte du droit
- **Brevets en grace period** : annuité passée non payée mais dans la
  fenêtre de rattrapage 6 mois avec surcharge (CPI L.612-19) — alerte
  rouge, échéance ferme du rattrapage à calculer
- **Brevets `expire` non marqués comme tels** dans `statut` (cohérence
  registre vs date d'expiration calculée)
- **Brevets `pending` (statut `demande` ou `publiee`) > 5 ans** sans
  délivrance — investiguer (retard examinateur INPI/OEB anormal,
  notification non répondue, problème de priorité)
- **Brevets `core` sans plan continuation** : pas de divisionnaire ni
  nouvelle famille mentionnée dans `notes` alors que famille importante
  approche expiration — opportunité ratée si commercialisation se
  prolonge
- **Familles incomplètes** : ex. FR sans EP correspondant alors que le
  profil indique « marché EU + posture extension EU systématique » →
  flag opportunité étendue ratée
- **Marques sans brevet associé (cross-ref V1.1.1)** : marque `core`
  dans `portfolio.yaml` correspondant à un produit commercialisé sans
  brevet enregistré dans `portfolio-brevets.yaml` qui la cite dans
  `marques_associees` — flag opportunité dépôt brevet (peut être normal
  pour un produit brand-only sans innovation technique brevetable)
- **Brevets sans inventeur renseigné** : conformité L.611-7 (régime
  invention de salarié) compromise — risque contestation rémunération
  supplémentaire ou cession de droits
- **Brevets sans `business_owner`** : alertes orphelines, personne ne
  reçoit la notification d'annuité à venir
- **`niveau_strategique` vide ou non standard** : forcer la
  classification
- **Désynchronisation INPI/OEB public** : aucun cross-check depuis > 90 j
  (champ `dernier_audit` ancien ou null) — risque divergence registre
  interne vs registre officiel
- **Cap > 50 brevets actifs** : signaler « envisager IPMS commercial
  (Anaqua, Dennemeyer, Questel, Clarivate IPfolio, Patrix) pour
  automatisation annuités multi-pays — la gestion manuelle YAML devient
  risquée à ce volume, surtout pour familles avec nombreuses
  validations EP nationales ». Voir
  `references/modele-portfolio-brevets.md` pour comparatif.

Sortie : tableau des findings + recommandations bucketées par sévérité,
sans dashboard HTML (audit court). Mettre à jour `metadata.last_audit`
à la date du jour après exécution.

---

## Emplacement de sortie

Mode `--report` écrit le Markdown à
`~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/portefeuille-brevets-YYYY-MM-DD.md`
et le HTML (si dashboard généré) à
`~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/portefeuille-brevets-YYYY-MM-DD.html`,
puis surface les deux chemins en fin de sortie.

Mode `--audit` écrit à
`~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/portefeuille-brevets-audit-YYYY-MM-DD.md`.

Modes `--add` / `--update` / `--remove` ne produisent pas de sortie
horodatée — uniquement un message de confirmation + le chemin du backup
`.bak` créé. Le backup vit dans le même dossier que
`portfolio-brevets.yaml` :
`portfolio-brevets.yaml.bak.YYYY-MM-DDTHHMMSS`.

Si plusieurs rapports sont générés le même jour, suffixer le second avec
`-N` (ex : `portefeuille-brevets-2026-05-16-2.md`).

---

## Ce que ce skill NE fait PAS

- **Payer les annuités.** Le paiement effectif des annuités relève du
  mandataire en brevets EQE et/ou du partenaire annuités tiers
  spécialisé (CPA Global / Clarivate, Dennemeyer, Patrix, Anaqua,
  Questel) — jamais de l'IA. Une annuité ratée fait tomber le droit
  **sans rétablissement standard**.
- **Renouveler les validations EP nationales.** Chaque pays validé après
  délivrance EP a son propre régime d'annuités, ses propres délais et
  son propre mandataire local — coordination spécifique requise pays
  par pays (DE, GB, IT, ES, NL, BE, etc.).
- **Déposer un nouveau brevet.** Le dossier de dépôt INPI/OEB/PCT est
  préparé par `preparation-depot-brevet` (V0.4) et déposé par le
  mandataire EQE.
- **Étendre internationalement un brevet existant.** L'arbre décisionnel
  FR seul / EP / PCT et le calendrier Union de Paris (12 mois) sont
  gérés par `strategie-extension-internationale` (V0.8). Le dépôt
  effectif relève du mandataire EQE + correspondants étrangers.
- **Évaluer la valeur économique du brevet.** Valuation patrimoniale,
  due diligence M&A, transfer pricing IP holding → consultant valuation
  PI spécialisé (ipMetrics, Patent Sight, IPlytics) ou banquier
  d'affaires. Le skill ne calcule pas de NPV.
- **Gérer les CCP** (Certificats Complémentaires de Protection pour
  pharma — Règlement CE 469/2009, jusqu'à +5 ans après expiration du
  brevet de base) : voir `certificat-complementaire-protection`. Le skill peut stocker un CCP
  en `type: "CCP"` mais ne calcule pas la durée de protection
  effective ni n'optimise la stratégie CCP / pédiatrique.
- **Garantir la conformité du registre interne vs INPI/OEB officiel.**
  Le `portfolio-brevets.yaml` est un **miroir consigné manuellement**.
  Une sync périodique (manuel trimestriel obligatoire) avec la Base
  Brevets INPI publique gratuite (https://data.inpi.fr) + OEB Register
  (https://register.epo.org) + Patentscope WIPO pour PCT
  (https://patentscope.wipo.int) est obligatoire avant toute action.
  Pour les validations nationales EP, consulter aussi le registre
  national de chaque pays (DPMA pour DE, IPO pour GB, UIBM pour IT,
  etc.).
- **Détecter la contrefaçon de nos brevets par des tiers.** L'inverse de
  ce skill : appliquer notre brevet contre un produit suspecté
  contrefaisant relève du futur skill `tableau-contrefacon-brevet`
  (V2.0) — analyse revendication par revendication + collecte de
  preuves d'usage commercial.
- **Répondre à des notifications INPI/OEB sur brevets en cours
  d'examen.** Les refus, oppositions et notifications de procédure
  relèvent de `analyse-refus-inpi` (V2.1) puis du mandataire EQE pour
  la rédaction de la réponse.

---

## Ton

Précis, factuel, orienté action mandataire EQE / partenaire annuités.
L'avocat ou le mandataire lit le rapport en 30 secondes, repère les
🔴 « annuité urgente », et prévient immédiatement le partenaire
annuités (CPA Global / Dennemeyer / etc.) avec la liste des numéros et
montants cumulés. Pas de hedging, pas de paragraphe-leçon. Le garde-fou
« registre ≠ paiement annuités » en tête + le « ce skill NE fait PAS »
en bas font le travail de scope.

Les recommandations sont toujours attribuées (au mandataire EQE nommé,
au partenaire annuités du profil, au business owner, à l'approbateur
défini) — jamais « il faudrait que quelqu'un s'occupe de cette
annuité… ». Sur les annuités 🔴, mentionner explicitement le risque de
perte du droit + la fenêtre grace period 6 mois (avec mention de la
surcharge applicable et du caractère exceptionnel de la restauration
L.612-14).

---
