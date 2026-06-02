#!/usr/bin/env python3
"""
D.2 helper — wrapper minimal-friction pour le launchpad sparring scoring D.2.

Au lieu de retaper 7 paramètres à chaque commande, ce script connaît les 29
skills D.2 et tu lui passes juste le nom :

    python3 scripts/d2.py phase1 mise-en-demeure-pi
    python3 scripts/d2.py phase2 mise-en-demeure-pi
    python3 scripts/d2.py phase4 mise-en-demeure-pi

Chaque commande imprime le prompt Codex prêt à coller + récap stderr.

Pour Phase 1 spécifiquement, il existe AUSSI des fichiers pré-rendus dans
`docs/methodology/d2-codex-prompts/phase1/<skill>.md` — tu peux les ouvrir
directement et copier-coller sans terminal.

Pour Phase 2 et Phase 4 : le script doit lire les outputs précédents
(scenario.md pour Phase 2, scenario+ground-truth+live-output pour Phase 4),
donc le terminal est inévitable mais réduit à une commande.

Code délègue à scripts/codex-blind-scoring.py pour la substitution + garde-fous
anti-leakage. Voir docs/methodology/sparring-scoring-protocol.md.
"""

import argparse
import subprocess
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
HELPER = REPO_ROOT / "scripts" / "codex-blind-scoring.py"


