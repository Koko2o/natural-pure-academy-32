
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
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Brain, Lightbulb, Database, LineChart, Sparkles, ArrowUpRight } from "lucide-react";
import { Link } from 'react-router-dom';

const AISystem = () => {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center space-y-2">
          <h1 className="text-4xl font-bold">Notre système d'IA pour les recommandations personnalisées</h1>
          <p className="text-xl text-muted-foreground">
            Comment nous utilisons l'intelligence artificielle pour optimiser vos recommandations nutritionnelles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader className="pb-2">
              <Brain className="w-12 h-12 mx-auto text-primary mb-2" />
              <CardTitle>Intelligence adaptative</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Notre IA s'adapte à vos besoins spécifiques et restrictions alimentaires
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-2">
              <Database className="w-12 h-12 mx-auto text-primary mb-2" />
              <CardTitle>Base scientifique</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Recommendations basées sur les dernières recherches en nutrition
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-2">
              <LineChart className="w-12 h-12 mx-auto text-primary mb-2" />
              <CardTitle>Apprentissage continu</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Le système s'améliore avec le temps pour des recommendations de plus en plus précises
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="how-it-works" className="mb-12">
          <TabsList className="mb-4 w-full justify-start">
            <TabsTrigger value="how-it-works">Fonctionnement</TabsTrigger>
            <TabsTrigger value="tech">Technologies</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          
          <TabsContent value="how-it-works">
            <Card>
              <CardHeader>
                <CardTitle>Comment fonctionne notre IA?</CardTitle>
                <CardDescription>
                  Une approche en plusieurs étapes pour générer des recommandations personnalisées
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex gap-4 items-start">
                    <div className="bg-primary/10 rounded-full p-3 h-12 w-12 flex items-center justify-center flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Analyse de votre profil</h3>
                      <p className="text-muted-foreground">
                        Notre IA analyse vos réponses au quiz pour comprendre vos symptômes, 
                        restrictions alimentaires et objectifs de santé. Chaque réponse contribue
                        à créer un profil nutritionnel unique.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="bg-primary/10 rounded-full p-3 h-12 w-12 flex items-center justify-center flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Priorisation des besoins</h3>
                      <p className="text-muted-foreground">
                        Le système hiérarchise vos besoins en fonction de leur importance et de leur impact 
                        sur votre bien-être. Par exemple, les symptômes de stress chronique ou de troubles 
                        du sommeil peuvent être traités en priorité.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="bg-primary/10 rounded-full p-3 h-12 w-12 flex items-center justify-center flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Correspondance avec la base de connaissances</h3>
                      <p className="text-muted-foreground">
                        Votre profil est mis en correspondance avec notre base de données nutritionnelle
                        qui contient des informations sur les compléments, leurs bénéfices et leur composition.
                        Le système tient compte de vos restrictions (végétarien, sans gluten, etc.) pour
                        ne proposer que des solutions adaptées.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="bg-primary/10 rounded-full p-3 h-12 w-12 flex items-center justify-center flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Génération de recommandations</h3>
                      <p className="text-muted-foreground">
                        Notre algorithme génère des recommandations personnalisées qui ciblent 
                        spécifiquement vos besoins prioritaires. Ces recommandations sont accompagnées
                        d'explications scientifiques sur leur mode d'action et leurs bénéfices.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="bg-primary/10 rounded-full p-3 h-12 w-12 flex items-center justify-center flex-shrink-0">
                      5
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Apprentissage et amélioration</h3>
                      <p className="text-muted-foreground">
                        Le système s'enrichit au fil du temps grâce aux nouvelles données scientifiques
                        et à l'analyse des profils similaires, ce qui permet d'affiner continuellement 
                        la précision des recommandations.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tech">
            <Card>
              <CardHeader>
                <CardTitle>Technologies d'IA utilisées</CardTitle>
                <CardDescription>
                  Les technologies et méthodes derrière notre système de recommandation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h3 className="font-semibold flex items-center gap-2 mb-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      Modèle hybride basé sur des règles et l'apprentissage
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Notre approche combine l'expertise humaine (règles définies par des nutritionnistes) 
                      et l'apprentissage automatique pour affiner les recommandations au fil du temps. 
                      Ce système hybride permet de démarrer avec des recommandations précises dès le début 
                      et de s'améliorer progressivement.
                    </p>
                  </div>
                  
                  <h3 className="font-semibold">Composants technologiques clés</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-1">Base de connaissances structurée</h4>
                      <p className="text-sm text-muted-foreground">
                        Stockage optimisé des données sur les symptômes, nutriments et compléments 
                        avec leurs interactions et efficacité relative.
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-1">Algorithme de correspondance</h4>
                      <p className="text-sm text-muted-foreground">
                        Identifie les patterns entre profils utilisateurs et solutions efficaces
                        en utilisant des techniques de filtrage collaboratif.
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-1">Système de priorisation</h4>
                      <p className="text-sm text-muted-foreground">
                        Utilise un modèle de scoring qui pondère les symptômes en fonction de 
                        leur importance et de leur impact sur la qualité de vie.
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-1">Module d'explication</h4>
                      <p className="text-sm text-muted-foreground">
                        Génère des explications personnalisées sur les recommandations en
                        s'appuyant sur une bibliothèque de contenu scientifique adaptatif.
                      </p>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold mt-4">Développements futurs</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-5">
                    <li>Intégration d'un moteur de traitement du langage naturel pour l'analyse des symptômes décrits librement</li>
                    <li>Personnalisation avancée basée sur les données de suivi à long terme</li>
                    <li>Recommandations dynamiques qui s'adaptent aux changements saisonniers et à l'évolution des besoins</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>Questions fréquentes sur notre IA</CardTitle>
                <CardDescription>
                  Réponses aux questions les plus courantes sur notre système de recommandation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Comment l'IA garantit-elle des recommandations personnalisées?</AccordionTrigger>
                    <AccordionContent>
                      Notre IA analyse votre profil unique (symptômes, objectifs, restrictions alimentaires) pour générer des recommandations 
                      spécifiquement adaptées à vos besoins. Le système prend en compte non seulement les symptômes individuels, mais aussi 
                      leurs interactions et leur priorité relative.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Mes données sont-elles utilisées pour entrainer l'IA?</AccordionTrigger>
                    <AccordionContent>
                      Oui, mais de manière totalement anonymisée. Seules les corrélations statistiques entre profils et efficacité 
                      des recommandations sont utilisées pour améliorer le système. Aucune information personnelle identifiable n'est 
                      stockée ou utilisée dans le processus d'apprentissage.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Comment l'efficacité des recommandations est-elle évaluée?</AccordionTrigger>
                    <AccordionContent>
                      L'efficacité est évaluée à travers plusieurs sources: les retours explicites des utilisateurs, 
                      les études scientifiques publiées sur les nutriments et compléments, et l'analyse statistique des 
                      profils similaires ayant obtenu des résultats positifs.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>L'IA remplace-t-elle l'avis d'un professionnel de santé?</AccordionTrigger>
                    <AccordionContent>
                      Non, notre système d'IA est un outil d'information et de recommandation, mais ne remplace en aucun cas 
                      l'avis d'un professionnel de santé qualifié. Nous recommandons toujours de consulter un médecin ou un 
                      nutritionniste avant d'entreprendre tout changement significatif dans votre alimentation ou supplémentation.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Comment sont intégrées les nouvelles découvertes scientifiques?</AccordionTrigger>
                    <AccordionContent>
                      Notre équipe scientifique met régulièrement à jour la base de connaissances avec les dernières découvertes 
                      dans le domaine de la nutrition et de la supplémentation. Ces mises à jour sont validées par un comité 
                      d'experts avant d'être intégrées au système d'IA.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 text-center">
          <Lightbulb className="w-12 h-12 mx-auto text-primary mb-4" />
          <h2 className="text-2xl font-bold mb-2">Découvrez votre profil nutritionnel personnalisé</h2>
          <p className="text-muted-foreground mb-6">
            Notre IA analysera vos besoins spécifiques pour vous proposer des recommandations sur mesure.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link to="/quiz" className="flex items-center gap-2">
                Commencer le quiz <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/ai-dashboard">Voir le tableau de bord</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISystem;
