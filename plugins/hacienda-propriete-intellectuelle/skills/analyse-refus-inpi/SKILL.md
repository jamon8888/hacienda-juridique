---
name: analyse-refus-inpi
description: >
  Analyse une notification de refus INPI (rapport de recherche préliminaire,
  notification de motifs de refus art. R.612-66 CPI) ou une Communication
  OEB selon Règle 132 EPC. Classifie les citations art antérieur (X/Y/A/E),
  identifie caractéristiques distinctives, propose stratégies d'amendement,
  produit un projet de réponse argumentée. NE répond PAS officiellement —
  validation mandataire en brevets (EQE) ou avocat requise avant envoi INPI/OEB.
argument-hint: "[num brevet | notification INPI/OEB | délai réponse restant]"
---

# /analyse-refus-inpi

**Analyse ≠ réponse officielle.** Ce skill produit une **analyse argumentaire**
pour aider le mandataire en brevets inscrit OEB (EQE — European Qualifying
Examination) ou l'avocat spécialisé. Il NE répond PAS officiellement à
l'INPI/OEB, NE dépose PAS l'amendement, NE plaide PAS en audition orale
(chambres de recours OEB). **Délais fermes** :

- INPI ~2-4 mois selon notification (art. R.612-66 CPI), prorogation 2 mois
  sur demande motivée
- OEB Règle 132 EPC standard 4 mois, prorogation 2 mois maximum

Manquer le délai = **rejet définitif** de la demande (INPI) ou **demande
réputée retirée** (OEB, Art. 94(4) EPC).

## Examples

```
/hacienda-propriete-intellectuelle:analyse-refus-inpi "FR2700123 | rapport recherche préliminaire INPI du 2026-03-15 | 45 jours restants"
```

