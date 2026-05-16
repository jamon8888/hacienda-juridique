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
