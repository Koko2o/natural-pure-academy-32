
import { useLanguage } from '../contexts/LanguageContext';

// Types pour le système de recommandation
export interface QuizResponses {
  symptomes?: string[];
  objectifs?: string[];
  alimentation?: string;
  activitePhysique?: string;
  qualiteSommeil?: string;
  niveauStress?: string;
  fruitsLegumes?: string;
  viande?: string;
  poisson?: string;
}

export interface ComplementData {
  categorie: string;
  benefices: string[];
  symptomes: string[];
  objectifs: string[];
  dosage: string;
  sources_naturelles: string;
  delai_efficacite: string;
  efficacite: number;
  contre_indications: string;
  regime_alimentaire: string[];
}

export interface ScoredComplement {
  name: string;
  score: number;
  data: ComplementData;
}

export interface Recommendation {
  rank: number;
  name: string;
  category: string;
  efficacyPercentage: number;
  dosage: string;
  benefits: string[];
  naturalSources: string;
  timeToEffect: string;
  cautions: string;
  isPrimary: boolean;
}

// Base de données des compléments
const complementsDatabase: Record<string, ComplementData> = {
  "Magnésium Marin": {
    categorie: "Minéraux",
    benefices: [
      "Réduit la fatigue et l'épuisement",
      "Favorise la détente musculaire",
      "Soutient la fonction nerveuse",
      "Améliore la qualité du sommeil"
    ],
    symptomes: ["Fatigue", "Stress/Anxiété", "Troubles du sommeil", "Douleurs musculaires"],
    objectifs: ["Plus d'énergie", "Réduire mon stress", "Meilleur sommeil"],
    dosage: "300-400 mg par jour, de préférence le soir",
    sources_naturelles: "Algues marines, eaux minérales riches en magnésium, légumes verts",
    delai_efficacite: "2 à 3 semaines pour un effet optimal",
    efficacite: 90,
    contre_indications: "Insuffisance rénale, prise de certains antibiotiques",
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"]
  },
  "Vitamine D3 Naturelle": {
    categorie: "Vitamines",
    benefices: [
      "Renforce le système immunitaire",
      "Favorise l'absorption du calcium",
      "Améliore l'humeur et combat la dépression saisonnière",
      "Soutient la santé osseuse"
    ],
    symptomes: ["Fatigue", "Sensibilité au froid", "Douleurs articulaires"],
    objectifs: ["Renforcer mon immunité", "Plus d'énergie"],
    dosage: "1000-2000 UI par jour pendant les repas",
    sources_naturelles: "Exposition solaire, champignons séchés au soleil, poissons gras",
    delai_efficacite: "4 à 8 semaines pour des effets notables",
    efficacite: 85,
    contre_indications: "Hypercalcémie, maladies rénales, prise de certains médicaments",
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"]
  },
  "Complexe Vitamine B": {
    categorie: "Vitamines",
    benefices: [
      "Transforme les aliments en énergie",
      "Améliore la fonction cognitive",
      "Réduit la fatigue",
      "Soutient le système nerveux"
    ],
    symptomes: ["Fatigue", "Manque de concentration", "Sautes d'humeur", "Stress/Anxiété"],
    objectifs: ["Plus d'énergie", "Améliorer ma concentration", "Réduire mon stress"],
    dosage: "Un comprimé par jour avec le petit-déjeuner",
    sources_naturelles: "Légumineuses, céréales complètes, levure nutritionnelle, légumes verts",
    delai_efficacite: "2 à 4 semaines pour des effets optimaux",
    efficacite: 88,
    contre_indications: "Peut colorer l'urine en jaune vif (normal), interactions médicamenteuses rares",
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"]
  },
  "Oméga-3 (EPA/DHA)": {
    categorie: "Acides Gras Essentiels",
    benefices: [
      "Soutient la santé cardiovasculaire",
      "Réduit l'inflammation",
      "Améliore la fonction cognitive",
      "Participe à l'équilibre émotionnel"
    ],
    symptomes: ["Problèmes de concentration", "Douleurs articulaires", "Sautes d'humeur"],
    objectifs: ["Améliorer ma concentration", "Réduire mon stress"],
    dosage: "1000-2000 mg par jour pendant les repas",
    sources_naturelles: "Poissons gras (saumon, maquereau, sardines), graines de lin, graines de chia",
    delai_efficacite: "4 à 12 semaines pour des effets notables",
    efficacite: 82,
    contre_indications: "Troubles de la coagulation, prise d'anticoagulants, allergie aux poissons",
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien"]
  },
  "Ashwagandha": {
    categorie: "Plantes adaptogènes",
    benefices: [
      "Réduit le stress et l'anxiété",
      "Améliore la résistance au stress",
      "Renforce le système immunitaire",
      "Favorise un sommeil réparateur"
    ],
    symptomes: ["Stress/Anxiété", "Troubles du sommeil", "Fatigue"],
    objectifs: ["Réduire mon stress", "Meilleur sommeil", "Plus d'énergie"],
    dosage: "300-500 mg d'extrait standardisé, 1-2 fois par jour",
    sources_naturelles: "Racine de Withania somnifera (plante ayurvédique traditionnelle)",
    delai_efficacite: "2 à 6 semaines pour des effets optimaux",
    efficacite: 80,
    contre_indications: "Grossesse, allaitement, maladies auto-immunes, certains médicaments psychotropes",
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"]
  }
};

