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

## Charger le profil pratique avant de commencer

Avant tout, lire :
1. `~/.claude/plugins/config/hacienda-juridique/company-profile.md`
2. `~/.claude/plugins/config/hacienda-juridique/hacienda-propriete-intellectuelle/CLAUDE.md`

Récupérer :

- **Rôle** depuis `## 1. Profil cabinet et profil de pratique PI` (avocat
  inscrit à un barreau / mandataire en marques INPI L.422-4 / juriste interne /
  non-juriste avec ou sans accès avocat). Change l'en-tête confidentialité,
  la formulation des avertissements en pied de mémoire ET active le gate
  non-juriste si applicable.
- **Posture enforcement** (agressive / mesurée / conservatrice) → calibre
  directement le ton du mémoire d'opposition :
  - *Agressive* = invoquer tous les motifs disponibles cumulativement, viser
    opposition totale, ne pas proposer transaction sauf demande explicite.
  - *Mesurée* = invoquer le motif principal (typiquement L.713-2) +
    subsidiairement les autres, signaler en parallèle l'option transaction
    amiable si le déposant tiers semble de bonne foi.
  - *Conservatrice* = invoquer uniquement les motifs solides (🟢), suggérer
    transaction en première intention si chances de succès < 70 %.
- **Matrice d'approbateurs** (qui valide / signe une opposition INPI ?). Par
  défaut : avocat PI + sponsor business. Pour `--respond`, ajouter
  l'approbateur "réponse à opposition" s'il diffère.
- **Calendriers de surveillance** (cadence `bopi-watcher`) — utile pour
  confirmer comment la marque attaquée a été détectée et combien de jours
  restent réellement avant le butoir L.712-4.
- **Mandataire en marques associé** depuis la table mandataires externes du
  profil → identifié explicitement dans la section "Étapes suivantes" et dans
  le brief gate non-juriste.

Si le profil contient `[A CONFIGURER]`, surfacer :

> Le profil pratique n'est pas configuré — c'est ce qui calibre le ton du
> mémoire (agressif / mesuré / conservateur), la matrice d'approbation
> opposition, le mandataire en marques associé et la chaîne d'escalade pour
> un délai 🔴 URGENT.
>
> **Deux choix :**
> - Lancer `/hacienda-propriete-intellectuelle:entretien-demarrage` (10-15 min)
> - Dire **"provisoire"** et je lance avec les défauts génériques (rôle
>   avocat, posture mesurée, opposition partielle préférée, sans mandataire
>   pré-désigné) — chaque sortie sera taggée `[PROVISOIRE — configurer le
>   profil pour une analyse calibrée]`.

### Mode provisoire

Si l'utilisateur dit "provisoire", lancer normalement avec : posture mesurée,
rôle avocat, pas de mandataire désigné, approbation par défaut "avocat PI".
Tagger la note du relecteur et chaque finding `[PROVISOIRE]`. À la fin,
ajouter :

> "C'était un run générique avec les hypothèses par défaut. Lancer
> `/hacienda-propriete-intellectuelle:entretien-demarrage` pour calibrer le
> ton du mémoire et la chaîne d'approbation sur VOTRE pratique."

---

## Intake — choix du mode

Si l'utilisateur n'a pas précisé `--form` ou `--respond`, demander d'abord :

> **Quel est le scénario ?**
>
> - **`--form`** — vous voulez **former** une opposition contre une marque
>   tierce qui vient d'être publiée au BOPI (typiquement signalée par
>   `surveillance-marque` / `bopi-watcher`). Délai : 2 mois post-publication
>   BOPI, ferme (L.712-4).
> - **`--respond`** — vous avez **reçu** une notification d'opposition de
>   l'INPI contre votre propre marque. Délai pour le mémoire en défense : 2
>   mois post-notification.

Une fois le mode confirmé, demander en un seul batch :

### Mode `--form` (former une opposition)

