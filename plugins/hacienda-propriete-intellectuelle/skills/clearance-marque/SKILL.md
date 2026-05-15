---
name: clearance-marque
description: Produit une premiere analyse de disponibilite et risque de confusion pour une marque.
argument-hint: "[signe | classes | pays]"
---

> **⚠️ Skill en format v0.1.** Le successeur V1
> `/hacienda-propriete-intellectuelle:recherche-anteriorite-marque` est
> disponible et recommandé. Ce skill reste invoquable pour compatibilité
> jusqu'à v0.4.

# Clearance Marque

## Objectif

Construire un dossier de clearance : recherches, similitudes, classes, territoires, risques et questions pour avocat.

## Workflow

1. Lire profil, signe, produits/services, classes et pays.
2. Rechercher ou demander les resultats INPI, EUIPO, WIPO ou autres.
3. Distinguer identiques, proches, descriptifs et conflits faibles.
4. Marquer `[a verifier]` toute base non consultee.
5. Conclure uniquement comme triage, avec validation humaine.

## Sortie

Note de revue, tableau resultats, risques, options, source officielle, dossier de preuve et Arbre de decision.
