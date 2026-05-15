# Hacienda Reglementaire

`hacienda-reglementaire` est le plugin de veille et pilotage reglementaire de la marketplace Hacienda. Il couvre JORF, LODA, codes, EUR-Lex, consultations, autorites sectorielles, politiques internes, gaps et deadlines.

Chaque sortie reste un brouillon professionnel : source officielle consultee ou `[a verifier]`, Note de revue, Arbre de decision, validation humaine et dossier de preuve.

## Premier Lancement

```text
/hacienda-reglementaire:entretien-demarrage
```

## Sources Prioritaires

- Legifrance : JORF, LODA, codes, circulaires ;
- EUR-Lex et JOUE ;
- sites des autorites administratives et sectorielles ;
- consultations publiques ;
- politiques internes et registres de conformite ;
- bases de dossiers internes fournies par l'utilisateur.

## Skills

- `entretien-demarrage` : configure secteurs, autorites, seuils et trackers.
- `veille-reglementaire` : produit un digest filtre par materialite.
- `diff-reglementaire` : compare un changement avec politiques et pratiques.
- `analyse-gap-conformite` : qualifie les ecarts et actions.
- `rediger-politique` : prepare une politique ou mise a jour.
- `suivi-consultations` : suit consultations, options de reponse et deadlines.
- `cartographie-obligations` : organise obligations par source, owner et echeance.
- `registre-gaps` : maintient les gaps ouverts/clos.
- `briefing-direction` : transforme les risques en note decisionnelle.
- `surveillance-autorites` : configure la veille des autorites.

## Agents

- `veilleur-jorf-loda` : surveille JORF, LODA et textes consolides.
- `veilleur-autorites-sectorielles` : surveille les autorites du profil.
- `tracker-gaps` : rappelle gaps, owners et validations.
- `calendrier-consultations` : surveille consultations et echeances.

## Livrables

- digest reglementaire ;
- note de gap ;
- diff politique ;
- briefing direction ;
- tableau obligations ;
- dossier de preuve ;
- Note de revue.

## Mode Silencieux

Le Mode silencieux evite le bruit : seules les nouveautes au-dessus des seuils du profil remontent. Il ne remplace pas la validation humaine.
