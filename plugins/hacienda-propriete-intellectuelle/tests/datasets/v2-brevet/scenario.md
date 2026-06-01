# Dataset test — `preparation-depot-brevet` — Code B5N9QZ

**Domaine** : Brevets (FR + EP + PCT)
**Skill cible** : `/h-pi:preparation-depot-brevet`
**Mode** : préparation complète d'un dossier de dépôt brevet

---

## Scénario fictif

OCTOPUS LABS SAS, startup deeptech cryptographie post-quantique (équipe 22 ingénieurs,
12M€ levés Series A 2025), souhaite déposer un brevet sur une invention finalisée
en avril 2026 : **un procédé de chiffrement homomorphe à seuil applicable aux bases
de données distribuées avec garanties de confidentialité prouvable**.

**Mandataire interne** : Sarah Bernard (mandataire en brevets EQE, 8 ans d'expérience,
inscrite au registre OEB), travaille avec Cabinet PI externe Klein & Partners pour le PCT.

**Stratégie d'extension envisagée** : FR national (priorité) → EP large (validations 12 pays
UE) → PCT (États-Unis, Canada, Israël, Japon, Corée du Sud).

**Inventeurs déclarés** :
- Dr. Antoine Rousseau (CTO, salarié OCTOPUS LABS)
- Camille Bernard (lead crypto, salariée)
- Julien Moreau (chercheur senior, salarié)
- Prof. Émilie Garnier (consultante externe via convention de recherche INRIA, 2024-2026)

---

## Pièces fournies

### Description technique sommaire (extrait d'une note interne)

Le procédé combine :
1. Chiffrement homomorphe (schéma BFV/CKKS) modifié pour fonctionner sur seuil partagé.
2. Décomposition Shamir adaptée aux opérations homomorphes pour seuil t-sur-n participants.
3. Garantie de confidentialité prouvable sous hypothèse RLWE (Ring Learning With Errors).
4. Implémentation optimisée pour bases de données SQL distribuées (PostgreSQL + Citus).

### Antériorité technique identifiée par la recherche préliminaire

- **Brevet US 11,234,567** (Microsoft Research, 2022) — Chiffrement homomorphe à seuil pour cloud computing distribué. Revendication indépendante 1 couvre **schéma BFV avec seuil t-sur-n**.
- **Article scientifique Crypto 2023** (Stanford + EPFL) — « Homomorphic Threshold Cryptography for Distributed Databases » publié décembre 2023. Couvre l'application aux BdD mais pas l'optimisation PostgreSQL/Citus.
- **Brevet EP 3 456 789** (IBM, 2021) — Méthode de calcul homomorphe sur données chiffrées. Couvre les opérations CKKS génériques mais pas le partage de seuil.
- **Article ACM CCS 2024** (équipe OCTOPUS LABS — Dr. Rousseau, Camille Bernard, Prof. Garnier) — « Optimized Threshold Homomorphic Encryption for Distributed SQL » publié **15 mars 2024**. Présente partiellement le procédé.

### Historique de divulgation

- **15 mars 2024** : article ACM CCS publié → **divulgation publique par les inventeurs eux-mêmes**.
- **20 avril 2026** : achèvement du procédé optimisé PostgreSQL/Citus (objet du dépôt).
- **Stratégie envisagée par la direction** : dépôt FR le plus tôt possible, idéalement avant fin avril 2026.

### Convention INRIA — Prof. Émilie Garnier

Convention de recherche signée 15 janvier 2024, expirant 15 janvier 2027.
Article 8 — Propriété intellectuelle :
> « Les inventions issues de la collaboration sont **réputées indivises** entre OCTOPUS LABS et INRIA, sauf accord exprès contraire. INRIA conserve un droit d'usage à des fins de recherche académique. »

**Aucun accord exprès contraire n'a été signé** ; la convention couvre la période de
gestation du procédé.

---

## Vérité terrain attendue

### Findings critiques que le skill DOIT capter

🔴 **Bloquant — Perte probable de nouveauté (Art. 54 CBE / L.611-11 CPI)** :
- L'article ACM CCS 2024 publié le 15 mars 2024 par 3 des 4 inventeurs **divulgue publiquement** une partie substantielle du procédé.
- Le délai de grâce français Art. L.611-13 CPI **n'existe quasiment plus** depuis 2008 (limité aux abus tiers ou expositions internationales reconnues).
- Le délai de grâce EPC Art. 55 CBE est de 6 mois pour des « abus évident » ou expositions internationales reconnues — **un article scientifique standard ne déclenche PAS le délai de grâce**.
- Date dépôt prévu avril 2026 = **plus de 2 ans après divulgation** → toute prior art proche peut être citée contre la nouveauté.
- **Action urgente** : caractériser précisément ce qui dans l'invention 2026 n'est PAS divulgué dans l'article 2024 (probablement : optimisation PostgreSQL/Citus + implémentation industrielle). Limiter les revendications à ce delta.

