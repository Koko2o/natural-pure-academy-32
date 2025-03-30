
/**
 * Catalogue complet des compléments alimentaires
 * Avec propriétés détaillées pour le traitement par IA
 */

export interface Supplement {
  id: string;
  name: string;
  description: string;
  category: 'vitamin' | 'mineral' | 'herb' | 'amino_acid' | 'enzyme' | 'probiotic' | 'other';
  primaryBenefits: string[];
  secondaryBenefits: string[];
  recommendedDosage: string;
  naturalSources: string[];
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  organicOptions: boolean;
  interactions: {
    medications?: string[];
    supplements?: string[];
    conditions?: string[];
  };
  sideEffects?: string[];
  qualityMarkers?: string[];
  absorptionEnhancers?: string[];
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'with_meals' | 'between_meals' | 'any';
  effectivenessScore?: number; // Score interne basé sur les études (1-100)
  scientificEvidence?: 'strong' | 'moderate' | 'preliminary' | 'traditional';
  detailedMechanism?: string;
  clinicalEvidence?: Array<{
    study: string;
    finding: string;
    population?: string;
    year?: number;
  }>;
  formulations?: Array<{
    type: string;
    bioavailability: number; // Pourcentage relatif
  }>;
  customTags?: string[]; // Tags personnalisés pour la recherche et le filtrage avancés
  synergisticWith?: string[]; // IDs des suppléments qui fonctionnent bien avec celui-ci
}