# Table des 29 skills D.2 — paramètres extraits du launchpad
# (docs/methodology/d2-codex-launchpad.md).
SKILLS_D2 = {
    # Sprint D.2-a Marques (6)
    "analyse-opposition-marque": {
        "code": "M4K2PA",
        "domain": "marques",
        "mode": "analyse offensive opposition INPI L.712-4",
        "specificites": "motifs absolus L.711-2 ; restauration L.712-4-1 ; appréciation globale CJUE Sabel/Canon/Lloyd ; marques notoires L.713-3 et L'Oréal Bellure C-487/07",
        "description": "Skill d'analyse offensive ou défensive d'une opposition à un dépôt de marque devant l'INPI. Produit un livrable partner-ready avec findings cotés et recommandation.",
    },
    "analyse-refus-inpi": {
        "code": "R7N3FB",
        "domain": "marques",
        "mode": "réponse à notification de refus INPI motifs absolus L.711-2",
        "specificites": "motifs absolus L.711-2 (distinctivité, descriptivité, déceptivité) ; délai R.712-11 réponse refus ; limitation classes / produits ; argumentation acquise par usage L.711-2 al.4",
        "description": "Skill de réponse à une notification de refus INPI ou OEB. Produit un livrable partner-ready avec analyse des motifs, stratégie de réponse et recommandation.",
    },
    "anteriorite-invalidite": {
        "code": "I8V5LC",
        "domain": "marques-brevets",
        "mode": "attaque en nullité d'un titre PI tiers",
        "specificites": "L.714-3 nullité marques motifs absolus ; L.714-4 sur antériorités ; L.613-25 nullité brevets ; prescription action en nullité ; Cass. ch. com. nullité absolue / nullité relative ; recevabilité demande reconventionnelle",
        "description": "Skill d'analyse de validité ou de stratégie d'attaque en nullité d'un titre PI tiers (marque ou brevet). Produit un livrable partner-ready avec recevabilité, moyens de nullité et recommandation.",
    },
    "depot-marque-fr": {
        "code": "D9M1XD",
        "domain": "marques",
        "mode": "préparation dépôt marque France INPI",
        "specificites": "motifs absolus L.711-2 self-check ; classes Nice cohérentes avec exploitation ; libellé classe précis vs générique ; recherche antériorité préalable ; télé-procédure data.inpi.fr ; taxes INPI",
        "description": "Skill de préparation de dépôt de marque française devant l'INPI. Produit un brief de dépôt partner-ready avec qualification du signe, classes Nice et recommandation.",
    },
    "revue-portefeuille-marques": {
        "code": "P3R7QE",
        "domain": "marques",
        "mode": "revue de portefeuille marques multi-territoires",
        "specificites": "déchéance L.714-5 défaut d'usage 5 ans ; renouvellement L.712-9 (10 ans) ; cap watchlist surveillance ; couverture territoriale vs exploitation actuelle ; classes Nice à élargir ou élaguer",
        "description": "Skill de revue de portefeuille marques (échéances, usage, déchéance, couverture). Produit un livrable partner-ready avec actions priorisées par titre.",
    },
    "surveillance-marque": {
        "code": "S5B2NF",
        "domain": "marques",
        "mode": "surveillance BOPI watchlist hebdomadaire",
        "specificites": "délai opposition L.712-4 (2 mois ferme post-publication BOPI) ; restauration L.712-4-1 strictement exceptionnelle ; cadence BOPI hebdomadaire vendredi ; calibrage cap watchlist 50 entrées ; niveaux d'alerte",
        "description": "Skill de surveillance des publications BOPI contre une watchlist de marques surveillées. Produit un rapport partner-ready avec hits cotés et recommandation d'opposition.",
    },
    # Sprint D.2-b Brevets (5)
    "certificat-complementaire-protection": {
        "code": "C6P8WG",
        "domain": "brevets",
        "mode": "préparation CCP médicament Règl. CE 469/2009",
        "specificites": "délai 6 mois post-AMM Art. 7 Règl. 469/2009 ; brevet de base en vigueur à la délivrance CCP ; produit revendiqué vs brevet de base ; calcul durée CCP (5 ans max post-expiration brevet) ; CCP phytopharmaceutique Règl. 1610/96",
        "description": "Skill de préparation d'un certificat complémentaire de protection (CCP) pour médicament ou produit phytopharmaceutique. Produit un livrable partner-ready avec readiness CCP, calcul de durée et recommandation.",
    },
    "recherche-anteriorite-brevet": {
        "code": "R2A4YH",
        "domain": "brevets",
        "mode": "recherche antériorité brevet Espacenet préalable au dépôt",
        "specificites": "Art. 54 CBE nouveauté + Art. 56 CBE activité inventive ; état de la technique antérieure à la date de priorité ; brevets US non validés EP (état de l'art mais pas opposables EP) ; jurisprudence OEB chambres de recours",
        "description": "Skill de recherche d'antériorité technique brevet préalable à un dépôt FR/EP/PCT. Produit un livrable partner-ready avec impact sur la portée des revendications.",
    },
    "revue-portefeuille-brevets": {
        "code": "P7B1ZI",
        "domain": "brevets",
        "mode": "revue de portefeuille brevets FR + EP + PCT",
        "specificites": "annuités FR / EP + délais de grâce avec surtaxes ; validations EP par pays (UK post-Brexit) ; FTO bloquant ; divisionnaires Art. 76 CBE ; UPC opt-out / opt-in pour brevets EP classiques (depuis 1er juin 2023)",
        "description": "Skill de revue de portefeuille brevets (annuités, validations EP, opt-out UPC, FTO). Produit un livrable partner-ready avec actions priorisées.",
    },
    "strategie-extension-internationale": {
        "code": "E5X9KJ",
        "domain": "brevets-marques",
        "mode": "arbitrage routes internationales FR/EP/PCT/Madrid",
        "specificites": "Art. 4 CUP délai priorité 12 mois ; Art. 22 PCT entrée phase nationale 30 mois ; UPC compétence par défaut brevet unitaire ; Madrid Protocol désignations explicites ; budget annuités cumulé vs exploitation territoriale",
        "description": "Skill de stratégie d'extension internationale brevets ou marques. Produit un livrable partner-ready avec arbitrage chiffré et recommandation de route.",
    },
    "tableau-contrefacon-brevet": {
        "code": "T8C6MK",
        "domain": "brevets",
        "mode": "matrice atteinte revendication par revendication",
        "specificites": "L.613-3 contrefaçon par reproduction ; doctrine des équivalents (fonction / moyen / résultat) ; caractéristiques essentielles revendication indépendante ; revendications dépendantes ; L.615-5-1 renversement charge preuve produit nouveau",
        "description": "Skill de construction d'une matrice d'atteinte brevet revendication par revendication. Produit un livrable partner-ready avec cotation par revendication et synthèse.",
    },
    # Sprint D.2-c D&M (2)
    "contrefacon-dessin-modele": {
        "code": "C1D3LL",
        "domain": "dessins-modeles",
        "mode": "action en contrefaçon D&M FR ou DMC",
        "specificites": "L.521-1 CPI contrefaçon D&M FR ; art. 89 RDMC contrefaçon DMC ; test impression globale utilisateur averti (CJUE PepsiCo C-281/10) ; art. 6 RDMC caractère individuel ; mesures provisoires L.521-4",
        "description": "Skill d'action ou défense en contrefaçon de dessins et modèles FR ou DMC. Produit un livrable partner-ready avec cotation impression globale et recommandation.",
    },
    "recherche-anteriorite-dm": {
        "code": "A4D5NM",
        "domain": "dessins-modeles",
        "mode": "recherche antériorité visuelle D&M préalable au dépôt",
        "specificites": "art. 5 RDMC nouveauté ; art. 6 RDMC caractère individuel ; classes Locarno ; délai grâce 12 mois Art. 7 §2 RDMC ; état de l'art visuel (registres + collections public + e-commerce)",
        "description": "Skill de recherche d'antériorité visuelle dessins et modèles préalable à un dépôt FR ou DMC. Produit un livrable partner-ready avec antériorités cotées.",
    },
    # Sprint D.2-d Droit auteur (5)
    "contrefacon-droit-auteur": {
        "code": "C9A2OP",
        "domain": "droit-auteur",
        "mode": "action contrefaçon droit d'auteur civile et pénale",
        "specificites": "L.335-2 et L.335-3 contrefaçon pénale ; L.331-1 civil ; test originalité empreinte personnalité (CJUE Infopaq C-5/08 + Painer C-145/10) ; L.122-4 reproduction ; mesures provisoires L.332-1",
        "description": "Skill d'action en contrefaçon de droit d'auteur (civile et/ou pénale). Produit un livrable partner-ready avec qualification originalité et recommandation.",
    },
    "depot-preuve-creation": {
        "code": "D6P4QQ",
        "domain": "droit-auteur",
        "mode": "constitution preuve d'antériorité création protégée par droit d'auteur",
        "specificites": "L.111-1 protection dès création ; absence de formalité de dépôt obligatoire ; enveloppe Soleau INPI ; horodatage qualifié eIDAS ; dépôt huissier ; blockchain ; valeur probante comparée",
        "description": "Skill de constitution de preuve d'antériorité d'une œuvre protégée par le droit d'auteur. Produit un livrable partner-ready avec recommandation du mode de preuve adapté.",
    },
    "droits-voisins-ogc": {
        "code": "V8R7TR",
        "domain": "droits-voisins",
        "mode": "gestion droits voisins artistes-interprètes et producteurs via OGC",
        "specificites": "L.212-1+ artistes-interprètes ; L.213-1+ producteurs phonogrammes ; L.215-1+ vidéogrammes ; L.216-1+ com. audiovisuelle ; L.218-1+ éditeurs de presse (post-2019) ; OGC SACEM/SACD/SCPP/ADAMI compétents ; barèmes applicables",
        "description": "Skill de qualification et de gestion des droits voisins (artistes-interprètes, producteurs, éditeurs de presse) avec routage OGC. Produit un livrable partner-ready avec OGC compétent et barème applicable.",
    },
    "licence-droit-auteur": {
        "code": "L3A1US",
        "domain": "droit-auteur",
        "mode": "préparation licence patrimoniale droit d'auteur exclusive ou non-exclusive",
        "specificites": "L.131-3 mention durée + territoire + modes + étendue ; L.131-4 rémunération proportionnelle vs forfait limitatif ; exclusivité vs non-exclusivité ; obligation d'exploitation L.132-12 (édition) ou clause spécifique ; reddition de comptes",
        "description": "Skill de préparation d'une licence patrimoniale en droit d'auteur (exclusive ou non, durée déterminée). Produit un livrable partner-ready avec clauses calibrées et recommandation rémunération.",
    },
    "qualification-oeuvre": {
        "code": "Q5W6VT",
        "domain": "droit-auteur",
        "mode": "qualification juridique d'une œuvre (originalité, type, co-création)",
        "specificites": "L.112-1 et L.112-2 oeuvres protégeables ; test originalité (empreinte personnalité, CJUE Infopaq C-5/08) ; œuvre composite L.113-2 ; œuvre collective L.113-2 al.3 ; œuvre de collaboration L.113-3 ; L.113-9 logiciel employeur ; L.132-25 présomption AV",
        "description": "Skill de qualification juridique d'une œuvre protégeable par le droit d'auteur (type, originalité, co-création, régime applicable). Produit un livrable partner-ready avec qualification et recommandation chaîne titularité.",
    },
    # Sprint D.2-e Logiciel / BdD (3)
    "bases-de-donnees": {
        "code": "B7D8WU",
        "domain": "logiciel-bdd",
        "mode": "protection base de données sui generis et droit d'auteur sur structure",
        "specificites": "L.341-1+ régime sui generis producteur ; L.342-1 extraction substantielle ; L.342-2 extractions répétées substantielles ; durée 15 ans renouvelable si investissement substantiel nouveau ; protection structure originale par droit d'auteur ; RGPD si données personnelles",
        "description": "Skill d'analyse de la protection d'une base de données (régime sui generis + droit d'auteur sur structure). Produit un livrable partner-ready avec stratégie de protection et recommandation.",
    },
    "revue-logiciel-donnees": {
        "code": "R2L9XV",
        "domain": "logiciel",
        "mode": "audit chaîne titularité code propriétaire + droits sur données entraînement IA",
        "specificites": "L.113-9 logiciel employeur ; chaîne contributeurs freelance / consultants externes ; cessions explicites ad hoc ; régime données entraînement IA ; texte and data mining L.122-5-3 exception ; bases de données entraînement régime sui generis",
        "description": "Skill d'audit de la chaîne de titularité du code logiciel propriétaire et des droits sur les données d'entraînement (IA, ML). Produit un livrable partner-ready avec findings cotés.",
    },
    "logiciels-pi": {
        "code": "L4S3YW",
        "domain": "logiciel",
        "mode": "qualification juridique du logiciel et de ses éléments protégeables",
        "specificites": "L.112-2 13° logiciel oeuvre de l'esprit ; éléments protégeables (code source, code objet, documentation préparatoire) ; éléments non protégeables (fonctionnalités, langages, algorithmes) ; CJUE SAS Institute C-406/10 ; régime employé L.113-9",
        "description": "Skill de qualification juridique d'un logiciel et de ses éléments protégeables par le droit d'auteur. Produit un livrable partner-ready avec périmètre de protection et recommandation.",
    },
    # Sprint D.2-f Contentieux / Enforcement (4)
    "mise-en-demeure-pi": {
        "code": "M6D5ZX",
        "domain": "contentieux-pi",
        "mode": "lettre d'assertion contre tiers contrefacteur présumé",
        "specificites": "posture cabinet (aggressive / mesurée / conservatrice) ; matrice approbateurs + escalades automatiques ; risque procès abusif art. 1240 C.civ + L.123-2 C.com. ; verification destination secret professionnel ; mode silencieux livrable externe",
        "description": "Skill de rédaction de mise en demeure PI avec posture calibrée. Produit la lettre + note relecteur partner-ready.",
    },
    "saisie-contrefacon": {
        "code": "S8C7AY",
        "domain": "contentieux-pi",
        "mode": "requête ex parte saisie-contrefaçon Art. L.615-5 brevet",
        "specificites": "L.615-5 brevets ; L.716-7 marques ; L.521-4 D&M ; L.332-1 droit auteur ; motivation urgence + subsidiarité ; étendue opérations (lieux, copies, échantillons) ; mainlevée et rétractation ; jurisprudence chambres saisies CA Paris",
        "description": "Skill de préparation d'une requête ex parte en saisie-contrefaçon (brevet, marque, D&M, droit d'auteur). Produit un livrable partner-ready avec motivation et étendue.",
    },
    "strategie-defense-pi": {
        "code": "D1F2BZ",
        "domain": "contentieux-pi",
        "mode": "posture défensive attaque contrefaçon présumée",
        "specificites": "défense par nullité reconventionnelle ; usage antérieur L.613-7 brevet ; FTO documentée ; bonne foi ; mesures conservatoires défensives ; transaction privilégiée selon profil cabinet ; calcul exposition maximum",
        "description": "Skill de définition d'une stratégie de défense PI face à une attaque en contrefaçon. Produit un livrable partner-ready avec axes de défense priorisés et recommandation transaction vs combat.",
    },
    "tri-contrefacon": {
        "code": "T3R4CA",
        "domain": "contentieux-pi",
        "mode": "pré-qualification rapide signaux contrefaçon (web, marketplace, salon)",
        "specificites": "scoring contrefaçon manifeste vs probable vs douteux ; volume commercial significatif ; contrefacteur identifiable ; identité chiffrée vs anonyme ; orientation routage (notification retrait / mise en demeure / saisie / abandon)",
        "description": "Skill de pré-qualification rapide de signaux de contrefaçon (web, marketplace, salon). Produit un livrable partner-ready avec scoring et routage enforcement.",
    },
    # Sprint D.2-g Transverse (4)
    "audit-pi-ma": {
        "code": "U5M6DB",
        "domain": "transverse",
        "mode": "audit due diligence PI dans opération M&A",
        "specificites": "inventaire multi-actifs (marques, brevets, D&M, auteur, logiciel, OSS, secrets) ; chaîne titularité L.131-3, L.113-9, inscriptions registres ; antériorités bloquantes ; valorisation (relief-from-royalty, DCF, cost approach) ; reps & warranties + escrow + conditions suspensives",
        "description": "Skill d'audit due diligence PI dans une opération M&A. Produit un livrable partner-ready avec findings cotés, valorisation indicative et recommandations transactionnelles.",
    },
    "contrats-pi": {
        "code": "C7P8EC",
        "domain": "transverse",
        "mode": "rédaction ou revue contrat PI autonome (licence, cession, R&D, transfert tech)",
        "specificites": "L.131-3 cession auteur ; L.613-8 licence brevet ; TTBER UE 316/2014 transfert de technologie ; formalités opposabilité (inscription RNB brevets, RNM marques) ; clauses sensibles (non-contestation, no-challenge, grant-back, audit, change of control) ; jurisprudence Windsurfing",
        "description": "Skill de rédaction ou de revue de contrat PI autonome (licence, cession, R&D collaborative, transfert technologie, MTA, NDA). Produit un livrable partner-ready avec clauses calibrées et formalités opposabilité.",
    },
    "revue-clause-pi": {
        "code": "R9V1FD",
        "domain": "transverse",
        "mode": "revue ciblée des clauses PI dans contrat plus large (NDA, partenariat, prestation)",
        "specificites": "clause cession globale œuvres futures (L.131-1 nullité) ; clause non-contestation (atteinte ordre public ?) ; clause grant-back ; clause de no-challenge ; portée territoriale et temporelle ; rémunération vs cession",
        "description": "Skill de revue ciblée des clauses PI dans un contrat plus large (NDA, partenariat, prestation, contrat commercial). Produit un livrable partner-ready avec clauses cotées et reformulations.",
    },
    "portefeuille-pi": {
        "code": "P2T3GE",
        "domain": "transverse",
        "mode": "revue de portefeuille PI multi-domaines (marques + brevets + D&M + auteur)",
        "specificites": "échéances renouvellement marques L.712-9 ; annuités brevets ; formalités opposabilité ; couverture territoriale vs exploitation ; complétude inventaire actifs PI ; recommandation IPMS au-delà de 50 titres",
        "description": "Skill de revue de portefeuille PI multi-domaines (marques + brevets + D&M + droit auteur). Produit un livrable partner-ready avec actions priorisées par titre.",
    },
}


