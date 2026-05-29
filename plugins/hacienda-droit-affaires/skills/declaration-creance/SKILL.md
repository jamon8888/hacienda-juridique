---
name: declaration-creance
description: >
  Rédige une déclaration de créance art. L.622-24 C.com. dans le cadre d'une
  procédure collective (sauvegarde, redressement, liquidation). Calcule
  automatiquement la date de forclusion (2 mois post-publication BODACC,
  4 mois si créancier hors UE/EEE). Lookup BODACC via
  `bodacc_procedures` de `@hacienda/core` pour récupérer
  type de procédure, date jugement, date publication et mandataire désigné
  (extraction depuis `raw`, fallback `[à vérifier]` si parsing échoue).
  Format conforme aux usages mandataire judiciaire. Brouillon, validation
  avocat/mandataire obligatoire.
version: "2.0.0"
argument-hint: "[SIREN débiteur, créance, jugement, publication BODACC]"
authors: ["Hacienda"]
tags: [procedures-collectives, declaration-creance, forclusion, bodacc, l622-24]
---

# Skill — Déclaration de créance L.622-24

> **BROUILLON, validation humaine (avocat)/MANDATAIRE OBLIGATOIRE.**
>
> Le délai de forclusion **2 mois** à compter de la publication BODACC du jugement d'ouverture (art. L.622-24 C.com. `[Légifrance]`) est une **règle dure** : passé ce délai, la créance est éteinte sauf relevé de forclusion exceptionnel art. L.622-26 C.com. `[Légifrance]` (démontrer que la défaillance n'est pas due au fait du créancier ou que la créance était inconnue du débiteur). Délai porté à **4 mois** pour le créancier domicilié hors France métropolitaine/UE/EEE. Vérification calendrier OBLIGATOIRE.
>
> Sortie destinée au mandataire = **livrable externe** : retirer l'en-tête de confidentialité avocat (cf. CLAUDE.md plugin §2).

---

## Examples

<example>
<user>/h-droit-affaires:declaration-creance --siren=123456789 --montant=85000 --nature=facture</user>
<response>
1. Pré-flight `check-pii` (montants nominatifs + SIREN → seuil B fréquent).
2. Lookup BODACC via `bodacc_procedures`.
   → RJ ouvert 15 mars 2026, publication BODACC 22 mars 2026 `[BODACC]`.
   → Mandataire extrait de `raw` : Maître X (cabinet Y) `[BODACC]` — ou `[à vérifier]` si parsing échoue.
3. Calcul forclusion : 22 mars + 2 mois = 22 mai 2026 → 4 jours restants → 🔴 URGENT.
4. Rédaction déclaration projet (template mandataire) + récapitulatif + pièces à joindre.
5. Note du relecteur : forclusion serrée, envoi LRAR sous 24-48h recommandé.
</response>
</example>

<example>
<user>/h-droit-affaires:declaration-creance --siren=987654321 --montant=12000 --nature=loyer-impayes</user>
<response>
Lookup BODACC : LJ publiée 1er février 2026 `[BODACC]`.
Forclusion : 1er février + 2 mois = 1er avril 2026.
Aujourd'hui : 18 mai 2026 → **FORCLUSION DÉPASSÉE de 47 jours** → 🔴🔴.

Options :
1. Requête en relevé de forclusion art. L.622-26 C.com. `[Légifrance]` — recevabilité strictement exceptionnelle, charge de preuve élevée `[review]`.
2. Abandon de la créance (perte définitive).

Veux-tu que je prépare la trame de la requête en relevé ? (validation humaine (avocat) obligatoire avant dépôt, instruction par juge-commissaire.)
</response>
</example>