// Classe du système de recommandation
export class RecommendationSystem {
  private sectionWeights: Record<string, number>;
  private symptomWeights: Record<string, number>;
  private objectiveWeights: Record<string, number>;
  private dietAdjustments: Record<string, Record<string, number>>;
  private activityAdjustments: Record<string, Record<string, number>>;
  private sleepAdjustments: Record<string, Record<string, number>>;
  private stressAdjustments: Record<string, Record<string, number>>;
  private fruitVegAdjustments: Record<string, Record<string, number>>;

  constructor() {
    // Poids des différentes sections du quiz
    this.sectionWeights = {
      symptomes: 0.35,      // 35% - Les symptômes sont prioritaires
      objectifs: 0.30,      // 30% - Les objectifs sont presque aussi importants
      alimentation: 0.15,   // 15% - Le régime alimentaire influence les recommandations
      modeDeVie: 0.12,      // 12% - Le mode de vie est important mais moins prioritaire
      proteines: 0.08       // 8% - La consommation de protéines est complémentaire
    };
    
    // Poids des symptômes
    this.symptomWeights = {
      "Fatigue": 0.9,
      "Troubles du sommeil": 0.85,
      "Stress/Anxiété": 0.8,
      "Problèmes digestifs": 0.75,
      "Douleurs articulaires": 0.7,
      "Problèmes de peau": 0.65,
      "Maux de tête": 0.8,
      "Sautes d'humeur": 0.6,
      "Fringales": 0.5,
      "Manque de concentration": 0.75,
      "Sensibilité au froid": 0.6,
      "Cheveux/Ongles fragiles": 0.55
    };
    
    // Poids des objectifs
    this.objectiveWeights = {
      "Plus d'énergie": 0.9,
      "Meilleur sommeil": 0.85,
      "Améliorer ma concentration": 0.8,
      "Renforcer mon immunité": 0.85,
      "Réduire mon stress": 0.8,
      "Soutenir ma digestion": 0.75,
      "Améliorer ma peau": 0.7,
      "Équilibrer mon poids": 0.75
    };
    
    // Facteurs d'ajustement selon le régime alimentaire
    this.dietAdjustments = {
      "Omnivore": {
        "Vitamine B12": 0,
        "Fer": 0,
        "Oméga-3 (EPA/DHA)": 0
      },
      "Flexitarien": {
        "Vitamine B12": 0.1,
        "Fer": 0.1,
        "Oméga-3 (EPA/DHA)": 0.1
      },
      "Pescetarien": {
        "Vitamine B12": 0.2,
        "Fer": 0.3,
        "Oméga-3 (EPA/DHA)": 0
      },
      "Végétarien": {
        "Vitamine B12": 0.6,
        "Fer": 0.5,
        "Oméga-3 (EPA/DHA)": 0.6
      },
      "Végan": {
        "Vitamine B12": 1.0,
        "Fer": 0.7,
        "Oméga-3 d'origine végétale (ALA)": 0.8,
        "Vitamine D3 naturelle": 0.5
      }
    };
    
    // Facteurs d'ajustement selon l'activité physique
    this.activityAdjustments = {
      "Quotidiennement": {
        "Magnésium marin": 0.3,
        "Complexe Vitamine B": 0.2,
        "Coenzyme Q10": 0.3
      },
      "2-3 fois par semaine": {
        "Magnésium marin": 0.2,
        "Complexe Vitamine B": 0.1,
        "Coenzyme Q10": 0.2
      },
      "Quelques fois par mois": {
        "Magnésium marin": 0.1,
        "Complexe Vitamine B": 0.05,
        "Coenzyme Q10": 0.1
      },
      "Rarement ou jamais": {
        "Magnésium marin": 0,
        "Complexe Vitamine B": 0,
        "Coenzyme Q10": 0
      }
    };
    
    // Facteurs d'ajustement selon la qualité du sommeil
    this.sleepAdjustments = {
      "Excellent - Je me réveille frais et dispos": {
        "Mélatonine naturelle": -0.5,
        "Valériane": -0.5,
        "Magnésium marin": -0.2
      },
      "Bon - Quelques difficultés occasionnelles": {
        "Mélatonine naturelle": 0,
        "Valériane": 0,
        "Magnésium marin": 0
      },
      "Moyen - Difficultés fréquentes (endormissement, réveils)": {
        "Mélatonine naturelle": 0.3,
        "Valériane": 0.3,
        "Magnésium marin": 0.2
      },
      "Mauvais - Problèmes chroniques de sommeil": {
        "Mélatonine naturelle": 0.6,
        "Valériane": 0.6,
        "Magnésium marin": 0.4
      }
    };
    
    // Facteurs d'ajustement selon le niveau de stress
    this.stressAdjustments = {
      "Faible - Je me sens généralement détendu": {
        "Ashwagandha": -0.3,
        "Rhodiola Rosea": -0.3,
        "Magnésium marin": -0.2
      },
      "Modéré - Stress occasionnel": {
        "Ashwagandha": 0.1,
        "Rhodiola Rosea": 0.1,
        "Magnésium marin": 0.1
      },
      "Élevé - Stress fréquent": {
        "Ashwagandha": 0.4,
        "Rhodiola Rosea": 0.4,
        "Magnésium marin": 0.3
      },
      "Sévère - Stress chronique": {
        "Ashwagandha": 0.7,
        "Rhodiola Rosea": 0.7,
        "Magnésium marin": 0.5
      }
    };
    
    // Facteurs d'ajustement selon la consommation de fruits et légumes
    this.fruitVegAdjustments = {
      "0 à 1 portion": {
        "Vitamine C naturelle": 0.5,
        "Fibres prébiotiques": 0.5,
        "Complexe Vitamine B": 0.3
      },
      "2 à 3 portions": {
        "Vitamine C naturelle": 0.3,
        "Fibres prébiotiques": 0.3,
        "Complexe Vitamine B": 0.2
      },
      "4 à 5 portions": {
        "Vitamine C naturelle": 0.1,
        "Fibres prébiotiques": 0.1,
        "Complexe Vitamine B": 0.1
      },
      "6 portions ou plus": {
        "Vitamine C naturelle": 0,
        "Fibres prébiotiques": 0,
        "Complexe Vitamine B": 0
      }
    };
  }

