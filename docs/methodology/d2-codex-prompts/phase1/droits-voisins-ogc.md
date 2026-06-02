# Phase 1 — `droits-voisins-ogc` — code V8R7TR

**Workflow** : ouvre une **nouvelle conversation Codex GPT-5.5 effort medium**,
copie tout ce qui est entre `--- PROMPT ---` ci-dessous, colle dans la
conversation Codex, récupère la réponse, sauvegarde dans :

```
plugins/hacienda-propriete-intellectuelle/tests/datasets/d2-droits-voisins-ogc/scenario.md
```

Une fois Phase 1 livrée, enchaîne Phase 2 avec :

```bash
python3 scripts/d2.py phase2 droits-voisins-ogc
```

---

--- PROMPT ---

ROLE: Tu génères un dataset de test fictif pour évaluer la qualité d'un skill
juridique français en propriété intellectuelle. Tu fais partie d'un protocole
blind de sparring scoring (4 phases).

CONTEXTE PROTOCOLE BLIND :
Ton output (le dataset) servira ensuite à un autre acteur (modèle différent)
qui définira la vérité terrain. Un troisième acteur exécutera le skill sur
ton dataset. Un quatrième scorrera. Les 4 phases sont volontairement
isolées pour éviter le biais auto-référent.

CONSIGNE STRICTE : tu ne dois PAS produire la vérité terrain dans ce fichier.
Juste le scénario fictif et les pièces. Aucune cotation 🔴🟠🟡🟢, aucune
recommandation, aucune section "Vérité terrain attendue".

PARAMÈTRES :
- Skill cible : droits-voisins-ogc
- Domaine PI : droits-voisins
- Mode d'invocation : gestion droits voisins artistes-interprètes et producteurs via OGC
- Code scoring : V8R7TR
- Spécificités métier à inclure subtilement : L.212-1+ artistes-interprètes ; L.213-1+ producteurs phonogrammes ; L.215-1+ vidéogrammes ; L.216-1+ com. audiovisuelle ; L.218-1+ éditeurs de presse (post-2019) ; OGC SACEM/SACD/SCPP/ADAMI compétents ; barèmes applicables

INSTRUCTIONS :

Génère un dossier fictif structuré comme suit :

# Dataset test — `droits-voisins-ogc` — Code V8R7TR

**Domaine** : droits-voisins
**Skill cible** : `/h-pi:droits-voisins-ogc`
**Mode** : gestion droits voisins artistes-interprètes et producteurs via OGC

*Dossier strictement fictif — toute ressemblance avec dossiers, parties ou titres
réels serait fortuite.*

---

## Scénario fictif

[Entité fictive : raison sociale, SIREN inventé 9 chiffres, secteur, taille, CA.
Situation métier précise : deal en cours, contentieux en gestation, dépôt préparé,
audit DD M&A, etc. Parties impliquées avec rôles. Dates clés cohérentes.]

---

## Pièces fournies

### [Section adaptée au scénario — ex. constat huissier, contrat projeté, recherche INPI/EUIPO simulée, SBOM, etc.]

[Détails techniques crédibles. Si numéros de marques/brevets : inventer (FR
7-8 chiffres, EP 7-8 chiffres, EUTM 8-9 chiffres). Si montants : réalistes pour
le secteur évoqué.]

### [Autres sections de pièces selon le dossier]

---

## Posture cabinet (configurée)

[Selon le domaine : posture enforcement, matrice approbateurs, tribunaux
habituels, budget contentieux, posture par défaut.]

---

## Question / demande explicite

[Ce que le déposant / avocat / client veut obtenir du skill — formulé comme
un message court ou une note de cadrage.]

CONTRAINTES :
- TOUT est fictif. Aucune partie réelle. SIREN inventés (9 chiffres aléatoires
  cohérents avec validation Luhn si possible). Montants réalistes. Brevets /
  marques / DM avec numéros inventés.
- Inclure subtilement les spécificités à tester sans annoncer "voici le piège
  à détecter" — un avocat expérimenté les verrait par lecture, mais elles ne
  sont pas étiquetées.
- Format Markdown autonome.
- Disclaimer fictif en tête (déjà dans le template).
- AUCUNE section "Vérité terrain", AUCUNE cotation 🔴🟠🟡🟢, AUCUNE recommandation.
- Tu génères les faits, pas leur interprétation.
- Longueur cible : 200-400 lignes.

OUTPUT : un fichier Markdown autonome correspondant à la structure ci-dessus,
prêt à être sauvegardé EXACTEMENT à ce chemin (pas un autre — l'outil de
scoring Phase 4 le cherche à cet endroit précis) :

`/private/tmp/d2-prerender-droits-voisins-ogc.md`

--- FIN PROMPT ---