<example>
<user>/h-droit-affaires:declaration-creance --siren=456789123 --montant=240000 --nature=prestation --etranger=true</user>
<response>
Créancier hors UE/EEE → délai 4 mois.
BODACC : sauvegarde publiée 10 avril 2026 `[BODACC]`.
Forclusion : 10 avril + 4 mois = 10 août 2026 → 84 jours restants → 🟢.
Mandataire extrait : `[à vérifier]` (champ non parsable dans `raw` — vérifier sur jugement d'ouverture publié BODACC).
Montant > seuil approbateur 100 k€ → escalade recommandée.
</response>
</example>

---

## Chargement du profil

> Lire `~/.claude/plugins/config/hacienda-juridique/hacienda-droit-affaires/CLAUDE.md`, bloc procédures collectives :
> - **Position** — créancier (cas dominant ici, à confirmer)
> - **Tribunaux habituels** — pour repérage / cohérence
> - **Approbateur déclaration > 100 k€** — escalade automatique au-delà du seuil
> - **Politique PII** — `passive` / `active` (défaut) / `strict` + seuil B
> - **Qualité signataire** — service contentieux, DAF, dirigeant habilité

Si le bloc est `[A CONFIGURER]` : stopper et demander `/h-droit-affaires:entretien-demarrage`. Sans seuil approbateur ni qualité signataire, la chaîne de validation interne n'est pas opposable.

---

## Intake

1. **SIREN débiteur** — `--siren=123456789` (**obligatoire**)
2. **Montant créance** — `--montant=85000` (en euros, **obligatoire**)
3. **Nature créance** — `--nature=facture|loyer|prestation|salaire|pret|...`
4. **Justificatifs** (optionnel) — `--docs=./facture.pdf,./bon-livraison.pdf`
5. **Date naissance créance** (optionnel) — si omise et nécessaire au calcul intérêts, demander avant de poursuivre
6. **Privilège revendiqué** (optionnel) — `--privilege=conservateur|nantissement|hypotheque|vendeur|fiscal|social|...`
7. **Créancier étranger** (optionnel) — `--etranger=true` pour créancier domicilié hors France métropolitaine/UE/EEE (délai porté à 4 mois)

Si `--siren` ou `--montant` absent : stopper et demander explicitement. Pas de valeur par défaut.

---

## Gate non-juriste

- [ ] `--siren` et `--montant` fournis (refus du défaut)
- [ ] Pré-flight `check-pii` exécuté et décision utilisateur respectée
- [ ] Profil cabinet bloc procédures collectives lu, seuil approbateur et qualité signataire identifiés
- [ ] Lookup `bodacc_procedures` exécuté ; type procédure, date publication, mandataire renseignés ou flagués `[à vérifier]`
- [ ] Calcul forclusion vérifié (jours restants cohérents avec date du jour, délai 2 ou 4 mois selon `--etranger`)
- [ ] Mandataire extrait depuis `raw` ou flagué `[à vérifier]` — pas de valeur fabriquée
- [ ] Montant total cohérent avec composantes (principal + intérêts et frais L.622-28 + TVA)
- [ ] Sortie comprend : statut forclusion + récap procédure + projet déclaration + pièces + note du relecteur + question hors checklist + arbre 5 options

---

## Mode Anno Desktop Optionnel

Pour reconstruire une chronologie de factures, mises en demeure, jugements ou échanges, appeler `anno_health`, puis `detect`. Utiliser `legal_timeline`, `legal_prescription_check`, `legal_validate_field` et `legal_search` sur corpus déjà ingéré. Les annonces BODACC restent vérifiées via `bodacc_procedures` ou `bodacc_by_siren`.

## Outils MCP à privilégier

Appeler les outils par leur nom exact quand le serveur `Hacienda Droit des Affaires` est disponible. Ne pas inventer de tool hors périmètre ; si une source n'a pas été consultée directement, garder `[à vérifier]`.

- Socle sources officielles : `piste_status`, `legifrance_recherche`, `legifrance_get_article`, `judilibre_recherche`, `judilibre_get_decision`, `eurlex_recherche`, `eurlex_consulter`.
- Entreprises, BODACC et procédures collectives : `company_full_profile`, `bodacc_by_siren`, `bodacc_procedures`.
- Tout résultat issu d'un corpus client ou d'un outil interne reste distingué des sources primaires officielles.

## Emplacement des sorties

```
outputs/declaration-creance-<siren>-<date-publication-bodacc>.md
```

Format date : `YYYY-MM-DD`. Si la déclaration porte sur plusieurs créances pour le même SIREN, suffixer `-<nature>` (ex. `-loyers`, `-prestations`).

---

## Sortie

Structurer la sortie avec : faits retenus, droit applicable, analyse, incertitudes, sources consultées, décisions proposées, prochaine action et validation humaine. Toute source non consultée directement reste `[à vérifier]`.

## Étape 1 — Pré-flight et lookup BODACC

1. Invoquer `check-pii`. Probabilité élevée seuil B (SIREN + montants + dénominations). Respecter la décision utilisateur.
2. Lire profil cabinet (bloc procédures collectives) et `~/.claude/plugins/config/hacienda-juridique/company-profile.md`.
3. Lookup procédure : `bodacc_procedures` (wrapper MCP : `bodacc_procedures`). Filtre côté API : `familleavis = "procedures-collectives"`, tri `dateparution DESC`.
4. Identifier sur l'annonce la plus récente d'ouverture :
   - **Type de procédure** — déduit de `typeavis` (sauvegarde / redressement judiciaire / liquidation judiciaire)
   - **Date publication BODACC** — `dateparution` (point de départ du délai L.622-24)
   - **Date jugement d'ouverture** — extraite de `raw` (souvent dans le texte de l'annonce) ; fallback `[à vérifier]` si parsing échoue
   - **Mandataire désigné (nom + adresse)** — n'est **pas** un champ direct de `BodaccAnnonce`. Tenter extraction depuis `raw` (réponse BODACC OpenDataSoft non parsée par `parseAnnonce`). Si parsing échoue : marquer `[à vérifier]` en sortie et recommander vérification manuelle sur l'annonce BODACC publiée.
   - **Tribunal et numéro RG** — `ville` + extraction depuis `raw` ; fallback `[à vérifier]`.
