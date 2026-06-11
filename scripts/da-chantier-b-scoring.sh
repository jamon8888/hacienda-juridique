#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

DATE="${DATE:-2026-06-10}"
DATASET_ROOT="plugins/hacienda-droit-affaires/tests/datasets"
BACKLOG_ROOT="docs/backlog"
PLUGIN_SKILLS="plugins/hacienda-droit-affaires/skills/"
CACHE_SKILLS="${CACHE_SKILLS:-$HOME/.claude/plugins/cache/hacienda-juridique/hacienda-droit-affaires/0.1.0/skills/}"

SKILLS=(
  reviser-contrat
  reviser-nda
  constitution-societe
  gouvernance-ag
  financement-startup
  cgv-generator
)

code_for() {
  case "$1" in
    reviser-contrat) printf "6YFSSW" ;;
    reviser-nda) printf "IJ30QP" ;;
    constitution-societe) printf "0JO6GK" ;;
    gouvernance-ag) printf "S60EV7" ;;
    financement-startup) printf "KJ039D" ;;
    cgv-generator) printf "87MHRS" ;;
  esac
}

mode_for() {
  case "$1" in
    reviser-contrat) printf "revue d'un contrat commercial entrant cote client" ;;
    reviser-nda) printf "triage NDA commercial cote recepteur" ;;
    constitution-societe) printf "choix de forme puis brouillon de constitution" ;;
    gouvernance-ag) printf "convocation et PV d'assemblee" ;;
    financement-startup) printf "comparaison instrument et revue term sheet seed" ;;
    cgv-generator) printf "generation CGV/CGU B2B ou B2C" ;;
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
  esac
}

usage() {
  cat <<'EOF'
Usage:
  bash scripts/da-chantier-b-scoring.sh list
  bash scripts/da-chantier-b-scoring.sh init <skill>
  bash scripts/da-chantier-b-scoring.sh phase1 <skill>
  bash scripts/da-chantier-b-scoring.sh phase2 <skill>
  bash scripts/da-chantier-b-scoring.sh phase3-resync
  bash scripts/da-chantier-b-scoring.sh phase3-prompt <skill>
  bash scripts/da-chantier-b-scoring.sh phase4 <skill>
  bash scripts/da-chantier-b-scoring.sh aggregate <skill>

Skills:
  reviser-contrat
  reviser-nda
  constitution-societe
  gouvernance-ag
  financement-startup
  cgv-generator

Notes:
  - Phase 1, Phase 2 et Phase 4 doivent chacune partir dans une session Codex neuve.
  - Avant chaque Phase 3, lancer phase3-resync puis ouvrir une session Claude fraîche.
  - Phase 3 doit partir dans une session Claude fraîche, sans lire ground-truth.md.
  - Sauver le JSON Phase 2 pur dans ground-truth.md et le JSON Phase 4 pur dans verdicts-<CODE>.json.
  - CHECKPOINT revue des gates (entre Phase 2 et Phase 3) : faire relire les critères
    CRITIQUES par Claude pour vérifier que PASS = complément exact de FAIL (pas de zone
    orpheline « juste sur le fond, imprécis sur la forme »). Un gate asymétrique ou un
    gate-recall produit un faux REJETÉ. Ne PAS modifier la grille après le run live
    (intégrité blind) : la revue se fait AVANT la Phase 3. Cf. C-024 (reviser-contrat)
    et C-006 (reviser-nda).
EOF
}

has_skill() {
  local skill="$1"
  code_for "$skill" >/dev/null
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
  printf "/tmp/da-b-%s-%s.txt" "$1" "$2"
}

err_path() {
  printf "/tmp/da-b-%s-%s-err.txt" "$1" "$2"
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
  local dir
  dir="$(dataset_dir "$skill")"
  init_dataset "$skill" >/dev/null
  run_prompt_command "$skill" phase4 \
    python3 scripts/codex-blind-scoring.py phase4-criteria \
      --skill "$skill" \
      --skill-version 2.0.0 \
      --code "$(code_for "$skill")" \
      --scenario "$dir/scenario.md" \
      --ground-truth "$dir/ground-truth.md" \
      --live-output "$dir/live-output.md" \
      --date "$DATE" \
      --output "$BACKLOG_ROOT/da-scoring-$skill-$(code_for "$skill").md"
  echo "save pure Codex verdict JSON to: $dir/verdicts-$(code_for "$skill").json"
  echo "save scoring report markdown to: $BACKLOG_ROOT/da-scoring-$skill-$(code_for "$skill").md"
}

aggregate() {
  local skill="$1"
  local dir
  dir="$(dataset_dir "$skill")"
  python3 scripts/tiered_scoring.py \
    "$dir/ground-truth.md" \
    "$dir/verdicts-$(code_for "$skill").json"
}

list_skills() {
  printf "| Skill | Code | Dataset | Mode |\n"
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
    init|phase1|phase2|phase3-prompt|phase4|aggregate)
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
      esac
      ;;
    *)
      usage >&2
      exit 1
      ;;
  esac
}

main "$@"
