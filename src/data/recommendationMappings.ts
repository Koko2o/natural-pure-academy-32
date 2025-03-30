
/**
 * Mappings entre symptômes et compléments recommandés
 * Basé sur les recherches scientifiques actuelles
 */

import { SUPPLEMENT_CATALOG } from './supplementCatalog';

// Structure pour la catégorisation des symptômes rapportés
export interface SymptomCategory {
  id: string;
  name: string;
  description: string;
  priority: number; // 1-10, 10 étant la plus élevée pour l'impact sur la santé
  keywords: string[];
  relatedQuestions: string[]; // IDs des questions de quiz liées
}

// Structure des seuils d'intensité des symptômes
export interface SymptomIntensityThresholds {
  mild: number;
  moderate: number;
  severe: number;
}

// Structure des recommandations par symptôme
export interface SymptomRecommendation {
  id: string; // ID du supplément
  priority: number; // 1-10, priorité de recommandation
  doseStandard: string; // Dosage standard
  doseVegetarian: string | null; // Dosage pour végétariens ou null si non adapté
}

// Correspondances entre réponses au quiz et catégories de symptômes
export const SYMPTOM_MAPPING: Record<string, SymptomIntensityThresholds> = {
  stress: {
    mild: 3,
    moderate: 5,
    severe: 8
  },
  sleep: {
    mild: 3,
    moderate: 6,
    severe: 8
  },
  energy: {
    mild: 4,
    moderate: 6,
    severe: 8
  },
  mood: {
    mild: 3,
    moderate: 5,
    severe: 7
  },
  focus: {
    mild: 3,
    moderate: 5,
    severe: 7
  },
  digestion: {
    mild: 3,
    moderate: 6,
    severe: 8
  },
  immunity: {
    mild: 3,
    moderate: 5,
    severe: 7
  },
  inflammation: {
    mild: 3,
    moderate: 6,
    severe: 8
  }
};

// Catégories de symptômes pour classification
export const SYMPTOM_CATEGORIES: SymptomCategory[] = [
  {
    id: "stress",
    name: "Stress et Anxiété",
    description: "Symptômes liés au stress chronique et à l'anxiété",
    priority: 9,
    keywords: ["stress", "anxiété", "tension", "nervosité", "agitation", "inquiétude"],
    relatedQuestions: ["stressLevel", "anxiety", "mentalFatigue"]
  },
  {
    id: "sleep",
    name: "Troubles du Sommeil",
    description: "Problèmes liés à la qualité et quantité de sommeil",
    priority: 8,
    keywords: ["insomnie", "sommeil", "réveil nocturne", "fatigue matinale", "endormissement"],
    relatedQuestions: ["sleepQuality", "sleepDuration", "morningFatigue"]
  },
  {
    id: "energy",
    name: "Énergie et Vitalité",
    description: "Problèmes liés aux niveaux d'énergie et à la fatigue",
    priority: 7,
    keywords: ["fatigue", "épuisement", "énergie", "léthargie", "vitalité"],
    relatedQuestions: ["energyLevel", "physicalFatigue", "dailyEndurance"]
  },
  {
    id: "mood",
    name: "Humeur et Équilibre Émotionnel",
    description: "Fluctuations d'humeur et équilibre émotionnel",
    priority: 7,
    keywords: ["humeur", "dépression", "irritabilité", "motivation", "plaisir"],
    relatedQuestions: ["moodSwings", "irritability", "motivation"]
  },
  {
    id: "focus",
    name: "Concentration et Cognition",
    description: "Problèmes de concentration et de performance cognitive",
    priority: 6,
    keywords: ["concentration", "mémoire", "clarté mentale", "distraction", "oubli"],
    relatedQuestions: ["concentration", "memoryIssues", "mentalClarity"]
  },
  {
    id: "digestion",
    name: "Digestion et Confort Intestinal",
    description: "Problèmes digestifs et de confort intestinal",
    priority: 7,
    keywords: ["digestion", "ballonnement", "intestin", "transit", "inconfort"],
    relatedQuestions: ["digestion", "bloating", "bowelRegularity"]
  },
  {
    id: "immunity",
    name: "Immunité et Résistance",
    description: "Problèmes liés au système immunitaire",
    priority: 8,
    keywords: ["immunité", "infection", "rhume", "résistance", "maladie"],
    relatedQuestions: ["immuneSystem", "recurrentIllness", "recoveryTime"]
  },
  {
    id: "inflammation",
    name: "Inflammation et Récupération",
    description: "Problèmes liés à l'inflammation chronique",
    priority: 7,
    keywords: ["inflammation", "douleur", "récupération", "articulation", "raideur"],
    relatedQuestions: ["jointPain", "muscleSoreness", "recoveryTime"]
  }
];

