import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import ScientificHighlightedText from "@/components/ui/ScientificHighlightedText";
import { getComprehensiveRecommendations } from "@/utils/recommenderSystem";
import { AILearningInsights } from "@/components/AILearningInsights";
import { Recommendation } from "@/utils/types";
import { SUPPLEMENT_CATALOG } from "@/data/supplementCatalog";

interface QuizResultsProps {
  quizData: any;
  restartQuiz: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ quizData, restartQuiz }) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [aiInsightsVisible, setAiInsightsVisible] = useState<boolean>(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null);

  useEffect(() => {
    // Ensure quizData has meaningful content
    const hasValidData = quizData && Object.keys(quizData).length > 0;

    if (hasValidData) {
      console.log("Generating recommendations with quiz data:", quizData);
      try {
        // Add a small delay to simulate processing
        setTimeout(() => {
          // Generate recommendations using the recommender system
          const generatedRecommendations = getComprehensiveRecommendations(quizData);

          // Assure at least some recommendations if none are generated
          if (!generatedRecommendations || generatedRecommendations.length === 0) {
            console.log("No recommendations generated, using default recommendations");
            setRecommendations([
              {
                id: "default-recommendation-1",
                title: "Amélioration de l'alimentation générale",
                description: "Une alimentation équilibrée riche en nutriments essentiels peut améliorer votre santé globale et votre bien-être.",
                scientificBasis: "Des études montrent qu'une alimentation équilibrée est fondamentale pour la santé.",
                relevanceScore: 0.85,
                categories: ["nutrition", "santé générale"],
                relatedTerms: ["nutrition", "well-being"]
              },
              {
                id: "default-recommendation-2",
                title: "Hydratation optimale",
                description: "Maintenir une bonne hydratation est essentiel pour de nombreuses fonctions corporelles et peut améliorer l'énergie et la concentration.",
                scientificBasis: "La recherche indique qu'une hydratation adéquate améliore les fonctions cognitives et métaboliques.",
                relevanceScore: 0.80,
                categories: ["hydratation", "énergie"],
                relatedTerms: ["metabolism", "cognition"]
              },
              {
                id: "default-recommendation-3",
                title: "Recommandation générale de nutrition",
                description: "Une alimentation équilibrée et variée est recommandée pour maintenir une bonne santé.",
                scientificBasis: "Principes fondamentaux de la nutrition",
                relevanceScore: 0.7,
                categories: ["nutrition", "santé générale"],
                relatedTerms: []
              }
            ]);
          } else {
            setRecommendations(generatedRecommendations);
          }
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Error generating recommendations:", error);
        // Default recommendations in case of error
        setRecommendations([
          {
            id: "error-recommendation",
            title: "Recommandation générale",
            description: "Une approche équilibrée pour la nutrition et le mode de vie est recommandée.",
            scientificBasis: "Principes fondamentaux de la nutrition et du bien-être",
            relevanceScore: 0.7,
            categories: ["nutrition", "santé générale"],
            relatedTerms: []
          }
        ]);
        setIsLoading(false);
      }
    } else {
      console.warn("Insufficient quiz data to generate personalized recommendations");
      // Default recommendations if no data
      setRecommendations([
        {
          id: "no-data-recommendation",
          title: "Recommandation générale",
          description: "Une approche équilibrée pour la nutrition et le mode de vie est recommandée.",
          scientificBasis: "Principes fondamentaux de la nutrition et du bien-être",
          relevanceScore: 0.7,
          categories: ["nutrition", "santé générale"],
          relatedTerms: []
        }
      ]);
      setIsLoading(false);
    }
  }, [quizData]);

  const toggleAIInsights = () => {
    setAiInsightsVisible(!aiInsightsVisible);
  };

  const toggleRecommendationDetails = (id: string) => {
    if (selectedRecommendation === id) {
      setSelectedRecommendation(null);
    } else {
      setSelectedRecommendation(id);
    }
  };

  // Find supplement info if available in the catalog
  const getSupplementInfo = (recommendationId: string) => {
    // Strip any prefix or suffix from the ID to try to find a match
    const simplifiedId = recommendationId.replace(/^[a-z]+-/, '').replace(/-[0-9]+$/, '');
    
    // Try to find the supplement in the catalog
    for (const [id, supplement] of Object.entries(SUPPLEMENT_CATALOG)) {
      if (id === recommendationId || id === simplifiedId || recommendationId.includes(id)) {
        return supplement;
      }
    }
    
    return null;
  };

  return (
    <Container className="py-8 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-3">Vos Recommandations Personnalisées</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Basées sur vos réponses, voici des recommandations scientifiquement adaptées à votre profil
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Analyse de votre profil nutritionnel...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {recommendations.map((recommendation, index) => {
              const supplementInfo = getSupplementInfo(recommendation.id);
              const isSelected = selectedRecommendation === recommendation.id;
              
              return (
                <motion.div
                  key={recommendation.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card 
                    className={`p-6 border-l-4 shadow-md transition-all duration-300 ${
                      isSelected ? 'border-l-green-500 shadow-lg' : 'border-l-blue-500'
                    }`}
                  >
                    <div className="flex justify-between">
                      <h2 className="text-xl font-semibold mb-2">{recommendation.title}</h2>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => toggleRecommendationDetails(recommendation.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {isSelected ? 'Réduire' : 'Détails'}
                      </Button>
                    </div>
                    
                    <div className="mb-4">
                      <ScientificHighlightedText text={recommendation.description} />
                    </div>
                    
                    {/* Base scientifique - toujours visible */}
                    <div className="bg-gray-50 p-4 rounded-md mb-3">
                      <h3 className="text-sm font-medium text-gray-700 mb-1">Base scientifique:</h3>
                      <p className="text-gray-600 text-sm">{recommendation.scientificBasis}</p>
                    </div>
                    
                    {/* Détails supplémentaires - visibles uniquement lorsque sélectionnés */}
                    {isSelected && supplementInfo && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="mt-4 bg-blue-50 p-4 rounded-md">
                          <h3 className="text-sm font-medium text-blue-800 mb-2">Informations supplémentaires</h3>
                          
                          {supplementInfo.scientificName && (
                            <div className="mb-2">
                              <span className="text-xs font-medium text-gray-500">Nom scientifique:</span>
                              <div className="text-sm text-gray-700">{supplementInfo.scientificName}</div>
                            </div>
                          )}
                          
                          {supplementInfo.standardDose && (
                            <div className="mb-2">
                              <span className="text-xs font-medium text-gray-500">Dosage standard:</span>
                              <div className="text-sm text-gray-700">{supplementInfo.standardDose}</div>
                            </div>
                          )}
                          
                          {supplementInfo.timeToEffect && (
                            <div className="mb-2">
                              <span className="text-xs font-medium text-gray-500">Délai d'efficacité:</span>
                              <div className="text-sm text-gray-700">{supplementInfo.timeToEffect}</div>
                            </div>
                          )}
                          
                          {supplementInfo.benefits && supplementInfo.benefits.length > 0 && (
                            <div className="mb-2">
                              <span className="text-xs font-medium text-gray-500">Bénéfices:</span>
                              <ul className="text-sm text-gray-700 list-disc list-inside mt-1 space-y-1">
                                {supplementInfo.benefits.map((benefit, idx) => (
                                  <li key={idx}>{benefit}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {supplementInfo.contraindications && supplementInfo.contraindications.length > 0 && (
                            <div>
                              <span className="text-xs font-medium text-gray-500">Précautions:</span>
                              <ul className="text-sm text-red-600 list-disc list-inside mt-1 space-y-1">
                                {supplementInfo.contraindications.map((warning, idx) => (
                                  <li key={idx}>{warning}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mb-2 mt-3">
                      {recommendation.categories && recommendation.categories.map((category, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {category}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-2">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-2">Pertinence</span>
                        <div className="h-2 bg-gray-200 rounded-full flex-1">
                          <div 
                            className="h-2 bg-green-500 rounded-full" 
                            style={{ width: `${Math.round(recommendation.relevanceScore * 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium ml-2">{Math.round(recommendation.relevanceScore * 100)}%</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}

            <div className="mt-12">
              <div className="text-center space-y-4">
                <Button 
                  onClick={toggleAIInsights} 
                  variant="outline" 
                  className="mr-4"
                >
                  {aiInsightsVisible ? "Masquer les insights IA" : "Afficher les insights IA"}
                </Button>
                <Button onClick={restartQuiz}>
                  Refaire le quiz
                </Button>
              </div>
            </div>

            {aiInsightsVisible && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="mt-8"
              >
                <AILearningInsights quizData={quizData} />
              </motion.div>
            )}
          </div>
        )}
      </motion.div>
    </Container>
  );
};

export default QuizResults;