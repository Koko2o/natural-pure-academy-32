/**
 * Catalogue des suppléments nutritionnels avec informations détaillées
 */

interface Supplement {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  benefits: string[];
  scientificBasis: string;
  standardDose: string;
  timeToEffect: string;
  contraindications?: string[];
  interactions?: string[];
  researchScore?: number; // 1-10 score based on research quality
  safetyProfile?: number; // 1-10 score
  naturalSources?: string[];
  categories?: string[];
}

export const SUPPLEMENT_CATALOG = {
  vitamin_d3: {
    id: "vitamin_d3",
    name: "Vitamine D3",
    scientificName: "Cholécalciférol",
    description: "Hormone stéroïde essentielle pour l'absorption du calcium, la fonction immunitaire et la santé osseuse.",
    benefits: [
      "Renforce le système immunitaire",
      "Améliore l'absorption du calcium",
      "Favorise la santé osseuse",
      "Peut réduire le risque de dépression saisonnière",
      "Soutient la fonction musculaire"
    ],
    scientificBasis: "Des études ont montré qu'une supplémentation en vitamine D3 peut réduire le risque d'infections respiratoires de 30% chez les personnes carencées.",
    standardDose: "1000-4000 UI par jour selon le niveau initial",
    timeToEffect: "4-8 semaines pour normaliser les niveaux sanguins",
    contraindications: [
      "Hypercalcémie",
      "Maladies rénales sévères",
      "Sarcoïdose"
    ],
    interactions: [
      "Médicaments contenant de l'aluminium",
      "Anticonvulsivants",
      "Statines"
    ],
    researchScore: 9,
    safetyProfile: 9,
    naturalSources: ["Exposition au soleil", "Poissons gras", "Jaunes d'œufs", "Champignons exposés aux UV"],
    categories: ["Immunité", "Santé osseuse", "Humeur"]
  },

  magnesium_glycinate: {
    id: "magnesium_glycinate",
    name: "Magnésium Glycinate",
    scientificName: "Bis-glycinate de magnésium",
    description: "Forme hautement biodisponible et bien tolérée de magnésium, liée à l'acide aminé glycine.",
    benefits: [
      "Améliore la qualité du sommeil",
      "Réduit le stress et l'anxiété",
      "Soutient la fonction musculaire",
      "Aide à la régulation de la glycémie",
      "Contribue à la santé cardiovasculaire"
    ],
    scientificBasis: "Le magnésium est impliqué dans plus de 300 réactions enzymatiques dans le corps. La forme glycinate est particulièrement bien absorbée et présente moins d'effets secondaires digestifs.",
    standardDose: "300-400mg par jour (en magnésium élémentaire)",
    timeToEffect: "2-4 semaines pour les effets sur le sommeil et l'anxiété",
    contraindications: [
      "Insuffisance rénale sévère",
      "Blocs cardiaques"
    ],
    interactions: [
      "Antibiotiques (tétracyclines, fluoroquinolones)",
      "Diurétiques",
      "Médicaments pour le cœur"
    ],
    researchScore: 8,
    safetyProfile: 9,
    naturalSources: ["Légumes verts à feuilles", "Noix et graines", "Légumineuses", "Chocolat noir"],
    categories: ["Sommeil", "Stress", "Fonction musculaire"]
  },

  omega3: {
    id: "omega3",
    name: "Oméga-3 EPA/DHA",
    scientificName: "Acides eicosapentaénoïque et docosahexaénoïque",
    description: "Acides gras polyinsaturés essentiels jouant un rôle crucial dans la santé cardiovasculaire et cérébrale.",
    benefits: [
      "Réduit l'inflammation systémique",
      "Améliore la santé cardiovasculaire",
      "Soutient la fonction cognitive",
      "Peut améliorer la santé des articulations",
      "Contribue à l'équilibre émotionnel"
    ],
    scientificBasis: "Les oméga-3 à longue chaîne (EPA et DHA) modulent l'inflammation et sont des composants structurels des membranes cellulaires, particulièrement concentrés dans le cerveau.",
    standardDose: "1000-3000mg par jour (EPA+DHA combinés)",
    timeToEffect: "1-3 mois pour les effets anti-inflammatoires",
    contraindications: [
      "Troubles de la coagulation",
      "Allergie aux poissons ou fruits de mer (pour les sources marines)"
    ],
    interactions: [
      "Anticoagulants et antiplaquettaires",
      "Médicaments hypotenseurs"
    ],
    researchScore: 9,
    safetyProfile: 8,
    naturalSources: ["Poissons gras (saumon, maquereau)", "Graines de lin", "Graines de chia", "Algues marines"],
    categories: ["Anti-inflammatoire", "Santé cardiovasculaire", "Santé cognitive"]
  },

  probiotics: {
    id: "probiotics",
    name: "Probiotiques",
    scientificName: "Cultures bactériennes bénéfiques",
    description: "Micro-organismes vivants qui, lorsqu'ils sont administrés en quantités adéquates, confèrent un bénéfice pour la santé.",
    benefits: [
      "Améliore la santé digestive",
      "Renforce le système immunitaire",
      "Peut réduire l'inflammation intestinale",
      "Aide à la production de vitamines",
      "Peut améliorer l'humeur via l'axe intestin-cerveau"
    ],
    scientificBasis: "Les probiotiques modulent le microbiome intestinal, améliorant la barrière intestinale et interagissant avec le système immunitaire pour réduire l'inflammation.",
    standardDose: "10-50 milliards d'UFC par jour",
    timeToEffect: "2-4 semaines pour les effets digestifs",
    contraindications: [
      "Immunodéficience sévère",
      "Pancréatite aiguë"
    ],
    interactions: [
      "Antibiotiques (prendre à distance)",
      "Immunosuppresseurs"
    ],
    researchScore: 7,
    safetyProfile: 9,
    naturalSources: ["Yaourt", "Kéfir", "Choucroute", "Kombucha", "Kimchi"],
    categories: ["Santé digestive", "Immunité", "Santé mentale"]
  },

  vitamin_b_complex: {
    id: "vitamin_b_complex",
    name: "Complexe Vitamine B",
    scientificName: "Vitamines B1, B2, B3, B5, B6, B7, B9, B12",
    description: "Groupe de vitamines hydrosolubles jouant des rôles essentiels dans le métabolisme énergétique et la fonction neurologique.",
    benefits: [
      "Favorise la production d'énergie cellulaire",
      "Soutient la fonction neurologique",
      "Aide à la formation des globules rouges",
      "Contribue à la santé cardiovasculaire",
      "Participe à la méthylation et la synthèse de l'ADN"
    ],
    scientificBasis: "Les vitamines B sont des cofacteurs essentiels dans de nombreuses voies métaboliques, particulièrement celles liées à la production d'énergie et aux fonctions neurologiques.",
    standardDose: "100% des AJR pour chaque vitamine B",
    timeToEffect: "2-4 semaines pour ressentir les effets sur l'énergie",
    contraindications: [
      "Allergies spécifiques aux composants"
    ],
    interactions: [
      "Certains antibiotiques",
      "Médicaments antiépileptiques",
      "Méthotrexate"
    ],
    researchScore: 8,
    safetyProfile: 8,
    naturalSources: ["Viandes", "Œufs", "Légumineuses", "Grains entiers", "Légumes verts"],
    categories: ["Énergie", "Santé neurologique", "Métabolisme"]
  },

  vitamin_c: {
    id: "vitamin_c",
    name: "Vitamine C",
    scientificName: "Acide ascorbique",
    description: "Puissant antioxydant hydrosoluble essentiel à de nombreuses fonctions métaboliques et immunologiques.",
    benefits: [
      "Renforce le système immunitaire",
      "Protège contre les dommages des radicaux libres",
      "Aide à la synthèse du collagène",
      "Améliore l'absorption du fer non-héminique",
      "Soutient la santé des gencives"
    ],
    scientificBasis: "La vitamine C est un cofacteur enzymatique pour la biosynthèse du collagène et a des propriétés antioxydantes et immunomodulatrices importantes.",
    standardDose: "500-1000mg par jour",
    timeToEffect: "1-2 semaines pour les effets immunitaires",
    contraindications: [
      "Antécédents de calculs rénaux à l'oxalate",
      "Hémochromatose"
    ],
    interactions: [
      "Warfarine",
      "Statines",
      "Chimiothérapie (consulter un médecin)"
    ],
    researchScore: 8,
    safetyProfile: 8,
    naturalSources: ["Agrumes", "Kiwi", "Poivrons", "Fraises", "Brocoli"],
    categories: ["Immunité", "Antioxydant", "Santé de la peau"]
  },

  zinc: {
    id: "zinc",
    name: "Zinc",
    scientificName: "Zn",
    description: "Oligo-élément essentiel impliqué dans plus de 300 réactions enzymatiques dans l'organisme.",
    benefits: [
      "Renforce le système immunitaire",
      "Améliore la cicatrisation des plaies",
      "Soutient la synthèse des protéines et de l'ADN",
      "Aide au maintien d'une peau saine",
      "Contribue à la fonction cognitive"
    ],
    scientificBasis: "Le zinc est un cofacteur pour de nombreuses enzymes et joue un rôle crucial dans la division cellulaire, la croissance et la fonction immunitaire.",
    standardDose: "15-30mg par jour",
    timeToEffect: "2-3 semaines pour les effets immunitaires",
    contraindications: [
      "Allergie au zinc"
    ],
    interactions: [
      "Antibiotiques (tétracyclines, quinolones)",
      "Diurétiques thiazidiques",
      "Suppléments de cuivre (compétition pour l'absorption)"
    ],
    researchScore: 7,
    safetyProfile: 7,
    naturalSources: ["Huîtres", "Viandes rouges", "Noix et graines", "Légumineuses"],
    categories: ["Immunité", "Cicatrisation", "Santé hormonale"]
  },

  ashwagandha: {
    id: "ashwagandha",
    name: "Ashwagandha",
    scientificName: "Withania somnifera",
    description: "Plante adaptogène utilisée depuis des millénaires en médecine ayurvédique pour réduire le stress et améliorer la vitalité.",
    benefits: [
      "Réduit les niveaux de cortisol et le stress",
      "Améliore la résistance à la fatigue",
      "Peut aider à équilibrer les hormones thyroïdiennes",
      "Soutient la fonction cognitive sous stress",
      "Peut améliorer la qualité du sommeil"
    ],
    scientificBasis: "L'ashwagandha contient des withanolides qui modulent les réponses au stress en agissant sur l'axe hypothalamo-hypophyso-surrénalien et les récepteurs GABA.",
    standardDose: "300-600mg d'extrait standardisé par jour",
    timeToEffect: "2-8 semaines pour les effets adaptogènes",
    contraindications: [
      "Grossesse et allaitement",
      "Maladies auto-immunes (lupus, polyarthrite rhumatoïde)",
      "Hyperthyroïdie"
    ],
    interactions: [
      "Sédatifs",
      "Thyroïdiens",
      "Immunosuppresseurs"
    ],
    researchScore: 7,
    safetyProfile: 7,
    naturalSources: ["Racine d'ashwagandha"],
    categories: ["Adaptogène", "Anti-stress", "Équilibre hormonal"]
  },

  l_theanine: {
    id: "l_theanine",
    name: "L-Théanine",
    scientificName: "L-γ-glutamylethylamide",
    description: "Acide aminé présent naturellement dans le thé vert qui favorise la détente sans somnolence.",
    benefits: [
      "Favorise la relaxation sans sédation",
      "Améliore la concentration et l'attention",
      "Réduit le stress mental",
      "Peut améliorer la qualité du sommeil",
      "Synergie avec la caféine pour une attention améliorée sans nervosité"
    ],
    scientificBasis: "La L-théanine augmente les ondes alpha cérébrales associées à la relaxation alerte et module les neurotransmetteurs comme le GABA, la sérotonine et la dopamine.",
    standardDose: "100-200mg par prise, 1-3 fois par jour",
    timeToEffect: "30-60 minutes pour les effets aigus sur la relaxation",
    contraindications: [
      "Aucune connue à des doses normales"
    ],
    interactions: [
      "Médicaments pour l'hypertension (possible effet additif)",
      "Stimulants (peut atténuer les effets secondaires de la caféine)"
    ],
    researchScore: 7,
    safetyProfile: 9,
    naturalSources: ["Thé vert", "Thé noir (en quantités moindres)"],
    categories: ["Relaxation", "Cognition", "Sommeil"]
  },

  curcumin: {
    id: "curcumin",
    name: "Curcumine",
    scientificName: "Différencuméthoxycurcumine",
    description: "Composé actif du curcuma aux puissantes propriétés anti-inflammatoires et antioxydantes.",
    benefits: [
      "Réduit l'inflammation chronique",
      "Soulage les douleurs articulaires",
      "Puissant antioxydant",
      "Soutient la fonction cognitive",
      "Favorise la santé digestive"
    ],
    scientificBasis: "La curcumine inhibe plusieurs molécules impliquées dans l'inflammation, notamment NF-κB, et active les voies antioxydantes comme Nrf2.",
    standardDose: "500-1000mg par jour (avec enhancer d'absorption)",
    timeToEffect: "4-8 semaines pour les effets anti-inflammatoires",
    contraindications: [
      "Calculs biliaires",
      "Obstruction des voies biliaires",
      "Chirurgie imminente (effet anticoagulant)"
    ],
    interactions: [
      "Anticoagulants",
      "Antidiabétiques",
      "Inhibiteurs de la pompe à protons"
    ],
    researchScore: 8,
    safetyProfile: 8,
    naturalSources: ["Curcuma (racine)"],
    categories: ["Anti-inflammatoire", "Santé articulaire", "Antioxydant"]
  },

  coq10: {
    id: "coq10",
    name: "Coenzyme Q10",
    scientificName: "Ubiquinone/Ubiquinol",
    description: "Composé semblable à une vitamine, présent dans toutes les cellules du corps et essentiel à la production d'énergie cellulaire.",
    benefits: [
      "Améliore la production d'énergie cellulaire",
      "Soutient la santé cardiovasculaire",
      "Puissant antioxydant",
      "Peut réduire la fatigue liée aux statines",
      "Contribue à la santé des mitochondries"
    ],
    scientificBasis: "Le CoQ10 est un composant essentiel de la chaîne de transport d'électrons mitochondriale et un antioxydant lipophile qui protège les membranes cellulaires.",
    standardDose: "100-200mg par jour",
    timeToEffect: "4-12 semaines pour les effets énergétiques",
    contraindications: [
      "Aucune connue à des doses normales"
    ],
    interactions: [
      "Anticoagulants (warfarine)",
      "Antihypertenseurs",
      "Chimiothérapie (consulter un médecin)"
    ],
    researchScore: 8,
    safetyProfile: 9,
    naturalSources: ["Viandes d'organes", "Poissons gras", "Graines de sésame", "Pistaches"],
    categories: ["Énergie", "Santé cardiovasculaire", "Antioxydant"]
  },

  iron: {
    id: "iron",
    name: "Fer",
    scientificName: "Fe",
    description: "Minéral essentiel à la formation de l'hémoglobine et au transport de l'oxygène dans l'organisme.",
    benefits: [
      "Combat la fatigue liée à l'anémie",
      "Améliore le transport d'oxygène",
      "Soutient la fonction cognitive",
      "Renforce le système immunitaire",
      "Essentiel au métabolisme énergétique"
    ],
    scientificBasis: "Le fer est un composant crucial de l'hémoglobine, responsable du transport de l'oxygène, et de nombreuses enzymes impliquées dans la production d'énergie.",
    standardDose: "14-18mg par jour pour les femmes, 8mg pour les hommes",
    timeToEffect: "4-12 semaines pour corriger une carence",
    contraindications: [
      "Hémochromatose",
      "Thalassémie",
      "Anémie sidéroblastique"
    ],
    interactions: [
      "Inhibiteurs de la pompe à protons",
      "Antibiotiques (tétracyclines, quinolones)",
      "Lévodopa"
    ],
    researchScore: 9,
    safetyProfile: 6,
    naturalSources: ["Viandes rouges", "Légumineuses", "Épinards", "Tofu"],
    categories: ["Énergie", "Santé sanguine", "Fonction cognitive"]
  },

  melatonin: {
    id: "melatonin",
    name: "Mélatonine",
    scientificName: "N-acétyl-5-méthoxytryptamine",
    description: "Hormone produite naturellement par la glande pinéale qui régule le cycle veille-sommeil.",
    benefits: [
      "Améliore l'endormissement",
      "Aide à synchroniser le rythme circadien",
      "Utile pour le décalage horaire",
      "Peut améliorer la qualité du sommeil",
      "Propriétés antioxydantes"
    ],
    scientificBasis: "La mélatonine se lie aux récepteurs MT1 et MT2 dans le cerveau, signalant le début de la période de sommeil et synchronisant le rythme circadien.",
    standardDose: "0.5-5mg avant le coucher",
    timeToEffect: "30-60 minutes pour l'endormissement",
    contraindications: [
      "Maladies auto-immunes",
      "Troubles convulsifs",
      "Dépression"
    ],
    interactions: [
      "Anticoagulants",
      "Immunosuppresseurs",
      "Antidiabétiques",
      "Contraceptifs oraux"
    ],
    researchScore: 8,
    safetyProfile: 7,
    naturalSources: ["Produite naturellement dans la glande pinéale"],
    categories: ["Sommeil", "Rythme circadien"]
  },

  "resveratrol": {
    id: "resveratrol",
    name: "Resveratrol",
    scientificName: "Trans-resveratrol",
    description: "Puissant antioxydant présent dans les raisins et le vin rouge, connu pour ses effets potentiels sur la longévité.",
    standardDose: "250-500mg par jour",
    timeToEffect: "4-6 semaines pour effets antioxydants",
    scientificBasis: "Des études précliniques suggèrent que le resveratrol active les sirtuines, des protéines liées à la longévité cellulaire.",
    benefits: [
      "Protection cellulaire contre le stress oxydatif",
      "Soutien de la santé cardiovasculaire",
      "Potentiel anti-âge au niveau cellulaire"
    ],
    contraindications: [
      "Peut interférer avec les anticoagulants",
      "Non recommandé pour les femmes enceintes"
    ]
  },

  "coq10_new": {
    id: "coq10_new",
    name: "Coenzyme Q10",
    scientificName: "Ubiquinone",
    description: "Cofacteur essentiel dans la production d'énergie cellulaire, particulièrement important pour le cœur et les muscles.",
    standardDose: "100-200mg par jour",
    timeToEffect: "2-4 semaines pour augmentation du niveau d'énergie",
    scientificBasis: "Le CoQ10 joue un rôle crucial dans la chaîne de transport d'électrons mitochondriale, la principale source de production d'ATP.",
    benefits: [
      "Amélioration des niveaux d'énergie",
      "Soutien de la fonction cardiaque",
      "Protection contre le stress oxydatif"
    ],
    contraindications: [
      "Peut interagir avec les anticoagulants et les médicaments hypotenseurs",
      "Surveiller en cas de diabète (peut affecter la glycémie)"
    ]
  },

  "nac": {
    id: "nac",
    name: "N-Acétyl Cystéine",
    scientificName: "N-acetylcysteine",
    description: "Précurseur du glutathion, l'un des plus puissants antioxydants de l'organisme, soutient la détoxification hépatique.",
    standardDose: "600-1200mg par jour",
    timeToEffect: "2-4 semaines pour effets antioxydants",
    scientificBasis: "Le NAC augmente les niveaux de glutathion intracellulaire, améliorant les défenses antioxydantes et les processus de détoxification.",
    benefits: [
      "Soutien de la fonction hépatique et des processus de détoxification",
      "Protection des cellules contre les radicaux libres",
      "Amélioration de la santé respiratoire"
    ],
    contraindications: [
      "Précaution chez les personnes asthmatiques (peut provoquer un bronchospasme)",
      "Éviter en cas de traitement aux nitrates"
    ],
    researchScore: 8,
    safetyProfile: 7,
    naturalSources: ["L-cystéine présente dans les protéines animales", "Œufs", "Ail", "Oignon"],
    categories: ["Antioxydant", "Détoxification", "Santé respiratoire"]
  },
  
  "berberine": {
    id: "berberine",
    name: "Berbérine",
    scientificName: "Berberine hydrochloride",
    description: "Composé bioactif extrait de diverses plantes, particulièrement connu pour ses effets sur le métabolisme du glucose et les lipides sanguins.",
    benefits: [
      "Soutient l'équilibre glycémique",
      "Améliore le profil lipidique",
      "Favorise la santé métabolique",
      "Soutient la santé intestinale",
      "Peut aider à la gestion du poids"
    ],
    scientificBasis: "La berbérine active l'AMPK, une enzyme qui régule le métabolisme cellulaire, améliorant ainsi la sensibilité à l'insuline et le métabolisme des lipides.",
    standardDose: "500-1500mg par jour, répartis en 3 prises",
    timeToEffect: "4-8 semaines pour les effets métaboliques",
    contraindications: [
      "Femmes enceintes ou allaitantes",
      "Personnes sous médicaments pour le diabète (risque d'hypoglycémie)",
      "Personnes sous anticoagulants"
    ],
    interactions: [
      "Médicaments métabolisés par le CYP3A4",
      "Antidiabétiques",
      "Anticoagulants"
    ],
    researchScore: 7,
    safetyProfile: 7,
    naturalSources: ["Hydrastis canadensis (Hydraste du Canada)", "Berberis vulgaris (Épine-vinette)", "Coptis chinensis (Huang Lian)"],
    categories: ["Métabolisme", "Santé cardiovasculaire", "Équilibre glycémique"]
  },
  
  "lions_mane": {
    id: "lions_mane",
    name: "Crinière de Lion",
    scientificName: "Hericium erinaceus",
    description: "Champignon médicinal connu pour ses propriétés neuroprotectrices et son potentiel à stimuler la production de facteurs de croissance neuronale.",
    benefits: [
      "Soutient la fonction cognitive et la mémoire",
      "Protège et stimule la croissance neuronale",
      "Peut réduire l'anxiété et la dépression légère",
      "Soutient la santé du système nerveux",
      "Possède des propriétés antioxydantes et anti-inflammatoires"
    ],
    scientificBasis: "Contient des composés bioactifs (érinacines et hericenones) qui stimulent la production du facteur de croissance nerveuse (NGF) et protègent contre le stress oxydatif neuronal.",
    standardDose: "500-3000mg d'extrait par jour",
    timeToEffect: "2-4 semaines pour les effets cognitifs initiaux, 8-12 semaines pour les effets optimaux",
    contraindications: [
      "Allergie aux champignons",
      "Précaution chez les personnes asthmatiques"
    ],
    interactions: [
      "Anticoagulants (effet potentiellement additif)"
    ],
    researchScore: 6,
    safetyProfile: 9,
    naturalSources: ["Champignon Hericium erinaceus"],
    categories: ["Fonction cognitive", "Neuroprotection", "Santé mentale"]
  },
  
  "rhodiola": {
    id: "rhodiola",
    name: "Rhodiola Rosea",
    scientificName: "Rhodiola rosea",
    description: "Plante adaptogène utilisée traditionnellement pour améliorer l'endurance physique et mentale, et réduire la fatigue liée au stress.",
    benefits: [
      "Réduit la fatigue liée au stress",
      "Améliore les performances cognitives sous stress",
      "Augmente l'énergie et l'endurance",
      "Équilibre l'humeur",
      "Soutient le système immunitaire pendant les périodes de stress"
    ],
    scientificBasis: "Le rhodiola contient des composés actifs (rosavines et salidrosides) qui modulent les niveaux de neurotransmetteurs et protègent contre les effets néfastes du stress chronique.",
    standardDose: "200-600mg par jour d'un extrait standardisé (3% rosavines, 1% salidrosides)",
    timeToEffect: "1-3 semaines pour les effets adaptogènes",
    contraindications: [
      "Troubles bipolaires (peut provoquer une activation excessive)",
      "Hypertension sévère"
    ],
    interactions: [
      "Antidépresseurs (ISRS, IMAO)",
      "Stimulants"
    ],
    researchScore: 7,
    safetyProfile: 8,
    naturalSources: ["Racine de Rhodiola rosea"],
    categories: ["Adaptogène", "Anti-stress", "Énergie"]
  },
  
  "alpha_gpc": {
    id: "alpha_gpc",
    name: "Alpha-GPC",
    scientificName: "L-Alpha-glycérophosphorylcholine",
    description: "Précurseur naturel de l'acétylcholine, un neurotransmetteur crucial pour la mémoire, l'apprentissage et la fonction musculaire.",
    benefits: [
      "Améliore les performances cognitives et la mémoire",
      "Soutient la santé cérébrale et la plasticité neuronale",
      "Peut améliorer la force et les performances physiques",
      "Favorise la récupération cognitive après un effort intense",
      "Peut être bénéfique pour certains troubles cognitifs"
    ],
    scientificBasis: "L'Alpha-GPC augmente la disponibilité de la choline dans le cerveau, permettant une synthèse accrue d'acétylcholine, ce qui améliore la communication neuronale et la fonction cognitive.",
    standardDose: "300-600mg par jour",
    timeToEffect: "1-2 semaines pour les effets cognitifs",
    contraindications: [
      "Personnes avec une hypersensibilité à la choline"
    ],
    interactions: [
      "Médicaments anticholinergiques (effet antagoniste)"
    ],
    researchScore: 7,
    safetyProfile: 8,
    naturalSources: ["Présent en petites quantités dans les produits laitiers et la viande"],
    categories: ["Fonction cognitive", "Performance physique", "Santé cérébrale"]
  }
};

export const SUPPLEMENT_CATEGORIES = {
  ENERGY: "Énergie",
  IMMUNITY: "Immunité",
  DIGESTION: "Digestion",
  SLEEP: "Sommeil",
  STRESS: "Stress",
  COGNITIVE: "Fonction cognitive",
  HORMONAL: "Équilibre hormonal",
  JOINT: "Santé articulaire",
  CARDIOVASCULAR: "Santé cardiovasculaire",
  ANTIOXIDANT: "Antioxydant"
};

export default { SUPPLEMENT_CATALOG, SUPPLEMENT_CATEGORIES };