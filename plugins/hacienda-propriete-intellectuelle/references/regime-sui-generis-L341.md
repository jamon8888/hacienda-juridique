# Régime sui generis des bases de données — L.341-1 à L.343-7 CPI

> Référence interne plugin `hacienda-propriete-intellectuelle`. Brouillon soumis à validation humaine. Arrêts et textes cités [à vérifier] avant toute utilisation contentieuse.

---

## 1. Textes fondamentaux (CPI)

### L.341-1 — Droit du producteur

> « Le producteur d'une base de données, entendu comme la personne qui prend l'initiative et le risque des investissements correspondants, bénéficie d'une protection du contenu de la base lorsque la constitution, la vérification ou la présentation de celui-ci atteste d'un investissement financier, matériel ou humain substantiel. »

**Commentaire :** Trois éléments cumulatifs :
1. **Initiative et risque** : le producteur prend la décision économique et supporte le risque financier
2. **Investissement substantiel** : financier (budget), matériel (infrastructure) ou humain (temps-homme)
3. **Portant sur la constitution, la vérification ou la présentation** du contenu (pas la création du contenu lui-même)

---

### L.342-1 — Actes interdits (extraction et réutilisation)

> « Le producteur peut interdire :
> 1° L'extraction, par transfert permanent ou temporaire de la totalité ou d'une partie qualitativement ou quantitativement substantielle du contenu d'une base de données sur un autre support, par tout moyen et sous toute forme que ce soit ;
> 2° La réutilisation, par la mise à la disposition du public de la totalité ou d'une partie qualitativement ou quantitativement substantielle du contenu de la base, quelle qu'en soit la forme. »

**Commentaire :** La notion de « partie substantielle » est appréciée :
- **Quantitativement** : volume des données extraites par rapport à l'ensemble de la base
- **Qualitativement** : importance des données extraites pour l'économie de la base, indépendamment du volume

---

### L.342-2 — Interdiction des extractions répétées

> « Le producteur peut également interdire l'extraction ou la réutilisation répétée et systématique de parties non substantielles du contenu de la base lorsque ces opérations excèdent manifestement les conditions d'utilisation normale de la base. »

**Commentaire :** Vise le scraping par accumulation de petites extractions — chaque extraction unitaire peut être non substantielle mais l'ensemble devient illicite.

---

### L.342-3 — Exceptions légales (non contractualisables)

L'utilisateur légitime (ayant droit d'accès) peut, même contre la volonté du producteur :
1. Extraire une partie non substantielle à des fins privées (hors bases électroniques)
2. Extraire à des fins d'illustration pour l'enseignement ou la recherche scientifique, dans la mesure justifiée par le but non commercial poursuivi
3. Extraire à des fins de sécurité publique ou de procédure administrative ou juridictionnelle

**Commentaire :** Ces exceptions sont d'ordre public — une clause contractuelle les excluant est nulle.

---

### L.342-5 — Durée et renouvellement

> « Les droits prévus à l'article L.342-1 ont une durée de quinze ans à compter du 1er janvier de l'année civile qui suit l'achèvement de la base de données. »
>
> « Lorsqu'une base de données fait l'objet d'un nouvel investissement substantiel, sa protection est prolongée d'une durée équivalente à compter de ce nouvel investissement. »

**Commentaire :** Le renouvellement par investissement substantiel rend la protection **potentiellement perpétuelle** pour les bases maintenues et enrichies régulièrement. Documenter chaque vague d'investissement pour tracer les périodes de protection.

---

### L.343-1 à L.343-7 — Actions en justice

- **L.343-1** : le producteur peut agir en justice contre toute extraction ou réutilisation illicite
- **L.343-4** : saisie-contrefaçon possible (par huissier, avec autorisation du président du TJ)
- **L.343-7** : les personnes morales peuvent être tenues pour responsables des actes de leurs dirigeants ou préposés

---

## 2. Critère d'investissement — La distinction fondamentale (CJUE)

### CJUE, 9 novembre 2004, British Horseracing Board c/ William Hill (C-203/02)

