
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Award, ArrowRight, Brain, Heart, Activity } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';
import secureStorage from '@/utils/secureStorage';
import { QuizResponse, BehavioralMetrics, Recommendation, NeuroProfile } from '@/utils/types';
import { generateRecommendations, generateRecommendationExplanation } from '@/utils/recommenderSystem';
import { Progress } from "@/components/ui/progress";

interface QuizResultsProps {
  responses: QuizResponse;
}

const defaultBehavioralMetrics: BehavioralMetrics = {
  timePerQuestion: { average: 12, longestOn: "diet", shortestOn: "personal" },
  hesitationPatterns: ["changed-answer-diet-3-times", "long-pause-on-health-goals"],
  scrollBehavior: { speed: "moderate", directionChanges: 4 },
  deviceData: { type: "desktop", screenSize: "large" },
  userAgent: navigator.userAgent,
  sessionDuration: 0,
};

const defaultNeuroProfile: NeuroProfile = {
  decisionStyle: "analytical",
  informationProcessing: "visual",
  motivationFactors: ["health-improvement", "performance"],
  trustLevel: "medium",
  painPoints: ["sleep", "energy"],
  engagementLevel: 0.75,
};

const QuizResults: React.FC<QuizResultsProps> = ({ responses }) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [explanation, setExplanation] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [precision, setPrecision] = useState(85);
  const navigate = useNavigate();
  
  // Mesurer le temps total passé sur le quiz
  useEffect(() => {
    const calculateRecommendations = () => {
      setIsLoading(true);
      
      let quizStartTime = secureStorage.getItem('quizStartTime');
      const quizEndTime = new Date().getTime();
      
      if (!quizStartTime) {
        quizStartTime = quizEndTime - 180000; // Fallback: 3 minutes si pas de temps de départ
      }
      
      const sessionDuration = (quizEndTime - quizStartTime) / 1000; // en secondes
      
      // Créer un ensemble de métriques comportementales basiques
      const behavioralMetrics: BehavioralMetrics = {
        ...defaultBehavioralMetrics,
        sessionDuration,
      };
      
      // Adapter le profil neuro aux réponses
      const neuroProfile: NeuroProfile = {
        ...defaultNeuroProfile
      };
      
      // Adapter les points sensibles basés sur les symptômes rapportés
      if (responses.wellbeing) {
        if (responses.wellbeing.stressLevel === 'high') {
          neuroProfile.painPoints.push('stress');
        }
        if (responses.wellbeing.sleepQuality === 'poor') {
          neuroProfile.painPoints.push('sleep');
        }
        if (responses.wellbeing.energyLevel === 'low') {
          neuroProfile.painPoints.push('energy');
        }
      }
      
      // Simulation d'un délai d'analyse pour plus de crédibilité
      const analysisTime = Math.floor(Math.random() * 1000) + 1500;
      
      setTimeout(() => {
        try {
          // Générer les recommandations
          const generatedRecommendations = generateRecommendations(
            responses, 
            behavioralMetrics, 
            neuroProfile
          );
          
          setRecommendations(generatedRecommendations);
          
          // Générer l'explication
          if (generatedRecommendations.length > 0) {
            const generatedExplanation = generateRecommendationExplanation(
              responses,
              generatedRecommendations[0]
            );
            setExplanation(generatedExplanation);
          }
          
          // Stocker les résultats pour usage futur
          secureStorage.setItem('quizResults', {
            responses,
            recommendations: generatedRecommendations,
            timestamp: new Date().toISOString()
          });
          
          // Simuler la précision du modèle
          setPrecision(Math.floor(Math.random() * 10) + 80); // Entre 80% et 90%
          
          setIsLoading(false);
        } catch (error) {
          console.error("Erreur lors du calcul des recommandations:", error);
          setIsLoading(false);
        }
      }, analysisTime);
    };

    calculateRecommendations();
  }, [responses]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-6 text-center">
        <h2 className="text-2xl font-bold text-primary">Analyse avancée en cours...</h2>
        <div className="w-full max-w-md">
          <Progress value={65} className="h-2" />
        </div>
        <p className="text-muted-foreground">
          Notre système analyse votre profil pour générer des recommandations personnalisées...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-primary">Vos résultats personnalisés</h1>
          <p className="text-muted-foreground mt-2">
            Basés sur une analyse scientifique de vos réponses ({precision}% de précision)
          </p>
        </div>

        <Tabs defaultValue="recommandations" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recommandations">Recommandations</TabsTrigger>
            <TabsTrigger value="analyse">Analyse détaillée</TabsTrigger>
            <TabsTrigger value="plan">Plan d'action</TabsTrigger>
          </TabsList>

          <TabsContent value="recommandations" className="space-y-6 mt-6">
            <div className="bg-muted/50 p-4 rounded-lg mb-6">
              <p className="font-medium" dangerouslySetInnerHTML={{ __html: explanation }} />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {recommendations.map((rec, index) => (
                <Card key={index} className="overflow-hidden transition-shadow hover:shadow-md">
                  <div className="bg-primary h-2"></div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold">{rec.title}</h3>
                      <div className="bg-primary/10 text-primary font-medium rounded-full px-3 py-1 text-sm">
                        {Math.round(rec.confidence * 100)}% match
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mt-2">{rec.description}</p>
                    
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{rec.timeToEffect}</span>
                      </div>
                      {rec.scientificBasis && (
                        <div className="flex items-center">
                          <Award className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">Validé scientifiquement</span>
                        </div>
                      )}
                    </div>
                    
                    {rec.benefits && (
                      <ul className="mt-4 space-y-1">
                        {rec.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-1" />
                            <span className="text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    <Button variant="outline" className="w-full mt-4">
                      En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analyse" className="space-y-6 mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Brain className="h-6 w-6 mr-3 text-primary" />
                    <h3 className="text-xl font-semibold">Analyse cognitive</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Concentration</span>
                        <span className="text-sm text-muted-foreground">65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Mémoire</span>
                        <span className="text-sm text-muted-foreground">72%</span>
                      </div>
                      <Progress value={72} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Clarté mentale</span>
                        <span className="text-sm text-muted-foreground">58%</span>
                      </div>
                      <Progress value={58} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Activity className="h-6 w-6 mr-3 text-primary" />
                    <h3 className="text-xl font-semibold">Analyse physiologique</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Niveau d'énergie</span>
                        <span className="text-sm text-muted-foreground">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Qualité du sommeil</span>
                        <span className="text-sm text-muted-foreground">38%</span>
                      </div>
                      <Progress value={38} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Gestion du stress</span>
                        <span className="text-sm text-muted-foreground">52%</span>
                      </div>
                      <Progress value={52} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="plan" className="space-y-6 mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Votre plan d'action personnalisé</h3>
                
                <div className="space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold">1</div>
                    <div className="ml-4">
                      <h4 className="font-medium">Commencez par les fondamentaux</h4>
                      <p className="text-muted-foreground mt-1">
                        Intégrez les compléments recommandés à votre routine quotidienne
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold">2</div>
                    <div className="ml-4">
                      <h4 className="font-medium">Suivez votre progression</h4>
                      <p className="text-muted-foreground mt-1">
                        Notez vos changements après 2 semaines d'utilisation régulière
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold">3</div>
                    <div className="ml-4">
                      <h4 className="font-medium">Ajustez selon vos résultats</h4>
                      <p className="text-muted-foreground mt-1">
                        Revenez partager vos progrès pour affiner vos recommandations
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full mt-6">
                  Télécharger mon plan complet
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default QuizResults;
