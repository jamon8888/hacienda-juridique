---
name: qualification-oeuvre
description: >
  Qualification juridique d'une création au regard du droit d'auteur français
  (CPI Livre I) — analyse multi-étapes : (1) originalité L.111-1 + CJUE Infopaq,
  (2) catégorie L.112-2 (liste non exhaustive), (3) titularité initiale selon
  7 cas (créateur unique / collaboration / collective / composite / commande /
  salariat / posthume), (4) distinction droits patrimoniaux L.122-1+ vs droit
  moral L.121-1 (perpétuel inaliénable imprescriptible), (5) durée 70 ans post
  mortem L.123-1, (6) enjeux selon objectif (préventif / défensif / contentieux).
  Point d'entrée du bloc droit d'auteur V4. Ne rédige PAS de contrat de cession
  (= cession-droit-auteur V4.1), ne qualifie PAS une contrefaçon (=
  contrefacon-droit-auteur V4.2). Ce skill NE conclut JAMAIS à l'existence ou
  l'inexistence du droit d'auteur (= juge in fine).
argument-hint: "[description œuvre | nature | contexte création | objectif préventif/défensif/contentieux]"
---

# /qualification-oeuvre

> **Qualification juridique ≠ avis d'opportunité.** Ce skill produit une
> **analyse de qualification** pour aider l'avocat spécialisé en propriété
> littéraire et artistique. Il NE conclut PAS à l'existence ou à la
> non-existence du droit d'auteur (= rôle du juge, in fine), NE rédige PAS un
> contrat de cession ou de licence (= `cession-droit-auteur` V4.1 /
> `licence-droit-auteur` V4.1), NE qualifie PAS une contrefaçon (=
> `contrefacon-droit-auteur` V4.2). Le droit d'auteur **naît automatiquement à
> la création** (CPI L.111-1) sans formalité de dépôt — mais la **preuve de la
> date de création et de l'identité de l'auteur** reste critique en cas de
> litige (cf. `depot-preuve-creation` v0.1 préservé).

## Examples

```
/hacienda-propriete-intellectuelle:qualification-oeuvre "Roman littéraire 320 pages — auteur personne physique seule — édition envisagée chez éditeur tiers — objectif préventif"
```

```
/hacienda-propriete-intellectuelle:qualification-oeuvre "Logiciel SaaS B2B développé par équipe de 4 développeurs salariés — code source + interface graphique + base de données utilisateurs — objectif préventif avant levée de fonds"
```

```
/hacienda-propriete-intellectuelle:qualification-oeuvre "Contenu marketing — vidéo publicitaire 30 sec commandée à agence externe — diffusion TV + web prévue — objectif préventif avant lancement campagne"
```

(Le skill demandera la description, le contexte de création, la date, les preuves disponibles et l'objectif.)

---

## QUALIFICATION JURIDIQUE, PAS AVIS D'OPPORTUNITÉ

**Reformuler en tête de chaque output. Ne jamais l'enlever. Ne jamais l'adoucir.**

> **Qualification juridique, pas avis d'opportunité.** Ce skill produit une
> analyse de qualification au regard du droit d'auteur français — il
> identifie les critères d'originalité (L.111-1 + jurisprudence CJUE
> Infopaq), la catégorie applicable (L.112-2 — liste non exhaustive), le cas
> de titularité initiale (7 cas exhaustifs), le partage droits patrimoniaux
> vs droit moral, la durée de protection, et les enjeux selon l'objectif
> (préventif / défensif / contentieux). Il NE conclut PAS à l'existence ou
> à l'inexistence du droit d'auteur sur l'œuvre concrète — c'est le **juge**
> qui tranche in fine, après contestation, sur la base de la preuve apportée
> par les parties. Le droit d'auteur naît automatiquement à la création sans
> formalité de dépôt (CPI L.111-1), mais la qualification reste un exercice
> juridique nécessitant validation par un avocat spécialisé en propriété
> littéraire et artistique avant tout acte (exploitation, cession,
> contestation, action en contrefaçon). Une qualification erronée porte des
> conséquences à sens unique : cession invalide, action contrefaçon mal
> fondée (déboutement + dépens + risque concurrence déloyale), violation
> droit moral non anticipée (action en cessation + dommages-intérêts).

C'est le garde-fou le plus visible du skill. Sous-qualifier l'originalité =
porte à sens unique (exploitation engagée, cession signée, dépôt fait sans
mesures de preuve). Sur-qualifier = porte à 2 sens, l'avocat affine.
Rester sur la porte à 2 sens.

---

## Charger le profil pratique avant de commencer

Avant tout, lire :
1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Récupérer :
- **Rôle** depuis `## 1. Profil cabinet et profil de pratique PI` (avocat
  inscrit au barreau / juriste interne / non-juriste — change l'en-tête de
  confidentialité ET le périmètre du secret professionnel). Le droit d'auteur
  relève du droit commun de la propriété littéraire et artistique — il N'EXISTE
  PAS de profession réglementée « mandataire en droit d'auteur » équivalente au
  mandataire INPI marques ou OEB brevets. Le rôle pertinent est donc **avocat
  spécialisé en propriété littéraire et artistique** (ou à défaut PI générale).
- **Secteurs des clients dominants** (édition / audiovisuel / logiciel / design
  / mode / publicité / multimedia / transversal — calibre les exemples et la
  vigilance sur les régimes spéciaux : L.113-9 logiciels, L.113-7 audiovisuel,
  L.132-36 journalistes, L.341-1 bases de données).
