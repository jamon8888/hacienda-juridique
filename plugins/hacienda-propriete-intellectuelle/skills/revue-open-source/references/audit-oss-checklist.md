# Checklist audit OSS

Cette checklist sert a cadrer un audit open source operationnel a partir d'un
inventaire fourni. Elle ne remplace ni un SBOM fiable, ni un scan SCA, ni une
validation humaine finale.

## 1. Inventaire et perimetre

- Identifier la source de l'inventaire : SBOM, export SCA, manifest, tableur,
  repository documente.
- Distinguer composants de build, developpement, runtime, distribution,
  conteneurs, assets et forks.
- Taguer tout element absent, ambigu ou non recoupe comme `[a verifier]`, puis
  lui attribuer le statut `non identifie` si le composant, sa version ou sa
  licence ne peuvent pas etre relies de facon fiable.

## 2. Licences permissives

Verifier pour les licences de type MIT, BSD, Apache-2.0, ISC ou equivalentes :

- texte de licence disponible ;
- obligation de conservation des notices ;
- attribution ou `NOTICE` quand applicable ;
- absence de clause interne plus restrictive que la policy ;
- presence d'une licence speciale brevets ou termination, notamment
  Apache-2.0.

## 3. Copyleft faible

Verifier pour LGPL, MPL, EPL ou equivalentes :

- nature de l'integration : dynamique, statique, fichier modifie, module separe ;
- obligations de publication des modifications ou des fichiers couverts ;
- disponibilite des notices et textes de licence ;
- faisabilite technique des obligations avant distribution ou livraison ;
- escalade si le mode d'integration n'est pas suffisamment documente.

## 4. Copyleft fort

Verifier pour GPL, AGPL ou equivalents :

- si le composant est distribue, embarque, integre ou expose dans une offre
  SaaS ;
- si la policy interne autorise, interdit ou conditionne cet usage ;
- si les obligations de mise a disposition du source sont compatibles avec le
  modele produit ;
- si un remplacement, une isolation ou une approbation exceptionnelle est
  necessaire.

## 5. Obligations notice et source

Pour chaque composant, verifier au minimum :

- conservation des headers et textes de licence ;
- attribution, credits ou fichier `NOTICE` ;
- acces au code source amont quand la licence l'exige ;
- mise a disposition des modifications ou du source correspondant si requis ;
- documentation interne du bundle licences et du canal de redistribution.

## 6. AGPL et SaaS

Points de vigilance specifiques :

- service accessible a distance, portail client, API exposee ou fonctionnalite
  managée ;
- presence d'un composant AGPL dans le runtime, le serveur ou un service couple ;
- hypothese d'isolement technique a valider humainement, jamais presume
  suffisante par defaut ;
- policy interne sur l'usage AGPL en contexte SaaS ;
- besoin d'escalade juridique/engineering avant toute conclusion positive.

## 7. Composants au statut `non identifie`

Traiter comme non conclusifs :

- licence absente, incoherente ou multiple ;
- version inconnue ;
- composant embarque sans manifeste ;
- fork interne sans trace de licence amont ;
- binaire ou image sans SBOM exploitable.

Actions minimales :

1. demander un inventaire plus fiable ;
2. recommander un outil SCA ou une generation SBOM ;
3. bloquer toute conclusion definitive sur la conformite du composant.
