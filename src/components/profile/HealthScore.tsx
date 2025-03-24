
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Brain, Dumbbell, Utensils, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HealthScore = () => {
  const { toast } = useToast();
  
  const handleScoreExplanation = () => {
    toast({
      title: "Votre score de santé",
      description: "Ce score est calculé en fonction de vos habitudes quotidiennes, symptômes et mesures biologiques."
    });
  };

  return (
    <Card className="mb-8 border-none shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 p-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Heart className="h-5 w-5 text-rose-500" />
          Votre score de santé global
        </h3>
      </div>
      
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 mb-4">
          <div className="md:w-1/3">
            <div className="relative w-48 h-48 mx-auto">
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-5xl font-bold text-rose-600">78</span>
                <span className="text-sm text-muted-foreground">sur 100</span>
              </div>
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-gray-200"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-rose-500"
                  strokeWidth="8"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                  strokeDasharray={78 * 2.51}
                  strokeDashoffset={251 - (78 * 2.51)}
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <Tabs defaultValue="categories">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="categories">Catégories</TabsTrigger>
                <TabsTrigger value="evolution">Évolution</TabsTrigger>
                <TabsTrigger value="details">Détails</TabsTrigger>
              </TabsList>
              
              <TabsContent value="categories" className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-rose-500" />
                      <span className="text-sm font-medium">Santé cardiovasculaire</span>
                    </div>
                    <span className="text-sm font-semibold">82/100</span>
                  </div>
                  <Progress value={82} className="h-2 bg-rose-100" indicatorColor="bg-rose-500" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-violet-500" />
                      <span className="text-sm font-medium">Santé cognitive</span>
                    </div>
                    <span className="text-sm font-semibold">75/100</span>
                  </div>
                  <Progress value={75} className="h-2 bg-violet-100" indicatorColor="bg-violet-500" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Dumbbell className="h-4 w-4 text-teal-500" />
                      <span className="text-sm font-medium">Forme physique</span>
                    </div>
                    <span className="text-sm font-semibold">68/100</span>
                  </div>
                  <Progress value={68} className="h-2 bg-teal-100" indicatorColor="bg-teal-500" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Utensils className="h-4 w-4 text-amber-500" />
                      <span className="text-sm font-medium">Nutrition</span>
                    </div>
                    <span className="text-sm font-semibold">85/100</span>
                  </div>
                  <Progress value={85} className="h-2 bg-amber-100" indicatorColor="bg-amber-500" />
                </div>
              </TabsContent>
              
              <TabsContent value="evolution">
                <div className="h-60 flex justify-center items-center border rounded-lg bg-slate-50">
                  <Button variant="soft" onClick={() => toast({
                    title: "Graphique d'évolution",
                    description: "Votre score a augmenté de 5 points au cours des 3 derniers mois"
                  })}>
                    <Play className="h-4 w-4 mr-2" />
                    Voir l'évolution détaillée
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Votre score de santé est calculé à partir de plusieurs facteurs incluant vos habitudes de vie, 
                  vos constantes biologiques et vos symptômes rapportés.
                </p>
                <Button variant="outline" size="sm" onClick={handleScoreExplanation}>
                  Comprendre mon score
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t">
          <p className="text-sm text-muted-foreground">Dernière mise à jour: 24 mars 2024</p>
          <Button variant="gradient" size="sm" onClick={() => toast({
            title: "Analyse complète",
            description: "Votre rapport de santé complet a été généré"
          })}>
            Voir mon analyse complète
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthScore;
