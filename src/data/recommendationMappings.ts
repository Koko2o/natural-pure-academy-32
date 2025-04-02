/**
 * Mappings des recommandations en fonction des symptômes et objectifs
 */

// Catégories de symptômes
export const SYMPTOM_CATEGORIES = {
  DIGESTIVE: 'digestive',
  ENERGY: 'energy',
  IMMUNE: 'immune',
  MENTAL: 'mental',
  SLEEP: 'sleep',
  STRESS: 'stress'
};

// Intensité des symptômes (pour le calcul de priorité)
export const SYMPTOM_INTENSITY = {
  LOW: 0.3,
  MEDIUM: 0.6,
  HIGH: 1.0
};

// Intensité des objectifs (pour le calcul de priorité)
export const GOAL_INTENSITY = {
  LOW: 0.4,
  MEDIUM: 0.7,
  HIGH: 1.0
};

// Facteurs liés à l'âge
export const AGE_FACTORS = {
  UNDER_30: 'under_30',
  BETWEEN_30_50: 'between_30_50',
  ABOVE_50: 'above_50'
};

// Facteurs liés au genre
export const GENDER_FACTORS = {
  MALE: 'male',
  FEMALE: 'female'
};

// Facteurs de priorité des symptômes
export const SYMPTOM_PRIORITY_FACTORS = {
  CHRONIC: 2.0,  // Symptôme chronique
  ACUTE: 1.5,    // Symptôme aigu
  MILD: 1.0      // Symptôme léger
};

