# Classification des citations d'art antérieur — cadre OEB (appliqué INPI)

Référence détaillée pour le skill `/analyse-refus-inpi`. Synthétise les
codes utilisés par l'Office européen des brevets dans ses rapports de
recherche (Directives examen partie B chapitre X) et leur application
pratique par l'INPI dans les rapports de recherche préliminaire et les
notifications de motifs de refus (art. R.612-66 CPI).

## Codes principaux X / Y / A / E

### Code X — Antériorité destructrice de nouveauté à elle seule

Une citation **X** divulgue **toutes** les caractéristiques d'une
revendication indépendante. La revendication est donc dépourvue de
nouveauté au sens de l'art. L.611-11 CPI / Art. 54 EPC.

**Implication pratique** : la revendication ne peut subsister telle quelle.
Limitation obligatoire (Option A ou C du skill) ou abandon.

**Exemples par domaine technique** :

- **Mécanique** : la revendication 1 revendique « un dispositif de fixation
  comprenant un boulon, un écrou, une rondelle élastique ». La citation X
  divulgue exactement le même dispositif → destructrice.
- **Chimie** : la revendication 1 revendique « une composition comprenant
  les composés A, B et C dans les proportions X-Y % ». La citation X
  divulgue cette composition dans les mêmes proportions → destructrice.
- **Logiciel embarqué** : la revendication 1 revendique « un procédé de
  compression vidéo comprenant les étapes a, b, c ». La citation X (brevet
  ou article scientifique) décrit ces mêmes étapes → destructrice.
- **Biotech** : la revendication 1 revendique « un anticorps monoclonal
  liant l'épitope EP1 avec une affinité KD < 10 nM ». La citation X
  divulgue un anticorps avec ces mêmes caractéristiques → destructrice.

### Code Y — Antériorité destructrice d'activité inventive en combinaison

Une citation **Y** ne couvre **PAS à elle seule** toutes les caractéristiques
de la revendication, mais l'examinateur estime que sa **combinaison** avec
d'autres citations Y (Y1 + Y2, voire Y1 + Y2 + Y3) rendrait l'invention
évidente pour l'homme du métier (art. L.611-14 CPI / Art. 56 EPC).

**Implication pratique** : argument problème-solution OEB obligatoire pour
défendre l'activité inventive (cf. skill SKILL.md section dédiée).

**Exemples par domaine technique** :

- **Mécanique** : Y1 divulgue un boulon spécial, Y2 divulgue une rondelle
  élastique spécifique ; l'examinateur estime que l'homme du métier les
  combinerait naturellement.
- **Chimie** : Y1 divulgue les composés A et B, Y2 divulgue l'utilisation
  du composé C dans des compositions similaires.
- **Logiciel** : Y1 décrit les étapes a et b, Y2 décrit l'étape c dans un
  contexte voisin.
- **Biotech** : Y1 divulgue un anticorps anti-EP1 avec affinité moyenne, Y2
  enseigne une technique générale d'amélioration d'affinité applicable.

### Code A — État de la technique pour information / contexte général

Une citation **A** est citée pour **éclairer le contexte technique** du
domaine, sans constituer une antériorité ni opposable à la nouveauté ni
opposable à l'activité inventive.

**Implication pratique** : **pas de problème immédiat**. Ne pas amender en
réaction à une citation A. La citer dans la réponse pour montrer la
connaissance du domaine peut être utile, mais aucun amendement n'est
requis.

### Code E — Antériorité relative (Art. 54(3) CBE)

Une citation **E** est une **demande de brevet déposée avant** la date de
priorité de notre demande, mais **publiée après**. Elle constitue une
**antériorité relative** au titre de l'Art. 54(3) CBE / L.611-11 al. 3 CPI.

**Implication pratique cruciale** :
- ✅ Peut détruire la **nouveauté** (test : si la demande E divulgue toutes
  les caractéristiques de notre revendication indépendante)
- ❌ Ne peut **JAMAIS** détruire l'**activité inventive** — jurisprudence
  **OEB G 2/98** (Grande Chambre, 31 mai 2001) confirmée par **G 1/03**

**Si une citation E est utilisée par l'examinateur pour attaquer l'activité
inventive** : violation directe G 2/98, contester formellement la
classification dans la réponse.

