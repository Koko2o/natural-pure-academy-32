
import React from 'react';
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
                    <p className="font-medium text-sm">Motifs d'hésitation</p>
                    <p className="text-xs text-muted-foreground">Révèle les zones de préoccupation</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Database className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Base de données scientifique</CardTitle>
                  <CardDescription>Validée par la recherche</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nos recommandations s'appuient sur une vaste base de données d'études cliniques, 
                  méta-analyses et recherches récentes en nutrition et micronutrition, mise à jour 
                  régulièrement.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <p className="font-medium text-sm">+500 études</p>
                    <p className="text-xs text-muted-foreground">Intégrées dans notre algorithme</p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <p className="font-medium text-sm">Mise à jour mensuelle</p>
                    <p className="text-xs text-muted-foreground">Dernières découvertes scientifiques</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Zap className="h-6 w-6 text-amber-500" />
                <CardTitle className="text-base">Apprentissage Continu</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Notre algorithme s'améliore avec chaque utilisateur, apprenant des retours pour 
                  affiner ses recommandations futures et identifier de nouvelles corrélations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Sparkles className="h-6 w-6 text-blue-500" />
                <CardTitle className="text-base">Personnalisation Avancée</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Adaptation précise à vos besoins particuliers, prenant en compte +50 variables 
                  comme votre âge, régime alimentaire, symptômes et objectifs de bien-être.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Gauge className="h-6 w-6 text-green-500" />
                <CardTitle className="text-base">Évaluation d'efficacité</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Chaque recommandation inclut un niveau de confiance basé sur la correspondance 
                  avec votre profil et les résultats obtenus chez des utilisateurs similaires.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="data-science" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notre approche scientifique</CardTitle>
              <CardDescription>
                Un système hybride combinant règles d'experts et apprentissage automatique
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg bg-muted/50 p-6">
                <h3 className="text-lg font-semibold mb-3">Architecture du système</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="font-medium">Couche d'entrée</div>
                    <div className="text-muted-foreground">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Réponses au questionnaire</li>
                        <li>Métriques comportementales</li>
                        <li>Données de session</li>
                        <li>Métadonnées contextuelles</li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium">Couche de traitement</div>
                    <div className="text-muted-foreground">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Système basé sur des règles</li>
                        <li>Algorithmes de correspondance</li>
                        <li>Modèle d'apprentissage supervisé</li>
                        <li>Analyse des tendances</li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium">Couche de sortie</div>
                    <div className="text-muted-foreground">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Recommandations classées</li>
                        <li>Métriques de confiance</li>
                        <li>Explication personnalisée</li>
                        <li>Plan d'action adapté</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Processus d'apprentissage</h3>
                <ol className="relative border-l border-muted-foreground/20 pl-6 space-y-4">
                  <li className="mb-6">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-1.5 border border-background"></div>
                    <h4 className="font-medium">Collecte et organisation des données</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Chaque interaction enrichit notre base de données en préservant l'anonymat
                    </p>
                  </li>
                  <li className="mb-6">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-1.5 border border-background"></div>
                    <h4 className="font-medium">Analyse des retours et résultats</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Évaluation de l'efficacité des recommandations grâce aux feedbacks
                    </p>
                  </li>
                  <li className="mb-6">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-1.5 border border-background"></div>
                    <h4 className="font-medium">Identification des facteurs clés</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Découverte des variables ayant le plus d'impact sur les résultats positifs
                    </p>
                  </li>
                  <li>
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-1.5 border border-background"></div>
                    <h4 className="font-medium">Réajustement du modèle</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Amélioration continue des algorithmes pour des recommandations plus précises
                    </p>
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system-stats" className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Précision du modèle</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.round(aiStatus.accuracy * 100)}%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Basée sur {aiStatus.feedbackCount} retours utilisateurs
                </p>
                <div className="mt-4">
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${Math.round(aiStatus.accuracy * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Taux d'amélioration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {aiStatus.improvementRate > 0 ? '+' : ''}{aiStatus.improvementRate.toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Depuis la dernière mise à jour
                </p>
                <div className="mt-4 text-xs text-muted-foreground">
                  Dernière mise à jour: {new Date(aiStatus.lastTraining).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Facteurs d'influence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiStatus.topFeatures.map((feature, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-xs capitalize">{feature.name.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="text-xs">{Math.round(feature.importance * 100)}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: `${Math.round(feature.importance * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Population analysée
              </CardTitle>
              <CardDescription>
                Données anonymisées agrégées des utilisateurs du système
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full flex items-center justify-center bg-muted/30 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-10 w-10 mx-auto text-muted-foreground/50" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Visualisation des données démographiques et des tendances
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-12 text-center">
        <p className="mb-4 text-muted-foreground">
          Consultez l'évolution de notre système d'apprentissage et découvrez comment les données améliorent nos recommandations
        </p>
        <Button onClick={() => window.location.href = '/ai-learning'} className="bg-primary/10 text-primary hover:bg-primary/20">
          <Brain className="mr-2 h-4 w-4" />
          Voir le tableau de bord d'apprentissage
        </Button>
      </div>
    </motion.div>
  );
}
