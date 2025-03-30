import { useState, useEffect, useRef } from 'react';
import { QuizResponse } from '../utils/types';
import { BehavioralMetrics } from '../hooks/useBehavioralMetrics';
import { Recommendation } from '../utils/types';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Link } from 'react-router-dom';
import { CheckCircle2, HelpCircle, Info, ShoppingCart, Sparkles, Award, Clock, Heart, TrendingUp, ArrowRight, BarChart, Zap, Brain, FlaskConical, Gauge, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import UrgencyCountdown from "./quiz/UrgencyCountdown";
import DynamicSocialProof from "./quiz/DynamicSocialProof";
import { getPersonalizedMessage, generatePersonalizedRecommendations } from "@/utils/dynamicPersonalization";
import { calculateRiskScore, getRiskColor } from "@/utils/contentSafety";


// SVG Icons (from edited code, some are already in original)
const Users = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const Check = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 6 9 17l-5-5"/>
  </svg>
);

const Brain = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
  </svg>
);

const ArrowRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
);

const Sparkles = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/>
    <path d="M19 17v4"/>
    <path d="M3 5h4"/>
    <path d="M17 19h4"/>
  </svg>
);


interface QuizResultsProps {
  responses: QuizResponse;
  behavioralMetrics: BehavioralMetrics;
  onRestart: () => void;
  personalizationFactors?: {
    device?: string;
    geo?: string;
    timeOfDay?: string;
    dayOfWeek?: string;
    referrer?: string;
  };
}

