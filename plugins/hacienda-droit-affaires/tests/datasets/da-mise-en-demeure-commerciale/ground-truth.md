{
  "skill": "mise-en-demeure-commerciale",
  "_sources": "Sources officielles vérifiées : Code civil art. [1344](https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000032042162/2026-02-24), [1344-1](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032035273/2026-05-10), [1231-5](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032010131) ; Code de commerce art. [L.441-10](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038414392/2021-11-08), [D.441-5](https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000043197457/2023-02-03), [L.622-21](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044052603/2022-04-01) ; taux d’intérêt légal : arrêtés du [19 juin 2025](https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000051783195) et du [15 décembre 2025](https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000053165415).",
  "_provenance": "Phase 2 blind Codex GPT-5.5 HIGH (cycle AOV4CS) — JSON extrait de la réponse markdown | C-011 assouplie (finding E2) : accepte [à vérifier] en mode dégradé.",
  "criteria": [
    {
      "id": "C-001",
      "niveau": "CRITIQUE",
      "axe": "posture",
      "match_criteria": "PASS si le livrable est une mise en demeure rédigée côté créancier OPTIMA-FOURNITURES contre NOVEXA SERVICES ; FAIL s’il inverse les rôles ou rédige côté débiteur."
    },
    {
      "id": "C-002",
      "niveau": "MAJEUR",
      "axe": "données",
      "match_criteria": "PASS si seules les données fictives du scénario sont utilisées ; FAIL si le livrable prétend avoir consulté des données réelles BODACC/SIRENE ou ajoute des faits externes."
    },
    {
      "id": "C-003",
      "niveau": "MAJEUR",
      "axe": "qualification",
      "match_criteria": "PASS si la relation est qualifiée B2B/professionnelle entre deux SAS avec CGV acceptées ; FAIL si le livrable applique un régime consommateur ou ignore la nature commerciale."
    },
    {
      "id": "C-004",
      "niveau": "CRITIQUE",
      "axe": "créance",
      "match_criteria": "PASS si la créance est présentée comme certaine, liquide et exigible au vu des factures échues, livraisons réceptionnées sans réserve, absence de contestation, paiement partiel, avoir ou compensation ; FAIL si elle est traitée comme incertaine sans fait justificatif."
    },
    {
      "id": "C-005",
      "niveau": "MAJEUR",
      "axe": "échéances",
      "match_criteria": "PASS si les échéances sont reprises correctement : 14 novembre 2025 pour FA-2025-0731 et 3 décembre 2025 pour FA-2025-0802 ; FAIL si une échéance substantiellement erronée décale l’exigibilité."
    },
    {
      "id": "C-006",
      "niveau": "CRITIQUE",
      "axe": "principal",
      "match_criteria": "PASS si le principal réclamé est 10 590,00 € TTC, composé de 4 380,00 € et 6 210,00 € ; FAIL si le total principal est faux."
    },
    {
      "id": "C-007",
      "niveau": "MAJEUR",
      "axe": "mise en demeure",
      "match_criteria": "PASS si la lettre comporte une interpellation suffisante de payer, datée dans le cadre du 5 janvier 2026, et utilise clairement les termes de mise en demeure ; FAIL si elle reste une simple relance amiable."
    },
    {
      "id": "C-008",
      "niveau": "MAJEUR",
      "axe": "délai",
      "match_criteria": "PASS si un délai raisonnable et déterminé est donné à NOVEXA pour payer, par exemple 8 à 15 jours calendaires à compter de la réception ; FAIL si aucun délai n’est fixé ou si le paiement immédiat est exigé sans délai praticable."
    },
    {
      "id": "C-009",
      "niveau": "MAJEUR",
      "axe": "intérêts",
      "match_criteria": "PASS si les intérêts/pénalités de retard sont rattachés aux CGV et au retard de paiement B2B, avec exigibilité après échéance sans rappel nécessaire ; FAIL si le livrable affirme qu’aucun intérêt ne court avant la mise en demeure malgré les CGV/L.441-10."
    },
    {
      "id": "C-010",
      "niveau": "MAJEUR",
      "axe": "intérêts",
      "match_criteria": "PASS si l’article 1344-1 est cité seulement pour l’effet moratoire de la mise en demeure sur une obligation de somme d’argent ; FAIL s’il est présenté comme fondement du forfait de 40 € ou de la clause pénale."
    },
    {
      "id": "C-011",
      "niveau": "MAJEUR",
      "axe": "calcul intérêts",
      "match_criteria": "PASS si la sortie traite le taux d'intérêt moratoire correctement : SOIT elle fournit le taux légal professionnel applicable avec sa source (Légifrance/JORF), SOIT — en mode dégradé, outil de consultation indisponible — elle identifie le bon concept (taux légal professionnel, pas consommateur) et le tague [à vérifier] sans inventer de valeur. FAIL si elle invente un taux chiffré sans source, applique le taux consommateur, ou omet la majoration contractuelle des CGV."
    },
    {
      "id": "C-012",
      "niveau": "MINEUR",
      "axe": "calcul intérêts",
      "match_criteria": "PASS si les intérêts sont indiqués “à parfaire jusqu’au complet paiement” et, en cas de chiffrage au 5 janvier 2026, donnent environ 89,58 € à 91,79 € selon convention de décompte ; FAIL si un chiffrage précis s’écarte fortement de cette plage sans méthode."
    },
    {
      "id": "C-013",
      "niveau": "MAJEUR",
      "axe": "forfait recouvrement",
      "match_criteria": "PASS si l’indemnité forfaitaire de recouvrement est réclamée à 40 € par facture impayée, soit 80 € au total ; FAIL si elle est omise ou calculée une seule fois à 40 €."
    },
    {
      "id": "C-014",
      "niveau": "MAJEUR",
      "axe": "clause pénale",
      "match_criteria": "PASS si la clause pénale est chiffrée à 12 % du principal, soit 1 270,80 €, le minimum de 300 € n’étant pas applicable car inférieur ; FAIL si le livrable réclame seulement 300 € ou calcule 12 % sur une mauvaise assiette significative."
    },
    {
      "id": "C-015",
      "niveau": "MAJEUR",
      "axe": "clause pénale",
      "match_criteria": "PASS si la clause pénale est présentée avec prudence comme contractuelle, liée au recouvrement contentieux et susceptible de modération judiciaire selon l’article 1231-5 ; FAIL si elle est présentée comme intangible ou insusceptible de contrôle du juge."
    },
    {
      "id": "C-016",
      "niveau": "MINEUR",
      "axe": "total",
      "match_criteria": "PASS si le total hors intérêts à parfaire est 11 940,80 € ; FAIL si le total mélange principal, forfait, clause pénale et intérêts de manière illisible ou arithmétiquement fausse."
    },
    {
      "id": "C-017",
      "niveau": "MAJEUR",
      "axe": "suite procédurale",
      "match_criteria": "PASS si la lettre annonce qu’à défaut de paiement OPTIMA pourra envisager une injonction de payer ou toute voie de recouvrement utile ; FAIL si elle annonce une mesure juridiquement impossible ou disproportionnée à ce stade."
    },
    {
      "id": "C-018",
      "niveau": "CRITIQUE",
      "axe": "procédure collective",
      "match_criteria": "PASS si le livrable contient le garde-fou L.622-21 : en cas d’ouverture d’une sauvegarde/redressement/liquidation concernant NOVEXA, les poursuites individuelles en paiement d’une créance antérieure doivent être arrêtées ou interdites et la stratégie doit être revue ; FAIL s’il recommande de poursuivre malgré une procédure collective ouverte."
    },
    {
      "id": "C-019",
      "niveau": "MAJEUR",
      "axe": "procédure collective",
      "match_criteria": "PASS si le livrable indique seulement qu’aucune procédure collective n’est connue d’après le scénario ; FAIL s’il affirme une vérification réelle ou définitive non fournie par les faits."
    },
    {
      "id": "C-020",
      "niveau": "MAJEUR",
      "axe": "citations",
      "match_criteria": "PASS si les références légales actuelles sont L.441-10 et D.441-5 pour le forfait et les pénalités B2B, 1344/1344-1 pour la mise en demeure/intérêts moratoires, 1231-5 pour la clause pénale, L.622-21 pour l’arrêt des poursuites ; FAIL si des articles inventés ou abrogés sont utilisés comme fondement principal."
    },
    {
      "id": "C-021",
      "niveau": "MINEUR",
      "axe": "ton",
      "match_criteria": "PASS si le ton est ferme, factuel et professionnel, sans menace abusive ni formulation insultante ; FAIL si le style est agressif, harcelant ou non professionnel."
    },
    {
      "id": "C-022",
      "niveau": "MINEUR",
      "axe": "hygiène",
      "match_criteria": "PASS si le livrable distingue les sommes dues, les fondements, les réserves/à parfaire et la validation humaine ; FAIL si tout est présenté comme conseil juridique final sans réserve."
    }
  ]
}