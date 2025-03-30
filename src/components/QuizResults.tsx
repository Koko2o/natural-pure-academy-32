import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { secureStorageService as secureStorage } from '@/utils/secureStorage';
import { 
  generateRecommendations, 
  generateRecommendationExplanation 
} from '@/utils/recommenderSystem';
import { QuizResponse, Recommendation, BehavioralMetrics, NeuroProfile } from '@/utils/types';
import { motion } from "framer-motion";
import ScientificHighlightedText from './ui/ScientificHighlightedText';
import { Brain, TrendingUp, Award, CheckCircle2, ThumbsUp, AlertCircle } from 'lucide-react'; // Import icons


// Placeholder for the AI model status function - needs to be implemented elsewhere
const getAIModelStatus = () => ({
  accuracy: 0.85, // Example accuracy
  modelVersion: "1.2.3",
  dataPointsAnalyzed: 10000
});


const QuizResults: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [aiModelInfo, setAiModelInfo] = useState(getAIModelStatus());
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Récupérer les réponses du quiz depuis le stockage sécurisé
    const quizResponses = secureStorage.getItem('quiz_responses');
    const behavioralMetrics = secureStorage.getItem('behavioral_metrics');
    const neuroProfile = secureStorage.getItem('neuro_profile');

    if (quizResponses) {
      try {
        // Générer les recommandations avec l'IA avancée
        const generatedRecommendations = generateRecommendations(
          quizResponses,
          behavioralMetrics,
          neuroProfile
        );

        if (generatedRecommendations && generatedRecommendations.length > 0) {
          setRecommendations(generatedRecommendations);
        } else {
          setErrorMessage("Nous n'avons pas pu générer de recommandations basées sur vos réponses. Veuillez réessayer.");
        }
      } catch (error) {
        console.error("Erreur lors de la génération des recommandations:", error);
        setErrorMessage("Une erreur s'est produite lors de la génération de vos recommandations.");
      }
    } else {
      console.log("Aucune réponse de quiz trouvée");
      setErrorMessage("Aucune réponse de quiz trouvée. Veuillez compléter le quiz.");
    }

    // Obtenir les informations sur le modèle d'IA
    try {
      const modelStatus = getAIModelStatus();
      setAiModelInfo(modelStatus);
    } catch (err) {
      console.error("Erreur lors de la récupération du statut du modèle IA:", err);
    }

    setLoading(false);
  }, []);

  // Fonction pour soumettre un feedback sur les recommandations
  const submitFeedback = (rating: number) => {
    try {
      const quizResponses = secureStorage.getItem('quiz_responses');

      if (quizResponses && recommendations.length > 0) {
        // Créer un objet de feedback
        const feedback = {
          effectivenessRating: rating,
          timestamp: new Date().toISOString(),
          recommendationIds: recommendations.map(rec => rec.id)
        };

        // Enregistrer le feedback
        secureStorage.setItem('user_feedback', feedback);

        // Mettre à jour les données d'apprentissage
        import('@/utils/aiLearningEngine').then(module => {
          module.saveLearningData(quizResponses, recommendations, feedback);
          setFeedbackSubmitted(true);
        }).catch(err => {
          console.error("Erreur lors du chargement du module d'apprentissage:", err);
        });
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du feedback:", error);
    }
  };

  return (
    <div className="container py-8 max-w-4xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-primary">Vos Recommandations Personnalisées</h1>
        <p className="text-lg text-gray-600 mt-2">
          Basées sur votre profil et les données scientifiques les plus récentes
        </p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : recommendations.length > 0 ? (
        <>
          {/* Informations sur l'IA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-xl">
                  <Brain className="mr-2 h-5 w-5 text-primary" />
                  Intelligence Artificielle Nutritionnelle
                </CardTitle>
                <CardDescription>
                  Notre IA a analysé vos réponses et a généré des recommandations personnalisées
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
                    <span>Précision du modèle: <span className="font-semibold">{Math.round(aiModelInfo.accuracy * 100)}%</span></span>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-2 text-amber-600" />
                    <span>Version: <span className="font-semibold">{aiModelInfo.modelVersion}</span></span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                    <span>Profils analysés: <span className="font-semibold">{aiModelInfo.dataPointsAnalyzed.toLocaleString()}</span></span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="space-y-6">
            {recommendations.map((recommendation, index) => (
              <motion.div
                key={recommendation.id || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className={`overflow-hidden ${recommendation.aiAdjusted ? 'border-primary border-2' : ''}`}>
                  {recommendation.aiAdjusted && (
                    <div className="bg-primary text-white px-4 py-1 text-xs flex items-center">
                      <Brain className="h-3 w-3 mr-1" /> 
                      Recommandation améliorée par IA • Confiance: {Math.round(recommendation.aiConfidence || 75)}%
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold mb-2 text-primary">
                          {recommendation.name}
                        </h2>
                        <p className="text-gray-600 mb-4">{recommendation.description}</p>

                        {recommendation.scientificBasis && (
                          <div className="mb-3 text-sm">
                            <span className="font-semibold">Base scientifique: </span>
                            <ScientificHighlightedText text={recommendation.scientificBasis} />
                          </div>
                        )}

                        {recommendation.benefits && recommendation.benefits.length > 0 && (
                          <div className="mb-3">
                            <span className="font-semibold text-sm">Bénéfices potentiels: </span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {recommendation.benefits.map((benefit, i) => (
                                <span key={i} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                  {benefit}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {recommendation.recommendedDose && (
                          <div className="text-sm mb-1">
                            <span className="font-semibold">Dosage recommandé: </span>
                            {recommendation.recommendedDose}
                          </div>
                        )}

                        {recommendation.timeToEffect && (
                          <div className="text-sm mb-1">
                            <span className="font-semibold">Temps avant effet: </span>
                            {recommendation.timeToEffect}
                          </div>
                        )}

                        <div className="mt-3 text-sm text-gray-500">
                          <span className="font-medium">Raison: </span>
                          {recommendation.reason}
                        </div>
                      </div>

                      {recommendation.matchScore && (
                        <div className="ml-4 flex flex-col items-center">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl ${recommendation.matchScore >= 80 ? 'bg-green-500' : recommendation.matchScore >= 60 ? 'bg-yellow-500' : 'bg-orange-500'}`}>
                            {Math.round(recommendation.matchScore)}%
                          </div>
                          <span className="text-xs mt-1 text-gray-500">Correspondance</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Section de feedback */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10"
          >
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center">
                    <ThumbsUp className="mr-2 h-5 w-5" />
                    Aidez notre IA à s'améliorer
                  </div>
                </CardTitle>
                <CardDescription>
                  Votre feedback aide notre système d'IA à améliorer les recommandations futures
                </CardDescription>
              </CardHeader>
              <CardContent>
                {feedbackSubmitted ? (
                  <div className="text-center py-2">
                    <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p className="text-green-700">Merci pour votre feedback ! Il nous aidera à améliorer nos recommandations.</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="mb-4">Ces recommandations vous semblent-elles pertinentes ?</p>
                    <div className="flex justify-center space-x-3">
                      {[1, 2, 3, 4, 5].map((rating) => (
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
                )}
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