import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Award, ArrowRight, Download, Share2 } from "lucide-react";

interface Recommendation {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  scientificBasis?: string;
}

interface ResultsData {
  score: number;
  metabolicAge?: number;
  stressLevel?: 'Low' | 'Moderate' | 'High';
  mainNeeds: string[];
  recommendations: Recommendation[];
}

interface QuizResultsProps {
  data: ResultsData;
  onSaveProfile?: () => void;
  onViewArticles?: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ 
  data, 
  onSaveProfile = () => {}, 
  onViewArticles = () => {} 
}) => {
  // Priority color mapping
  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      case 'medium': return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case 'low': return "bg-green-100 text-green-800 hover:bg-green-200";
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <Card className="border-2 border-primary/20 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Award className="h-7 w-7 text-primary" />
            Vos résultats personnalisés
          </CardTitle>
          <CardDescription>
            Basé sur l'analyse de vos réponses et comportements
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Metrics Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Vos métriques clés</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-secondary/10 rounded-lg p-3 text-center">
                  <div className="text-4xl font-bold text-primary">{data.score}</div>
                  <div className="text-sm opacity-70">Score Nutritionnel</div>
                </div>

                {data.metabolicAge && (
                  <div className="bg-secondary/10 rounded-lg p-3 text-center">
                    <div className="text-4xl font-bold text-primary">{data.metabolicAge}</div>
                    <div className="text-sm opacity-70">Âge Métabolique</div>
                  </div>
                )}

                {data.stressLevel && (
                  <div className="bg-secondary/10 rounded-lg p-3 text-center col-span-2">
                    <div className="text-xl font-bold text-primary">
                      {data.stressLevel === 'Low' && 'Faible'}
                      {data.stressLevel === 'Moderate' && 'Modéré'}
                      {data.stressLevel === 'High' && 'Élevé'}
                    </div>
                    <div className="text-sm opacity-70">Niveau de Stress</div>
                  </div>
                )}
              </div>
            </div>

            {/* Main Needs Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Vos besoins principaux</h3>
              <div className="flex flex-wrap gap-2">
                {data.mainNeeds.map((need, index) => (
                  <Badge 
                    key={index} 
                    className="px-3 py-1.5 text-sm bg-primary/20 hover:bg-primary/30"
                  >
                    {need}
                  </Badge>
                ))}
              </div>
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={onSaveProfile}
                >
                  <Download className="h-4 w-4" />
                  Enregistrer mon profil
                </Button>
              </div>
            </div>
          </div>

          {/* Recommendations Section */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Recommandations personnalisées</h3>
            <div className="space-y-4">
              {data.recommendations.map((rec, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className={`px-4 py-1 ${getPriorityColor(rec.priority)}`}>
                    {rec.priority === 'high' && 'Priorité élevée'}
                    {rec.priority === 'medium' && 'Recommandé'}
                    {rec.priority === 'low' && 'Bon à savoir'}
                  </div>
                  <CardContent className="pt-4">
                    <h4 className="text-base font-medium flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      {rec.title}
                    </h4>
                    <p className="mt-1 text-muted-foreground text-sm">{rec.description}</p>

                    {rec.scientificBasis && (
                      <div className="mt-2 text-xs bg-secondary/10 p-2 rounded">
                        <strong>Base scientifique:</strong> {rec.scientificBasis}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Actions Section */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button 
              className="flex-1 flex items-center justify-center gap-2" 
              onClick={onViewArticles}
            >
              Découvrir des articles connexes
              <ArrowRight className="h-4 w-4" />
            </Button>

            <Button 
              variant="outline" 
              className="flex-1 flex items-center justify-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              Partager mes résultats
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizResults;