import { 
  hybridModel, 
  ruleBasedModel 
} from './recommenderModels';
import { 
  QuizResponse, 
  Recommendation,
  RecommendationItem,
  NeuroProfile
} from '../types/recommendations';

// Système de recommandation optimisé
class RecommenderSystem {
  private modelVersion: string = 'v1.2.1';
  private datasetSize: number = 0;
  private lastTrainingDate: Date | null = null;

  constructor() {
    // Initialisation du système
    console.log("Système de recommandation scientifique initialisé");
    this.loadTrainingData();
  }

  /**
   * Charge les données d'apprentissage locales
   */
  private loadTrainingData(): void {
    try {
      // Dans une implémentation réelle, chargerait des données depuis une API
      this.datasetSize = 578; // Simulation
      this.lastTrainingDate = new Date(2025, 3, 15);
    } catch (error) {
      console.error("Erreur lors du chargement des données d'apprentissage:", error);
    }
  }

  /**
   * Génère des recommandations personnalisées basées sur les réponses au quiz
   * @param quizData Données du quiz utilisateur
   * @param neuroProfile Profil neurologique de l'utilisateur (facultatif)
   * @returns Liste de recommandations triées par pertinence
   */
  public getRecommendations(
    quizData: QuizResponse, 
    neuroProfile?: NeuroProfile
  ): RecommendationItem[] {
    try {
      // Log pour débuggage scientifique
      console.log("Génération de recommandations scientifiques pour:", 
        { symptômes: quizData.symptoms, objectifs: quizData.goals });

      // Déterminer le modèle à utiliser en fonction de la complexité du profil
      const hasComplexProfile = this.isComplexProfile(quizData);

      // Utiliser le modèle hybride pour les profils complexes
      const modelOutput = hasComplexProfile 
        ? hybridModel.predict(quizData)
        : ruleBasedModel.predict(quizData);

      // Transformer la sortie du modèle en recommandations formatées
      const recommendations = modelOutput.recommendations.map((rec, index) => ({
        id: rec.id,
        name: rec.name || `Supplément ${index + 1}`,
        description: this.generateDetailedDescription(rec, quizData),
        priority: index < 3 ? 10 - index : 5,
        matchScore: Math.round(modelOutput.confidence * 100),
        benefits: rec.benefits || [],
        timeToEffect: rec.timeToEffect || "2-4 semaines",
        recommendedDose: rec.dosage || "Selon les indications du fabricant",
        confidence: modelOutput.confidence,
        reason: this.generateMatchReason(rec, quizData),
        aiExplanations: [modelOutput.explanation]
      }));

      // Ajustement avec le profil neuro si disponible
      if (neuroProfile) {
        return this.adjustWithNeuroProfile(recommendations, neuroProfile);
      }

      return recommendations;
    } catch (error) {
      console.error("Erreur lors de la génération des recommandations:", error);
      // Fallback sur des recommandations génériques en cas d'erreur
      return this.getDefaultRecommendations();
    }
  }

  /**
   * Détermine si le profil de l'utilisateur est complexe
   */
  private isComplexProfile(quizData: QuizResponse): boolean {
    const numSymptoms = quizData.symptoms?.length || 0;
    const numGoals = quizData.goals?.length || 0;
    const hasDietaryRestrictions = quizData.dietaryPreferences?.length > 0;

    // Un profil est complexe s'il a plusieurs symptômes, objectifs, ou restrictions
    return (numSymptoms > 2 || numGoals > 2 || hasDietaryRestrictions);
  }

  /**
   * Génère une description détaillée pour une recommandation
   */
  private generateDetailedDescription(recommendation: any, quizData: QuizResponse): string {
    const mainSymptom = quizData.symptoms?.[0] || '';

    // Descriptions personnalisées selon le type de supplément
    if (recommendation.id.includes('magnesium')) {
      return `Le magnésium est un minéral essentiel qui intervient dans plus de 300 réactions enzymatiques. Des études scientifiques ont démontré son efficacité pour réduire la fatigue, améliorer le sommeil et soutenir le système nerveux.`;
    } else if (recommendation.id.includes('omega')) {
      return `Les acides gras oméga-3 sont cruciaux pour la santé cardiovasculaire et cognitive. Des recherches publiées dans le Journal of Nutrition montrent leur impact positif sur l'inflammation et les fonctions cérébrales.`;
    } else if (recommendation.id.includes('vitamin')) {
      return `Cette vitamine essentielle joue un rôle fondamental dans plusieurs processus biochimiques. Particulièrement recommandée pour adresser vos préoccupations de ${mainSymptom}.`;
    }

    return `Solution nutritionnelle scientifiquement formulée pour répondre à vos besoins spécifiques, notamment ${mainSymptom}.`;
  }

