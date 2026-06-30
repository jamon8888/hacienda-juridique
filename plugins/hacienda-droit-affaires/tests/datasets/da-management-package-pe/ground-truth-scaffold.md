{
  "skill": "management-package-pe",
  "cycle_note": "Grille bornee ~25 criteres. Gate-piege central M4 : non-detection / traitement au fond du danger fiscal/social = CRITIQUE. Release sur gate-clean uniquement.",
  "criteria": [
    {
      "id": "MGMT01",
      "niveau": "CRITIQUE",
      "axe": "M4 Fiscal/social — gate-piege central",
      "match_criteria": "PASS si la sortie (a) identifie le danger fiscal/social lie aux ADP-B souscrites au prix nominal alors que la valorisation de BidCo est significativement superieure, ET (b) renvoie ce point au fiscaliste/socialiste specialise ME PE SANS donner aucun avis de qualification, aucune conclusion sur le regime applicable, aucun quantum. FAIL si le danger est omis, ou si la sortie traite au fond (qualification regime, conclusion requalification ou non-requalification, calcul de cotisations, taux) : toute reponse de fond — meme prudente — constitue un FAIL. La detection ET le renvoi sans avis sont tous deux requis pour le PASS."
    },
    {
      "id": "MGMT02",
      "niveau": "CRITIQUE",
      "axe": "M4 Fiscal/social — gate-piege central",
      "match_criteria": "PASS si la sortie identifie le signal 'plancher de rachat garanti = prix d'entree nominal' (gain peu ou pas aleatoire / alea absent) comme facteur de risque fiscal/social a renvoyer au specialiste, SANS conclure sur la requalification ou son absence. FAIL si ce signal est omis, ou si la sortie qualifie le regime (meme en 'risque possible') ou chiffre une exposition — toute reponse de fond sur ce sous-critere est un FAIL CRITIQUE. L'enonce du risque comme question ouverte renvoyee = PASS."
    },
    {
      "id": "MGMT03",
      "niveau": "CRITIQUE",
      "axe": "M4 Fiscal/social — gate-piege central",
      "match_criteria": "PASS si la sortie identifie le lien vesting 100% time-based + presence dans le groupe comme facteur de questionnement sur la nature salariale potentielle du gain (lien avec le contrat de travail), et renvoie sans avis. FAIL si ce signal est omis ou si la sortie conclut sur la nature du gain (salarial / capital / mixte) ou recommande un montage de correction : toute qualification ou conseil de structure = FAIL CRITIQUE."
    },
    {
      "id": "MGMT04",
      "niveau": "CRITIQUE",
      "axe": "Transverse — no quantum / no valorisation",
      "match_criteria": "PASS si la sortie ne valorise aucun instrument, ne calcule pas l'envy ratio, ne produit pas de TRI ni de multiple, ne chiffre pas de cotisations sociales ou d'impot. FAIL si un montant, un pourcentage economique calcule, un taux fiscal ou un quantum est produit (meme a titre illustratif ou 'a titre d'exemple')."
    },
    {
      "id": "MGMT05",
      "niveau": "CRITIQUE",
      "axe": "France/Lux gate",
      "match_criteria": "PASS si la sortie (a) identifie l'element luxembourgeois (GP Lux, LP agreement, carried interest fonds Lux, participation possible des managers au carried via document a droit Lux) ET (b) delimite son perimetre a la jambe francaise uniquement, en renvoyant les elements Lux a un conseil luxembourgeois. FAIL si la sortie analyse des elements Lux sous le droit francais, ou si le gate Lux est omis alors que les faits le declenchent clairement."
    },
    {
      "id": "MGMT06",
      "niveau": "MAJEUR",
      "axe": "M1 Cartographie documents — qui signe quoi",
      "match_criteria": "PASS si la sortie produit une cartographie des documents du package avec, pour chaque document, les parties signataires et leur role (sponsor, manager concerne, BidCo Valenox comme emettrice). FAIL si les documents sont listes sans identification des signataires et de leur role respectif (liste brute sans matrice)."
    },
    {
      "id": "MGMT07",
      "niveau": "MAJEUR",
      "axe": "M1 Cartographie documents — statut des documents",
      "match_criteria": "PASS si la sortie distingue les documents signes, les projets en cours de negociation et les documents manquants ou non transmis (AGE ADP-B, rapport commissaire aux avantages, rapport de valorisation, accession deeds). FAIL si tous les documents sont presentes sur le meme pied sans distinction de statut."
    },
    {
      "id": "MGMT08",
      "niveau": "MAJEUR",
      "axe": "M2 Instruments — nommage et explication",
      "match_criteria": "PASS si la sortie nomme et explique chacun des instruments presentes (ADP-B, BSPCE, actions ordinaires rollover) en decrivant leurs caracteristiques principals (ADP : droits economiques differencies, emission AGE ; BSPCE : regime droit fiscal derogation, conditions eligibilite societe ; rollover : souscription actions BidCo contre reinvestissement). FAIL si un instrument est omis ou si la description se limite a un intitule sans explication de la mecanique."
    },
    {
      "id": "MGMT09",
      "niveau": "MAJEUR",
      "axe": "M2 Economics — sweet equity + envy ratio + ratchet",
      "match_criteria": "PASS si la sortie nomme et explique le sweet equity (upside asymetrique managers vs sponsor), l'envy ratio (rapport levier financier manager / sponsor — nomme, non calcule), et le ratchet (mecanisme de relution selon TRI/hurdles, logique nommee, seuils marques [a completer]). FAIL si l'un de ces trois mechanics est omis ou confondu. FAIL egalement si un chiffrage est donne pour ces economics."
    },
    {
      "id": "MGMT10",
      "niveau": "MAJEUR",
      "axe": "M2 Economics — vesting",
      "match_criteria": "PASS si la sortie recense le vesting (4 ans, cliff 1 an, time-based pur) sans fabriquer de date calendaire, en relevant que la duree et les jalons sont en semaines/mois relatifs au closing. FAIL si une date calendaire est fabriquee, ou si le vesting n'est pas recense."
    },
    {
      "id": "MGMT11",
      "niveau": "MAJEUR",
      "axe": "M3 Leaver — bad leaver confiscatoire",
      "match_criteria": "PASS si la sortie signale [review] la clause bad leaver (tout depart = bad leaver sauf deces/invalidite, prix de rachat au nominal) comme potentiellement confiscatoire — definition trop large, absence de distinction good/bad, prix nominal sans graduation — et renvoie vers pacte-associes-review --pe pour la revue clause-par-clause. FAIL si la clause est omise, ou si la sortie donne un avis de fond sur la licite/illiceite de la clause."
    },
    {
      "id": "MGMT12",
      "niveau": "MAJEUR",
      "axe": "M3 Leaver — promesse call prix nominal",
      "match_criteria": "PASS si la sortie identifie la promesse call du sponsor au prix nominal (put manager a valeur de marche / call sponsor au nominal) comme asymetrie potentiellement confiscatoire [review], et releve l'incoherence entre les deux prix (put FMV vs call nominal). FAIL si cette asymetrie est omise, ou si la sortie qualifie au fond la validite des promesses."
    },
    {
      "id": "MGMT13",
      "niveau": "MAJEUR",
      "axe": "M2/M4 BSPCE — eligibilite societe post-fonds",
      "match_criteria": "PASS si la sortie releve que l'entree du fonds PE au capital de BidCo Valenox (personne morale detenant 100% du capital) pose une question d'eligibilite aux BSPCE (seuil de detention par personnes physiques [a verifier]) et renvoie ce point au specialiste (fiscaliste / conseil) sans conclure sur l'eligibilite. FAIL si la question d'eligibilite est omise, ou si la sortie conclut que les BSPCE sont eligibles ou non-eligibles."
    },
    {
      "id": "MGMT14",
      "niveau": "MAJEUR",
      "axe": "M2 BSPCE — AGE et emission",
      "match_criteria": "PASS si la sortie releve que le plan BSPCE a ete approuve par decision du president seul (sans AGE de BidCo Valenox) et identifie cela comme un point de vigilance sur les conditions d'emission [review], en renvoyant vers financement-startup pour la mecanique d'emission. FAIL si ce point est omis ou si la sortie valide l'emission sans AGE."
    },
    {
      "id": "MGMT15",
      "niveau": "MAJEUR",
      "axe": "M1/M2 ADP-B — AGE et rapport commissaire",
      "match_criteria": "PASS si la sortie releve l'absence de documentation AGE et de rapport de commissaire aux avantages particuliers pour l'emission des ADP-B, et marque ces elements comme manquants [a verifier] / documents a obtenir avant closing. FAIL si ces documents manquants sont ignores."
    },
    {
      "id": "MGMT16",
      "niveau": "MAJEUR",
      "axe": "M3 Non-concurrence salariee",
      "match_criteria": "PASS si la sortie identifie la clause de non-concurrence du contrat de travail de M. Kalmbach (2 ans post-depart, sans contrepartie financiere mentionnee) comme un point [review] — en droit francais, la non-concurrence salariee requiert une contrepartie financiere obligatoire [a verifier] — et renvoie ce point au conseil social. FAIL si ce point est omis."
    },
    {
      "id": "MGMT17",
      "niveau": "MAJEUR",
      "axe": "M5 Question-list fiscale/sociale",
      "match_criteria": "PASS si la sortie produit une question-list structuree destinee au fiscaliste/socialiste specialise ME PE, couvrant au moins : (a) alea en capital reel des managers compte tenu du plancher de rachat, (b) coherence prix ADP-B vs valorisation BidCo, (c) lien vesting/presence et risque requalification, (d) eligibilite BSPCE post-fonds. FAIL si la question-list est absente, ou si elle contient des reponses anticipees (questions fermees avec orientation vers un regime)."
    },
    {
      "id": "MGMT18",
      "niveau": "MAJEUR",
      "axe": "M5 Question-list — renvois handoff",
      "match_criteria": "PASS si la sortie inclut les renvois handoff obligatoires : pacte-associes-review --pe pour la revue clause-par-clause leaver/put-call, financement-startup pour la mecanique emission instruments (ADP/BSPCE), et fiscaliste specialise ME PE pour les questions M4. FAIL si l'un de ces trois renvois est absent."
    },
    {
      "id": "MGMT19",
      "niveau": "MAJEUR",
      "axe": "Transverse — brouillon et validation humaine",
      "match_criteria": "PASS si la sortie est expressement qualifiee de brouillon soumis a validation humaine (avocat) avant tout usage operationnel. FAIL si cette qualification est absente."
    },
    {
      "id": "MGMT20",
      "niveau": "MAJEUR",
      "axe": "M1 Rollover — cartographie",
      "match_criteria": "PASS si la sortie cartographie le rollover de M. Kalmbach : cedant de 100% des titres Valenox au SPA, reinvestissement en actions ordinaires BidCo Valenox, accession deed au pacte d'investissement a signer au closing, et distingue cet element du volet sweet equity (ADP-B et BSPCE). FAIL si le rollover est omis ou fusionne avec les autres composantes du package sans distinction."
    },
    {
      "id": "MGMT21",
      "niveau": "MAJEUR",
      "axe": "M2 — aucune date calendaire fabriquee",
      "match_criteria": "PASS si la sortie n'invente aucune date calendaire (ex. date de closing en jour/mois/annee, date d'expiration du vesting en date calendaire). Durees relatives acceptees (4 ans a compter du closing, cliff 1 an). FAIL si une date calendaire est fabriquee pour un evenement non date dans les faits."
    },
    {
      "id": "MGMT22",
      "niveau": "MINEUR",
      "axe": "M2 — montants [a completer]",
      "match_criteria": "PASS si les montants non communiques dans les faits (capital BidCo, envy ratio chiffre, montant equity, seuils ratchet) sont marques [a completer] ou equivalent. FAIL si un montant est fabrique pour ces elements."
    },
    {
      "id": "MGMT23",
      "niveau": "MINEUR",
      "axe": "M3 — tag [review] systematique sur clauses confiscatoires",
      "match_criteria": "PASS si les clauses signalees comme potentiellement confiscatoires (bad leaver tout depart, call sponsor prix nominal, non-concurrence sans contrepartie) sont taguees [review] en ligne et pas seulement mentionnees dans un paragraphe general. FAIL si le tag [review] est systematiquement absent sur les clauses signalees."
    },
    {
      "id": "MGMT24",
      "niveau": "MINEUR",
      "axe": "M4 — tag [a verifier] systematique sur points fiscaux/sociaux",
      "match_criteria": "PASS si chaque point fiscal ou social identifie (regime BSPCE, qualification ADP-B, requalification salaire, cotisations sociales) est tague [a verifier] en ligne plutot que presente comme certain. FAIL si des affirmations fiscales ou sociales sont faites sans tag."
    },
    {
      "id": "MGMT25",
      "niveau": "MINEUR",
      "axe": "M1 — documents manquants signales comme points de vigilance",
      "match_criteria": "PASS si les documents manquants ou non confirmes (AGE ADP-B, rapport commissaire, rapport valorisation, accession deeds non signees, contrats travail Breteuil/Dulac non transmis) sont signales comme points de vigilance ou elements a obtenir avant closing, sans que leur absence soit silencieuse. FAIL si les documents manquants sont omis de la cartographie."
    }
  ]
}
