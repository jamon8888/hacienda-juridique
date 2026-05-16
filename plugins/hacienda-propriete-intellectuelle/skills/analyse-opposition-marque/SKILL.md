---
name: analyse-opposition-marque
description: >
  Analyse une opposition INPI reçue OU à former (délai 2 mois post-publication
  BOPI, CPI L.712-4). Décompose les motifs invoqués (risque de confusion
  L.713-2, marque renommée L.713-3, AOP/IGP, etc.), évalue chaque branche
  d'argumentation contre l'antériorité opposable, produit un projet de
  réponse INPI structuré. NE dépose PAS l'opposition formelle — préparation
  à valider par mandataire en marques ou avocat.
argument-hint: "[numero marque attaquée | --form (former opposition) | --respond (répondre opposition reçue)]"
---

# /analyse-opposition-marque

**Analyse ≠ procédure officielle.** Ce skill produit une **analyse argumentaire**
pour aider le mandataire en marques (CPI L.422-4) ou l'avocat à préparer une
opposition INPI. Il NE forme PAS l'opposition officielle (= télé-procédure
INPI), NE répond PAS au mémoire en réplique de la partie adverse, NE plaide
PAS en audience orale (procédure rare). **Le délai de 2 mois post-publication
BOPI (CPI L.712-4) est ferme** — manquer le délai = perte définitive du droit
d'opposer (recours en restauration L.712-4-1 strictement exceptionnel :
"circonstances indépendantes de la volonté" prouvées, tels force majeure ou
défaillance INPI).

## Examples

```
/hacienda-propriete-intellectuelle:analyse-opposition-marque --form FR4123456
```

(Former une opposition contre une marque tierce publiée au BOPI — scénario
typiquement alimenté par `surveillance-marque` V1.1.0 et l'agent
`bopi-watcher`.)

```
/hacienda-propriete-intellectuelle:analyse-opposition-marque --respond FR1234567
```

(Répondre à une opposition reçue contre notre propre marque — notification
INPI en main.)

```
/hacienda-propriete-intellectuelle:analyse-opposition-marque
```

(Sans flag — le skill demande quel mode `--form` ou `--respond` avant de
poursuivre.)

---

## ANALYSE ARGUMENTAIRE, PAS PROCÉDURE OFFICIELLE

**Reformuler en tête de chaque output. Ne jamais l'enlever. Ne jamais l'adoucir.**

> **Analyse argumentaire, pas procédure officielle.** Cette analyse décompose
> les motifs CPI invoqués (L.713-2 risque de confusion, L.713-3 1° marque
> renommée, L.711-3 droits antérieurs autres) en branches argumentaires,
> évalue la force probable de chacune (🟢 solide / 🟡 mixte / 🔴 faible) et
> propose un projet de mémoire INPI structuré (parties, faits, discussion en
> droit, demande, pièces). Elle NE remplace PAS la rédaction finale par un
> **mandataire en marques inscrit à l'INPI** (CPI L.422-4) ou un **avocat
> spécialisé en propriété industrielle**. Le délai d'opposition de **2 mois
> post-publication BOPI** (L.712-4) est ferme : manqué, le droit d'opposer
> est perdu définitivement (la restauration L.712-4-1 est strictement
> exceptionnelle — n'y jamais miser). La télé-procédure INPI (dépôt mémoire
> + paiement taxe ~325€) reste à exécuter par le mandataire. **Une opposition
> mal argumentée = rejet + perte des taxes, voire dommages-intérêts pour
> opposition abusive** (art. 1240 code civil).

C'est le garde-fou le plus visible du skill. Une analyse partielle finalisée
sans relecture mandataire = porte à sens unique (mémoire INPI déposé avec
motif insuffisant, opposition rejetée, marque adverse enregistrée
définitivement). Sur-flagger = porte à 2 sens, le mandataire élague. Rester
sur la porte à 2 sens.

---