**Distinction « demandes parallèles »** : si la demande E a le **même
déposant** que notre demande, vérifier les règles nationales — en France,
l'antériorité relative s'applique aussi entre demandes du même déposant
(self-collision), contrairement à certaines juridictions.

## Distinction OEB vs INPI dans la pratique

- **Alignement de principe** : depuis l'alignement de l'INPI sur les
  Directives OEB (réforme PACTE 2019 renforçant l'examen INPI), les codes
  X/Y/A/E sont utilisés de manière équivalente.
- **Nuances pratiques** :
  - L'INPI est historiquement **moins exhaustif sur les combinaisons Y** :
    un rapport de recherche préliminaire INPI peut citer un document en Y
    sans détailler la combinaison envisagée. L'examinateur OEB explicite
    généralement la combinaison Y1 + Y2.
  - L'INPI utilise plus volontiers le code **A** pour des citations marginales,
    là où l'OEB pourrait les omettre.
  - L'examinateur INPI peut, dans la notification de motifs de refus
    (R.612-66 CPI), reclassifier une citation A en X ou Y si nécessaire à
    l'argumentation — toujours vérifier la cohérence rapport initial /
    notification.

## Codes étendus (parfois rencontrés)

- **O** : antériorité **orale** (publication non-écrite : conférence, exposé,
  démonstration publique). Au titre de l'Art. 54(2) CBE, équivalente à une
  publication écrite. Difficile à établir factuellement → contester
  systématiquement si pas de preuve solide (programme de conférence,
  captation, témoignages).
- **P** : publication **intermédiaire** — postérieure à la date de priorité
  mais antérieure à la date de dépôt effectif. Pertinent uniquement si la
  priorité est contestée (jurisprudence OEB G 1/15 sur priorité partielle).
- **T** : théorie ou base sous-jacente — rare, utilisé pour signaler un
  fondement théorique du domaine.
- **D** : citation faisant partie de la demande elle-même (par exemple,
  document cité dans la description du déposant).
- **L** : citation pour raisons juridiques (par exemple, conflit avec une
  demande parallèle de même déposant).

## Erreurs courantes à signaler dans la réponse

Lors de l'analyse d'une notification, signaler en `[review]` :

1. **Confusion X / Y** : l'examinateur cite un document en X alors qu'il
   manque manifestement une caractéristique pour couvrir toute la
   revendication → reclassifier en Y, préparer argument problème-solution.
2. **Traitement de A comme problématique** : si l'examinateur exige des
   amendements en réaction à une citation A → contester (A = simple
   contexte).
3. **E utilisée pour attaquer l'activité inventive** : violation G 2/98 →
   contester formellement.
4. **O sans preuve solide** : antériorité orale alléguée sans documentation
   suffisante → contester la recevabilité.
5. **Codes non standard** : si la notification utilise des codes inconnus
   (peut arriver pour notifications anciennes ou traductions), demander
   clarification.

## Liens avec autres skills du plugin

- **`recherche-anteriorite-brevet` V2.0** : utilise la même grille X/Y/A/E
  pour la recherche d'antériorité **offensive** (avant dépôt, ou pour
  préparer une action en nullité). Les résultats peuvent être réinjectés
  dans `/analyse-refus-inpi` pour préparer la réponse à une notification.
- **`anteriorite-invalidite` V2.1** : applique la même classification à des
  fins de **nullité** (L.613-25 CPI) — l'output de `/analyse-refus-inpi`
  peut alimenter une stratégie défensive de nullité si la demande tierce
  est délivrée malgré tout.

## Sources

- **Directives examen OEB partie B chapitre X** : codes de citations dans le
  rapport de recherche européen
- **Directives examen OEB partie G chapitre VII** : approche problème-solution
  pour l'activité inventive
- **CPI L.611-11** (nouveauté), **L.611-14** (activité inventive), **R.612-66**
  (notification de motifs de refus INPI)
- **Convention sur le brevet européen (CBE)** Art. 54, 56, 94, et Règle 132
- **Jurisprudence OEB Grande Chambre** : G 2/98 (priorité et Art. 54(3)),
  G 1/03 et G 2/03 (disclaimers), G 1/15 (priorité partielle), G 2/10
  (intermediate generalisation)