  /**
   * Calcule les scores pour tous les compléments en fonction des réponses au quiz
   */
  private calculateScores(quizResponses: QuizResponses): ScoredComplement[] {
    const scores: Record<string, number> = {};
    
    // Initialiser les scores pour tous les compléments
    for (const complement in complementsDatabase) {
      scores[complement] = 0;
    }
    
    // 1. Analyser les symptômes sélectionnés
    if (quizResponses.symptomes && quizResponses.symptomes.length > 0) {
      this._processSymptoms(quizResponses.symptomes, scores);
    }
    
    // 2. Analyser les objectifs sélectionnés
    if (quizResponses.objectifs && quizResponses.objectifs.length > 0) {
      this._processObjectives(quizResponses.objectifs, scores);
    }
    
    // 3. Ajuster selon le régime alimentaire
    if (quizResponses.alimentation) {
      this._adjustForDiet(quizResponses.alimentation, scores);
    }
    
    // 4. Ajuster selon l'activité physique
    if (quizResponses.activitePhysique) {
      this._adjustForActivity(quizResponses.activitePhysique, scores);
    }
    
    // 5. Ajuster selon la qualité du sommeil
    if (quizResponses.qualiteSommeil) {
      this._adjustForSleep(quizResponses.qualiteSommeil, scores);
    }
    
    // 6. Ajuster selon le niveau de stress
    if (quizResponses.niveauStress) {
      this._adjustForStress(quizResponses.niveauStress, scores);
    }
    
    // 7. Ajuster selon la consommation de fruits et légumes
    if (quizResponses.fruitsLegumes) {
      this._adjustForFruitVeg(quizResponses.fruitsLegumes, scores);
    }
    
    // 8. Vérifier la compatibilité avec le régime alimentaire
    this._checkDietCompatibility(quizResponses.alimentation, scores);
    
    // Convertir les scores en tableau et trier
    const sortedRecommendations = Object.entries(scores)
      .map(([name, score]) => ({
        name,
        score,
        data: complementsDatabase[name]
      }))
      .filter(item => item.score > 0) // Éliminer les scores négatifs ou nuls
      .sort((a, b) => b.score - a.score); // Trier par score décroissant
    
    return sortedRecommendations;
  }
  
