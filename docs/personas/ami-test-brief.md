# Brief de test — hacienda-droit-affaires (ami)

> Document à transmettre au testeur (ami, indépendant droit des entreprises en difficulté + généraliste droit des sociétés). Calibré pour ~2 heures de test actif au total, étalable sur 2-3 semaines, asynchrone. Plus dense que le brief du frère parce que tu es le validateur principal de plusieurs skills du plugin.

---

Hello,

Merci d'accepter de tester le plugin sur tes dossiers réels. J'ai calibré le protocole pour te prendre **environ 2 heures actives au total**, étalable sur 2-3 semaines à ton rythme. Pas d'appel live avec moi — tu remplis le formulaire au fil de l'eau, par mail ou comme tu veux.

## Le pari

`hacienda-droit-affaires` couvre les workflows du droit des affaires français en s'intégrant à `hacienda-ghost` pour l'anonymisation. Tu es le validateur principal sur 4 des skills à tester ci-dessous — ton spectre couvre exactement ce qu'ils visent : procédures collectives, sociétés, contentieux des affaires. Ce que tu valides ici décide en grande partie si le plugin tient juridiquement la route.

## Confidentialité

Le plugin tourne en local dans ton Cowork — aucune donnée ne quitte ton poste vers un cloud tiers (au-delà de l'usage normal de Cowork). Si tu installes `hacienda-ghost` à côté, les identifiants sensibles (parties nommées, montants > 10 k€, IBAN, numéros de pièce…) sont anonymisés automatiquement avant tout envoi au modèle. Sans ghost, le plugin affiche un compteur et un avertissement avant de traiter les documents les plus sensibles — c'est toi qui décides à chaque fois.

## Le protocole — 4 skills + 1 agent passif

J'ai sélectionné 4 skills sur les 19 du plugin — ceux où ton flux quotidien fait naturellement le test, et où tu es le validateur juridique de référence. Pour chacun : **1 dossier réel, ~30 min**, tu lances la commande, lis la sortie, remplis le formulaire (5 min). Plus un agent en arrière-plan, à activer une fois et observer pendant 2-3 semaines.

---

### Test 1 — Déclaration de créance (procédures collectives)

```
/h-droit-affaires:declaration-creance <chemin/du/dossier>
```

Sur un dossier en cours où tu as une créance à déclarer (sauvegarde / RJ / LJ). Le skill calcule la date de forclusion L.622-24 depuis la publication BODACC, génère la déclaration au format mandataire, signale `[review]` les points d'arbitrage (qualification de créance, privilèges revendiqués, intérêts arrêtés au jugement).

**Point critique** : zéro erreur de calcul de forclusion attendue. C'est le test qui décide si le skill est utilisable ou pas.

---

### Test 2 — Revue de pacte d'associés

```
/h-droit-affaires:pacte-associes-review <chemin/du/pacte.pdf> --review
```

Sur un pacte que tu as à analyser (création ou révision). 11 clauses sensibles couvertes : préemption, agrément, inaliénabilité (avec contrôle durée raisonnable + intérêt sérieux), drag-along / tag-along, anti-dilution, good leaver / bad leaver, promesses croisées, non-concurrence des associés, droits de véto, clauses d'information, clauses de liquidité.

---

### Test 3 — Gouvernance d'assemblée

Le skill a deux modes — teste celui qui correspond à ton dossier du moment (idéalement les deux si tu peux).

```
/h-droit-affaires:gouvernance-ag --convocation --forme=SAS --type=AGE
```
ou
```
/h-droit-affaires:gouvernance-ag --pv --forme=SARL --type=AGO
```

Mode `--convocation` : génère convocation avec délais, ordre du jour, mentions obligatoires adaptés à la forme. Mode `--pv` : génère ou révise un PV avec quorum, majorité, résolutions.

**Point critique** : les délais de convocation sont d'ordre public — une convocation irrégulière entraîne la nullité des délibérations. Test le plus sensible sur le formalisme.

---

### Test 4 — Analyse de rupture brutale (L.442-1, II)

```
/h-droit-affaires:analyser-rupture-brutale <chemin/du/dossier> --review
```

Sur un dossier de contentieux affaires impliquant une rupture de relation commerciale. Le skill qualifie la relation établie (critères jurisprudentiels), évalue le préavis raisonnable (règle de pouce + critères), traite le safe harbor 18 mois comme **protection défensive** (et pas comme un plafond — c'est un point juridique sur lequel je veux ton avis explicite), estime le préjudice (marge brute durant la période manquante), examine les cas de dispense.

**Point critique** : c'est un skill V2a tout neuf, jamais testé sur du réel. Tu es **le** validateur juridique du cabinet.

---

### Test 5 (passif) — Agent bodacc-procedures-watcher

**Pleinement opérationnel.** Les 3 outils MCP que cet agent consomme sont maintenant restaurés : `bodacc_by_siren` (annonces BODACC par SIREN), `bodacc_procedures` (procédures collectives publiques), `company_full_profile` (profil enrichi Pappers + fallback BODACC). L'agent peut aussi être utilisé manuellement entre deux runs automatiques pour un SIREN ponctuel — utile pour vérifier rapidement un débiteur entrant.

Configure une fois la liste de tes débiteurs en portefeuille dans :
```
~/.claude/plugins/config/hacienda-juridique/hacienda-droit-affaires/debiteurs.yaml
```
Format (un débiteur en cours par bloc) :
```yaml
debiteurs:
  - siren: "123456789"
    label: "Dossier client A vs débiteur X"
    montant_creance: 85000
    date_jugement_ouverture: "2026-XX-XX"
    date_publication_bodacc: "2026-XX-XX"
    statut_declaration: "à_faire"  # ou "envoyee" / "en_cours"
```

L'agent tourne quotidiennement, te remonte les forclusions à 30 jours / 7 jours / 0 jour, et te signale les nouvelles procédures sur SIREN connus de ton portefeuille. **Tu ne testes rien activement — tu observes pendant 2-3 semaines si les alertes tombent quand elles doivent.**

---

## Le formulaire de feedback (~5 min par skill)

Pour chaque skill (les 4 actifs), réponds aux **3 questions** :

1. **Justesse juridique** — La sortie est-elle juste ? `Aucune faute` / `petite imprécision : [...]` / `erreur substantielle : [...]`. C'est la question la plus importante pour toi — tu es le validateur de substance.

2. **Gain de temps** — Combien de minutes (ou heures) cette sortie t'a fait gagner vs ta méthode habituelle ? Si négatif (plus long à corriger qu'à faire), dis-le.

3. **Tu gardes ?** — Tu intègres dans ton workflow ? `Oui` / `Non` / `Conditionnel à [...]`.

**Pour `analyser-rupture-brutale` uniquement — 4e question** :
4. **Safe harbor 18 mois** — Le traitement « protection défensive, pas plafond » est-il correct selon toi ? Si non, comment formuler ?

**Pour l'agent `bodacc-procedures-watcher`** (après 2-3 semaines) — 2 questions :
- Les alertes tombées étaient-elles **pertinentes** ? (Combien sur le total, ordre de grandeur.)
- Y a-t-il eu un **silence anormal** — un événement que tu aurais voulu que l'agent te signale et qu'il a raté ?

Réponses libres, format que tu veux, par mail.

## Si tu n'as pas un dossier sous la main pour un skill

Saute-le, on y reviendra. Mieux vaut tester 2 skills sur de vrais dossiers que les 4 sur du synthétique.

## Ce que je ne te demande PAS

- Pas de test exhaustif des 19 skills. Les skills M&A (`spa-review`, `gap-review`, `due-diligence-dataroom`, `closing-checklist-fr`, `loi-term-sheet`) sont validés par le frère côté cabinet d'affaires — `spa-review` est son test prioritaire (SPA SAS, flux NDA → NBO → DD → SPA → GAP → Closing).
- Pas de revue de format ni de code — je m'en occupe.
- Pas de feedback live ni de réunion. Tout asynchrone.

## Note d'installation — chemin du profil cabinet

À l'installation, le profil cabinet est maintenant dans :
```
~/.claude/plugins/config/hacienda-juridique/company-profile.md
```
(ancien chemin `~/.config/Hacienda/profil-cabinet.md` — si tu réinstalles depuis zéro, rien à faire, c'est automatique).

## Si quelque chose plante

Capture l'erreur (texte ou screenshot) + le skill utilisé + ce que tu faisais, envoie-moi. Je débugge.

---

*Brief calibré sur ton temps. Si même 2h c'est trop, dis-le-moi — on peut réduire à 2 skills + l'agent passif. Priorités absolues : `declaration-creance` (ton cœur de métier) et `analyser-rupture-brutale` (V2a, frais, je veux ton verdict juridique avant de boucler).*