// Recommandations détaillées par symptôme
export const SYMPTOM_RECOMMENDATIONS_DETAILED = {
  fatigue: [
    { id: "vitamin_b_complex", priority: 8, doseInfo: "1 comprimé par jour", synergies: ["iron", "vitamin_c"] },
    { id: "coq10", priority: 7, doseInfo: "100-200mg par jour", synergies: ["omega3"] },
    { id: "iron", priority: 6, doseInfo: "14-18mg par jour", synergies: ["vitamin_c"] },
    { id: "rhodiola_rosea", priority: 5, doseInfo: "400-600mg par jour", synergies: ["vitamin_b_complex"] },
    { id: "vitamin_d3", priority: 4, doseInfo: "1000-2000 UI par jour", synergies: ["vitamin_k2"] }
  ],

  stress: [
    { id: "magnesium_glycinate", priority: 9, doseInfo: "300-400mg par jour", synergies: ["vitamin_b_complex"] },
    { id: "ashwagandha", priority: 8, doseInfo: "300-500mg par jour", synergies: ["rhodiola_rosea"] },
    { id: "l_theanine", priority: 7, doseInfo: "200-400mg par jour", synergies: ["magnesium_glycinate"] },
    { id: "rhodiola_rosea", priority: 6, doseInfo: "400-600mg par jour", synergies: ["ashwagandha"] },
    { id: "vitamin_b_complex", priority: 5, doseInfo: "1 comprimé par jour", synergies: ["magnesium_glycinate"] }
  ],

  sleep: [
    { id: "magnesium_glycinate", priority: 9, doseInfo: "300-400mg avant le coucher", synergies: ["l_theanine"] },
    { id: "melatonin", priority: 8, doseInfo: "0.5-3mg avant le coucher", synergies: ["magnesium_glycinate"] },
    { id: "valerian_root", priority: 7, doseInfo: "300-600mg avant le coucher", synergies: ["chamomile"] },
    { id: "l_theanine", priority: 6, doseInfo: "200mg avant le coucher", synergies: ["magnesium_glycinate"] },
    { id: "5htp", priority: 5, doseInfo: "50-100mg avant le coucher", synergies: ["vitamin_b6"] }
  ],

  immune: [
    { id: "vitamin_d3", priority: 9, doseInfo: "1000-4000 UI par jour", synergies: ["vitamin_k2", "zinc"] },
    { id: "vitamin_c", priority: 8, doseInfo: "500-1000mg par jour", synergies: ["zinc"] },
    { id: "zinc", priority: 7, doseInfo: "15-30mg par jour", synergies: ["vitamin_c"] },
    { id: "quercetin", priority: 6, doseInfo: "500-1000mg par jour", synergies: ["vitamin_c"] },
    { id: "elderberry", priority: 5, doseInfo: "selon les instructions du produit", synergies: ["vitamin_c", "zinc"] }
  ],

  digestion: [
    { id: "probiotics", priority: 9, doseInfo: "10-50 milliards CFU par jour", synergies: ["digestive_enzymes"] },
    { id: "digestive_enzymes", priority: 8, doseInfo: "1-2 gélules avant les repas", synergies: ["probiotics"] },
    { id: "l_glutamine", priority: 7, doseInfo: "5-10g par jour", synergies: ["probiotics"] },
    { id: "fiber_supplement", priority: 6, doseInfo: "5-10g par jour", synergies: ["probiotics"] },
    { id: "slippery_elm", priority: 5, doseInfo: "1-2g avant les repas", synergies: ["l_glutamine"] }
  ],

  anxiety: [
    { id: "l_theanine", priority: 9, doseInfo: "200-400mg par jour", synergies: ["magnesium_glycinate"] },
    { id: "magnesium_glycinate", priority: 8, doseInfo: "300-400mg par jour", synergies: ["l_theanine"] },
    { id: "ashwagandha", priority: 7, doseInfo: "300-500mg par jour", synergies: ["l_theanine"] },
    { id: "cbd_oil", priority: 6, doseInfo: "15-50mg par jour", synergies: ["l_theanine"] },
    { id: "valerian_root", priority: 5, doseInfo: "300-600mg par jour", synergies: ["magnesium_glycinate"] }
  ],

  focus: [
    { id: "lions_mane", priority: 8, doseInfo: "500-1000mg par jour", synergies: ["vitamin_b_complex"] },
    { id: "bacopa_monnieri", priority: 7, doseInfo: "300mg par jour", synergies: ["ginkgo_biloba"] },
    { id: "l_tyrosine", priority: 6, doseInfo: "500-1000mg par jour", synergies: ["vitamin_b_complex"] },
    { id: "ginkgo_biloba", priority: 5, doseInfo: "120-240mg par jour", synergies: ["bacopa_monnieri"] },
    { id: "alpha_gpc", priority: 4, doseInfo: "300-600mg par jour", synergies: ["lions_mane"] }
  ],

  mood: [
    { id: "saffron_extract", priority: 8, doseInfo: "30mg par jour", synergies: ["vitamin_d3"] },
    { id: "5htp", priority: 7, doseInfo: "50-100mg par jour", synergies: ["vitamin_b6"] },
    { id: "vitamin_d3", priority: 6, doseInfo: "1000-2000 UI par jour", synergies: ["omega3"] },
    { id: "omega3", priority: 5, doseInfo: "1000-2000mg EPA+DHA par jour", synergies: ["vitamin_d3"] },
    { id: "sam_e", priority: 4, doseInfo: "400-1200mg par jour", synergies: ["b_complex"] }
  ],

  joint_pain: [
    { id: "curcumin", priority: 9, doseInfo: "500-1000mg par jour", synergies: ["omega3"] },
    { id: "omega3", priority: 8, doseInfo: "2000-3000mg EPA+DHA par jour", synergies: ["curcumin"] },
    { id: "glucosamine_chondroitin", priority: 7, doseInfo: "1500mg glucosamine, 1200mg chondroitin", synergies: ["msm"] },
    { id: "msm", priority: 6, doseInfo: "3-6g par jour", synergies: ["glucosamine_chondroitin"] },
    { id: "collagen_peptides", priority: 5, doseInfo: "10-15g par jour", synergies: ["vitamin_c"] }
  ],

  inflammation: [
    { id: "curcumin", priority: 9, doseInfo: "500-1000mg par jour", synergies: ["omega3", "ginger"] },
    { id: "omega3", priority: 8, doseInfo: "2000-3000mg EPA+DHA par jour", synergies: ["curcumin", "vitamin_d3"] },
    { id: "ginger_extract", priority: 7, doseInfo: "500-1000mg par jour", synergies: ["curcumin"] },
    { id: "boswellia", priority: 6, doseInfo: "300-400mg par jour", synergies: ["curcumin"] },
    { id: "quercetin", priority: 5, doseInfo: "500-1000mg par jour", synergies: ["vitamin_c"] }
  ]
};