5. Si aucune procédure trouvée pour ce SIREN : stopper et demander confirmation (le débiteur est-il bien en procédure ? Le SIREN est-il exact ?).

Tags de provenance : `[BODACC]` pour tout champ extrait, `[à vérifier]` pour tout champ non parsable.

---

## Étape 2 — Calcul forclusion L.622-24 (règle dure)

```
date_publication_bodacc = dateparution (BODACC)
delai_base = 2 mois
si creancier_etranger (hors France/UE/EEE) : delai_base = 4 mois (art. R.622-24 C.com. [Légifrance])

date_forclusion = date_publication_bodacc + delai_base
jours_restants  = date_forclusion - aujourd'hui
```

**Échelle d'alerte** (canonique cabinet) :

| Jours restants | Statut | Action |
|---|---|---|
| > 30 j | 🟢 | Envoi normal — LRAR sous 1-2 semaines |
| 7-30 j | 🟠 | Envoi prioritaire — LRAR sous 3 jours |
| 0-6 j | 🔴 | URGENT — LRAR sous 24-48 h + double envoi email avec AR |
| < 0 j | 🔴🔴 | **FORCLUSION** — proposer requête en relevé art. L.622-26 C.com. [Légifrance] ou abandon |

Cas particuliers à signaler (sans calculer automatiquement) :
- Créance née postérieurement au jugement d'ouverture art. L.622-17 C.com. `[Légifrance]` — régime distinct (créances post privilégiées).
- Créance non échue à la date du jugement — le jugement d'ouverture ne la rend pas exigible (art. L.622-29 C.com. `[Légifrance]`) ; déclarée à hauteur du capital restant dû `[review]`.
- Créance en monnaie étrangère — conversion taux jugement `[review]`.

---

## Étape 3 — Calcul créance (composantes)

| Composante | Règle | Tag |
|---|---|---|
| Principal | Montant en euros à la date du jugement d'ouverture | [utilisateur fourni] |
| Intérêts contractuels | Arrêtés à la date du jugement art. L.622-28 C.com. [Légifrance] — sauf prêts ou délais de paiement >= 1 an (intérêts continuent à courir) | calcul + [review] si zone grise |
| Frais accessoires / clause pénale (de retard) | Arrêtés à la date du jugement art. L.622-28 C.com. [Légifrance] — assimilés aux intérêts de retard et majorations | [review] |
| TVA | Si applicable selon nature créance et régime | calcul |
| **Total déclaré** | Somme des composantes | — |

Présenter un tableau détaillé : Nature / Base / Taux ou règle / Montant arrêté au [date jugement] / Total. Si la date du jugement est `[à vérifier]`, présenter le calcul à la date publication BODACC et flaguer l'écart possible en note du relecteur.

---

## Étape 4 — Privilège revendiqué (le cas échéant)

