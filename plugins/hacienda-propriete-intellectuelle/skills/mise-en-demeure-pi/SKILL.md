---
name: mise-en-demeure-pi
version: "2.0.0"
description: >
  Prépare, relit ou structure une lettre d'assertion PI (mise en demeure,
  lettre informelle, ultime avertissement) en droit français. Calibre la
  fermeté selon la posture cabinet, le destinataire et le titre invoqué.
  Brouillon soumis à validation matrice d'approbateurs OBLIGATOIRE.
argument-hint: "[lettre, mode (--informal-first | --escalation-letter | --final-warning), side, destinataire, titre invoqué, pièces]"
authors: ["Hacienda"]
tags: [contentieux, enforcement, mise-en-demeure, pre-judiciaire, lettre-assertion]
---

# Skill — Mise en demeure PI

> **BROUILLON, VALIDATION MATRICE D'APPROBATEURS OBLIGATOIRE.**
>
> Une mise en demeure PI n'est pas une action judiciaire, mais sa formulation
> engage : tout ce qui est écrit pourra être opposé en défense, en demande
> reconventionnelle (procédure abusive 1240 C.civ, concurrence déloyale,
> dénigrement) ou produit devant la juridiction saisie. Ce skill prépare,
> relit ou structure la lettre — il ne l'envoie jamais, ne la signe jamais,
> et n'autorise pas son envoi sans approbation conforme à la matrice du
> profil cabinet.
>
> **Frontière avec les autres skills PI.**
> - `tri-contrefacon` en amont : pré-qualification du signal et arbitrage
>   `watch / soft outreach / mise en demeure / no action`.
> - `contrefacon-droit-auteur`, `contrefacon-dessin-modele`,
>   `tableau-contrefacon-brevet` : qualification fine de l'atteinte par titre.
>   La mise en demeure consomme leur sortie, elle ne la refait pas.
> - `saisie-contrefacon` : si urgence et preuve à constater par voie
>   judiciaire (L.615-5, L.716-7, L.521-4 CPI).
> - `contentieux-pi` en aval : si la lettre est ignorée, contestée ou si
>   l'escalade judiciaire est décidée.

---

## Examples

