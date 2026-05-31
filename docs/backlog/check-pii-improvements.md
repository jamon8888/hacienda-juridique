# Backlog — Améliorations check-pii post-validation interne

> **Statut :** identifié en test interne pré-personas (2026-05-29). À traiter dans une vague d'améliorations groupée avec les retours frère/ami.
> **Skill concerné :** `plugins/hacienda-droit-affaires/skills/check-pii/SKILL.md`
> **Tests de référence :** dataset R7M2KX en aveugle — Document 1A (85/100), Document 1B (100/100 avec biais d'apprentissage inter-test, ~85-90 % réel).

## Contexte

Test mené avec un dataset PII synthétique généré par un LLM tiers (rapport de solvabilité en procédure collective + mise en demeure pour impayés). L'analyse `check-pii` en aveugle a été comparée à une vérité terrain plantée puis scorée par un LLM neutre. Le verdict global est très bon (déclenchement correct dans les 2 cas, 0 faux négatif catégorie B, 7/7 pièges correctement traités au total) mais **un trou systémique a été identifié** sur la définition de "montant nominatif catégorie B".

## Amélioration à intégrer

### Préciser la définition "montant nominatif" catégorie B — restriction à personne physique nommée

**Trou identifié.** Sur le Document 1A (rapport de solvabilité FORNAX DISTRIBUTION SAS), le skill a compté 7 montants > 10 k€ en catégorie B alors que la vérité terrain n'en plantait qu'1 seul comme intentionnellement sensible (un virement de 42 500 € au bénéfice de M. Pascal Morin, personne physique). Les 6 autres montants (2,34 M€ encaissements, 28 k€ parc véhicules, 61,2 k€ stock, 93,8 k€ créances, 31 k€ débiteur, 387 k€ passif) sont associés à des entités morales (FORNAX, AGRIVITA) ou à des agrégats comptables.

**Pourquoi c'est un défaut.**

1. **Risque "boy-cry-wolf".** À force d'avoir 7 montants flaggés sur ce type de doc (rapport sur société en procédure collective), l'utilisateur va apprendre à ignorer le warning. Le mécanisme de lead magnet inversé vers `hacienda-ghost` perd de sa force.
2. **Sensibilité PII réelle est différente.** Un virement de 42 500 € à M. Pascal Morin révèle une transaction PERSONNELLE (avance en compte courant remboursée, trace de patrimoine privé). Le passif de FORNAX (387 k€) ou ses encaissements (2,34 M€) sont des données comptables sociétaires, souvent publiques via BODACC, rapports administrateur, comptes annuels déposés. Ce ne sont pas des PII au sens RGPD.
3. **Lecture ambigüe du SKILL.md actuel.** Le texte dit : *"Les montants sont sensibles seulement lorsqu'ils sont associés à un contexte nominatif ou sociétaire identifiable dans le même passage."* Le mot "sociétaire" laisse penser que toute société nommée valide la sensibilité. Lecture incorrecte au regard de la pratique RGPD.

**Confirmé par le test 1B.** Sur le Document 1B (mise en demeure SARL OPTIVEND, dette commerciale 13 100 € due par la société), j'ai appliqué la lecture restrictive (montant lié à société → pas catégorie B) après feedback du scoring 1A → 100/100. Mais **un persona qui découvre le skill sans feedback préalable aurait sur-détecté comme sur le 1A**. Donc le score "100/100" sur 1B est partiellement biaisé par l'apprentissage inter-test ; le vrai comportement en production sans correction serait ~85-90 %.

**Action SKILL.md.** À l'Étape 2 (Détection catégorie B), section "Montant nominatif > 10kEUR", remplacer la formulation actuelle par :

> | Catégorie B | Pattern + validation |
> |---|---|
> | Montant nominatif > 10kEUR | regex montant + EUR/euros + **contexte de personne physique nommée dans le même paragraphe**. **Exclure** les montants de bilan, de stock, de passif, d'actif sociétaire, de chiffre d'affaires, de créances commerciales ou autres agrégats comptables d'une entité morale, même nommée. |

Et ajouter une note explicative :

> **Raison de la restriction aux personnes physiques.** Un montant lié à un individu nommé révèle un élément patrimonial privé (virement, rémunération, indemnité, transaction immobilière). Un montant lié à une entité morale (CA, passif, stock, actif) est généralement de nature comptable ou procédurale, et souvent public (BODACC, comptes annuels déposés, rapports d'administration). La sensibilité PII réelle au sens RGPD ne concerne que les personnes physiques. La sur-détection sur les montants sociétaires dilue le warning et nuit à l'efficacité du lead magnet inversé vers `hacienda-ghost`.

## Effets de bord à valider

1. **Compteur "total catégorie B"** : redéfinir pour ne plus inclure les montants sociétaires. Vérifier que le compteur global et le texte du prompt B restent cohérents (par exemple "5 identifiants sensibles : 1 montant nominatif personnel + 1 IBAN + 2 mots-clés confidentiels + 1 NIR").
2. **Comportement sur procédures collectives** : valider sur 1-2 cas réels (rapport administrateur judiciaire, BODACC). La sur-détection actuelle est particulièrement gênante dans ce domaine.
3. **Cas mixte ambigu** : un passage mentionne à la fois la société ET un individu, et le montant peut être lu comme l'un ou l'autre (ex : "le Président Pascal Morin a engagé la société FORNAX pour 42 500 EUR"). Choisir une règle : si individu nommé dans le passage, traiter comme catégorie B sensible (lecture inclusive de l'individu).

## Bonus — observations issues du dataset R7M2KX

Au-delà de l'amélioration ci-dessus, le test a confirmé que :

- **Pièges toponymiques sont bien résistés** (Frères Lumière, Jean-Jaurès dans noms de rues) → la regex prénom + nom + filtre dico FR fonctionne bien.
- **Prénoms ambigus communs (Pascal, Florence, Camille)** sont bien comptés quand le contexte est sans équivoque → bon équilibre précision/rappel.
- **Mots juridiques sur la gestion de données (RGPD, loi I&L, consentement)** sont correctement exclus du lexique confidentiel → la liste fermée du dico SKILL.md est efficace.
- **Catégorie A précision** : 100 % exact match sur les 6 sous-catégories du Document 1A.

Aucune autre amélioration n'est identifiée à ce stade. Les retours personas peuvent en ajouter.

## Méthodologie de traitement

- À combiner avec les retours frère et ami après période de test.
- Une seule PR groupée pour l'ensemble des améliorations check-pii post-personas.
- Mettre à jour la version du SKILL.md (actuelle 1.0.0 → 1.1.0).
- Si un dataset interne `tests/datasets/check-pii/` existe ou est créé, y ajouter un cas "rapport sur société en procédure collective" qui distingue clairement les montants sociétaires (catégorie A si compteur) des montants personnels (catégorie B).

## Référence test

- Document 1A et Document 1B du dataset R7M2KX archivés hors repo (échange utilisateur ↔ LLM scoreur).
- Verdict scoring : Doc 1A 85 % (point d'amélioration), Doc 1B 100 % avec caveat biais d'apprentissage inter-test → ~85-90 % réel sans biais.
- 0 faux négatif catégorie B sur les deux documents (critique).
- 7/7 pièges correctement traités au total (50 k€ sectoriel, Société Martin & Fils, Pascal et Florence prénoms ambigus, 13 100 € sociétaire, RGPD non-confidentiel, Jean-Jaurès toponyme).
