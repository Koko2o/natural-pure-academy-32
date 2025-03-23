
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FlaskConical, Brain, Heart, Dna, TestTube, ZoomIn, Database, ArrowRight, ExternalLink } from "lucide-react";
import InstagramCTA from "@/components/InstagramCTA";

const LaboSolutions = () => {
  const [activeCondition, setActiveCondition] = useState("insomnie");

  const conditions = [
    { id: "insomnie", label: "Insomnie", icon: <Brain className="h-5 w-5 text-[#0A66C2]" /> },
    { id: "stress", label: "Stress chronique", icon: <Heart className="h-5 w-5 text-[#1E88E5]" /> },
    { id: "digestion", label: "Troubles digestifs", icon: <TestTube className="h-5 w-5 text-[#26A69A]" /> },
    { id: "inflammation", label: "Inflammation", icon: <Dna className="h-5 w-5 text-[#4CAF50]" /> },
    { id: "fatigue", label: "Fatigue chronique", icon: <FlaskConical className="h-5 w-5 text-[#2196F3]" /> }
  ];
  
  const labData = {
    insomnie: {
      title: "Insomnie",
      description: "L'insomnie est caractérisée par des difficultés à s'endormir ou à maintenir le sommeil. Elle peut être causée par divers facteurs physiologiques et environnementaux.",
      causes: [
        { title: "Déséquilibre hormonal", description: "Sécrétion réduite de mélatonine ou cortisol élevé le soir" },
        { title: "Carence en minéraux", description: "Niveaux insuffisants de magnésium et calcium" },
        { title: "Hyperactivité du système nerveux", description: "Activité excessive du système nerveux sympathique" },
        { title: "Inflammation cérébrale", description: "Niveaux élevés de cytokines pro-inflammatoires" }
      ],
      solutions: [
        {
          title: "Mélatonine",
          description: "Hormone naturelle du sommeil qui régule le cycle circadien",
          dosage: "0.5-3mg, 30-60 minutes avant le coucher",
          efficacité: 75,
          études: [
            { title: "Meta-analysis of melatonin to treat insomnia", journal: "Journal of Sleep Medicine", year: 2021, url: "#" },
            { title: "Effects of melatonin on sleep quality", journal: "Chronobiology International", year: 2019, url: "#" }
          ]
        },
        {
          title: "Magnésium bisglycinate",
          description: "Aide à la relaxation musculaire et nerveuse, cofacteur de plus de 300 réactions enzymatiques",
          dosage: "200-400mg au dîner ou avant le coucher",
          efficacité: 68,
          études: [
            { title: "Magnesium supplementation for insomnia", journal: "Journal of Research in Medical Sciences", year: 2022, url: "#" }
          ]
        },
        {
          title: "L-théanine",
          description: "Acide aminé présent dans le thé vert qui favorise la relaxation sans somnolence",
          dosage: "200-400mg, 30-60 minutes avant le coucher",
          efficacité: 62,
          études: [
            { title: "L-theanine for sleep and anxiety", journal: "Nutrients", year: 2020, url: "#" }
          ]
        },
        {
          title: "Ashwagandha",
          description: "Adaptogène qui réduit le cortisol et favorise l'équilibre hormonal",
          dosage: "300-600mg d'extrait standardisé, le soir",
          efficacité: 64,
          études: [
            { title: "Efficacy and Safety of Ashwagandha Root Extract on Sleep Quality", journal: "Cureus", year: 2021, url: "#" }
          ]
        }
      ],
      pathway: [
        { id: "stress", label: "Stress chronique", connection: "augmente" },
        { id: "cortisol", label: "Cortisol élevé le soir", connection: "perturbe" },
        { id: "melatonin", label: "Production de mélatonine", connection: "réduit" },
        { id: "sleep", label: "Qualité du sommeil", connection: "↓" },
        { id: "inflammation", label: "Inflammation", connection: "favorise" }
      ]
    },
    stress: {
      title: "Stress chronique",
      description: "Le stress chronique est un état prolongé d'activation du système nerveux sympathique, avec des effets délétères sur l'ensemble de l'organisme.",
      causes: [
        { title: "Hyperactivité de l'axe HPA", description: "Sécrétion excessive de cortisol et adrénaline" },
        { title: "Déséquilibre des neurotransmetteurs", description: "Épuisement des réserves de sérotonine et GABA" },
        { title: "Inflammation systémique", description: "Augmentation des marqueurs inflammatoires" },
        { title: "Déficit nutritionnel", description: "Déplétion en vitamines B, magnésium et zinc" }
      ],
      solutions: [
        {
          title: "Ashwagandha",
          description: "Adaptogène qui réduit le cortisol et module la réponse au stress",
          dosage: "300-600mg d'extrait standardisé, 1-2 fois par jour",
          efficacité: 82,
          études: [
            { title: "Efficacy of Ashwagandha in reducing stress and anxiety", journal: "Journal of Alternative and Complementary Medicine", year: 2021, url: "#" }
          ]
        },
        {
          title: "L-théanine",
          description: "Favorise la relaxation en augmentant les ondes alpha cérébrales",
          dosage: "200-400mg par jour",
          efficacité: 70,
          études: [
            { title: "Effects of L-theanine on stress and anxiety", journal: "Journal of Functional Foods", year: 2019, url: "#" }
          ]
        }
      ],
      pathway: []
    },
    // Autres conditions à définir
    digestion: { title: "Troubles digestifs", description: "Description à venir", causes: [], solutions: [], pathway: [] },
    inflammation: { title: "Inflammation", description: "Description à venir", causes: [], solutions: [], pathway: [] },
    fatigue: { title: "Fatigue chronique", description: "Description à venir", causes: [], solutions: [], pathway: [] }
  };
  
  const activeData = labData[activeCondition as keyof typeof labData];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero section avec style scientifique */}
        <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-r from-[#0A66C2] to-[#4CAF50]">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%">
              <pattern id="lab-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 15 0 L 15 30 M 0 15 L 30 15" stroke="white" strokeWidth="0.5" fill="none" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#lab-pattern)" />
            </svg>
          </div>
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center text-white">
              <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                <FlaskConical className="h-8 w-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-medium mb-6">
                Laboratoire des Solutions
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-10">
                Explorez les mécanismes scientifiques derrière les problèmes de santé courants 
                et découvrez des solutions naturelles fondées sur la recherche.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center">
                  <Database className="h-8 w-8 mb-3" />
                  <h3 className="font-medium">Basé sur la recherche</h3>
                  <p className="text-sm text-white/80">Études scientifiques à l'appui</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center">
                  <ZoomIn className="h-8 w-8 mb-3" />
                  <h3 className="font-medium">Mécanismes détaillés</h3>
                  <p className="text-sm text-white/80">Comprendre les causes profondes</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center">
                  <TestTube className="h-8 w-8 mb-3" />
                  <h3 className="font-medium">Solutions validées</h3>
                  <p className="text-sm text-white/80">Compléments et approches testés</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Section laboratoire interactive */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-12 gap-8">
            {/* Sidebar avec les conditions */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-xl border border-[#E0F2F1] shadow-sm p-5 sticky top-24">
                <h3 className="text-lg font-medium mb-4 text-[#0A66C2]">Explorer par condition</h3>
                <div className="space-y-2">
                  {conditions.map((condition) => (
                    <button
                      key={condition.id}
                      className={`w-full flex items-center p-3 rounded-lg text-left transition-colors ${
                        activeCondition === condition.id 
                          ? 'bg-gradient-to-r from-[#0A66C2]/10 to-[#4CAF50]/10 border-l-4 border-[#0A66C2]' 
                          : 'hover:bg-slate-50'
                      }`}
                      onClick={() => setActiveCondition(condition.id)}
                    >
                      <span className="mr-3">{condition.icon}</span>
                      <span className={activeCondition === condition.id ? 'font-medium' : ''}>
                        {condition.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Contenu principal */}
            <div className="md:col-span-9">
              <div className="bg-white rounded-xl border border-[#E0F2F1] shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-[#0A66C2]/5 to-[#4CAF50]/5 border-b border-[#E0F2F1] p-6">
                  <div className="flex items-start">
                    <div className="bg-gradient-to-r from-[#0A66C2] to-[#4CAF50] p-3 rounded-lg text-white mr-4">
                      {conditions.find(c => c.id === activeCondition)?.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-medium text-[#0A66C2] mb-2">{activeData.title}</h2>
                      <p className="text-muted-foreground">{activeData.description}</p>
                    </div>
                  </div>
                </div>
                
                <Tabs defaultValue="mecanismes" className="p-6">
                  <TabsList className="mb-6 bg-slate-100 p-1">
                    <TabsTrigger value="mecanismes" className="data-[state=active]:bg-white data-[state=active]:text-[#0A66C2]">
                      Mécanismes
                    </TabsTrigger>
                    <TabsTrigger value="solutions" className="data-[state=active]:bg-white data-[state=active]:text-[#0A66C2]">
                      Solutions
                    </TabsTrigger>
                    <TabsTrigger value="etudes" className="data-[state=active]:bg-white data-[state=active]:text-[#0A66C2]">
                      Études scientifiques
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="mecanismes" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-medium mb-4 flex items-center">
                        <Dna className="mr-2 h-5 w-5 text-[#0A66C2]" />
                        Causes physiologiques
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {activeData.causes.map((cause, i) => (
                          <Card key={i} className="border-[#E0F2F1]">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">{cause.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-muted-foreground">{cause.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                    
                    {activeData.pathway.length > 0 && (
                      <div>
                        <h3 className="text-xl font-medium mb-4 flex items-center">
                          <TestTube className="mr-2 h-5 w-5 text-[#0A66C2]" />
                          Voie physiologique
                        </h3>
                        <div className="bg-slate-50 rounded-lg p-6 relative">
                          <div className="flex flex-col items-center">
                            {activeData.pathway.map((step, i) => (
                              <div key={i} className="relative z-10">
                                <div className="bg-white border border-[#E0F2F1] rounded-lg p-4 mb-2 max-w-md shadow-sm">
                                  <h4 className="font-medium text-[#0A66C2]">{step.label}</h4>
                                </div>
                                {i < activeData.pathway.length - 1 && (
                                  <div className="flex justify-center mb-2">
                                    <div className="bg-[#4CAF50]/10 rounded px-3 py-1 text-sm text-[#4CAF50]">
                                      {step.connection}
                                    </div>
                                    <ArrowRight className="text-[#4CAF50] mx-1" />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="solutions" className="space-y-6">
                    <div className="grid gap-6">
                      {activeData.solutions.map((solution, i) => (
                        <div key={i} className="border border-[#E0F2F1] rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/4 bg-gradient-to-r from-[#0A66C2]/10 to-[#4CAF50]/10 p-6 flex flex-col justify-center items-center text-center">
                              <h3 className="text-xl font-medium text-[#0A66C2] mb-2">{solution.title}</h3>
                              <div className="relative w-24 h-24 my-3">
                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                  <circle cx="50" cy="50" r="45" fill="none" stroke="#E0E0E0" strokeWidth="10" />
                                  <circle 
                                    cx="50" 
                                    cy="50" 
                                    r="45" 
                                    fill="none" 
                                    stroke="url(#gradient)" 
                                    strokeWidth="10" 
                                    strokeDasharray={`${solution.efficacité * 2.83} 283`} 
                                    strokeDashoffset="0" 
                                    transform="rotate(-90 50 50)" 
                                  />
                                  <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                      <stop offset="0%" stopColor="#0A66C2" />
                                      <stop offset="100%" stopColor="#4CAF50" />
                                    </linearGradient>
                                  </defs>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-xl font-bold">{solution.efficacité}%</span>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">Efficacité</p>
                            </div>
                            <div className="p-6 md:w-3/4">
                              <p className="mb-4">{solution.description}</p>
                              <div className="mb-4">
                                <h4 className="font-medium text-sm text-muted-foreground mb-1">Dosage recommandé</h4>
                                <p className="bg-[#E0F2F1] inline-block px-3 py-1 rounded text-[#0A66C2]">{solution.dosage}</p>
                              </div>
                              <div>
                                <h4 className="font-medium text-sm text-muted-foreground mb-2">Études scientifiques</h4>
                                <ul className="space-y-2">
                                  {solution.études.map((etude, j) => (
                                    <li key={j} className="flex items-start">
                                      <ExternalLink className="h-4 w-4 text-[#0A66C2] mr-2 mt-1 flex-shrink-0" />
                                      <span className="text-sm">
                                        {etude.title}. <i>{etude.journal}</i>, {etude.year}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="etudes">
                    <div className="bg-slate-50 rounded-lg p-6">
                      <div className="bg-white border rounded-lg p-4 mb-6">
                        <div className="flex items-center text-[#0A66C2]">
                          <Database className="h-5 w-5 mr-2" />
                          <h3 className="font-medium">Recherche scientifique sur {activeData.title.toLowerCase()}</h3>
                        </div>
                        <p className="mt-2 text-muted-foreground">
                          Cette section présente une synthèse des publications scientifiques récentes concernant {activeData.title.toLowerCase()} et les solutions proposées.
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        {activeData.solutions.flatMap(solution => 
                          solution.études.map((etude, i) => (
                            <div key={i} className="border rounded-lg bg-white p-4 hover:shadow-sm transition-shadow">
                              <h4 className="font-medium mb-2">{etude.title}</h4>
                              <div className="flex flex-wrap gap-3 mb-2">
                                <Badge variant="outline" className="bg-[#E0F2F1] text-[#0A66C2]">{etude.journal}</Badge>
                                <Badge variant="outline" className="bg-[#E0F2F1] text-[#0A66C2]">{etude.year}</Badge>
                                <Badge variant="outline" className="bg-[#E0F2F1] text-[#0A66C2]">{solution.title}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">
                                Cette étude examine l'efficacité de {solution.title} dans le traitement de {activeData.title.toLowerCase()}.
                              </p>
                              <Button variant="outline" size="sm" className="text-[#0A66C2]" asChild>
                                <a href={etude.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                  <ExternalLink className="h-4 w-4 mr-1" />
                                  Consulter l'étude
                                </a>
                              </Button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call-to-action Instagram */}
        <section className="container mx-auto px-4 py-12">
          <InstagramCTA />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LaboSolutions;
