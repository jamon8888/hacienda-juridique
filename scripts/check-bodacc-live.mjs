#!/usr/bin/env node
/**
 * Contrôle en réel que le client BODACC du plugin parle bien à l'API : les
 * valeurs de filtre du code correspondent aux valeurs actuelles des champs.
 *
 * Contexte : `bodacc_procedures` filtrait sur familleavis = "procedures-collectives"
 * alors que la valeur réelle est "collective" ; l'API répond alors 0 résultat,
 * sans erreur, et l'outil disait « aucune procédure » pour toute société. Aucun
 * test unitaire ne peut voir cet écart : il faut interroger le vrai BODACC.
 *
 * Le script n'a pas de société codée en dur : il prend une annonce récente de
 * procédure collective, puis vérifie que `searchProcedures` la retrouve.
 *
 * Usage (après `npm run build`) : node scripts/check-bodacc-live.mjs
 * Sortie : code 0 si tout est cohérent, 1 sinon.
 */
import { BodaccClient } from "../packages/core/dist/sources/bodacc.js";

const BASE =
  "https://bodacc-datadila.opendatasoft.com/api/explore/v2.1/catalog/datasets/annonces-commerciales/records";

async function api(params) {
  const res = await fetch(`${BASE}?${new URLSearchParams(params)}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} sur ${params.where ?? params.group_by}`);
  return (await res.json()).results;
}

let failures = 0;
const check = (ok, message) => {
  console.log(`${ok ? "OK  " : "FAIL"} ${message}`);
  if (!ok) failures += 1;
};

// 1. Valeurs réelles du champ familleavis, à comparer à celles que le code utilise.
const familles = await api({ select: "familleavis, familleavis_lib", group_by: "familleavis, familleavis_lib" });
console.log("Valeurs réelles de familleavis (valeur technique → libellé) :");
for (const f of familles) console.log(`  ${JSON.stringify(f.familleavis)} → ${f.familleavis_lib}`);
check(
  familles.some((f) => f.familleavis === "collective"),
  'la valeur "collective" (utilisée par searchProcedures) existe dans l\'API',
);

// 2. Une annonce récente de procédure collective qui porte un SIREN.
const recentes = await api({
  where: 'familleavis = "collective"',
  select: "registre, commercant, dateparution",
  order_by: "dateparution desc",
  limit: "30",
});
const exemple = recentes.find((r) => Array.isArray(r.registre) && /^\d{9}$/.test(r.registre[0] ?? ""));
check(Boolean(exemple), "une annonce récente de procédure collective avec SIREN est disponible");

// 3. Le client du plugin la retrouve, par les deux outils.
if (exemple) {
  const siren = exemple.registre[0];
  const client = new BodaccClient();
  const procedures = await client.searchProcedures(siren);
  check(procedures.length > 0, `searchProcedures(${siren}) renvoie ${procedures.length} annonce(s)`);
  const toutes = await client.searchBySiren(siren);
  check(toutes.length >= procedures.length && toutes.length > 0, `searchBySiren(${siren}) renvoie ${toutes.length} annonce(s)`);
}

console.log(failures === 0 ? "\nBODACC : cohérent." : `\nBODACC : ${failures} contrôle(s) en échec.`);
process.exit(failures === 0 ? 0 : 1);
