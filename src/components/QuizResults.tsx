// src/components/QuizResults.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, Download, Share2, Heart, Award, Star, User } from 'lucide-react';
import { QuizResponse } from '@/components/quiz/types';
//import { getRecommendations } from '@/utils/recommenderSystem';  //Removed because it's not defined
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

  useEffect(() => {
    // Ajout d'un délai artificiel pour simuler l'analyse AI
    const timer = setTimeout(() => {
      //const userRecommendations = getRecommendations(responses); //Commented out because getRecommendations is not defined
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
        // Add more mock recommendations as needed...
      ];
      setRecommendations(mockRecommendations);
      setIsLoading(false);

      // Save results to secure storage
      secureStorage.setItem('lastQuizResult', {
        date: new Date().toISOString(),
        responses,
        recommendations: mockRecommendations
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [responses]);

  const handleSaveResults = () => {
    // In a real app, this would store results to backend
    setSavedResults(true);
  };

  const handleShare = () => {
    // In a real app, this would open a share dialog
    alert('Fonctionnalité de partage à venir !');
  };

  if (isLoading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center space-y-6 px-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-md w-full"
        >
          <h3 className="text-xl font-semibold mb-2">Analyse avancée en cours...</h3>
          <p className="text-gray-600 mb-6">
            Notre système examine vos réponses pour formuler des recommandations personnalisées optimales.
          </p>
          <Progress value={65} className="h-2 w-full" />
          <p className="text-sm text-gray-500 mt-2">Création de votre profil nutritionnel</p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto mb-12 px-4"
    >
      {/* Entête des résultats */}
      <div className="text-center mb-8">
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 mb-2">
          Analyse complète
        </Badge>
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Vos résultats personnalisés, {userName}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Basé sur votre profil, nous avons identifié les compléments nutritionnels 
          les plus adaptés à vos besoins spécifiques.
        </p>
      </div>

      {/* Actions principales */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <Button variant="outline" onClick={handleSaveResults} disabled={savedResults}>
          {savedResults ? "Résultats sauvegardés" : "Sauvegarder les résultats"}
        </Button>
        <Button variant="outline" onClick={handleShare}>
          <Share2 className="w-4 h-4 mr-2" /> Partager
        </Button>
        <Button>
          <Download className="w-4 h-4 mr-2" /> Télécharger en PDF
        </Button>
      </div>

      {/* Onglets de résultats */}
      <Tabs defaultValue="supplements" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger 
            value="supplements" 
            onClick={() => setActiveSection('supplements')}
            className={activeSection === 'supplements' ? 'bg-primary text-primary-foreground' : ''}
          >
            Compléments
          </TabsTrigger>
          <TabsTrigger 
            value="health-score" 
            onClick={() => setActiveSection('health-score')}
            className={activeSection === 'health-score' ? 'bg-primary text-primary-foreground' : ''}
          >
            Profil de santé
          </TabsTrigger>
          <TabsTrigger 
            value="plan" 
            onClick={() => setActiveSection('plan')}
            className={activeSection === 'plan' ? 'bg-primary text-primary-foreground' : ''}
          >
            Plan d'action
          </TabsTrigger>
        </TabsList>

        {/* Contenu de l'onglet Compléments */}
        <TabsContent value="supplements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge variant="outline" className="mb-2 bg-blue-50 text-blue-700 border-blue-200">
                          Compatibilité {item.compatibility}%
                        </Badge>
                        <CardTitle className="text-xl">{item.name}</CardTitle>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.round(item.scientificRating)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm mb-3">
                      <span className="font-semibold">Dosage recommandé:</span> {item.dosage}
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Bénéfices principaux:</p>
                      <ul className="text-sm space-y-1">
                        {item.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start">
                            <ChevronRight className="w-4 h-4 text-green-500 mt-0.5 mr-1 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <Button variant="default" className="w-full">
                        Voir le produit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Contenu de l'onglet Profil de santé */}
        <TabsContent value="health-score">
          <Card>
            <CardHeader>
              <CardTitle>Votre profil de santé</CardTitle>
              <CardDescription>
                Basé sur vos réponses, voici une évaluation de vos différents marqueurs de santé
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Équilibre nutritionnel</span>
                  <span>{67}%</span>
                </div>
                <Progress value={67} className="h-2" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Gestion du stress</span>
                  <span>{responses.stressLevel === "high" ? 40 : 75}%</span>
                </div>
                <Progress value={responses.stressLevel === "high" ? 40 : 75} className="h-2" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Qualité du sommeil</span>
                  <span>{responses.sleepQuality === "poor" ? 35 : 80}%</span>
                </div>
                <Progress value={responses.sleepQuality === "poor" ? 35 : 80} className="h-2" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Activité physique</span>
                  <span>{responses.exerciseFrequency === "never" ? 20 : 70}%</span>
                </div>
                <Progress value={responses.exerciseFrequency === "never" ? 20 : 70} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contenu de l'onglet Plan d'action */}
        <TabsContent value="plan">
          <Card>
            <CardHeader>
              <CardTitle>Plan d'action personnalisé</CardTitle>
              <CardDescription>
                Un programme sur 60 jours pour améliorer votre bien-être général
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center">
                  <span className="bg-blue-100 text-blue-800 p-1 rounded-full w-6 h-6 inline-flex items-center justify-center text-xs mr-2">1</span>
                  Semaines 1-2: Fondation
                </h4>
                <ul className="pl-8 space-y-2 text-sm">
                  <li className="list-disc">Commencer les compléments recommandés selon la posologie indiquée</li>
                  <li className="list-disc">Intégrer 2 portions supplémentaires de légumes verts par jour</li>
                  <li className="list-disc">Pratiquer 10 minutes de respiration profonde chaque matin</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold flex items-center">
                  <span className="bg-green-100 text-green-800 p-1 rounded-full w-6 h-6 inline-flex items-center justify-center text-xs mr-2">2</span>
                  Semaines 3-4: Renforcement
                </h4>
                <ul className="pl-8 space-y-2 text-sm">
                  <li className="list-disc">Maintenir la prise des compléments</li>
                  <li className="list-disc">Ajouter 20 minutes d'activité physique modérée 3x par semaine</li>
                  <li className="list-disc">Améliorer la qualité du sommeil en limitant les écrans 1h avant le coucher</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold flex items-center">
                  <span className="bg-purple-100 text-purple-800 p-1 rounded-full w-6 h-6 inline-flex items-center justify-center text-xs mr-2">3</span>
                  Semaines 5-8: Optimisation
                </h4>
                <ul className="pl-8 space-y-2 text-sm">
                  <li className="list-disc">Ajuster la posologie des compléments si nécessaire</li>
                  <li className="list-disc">Intégrer des techniques de gestion du stress plus avancées</li>
                  <li className="list-disc">Évaluer les progrès et ajuster le plan selon les résultats</li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <Button className="w-full">
                  <Award className="w-4 h-4 mr-2" /> Obtenir votre plan complet
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default QuizResults;e.getItem(key);
    return value ? JSON.parse(value) : null;
  }
};