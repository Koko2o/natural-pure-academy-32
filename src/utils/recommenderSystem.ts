
import { QuizResponse, Recommendation } from '@/components/quiz/types';

// Advanced behavioral feature extraction system
interface FeatureExtraction {
  extractStressPatterns(data: BehavioralMetrics): number;
  extractCognitiveLoad(data: BehavioralMetrics): number;
  extractDecisionSpeed(data: BehavioralMetrics): number;
  extractConsistency(data: BehavioralMetrics): number;
}

interface BehavioralMetrics {
  responseTime: number[];
  hesitationCount: number[];
  changeFrequency: number;
  focusLost: number;
  scrollBehavior: {
    speed: number;
    directionChanges: number;
    pauseFrequency: number;
  };
  mouseMovement?: {
    velocity: number;
    heatmapConcentration: number[];
  };
}

// Neural classifier for understanding user needs
class NeuralClassifier {
  private weightedFactors: Map<string, number> = new Map([
    ['stressLevel', 0.25],
    ['cognitiveLoad', 0.20],
    ['decisionSpeed', 0.15],
    ['consistency', 0.15],
    ['symptomSeverity', 0.25]
  ]);

  classifyUserNeeds(features: Record<string, number>, responses: QuizResponse): string[] {
    const needs: string[] = [];
    
    // Cognitive support classification
    const cognitiveSupport = 
      features.cognitiveLoad * this.weightedFactors.get('cognitiveLoad')! + 
      features.stressLevel * this.weightedFactors.get('stressLevel')!;
    
    if (cognitiveSupport > 0.65) {
      needs.push('cognitive_support');
    }
    
    // Stress management classification
    if (features.stressLevel > 0.7 || 
       (features.stressLevel > 0.5 && responses.stressLevel === 'élevé')) {
      needs.push('stress_management');
    }
    
    // Energy support classification
    if (responses.energyLevel === 'faible' || 
       (responses.sleepQuality === 'mauvaise' && features.decisionSpeed < 0.4)) {
      needs.push('energy_support');
    }
    
    // Immune support classification
    if (responses.immuneSystem === 'affaibli' || 
       (responses.fruitVegConsumption === 'peu' && responses.seasonalIssues === true)) {
      needs.push('immune_support');
    }
    
    // Digestive support classification
    if (responses.digestiveComfort === 'inconfort' ||
        responses.symptoms?.includes('ballonnements')) {
      needs.push('digestive_support');
    }
    
    // Return at least one need category
    return needs.length > 0 ? needs : ['general_support'];
  }
}

