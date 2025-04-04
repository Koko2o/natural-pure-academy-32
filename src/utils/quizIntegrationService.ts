
/**
 * Service d'intégration du système de recommandation au quiz nutritionnel
 * Version adaptée pour React à partir du fichier quiz_integration.ts
 */

import { getComprehensiveRecommendations } from './recommenderSystem';
import { QuizData, Recommendation, QuizResponse } from './types';

/**
 * Classe responsable de l'intégration du quiz avec le système de recommandation
 */
export class QuizIntegrationService {
  /**
   * Convertit les données du quiz au format attendu par l'algorithme de recommandation
   * @param quizData - Données du quiz depuis le composant React
   * @returns Données formatées pour le système de recommandation
   */
  public static formatQuizDataForRecommendation(quizData: QuizData): QuizResponse {
    // Extraction et transformation des données du quiz
    return {
      symptoms: quizData.symptoms || [],
      objectives: quizData.objectives || [],
      dietaryHabits: quizData.dietaryHabits || [],
      lifestyle: quizData.lifestyle || []
    };
  }

  /**
   * Récupère les recommandations personnalisées basées sur les données du quiz
   * @param quizData - Données du quiz complété
   * @returns Liste des recommandations générées
   */
  public static getPersonalizedRecommendations(quizData: QuizData): Recommendation[] {
    try {
      console.log("Traitement des données du quiz pour recommandations:", quizData);
      
      // Vérification des données minimales requises
      if (!quizData || !quizData.symptoms) {
        console.warn("Données du quiz insuffisantes pour des recommandations précises");
        return [];
      }
      
      // Génération des recommandations via l'algorithme
      const recommendations = getComprehensiveRecommendations(quizData);
      
      return recommendations;
    } catch (error) {
      console.error("Erreur lors de la génération des recommandations:", error);
      return [];
    }
  }

  /**
   * Enrichit les données du quiz avec des informations contextuelles
   * @param quizData - Données brutes du quiz
   * @returns Données du quiz enrichies
   */
  public static enrichQuizData(quizData: QuizData): QuizData {
    try {
      const enrichedData = { ...quizData };
      
      // Déduire des catégories de problèmes de santé à partir des symptômes
      if (enrichedData.symptoms && enrichedData.symptoms.length > 0) {
        const healthCategories: string[] = [];
        
        if (enrichedData.symptoms.some(symptom => 
          symptom.toLowerCase().includes('fatigue') || 
          symptom.toLowerCase().includes('énergie'))) {
          healthCategories.push('energy_issues');
        }
        
        if (enrichedData.symptoms.some(symptom => 
          symptom.toLowerCase().includes('sommeil') || 
          symptom.toLowerCase().includes('insomnie'))) {
          healthCategories.push('sleep_issues');
        }
        
        if (enrichedData.symptoms.some(symptom => 
          symptom.toLowerCase().includes('stress') || 
          symptom.toLowerCase().includes('anxiété'))) {
          healthCategories.push('stress_issues');
        }
        
        if (enrichedData.symptoms.some(symptom => 
          symptom.toLowerCase().includes('digestion') || 
          symptom.toLowerCase().includes('intestin'))) {
          healthCategories.push('digestive_issues');
        }
        
        enrichedData.healthCategories = healthCategories;
      }
      
      return enrichedData;
    } catch (error) {
      console.error("Erreur lors de l'enrichissement des données du quiz:", error);
      return quizData;
    }
  }

  /**
   * Analyse la gravité des symptômes et leur impact
   * @param symptoms - Liste des symptômes sélectionnés
   * @returns Score de gravité estimé (0-1)
   */
  public static analyzeSymptomSeverity(symptoms: string[]): number {
    if (!symptoms || symptoms.length === 0) return 0;
    
    // Un plus grand nombre de symptômes indique généralement une gravité plus élevée
    const baseScore = Math.min(symptoms.length / 10, 0.7);
    
    // Certains symptômes sont considérés comme plus graves
    const criticalSymptoms = [
      'troubles du sommeil chroniques',
      'fatigue extrême',
      'douleurs chroniques',
      'inflammation'
    ];
    
    const hasCriticalSymptoms = symptoms.some(symptom => 
      criticalSymptoms.some(critical => 
        symptom.toLowerCase().includes(critical.toLowerCase())
      )
    );
    
    return hasCriticalSymptoms ? baseScore + 0.3 : baseScore;
  }
}

export default QuizIntegrationService;
