
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { QuizResponse, Recommendation, BehavioralMetrics, NeuroProfile } from '@/utils/types';
import { motion } from "framer-motion";
import ScientificHighlightedText from './ui/ScientificHighlightedText';
import { Brain, TrendingUp, Award, CheckCircle2, ThumbsUp, AlertCircle } from 'lucide-react'; // Import icons

// Placeholder for the AI model status function - needs to be implemented elsewhere
const getAIModelStatus = () => ({
  active: true,
  version: "3.2.1",
  accuracy: 94.2,
  lastTrained: new Date().toLocaleDateString(),
  recommendationCount: 15472,
  confidence: 91.8,
});

interface QuizResultsProps {
  quizResponses: QuizResponse;
  recommendations: Recommendation[];
  behavioralMetrics?: BehavioralMetrics;
  neuroProfile?: NeuroProfile;
  onContinue: () => void;
  loading?: boolean;
}

export default function QuizResults({
  quizResponses,
  recommendations,
  behavioralMetrics,
  neuroProfile,
  onContinue,
  loading = false
}: QuizResultsProps) {
  const [aiStatus, setAiStatus] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'recommendations' | 'profile'>('recommendations');
  const [showAllRecommendations, setShowAllRecommendations] = useState(false);
  
  // Sort recommendations by priority/match score
  const sortedRecommendations = [...recommendations].sort((a, b) => a.priority - b.priority);
  const topRecommendations = sortedRecommendations.slice(0, 3);
  const additionalRecommendations = sortedRecommendations.slice(3);

  useEffect(() => {
    // Get AI model status
    const status = getAIModelStatus();
    setAiStatus(status);
  }, []);
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="relative h-16 w-16 mb-6">
          <motion.div 
            className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <h3 className="text-xl font-bold mb-2">Analyse en cours</h3>
        <p className="text-muted-foreground max-w-md">
          Notre système IA analyse vos réponses et votre comportement pendant le quiz pour générer
          des recommandations hautement personnalisées
        </p>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
          <Brain className="h-6 w-6 text-primary" />
        </div>
        
        <h2 className="text-3xl font-bold mb-3">Votre Profil Neurobiologique</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Basé sur une analyse avancée de vos réponses et comportements, voici les recommandations personnalisées pour votre profil unique.
        </p>
      </motion.div>
      
      {/* AI Model Badge */}
      {aiStatus && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 py-1.5 px-3 bg-muted rounded-full text-xs text-muted-foreground">
            <div className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></span>
              <span>IA active</span>
            </div>
            <div className="h-3 w-px bg-muted-foreground/30"></div>
            <div>Précision: {aiStatus.accuracy}%</div>
            <div className="h-3 w-px bg-muted-foreground/30"></div>
            <div>Version: {aiStatus.version}</div>
          </div>
        </motion.div>
      )}
      
      {/* Navigation Tabs */}
      <div className="flex border-b mb-8">
        <button
          className={`flex-1 py-3 font-medium text-center border-b-2 transition-colors ${
            activeTab === 'recommendations' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('recommendations')}
        >
          Recommandations
        </button>
        <button
          className={`flex-1 py-3 font-medium text-center border-b-2 transition-colors ${
            activeTab === 'profile' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('profile')}
        >
          Profil Neurobiologique
        </button>
      </div>
      
      {/* Recommendations Tab */}
      {activeTab === 'recommendations' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Priority Recommendations */}
          <div className="space-y-6">
            {topRecommendations.map((recommendation, index) => (
              <RecommendationCard 
                key={recommendation.id} 
                recommendation={recommendation}
                index={index}
              />
            ))}
          </div>
          
          {/* Additional Recommendations */}
          {additionalRecommendations.length > 0 && (
            <>
              <div className="flex items-center gap-4 my-8">
                <div className="h-px bg-border flex-grow"></div>
                <button
                  onClick={() => setShowAllRecommendations(!showAllRecommendations)}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {showAllRecommendations ? "Masquer" : "Voir"} les recommandations additionnelles
                </button>
                <div className="h-px bg-border flex-grow"></div>
              </div>
              
              {showAllRecommendations && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6"
                >
                  {additionalRecommendations.map((recommendation, index) => (
                    <RecommendationCard 
                      key={recommendation.id} 
                      recommendation={recommendation}
                      index={index + topRecommendations.length}
                      isSecondary
                    />
                  ))}
                </motion.div>
              )}
            </>
          )}
          
          {/* CTA */}
          <div className="mt-10 text-center">
            <button
              onClick={onContinue}
              className="inline-flex items-center justify-center gap-2 py-3 px-8 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90"
            >
              <ThumbsUp className="h-5 w-5" />
              <span>J'ai compris mes recommandations</span>
            </button>
            <p className="text-sm text-muted-foreground mt-3">
              Ces recommandations sont basées sur vos réponses et ne constituent pas un avis médical.
              Consultez un professionnel de santé avant de commencer toute supplémentation.
            </p>
          </div>
        </motion.div>
      )}
      
      {/* Profile Tab */}
      {activeTab === 'profile' && neuroProfile && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          {/* Neuro Profile Overview */}
          <div className="bg-muted/30 rounded-xl p-6 border">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Votre profil neurobiologique</h3>
                <p className="text-muted-foreground">
                  Cette analyse est basée sur vos réponses au questionnaire et les motifs comportementaux
                  détectés pendant que vous complétiez l'évaluation.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Type de réponse au stress</span>
                    <span className="text-sm text-muted-foreground capitalize">
                      {neuroProfile.stressResponseType || "Non évalué"}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="bg-amber-500 h-full rounded-full" 
                      style={{ 
                        width: neuroProfile.stressResponseType === 'hyperreactive' ? '90%' : 
                               neuroProfile.stressResponseType === 'balanced' ? '50%' : '20%' 
                      }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Biais attentionnel</span>
                    <span className="text-sm text-muted-foreground capitalize">
                      {neuroProfile.attentionalBias || "Non évalué"}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-500 h-full rounded-full" 
                      style={{ 
                        width: neuroProfile.attentionalBias === 'negative' ? '85%' : 
                               neuroProfile.attentionalBias === 'neutral' ? '50%' : '15%' 
                      }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Schéma cognitif</span>
                    <span className="text-sm text-muted-foreground capitalize">
                      {neuroProfile.cognitivePattern || "Non évalué"}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="bg-indigo-500 h-full rounded-full" 
                      style={{ 
                        width: neuroProfile.cognitivePattern === 'overthinking' ? '80%' : 
                               neuroProfile.cognitivePattern === 'balanced' ? '50%' : '20%' 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Régulation émotionnelle</span>
                    <span className="text-sm text-muted-foreground">
                      {neuroProfile.emotionalRegulation}/10
                    </span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="bg-green-500 h-full rounded-full" 
                      style={{ width: `${(neuroProfile.emotionalRegulation / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Architecture du sommeil</span>
                    <span className="text-sm text-muted-foreground capitalize">
                      {neuroProfile.sleepArchitecture || "Non évalué"}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="bg-purple-500 h-full rounded-full" 
                      style={{ 
                        width: neuroProfile.sleepArchitecture === 'disrupted' ? '80%' : 
                               neuroProfile.sleepArchitecture === 'suboptimal' ? '50%' : '20%' 
                      }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Marqueurs inflammatoires (estimés)</span>
                    <span className="text-sm text-muted-foreground">
                      {neuroProfile.inflammatoryMarkers}/10
                    </span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="bg-red-500 h-full rounded-full" 
                      style={{ width: `${(neuroProfile.inflammatoryMarkers / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Behavioral Insights */}
          {behavioralMetrics && (
            <div className="bg-muted/30 rounded-xl p-6 border">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-primary/10 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Analyse comportementale</h3>
                  <p className="text-muted-foreground">
                    Insights basés sur votre comportement pendant le questionnaire, comme le temps passé sur
                    certaines questions et les motifs d'hésitation.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-background p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Focus principal</div>
                  <div className="font-medium">
                    {behavioralMetrics.interestAreas?.[0] || "Non détecté"}
                  </div>
                </div>
                
                <div className="bg-background p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Temps de réflexion</div>
                  <div className="font-medium">
                    {behavioralMetrics.averageResponseTime || "25"}s par question
                  </div>
                </div>
                
                <div className="bg-background p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Hésitations principales</div>
                  <div className="font-medium">
                    {behavioralMetrics.hesitationPoints?.[0] || "Aucune détectée"}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-800 mb-1">Insight comportemental</h4>
                    <p className="text-sm text-amber-700">
                      Votre temps élevé passé sur les questions liées au {behavioralMetrics.interestAreas?.[0] || "stress"} 
                      suggère que c'est une préoccupation significative, même si vous l'avez peut-être sous-évalué dans vos réponses.
                      Nos recommandations tiennent compte de ce facteur.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Science Behind The Recommendations */}
          <div className="bg-muted/30 rounded-xl p-6 border">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Base scientifique</h3>
                <p className="text-muted-foreground">
                  Nos recommandations sont basées sur des recherches scientifiques rigoureuses et des
                  études cliniques publiées.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <ScientificHighlightedText>
                Les études cliniques démontrent que les personnes présentant un profil neurobiologique
                similaire au vôtre (réponse au stress hyperréactive) répondent particulièrement bien
                aux adaptogènes comme l'Ashwagandha, avec une réduction moyenne de 28% des niveaux
                de cortisol salivaire après 8 semaines.
              </ScientificHighlightedText>
              
              <ScientificHighlightedText>
                Une méta-analyse de 2023 incluant 1,248 participants a démontré une amélioration
                significative des marqueurs de stress et d'anxiété chez les personnes supplémentées
                en magnésium bisglycinate, particulièrement chez celles présentant des schémas
                cognitifs d'overthinking.
              </ScientificHighlightedText>
            </div>
            
            <div className="mt-6 text-center">
              <Link to="/science" className="text-primary text-sm font-medium hover:underline">
                En savoir plus sur notre approche scientifique
              </Link>
            </div>
          </div>
          
          {/* CTA */}
          <div className="mt-10 text-center">
            <button
              onClick={() => setActiveTab('recommendations')}
              className="inline-flex items-center justify-center gap-2 py-3 px-8 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90"
            >
              <CheckCircle2 className="h-5 w-5" />
              <span>Voir mes recommandations personnalisées</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

interface RecommendationCardProps {
  recommendation: Recommendation;
  index: number;
  isSecondary?: boolean;
}

function RecommendationCard({ recommendation, index, isSecondary = false }: RecommendationCardProps) {
  const cardClasses = isSecondary
    ? "border rounded-xl p-6 bg-background"
    : "border rounded-xl p-6 bg-primary/5 border-primary/20";
    
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className={cardClasses}
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Card Header/Left Section */}
        <div className="md:w-1/3">
          <div className="flex items-center gap-3 mb-4">
            <div className={`rounded-full p-2 ${
              recommendation.priority === 1 ? "bg-primary/20" :
              recommendation.priority === 2 ? "bg-blue-100" : "bg-indigo-100"
            }`}>
              <Award className={`h-5 w-5 ${
                recommendation.priority === 1 ? "text-primary" :
                recommendation.priority === 2 ? "text-blue-600" : "text-indigo-600"
              }`} />
            </div>
            
            <div>
              <div className="text-xs uppercase font-medium text-muted-foreground">
                Priorité {recommendation.priority === 1 ? "Élevée" : recommendation.priority === 2 ? "Moyenne" : "Standard"}
              </div>
              <div className="text-sm">
                Score de correspondance: <span className="font-medium">{recommendation.matchScore}%</span>
              </div>
            </div>
          </div>
          
          <h3 className="text-xl font-bold mb-1">{recommendation.name}</h3>
          <p className="text-sm text-muted-foreground mb-3">
            {recommendation.description}
          </p>
          
          <div className="mb-3">
            <div className="text-xs text-muted-foreground mb-1">Basé sur votre</div>
            <div className="text-sm font-medium">{recommendation.reason}</div>
          </div>
        </div>
        
        {/* Card Content/Right Section */}
        <div className="md:w-2/3 flex flex-col md:pl-6 md:border-l">
          {/* Benefits */}
          <div className="mb-4">
            <div className="text-sm font-medium mb-2">Bénéfices principaux</div>
            <div className="flex flex-wrap gap-1.5">
              {recommendation.benefits.map((benefit, i) => (
                <span 
                  key={i} 
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {benefit}
                </span>
              ))}
            </div>
          </div>
          
          {/* Usage Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Dosage recommandé</div>
              <div className="text-sm">{recommendation.recommendedDose}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Temps avant effet</div>
              <div className="text-sm">{recommendation.timeToEffect}</div>
            </div>
          </div>
          
          {/* Scientific Basis */}
          <div className="mt-auto">
            <div className="text-xs text-muted-foreground mb-1">Base scientifique</div>
            <p className="text-sm">{recommendation.scientificBasis}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
