#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# da-scoring.sh — wrapper de scoring blind 4 phases pour les skills DA.
#
# Généralisation de l'ancien da-chantier-b-scoring.sh : table de skills
# extensible (plus seulement les 6 skills de fond du Chantier B).
#
# Usage rapide (un skill = un argument) :
#   bash scripts/da-scoring.sh list
#   bash scripts/da-scoring.sh phase1 <skill>          # genere le prompt scenario (Codex)
#   bash scripts/da-scoring.sh phase2 <skill>          # genere le prompt grille (Codex HIGH)
#   bash scripts/da-scoring.sh phase3-resync           # rsync cache avant session fraiche
#   bash scripts/da-scoring.sh phase3-prompt <skill>   # prompt session Claude fraiche
#   bash scripts/da-scoring.sh phase4 <skill>          # genere le prompt scoring (Codex)
#   bash scripts/da-scoring.sh aggregate <skill>       # tiered_scoring.py (verdict final)
#
# Overrides par variable d'environnement :
#   CODE=PPK4ZZ  bash scripts/da-scoring.sh phase4 pre-pack-cession   # code de cycle
#   DATE=2026-06-15 ... ; CACHE_SKILLS=/autre/chemin ...
#
# -----------------------------------------------------------------------------
# POUR AJOUTER UN SKILL : ajouter une ligne dans le tableau SKILLS, puis une
# entree dans CHACUNE des 5 fonctions code_for / mode_for / spec_for / desc_for
# / command_for. Rien d'autre a toucher.
#   - code_for     : code de cycle TOUJOURS 6 caracteres [A-Z0-9] — JAMAIS 5 ni 7
#                    (regex codex-blind-scoring.py [A-Z0-9]{6} ; garde fail-fast
#                    dans code_for). Convention PE : topic(3)+PE+cycle (CLOPE1,
#                    SPAPE1, PACPE1, MANPE1). Surchargeable via CODE=... (6 chars).
#   - mode_for     : mode d'invocation court (1 ligne)
#   - spec_for     : specificites metier a inclure subtilement dans le scenario
#   - desc_for     : description NEUTRE pour Codex Phase 2 (PAS le SKILL.md)
#   - command_for  : commande /h-da:<skill> avec ses flags (side, mode)
# =============================================================================

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

DATE="${DATE:-$(date +%F)}"
DATASET_ROOT="plugins/hacienda-droit-affaires/tests/datasets"
BACKLOG_ROOT="docs/backlog"
PLUGIN_SKILLS="plugins/hacienda-droit-affaires/skills/"
CACHE_SKILLS="${CACHE_SKILLS:-$HOME/.claude/plugins/cache/hacienda-juridique/hacienda-droit-affaires/0.1.0/skills/}"
SKILL_VERSION="${SKILL_VERSION:-2.0.0}"

SKILLS=(
  reviser-contrat
  reviser-nda
  constitution-societe
  gouvernance-ag
  financement-startup
  cgv-generator
  pre-pack-cession
  reprise-a-la-barre
  cession-actifs-isoles
  asset-vs-share-distress
  declaration-cessation-paiements
  responsabilite-dirigeant
  distress-cedant
  defense-dirigeant
  spa-review-distressed
  spa-review-pe
  pacte-associes-pe
  closing-pe
  management-package-pe
)

# Code de cycle par defaut, surchargeable via la variable d'environnement CODE
# (utile pour les skills re-scores sur plusieurs cycles, ex. pre-pack-cession).
code_for() {
  local c=""
  if [[ -n "${CODE:-}" ]]; then
    c="$CODE"
  else
    case "$1" in
      reviser-contrat) c="6YFSSW" ;;
      reviser-nda) c="IJ30QP" ;;
      constitution-societe) c="0JO6GK" ;;
      gouvernance-ag) c="S60EV7" ;;
      financement-startup) c="KJ039D" ;;
      cgv-generator) c="87MHRS" ;;
      pre-pack-cession) c="PPK3VE" ;;
      reprise-a-la-barre) c="RLB3SU" ;;
      cession-actifs-isoles) c="CAI2EN" ;;
      asset-vs-share-distress) c="AVS1RT" ;;
      declaration-cessation-paiements) c="DCP1RT" ;;
      responsabilite-dirigeant) c="RDG1RT" ;;
      distress-cedant) c="DCD1RT" ;;
      defense-dirigeant) c="DFD1RT" ;;
      spa-review-distressed) c="SPADIS" ;;
      spa-review-pe) c="SPAPE1" ;;
      pacte-associes-pe) c="PACPE1" ;;
      closing-pe) c="CLOPE1" ;;
      management-package-pe) c="MANPE1" ;;
    esac
  fi
  # Garde fail-fast : le code de cycle fait TOUJOURS exactement 6 caracteres
  # [A-Z0-9] (exige par codex-blind-scoring.py, regex r"[A-Z0-9]{6}"). Une
  # erreur de longueur s'est deja produite (MGMT1 = 5) -> on echoue tot ici
  # avec un message clair plutot que tard dans la session Codex.
  if [[ ! "$c" =~ ^[A-Z0-9]{6}$ ]]; then
    echo "ERREUR da-scoring : code de cycle invalide '$c' pour '$1' — doit faire EXACTEMENT 6 caracteres [A-Z0-9] (ex. MANPE1). Corrige code_for() ou la variable CODE=." >&2
    return 1
  fi
  printf "%s" "$c"
}

