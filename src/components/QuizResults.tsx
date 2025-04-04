import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SUPPLEMENT_CATALOG from '@/data/supplementCatalog';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, ArrowLeft, Clock, Info, Leaf } from "lucide-react";
import { generateDetailedRecommendationExplanation } from '@/utils/recommenderSystem';
import { QuizData, Recommendation, QuizResponse } from '@/utils/types';
import SUPPLEMENT_CATALOG from '@/data/supplementCatalog';
import AILearningInsights from './AILearningInsights';
import ScientificHighlightedText from './ui/ScientificHighlightedText';
import QuizIntegrationService from '@/utils/quizIntegrationService';

interface QuizResultsProps {
  quizData: QuizData;
  restartQuiz: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ quizData, restartQuiz }) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [aiInsightsVisible, setAiInsightsVisible] = useState<boolean>(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null);
  const [scientificLevel, setScientificLevel] = useState<number>(1);
  const [analysisDate] = useState<Date>(new Date());

  useEffect(() => {
    // Ensure quizData has meaningful content with safer checks
    const hasValidData = quizData && typeof quizData === 'object' && Object.keys(quizData).length > 0;

    if (hasValidData) {
      console.log("Generating recommendations with quiz data:", quizData);
      try {
        // Add a small delay to simulate processing
        setTimeout(() => {
          // Enrichir les données du quiz avec des informations contextuelles
          const enrichedQuizData = QuizIntegrationService.enrichQuizData(quizData);

          // Generate recommendations using the recommender system
          const generatedRecommendations = QuizIntegrationService.getPersonalizedRecommendations(enrichedQuizData);
          console.log("Generated recommendations:", generatedRecommendations);

          if (generatedRecommendations && generatedRecommendations.length > 0) {
            setRecommendations(generatedRecommendations);
          } else {
            console.warn("No recommendations generated, using fallback");
            setRecommendations([
              {
                id: "fallback-recommendation",
                title: "Recommandation générale",
                description: "Une approche équilibrée pour la nutrition et le mode de vie est recommandée.",
                scientificBasis: "Principes fondamentaux de la nutrition et du bien-être",
                relevanceScore: 0.7,
                categories: ["nutrition", "santé générale"],
                relatedTerms: []
              }
            ]);
          }

          // Set the scientific level based on quiz complexity
          const symptomsCount = quizData.symptoms?.length || 0;
          const goalsCount = quizData.objectives?.length || 0;

          // Calculate scientific level (1-3)
          const calculatedLevel = Math.min(3, 1 + Math.floor((symptomsCount + goalsCount) / 3));
          setScientificLevel(calculatedLevel);

          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error generating recommendations:", error);
        setIsLoading(false);

        // Fallback recommendations
        setRecommendations([
          {
            id: "error-fallback",
            title: "Recommandation générale",
            description: "Une approche équilibrée pour la nutrition et le mode de vie est recommandée.",
            scientificBasis: "Principes fondamentaux de la nutrition et du bien-être",
            relevanceScore: 0.7,
            categories: ["nutrition", "santé générale"],
            relatedTerms: []
          }
        ]);
      }
    } else {
      console.warn("Invalid quiz data");
      setIsLoading(false);

      // Default recommendations if no valid data
      setRecommendations([
        {
          id: "default-recommendation",
          title: "Recommandation générale",
          description: "Une approche équilibrée pour la nutrition et le mode de vie est recommandée.",
          scientificBasis: "Principes fondamentaux de la nutrition et du bien-être",
          relevanceScore: 0.7,
          categories: ["nutrition", "santé générale"],
          relatedTerms: []
        }
      ]);
    }
  }, [quizData]);

  const getDetailedExplanation = (recommendation: Recommendation) => {
    try {
      // Convert QuizData to QuizResponse for detailed explanation
      const quizResponse: QuizResponse = {
        symptoms: quizData.symptoms,
        objectives: quizData.objectives,
        dietaryHabits: quizData.dietaryHabits,
        lifestyle: quizData.lifestyle
      };

      return generateDetailedRecommendationExplanation(recommendation, quizResponse);
    } catch (error) {
      console.error("Error generating detailed explanation:", error);
      return "Détails non disponibles pour cette recommandation.";
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8">
          Analyse en cours...
        </h2>
        <div className="max-w-xl mx-auto">
          <Progress value={65} className="h-2 mb-6" />
          <p className="text-lg text-gray-500 mb-8">
            Notre moteur d'analyse nutritionnelle traite vos réponses pour générer des recommandations personnalisées
          </p>
          <div className="animate-pulse flex flex-col gap-6">
            <div className="h-24 bg-gray-200 rounded-md"></div>
            <div className="h-24 bg-gray-200 rounded-md"></div>
            <div className="h-24 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Button 
        variant="outline" 
        className="mb-6 flex items-center gap-2"
        onClick={restartQuiz}
      >
        <ArrowLeft size={16} />
        Retour au quiz
      </Button>

      <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-3">
        Vos recommandations personnalisées
      </h2>
      <p className="text-lg text-gray-500 mb-8">
        Basées sur votre profil unique et vos besoins spécifiques
      </p>

      {/* User Profile Summary */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Votre profil</CardTitle>
          <CardDescription>Basé sur vos réponses au quiz</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {quizData.symptoms && quizData.symptoms.length > 0 && (
              <div>
                <h4 className="font-medium text-sm text-gray-500 mb-2">Symptômes identifiés</h4>
                <div className="flex flex-wrap gap-2">
                  {quizData.symptoms.map((symptom, i) => (
                    <Badge key={i} variant="secondary">{symptom}</Badge>
                  ))}
                </div>
              </div>
            )}
            {quizData.objectives && quizData.objectives.length > 0 && (
              <div>
                <h4 className="font-medium text-sm text-gray-500 mb-2">Objectifs</h4>
                <div className="flex flex-wrap gap-2">
                  {quizData.objectives.map((objective, i) => (
                    <Badge key={i} variant="outline">{objective}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {recommendations.map((recommendation, index) => {
          const supplement = SUPPLEMENT_CATALOG[recommendation.id];
          return (
            <Card 
              key={index} 
              className={`overflow-hidden transition-shadow hover:shadow-lg ${
                recommendation.relevanceScore > 0.8 ? 'border-primary/50' : ''
              }`}
            >
              <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{recommendation.title}</CardTitle>
                  <Badge>{Math.round(recommendation.relevanceScore * 100)}% match</Badge>
                </div>
                <CardDescription>
                  {recommendation.categories.slice(0, 2).join(' • ')}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-sm text-gray-500 mb-3">
                  <ScientificHighlightedText 
                    text={recommendation.description} 
                    scientificLevel={scientificLevel}
                  />
                </div>
                <div className="flex items-center text-xs text-gray-500 mt-4">
                  {supplement && supplement.timeToEffect && (
                    <div className="flex items-center gap-1 mr-4">
                      <Clock size={14} /> 
                      {supplement.timeToEffect}
                    </div>
                  )}
                  {supplement && supplement.naturalSources && (
                    <div className="flex items-center gap-1">
                      <Leaf size={14} /> 
                      Sources naturelles disponibles
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 flex justify-between">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedRecommendation(
                    selectedRecommendation === recommendation.id ? null : recommendation.id
                  )}
                >
                  {selectedRecommendation === recommendation.id ? 'Masquer détails' : 'Voir détails'}
                </Button>
                <Button size="icon" variant="ghost">
                  <Info size={16} />
                </Button>
              </CardFooter>

              {selectedRecommendation === recommendation.id && (
                <div className="px-6 pb-6">
                  <Separator className="mb-4" />
                  <div className="text-sm prose prose-sm max-w-none">
                    <div dangerouslySetInnerHTML={{ 
                      __html: getDetailedExplanation(recommendation).replace(/\n/g, '<br />') 
                    }} />
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* AI Insights Toggle */}
      <div className="flex justify-center mb-12">
        <Button 
          variant="outline" 
          onClick={() => setAiInsightsVisible(!aiInsightsVisible)}
          className="group"
        >
          {aiInsightsVisible ? 'Masquer' : 'Afficher'} les insights IA
          <div className={`ml-2 h-2 w-2 rounded-full transition-colors ${
            aiInsightsVisible ? 'bg-green-500 group-hover:bg-green-600' : 'bg-blue-500 group-hover:bg-blue-600'
          }`}></div>
        </Button>
      </div>

      {/* AI Learning Insights Panel */}
      {aiInsightsVisible && (
        <AILearningInsights recommendations={recommendations} />
      )}

      {/* Disclaimer */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-amber-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-amber-700">
              <strong>Note importante:</strong> Ces recommandations sont fournies à titre informatif uniquement et ne 
              remplacent pas l'avis d'un professionnel de santé. Consultez votre médecin avant de commencer tout 
              complément alimentaire, surtout si vous avez des conditions médicales préexistantes ou prenez des médicaments.
            </p>
          </div>
        </div>
      </div>

      {/* Analysis Date */}
      <div className="text-center text-sm text-gray-500">
        Analyse générée le {analysisDate.toLocaleDateString()} à {analysisDate.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default QuizResults;