  /**
   * Traite les symptômes sélectionnés et met à jour les scores
   */
  private _processSymptoms(selectedSymptoms: string[], scores: Record<string, number>): void {
    for (const symptom of selectedSymptoms) {
      const symptomWeight = this.symptomWeights[symptom] || 0.5; // Poids par défaut si non défini
      
      // Parcourir tous les compléments
      for (const complement in complementsDatabase) {
        const complementData = complementsDatabase[complement];
        
        // Si le complément cible ce symptôme
        if (complementData.symptomes && complementData.symptomes.includes(symptom)) {
          // Calculer le score basé sur le poids du symptôme, l'efficacité du complément et le poids de la section
          const scoreIncrement = symptomWeight * (complementData.efficacite / 100) * this.sectionWeights.symptomes;
          scores[complement] += scoreIncrement;
        }
      }
    }
  }
  
  /**
   * Traite les objectifs sélectionnés et met à jour les scores
   */
  private _processObjectives(selectedObjectives: string[], scores: Record<string, number>): void {
    for (const objective of selectedObjectives) {
      const objectiveWeight = this.objectiveWeights[objective] || 0.5; // Poids par défaut si non défini
      
      // Parcourir tous les compléments
      for (const complement in complementsDatabase) {
        const complementData = complementsDatabase[complement];
        
        // Si le complément correspond à cet objectif
        if (complementData.objectifs && complementData.objectifs.includes(objective)) {
          // Calculer le score basé sur le poids de l'objectif, l'efficacité du complément et le poids de la section
          const scoreIncrement = objectiveWeight * (complementData.efficacite / 100) * this.sectionWeights.objectifs;
          scores[complement] += scoreIncrement;
        }
      }
    }
  }
  
  /**
   * Ajuste les scores en fonction du régime alimentaire
   */
  private _adjustForDiet(diet: string, scores: Record<string, number>): void {
    if (this.dietAdjustments[diet]) {
      const adjustments = this.dietAdjustments[diet];
      
      for (const complement in adjustments) {
        if (scores[complement] !== undefined) {
          scores[complement] += adjustments[complement] * this.sectionWeights.alimentation;
        }
      }
    }
  }
  
  /**
   * Ajuste les scores en fonction de l'activité physique
   */
  private _adjustForActivity(activity: string, scores: Record<string, number>): void {
    if (this.activityAdjustments[activity]) {
      const adjustments = this.activityAdjustments[activity];
      
      for (const complement in adjustments) {
        if (scores[complement] !== undefined) {
          scores[complement] += adjustments[complement] * this.sectionWeights.modeDeVie;
        }
      }
    }
  }
  
  /**
   * Ajuste les scores en fonction de la qualité du sommeil
   */
  private _adjustForSleep(sleepQuality: string, scores: Record<string, number>): void {
    if (this.sleepAdjustments[sleepQuality]) {
      const adjustments = this.sleepAdjustments[sleepQuality];
      
      for (const complement in adjustments) {
        if (scores[complement] !== undefined) {
          scores[complement] += adjustments[complement] * this.sectionWeights.modeDeVie;
        }
      }
    }
  }
  