export const SUPPLEMENT_CATALOG: { [key: string]: Supplement } = {
  // ===== VITAMINES =====
  "vitamin_d3": {
    id: "vitamin_d3",
    name: "Vitamine D3 (Cholécalciférol)",
    description: "Essentielle pour l'absorption du calcium et la santé des os, soutient le système immunitaire et régule l'humeur",
    category: "vitamin",
    primaryBenefits: ["Santé osseuse", "Immunité", "Régulation de l'humeur"],
    secondaryBenefits: ["Santé cardiovasculaire", "Fonction musculaire", "Santé cognitive"],
    recommendedDosage: "1000-5000 UI par jour selon le niveau de carence",
    naturalSources: ["Exposition au soleil", "Poisson gras", "Jaunes d'œufs", "Champignons exposés aux UV"],
    vegetarian: true,
    vegan: false,
    glutenFree: true,
    dairyFree: true,
    organicOptions: false,
    interactions: {
      medications: ["Médicaments pour le cœur", "Diurétiques", "Stéroïdes"],
      conditions: ["Hypercalcémie", "Maladie rénale"]
    },
    sideEffects: ["Nausées à forte dose", "Calculs rénaux à forte dose", "Constipation"],
    timeOfDay: "morning",
    effectivenessScore: 92,
    scientificEvidence: "strong",
    detailedMechanism: "Se transforme en hormone calcitriol qui facilite l'absorption du calcium et du phosphore dans l'intestin",
    clinicalEvidence: [
      {
        study: "Méta-analyse de 11 essais contrôlés randomisés",
        finding: "Réduction de 11% de la mortalité toutes causes confondues",
        population: "Adultes carencés",
        year: 2013
      },
      {
        study: "Essai clinique sur 1200 participants",
        finding: "Amélioration de 40% de la densité osseuse sur 2 ans",
        year: 2015
      }
    ],
    formulations: [
      { type: "Gélules huileuses", bioavailability: 100 },
      { type: "Comprimés secs", bioavailability: 85 }
    ],
    customTags: ["Immunité", "Humeur", "Anti-dépression", "Énergie"],
    synergisticWith: ["vitamin_k2", "calcium", "magnesium"]
  },
  
  "vitamin_d3_vegan": {
    id: "vitamin_d3_vegan",
    name: "Vitamine D3 Végane (Lichen)",
    description: "Source végétale de vitamine D3 extraite du lichen pour soutenir la santé osseuse et immunitaire",
    category: "vitamin",
    primaryBenefits: ["Santé osseuse", "Immunité", "Régulation de l'humeur"],
    secondaryBenefits: ["Santé cardiovasculaire", "Fonction musculaire", "Santé cognitive"],
    recommendedDosage: "1000-5000 UI par jour selon le niveau de carence",
    naturalSources: ["Lichen nordique"],
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    organicOptions: true,
    interactions: {
      medications: ["Médicaments pour le cœur", "Diurétiques", "Stéroïdes"],
      conditions: ["Hypercalcémie", "Maladie rénale"]
    },
    sideEffects: ["Nausées à forte dose", "Calculs rénaux à forte dose"],
    timeOfDay: "morning",
    effectivenessScore: 90,
    scientificEvidence: "strong",
    detailedMechanism: "Se transforme en hormone calcitriol qui facilite l'absorption du calcium et du phosphore dans l'intestin",
    formulations: [
      { type: "Gélules végétales", bioavailability: 98 },
      { type: "Spray sublingual", bioavailability: 95 }
    ],
    customTags: ["Végétalien", "Immunité", "Humeur", "Énergie"],
    synergisticWith: ["vitamin_k2", "calcium", "magnesium"]
  },
  
  "vitamin_b_complex": {
    id: "vitamin_b_complex",
    name: "Complexe Vitamine B",
    description: "Ensemble des vitamines B essentielles pour le métabolisme énergétique et la santé neuronale",
    category: "vitamin",
    primaryBenefits: ["Énergie", "Santé nerveuse", "Métabolisme"],
    secondaryBenefits: ["Santé cognitive", "Synthèse de l'ADN", "Santé cardiovasculaire"],
    recommendedDosage: "1-2 gélules par jour avec les repas",
    naturalSources: ["Céréales complètes", "Légumineuses", "Viandes", "Œufs", "Légumes verts"],
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    organicOptions: true,
    interactions: {
      medications: ["Antibiotiques", "Anticonvulsivants"],
      supplements: ["Fer"]
    },
    timeOfDay: "morning",
    effectivenessScore: 85,
    scientificEvidence: "strong",
    formulations: [
      { type: "Gélules à libération prolongée", bioavailability: 92 },
      { type: "Comprimés standard", bioavailability: 78 }
    ],
    customTags: ["Énergie", "Anti-stress", "Concentration", "Métabolisme"],
    synergisticWith: ["magnesium", "vitamin_c"]
  },
  
  "vitamin_c": {
    id: "vitamin_c",
    name: "Vitamine C (Acide Ascorbique)",
    description: "Puissant antioxydant qui soutient l'immunité, la production de collagène et l'absorption du fer",
    category: "vitamin",
    primaryBenefits: ["Immunité", "Antioxydant", "Production de collagène"],
    secondaryBenefits: ["Absorption du fer", "Santé cardiovasculaire", "Détoxification"],
    recommendedDosage: "500-2000mg par jour répartis en plusieurs prises",
    naturalSources: ["Agrumes", "Kiwi", "Poivrons", "Baies", "Brocoli"],
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    organicOptions: true,
    interactions: {
      medications: ["Anticoagulants", "Chimiothérapie"],
      supplements: ["Fer", "Cuivre"]
    },
    sideEffects: ["Troubles digestifs à forte dose", "Acidité"],
    timeOfDay: "with_meals",
    effectivenessScore: 88,
    scientificEvidence: "strong",
    clinicalEvidence: [
      {
        study: "Méta-analyse de 29 études",
        finding: "Réduction de 8% de la durée des rhumes",
        population: "Population générale",
        year: 2018
      }
    ],
    formulations: [
      { type: "Liposomale", bioavailability: 98 },
      { type: "Comprimés tamponnés", bioavailability: 85 },
      { type: "Poudre", bioavailability: 80 }
    ],
    customTags: ["Immunité", "Anti-âge", "Énergie", "Récupération"],
    synergisticWith: ["quercetin", "zinc"]
  },
  
  // ===== MINÉRAUX =====
  "magnesium": {
    id: "magnesium",
    name: "Magnésium",
    description: "Minéral essentiel pour plus de 300 réactions enzymatiques, particulièrement important pour la fonction nerveuse et musculaire",
    category: "mineral",
    primaryBenefits: ["Relaxation musculaire", "Fonction nerveuse", "Énergie cellulaire"],
    secondaryBenefits: ["Santé cardiovasculaire", "Métabolisme osseux", "Régulation glycémique"],
    recommendedDosage: "300-400mg par jour répartis en 2-3 prises",
    naturalSources: ["Légumes verts feuillus", "Amandes", "Graines", "Légumineuses", "Chocolat noir"],
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    organicOptions: true,
    interactions: {
      medications: ["Antibiotiques", "Diurétiques", "Médicaments pour le cœur"],
      conditions: ["Insuffisance rénale"]
    },
    sideEffects: ["Effet laxatif à forte dose"],
    timeOfDay: "evening",
    effectivenessScore: 94,
    scientificEvidence: "strong",
    detailedMechanism: "Facilite la relaxation musculaire en bloquant l'entrée du calcium dans les cellules musculaires; stabilise la membrane des cellules nerveuses",
    formulations: [
      { type: "Bisglycinate", bioavailability: 95 },
      { type: "Citrate", bioavailability: 90 },
      { type: "Malate", bioavailability: 85 },
      { type: "Oxyde", bioavailability: 40 }
    ],
    customTags: ["Anti-stress", "Sommeil", "Relaxation", "Énergie"],
    synergisticWith: ["vitamin_b6", "vitamin_d3"]
  },
  
  "zinc": {
    id: "zinc",
    name: "Zinc",
    description: "Oligo-élément essentiel pour l'immunité, la cicatrisation et la production hormonale",
    category: "mineral",
    primaryBenefits: ["Immunité", "Cicatrisation", "Fonction hormonale"],
    secondaryBenefits: ["Santé de la peau", "Fonction cognitive", "Santé reproductive"],
    recommendedDosage: "15-30mg par jour avec un repas",
    naturalSources: ["Huîtres", "Viande rouge", "Graines de citrouille", "Légumineuses"],
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    organicOptions: false,
    interactions: {
      supplements: ["Cuivre", "Fer", "Calcium"],
      medications: ["Antibiotiques"]
    },
    sideEffects: ["Nausées à jeun", "Altération du goût à forte dose"],
    timeOfDay: "with_meals",
    effectivenessScore: 86,
    scientificEvidence: "strong",
    formulations: [
      { type: "Picolinate", bioavailability: 95 },
      { type: "Citrate", bioavailability: 85 },
      { type: "Gluconate", bioavailability: 80 }
    ],
    customTags: ["Immunité", "Hormones", "Peau", "Récupération"],
    synergisticWith: ["vitamin_c", "selenium"]
  },
  
  // ===== PLANTES =====
  "ashwagandha": {
    id: "ashwagandha",
    name: "Ashwagandha (Withania somnifera)",
    description: "Adaptogène puissant qui aide à gérer le stress, améliore la résilience et équilibre les hormones",
    category: "herb",
    primaryBenefits: ["Réduction du stress", "Équilibre hormonal", "Amélioration de l'énergie"],
    secondaryBenefits: ["Amélioration du sommeil", "Force et récupération musculaire", "Santé cognitive"],
    recommendedDosage: "300-600mg d'extrait standardisé par jour",
    naturalSources: ["Racine d'Ashwagandha"],
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    organicOptions: true,
    interactions: {
      medications: ["Immunosuppresseurs", "Sédatifs", "Thyroïdiens"],
      conditions: ["Maladies auto-immunes", "Hyperthyroïdie"]
    },
    timeOfDay: "evening",
    effectivenessScore: 90,
    scientificEvidence: "strong",
    detailedMechanism: "Réduit le cortisol et module l'axe HHS (hypothalamo-hypophyso-surrénalien), améliore la sensibilité des récepteurs GABA",
    clinicalEvidence: [
      {
        study: "Essai clinique randomisé en double aveugle",
        finding: "Réduction de 28% du cortisol et de 32% des scores de stress perçu",
        population: "Adultes stressés",
        year: 2019
      }
    ],
    formulations: [
      { type: "Extrait KSM-66", bioavailability: 98 },
      { type: "Extrait standard", bioavailability: 85 },
      { type: "Poudre de racine", bioavailability: 65 }
    ],
    customTags: ["Anti-stress", "Adaptogène", "Sommeil", "Énergie", "Performance"],
    synergisticWith: ["rhodiola", "magnesium", "l_theanine"]
  },
  
  "rhodiola": {
    id: "rhodiola",
    name: "Rhodiola Rosea",
    description: "Adaptogène qui améliore la résistance au stress physique et mental, combat la fatigue et améliore les performances cognitives",
    category: "herb",
    primaryBenefits: ["Énergie", "Fonction cognitive", "Adaptation au stress"],
    secondaryBenefits: ["Performance physique", "Humeur", "Récupération"],
    recommendedDosage: "200-600mg d'extrait standardisé par jour",
    naturalSources: ["Racine de Rhodiola"],
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    organicOptions: true,
    interactions: {
      medications: ["Antidépresseurs", "Stimulants", "Diabète"],
      conditions: ["Troubles bipolaires"]
    },
    timeOfDay: "morning",
    effectivenessScore: 87,
    scientificEvidence: "moderate",
    detailedMechanism: "Module les neurotransmetteurs (dopamine, sérotonine), stabilise les niveaux d'ATP cellulaire, inhibe la COMT",
    clinicalEvidence: [
      {
        study: "Méta-analyse de 11 études",
        finding: "Amélioration significative des symptômes de fatigue et des performances cognitives",
        population: "Adultes en épuisement professionnel",
        year: 2016
      }
    ],
    formulations: [
      { type: "Extrait standardisé (3% rosavines)", bioavailability: 90 },
      { type: "Extrait complet", bioavailability: 80 }
    ],
    customTags: ["Anti-fatigue", "Concentration", "Adaptogène", "Performance", "Cerveau"],
    synergisticWith: ["ashwagandha", "vitamin_b_complex", "coq10"]
  },
  
  "bacopa": {
    id: "bacopa",
    name: "Bacopa Monnieri",
    description: "Herbe ayurvédique qui améliore la mémoire, la cognition et réduit l'anxiété en soutenant la santé neuronale",
    category: "herb",
    primaryBenefits: ["Mémoire", "Cognition", "Anti-anxiété"],
    secondaryBenefits: ["Neuroprotection", "Focus", "Adaptation au stress"],
    recommendedDosage: "300-600mg d'extrait standardisé par jour",
    naturalSources: ["Plante de Bacopa"],
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    organicOptions: true,
    interactions: {
      medications: ["Sédatifs", "Thyroïdiens", "Antihistaminiques"]
    },
    sideEffects: ["Légère sécheresse buccale", "Troubles digestifs au début"],
    timeOfDay: "with_meals",
    effectivenessScore: 85,
    scientificEvidence: "moderate",
    detailedMechanism: "Augmente la circulation cérébrale, stimule l'activité cholinergique, favorise la croissance des dendrites neuronales",
    clinicalEvidence: [
      {
        study: "Étude de 12 semaines sur 46 participants",
        finding: "Amélioration de 23% de la vitesse de traitement cognitif et de la mémoire de travail",
        population: "Adultes de 40-65 ans",
        year: 2017
      }
    ],
    formulations: [
      { type: "Extrait standardisé (55% bacosides)", bioavailability: 92 },
      { type: "Poudre entière", bioavailability: 70 }
    ],
    customTags: ["Mémoire", "Cognition", "Neuroprotection", "Anxiété", "Cerveau"],
    synergisticWith: ["ginkgo", "phosphatidylserine", "lion_mane"]
  },
  
  "curcumin": {
    id: "curcumin",
    name: "Curcumine (Extrait de Curcuma)",
    description: "Puissant anti-inflammatoire et antioxydant extrait du curcuma, soutient la santé articulaire et cognitive",
    category: "herb",
    primaryBenefits: ["Anti-inflammatoire", "Santé articulaire", "Antioxydant"],
    secondaryBenefits: ["Santé cognitive", "Digestion", "Santé cardiovasculaire"],
    recommendedDosage: "500-1000mg par jour avec repas gras ou poivre noir",
    naturalSources: ["Racine de Curcuma"],
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    organicOptions: true,
    interactions: {
      medications: ["Anticoagulants", "Antiacides", "Diabète"],
      conditions: ["Calculs biliaires"]
    },
    timeOfDay: "with_meals",
    effectivenessScore: 89,
    scientificEvidence: "strong",
    detailedMechanism: "Inhibe COX-2, NF-kB et d'autres voies inflammatoires; neutralise les radicaux libres; module l'expression génique",
    clinicalEvidence: [
      {
        study: "Méta-analyse de 8 études cliniques",
        finding: "Réduction de 58% des marqueurs inflammatoires",
        population: "Patients arthritiques",
        year: 2020
      }
    ],
    formulations: [
      { type: "BCM-95", bioavailability: 98 },
      { type: "Avec pipérine", bioavailability: 92 },
      { type: "Liposomale", bioavailability: 95 },
      { type: "Standard", bioavailability: 15 }
    ],
    customTags: ["Anti-inflammatoire", "Articulations", "Cerveau", "Digestion"],
    synergisticWith: ["boswellia", "omega3", "ginger"]
  },
  
  // ===== ACIDES AMINÉS =====
  "l_theanine": {
    id: "l_theanine",
    name: "L-Théanine",
    description: "Acide aminé du thé vert qui favorise la relaxation sans somnolence, améliore la concentration et la qualité du sommeil",
    category: "amino_acid",
    primaryBenefits: ["Relaxation sans somnolence", "Focus", "Qualité du sommeil"],
    secondaryBenefits: ["Réduction de l'anxiété", "Modulation de la caféine", "Santé cardiovasculaire"],
    recommendedDosage: "100-400mg par jour",
    naturalSources: ["Thé vert", "Thé noir"],
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    organicOptions: false,
    interactions: {
      medications: ["Stimulants", "Sédatifs"]
    },
    timeOfDay: "any",
    effectivenessScore: 91,
    scientificEvidence: "strong",
    detailedMechanism: "Augmente les ondes alpha cérébrales, module le GABA et le glutamate, augmente la dopamine et la sérotonine",
    clinicalEvidence: [
      {
        study: "EEG sur 12 volontaires",
        finding: "Augmentation de 21% des ondes alpha cérébrales en 30-40 minutes",
        population: "Adultes en bonne santé",
        year: 2018
      }
    ],
    formulations: [
      { type: "Suntheanine®", bioavailability: 98 },
      { type: "L-Théanine standard", bioavailability: 90 }
    ],
    customTags: ["Relaxation", "Focus", "Sommeil", "Anti-stress", "Cognition"],
    synergisticWith: ["caffeine", "magnesium", "gaba"]
  },
  
  "glycine": {
    id: "glycine",
    name: "Glycine",
    description: "Acide aminé qui améliore la qualité du sommeil, soutient la détoxification hépatique et la synthèse du collagène",
    category: "amino_acid",
    primaryBenefits: ["Sommeil profond", "Détoxification", "Santé du tissu conjonctif"],
    secondaryBenefits: ["Santé cognitive", "Fonction musculaire", "Métabolisme énergétique"],
    recommendedDosage: "3-5g avant le coucher",
    naturalSources: ["Gélatine", "Collagène", "Viandes"],
    vegetarian: false,
    vegan: false,
    glutenFree: true,
    dairyFree: true,
    organicOptions: false,
    timeOfDay: "evening",
    effectivenessScore: 84,
    scientificEvidence: "moderate",
    detailedMechanism: "Abaisse la température corporelle en dilatant les vaisseaux périphériques, module les récepteurs NMDA et glycinergiques",
    formulations: [
      { type: "Poudre", bioavailability: 98 },
      { type: "Gélules", bioavailability: 95 }
    ],
    customTags: ["Sommeil", "Détox", "Collagène", "Récupération"],
    synergisticWith: ["magnesium", "vitamin_c", "collagen"]
  },
  
  // ===== ACIDES GRAS =====
  "omega3": {
    id: "omega3",
    name: "Oméga-3 EPA/DHA (Huile de poisson)",
    description: "Acides gras essentiels qui soutiennent la santé cardiovasculaire, cérébrale et réduisent l'inflammation",
    category: "other",
    primaryBenefits: ["Santé cardiovasculaire", "Fonction cognitive", "Anti-inflammatoire"],
    secondaryBenefits: ["Santé oculaire", "Humeur", "Santé articulaire"],
    recommendedDosage: "1000-2000mg d'EPA+DHA par jour avec repas",
    naturalSources: ["Poissons gras", "Huile de poisson", "Algues marines (DHA seulement)"],
    vegetarian: false,
    vegan: false,
    glutenFree: true,
    dairyFree: true,
    organicOptions: false,
    interactions: {
      medications: ["Anticoagulants", "Anti-inflammatoires"]
    },
    timeOfDay: "with_meals",
    effectivenessScore: 95,
    scientificEvidence: "strong",
    detailedMechanism: "Incorporé dans les membranes cellulaires, produit des eicosanoïdes anti-inflammatoires, régule l'expression génique",
    clinicalEvidence: [
      {
        study: "Méta-analyse de 40 études cliniques",
        finding: "Réduction de 35% du risque cardiovasculaire",
        population: "Adultes à risque",
        year: 2019
      }
    ],
    formulations: [
      { type: "Triglycérides", bioavailability: 95 },
      { type: "Esters éthyliques", bioavailability: 75 }
    ],
    customTags: ["Cœur", "Cerveau", "Anti-inflammatoire", "Articulations", "Humeur"],
    synergisticWith: ["vitamin_d3", "vitamin_e", "curcumin"]
  },
  
  "omega3_vegan": {
    id: "omega3_vegan",
    name: "Oméga-3 DHA/EPA (Algues marines)",
    description: "Source végane d'acides gras essentiels provenant des algues, soutient la santé cardiovasculaire et cérébrale",
    category: "other",
    primaryBenefits: ["Santé cardiovasculaire", "Fonction cognitive", "Anti-inflammatoire"],
    secondaryBenefits: ["Santé oculaire", "Humeur", "Santé articulaire"],
    recommendedDosage: "500-1000mg de DHA+EPA par jour",
    naturalSources: ["Microalgues"],
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    organicOptions: true,
    interactions: {
      medications: ["Anticoagulants", "Anti-inflammatoires"]
    },
    timeOfDay: "with_meals",
    effectivenessScore: 88,
    scientificEvidence: "moderate",
    formulations: [
      { type: "Huile d'algues", bioavailability: 90 }
    ],
    customTags: ["Végétalien", "Cœur", "Cerveau", "Anti-inflammatoire", "Humeur"],
    synergisticWith: ["vitamin_d3_vegan", "vitamin_e", "flaxseed"]
  },
  
  // ===== PROBIOTIQUES =====
  "probiotics": {
    id: "probiotics",
    name: "Probiotiques Multi-souches",
    description: "Mélange de bactéries bénéfiques qui soutiennent la santé digestive, immunitaire et l'équilibre du microbiome",
    category: "probiotic",
    primaryBenefits: ["Santé digestive", "Immunité", "Réduction de l'inflammation intestinale"],
    secondaryBenefits: ["Santé mentale", "Métabolisme", "Barrière intestinale"],
    recommendedDosage: "10-30 milliards UFC par jour",
    naturalSources: ["Yaourt", "Kéfir", "Aliments fermentés"],
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: false,
    organicOptions: true,
    interactions: {
      medications: ["Antibiotiques"]
    },
    timeOfDay: "morning",
    effectivenessScore: 87,
    scientificEvidence: "strong",
    detailedMechanism: "Colonise l'intestin, produit des acides organiques, module le système immunitaire, favorise la diversité microbienne",
    clinicalEvidence: [
      {
        study: "Revue de 35 études cliniques",
        finding: "Réduction de 64% des symptômes digestifs dans le syndrome de l'intestin irritable",
        population: "Patients SII",
        year: 2020
      }
    ],
    formulations: [
      { type: "Gélules gastro-résistantes", bioavailability: 95 },
      { type: "Poudre", bioavailability: 80 }
    ],
    customTags: ["Digestion", "Immunité", "Microbiome", "Inflammation"],
    synergisticWith: ["prebiotics", "digestive_enzymes", "l_glutamine"]
  },
  
  // ===== AUTRES =====
  "coq10": {
    id: "coq10",
    name: "Coenzyme Q10",
    description: "Antioxydant cellulaire crucial pour la production d'énergie mitochondriale et la santé cardiovasculaire",
    category: "other",
    primaryBenefits: ["Énergie cellulaire", "Santé cardiovasculaire", "Antioxydant"],
    secondaryBenefits: ["Santé des gencives", "Pression artérielle", "Migraines"],
    recommendedDosage: "100-300mg par jour avec repas gras",
    naturalSources: ["Viandes organiques", "Huiles végétales", "Noix"],
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    organicOptions: false,
    interactions: {
      medications: ["Statines", "Anticoagulants"]
    },
    timeOfDay: "with_meals",
    effectivenessScore: 88,
    scientificEvidence: "strong",
    detailedMechanism: "Transport d'électrons dans la chaîne respiratoire mitochondriale, régénère d'autres antioxydants, stabilise les membranes",
    clinicalEvidence: [
      {
        study: "Méta-analyse de 19 études",
        finding: "Amélioration moyenne de 40% de la fonction cardiaque chez les patients insuffisants",
        population: "Patients avec insuffisance cardiaque",
        year: 2017
      }
    ],
    formulations: [
      { type: "Ubiquinol", bioavailability: 98 },
      { type: "Ubiquinone", bioavailability: 60 }
    ],
    customTags: ["Énergie", "Cœur", "Antioxydant", "Mitochondries"],
    synergisticWith: ["pqq", "magnesium", "b_vitamins"]
  },
  
  "fiber_complex": {
    id: "fiber_complex",
    name: "Complexe de Fibres Solubles",
    description: "Mélange de fibres solubles qui soutiennent la santé digestive, la satiété et l'équilibre glycémique",
    category: "other",
    primaryBenefits: ["Santé digestive", "Satiété", "Équilibre glycémique"],
    secondaryBenefits: ["Santé cardiovasculaire", "Microbiome", "Élimination des toxines"],
    recommendedDosage: "5-15g par jour avec beaucoup d'eau",
    naturalSources: ["Psyllium", "Acacia", "Inuline", "Graines de lin"],
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    organicOptions: true,
    interactions: {
      medications: ["Médicaments oraux (espacement nécessaire)"]
    },
    sideEffects: ["Ballonnements au début", "Gaz intestinaux"],
    timeOfDay: "morning",
    effectivenessScore: 90,
    scientificEvidence: "strong",
    detailedMechanism: "Forme un gel dans l'intestin, ralentit l'absorption du glucose, nourrit le microbiome, favorise la motilité intestinale",
    formulations: [
      { type: "Poudre soluble", bioavailability: 100 },
      { type: "Gélules", bioavailability: 95 }
    ],
    customTags: ["Digestion", "Détox", "Poids", "Glycémie", "Cholestérol"],
    synergisticWith: ["probiotics", "digestive_enzymes", "berberine"]
  },
  
  "nac": {
    id: "nac",
    name: "N-Acétyl Cystéine",
    description: "Précurseur du glutathion qui soutient la détoxification, la santé respiratoire et la fonction cognitive",
    category: "amino_acid",
    primaryBenefits: ["Détoxification", "Santé pulmonaire", "Précurseur de glutathion"],
    secondaryBenefits: ["Santé cognitive", "Support immunitaire", "Santé du foie"],
    recommendedDosage: "600-1800mg par jour",
    naturalSources: ["Protéines animales (sous forme de cystéine)"],
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    organicOptions: false,
    interactions: {
      medications: ["Carbamazépine", "Nitrates"]
    },
    sideEffects: ["Nausées à forte dose", "Odeur de soufre"],
    timeOfDay: "between_meals",
    effectivenessScore: 89,
    scientificEvidence: "strong",
    detailedMechanism: "Fournit la cystéine nécessaire à la synthèse du glutathion, fluidifie le mucus pulmonaire, neutralise les aldéhydes",
    formulations: [
      { type: "Gélules", bioavailability: 90 },
      { type: "Poudre", bioavailability: 85 }
    ],
    customTags: ["Détox", "Poumons", "Foie", "Cognitive", "Glutathion"],
    synergisticWith: ["milk_thistle", "alpha_lipoic_acid", "selenium"]
  },
  
  "choline": {
    id: "choline",
    name: "Choline (CDP-Choline ou Alpha-GPC)",
    description: "Nutriment essentiel pour la santé du cerveau, la fonction cognitive et la synthèse des neurotransmetteurs",
    category: "other",
    primaryBenefits: ["Fonction cognitive", "Mémoire", "Santé neuronale"],
    secondaryBenefits: ["Fonction hépatique", "Métabolisme des graisses", "Neuromodulation"],
    recommendedDosage: "250-500mg par jour (CDP-Choline ou Alpha-GPC)",
    naturalSources: ["Jaunes d'œufs", "Foie", "Viandes"],
    vegetarian: true,
    vegan: false,
    glutenFree: true,
    dairyFree: true,
    organicOptions: false,
    timeOfDay: "morning",
    effectivenessScore: 87,
    scientificEvidence: "moderate",
    detailedMechanism: "Précurseur de l'acétylcholine, composant des phospholipides membranaires, fournit des groupes méthyle",
    formulations: [
      { type: "Alpha-GPC", bioavailability: 98 },
      { type: "CDP-Choline (Citicoline)", bioavailability: 95 }
    ],
    customTags: ["Cerveau", "Mémoire", "Cognition", "Foie"],
    synergisticWith: ["bacopa", "phosphatidylserine", "vitamin_b_complex"]
  },
  
  "lion_mane": {
    id: "lion_mane",
    name: "Crinière de Lion (Hericium erinaceus)",
    description: "Champignon médicinal qui stimule la croissance des neurones, soutient la cognition et la santé nerveuse",
    category: "herb",
    primaryBenefits: ["Croissance neuronale", "Fonction cognitive", "Neuroprotection"],
    secondaryBenefits: ["Santé digestive", "Humeur", "Système immunitaire"],
    recommendedDosage: "500-3000mg d'extrait par jour",
    naturalSources: ["Champignon Crinière de Lion"],
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    organicOptions: true,
    timeOfDay: "morning",
    effectivenessScore: 83,
    scientificEvidence: "moderate",
    detailedMechanism: "Stimule la production de facteur de croissance nerveux (NGF) et de facteur neurotrophique dérivé du cerveau (BDNF)",
    clinicalEvidence: [
      {
        study: "Étude contrôlée sur 30 participants âgés",
        finding: "Amélioration de 31% des scores cognitifs après 16 semaines",
        population: "Adultes de 50-80 ans",
        year: 2019
      }
    ],
    formulations: [
      { type: "Extrait 8:1", bioavailability: 90 },
      { type: "Poudre de fruiting body", bioavailability: 70 }
    ],
    customTags: ["Cerveau", "Neurogénèse", "Cognition", "Mémoire", "Nerveux"],
    synergisticWith: ["bacopa", "phosphatidylserine", "vitamin_b12"]
  },
  
  "berberine": {
    id: "berberine",
    name: "Berbérine",
    description: "Composé bioactif qui soutient l'équilibre glycémique, la santé métabolique et cardiovasculaire",
    category: "herb",
    primaryBenefits: ["Équilibre glycémique", "Santé métabolique", "Cholestérol"],
    secondaryBenefits: ["Santé intestinale", "Fonction hépatique", "Perte de poids"],
    recommendedDosage: "500-1500mg par jour répartis en 2-3 prises",
    naturalSources: ["Hydrastis", "Épine-vinette", "Huanglian"],
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    organicOptions: false,
    interactions: {
      medications: ["Antidiabétiques", "Hypolipémiants", "Ciclosporine"]
    },
    timeOfDay: "with_meals",
    effectivenessScore: 89,
    scientificEvidence: "strong",
    detailedMechanism: "Active l'AMPK, régule PCSK9, modifie le microbiome, inhibe l'absorption intestinale du glucose",
    clinicalEvidence: [
      {
        study: "Méta-analyse de 14 essais cliniques",
        finding: "Réduction moyenne de l'HbA1c de 0.9% et du cholestérol LDL de 25mg/dL",
        population: "Diabétiques de type 2",
        year: 2021
      }
    ],
    formulations: [
      { type: "HCl", bioavailability: 85 },
      { type: "Phytosome", bioavailability: 95 }
    ],
    customTags: ["Métabolisme", "Glycémie", "Cholestérol", "Poids"],
    synergisticWith: ["chromium", "alpha_lipoic_acid", "fiber_complex"]
  },
  
  "mushroom_complex": {
    id: "mushroom_complex",
    name: "Complexe de Champignons Médicinaux",
    description: "Synergie de champignons médicinaux qui soutiennent l'immunité, la vitalité et l'adaptation au stress",
    category: "herb",
    primaryBenefits: ["Soutien immunitaire", "Adaptogène", "Vitalité"],
    secondaryBenefits: ["Fonction cognitive", "Énergie", "Détoxification"],
    recommendedDosage: "1000-3000mg par jour",
    naturalSources: ["Reishi", "Shiitake", "Maitake", "Cordyceps", "Chaga"],
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    organicOptions: true,
    interactions: {
      medications: ["Immunosuppresseurs", "Anticoagulants"]
    },
    timeOfDay: "morning",
    effectivenessScore: 86,
    scientificEvidence: "moderate",
    detailedMechanism: "Modulateurs immunitaires via bêta-glucanes, adaptogènes, sources de polysaccharides bioactifs",
    formulations: [
      { type: "Extrait de fruiting body", bioavailability: 90 },
      { type: "Extraits standardisés", bioavailability: 85 }
    ],
    customTags: ["Immunité", "Adaptogène", "Énergie", "Vitalité", "Détox"],
    synergisticWith: ["vitamin_d3", "vitamin_c", "zinc"]
  }
};

export default SUPPLEMENT_CATALOG;
