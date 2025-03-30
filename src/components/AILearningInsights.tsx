import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Radar, Doughnut } from 'react-chartjs-2';
import { secureStorageService } from '@/utils/secureStorage';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { trainAIModel } from '../utils/aiLearning';

// Enregistrer les composants Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Données de démonstration
const userProgressData = {
  labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
  datasets: [
    {
      label: 'Engagement utilisateur',
      data: [65, 59, 80, 81, 56, 90],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

const modelAccuracyData = {
  labels: ['Recommandations', 'Prédictions', 'Classifications', 'Personnalisation'],
  datasets: [
    {
      label: 'Précision actuelle',
      data: [85, 75, 90, 80],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
    {
      label: 'Objectif',
      data: [95, 90, 95, 90],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};

const insightAnalysisData = {
  labels: ['Préférences alimentaires', 'Réponse aux recommandations', 'Habitudes', 'Objectifs', 'Restrictions'],
  datasets: [
    {
      label: 'Importance des facteurs',
      data: [80, 85, 65, 90, 70],
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
      borderColor: 'rgba(255, 206, 86, 1)',
      borderWidth: 1,
      fill: true,
    },
  ],
};

const adaptiveModelData = {
  labels: ['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4'],
  datasets: [
    {
      label: 'Apprentissage adaptatif',
      data: [30, 20, 25, 25],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
      ],
      borderWidth: 1,
    },
  ],
};

const AILearningInsights = () => {
  const [activeTab, setActiveTab] = useState('progress');
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);

  const handleTrainModel = async () => {
    setIsTraining(true);
    setTrainingProgress(0);

    const interval = setInterval(() => {
      setTrainingProgress((prev) => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsTraining(false);
            setTrainingProgress(100);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 800);

    try {
      await trainAIModel();
    } catch (error) {
      console.error("Erreur lors de l'entraînement du modèle:", error);
      clearInterval(interval);
      setIsTraining(false);
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Analyse de données d\'apprentissage',
      },
    },
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Centre d'Apprentissage IA</CardTitle>
          <CardDescription>
            Visualisation de l'apprentissage et de l'amélioration continue de notre système de recommandation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="progress">Progression</TabsTrigger>
              <TabsTrigger value="accuracy">Précision</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
              <TabsTrigger value="adaptability">Adaptabilité</TabsTrigger>
            </TabsList>

            <TabsContent value="progress" className="space-y-4">
              <h3 className="text-lg font-medium">Progrès de l'Engagement Utilisateur</h3>
              <div className="h-80">
                <Line options={chartOptions} data={userProgressData} />
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Ce graphique montre l'évolution de l'engagement des utilisateurs au fil du temps, démontrant
                l'efficacité croissante des recommandations personnalisées.
              </p>
            </TabsContent>

            <TabsContent value="accuracy" className="space-y-4">
              <h3 className="text-lg font-medium">Précision du Modèle</h3>
              <div className="h-80">
                <Bar options={chartOptions} data={modelAccuracyData} />
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Comparaison entre la précision actuelle du modèle et les objectifs fixés pour différentes fonctionnalités
                de prédiction.
              </p>
            </TabsContent>

            <TabsContent value="insights" className="space-y-4">
              <h3 className="text-lg font-medium">Analyse des Facteurs d'Influence</h3>
              <div className="h-80">
                <Radar options={chartOptions} data={insightAnalysisData} />
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Représentation de l'importance relative des différents facteurs utilisés par notre IA pour formuler des
                recommandations personnalisées.
              </p>
            </TabsContent>

            <TabsContent value="adaptability" className="space-y-4">
              <h3 className="text-lg font-medium">Capacité d'Adaptation du Modèle</h3>
              <div className="h-80">
                <Doughnut options={chartOptions} data={adaptiveModelData} />
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Distribution des différentes phases d'apprentissage adaptatif, montrant comment notre modèle équilibre
                l'exploration et l'exploitation des données.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Dernier entraînement: {new Date().toLocaleDateString()}
          </div>
          <Button onClick={handleTrainModel} disabled={isTraining}>
            {isTraining ? `Entraînement en cours (${Math.round(trainingProgress)}%)` : "Entraîner le modèle"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AILearningInsights;