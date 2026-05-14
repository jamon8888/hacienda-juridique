---
name: entretien-demarrage
description: Configure les plateformes de recherche documentaire et les règles de sécurité du cabinet.
argument-hint: "[optionnel: --reconfigurer]"
---

# Entretien De Démarrage

## Questions

1. Quelles bases utilisez-vous : Doctrine, Lefebvre Dalloz, Lexis, Lextenso, Lexbase, Dalloz, Navis, Elnet, Lamyline ?
2. Le cabinet autorise-t-il Claude dans Chrome sur ces domaines ?
3. Le cabinet autorise-t-il l'upload de pièces client dans ces plateformes ?
4. Quels types de contenus peuvent être cités : références uniquement, courts extraits, liens internes ?
5. Quel niveau de validation humaine est requis avant d'utiliser une source éditoriale dans un livrable ?

## Sortie

Écrire le profil dans :

```text
~/.claude/plugins/config/hacienda-juridique/hacienda-recherche-documentaire/CLAUDE.md
```