mode_for() {
  case "$1" in
    reviser-contrat) printf "revue d'un contrat commercial entrant cote client" ;;
    reviser-nda) printf "triage NDA commercial cote recepteur" ;;
    constitution-societe) printf "choix de forme puis brouillon de constitution" ;;
    gouvernance-ag) printf "convocation et PV d'assemblee" ;;
    financement-startup) printf "comparaison instrument et revue term sheet seed" ;;
    cgv-generator) printf "generation CGV/CGU B2B ou B2C" ;;
    pre-pack-cession) printf "note de cadrage du montage pre-pack (mode unique)" ;;
    reprise-a-la-barre) printf "note tactique cote repreneur (mode unique)" ;;
    cession-actifs-isoles) echo "note tactique (mode unique)" ;;
    asset-vs-share-distress) echo "note d'orientation (mode unique)" ;;
    declaration-cessation-paiements) echo "declaration au greffe (mode unique)" ;;
    responsabilite-dirigeant) echo "evaluation responsabilite du dirigeant 4 axes (mode unique)" ;;
    distress-cedant) echo "note d'orientation routeur cedant (mode unique)" ;;
    defense-dirigeant) echo "trame de defense du dirigeant assigne (mode unique)" ;;
    spa-review-distressed) echo "revue SPA avec overlay --distressed (cible en difficulte)" ;;
    spa-review-pe) echo "revue SPA avec overlay --pe (cible PE, side sponsor)" ;;
    pacte-associes-pe) echo "revue pacte d'investissement LBO avec overlay --pe (sponsor + management)" ;;
    closing-pe) echo "pilotage du closing d'une acquisition LBO avec le mode --pe actif, side sponsor" ;;
    management-package-pe) echo "cartographie management package PE, side sponsor, LBO mid-market" ;;
  esac
}

