
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

interface QuizResultsProps {
  recommendations: Recommendation[];
  quizResponses: QuizResponse;
  behavioralMetrics?: BehavioralMetrics;
  neuroProfile?: any;
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
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("recommendations");
  const [expandedRecommendation, setExpandedRecommendation] = useState<string | null>(null);
  const [aiSystemActivated, setAiSystemActivated] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [sortOption, setSortOption] = useState<'score' | 'scientific' | 'timeToResults'>('score');
  const [showAllRecommendations, setShowAllRecommendations] = useState(false);

  // Afficher un nombre progressif de participants
  const calculateParticipants = () => {
    const base = 6720;
    const date = new Date();
    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    return base + (dayOfYear * 3);
  };

  const toggleRecommendationExpand = (id: string) => {
    if (expandedRecommendation === id) {
      setExpandedRecommendation(null);
    } else {
      setExpandedRecommendation(id);
    }
  };

  const activateAISystem = () => {
    setLoadingAI(true);
    
    // Simuler un temps de traitement pour l'IA avancée
    setTimeout(() => {
      setAiSystemActivated(true);
      setLoadingAI(false);
      
      toast({
        title: "Système IA avancé activé",
        description: "Vos recommandations ont été affinées avec notre IA de dernière génération",
        variant: "default",
      });
    }, 2800);
  };

  const sortedRecommendations = [...recommendations].sort((a, b) => {
    if (sortOption === 'score') {
      return b.matchScore - a.matchScore;
    } 
    else if (sortOption === 'scientific') {
      // Trier par base scientifique (plus de mots = plus scientifique pour cette démo)
      const aWords = (a.scientificBasis || "").split(" ").length;
      const bWords = (b.scientificBasis || "").split(" ").length;
      return bWords - aWords;
    }
    else if (sortOption === 'timeToResults') {
      // Trier par temps d'effet (plus court en premier)
      const aTime = a.timeToEffect?.includes("semaine") ? 
        parseInt(a.timeToEffect?.match(/\d+/)?.[0] || "10") * 7 : 
        parseInt(a.timeToEffect?.match(/\d+/)?.[0] || "30");
      
      const bTime = b.timeToEffect?.includes("semaine") ? 
        parseInt(b.timeToEffect?.match(/\d+/)?.[0] || "10") * 7 : 
        parseInt(b.timeToEffect?.match(/\d+/)?.[0] || "30");
      
      return aTime - bTime;
    }
    
    return 0;
  });

  // Limiter le nombre de recommandations affichées sauf si showAll est activé
  const visibleRecommendations = showAllRecommendations 
    ? sortedRecommendations 
    : sortedRecommendations.slice(0, 3);

  // Récupérer des recommandations au chargement si nécessaire
  useEffect(() => {
    if (recommendations.length === 0 && quizResponses) {
      try {
        const generatedRecs = generateRecommendations(quizResponses);
        if (generatedRecs.length > 0) {
          // Dans une implémentation réelle, nous mettrions à jour les recommandations ici
          console.log("Recommandations générées au chargement:", generatedRecs.length);
        }
      } catch (error) {
        console.error("Impossible de générer des recommandations:", error);
      }
    }
  }, [quizResponses, recommendations]);

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <Badge className="mb-4">Analyse complétée</Badge>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Vos Résultats Personnalisés</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          <ScientificHighlightedText text="Basé sur l'analyse de vos réponses et notre algorithme de [[predictive-analysis:profilage avancé]]" />
        </p>
      </div>