def dataset_dir(skill: str) -> Path:
    return REPO_ROOT / "plugins/hacienda-propriete-intellectuelle/tests/datasets" / f"d2-{skill}"


def scoring_path(skill: str, code: str) -> Path:
    return REPO_ROOT / "docs/backlog" / f"pi-scoring-d2-{skill}-{code}.md"


def get_cfg(skill: str) -> dict:
    if skill not in SKILLS_D2:
        names = "\n  ".join(sorted(SKILLS_D2.keys()))
        print(f"\nERREUR : skill inconnu '{skill}'.\nSkills D.2 disponibles :\n  {names}\n", file=sys.stderr)
        sys.exit(1)
    return SKILLS_D2[skill]


def cmd_phase1(skill: str) -> int:
    cfg = get_cfg(skill)
    output = dataset_dir(skill) / "scenario.md"
    return subprocess.call([
        sys.executable, str(HELPER), "phase1",
        "--skill", skill,
        "--domain", cfg["domain"],
        "--mode", cfg["mode"],
        "--specificites", cfg["specificites"],
        "--code", cfg["code"],
        "--output", str(output),
    ])


def cmd_phase2(skill: str) -> int:
    cfg = get_cfg(skill)
    scenario = dataset_dir(skill) / "scenario.md"
    output = dataset_dir(skill) / "ground-truth.md"
    if not scenario.exists():
        print(f"\nERREUR : scenario introuvable : {scenario}\nLance d'abord 'd2.py phase1 {skill}' et sauvegarde l'output Codex.\n", file=sys.stderr)
        return 2
    return subprocess.call([
        sys.executable, str(HELPER), "phase2",
        "--skill", skill,
        "--skill-description", cfg["description"],
        "--domain", cfg["domain"],
        "--mode", cfg["mode"],
        "--scenario", str(scenario),
        "--output", str(output),
    ])