spec_for() {
  case "$1" in
    reviser-contrat) printf "CGV fournisseur B2B ; clauses limitatives larges ; resiliation ; penalites ; sous-traitance ; confidentialite ; alerte PI uniquement si contrat PI-centric" ;;
    reviser-nda) printf "NDA unilateral ou bilateral ; finalite trop large ; duree excessive ; affiliates ; return/destruction ; residuals ; non-concurrence salariee ou commerciale ; routage PI si R&D PI-centric" ;;
    constitution-societe) printf "choix SAS/SARL/SA ; associes fondateurs ; apport en nature ; pacte a prevoir ; pouvoirs du president ; clauses statutaires sensibles ; detection acte notarie si necessaire" ;;
    gouvernance-ag) printf "AGO/AGE ; forme SAS/SARL/SA ; delais et mentions de convocation ; quorum/majorite ; conventions reglementees ; decision sensible ; PV exploitable mais brouillon" ;;
    financement-startup) printf "BSPCE ; BSA ; obligations convertibles ; augmentation de capital ; term sheet seed ; clauses de pacte a renvoyer ; pas de conseil fiscal final" ;;
    cgv-generator) printf "regime B2B/B2C ; vente a distance ou SaaS ; clauses abusives ; delais de paiement ; responsabilite ; retractation si consommateur ; clauses a taguer review" ;;
    pre-pack-cession) printf "cession preparee en mandat ad hoc/conciliation puis plan de cession ; cessation des paiements ambigue (passif exigible vs actif disponible) ; repreneur identifie via LOI indicative ; acte recent a risque periode suspecte ; confidentialite (fuite presse/salaries) ; CSE a consulter ; nantissement/suretes ; actifs PI (marque/brevet) convoites ; side debiteur ou repreneur" ;;
    reprise-a-la-barre) printf "cible deja en redressement judiciaire ; appel d'offres ouvert avec date limite proche ; candidat-repreneur (concurrent/fonds) ; simple LOI indicative pas une offre ferme ; lien possible repreneur/parent du dirigeant ou societe interposee (piege eligibilite) ; offre concurrente deposee ; suretes sur les actifs ; contrats cles a reprendre (bail, licence) ; CSE ; tentation cherry-picking marque+fichier clients ; cote repreneur" ;;
    cession-actifs-isoles) echo "docs/superpowers/specs/2026-06-15-hacienda-da-cession-actifs-isoles-design.md" ;;
    asset-vs-share-distress) echo "docs/superpowers/specs/2026-06-15-hacienda-da-asset-vs-share-distress-design.md" ;;
    declaration-cessation-paiements) echo "cote debiteur ; cessation des paiements ambigue (moratoire URSSAF + ligne de credit non utilisee = reserve de credit, vs passif exigible fournisseurs/banque) testant le gate L.631-1 ; date de cessation des paiements ambigue (point de depart periode suspecte, a taguer review) ; declaration potentiellement tardive au-dela des 45 jours ; caution personnelle du dirigeant (a nommer, pas a evaluer) ; SARL = tribunal de commerce ; RJ vs LJ ambigu (activite au ralenti) ; chiffres financiers manquants a laisser a completer, jamais fabriques" ;;
    responsabilite-dirigeant) echo "cote dirigeant debiteur ; entreprise en RJ ou LJ ouverte ; qualite dirigeant de droit ou de fait (a qualifier, taguer review si de fait) ; faute de gestion possible (retard de declaration, poursuite d'activite deficitaire, comptes courants d'associe debiteurs, confusion de patrimoine, prelevements anormaux) testant L.651-2 et le sous-cas L.652-1 ; insuffisance d'actif a ne JAMAIS chiffrer ; sanctions personnelles L.653-8 interdiction de gerer et L.653-3 s. faillite personnelle ; signaux possibles de banqueroute L.654-1 a NOMMER sans evaluer (renvoi penaliste) ; caution personnelle du dirigeant dont le sort varie selon la phase (observation L.631-14, plan L.626-11, cloture LJ L.643-11) a ne jamais dire eteinte sans pieces ; faits en semaines relatives, aucune date calendaire ni quantum fabrique ; les 4 axes doivent etre evalues sans skip silencieux" ;;
    distress-cedant) echo "cote cedant/debiteur ; routeur d'entonnoir sauver/ceder/deposer ; niveau de difficulte a diagnostiquer grossierement (in bonis difficultes / amiable / CdP <=45j / CdP >45j / RJ-LJ) ; cessation des paiements a date INCERTAINE ('environ l'automne') testant le pivot 45 j sans la fabriquer en date calendaire ; pivot 45 j qui route a l'INVERSE du repreneur (CdP >45j non declaree -> declaration-cessation-paiements, JAMAIS prevention-difficultes : erreur qui trompe le client) ; fork sauver/ceder/deposer a NE PAS trancher a la place du client ; exposition dirigeant (caution, retard, faute de gestion L.651-2 L.653-8 periode suspecte) a SIGNALER et router vers responsabilite-dirigeant sans evaluer ni chiffrer ; ne pas requalifier finement la CdP (defere a declaration-cessation-paiements) ; objectifs fiscaux (deficits) a flaguer sans conseil ; cas RJ/LJ subie -> signaler le role limite du debiteur (pas de feuille debiteur dediee)" ;;
    defense-dirigeant) echo "cote dirigeant ASSIGNE en responsabilite ; une action est ENGAGEE (assignation/conclusions du liquidateur, du ministere public ou des controleurs sur carence) -- si aucune action engagee, le skill doit RENVOYER a responsabilite-dirigeant et ne rien armer ; axe(s) vise(s) parmi L.651-2 contribution a l'insuffisance d'actif, sous-cas L.652-1 obligation aux dettes sociales (confusion de patrimoine), sanctions L.653-8 interdiction de gerer / L.653-3 s. faillite personnelle ; faits permettant de tester les moyens de defense : prescription 3 ans a compter du jugement de LJ, simple negligence exclue L.651-2 al.2, rupture du lien de causalite (cause externe type perte d'un client majeur), minoration de la contribution (pouvoir moderateur du juge, pluralite de dirigeants), cas limitatifs stricts et proportionnalite de la duree pour L.653 ; une banqueroute L.654 eventuellement poursuivie en parallele a NOMMER (articulation penal/civil : sursis a statuer, autorite du penal sur le civil, renvoi penaliste) sans la plaider ; le skill produit une TRAME (moyens ordonnes par force + pieces a produire) et NE REDIGE PAS le memoire ; ne chiffre aucun quantum, ne pronostique aucune issue, faits en semaines relatives, ne fabrique aucune piece ; ne traite que les axes reellement attaques" ;;
    spa-review-distressed) echo "revue d'un SPA prive de cession de titres d'une cible EN DIFFICULTE mais PAS encore a la barre (pre-procedure / amiable / pre-pack), avec le mode --distressed actif ; side acquereur ou cedant ; doit appliquer l'overlay difficulte : (D1) periode suspecte et nullites L.632-1 de droit / L.632-2 facultatives sans DATER la cessation des paiements (date fixee par le tribunal, retroactive) et sans CONCLURE a la nullite (risque review) ; (D2) passif non purge en share deal -> GAP centrale ; (D3) garantie de la garantie (sequestre/GAPD) face a un cedant insolvable, sinon protection theorique ; (D4) transferts et solidarites L.1224-1, L.1684 CGI/L.267 LPF, ICPE a NOMMER et renvoyer sans conseil fiscal ; (D5) MAC et condition suspensive d'absence de procedure ; gate barre : si la cible est DEJA en RJ/LJ avec appel d'offres ouvert, REFUSER l'overlay et renvoyer reprise-a-la-barre / cession-actifs-isoles ; ne chiffre pas le passif ; exposition dirigeant cedant a NOMMER et router vers responsabilite-dirigeant sans evaluer ; faits en semaines relatives" ;;
    spa-review-pe) echo "revue d'un SPA d'acquisition LBO cote sponsor : locked box, certain funds, MAC, rollover/management package, articulation GAP/W&I" ;;
    pacte-associes-pe) echo "revue d'un pacte d'investissement LBO sur SAS HoldCo france avec le mode --pe actif ; side management pool ; doit appliquer l'overlay PE sur 5 axes (P1 hierarchie et precedence des pactes, P2 gouvernance et gestion de fait, P3 economie et preferences -- liquidation preference, ratchet, sweet equity, P4 leaver et sweet equity fiscal/social, P5 liquidite et sortie sponsor -- drag, put/call, ROFR, lock-up ; gate France/Lux transverse) ; (P1) pacte d'investissement nouveau + ancien pacte coexistants sans clause de resilitation formelle -> FAIL si la tension de precedence n'est pas identifiee et qualifiee ; (P2) veto sponsor tres large couvrant des actes courants de gestion -> qualifier le risque de gestion de fait (L.651-2 C.com.), ne pas conclure, taguer review ; (P4) bad leaver a valeur nominale indifferencie sans distinction good/bad ni date ni circonstances -> clause leonine a qualifier (art. 1844-1 C.civ.), risque de requalification ; (P4 suite) sweet equity managers (AP de categorie C a prix symbolique) -> NOMMER le risque fiscal et social (requalification en salaires, regime BNC, regime URSSAF), RENVOYER vers conseil fiscal/social specialise, JAMAIS traiter au fond ni chiffrer le risque ; (P5 / gate) document satellite soumis au droit luxembourgeois -> FAIL si le skill l'analyse sous le droit francais ; PASS = le skill identifie la loi etrangere applicable et renvoie vers conseil luxembourgeois ; gate non affirmatif-orphelin : FAIL = appliquer le test FR a des faits Lux ; PASS = signaler la loi etrangere et formuler comme complement ; faits en semaines relatives, aucune date calendaire, aucun conseil fiscal final" ;;
    closing-pe) echo "closing d'une acquisition LBO sur SAS (BidCo FR -> cible FR) avec le mode --pe actif, side sponsor ; doit appliquer l'overlay sur 5 axes (L1 funds flow / sources & uses, L2 CP financement & certain funds, L3 mecanique de closing day-1, L4 security package & assistance financiere, L5 adhesion rollover & post-closing PE) ; (L1) tableau sources & uses dont une ligne ne reconcilie pas (prix SPA != ligne use, ou Somme sources != Somme uses) -> FAIL si l'incoherence n'est pas detectee ; structure a produire, montants a NE PAS chiffrer (a completer) ; (L4 piege phare) la cible donne une surete/garantie remontante au service de la dette d'acquisition de BidCo -> assistance financiere L.225-216 C.com. : FAIL si le risque n'est pas signale ; qualifier review, NE JAMAIS valider le montage ; (gate) document/entite de fonds soumis au droit luxembourgeois -> FAIL si analyse sous droit francais ; PASS = identifie la loi etrangere et renvoie conseil luxembourgeois ; gate non affirmatif-orphelin ; (L5) registre de mouvements de titres au niveau BidCo (holding) oublie -> FAIL ; (L2) desalignement CP du SPA vs conditions DCL/ECL non signale -> FAIL ; faits en semaines relatives, aucune date calendaire, aucun conseil fiscal final, aucun quantum" ;;
    management-package-pe) echo "BidCo FR / plusieurs managers signant subscription + pacte + promesses put/call + rollover ; sweet equity ADP + BSPCE ; envy ratio + ratchet (seuils a completer) ; bad leaver a prix nominal (definition trop large = confiscatoire amorce) ; amorce piege fiscal/social : ADP souscrites au prix nominal alors que valorisation BidCo est superieure + plancher de rachat garanti = alea absent + vesting time-based pur + presence = lien remuneratoire potentiel ; plan BSPCE approuve par president seul (sans AGE) ; gate France/Lux : GP Lux + document satellite carried interest managers sous droit Lux" ;;
  esac
}

