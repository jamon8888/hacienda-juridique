# Hacienda Permanences Juridiques

`hacienda-permanences-juridiques` est le plugin d'accueil juridique supervise de la marketplace Hacienda. Il aide les dispositifs pro bono, barreaux, associations, maisons de justice, cliniques professionnelles et cabinets a trier les demandes sans court-circuiter la validation humaine.

Chaque sortie reste un brouillon interne : source officielle ou `[a verifier]`, Note de revue, Arbre de decision, validation humaine et dossier de preuve.

## Premier Lancement

```text
/hacienda-permanences-juridiques:entretien-demarrage
```

## Sources Prioritaires

- Legifrance ;
- service-public.fr et justice.fr ;
- formulaires officiels et aide juridictionnelle ;
- barreaux, juridictions et administrations concernees ;
- pieces de l'usager et regles internes.

## Skills

- `entretien-demarrage`
- `accueil-usager`
- `qualification-probleme`
- `conflits-interets`
- `check-pieces`
- `triage-urgence-delais`
- `memo-superviseur`
- `lettre-usager`
- `handoff-avocat`
- `suivi-dossier-permanence`

## Agents

- `suivi-delais-permanence` : surveille delais et urgences.
- `file-attente-supervision` : maintient les dossiers en attente de revue.
- `veille-urgences` : detecte signaux critiques dans les nouveaux dossiers.
- `suivi-handoffs` : suit orientations et handoffs avocats.

## Livrables

- fiche accueil ;
- qualification provisoire ;
- checklist pieces ;
- note urgence/delais ;
- memo superviseur ;
- lettre usager en langage clair ;
- handoff avocat ;
- dossier de preuve ;
- Note de revue.

## Mode Silencieux

Le Mode silencieux reduit les questions quand le profil est connu, mais ne remplace jamais la validation humaine d'une orientation, d'un courrier ou d'une urgence.
