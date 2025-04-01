import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAIModelDetailedStatus } from "@/utils/recommenderSystem";
import { motion } from "framer-motion";
import { SUPPLEMENT_CATALOG } from "@/data/supplementCatalog";

interface AILearningInsightsProps {
  quizData: any;
}

export const AILearningInsights: React.FC<AILearningInsightsProps> = ({ quizData }) => {
  const [aiStatus, setAiStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'insights'>('overview');

  useEffect(() => {
    // Fetch AI model status
    setTimeout(() => {
      try {
        const status = getAIModelDetailedStatus();
        setAiStatus(status);
      } catch (error) {
        console.error("Error fetching AI model status:", error);
      } finally {
        setIsLoading(false);
      }
    }, 800);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!aiStatus) {
    return (
      <Card className="p-6 text-center">
        <p className="text-gray-600">Informations sur le modèle d'IA non disponibles pour le moment.</p>
      </Card>
    );
  }

  const getSuppplementName = (id: string) => {
    return SUPPLEMENT_CATALOG[id]?.name || id;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Système d'Intelligence Augmentée</h3>
          <div className="text-xs px-3 py-1 bg-blue-600 text-white rounded-full">
            v{aiStatus.modelVersion}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white p-1 rounded-lg mb-6">
          {['overview', 'performance', 'insights'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab === 'overview' && 'Vue d\'ensemble'}
              {tab === 'performance' && 'Performance'}
              {tab === 'insights' && 'Insights'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500 mb-1">Précision du modèle</div>
                <div className="flex items-end">
                  <div className="text-2xl font-bold">{(aiStatus.accuracy * 100).toFixed(1)}%</div>
                  <div className="text-xs text-green-600 ml-2">+{aiStatus.accuracyImprovement}%</div>
                </div>
                <div className="w-full bg-gray-200 h-1 mt-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-600 h-1 rounded-full" 
                    style={{ width: `${(aiStatus.accuracy * 100)}%` }}
                  ></div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500 mb-1">Base de connaissances</div>
                <div className="text-2xl font-bold">{aiStatus.knowledgeBase.toLocaleString()}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {aiStatus.uniqueProfiles?.toLocaleString() || "0"} profils uniques
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500 mb-1">Qualité des données</div>
                <div className="text-2xl font-bold">{aiStatus.dataQuality || 0}%</div>
                <div className="w-full bg-gray-200 h-1 mt-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-1 rounded-full ${
                      (aiStatus.dataQuality || 0) > 80 ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${aiStatus.dataQuality || 0}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold mb-2">Améliorations du système</h4>
              <ul className="space-y-2">
                {aiStatus.improvements?.map((improvement: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-green-500 rounded-full p-1 mt-0.5 mr-2">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {activeTab === 'performance' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="text-xs text-gray-500 mb-1">Satisfaction</div>
                <div className="text-xl font-bold">{aiStatus.userSatisfaction}%</div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="text-xs text-gray-500 mb-1">Couverture</div>
                <div className="text-xl font-bold">{aiStatus.useCaseCoverage}%</div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="text-xs text-gray-500 mb-1">Efficacité</div>
                <div className="text-xl font-bold">{aiStatus.recommendationEfficiency}%</div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="text-xs text-gray-500 mb-1">Temps de réponse</div>
                <div className="text-xl font-bold">{aiStatus.processingTime}ms</div>
              </div>
            </div>

            {aiStatus.topPerformingRecommendations && aiStatus.topPerformingRecommendations.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Recommandations les plus efficaces</h4>
                <div className="overflow-hidden rounded-lg bg-white">
                  {aiStatus.topPerformingRecommendations.map((rec: any, index: number) => (
                    <div 
                      key={index} 
                      className={`flex justify-between items-center p-3 ${
                        index !== aiStatus.topPerformingRecommendations.length - 1 ? 'border-b border-gray-100' : ''
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          index === 0 ? 'bg-yellow-100 text-yellow-700' : 
                          index === 1 ? 'bg-gray-100 text-gray-700' : 
                          index === 2 ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="ml-3">
                          <div className="font-medium">{getSuppplementName(rec.id)}</div>
                          <div className="text-xs text-gray-500">{rec.totalRatings} évaluations</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="flex items-center mr-2">
                          <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="font-medium ml-1">{rec.averageRating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'insights' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Recommandations personnalisées avancées</h4>
              <p className="text-sm text-gray-600 mb-3">
                Notre système d'IA analyse votre profil en profondeur pour vous fournir des recommandations plus précises, en tenant compte de facteurs comme :
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span>Biomarqueurs spécifiques</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span>Interactions nutritionnelles</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span>Profils génétiques similaires</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span>Recherches scientifiques récentes</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Détection de tendances émergentes</h4>
              <div className="h-24 w-full mb-3 relative">
                <div className="absolute bottom-0 left-0 w-full h-full flex items-end">
                  {[0.3, 0.5, 0.7, 0.8, 0.6, 0.9, 0.75, 0.85, 0.95, 0.8, 0.7, 0.9].map((h, i) => (
                    <div 
                      key={i}
                      className="w-full bg-blue-500 mx-0.5 rounded-t-sm" 
                      style={{ height: `${h * 100}%`, opacity: 0.7 + (i * 0.02) }}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="text-xs text-gray-500 text-center">
                Analyse de {aiStatus.dataPointsAnalyzed.toLocaleString()} points de données
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Améliorations en cours</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-xs font-bold mr-2">+</div>
                  <div>
                    <span className="font-medium">Intelligence prédictive</span>
                    <p className="text-gray-600 text-xs">
                      Prédiction des besoins nutritionnels futurs basée sur les changements saisonniers
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-xs font-bold mr-2">+</div>
                  <div>
                    <span className="font-medium">Analyse multi-omique</span>
                    <p className="text-gray-600 text-xs">
                      Intégration de données génomiques, métabolomiques et microbiomiques
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>
        )}

        <div className="flex justify-between items-center text-xs text-gray-500 mt-6">
          <div>Dernière mise à jour: {new Date(aiStatus.lastTrainingDate).toLocaleDateString()}</div>
          <div>
            <span className="inline-flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
              Système actif
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};