desc_for() {
  case "$1" in
    reviser-contrat) printf "Revue d'un contrat commercial entrant contre le playbook du cabinet : CGV, distribution, franchise, prestation de services, bail commercial, SPA ou NDA commercial. Analyse clause par clause, genere une issues list, identifie les risques juridiques et renvoie vers PI si le contrat est PI-centric. Brouillon soumis a validation humaine." ;;
    reviser-nda) printf "Triage rapide d'un NDA ou accord de confidentialite commercial : VERT, ORANGE ou ROUGE. Couvre champ de confidentialite, exceptions standard, duree, juridiction et clause de non-concurrence salariee si presente. Renvoie vers PI si NDA partenariat R&D PI-centric." ;;
    constitution-societe) printf "Assistance a la constitution de societe : mode comparer pour choisir la forme SAS/SARL/SA et mode draft pour un brouillon assiste de statuts, avec points de decision tagues review. Detecte la bifurcation acte sous seing prive versus notarie obligatoire." ;;
    gouvernance-ag) printf "Gouvernance d'assemblee : mode convocation pour generer une convocation d'AGO ou d'AGE conforme aux delais et mentions obligatoires, et mode PV pour generer ou reviser un proces-verbal. Adapte quorum, majorite et formalisme a la forme sociale." ;;
    financement-startup) printf "Conseil sur les instruments de financement de la startup : BSPCE, BSA, obligations convertibles, augmentation de capital. Mode comparer pour choisir l'instrument et mode review pour relire une term sheet de levee. Renvoie vers pacte-associes-review pour les clauses de pacte et ne donne pas de conseil fiscal final." ;;
    cgv-generator) printf "Genere des CGV B2B ou des CGU/CGV B2C sous forme de brouillon assiste. Detecte le regime a l'intake, applique le cadre correspondant, tague les arbitrages review et ne produit jamais un document pret a publier sans validation." ;;
    pre-pack-cession) printf "Note de cadrage du montage d'un pre-pack cession : cession negociee confidentiellement en amont (mandat ad hoc/conciliation) puis realisee via une procedure collective sous forme de plan de cession. Diagnostic de faisabilite, choix du vehicule procedural, sequencage des deux phases, points de vigilance. Side-aware debiteur/repreneur. Brouillon soumis a validation humaine. NE PAS supposer le contenu du SKILL.md." ;;
    reprise-a-la-barre) printf "Playbook cote candidat-repreneur pour construire, optimiser et defendre une offre de reprise sur une entreprise deja en redressement ou liquidation judiciaire, dans le cadre d'un appel d'offres ouvert (plan de cession). Recevabilite de l'offre, construction des mentions, contrats repris, criteres de choix du tribunal, sort des suretes, voies de recours. Cote repreneur. Brouillon soumis a validation humaine. NE PAS supposer le contenu du SKILL.md." ;;
    cession-actifs-isoles) echo "Note tactique cote repreneur pour l'acquisition d'actifs isoles (fonds, marques, stocks, creances) aupres d'un debiteur en liquidation judiciaire, hors plan de cession." ;;
    asset-vs-share-distress) echo "Note d'orientation cote repreneur pour arbitrer la structuration d'acquisition d'une cible en difficulte (rachat de titres vs rachat d'actifs) et orienter vers la bonne procedure." ;;
    declaration-cessation-paiements) echo "Cote debiteur/dirigeant : preparation de la declaration de cessation des paiements (depot de bilan) a deposer au greffe. Qualifie la cessation des paiements (actif disponible vs passif exigible), calcule le delai legal de 45 jours, alerte si la declaration est tardive (exposition du dirigeant), liste les pieces a joindre, oriente sur le tribunal competent et redressement vs liquidation, et redige le squelette de la declaration sans fabriquer les chiffres du client. Si l'entreprise n'est pas en cessation des paiements, renvoie vers les dispositifs de prevention. Brouillon soumis a validation humaine. NE PAS supposer le contenu du SKILL.md." ;;
    responsabilite-dirigeant) echo "Cote dirigeant debiteur : evalue (qualifie, ne conclut pas) la responsabilite personnelle du dirigeant d'une entreprise en procedure collective, sur quatre axes traites en un seul skill avec triage interne : contribution a l'insuffisance d'actif L.651-2 et sous-cas L.652-1, sanctions personnelles L.653-8 et L.653-3 s., banqueroute L.654-1 NOMMEE et renvoyee au penaliste, cautions personnelles du dirigeant. Qualifie chaque axe avec facteurs aggravants/attenuants, tous stades, sans chiffrer le quantum ni fabriquer de date, sans rediger de memoire en defense. Brouillon soumis a validation humaine. NE PAS supposer le contenu du SKILL.md." ;;
    distress-cedant) echo "Cote cedant/debiteur : routeur d'entonnoir distress, derniere piece et miroir de asset-vs-share-distress. Diagnostique le niveau de difficulte et route selon le pivot des 45 jours (CdP >45 j non declaree -> declaration-cessation-paiements, a l'inverse du cote repreneur), eclaire l'arbitrage sauver/ceder/deposer sans le trancher, signale l'exposition du dirigeant et route vers responsabilite-dirigeant. Decide et oriente, n'execute pas ; ne chiffre rien, ne fabrique aucune date, aucun conseil fiscal. Brouillon soumis a validation humaine. NE PAS supposer le contenu du SKILL.md." ;;
    defense-dirigeant) echo "Aval contentieux de responsabilite-dirigeant : arme la trame de defense du dirigeant ASSIGNE en responsabilite dans une procedure collective. S'active uniquement si une action est engagee (sinon renvoi responsabilite-dirigeant). Produit une trame de moyens ordonnes par force sur les axes civils L.651-2 (+ L.652-1) et sanctions L.653-x, confrontes aux faits, avec pieces a produire. NE REDIGE PAS le memoire (l'avocat redige l'acte) ; banqueroute L.654 hors plaidoirie (articulation penal/civil nommee) ; ni quantum ni pronostic d'issue ; pas de date calendaire ni de piece fabriquee. Brouillon soumis a validation humaine. NE PAS supposer le contenu du SKILL.md." ;;
    spa-review-distressed) echo "Revue d'un SPA prive sur une cible en difficulte (pre-procedure/amiable/pre-pack) avec le mode --distressed : applique l'overlay difficulte (periode suspecte/nullites L.632-1/2, passif non purge, garantie de la garantie, transferts/solidarites, MAC/CS), side-aware. Refuse et renvoie aux playbooks barre si la cible est deja a la barre. Ne date pas la cessation des paiements, ne chiffre pas le passif, ne conclut pas la nullite (risque review), n'evalue pas la responsabilite du dirigeant. Brouillon soumis a validation avocat M&A. NE PAS supposer le contenu du SKILL.md ni du module de reference." ;;
    spa-review-pe) echo "Revue d'un SPA d'acquisition LBO cote sponsor : applique l'overlay Private Equity (locked box et leakage, certain funds et conditions residuelles, reserved matters sponsor, bad leaver managers, structure multi-niveaux). Articulation GAP/W&I, side sponsor. Brouillon soumis a validation avocat M&A/PE. NE PAS supposer le contenu du SKILL.md ni du module de reference." ;;
    pacte-associes-pe) echo "Revue d'un pacte d'investissement LBO avec le mode --pe : applique l'overlay Private Equity sur 5 axes (P1 hierarchie pactes, P2 gouvernance, P3 economie/preferences, P4 leaver et sweet equity, P5 liquidite/sortie sponsor). Cote management pool. Qualifie les clauses leonines bad leaver (art. 1844-1 C.civ.), le risque de gestion de fait du sponsor (L.651-2 C.com.), la tension de precedence entre ancien pacte et nouveau pacte d'investissement, et le sweet equity (renvoi fiscal/social sans conseil au fond). Detecte les documents satellites soumis a un droit etranger et renvoie vers un conseil local competent. Ne chiffre aucun quantum fiscal ou social, ne conclut pas sur la requalification, ne tranche pas la precedence des pactes (risque review). Brouillon soumis a validation avocat PE. NE PAS supposer le contenu du SKILL.md ni du module de reference." ;;
    closing-pe) echo "Pilotage du closing d'une acquisition LBO avec le mode --pe : applique l'overlay Private Equity sur 5 axes (L1 funds flow/sources & uses, L2 CP financement & certain funds, L3 mecanique de closing day-1, L4 security package & assistance financiere, L5 adhesion rollover & post-closing PE). Side sponsor. Produit la structure du funds flow (jamais les montants), signale l'assistance financiere L.225-216 C.com. (la cible ne peut pas garantir la dette d'acquisition) sans valider de montage, et le registre de mouvements de titres aux deux niveaux (BidCo + cible). Detecte les documents de fonds soumis a un droit etranger et renvoie au conseil local. Ne chiffre aucun montant ni quantum fiscal, ne valide pas le montage d'assistance financiere, ne donne pas d'avis fiscal. Brouillon soumis a validation avocat M&A/PE. NE PAS supposer le contenu du SKILL.md ni du module de reference." ;;
    management-package-pe) echo "Cartographie le management package LBO cote francais : recense les documents et le 'qui signe quoi', nomme et explique les instruments et economics (sweet equity, envy ratio, ratchet, vesting, leaver), signale le risque de clause confiscatoire, et produit une liste de questions fiscal/social a renvoyer au specialiste. Ne valorise rien, ne donne aucun avis fiscal/social. Side-aware sponsor | manager. Brouillon soumis a validation humaine. NE PAS supposer le contenu du SKILL.md." ;;
  esac
}