      {recommendations.length === 0 ? (
        // Aucune recommandation disponible - afficher un message informatif
        <Card className="mb-8 border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Beaker className="h-5 w-5 text-orange-500" />
              <span>Données insuffisantes pour générer des recommandations précises</span>
            </CardTitle>
            <CardDescription>
              Nous n'avons pas pu générer des recommandations personnalisées avec les informations fournies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-orange-800 mb-4">
              Pour obtenir des recommandations personnalisées, veuillez compléter le quiz avec plus de détails:
            </p>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>Assurez-vous de répondre à toutes les questions, particulièrement celles concernant vos préoccupations de santé</li>
              <li>Sélectionnez au moins un objectif nutritionnel ou de santé</li>
              <li>Soyez précis dans vos réponses pour une meilleure personnalisation</li>
            </ul>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Button variant="default" className="bg-orange-600 hover:bg-orange-700" onClick={() => window.location.href = '/quiz'}>
              Refaire le quiz
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Retour à l'accueil
            </Button>
          </CardFooter>
        </Card>
      ) : (
        // Affichage des recommandations
        <Tabs defaultValue="recommendations" className="mb-12" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="recommendations" className="text-base py-3">
              <Beaker className="h-4 w-4 mr-2" />
              Recommandations
            </TabsTrigger>
            <TabsTrigger value="insights" className="text-base py-3">
              <Brain className="h-4 w-4 mr-2" />
              Analyses Avancées
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations" className="space-y-6">
            {/* Système IA avancé */}
            {!aiSystemActivated && (
              <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-500" />
                    <span>Amélioration par IA Disponible</span>
                  </CardTitle>
                  <CardDescription>
                    Notre système IA peut affiner vos recommandations en utilisant des algorithmes avancés
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Activez notre système d'analyse par intelligence artificielle pour obtenir:
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Meilleure précision des recommandations</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Personnalisation basée sur 53+ facteurs</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Analyse comparative avec {calculateParticipants()} profils</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Intégration des dernières études scientifiques</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={activateAISystem} 
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    disabled={loadingAI}
                  >
                    {loadingAI ? "Activation en cours..." : "Activer l'analyse IA avancée"}
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Options de tri des recommandations */}
            <div className="flex flex-wrap justify-between items-center mb-6 gap-2">
              <div className="text-lg font-semibold">Vos recommandations personnalisées</div>
              <div className="flex gap-2">
                <select 
                  className="text-sm border rounded-md px-2 py-1"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as any)}
                >
                  <option value="score">Tri par pertinence</option>
                  <option value="scientific">Tri par support scientifique</option>
                  <option value="timeToResults">Tri par rapidité des résultats</option>
                </select>
              </div>
            </div>

            {/* Liste des recommandations */}
            <div className="space-y-4">
              {visibleRecommendations.map((recommendation, index) => (
                <motion.div
                  key={recommendation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card 
                    className={`relative overflow-hidden transition-all ${
                      expandedRecommendation === recommendation.id ? 'border-blue-300 shadow-md' : ''
                    } ${index === 0 && aiSystemActivated ? 'border-green-300 bg-green-50' : ''}`}
                  >
                    {index === 0 && aiSystemActivated && (
                      <div className="absolute top-0 right-0">
                        <Badge className="m-2 bg-green-600 hover:bg-green-700">
                          <Crown className="h-3 w-3 mr-1" />
                          Recommandation prioritaire
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">
                          {recommendation.name}
                        </CardTitle>
                        <Badge variant="outline" className="ml-2">
                          {recommendation.matchScore}% de correspondance
                        </Badge>
                      </div>
                      <CardDescription>
                        {recommendation.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {recommendation.benefits.map((benefit, i) => (
                            <Badge key={i} variant="secondary" className="bg-blue-50">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="text-sm text-gray-500">
                          <div className="flex items-center gap-1 mb-1">
                            <Clock className="h-4 w-4" />
                            <span>Temps pour voir des résultats: {recommendation.timeToEffect}</span>
                          </div>
                          
                          <div>
                            <span className="font-medium">Pourquoi c'est recommandé: </span>
                            {recommendation.reason}
                          </div>
                        </div>
                      </div>
                      
                      {expandedRecommendation === recommendation.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-4 border-t pt-4"
                        >
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-medium mb-1">Dosage recommandé</h4>
                              <p className="text-sm">{recommendation.recommendedDose}</p>
                            </div>
                            
                            {recommendation.scientificBasis && (
                              <div>
                                <h4 className="font-medium mb-1">Base scientifique</h4>
                                <p className="text-sm">
                                  <ScientificHighlightedText text={recommendation.scientificBasis} />
                                </p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                    
                    <CardFooter className="pt-0 flex justify-between">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => toggleRecommendationExpand(recommendation.id)}
                        className="text-blue-600"
                      >
                        {expandedRecommendation === recommendation.id ? "Voir moins" : "Voir plus"}
                        <ChevronDown 
                          className={`ml-1 h-4 w-4 transition-transform ${
                            expandedRecommendation === recommendation.id ? 'rotate-180' : ''
                          }`} 
                        />
                      </Button>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-1" />
                              Études
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Voir les études scientifiques (disponible prochainement)</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}

              {/* Afficher plus de recommandations */}
              {sortedRecommendations.length > 3 && (
                <div className="text-center mt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAllRecommendations(!showAllRecommendations)}
                  >
                    {showAllRecommendations ? "Afficher moins" : `Voir ${sortedRecommendations.length - 3} recommandations supplémentaires`}
                  </Button>
                </div>
              )}
            </div>

            {/* Bannière inférieure avec CTA */}
            <Card className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <CardHeader>
                <CardTitle className="text-center">
                  <ScientificHighlightedText text="Optimisez votre parcours de [[nutritional-journey:nutrition personnalisée]]" />
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-6">
                  Enregistrez votre profil pour suivre votre progression et recevoir des mises à jour scientifiques personnalisées
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button 
                    onClick={onSaveProfile}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    Enregistrer mon profil
                  </Button>
                  <Button variant="outline" onClick={onViewArticles}>
                    <Book className="h-4 w-4 mr-2" />
                    Articles scientifiques recommandés
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-blue-500" />
                    <span>Analyses Avancées</span>
                  </CardTitle>
                  <CardDescription>
                    Aperçu détaillé de votre profil nutritionnel basé sur l'analyse de données
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-6">
                    Cette section présente une analyse détaillée de votre profil basée sur vos réponses et la comparaison avec notre base de données de {calculateParticipants()} participants.
                  </p>
                  
                  {aiSystemActivated ? (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Facteurs Principaux</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-medium text-blue-700 mb-2">Préoccupations Prioritaires</h4>
                            <ul className="space-y-1">
                              <li className="flex justify-between items-center">
                                <span>Niveau de stress</span>
                                <Badge variant="outline">Priorité élevée</Badge>
                              </li>
                              <li className="flex justify-between items-center">
                                <span>Qualité du sommeil</span>
                                <Badge variant="outline">Priorité moyenne</Badge>
                              </li>
                              <li className="flex justify-between items-center">
                                <span>Digestion</span>
                                <Badge variant="outline">Priorité basse</Badge>
                              </li>
                            </ul>
                          </div>
                          
                          <div className="bg-green-50 p-4 rounded-lg">
                            <h4 className="font-medium text-green-700 mb-2">Objectifs Identifiés</h4>
                            <ul className="space-y-1">
                              <li className="flex justify-between items-center">
                                <span>Améliorer l'énergie</span>
                                <Badge variant="outline">Faisabilité: 85%</Badge>
                              </li>
                              <li className="flex justify-between items-center">
                                <span>Réduire le stress</span>
                                <Badge variant="outline">Faisabilité: 78%</Badge>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Analyse Comparative</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Comparaison de votre profil avec d'autres participants ayant des objectifs similaires:
                        </p>
                        <div className="bg-indigo-50 p-4 rounded-lg">
                          <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span>Votre profil correspond à un groupe de participants ayant vu des améliorations de 68% en moyenne</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span>87% des participants avec un profil similaire ont rapporté une amélioration significative après 4-6 semaines</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-6 bg-gray-50 rounded-lg">
                      <p className="text-gray-500 mb-4">
                        Activez le système IA avancé pour accéder à l'analyse détaillée de votre profil
                      </p>
                      <Button 
                        onClick={() => {
                          setSelectedTab("recommendations");
                          setTimeout(() => activateAISystem(), 100);
                        }}
                      >
                        Activer le système IA
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}

      {/* Boutons de navigation */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
        <Button variant="outline" onClick={() => window.location.href = '/quiz'}>
          Refaire le quiz
        </Button>
        <Button variant="outline" onClick={() => window.location.href = '/'}>
          Retour à l'accueil
        </Button>
        <Button variant="outline" onClick={() => window.location.href = '/dashboard'}>
          Tableau de bord IA
        </Button>
      </div>
    </div>
  );
};

export default QuizResults;
