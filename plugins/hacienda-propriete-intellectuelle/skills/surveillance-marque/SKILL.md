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
