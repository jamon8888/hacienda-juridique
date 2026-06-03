{
  "skill": "declaration-creance",
  "_provenance": "Phase 2 blind Codex GPT-5.5 HIGH (cycle ZG7Q5O) + durcissement humain C-011/C-012 (taux légal et intérêts chiffrés tagués [à vérifier], gate de distinction pro/conso conservé)",
  "criteria": [
    {
      "id": "C-001",
      "niveau": "CRITIQUE",
      "axe": "forclusion_declaration",
      "match_criteria": "PASS si la sortie calcule que le délai de déclaration court à compter de la publication BODACC du 19 février 2026, expire en principe le 19 avril 2026, puis est prorogé au lundi 20 avril 2026 à 24h car le 19 avril 2026 est un dimanche. FAIL si elle fait courir le délai depuis le jugement du 12 février 2026, depuis la cessation des paiements du 15 décembre 2025, ou retient une date butoir non prorogée."
    },
    {
      "id": "C-002",
      "niveau": "MAJEUR",
      "axe": "forclusion_declaration",
      "match_criteria": "PASS si la sortie indique qu'au 28 février 2026 METALLO-PRO n'est pas forclose et peut encore déclarer sa créance sans relevé de forclusion. FAIL si elle affirme que la créance est déjà forclose ou qu'un relevé de forclusion est nécessaire à cette date."
    },
    {
      "id": "C-003",
      "niveau": "MAJEUR",
      "axe": "forclusion_declaration",
      "match_criteria": "PASS si la sortie n'applique pas l'allongement de deux mois réservé aux créanciers ne demeurant pas en France métropolitaine, METALLO-PRO étant située à Saint-Priest. FAIL si elle retient une échéance de juin 2026 au motif d'un délai augmenté."
    },
    {
      "id": "C-004",
      "niveau": "CRITIQUE",
      "axe": "perimetre_creance",
      "match_criteria": "PASS si la sortie traite les quatre factures comme des créances antérieures au jugement d'ouverture, y compris F-2026-0012 livrée le 9 janvier 2026 mais échue après le jugement. FAIL si elle exclut F-2026-0012 comme créance postérieure au seul motif que son échéance est le 28 février 2026."
    },
    {
      "id": "C-005",
      "niveau": "MAJEUR",
      "axe": "principal",
      "match_criteria": "PASS si la sortie retient un principal TTC total de 104940,00 euros, correspondant à 87450,00 euros HT et 17490,00 euros de TVA. FAIL si elle déclare seulement le HT, omet la TVA, ou retient un total matériellement différent."
    },
    {
      "id": "C-006",
      "niveau": "MAJEUR",
      "axe": "principal",
      "match_criteria": "PASS si la sortie distingue les sommes échues au jour du jugement, soit 77550,00 euros TTC pour F-2025-1142, F-2025-1198 et F-2025-1241, et la somme à échoir de 27390,00 euros TTC pour F-2026-0012 avec échéance au 28 février 2026. FAIL si elle ne distingue pas échues et à échoir ou classe F-2026-0012 parmi les sommes échues au 12 février 2026."
    },
    {
      "id": "C-007",
      "niveau": "CRITIQUE",
      "axe": "destinataire_declaration",
      "match_criteria": "PASS si la déclaration de créance est adressée au mandataire judiciaire, Me Catherine LEROY, SELARL LEROY & ASSOCIÉS. FAIL si elle est adressée uniquement au débiteur, au tribunal, ou à l'administrateur judiciaire comme destinataire principal de la déclaration."
    },
    {
      "id": "C-008",
      "niveau": "MAJEUR",
      "axe": "contenu_declaration",
      "match_criteria": "PASS si la sortie inclut les exigences de contenu : montant de la créance au jour du jugement, indication des sommes à échoir et dates d'échéance, nature et assiette de la sûreté ou réserve de propriété revendiquée, certification sincère sauf titre exécutoire, et pièces justificatives sous bordereau. FAIL si ces mentions structurantes sont absentes."
    },
    {
      "id": "C-009",
      "niveau": "MAJEUR",
      "axe": "pieces",
      "match_criteria": "PASS si la sortie prévoit au moins les factures, bons ou preuves de livraison, CGV acceptées avec clause de réserve de propriété, balance auxiliaire, mise en demeure du 8 janvier 2026 et AR reçu le 12 janvier 2026, et éléments d'identification des lots non incorporés. FAIL si elle ne prévoit aucune pièce ou seulement une liste générique insuffisante."
    },
    {
      "id": "C-010",
      "niveau": "CRITIQUE",
      "axe": "interets",
      "match_criteria": "PASS si la sortie arrête les intérêts de retard au jugement d'ouverture du 12 février 2026 pour cette créance fournisseur, sans intérêts postérieurs. FAIL si elle calcule des intérêts jusqu'au 28 février 2026 ou au-delà sans qualifier d'exception applicable."
    },
    {
      "id": "C-011",
      "niveau": "MAJEUR",
      "axe": "interets",
      "match_criteria": "PASS si la sortie retient le taux d'intérêt légal applicable aux créances professionnelles (créancier autre qu'une personne physique n'agissant pas pour ses besoins professionnels) du 1er semestre 2026, majoré contractuellement de cinq points conformément à l'art. 8 des CGV, et tague la valeur numérique exacte du taux légal comme [à vérifier] (la valeur ≈ 2,62 % avant majoration est indicative, à confirmer sur l'arrêté en vigueur). FAIL si elle applique le taux légal consommateur/personne physique (≈ 6,67 %), ignore la majoration contractuelle de cinq points, ou présente un taux comme certain sans vérification."
    },
    {
      "id": "C-012",
      "niveau": "MAJEUR",
      "axe": "interets",
      "match_criteria": "PASS si la sortie calcule les intérêts par la bonne méthode : uniquement sur les trois factures échues avant le jugement (F-2025-1142 et F-2025-1198 du 1er janvier au 11 février 2026 ; F-2025-1241 du 1er février au 11 février 2026), arrêtés au jugement d'ouverture, sur base annuelle 365 jours, le montant chiffré étant tagué [à vérifier] car dépendant du taux (le total ≈ 485,98 euros est indicatif). FAIL si elle applique des intérêts à F-2026-0012, calcule au-delà du jugement, ou retient des périodes incompatibles avec les dates d'échéance."
    },
    {
      "id": "C-013",
      "niveau": "MAJEUR",
      "axe": "accessoires_recouvrement",
      "match_criteria": "PASS si la sortie retient 120,00 euros d'indemnité forfaitaire de recouvrement, soit 40,00 euros pour chacune des trois factures en retard au jour du jugement. FAIL si elle retient 160,00 euros en incluant F-2026-0012 ou omet totalement cette indemnité malgré les CGV et l'article D.441-5."
    },
    {
      "id": "C-014",
      "niveau": "MAJEUR",
      "axe": "clause_penale",
      "match_criteria": "PASS si la sortie traite la clause pénale comme un accessoire distinct déclenché pour F-2025-1142, F-2025-1198 et F-2025-1241 après mise en demeure reçue le 12 janvier 2026 et huit jours restés infructueux, pour un montant revendiqué de 11632,50 euros si calculé sur le principal TTC de 77550,00 euros. FAIL si elle l'applique à F-2026-0012, la confond avec les intérêts, ou ignore la condition de mise en demeure."
    },
    {
      "id": "C-015",
      "niveau": "MINEUR",
      "axe": "clause_penale",
      "match_criteria": "PASS si la sortie signale que la clause pénale peut être discutée ou modérée par le juge si elle est manifestement excessive, en référence à l'article 1231-5 du Code civil. FAIL si elle présente la clause pénale comme intangible et nécessairement admise sans réserve."
    },
    {
      "id": "C-016",
      "niveau": "CRITIQUE",
      "axe": "rang",
      "match_criteria": "PASS si la sortie qualifie la créance de prix fournisseur comme créance chirographaire, sous réserve de la clause de réserve de propriété revendiquée sur certains biens. FAIL si elle la qualifie de créance salariale, fiscale, superprivilégiée, privilégiée générale, ou de créance postérieure bénéficiant de l'article L.622-17."
    },
    {
      "id": "C-017",
      "niveau": "MAJEUR",
      "axe": "reserve_propriete",
      "match_criteria": "PASS si la sortie identifie que la réserve de propriété ne peut utilement viser, sur les faits donnés, que les lots non incorporés, individualisables et stockés sur le chantier, évalués à 12000,00 euros HT. FAIL si elle revendique sans nuance la totalité de F-2026-0012, y compris la partie incorporée au gros œuvre pour 10825,00 euros HT."
    },
    {
      "id": "C-018",
      "niveau": "MAJEUR",
      "axe": "reserve_propriete",
      "match_criteria": "PASS si la sortie explique que la clause de réserve de propriété doit avoir été convenue par écrit au plus tard au moment de la livraison et que les CGV acceptées depuis l'ouverture du compte peuvent constituer cet écrit pour l'ensemble des opérations commerciales. FAIL si elle invalide la clause au seul motif qu'elle figure dans des CGV ou, inversement, ne vérifie jamais son acceptation."
    },
    {
      "id": "C-019",
      "niveau": "MAJEUR",
      "axe": "revendication",
      "match_criteria": "PASS si la sortie distingue la déclaration de créance et l'action en revendication, et calcule que la revendication mobilière doit être exercée dans les trois mois de la publication BODACC, soit jusqu'au 19 mai 2026. FAIL si elle confond ce délai avec le délai de déclaration de créance ou affirme que la revendication est déjà tardive au 28 février 2026."
    },
    {
      "id": "C-020",
      "niveau": "MAJEUR",
      "axe": "revendication",
      "match_criteria": "PASS si la sortie indique que la demande de revendication doit être adressée par LRAR à l'administrateur judiciaire désigné, Me Thomas BRAVARD, avec copie au mandataire judiciaire, puis qu'à défaut d'acquiescement dans le mois il faut saisir le juge-commissaire dans le mois suivant. FAIL si elle adresse la revendication uniquement au mandataire, uniquement au tribunal, ou omet la phase d'acquiescement."
    },
    {
      "id": "C-021",
      "niveau": "MAJEUR",
      "axe": "articulation_declaration_revendication",
      "match_criteria": "PASS si la sortie déclare la créance monétaire totale, tout en signalant la revendication parallèle et l'ajustement possible en cas de restitution ou de paiement du prix des biens revendiqués. FAIL si elle déduit d'emblée 12000,00 euros HT du principal déclaré ou omet F-2026-0012 au motif qu'une revendication est envisagée."
    },
    {
      "id": "C-022",
      "niveau": "MINEUR",
      "axe": "compensation_acomptes",
      "match_criteria": "PASS si la sortie mentionne qu'aucun acompte, avance, créance réciproque ou compensation n'est à imputer selon les faits. FAIL si elle invente une compensation, un paiement partiel ou une créance réciproque non fournis par le scénario."
    },
    {
      "id": "C-023",
      "niveau": "MAJEUR",
      "axe": "total_declare",
      "match_criteria": "PASS si, lorsqu'elle chiffre un total accessoirisé, la sortie aboutit à un total cohérent autour de 117178,48 euros, composé de 104940,00 euros de principal TTC, 485,98 euros d'intérêts arrêtés, 120,00 euros d'indemnités forfaitaires et 11632,50 euros de clause pénale, avec les accessoires présentés séparément. FAIL si elle mélange principal et accessoires ou produit un total sans ventilation vérifiable."
    },
    {
      "id": "C-024",
      "niveau": "MINEUR",
      "axe": "hygiene_juridique",
      "match_criteria": "PASS si la sortie distingue clairement faits, droit applicable, analyse, incertitudes et validation humaine, et ne présente pas le livrable comme un conseil juridique final. FAIL si elle formule une conclusion catégorique sans réserve de validation ou cite des sources non consultées comme vérifiées."
    }
  ]
}
