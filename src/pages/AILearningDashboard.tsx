
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import AILearningInsights from '@/components/AILearningInsights';
import { secureStorageService } from '@/utils/secureStorage';

const AILearningDashboard = () => {
  const [activeTab, setActiveTab] = useState('insights');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container py-8 max-w-6xl mx-auto px-4"
    >
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Tableau de Bord d'Apprentissage IA</h1>
        <p className="text-muted-foreground mt-2">
          Surveillez et optimisez les performances de notre système d'intelligence artificielle
        </p>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="insights">Analyses d'Apprentissage</TabsTrigger>
          <TabsTrigger value="training">Entraînement</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="insights">
          <AILearningInsights />
        </TabsContent>

        <TabsContent value="training">
          <Card>
            <CardHeader>
              <CardTitle>Entraînement du Modèle</CardTitle>
              <CardDescription>
                Configurez et gérez les sessions d'entraînement du modèle d'IA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>Cette section permet de contrôler les paramètres d'entraînement et de lancer de nouvelles sessions.</p>
                <Button variant="outline">Configurer l'entraînement</Button>
                <Button className="ml-2">Démarrer un nouvel entraînement</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Métriques de Performance</CardTitle>
              <CardDescription>
                Analysez les métriques de performance du système
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Cette section affichera des graphiques détaillés des performances du modèle.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default AILearningDashboard;