<example>
<user>/h-pi:mise-en-demeure-pi ./signal-contrefacon.md --side=titulaire --mode=escalation-letter --titre=marque --destinataire=concurrent-direct</user>
<response>
1. Pré-flight `check-pii` sur le signal et les pièces contrepartie.
2. Lecture profil cabinet : posture enforcement `agressive`, matrice d'approbateurs ligne « Mise en demeure » = avocat PI + GC.
3. Qualification posture : `aggressive` confirmée (concurrent direct, pas d'escalade automatique déclenchée).
4. Destinataire : concurrent direct → ton ferme, délai resserré, menace assignation explicite.
5. Titre : marque française enregistrée, statut vérifié `inpi_search_marques` + `inpi_marque_details` (non déchue L.714-5).
6. Articles fondateurs : L.713-2, L.713-3, L.716-4 CPI ; demande cessation, retrait stock, indemnisation, engagement écrit.
7. Délai : 15 jours, mention explicite d'assignation au TJ Paris (L.716-3) à expiration.
8. Sortie : lettre escalatoire prête à signer (mode silencieux) + note relecteur séparée avec stratégie d'escalade + arbre 5 options.
</response>
</example>

<example>
<user>/h-pi:mise-en-demeure-pi ./atteinte-da-partenaire.md --side=titulaire --mode=informal-first --titre=droit-auteur --destinataire=partenaire-commercial</user>
<response>
1. Pré-flight `check-pii` sur le dossier, contrat de partenariat fourni en pièce.
2. Profil cabinet : posture `mesurée` ; escalade automatique « contrepartie partenaire actuel » → matrice montée à avocat PI + GC + sponsor business.
3. Qualification posture : passage de `mesurée` à `conservatrice` du fait de l'escalade automatique.
4. Destinataire : partenaire commercial → ton conciliant, pas de menace explicite, proposition d'entretien.
5. Titre : droit d'auteur — opposabilité vérifiée (preuve de création, antériorité), L.111-1, L.122-4 CPI.
6. Demandes : cessation amiable, clarification du périmètre contractuel, ouverture d'un dialogue avant qualification d'atteinte.
7. Délai : 30 jours, sans menace procédurale (sera escaladé via `--escalation-letter` si pas de réponse).
8. Sortie : lettre informelle prête à signer + note relecteur soulignant le risque commercial et la nécessité d'un go business avant envoi.
</response>
</example>

<example>
<user>/h-pi:mise-en-demeure-pi ./atteinte-client-actuel.md --side=titulaire --mode=informal-first --titre=marque --destinataire=client-actuel</user>
<response>
1. Pré-flight `check-pii` sur les pièces internes (contrats client, échanges commerciaux).
2. Profil cabinet : posture `conservatrice` par défaut + escalade automatique « contrepartie = client actuel ».
3. Approbateurs : matrice montée à avocat PI + GC + sponsor business (cf. profil).
4. Étape 1 : lettre informelle, ton conciliant, sans qualification définitive d'atteinte.
5. Étape 2 (conditionnelle) : si pas de réponse à 30 jours, escalade documentée vers `--escalation-letter` avec validation matrice augmentée renouvelée.
6. Sortie : (a) lettre informelle prête à signer ; (b) projet d'escalade conditionnelle archivé en outputs/, non transmis ; (c) note relecteur explicitant la stratégie en deux temps et la sponsorisation business indispensable.
</response>
</example>

<example>
<user>/h-pi:mise-en-demeure-pi ./suite-lettre-informelle.md --side=titulaire --mode=final-warning --titre=brevet --destinataire=concurrent-direct</user>
<response>
Mode `--final-warning` : deuxième lettre après absence de réponse à la lettre informelle (30 jours écoulés, accusé de réception versé au dossier).
1. Pré-flight `check-pii` sur l'historique d'échanges.
2. Profil cabinet : posture `agressive`, matrice approbateurs « Assignation » déjà sponsor business + GC + avocat brevets engagés.
3. Titre : brevet français en vigueur, statut vérifié `inpi_search_brevets` + `inpi_brevet_details` + Espacenet.
4. Articles fondateurs : L.615-1, L.615-3 (référé), L.615-5 (saisie-contrefaçon), L.615-7 (indemnisation) CPI.
5. Ton ferme, délai bref (10 jours), énumération précise et réaliste des actions envisagées à expiration : (a) assignation au fond TJ Paris (compétence exclusive L.615-17), (b) référé interdiction L.615-3, (c) saisie-contrefaçon L.615-5.
6. Pas de menace inutile : aucune action que le titulaire ne serait pas prêt à engager.
7. Sortie : lettre prête à signer + note relecteur avec arbre d'options post-expiration et renvoi `contentieux-pi` / `saisie-contrefacon`.
</response>
</example>

---

## Chargement du profil

> Lire `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md` et `~/.claude/plugins/config/hacienda-juridique/company-profile.md`, bloc enforcement :
> - **Posture enforcement par défaut** — `agressive` / `mesurée` / `conservatrice`.
> - **Matrice d'approbateurs** — ligne « Mise en demeure » et ligne « Lettre informelle ».
> - **Escalades automatiques** — contrepartie partenaire / client actuel / contrepartie significativement plus puissante / risque médiatique.
> - **Politique PII** — `passive` / `active` / `strict` + seuil B, catégories sensibles PI (brevets pré-publication, inventeurs non publiés, montants cession, NDA en cours).
> - **Rôle utilisateur** — avocat inscrit / mandataire marques (CPI L.422-4) / juriste interne / non-juriste — détermine l'en-tête de confidentialité et la portée du secret professionnel.

Si le profil n'est pas peuplé (`[A CONFIGURER]` présent), stopper et demander
`/h-pi:entretien-demarrage` avant toute préparation de lettre substantielle.
Conserver les marqueurs `[à vérifier]` visibles tant que le profil reste
incomplet.

---

## Intake

1. **Mode** — `--mode=informal-first` | `--mode=escalation-letter` | `--mode=final-warning` (obligatoire).
2. **Side** — `--side=titulaire` (offensif) | `--side=destinataire` (réponse à lettre reçue). Une lettre sans side n'a pas de sens.
3. **Fichier(s)** — chemin du signal de contrefaçon, du dossier amont (`tri-contrefacon`), de la lettre reçue (en `--side=destinataire`) ou du brouillon en relecture.
4. **Titre invoqué** — `--titre=marque` | `--titre=brevet` | `--titre=dessin-modele` | `--titre=droit-auteur` | `--titre=secrets-affaires` (obligatoire en `--side=titulaire`).
5. **Destinataire** — `--destinataire=concurrent-direct` | `--destinataire=partenaire-commercial` | `--destinataire=client-actuel` | `--destinataire=hebergeur` | `--destinataire=plateforme` | `--destinataire=distributeur` | `--destinataire=particulier`. Calibre ton et délais.
6. **Pièces** — liste datée des captures, constats, factures, enregistrements, contrats opposés.
7. **Calendrier** — urgence commerciale, événement, salon, lancement, prescription approchante (L.615-8 brevets 5 ans, L.716-5 marques 5 ans, L.521-3 DM 3 ans).

---

## Gate non-juriste

- [ ] Mode fourni (`--informal-first` / `--escalation-letter` / `--final-warning`).
- [ ] Side fourni.
- [ ] `check-pii` exécuté.
- [ ] Profil cabinet lu, posture confirmée, escalades automatiques évaluées.
- [ ] Matrice d'approbateurs identifiée pour ce mode + ce destinataire.
- [ ] Titre invoqué identifié et statut vérifié (en vigueur, non déchu, opposable).
- [ ] Articles fondateurs cités contre Légifrance ou tagués `[à vérifier]`.
- [ ] Délai calibré sur posture + destinataire + urgence.
- [ ] Menaces procédurales proportionnées et réalisables (pas de bluff exposant à procédure abusive 1240 C.civ).
- [ ] Sortie contient note 5 champs + arbre 5 options + footer PII.

Si l'utilisateur n'est pas juriste, refuser toute conclusion présentée comme
avis juridique final et demander validation par un professionnel habilité
(avocat PI ou mandataire INPI dans son périmètre) avant tout envoi.

---

## Pré-flight `check-pii`

Avant toute analyse substantielle sur des pièces client, contrats opposés ou
correspondances : invoquer `/h-pi:check-pii` sur le corpus fourni. Corpus
typique en mise en demeure PI :

- pièces contrepartie (captures, factures, extraits site, contrats opposés) ;
- contrats internes invoqués (cession, licence, NDA, partenariat) ;
- pièces probatoires datées (constats d'huissier, captures horodatées) ;
- historique d'échanges en `--mode=final-warning` (accusés de réception, courriers antérieurs).

Si le résultat déclenche le prompt cas B (seuil B atteint ou catégorie
sensible PI détectée — brevets pré-publication, inventeurs non publiés,
montants cession > 10k€, NDA en cours), attendre la décision utilisateur
(anonymiser via `hacienda-ghost`, ignorer, ou stopper) avant de poursuivre.

Si l'utilisateur choisit « ignorer », apposer un caveat
`[PII non traitée — décision utilisateur]` dans la note du relecteur.

---

## Mode Anno Desktop Optionnel

Si la distribution Hacienda + Anno Desktop est active, `mise-en-demeure-pi`
utilise Anno pour retrouver et citer localement des faits déjà autorisés du
dossier (constat huissier, captures contrefaçon, contrats opposés, historique
correspondance), jamais comme source primaire. Appeler `anno_health` avant tout
outil Anno ; si Anno est indisponible, poursuivre en `fallback_hacienda`. La
lettre reste soumise à validation humaine par l'approbateur de la matrice
configurée.

Le brouillon de mise en demeure doit être rattaché au `matter_vault` du
dossier et à un `workflow_blueprint` `pi-enforcement-letter-v1`. Quand Anno
Tabular est disponible, créer une revue tabulaire des faits et pièces avec
`tabular_review_create` : faits/pièces en lignes, qualification juridique +
opposabilité + chronologie en colonnes, `review_status`, `decision_status`,
responsable, échéance, citation et `validation_status` par cellule. Toute
cellule faible ou non citée reste `[à vérifier]`.

Outils contentieux Anno spécifiques :
- `legal_prescription_check` avant tout courrier escalatoire — éviter d'invoquer
  des faits prescrits (L.716-5 marques, L.615-8 brevets, L.521-3 D&M) ;
- `legal_validate_field` pour confirmer la cohérence des données d'identité du
  destinataire (raison sociale, SIREN, adresse signification) ;
- `legal_risk_review` pour tester sur-promesses, points faibles et risques de
  riposte (procès abusif 1240 C.civ) ;
- `legal_rehydrate_citation` uniquement pour citations locales destinées à
  l'utilisateur autorisé.

Utiliser `grid_to_work_product` seulement après validation pour produire la
lettre finale. Tout passage Anno reste une source interne Anno, jamais comme
source primaire ; les titres invoqués (brevets, marques, D&M, droit d'auteur)
et les arrêts cités restent vérifiés via `hacienda-sources-officielles` et les
outils PI Hacienda.

## Outils MCP à privilégier

Appeler les outils par leur nom exact quand le serveur `Hacienda Propriété
Intellectuelle` est disponible. Ne pas inventer de tool hors périmètre ; si
une source ou un registre n'a pas été consulté directement, garder
`[à vérifier]`.

- Socle textes, jurisprudence et droit UE : `piste_status`,
  `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`,
  `judilibre_get_decision`, `eurlex_recherche`, `eurlex_consulter`.
- Marques, BOPI et EUIPO : `inpi_search_marques`, `inpi_marque_details`,
  `inpi_marques_publications_recentes`, `euipo_tmview_search`,
  `bopi_dernieres_publications`.
- Brevets et Espacenet : `inpi_search_brevets`, `inpi_brevet_details`,
  `espacenet_search`, `espacenet_brevet_details`.
- Anno, quand disponible, reste une source interne de dossier : jamais un
  registre officiel INPI, EUIPO, OEB, OMPI ou BOPI.

---

## Emplacement des sorties

Écrire les livrables dans le dossier de pratique ou de dossier configuré :
`~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/outputs/`
ou
`~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/matters/<slug-dossier>/outputs/`.

En `--mode=informal-first` avec stratégie d'escalade conditionnelle, archiver
le projet de lettre escalatoire dans `outputs/` mais ne pas le présenter
comme livrable transmissible — il reste un brouillon de réserve.

---

## Niveaux de criticité

Échelle canonique appliquée à toute appréciation subjective de ce skill :

| Niveau | Icône | Signification dans le contexte de ce skill |
|---|---|---|
| Faible | 🟢 | Lettre calibrée : ton aligné posture cabinet, destinataire validé, escalation proportionnée. |
| Moyen | 🟡 | Formulations à durcir ou assouplir selon escalation (ton trop souple si répétition, trop ferme si partenaire). |
| Élevé | 🟠 | Ton inadapté au destinataire (trop agressif vs partenaire, trop souple vs contrefacteur récidiviste) ou inadéquation avec posture cabinet. |
| Bloquant | 🔴 | Lettre escalatoire envoyée à contrepartie partenaire critique sans approbation hiérarchique adaptée OU contenant menace disproportionnée exposant à un risque de procédure abusive (1240 C.civ). |

Plancher cross-skill (CLAUDE.md §4) : ce skill ne peut pas dégrader
silencieusement une cote 🔴 amont (typiquement issue de `tri-contrefacon`,
`tableau-contrefacon-brevet`, `contrefacon-droit-auteur` ou
`contrefacon-dessin-modele`) sans déclaration explicite.

---

## Sortie

### Format livrable

```
[En-tête de confidentialité selon le rôle utilisateur]

> **⚠️ Note du relecteur**
> - **Sources :** Légifrance ✓ / INPI Data ✓ / EUIPO TMview ✓ / Espacenet ✓ / Judilibre ✓ (cocher ✗ si non connectée)
> - **Lecture :** intégrale ({N} pièces, {M} contrats opposés) | partielle
> - **Signalé pour ton jugement :** {N} éléments marqués [review] | aucun
> - **Fraîcheur :** vérification statut titre invoqué à {date} — non déchu / en vigueur | {N} mises à jour
> - **Avant de t'appuyer dessus :** {validation matrice approbateurs / compléter pièces / escalader / prêt pour signature}

# Mise en demeure PI — {destinataire} — {mode}

## Étape 1 — Pré-flight `check-pii`

1. Invoquer `check-pii` sur le corpus (pièces contrepartie, contrats opposés, historiques d'échanges).
2. Traiter le prompt cas B si déclenché (anonymisation `hacienda-ghost` / ignorer / stopper).

## Étape 2 — Lecture profil cabinet

1. Lire posture enforcement (`agressive` / `mesurée` / `conservatrice`).
2. Identifier la ligne pertinente de la matrice d'approbateurs (lettre informelle vs mise en demeure vs assignation).
3. Détecter les escalades automatiques applicables (partenaire / client actuel / contrepartie puissante / risque médiatique).

## Étape 3 — Qualification de la posture

1. Posture par défaut tirée du profil.
2. Override conditionnel si escalade automatique déclenchée — exemple : posture `agressive` rétrogradée à `mesurée` car destinataire = partenaire commercial actuel.
3. Documenter explicitement l'override dans la note du relecteur.

## Étape 4 — Identification du destinataire

- Concurrent direct : ton ferme, délai resserré, menace procédurale crédible.
- Partenaire commercial : ton conciliant, proposition d'entretien, escalade business obligatoire avant tout envoi.
- Client actuel : ton conciliant + sponsor business obligatoire ; lettre informelle uniquement en première intention.
- Hébergeur / plateforme : notification structurée LCEN art. 6, demande de retrait, pas de menace contre l'hébergeur lui-même tant que la qualification d'éditeur n'est pas posée.
- Distributeur de bonne foi : ton informatif, demande de cessation et de communication des sources amont.
- Particulier : proportionnalité renforcée, éviter la disproportion 1240 C.civ.

## Étape 5 — Identification du titre invoqué + vérification statut

| Titre | Vérification | Outils |
|---|---|---|
| Marque FR / UE | enregistrement, classes, non déchue (L.714-5 / art. 58 RMUE) | `inpi_marque_details`, `euipo_tmview_search` |
| Brevet FR / EP | délivré, en vigueur, annuités à jour | `inpi_brevet_details`, `espacenet_brevet_details` |
| Dessin et modèle | enregistré, valide, non déchu | `inpi_search_brevets` (DM hébergés INPI), EUIPO eSearch |
| Droit d'auteur | originalité, antériorité de création, opposabilité (L.111-1) | preuve de création, dépôt huissier, registres SACEM/SCAM/APP selon œuvre |
| Secrets d'affaires | mesures de protection raisonnables (L.151-1) | contrats NDA, politique interne, périmètre |

Un titre dont le statut n'a pas été vérifié contre la source primaire reste `[à vérifier]` et toute qualification d'atteinte reste conditionnelle.

## Étape 6 — Articles fondateurs

| Atteinte | Articles |
|---|---|
| Contrefaçon de brevet | L.613-3, L.613-4, L.615-1, L.615-3 (référé), L.615-5 (saisie), L.615-7 (indemnisation), L.615-17 (TJ Paris exclusif) CPI |
| Contrefaçon de marque | L.713-2, L.713-3, L.716-4, L.716-4-10 (indemnisation), L.716-7 (saisie) CPI |
| Contrefaçon de DM | L.521-1, L.521-3 (prescription), L.521-4 (saisie) CPI |
| Atteinte au droit d'auteur | L.111-1, L.122-4, L.122-5 (exceptions), L.331-1 (juridiction), L.335-2 (pénal) CPI |
| Atteinte secrets d'affaires | L.151-1 à L.154-1 CPI |
| Reproduction non autorisée | L.122-4 CPI |

Toute citation d'article doit être vérifiée via `legifrance_get_article` ou tagguée `[à vérifier]`.

## Étape 7 — Demandes

Énumérer précisément :
- cessation immédiate de l'usage litigieux ;
- retrait du stock, des canaux de distribution, des supports en ligne ;
- destruction des produits contrefaisants (le cas échéant — éviter en `--informal-first`) ;
- indemnisation provisionnelle ou évaluation contradictoire ;
- engagement écrit de non-récidive ;
- communication des sources (fournisseurs amont, volumes commercialisés) ;
- prise en charge des frais.

Calibrer la liste sur le mode : `--informal-first` se limite à la cessation et au dialogue ; `--escalation-letter` ajoute indemnisation et engagement écrit ; `--final-warning` reprend tout avec délai bref.

## Étape 8 — Délai imparti

Calibrer sur posture + destinataire + urgence :

| Contexte | Délai indicatif |
|---|---|
| Urgence (salon, lancement, prescription proche) | 7 jours |
| Standard concurrent direct | 15 jours |
| Standard partenaire / client actuel | 30 jours |
| `--final-warning` post-informelle | 10 jours |
| Hébergeur / plateforme (notification LCEN) | délai « promptement » de l'art. 6 |

Le délai doit être réaliste : un délai trop court fragilise la mise en demeure ; un délai trop long affaiblit la position en référé.

## Étape 9 — Vérification destination

- Canal d'envoi : LRAR systématique pour preuve de date ; email avec accusé pour traçabilité parallèle ; voie d'huissier en `--final-warning` si jurisprudence locale l'exige.
- Copie au mandataire INPI le cas échéant (en marques, articulation avec opposition en cours).
- Secret professionnel : un en-tête « secret professionnel » sur un document destiné à la contrepartie ne crée AUCUNE protection — il est retiré dans le livrable externe.
- Vérifier que le destinataire correspond bien à l'entité juridique responsable (recherche company_full_profile / extrait Kbis si nécessaire) : adresser à la mauvaise société rend la lettre inopérante.

## Étape 10 — Post-flight `verifier-citations`

1. Vérifier les articles cités contre Légifrance via `legifrance_get_article`.
2. Vérifier le statut du titre invoqué (en vigueur, non déchu, opposable).
3. Vérifier les arrêts de référence cités contre Judilibre.
4. Tout élément non vérifié reste `[à vérifier]` et la lettre n'est pas considérée prête à signer.

## Étape 11 — Sortie

Deux livrables distincts :

(a) **Lettre prête à envoyer** — en mode silencieux livrable externe : pas d'en-tête confidentialité interne, pas de narration skill, pas de méta-commentaire ; texte calibré ton avocat senior PI, papier en-tête approprié, visa du signataire conforme à la matrice approbateurs.

(b) **Note relecteur séparée** pour l'avocat / GC / sponsor business : stratégie d'escalade (étapes prévues, conditions de bascule), tableau des points `[review]`, arbre 5 options post-envoi (réponse reçue / silence / contestation / proposition transactionnelle / demande reconventionnelle).

---

## Résumé exécutif

{Trois phrases partner-ready : qualification du signal, calibrage du ton retenu, prochaine action.}

## Lettre — corps

{Texte de la lettre, prêt à signer, sans narration.}

## Note relecteur — stratégie d'escalade

{Arbre des options post-envoi, conditions de bascule vers mode supérieur, renvois `contentieux-pi` / `saisie-contrefacon`.}

## Une question hors de ma checklist habituelle

{Observation transversale, ou omission si rien d'honnête à dire.}

## Que veux-tu faire ? Choisis une option :

1. **Rédiger** — je prépare une lettre escalatoire (`--escalation-letter`) en cas d'absence de réponse, ou un communiqué pour ton client interne.
2. **Escalader** — je rédige une note vers {approbateur tiré du profil — typiquement avocat PI + GC, voire sponsor business si escalade automatique}.
3. **Compléter les faits** — je liste les pièces à compléter (statut titre, captures horodatées, preuve de notoriété) avant tout envoi.
4. **Surveiller et attendre** — j'ajoute le sujet au tracker du dossier avec date de revisite (typiquement 15 ou 30 jours).
5. **Autre** — précise.

[Ce skill a traité {N} mentions identifiantes. Pour anonymiser automatiquement avant envoi à Claude, installer hacienda-ghost.](https://hacienda.diy/ghost)
```

---

## Modes courts

- `--informal-first` : lettre informelle préalable, ton conciliant, proposition d'entretien, sans menace explicite ni qualification définitive d'atteinte. Délai 30 jours typiquement. Utilisé en première intention sur partenaire commercial, client actuel, distributeur de bonne foi, ou quand la posture cabinet est `mesurée` / `conservatrice`.
- `--escalation-letter` : lettre escalatoire avec menace explicite d'action (assignation au fond, référé interdiction, saisie-contrefaçon), délai resserré (7-15 jours), demandes complètes (cessation + indemnisation + engagement écrit). Utilisé en première intention sur concurrent direct quand la posture cabinet est `agressive`, ou après absence de réponse à `--informal-first`.
- `--final-warning` : ultime avertissement après échec des étapes précédentes (lettre informelle puis escalatoire restées sans réponse satisfaisante). Délai bref (10 jours), énumération précise et réaliste des actions envisagées dès expiration (TJ Paris L.615-17 pour brevets, juridictions spécialisées pour marques et DM, référé L.615-3 / L.716-6, saisie-contrefaçon L.615-5 / L.716-7 / L.521-4). Aucune menace ne doit être formulée si l'utilisateur n'est pas prêt à l'exécuter — toute disproportion expose à procédure abusive 1240 C.civ.

---

## Ton

Ton d'avocat senior PI : technique, précis, sobre, factuel. Toujours rappeler
le titre invoqué et la qualité du signataire. Calibrer la fermeté au
destinataire et à la posture cabinet.

- Pas d'adjectifs inutiles (« manifestement », « notoirement », « grossièrement »).
- Pas d'allégations non probatoires (« vous avez intentionnellement », « en pleine connaissance »).
- Ne JAMAIS franchir la ligne procès abusif (1240 C.civ) : menaces proportionnées, réalisables, et que le titulaire est prêt à exécuter.
- Pas de qualification pénale (L.335-2, L.615-14) sans appui spécifique — la mise en demeure civile suffit dans la quasi-totalité des cas et la mention pénale gratuite expose à dénigrement et chantage (312-10 CP).
- En `--informal-first`, le ton est conciliant mais reste juridique : pas de naïveté commerciale, pas d'engagement implicite de renonciation.

---

## Mode silencieux pour livrables externes

**La mise en demeure EST le livrable externe.** Cas archétype d'usage du
mode silencieux : tout ce qui distingue le brouillon de travail interne de
la lettre prête à signer doit être retiré.

- **En-tête de confidentialité interne** : RETIRER. Le document part à la
  contrepartie ; l'apposition d'un en-tête « secret professionnel » sur un
  document destiné à un tiers ne crée pas la protection (CEDH *Michaud c.
  France*) et peut être lue comme une tentative de couverture artificielle.
- **Narration skill** (« j'utilise le skill X », « j'ai consulté Légifrance pour... ») : COUPER.
- **Tags de provenance** (`[Légifrance]`, `[INPI Data]`) : CONSOLIDER en note de bas de page discrète ou supprimer.
- **Méta-commentaires en ligne** (« à confirmer avec le client », « voir si l'on durcit ») : COUPER, déplacer en note relecteur séparée.
- **Renvois vers d'autres skills** (« lance ensuite `/h-pi:contentieux-pi`... ») : SORTIR du livrable, placer dans la note relecteur séparée.

Le livrable conserve :
- papier en-tête approprié (cabinet d'avocats / mandataire INPI / direction juridique selon rôle utilisateur) ;
- visa du signataire conforme à la matrice approbateurs (un seul nom signe, mais la matrice a validé) ;
- références claires des titres invoqués (numéro d'enregistrement, classes, date de dépôt) ;
- énumération précise des demandes ;
- délai chiffré et daté ;
- mention LRAR ou voie d'huissier selon le canal.

La lettre doit se lire comme un courrier rédigé par un associé. Tout
méta-commentaire vit dans la note relecteur séparée ou dans un message à
part, jamais dans le corps de la lettre.

---

## Ce skill ne fait pas

- **Ne décide pas seul d'envoyer** — la validation par la matrice d'approbateurs du profil cabinet est OBLIGATOIRE ; ce skill prépare et structure, l'avocat / GC / sponsor business arbitre.
- **Ne signe pas** — la signature appartient à l'avocat inscrit, au mandataire dans son périmètre, ou au directeur juridique selon le canal.
- **Ne réplique pas à la réponse de la contrepartie** — un skill séparé (à venir) traite la réponse à une mise en demeure reçue ; en attendant, repasser par `tri-contrefacon` puis `mise-en-demeure-pi --side=destinataire`.
- **Ne fait pas la qualification fine de l'atteinte** — renvoi à `tableau-contrefacon-brevet` (brevets), `contrefacon-droit-auteur` (œuvres), `contrefacon-dessin-modele` (DM), `contrefacon-marque` (marques) selon le titre.
- **Ne dépose pas plainte pénale** — L.335-2 (contrefaçon droit auteur), L.615-14 (brevet), L.716-9 et suivants (marque) relèvent d'une stratégie distincte avec dépôt de plainte au parquet, hors périmètre.
- **Ne se substitue pas à l'action judiciaire** — si la lettre est ignorée ou contestée, passage à `contentieux-pi` pour assignation au fond, référé interdiction, ou `saisie-contrefacon` si preuve à constater en urgence.
- **Ne fait pas de transaction** — la négociation d'un protocole transactionnel (2044 C.civ) relève d'un skill séparé `transaction-pi` (à venir) ; toute proposition transactionnelle reçue en réponse impose une revue dédiée.
- **N'envoie jamais** la lettre, ne déclenche aucun envoi automatique, ne demande aucun outil d'envoi.