(Analyse d'un rapport de recherche préliminaire INPI sur brevet FR — citations
X/Y/A/E à classifier, stratégies d'amendement à proposer.)

```
/hacienda-propriete-intellectuelle:analyse-refus-inpi EP1234567
```

(Analyse d'une Communication OEB Règle 132 EPC sur demande EP — le skill
demandera la notification et le délai restant.)

```
/hacienda-propriete-intellectuelle:analyse-refus-inpi
```

(Sans args — le skill déroule l'intake en 4 questions.)

---

## ANALYSE ARGUMENTAIRE, PAS RÉPONSE OFFICIELLE

**Reformuler en tête de chaque output. Ne jamais l'enlever. Ne jamais l'adoucir.**

> **Analyse argumentaire, pas réponse officielle.** Cette analyse classifie
> les citations d'art antérieur (cadre OEB X/Y/A/E appliqué INPI), identifie
> les caractéristiques distinctives par revendication, propose 4 stratégies
> d'amendement (A limitation par incorporation / B reformulation / C abandon
> et repli sur dépendantes / D demande divisionnaire) et produit un **projet
> de réponse** structuré (FR pour INPI, EN pour OEB). Elle NE remplace PAS la
> rédaction finale par un **mandataire en brevets inscrit OEB (EQE)** ou un
> **avocat spécialisé en propriété industrielle**. **Délais fermes** : INPI
> ~2-4 mois (art. R.612-66 CPI, prorogation 2 mois sur demande motivée), OEB
> Règle 132 EPC 4 mois (prorogation 2 mois maximum). Manquer le délai =
> **rejet définitif** de la demande (INPI) ou **demande réputée retirée**
> (OEB, Art. 94(4) EPC) — la procédure de poursuite Art. 121 EPC est
> exceptionnelle. La télé-procédure INPI (portail data.inpi.fr / espace
> mandataire) ou OEB (MyEPO) reste à exécuter par le mandataire. **Un
> amendement mal rédigé peut violer L.612-6 CPI / Art. 123(2) EPC
> (non-extension) et provoquer la nullité ultérieure du brevet** (L.613-25 c
> CPI).

C'est le garde-fou le plus visible du skill. Une analyse partielle finalisée
sans relecture mandataire EQE = porte à sens unique (amendement déposé,
violation de non-extension non détectée, nullité prononcée 5 ans plus tard
en action contre un contrefacteur). Sur-flagger = porte à 2 sens, le
mandataire élague. Rester sur la porte à 2 sens.

---

## Charger le profil pratique avant de commencer

Avant tout, lire :
1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Récupérer :

- **Rôle** depuis `## 1. Profil cabinet et profil de pratique PI`
  (avocat inscrit à un barreau français / mandataire en brevets inscrit OEB
  (EQE) / mandataire en marques INPI / juriste interne / non-juriste avec ou
  sans accès avocat). Change l'en-tête confidentialité, la formulation des
  avertissements en pied de projet de réponse ET active le gate non-juriste
  si applicable.
- **Juridictions et offices d'inscription** (section `## 1`) : INPI seul / OEB
  seul / les deux / autre. Conditionne la langue du projet de réponse (FR
  pour INPI, EN pour OEB).
- **Pratique brevets** (section `## Brevets`) : FR national / EP / PCT /
  international. Si la notification analysée concerne une juridiction hors
  périmètre déclaré → flagger en tête de l'analyse.
- **Domaines techniques principaux** : pharma / mécanique / électronique /
  logiciel / biotech → calibre les exemples concrets dans les options
  d'amendement.
- **Partenaire annuités** : permet d'estimer le coût d'une demande
  divisionnaire (Option D) si pertinent.
- **Posture prosecution** [A CONFIGURER — abandon rapide si coût > valeur
  commerciale / défense systématique / pragmatique] → calibre la
  recommandation entre Options A à D :
  - *Abandon rapide* = privilégier C (abandon revendication problématique) si
    portée résiduelle reste commercialement utile, ne pas pousser D
    divisionnaire.
  - *Défense systématique* = privilégier A (limitation par incorporation) et
    D (divisionnaire pour préserver tous les aspects), accepter le coût.
  - *Pragmatique* = A en première intention, C en repli, D uniquement si
    l'aspect divisé a une valeur commerciale propre identifiable.
- **Matrice d'approbateurs** : qui valide une réponse INPI/OEB ? Typiquement
  mandataire EQE seul, ou mandataire + directeur R&D + GC pour brevets
  stratégiques.

**Mode provisoire** : si le profil contient des valeurs `[A CONFIGURER]` sur
les champs critiques (rôle, juridictions, posture prosecution), continuer
mais flagger en tête : « Profil de pratique partiellement configuré — analyse
produite sur cadre par défaut (mandataire EQE, posture pragmatique). Lance
`/hacienda-propriete-intellectuelle:entretien-demarrage` pour calibrer. »

---

## Intake — 4 questions en batch unique

Poser les 4 questions ensemble (pas une à une) pour réduire les allers-retours :

1. **Numéro de brevet ou de demande** (FR / EP / PCT — ex : FR2700123,
   EP1234567A1, PCT/FR2025/050123). Dès reçu, déclencher en parallèle :
   - `inpi_brevet_details(numero)` si FR — récupérer revendications,
     déposant, statut, date de priorité, état procédure
   - `espacenet_brevet_details(numero)` si EP / PCT — idem côté OEB
   - Si l'outil retourne 404 ou erreur, signaler `[INPI Data — non récupéré]`
     ou `[OEB Espacenet — non récupéré]` et demander à l'utilisateur de
     coller manuellement les revendications.

2. **Notification reçue** : préciser
   - **Type** : rapport de recherche préliminaire INPI / notification de
     motifs de refus INPI (art. R.612-66 CPI) / Communication OEB Règle 132
     EPC / autre (préciser)
   - **Date de notification** (YYYY-MM-DD)
   - **Texte intégral** : coller dans le chat OU pointer un fichier
     (PDF / MD / TXT). Si fichier illisible, appliquer la règle « Échec de
     lecture de fichier » du plugin CLAUDE.md.

3. **Délai restant pour répondre** : date butoir (YYYY-MM-DD). **Calcul auto
   de la sévérité** depuis la date du jour :
   - 🔴 **< 30 jours** = URGENT — escalation immédiate mandataire EQE
   - 🟠 **30-60 jours** = à préparer cette semaine
   - 🟡 **> 60 jours** = standard, planifier dans le mois
   - **Si délai < 14 jours** : recommander **en parallèle** de l'analyse de
     déposer immédiatement une demande de prorogation (INPI : 2 mois sur
     demande motivée ; OEB : Règle 132(2) EPC, 2 mois supplémentaires).
   - **Si délai < 7 jours** : **stop** l'analyse approfondie, produire
     uniquement le brief escalation 1 page vers mandataire EQE avec mention
     « DÉLAI CRITIQUE — prorogation à demander aujourd'hui ».

4. **Posture du déposant** : défendre intégralement la portée (combat
   maximal) / accepter des limitations raisonnables (compromis) / abandonner
   partiellement les revendications problématiques (concentrer le combat sur
   les revendications de valeur). Cette posture cale le poids relatif des
   Options A (limitation) vs C (abandon) vs D (divisionnaire).

**Ne pas poursuivre tant que les 4 réponses ne sont pas obtenues.** Si
l'utilisateur ne donne que partiellement, redemander les manquants en bloc.

---
