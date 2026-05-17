---
name: surveillance-marque
description: >
  Gère la watchlist de marques surveillées et exécute la surveillance des
  publications INPI/EUIPO récentes. Modes : --report (rapport sur fenêtre),
  --add (ajouter une entrée), --update, --remove, --list, --audit. Conçu
  pour produire des alertes actionnables avant expiration du délai
  d'opposition (2 mois post-BOPI L.712-4).
argument-hint: "[--report [--days N] | --add | --update | --remove | --list | --audit]"
---

# /surveillance-marque

**Outil de surveillance, pas un avis juridique.** Une alerte signale un dépôt
récent qui *peut* poser problème — l'évaluation du risque de confusion et la
décision d'opposition reviennent au mandataire en marques (CPI L.422-4) ou à
l'avocat. Une marque listée comme "🟢 aucun signal" ne veut PAS dire qu'aucun
risque n'existe : elle veut dire que la surveillance n'a rien remonté dans
la fenêtre couverte.

## Examples

```
/hacienda-propriete-intellectuelle:surveillance-marque
```
(défaut : --report --days 7)

```
/hacienda-propriete-intellectuelle:surveillance-marque --add
```

```
/hacienda-propriete-intellectuelle:surveillance-marque --audit
```

---

## SURVEILLANCE, PAS OPINION

**Reformuler en tête de chaque rapport. Ne jamais l'enlever.**

> **Surveillance, pas opinion.** Ce skill détecte les dépôts récents qui
> matchent une entrée de votre watchlist. Il ne décide PAS d'une opposition,
> ne calcule PAS un risque de confusion détaillé (= rôle du skill
> `recherche-anteriorite-marque` ou de l'avocat), n'envoie PAS de mise en
> demeure. Avant toute action sur une publication signalée, le mandataire
> en marques (CPI L.422-4) ou l'avocat évalue le risque de confusion (CJUE
> Sabel/Canon/Lloyd) sur la base d'une recherche complète.

---

## Charger le profil + la watchlist

Avant tout, lire :
1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`
3. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/watchlist.yaml` (créer si absent avec metadata vide + `watches: []`)

Récupérer :
- **Rôle** depuis `## Qui utilise ce plugin` (avocat / mandataire INPI / non-juriste)
- **Posture enforcement** depuis `## Posture enforcement` du profil
- **Approbateurs** (qui signe une opposition INPI ?)
- **Canal d'alerte** (Slack channel / email / inline) — défaut "inline" si non configuré

Si le profil n'est pas configuré (`[A CONFIGURER]` présent), proposer
`/hacienda-propriete-intellectuelle:entretien-demarrage` ou mode `provisoire`
(défauts : avocat, FR + EU, posture mesurée, canal inline).

---

## Mode `--report [--days N]` (défaut)

Pour chaque entrée dans `watchlist.yaml`, exécuter `inpi_marques_publications_recentes`
sur la fenêtre `[aujourd'hui - N jours, aujourd'hui]` (N défaut : 7, max 30).

### Étapes

1. Si EUIPO TMview est configuré et l'entrée a `territoires` qui inclut "EM" ou autres
   offices européens, appeler aussi `euipo_tmview_search` avec les mêmes mots-clés
   et filtrer par date publication ≥ since (côté skill, pas côté API).
2. Cross-référencer : pour chaque publication détectée, vérifier si elle est
   déjà dans `publicationsDetectees` de l'entrée — si oui, ne pas re-flagger
   (a déjà été notifiée).
3. Calculer la sévérité par délai opposition :
   - 🔴 délai opposition < 30 j (action urgente)
   - 🟠 délai opposition 30-60 j (à préparer)
   - 🟡 nouveau dépôt similaire, délai > 60 j
4. Mettre à jour `watchlist.yaml` :
   - Ajouter les nouveaux hits dans `publicationsDetectees`
   - Mettre à jour `derniereExecution` pour chaque entrée
   - Backup `.bak` horodaté avant écriture

### Format de sortie

[EN-TÊTE CONFIDENTIALITÉ — selon profil]

# Surveillance marques — Rapport [date]

> **Surveillance, pas opinion.** [paragraphe garde-fou tel quel]

> **⚠️ Note du relecteur**
> - **Sources :** [INPI Data ✓ | EUIPO TMview ✓/✗]
> - **Fenêtre :** [N derniers jours, du YYYY-MM-DD au YYYY-MM-DD]
> - **Watchlist :** [N entrées surveillées sur N total]
> - **Avant de s'appuyer :** [1-2 actions concrètes]

**Résumé :** N alertes 🔴 · N alertes 🟠 · N alertes 🟡

## 🔴 OPPOSITION URGENTE (délai < 30 jours)

Pour chaque hit :
- **[signe trouvé]** [numero] · classes [...] · titulaire [...]
  - Publié : [datePublication] · **Opposition jusqu'au [dateLimite] ([N] j restants)**
  - Watchlist match : entrée `WATCH-XXX` "[motCle surveillé]"
  - Référence CPI L.712-4
  - Lien fiche : [urlSource]
  - **Action [review] :** [route vers `recherche-anteriorite-marque` pour analyse confusion détaillée + escalation approbateur]

