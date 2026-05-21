---
name: depot-preuve-creation
version: "2.0.0"
description: Organise un dossier de preuve de creation, d'anteriorite d'usage ou de titularite avec registre, chronologie et lacunes probatoires.
argument-hint: "[open | add-evidence | timeline | bundle | review]"
---

# Depot Preuve Creation

## Role

Structurer, pour revue interne, un dossier de preuve de creation, d'anteriorite d'usage ou de titularite sur une oeuvre, un logiciel, un usage de marque ou un dossier precontentieux. Le skill inventorie les faits allegues, les pieces disponibles, les incertitudes et les manques, puis produit des livrables normalises inter-skills en attente de validation humaine.

Utiliser en priorite avec les references locales :
- `references/preuve-creation-fr.md`
- `references/grille-pieces-par-type.md`

## Ne fait pas

- Ne rend pas un avis juridique definitif sur la titularite, la validite d'un droit ou l'issue d'un contentieux.
- Ne presente pas une preuve preparee comme une force probante definitivement acquise.
- Ne remplace pas un depot officiel, un constat, une verification de source primaire ou une validation humaine.
- Ne transforme pas des allegations client en faits etablis sans piece associee.
- Ne masque pas les incertitudes : tout element non documente reste indique `[a verifier]`.

## Intake

Recueillir et separer clairement :

- **Objet** : oeuvre graphique, logiciel, marque / usage, opposition / nullite, dossier precontentieux.
- **Question posee** : creation, anteriorite, usage, chaine de droits, preparation de dossier.
- **Faits allegues** : dates, auteurs, contributeurs, contexte de creation, diffusion, exploitation.
- **Pieces disponibles** : emails, commits, exports, contrats, factures, tickets, captures, constats, enveloppe Soleau / e-Soleau, horodatages techniques.
- **Pieces manquantes** : ce qui est attendu mais absent.
- **Incertitudes** : identite auteur, date exacte, version pertinente, perimetre des droits, source secondaire non consultee.
- **Contrainte de sortie** : usage interne, revue contradictoire, preparation d'envoi, preparation precontentieuse.

## Mode d'analyse

Le skill opere uniquement dans l'un de ces cinq modes :

- `open` : ouvre le dossier, qualifie l'objet, structure les faits et produit un premier `Evidence Register`.
- `add-evidence` : ajoute une ou plusieurs pieces, met a jour le `Evidence Register` et complete `Proof Gaps`.
- `timeline` : ordonne les evenements et versions dans une `Timeline`.
- `bundle` : prepare un paquet de revue ou de transmission et produit une `Bundle Checklist`.
- `review` : relit un dossier existant, teste la coherence entre faits et pieces, puis produit une `Reviewer Note`.

Pour chaque mode :
- distinguer **faits allegues**, **pieces verifiees**, **pieces mentionnees non consultees**, **incertitudes** ;
- indiquer la source immediate de chaque piece ;
- signaler toute contradiction de date, d'auteur, de version ou de titularite.

Contrat explicite `mode -> entrees minimales -> sorties obligatoires` :

- `open`
  - **Entrees minimales** : objet, question posee, faits allegues initiaux, au moins une piece disponible ou une liste de pieces attendues, contrainte de sortie.
  - **Sorties obligatoires** : `Evidence Register`, `Proof Gaps`.
- `add-evidence`
  - **Entrees minimales** : identifiant du dossier, au moins une nouvelle piece ou une correction de piece, fait vise, source / detenteur.
  - **Sorties obligatoires** : `Evidence Register`, `Proof Gaps`.
- `timeline`
  - **Entrees minimales** : identifiant du dossier, au moins deux evenements ou versions, dates ou plages de dates, pieces rattachees si disponibles.
  - **Sorties obligatoires** : `Timeline`, `Proof Gaps`.
- `bundle`
  - **Entrees minimales** : identifiant du dossier, liste des pieces a transmettre ou relire, objectif du paquet, contraintes de confidentialite ou de destinataire si connues.
  - **Sorties obligatoires** : `Bundle Checklist`.
- `review`
  - **Entrees minimales** : identifiant du dossier, un `Evidence Register` existant ou equivalent, objectif de revue, question(s) de validation humaine.
  - **Sorties obligatoires** : `Reviewer Note`, `Proof Gaps`.

## Grille des pieces

Appliquer la grille adaptee a l'objet dans `references/grille-pieces-par-type.md`, puis classer les pieces par categorie :

1. **Preuves de creation** : brouillons, maquettes, versions, exports, cahier de laboratoire, tickets, journaux de build.
2. **Preuves de date** : enveloppe Soleau / e-Soleau, horodatage technique, email date, depot Git, constats, accuses de reception.
3. **Preuves de contribution** : auteurs identifies, contrats, cessions, clauses salarie / freelance, bons de commande, livrables agence.
4. **Preuves d'exploitation ou d'usage** : publication, mise en ligne, distribution, facture, campagne, packaging, captures de diffusion.
5. **Preuves de contexte contentieux** : mise en demeure, captures adverses, comparatifs, rapports internes, constat.

