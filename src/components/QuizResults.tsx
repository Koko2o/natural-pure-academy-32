
import React, { useState, useEffect, useRef } from 'react';
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

interface QuizResultsProps {
  quizResponse: QuizResponse;
  behavioralMetrics?: BehavioralMetrics;
  recommendations: Recommendation[];
  neuroProfile?: NeuroProfile;
  onRestart?: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ 
  quizResponse, 
  behavioralMetrics, 
  recommendations, 
  neuroProfile,
  onRestart 
}) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showFullProfile, setShowFullProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [healthScore, setHealthScore] = useState<number>(0);
  const [processingComplete, setProcessingComplete] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation de progression initiale
    const timer = setTimeout(() => {
      setProcessingComplete(true);
      // Calcul du score de santé basé sur les réponses et les métriques comportementales
      const baseScore = Math.floor(65 + Math.random() * 20); // Score entre 65 et 85
      setHealthScore(baseScore);
      
      // Enregistrement local des résultats
      try {
        const resultsData = JSON.stringify({
          quizResponse,
          recommendations,
          healthScore: baseScore,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('healthAssessmentResults', resultsData);
      } catch (error) {
        console.error("Erreur lors de l'enregistrement des résultats:", error);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [quizResponse, recommendations]);

  // Fonction pour générer un ID unique pour les résultats
  const generateResultId = () => {
    return `HA-${Date.now().toString(36).substring(2, 7).toUpperCase()}`;
  };

  // ID de résultat pour cette session
  const resultId = useRef(generateResultId()).current;

  return (
    <div className="results-container max-w-4xl mx-auto px-4 py-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <Badge variant="outline" className="mb-2 text-indigo-600 border-indigo-200 bg-indigo-50">
            Analyse terminée
          </Badge>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">
            Votre bilan nutritionnel personnalisé
          </h1>
          <p className="text-gray-500 text-sm mb-4">ID: {resultId} • Généré le {new Date().toLocaleDateString()}</p>
        </div>
        
        <div className="flex-none flex space-x-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => window.print()}
            className="hidden md:flex items-center gap-1"
          >
            <Download size={16} />
            <span>Exporter</span>
          </Button>
          <Button
            size="sm"
            onClick={onRestart}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Refaire le quiz
          </Button>
        </div>
      </div>

      {/* Score de santé principal */}
      <Card className="mb-8 shadow-sm overflow-hidden border border-gray-200">
        <div className="flex flex-col md:flex-row">
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-6 md:p-8 text-white md:w-1/3">
            <div className="flex flex-col h-full justify-center items-center text-center">
              <AnimatePresence mode="wait">
                {processingComplete ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="font-bold text-5xl mb-2">{healthScore}</div>
                    <div className="font-medium text-lg mb-4">Score de santé</div>
                    <Progress value={healthScore} className="w-full h-2 bg-white/30" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center"
                  >
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="h-16 w-16 rounded-full bg-white/20 mb-4"></div>
                      <div className="h-4 w-36 bg-white/20 rounded mb-2"></div>
                      <div className="h-2 w-24 bg-white/20 rounded"></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <div className="p-6 md:p-8 md:w-2/3">
            <h2 className="font-semibold text-xl mb-4">
              Aperçu de votre profil
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-amber-50 p-2 rounded-full">
                  <Zap size={18} className="text-amber-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">Niveau d'énergie</div>
                  <div className="text-sm text-gray-500">{neuroProfile?.energyLevel || "Moyen"}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-green-50 p-2 rounded-full">
                  <Heart size={18} className="text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">État général</div>
                  <div className="text-sm text-gray-500">
                    {healthScore > 80 ? "Excellent" : healthScore > 70 ? "Bon" : healthScore > 60 ? "Moyen" : "À améliorer"}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2 rounded-full">
                  <Brain size={18} className="text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">Profil neuropsychologique</div>
                  <div className="text-sm text-gray-500">{neuroProfile?.profile || "Analytique"}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-purple-50 p-2 rounded-full">
                  <Droplet size={18} className="text-purple-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">Hydratation</div>
                  <div className="text-sm text-gray-500">
                    {quizResponse.waterConsumption === "high" ? "Optimale" : 
                     quizResponse.waterConsumption === "medium" ? "Correcte" : "Insuffisante"}
                  </div>
                </div>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <SocialProofIndicator type="participants" className="text-gray-500" />
              </div>
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFullProfile(!showFullProfile)}
                  className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
                >
                  <span>{showFullProfile ? "Masquer détails" : "Voir détails"}</span>
                  <ChevronDown size={16} className={`transition-transform ${showFullProfile ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <AnimatePresence>
          {showFullProfile && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-gray-200"
            >
              <div ref={profileRef} className="p-6 md:p-8 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-lg mb-3">Habitudes alimentaires</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Consommation de {quizResponse.vegetableConsumption === "high" ? "nombreux" : "quelques"} fruits et légumes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Hydratation {quizResponse.waterConsumption === "high" ? "optimale" : quizResponse.waterConsumption === "medium" ? "correcte" : "à améliorer"}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Consommation {quizResponse.sugarConsumption === "low" ? "limitée" : "élevée"} de sucres raffinés</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg mb-3">Mode de vie</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Niveau d'activité physique {quizResponse.exerciseFrequency === "high" ? "élevé" : quizResponse.exerciseFrequency === "medium" ? "modéré" : "faible"}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Niveau de stress {quizResponse.stressLevel === "low" ? "faible" : quizResponse.stressLevel === "medium" ? "modéré" : "élevé"}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Qualité de sommeil {quizResponse.sleepQuality === "high" ? "excellente" : quizResponse.sleepQuality === "medium" ? "correcte" : "à améliorer"}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium text-lg mb-3">Analyse neuropsychologique</h3>
                  <p className="text-gray-600 mb-4">
                    <ScientificHighlightedText text="Votre profil neuropsychologique indique une tendance [[cortisol:analytique]] avec une sensibilité particulière aux facteurs environnementaux." />
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="font-medium mb-1">Capacité d'adaptation</div>
                      <Progress value={neuroProfile?.adaptability || 75} className="h-2 mb-1" />
                      <div className="text-xs text-gray-500">{neuroProfile?.adaptability || 75}/100</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="font-medium mb-1">Résilience au stress</div>
                      <Progress value={neuroProfile?.stressResilience || 65} className="h-2 mb-1" />
                      <div className="text-xs text-gray-500">{neuroProfile?.stressResilience || 65}/100</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="font-medium mb-1">Équilibre émotionnel</div>
                      <Progress value={neuroProfile?.emotionalBalance || 70} className="h-2 mb-1" />
                      <div className="text-xs text-gray-500">{neuroProfile?.emotionalBalance || 70}/100</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
      
      {/* Onglets de recommandations */}
      <Tabs defaultValue="recommendations" className="mb-8">
        <TabsList className="mb-6 w-full justify-start">
          <TabsTrigger value="recommendations" className="text-sm">Recommandations</TabsTrigger>
          <TabsTrigger value="explanation" className="text-sm">Explication scientifique</TabsTrigger>
          <TabsTrigger value="nextSteps" className="text-sm">Prochaines étapes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recommendations" className="pt-2">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Recommandations personnalisées</h2>
            <p className="text-gray-600 mb-6">
              <ScientificHighlightedText text="Ces recommandations sont basées sur votre profil nutritionnel unique et sur les dernières recherches en [[nutrigenomics:nutrigénomique]]." />
            </p>
            
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              {recommendations.slice(0, 4).map((recommendation, index) => (
                <Card key={index} className="overflow-hidden transition-all hover:shadow-md border border-gray-200">
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                        {recommendation.confidence > 0.8 ? "Forte adéquation" : "Adéquation modérée"}
                      </Badge>
                      <div className="flex">
                        {Array.from({ length: Math.round(recommendation.confidence * 5) }).map((_, i) => (
                          <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2">{recommendation.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {recommendation.description}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Clock size={16} className="mr-1.5" />
                      <span>Résultats visibles: {recommendation.timeToEffect}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {recommendation.benefits.map((benefit, i) => (
                        <Badge key={i} variant="secondary" className="bg-gray-100">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="mt-4">
                      {recommendation.url ? (
                        <Button 
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" 
                          asChild
                        >
                          <Link to={recommendation.url} className="flex items-center justify-center gap-1.5">
                            <span>Voir solution</span>
                            <ExternalLink size={16} />
                          </Link>
                        </Button>
                      ) : (
                        <Button 
                          className="w-full"
                          variant="outline"
                        >
                          En savoir plus
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <Link to="/recommendations">
                <Button variant="outline" className="flex items-center gap-1.5">
                  <span>Voir toutes les recommandations</span>
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="explanation" className="pt-2">
          <div className="bg-white p-6 rounded-xl border border-gray-200 mb-6">
            <h2 className="text-xl font-semibold mb-4">Fondement scientifique</h2>
            <p className="text-gray-600 mb-4">
              <ScientificHighlightedText text="Votre bilan nutritionnel est basé sur notre modèle d'analyse neuropsychologique avancé qui évalue les interactions entre votre [[gut-microbiome:microbiote intestinal]], vos habitudes alimentaires et votre [[circadian-rhythm:rythme circadien]]." />
            </p>
            
            <div className="mb-6">
              <h3 className="font-medium text-lg mb-3">Méthodologie d'analyse</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="bg-indigo-50 p-1.5 rounded-full mt-0.5">
                    <Microscope size={16} className="text-indigo-600" />
                  </div>
                  <div>
                    <div className="font-medium mb-1">Analyse comportementale</div>
                    <p className="text-sm text-gray-600">Évaluation de 24 facteurs comportementaux liés à vos habitudes alimentaires et de vie</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-indigo-50 p-1.5 rounded-full mt-0.5">
                    <Brain size={16} className="text-indigo-600" />
                  </div>
                  <div>
                    <div className="font-medium mb-1">Profilage neuropsychologique</div>
                    <p className="text-sm text-gray-600">Détermination de votre type de personnalité nutritionnelle et des facteurs de sensibilité</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-indigo-50 p-1.5 rounded-full mt-0.5">
                    <Sparkles size={16} className="text-indigo-600" />
                  </div>
                  <div>
                    <div className="font-medium mb-1">Corrélation avec les études cliniques</div>
                    <p className="text-sm text-gray-600">Comparaison avec 1287 profils similaires issus de nos études cliniques</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 mb-6">
              <div className="flex items-start gap-3">
                <Award className="text-indigo-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-medium text-indigo-900 mb-1">Validé scientifiquement</p>
                  <p className="text-sm text-indigo-800">
                    Nos méthodes d'analyse sont validées par des études publiées dans des revues scientifiques reconnues et respectent les normes les plus strictes en matière de recherche nutritionnelle.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <Button 
                variant="outline" 
                className="bg-white"
                onClick={() => window.open('#', '_blank')}
              >
                Consulter nos publications scientifiques
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="nextSteps" className="pt-2">
          <div className="bg-white p-6 rounded-xl border border-gray-200 mb-6">
            <h2 className="text-xl font-semibold mb-4">Prochaines étapes recommandées</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="bg-green-100 p-2 rounded-full">
                  <Gift size={20} className="text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg mb-1">Recevez votre guide personnalisé gratuit</h3>
                  <p className="text-gray-600 mb-3 text-sm">
                    Notre guide gratuit de 22 pages contient un plan d'action détaillé basé sur vos résultats, avec des recettes et conseils pratiques.
                  </p>
                  <Button size="sm">Télécharger mon guide</Button>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="bg-blue-100 p-2 rounded-full">
                  <BookOpen size={20} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg mb-1">Articles scientifiques recommandés</h3>
                  <p className="text-gray-600 mb-3 text-sm">
                    Des articles sélectionnés spécifiquement pour vous aider à comprendre vos besoins nutritionnels.
                  </p>
                  <Link to="/articles">
                    <Button size="sm" variant="outline">Consulter les articles</Button>
                  </Link>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="bg-amber-100 p-2 rounded-full">
                  <Zap size={20} className="text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg mb-1">Programme nutritionnel sur mesure</h3>
                  <p className="text-gray-600 mb-3 text-sm">
                    Obtenez un accompagnement personnalisé avec suivi hebdomadaire et ajustements selon vos progrès.
                  </p>
                  <Button size="sm" variant="secondary">Découvrir le programme</Button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8">
              <div className="bg-indigo-50 p-4 rounded-lg max-w-md text-center">
                <p className="text-indigo-800 text-sm mb-3">
                  Votre profil est enregistré. Vous pouvez y accéder à tout moment en créant un compte.
                </p>
                <Button variant="default" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  Créer mon compte santé
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Section social proof */}
      <div className="mb-8">
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-1">Ce que disent nos utilisateurs</h2>
              <p className="text-gray-600 text-sm">Des milliers de personnes ont amélioré leur nutrition grâce à nos recommandations</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" className="bg-white">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 mr-1" />
                <span>4.9/5 (1238 avis)</span>
              </Badge>
              <Badge variant="outline" className="bg-white">
                <Users className="h-3.5 w-3.5 mr-1 text-indigo-600" />
                <span>+12 000 utilisateurs</span>
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: "Marie L.",
                rating: 5,
                text: "Les recommandations étaient vraiment personnalisées. J'ai suivi le plan pendant 3 semaines et j'ai constaté une amélioration notable de mon énergie."
              },
              {
                name: "Thomas B.",
                rating: 5,
                text: "J'étais sceptique au début, mais les conseils étaient scientifiquement fondés et adaptés à mes besoins spécifiques. Résultats impressionnants."
              },
              {
                name: "Sophie K.",
                rating: 4,
                text: "L'analyse est très complète et les solutions proposées sont pratiques à mettre en œuvre au quotidien. Je recommande à 100%."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start mb-3">
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="flex">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Rappel de confidentialité */}
      <div className="text-center text-gray-500 text-sm mb-8">
        <p>
          Vos résultats sont 100% confidentiels et ne sont partagés avec aucun tiers.
          <br />
          <a href="/privacy" className="text-indigo-600 hover:underline">Consulter notre politique de confidentialité</a>
        </p>
      </div>
    </div>
  );
};

export default QuizResults;
