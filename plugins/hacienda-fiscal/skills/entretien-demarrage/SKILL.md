---
name: entretien-demarrage
description: Configure le profil de pratique fiscale Hacienda.
argument-hint: "[optionnel: --reconfigurer]"
---

# Entretien De Démarrage Fiscal

## But

Créer ou mettre à jour le profil fiscal dans `~/.claude/plugins/config/hacienda-juridique/hacienda-fiscal/CLAUDE.md`.

## Questions

1. Quel est votre rôle : avocat fiscaliste, expert-comptable, fiscaliste d'entreprise, juriste patrimonial, autre ?
2. Quels impôts couvrez-vous : TVA, IS, IR, IFI, droits d'enregistrement, fiscalité patrimoniale, fiscalité internationale ?
3. Quelles sources utilisez-vous déjà : CGI, LPF, BOFiP, Navis Fiscal, Lefebvre Dalloz, Lexis, Doctrine, revues fiscales ?
4. Comment utilisez-vous BOFiP : source principale, vérification finale, doctrine opposable, veille ?
5. Gérez-vous des contrôles fiscaux, rescrits ou contentieux ?
6. Quels seuils ou sujets imposent une validation humaine avant sortie ?
7. Où doivent être conservés les dossiers de preuve ?

## Sortie

Créer un profil complet sans marqueur `[A CONFIGURER]`, incluant sources fiscales, impôts couverts, seuils de validation, workflows de contrôle fiscal, usage BOFiP et règles de conservation du dossier de preuve.
