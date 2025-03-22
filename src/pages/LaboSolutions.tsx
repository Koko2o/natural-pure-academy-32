
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

interface HealthIssue {
  id: string;
  name: string;
  description: string;
  causes: {
    title: string;
    description: string;
  }[];
  recommendations: {
    title: string;
    description: string;
    priority: "Élevée" | "Moyenne" | "Complémentaire";
    dosage?: string;
  }[];
  studies: {
    title: string;
    url: string;
    journal: string;
    year: number;
  }[];
}

const LaboSolutions = () => {
  const [selectedIssue, setSelectedIssue] = useState<HealthIssue | null>(null);
  
  // Données fictives de problèmes de santé
  const healthIssues: HealthIssue[] = [
    {
      id: "stress",
      name: "Stress et Anxiété",
      description: "Le stress chronique affecte négativement de nombreux systèmes dans le corps, de la digestion à l'immunité.",
      causes: [
        {
          title: "Déséquilibre Cortisol",
          description: "La production excessive de cortisol, connue sous le nom d'hormone du stress, peut perturber l'équilibre hormonal."
        },
        {
          title: "Déficit en magnésium",
          description: "Le magnésium joue un rôle crucial dans la régulation du système nerveux et la gestion du stress."
        },
        {
          title: "Inflammation neuronale",
          description: "Le stress chronique peut provoquer une inflammation dans le cerveau, affectant l'humeur et les fonctions cognitives."
        }
      ],
      recommendations: [
        {
          title: "Magnésium bisglycinate",
          description: "Forme hautement biodisponible de magnésium qui aide à calmer le système nerveux.",
          priority: "Élevée",
          dosage: "300-400mg par jour, de préférence le soir"
        },
        {
          title: "Ashwagandha",
          description: "Adaptogène qui aide le corps à mieux gérer le stress et normalise les niveaux de cortisol.",
          priority: "Élevée",
          dosage: "300-500mg par jour standardisé à 5% withanolides"
        },
        {
          title: "Complexe B",
          description: "Les vitamines B sont essentielles au fonctionnement du système nerveux et à la production d'énergie.",
          priority: "Moyenne",
          dosage: "1 comprimé par jour avec un repas"
        }
      ],
      studies: [
        {
          title: "L'ashwagandha pour réduire le stress: Étude randomisée contrôlée",
          url: "https://pubmed.ncbi.nlm.nih.gov/23439798/",
          journal: "Indian Journal of Psychological Medicine",
          year: 2012
        },
        {
          title: "Effets du magnésium sur l'anxiété et le stress: revue systématique",
          url: "https://pubmed.ncbi.nlm.nih.gov/27869100/",
          journal: "Nutrients",
          year: 2017
        }
      ]
    },
    {
      id: "insomnie",
      name: "Troubles du Sommeil",
      description: "L'insomnie et les difficultés d'endormissement affectent la qualité de vie et la santé globale.",
      causes: [
        {
          title: "Déséquilibre mélatonine",
          description: "La production insuffisante de mélatonine, l'hormone du sommeil, peut perturber le cycle circadien."
        },
        {
          title: "Hyperactivité du système nerveux",
          description: "Un système nerveux sympathique hyperactif peut empêcher la détente nécessaire à l'endormissement."
        },
        {
          title: "Carence en minéraux relaxants",
          description: "Les déficits en magnésium et calcium peuvent affecter la qualité du sommeil."
        }
      ],
      recommendations: [
        {
          title: "Mélatonine",
          description: "Hormone naturelle qui régule le cycle veille-sommeil et facilite l'endormissement.",
          priority: "Élevée",
          dosage: "0,5-3mg 30 minutes avant le coucher"
        },
        {
          title: "L-théanine",
          description: "Acide aminé présent dans le thé vert qui favorise la relaxation sans sédation.",
          priority: "Moyenne",
          dosage: "200-400mg avant le coucher"
        },
        {
          title: "Magnésium glycinate",
          description: "Forme de magnésium qui favorise la relaxation musculaire et nerveuse.",
          priority: "Moyenne",
          dosage: "300mg avant le coucher"
        }
      ],
      studies: [
        {
          title: "Efficacité et sécurité de la mélatonine dans les troubles du sommeil primaires",
          url: "https://pubmed.ncbi.nlm.nih.gov/28503116/",
          journal: "Sleep Medicine Reviews",
          year: 2017
        },
        {
          title: "L-théanine pour améliorer la qualité du sommeil: méta-analyse",
          url: "https://pubmed.ncbi.nlm.nih.gov/33110501/",
          journal: "Plant Foods for Human Nutrition",
          year: 2020
        }
      ]
    },
    {
      id: "acne",
      name: "Acné",
      description: "L'acné est une affection cutanée inflammatoire qui peut être influencée par des facteurs hormonaux, alimentaires et microbiologiques.",
      causes: [
        {
          title: "Déséquilibre hormonal",
          description: "Les fluctuations hormonales, particulièrement des androgènes, peuvent stimuler la production excessive de sébum."
        },
        {
          title: "Inflammation systémique",
          description: "L'inflammation chronique peut exacerber les poussées d'acné et ralentir la guérison."
        },
        {
          title: "Dysbiose intestinale",
          description: "Un déséquilibre du microbiome intestinal peut influencer l'inflammation cutanée via l'axe intestin-peau."
        }
      ],
      recommendations: [
        {
          title: "Zinc",
          description: "Minéral aux propriétés anti-inflammatoires qui peut réduire la sévérité de l'acné.",
          priority: "Élevée",
          dosage: "15-30mg par jour sous forme de picolinate ou de gluconate"
        },
        {
          title: "Probiotiques",
          description: "Certaines souches probiotiques peuvent aider à équilibrer le microbiome intestinal et réduire l'inflammation cutanée.",
          priority: "Moyenne",
          dosage: "10-30 milliards UFC par jour avec des souches Lactobacillus et Bifidobacterium"
        },
        {
          title: "Oméga-3",
          description: "Acides gras essentiels qui modulent l'inflammation et peuvent améliorer la santé de la peau.",
          priority: "Moyenne",
          dosage: "1000-2000mg combinés EPA/DHA par jour"
        }
      ],
      studies: [
        {
          title: "Efficacité du zinc dans le traitement de l'acné: méta-analyse",
          url: "https://pubmed.ncbi.nlm.nih.gov/32356583/",
          journal: "Dermatologic Therapy",
          year: 2020
        },
        {
          title: "Influence des probiotiques sur l'acné: revue systématique",
          url: "https://pubmed.ncbi.nlm.nih.gov/30634891/",
          journal: "International Journal of Dermatology",
          year: 2019
        }
      ]
    }
  ];

  const handleSelectIssue = (issue: HealthIssue) => {
    setSelectedIssue(issue);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-2">Labo des Solutions</h1>
      <p className="text-muted-foreground mb-8">
        Explorez des problèmes de santé courants, leurs causes scientifiques et des solutions naturelles basées sur la recherche.
      </p>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Explorez par problématique</CardTitle>
              <CardDescription>Sélectionnez un sujet pour voir les solutions recommandées</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {healthIssues.map((issue) => (
                  <Button 
                    key={issue.id} 
                    variant={selectedIssue?.id === issue.id ? "default" : "outline"} 
                    className="w-full justify-start"
                    onClick={() => handleSelectIssue(issue)}
                  >
                    {issue.name}
                  </Button>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Notre base de connaissances s'enrichit continuellement avec de nouvelles recherches.
              </p>
            </CardFooter>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          {selectedIssue ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{selectedIssue.name}</CardTitle>
                    <CardDescription>{selectedIssue.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="causes">
                  <TabsList className="mb-4">
                    <TabsTrigger value="causes">Causes</TabsTrigger>
                    <TabsTrigger value="solutions">Solutions</TabsTrigger>
                    <TabsTrigger value="research">Recherche</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="causes">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Mécanismes biologiques</h3>
                      {selectedIssue.causes.map((cause, index) => (
                        <div key={index} className="bg-secondary/20 p-4 rounded-md">
                          <h4 className="font-medium text-primary">{cause.title}</h4>
                          <p className="mt-1 text-sm">{cause.description}</p>
                        </div>
                      ))}
                      
                      <div className="p-4 border rounded-md mt-6">
                        <h4 className="font-medium mb-2">Comprendre la chaîne de causalité</h4>
                        <div className="relative py-4">
                          {selectedIssue.causes.map((cause, index) => (
                            <div key={index} className="flex items-center mb-4">
                              <div className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                                {cause.title}
                              </div>
                              {index < selectedIssue.causes.length - 1 && (
                                <div className="flex items-center mx-2">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="m9 18 6-6-6-6"/></svg>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="solutions">
                    <div className="space-y-6">
                      {selectedIssue.recommendations.map((rec, index) => (
                        <div key={index} className="border rounded-lg overflow-hidden">
                          <div className="bg-primary/5 p-4 flex justify-between items-center">
                            <h4 className="font-semibold">{rec.title}</h4>
                            <Badge>{rec.priority}</Badge>
                          </div>
                          <div className="p-4">
                            <p className="mb-3">{rec.description}</p>
                            {rec.dosage && (
                              <div className="bg-muted p-2 rounded text-sm">
                                <span className="font-medium">Dosage recommandé: </span>
                                {rec.dosage}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      
                      <div className="bg-primary/5 p-4 rounded-lg text-sm">
                        <p className="font-medium text-primary mb-1">Important:</p>
                        <p>
                          Ces recommandations sont fournies à titre informatif et ne remplacent pas l'avis d'un professionnel de santé.
                          Consultez votre médecin avant de commencer tout nouveau supplément, particulièrement si vous avez des
                          conditions médicales ou prenez des médicaments.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="research">
                    <div className="space-y-4">
                      <h3 className="font-semibold mb-4">Études scientifiques pertinentes</h3>
                      
                      {selectedIssue.studies.map((study, index) => (
                        <div key={index} className="border rounded-md p-4">
                          <h4 className="font-medium">{study.title}</h4>
                          <div className="flex gap-2 mt-2 mb-3">
                            <Badge variant="outline">{study.journal}</Badge>
                            <Badge variant="outline">{study.year}</Badge>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href={study.url} target="_blank" rel="noopener noreferrer">
                              Voir sur PubMed
                            </a>
                          </Button>
                        </div>
                      ))}
                      
                      <Separator className="my-6" />
                      
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-4">
                          Pour approfondir vos connaissances sur ce sujet
                        </p>
                        <Button asChild>
                          <Link to="/articles">Voir les articles associés</Link>
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center border rounded-lg p-12 text-center">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-muted-foreground mb-4"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                <h3 className="text-xl font-medium mb-2">Sélectionnez une problématique</h3>
                <p className="text-muted-foreground max-w-md">
                  Choisissez un sujet dans la liste pour explorer ses causes, les solutions recommandées
                  et les études scientifiques associées.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LaboSolutions;
