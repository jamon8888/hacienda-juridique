---
description: >
  Côté débiteur/dirigeant : prépare la déclaration de cessation des paiements
  (« dépôt de bilan ») à déposer au greffe quand l'entreprise ne peut plus faire
  face à son passif exigible avec son actif disponible (art. L.631-1 C.com.).
  Qualifie la cessation des paiements, calcule le délai légal de 45 jours
  (L.631-4 RJ / L.640-4 LJ), ALERTE si la déclaration est tardive (faute de
  gestion possible, L.651-2 insuffisance d'actif, période suspecte rallongée),
  liste les pièces obligatoires R.631-1 C.com., oriente tribunal compétent et
  RJ vs LJ, et rédige le squelette de la déclaration avec [à compléter] sur les
  chiffres. Gate : si l'entreprise n'est PAS encore en cessation des paiements,
  renvoi `prevention-difficultes` (mandat ad hoc / conciliation / sauvegarde).
  Ne fabrique jamais les chiffres du client ; n'évalue pas la responsabilité du
  dirigeant (la nomme et renvoie à un avocat). Brouillon, validation humaine
  (avocat) OBLIGATOIRE.
argument-hint: "[forme sociale, date présumée de cessation des paiements (ou actif disponible / passif exigible), RJ ou LJ envisagé ; côté débiteur]"
---

Point d'entrée `/h-da:declaration-cessation-paiements` du plugin Hacienda Droit des Affaires.

Le déroulé complet de cette commande (étapes, vérification des sources, format de sortie, garde-fous) est défini dans le skill `hacienda-droit-affaires:declaration-cessation-paiements` du même plugin. Pour traiter la demande, charge ce skill avec l'outil Skill en lui transmettant les éléments ci-dessous, puis suis ses instructions.

Éléments transmis par l'utilisateur :

$ARGUMENTS
