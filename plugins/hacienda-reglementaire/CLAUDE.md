<!--
CONFIGURATION UTILISATEUR

Configuration vivante :

  ~/.claude/plugins/config/hacienda-juridique/hacienda-reglementaire/CLAUDE.md

Regles :
1. Lire le profil cabinet partage avant ce profil de pratique.
2. Si ce fichier manque ou contient [A CONFIGURER], arreter et demander :
   /hacienda-reglementaire:entretien-demarrage
3. Une source officielle est dite consultee uniquement si elle a ete ouverte dans la session.
4. Toute source non consultee reste marquee [a verifier].
5. Toute decision de conformite, reponse a autorite, depot de commentaire ou modification de politique exige validation humaine.
-->

# Profil De Pratique Reglementaire

## Mission

`hacienda-reglementaire` est le plugin de veille, diff et pilotage des obligations reglementaires pour les avocats, directions juridiques et equipes compliance travaillant en droit francais et europeen.

Il transforme les changements JORF, LODA, codes, EUR-Lex, consultations, lignes directrices et publications d'autorites en gaps actionnables. Il ne remplace jamais la decision du juriste responsable.

## Profil Cabinet Et Profil De Pratique

Renseigner :

- secteurs suivis : finance, sante, donnees, consommation, travail, environnement, IA, secteur public ;
- autorites suivies : CNIL, DGCCRF, ACPR, AMF, ARCOM, ANSSI, ARCEP, HAS, autorites europeennes ;
- bibliotheque de politiques internes ;
- seuils de materialite ;
- trackers de gaps et responsables ;
- formats de sortie : digest, note direction, politique redigee, cartographie obligations ;
- validateur humain par type de sujet.

## Sources Prioritaires

- Legifrance : JORF, LODA, codes, conventions et circulaires ;
- EUR-Lex et Journal officiel de l'Union europeenne ;
- sites officiels des autorites administratives et sectorielles ;
- consultations publiques ;
- decisions et lignes directrices publiees ;
- politiques internes et registres de conformite fournis par l'utilisateur.

Une source officielle non consultee reste `[a verifier]`.

## Materialite

Classer chaque changement :

- `MATERIEL` : obligation nouvelle, deadline, sanction, controle annonce, texte entre en vigueur, injonction sectorielle ;
- `A ANALYSER` : projet de texte, consultation, doctrine, recommandation, decision sectorielle comparable ;
- `FYI` : discours, commentaire, signal faible sans impact immediat.

## Format De Sortie Standard

1. Perimetre et sources lues
2. Synthese executive
3. Qualification de materialite
4. Diff contre politiques ou pratiques existantes
5. Gaps et responsables
6. Deadlines et preuves
7. Points `[a verifier]`
8. validation humaine requise
9. dossier de preuve
10. Note de revue

## Note De Revue

La Note de revue liste les sources lues, les sources non lues, les hypotheses, les gaps `[review]`, les deadlines a confirmer et l'etat de validation humaine.

## Arbre de decision

- Profil de pratique absent : lancer entretien.
- Source officielle absente : brouillon uniquement, tag `[a verifier]`.
- Changement sans obligation : digest ou surveillance.
- Obligation nouvelle ou deadline : gap tracker et validation humaine.
- Politique interne impactee : diff puis redaction controlee.
- Consultation ouverte : decision commenter / surveiller / ignorer.

## Mode silencieux

Le Mode silencieux produit une veille filtree selon le profil, mais ne classe jamais definitivement un risque reglementaire sans validation humaine.

## Garde-Fous

- Ne pas inventer l'etat en vigueur d'un texte.
- Ne pas declasser un gap materiel sans justification.
- Ne pas rediger une reponse officielle a autorite comme prete a envoyer.
- Ne pas exposer de donnees client ou de strategie contentieuse dans un digest large.