| Type | Exemples | Justificatifs à joindre |
|---|---|---|
| Privilège général | Trésor (fisc), URSSAF, super-privilège salariés | Avis à tiers détenteur, état des cotisations, bulletins de paie |
| Privilège spécial mobilier | Vendeur de meubles, conservateur, créancier nanti, gagiste | Contrat de vente, facture, acte de nantissement / gage inscrit |
| Sûreté réelle immobilière | Hypothèque conventionnelle / légale / judiciaire | Copie acte notarié + bordereau d'inscription au Service de la publicité foncière |
| Réserve de propriété | Vente avec clause de réserve de propriété art. L.624-16 C.com. [Légifrance] | CGV signées avec clause + facture + bon de livraison |

Tag `[review]` sur la recevabilité du privilège si l'inscription est tardive, mal libellée, ou si le rang est contestable. Ne **jamais** présenter un privilège comme acquis sans vérification de l'inscription / publication.

---

## Étape 5 — Rédaction de la déclaration (format mandataire)

Template :

```
[En-tête créancier : dénomination, forme sociale, SIREN, siège, représentant légal, coordonnées]

À : [Mandataire judiciaire — nom, cabinet, adresse — extrait BODACC ou [à vérifier]]

Référence procédure :
- Tribunal de commerce de [ville]
- N° RG : [...]
- Type : [sauvegarde / redressement judiciaire / liquidation judiciaire]
- Date jugement d'ouverture : [date]
- Date publication BODACC : [date]

OBJET : DÉCLARATION DE CRÉANCE — [Débiteur, SIREN]

Conformément à l'art. L.622-24 C.com. [Légifrance], le créancier soussigné déclare au passif de [débiteur, SIREN] la créance suivante :

| Nature | Principal | Intérêts arrêtés au [date jugement] | Frais / clause pénale | TVA | Total |
|---|---|---|---|---|---|
| [facture / loyer / prestation / ...] | [€] | [€] arrêtés au [date jugement] — art. L.622-28 C.com. [Légifrance] | [€] arrêtés au [date jugement] — art. L.622-28 C.com. [Légifrance] | [€] | [€] |

**Total déclaré : [€]**

Privilège revendiqué (le cas échéant) : [type + fondement légal + référence inscription] [review]

Justificatifs joints : [liste numérotée — facture(s), bon(s) de livraison, contrat, mise en demeure, acte de nantissement, etc.]

Fait à [ville], le [date].
Signature, qualité du signataire ([service contentieux / DAF / dirigeant habilité, conformément au profil cabinet]).
```

L'art. L.622-21 C.com. `[Légifrance]` (arrêt des poursuites individuelles) interdit toute mention d'action individuelle parallèle — vérifier qu'aucune phrase ne laisse entendre un recouvrement direct hors procédure.

---

## Étape 6 — Post-flight `verifier-citations`

Appel automatique sur la sortie complète. Articles à vérifier : L.622-21, L.622-24, L.622-26, L.622-28, L.622-29 (présents dans `references/articles-c-civ-c-com-index.md` → tag `[Légifrance]`). R.622-24 (réglementaire, délais procéduraux) présent dans l'index → tag `[Légifrance]` si cité. Si PISTE non configuré : mode dégradé documenté.

---

## Étape 7 — Sortie

### Format livrable