🔴 **Bloquant — Co-titularité INRIA non résolue** :
- Convention INRIA prévoit indivision entre OCTOPUS LABS et INRIA sur les inventions de la collaboration.
- Prof. Garnier est inventrice du procédé ET sous convention INRIA pendant la période de gestation.
- Déposer sans co-titularité = invention déposée par un seul des co-titulaires = **opposable mais risque action en revendication de propriété L.611-8 CPI** par INRIA pendant 5 ans.
- **Action urgente** : régulariser la co-titularité OU négocier cession INRIA → OCTOPUS LABS AVANT le dépôt.

🟠 **Élevé — Antériorité US 11,234,567 Microsoft Research** :
- La revendication 1 couvre schéma BFV avec seuil t-sur-n = élément central du procédé OCTOPUS.
- Risque sur la portée des revendications indépendantes.
- **Action** : revendications doivent contourner ce brevet par caractéristiques distinctives spécifiques (CKKS modifié + Shamir adapté + RLWE + PostgreSQL optimisation).

🟠 **Élevé — Stratégie EP large vs PCT à arbitrer** :
- Budget annuités EP large 12 pays UE = ~50k€/an cumulé après validation, dépasse souvent le seuil PME.
- PCT 30 mois (Art. 4 PCT) = gel des décisions territoriales jusqu'au seuil 30 mois post-priorité = meilleur pour startup en levée.
- **Recommandation** : FR (priorité) + PCT (gel 30 mois) + arbitrage EP/national à l'entrée de phase nationale.

🟡 **Moyen — Inventeur Prof. Garnier** :
- Doit être mentionnée nominativement (Art. L.611-9 CPI inventeur = personne physique).
- Convention INRIA réserve ses droits à elle aussi indirectement.

🟢 **Faible — Capacité technique du mandataire** :
- Sarah Bernard EQE + cabinet Klein externe = ressources suffisantes.

### Nuances métier subtiles à valoriser

- **Distinguer divulgation par inventeur vs par tiers** : le délai de grâce EPC Art. 55 ne couvre que les abus tiers ou expositions internationales reconnues. La publication ACM CCS = **divulgation volontaire par les inventeurs** = NON couverte.
- **Risque revendication propriété L.611-8 CPI** : action ouverte à INRIA pendant 5 ans après publication du brevet. Anticiper ce risque dans le pacte de co-titularité.
- **PCT 30 mois** : Article 4 PCT (gel décision nationale), Article 22 (entrée phase nationale 30 mois post-priorité) — délais critiques à tenir.
- **Revendications de procédé vs produit** : ici, plusieurs angles possibles (procédé chiffrement + produit BdD chiffrée + système crypto distribué) — multi-claiming à structurer.
- **Notification écrite à l'INPI de la qualité d'inventeur salarié** : Art. L.611-7 CPI : inventions de mission = appartiennent à l'employeur ; inventions hors mission attribuables = négociation. Vérifier les contrats de travail OCTOPUS LABS.

### Pièges à ne pas tomber dedans

1. **Ne pas se fier au délai de grâce français** comme si c'était large (US 1 an) — c'est strictement limité Art. L.611-13.
2. **Ne pas déposer avant régularisation INRIA** sous prétexte d'urgence — la régularisation prend 2-4 semaines négo, le risque revendication 5 ans est durable.
3. **Ne pas oublier la convention INRIA** dans l'audit — c'est dans les pièces mais facile à manquer si on lit en diagonale.
4. **Ne pas conclure « brevetable » ou « non brevetable »** — c'est une opinion de mandataire EQE, le skill prépare seulement.
5. **Ne pas surévaluer la portée des revendications** vu le prior art ACM CCS 2024 + Microsoft + IBM.
6. **Ne pas oublier que le territoire UE/UK depuis Brexit** : EP valable UK + bascule nationale post-validation.

### Recommandation attendue (Seuil de préparation du dépôt)

**Statut : NON-prêt** — 2 risques 🔴 à lever avant dépôt :
1. Caractérisation précise du delta vs article ACM CCS 2024 (limitation des revendications).
2. Régularisation co-titularité INRIA OU cession.

**Plan d'action recommandé** :
- Sprint 1 (1-2 semaines) : audit précis prior art + délimitation revendications déposables.
- Sprint 2 (2-4 semaines) : négociation INRIA + signature avenant cession.
- Sprint 3 : dépôt FR (date priorité), puis PCT à 12 mois, arbitrage EP/national à 30 mois.

---

## Critères de scoring K7M2PX adapté

| Dimension | Poids | Indicateurs |
|---|---|---|
| Couverture du périmètre | 30 % | 5/5 findings critiques captés (nouveauté, INRIA, MS prior art, EP/PCT arbitrage, inventeur Garnier) |
| Détection nuances métier | 30 % | Délai de grâce CBE limité, L.611-8 revendication 5 ans, PCT 30 mois, multi-claiming, L.611-7 inventeur salarié |
| Qualité arbitrage subjectif | 20 % | Recommandation NON-prêt avec plan d'action 3 sprints, cotation 🔴/🟠/🟡 calibrée |
| Lisibilité partner-ready | 10 % | Brief de rédaction exploitable + Seuil de préparation + routage FR/PCT/EP arbitré |
| Résistance aux pièges | 10 % | N'a pas confondu délai de grâce FR/US, n'a pas conclu brevetable, n'a pas omis INRIA |
