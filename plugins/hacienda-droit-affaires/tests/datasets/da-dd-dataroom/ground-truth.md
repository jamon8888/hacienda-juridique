{
  "skill": "due-diligence-dataroom",
  "criteria": [
    {
      "id": "C-001",
      "niveau": "MAJEUR",
      "axe": "cadrage",
      "match_criteria": "PASS si la sortie se place explicitement côté acquéreur, avec seuil de matérialité de 50 000 EUR et audit des 7 thèmes corporate, contrats, social, PI, fiscal, contentieux, RGPD ; FAIL si elle raisonne côté vendeur, omet le seuil ou réduit l'audit à moins de 7 thèmes."
    },
    {
      "id": "C-002",
      "niveau": "MAJEUR",
      "axe": "inventaire data-room",
      "match_criteria": "PASS si les 6 documents de la data-room sont inventoriés ou exploités sans ajout de pièces fictives ; FAIL si un document central est ignoré ou si la réponse invente des documents non fournis."
    },
    {
      "id": "C-003",
      "niveau": "MAJEUR",
      "axe": "corporate",
      "match_criteria": "PASS si la dilution BSPCE de 9 % non intégrée à la table de capitalisation est identifiée comme risque central pour le prix, la fully diluted cap table et les déclarations de capitalisation ; FAIL si la table fondateurs 62 %, fonds 30 %, managers 8 % est traitée comme complète."
    },
    {
      "id": "C-004",
      "niveau": "MINEUR",
      "axe": "corporate",
      "match_criteria": "PASS si la sortie calcule ou demande une table fully diluted incluant les BSPCE et évite de confondre 9 % de dilution potentielle avec 9 points déjà inclus ; FAIL si le calcul est absent ou arithmétiquement incohérent."
    },
    {
      "id": "C-005",
      "niveau": "MAJEUR",
      "axe": "corporate",
      "match_criteria": "PASS si la clause d'agrément statutaire applicable à toute cession d'actions est signalée comme condition de réalisation ou point de Q&A/waiver pour l'acquisition de 100 % ; FAIL si la cession est présentée comme libre sans analyse de l'agrément."
    },
    {
      "id": "C-006",
      "niveau": "CRITIQUE",
      "axe": "corporate",
      "match_criteria": "PASS si la clause d'agrément est traitée comme une restriction statutaire à purger, sans affirmer qu'elle rend automatiquement la vente impossible ; FAIL si la réponse conclut péremptoirement à l'interdiction absolue ou à la nullité certaine sans analyse."
    },
    {
      "id": "C-007",
      "niveau": "MAJEUR",
      "axe": "gouvernance",
      "match_criteria": "PASS si la convention de conseil avec la holding d'un dirigeant, 120 000 EUR/an, est qualifiée de convention réglementée SAS non reportée/non approuvée au regard de l'article L.227-10 du Code de commerce ; FAIL si elle est ignorée ou qualifiée de convention libre sans justification."
    },
    {
      "id": "C-008",
      "niveau": "MAJEUR",
      "axe": "gouvernance",
      "match_criteria": "PASS si le non-dépôt des comptes 2024 au greffe après l'AG du 30 juin 2025 est relevé comme anomalie de conformité corporate à régulariser ; FAIL si la réponse affirme que l'approbation des comptes suffit et qu'aucun dépôt n'est requis."
    },
    {
      "id": "C-009",
      "niveau": "MAJEUR",
      "axe": "contrats",
      "match_criteria": "PASS si le contrat ALPHA représentant environ 40 % du chiffre d'affaires est identifié comme dépendance client matérielle ; FAIL si la concentration client est absente ou jugée non matérielle au motif qu'aucun montant exact n'est fourni."
    },
    {
      "id": "C-010",
      "niveau": "MAJEUR",
      "axe": "contrats",
      "match_criteria": "PASS si la clause de changement de contrôle permettant une résiliation de plein droit sans indemnité est signalée comme risque de closing/valeur et objet de consentement ou condition préalable ; FAIL si le changement de contrôle est traité comme sans effet contractuel."
    },
    {
      "id": "C-011",
      "niveau": "MINEUR",
      "axe": "contrats",
      "match_criteria": "PASS si la tacite reconduction annuelle et le préavis de 3 mois sont mentionnés comme éléments aggravant ou précisant la perte potentielle ; FAIL si ces éléments sont utilisés à tort pour neutraliser la clause de changement de contrôle."
    },
    {
      "id": "C-012",
      "niveau": "MAJEUR",
      "axe": "social-fiscal",
      "match_criteria": "PASS si le redressement URSSAF de 300 000 EUR lié au forfait-jours de 20 cadres est classé au-dessus du seuil de matérialité et relié aux exigences de validité des conventions de forfait en jours ; FAIL si la contestation par la société conduit à l'écarter du rapport."
    },
    {
      "id": "C-013",
      "niveau": "CRITIQUE",
      "axe": "social-fiscal",
      "match_criteria": "PASS si la sortie n'affirme pas que tout forfait-jours est automatiquement valide ou invalide ; FAIL si elle énonce une règle doctrinalement fausse sur l'absence d'accord collectif/garanties pour les forfaits-jours."
    },
    {
      "id": "C-014",
      "niveau": "MAJEUR",
      "axe": "contentieux",
      "match_criteria": "PASS si le litige distributeur de 150 000 EUR pour rupture de relation commerciale établie est identifié comme contentieux matériel au regard de l'article L.442-1 du Code de commerce ; FAIL s'il est omis ou classé non matériel."
    },
    {
      "id": "C-015",
      "niveau": "MAJEUR",
      "axe": "social-contentieux",
      "match_criteria": "PASS si la procédure de licenciement d'un salarié protégé est signalée comme risque spécifique nécessitant vérification de l'autorisation administrative et du calendrier ; FAIL si elle est traitée comme licenciement ordinaire."
    },
    {
      "id": "C-016",
      "niveau": "MAJEUR",
      "axe": "PI",
      "match_criteria": "PASS si l'absence de cession des droits d'auteur du freelance ayant développé le cœur de la plateforme SaaS est identifiée comme risque critique sur la propriété du logiciel, avec référence au formalisme de cession des droits ; FAIL si la société est réputée automatiquement titulaire des droits du freelance."
    },
    {
      "id": "C-017",
      "niveau": "CRITIQUE",
      "axe": "PI",
      "match_criteria": "PASS si la sortie distingue correctement le régime des logiciels créés par salariés de celui d'un prestataire freelance ; FAIL si elle applique au freelance la dévolution automatique prévue pour les logiciels de salariés."
    },
    {
      "id": "C-018",
      "niveau": "MAJEUR",
      "axe": "PI",
      "match_criteria": "PASS si l'intégration de composants open source GPL/copyleft sans analyse de conformité est signalée comme risque de conformité licence et objet d'audit technique/juridique ; FAIL si elle est ignorée ou si une violation définitive est affirmée sans analyse des usages et distributions."
    },
    {
      "id": "C-019",
      "niveau": "MAJEUR",
      "axe": "PI",
      "match_criteria": "PASS si l'absence de dépôt INPI de la marque VIRIDIS est relevée comme faiblesse de protection du signe distinctif ; FAIL si l'usage commercial seul est présenté comme équivalent à un enregistrement de marque."
    },
    {
      "id": "C-020",
      "niveau": "MAJEUR",
      "axe": "RGPD",
      "match_criteria": "PASS si le registre incomplet des activités de traitement est identifié comme non-conformité RGPD à documenter au regard de l'article 30 ; FAIL si le registre est considéré optionnel sans analyse."
    },
    {
      "id": "C-021",
      "niveau": "MAJEUR",
      "axe": "RGPD",
      "match_criteria": "PASS si l'absence de DPO est signalée comme point d'analyse au regard des critères de désignation obligatoire de l'article 37 RGPD ; FAIL si la réponse affirme sans nuance qu'aucun DPO n'est jamais requis pour une société SaaS traitant des données clients/utilisateurs."
    },
    {
      "id": "C-022",
      "niveau": "MAJEUR",
      "axe": "RGPD",
      "match_criteria": "PASS si la fuite d'une base d'e-mails clients en 2024 non notifiée à la CNIL est traitée comme violation de données nécessitant analyse de notification, délai et documentation ; FAIL si les e-mails sont déclarés hors données personnelles."
    },
    {
      "id": "C-023",
      "niveau": "CRITIQUE",
      "axe": "RGPD",
      "match_criteria": "PASS si la sortie ne conclut pas automatiquement à l'absence d'obligation de notification ; FAIL si elle affirme qu'une violation de données personnelles n'a jamais à être notifiée à la CNIL, contrairement à l'article 33 RGPD."
    },
    {
      "id": "C-024",
      "niveau": "MAJEUR",
      "axe": "matérialité",
      "match_criteria": "PASS si les montants 120 000 EUR/an, 300 000 EUR et 150 000 EUR sont tous classés au-dessus du seuil de 50 000 EUR ; FAIL si l'un de ces postes est classé non matériel sans justification."
    },
    {
      "id": "C-025",
      "niveau": "MAJEUR",
      "axe": "matérialité",
      "match_criteria": "PASS si les risques non chiffrés mais structurants, notamment ALPHA 40 % du chiffre d'affaires, BSPCE 9 %, droits logiciel et RGPD, sont traités comme matériels malgré l'absence d'évaluation en euros ; FAIL si seuls les risques chiffrés sont retenus."
    },
    {
      "id": "C-026",
      "niveau": "MAJEUR",
      "axe": "livrable",
      "match_criteria": "PASS si le rapport comporte une grille de matérialité par thème, gravité et statut, avec distinction ouvert/à confirmer/à régulariser ; FAIL si la sortie est une simple narration sans statut ni niveau de gravité."
    },
    {
      "id": "C-027",
      "niveau": "MAJEUR",
      "axe": "Q&A vendeur",
      "match_criteria": "PASS si une Q&A list au cédant couvre au minimum BSPCE/cap table, agrément, convention réglementée, dépôt des comptes, consentement ALPHA, URSSAF, distributeur, salarié protégé, cession logiciel, open source, marque, registre RGPD, DPO et violation CNIL ; FAIL si la Q&A est absente ou générique."
    },
    {
      "id": "C-028",
      "niveau": "MAJEUR",
      "axe": "SPA-GAP",
      "match_criteria": "PASS si les recommandations pour le SPA/GAP incluent conditions préalables, déclarations spécifiques, indemnités spécifiques ou escrow/ajustement de prix pour les principaux risques ; FAIL si aucune traduction contractuelle des findings n'est proposée."
    },
    {
      "id": "C-029",
      "niveau": "MINEUR",
      "axe": "hygiène juridique",
      "match_criteria": "PASS si le livrable distingue faits, droit, analyse, incertitudes, décisions et validation humaine et rappelle qu'il s'agit d'un brouillon non assimilable à un conseil juridique final ; FAIL si la sortie présente des conclusions définitives sans réserve de validation avocat."
    },
    {
      "id": "C-030",
      "niveau": "CRITIQUE",
      "axe": "qualité globale",
      "match_criteria": "PASS si la sortie identifie plusieurs red flags matériels et ne cite que des sources réellement consultées ou indique les points à vérifier ; FAIL si elle conclut qu'aucun risque matériel n'existe, invente des articles ou attribue à tort des sources non consultées."
    }
  ]
}