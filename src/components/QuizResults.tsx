
// src/components/QuizResults.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Users as UsersIcon, Heart, Award, Star, ChevronRight, Download, Share2 } from 'lucide-react'; // Correction de l'import Users
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { QuizResponse } from '@/utils/types'; // Utilise types depuis utils
import secureStorage from '@/utils/secureStorage';

interface Recommendation {
  id: string;
  name: string;
  description: string;
  dosage: string;
  priority: number;
  compatibility: number;
  benefits: string[];
  scientificRating: number;
  imageUrl?: string;
}

interface QuizResultsProps {
  responses: QuizResponse;
  userName: string;
}

const QuizResults: React.FC<QuizResultsProps> = ({ responses, userName }) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('supplements');
  const [savedResults, setSavedResults] = useState(false);

  // Fonction pour calculer un score de santé basé sur les réponses
  const calculateHealthScore = (responses: QuizResponse) => {
    let score = 70; // Score de base
    
    // Ajustement du score en fonction des réponses (exemple simplifié)
    if (responses.wellbeing?.stressLevel === 'high') score -= 10;
    if (responses.wellbeing?.sleepQuality === 'poor') score -= 8;
    if (responses.lifestyle?.weeklyActivity === 'inactive') score -= 15;
    
    return Math.max(30, Math.min(95, score)); // Limite entre 30 et 95
  };

  useEffect(() => {
    // Ajout d'un délai artificiel pour simuler l'analyse AI
    const timer = setTimeout(() => {
      const mockRecommendations: Recommendation[] = [
        {
          id: '1',
          name: 'Omega-3',
          description: 'High-quality fish oil supplement for brain and heart health.',
          dosage: '1000mg daily',
          priority: 1,
          compatibility: 95,
          benefits: ['Improved brain function', 'Reduced inflammation', 'Heart health support'],
          scientificRating: 4.5,
          imageUrl: 'https://via.placeholder.com/60'
        },
        {
          id: '2',
          name: 'Magnesium',
          description: 'Essential mineral for stress management and muscle function.',
          dosage: '400mg daily',
          priority: 2,
          compatibility: 88,
          benefits: ['Stress reduction', 'Improved sleep', 'Muscle relaxation'],
          scientificRating: 4.2,
          imageUrl: 'https://via.placeholder.com/60'
        },
        {
          id: '3',
          name: 'Vitamin D3',
          description: 'Essential for immune function, bones, and mood regulation.',
          dosage: '2000 IU daily',
          priority: 3,
          compatibility: 92,
          benefits: ['Immune support', 'Bone health', 'Mood improvement'],
          scientificRating: 4.7,
          imageUrl: 'https://via.placeholder.com/60'
        }
      ];
      setRecommendations(mockRecommendations);
      setIsLoading(false);

      // Save results to secure storage
      try {
        secureStorage.setItem('lastQuizResult', {
          date: new Date().toISOString(),
          responses,
          recommendations: mockRecommendations
        });
      } catch (error) {
        console.error('Error saving quiz results:', error);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [responses]);

  const healthScore = calculateHealthScore(responses);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="mb-6">
            <div className="animate-pulse text-xl font-semibold mb-2">Analyse en cours...</div>
            <p className="text-muted-foreground">
              Notre algorithme analyse vos réponses et prépare vos recommandations personnalisées
            </p>
          </div>
          <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2 }}
              className="h-full bg-primary"
            />
          </div>
        </motion.div>
      </div>
    );
  }

  const handleSaveResults = () => {
    // Simuler la sauvegarde des résultats dans le compte utilisateur
    setTimeout(() => {
      setSavedResults(true);
      setTimeout(() => setSavedResults(false), 3000);
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 lg:p-6 max-w-4xl mx-auto bg-card rounded-xl shadow-lg"
    >
      <div className="grid gap-6">
        {/* Entête avec score de santé */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Résultats de votre analyse</h2>
            <p className="text-muted-foreground">
              Basés sur vos réponses du {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={handleSaveResults} variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              {savedResults ? "Enregistré" : "Enregistrer"}
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              Partager
            </Button>
          </div>
        </div>

        {/* Carte du score de santé */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Indice de bien-être</CardTitle>
              <CardDescription>
                Basé sur vos habitudes actuelles et symptômes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold">{healthScore}</span>
                  <span className="text-muted-foreground text-sm">sur 100</span>
                </div>
                <Progress value={healthScore} className="h-2" />
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {healthScore < 50 ? (
                    <Badge variant="destructive" className="justify-center">
                      À améliorer
                    </Badge>
                  ) : healthScore < 75 ? (
                    <Badge variant="outline" className="justify-center">
                      Moyen
                    </Badge>
                  ) : (
                    <Badge variant="default" className="justify-center bg-green-600">
                      Bon
                    </Badge>
                  )}
                  <Badge variant="outline" className="justify-center">
                    <UsersIcon className="h-3 w-3 mr-1" /> 
                    +65% des utilisateurs
                  </Badge>
                  <Badge variant="outline" className="justify-center">
                    <Award className="h-3 w-3 mr-1" /> 
                    Niveau {Math.floor(healthScore / 20) + 1}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Profil nutritionnel</CardTitle>
              <CardDescription>
                Votre compatibilité avec divers nutriments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recommendations.slice(0, 3).map((rec) => (
                  <div key={rec.id} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      {rec.id === '1' ? <Star className="h-4 w-4 text-amber-500" /> : <Heart className="h-4 w-4 text-primary" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-sm font-medium">
                        <span>{rec.name}</span>
                        <span>{rec.compatibility}%</span>
                      </div>
                      <Progress value={rec.compatibility} className="h-1.5" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs pour les différentes catégories de recommandations */}
        <Tabs defaultValue="supplements" className="mt-2" onValueChange={setActiveSection}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="supplements">Suppléments</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="lifestyle">Mode de vie</TabsTrigger>
          </TabsList>

          <TabsContent value="supplements" className="space-y-4">
            <div className="grid gap-4">
              {recommendations.map((rec) => (
                <Card key={rec.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {rec.imageUrl && (
                        <div className="flex-shrink-0">
                          <img
                            src={rec.imageUrl}
                            alt={rec.name}
                            className="w-15 h-15 object-cover rounded-md"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-semibold text-lg flex items-center gap-2">
                            {rec.name}
                            <Badge variant={rec.priority === 1 ? "default" : "outline"} className="text-xs">
                              {rec.priority === 1 ? "Prioritaire" : `Priorité ${rec.priority}`}
                            </Badge>
                          </h3>
                          <div className="flex items-center">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3.5 w-3.5 ${
                                    i < Math.floor(rec.scientificRating)
                                      ? "text-amber-500 fill-amber-500"
                                      : i < rec.scientificRating
                                      ? "text-amber-500 fill-amber-500 opacity-50"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground ml-1">
                              {rec.scientificRating.toFixed(1)}
                            </span>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">{rec.description}</p>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-1 mb-3">
                          <div className="text-xs">
                            <span className="font-medium">Posologie: </span>
                            <span className="text-muted-foreground">{rec.dosage}</span>
                          </div>
                          <div className="text-xs">
                            <span className="font-medium">Compatibilité: </span>
                            <span className="text-muted-foreground">{rec.compatibility}%</span>
                          </div>
                        </div>
                        <div className="mb-3">
                          <p className="text-xs font-medium mb-1">Bénéfices:</p>
                          <div className="flex flex-wrap gap-1">
                            {rec.benefits.map((benefit, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs font-normal">
                                {benefit}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs w-full justify-between mt-1"
                        >
                          Voir les détails scientifiques
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recommandations nutritionnelles</CardTitle>
                <CardDescription>
                  Basé sur votre profil et vos objectifs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Des recommandations nutritionnelles détaillées seront disponibles dans la prochaine mise à jour.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lifestyle" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Conseils de mode de vie</CardTitle>
                <CardDescription>
                  Pour optimiser votre bien-être global
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Des conseils détaillés sur le mode de vie seront disponibles dans la prochaine mise à jour.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default QuizResults;
