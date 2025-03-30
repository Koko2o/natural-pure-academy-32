
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
