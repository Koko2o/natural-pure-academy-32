/**
 * Catalogue complet des compléments alimentaires
 * Données basées sur la recherche scientifique actuelle
 */

export interface SupplementInfo {
  id: string;
  name: string;
  scientificName: string;
  benefits: string[];
  timeToEffect: string;
  scienceScore: number; // Score d'efficacité basé sur les études scientifiques (1-10)
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  scientificBasis: string;
  description: string;
  contraindications: string[];
  dosageStandard: string;
  dosageVegetarian?: string; // Spécifique pour régime végétarien si différent
  sideEffects: string[];
  interactions: string[];
  sources: string[]; // Sources scientifiques
  imageUrl?: string;
  detailedMechanism?: string;
  clinicalEvidence?: { study: string; finding: string; url: string }[];
  formulations?: { type: string; bioavailability: string; bestFor: string; notes: string }[];
  counterIndications?: string[];
  synergisticWith?: string[];
}

export const SUPPLEMENT_CATALOG: Record<string, SupplementInfo> = {
  magnesium: {
    id: "magnesium",
    name: "Magnésium",
    scientificName: "Magnesium",
    benefits: ["Réduction du stress", "Amélioration du sommeil", "Réduction des crampes musculaires"],
    timeToEffect: "2-4 semaines",
    scienceScore: 8.5,
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    scientificBasis: "Essentiel pour plus de 300 réactions biochimiques dans le corps, particulièrement efficace pour réduire l'excitabilité nerveuse",
    description: "Minéral essentiel au fonctionnement musculaire et nerveux",
    contraindications: ["Insuffisance rénale sévère", "Bloc cardiaque", "Myasthénie grave"],
    dosageStandard: "300-400mg par jour",
    dosageVegetarian: "300-400mg par jour",
    sideEffects: ["Diarrhée à fortes doses"],
    interactions: ["Certains antibiotiques", "Diurétiques"],
    sources: ["Nutritional Magnesium Association", "Journal of Research in Medical Sciences"],
    imageUrl: '/supplements/magnesium.jpg',
    detailedMechanism: 'Le magnésium agit comme cofacteur dans plus de 300 réactions enzymatiques, notamment dans la production d\'énergie, la synthèse des protéines et la régulation du système nerveux. Il module également les récepteurs NMDA impliqués dans la réponse au stress.',
    clinicalEvidence: [
      {
        study: 'Nielsen FH, et al. (2010)',
        finding: 'Réduction de 23% des marqueurs de stress chez les patients avec supplémentation en magnésium',
        url: 'https://pubmed.ncbi.nlm.nih.gov/20181314/'
      },
      {
        study: 'Abbasi B, et al. (2012)',
        finding: 'Amélioration significative de la qualité du sommeil et réduction du temps d\'endormissement',
        url: 'https://pubmed.ncbi.nlm.nih.gov/23853635/'
      }
    ],
    formulations: [
      {
        type: 'Citrate de magnésium',
        bioavailability: 'Élevée',
        bestFor: 'Stress et sommeil',
        notes: 'Bien absorbé, peut avoir un effet laxatif léger'
      },
      {
        type: 'Glycinate de magnésium',
        bioavailability: 'Élevée',
        bestFor: 'Stress et sommeil sans effets digestifs',
        notes: 'Forme très bien tolérée, idéale pour les personnes sensibles'
      },
      {
        type: 'Oxyde de magnésium',
        bioavailability: 'Faible',
        bestFor: 'Constipation',
        notes: 'Moins recommandé pour les effets neurologiques'
      }
    ],
    counterIndications: ['Insuffisance rénale sévère', 'Bloc cardiaque', 'Myasthénie grave'],
    synergisticWith: ['Vitamine B6', 'Vitamine D', 'Zinc', 'Calcium']
  },

  ashwagandha: {
    id: "ashwagandha",
    name: "Ashwagandha",
    scientificName: "Withania somnifera",
    benefits: ["Réduction du stress", "Amélioration de la résistance au stress", "Soutien immunitaire"],
    timeToEffect: "4-8 semaines",
    scienceScore: 7,
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    scientificBasis: "Adaptogène qui aide à moduler la réponse au stress en régulant le cortisol",
    description: "Plante médicinale ayurvédique traditionnelle utilisée pour ses propriétés adaptogènes",
    contraindications: ["Grossesse", "Maladies auto-immunes"],
    dosageStandard: "300-500mg d'extrait par jour",
    dosageVegetarian: "300-500mg d'extrait par jour",
    sideEffects: ["Somnolence", "Troubles digestifs légers"],
    interactions: ["Thyroïde", "Sédatifs"],
    sources: ["Journal of Alternative and Complementary Medicine", "Journal of Ethnopharmacology"]
  },

  omega3: {
    id: "omega3",
    name: "Oméga-3",
    scientificName: "EPA/DHA",
    benefits: ["Santé cardiovasculaire", "Fonction cognitive", "Réduction de l'inflammation"],
    timeToEffect: "4-12 semaines",
    scienceScore: 9,
    vegetarian: false,
    vegan: false,
    glutenFree: true,
    dairyFree: true,
    scientificBasis: "Acides gras essentiels qui régulent l'inflammation et sont composants structurels des membranes cellulaires cérébrales",
    description: "Acides gras polyinsaturés essentiels à la santé du cerveau et du système cardiovasculaire",
    contraindications: ["Troubles de la coagulation"],
    dosageStandard: "1000-2000mg combinés EPA/DHA par jour",
    sideEffects: ["Arrière-goût de poisson", "Troubles digestifs légers"],
    interactions: ["Anticoagulants"],
    sources: ["American Heart Association", "Journal of Lipid Research"]
  },

  omega3_vegan: {
    id: "omega3_vegan",
    name: "Oméga-3 Végétal",
    scientificName: "ALA (algues)",
    benefits: ["Santé cardiovasculaire", "Fonction cognitive", "Alternative végane aux oméga-3 marins"],
    timeToEffect: "6-14 semaines",
    scienceScore: 7,
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    scientificBasis: "Source d'ALA et parfois d'EPA/DHA selon la formulation (à partir d'algues)",
    description: "Alternative végétale aux oméga-3 d'origine marine, principalement issue d'algues",
    contraindications: ["Troubles de la coagulation"],
    dosageStandard: "1500-3000mg par jour",
    dosageVegetarian: "1500-3000mg par jour",
    sideEffects: ["Troubles digestifs légers"],
    interactions: ["Anticoagulants"],
    sources: ["Alternative Medicine Review", "Nutrition Journal"]
  },

  vitamin_d3: {
    id: "vitamin_d3",
    name: "Vitamine D3",
    scientificName: "Cholécalciférol",
    benefits: ["Santé osseuse", "Fonction immunitaire", "Humeur"],
    timeToEffect: "4-12 semaines",
    scienceScore: 9,
    vegetarian: false, // Source standard: lanoline
    vegan: false,
    glutenFree: true,
    dairyFree: true,
    scientificBasis: "Hormone stéroïdienne essentielle au métabolisme du calcium et à la fonction immunitaire",
    description: "Vitamine liposoluble essentielle à l'absorption du calcium et à la santé immunitaire",
    contraindications: ["Hypercalcémie"],
    dosageStandard: "1000-4000 UI par jour",
    sideEffects: ["Rares à doses recommandées"],
    interactions: ["Certains médicaments hypertenseurs"],
    sources: ["National Institutes of Health", "Endocrine Society"]
  },

  vitamin_d3_vegan: {
    id: "vitamin_d3_vegan",
    name: "Vitamine D3 Végane",
    scientificName: "Cholécalciférol d'origine végétale",
    benefits: ["Santé osseuse", "Fonction immunitaire", "Humeur"],
    timeToEffect: "4-12 semaines",
    scienceScore: 9,
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    scientificBasis: "Version végétale dérivée de lichen, fonctionnellement identique à la D3 standard",
    description: "Forme végane de vitamine D3 extraite de lichen, plus efficace que la D2",
    contraindications: ["Hypercalcémie"],
    dosageStandard: "1000-4000 UI par jour",
    dosageVegetarian: "1000-4000 UI par jour",
    sideEffects: ["Rares à doses recommandées"],
    interactions: ["Certains médicaments hypertenseurs"],
    sources: ["Vegan Society Research", "Journal of Clinical Nutrition"]
  },

  probiotics: {
    id: "probiotics",
    name: "Probiotiques",
    scientificName: "Cultures bactériennes vivantes",
    benefits: ["Santé digestive", "Fonction immunitaire", "Santé mentale"],
    timeToEffect: "2-8 semaines",
    scienceScore: 7,
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: false, // Certaines formules contiennent des traces de lait
    scientificBasis: "Bactéries bénéfiques qui soutiennent le microbiome intestinal et la production de neurotransmetteurs",
    description: "Micro-organismes vivants qui apportent des bénéfices pour la santé, particulièrement digestive",
    contraindications: ["Immunodéficience sévère"],
    dosageStandard: "10-50 milliards d'UFC par jour",
    dosageVegetarian: "10-50 milliards d'UFC par jour",
    sideEffects: ["Ballonnements initiaux"],
    interactions: ["Antibiotiques"],
    sources: ["International Scientific Association for Probiotics and Prebiotics", "Gastroenterology Journal"]
  },

  zinc: {
    id: "zinc",
    name: "Zinc",
    scientificName: "Zn",
    benefits: ["Fonction immunitaire", "Santé de la peau", "Synthèse protéique"],
    timeToEffect: "2-6 semaines",
    scienceScore: 8,
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    scientificBasis: "Oligoélément impliqué dans plus de 300 enzymes et dans la fonction immunitaire",
    description: "Minéral essentiel impliqué dans la division cellulaire et la fonction immunitaire",
    contraindications: ["Niveaux élevés de cuivre"],
    dosageStandard: "15-30mg par jour",
    dosageVegetarian: "20-40mg par jour", // Dose légèrement plus élevée pour compenser l'absorption réduite
    sideEffects: ["Nausées à dose élevée", "Altération du goût"],
    interactions: ["Antibiotiques", "Cuivre"],
    sources: ["National Institutes of Health", "Journal of Nutrition"]
  },

  vitamin_b_complex: {
    id: "vitamin_b_complex",
    name: "Complexe Vitamine B",
    scientificName: "B1, B2, B3, B5, B6, B7, B9, B12",
    benefits: ["Énergie", "Fonction cognitive", "Santé nerveuse"],
    timeToEffect: "2-6 semaines",
    scienceScore: 8,
    vegetarian: true,
    vegan: false, // B12 généralement d'origine animale
    glutenFree: true,
    dairyFree: true,
    scientificBasis: "Groupe de vitamines hydrosolubles essentielles au métabolisme énergétique et à la fonction nerveuse",
    description: "Ensemble de vitamines hydrosolubles jouant un rôle crucial dans le métabolisme énergétique",
    contraindications: ["Allergies spécifiques aux composants"],
    dosageStandard: "Varie selon chaque vitamine B",
    sideEffects: ["Urine colorée", "Nausées occasionnelles"],
    interactions: ["Certains médicaments antiépileptiques"],
    sources: ["Harvard Medical School", "British Journal of Nutrition"]
  },

  vitamin_b_complex_vegan: {
    id: "vitamin_b_complex_vegan",
    name: "Complexe Vitamine B Végan",
    scientificName: "B1, B2, B3, B5, B6, B7, B9, B12 d'origine végétale",
    benefits: ["Énergie", "Fonction cognitive", "Santé nerveuse"],
    timeToEffect: "2-6 semaines",
    scienceScore: 8,
    vegetarian: true,
    vegan: true, // B12 de source végétale
    glutenFree: true,
    dairyFree: true,
    scientificBasis: "Formulation végétale avec B12 d'origine microbienne",
    description: "Version végane complète des vitamines B, y compris la B12 de source microbienne",
    contraindications: ["Allergies spécifiques aux composants"],
    dosageStandard: "Varie selon chaque vitamine B",
    dosageVegetarian: "Varie selon chaque vitamine B",
    sideEffects: ["Urine colorée", "Nausées occasionnelles"],
    interactions: ["Certains médicaments antiépileptiques"],
    sources: ["Vegan Society", "Plant-Based Health Journal"]
  },

  iron: {
    id: "iron",
    name: "Fer",
    scientificName: "Fe",
    benefits: ["Transport d'oxygène", "Énergie", "Fonction cognitive"],
    timeToEffect: "4-12 semaines",
    scienceScore: 8,
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    scientificBasis: "Minéral essentiel au transport de l'oxygène et à la production d'énergie cellulaire",
    description: "Minéral vital pour la formation de l'hémoglobine et le transport de l'oxygène",
    contraindications: ["Hémochromatose"],
    dosageStandard: "18-27mg par jour",
    dosageVegetarian: "27-45mg par jour", // Dose plus élevée due à l'absorption réduite du fer non-hémique
    sideEffects: ["Constipation", "Troubles digestifs"],
    interactions: ["Calcium", "Thé", "Café"],
    sources: ["World Health Organization", "Journal of Hematology"]
  },

  melatonin: {
    id: "melatonin",
    name: "Mélatonine",
    scientificName: "N-acétyl-5-méthoxytryptamine",
    benefits: ["Amélioration du sommeil", "Régulation du cycle circadien", "Soutien immunitaire"],
    timeToEffect: "30 minutes à 2 heures",
    scienceScore: 7,
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    scientificBasis: "Hormone naturellement produite par la glande pinéale qui régule le cycle sommeil-éveil",
    description: "Hormone du sommeil qui aide à réguler le cycle circadien et facilite l'endormissement",
    contraindications: ["Maladies auto-immunes", "Grossesse"],
    dosageStandard: "0.5-5mg avant le coucher",
    dosageVegetarian: "0.5-5mg avant le coucher",
    sideEffects: ["Somnolence matinale", "Maux de tête"],
    interactions: ["Anticoagulants", "Immunosuppresseurs"],
    sources: ["Sleep Foundation", "Journal of Sleep Research"]
  },

  l_theanine: {
    id: "l_theanine",
    name: "L-Théanine",
    scientificName: "γ-glutamyléthylamide",
    benefits: ["Relaxation sans somnolence", "Focus mental", "Réduction du stress"],
    timeToEffect: "30-60 minutes",
    scienceScore: 7,
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    scientificBasis: "Acide aminé qui augmente les ondes alpha cérébrales associées à la relaxation alerte",
    description: "Acide aminé présent dans le thé vert, connu pour ses effets apaisants sans sédation",
    contraindications: ["Pression artérielle basse"],
    dosageStandard: "100-400mg par jour",
    dosageVegetarian: "100-400mg par jour",
    sideEffects: ["Rares aux doses recommandées"],
    interactions: ["Médicaments hypertenseurs"],
    sources: ["Journal of Functional Foods", "Asia Pacific Journal of Clinical Nutrition"]
  },

  rhodiola: {
    id: "rhodiola",
    name: "Rhodiola Rosea",
    scientificName: "Rhodiola rosea",
    benefits: ["Adaptation au stress", "Énergie mentale", "Performance cognitive"],
    timeToEffect: "1-3 semaines",
    scienceScore: 7,
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    scientificBasis: "Adaptogène qui module les niveaux de cortisol et optimise l'utilisation de l'énergie",
    description: "Plante adaptogène qui aide l'organisme à s'adapter au stress physique et mental",
    contraindications: ["Trouble bipolaire"],
    dosageStandard: "200-600mg d'extrait par jour",
    dosageVegetarian: "200-600mg d'extrait par jour",
    sideEffects: ["Bouche sèche", "Vertiges à forte dose"],
    interactions: ["Antidépresseurs"],
    sources: ["Phytomedicine Journal", "Journal of Ethnopharmacology"]
  },

  coq10: {
    id: "coq10",
    name: "CoQ10",
    scientificName: "Ubiquinone/Ubiquinol",
    benefits: ["Production d'énergie cellulaire", "Santé cardiovasculaire", "Antioxydant"],
    timeToEffect: "2-8 semaines",
    scienceScore: 7,
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    scientificBasis: "Coenzyme impliquée dans la production d'ATP dans les mitochondries",
    description: "Coenzyme essentielle à la production d'énergie au niveau cellulaire",
    contraindications: ["Précaution avec anticoagulants"],
    dosageStandard: "100-300mg par jour",
    dosageVegetarian: "100-300mg par jour",
    sideEffects: ["Troubles digestifs légers"],
    interactions: ["Statines", "Anticoagulants"],
    sources: ["Mayo Clinic Proceedings", "Journal of the American College of Cardiology"]
  },

  bacopa: {
    id: "bacopa",
    name: "Bacopa Monnieri",
    scientificName: "Bacopa monnieri",
    benefits: ["Fonction cognitive", "Mémoire", "Résistance au stress"],
    timeToEffect: "4-12 semaines",
    scienceScore: 6,
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    scientificBasis: "Adaptogène nootropique qui soutient la neurotransmission et la plasticité synaptique",
    description: "Plante ayurvédique traditionnelle utilisée pour améliorer la mémoire et les fonctions cognitives",
    contraindications: ["Bradycardie"],
    dosageStandard: "300-600mg d'extrait par jour",
    dosageVegetarian: "300-600mg d'extrait par jour",
    sideEffects: ["Nausées", "Crampes d'estomac"],
    interactions: ["Médicaments thyroïdiens", "Médicaments anticholinergiques"],
    sources: ["Journal of Ethnopharmacology", "Neuropsychopharmacology"]
  },

  ginkgo: {
    id: "ginkgo",
    name: "Ginkgo Biloba",
    scientificName: "Ginkgo biloba",
    benefits: ["Circulation cérébrale", "Mémoire", "Fonctions cognitives"],
    timeToEffect: "4-6 semaines",
    scienceScore: 6,
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    scientificBasis: "Améliore la microcirculation cérébrale et possède des propriétés antioxydantes",
    description: "Extrait d'arbre ancien connu pour ses effets sur la circulation sanguine et la cognition",
    contraindications: ["Troubles de coagulation", "Épilepsie"],
    dosageStandard: "120-240mg d'extrait par jour",
    dosageVegetarian: "120-240mg d'extrait par jour",
    sideEffects: ["Maux de tête", "Troubles digestifs"],
    interactions: ["Anticoagulants", "Antiplaquettaires"],
    sources: ["Cochrane Database of Systematic Reviews", "Pharmacological Research"]
  },

  digestive_enzymes: {
    id: "digestive_enzymes",
    name: "Enzymes Digestives",
    scientificName: "Amylase, Protéase, Lipase",
    benefits: ["Digestion améliorée", "Absorption des nutriments", "Réduction des ballonnements"],
    timeToEffect: "Immédiat à 2 semaines",
    scienceScore: 6,
    vegetarian: true,
    vegan: false, // Certaines formules contiennent des enzymes d'origine animale
    glutenFree: true,
    dairyFree: true,
    scientificBasis: "Enzymes qui facilitent la décomposition des macronutriments pour une meilleure absorption",
    description: "Mélange d'enzymes qui aident à décomposer les aliments et à faciliter la digestion",
    contraindications: ["Pancréatite aiguë"],
    dosageStandard: "Selon la formulation, généralement avec les repas",
    sideEffects: ["Rares aux doses recommandées"],
    interactions: ["Médicaments pour le diabète"],
    sources: ["World Journal of Gastroenterology", "Digestive Diseases and Sciences"]
  },

  digestive_enzymes_vegan: {
    id: "digestive_enzymes_vegan",
    name: "Enzymes Digestives Véganes",
    scientificName: "Enzymes d'origine végétale/fongique",
    benefits: ["Digestion améliorée", "Absorption des nutriments", "Réduction des ballonnements"],
    timeToEffect: "Immédiat à 2 semaines",
    scienceScore: 6,
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    scientificBasis: "Enzymes d'origine végétale ou fongique qui facilitent la digestion",
    description: "Version végane d'enzymes digestives, généralement dérivées de fruits ou champignons",
    contraindications: ["Pancréatite aiguë"],
    dosageStandard: "Selon la formulation, généralement avec les repas",
    dosageVegetarian: "Selon la formulation, généralement avec les repas",
    sideEffects: ["Rares aux doses recommandées"],
    interactions: ["Médicaments pour le diabète"],
    sources: ["Plant-Based Journal of Nutrition", "Alternative Therapies in Health and Medicine"]
  },

  fiber_complex: {
    id: "fiber_complex",
    name: "Complexe de Fibres",
    scientificName: "Fibres solubles et insolubles",
    benefits: ["Santé digestive", "Satiété", "Régulation glycémique"],
    timeToEffect: "1-3 semaines",
    scienceScore: 8,
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    scientificBasis: "Mélange de fibres solubles et insolubles qui soutiennent le microbiome et la motilité intestinale",
    description: "Mélange de différents types de fibres pour une santé digestive optimale",
    contraindications: ["Obstruction intestinale"],
    dosageStandard: "5-15g par jour",
    dosageVegetarian: "5-15g par jour",
    sideEffects: ["Ballonnements initiaux", "Flatulences"],
    interactions: ["Certains médicaments oraux (prendre à distance)"],
    sources: ["American Journal of Clinical Nutrition", "Gut Microbiome Research"]
  },

  vitamin_c: {
    id: "vitamin_c",
    name: "Vitamine C",
    scientificName: "Acide ascorbique",
    benefits: ["Fonction immunitaire", "Production de collagène", "Antioxydant"],
    timeToEffect: "1-4 semaines",
    scienceScore: 8,
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    scientificBasis: "Antioxydant essentiel impliqué dans la synthèse du collagène et la fonction immunitaire",
    description: "Vitamine essentielle et puissant antioxydant soutenant le système immunitaire",
    contraindications: ["Antécédents de calculs rénaux d'oxalate"],
    dosageStandard: "500-1000mg par jour",
    dosageVegetarian: "500-1000mg par jour",
    sideEffects: ["Troubles digestifs à forte dose"],
    interactions: ["Anticoagulants", "Statines"],
    sources: ["Cochrane Database", "Journal of Clinical Medicine"]
  },

  turmeric: {
    id: "turmeric",
    name: "Curcuma",
    scientificName: "Curcuma longa",
    benefits: ["Anti-inflammatoire", "Fonction cognitive", "Santé digestive"],
    timeToEffect: "2-8 semaines",
    scienceScore: 7,
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    scientificBasis: "Contient la curcumine, un polyphénol aux propriétés anti-inflammatoires puissantes",
    description: "Épice aux puissantes propriétés anti-inflammatoires et antioxydantes",
    contraindications: ["Calculs biliaires", "Obstruction des voies biliaires"],
    dosageStandard: "500-1500mg d'extrait par jour (avec 95% de curcuminoïdes)",
    dosageVegetarian: "500-1500mg d'extrait par jour (avec 95% de curcuminoïdes)",
    sideEffects: ["Troubles digestifs légers"],
    interactions: ["Anticoagulants", "Antiplaquettaires"],
    sources: ["Journal of Medicinal Food", "Advances in Experimental Medicine and Biology"]
  },

  choline: {
    id: "choline",
    name: "Choline",
    scientificName: "Choline bitartrate/citicoline",
    benefits: ["Fonction cognitive", "Synthèse des neurotransmetteurs", "Santé hépatique"],
    timeToEffect: "2-8 semaines",
    scienceScore: 7,
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    scientificBasis: "Précurseur de l'acétylcholine, neurotransmetteur essentiel à la mémoire et à la cognition",
    description: "Nutriment essentiel pour la santé du cerveau et la fonction cognitive",
    contraindications: ["Maladie de Parkinson (hautes doses)"],
    dosageStandard: "250-500mg par jour",
    dosageVegetarian: "250-500mg par jour",
    sideEffects: ["Odeur corporelle de poisson à forte dose"],
    interactions: ["Médicaments métabolisés par le foie"],
    sources: ["Nutrition Reviews", "Journal of Neurochemistry"]
  },

  adaptogens_complex: {
    id: "adaptogens_complex",
    name: "Complexe Adaptogène",
    scientificName: "Mélange d'adaptogènes",
    benefits: ["Résistance au stress", "Équilibre hormonal", "Énergie"],
    timeToEffect: "2-8 semaines",
    scienceScore: 6,
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    scientificBasis: "Combinaison de plantes adaptogènes qui aident à équilibrer les systèmes de réponse au stress",
    description: "Mélange synergique de plantes adaptogènes pour une résilience optimale au stress",
    contraindications: ["Certaines maladies auto-immunes"],
    dosageStandard: "Varie selon la formulation",
    dosageVegetarian: "Varie selon la formulation",
    sideEffects: ["Varie selon les ingrédients spécifiques"],
    interactions: ["Médicaments hormonaux", "Psychotropes"],
    sources: ["Pharmaceuticals Journal", "Phytotherapy Research"]
  }
};