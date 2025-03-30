import { QuizResponse, BehavioralMetrics, Recommendation, NeuroProfile } from '@/utils/types';

/**
 * Système avancé d'extraction de caractéristiques comportementales
 * Analyse le comportement implicite de l'utilisateur pendant le quiz
 */
class BehavioralFeatureExtractor {
  /**
   * Extrait les patterns de stress basés sur les temps de réponse et les hésitations
   */
  extractStressPatterns(data: BehavioralMetrics): number {
    // Les utilisateurs stressés ont tendance à changer souvent leurs réponses
    // et ont des temps de réponse irréguliers
    const changeRate = data.changeFrequency / Math.max(1, data.responseTime.length);

    // Calcul de la variabilité du temps de réponse (écart-type)
    const avgTime = data.responseTime.reduce((sum, time) => sum + time, 0) / data.responseTime.length;
    const variance = data.responseTime.reduce((sum, time) => sum + Math.pow(time - avgTime, 2), 0) / data.responseTime.length;
    const stdDev = Math.sqrt(variance);

    // Normalisation de la variabilité
    const normalizedStdDev = Math.min(100, (stdDev / avgTime) * 100);

    // Influence du focus perdu (changement d'onglets/distractions)
    const focusLostFactor = data.focusLost * 5;

    // Combinaison des facteurs
    const stressScore = (changeRate * 30) + (normalizedStdDev * 0.4) + focusLostFactor;

    // Normaliser entre 0-100
    return Math.min(100, Math.max(0, stressScore));
  }

  /**
   * Extrait la charge cognitive basée sur les temps de pause et de réflexion
   */
  extractCognitiveLoad(data: BehavioralMetrics): number {
    // Un temps de pause élevé indique une charge cognitive plus importante
    const pauseFrequency = data.scrollBehavior.pauseFrequency;

    // Les changements fréquents de direction de défilement indiquent une recherche active d'informations
    const directionChangeFactor = Math.min(100, data.scrollBehavior.directionChanges * 5);

    // Combinaison des facteurs
    const cognitiveLoad = (pauseFrequency * 40) + (directionChangeFactor * 0.6);

    return Math.min(100, Math.max(0, cognitiveLoad));
  }

  /**
   * Extrait la vitesse de décision basée sur les temps de réponse
   */
  extractDecisionSpeed(data: BehavioralMetrics): number {
    // Calcul de la vitesse moyenne de réponse
    const avgTime = data.responseTime.reduce((sum, time) => sum + time, 0) / data.responseTime.length;

    // Normalisation inversée: plus le temps est court, plus le score est élevé
    // On considère qu'un temps de réponse de 15 secondes est la moyenne (50 points)
    const normalizedSpeed = 100 - Math.min(100, (avgTime / 15) * 50);

    return normalizedSpeed;
  }

  /**
   * Extrait la cohérence des réponses
   */
  extractConsistency(data: BehavioralMetrics): number {
    // Moins de changements de réponses indique plus de cohérence
    const baseConsistency = 100 - Math.min(100, data.changeFrequency * 10);

    // Si le temps entre les réponses est similaire, cela indique une cohérence
    const avgTime = data.responseTime.reduce((sum, time) => sum + time, 0) / data.responseTime.length;
    const variance = data.responseTime.reduce((sum, time) => sum + Math.pow(time - avgTime, 2), 0) / data.responseTime.length;
    const stdDev = Math.sqrt(variance);

    // Normalisation de la consistance du temps
    const timeConsistency = 100 - Math.min(100, (stdDev / avgTime) * 100);

    // Combinaison pondérée
    return (baseConsistency * 0.7) + (timeConsistency * 0.3);
  }
}

/**
 * Système avancé de recommandation basé sur l'IA
 * Utilise l'analyse comportementale pour générer des recommandations personnalisées
 */
export class AdvancedRecommenderSystem {
  private featureExtractor: BehavioralFeatureExtractor;

  constructor() {
    this.featureExtractor = new BehavioralFeatureExtractor();
  }

  /**
   * Analyse le comportement de l'utilisateur pour générer un profil neurologique
   */
  analyzeUserBehavior(behavioralMetrics: BehavioralMetrics): NeuroProfile {
    return {
      stressIndex: this.featureExtractor.extractStressPatterns(behavioralMetrics),
      decisionConfidence: this.featureExtractor.extractConsistency(behavioralMetrics),
      attentionScore: 100 - this.featureExtractor.extractCognitiveLoad(behavioralMetrics),
      consistencyIndex: this.featureExtractor.extractConsistency(behavioralMetrics)
    };
  }