def cmd_phase4(skill: str, date: str = None) -> int:
    cfg = get_cfg(skill)
    scenario = dataset_dir(skill) / "scenario.md"
    truth = dataset_dir(skill) / "ground-truth.md"
    live = dataset_dir(skill) / "live-output.md"
    for p, name in [(scenario, "scenario"), (truth, "ground-truth"), (live, "live-output")]:
        if not p.exists():
            print(f"\nERREUR : {name} introuvable : {p}\n", file=sys.stderr)
            return 2
    output = scoring_path(skill, cfg["code"])
    args = [
        sys.executable, str(HELPER), "phase4",
        "--skill", skill,
        "--skill-version", "2.0.0",
        "--code", cfg["code"],
        "--scenario", str(scenario),
        "--ground-truth", str(truth),
        "--live-output", str(live),
        "--output", str(output),
    ]
    if date:
        args += ["--date", date]
    return subprocess.call(args)


def cmd_list() -> int:
    print("\n29 skills D.2 — sprints D.2-a à D.2-g (29 cibles, 4 exclusions par design).\n")
    sprint_labels = {
        "marques": "Sprint D.2-a Marques",
        "marques-brevets": "Sprint D.2-a Marques (cross)",
        "brevets": "Sprint D.2-b Brevets",
        "brevets-marques": "Sprint D.2-b Brevets (cross)",
        "dessins-modeles": "Sprint D.2-c D&M",
        "droit-auteur": "Sprint D.2-d Droit auteur",
        "droits-voisins": "Sprint D.2-d Droit auteur",
        "logiciel-bdd": "Sprint D.2-e Logiciel/BdD",
        "logiciel": "Sprint D.2-e Logiciel/BdD",
        "contentieux-pi": "Sprint D.2-f Contentieux/Enforcement",
        "transverse": "Sprint D.2-g Transverse",
    }
    grouped: dict = {}
    for skill, cfg in SKILLS_D2.items():
        label = sprint_labels.get(cfg["domain"], cfg["domain"])
        grouped.setdefault(label, []).append((skill, cfg["code"]))
    for label in sorted(grouped.keys()):
        print(f"{label} :")
        for skill, code in grouped[label]:
            d = dataset_dir(skill)
            p1 = "✓" if (d / "scenario.md").exists() else "·"
            p2 = "✓" if (d / "ground-truth.md").exists() else "·"
            p3 = "✓" if (d / "live-output.md").exists() else "·"
            p4 = "✓" if scoring_path(skill, code).exists() else "·"
            print(f"  [{p1}{p2}{p3}{p4}] {skill}  ({code})")
        print()
    print("Légende [P1 P2 P3 P4] : ✓ livré · pending. Phase 1+2+4 = Codex, Phase 3 = Claude Code.\n")
    return 0


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        prog="d2",
        description="Wrapper minimal-friction pour les 29 cycles D.2 (sparring blind).",
        epilog="Voir docs/methodology/d2-codex-launchpad.md.",
    )
    sub = p.add_subparsers(dest="cmd", required=True)

    p1 = sub.add_parser("phase1", help="Codex Phase 1 (datasets, GPT-5.5 medium)")
    p1.add_argument("skill", help="Nom du skill D.2 (ex. mise-en-demeure-pi)")

    p2 = sub.add_parser("phase2", help="Codex Phase 2 (vérité terrain, GPT-5.5 HIGH)")
    p2.add_argument("skill", help="Nom du skill D.2")

    p4 = sub.add_parser("phase4", help="Codex Phase 4 (scoring, GPT-5.5 medium)")
    p4.add_argument("skill", help="Nom du skill D.2")
    p4.add_argument("--date", default=None, help="Date scoring YYYY-MM-DD")

    sub.add_parser("list", help="Liste les 29 skills D.2 et leur avancement")

    return p


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()
    if args.cmd == "phase1":
        sys.exit(cmd_phase1(args.skill))
    elif args.cmd == "phase2":
        sys.exit(cmd_phase2(args.skill))
    elif args.cmd == "phase4":
        sys.exit(cmd_phase4(args.skill, args.date))
    elif args.cmd == "list":
        sys.exit(cmd_list())


if __name__ == "__main__":
    main()
