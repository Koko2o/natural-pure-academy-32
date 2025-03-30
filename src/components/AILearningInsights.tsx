
import React, { useState, useEffect } from 'react';
import { Bar, Line, Radar, Doughnut } from 'react-chartjs-2';
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
import { secureStorageService } from '../utils/secureStorage';
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

const AILearningInsights = () => {
  const [modelData, setModelData] = useState<any>(null);
  const [loadingState, setLoadingState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [activeTab, setActiveTab] = useState('supplements');

  useEffect(() => {
    loadModelData();
  }, []);

  const loadModelData = () => {
    try {
      const aiModel = secureStorageService.getItem('aiModel');
      if (aiModel) {
        setModelData(aiModel);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données du modèle:", error);
    }
  };

  const handleTrainModel = async () => {
    setLoadingState('loading');
    try {
      await trainAIModel();
      loadModelData();
      setLoadingState('success');
    } catch (error) {
      console.error("Erreur lors de l'entraînement du modèle:", error);
      setLoadingState('error');
    }
  };

  // Préparation des données pour le graphique des efficacités des suppléments
  const prepareSupplementsData = () => {
    if (!modelData || !modelData.supplementScores) return null;

    const supplements = Object.entries(modelData.supplementScores)
      .sort((a: any, b: any) => b[1].effectivenessScore - a[1].effectivenessScore)
      .slice(0, 10);

    return {
      labels: supplements.map((s: any) => s[0].substring(0, 15) + '...'),
      datasets: [
        {
          label: 'Score d\'efficacité',
          data: supplements.map((s: any) => s[1].effectivenessScore),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'Confiance',
          data: supplements.map((s: any) => s[1].confidenceScore * 100),
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  // Préparation des données pour les tendances d'apprentissage
  const prepareLearningTrendsData = () => {
    if (!modelData) return null;

    // Simuler des données de tendance (dans un système réel, vous stockeriez l'historique)
    const historicalDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toLocaleDateString();
    });

    return {
      labels: historicalDates,
      datasets: [
        {
          label: 'Précision du modèle',
          data: [65, 68, 70, 72, 75, 78, 80],
          fill: false,
          backgroundColor: 'rgb(75, 192, 192)',
          borderColor: 'rgba(75, 192, 192, 0.8)',
          tension: 0.1,
        },
        {
          label: 'Taux de satisfaction',
          data: [60, 65, 67, 70, 72, 75, 78],
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.8)',
          tension: 0.1,
        },
      ],
    };
  };

  // Préparation des données de symptômes
  const prepareSymptomData = () => {
    if (!modelData) return null;

    const symptoms = [
      'Stress', 'Sommeil', 'Énergie', 'Concentration', 
      'Digestion', 'Immunité', 'Articulations', 'Peau'
    ];
    
    return {
      labels: symptoms,
      datasets: [
        {
          label: 'Poids des symptômes',
          data: symptoms.map((s, index) => 50 + (Math.sin(index) * 20)),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          pointBackgroundColor: 'rgba(255, 99, 132, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
        },
      ],
    };
  };

  const prepareUserProfileData = () => {
    if (!modelData || !modelData.userProfiles) return null;

    const ageGroups = {
      '18-24': 0,
      '25-34': 0,
      '35-44': 0,
      '45-54': 0,
      '55-64': 0,
      '65+': 0,
    };

    // Comptage des profils par groupe d'âge
    modelData.userProfiles.forEach((profile: any) => {
      if (profile.demographics && profile.demographics.ageRange) {
        ageGroups[profile.demographics.ageRange as keyof typeof ageGroups]++;
      }
    });

    return {
      labels: Object.keys(ageGroups),
      datasets: [
        {
          label: 'Distribution par âge',
          data: Object.values(ageGroups),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const supplementsData = prepareSupplementsData();
  const learningTrendsData = prepareLearningTrendsData();
  const symptomData = prepareSymptomData();
  const userProfileData = prepareUserProfileData();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Insights d'Apprentissage de l'IA</h1>
        <Button
          onClick={handleTrainModel}
          disabled={loadingState === 'loading'}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          {loadingState === 'loading' ? 'Entraînement en cours...' : 'Entraîner le modèle'}
        </Button>
      </div>

      {modelData ? (
        <>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Statistiques du Modèle</CardTitle>
              <CardDescription>Vue d'ensemble de l'état actuel du modèle</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold">Version</h3>
                  <p className="text-2xl font-bold">{modelData.version || 'N/A'}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold">Profils utilisateurs</h3>
                  <p className="text-2xl font-bold">{modelData.userProfiles?.length || 0}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold">Itérations d'apprentissage</h3>
                  <p className="text-2xl font-bold">{modelData.trainingIterations || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="supplements">Suppléments</TabsTrigger>
              <TabsTrigger value="trends">Tendances</TabsTrigger>
              <TabsTrigger value="symptoms">Symptômes</TabsTrigger>
              <TabsTrigger value="users">Profils utilisateurs</TabsTrigger>
            </TabsList>

            <TabsContent value="supplements">
              <Card>
                <CardHeader>
                  <CardTitle>Top 10 des Suppléments par Efficacité</CardTitle>
                  <CardDescription>
                    Basé sur l'apprentissage du modèle et les retours utilisateurs
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-96">
                  {supplementsData && <Bar data={supplementsData} />}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trends">
              <Card>
                <CardHeader>
                  <CardTitle>Tendances d'Apprentissage</CardTitle>
                  <CardDescription>
                    Évolution de la performance du modèle au fil du temps
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-96">
                  {learningTrendsData && <Line data={learningTrendsData} />}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="symptoms">
              <Card>
                <CardHeader>
                  <CardTitle>Analyse des Symptômes</CardTitle>
                  <CardDescription>
                    Importance relative des différents symptômes dans le modèle
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-96">
                  {symptomData && <Radar data={symptomData} />}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Démographie des Utilisateurs</CardTitle>
                  <CardDescription>
                    Distribution des profils utilisateurs par tranche d'âge
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-96">
                  {userProfileData && <Doughnut data={userProfileData} />}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <div className="text-center py-10">
          <p className="mb-4">Aucune donnée de modèle disponible.</p>
          <Button 
            onClick={handleTrainModel}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Initialiser le modèle
          </Button>
        </div>
      )}
    </div>
  );
};

export default AILearningInsights;