// Recommandations basées sur les symptômes
export const SYMPTOM_RECOMMENDATIONS: Record<string, SymptomRecommendation[]> = {
  stress: [
    {
      id: "ashwagandha",
      priority: 10,
      doseStandard: "300-500mg par jour",
      doseVegetarian: "300-500mg par jour"
    },
    {
      id: "magnesium",
      priority: 9,
      doseStandard: "300-400mg par jour",
      doseVegetarian: "300-400mg par jour"
    },
    {
      id: "l_theanine",
      priority: 8,
      doseStandard: "200-400mg par jour",
      doseVegetarian: "200-400mg par jour"
    },
    {
      id: "rhodiola",
      priority: 7,
      doseStandard: "200-400mg par jour",
      doseVegetarian: "200-400mg par jour"
    },
    {
      id: "adaptogens_complex",
      priority: 6,
      doseStandard: "Selon formulation",
      doseVegetarian: "Selon formulation"
    }
  ],
  
  sleep: [
    {
      id: "melatonin",
      priority: 10,
      doseStandard: "0.5-3mg avant le coucher",
      doseVegetarian: "0.5-3mg avant le coucher"
    },
    {
      id: "magnesium",
      priority: 9,
      doseStandard: "300-400mg avant le coucher",
      doseVegetarian: "300-400mg avant le coucher"
    },
    {
      id: "l_theanine",
      priority: 7,
      doseStandard: "200mg avant le coucher",
      doseVegetarian: "200mg avant le coucher"
    },
    {
      id: "ashwagandha",
      priority: 6,
      doseStandard: "300-500mg en soirée",
      doseVegetarian: "300-500mg en soirée"
    }
  ],
  
  energy: [
    {
      id: "vitamin_b_complex",
      priority: 10,
      doseStandard: "Selon formulation",
      doseVegetarian: null
    },
    {
      id: "vitamin_b_complex_vegan",
      priority: 10,
      doseStandard: "Selon formulation",
      doseVegetarian: "Selon formulation"
    },
    {
      id: "iron",
      priority: 9,
      doseStandard: "18-27mg par jour",
      doseVegetarian: "27-45mg par jour"
    },
    {
      id: "coq10",
      priority: 8,
      doseStandard: "100-200mg par jour",
      doseVegetarian: "100-200mg par jour"
    },
    {
      id: "rhodiola",
      priority: 7,
      doseStandard: "200-400mg par jour",
      doseVegetarian: "200-400mg par jour"
    }
  ],
  
  mood: [
    {
      id: "omega3",
      priority: 10,
      doseStandard: "1000-2000mg EPA/DHA par jour",
      doseVegetarian: null
    },
    {
      id: "omega3_vegan",
      priority: 9,
      doseStandard: "2000-3000mg par jour",
      doseVegetarian: "2000-3000mg par jour"
    },
    {
      id: "vitamin_d3",
      priority: 9,
      doseStandard: "2000-4000 UI par jour",
      doseVegetarian: null
    },
    {
      id: "vitamin_d3_vegan",
      priority: 9,
      doseStandard: "2000-4000 UI par jour",
      doseVegetarian: "2000-4000 UI par jour"
    },
    {
      id: "ashwagandha",
      priority: 7,
      doseStandard: "300-500mg par jour",
      doseVegetarian: "300-500mg par jour"
    },
    {
      id: "rhodiola",
      priority: 6,
      doseStandard: "200-400mg par jour",
      doseVegetarian: "200-400mg par jour"
    }
  ],
  
  focus: [
    {
      id: "bacopa",
      priority: 10,
      doseStandard: "300-600mg par jour",
      doseVegetarian: "300-600mg par jour"
    },
    {
      id: "omega3",
      priority: 9,
      doseStandard: "1000-2000mg EPA/DHA par jour",
      doseVegetarian: null
    },
    {
      id: "omega3_vegan",
      priority: 9,
      doseStandard: "2000-3000mg par jour",
      doseVegetarian: "2000-3000mg par jour"
    },
    {
      id: "l_theanine",
      priority: 8,
      doseStandard: "100-200mg par jour",
      doseVegetarian: "100-200mg par jour"
    },
    {
      id: "ginkgo",
      priority: 8,
      doseStandard: "120-240mg par jour",
      doseVegetarian: "120-240mg par jour"
    },
    {
      id: "choline",
      priority: 7,
      doseStandard: "250-500mg par jour",
      doseVegetarian: "250-500mg par jour"
    }
  ],
  
  digestion: [
    {
      id: "probiotics",
      priority: 10,
      doseStandard: "10-50 milliards UFC par jour",
      doseVegetarian: "10-50 milliards UFC par jour"
    },
    {
      id: "digestive_enzymes",
      priority: 9,
      doseStandard: "Avec les repas principaux",
      doseVegetarian: null
    },
    {
      id: "digestive_enzymes_vegan",
      priority: 9,
      doseStandard: "Avec les repas principaux",
      doseVegetarian: "Avec les repas principaux"
    },
    {
      id: "fiber_complex",
      priority: 8,
      doseStandard: "5-15g par jour",
      doseVegetarian: "5-15g par jour"
    },
    {
      id: "turmeric",
      priority: 7,
      doseStandard: "500-1000mg par jour",
      doseVegetarian: "500-1000mg par jour"
    }
  ],
  
  immunity: [
    {
      id: "vitamin_c",
      priority: 10,
      doseStandard: "500-1000mg par jour",
      doseVegetarian: "500-1000mg par jour"
    },
    {
      id: "vitamin_d3",
      priority: 9,
      doseStandard: "2000-4000 UI par jour",
      doseVegetarian: null
    },
    {
      id: "vitamin_d3_vegan",
      priority: 9,
      doseStandard: "2000-4000 UI par jour",
      doseVegetarian: "2000-4000 UI par jour"
    },
    {
      id: "zinc",
      priority: 9,
      doseStandard: "15-30mg par jour",
      doseVegetarian: "20-40mg par jour"
    },
    {
      id: "probiotics",
      priority: 7,
      doseStandard: "10-50 milliards UFC par jour",
      doseVegetarian: "10-50 milliards UFC par jour"
    }
  ],
  
  inflammation: [
    {
      id: "turmeric",
      priority: 10,
      doseStandard: "500-1500mg par jour",
      doseVegetarian: "500-1500mg par jour"
    },
    {
      id: "omega3",
      priority: 9,
      doseStandard: "2000-3000mg EPA/DHA par jour",
      doseVegetarian: null
    },
    {
      id: "omega3_vegan",
      priority: 9,
      doseStandard: "3000-4000mg par jour",
      doseVegetarian: "3000-4000mg par jour"
    },
    {
      id: "vitamin_d3",
      priority: 7,
      doseStandard: "2000-4000 UI par jour",
      doseVegetarian: null
    },
    {
      id: "vitamin_d3_vegan",
      priority: 7,
      doseStandard: "2000-4000 UI par jour",
      doseVegetarian: "2000-4000 UI par jour"
    }
  ]
};

