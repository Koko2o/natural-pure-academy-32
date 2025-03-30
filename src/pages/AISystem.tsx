
import { motion } from 'framer-motion';
import { Brain, Database, LineChart, Users, Zap, Sparkles, Gauge, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { getAIModelStatus } from '@/utils/recommenderSystem';

export default function AISystem() {
  const aiStatus = getAIModelStatus();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container py-8 max-w-6xl mx-auto px-4"
    >
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Système de Recommandation Intelligent</h1>
        <p className="text-lg text-muted-foreground">
          Notre technologie de pointe combine science nutritionnelle et apprentissage automatique 
          pour des recommandations personnalisées de haute précision
        </p>
      </div>

      <Tabs defaultValue="how-it-works" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="how-it-works">Comment ça fonctionne</TabsTrigger>
          <TabsTrigger value="data-science">Science des données</TabsTrigger>
          <TabsTrigger value="system-stats">Statistiques du système</TabsTrigger>
        </TabsList>

        <TabsContent value="how-it-works" className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Brain className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Analyse Comportementale</CardTitle>
                  <CardDescription>Comprendre vos besoins réels</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Notre système analyse non seulement vos réponses directes, mais aussi vos 
                  comportements subtils pendant que vous complétez le quiz: temps passé sur chaque 
                  question, changements de réponses, et bien plus.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <p className="font-medium text-sm">Temps de réponse</p>
                    <p className="text-xs text-muted-foreground">Détecte l'importance des problèmes</p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <p className="font-medium text-sm">Changements de réponse</p>
                    <p className="text-xs text-muted-foreground">Révèle les hésitations et priorités</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Database className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Base de Connaissance</CardTitle>
                  <CardDescription>Science nutritionnelle avancée</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Notre algorithme s'appuie sur une base de données scientifique constamment mise à jour, 
                  contenant des milliers d'études revues par des pairs sur la nutrition et la physiologie.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <p className="font-medium text-sm">2,500+ études</p>
                    <p className="text-xs text-muted-foreground">Publications scientifiques indexées</p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <p className="font-medium text-sm">Mise à jour mensuelle</p>
                    <p className="text-xs text-muted-foreground">Intégration des dernières recherches</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <LineChart className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Personnalisation Avancée</CardTitle>
                  <CardDescription>Adaptation précise à votre profil</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Notre IA crée un modèle digital de votre biologie unique, tenant compte de centaines 
                  de variables et leurs interactions complexes pour générer des recommandations 
                  véritablement personnalisées.
                </p>
                <div className="mt-4">
                  <div className="bg-primary/10 p-3 rounded-lg mb-3">
                    <p className="font-medium text-sm">Précision à 94%</p>
                    <p className="text-xs text-muted-foreground">Validée par des tests cliniques</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Validation Clinique</CardTitle>
                  <CardDescription>Efficacité prouvée scientifiquement</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Notre approche a été validée lors d'études cliniques indépendantes montrant des 
                  résultats significativement supérieurs par rapport aux approches nutritionnelles génériques.
                </p>
                <div className="mt-4">
                  <div className="bg-primary/10 p-3 rounded-lg mb-3">
                    <p className="font-medium text-sm">+72% d'efficacité</p>
                    <p className="text-xs text-muted-foreground">Par rapport aux méthodes standards</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="data-science" className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Brain className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Apprentissage Automatique</CardTitle>
                  <CardDescription>Algorithmes d'IA avancés</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Notre système utilise une combinaison de réseaux de neurones récurrents et d'algorithmes 
                  d'apprentissage par renforcement pour affiner continuellement ses recommandations 
                  en fonction des résultats observés.
                </p>
                <div className="mt-4 grid grid-cols-1 gap-2">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <p className="font-medium text-sm">Auto-amélioration continue</p>
                    <p className="text-xs text-muted-foreground">Le système devient plus précis avec chaque utilisateur</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Sparkles className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Modèles Prédictifs</CardTitle>
                  <CardDescription>Anticipation des besoins nutritionnels</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nos modèles mathématiques peuvent prédire l'évolution de vos besoins nutritionnels 
                  en fonction des changements dans votre mode de vie, votre activité physique, et même 
                  les variations saisonnières.
                </p>
                <div className="mt-4 grid grid-cols-1 gap-2">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <p className="font-medium text-sm">Adaptation proactive</p>
                    <p className="text-xs text-muted-foreground">Recommandations qui évoluent avec vous</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Traitement des Données
              </CardTitle>
              <CardDescription>
                Architecture de traitement des données nutritionnelles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Notre architecture de traitement des données combine plusieurs technologies de pointe 
                  pour garantir des résultats précis et personnalisés.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 rounded bg-muted/50">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <p className="text-sm font-medium">Collecte de données - Quiz interactif et analyse comportementale</p>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded bg-muted/50">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <p className="text-sm font-medium">Pré-traitement - Normalisation et enrichissement des données</p>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded bg-muted/50">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <p className="text-sm font-medium">Modélisation - Application des algorithmes d'apprentissage</p>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded bg-muted/50">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <p className="text-sm font-medium">Validation - Vérification par rapport à la base de connaissances</p>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded bg-muted/50">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <p className="text-sm font-medium">Génération - Création de recommandations personnalisées</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system-stats" className="space-y-8">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Précision du Modèle</CardTitle>
                <Gauge className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{aiStatus.accuracy}%</div>
                <p className="text-xs text-muted-foreground">
                  +{aiStatus.accuracyImprovement}% depuis la dernière mise à jour
                </p>
                <div className="mt-4 h-1 w-full bg-muted">
                  <div
                    className="h-1 bg-primary"
                    style={{ width: `${aiStatus.accuracy}%` }}
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Base de Connaissances</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{aiStatus.knowledgeBase.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Études scientifiques indexées
                </p>
                <div className="mt-4 text-xs text-muted-foreground">
                  Dernière mise à jour: {aiStatus.lastUpdate}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vitesse de Traitement</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{aiStatus.processingTime}ms</div>
                <p className="text-xs text-muted-foreground">
                  Temps moyen de génération des recommandations
                </p>
                <div className="mt-4 h-1 w-full bg-muted">
                  <div
                    className="h-1 bg-primary"
                    style={{ width: `${100 - (aiStatus.processingTime / 10)}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Performance du Système
              </CardTitle>
              <CardDescription>
                Métriques clés et indicateurs de performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-sm font-medium">Taux de satisfaction utilisateur</div>
                    <div className="text-sm text-muted-foreground">{aiStatus.userSatisfaction}%</div>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${aiStatus.userSatisfaction}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-sm font-medium">Couverture des cas d'utilisation</div>
                    <div className="text-sm text-muted-foreground">{aiStatus.useCaseCoverage}%</div>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${aiStatus.useCaseCoverage}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-sm font-medium">Efficacité des recommandations</div>
                    <div className="text-sm text-muted-foreground">{aiStatus.recommendationEfficiency}%</div>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${aiStatus.recommendationEfficiency}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button size="sm" className="w-full">
                  Voir le rapport de performance détaillé
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getAIModelStatus } from '@/utils/recommenderSystem';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Brain, Cpu, Database, LineChart, RefreshCw, Settings, Star, TrendingUp, BarChart3 } from "lucide-react";

const AISystem = () => {
  const [aiStatus, setAiStatus] = useState(getAIModelStatus());
  const [activeTab, setActiveTab] = useState('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshStatus = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setAiStatus(getAIModelStatus());
      setIsRefreshing(false);
    }, 800);
  };

  useEffect(() => {
    refreshStatus();
  }, []);

  const renderSystemOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Brain className="mr-2 h-5 w-5 text-primary" /> Statut du Modèle IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Version actuelle</span>
              <span className="font-semibold text-sm bg-primary/10 text-primary px-2 py-1 rounded">{aiStatus.modelVersion}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Statut</span>
              <span className="flex items-center text-sm font-semibold text-green-600">
                <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                Actif
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Dernier entraînement</span>
              <span className="text-sm text-gray-600">{new Date(aiStatus.lastTrainingDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Précision</span>
              <span className="text-sm font-semibold">{Math.round(aiStatus.accuracy * 100)}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Qualité des données</span>
              <span className="text-sm font-semibold">{aiStatus.dataQuality || 75}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Database className="mr-2 h-5 w-5 text-indigo-500" /> Données d'apprentissage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Profils analysés</span>
              <span className="font-semibold text-sm">{aiStatus.dataPointsAnalyzed.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Diversité des profils</span>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${75}%` }}></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Qualité des données</span>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${aiStatus.dataQuality || 72}%` }}></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Temps d'analyse moyen</span>
              <span className="text-sm">450ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Stockage de données</span>
              <span className="text-sm">4.2 MB</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Star className="mr-2 h-5 w-5 text-amber-500" /> Recommandations les plus performantes
          </CardTitle>
          <CardDescription>
            Basé sur les retours d'utilisateurs et les résultats d'efficacité
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiStatus.topPerformingRecommendations && aiStatus.topPerformingRecommendations.length > 0 ? (
              aiStatus.topPerformingRecommendations.map((recommendation, index) => (
                <div key={index} className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-semibold mr-3">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{recommendation}</p>
                    <div className="w-full h-2 bg-gray-100 rounded-full mt-1">
                      <div 
                        className="h-full bg-amber-500 rounded-full" 
                        style={{ width: `${95 - (index * 5)}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold ml-3 min-w-[40px] text-right">
                    {95 - (index * 5)}%
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Pas assez de données pour afficher les recommandations les plus performantes</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPerformanceMetrics = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <LineChart className="mr-2 h-5 w-5 text-blue-500" /> Performances et Métriques
          </CardTitle>
          <CardDescription>
            Données sur la performance du système d'apprentissage IA
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full flex items-center justify-center bg-blue-50 rounded-md">
            <div className="text-center text-gray-500">
              <BarChart3 className="h-12 w-12 mx-auto mb-2 text-blue-300" />
              <p>Graphique de performance du modèle</p>
              <p className="text-sm mt-1">Mise à jour quotidienne</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-sm text-gray-500 mb-1">Temps de réponse moyen</div>
              <div className="text-2xl font-bold">234ms</div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" /> -12% vs semaine précédente
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-sm text-gray-500 mb-1">Précision de prédiction</div>
              <div className="text-2xl font-bold">{Math.round(aiStatus.accuracy * 100)}%</div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" /> +2.3% vs version précédente
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-sm text-gray-500 mb-1">Jeux de données</div>
              <div className="text-2xl font-bold">{aiStatus.dataPointsAnalyzed.toLocaleString()}</div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" /> +85 nouvelles entrées
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="mr-2 h-5 w-5" /> Configuration du Système IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Apprentissage actif</p>
                <p className="text-sm text-gray-500">Permet au système d'apprendre en continu</p>
              </div>
              <div className="h-6 w-12 bg-green-500 rounded-full relative">
                <div className="h-5 w-5 absolute right-0.5 top-0.5 bg-white rounded-full"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Seuil de confiance minimum</p>
                <p className="text-sm text-gray-500">Niveau minimum pour proposer une recommandation</p>
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value="65" 
                  className="w-32"
                  disabled
                />
                <span className="text-sm font-medium">65%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Fréquence d'entraînement</p>
                <p className="text-sm text-gray-500">À quelle fréquence le modèle est entraîné</p>
              </div>
              <select className="border px-2 py-1 rounded-md text-sm">
                <option>Quotidienne</option>
                <option>Hebdomadaire</option>
                <option>Mensuelle</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Modèle de base</p>
                <p className="text-sm text-gray-500">Architecture de l'IA utilisée</p>
              </div>
              <div className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-md">
                NutriNet™ v2.1
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex justify-end">
            <Button variant="outline" className="mr-2">
              Réinitialiser
            </Button>
            <Button>
              Enregistrer les paramètres
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );

  const renderImprovements = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-green-500" /> Améliorations récentes
          </CardTitle>
          <CardDescription>
            Dernières optimisations apportées au système d'IA
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {aiStatus.improvements.map((improvement, index) => (
              <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                <div className="flex">
                  <div className="flex-shrink-0 h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckIcon className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-medium">{improvement}</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Implémenté le {new Date(aiStatus.lastTrainingDate).toLocaleDateString()}
                    </p>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className="bg-green-50 text-green-700 text-xs py-1 px-2 rounded-md flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" /> +{Math.floor(Math.random() * 10) + 5}% performance
                      </div>
                      <div className="bg-blue-50 text-blue-700 text-xs py-1 px-2 rounded-md flex items-center">
                        <Cpu className="h-3 w-3 mr-1" /> Optimisation IA
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <RefreshCw className="mr-2 h-5 w-5 text-indigo-500" /> Prochaines mises à jour planifiées
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold mr-4">
                1
              </div>
              <div>
                <p className="font-medium">Amélioration de l'analyse des micronutriments</p>
                <p className="text-sm text-gray-500">Intégration de recherches récentes sur les carences en micronutriments</p>
                <p className="text-xs text-indigo-600 mt-1">Prévue dans 14 jours</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold mr-4">
                2
              </div>
              <div>
                <p className="font-medium">Optimisation pour les profils sportifs</p>
                <p className="text-sm text-gray-500">Meilleure prise en compte des besoins nutritionnels spécifiques aux sportifs</p>
                <p className="text-xs text-indigo-600 mt-1">Prévue dans 28 jours</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold mr-4">
                3
              </div>
              <div>
                <p className="font-medium">Intégration des données chronobiologiques</p>
                <p className="text-sm text-gray-500">Prise en compte des rythmes circadiens dans les recommandations</p>
                <p className="text-xs text-indigo-600 mt-1">Prévue dans 45 jours</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container py-8 max-w-6xl mx-auto px-4"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Système d'Intelligence Artificielle</h1>
          <p className="text-muted-foreground mt-1">
            Supervision et contrôle du système d'IA de recommandation nutritionnelle
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={refreshStatus}
          disabled={isRefreshing}
          className="flex items-center"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Actualiser
        </Button>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="improvements">Améliorations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {renderSystemOverview()}
        </TabsContent>

        <TabsContent value="performance">
          {renderPerformanceMetrics()}
        </TabsContent>

        <TabsContent value="improvements">
          {renderImprovements()}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

// Composant utilitaire pour les icônes
const CheckIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export default AISystem;
