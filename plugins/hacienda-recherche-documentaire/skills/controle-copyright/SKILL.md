---
name: controle-copyright
description: Vérifie qu'une recherche documentaire respecte les droits éditeurs, accès autorisés et limites d'extraction.
argument-hint: "<plan ou résultat de recherche>"
---

# Contrôle Copyright Et Accès

## Interdictions Exactes

```text
pas de contournement de paywall
pas de contournement de CAPTCHA
pas de copie longue
pas de stockage d'identifiants
pas de scraping massif
pas d'API privée non autorisée
```

## Décision

- Autoriser : recherche manuelle, extraction de références, courts extraits nécessaires.
- Demander validation : upload de pièces client, navigation Chrome, réutilisation d'un extrait.
- Refuser : contournement, extraction massive, stockage d'identifiants, copie longue.

## Sortie

Classer chaque action en `autorisé`, `validation requise` ou `refusé`, avec la raison.

## Garde-Fous

- Toute source non consultée directement reste marquée `[à vérifier]`.
- Ne pas reproduire de longs extraits protégés sans base légale ou autorisation.
- La validation humaine est requise avant publication ou transmission client.
- Conserver un dossier de preuve avec source, licence, date et justification d'usage.