// Recommandations basées sur les objectifs de santé
export interface GoalRecommendation {
  id: string; // ID du supplément
  priority: number; // 1-10, priorité de recommandation
  doseStandard: string; // Dosage standard
  doseVegetarian: string | null; // Dosage pour végétariens ou null si non adapté
}

// Objectifs de santé et suppléments recommandés
export const GOAL_RECOMMENDATIONS: Record<string, GoalRecommendation[]> = {
  weight_management: [
    {
      id: "fiber_complex",
      priority: 9,
      doseStandard: "10-15g par jour",
      doseVegetarian: "10-15g par jour"
    },
    {
      id: "probiotics",
      priority: 7,
      doseStandard: "10-30 milliards UFC par jour",
      doseVegetarian: "10-30 milliards UFC par jour"
    },
    {
      id: "magnesium",
      priority: 6,
      doseStandard: "300-400mg par jour",
      doseVegetarian: "300-400mg par jour"
    },
    {
      id: "vitamin_d3",
      priority: 6,
      doseStandard: "2000-4000 UI par jour",
      doseVegetarian: null
    },
    {
      id: "vitamin_d3_vegan",
      priority: 6,
      doseStandard: "2000-4000 UI par jour",
      doseVegetarian: "2000-4000 UI par jour"
    }
  ],
  
  cognitive_performance: [
    {
      id: "bacopa",
      priority: 9,
      doseStandard: "300-600mg par jour",
      doseVegetarian: "300-600mg par jour"
    },
    {
      id: "omega3",
      priority: 9,
      doseStandard: "1000-2000mg EPA/DHA par jour",
      doseVegetarian: null
    },
    {
      id: "omega3_vegan",
      priority: 8,
      doseStandard: "2000-3000mg par jour",
      doseVegetarian: "2000-3000mg par jour"
    },
    {
      id: "choline",
      priority: 8,
      doseStandard: "250-500mg par jour",
      doseVegetarian: "250-500mg par jour"
    },
    {
      id: "l_theanine",
      priority: 7,
      doseStandard: "100-200mg par jour",
      doseVegetarian: "100-200mg par jour"
    },
    {
      id: "ginkgo",
      priority: 7,
      doseStandard: "120-240mg par jour",
      doseVegetarian: "120-240mg par jour"
    }
  ],
  
  stress_management: [
    {
      id: "ashwagandha",
      priority: 10,
      doseStandard: "300-500mg par jour",
      doseVegetarian: "300-500mg par jour"
    },
    {
      id: "rhodiola",
      priority: 8,
      doseStandard: "200-400mg par jour",
      doseVegetarian: "200-400mg par jour"
    },
    {
      id: "magnesium",
      priority: 8,
      doseStandard: "300-400mg par jour",
      doseVegetarian: "300-400mg par jour"
    },
    {
      id: "l_theanine",
      priority: 7,
      doseStandard: "200-400mg par jour",
      doseVegetarian: "200-400mg par jour"
    },
    {
      id: "adaptogens_complex",
      priority: 7,
      doseStandard: "Selon formulation",
      doseVegetarian: "Selon formulation"
    }
  ],
  
  energy_boost: [
    {
      id: "vitamin_b_complex",
      priority: 10,
      doseStandard: "Selon formulation",
      doseVegetarian: null
    },
    {
      id: "vitamin_b_complex_vegan",
      priority: 10,
      doseStandard: "Selon formulation",
      doseVegetarian: "Selon formulation"
    },
    {
      id: "iron",
      priority: 9,
      doseStandard: "18-27mg par jour",
      doseVegetarian: "27-45mg par jour"
    },
    {
      id: "coq10",
      priority: 8,
      doseStandard: "100-200mg par jour",
      doseVegetarian: "100-200mg par jour"
    },
    {
      id: "rhodiola",
      priority: 8,
      doseStandard: "200-400mg par jour",
      doseVegetarian: "200-400mg par jour"
    }
  ],
  
  better_sleep: [
    {
      id: "melatonin",
      priority: 10,
      doseStandard: "0.5-3mg avant le coucher",
      doseVegetarian: "0.5-3mg avant le coucher"
    },
    {
      id: "magnesium",
      priority: 9,
      doseStandard: "300-400mg avant le coucher",
      doseVegetarian: "300-400mg avant le coucher"
    },
    {
      id: "l_theanine",
      priority: 8,
      doseStandard: "200mg avant le coucher",
      doseVegetarian: "200mg avant le coucher"
    },
    {
      id: "ashwagandha",
      priority: 7,
      doseStandard: "300-500mg en soirée",
      doseVegetarian: "300-500mg en soirée"
    }
  ],
  
  immune_support: [
    {
      id: "vitamin_c",
      priority: 10,
      doseStandard: "500-1000mg par jour",
      doseVegetarian: "500-1000mg par jour"
    },
    {
      id: "vitamin_d3",
      priority: 9,
      doseStandard: "2000-4000 UI par jour",
      doseVegetarian: null
    },
    {
      id: "vitamin_d3_vegan",
      priority: 9,
      doseStandard: "2000-4000 UI par jour",
      doseVegetarian: "2000-4000 UI par jour"
    },
    {
      id: "zinc",
      priority: 9,
      doseStandard: "15-30mg par jour",
      doseVegetarian: "20-40mg par jour"
    },
    {
      id: "probiotics",
      priority: 7,
      doseStandard: "10-50 milliards UFC par jour",
      doseVegetarian: "10-50 milliards UFC par jour"
    }
  ],
  
  digestive_health: [
    {
      id: "probiotics",
      priority: 10,
      doseStandard: "10-50 milliards UFC par jour",
      doseVegetarian: "10-50 milliards UFC par jour"
    },
    {
      id: "digestive_enzymes",
      priority: 9,
      doseStandard: "Avec les repas principaux",
      doseVegetarian: null
    },
    {
      id: "digestive_enzymes_vegan",
      priority: 9,
      doseStandard: "Avec les repas principaux",
      doseVegetarian: "Avec les repas principaux"
    },
    {
      id: "fiber_complex",
      priority: 8,
      doseStandard: "5-15g par jour",
      doseVegetarian: "5-15g par jour"
    },
    {
      id: "turmeric",
      priority: 7,
      doseStandard: "500-1000mg par jour",
      doseVegetarian: "500-1000mg par jour"
    }
  ]
};