Chaque entree du registre doit preciser :
- identifiant de piece ;
- description courte ;
- date alleguee ;
- source / detenteur ;
- lien avec le fait a prouver ;
- niveau de fiabilite apparent ;
- reserve ou limite `[a verifier]` le cas echeant.

Format stable d'identifiant de piece :

- Utiliser `PC-AAAA-NNN`.
- `AAAA` = annee d'entree de la piece dans le dossier.
- `NNN` = numero sequentiel sur trois chiffres, incremente sans reutilisation.
- Exemple : `PC-2026-001`.
- Si une piece remplace une version precedente, conserver l'identifiant initial et indiquer la version en metadonnee, par exemple `v2`, sans changer l'identifiant principal.

## Chronologie

Produire une `Timeline` avec une ligne par evenement probatoire :

- date ou plage de dates ;
- evenement de creation, modification, livraison, publication, usage ou contestation ;
- piece(s) rattachee(s) ;
- personne ou entite associee ;
- commentaire sur la solidite du point de preuve.

Ordre de lecture recommande :
1. naissance du projet ou du signe ;
2. iterations et versions intermediaires ;
3. livraisons ou publications ;
4. actes de depot ou d'horodatage ;
5. exploitation, diffusion ou usage oppose ;
6. contestation, opposition ou precontentieux.

## Trous probatoires

Produire `Proof Gaps` en distinguant :

- **Trou critique** : impossible, en l'etat, d'etayer date, auteur, titulaire ou usage principal.
- **Trou important** : la preuve existe peut-etre mais n'est pas localisee, complete ou lisible.
- **Trou de coherence** : dates incompatibles, version non tracee, auteur non raccorde a une cession.
- **Trou de forme** : piece exploitable en interne mais peu robuste seule en contradiction ou contentieux.

Pour chaque trou, proposer :
- la piece cible attendue ;
- le detenteur probable ;
- le canal de recuperation ;
- l'urgence ;
- la mention explicite qu'une validation humaine reste requise avant usage externe.

## Sortie

Les noms `Evidence Register`, `Timeline`, `Proof Gaps`, `Bundle Checklist`, `Reviewer Note` sont des labels techniques normalises inter-skills. Ils ne doivent pas etre traduits ni renommes.

Selon le mode, produire les sorties nommees suivantes :

### Evidence Register

Structure minimale fixe :

- `dossier_id`
- `objet`
- `mode`
- `date_mise_a_jour`
- `pieces`

Chaque entree de `pieces` doit contenir au minimum :

- `piece_id`
- `categorie`
- `description`
- `date_alleguee`
- `source_detenteur`
- `fait_vise`
- `statut_piece` : `consultee` | `mentionnee_non_consultee` | `manquante`
- `fiabilite_apparente` : `faible` | `moyenne` | `elevee`
- `reserve`

### Timeline

Structure minimale fixe :

- `dossier_id`
- `objet`
- `periode_couverte`
- `evenements`

Chaque entree de `evenements` doit contenir au minimum :

- `event_id`
- `date_ou_plage`
- `type_evenement`
- `description`
- `piece_ids`
- `acteur_ou_entite`
- `niveau_certitude`
- `contradictions_ou_reserves`

### Proof Gaps

Structure minimale fixe :

- `dossier_id`
- `objet`
- `gaps`

Chaque entree de `gaps` doit contenir au minimum :

- `gap_id`
- `niveau` : `critique` | `important` | `coherence` | `forme`
- `constat`
- `fait_impacte`
- `piece_cible`
- `detenteur_probable`
- `action_attendue`
- `urgence`
- `validation_humaine_requise`

### Bundle Checklist

Structure minimale fixe :

- `dossier_id`
- `objectif`
- `destinataire`
- `pieces_indexees`
- `pieces_manquantes`
- `contraintes_confidentialite`
- `validations_humaines_requises`

Checklist de dossier a transmettre ou relire : index des pieces, nommage, pagination, source, confidentialite, doublons, pieces manquantes, validations humaines requises.

### Reviewer Note

Note de revue courte indiquant :
- ce que le dossier permet de soutenir a ce stade ;
- ce qui demeure incertain ;
- quelles verifications humaines ou sources primaires doivent encore etre faites ;
- quel usage prudent est envisageable en interne.

## Validation humaine

Validation humaine obligatoire avant :

- depot ou declaration externe ;
- courrier contradictoire ou precontentieux ;
- affirmation de titularite non documentee ;
- qualification d'une piece comme determinante ;
- arbitrage final sur la suffisance probatoire.

Toujours rappeler en conclusion :
- ceci est un travail de structuration probatoire et non un conseil juridique definitif ;
- les sources non consultees restent `[a verifier]` ;
- la force probante finale depend du contexte, de la contradiction et de l'appreciation humaine.
