# Hacienda Droit des Affaires

Plugin Hacienda pour cabinets d'avocats d'affaires, juristes in-house en
direction juridique, notaires corporate et indépendants en procédures
collectives.

Chaque sortie reste un brouillon pour avocat ou juriste : source officielle
ou `[a verifier]`, Note du relecteur, arbre de décision 5 options, validation
humaine obligatoire avant tout usage externe.

## Périmètre v1

| Bloc | Skills |
|---|---|
| Contrats commerciaux | `reviser-contrat`, `reviser-nda`, `liste-de-points`, `revue-tabulaire` |
| M&A léger | `gap-review` |
| Procédures collectives | `declaration-creance` |
| Transversal | `entretien-demarrage`, `verifier-citations`, `check-pii` |
| Agents (surveillance) | `bodacc-watcher`, `bodacc-procedures-watcher`, `echeances-societaires` |

## Hors périmètre v1

Volontairement non couverts (couverts par d'autres plugins Hacienda ou décisions produit) :
- RGPD et délégué à la protection des données — voir `hacienda-donnees-personnelles`
- Sapin II et devoir de vigilance — pas dans la roadmap v1
- Marchés publics — ouvert à la demande, v1.1+
- Droit boursier complet (cibles cotées) — limité v2, voir AMF
- Contrats PI (licence brevet, coexistence marques, transfert technologie) — voir `hacienda-propriete-intellectuelle` (le skill `reviser-contrat` renvoie automatiquement)

## Installation

```bash
claude plugins marketplace add /chemin/vers/hacienda-juridique
claude plugins install hacienda-droit-affaires
```

## Configuration des sources

Les sources externes sont configurées dans `~/.config/Hacienda/credentials.json`
(pattern unifié — mêmes clés partagées avec les autres plugins Hacienda) :

```bash
mkdir -p ~/.config/Hacienda
cat > ~/.config/Hacienda/credentials.json <<EOF
{
  "PISTE_CLIENT_ID": "...",
  "PISTE_CLIENT_SECRET": "...",
  "PAPPERS_API_KEY": "..."
}
EOF
chmod 600 ~/.config/Hacienda/credentials.json
```

| Clé | Source | Obtention | Optionnel ? |
|---|---|---|---|
| `PISTE_CLIENT_ID` + `_SECRET` | Légifrance / PISTE | piste.gouv.fr (gratuit) | Recommandé (sans : `verifier-citations` en mode dégradé) |
| `PAPPERS_API_KEY` | Pappers | www.pappers.fr/api (payant) | Optionnel (sans : fallback BODACC public gratuit) |

BODACC OpenDataSoft (procédures collectives, annonces) est public sans clé.

## Premier lancement

```
/hacienda-droit-affaires:entretien-demarrage
```

Configure votre profil cabinet (réutilisé par les autres plugins Hacienda via
`~/.config/Hacienda/profil-cabinet.md`) et vérifie l'état des connexions.

## Plugin compagnon recommandé

`hacienda-ghost` — anonymise les données PII avant envoi à Claude. Sans ghost,
ce plugin fonctionne mais avertit lorsque des données sensibles sont traitées
en clair (`check-pii`).

## Parcours cabinet M&A

| Moment du deal | Skill |
|---|---|
| NDA / confidentialité data-room | `reviser-nda` |
| NBO / LOI / Term Sheet | `loi-term-sheet` |
| Due diligence data-room | `due-diligence-dataroom` |
| SPA / protocole de cession | `spa-review` |
| Garantie d'Actif et de Passif | `gap-review` |
| Signing / closing / post-closing | `closing-checklist-fr` |

`spa-review` est l'entrée naturelle pour un SPA complet. Il orchestre les
renvois vers `gap-review` pour la GAP, `due-diligence-dataroom` pour les
findings DD et `closing-checklist-fr` pour le pilotage du closing.

## Plugins liés

- `hacienda-propriete-intellectuelle` — pour les contrats PI (licence brevet,
  accord de coexistence marques, NDA partenariat R&D). Le skill `reviser-contrat`
  renvoie automatiquement vers PI quand pertinent.
- `hacienda-sources-officielles` — si installé, ses outils sont accessibles à
  ce plugin (mécanisme MCP standard).

## Sources prioritaires

| Sujet | Source primaire | Intégré core |
|---|---|---|
| Code civil, Code de commerce | Légifrance | ✓ |
| Jurisprudence ch. com. Cour de cass. | Judilibre | ✓ |
| Identification entreprise enrichie | Pappers (si configuré) | ✓ |
| Identification entreprise basique | BODACC OpenDataSoft + Annuaire DINUM | ✓ |
| Procédures collectives (annonces) | BODACC (familleavis = procedures-collectives) | ✓ |
| Doctrine fiscale (DD M&A) | BOFiP | ✓ |
| Droit social (clauses non-concurrence salariées) | BOSS | ✓ |
| Droit UE (Rome I, Bruxelles I bis) | Eurlex | ✓ |
| AMF (cibles cotées — anticipation v2) | AMF Décisions | ✗ (hors core v1) |

## Statut

v1 — release initiale.

Brouillons soumis à validation humaine systématique. Les skills juridiques
lourds (`gap-review`, `declaration-creance`) signalent explicitement leur statut
"BROUILLON, VALIDATION AVOCAT OBLIGATOIRE" et appellent la matrice d'approbateurs
configurée dans CLAUDE.md.

## Licence

AGPL-3.0-or-later