// Recommandations détaillées par objectif
export const GOAL_RECOMMENDATIONS_DETAILED = {
  immune_boost: [
    { id: "vitamin_d3", priority: 9, doseInfo: "1000-4000 UI par jour", synergies: ["vitamin_k2", "zinc"] },
    { id: "vitamin_c", priority: 8, doseInfo: "500-1000mg par jour", synergies: ["zinc"] },
    { id: "zinc", priority: 7, doseInfo: "15-30mg par jour", synergies: ["vitamin_c"] },
    { id: "elderberry", priority: 6, doseInfo: "selon les instructions du produit", synergies: ["vitamin_c", "zinc"] },
    { id: "echinacea", priority: 5, doseInfo: "selon les instructions du produit", synergies: ["vitamin_c"] }
  ],

  energy: [
    { id: "vitamin_b_complex", priority: 9, doseInfo: "1 comprimé par jour", synergies: ["iron", "coq10"] },
    { id: "rhodiola_rosea", priority: 8, doseInfo: "400-600mg par jour", synergies: ["vitamin_b_complex"] },
    { id: "coq10", priority: 7, doseInfo: "100-200mg par jour", synergies: ["vitamin_b_complex"] },
    { id: "iron", priority: 6, doseInfo: "14-18mg par jour", synergies: ["vitamin_c"] },
    { id: "cordyceps", priority: 5, doseInfo: "1000-3000mg par jour", synergies: ["rhodiola_rosea"] }
  ],

  stress_management: [
    { id: "ashwagandha", priority: 9, doseInfo: "300-500mg par jour", synergies: ["rhodiola_rosea"] },
    { id: "magnesium_glycinate", priority: 8, doseInfo: "300-400mg par jour", synergies: ["l_theanine"] },
    { id: "l_theanine", priority: 7, doseInfo: "200-400mg par jour", synergies: ["ashwagandha"] },
    { id: "rhodiola_rosea", priority: 6, doseInfo: "400-600mg par jour", synergies: ["ashwagandha"] },
    { id: "holy_basil", priority: 5, doseInfo: "300-600mg par jour", synergies: ["ashwagandha"] }
  ],

  sleep_improvement: [
    { id: "magnesium_glycinate", priority: 9, doseInfo: "300-400mg avant le coucher", synergies: ["l_theanine"] },
    { id: "melatonin", priority: 8, doseInfo: "0.5-3mg avant le coucher", synergies: ["magnesium_glycinate"] },
    { id: "l_theanine", priority: 7, doseInfo: "200mg avant le coucher", synergies: ["magnesium_glycinate"] },
    { id: "valerian_root", priority: 6, doseInfo: "300-600mg avant le coucher", synergies: ["chamomile"] },
    { id: "glycine", priority: 5, doseInfo: "3g avant le coucher", synergies: ["magnesium_glycinate"] }
  ],

  digestion: [
    { id: "probiotics", priority: 9, doseInfo: "10-50 milliards CFU par jour", synergies: ["digestive_enzymes"] },
    { id: "digestive_enzymes", priority: 8, doseInfo: "1-2 gélules avant les repas", synergies: ["probiotics"] },
    { id: "l_glutamine", priority: 7, doseInfo: "5-10g par jour", synergies: ["probiotics"] },
    { id: "ginger_extract", priority: 6, doseInfo: "500-1000mg par jour", synergies: ["digestive_enzymes"] },
    { id: "fiber_supplement", priority: 5, doseInfo: "5-10g par jour", synergies: ["probiotics"] }
  ],

  mental_clarity: [
    { id: "lions_mane", priority: 9, doseInfo: "500-1000mg par jour", synergies: ["bacopa_monnieri"] },
    { id: "bacopa_monnieri", priority: 8, doseInfo: "300mg par jour", synergies: ["lions_mane"] },
    { id: "omega3", priority: 7, doseInfo: "1000-2000mg EPA+DHA par jour", synergies: ["vitamin_d3"] },
    { id: "ginkgo_biloba", priority: 6, doseInfo: "120-240mg par jour", synergies: ["bacopa_monnieri"] },
    { id: "phosphatidylserine", priority: 5, doseInfo: "100-300mg par jour", synergies: ["omega3"] }
  ],

  weight_loss_support: [
    { id: "green_tea_extract", priority: 8, doseInfo: "300-500mg par jour", synergies: ["l_carnitine"] },
    { id: "l_carnitine", priority: 7, doseInfo: "1-3g par jour", synergies: ["green_tea_extract"] },
    { id: "protein_supplement", priority: 6, doseInfo: "20-30g par portion", synergies: ["l_carnitine"] },
    { id: "fiber_supplement", priority: 5, doseInfo: "5-10g par jour", synergies: ["probiotics"] },
    { id: "chromium", priority: 4, doseInfo: "200-400mcg par jour", synergies: ["vitamin_b_complex"] }
  ],

  heart_health: [
    { id: "omega3", priority: 9, doseInfo: "1000-3000mg EPA+DHA par jour", synergies: ["coq10"] },
    { id: "coq10", priority: 8, doseInfo: "100-200mg par jour", synergies: ["omega3"] },
    { id: "garlic_extract", priority: 7, doseInfo: "600-1200mg par jour", synergies: ["omega3"] },
    { id: "vitamin_k2", priority: 6, doseInfo: "100-300mcg par jour", synergies: ["vitamin_d3"] },
    { id: "magnesium_glycinate", priority: 5, doseInfo: "300-400mg par jour", synergies: ["coq10"] }
  ],

  bone_health: [
    { id: "vitamin_d3", priority: 9, doseInfo: "1000-4000 UI par jour", synergies: ["vitamin_k2", "calcium"] },
    { id: "vitamin_k2", priority: 8, doseInfo: "100-300mcg par jour", synergies: ["vitamin_d3"] },
    { id: "calcium", priority: 7, doseInfo: "1000-1200mg par jour", synergies: ["vitamin_d3", "magnesium"] },
    { id: "magnesium_glycinate", priority: 6, doseInfo: "300-400mg par jour", synergies: ["calcium"] },
    { id: "collagen_peptides", priority: 5, doseInfo: "10-15g par jour", synergies: ["vitamin_c"] }
  ],

  skin_health: [
    { id: "collagen_peptides", priority: 8, doseInfo: "10-15g par jour", synergies: ["vitamin_c"] },
    { id: "omega3", priority: 7, doseInfo: "1000-2000mg EPA+DHA par jour", synergies: ["vitamin_e"] },
    { id: "vitamin_c", priority: 6, doseInfo: "500-1000mg par jour", synergies: ["collagen_peptides"] },
    { id: "hyaluronic_acid", priority: 5, doseInfo: "100-200mg par jour", synergies: ["collagen_peptides"] },
    { id: "vitamin_e", priority: 4, doseInfo: "400 UI par jour", synergies: ["vitamin_c"] }
  ]
};

