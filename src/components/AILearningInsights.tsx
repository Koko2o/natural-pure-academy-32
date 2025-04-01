import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAIModelDetailedStatus } from "@/utils/recommenderSystem";

interface AILearningInsightsProps {
  quizData: any;
}

export const AILearningInsights: React.FC<AILearningInsightsProps> = ({ quizData }) => {
  const [aiStatus, setAiStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching AI model status
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

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
      <h3 className="text-xl font-semibold mb-4">Insights du Système d'Intelligence Artificielle</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Précision du modèle</div>
          <div className="text-2xl font-bold">{(aiStatus.accuracy * 100).toFixed(1)}%</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Points de données</div>
          <div className="text-2xl font-bold">{aiStatus.dataPointsAnalyzed.toLocaleString()}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Profils uniques</div>
          <div className="text-2xl font-bold">{aiStatus.uniqueProfiles?.toLocaleString() || "N/A"}</div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold mb-2">Améliorations récentes</h4>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          {aiStatus.improvements?.map((improvement: string, index: number) => (
            <li key={index}>{improvement}</li>
          ))}
        </ul>
      </div>

      {aiStatus.topPerformingRecommendations && aiStatus.topPerformingRecommendations.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Recommandations les plus efficaces</h4>
          <div className="space-y-2">
            {aiStatus.topPerformingRecommendations.map((rec: any, index: number) => (
              <div key={index} className="flex justify-between items-center text-sm bg-white p-2 rounded">
                <span>{rec.id}</span>
                <span className="font-medium">{rec.averageRating.toFixed(1)}/5</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
        <div>Version {aiStatus.modelVersion}</div>
        <div>Dernière mise à jour: {new Date(aiStatus.lastTrainingDate).toLocaleDateString()}</div>
      </div>
    </Card>
  );
};