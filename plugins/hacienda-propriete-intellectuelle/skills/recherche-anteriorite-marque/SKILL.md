---
name: recherche-anteriorite-marque
description: >
  Premier passage de recherche d'antériorité marque (knockout L.711-2 CPI +
  similarités INPI/EUIPO + appréciation globale CJUE) — produit une liste de
  signaux pour décision avocat, jamais une opinion de disponibilité. Utiliser
  pour un nouveau signe, des classes Nice nouvelles, ou avant un dépôt.
  Ce skill ne conclut JAMAIS qu'une marque est disponible.
argument-hint: "[signe | classes Nice | territoires FR/EU/intl]"
---

# /recherche-anteriorite-marque

**Ce n'est PAS une opinion de disponibilité.** Une opinion de disponibilité
exige une recherche professionnelle complète et le jugement d'un mandataire
en marques (CPI L.422-4) ou d'un avocat. "Aucun conflit évident" = le triage
n'a rien trouvé, pas que la marque est libre. *Des clients ont été assignés
en contrefaçon sur des marques qui passaient un knockout.*

## Examples

```
/hacienda-propriete-intellectuelle:recherche-anteriorite-marque "APEXLEAF — vêtements outdoor classes 25, 35 — FR + EU"
```

```
/hacienda-propriete-intellectuelle:recherche-anteriorite-marque
```

(Le skill demandera le signe, les classes et les territoires.)

---

## CECI EST UN PREMIER PASSAGE, PAS UNE OPINION DE DISPONIBILITÉ

**Reformuler en tête de chaque output. Ne jamais l'enlever. Ne jamais l'adoucir.**

> **Premier passage, pas une opinion de disponibilité.** Une opinion de
> disponibilité de marque exige une recherche professionnelle complète
> (Data INPI exhaustive, EUIPO TMview tous offices, OMPI ROMARIN, recherche
> phonétique étendue, recherche figuratif si applicable, sources non
> enregistrées comme noms de domaine et raisons sociales) et le jugement
> d'un mandataire en marques ou d'un avocat sur le risque de confusion.
> "Aucun conflit évident" issu de ce skill = le triage n'a rien trouvé. Cela
> ne veut pas dire que la marque est libre. Un mandataire ou un avocat
> évalue avant tout dépôt, adoption ou investissement marketing.

C'est le garde-fou le plus visible du plugin. Sous-flagger un conflit = porte
à sens unique (logo sur camions, produit lancé, dépôt déjà fait, tous avec un
problème dessous). Sur-flagger = porte à 2 sens, l'avocat élague en revue.
Rester sur la porte à 2 sens.

---

## Charger le profil pratique avant de commencer

Avant tout, lire :
1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Récupérer :
- **Rôle** depuis `## Qui utilise ce plugin` (avocat / mandataire / non-juriste — change l'en-tête confidentialité).
- **Juridictions inscrites** depuis `## Profil pratique PI` (défaut territoires si l'utilisateur n'en spécifie pas).
- **Intégrations** depuis `## Intégrations disponibles` (INPI Data ✓/✗, EUIPO TMview ✓/✗ — détermine quelles bases sont interrogées).
- **Posture de décision** — ce skill ne conclut JAMAIS "absence de risque de confusion".

Si le profil contient `[A CONFIGURER]`, surfacer :

> Le profil pratique n'est pas configuré — c'est ce qui adapte la posture, les
> juridictions et la chaîne d'approbation à votre cabinet.
>
> **Deux choix :**
> - Lancer `/hacienda-propriete-intellectuelle:entretien-demarrage` (10-15 min)
> - Dire **"provisoire"** et je lance avec les défauts génériques (FR + EU,
>   posture mesurée, rôle avocat, sans playbook) — chaque sortie sera taggée
>   `[PROVISOIRE — configurer le profil pour une sortie sur mesure]`.

### Mode provisoire

Si l'utilisateur dit "provisoire", lancer normalement avec : posture mesurée,
rôle avocat, FR + EU, pas de playbook (analyse complète plutôt que matching
contre une position list). Tagger la note du relecteur et chaque finding
`[PROVISOIRE]`. À la fin, ajouter :

> "C'était un run générique avec les hypothèses par défaut. Lancer
> `/hacienda-propriete-intellectuelle:entretien-demarrage` pour calibrer sur
> VOTRE pratique — votre playbook, vos juridictions, votre tolérance au risque."

---

## Intake

Demander en un seul batch (pas de jeu de questions à rallonge) :

> Quelques questions avant le triage :
>
> 1. **Signe proposé.** Texte exact, stylisation éventuelle, et type :
>    mot / figuratif / composite.
> 2. **Produits ou services.** Ce qui sera réellement vendu sous ce signe.
>    Une ou deux phrases — je proposerai les classes Nice et confirmerai.
> 3. **Classes Nice.** Si déjà connues, lister. Sinon décrire les
>    produits/services et je proposerai les classes probables.
> 4. **Territoires.** FR / EU / Madrid international / pays spécifiques.
>    Défaut depuis `Profil pratique PI > juridictions inscrites`.
> 5. **Apparence en marché.** Tagline, dénominations adjacentes (gamme),
>    trade dress, éléments visuels qui apparaîtront avec.

Attendre la réponse. Si la description est vague ("appli IA", "plateforme"),
pousser une fois :

> Donne ce qu'un client voit concrètement — appli mobile grand public, API
> entreprise, produit physique, service. Les classes en dépendent.

---

## Knockout — motifs absolus L.711-2 CPI

Avant toute recherche en bases, vérifier les motifs intrinsèques qui
condamnent un signe indépendamment de toute antériorité. Pour chaque motif,
évaluer franchement et flagger. Ne pas rationaliser un problème évident.

| Motif (L.711-2 CPI) | Ce que ça veut dire | Flagger quand |
|---|---|---|
| **Caractère distinctif insuffisant** (1°) | Le signe ne permet pas d'identifier un produit | Le signe désigne directement le type de produit |
| **Descriptif** (2°) | Décrit espèce, qualité, quantité, destination, valeur, provenance, époque | Un consommateur lit le signe et sait ce que fait le produit sans imagination |
| **Devenu usuel** (3°) | Entré dans le langage courant ou les habitudes professionnelles | Mot devenu synonyme générique de la catégorie |
| **Forme imposée** (5°) | Forme nécessaire à la fonction technique du produit | Marque figurative — et la forme assure une fonction |
| **Atteinte ordre public / bonnes mœurs** (7°) | Symboles d'État, AOP/IGP non autorisées, signes contraires | Signe contient un élément protégé ou choquant |
| **Trompeur** (8°) | Risque de tromper le public sur nature, qualité, provenance | Le signe suggère une qualité que le produit n'a pas, et cette qualité importerait au consommateur |

**Sortie** : pour chaque motif, soit "aucun problème identifié", soit un flag
spécifique avec une ligne de raison. Ne pas produire un tableau plat de "pass".