// Recommandations en fonction du mode de vie
export const LIFESTYLE_RECOMMENDATIONS = {
  high_stress: [
    { id: "magnesium_glycinate", priority: 9, doseInfo: "300-400mg par jour", synergies: ["l_theanine"] },
    { id: "ashwagandha", priority: 8, doseInfo: "300-500mg par jour", synergies: ["magnesium_glycinate"] },
    { id: "rhodiola_rosea", priority: 7, doseInfo: "400-600mg par jour", synergies: ["ashwagandha"] },
    { id: "l_theanine", priority: 6, doseInfo: "200-400mg par jour", synergies: ["magnesium_glycinate"] },
    { id: "vitamin_b_complex", priority: 5, doseInfo: "1 comprimé par jour", synergies: ["magnesium_glycinate"] }
  ],

  sedentary: [
    { id: "vitamin_d3", priority: 8, doseInfo: "1000-4000 UI par jour", synergies: ["vitamin_k2"] },
    { id: "magnesium_glycinate", priority: 7, doseInfo: "300-400mg par jour", synergies: ["vitamin_d3"] },
    { id: "omega3", priority: 6, doseInfo: "1000-2000mg EPA+DHA par jour", synergies: ["vitamin_d3"] },
    { id: "coq10", priority: 5, doseInfo: "100-200mg par jour", synergies: ["vitamin_b_complex"] },
    { id: "vitamin_b_complex", priority: 4, doseInfo: "1 comprimé par jour", synergies: ["coq10"] }
  ],

  poor_sleep: [
    { id: "magnesium_glycinate", priority: 9, doseInfo: "300-400mg avant le coucher", synergies: ["l_theanine"] },
    { id: "melatonin", priority: 8, doseInfo: "0.5-3mg avant le coucher", synergies: ["magnesium_glycinate"] },
    { id: "l_theanine", priority: 7, doseInfo: "200mg avant le coucher", synergies: ["magnesium_glycinate"] },
    { id: "valerian_root", priority: 6, doseInfo: "300-600mg avant le coucher", synergies: ["chamomile"] },
    { id: "glycine", priority: 5, doseInfo: "3g avant le coucher", synergies: ["magnesium_glycinate"] }
  ],

  screen_time: [
    { id: "lutein_zeaxanthin", priority: 8, doseInfo: "20mg lutein, 4mg zeaxanthin", synergies: ["omega3"] },
    { id: "omega3", priority: 7, doseInfo: "1000-2000mg EPA+DHA par jour", synergies: ["vitamin_e"] },
    { id: "astaxanthin", priority: 6, doseInfo: "4-12mg par jour", synergies: ["lutein_zeaxanthin"] },
    { id: "bilberry", priority: 5, doseInfo: "80-480mg par jour", synergies: ["lutein_zeaxanthin"] },
    { id: "vitamin_e", priority: 4, doseInfo: "400 UI par jour", synergies: ["omega3"] }
  ],

  processed_food: [
    { id: "probiotics", priority: 8, doseInfo: "10-50 milliards CFU par jour", synergies: ["digestive_enzymes"] },
    { id: "digestive_enzymes", priority: 7, doseInfo: "1-2 gélules avant les repas", synergies: ["probiotics"] },
    { id: "omega3", priority: 6, doseInfo: "1000-2000mg EPA+DHA par jour", synergies: ["vitamin_d3"] },
    { id: "vitamin_b_complex", priority: 5, doseInfo: "1 comprimé par jour", synergies: ["vitamin_c"] },
    { id: "vitamin_c", priority: 4, doseInfo: "500-1000mg par jour", synergies: ["vitamin_e"] }
  ],

  alcohol: [
    { id: "milk_thistle", priority: 9, doseInfo: "150-300mg par jour", synergies: ["nac"] },
    { id: "nac", priority: 8, doseInfo: "600-1200mg par jour", synergies: ["milk_thistle"] },
    { id: "vitamin_b_complex", priority: 7, doseInfo: "1 comprimé par jour", synergies: ["vitamin_c"] },
    { id: "magnesium_glycinate", priority: 6, doseInfo: "300-400mg par jour", synergies: ["vitamin_b_complex"] },
    { id: "taurine", priority: 5, doseInfo: "500-2000mg par jour", synergies: ["milk_thistle"] }
  ]
};