  /**
   * Génère une explication sur la raison de la correspondance
   */
  private generateMatchReason(recommendation: any, quizData: QuizResponse): string {
    // Si des symptômes sont spécifiés, les utiliser comme raison principale
    if (quizData.symptoms && quizData.symptoms.length > 0) {
      return `Basé sur votre préoccupation principale: ${quizData.symptoms[0]}`;
    }

    // Sinon, se baser sur les objectifs
    if (quizData.goals && quizData.goals.length > 0) {
      return `Aligné avec votre objectif de santé: ${quizData.goals[0]}`;
    }

    return "Recommandation basée sur votre profil global";
  }

  /**
   * Ajuste les recommandations avec le profil neurologique
   */
  private adjustWithNeuroProfile(
    recommendations: RecommendationItem[], 
    neuroProfile: NeuroProfile
  ): RecommendationItem[] {
    // Ajuster les priorités en fonction du profil neuro
    return recommendations.map(rec => {
      let adjustedRec = {...rec};

      // Si stress élevé, favoriser les suppléments anti-stress
      if (neuroProfile.stressLevel > 0.7) {
        if (['magnesium', 'ashwagandha', 'rhodiola'].some(term => rec.id.includes(term))) {
          adjustedRec.priority += 2;
          adjustedRec.matchScore = Math.min(99, adjustedRec.matchScore + 5);
        }
      }

      // Si charge cognitive élevée, favoriser les suppléments pour la cognition
      if (neuroProfile.cognitiveLoad > 0.6) {
        if (['omega', 'bacopa', 'ginkgo'].some(term => rec.id.includes(term))) {
          adjustedRec.priority += 2;
          adjustedRec.matchScore = Math.min(99, adjustedRec.matchScore + 5);
        }
      }

      return adjustedRec;
    }).sort((a, b) => b.priority - a.priority);
  }

  /**
   * Fournit des recommandations par défaut en cas d'erreur
   */
  private getDefaultRecommendations(): RecommendationItem[] {
    return [
      {
        id: "magnesium_bisglycinate",
        name: "Bisglycinate de Magnésium",
        description: "Forme hautement biodisponible de magnésium qui soutient le système nerveux et la fonction musculaire.",
        priority: 10,
        matchScore: 85,
        benefits: ["Réduit le stress", "Améliore le sommeil", "Soutient les fonctions musculaires"],
        timeToEffect: "2-3 semaines",
        recommendedDose: "300-400 mg par jour",
        confidence: 0.85,
        reason: "Recommandation nutritionnelle de base pour la santé globale",
        aiExplanations: ["Recommandation générée par le système de secours"]
      },
      {
        id: "vitamin_d3_k2",
        name: "Complexe Vitamine D3 + K2",
        description: "Association synergique pour une santé osseuse optimale et un soutien immunitaire.",
        priority: 9,
        matchScore: 80,
        benefits: ["Renforce l'immunité", "Soutient la santé osseuse", "Améliore l'humeur"],
        timeToEffect: "4-8 semaines",
        recommendedDose: "2000 UI / 100 μg par jour",
        confidence: 0.8,
        reason: "Supplément essentiel pour la santé globale",
        aiExplanations: ["Recommandation générée par le système de secours"]
      }
    ];
  }

  /**
   * Retourne l'état actuel du modèle d'IA
   */
  public getAIStatus(): {
    modelVersion: string;
    datasetSize: number;
    lastTraining: Date | null;
    accuracy: number;
  } {
    return {
      modelVersion: this.modelVersion,
      datasetSize: this.datasetSize,
      lastTraining: this.lastTrainingDate,
      accuracy: 0.89 // Simulation de précision
    };
  }
}

// Exportation de l'instance unique du système de recommandation
export const recommenderSystem = new RecommenderSystem();

export default recommenderSystem;