import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Beaker, ChevronRight, Award, FileText, Brain, BarChart, ChevronDown, Star, Book, Sparkles, Crown, Check, Clock, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Recommendation, QuizResponse, BehavioralMetrics } from "@/utils/types";
import { Badge } from "@/components/ui/badge";
import ScientificHighlightedText from "@/components/ui/ScientificHighlightedText";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { generateRecommendations } from "@/utils/recommenderSystem";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { getComprehensiveRecommendations, Recommendation } from "@/utils/recommenderSystem";


interface QuizResultsProps {
  quizData: any;
  restartQuiz: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ quizData, restartQuiz }) => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Génération des recommandations basées sur les données du quiz
    const generatedRecommendations = getComprehensiveRecommendations(quizData);
    setRecommendations(generatedRecommendations);
    setLoading(false);
  }, [quizData]);

  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto my-8 px-4 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="grid gap-6 md:grid-cols-2 w-full">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto my-8 px-4">
      {recommendations.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <h2 className="text-2xl font-bold text-center mb-6">
            Vos recommandations personnalisées
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {recommendations.map((rec, index) => (
              <Card key={index} className="p-6 shadow-lg border-t-4 border-blue-500">
                <h3 className="text-xl font-semibold mb-3">{rec.title}</h3>
                <div className="mb-4">
                  <ScientificHighlightedText text={rec.description} />
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Pertinence</span>
                    <span>{Math.round(rec.relevanceScore * 100)}%</span>
                  </div>
                  <Progress value={rec.relevanceScore * 100} className="h-2" />
                </div>
                <p className="text-sm text-gray-600 mt-3 italic">
                  Base scientifique: {rec.scientificBasis}
                </p>
              </Card>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="w-full sm:w-auto"
            >
              Retour à l'accueil
            </Button>
            <Button
              onClick={restartQuiz}
              className="w-full sm:w-auto"
            >
              Refaire le quiz
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto"
            >
              Tableau de bord IA
            </Button>
          </div>
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">
            Données du quiz insuffisantes pour générer des recommandations
          </h2>
          <div className="mt-8">
            <Button
              onClick={restartQuiz}
              className="mx-auto"
            >
              Refaire le quiz
            </Button>
          </div>

          <div className="flex justify-center space-x-4 mt-8">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
            >
              Retour à l'accueil
            </Button>
            <Button
              onClick={restartQuiz}
            >
              Refaire le quiz
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
            >
              Tableau de bord IA
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizResults;