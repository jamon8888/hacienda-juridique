# Cas 2 — Accord de coexistence de marques avec engagement non-concurrence territorial

> **Entry point attendu :** `/h-droit-affaires:reviser-contrat`
> **Décision de routing attendue :** Route principal → `contrats-pi` pour le coeur marques + revue commerciale partielle pour la non-concurrence (option (c) « les deux en séquence » plus pertinente que (a) ou (b) seule).

---

## Document fictif

```
ACCORD DE COEXISTENCE DE MARQUES

Entre :
- PARTIE A : APEX SAS, SIREN 442910437, titulaire de la marque française
  « APEXLEAF » n° INPI 4 567 890, classes 9, 35, 42.
- PARTIE B : APIX SA, SIREN 552120222, titulaire de la marque française
  « APIX » n° INPI 4 678 901, classes 9 et 38.

CONSIDÉRANT le risque de confusion potentiel entre les signes APEXLEAF et
APIX dans les classes communes 9 ;

CONSIDÉRANT la procédure d'opposition INPI engagée par PARTIE A le 15 mars
2026 contre la demande de marque communautaire APIX déposée par PARTIE B,
opposition retirée en contrepartie du présent accord ;

IL A ÉTÉ CONVENU :

Article 1 — Périmètre de coexistence
PARTIE A s'interdit d'exploiter « APEXLEAF » pour les produits/services de
télécommunications électroniques (classe 38).
PARTIE B s'interdit d'exploiter « APIX » pour les logiciels d'analyse
botanique (classe 9, sous-catégorie spécifique).

Article 2 — Engagement de non-concurrence territoriale
Pendant 5 ans à compter du signing, PARTIE B s'interdit de commercialiser
sous la marque APIX toute solution d'analyse de données environnementales
(activité historique de PARTIE A) sur le territoire français métropolitain,
en contrepartie d'une indemnité forfaitaire de 80 000 EUR versée par PARTIE A.

Article 3 — Engagement de non-contestation
Les parties s'engagent réciproquement à ne pas contester la validité
des marques de l'autre partie pendant la durée de l'accord (10 ans).

Article 4 — Notification aux offices
PARTIE A retire l'opposition INPI dans les 15 jours du signing.
PARTIE B notifie EUIPO du retrait de la procédure UE correspondante.

Article 5 — Clause pénale
Toute violation de l'article 1 ou 2 entraîne une indemnité forfaitaire
de 250 000 EUR par infraction, sans préjudice de poursuites en contrefaçon.

Article 6 — Cession et changement de contrôle
Toute cession de marque entraîne transmission de plein droit du présent
accord au cessionnaire. Changement de contrôle de PARTIE B → préemption
PARTIE A pendant 90 jours.

Article 7 — Juridiction
TJ Paris 3e chambre, compétence exclusive marques L.716-3 CPI.
```

---

## Vérité terrain

### Routing attendu

`reviser-contrat` doit détecter :
- **Termes dominants PI** : « marque », « INPI », « EUIPO », « opposition », « classes », « L.716-3 CPI », « non-contestation »
- **Termes commerciaux significatifs** : « non-concurrence territoriale » (avec contrepartie), « clause pénale », « changement de contrôle »
- → **Cas mixte typique** : le coeur du contrat est PI (coexistence) MAIS la clause de non-concurrence territoriale et la clause pénale 250k€ méritent une analyse commerciale autonome (déséquilibre significatif L.442-1 ? validité non-concurrence avec contrepartie ?).

Routing attendu :
- (a) lancer `contrats-pi` à la place — **insuffisant** car perte de l'analyse non-concurrence/clause pénale côté commercial
- (b) limiter `reviser-contrat` aux clauses commerciales — **possible** si l'utilisateur a déjà traité le PI ailleurs
- (c) **les deux en séquence** — option PRINCIPALE à pousser (cas mixte vraiment 50/50)

### Justification doctrinale

Un accord de coexistence est avant tout un acte de **régulation de droits PI** (chaque partie limite l'usage de sa marque) — d'où le routing principal vers `contrats-pi`. Mais l'article 2 contient une **véritable obligation commerciale autonome** (non-concurrence avec contrepartie chiffrée) qui appelle l'analyse de `reviser-contrat` : durée raisonnable, périmètre proportionné, contrepartie suffisante (jurisprudence Cass. soc. 10 juillet 2002 n° 00-45.135 — transposée mutatis mutandis aux engagements entre personnes morales).

La clause pénale à 250 000 EUR (art. 5) relève également de l'art. 1231-5 C.civ (pouvoir modérateur du juge) — analyse commerciale.

### Critères de succès

- [ ] `reviser-contrat` identifie le cas mixte (mention explicite « ce contrat est PI-centric MAIS contient des obligations commerciales autonomes »)
- [ ] Les 3 options sont proposées, avec **recommandation explicite de l'option (c)** pour ce cas
- [ ] Si l'utilisateur choisit (c), la séquence proposée est claire : `contrats-pi` d'abord (coeur marques), `reviser-contrat --posture=équilibré` ensuite (sur les seules clauses 2 et 5)
- [ ] Au moins une mention de la jurisprudence non-concurrence ou de l'art. 1231-5 C.civ pour signaler le risque commercial

### Faux routing critique à NE PAS observer

- ❌ `reviser-contrat` ignore le caractère PI et traite tout en commercial (manque l'oppostion INPI, la non-contestation, l'inscription)
- ❌ `reviser-contrat` route 100 % vers PI sans signaler les obligations commerciales — perte du risque non-concurrence
- ❌ Recommandation incompréhensible (« je ne sais pas vers quel skill aller »)
