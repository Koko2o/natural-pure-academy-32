
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Database, LineChart, Users, Zap, Sparkles, Gauge, BarChart3, ArrowRight, BookOpen, Network, FileText, PieChart, Lightbulb, RefreshCcw, UserPlus, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAILearningStatus, evaluateDataQuality } from '@/utils/aiLearningEngine';

export default function AILearningDashboard() {
  const [learningStatus, setLearningStatus] = useState<any>(null);
  const [dataQualityMetrics, setDataQualityMetrics] = useState<any>(null);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement de données
    const loadData = async () => {
      setIsLoading(true);
      
      // Récupérer les données du statut d'apprentissage de l'IA
      const status = getAILearningStatus();
      
      // Simuler des données de qualité
      const mockUserData = {
        healthConcerns: { stressLevel: 'high', sleepQuality: 'poor' },
        demographics: { age: 35, gender: 'F' },
        goals: { reduceStress: true, improveSleep: true },
        behavioralMetrics: {
          questionTimes: { q_stress_level: 25, q_sleep_quality: 18 },
          totalTime: 240
        }
      };
      
      const qualityMetrics = evaluateDataQuality(mockUserData);
      
      // Attendre un peu pour simuler le chargement
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setLearningStatus(status);
      setDataQualityMetrics(qualityMetrics);
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  // Données simulées pour les graphiques
  const modelPerformanceData = [
    { month: "Jan", accuracy: 78 },
    { month: "Fév", accuracy: 80 },
    { month: "Mar", accuracy: 83 },
    { month: "Avr", accuracy: 85 },
    { month: "Mai", accuracy: 88 },
    { month: "Juin", accuracy: 90 }
  ];
  
  // Récentes recommandations personnalisées
  const recentRecommendations = [
    {
      profileType: "Stress hyperréactif & sommeil perturbé",
      topRecommendations: ["Magnésium bisglycinate", "Ashwagandha", "L-théanine"],
      matchScore: 92,
      date: "2023-11-15"
    },
    {
      profileType: "Fatigue cognitive & inflammation modérée",
      topRecommendations: ["Rhodiola rosea", "Omega-3", "Curcumine"],
      matchScore: 88,
      date: "2023-11-14"
    },
    {
      profileType: "Anxiété sociale & tension musculaire",
      topRecommendations: ["Ashwagandha", "Magnésium", "GABA"],
      matchScore: 85,
      date: "2023-11-12"
    }
  ];
  
  // Simuler des métriques d'efficacité de recommandation
  const recommendationMetrics = {
    efficacité: 87,
    satisfaction: 92,
    adhérence: 76,
    résultats: 82,
    personnalisation: 94
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container py-8 max-w-7xl mx-auto px-4"
    >
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline" className="text-xs">IA AVANCÉE</Badge>
          <Badge variant="outline" className="text-xs">ANALYSE DE DONNÉES</Badge>
          <Badge variant="outline" className="text-xs">PERSONNALISATION</Badge>
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Système d'Apprentissage IA
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-3xl">
          Notre moteur d'IA améliore continuellement ses recommandations grâce à l'analyse 
          comportementale et à l'apprentissage automatique pour une personnalisation optimale.
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-[400px]">
          <Brain className="h-12 w-12 text-primary animate-pulse mb-4" />
          <p className="text-muted-foreground">Chargement des données d'apprentissage...</p>
        </div>
      ) : (
        <>
          {/* Métriques principales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Précision du modèle</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold">{learningStatus?.modelAccuracy}%</span>
                  <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">+2.3%</Badge>
                </div>
                <Progress className="h-1.5 mt-4" value={learningStatus?.modelAccuracy} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Points de données</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold">{learningStatus?.dataPoints.toLocaleString()}</span>
                  <Badge variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-100">+215</Badge>
                </div>
                <div className="text-xs text-muted-foreground mt-4">
                  Dernière mise à jour: {learningStatus?.lastTrainingDate}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Taux de satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold">{recommendationMetrics.satisfaction}%</span>
                  <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">+3.8%</Badge>
                </div>
                <Progress className="h-1.5 mt-4" value={recommendationMetrics.satisfaction} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Personnalisation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold">{recommendationMetrics.personnalisation}%</span>
                  <Badge variant="default" className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100">+1.5%</Badge>
                </div>
                <Progress className="h-1.5 mt-4" value={recommendationMetrics.personnalisation} />
              </CardContent>
            </Card>
          </div>
          
          {/* Navigation par onglets */}
          <Tabs defaultValue="overview" className="space-y-8" onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="neuroprofiles">Profils neurobiologiques</TabsTrigger>
              <TabsTrigger value="behavioral">Analyse comportementale</TabsTrigger>
              <TabsTrigger value="recommendations">Recommandations</TabsTrigger>
            </TabsList>
            
            {/* Onglet: Vue d'ensemble */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Performance du modèle</CardTitle>
                      <LineChart className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <CardDescription>Évolution de la précision du modèle sur 6 mois</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[240px] relative">
                      {/* Simuler un graphique */}
                      <div className="absolute inset-0 flex items-end justify-between px-2">
                        {modelPerformanceData.map((item, index) => (
                          <div key={index} className="flex flex-col items-center">
                            <div 
                              className="bg-primary/80 w-10 rounded-t-sm"
                              style={{ height: `${item.accuracy * 2}px` }}
                            ></div>
                            <span className="text-xs text-muted-foreground mt-2">{item.month}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Caractéristiques principales</CardTitle>
                      <Brain className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <CardDescription>Facteurs les plus importants dans le modèle</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {learningStatus?.topFeatures.map((feature: string, index: number) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium capitalize">
                              {feature.replace(/_/g, ' ')}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {100 - index * 5}%
                            </span>
                          </div>
                          <Progress value={100 - index * 5} className="h-1.5" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Améliorations récentes</CardTitle>
                    <Zap className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardDescription>Dernières optimisations du modèle d'IA</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {learningStatus?.recentImprovements.map((improvement: string, index: number) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="bg-primary/10 h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircleIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{improvement}</h3>
                          <p className="text-sm text-muted-foreground">
                            Implémenté le {new Date(new Date().getTime() - (index * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm text-muted-foreground">
                        Apprentissage adaptatif
                      </CardTitle>
                      <RefreshCcw className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center pt-2 pb-4">
                      <div className="relative h-24 w-24">
                        <CircleProgress value={95} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Sparkles className="h-8 w-8 text-amber-500" />
                        </div>
                      </div>
                      <span className="mt-4 font-medium">Actif</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm text-muted-foreground">
                        Nouveaux profils détectés
                      </CardTitle>
                      <UserPlus className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center pt-2 pb-4">
                      <span className="text-4xl font-bold">+7</span>
                      <p className="text-xs text-muted-foreground mt-2">
                        Nouveaux clusters de profils ce mois
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm text-muted-foreground">
                        Génération du modèle
                      </CardTitle>
                      <Network className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center pt-2 pb-4">
                      <span className="text-4xl font-bold">{learningStatus?.currentGeneration}</span>
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Stable
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Onglet: Profils neurobiologiques */}
            <TabsContent value="neuroprofiles" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Clustering des profils</CardTitle>
                      <Users className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <CardDescription>Segments neurobiologiques identifiés par l'IA</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative h-[350px] bg-muted/20 rounded-md overflow-hidden">
                      {/* Simulation simplifiée d'un graphe de clustering */}
                      <div className="absolute inset-0">
                        <div className="absolute h-24 w-24 rounded-full bg-blue-100 opacity-70 left-[15%] top-[20%]"></div>
                        <div className="absolute h-28 w-28 rounded-full bg-indigo-100 opacity-70 left-[45%] top-[30%]"></div>
                        <div className="absolute h-20 w-20 rounded-full bg-amber-100 opacity-70 left-[70%] top-[15%]"></div>
                        <div className="absolute h-32 w-32 rounded-full bg-green-100 opacity-70 left-[30%] top-[60%]"></div>
                        <div className="absolute h-16 w-16 rounded-full bg-red-100 opacity-70 left-[65%] top-[65%]"></div>
                        
                        {/* Étiquettes */}
                        <div className="absolute left-[15%] top-[20%] transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium">
                          Stress hyperréactif
                        </div>
                        <div className="absolute left-[45%] top-[30%] transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium">
                          Fatigue cognitive
                        </div>
                        <div className="absolute left-[70%] top-[15%] transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium">
                          Déficit d'attention
                        </div>
                        <div className="absolute left-[30%] top-[60%] transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium">
                          Tension chronique
                        </div>
                        <div className="absolute left-[65%] top-[65%] transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium">
                          Perturbation du sommeil
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Distribution des profils</CardTitle>
                      <PieChart className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <CardDescription>Répartition des types neurobiologiques</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                            <span className="text-sm">Stress hyperréactif</span>
                          </div>
                          <span className="text-sm font-medium">38%</span>
                        </div>
                        <Progress value={38} className="h-1.5" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-indigo-500"></div>
                            <span className="text-sm">Fatigue cognitive</span>
                          </div>
                          <span className="text-sm font-medium">24%</span>
                        </div>
                        <Progress value={24} className="h-1.5" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                            <span className="text-sm">Déficit d'attention</span>
                          </div>
                          <span className="text-sm font-medium">16%</span>
                        </div>
                        <Progress value={16} className="h-1.5" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            <span className="text-sm">Tension chronique</span>
                          </div>
                          <span className="text-sm font-medium">14%</span>
                        </div>
                        <Progress value={14} className="h-1.5" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-red-500"></div>
                            <span className="text-sm">Perturbation du sommeil</span>
                          </div>
                          <span className="text-sm font-medium">8%</span>
                        </div>
                        <Progress value={8} className="h-1.5" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Marqueurs neurobiologiques clés</CardTitle>
                    <Brain className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardDescription>Indicateurs utilisés dans l'analyse des profils</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Marqueur</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Impact</TableHead>
                        <TableHead>Précision</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Réactivité au cortisol</TableCell>
                        <TableCell>Sensibilité à l'hormone du stress</TableCell>
                        <TableCell>Très élevé</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">94%</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Architecture du sommeil</TableCell>
                        <TableCell>Cycles et qualité du sommeil</TableCell>
                        <TableCell>Élevé</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">91%</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Réserve cognitive</TableCell>
                        <TableCell>Capacité à gérer la charge cognitive</TableCell>
                        <TableCell>Modéré</TableCell>
                        <TableCell>
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">87%</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Balance inflammatoire</TableCell>
                        <TableCell>Niveau d'inflammation neurologique</TableCell>
                        <TableCell>Élevé</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">90%</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Neurotransmetteurs</TableCell>
                        <TableCell>Équilibre des messagers chimiques</TableCell>
                        <TableCell>Très élevé</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">93%</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Onglet: Analyse comportementale */}
            <TabsContent value="behavioral" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Métriques comportementales</CardTitle>
                      <Gauge className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <CardDescription>Indices de comportement utilisateur pendant le quiz</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6 pt-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Temps de réflexion</span>
                          <span className="text-sm font-medium">28s / question</span>
                        </div>
                        <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                          <div className="bg-primary h-full rounded-full" style={{ width: '65%' }}></div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Les utilisateurs passent en moyenne 28 secondes par question liée au stress
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Changements de réponse</span>
                          <span className="text-sm font-medium">2.4 / utilisateur</span>
                        </div>
                        <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                          <div className="bg-primary h-full rounded-full" style={{ width: '48%' }}></div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Les utilisateurs changent leurs réponses 2.4 fois en moyenne
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Temps total de complétion</span>
                          <span className="text-sm font-medium">4m 12s</span>
                        </div>
                        <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                          <div className="bg-primary h-full rounded-full" style={{ width: '82%' }}></div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Durée moyenne pour compléter l'ensemble du questionnaire
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Engagement</span>
                          <span className="text-sm font-medium">87%</span>
                        </div>
                        <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                          <div className="bg-primary h-full rounded-full" style={{ width: '87%' }}></div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Niveau d'attention et d'investissement dans le processus
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Points d'hésitation notables</CardTitle>
                      <Lightbulb className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <CardDescription>Questions générant le plus d'incertitude</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 pt-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">Stress</Badge>
                          <span className="text-xs text-muted-foreground">Hésitation élevée</span>
                        </div>
                        <p className="text-sm font-medium mb-2">
                          "Comment décririez-vous votre niveau de stress quotidien ?"
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                          <span className="text-xs text-muted-foreground">Temps moyen: 47s (198% de la moyenne)</span>
                        </div>
                        <div className="mt-3 text-xs text-muted-foreground">
                          Insight: Les utilisateurs ont du mal à auto-évaluer objectivement leur niveau de stress
                        </div>
                      </div>
                      
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">Médicaments</Badge>
                          <span className="text-xs text-muted-foreground">Changements fréquents</span>
                        </div>
                        <p className="text-sm font-medium mb-2">
                          "Prenez-vous actuellement des médicaments sur ordonnance ?"
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-red-500"></div>
                          <span className="text-xs text-muted-foreground">3.7 changements en moyenne</span>
                        </div>
                        <div className="mt-3 text-xs text-muted-foreground">
                          Insight: Inquiétude possible sur la confidentialité ou les interactions avec les recommandations
                        </div>
                      </div>
                      
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">Habitudes</Badge>
                          <span className="text-xs text-muted-foreground">Abandons fréquents</span>
                        </div>
                        <p className="text-sm font-medium mb-2">
                          "Combien d'heures dormez-vous en moyenne par nuit ?"
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                          <span className="text-xs text-muted-foreground">Taux d'abandon: 12%</span>
                        </div>
                        <div className="mt-3 text-xs text-muted-foreground">
                          Insight: Les utilisateurs peuvent ne pas suivre précisément leurs habitudes de sommeil
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Intelligence comportementale</CardTitle>
                    <Brain className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardDescription>Comment le comportement influence les recommandations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex-1 space-y-3">
                        <h3 className="text-lg font-medium">Insights comportementaux</h3>
                        <div className="space-y-4">
                          <div className="flex gap-3 items-start">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Users className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Biais d'auto-évaluation</p>
                              <p className="text-xs text-muted-foreground">
                                Les utilisateurs sous-estiment généralement leur niveau de stress de 20-35% par rapport aux mesures objectives
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex gap-3 items-start">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Gauge className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Signaux non-verbaux</p>
                              <p className="text-xs text-muted-foreground">
                                Le temps passé sur les questions critiques indique souvent la sévérité réelle du problème mieux que la réponse elle-même
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex gap-3 items-start">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Lightbulb className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Consistance des réponses</p>
                              <p className="text-xs text-muted-foreground">
                                Des réponses incohérentes aux questions liées signalent souvent des problèmes sous-jacents complexes
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <h3 className="text-lg font-medium">Application aux recommandations</h3>
                        <div className="space-y-4">
                          <div className="flex gap-3 items-start">
                            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                              <span className="font-medium text-green-700">1</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Ajustement de précision</p>
                              <p className="text-xs text-muted-foreground">
                                Le modèle ajuste automatiquement la sévérité estimée des symptômes en fonction des signaux comportementaux
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex gap-3 items-start">
                            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                              <span className="font-medium text-green-700">2</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Détection de préoccupations non-exprimées</p>
                              <p className="text-xs text-muted-foreground">
                                L'IA identifie les préoccupations potentielles que l'utilisateur n'a pas explicitement mentionnées
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex gap-3 items-start">
                            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                              <span className="font-medium text-green-700">3</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Personnalisation de la communication</p>
                              <p className="text-xs text-muted-foreground">
                                Les explications des recommandations sont adaptées au niveau de connaissance détecté
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Onglet: Recommandations */}
            <TabsContent value="recommendations" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Précision</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="relative h-20 w-20">
                        <CircleProgress value={recommendationMetrics.efficacité} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xl font-bold">{recommendationMetrics.efficacité}%</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center text-xs">
                          <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></div>
                          <span>Élevée: 82%</span>
                        </div>
                        <div className="flex items-center text-xs">
                          <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mr-1.5"></div>
                          <span>Moyenne: 15%</span>
                        </div>
                        <div className="flex items-center text-xs">
                          <div className="h-1.5 w-1.5 rounded-full bg-red-500 mr-1.5"></div>
                          <span>Faible: 3%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Pertinence</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="relative h-20 w-20">
                        <CircleProgress value={recommendationMetrics.satisfaction} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xl font-bold">{recommendationMetrics.satisfaction}%</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center text-xs">
                          <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></div>
                          <span>Très pertinent: 87%</span>
                        </div>
                        <div className="flex items-center text-xs">
                          <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mr-1.5"></div>
                          <span>Pertinent: 10%</span>
                        </div>
                        <div className="flex items-center text-xs">
                          <div className="h-1.5 w-1.5 rounded-full bg-red-500 mr-1.5"></div>
                          <span>Non pertinent: 3%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Adhérence</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="relative h-20 w-20">
                        <CircleProgress value={recommendationMetrics.adhérence} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xl font-bold">{recommendationMetrics.adhérence}%</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center text-xs">
                          <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></div>
                          <span>Complète: 68%</span>
                        </div>
                        <div className="flex items-center text-xs">
                          <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mr-1.5"></div>
                          <span>Partielle: 25%</span>
                        </div>
                        <div className="flex items-center text-xs">
                          <div className="h-1.5 w-1.5 rounded-full bg-red-500 mr-1.5"></div>
                          <span>Nulle: 7%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Résultats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="relative h-20 w-20">
                        <CircleProgress value={recommendationMetrics.résultats} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xl font-bold">{recommendationMetrics.résultats}%</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center text-xs">
                          <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></div>
                          <span>Excellents: 62%</span>
                        </div>
                        <div className="flex items-center text-xs">
                          <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mr-1.5"></div>
                          <span>Notables: 28%</span>
                        </div>
                        <div className="flex items-center text-xs">
                          <div className="h-1.5 w-1.5 rounded-full bg-red-500 mr-1.5"></div>
                          <span>Minimes: 10%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recommandations récentes</CardTitle>
                    <Award className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardDescription>Recommandations personnalisées générées récemment</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type de profil</TableHead>
                        <TableHead>Recommandations</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentRecommendations.map((rec, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{rec.profileType}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {rec.topRecommendations.map((item, i) => (
                                <Badge key={i} variant="outline" className="bg-muted">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={
                              rec.matchScore > 90 ? "bg-green-100 text-green-800" : 
                              rec.matchScore > 80 ? "bg-amber-100 text-amber-800" : 
                              "bg-red-100 text-red-800"
                            }>
                              {rec.matchScore}%
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {rec.date}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Facteurs d'efficacité des recommandations</CardTitle>
                      <BarChart3 className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <CardDescription>Variables influençant l'impact des recommandations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Personnalisation biologique</span>
                          <span>95%</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div className="bg-primary h-full rounded-full" style={{ width: '95%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Précision du dosage</span>
                          <span>88%</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div className="bg-primary h-full rounded-full" style={{ width: '88%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Clarté des explications</span>
                          <span>86%</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div className="bg-primary h-full rounded-full" style={{ width: '86%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Synergie des compléments</span>
                          <span>82%</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div className="bg-primary h-full rounded-full" style={{ width: '82%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Base scientifique</span>
                          <span>94%</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div className="bg-primary h-full rounded-full" style={{ width: '94%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Qualité des ingrédients</span>
                          <span>91%</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div className="bg-primary h-full rounded-full" style={{ width: '91%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Témoignages utilisateurs</CardTitle>
                      <Users className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <CardDescription>Retours sur l'efficacité des recommandations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <span className="font-medium text-green-700">M</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Mathieu, 42 ans</p>
                            <div className="flex items-center">
                              <span className="text-xs text-muted-foreground">Stress hyperréactif</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm">
                          "Les recommandations ciblaient précisément mes problèmes de stress. Après 3 semaines avec le magnésium et l'ashwagandha, je sens une réelle différence."
                        </p>
                      </div>
                      
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <span className="font-medium text-green-700">S</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Sophie, 35 ans</p>
                            <div className="flex items-center">
                              <span className="text-xs text-muted-foreground">Fatigue cognitive</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm">
                          "J'étais sceptique au début, mais les explications scientifiques m'ont convaincue. La rhodiola a transformé mon niveau d'énergie."
                        </p>
                      </div>
                      
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <span className="font-medium text-green-700">T</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Thomas, 28 ans</p>
                            <div className="flex items-center">
                              <span className="text-xs text-muted-foreground">Troubles du sommeil</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm">
                          "Le fait que les recommandations étaient basées sur mes réponses spécifiques a fait toute la différence. Mon sommeil s'est amélioré dès la première semaine."
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Documentation et ressources */}
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6">Documentation & Ressources</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <BookOpen className="h-8 w-8 text-muted-foreground mb-4" />
                  <h4 className="font-semibold mb-2">Guide technique</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Documentation détaillée sur l'architecture et le fonctionnement du système d'IA
                  </p>
                  <div className="flex items-center text-sm text-primary">
                    <span>Consulter la documentation</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <FileText className="h-8 w-8 text-muted-foreground mb-4" />
                  <h4 className="font-semibold mb-2">Études de cas</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Exemples d'optimisations de recommandations basées sur les données comportementales
                  </p>
                  <div className="flex items-center text-sm text-primary">
                    <span>Voir les études de cas</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <Brain className="h-8 w-8 text-muted-foreground mb-4" />
                  <h4 className="font-semibold mb-2">Publications scientifiques</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Recherches et articles sur notre approche de personnalisation neurobiologique
                  </p>
                  <div className="flex items-center text-sm text-primary">
                    <span>Explorer les publications</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}

// Composants utilitaires pour le dashboard
const CheckCircleIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
};

// Composant de cercle de progression
const CircleProgress = ({ value }: { value: number }) => {
  const circumference = 2 * Math.PI * 9;
  const progressOffset = circumference - (value / 100) * circumference;
  
  return (
    <svg className="h-full w-full" viewBox="0 0 20 20">
      <circle
        className="text-muted stroke-current"
        strokeWidth="2"
        fill="transparent"
        r="9"
        cx="10"
        cy="10"
      />
      <circle
        className="text-primary stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
        fill="transparent"
        r="9"
        cx="10"
        cy="10"
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: progressOffset,
          transformOrigin: "50% 50%",
          transform: "rotate(-90deg)",
        }}
      />
    </svg>
  );
};
