/**
 * Catalogue complet des compléments alimentaires
 * Avec propriétés détaillées pour le traitement par IA
 */

export interface Supplement {
  id: string;
  name: string;
  description: string;
  category: 'vitamin' | 'mineral' | 'herb' | 'amino_acid' | 'enzyme' | 'probiotic' | 'other' | 'anti_stress' | 'energy' | 'sleep' | 'digestion' | 'cognitive' | 'immunity' | 'inflammation';
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
  scientificName?: string;
  benefits?: string[];
  timeToEffect?: { min: number; max: number; unit: string; };
  scientificBasis?: string;
  adaptabilityScore?: number;
  standardDose?: string;
  contraindications?: string[];

}

import { Supplement } from '../types/supplements';

export const SUPPLEMENT_CATALOG: Record<string, Supplement> = {
  // ANTI-STRESS ET HUMEUR
  "ashwagandha": {
    name: "Ashwagandha",
    scientificName: "Withania somnifera",
    category: "anti_stress",
    benefits: ["Réduction du stress", "Équilibre hormonal", "Amélioration de la résistance"],
    sideEffects: ["Somnolence (rare)", "Troubles digestifs légers"],
    timeToEffect: { min: 2, max: 8, unit: "semaines" },
    scientificBasis: "A démontré une efficacité significative dans la réduction du cortisol et des symptômes d'anxiété dans plusieurs études cliniques.",
    interactions: ["Médicaments thyroïdiens", "Sédatifs"],
    vegan: true,
    vegetarian: true,
    glutenFree: true,
    dairyFree: true,
    adaptabilityScore: 8.5
  },

  "rhodiola": {
    name: "Rhodiola Rosea",
    scientificName: "Rhodiola rosea",
    category: "anti_stress",
    benefits: ["Adaptation au stress", "Amélioration de l'énergie mentale", "Réduction de la fatigue"],
    sideEffects: ["Bouche sèche", "Étourdissements (rares)"],
    timeToEffect: { min: 1, max: 4, unit: "semaines" },
    scientificBasis: "Des études ont démontré son efficacité pour améliorer la résistance au stress physique et psychologique.",
    interactions: ["Antidépresseurs", "Stimulants"],
    vegan: true,
    vegetarian: true,
    glutenFree: true,
    dairyFree: true,
    adaptabilityScore: 8.2
  },

  "l_theanine": {
    name: "L-Théanine",
    scientificName: "L-Théanine",
    category: "anti_stress",
    benefits: ["Calme mental sans somnolence", "Amélioration de la concentration", "Réduction de l'anxiété"],
    sideEffects: ["Généralement bien toléré"],
    timeToEffect: { min: 30, max: 60, unit: "minutes" },
    scientificBasis: "Acide aminé qui favorise la relaxation en augmentant les ondes alpha dans le cerveau, sans provoquer de somnolence.",
    interactions: ["Médicaments contre l'hypertension", "Stimulants"],
    vegan: true,
    vegetarian: true,
    glutenFree: true,
    dairyFree: true,
    adaptabilityScore: 9.0
  },

  "magnesium_glycinate": {
    name: "Magnésium Glycinate",
    scientificName: "Magnésium Glycinate",
    category: "anti_stress",
    benefits: ["Relaxation musculaire", "Amélioration du sommeil", "Réduction du stress"],
    sideEffects: ["Troubles digestifs légers (à fortes doses)"],
    timeToEffect: { min: 1, max: 3, unit: "semaines" },
    scientificBasis: "Forme hautement biodisponible de magnésium qui soutient plus de 300 réactions biochimiques dans le corps, incluant la réponse au stress.",
    interactions: ["Certains antibiotiques", "Diurétiques"],
    vegan: true,
    vegetarian: true,
    glutenFree: true,
    dairyFree: true,
    adaptabilityScore: 8.8
  },

  "holy_basil": {
    name: "Basilic Sacré",
    scientificName: "Ocimum sanctum",
    category: "anti_stress",
    benefits: ["Adaptogène", "Anti-inflammatoire", "Équilibre émotionnel"],
    sideEffects: ["Hypoglycémie (personnes diabétiques)"],
    timeToEffect: { min: 2, max: 6, unit: "semaines" },
    scientificBasis: "Plante adaptogène traditionnelle ayurvédique avec des propriétés anti-stress documentées.",
    interactions: ["Anticoagulants", "Médicaments diabétiques"],
    vegan: true,
    vegetarian: true,
    glutenFree: true,
    dairyFree: true,
    adaptabilityScore: 7.9
  },

  // ÉNERGIE ET FATIGUE
  "vitamin_b_complex": {
    name: "Complexe Vitamine B",
    scientificName: "Vitamines B1, B2, B3, B5, B6, B7, B9, B12",
    category: "energy",
    benefits: ["Production d'énergie cellulaire", "Soutien du système nerveux", "Réduction de la fatigue"],
    sideEffects: ["Urine jaune vif", "Nausées (à doses élevées)"],
    timeToEffect: { min: 1, max: 4, unit: "semaines" },
    scientificBasis: "Les vitamines B sont essentielles au métabolisme énergétique et à la production d'ATP dans les cellules.",
    interactions: ["Certains antibiotiques", "Anticonvulsants"],
    vegan: true, // Si synthétiques ou d'origine végétale
    vegetarian: true,
    glutenFree: true,
    dairyFree: true,
    adaptabilityScore: 8.5
  },

  "coq10": {
    name: "Coenzyme Q10",
    scientificName: "Ubiquinone/Ubiquinol",
    category: "energy",
    benefits: ["Production d'énergie cellulaire", "Antioxydant", "Santé cardiovasculaire"],
    sideEffects: ["Troubles digestifs légers", "Insomnie (si pris le soir)"],
    timeToEffect: { min: 2, max: 8, unit: "semaines" },
    scientificBasis: "Molécule essentielle à la chaîne de transport d'électrons dans les mitochondries pour la production d'ATP.",
    interactions: ["Anticoagulants", "Médicaments contre l'hypertension"],
    vegan: true, // Si synthétique
    vegetarian: true,
    glutenFree: true,
    dairyFree: true,
    adaptabilityScore: 7.8
  },

  "iron": {
    name: "Fer",
    scientificName: "Fer bisglycinate/fumarate",
    category: "energy",
    benefits: ["Transport d'oxygène", "Production d'énergie", "Fonction cognitive"],
    sideEffects: ["Constipation", "Nausées", "Selles noires"],
    timeToEffect: { min: 2, max: 12, unit: "semaines" },
    scientificBasis: "Composant essentiel de l'hémoglobine, crucial pour le transport de l'oxygène et la production d'énergie cellulaire.",
    interactions: ["Antibiotiques", "Antiacides", "Calcium"],
    vegan: true, // Si synthétique
    vegetarian: true,
    glutenFree: true,
    dairyFree: true,
    adaptabilityScore: 7.5
  },

  "cordyceps": {
    name: "Cordyceps",
    scientificName: "Cordyceps sinensis/militaris",
    category: "energy",
    benefits: ["Augmentation de l'endurance", "Amélioration de l'oxygénation", "Adaptation au stress"],
    sideEffects: ["Bouche sèche", "Nausées (rares)"],
    timeToEffect: { min: 1, max: 6, unit: "semaines" },
    scientificBasis: "Champignon médicinal qui améliore l'utilisation de l'oxygène et augmente la production d'ATP dans les mitochondries.",
    interactions: ["Anticoagulants", "Immunosuppresseurs"],
    vegan: true,
    vegetarian: true,
    glutenFree: true,
    dairyFree: true,
    adaptabilityScore: 8.0
  },

  "maca": {
    name: "Maca",
    scientificName: "Lepidium meyenii",
    category: "energy",
    benefits: ["Énergie et endurance", "Équilibre hormonal", "Vitalité"],
    sideEffects: ["Troubles digestifs (rares)", "Insomnie (sensibilité)"],
    timeToEffect: { min: 2, max: 6, unit: "semaines" },
    scientificBasis: "Plante adaptogène andine riche en nutriments qui soutient les systèmes endocrinien et nerveux.",
    interactions: ["Médicaments hormonaux"],
    vegan: true,
    vegetarian: true,
    glutenFree: true,
    dairyFree: true,
    adaptabilityScore: 8.3
  },

  // SOMMEIL
  "melatonin": {
    name: "Mélatonine",
    scientificName: "N-acétyl-5-méthoxytryptamine",
    category: "sleep",
    benefits: ["Amélioration de l'endormissement", "Régulation du rythme circadien", "Qualité du sommeil"],
    sideEffects: ["Somnolence matinale", "Rêves intenses"],
    timeToEffect: { min: 20, max: 60, unit: "minutes" },
    scientificBasis: "Hormone naturelle qui régule le cycle veille-sommeil, particulièrement efficace pour l'endormissement.",
    interactions: ["Médicaments sédatifs", "Anticoagulants"],
    vegan: true, // Si synthétique
    vegetarian: true,
    glutenFree: true,
    dairyFree: true,
    adaptabilityScore: 8.7
  },

  "valerian": {
    name: "Valériane",
    scientificName: "Valeriana officinalis",
    category: "sleep",
    benefits: ["Amélioration de la qualité du sommeil", "Réduction du temps d'endormissement", "Effet calmant"],
    sideEffects: ["Somnolence", "Maux de tête (rares)"],
    timeToEffect: { min: 30, max: 120, unit: "minutes" },
    scientificBasis: "Plante médicinale qui agit sur les récepteurs GABA favorisant la relaxation et le sommeil.",
    interactions: ["Sédatifs", "Alcool", "Certains antidépresseurs"],
    vegan: true,
    vegetarian: true,
    glutenFree: true,
    dairyFree: true,
    adaptabilityScore: 7.8
  },

  "glycine": {
    name: "Glycine",
    scientificName: "Glycine",
    category: "sleep",
    benefits: ["Amélioration de la qualité du sommeil", "Effet calmant", "Température corporelle pour le sommeil"],
    sideEffects: ["Généralement bien tolérée"],
    timeToEffect: { min: 30, max: 60, unit: "minutes" },
    scientificBasis: "Acide aminé qui abaisse la température corporelle et facilite l'entrée dans le sommeil profond.",
    interactions: ["Généralement peu d'interactions"],
    vegan: true,
    vegetarian: true,
    glutenFree: true,
    dairyFree: true,
    adaptabilityScore: 8.5
  },

  "tart_cherry": {
    name: "Cerise Acidulée",
    scientificName: "Prunus cerasus",
    category: "sleep",
    benefits: ["Production naturelle de mélatonine", "Anti-inflammatoire", "Récupération musculaire"],
    sideEffects: ["Troubles digestifs légers (rares)"],
    timeToEffect: { min: 30, max: 120, unit: "minutes" },
    scientificBasis: "Source naturelle de mélatonine et d'antioxydants qui favorisent le sommeil et réduisent l'inflammation.",
    interactions: ["Anticoagulants", "AINS"],
    vegan: true,
    vegetarian: true,
    glutenFree: true,
    dairyFree: true,
    adaptabilityScore: 7.9
  },

  // DIGESTION ET INTESTINS
  "probiotics": {
    name: "Probiotiques Multi-souches",
    scientificName: "Lactobacillus, Bifidobacterium et autres souches",
    category: "digestion",
    benefits: ["Santé du microbiome intestinal", "Amélioration de la digestion", "Soutien immunitaire"],
    sideEffects: ["Gaz et ballonnements initiaux"],
    timeToEffect: { min: 1, max: 8, unit: "semaines" },
    scientificBasis: "Bactéries bénéfiques qui colonisent l'intestin et améliorent l'équilibre du microbiome.",
    interactions: ["Antibiotiques"],
    vegan: true, // Selon les souches et le support
    vegetarian: true,
    glutenFree: true,
    dairyFree: true, // Selon la formulation
    adaptabilityScore: 8.4
  },

  "digestive_enzymes": {
    name: "Enzymes Digestives",
    scientificName: "Amylase, Protéase, Lipase, etc.",
    category: "digestion",
    benefits: ["Facilitation de la digestion", "Réduction des ballonnements", "Absorption des nutriments"],
    sideEffects: ["Nausées (rares)", "Crampes (rares)"],
    timeToEffect: { min: 15, max: 60, unit: "minutes" },
    scientificBasis: "Enzymes qui aident à décomposer les macronutriments, particulièrement utiles en cas d'insuffisance enzymatique.",
    interactions: ["Médicaments pour le diabète", "Anticoagulants"],
    vegan: true, // Si d'origine végétale ou microbienne
    vegetarian: true,
    glutenFree: true,
    dairyFree: true,
    adaptabilityScore: 8.0
  },

  "fiber_complex": {
    name: "Complexe de Fibres",
    scientificName: "Psyllium, Inuline, FOS, etc.",
    category: "digestion",
    benefits: ["Régularité intestinale", "Satiété", "Alimentation du microbiome"],
    sideEffects: ["Gaz et ballonnements initiaux", "Déshydratation si non accompagné d'eau"],
    timeToEffect: { min: 1, max: 7, unit: "jours" },
    scientificBasis: "Différents types de fibres solubles et insolubles qui améliorent la santé digestive et alimentent les bactéries bénéfiques.",
    interactions: ["Certains médicaments (prise espacée nécessaire)"],
    vegan: true,
    vegetarian: true,
    glutenFree: true,
    dairyFree: true,
    adaptabilityScore: 8.2
  },

  "slippery_elm": {
    name: "Orme Rouge",
    scientificName: "Ulmus rubra",
    category: "digestion",
    benefits: ["Apaisement des muqueuses digestives", "Réduction de l'inflammation", "Soulagement des brûlures d'estomac"],
    sideEffects: ["Ralentissement de l'absorption des médicaments"],
    timeToEffect: { min: 15, max: 60, unit: "minutes" },
    scientificBasis: "L'écorce contient du mucilage qui forme un gel protecteur apaisant les muqueuses du système digestif.",
    interactions: ["Divers médicaments (absorption retardée)"],
    vegan: true,
    vegetarian: true,
    glutenFree: true,
    dairyFree: true,
    adaptabilityScore: 7.5
  },

  // SANTÉ COGNITIVE
  "omega3": {
    name: "Oméga-3 EPA/DHA",
    scientificName: "Acides gras polyinsaturés EPA/DHA",
    category: "cognitive",
    benefits: ["Fonction cognitive", "Santé cardiovasculaire", "Anti-inflammatoire"],
    sideEffects: ["Arrière-goût de poisson", "Troubles digestifs légers"],
    timeToEffect: { min: 4, max: 12, unit: "semaines" },
    scientificBasis: "Acides gras essentiels critiques pour la structure des membranes neuronales et la signalisation cellulaire.",
    interactions: ["Anticoagulants", "Médicaments contre l'hypertension"],
    vegan: false, // Si d'origine marine
    vegetarian: false, // Si d'origine marine
    glutenFree: true,
    dairyFree: true,
    adaptabilityScore: 8.7
  },

  "omega3_vegan": {
    name: "Oméga-3 Végétal (Algues)",
    scientificName: "Acides gras polyinsaturés EPA/DHA d'algues",
    category: "cognitive",
    benefits: ["Fonction cognitive", "Santé cardiovasculaire", "Anti-inflammatoire"],
    sideEffects: ["Troubles digestifs légers (rares)"],
    timeToEffect: { min: 4, max: 12, unit: "semaines" },
    scientificBasis: "Version végétale des acides gras essentiels EPA/DHA dérivée d'algues marines.",
    interactions: ["Anticoagulants", "Médicaments contre l'hypertension"],
    vegan: true,
    vegetarian: true,
    glutenFree: true,
    dairyFree: true,
    adaptabilityScore: 8.5
  },

  "bacopa": {
    name: "Bacopa Monnieri",
    scientificName: "Bacopa monnieri",
    category: "cognitive",
    benefits: ["Mémoire et apprentissage", "Neuroprotection", "Réduction du stress"],
    sideEffects: ["Troubles digestifs légers", "Fatigue (rares)"],
    timeToEffect: { min: 4, max: 12, unit: "semaines" },
    scientificBasis: "Plante ayurvédique avec des bacosides qui améliorent la transmission synaptique et protègent les neurones.",
    interactions: ["Médicaments thyroïdiens", "Certains antidépresseurs"],
    vegan: true,
    vegetarian: true,
    glutenFree: true,
    dairyFree: true,
    adaptabilityScore: 8.0
  },

  "ginkgo": {
    name: "Ginkgo Biloba",
    scientificName: "Ginkgo biloba",
    category: "cognitive",
    benefits: ["Circulation cérébrale", "Mémoire", "Antioxydant"],
    sideEffects: ["Maux de tête légers", "Troubles digestifs (rares)"],
    timeToEffect: { min: 4, max: 8, unit: "semaines" },
    scientificBasis: "Flavonoïdes et terpènes qui améliorent la microcirculation et protègent contre le stress oxydatif neuronal.",
    interactions: ["Anticoagulants", "Antidépresseurs", "Anticonvulsants"],
    vegan: true,
    vegetarian: true,
    glutenFree: true,
    dairyFree: true,
    adaptabilityScore: 7.8
  },

  "lions_mane": {
    name: "Lion's Mane",
    scientificName: "Hericium erinaceus",
    description: "Champignon médicinal connu pour ses effets neuroprotecteurs et cognitifs",
    benefits: [
      "Stimule la production de facteur de croissance nerveuse (NGF)",
      "Améliore la clarté mentale et la concentration",
      "Contribue à la santé neuronale",
      "Peut réduire l'inflammation neuronale"
    ],
    standardDose: "500-1000mg d'extrait standardisé par jour",
    timeToEffect: "4-6 semaines pour les effets cognitifs",
    scientificBasis: "Des études cliniques montrent que Lion's Mane augmente la production de NGF et améliore les performances cognitives chez les adultes souffrant de déficience cognitive légère.",
    contraindications: ["Déconseillé aux personnes allergiques aux champignons"]
  },

  // IMMUNITÉ
  "vitamin_c": {
    name: "Vitamine C",
    scientificName: "Acide ascorbique",
    category: "immunity",
    benefits: ["Soutien immunitaire", "Antioxydant", "Formation du collagène"],
    sideEffects: ["Troubles digestifs à doses élevées"],
    timeToEffect: { min: 1, max: 7, unit: "jours" },
    scientificBasis: "Vitamine essentielle qui soutient diverses fonctions immunitaires et protège contre les dommages oxydatifs.",
    interactions: ["Certains médicaments contre le cancer", "Anticoagulants"],
    vegan: true,
    vegetarian: true,
    glutenFree: true,
    dairyFree: true,
    adaptabilityScore: 8.8
  },

  "vitamin_d3": {
    name: "Vitamine D3",
    scientificName: "Cholécalciférol",
    category: "immunity",
    benefits: ["Fonction immunitaire", "Santé osseuse", "Humeur"],
    sideEffects: ["Hypercalcémie à très hautes doses"],
    timeToEffect: { min: 2, max: 12, unit: "semaines" },
    scientificBasis: "Hormone stéroïde qui régule l'expression génique dans les cellules immunitaires et joue un rôle crucial dans leur fonction.",
    interactions: ["Diurétiques thiazidiques", "Médicaments pour l'ostéoporose"],
    vegan: false, // D3 traditionnelle
    vegetarian: false,
    glutenFree: true,
    dairyFree: true,
    adaptabilityScore: 9.0
  },

  "vitamin_d3_vegan": {
    name: "Vitamine D3 Végétale",
    scientificName: "Cholécalciférol d'origine végétale",
    category: "immunity",
    benefits: ["Fonction immunitaire", "Santé osseuse", "Humeur"],
    sideEffects: ["Hypercalcémie à très hautes doses"],
    timeToEffect: { min: 2, max: 12, unit: "semaines" },
    scientificBasis: "Version végétale de la vitamine D3 dérivée de lichen, avec les mêmes bénéfices que la D3 traditionnelle.",
    interactions: ["Diurétiques thiazidiques", "Médicaments pour l'ostéoporose"],
    vegan: true,
    vegetarian: true,
    glutenFree: true,
    dairyFree: true,
    adaptabilityScore: 9.0
  },

  "zinc": {
    name: "Zinc",
    scientificName: "Zinc bisglycinate/picolinate",
    category: "immunity",
    benefits: ["Fonction immunitaire", "Synthèse protéique", "Cicatrisation"],
    sideEffects: ["Nausées si pris à jeun", "Altération du goût à fortes doses"],
    timeToEffect: { min: 1, max: 4, unit: "semaines" },
    scientificBasis: "Minéral essentiel qui joue un rôle dans la signalisation cellulaire des cellules immunitaires et la défense antivirale.",
    interactions: ["Antibiotiques", "Diurétiques"],
    vegan: true,
    vegetarian: true,
    glutenFree: true,
    dairyFree: true,
    adaptabilityScore: 8.4
  },

  "mushroom_complex": {
    name: "Complexe de Champignons Médicinaux",
    scientificName: "Reishi, Shiitake, Maitake, etc.",
    category: "immunity",
    benefits: ["Modulation immunitaire", "Adaptation au stress", "Antioxydant"],
    sideEffects: ["Troubles digestifs légers (rares)"],
    timeToEffect: { min: 2, max: 8, unit: "semaines" },
    scientificBasis: "Bêta-glucanes et composés bioactifs qui modulent la fonction immunitaire et soutiennent les défenses naturelles.",
    interactions: ["Anticoagulants", "Immunosuppresseurs"],
    vegan: true,
    vegetarian: true,
    glutenFree: true,
    dairyFree: true,
    adaptabilityScore: 8.3
  },

  // INFLAMMATION
  "curcumin": {
    name: "Curcumine",
    scientificName: "Extrait de Curcuma longa",
    category: "inflammation",
    benefits: ["Anti-inflammatoire", "Antioxydant", "Santé cognitive"],
    sideEffects: ["Troubles digestifs légers", "Coloration jaune des selles"],
    timeToEffect: { min: 2, max: 8, unit: "semaines" },
    scientificBasis: "Polyphénol puissant qui module diverses voies inflammatoires et neutralise les radicaux libres.",
    interactions: ["Anticoagulants", "Médicaments diabétiques", "Antiacides"],
    vegan: true,
    vegetarian: true,
    glutenFree: true,
    dairyFree: true,
    adaptabilityScore: 8.6
  },

  "boswellia": {
    name: "Boswellia Serrata",
    scientificName: "Boswellia serrata",
    category: "inflammation",
    benefits: ["Anti-inflammatoire", "Santé articulaire", "Santé respiratoire"],
    sideEffects: ["Troubles digestifs légers (rares)"],
    timeToEffect: { min: 1, max: 8, unit: "semaines" },
    scientificBasis: "Résine contenant des acides boswelliques qui inhibent les enzymes pro-inflammatoires.",
    interactions: ["Médicaments pour les troubles thyroïdiens"],
    vegan: true,
    vegetarian: true,
    glutenFree: true,
    dairyFree: true,
    adaptabilityScore: 8.0
  },

  "omega_complex": {
    name: "Complexe Oméga Équilibré",
    scientificName: "Oméga-3, Oméga-6, Oméga-9",
    category: "inflammation",
    benefits: ["Équilibre inflammatoire", "Santé cardiovasculaire", "Santé de la peau"],
    sideEffects: ["Arrière-goût léger", "Troubles digestifs légers"],
    timeToEffect: { min: 2, max: 12, unit: "semaines" },
    scientificBasis: "Combinaison équilibrée d'acides gras essentiels qui favorise un profil inflammatoire optimal.",
    interactions: ["Anticoagulants", "Médicaments contre l'hypertension"],
    vegan: false,
    vegetarian: false,
    glutenFree: true,
    dairyFree: true,
    adaptabilityScore: 8.7
  },

  "msm": {
    name: "MSM",
    scientificName: "Méthylsulfonylméthane",
    category: "inflammation",
    benefits: ["Santé articulaire", "Anti-inflammatoire", "Santé de la peau"],
    sideEffects: ["Troubles digestifs légers", "Maux de tête (rares)"],
    timeToEffect: { min: 2, max: 8, unit: "semaines" },
    scientificBasis: "Composé soufré naturel qui soutient la production de glutathion et modère l'inflammation.",
    interactions: ["Médicaments pour éclaircir le sang"],
    vegan: true,
    vegetarian: true,
    glutenFree: true,
    dairyFree: true,
    adaptabilityScore: 7.8
  },
  "berberine": {
    name: "Berbérine",
    scientificName: "Berberis aristata",
    description: "Composé bioactif aux propriétés anti-diabétiques et métaboliques puissantes",
    benefits: [
      "Améliore la sensibilité à l'insuline",
      "Réduit les niveaux de glycémie à jeun",
      "Diminue le cholestérol LDL",
      "Favorise une composition corporelle saine"
    ],
    standardDose: "500mg trois fois par jour avant les repas",
    timeToEffect: "2-4 semaines pour les effets métaboliques",
    scientificBasis: "Des études cliniques montrent que la berbérine active l'AMPK, une enzyme qui régule le métabolisme, avec une efficacité comparable à la metformine pour améliorer la glycémie.",
    contraindications: ["Déconseillé pendant la grossesse et l'allaitement", "Interaction possible avec certains médicaments métabolisés par le foie"]
  },

  "collagen_peptides": {
    name: "Peptides de Collagène",
    scientificName: "Hydrolyzed Collagen Peptides",
    description: "Protéine structurelle qui soutient la santé des articulations, de la peau et des tissus conjonctifs",
    benefits: [
      "Améliore l'élasticité et l'hydratation de la peau",
      "Soutient la santé des articulations et réduit les douleurs",
      "Favorise la récupération musculaire",
      "Renforce les cheveux et les ongles"
    ],
    standardDose: "10-15g par jour",
    timeToEffect: "4-12 semaines selon l'objectif (peau, articulations)",
    scientificBasis: "Des études en double aveugle contre placebo démontrent que les peptides de collagène augmentent l'hydratation de la peau et réduisent les signes de vieillissement cutané. Des études cliniques montrent également une réduction significative des douleurs articulaires chez les personnes souffrant d'arthrose.",
    contraindications: ["Allergies potentielles aux sources animales"]
  },

  "bacopa_monnieri": {
    name: "Bacopa Monnieri",
    scientificName: "Bacopa monnieri",
    description: "Plante adaptogène ayurvedique connue pour ses effets nootropiques et anxiolytiques",
    benefits: [
      "Améliore la mémoire et les capacités d'apprentissage",
      "Réduit l'anxiété et le stress",
      "Soutient la neuroplasticité cérébrale",
      "Possède des propriétés antioxydantes pour le cerveau"
    ],
    standardDose: "300mg d'extrait standardisé à 50% de bacosides par jour",
    timeToEffect: "8-12 semaines pour les effets cognitifs",
    scientificBasis: "Des études cliniques montrent que Bacopa monnieri améliore significativement l'acquisition et la rétention de nouvelles informations, ainsi que la vitesse de traitement visuel chez des sujets sains.",
    contraindications: ["Peut augmenter les sécrétions de l'appareil digestif", "Prendre avec un repas pour éviter l'irritation gastrique"]
  }
};

export default SUPPLEMENT_CATALOG;