// Recommendation generator using advanced matching algorithm
class RecommendationEngine {
  private recommendations: Map<string, Recommendation[]> = new Map([
    ['cognitive_support', [
      {
        title: "Complexe Neuro-Cognitive Premium",
        description: "Formulation avancée ciblant les voies neurologiques impliquées dans la cognition et la concentration",
        url: "https://example.com/neuro-cognitive",
        confidence: 0.92,
        benefits: [
          "Amélioration des fonctions cognitives",
          "Support de la mémoire de travail",
          "Optimisation de la concentration prolongée"
        ],
        timeToEffect: "2-6 semaines",
        popularity: 94
      },
      {
        title: "Oméga-3 DHA Concentré",
        description: "Support neuronal enrichi en DHA hautement biodisponible",
        url: "https://example.com/omega-dha",
        confidence: 0.87,
        benefits: [
          "Fluidité membranaire neuronale",
          "Support des connections synaptiques",
          "Maintenance des fonctions cérébrales"
        ],
        timeToEffect: "4-8 semaines",
        popularity: 91
      }
    ]],
    ['stress_management', [
      {
        title: "Complexe Anti-Stress Avancé",
        description: "Formule adaptogène complète avec ashwagandha, rhodiola et magnésium optimisé",
        url: "https://example.com/anti-stress",
        confidence: 0.94,
        benefits: [
          "Régulation des hormones de stress",
          "Équilibre du système nerveux",
          "Amélioration de la résistance au stress quotidien"
        ],
        timeToEffect: "1-3 semaines",
        popularity: 96
      },
      {
        title: "Support Sommeil & Récupération",
        description: "Combinaison synergique pour la qualité du sommeil et la régénération nocturne",
        url: "https://example.com/sommeil",
        confidence: 0.89,
        benefits: [
          "Endormissement facilité",
          "Sommeil profond amélioré",
          "Récupération optimisée"
        ],
        timeToEffect: "1-2 semaines",
        popularity: 93
      }
    ]],
    ['energy_support', [
      {
        title: "Complexe Énergie Cellulaire",
        description: "Soutien métabolique avancé ciblant la production d'énergie mitochondriale",
        url: "https://example.com/energie",
        confidence: 0.91,
        benefits: [
          "Production d'ATP optimisée",
          "Réduction de la fatigue chronique",
          "Soutien des fonctions métaboliques"
        ],
        timeToEffect: "2-4 semaines",
        popularity: 90
      }
    ]],
    ['immune_support', [
      {
        title: "Complexe Immunitaire Avancé",
        description: "Formulation complète pour renforcer les défenses naturelles",
        url: "https://example.com/immunitaire",
        confidence: 0.88,
        benefits: [
          "Activation des cellules NK",
          "Modulation de la réponse immunitaire",
          "Défenses renforcées face aux agressions"
        ],
        timeToEffect: "1-4 semaines",
        popularity: 89
      }
    ]],
    ['digestive_support', [
      {
        title: "Complexe Digestif Complet",
        description: "Solution intégrale pour l'équilibre de la flore intestinale et le confort digestif",
        url: "https://example.com/digestif",
        confidence: 0.90,
        benefits: [
          "Equilibre du microbiome",
          "Amélioration du transit",
          "Confort digestif optimal"
        ],
        timeToEffect: "1-3 semaines",
        popularity: 91
      }
    ]],
    ['general_support', [
      {
        title: "Complexe Multivitamines Scientifique",
        description: "Formulation complète basée sur les dernières découvertes en micronutrition",
        url: "https://example.com/multivitamines",
        confidence: 0.85,
        benefits: [
          "Support nutritionnel complet",
          "Optimisation des fonctions cellulaires",
          "Vitalité quotidienne"
        ],
        timeToEffect: "2-4 semaines",
        popularity: 87
      }
    ]]
  ]);

  private getConfidenceAdjustment(profile: NeuroProfile): number {
    // Calculate confidence adjustment based on neuro profile
    const consistency = (profile.decisionConfidence + profile.consistencyIndex) / 200;
    return 0.85 + (consistency * 0.15); // Adjust confidence between 0.85-1.0
  }

  generatePersonalizedRecommendations(
    userNeeds: string[], 
    responses: QuizResponse,
    profile: NeuroProfile
  ): Recommendation[] {
    const personalizedRecs: Recommendation[] = [];
    const confidenceAdjustment = this.getConfidenceAdjustment(profile);
    
    // Get primary recommendations based on user needs
    userNeeds.forEach(need => {
      const categoryRecs = this.recommendations.get(need) || [];
      
      // Personalize each recommendation
      categoryRecs.forEach(rec => {
        // Create a copy to avoid mutating the original
        const adjustedRec = {...rec};
        
        // Adjust confidence based on profile
        adjustedRec.confidence = Math.min(adjustedRec.confidence * confidenceAdjustment, 0.98);
        
        // Personalize description based on user profile
        if (profile.stressIndex > 75) {
          adjustedRec.description = `${adjustedRec.description} particulièrement adapté aux profils sous forte pression.`;
        }
        
        // Add to recommendations list if not already similar
        if (!this.isDuplicate(personalizedRecs, adjustedRec)) {
          personalizedRecs.push(adjustedRec);
        }
      });
    });
    
    // Ensure we have at least one recommendation
    if (personalizedRecs.length === 0) {
      const defaultRec = this.recommendations.get('general_support')![0];
      personalizedRecs.push({...defaultRec});
    }
    
    // Sort by confidence
    return personalizedRecs.sort((a, b) => b.confidence - a.confidence);
  }
  
