import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { secureStorageService as secureStorage } from '@/utils/secureStorage';
import { 
  generateRecommendations, 
  generateRecommendationExplanation 
} from '@/utils/recommenderSystem';
import { QuizResponse, Recommendation, BehavioralMetrics, NeuroProfile } from '@/utils/types';
import { motion } from "framer-motion";
import ScientificHighlightedText from './ui/ScientificHighlightedText';

const QuizResults: React.FC = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Calculer les recommandations
    try {
      // Récupérer les données du quiz
      const storedResponses = secureStorage.getItem('quizResponses');
      if (!storedResponses) {
        console.error('Aucune réponse de quiz trouvée');
        return;
      }

      const responses: QuizResponse = JSON.parse(storedResponses);

      // Récupérer les métriques comportementales
      let behavioralMetrics: BehavioralMetrics = {
        sessionDuration: 0,
        hesitationCount: 0,
        changeCount: 0,
        engagementScore: 0
      };

      try {
        const quizStartTime = secureStorage.getItem('quizStartTime');
        if (quizStartTime) {
          const duration = (Date.now() - parseInt(quizStartTime)) / 1000; // en secondes
          behavioralMetrics.sessionDuration = duration;
        }

        const storedMetrics = secureStorage.getItem('behavioralMetrics');
        if (storedMetrics) {
          const metrics = JSON.parse(storedMetrics);
          behavioralMetrics = { ...behavioralMetrics, ...metrics };
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des métriques comportementales:', error);
      }

      // Profil neuropsychologique par défaut
      const neuroProfile: NeuroProfile = {
        decisionStyle: 'analytical',
        riskTolerance: 'moderate',
        informationProcessing: 'visual',
        motivationFactor: 'health'
      };

      // Générer les recommandations
      const generatedRecommendations = generateRecommendations(responses, behavioralMetrics, neuroProfile);
      setRecommendations(generatedRecommendations);
    } catch (error) {
      console.error('Erreur lors du calcul des recommandations:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRestartQuiz = () => {
    navigate('/quiz', { replace: true });
  };

  const handleViewDetails = (recommendation: Recommendation) => {
    // Future: Navigation vers la page de détail du produit
    console.log('Afficher les détails pour:', recommendation.id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold mb-2">
          <ScientificHighlightedText text="Vos Recommandations Personnalisées" />
        </h2>
        <p className="text-gray-600 mb-6">
          Basées sur votre profil et les données scientifiques les plus récentes
        </p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : recommendations.length > 0 ? (
        <div className="space-y-6">
          {recommendations.map((rec, index) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div 
                      className="bg-gradient-to-r from-blue-100 to-indigo-100 p-6 md:w-1/3 flex flex-col justify-between"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-primary mb-2">{rec.name}</h3>
                        <div className="text-sm text-gray-600 mb-2">
                          Confiance: {Math.round(rec.confidence * 100)}%
                        </div>
                        <div className="mb-2">
                          <div className="text-sm font-medium">Dose recommandée:</div>
                          <div className="font-bold">{rec.recommendedDose}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Temps avant effet:</div>
                          <div>{rec.timeToEffect}</div>
                        </div>
                      </div>

                      <Button 
                        className="mt-4 w-full" 
                        onClick={() => handleViewDetails(rec)}
                      >
                        Voir les détails
                      </Button>
                    </div>

                    <div className="p-6 md:w-2/3">
                      <div className="mb-4">
                        <ScientificHighlightedText 
                          text={generateRecommendationExplanation(rec)} 
                        />
                      </div>

                      <div className="mb-4">
                        <div className="font-medium mb-2">Bénéfices principaux:</div>
                        <ul className="list-disc pl-5 space-y-1">
                          {rec.benefits?.map((benefit, i) => (
                            <li key={i}>{benefit}</li>
                          ))}
                        </ul>
                      </div>

                      {rec.scientificBasis && (
                        <div className="text-sm text-gray-600 italic">
                          Base scientifique: {rec.scientificBasis}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          <div className="mt-10 text-center">
            <Button onClick={handleRestartQuiz}>
              Refaire le quiz
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center p-10 bg-gray-50 rounded-lg">
          <p className="text-lg mb-4">
            Nous n'avons pas pu générer de recommandations basées sur vos réponses.
          </p>
          <Button onClick={handleRestartQuiz}>
            Refaire le quiz
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuizResults;