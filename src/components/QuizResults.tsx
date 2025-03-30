
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Award, Clock, Zap, Sparkles, Share2, Download, BookOpen, Check, ArrowRight, Heart, Brain, Droplet, ChevronDown, ExternalLink, Star, Gift } from 'lucide-react';
import { QuizResponse, BehavioralMetrics, Recommendation, NeuroProfile } from '@/utils/types';
import { ScientificHighlightedText } from './ui/ScientificHighlightedText';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SocialProofIndicator from './quiz/SocialProofIndicator';
import { secureStorage } from '@/utils/complianceFilter';

// Types for the component props
interface QuizResultsProps {
  recommendations: Recommendation[];
  quizResponses: QuizResponse;
  behavioralMetrics: BehavioralMetrics;
  neuroProfile: NeuroProfile;
  onSaveProfile: () => void;
  onViewArticles: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({
  recommendations,
  quizResponses,
  behavioralMetrics,
  neuroProfile,
  onSaveProfile,
  onViewArticles
}) => {
  const [activeTab, setActiveTab] = useState('recommendations');
  const [expandedRecommendation, setExpandedRecommendation] = useState<string | null>(null);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [progressValues, setProgressValues] = useState({
    main: 0,
    secondary: 0,
    tertiary: 0
  });

  // Simuler le chargement progressif pour l'effet visuel
  useEffect(() => {
    // Animation séquentielle des barres de progression
    const timer1 = setTimeout(() => {
      setProgressValues(prev => ({ ...prev, main: 100 }));
    }, 500);
    
    const timer2 = setTimeout(() => {
      setProgressValues(prev => ({ ...prev, secondary: 85 }));
    }, 1200);
    
    const timer3 = setTimeout(() => {
      setProgressValues(prev => ({ ...prev, tertiary: 92 }));
      setAnimationComplete(true);
    }, 1800);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const toggleRecommendation = (title: string) => {
    if (expandedRecommendation === title) {
      setExpandedRecommendation(null);
    } else {
      setExpandedRecommendation(title);
    }
  };

  // Sauvegarde des résultats (simulée)
  const handleSaveResults = () => {
    try {
      secureStorage.setItem('lastQuizResults', JSON.stringify({
        recommendations,
        quizResponses,
        timestamp: new Date().toISOString()
      }));
      onSaveProfile();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des résultats', error);
    }
  };

  // Calculer un score global basé sur le profil neuro
  const calculateOverallScore = () => {
    const { stressIndex, decisionConfidence, attentionScore, consistencyIndex } = neuroProfile;
    // Normalisation des scores pour un résultat entre 0 et 100
    return Math.round((100 - (stressIndex / 2) + decisionConfidence + attentionScore + consistencyIndex) / 3);
  };

  const overallScore = calculateOverallScore();

  return (
    <div className="relative px-4 py-6 md:py-8 max-w-5xl mx-auto">
      {/* Effet de particules scientifiques en arrière-plan */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 opacity-20 bg-gradient-radial from-blue-300 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 opacity-10 bg-gradient-radial from-green-300 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      {/* En-tête des résultats avec animation */}
      <motion.div 
        className="text-center mb-8 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-block mb-3">
          <motion.div 
            className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white"
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Check className="w-8 h-8" />
          </motion.div>
        </div>
        
        <motion.h1 
          className="text-2xl md:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Analyse Complétée avec Succès
        </motion.h1>
        
        <motion.p
          className="text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <ScientificHighlightedText text="Notre moteur d'analyse [[neuro-behavior:neuropsychologique]] a généré des recommandations personnalisées basées sur vos réponses et comportements." />
        </motion.p>
      </motion.div>

      {/* Carte de score global */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Card className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl shadow-md">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Visualisation du score */}
            <div className="relative w-40 h-40 flex-shrink-0 mx-auto md:mx-0">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold">{overallScore}</span>
              </div>
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke="rgba(229, 231, 235, 0.5)" 
                  strokeWidth="8"
                />
                <motion.circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke="url(#gradientScore)" 
                  strokeWidth="8"
                  strokeDasharray="283"
                  strokeDashoffset="283"
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ 
                    strokeDashoffset: 283 - (283 * overallScore / 100) 
                  }}
                  transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="gradientScore" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            {/* Détails du profil */}
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-xl font-bold mb-2">Votre Profil Nutritionnel</h3>
                <p className="text-muted-foreground text-sm">
                  <ScientificHighlightedText text="Score basé sur votre [[metabolic-signature:signature métabolique]] et vos réponses au questionnaire." />
                </p>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Équilibre Nutritionnel</span>
                    <span className="font-medium">{progressValues.main}%</span>
                  </div>
                  <Progress value={progressValues.main} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Habitudes Alimentaires</span>
                    <span className="font-medium">{progressValues.secondary}%</span>
                  </div>
                  <Progress value={progressValues.secondary} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Optimisation Métabolique</span>
                    <span className="font-medium">{progressValues.tertiary}%</span>
                  </div>
                  <Progress value={progressValues.tertiary} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Neuro-profil et recommandations */}
      <Tabs 
        defaultValue="recommendations" 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="recommendations" className="text-sm md:text-base">
            Recommandations
          </TabsTrigger>
          <TabsTrigger value="neuro" className="text-sm md:text-base">
            Profil Détaillé
          </TabsTrigger>
        </TabsList>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value="recommendations" className="space-y-6 mt-0">
              <div className="grid gap-4">
                {recommendations.map((recommendation, index) => (
                  <motion.div
                    key={recommendation.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                  >
                    <Card className={`overflow-hidden border-l-4 ${
                      index === 0 ? 'border-l-blue-500' : 
                      index === 1 ? 'border-l-green-500' : 'border-l-indigo-500'
                    }`}>
                      <div 
                        className="p-4 md:p-6 cursor-pointer"
                        onClick={() => toggleRecommendation(recommendation.title)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-full ${
                              index === 0 ? 'bg-blue-100 text-blue-600' : 
                              index === 1 ? 'bg-green-100 text-green-600' : 'bg-indigo-100 text-indigo-600'
                            }`}>
                              {index === 0 ? <Brain className="w-5 h-5" /> : 
                               index === 1 ? <Heart className="w-5 h-5" /> : 
                               <Droplet className="w-5 h-5" />}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{recommendation.title}</h3>
                              <p className="text-muted-foreground text-sm mt-1">{recommendation.description}</p>
                            </div>
                          </div>
                          <ChevronDown 
                            className={`w-5 h-5 text-muted-foreground transition-transform ${
                              expandedRecommendation === recommendation.title ? 'transform rotate-180' : ''
                            }`} 
                          />
                        </div>
                        
                        <div className="flex flex-wrap mt-3 gap-1">
                          <Badge variant="outline" className="bg-gray-50 flex items-center gap-1">
                            <Zap className="w-3 h-3" /> 
                            <span>Confiance: {Math.round(recommendation.confidence * 100)}%</span>
                          </Badge>
                          <Badge variant="outline" className="bg-gray-50 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> 
                            <span>{recommendation.timeToEffect}</span>
                          </Badge>
                          <Badge variant="outline" className="bg-gray-50 flex items-center gap-1">
                            <Users className="w-3 h-3" /> 
                            <span>Popularité: {recommendation.popularity}%</span>
                          </Badge>
                        </div>
                      </div>
                      
                      {expandedRecommendation === recommendation.title && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-4 md:px-6 pb-4 md:pb-6 pt-0"
                        >
                          <Separator className="my-4" />
                          
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium mb-2">Bénéfices scientifiquement prouvés</h4>
                              <ul className="space-y-2">
                                {recommendation.benefits.map((benefit, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm">
                                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span><ScientificHighlightedText text={benefit} /></span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            {recommendation.scientificBasis && (
                              <div>
                                <h4 className="text-sm font-medium mb-2">Base scientifique</h4>
                                <p className="text-sm text-muted-foreground">
                                  <ScientificHighlightedText text={recommendation.scientificBasis} />
                                </p>
                              </div>
                            )}
                            
                            {recommendation.url && (
                              <div className="pt-2">
                                <Button 
                                  variant="outline" 
                                  className="w-full group" 
                                  size="sm"
                                  asChild
                                >
                                  <Link to={recommendation.url} className="flex items-center justify-center gap-2">
                                    <span>Découvrir la solution complète</span>
                                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                  </Link>
                                </Button>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>
              
              {/* Social proof */}
              <Card className="p-4 bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800">
                <SocialProofIndicator 
                  baseText="Des personnes ayant un profil similaire au vôtre ont trouvé ces recommandations efficaces"
                  variant="detailed"
                />
              </Card>
            </TabsContent>
            
            <TabsContent value="neuro" className="space-y-6 mt-0">
              <Card className="p-4 md:p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-indigo-600" />
                  Votre Profil Neuropsychologique
                </h3>
                
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <div className="flex items-center gap-1">
                        <span>Indice de Stress</span>
                        <span className="text-xs text-muted-foreground">(plus bas est mieux)</span>
                      </div>
                      <span className="font-medium">{neuroProfile.stressIndex}%</span>
                    </div>
                    <Progress value={neuroProfile.stressIndex} className="h-2 bg-gray-200" indicatorClassName="bg-amber-500" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Confiance Décisionnelle</span>
                      <span className="font-medium">{neuroProfile.decisionConfidence}%</span>
                    </div>
                    <Progress value={neuroProfile.decisionConfidence} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Score d'Attention</span>
                      <span className="font-medium">{neuroProfile.attentionScore}%</span>
                    </div>
                    <Progress value={neuroProfile.attentionScore} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Indice de Cohérence</span>
                      <span className="font-medium">{neuroProfile.consistencyIndex}%</span>
                    </div>
                    <Progress value={neuroProfile.consistencyIndex} className="h-2" />
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm">
                    <ScientificHighlightedText
                      text="Ce profil a été généré en utilisant notre algorithme d'analyse [[cognitive-patterns:comportementale]] qui évalue les patterns de réponse, le temps passé sur chaque question et la cohérence de vos choix."
                    />
                  </p>
                </div>
              </Card>
              
              <Card className="p-4 md:p-6">
                <h3 className="text-lg font-semibold mb-4">Comportement durant le Quiz</h3>
                
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center">
                    <span>Temps moyen par question</span>
                    <span className="font-medium">{Math.round(behavioralMetrics.avgResponseTime)} secondes</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Questions reconsidérées</span>
                    <span className="font-medium">{behavioralMetrics.changedAnswers.length}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Cohérence des réponses</span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            i < Math.round(behavioralMetrics.consistencyScore * 5) 
                              ? 'text-yellow-500 fill-yellow-500' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>

      {/* Actions buttons */}
      <motion.div 
        className="mt-8 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: animationComplete ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Bouton principal */}
        <Button 
          onClick={handleSaveResults}
          className="w-full py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white gap-2 group shadow-md hover:shadow-lg transition-all"
          size="lg"
        >
          <span className="text-lg">Sauvegarder mon profil</span>
          <Gift className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </Button>
        
        {/* Actions secondaires */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            onClick={onViewArticles}
            className="flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Articles scientifiques</span>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => setShowShareOptions(!showShareOptions)}
            className="flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Partager</span>
          </Button>
        </div>
        
        {/* Options de partage */}
        <AnimatePresence>
          {showShareOptions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <Card className="p-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <Button variant="ghost" className="flex flex-col items-center gap-1 h-auto py-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-bold">f</span>
                  </div>
                  <span>Facebook</span>
                </Button>
                <Button variant="ghost" className="flex flex-col items-center gap-1 h-auto py-3">
                  <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center">
                    <span className="text-sky-600 font-bold">t</span>
                  </div>
                  <span>Twitter</span>
                </Button>
                <Button variant="ghost" className="flex flex-col items-center gap-1 h-auto py-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 font-bold">w</span>
                  </div>
                  <span>WhatsApp</span>
                </Button>
                <Button variant="ghost" className="flex flex-col items-center gap-1 h-auto py-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-600 font-bold">e</span>
                  </div>
                  <span>Email</span>
                </Button>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Note d'information */}
        <p className="text-xs text-center text-muted-foreground pt-2">
          Contenu éducatif et scientifique uniquement - Aucune vente de produit
        </p>
      </motion.div>
    </div>
  );
};

export default QuizResults;
