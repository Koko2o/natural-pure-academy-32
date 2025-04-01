
import React, { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import recommenderSystemUtils, { Recommendation } from "@/utils/recommenderSystem";
const { getComprehensiveRecommendations, getAILearningStatus } = recommenderSystemUtils;
import ScientificHighlightedText from "@/components/ui/ScientificHighlightedText";
import AILearningInsights from "@/components/AILearningInsights";
import { ArrowLeft, Brain, CheckCircle, Download, ExternalLink, FileText, HelpCircle, Info, LayoutDashboard, Microscope, Pill, Share2, Sparkles, ThumbsUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

interface QuizResultsProps {
  quizData: any;
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
    // Ensure quizData has meaningful content
    const hasValidData = quizData && Object.keys(quizData).length > 0;

    if (hasValidData) {
      console.log("Generating recommendations with quiz data:", quizData);
      try {
        // Add a small delay to simulate processing
        setTimeout(() => {
          // Generate recommendations using the recommender system
          const generatedRecommendations = getComprehensiveRecommendations(quizData);
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

  const toggleAIInsights = () => {
    setAiInsightsVisible(!aiInsightsVisible);
  };

  const renderLoadingState = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute top-0 w-20 h-20 border-4 border-blue-300 rounded-full animate-spin border-t-transparent"></div>
        <div className="absolute top-6 left-6 w-8 h-8">
          <Brain className="text-blue-500 animate-pulse" />
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-blue-700">Analyse en cours...</h3>
      <p className="text-gray-600 text-center max-w-md">
        Notre système d'IA analyse vos réponses et génère des recommandations personnalisées basées sur les dernières recherches scientifiques.
      </p>
    </div>
  );

  const renderScientificConfidenceIndicator = () => {
    const labels = [
      "Basique",
      "Intermédiaire", 
      "Expert"
    ];
    
    return (
      <div className="mb-6 bg-slate-50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-700">Niveau de détail scientifique</span>
          <Badge variant="outline" className="bg-blue-50">
            {labels[scientificLevel-1]}
          </Badge>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${(scientificLevel / 3) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const renderRecommendations = () => (
    <div className="space-y-6">
      {recommendations.map((recommendation, index) => (
        <Card 
          key={recommendation.id || index}
          className={`overflow-hidden hover:shadow-md transition-shadow ${
            selectedRecommendation === recommendation.id ? 'ring-2 ring-blue-500' : ''
          }`}
        >
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg text-blue-800">
                {recommendation.title}
              </CardTitle>
              <Badge variant={recommendation.relevanceScore > 0.8 ? "default" : "outline"}>
                {Math.round(recommendation.relevanceScore * 100)}% pertinent
              </Badge>
            </div>
            <CardDescription className="text-blue-700">
              {recommendation.categories?.map(cat => cat).join(', ')}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="prose prose-sm max-w-none">
              <ScientificHighlightedText text={recommendation.description} level={scientificLevel} />
              
              {scientificLevel > 1 && (
                <div className="mt-4 border-t border-gray-100 pt-3">
                  <p className="text-sm text-gray-500 flex items-start">
                    <Microscope className="h-4 w-4 mr-1 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>Base scientifique: {recommendation.scientificBasis}</span>
                  </p>
                  
                  {scientificLevel > 2 && (
                    <div className="mt-2 bg-blue-50 p-2 rounded-md">
                      <p className="text-xs text-blue-700 font-medium">Mécanisme d'action</p>
                      <p className="text-xs text-blue-600">
                        {recommendation.mechanismOfAction || "Ce supplément agit en modulant les voies métaboliques impliquées dans votre profil de santé spécifique."}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 flex justify-between py-2 px-4">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
              onClick={() => setSelectedRecommendation(
                selectedRecommendation === recommendation.id ? null : recommendation.id
              )}
            >
              <Info className="h-4 w-4 mr-1" />
              Plus d'infos
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600">
              <ThumbsUp className="h-4 w-4 mr-1" />
              Utile
            </Button>
          </CardFooter>
          
          {selectedRecommendation === recommendation.id && (
            <div className="px-6 py-4 bg-blue-50 border-t border-blue-100">
              <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                <Sparkles className="h-4 w-4 mr-1 text-blue-600" />
                Détails supplémentaires
              </h4>
              <p className="text-sm text-gray-700 mb-3">
                Cette recommandation est particulièrement adaptée à votre profil en raison 
                {quizData.symptoms?.length > 0 && 
                  ` de vos symptômes de ${quizData.symptoms.slice(0, 2).join(', ')}`
                }
                {quizData.objectives?.length > 0 && quizData.symptoms?.length > 0 && ' et '}
                {quizData.objectives?.length > 0 && 
                  ` de vos objectifs de ${quizData.objectives.slice(0, 2).join(', ')}`
                }.
              </p>
              
              {scientificLevel > 1 && recommendation.relatedTerms && recommendation.relatedTerms.length > 0 && (
                <div className="mt-3">
                  <h5 className="font-medium text-sm text-gray-700 mb-1">Termes scientifiques associés:</h5>
                  <div className="flex flex-wrap gap-1">
                    {recommendation.relatedTerms.map((term, idx) => (
                      <Badge key={idx} variant="outline" className="bg-white">
                        {term}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>
      ))}
    </div>
  );

  const renderHeader = () => (
    <div className="mb-6 text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center justify-center p-2 bg-green-100 rounded-full mb-4"
      >
        <CheckCircle className="h-5 w-5 text-green-600 mr-1" />
        <span className="text-green-700 font-medium">Analyse complétée</span>
      </motion.div>
      
      <h1 className="text-2xl md:text-3xl font-bold mb-3">Vos Recommandations Personnalisées</h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Basé sur vos réponses, notre système d'IA a généré des recommandations adaptées à votre profil de santé unique.
      </p>
      
      <div className="flex items-center justify-center mt-2 text-sm text-gray-500">
        <span>Analyse générée le {format(analysisDate, 'dd/MM/yyyy')}</span>
        <Separator orientation="vertical" className="h-4 mx-2" />
        <span>{recommendations.length} recommandations</span>
      </div>
    </div>
  );

  const renderQuizSummary = () => {
    // Extract key information from quiz data
    const symptoms = quizData.symptoms || [];
    const objectives = quizData.objectives || [];
    const lifestyle = quizData.lifestyle || [];
    
    return (
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Résumé de votre profil</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-1 flex items-center">
                <Badge variant="outline" className="mr-2 bg-red-50 text-red-700 border-red-200">Symptômes</Badge>
              </h4>
              {symptoms.length > 0 ? (
                <ul className="text-sm text-gray-600 list-disc pl-5">
                  {symptoms.map((symptom: string, index: number) => (
                    <li key={index}>{symptom}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 italic">Aucun symptôme signalé</p>
              )}
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-1 flex items-center">
                <Badge variant="outline" className="mr-2 bg-blue-50 text-blue-700 border-blue-200">Objectifs</Badge>
              </h4>
              {objectives.length > 0 ? (
                <ul className="text-sm text-gray-600 list-disc pl-5">
                  {objectives.map((objective: string, index: number) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 italic">Aucun objectif spécifié</p>
              )}
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-1 flex items-center">
                <Badge variant="outline" className="mr-2 bg-purple-50 text-purple-700 border-purple-200">Mode de vie</Badge>
              </h4>
              {lifestyle.length > 0 ? (
                <ul className="text-sm text-gray-600 list-disc pl-5">
                  {lifestyle.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 italic">Aucune information sur le mode de vie</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Container className="py-8 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {isLoading ? (
          renderLoadingState()
        ) : (
          <>
            {renderHeader()}
            
            <Tabs defaultValue="recommendations" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="recommendations">Recommandations</TabsTrigger>
                <TabsTrigger value="profile">Votre profil</TabsTrigger>
                <TabsTrigger value="science" className="flex items-center gap-1">
                  <Microscope className="h-3.5 w-3.5" />
                  <span>Science</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="recommendations">
                {renderScientificConfidenceIndicator()}
                {renderRecommendations()}
              </TabsContent>
              
              <TabsContent value="profile">
                {renderQuizSummary()}
                
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Que faire avec ces résultats?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        Ces recommandations sont générées à partir de vos réponses et des dernières recherches scientifiques. Voici comment les utiliser efficacement:
                      </p>
                      
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">Consultez un professionnel de santé avant de suivre ces recommandations</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">Commencez par les recommandations ayant le score de pertinence le plus élevé</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">Adoptez une approche progressive et écoutez votre corps</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="science">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-blue-600" />
                      Insights de l'Intelligence Artificielle
                    </CardTitle>
                    <CardDescription>
                      Notre système d'IA avancé analyse constamment de nouvelles études scientifiques pour améliorer nos recommandations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg border p-4 mb-4">
                      <AILearningInsights expanded={aiInsightsVisible} onToggle={toggleAIInsights} />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Processus scientifique</CardTitle>
                    <CardDescription>
                      Comment nous générons des recommandations basées sur la science
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center">
                          <Badge className="mr-2">Étape 1</Badge>
                          <h4 className="font-medium">Collecte de données</h4>
                        </div>
                        <p className="text-sm text-gray-600 pl-10">
                          Analyse de plus de 2500 études scientifiques publiées
                        </p>
                      </div>
                      
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center">
                          <Badge className="mr-2">Étape 2</Badge>
                          <h4 className="font-medium">Mapping symptômes-nutriments</h4>
                        </div>
                        <p className="text-sm text-gray-600 pl-10">
                          Identification des corrélations entre problèmes de santé et solutions nutritionnelles
                        </p>
                      </div>
                      
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center">
                          <Badge className="mr-2">Étape 3</Badge>
                          <h4 className="font-medium">Personnalisation algorithimique</h4>
                        </div>
                        <p className="text-sm text-gray-600 pl-10">
                          Adaptation selon votre profil individuel et analyse de profils similaires
                        </p>
                      </div>
                      
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center">
                          <Badge className="mr-2">Étape 4</Badge>
                          <h4 className="font-medium">Validation clinique</h4>
                        </div>
                        <p className="text-sm text-gray-600 pl-10">
                          Vérification par notre comité scientifique et médical indépendant
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline"
                onClick={restartQuiz}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Refaire le test
              </Button>
              
              <Button className="gap-2">
                <Download className="h-4 w-4" />
                Télécharger les résultats (PDF)
              </Button>
              
              <Button variant="secondary" className="gap-2">
                <Share2 className="h-4 w-4" />
                Partager
              </Button>
            </div>
            
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>Ces recommandations sont à titre informatif uniquement et ne constituent pas un avis médical.</p>
              <p>Consultez un professionnel de santé avant de commencer tout nouveau supplément ou régime.</p>
            </div>
          </>
        )}
      </motion.div>
    </Container>
  );
};

export default QuizResults;