  private isDuplicate(recommendations: Recommendation[], newRec: Recommendation): boolean {
    return recommendations.some(rec => rec.title === newRec.title);
  }
}

// Neural profile generated from behavioral data
export interface NeuroProfile {
  stressIndex: number;
  decisionConfidence: number;
  attentionScore: number;
  consistencyIndex: number;
}

// Feature extractor implementation
class FeatureExtractor implements FeatureExtraction {
  extractStressPatterns(data: BehavioralMetrics): number {
    const rapidResponses = data.responseTime.filter(time => time < 2).length / data.responseTime.length;
    const highScrollSpeed = data.scrollBehavior.speed > 5 ? 1 : data.scrollBehavior.speed / 5;
    const directionChanges = Math.min(data.scrollBehavior.directionChanges / 10, 1);
    
    return (rapidResponses * 0.4) + (highScrollSpeed * 0.3) + (directionChanges * 0.3);
  }
  
  extractCognitiveLoad(data: BehavioralMetrics): number {
    const hesitationFactor = data.hesitationCount.reduce((sum, count) => sum + count, 0) / 
                            (data.hesitationCount.length * 5);
    const focusLossFactor = Math.min(data.focusLost / 5, 1);
    
    return (hesitationFactor * 0.6) + (focusLossFactor * 0.4);
  }
  
  extractDecisionSpeed(data: BehavioralMetrics): number {
    const avgResponseTime = data.responseTime.reduce((sum, time) => sum + time, 0) / 
                           data.responseTime.length;
    
    // Normalize to a 0-1 scale (5 seconds is considered slow, 1 second is fast)
    return Math.max(0, Math.min(1, 1 - ((avgResponseTime - 1) / 4)));
  }
  
  extractConsistency(data: BehavioralMetrics): number {
    // Calculate variance in response times
    const avgTime = data.responseTime.reduce((sum, time) => sum + time, 0) / 
                   data.responseTime.length;
    
    const variance = data.responseTime.reduce((sum, time) => sum + Math.pow(time - avgTime, 2), 0) / 
                    data.responseTime.length;
    
    // Higher variance means lower consistency
    return Math.max(0, Math.min(1, 1 - (variance / 5)));
  }
}

// Main entry point for recommendation system
export class AdvancedRecommenderSystem {
  private featureExtractor: FeatureExtractor;
  private classifier: NeuralClassifier;
  private recommender: RecommendationEngine;
  
  constructor() {
    this.featureExtractor = new FeatureExtractor();
    this.classifier = new NeuralClassifier();
    this.recommender = new RecommendationEngine();
  }
  
  analyzeUserBehavior(metrics: BehavioralMetrics): NeuroProfile {
    return {
      stressIndex: this.featureExtractor.extractStressPatterns(metrics) * 100,
      decisionConfidence: this.featureExtractor.extractDecisionSpeed(metrics) * 100,
      attentionScore: (1 - this.featureExtractor.extractCognitiveLoad(metrics)) * 100,
      consistencyIndex: this.featureExtractor.extractConsistency(metrics) * 100
    };
  }
  
  getRecommendations(metrics: BehavioralMetrics, responses: QuizResponse): Recommendation[] {
    // Generate neural profile
    const profile = this.analyzeUserBehavior(metrics);
    
    // Extract features for classification
    const features = {
      stressLevel: this.featureExtractor.extractStressPatterns(metrics),
      cognitiveLoad: this.featureExtractor.extractCognitiveLoad(metrics),
      decisionSpeed: this.featureExtractor.extractDecisionSpeed(metrics),
      consistency: this.featureExtractor.extractConsistency(metrics),
      symptomSeverity: responses.symptoms ? responses.symptoms.length / 10 : 0
    };
    
    // Classify user needs
    const userNeeds = this.classifier.classifyUserNeeds(features, responses);
    
    // Generate personalized recommendations
    return this.recommender.generatePersonalizedRecommendations(userNeeds, responses, profile);
  }
}
