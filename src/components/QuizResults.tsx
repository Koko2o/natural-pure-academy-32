
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Award, Clock, Zap, Sparkles, Share2, Download, BookOpen } from 'lucide-react';
import { QuizResponse, BehavioralMetrics, Recommendation, NeuroProfile } from '@/utils/types';
import { ScientificHighlightedText } from './ui/ScientificHighlightedText';

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
  const [activeTab, setActiveTab] = useState<'besoins' | 'recommendations'>('besoins');
  const [expandedRecommendation, setExpandedRecommendation] = useState<number | null>(null);
  const [shareTooltip, setShareTooltip] = useState<boolean>(false);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };
  
  // Calcul du score de santé (exemple simple)
  const healthScore = Math.round((100 - (neuroProfile.stressIndex * 0.3)) * neuroProfile.consistencyIndex / 100);
  
  // Âge métabolique (exemple simple)
  const age = quizResponses.age || 30;
  const metabolicAge = Math.round(age - (healthScore - 50) / 5);
  
  // Besoins principaux dérivés des réponses
  const mainNeeds = [
    "Optimisation des niveaux d'énergie",
    "Amélioration de la qualité du sommeil",
    "Soutien au système immunitaire",
    "Gestion du stress et équilibre hormonal"
  ];
  
  // Fonction pour copier le lien des résultats
  const shareResults = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareTooltip(true);
    setTimeout(() => setShareTooltip(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 max-w-4xl mx-auto">
      {/* En-tête des résultats */}
      <div className="text-center mb-8">
        <div className="inline-block bg-natural-100 text-natural-800 rounded-full px-4 py-1 text-sm mb-3">
          Analyse Scientifique Complète
        </div>
        <h1 className="text-3xl font-bold text-natural-900 mb-2">Vos Résultats Personnalisés</h1>
        <p className="text-natural-600 max-w-2xl mx-auto">
          <ScientificHighlightedText text="Notre analyse avancée a identifié vos besoins spécifiques en [[micronutriments:micronutriments]] en fonction de vos réponses et comportements." />
        </p>
      </div>
      
      {/* Métriques principales */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
      >
        <motion.div variants={itemVariants} className="bg-gradient-to-br from-natural-50 to-natural-100 rounded-xl p-6 text-center">
          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-natural-200">
              <Zap className="w-8 h-8 text-natural-700" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-natural-900 mb-1">Score de Vitalité</h3>
          <div className="text-3xl font-bold text-natural-800 mb-1">{healthScore}<span className="text-xl">/100</span></div>
          <p className="text-natural-600 text-sm">Basé sur {Object.keys(quizResponses).length} marqueurs biologiques</p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="bg-gradient-to-br from-natural-50 to-natural-100 rounded-xl p-6 text-center">
          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-natural-200">
              <Clock className="w-8 h-8 text-natural-700" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-natural-900 mb-1">Âge Métabolique</h3>
          <div className="text-3xl font-bold text-natural-800 mb-1">{metabolicAge} <span className="text-xl">ans</span></div>
          <p className="text-natural-600 text-sm">
            {metabolicAge < age ? `${age - metabolicAge} ans de moins que votre âge réel` : `${metabolicAge - age} ans de plus que votre âge réel`}
          </p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="bg-gradient-to-br from-natural-50 to-natural-100 rounded-xl p-6 text-center">
          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-natural-200">
              <Sparkles className="w-8 h-8 text-natural-700" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-natural-900 mb-1">Niveau de Stress</h3>
          <div className="text-3xl font-bold text-natural-800 mb-1">{Math.round(neuroProfile.stressIndex)}<span className="text-xl">/100</span></div>
          <p className="text-natural-600 text-sm">
            {neuroProfile.stressIndex < 30 ? 'Niveau optimal' : neuroProfile.stressIndex < 70 ? 'Niveau modéré' : 'Niveau élevé'}
          </p>
        </motion.div>
      </motion.div>
      
      {/* Navigation par onglets */}
      <div className="flex border-b border-natural-200 mb-6">
        <button 
          onClick={() => setActiveTab('besoins')}
          className={`py-3 px-5 font-medium text-sm transition-colors duration-200 relative ${
            activeTab === 'besoins' ? 'text-natural-900' : 'text-natural-500 hover:text-natural-700'
          }`}
        >
          Besoins Principaux
          {activeTab === 'besoins' && (
            <motion.div 
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-natural-700" 
            />
          )}
        </button>
        <button 
          onClick={() => setActiveTab('recommendations')}
          className={`py-3 px-5 font-medium text-sm transition-colors duration-200 relative ${
            activeTab === 'recommendations' ? 'text-natural-900' : 'text-natural-500 hover:text-natural-700'
          }`}
        >
          Solutions Scientifiques
          {activeTab === 'recommendations' && (
            <motion.div 
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-natural-700" 
            />
          )}
        </button>
      </div>
      
      {/* Contenu des onglets */}
      <div className="mb-8">
        {activeTab === 'besoins' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-6">
              <div className="bg-natural-50 p-5 rounded-lg">
                <h3 className="text-xl font-semibold text-natural-900 mb-4">Analyse Comportementale</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-natural-700">Confiance en vos décisions: {Math.round(neuroProfile.decisionConfidence)}%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-natural-700">Cohérence des réponses: {Math.round(neuroProfile.consistencyIndex)}%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                    <span className="text-natural-700">Score d'attention: {Math.round(neuroProfile.attentionScore)}%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mr-2"></div>
                    <span className="text-natural-700">Temps moyen de réponse: {Math.round(behavioralMetrics.responseTime.reduce((a, b) => a + b, 0) / behavioralMetrics.responseTime.length)}s</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-natural-900 mb-4">Vos Besoins Principaux</h3>
                <div className="space-y-3">
                  {mainNeeds.map((need, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white border border-natural-200 rounded-lg p-4 flex items-center"
                    >
                      <div className="w-8 h-8 rounded-full bg-natural-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-natural-800 font-medium">{index + 1}</span>
                      </div>
                      <div>
                        <p className="text-natural-800 font-medium">{need}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="bg-natural-50 p-5 rounded-lg">
                <h3 className="text-xl font-semibold text-natural-900 mb-4">Profil Neurologique</h3>
                <p className="text-natural-700 mb-4">
                  <ScientificHighlightedText text="Votre profil neurologique indique une tendance à l'[[homeostasis:homéostasie]] perturbée, avec un besoin d'équilibrer les [[neurotransmitters:neurotransmetteurs]] liés au stress et à la récupération." />
                </p>
                <div className="flex justify-end">
                  <button 
                    onClick={() => setActiveTab('recommendations')} 
                    className="flex items-center text-natural-700 font-medium text-sm hover:text-natural-900 transition-colors"
                  >
                    Voir les solutions recommandées
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {activeTab === 'recommendations' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-5">
              {recommendations.map((recommendation, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white border border-natural-200 rounded-lg overflow-hidden transition-shadow duration-300 ${expandedRecommendation === index ? 'shadow-lg' : 'hover:shadow-md'}`}
                >
                  <div 
                    className="p-5 cursor-pointer"
                    onClick={() => setExpandedRecommendation(expandedRecommendation === index ? null : index)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold text-natural-900">{recommendation.title}</h3>
                      <div className="flex items-center">
                        <span className="text-xs font-medium bg-natural-100 text-natural-800 px-2 py-1 rounded-full mr-2">
                          {Math.round(recommendation.confidence * 100)}% de correspondance
                        </span>
                        <Award className={`w-5 h-5 ${recommendation.confidence > 0.85 ? 'text-amber-500' : 'text-natural-500'}`} />
                      </div>
                    </div>
                    <p className="text-natural-700 text-sm mb-3">{recommendation.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-natural-500 text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>Effet visible: {recommendation.timeToEffect}</span>
                      </div>
                      <div className="flex items-center text-natural-500 text-xs">
                        <span>Popularité: {recommendation.popularity}%</span>
                      </div>
                    </div>
                  </div>
                  
                  {expandedRecommendation === index && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 pb-5 border-t border-natural-100"
                    >
                      <div className="pt-4">
                        <h4 className="text-sm font-medium text-natural-900 mb-2">Bénéfices Scientifiquement Prouvés:</h4>
                        <ul className="space-y-2 mb-4">
                          {recommendation.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start">
                              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span className="text-natural-700 text-sm">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="text-xs bg-natural-100 text-natural-700 px-2 py-1 rounded-full">Validé scientifiquement</span>
                          <span className="text-xs bg-natural-100 text-natural-700 px-2 py-1 rounded-full">Formule naturelle</span>
                          <span className="text-xs bg-natural-100 text-natural-700 px-2 py-1 rounded-full">Sans additifs</span>
                        </div>
                        
                        <div className="flex justify-between items-center pt-2">
                          <button className="text-sm text-natural-700 hover:text-natural-900 flex items-center transition-colors">
                            <BookOpen className="w-4 h-4 mr-1" />
                            Études scientifiques
                          </button>
                          
                          <Link 
                            to={recommendation.url || "#"} 
                            className="bg-natural-800 hover:bg-natural-900 text-white py-2 px-4 rounded-lg text-sm font-medium flex items-center transition-colors"
                          >
                            En savoir plus
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Actions et partage */}
      <div className="border-t border-natural-200 pt-6 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <button
            onClick={shareResults}
            className="flex items-center text-natural-700 hover:text-natural-900 transition-colors relative"
          >
            <Share2 className="w-5 h-5 mr-1" />
            <span className="text-sm">Partager les résultats</span>
            
            {shareTooltip && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-natural-800 text-white text-xs px-2 py-1 rounded opacity-90">
                Lien copié!
              </div>
            )}
          </button>
          
          <button
            onClick={onSaveProfile}
            className="flex items-center text-natural-700 hover:text-natural-900 transition-colors"
          >
            <Download className="w-5 h-5 mr-1" />
            <span className="text-sm">Enregistrer le profil</span>
          </button>
        </div>
        
        <button
          onClick={onViewArticles}
          className="bg-natural-100 hover:bg-natural-200 text-natural-800 py-2 px-4 rounded-lg text-sm font-medium flex items-center transition-colors"
        >
          Articles recommandés
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
      
      {/* Informations complémentaires */}
      <div className="mt-8 text-center">
        <p className="text-natural-500 text-xs mb-1">
          Contenu éducatif et scientifique uniquement - Information à caractère éducatif
        </p>
        <p className="text-natural-500 text-xs">
          Les résultats sont basés sur une analyse scientifique de vos réponses et ne constituent pas un diagnostic médical.
        </p>
      </div>
    </div>
  );
};

export default QuizResults;