  /**
   * Ajuste les scores en fonction du niveau de stress
   */
  private _adjustForStress(stressLevel: string, scores: Record<string, number>): void {
    if (this.stressAdjustments[stressLevel]) {
      const adjustments = this.stressAdjustments[stressLevel];
      
      for (const complement in adjustments) {
        if (scores[complement] !== undefined) {
          scores[complement] += adjustments[complement] * this.sectionWeights.modeDeVie;
        }
      }
    }
  }
  
  /**
   * Ajuste les scores en fonction de la consommation de fruits et légumes
   */
  private _adjustForFruitVeg(fruitVegConsumption: string, scores: Record<string, number>): void {
    if (this.fruitVegAdjustments[fruitVegConsumption]) {
      const adjustments = this.fruitVegAdjustments[fruitVegConsumption];
      
      for (const complement in adjustments) {
        if (scores[complement] !== undefined) {
          scores[complement] += adjustments[complement] * this.sectionWeights.proteines;
        }
      }
    }
  }
  
  /**
   * Vérifie la compatibilité des compléments avec le régime alimentaire
   */
  private _checkDietCompatibility(diet: string, scores: Record<string, number>): void {
    for (const complement in complementsDatabase) {
      const complementData = complementsDatabase[complement];
      
      // Si le complément n'est pas compatible avec le régime alimentaire, réduire fortement son score
      if (complementData.regime_alimentaire && !complementData.regime_alimentaire.includes(diet)) {
        scores[complement] = 0; // Éliminer ce complément des recommandations
      }
    }
  }
  
  /**
   * Génère les recommandations finales basées sur les scores calculés
   */
  private generateRecommendations(sortedScores: ScoredComplement[], limit: number = 5): Recommendation[] {
    // Prendre les 'limit' premiers compléments
    const topRecommendations = sortedScores.slice(0, limit);
    
    // Normaliser les scores pour obtenir des pourcentages d'efficacité
    const maxScore = topRecommendations[0]?.score || 1;
    
    return topRecommendations.map((item, index) => {
      const normalizedScore = Math.round((item.score / maxScore) * 100);
      
      return {
        rank: index + 1,
        name: item.name,
        category: item.data.categorie,
        efficacyPercentage: normalizedScore,
        dosage: item.data.dosage,
        benefits: item.data.benefices,
        naturalSources: item.data.sources_naturelles,
        timeToEffect: item.data.delai_efficacite,
        cautions: item.data.contre_indications,
        isPrimary: index < 3 // Les 3 premiers sont considérés comme principaux
      };
    });
  }
  
  /**
   * Fonction principale pour obtenir les recommandations
   */
  public getRecommendations(quizResponses: QuizResponses): Recommendation[] {
    const scores = this.calculateScores(quizResponses);
    return this.generateRecommendations(scores, 5); // Top 5 recommandations
  }
}

// Hook pour utiliser le système de recommandation
export const useRecommendationSystem = () => {
  const { t } = useLanguage();
  
  const translateBenefits = (benefits: string[]): string[] => {
    return benefits.map(benefit => t(`benefit_${benefit.toLowerCase().replace(/\s+/g, '_')}`, benefit));
  };
  
  const translateRecommendations = (recommendations: Recommendation[]): Recommendation[] => {
    return recommendations.map(rec => ({
      ...rec,
      name: t(`supplement_${rec.name.toLowerCase().replace(/\s+/g, '_')}`, rec.name),
      category: t(`category_${rec.category.toLowerCase().replace(/\s+/g, '_')}`, rec.category),
      benefits: translateBenefits(rec.benefits),
      naturalSources: t(`sources_${rec.name.toLowerCase().replace(/\s+/g, '_')}`, rec.naturalSources),
      timeToEffect: t(`time_effect_${rec.name.toLowerCase().replace(/\s+/g, '_')}`, rec.timeToEffect),
      cautions: t(`cautions_${rec.name.toLowerCase().replace(/\s+/g, '_')}`, rec.cautions),
    }));
  };
  
  const getRecommendations = (quizResponses: QuizResponses): Recommendation[] => {
    const system = new RecommendationSystem();
    const recommendations = system.getRecommendations(quizResponses);
    return translateRecommendations(recommendations);
  };
  
  return { getRecommendations };
};