command_for() {
  case "$1" in
    reviser-contrat) printf "/h-da:reviser-contrat --review --side=client" ;;
    reviser-nda) printf "/h-da:reviser-nda --side=recepteur" ;;
    constitution-societe) printf "/h-da:constitution-societe --comparer --draft" ;;
    gouvernance-ag) printf "/h-da:gouvernance-ag --convocation --pv" ;;
    financement-startup) printf "/h-da:financement-startup --review" ;;
    cgv-generator) printf "/h-da:cgv-generator --draft" ;;
    pre-pack-cession) printf "/h-da:pre-pack-cession --side=debiteur" ;;
    reprise-a-la-barre) printf "/h-da:reprise-a-la-barre --side=repreneur" ;;
    cession-actifs-isoles) echo "/h-da:cession-actifs-isoles" ;;
    asset-vs-share-distress) echo "/h-da:asset-vs-share-distress" ;;
    declaration-cessation-paiements) echo "/h-da:declaration-cessation-paiements" ;;
    responsabilite-dirigeant) echo "/h-da:responsabilite-dirigeant" ;;
    distress-cedant) echo "/h-da:distress-cedant" ;;
    defense-dirigeant) echo "/h-da:defense-dirigeant" ;;
    spa-review-distressed) echo "/h-da:spa-review --distressed" ;;
    spa-review-pe) echo "/h-da:spa-review --pe --side=sponsor" ;;
    pacte-associes-pe) echo "/h-da:pacte-associes-review --pe" ;;
    closing-pe) echo "/h-da:closing-checklist-fr --pe --side=sponsor" ;;
    management-package-pe) echo "/h-da:management-package-pe --side=sponsor" ;;
  esac
}

