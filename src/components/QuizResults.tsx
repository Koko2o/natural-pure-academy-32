
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { secureStorageService as secureStorage } from '@/utils/secureStorage';
import { 
  generateRecommendations, 
  generateRecommendationExplanation,
  getAIModelStatus,
  generateAdvancedRecommendations
} from '@/utils/recommenderSystem';
import { QuizResponse, Recommendation, BehavioralMetrics, NeuroProfile } from '@/utils/types';
import { motion } from "framer-motion";
import ScientificHighlightedText from './ui/ScientificHighlightedText';
import { Brain, TrendingUp, Award, CheckCircle2, ThumbsUp, AlertCircle, ArrowRight, Check, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Fonction utilitaire pour identifier les priorités des problèmes de santé
function identifyConcernPriorities(quizResponses: QuizResponse) {
  const concerns: Record<string, number> = {};

  // Vérifier si les données sont disponibles
  if (!quizResponses.healthConcerns) return concerns;

  const { healthConcerns } = quizResponses;

  // Traiter les niveaux de stress
  if (healthConcerns.stressLevel === 'high') concerns.stress = 8;
  else if (healthConcerns.stressLevel === 'very_high') concerns.stress = 10;
  else if (healthConcerns.stressLevel === 'medium') concerns.stress = 5;

  // Traiter les problèmes d'énergie
  if (healthConcerns.energyLevel === 'low') concerns.energy = 8;
  else if (healthConcerns.energyLevel === 'very_low') concerns.energy = 10;

  // Traiter les problèmes de sommeil
  if (healthConcerns.sleepIssues === 'yes') concerns.sleep = 9;
  else if (healthConcerns.sleepIssues === 'sometimes') concerns.sleep = 6;

  // Traiter les problèmes de concentration
  if (healthConcerns.focusIssues === 'yes') concerns.focus = 8;

  // Traiter les problèmes digestifs
  if (healthConcerns.digestiveIssues === 'yes') concerns.digestion = 9;

  return concerns;
}

interface QuizResultsProps {
  recommendations: Recommendation[];
  quizResponses: QuizResponse;
  behavioralMetrics?: BehavioralMetrics;
  neuroProfile?: NeuroProfile;
  onSaveProfile?: () => void;
  onViewArticles?: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({
  recommendations = [],
  quizResponses,
  behavioralMetrics,
  neuroProfile,
  onSaveProfile,
  onViewArticles
}) => {
  const navigate = useNavigate();
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Vérifier si les données sont valides
    if (!quizResponses || !quizResponses.healthConcerns || !quizResponses.goals) {
      setErrorMessage("Données du quiz insuffisantes pour générer des recommandations");
      
      // Initialiser des données par défaut pour éviter les erreurs
      if (recommendations.length === 0) {
        console.log("Utilisation de recommandations par défaut");
        // Ne rien faire si des recommandations ont déjà été fournies en props
      }
    } else {
      // Données valides
      setErrorMessage(null);
    }
  }, [quizResponses, recommendations]);

  // Fonction pour soumettre le feedback
  const submitFeedback = (rating: number) => {
    // Logique pour enregistrer le feedback
    console.log(`Feedback soumis: ${rating}/5`);
    setFeedbackSubmitted(true);
  };

  return (
    <div className="space-y-8">
      {!errorMessage ? (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <h2 className="text-2xl font-bold mb-4">Vos recommandations personnalisées</h2>
            <p className="text-gray-600 mb-6">
              Basées sur vos réponses, voici les suppléments et nutriments qui pourraient vous aider à améliorer votre santé.
            </p>

            {recommendations.length > 0 ? (
              <div className="space-y-4">
                {recommendations.map((recommendation, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{recommendation.name}</CardTitle>
                        <Badge variant={recommendation.matchScore > 85 ? "default" : "outline"}>
                          {recommendation.matchScore}% Match
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-3">{recommendation.description}</p>

                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {recommendation.benefits?.map((benefit, i) => (
                            <Badge key={i} variant="outline" className="bg-green-50 text-green-800 border-green-200">
                              {benefit}
                            </Badge>
                          ))}
                        </div>

                        <div className="text-sm text-gray-700">
                          <p><strong>Dosage recommandé:</strong> {recommendation.recommendedDose}</p>
                          <p><strong>Délai d'efficacité:</strong> {recommendation.timeToEffect}</p>
                        </div>

                        {recommendation.reason && (
                          <div className="mt-3 text-sm bg-blue-50 p-2 rounded-md text-blue-800">
                            <div className="flex items-start gap-2">
                              <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                              <span>{recommendation.reason}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <AlertCircle className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-600">Aucune recommandation n'a pu être générée.</p>
              </div>
            )}
          </motion.div>

          {/* Boutons d'action */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {onSaveProfile && (
              <Button 
                onClick={onSaveProfile}
                className="gap-2"
                variant="outline"
              >
                <Check className="h-4 w-4" />
                <span>Sauvegarder mon profil</span>
              </Button>
            )}

            {onViewArticles && (
              <Button 
                onClick={onViewArticles}
                className="gap-2"
              >
                <span>Articles recommandés</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Carte de feedback */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">Ces recommandations vous ont-elles été utiles?</h3>

                  {!feedbackSubmitted ? (
                    <div>
                      <div className="flex justify-center gap-2 mt-3">
                        {[1, 2, 3, 4, 5].map(rating => (
                          <Button
                            key={rating}
                            variant={rating <= 3 ? "outline" : "default"}
                            size="sm"
                            onClick={() => submitFeedback(rating)}
                            className={rating >= 4 ? "bg-green-600 hover:bg-green-700" : ""}
                          >
                            {rating}
                          </Button>
                        ))}
                      </div>
                      <p className="mt-2 text-xs text-gray-500">1 = Pas du tout pertinentes, 5 = Très pertinentes</p>
                    </div>
                  ) : (
                    <p className="mt-2 text-green-700">Merci pour votre retour!</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      ) : (
        <div className="text-center py-10">
          <div className="mb-4 text-gray-400">
            <AlertCircle className="h-16 w-16 mx-auto" />
          </div>
          <h2 className="text-xl font-semibold mb-2">{errorMessage || "Nous n'avons pas pu générer de recommandations basées sur vos réponses."}</h2>
          <Button 
            onClick={() => navigate('/quiz')}
            className="mt-4"
          >
            Refaire le quiz
          </Button>
        </div>
      )}

      <div className="mt-8 text-center">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="mr-4"
        >
          Retour à l'accueil
        </Button>
        <Button 
          onClick={() => navigate('/quiz')}
          className="mr-4"
        >
          Refaire le quiz
        </Button>
        <Button 
          variant="outline"
          onClick={() => navigate('/ai-dashboard')}
        >
          Tableau de bord IA
        </Button>
      </div>
    </div>
  );
};

export default QuizResults;
