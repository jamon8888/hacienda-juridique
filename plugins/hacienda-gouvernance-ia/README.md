# Hacienda Gouvernance IA

`hacienda-gouvernance-ia` est le plugin de gouvernance IA de la marketplace Hacienda. Il couvre qualification de cas d'usage, AI Act, RGPD, registre des systemes IA, AIA, fournisseurs IA, politique interne et surveillance de drift.

Chaque sortie reste un brouillon a revue humaine : source officielle ou `[a verifier]`, Note de revue, Arbre de decision, validation humaine et dossier de preuve.

## Premier Lancement

```text
/hacienda-gouvernance-ia:entretien-demarrage
```

## Sources Prioritaires

- AI Act, EUR-Lex, Commission europeenne ;
- CNIL, EDPB, RGPD et loi Informatique et Libertes ;
- documentation fournisseur, model cards, system cards ;
- politique interne IA, registre RGPD, contrats, DPA ;
- evidence de tests, red teaming, logs et controles humains.

## Skills

- `entretien-demarrage`
- `qualification-cas-usage-ia` : classifie le cas, role, tier et red lines.
- `analyse-ai-act` : analyse obligations et deadlines AI Act.
- `revue-fournisseur-ia` : relit clauses, documentation et garanties fournisseur.
- `generer-aia` : produit une analyse d'impact IA.
- `registre-systemes-ia` : maintient le registre par systeme.
- `politique-ia-interne` : redige ou met a jour la politique IA.
- `analyse-gap-ia` : compare politique et pratique avec exigences.
- `revue-rgpd-ia` : analyse donnees personnelles, DPIA, base legale et droits.
- `surveillance-ia-policy` : surveille drift entre usage reel et politique.

## Agents

- `veilleur-ai-act` : surveille textes et lignes directrices.
- `registre-cas-usage-ia` : suit nouveaux usages et requalifications.
- `surveillant-fournisseurs-ia` : surveille changements fournisseurs et modeles.
- `veilleur-ia-rgpd` : surveille doctrine CNIL/EDPB et risques donnees.

## Livrables

- registre des systemes IA ;
- note de qualification ;
- AIA ;
- revue fournisseur ;
- gap analysis ;
- politique interne ;
- dossier de preuve ;
- Note de revue.

## Mode Silencieux

Le Mode silencieux reutilise registre, red lines et seuils connus. Il ne remplace pas la validation humaine d'un systeme IA ou d'une AIA.