> Quelques questions avant de bâtir l'analyse :
>
> 1. **Marque attaquée.** Numéro INPI (FRxxxxxxx) de la marque tierce
>    publiée au BOPI. Si tu as repéré la marque via `surveillance-marque`
>    sans avoir noté le numéro, donne-moi le signe + la date d'alerte BOPI,
>    je relance `inpi_search_marques` pour retrouver le numéro.
> 2. **Date de publication BOPI.** Format YYYY-MM-DD. C'est le point de
>    départ du délai de 2 mois L.712-4. Si tu ne l'as pas, je la récupère
>    via `inpi_marque_details` à partir du numéro.
> 3. **Marque(s) antérieure(s) opposable(s).** Numéros INPI / EUTM /
>    enregistrement international Madrid que tu détiens (ou licence
>    exclusive avec droit d'opposition contractuel). Une opposition exige
>    un droit antérieur enregistré (ou droit antérieur non enregistré pour
>    L.711-3 : nom commercial, enseigne, nom de domaine, AOP/IGP). Si tu ne
>    sais pas quelles marques de ton portefeuille sont pertinentes, donne-moi
>    ton secteur + classes de la marque attaquée, je relance
>    `inpi_search_marques` sur ton portefeuille.
> 4. **Motifs invoqués.** Lister ceux retenus parmi :
>    - **L.713-2** — risque de confusion (motif le plus fréquent, ~80 %
>      des oppositions INPI)
>    - **L.713-3 1°** — marque renommée (réservé aux marques avec preuve
>      de renommée solide, parts marché significatives)
>    - **L.711-3** — droits antérieurs autres : nom commercial / enseigne /
>      nom de domaine antérieur / AOP-IGP / mauvaise foi du déposant /
>      droit au nom / droit d'auteur
> 5. **Stratégie.** Opposition **totale** (rejet enregistrement marque
>    attaquée pour toutes les classes désignées) vs **partielle** (rejet
>    pour certaines classes / certains libellés seulement). Une opposition
>    partielle est statistiquement plus admise par l'INPI (cible mieux
>    l'argumentaire) mais laisse subsister la marque adverse sur les
>    classes non visées.
> 6. **Posture transaction.** Es-tu prêt(e) à négocier coexistence /
>    licence / rachat de la marque adverse avant ou pendant la procédure ?
>    Ou opposition pure sans ouverture transactionnelle ? (Affecte la
>    recommandation stratégique en fin d'analyse.)

### Mode `--respond` (répondre à opposition reçue)

> Quelques questions avant de bâtir l'analyse en défense :
>
> 1. **Notre marque attaquée.** Numéro INPI (FRxxxxxxx) de votre marque
>    qui fait l'objet de l'opposition. C'est nécessairement une marque
>    récemment déposée par votre cabinet / client.
> 2. **Date de notification INPI.** Format YYYY-MM-DD. Point de départ du
>    délai de 2 mois pour déposer le mémoire en défense.
> 3. **Marque(s) opposante(s) invoquée(s).** Numéros INPI/EUTM/Madrid
>    invoqués par l'opposant dans sa notification. Si vous ne les avez pas
>    notés, je relance `inpi_marque_details` pour récupérer l'historique
>    complet (date dépôt, classes, statut renouvellement, déchéance
>    éventuelle pour défaut d'usage L.714-5).
> 4. **Motifs invoqués par l'opposant.** Recopier depuis la notification
>    INPI (L.713-2 / L.713-3 / L.711-3, et la sous-branche précise — risque
>    de confusion / renommée / nom commercial antérieur / etc.).
> 5. **Votre position envisagée :**
>    - **Transiger** (coexistence amiable, rachat marque opposante,
>      licence) — préserve les relations, économique, mais laisse la
>      marque adverse en vie.
>    - **Modifier notre dépôt** (limitation de classes ou de libellés
>      P&S pour éviter le chevauchement) — solution intermédiaire, à
>      arbitrer selon l'ampleur de la limitation.
>    - **Contester intégralement** l'opposition — défendre le maintien de
>      notre dépôt tel qu'il est.

Pour les deux modes : si l'utilisateur ne peut pas fournir les numéros
INPI, déclencher les tools (`inpi_search_marques`, `inpi_marque_details`)
en amont pour aider à identifier la marque concernée. Ne pas refuser
l'analyse pour défaut de numéro — proposer la recherche.

---