const QuizResults = ({ responses, onRestart, personalizationFactors, behavioralMetrics }: QuizResultsProps) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"recommendations" | "report" | "neuroProfile">("recommendations");
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [neuroProfile, setNeuroProfile] = useState<any>(null);
  const [urgencyMessage, setUrgencyMessage] = useState<{message: string; level: string; countdownMinutes?: number}>({
    message: "",
    level: "low"
  });
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<string>('France');
  const animationRef = useRef<any>(null);

  // Simuler la récupération de la localisation de l'utilisateur
  useEffect(() => {
    // Utiliser la localisation des facteurs de personnalisation si disponible
    if (personalizationFactors && personalizationFactors.geo) {
      setUserLocation(personalizationFactors.geo);
    } else {
      // Sinon, utiliser une valeur par défaut
      const cities = ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Lille', 'Toulouse', 'Nantes', 'Strasbourg'];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      setUserLocation(randomCity);
    }
  }, [personalizationFactors]);

  // Simuler le calcul de recommandations basé sur les réponses et les métriques comportementales
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    // Générer des recommandations simulées après un délai
    setTimeout(() => {
      const simulatedRecommendations: Recommendation[] = [
        {
          id: "micronutrients",
          title: "Profil de micronutriments",
          description: "Basé sur vos habitudes alimentaires et symptômes, nous avons identifié un besoin potentiel en vitamine D et magnésium.",
          scientificEvidence: "Une étude récente publiée dans le Journal of Nutrition a démontré que 78% des personnes présentant des symptômes similaires aux vôtres avaient une carence en ces nutriments.",
          priority: "high",
          compatibilityScore: 94,
          categoryColor: "amber"
        },
        {
          id: "sleep",
          title: "Optimisation du sommeil",
          description: "Votre profil indique un sommeil perturbé qui pourrait être amélioré par des ajustements circadiens et des nutriments spécifiques.",
          scientificEvidence: "Des recherches de l'Université de Stanford montrent que l'équilibre des micronutriments peut améliorer la qualité du sommeil de 67% chez les individus présentant votre profil.",
          priority: "medium",
          compatibilityScore: 89,
          categoryColor: "blue"
        },
        {
          id: "stress",
          title: "Gestion du stress",
          description: "Vos réponses révèlent des niveaux de stress élevés qui peuvent être réduits par des adaptogènes naturels et des techniques comportementales.",
          scientificEvidence: "Des études cliniques ont montré une réduction de 42% des marqueurs biologiques du stress avec cette approche.",
          priority: "high",
          compatibilityScore: 91,
          categoryColor: "purple"
        }
      ];

      // Générer un profil neuro simulé
      const simulatedNeuroProfile = {
        attentionScore: behavioralMetrics.timeOnPage > 120 ? 85 : 65,
        decisionSpeed: behavioralMetrics.clickSpeed < 1000 ? "rapide" : "réfléchi",
        stressLevel: behavioralMetrics.erraticClicks > 5 ? "élevé" : "modéré",
        consistencyScore: 78,
        responsiveness: behavioralMetrics.responseDelay < 1500 ? "haute" : "moyenne",
        cognitivePreference: behavioralMetrics.focusedSections.includes("scientific") ? "analytique" : "intuitif",
        focusAreas: ["concentration", "gestion du stress"],
        learningStyle: "visuel",
        cognitiveStrength: "analyse"
      };

      // Définir un message d'urgence basé sur les comportements observés
      const urgent = behavioralMetrics.timeOnPage < 90 || behavioralMetrics.erraticClicks > 5;
      const urgencyMsg = urgent 
        ? {
            message: "Votre analyse indique un besoin urgent d'intervention nutritionnelle. Agir maintenant pourrait réduire vos symptômes actuels.",
            level: "high",
            countdownMinutes: 30
          }
        : {
            message: "Vos résultats sont prêts. Nous recommandons de consulter vos solutions personnalisées.",
            level: "medium"
          };

      setRecommendations(simulatedRecommendations);
      setNeuroProfile(simulatedNeuroProfile);
      setUrgencyMessage(urgencyMsg);
      setLoading(false);
      setShowConfetti(true);

      if (urgencyMsg.countdownMinutes) {
        setTimeRemaining(urgencyMsg.countdownMinutes * 60);
      }
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [behavioralMetrics]);

  // Compte à rebours si nécessaire
  useEffect(() => {
    if (timeRemaining !== null) {
      const countdownInterval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev === null || prev <= 0) {
            clearInterval(countdownInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [timeRemaining]);

  // Formater le temps restant en minutes:secondes
  const formatTimeRemaining = () => {
    if (timeRemaining === null) return '';
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 bg-white rounded-xl shadow-lg relative">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Confetti animation would be here */}
        </div>
      )}

      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-indigo-900 mb-2">
          Vos résultats personnalisés, {responses.name}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Notre système d'intelligence analytique a analysé vos réponses et votre comportement pour générer des recommandations spécifiques à votre profil.
        </p>
      </div>

      {loading ? (
        <div className="my-12 text-center">
          <div className="mb-6 relative">
            <Progress value={analysisProgress} className="h-2 w-full bg-gray-100" />
            <div className="mt-2 text-sm text-gray-600">Analyse en cours : {analysisProgress}%</div>
          </div>
          <div className="space-y-3 max-w-md mx-auto">
            <div className="flex items-center p-4 bg-indigo-50 rounded-lg">
              <Brain className="text-indigo-600 mr-3 h-5 w-5" />
              <span className="text-sm text-indigo-700">Analyse neurologique en cours...</span>
            </div>
            <div className="flex items-center p-4 bg-amber-50 rounded-lg">
              <Users className="text-amber-600 mr-3 h-5 w-5" />
              <span className="text-sm text-amber-700">Comparaison avec profils similaires...</span>
            </div>
            <div className="flex items-center p-4 bg-green-50 rounded-lg">
              <Check className="text-green-600 mr-3 h-5 w-5" />
              <span className="text-sm text-green-700">Validation scientifique des recommandations...</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Bandeau d'urgence */}
          {urgencyMessage.message && (
            <div className={`mb-6 p-4 rounded-lg ${
              urgencyMessage.level === 'high' 
                ? 'bg-red-50 border border-red-200 text-red-800' 
                : 'bg-indigo-50 border border-indigo-200 text-indigo-800'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Sparkles className={`mr-2 h-5 w-5 ${
                    urgencyMessage.level === 'high' ? 'text-red-600' : 'text-indigo-600'
                  }`} />
                  <span className="font-medium">{urgencyMessage.message}</span>
                </div>
                {timeRemaining !== null && (
                  <div className="text-sm font-semibold bg-white px-3 py-1 rounded-full">
                    {formatTimeRemaining()}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Localisation et personnalisation */}
          <div className="mb-6 text-center text-sm text-gray-500">
            <p>Analyse personnalisée pour votre profil à {userLocation}</p>
          </div>

          {/* Système d'onglets */}
          <Tabs defaultValue="recommendations" value={activeTab} onValueChange={(val) => setActiveTab(val as any)}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="recommendations">Recommandations</TabsTrigger>
              <TabsTrigger value="report">Rapport détaillé</TabsTrigger>
              <TabsTrigger value="neuroProfile">Profil neuro</TabsTrigger>
            </TabsList>

            <TabsContent value="recommendations" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {recommendations.map((rec) => (
                  <Card key={rec.id} className={`border-l-4 border-${rec.categoryColor}-500 hover:shadow-md transition-shadow`}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg font-semibold">{rec.title}</CardTitle>
                        <span className={`text-xs px-2 py-1 rounded-full bg-${rec.categoryColor}-100 text-${rec.categoryColor}-800`}>
                          {rec.compatibilityScore}% compatible
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-700 mb-3">{rec.description}</p>
                      <details className="text-xs text-gray-600">
                        <summary className="cursor-pointer text-indigo-600 hover:text-indigo-800">
                          Evidence scientifique
                        </summary>
                        <p className="mt-2 p-2 bg-gray-50 rounded">{rec.scientificEvidence}</p>
                      </details>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-100">
                <h3 className="font-semibold text-amber-900 mb-2">Analyse basée sur plus de 900 profils similaires</h3>
                <p className="text-sm text-amber-800">
                  Notre base de données de recherche contient des analyses de centaines de personnes présentant un profil similaire au vôtre. Les recommandations ci-dessus sont basées sur les solutions qui ont fonctionné pour ces profils.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="report">
              <Card>
                <CardHeader>
                  <CardTitle>Rapport nutritionnel détaillé</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Objectifs identifiés</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-700">
                      {responses.objectives?.map((obj, idx) => (
                        <li key={idx}>{obj}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Habitudes alimentaires</h3>
                      <p className="text-sm text-gray-700">{responses.dietaryHabits}</p>

                      <div className="mt-3">
                        <h4 className="text-sm font-medium text-gray-900">Consommation de protéines</h4>
                        <div className="mt-1 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500" 
                            style={{ width: 
                              responses.meatConsumption === 'daily' ? '90%' : 
                              responses.meatConsumption === 'weekly' ? '60%' :
                              responses.meatConsumption === 'rarely' ? '30%' : '10%'
                            }}
                          />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                          {responses.meatConsumption === 'daily' ? 'Consommation quotidienne' : 
                          responses.meatConsumption === 'weekly' ? 'Consommation hebdomadaire' :
                          responses.meatConsumption === 'rarely' ? 'Consommation rare' : 'Aucune consommation'}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Mode de vie</h3>
                      <div className="space-y-2">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Exercice physique</h4>
                          <p className="text-sm text-gray-700">{responses.exerciseFrequency}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Qualité du sommeil</h4>
                          <p className="text-sm text-gray-700">{responses.sleepQuality}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Niveau de stress</h4>
                          <p className="text-sm text-gray-700">{responses.stressLevel}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Symptômes identifiés</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {responses.symptoms?.map((symptom, idx) => (
                        <div key={idx} className="p-2 bg-gray-50 rounded text-sm text-gray-700">
                          {symptom}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="neuroProfile">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="mr-2 h-5 w-5 text-indigo-600" />
                    Analyse neuro-comportementale
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {neuroProfile && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="p-3 bg-indigo-50 rounded-lg">
                          <h3 className="text-sm font-medium text-indigo-900">Score d'attention</h3>
                          <div className="mt-2 flex items-center">
                            <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-indigo-600" style={{ width: `${neuroProfile.attentionScore}%` }} />
                            </div>
                            <span className="ml-2 text-sm font-semibold">{neuroProfile.attentionScore}</span>
                          </div>
                        </div>
                        <div className="p-3 bg-amber-50 rounded-lg">
                          <h3 className="text-sm font-medium text-amber-900">Niveau de stress détecté</h3>
                          <p className="mt-1 text-lg font-semibold capitalize">{neuroProfile.stressLevel}</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <h3 className="text-sm font-medium text-blue-900">Style de décision</h3>
                          <p className="mt-1 text-lg font-semibold capitalize">{neuroProfile.decisionSpeed}</p>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Interprétation de votre profil</h3>
                        <p className="text-sm text-gray-700">
                          Votre analyse comportementale révèle un style d'apprentissage {neuroProfile.cognitivePreference}.
                          Vous avez tendance à prendre des décisions de manière {neuroProfile.decisionSpeed} avec un niveau 
                          de réactivité {neuroProfile.responsiveness}. Ces caractéristiques influencent la façon dont vous 
                          assimilez l'information nutritionnelle et comment vous pourriez mettre en œuvre des changements.
                        </p>
                      </div>

                      <div className="p-4 border border-indigo-100 rounded-lg">
                        <h3 className="text-sm font-medium text-indigo-900 mb-2">Recommandation adaptative</h3>
                        <p className="text-sm text-indigo-700">
                          {neuroProfile.cognitivePreference === 'analytique' 
                            ? "Basé sur votre profil analytique, nous vous recommandons d'examiner en détail les études scientifiques derrière chaque recommandation. Votre approche méthodique vous aidera à mettre en place des habitudes durables."
                            : "Votre profil intuitif suggère que vous bénéficierez davantage d'une approche pratique et expérientielle. Essayez de mettre en œuvre une recommandation à la fois et observez comment vous vous sentez."}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <Button variant="outline" onClick={onRestart}>
              Recommencer le quiz
            </Button>

            <Button className="gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700" asChild>
              <Link to="/profile">
                <span>Accéder à mon profil complet</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default QuizResults;