```
[En-tête de confidentialité selon le rôle utilisateur — voir les 4 variantes dans CLAUDE.md du plugin]

> ⚠️ Note du relecteur
> - **Sources :** Légifrance ✓ / BODACC ✓ / Pappers ✓ (cocher ✗ si non connectée)
> - **Lecture :** annonce BODACC d'ouverture + {N} justificatifs fournis
> - **Signalé pour ton jugement :** {N} éléments marqués [review] (privilège, qualification créance non échue, conversion devise) | aucun
> - **Fraîcheur :** vérification jurisprudence post-{date} sur L.622-24 / L.622-26 — {N} arrêts intégrés [Judilibre] | recherche impossible, vérifier manuellement Cass. com. récente
> - **Avant de t'appuyer dessus :** {action concrète — ex. confirmer l'extraction mandataire sur le PDF BODACC source si flagué [à vérifier]} | « prêt pour envoi LRAR »

# 🟢/🟠/🔴/🔴🔴 Statut forclusion
- Date publication BODACC : [date]
- Délai applicable : 2 mois (ou 4 mois si créancier étranger)
- Date forclusion : [date]
- Jours restants : [N]
- Action recommandée : [envoi normal / prioritaire / URGENT / requête en relevé L.622-26]

# Récapitulatif procédure
- Tribunal : [TC X]
- N° RG : [...] [BODACC] ou [à vérifier]
- Type : [sauvegarde / RJ / LJ]
- Date jugement d'ouverture : [date]
- Mandataire désigné : [nom + adresse] [BODACC] ou [à vérifier] (extraction `raw` BODACC échouée — vérifier sur PDF publication)

# Déclaration de créance — projet
[texte complet du template Étape 5]

# Pièces à joindre
1. [...]
2. [...]
...

# Une question hors de ma checklist habituelle
{Observation transversale qu'un relecteur attentif ferait — ex. nature de créance susceptible de basculer en post art. L.622-17, articulation avec une action en responsabilité dirigeant, soupçon de compensation possible. Omettre si rien d'honnête.}

# Que veux-tu faire ? Choisis une option et je la déroule :

1. **Rédiger** — je produis le courrier recommandé LRAR au mandataire avec déclaration + bordereau pièces, prêt à signer.
2. **Escalader** — note d'escalade vers {approbateur déclaration > 100 k€ configuré} si montant au-dessus du seuil, avec faits-clés, forclusion et décision attendue.
3. **Compléter les faits** — questions ouvertes à poser à {compta / service contentieux / conseil} avant envoi (intérêts contractuels exacts, justificatifs manquants, privilège à vérifier).
4. **Surveiller et attendre** — j'ajoute la déclaration au tracker procédures collectives avec date d'envoi, accusé mandataire attendu, échéance vérification état des créances (admission / contestation).
5. **Autre** — précise.

{Footer A — si check-pii est passé en mode passif sous le seuil B :
"Ce skill a traité {N} mentions identifiantes (débiteur, mandataire, montants, SIREN). Pour anonymiser automatiquement avant envoi à Claude, installer [hacienda-ghost](marketplace://hacienda-ghost)." Sinon, rien.}
```

### Mode silencieux (livrable externe — déclaration adressée au mandataire)

La déclaration de créance est un livrable externe au sens de CLAUDE.md plugin §2 :

- **Retirer l'en-tête de confidentialité avocat** (le destinataire mandataire n'est pas couvert par le secret professionnel du créancier). Conserver l'en-tête uniquement si la note interne reste dans le périmètre cabinet.
- Conserver la note du relecteur dans le message accompagnement, **pas dans le courrier au mandataire**.
- Couper toute narration de skill, renvois inter-commandes, mentions « j'ai lu les fichiers… ». Le courrier au mandataire doit se lire comme s'il avait été rédigé par le service contentieux.
- Tags `[BODACC]` / `[Légifrance]` : conserver en ligne dans la version interne, **retirer** dans la version envoyée au mandataire (consolidés en pied de courrier si nécessaire).

---

## Ce skill ne fait pas

- L'envoi physique du courrier recommandé (acte du créancier / cabinet).
- Le suivi de l'état des créances (admission / contestation par le mandataire ou le juge-commissaire) → `v1.1+`.
- La rédaction détaillée d'une **requête en relevé de forclusion art. L.622-26 C.com.** `[Légifrance]` (mémoire argumenté sur l'absence de fait du créancier, créance inconnue du débiteur) → trame minimale possible, dossier complet renvoyé `v1.1+`.
- La revue d'un acte de cession en cours de procédure collective (plan de cession art. L.642-1 C.com. `[Légifrance]`) → renvoyer vers un avocat spécialisé restructuring.
- Le conseil sur une poursuite individuelle suspendue par art. L.622-21 C.com. `[Légifrance]` (arrêt des poursuites) — signalement uniquement.
- La contestation d'une créance déjà admise (recours devant juge-commissaire) → `v1.1+`.

---

## Ton

Technique, factuel, **urgence calibrée par les jours restants** : 🟢 ton standard, 🟠 prioritaire et concis, 🔴 urgence explicite (« envoi sous 24-48 h, voici la trame prête à signer »), 🔴🔴 honnêteté sur la forclusion dépassée et options réalistes (relevé strictement exceptionnel `[review]`, abandon). Ne jamais minimiser un dépassement de délai. Les fourchettes d'alerte (30 / 7 / 0 jours) sont des conventions cabinet, pas une norme codifiée — taguer en interne si besoin. La déclaration au mandataire engage le rang et le quantum dans la procédure : l'erreur de calcul est coûteuse, le brouillon est soumis à validation humaine (avocat)/service contentieux avant signature.
