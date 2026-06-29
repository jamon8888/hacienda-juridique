Évaluation exécutée sans skill.

| Critère | Résultat | Motif bref |
|---|---:|---|
| C-001 | PASS | Le livrable alerte clairement sur le plafonnement leakage par la GAP. |
| C-002 | PASS | Il demande restitution autonome euro pour euro, hors plafond/franchise/panier. |
| C-003 | FAIL | Il relève les comptes locked box manquants, mais ne signale pas vraiment l’indétermination de la date locked box elle-même. |
| C-004 | FAIL | Il ne propose pas une définition élargie et précise du leakage incluant renonciations, avantages indirects, frais, impôts, etc. |
| C-005 | PASS | Il ne présente pas la CP bancaire comme certain funds satisfaisant. |
| C-006 | PASS | Il critique la CP financement comme ouverte, sans délai/seuil/critères objectifs. |
| C-007 | PASS | Il articule equity, dette, ECL/DCL, conditions et funds flow. |
| C-008 | PASS | Il demande vérification concentrations/IEF sans conclure définitivement. |
| C-009 | PASS | L’absence de disclosure letter est traitée comme red flag majeur. |
| C-010 | PASS | Il traite l’absence de W&I comme arbitrage de protection/solvabilité, pas comme obligation légale. |
| C-011 | PASS | Il préserve des recours hors W&I : leakage, fundamentals, covenants, security. |
| C-012 | PASS | Il commente solidarité, plafond, durée, franchise/panier côté sponsor. |
| C-013 | PASS | Il ne dit pas que les reserved matters sont par principe interdits. |
| C-014 | PASS | Il critique les veto trop opérationnels et le risque d’ingérence/gestion de fait. |
| C-015 | PASS | Il propose de recentrer les veto et critique les seuils 50 k€ / 30 k€. |
| C-016 | PASS | Il ne présente pas le bad leaver à valeur nominale comme sécurisé. |
| C-017 | PASS | Il signale le risque du départ volontaire assimilé à bad leaver. |
| C-018 | PASS | Il relève l’absence d’accession deed et demande sécurisation avant closing. |
| C-019 | PASS | Il identifie le risque fiscal/social du management package BSA. |
| C-020 | PASS | Il traite le double rôle fondateurs vendeurs/garants/investisseurs rollover. |
| C-021 | PASS | Il relève l’écart ECL Lux / SPA et recommande cohérence ou reprise. |
| C-022 | PASS | Il relève BidCo SPV faiblement capitalisée et borne les engagements sponsor. |
| C-023 | PASS | Il liste les données manquantes requises, dont comptes, disclosure, statuts, pacte, CCA, réglementaire. |
| C-024 | PASS | Le livrable distingue analyse, incertitudes, recommandations et validation humaine/sources non consultées. |
| C-025 | PASS | Il renvoie expressément les questions Lux à un conseil luxembourgeois sans trancher le droit luxembourgeois. |

Score : **22/25 PASS**.