- **Posture conseil par défaut** (préventif vs réactif — calibre le ton :
  préventif = anticipation contractuelle, réactif = analyse défensive d'une
  contestation ou préparation contentieuse).
- **Matrice d'approbateurs** pour les escalades (avocat spécialisé PI / GC /
  Direction selon enjeu).

Ce skill ne conclut JAMAIS « œuvre protégée par le droit d'auteur » ni
« titularité acquise sans contestation possible » — il identifie les critères
applicables et les zones de risque.

Si le profil contient `[A CONFIGURER]`, surfacer :

> Le profil pratique n'est pas configuré — c'est ce qui adapte la posture, les
> secteurs, et la chaîne d'approbation à ta pratique. Tu peux continuer en
> mode provisoire (réponses génériques taguées `[non configuré]`) ou lancer
> `/hacienda-propriete-intellectuelle:entretien-demarrage` (10 à 15 minutes).

---

## Intake — 5 questions en batch unique

Avant toute analyse, poser les 5 questions ci-dessous **en une seule fois**.
Ne pas dérouler le workflow tant que les réponses ne sont pas obtenues — ou
explicitement marquées « non applicable » par l'utilisateur.

**1. Description de l'œuvre**
- **Nature** : texte / image / musique / vidéo / logiciel / design / multimedia
  / autre
- **Forme tangible** : manuscrit / fichier numérique (préciser format) /
  partition / maquette / code source (préciser langage) / autre
- **Description précise** (objet, contenu, finalité — viser ≥ 30 mots ; si
  description vague, push pour précision : « pour qualifier l'originalité
  sérieusement, j'ai besoin de comprendre les choix créatifs concrets — peux-tu
  décrire l'œuvre plus en détail ? »)

**2. Contexte de création**
- **Créateur(s)** : personne physique seule / plusieurs personnes physiques
  (préciser nombre et rôles)
- **Commande** : oui / non ; si oui, par qui (client externe / employeur /
  personne morale) et selon quel cadre contractuel (devis signé / contrat de
  commande explicite / mail informel / rien d'écrit)
- **Salariat** : oui / non ; si oui, fonctions du salarié (la création
  relève-t-elle de ses **fonctions habituelles** définies au contrat de
  travail ou de la fiche de poste, ou bien a-t-elle été créée **hors fonctions**
  voire sur temps personnel ?) — distinction critique pour L.113-9 (logiciels)
  et pour le régime salarié droit commun.
- **Collaboration** : plusieurs créateurs avec apports identifiables et
  séparables (œuvre de collaboration L.113-2 al.1) ? Apports fusionnés sans
  séparation possible (indice œuvre de collaboration unitaire ou œuvre
  collective selon initiative) ?
- **Œuvre collective** : initiative + édition + diffusion sous le nom d'une
  personne morale (encyclopédie, dictionnaire, périodique, site web
  institutionnel) ? Critère cumulatif L.113-2 al.3.

**3. Date de création + preuves disponibles**
- **Date de création** : YYYY-MM-DD ou approximation (préciser fourchette
  si incertain — « début 2024 », « courant T2 2025 »)
- **Preuves disponibles** : manuscrits horodatés / mails datés contenant
  fichiers attachés / dépôts copyright.fr / constat d'huissier ou commissaire
  de justice / enveloppe Soleau INPI (déposée — date à confirmer) / dépôt
  notarié / publication antérieure horodatée / aucune preuve formelle
- Si **aucune preuve formelle**, signaler immédiatement : « la qualification
  est possible, mais en cas de litige tu auras besoin de constituer la preuve
  de date — je le note en recommandation de fin et je peux ouvrir
  `depot-preuve-creation` (v0.1) ensuite. »

**4. Catégorie suspectée** (référence non exhaustive L.112-2)
- Littéraire / artistique (peinture, sculpture, dessin, photographie) /
  musicale / audiovisuelle (cinéma, télévision, vidéo) / logicielle / base de
  données (structure et/ou contenu) / design (arts appliqués) / dramatique /
  chorégraphique / graphique / typographique / multimédia (composition de
  plusieurs catégories) / autre
- En cas d'œuvre hybride (ex : site web = design + texte + logiciel +
  éventuellement musique), lister TOUTES les catégories applicables — le
  régime juridique peut différer par composant.

**5. Objectif de la qualification**
- **Préventif** : avant exploitation / diffusion / cession / dépôt produit —
  on veut sécuriser titularité, anticiper les cessions nécessaires, planifier
  les clauses droit moral.
- **Défensif** : contestation reçue d'un tiers (lettre, mise en demeure,
  action) — on veut établir notre titularité, l'originalité de l'œuvre,
  l'absence d'antériorité tierce.
- **Contentieux** : action en contrefaçon en préparation contre un tiers —
  on prépare le dossier, on évalue les preuves de date et de titularité,
  on identifie les droits violés.

L'objectif **change l'orientation finale du livrable** : le squelette
d'analyse reste identique (étapes 1 à 5), mais l'étape 6 « Enjeux identifiés »
et la section « Recommandations » sont calibrées différemment.

Si l'utilisateur ne sait pas trancher entre 2 objectifs, demander : « décris
le déclencheur — qu'est-ce qui t'amène à qualifier cette œuvre maintenant ? »

---
