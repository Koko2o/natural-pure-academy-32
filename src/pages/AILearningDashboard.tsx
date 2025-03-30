
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Brain, LineChart, BarChart, Users, Sparkle, TrendingUp, BookOpen } from 'lucide-react';
import { getBasicLearningStats } from '@/utils/aiLearning';

export default function AILearningDashboard() {
  const [learningStats, setLearningStats] = useState({
    totalEntries: 0,
    recommendationEffectiveness: 0,
    averagePurchaseIntent: 0,
    mostCommonSymptoms: [] as { symptom: string; count: number }[]
  });

  useEffect(() => {
    // Charger les statistiques
    const stats = getBasicLearningStats();
    setLearningStats(stats);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container py-8 max-w-6xl mx-auto px-4"
    >
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Tableau de Bord d'Apprentissage IA</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Suivez l'évolution de notre système de recommandation et découvrez comment l'intelligence artificielle s'améliore avec chaque interaction
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-xl">
              <Brain className="mr-2 h-5 w-5 text-primary" />
              Données d'apprentissage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{learningStats.totalEntries}</div>
            <p className="text-sm text-muted-foreground">Interactions collectées</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-xl">
              <TrendingUp className="mr-2 h-5 w-5 text-primary" />
              Efficacité
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {learningStats.recommendationEffectiveness.toFixed(1)}%
            </div>
            <p className="text-sm text-muted-foreground">Taux de pertinence des recommandations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-xl">
              <Sparkle className="mr-2 h-5 w-5 text-primary" />
              Intérêt d'achat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {learningStats.averagePurchaseIntent.toFixed(1)}/10
            </div>
            <p className="text-sm text-muted-foreground">Score moyen d'intention d'achat</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Symptômes les plus fréquents</CardTitle>
            <CardDescription>
              Problèmes de santé les plus souvent signalés par les utilisateurs
            </CardDescription>
          </CardHeader>
          <CardContent>
            {learningStats.mostCommonSymptoms.length > 0 ? (
              <div className="space-y-2">
                {learningStats.mostCommonSymptoms.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{item.symptom}</span>
                    <Badge variant="outline">{item.count} utilisateurs</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-6 text-muted-foreground">
                Pas encore assez de données
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Comment fonctionne notre IA</CardTitle>
            <CardDescription>
              Processus d'apprentissage et d'amélioration continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="bg-primary/10 rounded-full p-2 h-8 w-8 flex items-center justify-center">
                  1
                </div>
                <div>
                  <p className="font-medium">Collecte de données</p>
                  <p className="text-sm text-muted-foreground">
                    Chaque interaction et feedback est anonymement enregistré
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="bg-primary/10 rounded-full p-2 h-8 w-8 flex items-center justify-center">
                  2
                </div>
                <div>
                  <p className="font-medium">Analyse des patterns</p>
                  <p className="text-sm text-muted-foreground">
                    Notre algorithme identifie les corrélations entre profils et solutions efficaces
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="bg-primary/10 rounded-full p-2 h-8 w-8 flex items-center justify-center">
                  3
                </div>
                <div>
                  <p className="font-medium">Amélioration continue</p>
                  <p className="text-sm text-muted-foreground">
                    Les recommandations s'affinent automatiquement basées sur les résultats réels
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="basic">Apprentissage de base</TabsTrigger>
          <TabsTrigger value="advanced">Fonctionnement avancé</TabsTrigger>
          <TabsTrigger value="future">Perspectives futures</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="p-4 border rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Principes fondamentaux</h3>
          <p className="mb-4">
            Notre système d'apprentissage commence par établir des corrélations simples entre les profils utilisateurs et l'efficacité des recommandations. Les étapes clés sont:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Collection des réponses au quiz et du feedback sur les recommandations</li>
            <li>Identification des patterns entre symptômes et solutions efficaces</li>
            <li>Ajustement des coefficients de confiance pour chaque recommandation</li>
            <li>Amélioration progressive de la précision des suggestions</li>
          </ul>
          <p>
            Cette approche permet au système de s'améliorer même avec un nombre limité de données, en privilégiant les solutions qui ont démontré leur efficacité auprès d'utilisateurs similaires.
          </p>
        </TabsContent>
        
        <TabsContent value="advanced" className="p-4 border rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Modèles avancés d'apprentissage</h3>
          <p className="mb-4">
            À mesure que notre base de données s'enrichit, nous intégrons des techniques plus sophistiquées:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Analyse multifactorielle prenant en compte l'âge, le mode de vie, et les préférences alimentaires</li>
            <li>Segmentation des utilisateurs en clusters pour des recommandations plus personnalisées</li>
            <li>Apprentissage par renforcement pour optimiser les résultats à long terme</li>
            <li>Modèles prédictifs anticipant les besoins futurs en nutriments</li>
          </ul>
          <p>
            Ces méthodes permettent de dépasser la simple correspondance symptôme-solution pour créer un véritable système de santé préventive personnalisée.
          </p>
        </TabsContent>
        
        <TabsContent value="future" className="p-4 border rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Vision pour l'avenir</h3>
          <p className="mb-4">
            Notre feuille de route pour l'évolution du système d'IA comprend:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Intégration de données biométriques pour des recommandations ultra-précises</li>
            <li>Systèmes adaptatifs qui ajustent les recommandations en temps réel</li>
            <li>Analyse prédictive des tendances de santé pour une intervention précoce</li>
            <li>Personnalisation basée sur la génétique et le microbiome individuel</li>
          </ul>
          <p>
            L'objectif est de créer un système de recommandation qui s'adapte non seulement aux besoins actuels mais qui anticipe également les changements futurs de l'état de santé.
          </p>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