{
  "skill": "spa-review-pe",
  "criteria": [
    {
      "id": "C-001",
      "niveau": "CRITIQUE",
      "axe": "Locked box / leakage",
      "match_criteria": "PASS si la sortie ne valide pas le plafonnement du remboursement de leakage par le plafond général de GAP comme une protection suffisante du sponsor ; FAIL si elle affirme que le leakage peut rester soumis au plafond général de GAP sans alerte significative pour l'acquéreur."
    },
    {
      "id": "C-002",
      "niveau": "MAJEUR",
      "axe": "Locked box / leakage",
      "match_criteria": "PASS si la sortie demande que le leakage soit indemnisé euro pour euro, hors franchise, panier et plafond de GAP, avec recours spécifique ; FAIL si elle omet ce traitement spécifique ou traite le leakage comme une simple réclamation de garantie ordinaire."
    },
    {
      "id": "C-003",
      "niveau": "MAJEUR",
      "axe": "Locked box / leakage",
      "match_criteria": "PASS si la sortie relève que la date locked box et les comptes locked box non transmis empêchent de valider le prix fixe de 28 M€ et la base économique ; FAIL si elle considère le prix locked box comme auditable et sécurisé sans demander ces éléments."
    },
    {
      "id": "C-004",
      "niveau": "MAJEUR",
      "axe": "Locked box / leakage",
      "match_criteria": "PASS si la sortie demande une définition élargie et précise du leakage, incluant notamment paiements aux vendeurs ou parties liées, renonciations, avantages indirects, frais, impôts et permitted leakage ; FAIL si elle se contente des dividendes, comptes courants et opérations liées déjà listés sans critique."
    },
    {
      "id": "C-005",
      "niveau": "CRITIQUE",
      "axe": "Certain funds / conditions suspensives",
      "match_criteria": "PASS si la sortie ne qualifie pas la condition de confirmation bancaire au closing de clause certain funds pleinement satisfaisante ; FAIL si elle affirme que cette condition assure le certain funds sans risque pour le closing."
    },
    {
      "id": "C-006",
      "niveau": "MAJEUR",
      "axe": "Certain funds / conditions suspensives",
      "match_criteria": "PASS si la sortie critique la condition bancaire comme trop subjective ou trop ouverte faute de délai, seuil et critères objectifs, ou demande son alignement strict sur la debt commitment letter ; FAIL si elle mentionne la condition sans traiter son caractère résiduel et potentiellement bloquant."
    },
    {
      "id": "C-007",
      "niveau": "MAJEUR",
      "axe": "Certain funds / sponsor side",
      "match_criteria": "PASS si la sortie articule l'equity commitment letter et la debt commitment letter avec les obligations de BidCo, les conditions de tirage et la mécanique de closing ; FAIL si elle traite seulement le prix de 28 M€ sans analyser la disponibilité effective des 12 M€ equity et 16 M€ dette."
    },
    {
      "id": "C-008",
      "niveau": "MAJEUR",
      "axe": "Regulatory conditions",
      "match_criteria": "PASS si la sortie indique que le contrôle des concentrations et l'IEF doivent être vérifiés faute de données suffisantes, sans conclure définitivement ; FAIL si elle affirme que ces autorisations sont sûrement requises ou sûrement inutiles sur les seuls faits fournis."
    },
    {
      "id": "C-009",
      "niveau": "MAJEUR",
      "axe": "GAP / disclosure",
      "match_criteria": "PASS si la sortie traite l'absence de disclosure letter comme un point chaud majeur avant signature ; FAIL si elle analyse la GAP comme négociable normalement sans signaler que les disclosures ne sont pas disponibles."
    },
    {
      "id": "C-010",
      "niveau": "MAJEUR",
      "axe": "GAP / W&I",
      "match_criteria": "PASS si la sortie explique que l'absence de W&I n'est pas illégale mais doit être arbitrée au regard de la solvabilité des vendeurs personnes physiques, du plafond, des exclusions et du calendrier ; FAIL si elle affirme que la W&I est juridiquement obligatoire ou, inversement, inutile par principe."
    },
    {
      "id": "C-011",
      "niveau": "MAJEUR",
      "axe": "GAP / W&I",
      "match_criteria": "PASS si la sortie distingue les recours à préserver hors W&I éventuelle, notamment fraude, leakage, garanties fondamentales et covenants spécifiques ; FAIL si elle propose une W&I sans traiter l'articulation avec les recours directs contre les vendeurs."
    },
    {
      "id": "C-012",
      "niveau": "MAJEUR",
      "axe": "GAP / indemnisation",
      "match_criteria": "PASS si la sortie commente la solidarité des deux vendeurs personnes physiques, le plafond de 30 %, la durée de 30 mois, la franchise et le panier comme paramètres à calibrer ; FAIL si elle se borne à recopier ces paramètres sans analyse côté sponsor."
    },
    {
      "id": "C-013",
      "niveau": "CRITIQUE",
      "axe": "Reserved matters",
      "match_criteria": "PASS si la sortie ne dit pas que tout veto sponsor en SAS est par principe interdit ou nul ; FAIL si elle affirme qu'un sponsor ne peut légalement disposer d'aucun reserved matter dans un pacte de SAS."
    },
    {
      "id": "C-014",
      "niveau": "MAJEUR",
      "axe": "Reserved matters",
      "match_criteria": "PASS si la sortie critique la liste des reserved matters comme trop opérationnelle et susceptible d'exposer le sponsor à un risque de direction de fait ou d'ingérence ; FAIL si elle valide sans réserve les veto sur recrutement, contrats commerciaux, décisions tarifaires et budget."
    },
    {
      "id": "C-015",
      "niveau": "MAJEUR",
      "axe": "Reserved matters",
      "match_criteria": "PASS si la sortie propose de recentrer les veto sur les décisions stratégiques ou exceptionnelles avec seuils adaptés à la taille de la cible ; FAIL si elle ne traite pas le calibrage des seuils de 50 000 € et 30 000 €."
    },
    {
      "id": "C-016",
      "niveau": "CRITIQUE",
      "axe": "Management package / bad leaver",
      "match_criteria": "PASS si la sortie ne présente pas le rachat des BSA à valeur nominale comme automatiquement sécurisé et incontestable ; FAIL si elle affirme que la clause bad leaver à valeur nominale est pleinement valide sans risque parce qu'elle est contractuelle."
    },
    {
      "id": "C-017",
      "niveau": "MAJEUR",
      "axe": "Management package / bad leaver",
      "match_criteria": "PASS si la sortie signale le risque lié à l'assimilation de tout départ volontaire dans les quatre premières années à un bad leaver ; FAIL si elle ne distingue pas faute grave, faute lourde, juste motif et départ volontaire."
    },
    {
      "id": "C-018",
      "niveau": "MAJEUR",
      "axe": "Management package / BSA",
      "match_criteria": "PASS si la sortie relève que les managers n'ont pas signé d'accession deed au pacte et demande de sécuriser leur adhésion avant ou au closing ; FAIL si elle traite les accords de souscription BSA comme suffisants sans pacte ni accession."
    },
    {
      "id": "C-019",
      "niveau": "MAJEUR",
      "axe": "Management package / fiscal-social",
      "match_criteria": "PASS si la sortie identifie un risque fiscal et social à valider sur les BSA à prix d'exercice très bas liés à l'upside et à la qualité de manager ; FAIL si elle présente le management package comme neutre fiscalement et socialement sans réserve."
    },
    {
      "id": "C-020",
      "niveau": "MAJEUR",
      "axe": "Rollover fondateurs",
      "match_criteria": "PASS si la sortie traite le double rôle des fondateurs comme vendeurs, garants et investisseurs rollover, avec conflits potentiels et besoin d'accession au pacte ; FAIL si elle analyse les fondateurs uniquement comme vendeurs."
    },
    {
      "id": "C-021",
      "niveau": "MAJEUR",
      "axe": "Structure sponsor / limitation de recours",
      "match_criteria": "PASS si la sortie relève que la limitation de recours de l'equity commitment letter luxembourgeoise doit être reprise ou cohérente avec le SPA pour éviter un recours vendeur élargi contre le sponsor ; FAIL si elle ignore l'écart entre l'annexe ECL et le corps du SPA."
    },
    {
      "id": "C-022",
      "niveau": "MAJEUR",
      "axe": "Structure sponsor / BidCo",
      "match_criteria": "PASS si la sortie relève que BidCo est une société de projet faiblement capitalisée et que les engagements sponsor doivent être strictement bornés ; FAIL si elle recommande sans réserve une garantie générale du fonds ou de la GP au-delà du commitment."
    },
    {
      "id": "C-023",
      "niveau": "MINEUR",
      "axe": "Données manquantes",
      "match_criteria": "PASS si la sortie liste au moins les comptes locked box, la disclosure letter, les statuts BidCo, le pacte définitif, les comptes courants et l'analyse réglementaire comme données manquantes ; FAIL si elle ne produit pas de liste structurée des informations à obtenir."
    },
    {
      "id": "C-024",
      "niveau": "MINEUR",
      "axe": "Livrable juridique",
      "match_criteria": "PASS si la sortie distingue clairement faits, analyse, incertitudes, recommandations de négociation et validation avocat M&A/PE ; FAIL si elle présente ses conclusions comme un avis juridique final directement exploitable sans validation humaine."
    },
    {
      "id": "C-025",
      "niveau": "CRITIQUE",
      "axe": "Gate France/Lux",
      "match_criteria": "PASS si la sortie traite la jambe française et place explicitement l'entité et les documents luxembourgeois (ECL de la SàRL luxembourgeoise, droit luxembourgeois applicable) hors périmètre Hacienda DA, en renvoyant à un conseil luxembourgeois OU en différant, sans trancher le droit luxembourgeois ; FAIL si elle se prononce au fond sur la validité, l'opposabilité ou les effets de droit luxembourgeois de l'ECL ou de l'entité luxembourgeoise comme s'ils relevaient du périmètre Hacienda DA."
    }
  ]
}