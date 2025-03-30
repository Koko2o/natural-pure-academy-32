
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
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Brain, Database, AlertTriangle, ChevronDown, Sparkles, Upload, Download } from "lucide-react";

import {
  initializeKnowledgeBase,
  Symptom,
  NutritionSupplement
} from '../utils/aiLearning';
import secureStorage from '../utils/secureStorage';

const AILearningDashboard = () => {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [supplements, setSupplements] = useState<NutritionSupplement[]>([]);
  const [knowledgeScore, setKnowledgeScore] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Charger les données
  useEffect(() => {
    try {
      // Initialise la base de connaissances si nécessaire
      initializeKnowledgeBase();
      
      // Charge les données existantes
      const storedSymptoms = secureStorage.getItem('ai_symptoms');
      const storedSupplements = secureStorage.getItem('ai_supplements');
      
      if (storedSymptoms) {
        setSymptoms(storedSymptoms);
      }
      
      if (storedSupplements) {
        setSupplements(storedSupplements);
      }
      
      // Calcule le score de connaissance basé sur la quantité de données
      const symptomCount = storedSymptoms?.length || 0;
      const supplementCount = storedSupplements?.length || 0;
      
      // Formule simplifiée: total_entities / 20 * 100 (max 100)
      const score = Math.min(100, ((symptomCount + supplementCount) / 20) * 100);
      setKnowledgeScore(Math.round(score));
      
      setIsDataLoaded(true);
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
      setErrorMessage("Erreur lors du chargement des données. Veuillez réessayer.");
    }
  }, []);

  // Exportation des données
  const handleExportData = () => {
    try {
      const exportData = {
        symptoms,
        supplements,
        exportDate: new Date().toISOString()
      };
      
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = 'ai-knowledge-export.json';
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    } catch (error) {
      console.error("Erreur lors de l'exportation des données:", error);
      setErrorMessage("Erreur lors de l'exportation des données.");
    }
  };

  // Importation des données
  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;
      
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const importedData = JSON.parse(content);
          
          if (importedData.symptoms && Array.isArray(importedData.symptoms)) {
            secureStorage.setItem('ai_symptoms', importedData.symptoms);
            setSymptoms(importedData.symptoms);
          }
          
          if (importedData.supplements && Array.isArray(importedData.supplements)) {
            secureStorage.setItem('ai_supplements', importedData.supplements);
            setSupplements(importedData.supplements);
          }
          
          // Recalcule le score de connaissance
          const symptomCount = importedData.symptoms?.length || 0;
          const supplementCount = importedData.supplements?.length || 0;
          const score = Math.min(100, ((symptomCount + supplementCount) / 20) * 100);
          setKnowledgeScore(Math.round(score));
          
        } catch (parseError) {
          console.error("Erreur lors de l'analyse du fichier importé:", parseError);
          setErrorMessage("Format de fichier invalide.");
        }
      };
      
      reader.readAsText(file);
    } catch (error) {
      console.error("Erreur lors de l'importation des données:", error);
      setErrorMessage("Erreur lors de l'importation des données.");
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tableau de bord d'apprentissage IA</h1>
          <p className="text-muted-foreground">
            Gestion de la base de connaissances pour les recommandations personnalisées
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={handleExportData} variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exporter
          </Button>
          
          <div className="relative">
            <Button variant="outline" className="flex items-center gap-2" onClick={() => document.getElementById('import-file')?.click()}>
              <Upload className="w-4 h-4" />
              Importer
            </Button>
            <Input 
              id="import-file"
              type="file" 
              accept=".json" 
              className="hidden" 
              onChange={handleImportData}
            />
          </div>
        </div>
      </div>

      {errorMessage && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>État du système d'apprentissage</CardTitle>
            <CardDescription>
              Niveau actuel de connaissance du système
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Base de connaissances</span>
                  <span className="text-sm font-medium">{knowledgeScore}%</span>
                </div>
                <Progress value={knowledgeScore} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold">{symptoms.length}</p>
                  <p className="text-sm text-muted-foreground">Symptômes analysés</p>
                </div>
                
                <div className="border rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold">{supplements.length}</p>
                  <p className="text-sm text-muted-foreground">Compléments enregistrés</p>
                </div>
              </div>
            </div>
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
                  <p className="font-medium">Recommandations personnalisées</p>
                  <p className="text-sm text-muted-foreground">
                    Génération de suggestions adaptées aux besoins spécifiques
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="symptoms">
        <TabsList className="mb-4">
          <TabsTrigger value="symptoms">Symptômes</TabsTrigger>
          <TabsTrigger value="supplements">Compléments</TabsTrigger>
          <TabsTrigger value="ai-training">Entraînement IA</TabsTrigger>
        </TabsList>
        
        <TabsContent value="symptoms">
          <Card>
            <CardHeader>
              <CardTitle>Base de données des symptômes</CardTitle>
              <CardDescription>
                Symptômes reconnus par notre système et leurs priorités
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isDataLoaded && symptoms.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Priorité</TableHead>
                      <TableHead>Mots-clés</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {symptoms.map((symptom) => (
                      <TableRow key={symptom.id}>
                        <TableCell className="font-medium">{symptom.name}</TableCell>
                        <TableCell>{symptom.description}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={symptom.priority > 7 ? "destructive" : symptom.priority > 5 ? "default" : "outline"}
                          >
                            {symptom.priority}/10
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {symptom.keywords.map((keyword, index) => (
                              <Badge key={index} variant="secondary">{keyword}</Badge>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <Database className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <p className="mt-2 text-muted-foreground">Aucun symptôme enregistré ou chargement en cours...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="supplements">
          <Card>
            <CardHeader>
              <CardTitle>Base de données des compléments nutritionnels</CardTitle>
              <CardDescription>
                Compléments et leurs caractéristiques enregistrés dans le système
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isDataLoaded && supplements.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Cible</TableHead>
                      <TableHead>Restrictions</TableHead>
                      <TableHead>Efficacité</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {supplements.map((supplement) => (
                      <TableRow key={supplement.id}>
                        <TableCell className="font-medium">{supplement.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {supplement.targetSymptoms.map((symptomId) => {
                              const symptom = symptoms.find(s => s.id === symptomId);
                              return (
                                <Badge key={symptomId} variant="outline">
                                  {symptom?.name || symptomId}
                                </Badge>
                              );
                            })}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {supplement.vegan && <Badge variant="secondary">Vegan</Badge>}
                            {supplement.vegetarian && <Badge variant="secondary">Végétarien</Badge>}
                            {supplement.glutenFree && <Badge variant="secondary">Sans gluten</Badge>}
                            {supplement.dairyFree && <Badge variant="secondary">Sans lactose</Badge>}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={supplement.effectiveness} className="h-2 w-20" />
                            <span className="text-xs">{supplement.effectiveness}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <Database className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <p className="mt-2 text-muted-foreground">Aucun complément enregistré ou chargement en cours...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ai-training">
          <Card>
            <CardHeader>
              <CardTitle>Modèle d'apprentissage</CardTitle>
              <CardDescription>
                Approche et méthodes utilisées pour les recommandations IA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-primary/5 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Fonctionnement du système d'IA</h3>
                  </div>
                  <p className="text-sm">
                    Notre système utilise une approche basée sur des règles expertes et un apprentissage progressif 
                    pour adapter les recommandations aux besoins spécifiques des utilisateurs. 
                    Contrairement aux systèmes d'IA traditionnels qui nécessitent d'énormes quantités de données,
                    notre modèle fonctionne avec une base de connaissances précises et ciblées.
                  </p>
                </div>
                
                <h3 className="font-semibold">Méthodes d'apprentissage</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Sparkles className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Priorisation des symptômes</p>
                      <p className="text-sm text-muted-foreground">
                        Notre algorithme identifie et classe les symptômes par ordre d'importance pour générer 
                        des recommandations ciblant d'abord les problèmes les plus urgents.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-2">
                    <Sparkles className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Filtrage par profil diététique</p>
                      <p className="text-sm text-muted-foreground">
                        Les recommandations sont automatiquement adaptées aux restrictions alimentaires spécifiques
                        (vegan, végétarien, sans gluten, etc.).
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-2">
                    <Sparkles className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Ajustement de l'efficacité</p>
                      <p className="text-sm text-muted-foreground">
                        Le système ajuste progressivement les scores d'efficacité des compléments basé sur les
                        retours des utilisateurs et les données scientifiques.
                      </p>
                    </div>
                  </li>
                </ul>
                
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Technologies futures</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>Intégration de modèles prédictifs basés sur des cohortes plus larges</li>
                    <li>Algorithmes adaptatifs qui ajustent les recommandations en temps réel</li>
                    <li>Analyse prédictive des tendances de santé pour une intervention précoce</li>
                    <li>Personnalisation basée sur la génétique et le microbiome individuel</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AILearningDashboard;
