{
  "skill": "due-diligence-dataroom",
  "criteria": [
    {
      "id": "C-001",
      "niveau": "MAJEUR",
      "axe": "Cadre et posture",
      "match_criteria": "PASS si la sortie se place explicitement du côté de l'acquéreur (MERIDIAN CAPITAL SAS), qualifie l'analyse de due diligence de préliminaire sous forme de brouillon soumis à validation obligatoire d'un avocat M&A, et n'offre pas de conseil juridique définitif ; FAIL si la sortie adopte une posture neutre, vendeur, ou s'affiche comme un livrable final ne requérant aucune validation."
    },
    {
      "id": "C-002",
      "niveau": "MAJEUR",
      "axe": "Cadre et posture",
      "match_criteria": "PASS si la sortie applique de manière rigoureuse le seuil de matérialité de 50 000 EUR pour trier, qualifier et filtrer les findings matériels devant déclencher des garanties spécifiques ou des ajustements contractuels ; FAIL si le seuil de 50 000 EUR n'est pas mentionné, ou s'il est appliqué de manière incohérente (par exemple en qualifiant de non matériel un finding supérieur à 50 000 EUR comme la convention de conseil de 120 000 EUR ou le litige distributeur de 150 000 EUR)."
    },
    {
      "id": "C-003",
      "niveau": "MAJEUR",
      "axe": "Méthodologie",
      "match_criteria": "PASS si la sortie mentionne et déroule l'étape obligatoire de pré-flight `check-pii` sur l'ensemble de la data-room, justifie le franchissement du seuil B (présence d'IBAN, contrats salariés, montants > 10k€, etc.) et formule le prompt utilisateur requis tout en respectant la décision prise ; FAIL si l'analyse de la data-room est engagée sans pré-flight ni justification du seuil B."
    },
    {
      "id": "C-004",
      "niveau": "MAJEUR",
      "axe": "Méthodologie",
      "match_criteria": "PASS si la sortie dresse un inventaire ordonné des 6 documents de la data-room classés selon les 7 thèmes de l'audit et intègre les résultats d'une extraction d'informations contractuelles structurée et tabulaire issue du skill `revue-tabulaire` (colonnes adaptées aux thèmes) ; FAIL si la sortie omet d'inventorier les documents ou de présenter un tableau d'extraction contractuelle."
    },
    {
      "id": "C-005",
      "niveau": "MAJEUR",
      "axe": "Corporate",
      "match_criteria": "PASS si la sortie identifie la clause d'agrément de toute cession d'actions figurant dans les statuts de VIRIDIS SOFTWARE SAS, explique que l'acquisition de 100 % des actions déclenche cette clause et exige sa purge préalable par la collectivité des associés conformément aux statuts, et classe ce point en gravité 🟠 ; FAIL si la clause d'agrément statutaire ou la nécessité de sa purge lors du transfert des actions sont ignorées."
    },
    {
      "id": "C-006",
      "niveau": "MAJEUR",
      "axe": "Corporate",
      "match_criteria": "PASS si la sortie relève que la table de capitalisation fournie n'intègre pas la dilution potentielle de 9 % liée au plan de BSPCE attribué à 6 salariés clés, et recommande de clarifier le statut de ces bons au closing (caducité, exercice accéléré ou rachat) ; FAIL si la non-intégration de la dilution des BSPCE dans la table de capitalisation fournie est ignorée."
    },
    {
      "id": "C-007",
      "niveau": "CRITIQUE",
      "axe": "Gouvernance",
      "match_criteria": "PASS si la sortie qualifie d'irrégulière (gravité d'au moins 🟠, matériel) la convention de prestation de conseil de 120 000 EUR/an conclue en 2024 avec la holding d'un dirigeant, au motif qu'elle n'a pas fait l'objet d'un rapport spécial sur les conventions réglementées ni d'une approbation par les associés conformément à l'article L. 227-10 du Code de commerce, et rappelle que les conséquences préjudiciables de l'absence d'approbation restent à la charge du dirigeant ; FAIL si la convention n'est pas qualifiée de convention réglementée irrégulière sous le visa de l'article L. 227-10 du Code de commerce, ou si elle est qualifiée de non matérielle malgré son montant supérieur au seuil de 50 000 EUR."
    },
    {
      "id": "C-008",
      "niveau": "MAJEUR",
      "axe": "Gouvernance",
      "match_criteria": "PASS si la sortie identifie le défaut de dépôt des comptes annuels 2024 au greffe du tribunal de commerce comme une infraction aux obligations légales prévues par les articles L. 232-21 à L. 232-23 du Code de commerce (un un de retard constaté à la date du 25 septembre 2026 pour une approbation au 30 juin 2025), et classe ce point en enjeu de gouvernance (gravité 🟡 ou 🟠) ; FAIL si le non-dépôt des comptes 2024 ou la violation des articles L. 232-21 à L. 232-23 du Code de commerce ne sont pas mentionnés."
    },
    {
      "id": "C-009",
      "niveau": "CRITIQUE",
      "axe": "Contrats",
      "match_criteria": "PASS si la sortie qualifie de risque commercial critique (gravité 🔴) le contrat client « ALPHA » en raison de sa concentration majeure (environ 40 % du chiffre d'affaires de la Cible), caractérisant une situation de dépendance économique ; FAIL si le rapport omet de souligner cette concentration ou s'il sous-estime la gravité de ce risque commercial."
    },
    {
      "id": "C-010",
      "niveau": "CRITIQUE",
      "axe": "Contrats",
      "match_criteria": "PASS si la sortie identifie que l'opération déclenche la clause de changement de contrôle du contrat client « ALPHA », offrant au client un droit de résiliation de plein droit et sans indemnité, et préconise d'exiger l'accord écrit préalable du client comme condition suspensive de closing ; FAIL si la clause de changement de contrôle ou le risque de résiliation sans indemnité du contrat ALPHA ne sont pas analysés sous l'angle du closing."
    },
    {
      "id": "C-011",
      "niveau": "MAJEUR",
      "axe": "Contrats",
      "match_criteria": "PASS si la sortie relève la fragilité temporelle du contrat client « ALPHA » liée à sa reconduction tacite annuelle combinée à un préavis de résiliation de seulement 3 mois, renforçant l'insécurité quant à la pérennité du chiffre d'affaires ; FAIL si le préavis de 3 mois ou la clause de tacite reconduction du contrat ALPHA ne sont pas analysés comme des éléments de fragilité contractuelle."
    },
    {
      "id": "C-012",
      "niveau": "CRITIQUE",
      "axe": "Social",
      "match_criteria": "PASS si la sortie qualifie de risque matériel majeur (gravité 🔴 ou 🟠) le redressement URSSAF notifié de 300 000 EUR, explique que la non-conformité de l'accord de forfait-jours pour 20 cadres expose la Cible à la nullité des forfaits individuels et à un risque de rappel de salaires pour heures supplémentaires sur 3 ans ; FAIL si le rapport ne fait pas le lien entre l'accord non conforme, le risque de nullité du forfait-jours et le passif d'heures supplémentaires, ou omet de qualifier la gravité de ce redressement de 300 000 EUR."
    },
    {
      "id": "C-013",
      "niveau": "MAJEUR",
      "axe": "Social",
      "match_criteria": "PASS si la sortie signale que la procédure de licenciement en cours du représentant du personnel (salarié protégé) exige obligatoirement l'autorisation administrative préalable de l'inspecteur du travail (Art. L. 2421-3 du Code du travail) sous peine d'annulation de la rupture et de poursuites pour délit d'entrave, et préconise d'obtenir copie de l'autorisation administrative ; FAIL si le licenciement est analysé comme un licenciement ordinaire, sans mention du statut protecteur ou de l'obligation de l'autorisation de l'inspecteur du travail."
    },
    {
      "id": "C-014",
      "niveau": "CRITIQUE",
      "axe": "PI",
      "match_criteria": "PASS si la sortie identifie l'absence de contrat écrit de cession des droits d'auteur sur la plateforme SaaS développée en 2022 par un freelance comme un red flag critique, rappelle sous le visa de l'article L. 131-3 du Code de la propriété intellectuelle (CPI) qu'un contrat de prestation de services n'opère aucun transfert automatique, et exige une régularisation écrite expresse et délimitée ; FAIL si le rapport valide tacitement la propriété intellectuelle exclusive du logiciel par la Cible sans pointer le risque de revendication de propriété par le freelance sous le visa de l'article L. 131-3 du CPI."
    },
    {
      "id": "C-015",
      "niveau": "MAJEUR",
      "axe": "PI",
      "match_criteria": "PASS si la sortie signale l'intégration de composants sous licence copyleft (GPL) dans la plateforme SaaS, explique le risque d'effet « viral » ou de contamination (contamination du code propriétaire et obligation éventuelle de le publier sous licence GPL), et recommande un audit technique d'expertise ; FAIL si le risque spécifique de contamination copyleft de la licence GPL sur le logiciel de la Cible est ignoré."
    },
    {
      "id": "C-016",
      "niveau": "MAJEUR",
      "axe": "PI",
      "match_criteria": "PASS si la sortie identifie l'absence de dépôt de la marque « VIRIDIS » auprès de l'INPI comme un risque sérieux d'usurpation et d'insécurité d'exploitation, et recommande un dépôt de marque immédiat ; FAIL si le non-dépôt de la marque « VIRIDIS » à l'INPI n'est pas identifié comme un finding de propriété intellectuelle."
    },
    {
      "id": "C-017",
      "niveau": "MAJEUR",
      "axe": "Fiscal",
      "match_criteria": "PASS si la sortie dresse un audit de premier niveau du risque de redressement URSSAF de 300 000 EUR et insère un pointeur ou renvoi explicite vers un audit fiscal ou comptable approfondi pour le chiffrage et l'étude des provisions financières ; FAIL si l'audit fiscal/financier approfondi n'est pas renvoyé vers les experts qualifiés."
    },
    {
      "id": "C-018",
      "niveau": "CRITIQUE",
      "axe": "Contentieux",
      "match_criteria": "PASS si la sortie identifie le litige commercial de 150 000 EUR avec l'ancien distributeur comme relevant de la rupture brutale de relations commerciales établies en citant le fondement de l'article L. 442-1, II du Code de commerce (ou de l'ancien article L. 442-6, I, 5°), et relève que l'assignation a été délivrée bien que l'audience ne soit pas fixée ; FAIL si le litige n'est pas rattaché au fondement légal de l'article L. 442-1, II du Code de commerce ou s'il est traité comme un litige non matériel de rupture ordinaire."
    },
    {
      "id": "C-019",
      "niveau": "MAJEUR",
      "axe": "Contentieux",
      "match_criteria": "PASS si la sortie agrège les passifs ou risques financiers identifiés (redressement URSSAF de 300 000 EUR et litige commercial de 150 000 EUR) pour évaluer un risque cumulé minimum de 450 000 EUR (nettement supérieur au seuil de matérialité de 50 000 EUR), et recommande de vérifier leur niveau de provisionnement comptable ; FAIL si le rapport omet de consolider les risques financiers identifiés ou d'en recommander la vérification comptable."
    },
    {
      "id": "C-020",
      "niveau": "MAJEUR",
      "axe": "RGPD",
      "match_criteria": "PASS si la sortie identifie l'insuffisance du registre des activités de traitement au sens de l'article 30 du RGPD (requis car le traitement de données n'est pas occasionnel) et l'absence de désignation d'un DPO au titre de l'article 37 du RGPD comme des manquements réglementaires (gravité 🟠), et pointe vers un audit RGPD approfondi ; FAIL si l'incomplétude du registre des traitements ou l'absence de DPO ne sont pas identifiées ou qualifiées sous l'angle du RGPD."
    },
    {
      "id": "C-021",
      "niveau": "CRITIQUE",
      "axe": "RGPD",
      "match_criteria": "PASS si la sortie qualifie de manquement critique (gravité d'au moins 🟠) l'absence de notification à la CNIL de la violation de données (fuite d'e-mails clients) survenue en 2024, rappelle l'obligation de notification dans les 72 heures selon l'article 33 du RGPD et les risques de sanctions financières substantielles (jusqu'à 10 millions d'euros ou 2 % du CA mondial), et conseille une garantie spécifique de passif ; FAIL si la fuite de données de 2024 non notifiée à la CNIL n'est pas qualifiée d'infraction grave aux articles du RGPD, ou si les risques de sanctions administratives ou de réputation afférents sont ignorés."
    },
    {
      "id": "C-022",
      "niveau": "MAJEUR",
      "axe": "Grille de matérialité",
      "match_criteria": "PASS si la sortie intègre une grille de matérialité récapitulant l'ensemble des findings qualifiés par Thème × Gravité (🟢/🟡/🟠/🔴) × Statut (Confirmé / À documenter / Document manquant) × Matérialité (Oui/Non), triés par gravité décroissante, appliquant fidèlement le seuil de 50 000 EUR ; FAIL si la grille de matérialité est absente, ou si les findings d'un montant supérieur à 50 000 EUR (URSSAF, distributeur, convention de conseil) ne sont pas qualifiés de matériels."
    },
    {
      "id": "C-023",
      "niveau": "MAJEUR",
      "axe": "Q&A list",
      "match_criteria": "PASS si la sortie produit une Q&A list structurée répertoriant de manière opérationnelle les questions à adresser au cédant pour compléter la data-room, associant chaque question à un niveau de priorité (Haute pour les enjeux matériels 🔴/🟠) et demandant notamment la production de l'avenant de cession de droits du freelance, des justificatifs de licenciement du salarié protégé, et de l'accord collectif de forfait-jours ; FAIL si aucune Q&A list n'est incluse, ou si elle omet de demander des pièces essentielles comme la cession de droits du freelance."
    },
    {
      "id": "C-024",
      "niveau": "MAJEUR",
      "axe": "GAP",
      "match_criteria": "PASS si la sortie propose des recommandations de clauses de SPA/GAP concrètes pour les findings corporate et contrats, notamment des conditions suspensives de purge de l'agrément statutaire par la collectivité des associés et d'obtention de l'accord écrit préalable du client ALPHA sur le changement de contrôle ; FAIL si aucune condition suspensive ou recommandation de négociation contractuelle n'est formulée pour la clause d'agrément statutaire ou pour le client ALPHA."
    },
    {
      "id": "C-025",
      "niveau": "MAJEUR",
      "axe": "GAP",
      "match_criteria": "PASS si la sortie préconise de couvrir le redressement URSSAF de 300 000 EUR et le litige de rupture commerciale de 150 000 EUR sous forme d'indemnisations spécifiques au premier euro (garanties spécifiques chiffrées), exclues du panier de franchise et du plafond général de la GAP, et recommande la mise en place d'un séquestre ou holdback de garantie ; FAIL si les passifs identifiés de l'URSSAF ou du distributeur sont laissés sous la garantie générale sans clause d'indemnisation spécifique de premier euro ni demande de sûreté (séquestre)."
    },
    {
      "id": "C-026",
      "niveau": "MAJEUR",
      "axe": "GAP",
      "match_criteria": "PASS si la sortie recommande d'exiger une condition suspensive de régularisation et de signature d'un protocole de cession de droits d'auteur en bonne et due forme avec le freelance de 2022 (conforme à l'art. L. 131-3 du CPI), et des déclarations et garanties (D&G) spécifiques et robustes pour le passif social et les risques RGPD (notamment la fuite de données de 2024) ; FAIL si aucune condition de régularisation pour les droits du freelance ou déclaration spécifique pour les risques RGPD et sociaux n'est proposée."
    },
    {
      "id": "C-027",
      "niveau": "MAJEUR",
      "axe": "Formalisme",
      "match_criteria": "PASS si la sortie affiche en en-tête de page la mention de confidentialité correcte selon le statut de l'avocat : « CONFIDENTIEL — DOCUMENT DE TRAVAIL — Secret professionnel art. 66-5 loi n°71-1130 du 31 décembre 1971 » ; FAIL si cette mention est absente ou ne fait pas référence au secret professionnel et à l'article 66-5 de la loi du 31 décembre 1971."
    },
    {
      "id": "C-028",
      "niveau": "MAJEUR",
      "axe": "Formalisme",
      "match_criteria": "PASS si la sortie commence par un bloc de « Note du relecteur » structuré comprenant exactement les 5 champs obligatoires : Sources, Lecture, Signalé pour ton jugement, Fraîcheur, et Avant de t'appuyer dessus ; FAIL si la note du relecteur est absente, ou s'il lui manque l'un de ces 5 champs."
    },
    {
      "id": "C-029",
      "niveau": "MINEUR",
      "axe": "Formalisme",
      "match_criteria": "PASS si la sortie comporte, avant les options, une section « Une question hors de ma checklist habituelle » posant une question pertinente et transversale d'un avocat attentif, suivie d'un arbre de décision présentant les 5 options standardisées de fin de document du profil Hacienda ; FAIL si la question hors checklist ou l'arbre des 5 options sont absents."
    },
    {
      "id": "C-030",
      "niveau": "MAJEUR",
      "axe": "Citations",
      "match_criteria": "PASS si la sortie utilise des tags de provenance valides (ex. `[Légifrance]`, `[Eurlex]` ou `[à vérifier]`) placés immédiatement après chaque citation ou texte visé, cite correctement des articles réels du Code civil, Code de commerce et Code de la propriété intellectuelle (ex. C. civ 1104, C. com L. 227-10, L. 227-14, L. 232-23, L. 442-1 II, CPI L. 131-3) sans insérer de backticks à l'intérieur des cellules de tableau, et se termine par un log de vérification des sources ; FAIL si les tags de provenance sont absents, erronés, s'il y a des backticks dans les cellules de tableau pour les tags de provenance, ou si des articles inexistants sont cités."
    }
  ]
}