usage() {
  cat <<'EOF'
Usage:
  bash scripts/da-scoring.sh list
  bash scripts/da-scoring.sh init <skill>
  bash scripts/da-scoring.sh phase1 <skill>
  bash scripts/da-scoring.sh phase2 <skill>
  bash scripts/da-scoring.sh phase3-resync
  bash scripts/da-scoring.sh phase3-prompt <skill>
  bash scripts/da-scoring.sh phase4 <skill>       # 1er cycle : code par défaut ; re-run : CODE=<NOUVEAU> obligatoire
  bash scripts/da-scoring.sh aggregate <skill>    # sans CODE : lit le verdicts le plus récent
  bash scripts/da-scoring.sh cycles <skill>       # liste tous les cycles + leur verdict agrégé

Skills:
  reviser-contrat
  reviser-nda
  constitution-societe
  gouvernance-ag
  financement-startup
  cgv-generator
  pre-pack-cession
  reprise-a-la-barre
  cession-actifs-isoles
  asset-vs-share-distress
  declaration-cessation-paiements
  responsabilite-dirigeant
  distress-cedant
  defense-dirigeant
  spa-review-distressed
  spa-review-pe
  pacte-associes-pe
  closing-pe
  management-package-pe

Overrides (variables d'environnement) :
  CODE=<6chars>   code de cycle (surcharge le defaut ; obligatoire pour re-scorer un skill)
  DATE=YYYY-MM-DD date du scoring (defaut : date du jour)
  CACHE_SKILLS=…  chemin du cache plugin pour phase3-resync

Notes:
  - Phase 1, Phase 2 et Phase 4 doivent chacune partir dans une session Codex neuve, SANS le SKILL.md.
  - Avant chaque Phase 3, lancer phase3-resync puis ouvrir une session Claude fraiche.
  - Phase 3 doit partir dans une session Claude fraiche, sans lire ground-truth.md.
  - Sauver le JSON Phase 2 pur dans ground-truth.md et le JSON Phase 4 pur dans verdicts-<CODE>.json.
  - Si la sortie Codex est aplatie (sans retours a la ligne) : python3 -m json.tool fichier > tmp && mv tmp fichier.
  - CHECKPOINT revue des gates (entre Phase 2 et Phase 3) : faire relire les criteres
    CRITIQUES par Claude pour verifier que PASS = complement exact de FAIL (pas de zone
    orpheline « juste sur le fond, imprecis sur la forme »). Un gate asymetrique ou un
    gate-recall produit un faux REJETE. Ne PAS modifier la grille apres le run live
    (integrite blind) : la revue se fait AVANT la Phase 3. Cf. C-024 (reviser-contrat),
    C-006 (reviser-nda), C-005 (pre-pack-cession).
EOF
}

has_skill() {
  local skill="$1" s
  for s in "${SKILLS[@]}"; do
    [[ "$s" == "$skill" ]] && return 0
  done
  return 1
}

dataset_dir() {
  printf "%s/da-%s" "$DATASET_ROOT" "$1"
}

init_dataset() {
  local skill="$1"
  local dir
  dir="$(dataset_dir "$skill")"
  mkdir -p "$dir"
  echo "dataset: $dir"
}

prompt_path() {
  printf "/tmp/da-scoring-%s-%s.txt" "$1" "$2"
}

err_path() {
  printf "/tmp/da-scoring-%s-%s-err.txt" "$1" "$2"
}

copy_and_report() {
  local skill="$1"
  local phase="$2"
  local output
  output="$(prompt_path "$skill" "$phase")"

  echo "prompt: $output"
  echo "octets: $(wc -c < "$output")"
  if command -v pbcopy >/dev/null 2>&1; then
    if pbcopy < "$output"; then
      echo "copied: pbcopy"
    else
      echo "copied: pbcopy failed; open $output"
    fi
  else
    echo "copied: no pbcopy found"
  fi
  head -1 "$output"
}

run_prompt_command() {
  local skill="$1"
  local phase="$2"
  shift 2
  local output err
  output="$(prompt_path "$skill" "$phase")"
  err="$(err_path "$skill" "$phase")"

  if "$@" > "$output" 2> "$err"; then
    copy_and_report "$skill" "$phase"
  else
    local status=$?
    echo "exit=$status" >&2
    echo "stderr: $err" >&2
    sed -n '1,160p' "$err" >&2
    exit "$status"
  fi
}

write_phase1_prompt() {
  local skill="$1"
  local dir="$2"
  cat <<EOF
ROLE: Tu génères un scénario fictif blind pour évaluer un skill juridique français
du plugin Hacienda Droit des Affaires.

CONTEXTE PROTOCOLE BLIND:
Ton scénario servira ensuite à une autre session qui définira la grille de vérité
terrain, puis à une session Claude fraîche qui exécutera le skill, puis à une
session Codex distincte qui scorera la sortie. Les phases sont isolées pour éviter
le biais auto-référent.

CONSIGNE STRICTE:
Tu ne dois PAS produire la vérité terrain dans ce fichier. Ne donne aucune
recommandation attendue, aucun critère de scoring, aucune cotation, aucune section
"Vérité terrain" ou "Critères de scoring". Tu génères les faits et les pièces,
pas leur interprétation.

PARAMÈTRES:
- Skill cible: $skill
- Domaine: droit-affaires
- Mode d'invocation: $(mode_for "$skill")
- Commande cible: $(command_for "$skill") $dir/scenario.md
- Spécificités métier à inclure subtilement: $(spec_for "$skill")

CHEMIN DE SAUVEGARDE OBLIGATOIRE:
Sauvegarder le Markdown produit exactement ici:
\`$dir/scenario.md\`

Ne crée PAS de dossier avec le code de scoring dans le chemin. Le dossier dataset
canonique est \`$dir/\`.

STRUCTURE ATTENDUE:

# Dataset test — \`$skill\`

**Domaine** : droit-affaires
**Skill cible** : \`/h-da:$skill\`
**Mode** : $(mode_for "$skill")

*Dossier strictement fictif — toute ressemblance avec dossiers, parties ou titres
réels serait fortuite.*

---

## Scénario fictif

Décris une entité fictive, son secteur, sa taille, son contexte opérationnel, les
parties impliquées, les dates clés et la demande du client. Les faits doivent être
assez riches pour tester le skill sans annoncer les pièges.

---

## Pièces fournies

Ajoute les pièces utiles au mode testé: extrait de contrat, NDA, statuts, projet de
PV, term sheet, conditions commerciales, emails de contexte, tableau de décisions
ou tout autre élément nécessaire. Les pièces doivent être crédibles et autonomes.

---

## Posture cabinet configurée

Donne une posture cabinet fictive mais exploitable: rôle de l'utilisateur, side,
matrice d'approbateurs, posture de négociation, seuils ou contraintes pratiques.

---

## Question / demande explicite

Formule la demande comme un message court de l'utilisateur au skill.

CONTRAINTES:
- Tout est fictif. Aucune partie réelle.
- SIREN inventés de 9 chiffres si nécessaire.
- Montants réalistes pour le secteur.
- Inclure subtilement les spécificités à tester, sans les étiqueter.
- Markdown autonome.
- Longueur cible: 180-350 lignes.
- Aucune vérité terrain, aucune recommandation attendue, aucun critère de scoring.

OUTPUT:
Un unique fichier Markdown autonome prêt à être sauvegardé dans:
\`$dir/scenario.md\`
EOF
}

phase1() {
  local skill="$1"
  local dir output
  dir="$(dataset_dir "$skill")"
  output="$(prompt_path "$skill" phase1)"
  init_dataset "$skill" >/dev/null
  write_phase1_prompt "$skill" "$dir" > "$output"
  copy_and_report "$skill" phase1
  echo "save Codex scenario to: $dir/scenario.md"
}

phase2() {
  local skill="$1"
  local dir
  dir="$(dataset_dir "$skill")"
  init_dataset "$skill" >/dev/null
  run_prompt_command "$skill" phase2 \
    python3 scripts/codex-blind-scoring.py phase2-criteria \
      --skill "$skill" \
      --skill-description "$(desc_for "$skill")" \
      --domain droit-affaires \
      --mode "$(mode_for "$skill")" \
      --scenario "$dir/scenario.md" \
      --output "$dir/ground-truth.md"
  echo "save pure Codex JSON criteria to: $dir/ground-truth.md"
}

phase3_prompt() {
  local skill="$1"
  local dir
  dir="$(dataset_dir "$skill")"
  init_dataset "$skill" >/dev/null
  cat <<EOF
Avant d'ouvrir la session Claude fraîche, resynchronise le cache du plugin :
\`rsync -a --delete $PLUGIN_SKILLS $CACHE_SKILLS\`

Lis UNIQUEMENT \`$dir/scenario.md\`.
N'ouvre AUCUN autre fichier de ce dossier, surtout PAS \`ground-truth.md\` : ce serait le corrigé et contaminerait le cycle.

Exécute le skill avec cette commande :
\`$(command_for "$skill") $dir/scenario.md\`

Produis uniquement la sortie finale du skill, puis sauvegarde-la dans :
\`$dir/live-output.md\`
EOF
}

phase3_resync() {
  echo "rsync -a --delete $PLUGIN_SKILLS $CACHE_SKILLS"
  rsync -a --delete "$PLUGIN_SKILLS" "$CACHE_SKILLS"
}

phase4() {
  local skill="$1"
  local dir code
  dir="$(dataset_dir "$skill")"
  # Garde anti-écrasement / anti-code-périmé : si des cycles existent déjà et
  # qu'aucun CODE explicite n'est fourni, refuser — sinon phase4 réutilise le
  # code par défaut (1er cycle) et écrase/confond un cycle existant.
  if [[ -z "${CODE:-}" ]] && ls "$dir"/verdicts-*.json >/dev/null 2>&1; then
    {
      echo "ERREUR phase4 : des cycles existent déjà pour '$skill' :"
      ls -1t "$dir"/verdicts-*.json | sed 's#.*/verdicts-##; s#\.json##; s/^/  - /'
      echo "Pour un nouveau cycle, définis un code explicite :"
      echo "  CODE=<NOUVEAU> bash scripts/da-scoring.sh phase4 $skill"
    } >&2
    return 1
  fi
  code="$(code_for "$skill")"
  echo "→ Phase 4 — code de cycle : $code" >&2
  init_dataset "$skill" >/dev/null
  run_prompt_command "$skill" phase4 \
    python3 scripts/codex-blind-scoring.py phase4-criteria \
      --skill "$skill" \
      --skill-version "$SKILL_VERSION" \
      --code "$code" \
      --scenario "$dir/scenario.md" \
      --ground-truth "$dir/ground-truth.md" \
      --live-output "$dir/live-output.md" \
      --date "$DATE" \
      --output "$BACKLOG_ROOT/da-scoring-$skill-$code.md"
  echo "save pure Codex verdict JSON to: $dir/verdicts-$code.json"
  echo "save scoring report markdown to: $BACKLOG_ROOT/da-scoring-$skill-$code.md"
}

aggregate() {
  local skill="$1"
  local dir vfile
  dir="$(dataset_dir "$skill")"
  if [[ -n "${CODE:-}" ]]; then
    # Code explicite : utiliser ce verdicts précis.
    vfile="$dir/verdicts-$CODE.json"
  else
    # Pas de CODE : prendre le verdicts le PLUS RÉCENT (évite de retomber
    # silencieusement sur le code par défaut et de rescorer un ancien cycle).
    vfile="$(ls -t "$dir"/verdicts-*.json 2>/dev/null | head -1)"
  fi
  if [[ -z "$vfile" || ! -f "$vfile" ]]; then
    echo "ERREUR aggregate : aucun fichier verdicts trouvé (${CODE:+CODE=$CODE → }$dir)." >&2
    return 1
  fi
  echo "→ aggregate lit : $vfile" >&2
  python3 scripts/tiered_scoring.py "$dir/ground-truth.md" "$vfile"
}

cycles() {
  local skill="$1" dir f code
  dir="$(dataset_dir "$skill")"
  if ! ls "$dir"/verdicts-*.json >/dev/null 2>&1; then
    echo "Aucun cycle (verdicts-*.json) pour '$skill' dans $dir." >&2
    return 0
  fi
  echo "Cycles de scoring pour '$skill' (du plus récent au plus ancien) :"
  for f in $(ls -t "$dir"/verdicts-*.json); do
    code="$(basename "$f" .json | sed 's/^verdicts-//')"
    printf "\n=== %s ===\n" "$code"
    python3 scripts/tiered_scoring.py "$dir/ground-truth.md" "$f"
  done
}

list_skills() {
  printf "| Skill | Code defaut | Dataset | Mode |\n"
  printf "|---|---|---|---|\n"
  for skill in "${SKILLS[@]}"; do
    printf "| \`%s\` | \`%s\` | \`%s\` | %s |\n" \
      "$skill" "$(code_for "$skill")" "$(dataset_dir "$skill")" "$(mode_for "$skill")"
  done
}

main() {
  local action="${1:-}"
  local skill="${2:-}"

  case "$action" in
    list)
      list_skills
      ;;
    phase3-resync)
      phase3_resync
      ;;
    init|phase1|phase2|phase3-prompt|phase4|aggregate|cycles)
      if [[ -z "$skill" ]] || ! has_skill "$skill"; then
        usage >&2
        exit 1
      fi
      case "$action" in
        init) init_dataset "$skill" ;;
        phase1) phase1 "$skill" ;;
        phase2) phase2 "$skill" ;;
        phase3-prompt) phase3_prompt "$skill" ;;
        phase4) phase4 "$skill" ;;
        aggregate) aggregate "$skill" ;;
        cycles) cycles "$skill" ;;
      esac
      ;;
    *)
      usage >&2
      exit 1
      ;;
  esac
}

main "$@"