  /**
   * Génère des recommandations personnalisées basées sur l'analyse comportementale et les réponses au quiz
   */
  getRecommendations(behavioralMetrics: BehavioralMetrics, quizResponses: QuizResponse): Recommendation[] {
    // Extraction des caractéristiques comportementales
    const stressLevel = this.featureExtractor.extractStressPatterns(behavioralMetrics);
    const cognitiveLoad = this.featureExtractor.extractCognitiveLoad(behavioralMetrics);
    const decisionConfidence = this.featureExtractor.extractConsistency(behavioralMetrics);

    // Base de connaissances de recommandations
    const recommendationDB: Recommendation[] = [
      {
        title: "Complexe Multivitamines Scientifique",
        description: "Formulation complète basée sur les dernières découvertes en micronutrition",
        confidence: 0.82,
        benefits: [
          "Support nutritionnel complet",
          "Optimisation des fonctions cellulaires",
          "Vitalité quotidienne"
        ],
        timeToEffect: "2-4 semaines",
        popularity: 87,
        url: "/labo/multivitamines"
      },
      {
        title: "Support Anti-Stress Naturel",
        description: "Complexe adaptogène naturel pour équilibrer les hormones du stress",
        confidence: 0.78,
        benefits: [
          "Réduction des niveaux de cortisol",
          "Amélioration de la résilience au stress",
          "Meilleure qualité de sommeil"
        ],
        timeToEffect: "1-3 semaines",
        popularity: 92,
        url: "/labo/anti-stress"
      },
      {
        title: "Complexe Neuro-Cognitif Avancé",
        description: "Formulation scientifique pour soutenir les fonctions cognitives et la mémoire",
        confidence: 0.75,
        benefits: [
          "Amélioration de la concentration",
          "Support de la mémoire à court et long terme",
          "Protection neuronale"
        ],
        timeToEffect: "3-6 semaines",
        popularity: 76,
        url: "/labo/neuro-cognitif"
      },
      {
        title: "Complexe Immuno-Protecteur",
        description: "Formule scientifique avancée pour renforcer les défenses naturelles",
        confidence: 0.73,
        benefits: [
          "Renforcement du système immunitaire",
          "Support cellulaire avancé",
          "Protection contre les radicaux libres"
        ],
        timeToEffect: "2-4 semaines",
        popularity: 82,
        url: "/labo/immuno-protecteur"
      },
      {
        title: "Complexe Énergétique Mitochondrial",
        description: "Support scientifique de la fonction mitochondriale pour une énergie optimale",
        confidence: 0.71,
        benefits: [
          "Production d'énergie cellulaire accrue",
          "Réduction de la fatigue",
          "Amélioration de la récupération"
        ],
        timeToEffect: "1-3 semaines",
        popularity: 79,
        url: "/labo/energetique-mitochondrial"
      },
      {
        title: "Complexe Sommeil Profond",
        description: "Formulation scientifique pour améliorer la qualité et la durée du sommeil",
        confidence: 0.68,
        benefits: [
          "Amélioration de l'endormissement",
          "Augmentation du sommeil profond",
          "Régulation du cycle circadien"
        ],
        timeToEffect: "1-2 semaines",
        popularity: 88,
        url: "/labo/sommeil-profond"
      },
      {
        title: "Support Digestif Scientifique",
        description: "Complexe probiotique et enzymatique pour optimiser la santé digestive",
        confidence: 0.65,
        benefits: [
          "Amélioration de la flore intestinale",
          "Optimisation de la digestion",
          "Support de la barrière intestinale"
        ],
        timeToEffect: "2-5 semaines",
        popularity: 74,
        url: "/labo/digestif-scientifique"
      }
    ];

    // Personnalisation des recommandations en fonction des caractéristiques comportementales
    // et des réponses au quiz
    const personalizedRecommendations = recommendationDB.map(recommendation => {
      let confidenceAdjustment = 0;

      // Ajustement basé sur le niveau de stress
      if (stressLevel > 70 && recommendation.title.includes("Anti-Stress")) {
        confidenceAdjustment += 0.15;
      }

      // Ajustement basé sur la charge cognitive
      if (cognitiveLoad > 70 && recommendation.title.includes("Neuro-Cognitif")) {
        confidenceAdjustment += 0.12;
      }

      // Prend en compte les symptômes spécifiques (si disponibles dans les réponses au quiz)
      if (quizResponses.symptoms) {
        const symptoms = Array.isArray(quizResponses.symptoms) 
          ? quizResponses.symptoms 
          : [quizResponses.symptoms];

        if (symptoms.includes('fatigue') && recommendation.title.includes("Énergétique")) {
          confidenceAdjustment += 0.1;
        }

        if (symptoms.includes('insomnie') && recommendation.title.includes("Sommeil")) {
          confidenceAdjustment += 0.15;
        }

        if (symptoms.includes('digestion') && recommendation.title.includes("Digestif")) {
          confidenceAdjustment += 0.1;
        }

        if (symptoms.includes('immunité') && recommendation.title.includes("Immuno")) {
          confidenceAdjustment += 0.12;
        }
      }

      // Ajustement basé sur le niveau d'activité physique (si disponible)
      if (quizResponses.activityLevel) {
        const activityLevel = typeof quizResponses.activityLevel === 'string' 
          ? parseInt(quizResponses.activityLevel) 
          : quizResponses.activityLevel;

        if (activityLevel > 7 && recommendation.title.includes("Énergétique")) {
          confidenceAdjustment += 0.08;
        }
      }

      // Ajustement basé sur l'âge
      if (quizResponses.age) {
        const age = typeof quizResponses.age === 'string' 
          ? parseInt(quizResponses.age) 
          : quizResponses.age;

        if (age > 50 && recommendation.title.includes("Cognitif")) {
          confidenceAdjustment += 0.05;
        }
      }

      // Ajustement de la confiance avec une limite maximum
      const adjustedConfidence = Math.min(0.98, recommendation.confidence + confidenceAdjustment);

      return {
        ...recommendation,
        confidence: adjustedConfidence
      };
    });

    // Tri par niveau de confiance et limite à 5 recommandations
    return personalizedRecommendations
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 5);
  }
}