## 🟠 OPPOSITION À PRÉVOIR (délai 30-60 j)

[même format]

## 🟡 NOUVEAU DÉPÔT SIMILAIRE (délai > 60 j)

[même format, sans urgence opposition]

## 🌐 AGENT-MANAGED

[entrées watchlist marquées `agent_managed: true` — surveillance externalisée
(Corsearch, CompuMark, cabinet tiers) → confirmer directement avec l'agent]

## ❓ DONNÉES MANQUANTES

[entrées watchlist sans dernière exécution réussie ou avec erreur]

**Une question hors de ma checklist :** [observation seconde-ordre — omis si rien]

## Que veux-tu faire ?

1. **Préparer une opposition** — j'ouvre `recherche-anteriorite-marque` sur l'entrée 🔴 de votre choix pour produire l'analyse confusion détaillée
2. **Escalader** — note pour [approbateur du profil]
3. **Compléter les faits** — questions au PM / client / business owner
4. **Surveiller et attendre** — j'ajoute / mets à jour les entrées watchlist concernées
5. **Autre chose** — dis-moi

---

## Mode `--add`

Walk interactif :
1. **motCle** (signe principal à surveiller). Refus si < 3 caractères ou mot du dictionnaire courant — proposer une variante plus précise.
2. **motCleAlternatives** (variantes phonétiques / typographiques, optionnel). Suggérer des variantes en se basant sur le motCle (jumeaux phonétiques FR, transliterations).
3. **classes** Nice 1-45 visées (au moins 1).
4. **titulaire** (optionnel) — pour cibler les dépôts d'un concurrent particulier.
5. **territoires** : `["FR"]` (INPI) / `["FR", "EM"]` (INPI + EUIPO) / autres codes offices.
6. **niveauAlerte** : haut / moyen / bas. Haut = signaler même les 🟡, escalation immédiate sur 🔴. Bas = signaler uniquement 🔴.
7. **destinataires** : canaux Slack `["#legal-marques"]` ou emails. Défaut : profil.
8. **business_owner** : email ou équipe propriétaire métier de cette surveillance.
9. **notes** (libre).

Validation Zod côté skill avant écriture. Backup `.bak` automatique de `watchlist.yaml` avant.

Confirmer à l'utilisateur l'ajout + l'identifiant `WATCH-NNN`.

---

## Mode `--update`

`/surveillance-marque --update WATCH-001`

Lire l'entrée, afficher en YAML, demander quels champs modifier, valider Zod, écrire avec backup.

---

## Mode `--remove`

`/surveillance-marque --remove WATCH-001`

Si `niveauAlerte = "haut"`, demander confirmation explicite + raison (ajoutée en commentaire dans le backup `.bak`). Sinon supprimer après confirmation simple.

---

## Mode `--list`

Affiche la watchlist en table Markdown :

| ID | motCle | Classes | Territoires | Niveau | Dernière exécution | Hits |
|---|---|---|---|---|---|---|
| WATCH-001 | APEXLEAF | 25, 35 | FR, EM | haut | 2026-05-15 | 3 |

---

## Mode `--audit`

Health check de la watchlist :

- **Entrées sans exécution > 30 j** — propose réactivation ou suppression
- **motsCle trop génériques** (< 3 chars OU mot dictionnaire courant détecté) — flag pour révision
- **Doublons** (même motCle + classes ⊆) — propose fusion
- **Classes incohérentes** (ex : entrée "logiciel" sans classe 9 ni 42)
- **Cap recommandé** : signaler si watchlist > 50 entrées (volume d'alertes risque ingérable)

Sortie : tableau des findings + recommandations.

---

## Emplacement de sortie

Mode `--report` écrit à
`~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/surveillance-YYYY-MM-DD.md`
et surface le chemin.

Modifications de `watchlist.yaml` (modes --add, --update, --remove) ne produisent pas de sortie horodatée — juste un message de confirmation.

---

## Ce que ce skill NE fait PAS

- **Décider d'une opposition.** L'évaluation du risque de confusion + la décision d'agir sont du ressort du mandataire INPI ou de l'avocat.
- **Calculer un risque de confusion détaillé.** Pour cela, router vers `recherche-anteriorite-marque` avec le signe concurrent comme input.
- **Envoyer une mise en demeure.** Voir `mise-en-demeure-pi` (v0.1).
- **Modifier l'agent `bopi-watcher`.** L'agent est versionné dans `agents/bopi-watcher.md` ; modifier sa cadence ou ses tools est un ajustement utilisateur via le profil.
- **Surveiller noms de domaine, marketplaces, réseaux sociaux.** Voir l'agent `contrefacon-web`.
- **Opérer sans `inpi_marques_publications_recentes` configuré.** Si le tool n'est pas disponible, le mode `--report` retourne le bucket "Aucune base interrogée" et propose d'exécuter `entretien-demarrage --check-integrations`.

---

## Ton

Précis, concis. L'avocat lit le rapport en 30 secondes, repère les 🔴, décide. Pas de hedging, pas de paragraphes-leçon. Le garde-fou en tête + la conclusion "à valider par mandataire/avocat" font le travail de scope.