**Faits :** Le BHB organisait les courses de chevaux et créait lui-même les données (résultats, participants). William Hill utilisait ces données pour son activité de paris.

**Décision :** La CJUE a jugé que les ressources consacrées à la **création** du contenu (ici, organiser les courses) ne constituent **pas** un investissement au sens de la directive 96/9/CE. Seul l'investissement pour **obtenir** (collecter, vérifier, présenter) un contenu préexistant ou indépendant de l'activité principale est protégé.

**Portée :** Un producteur qui crée lui-même les données qu'il stocke ne peut pas se prévaloir du droit sui generis pour ces données — même si l'investissement global est énorme.

**Application pratique :**
- Base météo d'un météorologue → données auto-créées → **pas de sui generis** sur les mesures
- Base d'articles de presse compilés par un agrégateur → données collectées → **sui generis possible**
- Annuaire téléphonique → données collectées auprès des abonnés → **sui generis** (Cass. com. confirmé)

---

### CJUE, 19 décembre 2013, Innoweb c/ Wegener (C-202/12)

**Faits :** Innoweb exploitait un méta-moteur de recherche qui interrogeait en temps réel la base de Wegener (annonces immobilières) et restituait les résultats.

**Décision :** La réutilisation en temps réel via un méta-moteur constitue une mise à disposition du public de la totalité fonctionnelle de la base, donc une réutilisation substantielle au sens de L.342-1, même si chaque requête individuelle ne porte que sur une partie.

**Portée :** Un service qui reproduit la fonctionnalité d'une base (permettre des recherches équivalentes sur son contenu) réutilise substantiellement cette base, même sans copier physiquement toutes les données.

---

## 3. Jurisprudence française

### Cass. com., 5 mars 2019, PMU c/ Stanleybet (n° 17-21.201)

**Faits :** Stanleybet scrapait les données de cotes du PMU accessibles publiquement sur son site, pour proposer des paris alternatifs.

**Décision :** La Cour de cassation a confirmé que le PMU bénéficiait du droit sui generis sur sa base de cotes (investissement substantiel documenté dans la collecte et la vérification des données). Le scraping — même de données publiquement accessibles — constitue une extraction illicite au sens de L.342-1.

**Portée :** L'accessibilité publique des données ne crée pas de droit à les extraire ou réutiliser substantiellement. Le droit sui generis s'oppose au scraping non autorisé quelle que soit la forme technique d'accès.

**Application pratique :** Toute base protégée par le droit sui generis peut interdire contractuellement et judiciairement le scraping, y compris si les données sont visibles en ligne.

---

## 4. Distinction investissement constitution vs vérification vs présentation

| Type d'investissement | Exemple | Protégé L.341-1 ? |
|----------------------|---------|------------------|
| Constitution (collecte) | Réunir 500 000 références bibliographiques auprès de sources diverses | Oui |
| Vérification | Contrôler l'exactitude des données collectées, les mettre à jour | Oui |
| Présentation | Développer l'interface, l'indexation, la navigation | Oui |
| Création du contenu | Rédiger les articles qui alimenteront la base | Non (BHB) |
| Génération automatique du contenu | Algorithme calculant les cotes | Non (BHB) |

---

## 5. Tableau de synthèse — Qualification rapide

| Question | Réponse → Qualification |
|----------|------------------------|
| Qui a créé les données ? | Tiers collectés → sui generis possible / Auto-générés → pas de sui generis |
| L'investissement est-il documenté ? | Oui → sui generis / Non → incertain |
| La structure est-elle originale ? | Oui → droit d'auteur cumulable / Non → sui generis seul si investissement |
| La base est-elle maintenue avec investissement continu ? | Oui → renouvellement 15 ans / Non → protection expire |
| Le tiers a-t-il extrait une partie substantielle ? | Oui → L.342-1 applicable / Non → vérifier L.342-2 (répétition) |

---

*Sources : CPI art. L.341-1 à L.343-7. Directive 96/9/CE du Parlement européen et du Conseil du 11 mars 1996. CJUE C-203/02 (BHB), CJUE C-202/12 (Innoweb). Cass. com. 5 mars 2019 n° 17-21.201 (PMU). [à vérifier]*