// Recommandations générales qui peuvent compléter les autres
export const ADDITIONAL_RECOMMENDATIONS = [
  { id: "multivitamin", priority: 5, doseInfo: "1 comprimé par jour", categories: ["general", "nutrition"] },
  { id: "vitamin_d3", priority: 7, doseInfo: "1000-4000 UI par jour", categories: ["immune", "mood", "bone"] },
  { id: "magnesium_glycinate", priority: 6, doseInfo: "300-400mg par jour", categories: ["stress", "sleep", "muscle"] },
  { id: "omega3", priority: 6, doseInfo: "1000-2000mg EPA+DHA par jour", categories: ["heart", "brain", "inflammation"] },
  { id: "probiotics", priority: 5, doseInfo: "10-50 milliards CFU par jour", categories: ["digestion", "immune"] }
];

// Alias pour la compatibilité avec les anciennes références
export const SYMPTOM_RECOMMENDATIONS = SYMPTOM_RECOMMENDATIONS_DETAILED;
export const GOAL_RECOMMENDATIONS = GOAL_RECOMMENDATIONS_DETAILED;

export default { SYMPTOM_CATEGORIES, SYMPTOM_RECOMMENDATIONS_DETAILED, GOAL_RECOMMENDATIONS_DETAILED, LIFESTYLE_RECOMMENDATIONS, SYMPTOM_INTENSITY, GOAL_INTENSITY, AGE_FACTORS, GENDER_FACTORS, SYMPTOM_PRIORITY_FACTORS, SYMPTOM_RECOMMENDATIONS, GOAL_RECOMMENDATIONS };