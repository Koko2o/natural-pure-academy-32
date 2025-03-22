
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ProfileSante = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Données fictives qui seraient normalement récupérées depuis une API/BDD
  const mockData = {
    articles: [
      { id: 1, title: "Les bienfaits des oméga-3", date: "10 juin 2023", category: "Nutrition" },
      { id: 2, title: "Comment améliorer votre sommeil naturellement", date: "15 mai 2023", category: "Bien-être" },
      { id: 3, title: "Vitamine D: êtes-vous carencé?", date: "23 avril 2023", category: "Compléments" },
    ],
    defis: [
      { id: 1, name: "Hydratation optimale", progress: 75, days: "21/30" },
      { id: 2, name: "Alimentation anti-inflammatoire", progress: 40, days: "12/30" },
    ],
    recommendations: [
      { id: 1, title: "Les probiotiques pour la santé intestinale", category: "Compléments" },
      { id: 2, title: "5 exercices pour réduire le stress", category: "Bien-être" },
      { id: 3, title: "Magnésium: le minéral anti-stress", category: "Nutrition" },
    ]
  };

  // Simuler une connexion à l'app (dans une vraie application, ce serait géré via authentification)
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-6">Votre Profil Santé Personnalisé</h1>
          <p className="text-lg mb-8">
            Accédez à votre tableau de bord personnel pour suivre vos progrès, consulter l'historique de vos lectures,
            et recevoir des recommandations adaptées à vos besoins spécifiques.
          </p>
          
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <div className="bg-primary/5 p-4 rounded-lg flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-3"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              <h3 className="text-lg font-semibold mb-2">Suivi Personnalisé</h3>
              <p className="text-center">Suivez vos défis et votre progression vers une meilleure santé</p>
            </div>
            
            <div className="bg-primary/5 p-4 rounded-lg flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-3"><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1"/><path d="M15 3h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1"/><path d="M2 12h20"/><path d="M20 16v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1"/><path d="M12 3v9"/><path d="M12 19v2"/></svg>
              <h3 className="text-lg font-semibold mb-2">Recommandations sur mesure</h3>
              <p className="text-center">Obtenez des conseils adaptés à vos besoins et intérêts spécifiques</p>
            </div>
          </div>
          
          <Button size="lg" onClick={handleLogin}>
            Connectez-vous pour accéder à votre profil
          </Button>
          
          <p className="mt-4 text-sm text-muted-foreground">
            Note: Pour les besoins de démonstration, cliquez simplement sur le bouton pour simuler une connexion.
            Dans une version finale, un système d'authentification complet serait implémenté.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-2">Votre Profil Santé</h1>
      <p className="text-muted-foreground mb-8">
        Bienvenue sur votre tableau de bord personnel. Suivez vos progrès et découvrez des recommandations
        personnalisées basées sur vos activités.
      </p>
      
      <Tabs defaultValue="history">
        <TabsList className="mb-6">
          <TabsTrigger value="history">Historique de lecture</TabsTrigger>
          <TabsTrigger value="challenges">Vos défis</TabsTrigger>
          <TabsTrigger value="recommendations">Recommandations</TabsTrigger>
          <TabsTrigger value="health-sync">Santé connectée</TabsTrigger>
        </TabsList>
        
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historique de vos articles consultés</CardTitle>
              <CardDescription>Retrouvez tous les articles que vous avez lus récemment</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Article</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Date de lecture</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockData.articles.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell className="font-medium">{article.title}</TableCell>
                      <TableCell><Badge variant="outline">{article.category}</Badge></TableCell>
                      <TableCell>{article.date}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/article/${article.id}`}>Relire</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="challenges" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vos défis en cours</CardTitle>
              <CardDescription>Suivez votre progression et relevez de nouveaux défis pour améliorer votre santé</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockData.defis.map((defi) => (
                  <div key={defi.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold">{defi.name}</h3>
                      <Badge>{defi.days} jours</Badge>
                    </div>
                    <div className="space-y-2">
                      <Progress value={defi.progress} />
                      <div className="flex justify-between text-sm">
                        <span>Progression: {defi.progress}%</span>
                        <span className="text-primary font-medium">
                          {defi.progress < 50 ? "Continuez vos efforts!" : "Excellente progression!"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Button>Découvrir de nouveaux défis</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recommandations personnalisées</CardTitle>
              <CardDescription>Basées sur vos lectures et interactions précédentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockData.recommendations.map((rec) => (
                  <div key={rec.id} className="border rounded-lg p-4 hover:border-primary hover:shadow-md transition-all">
                    <Badge className="mb-2">{rec.category}</Badge>
                    <h3 className="font-medium mb-4">{rec.title}</h3>
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <Link to={`/article/${rec.id}`}>Découvrir</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="health-sync" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Connectez vos données de santé</CardTitle>
              <CardDescription>Synchronisez vos applications de santé pour des recommandations encore plus pertinentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="border rounded-lg p-6 flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 mb-4"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                  <h3 className="text-lg font-semibold mb-2">Apple Health</h3>
                  <p className="text-center mb-4 text-muted-foreground">
                    Connectez vos données Apple Health pour un suivi intégré de vos activités quotidiennes
                  </p>
                  <Button variant="outline">Connecter</Button>
                </div>
                
                <div className="border rounded-lg p-6 flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mb-4"><path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/><path d="M12 15v2"/><path d="M10 14v1a2 2 0 1 0 4 0v-1"/></svg>
                  <h3 className="text-lg font-semibold mb-2">Google Fit</h3>
                  <p className="text-center mb-4 text-muted-foreground">
                    Importez vos données Google Fit pour recevoir des recommandations nutritionnelles adaptées
                  </p>
                  <Button variant="outline">Connecter</Button>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-primary/5 rounded-lg">
                <p className="text-sm text-center">
                  La connexion avec les services de santé vous permettra de recevoir des conseils hyper-personnalisés 
                  basés sur votre activité physique, votre sommeil et d'autres métriques de santé.
                  <br />
                  <span className="text-muted-foreground">
                    Note: Cette fonctionnalité sera pleinement opérationnelle dans la prochaine mise à jour.
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileSante;
