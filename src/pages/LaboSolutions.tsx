
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
import { 
  FlaskConical, 
  Brain, 
  Heart, 
  Dna, 
  TestTube, 
  ZoomIn, 
  Database, 
  ArrowRight, 
  ExternalLink,
  Lightbulb,
  MoveRight,
  BookOpen,
  MessageCircle,
  Search,
  BarChart2
} from "lucide-react";
import InstagramCTA from "@/components/InstagramCTA";

const LaboSolutions = () => {
  const [activeCondition, setActiveCondition] = useState("insomnie");
  const [showAnimation, setShowAnimation] = useState(false);

  // Animation pour les voies physiologiques
  const toggleAnimation = () => {
    setShowAnimation(!showAnimation);
  };

  const conditions = [
    { id: "insomnie", label: "Insomnie", icon: <Brain className="h-5 w-5 text-violet-600" /> },
    { id: "stress", label: "Stress chronique", icon: <Heart className="h-5 w-5 text-blue-600" /> },
    { id: "digestion", label: "Troubles digestifs", icon: <TestTube className="h-5 w-5 text-teal-600" /> },
    { id: "inflammation", label: "Inflammation", icon: <Dna className="h-5 w-5 text-emerald-600" /> },
    { id: "fatigue", label: "Fatigue chronique", icon: <FlaskConical className="h-5 w-5 text-cyan-600" /> }
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-violet-50/30">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero section avec style scientifique plus moderne */}
        <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-r from-violet-600 to-purple-500">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%">
              <pattern id="lab-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M25 0 L25 50 M0 25 L50 25" stroke="white" strokeWidth="0.5" fill="none" />
                <circle cx="25" cy="25" r="5" fill="white" fillOpacity="0.2" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#lab-pattern)" />
            </svg>
          </div>
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center text-white">
              <div className="inline-flex items-center justify-center p-3 bg-white/15 backdrop-blur-sm rounded-full mb-6 animate-pulse">
                <FlaskConical className="h-8 w-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-medium mb-6 animate-fadeIn">
                Laboratoire des Solutions
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-10 animate-fadeIn delay-100">
                Explorez les mécanismes scientifiques derrière les problèmes de santé courants 
                et découvrez des solutions naturelles fondées sur la recherche.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="bg-white/15 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center transform hover:scale-105 transition-transform duration-300 animate-fadeIn delay-200">
                  <Database className="h-8 w-8 mb-3" />
                  <h3 className="font-medium">Basé sur la recherche</h3>
                  <p className="text-sm text-white/80">Études scientifiques à l'appui</p>
                </div>
                
                <div className="bg-white/15 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center transform hover:scale-105 transition-transform duration-300 animate-fadeIn delay-300">
                  <ZoomIn className="h-8 w-8 mb-3" />
                  <h3 className="font-medium">Mécanismes détaillés</h3>
                  <p className="text-sm text-white/80">Comprendre les causes profondes</p>
                </div>
                
                <div className="bg-white/15 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center transform hover:scale-105 transition-transform duration-300 animate-fadeIn delay-400">
                  <TestTube className="h-8 w-8 mb-3" />
                  <h3 className="font-medium">Solutions validées</h3>
                  <p className="text-sm text-white/80">Compléments et approches testés</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Barre de recherche spéciale */}
        <section className="bg-white shadow-md py-6 relative -mt-8 rounded-t-3xl">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-full shadow-lg p-2 flex items-center">
              <div className="p-2 bg-violet-100 rounded-full mr-3">
                <Search className="h-5 w-5 text-violet-600" />
              </div>
              <input 
                type="text" 
                placeholder="Recherchez un symptôme ou une condition..." 
                className="flex-grow bg-transparent border-none focus:outline-none text-sm"
              />
              <Button variant="ghost" className="rounded-full h-9 px-4 text-violet-600 hover:bg-violet-50 hover:text-violet-700">
                Rechercher
              </Button>
            </div>
          </div>
        </section>
        
        {/* Section laboratoire interactive */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-12 gap-8">
            {/* Sidebar avec les conditions */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-xl border border-violet-100/50 shadow-md p-5 sticky top-24">
                <h3 className="text-lg font-medium mb-4 text-violet-700 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Explorer par condition
                </h3>
                <div className="space-y-2 mt-6">
                  {conditions.map((condition) => (
                    <button
                      key={condition.id}
                      className={`w-full flex items-center p-3 rounded-lg text-left transition-all duration-300 ${
                        activeCondition === condition.id 
                          ? 'bg-gradient-to-r from-violet-50 to-purple-50 border-l-4 border-violet-500 shadow-sm' 
                          : 'hover:bg-violet-50/50 border-l-4 border-transparent'
                      }`}
                      onClick={() => setActiveCondition(condition.id)}
                    >
                      <span className={`mr-3 ${activeCondition === condition.id ? 'text-violet-600' : 'text-slate-500'}`}>
                        {condition.icon}
                      </span>
                      <span className={activeCondition === condition.id ? 'font-medium text-violet-700' : 'text-slate-700'}>
                        {condition.label}
                      </span>
                    </button>
                  ))}
                </div>
                
                {/* Ajout d'un widget de statistiques rapides */}
                <div className="mt-8 pt-6 border-t border-violet-100">
                  <h4 className="text-sm font-medium mb-3 text-slate-700 flex items-center gap-2">
                    <BarChart2 className="h-4 w-4 text-violet-500" />
                    Statistiques rapides
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-violet-50 p-3 rounded-lg">
                      <p className="text-xs text-slate-600">Personnes concernées en France</p>
                      <p className="text-lg font-medium text-violet-800">1 sur 3</p>
                    </div>
                    <div className="bg-violet-50 p-3 rounded-lg">
                      <p className="text-xs text-slate-600">Âge moyen d'apparition</p>
                      <p className="text-lg font-medium text-violet-800">32 ans</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contenu principal */}
            <div className="md:col-span-9">
              <div className="bg-white rounded-xl border border-violet-100/50 shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-violet-50 to-purple-50 border-b border-violet-100 p-6">
                  <div className="flex items-start">
                    <div className="bg-gradient-to-r from-violet-600 to-purple-500 p-3 rounded-lg text-white mr-4 shadow-lg">
                      {conditions.find(c => c.id === activeCondition)?.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-medium text-violet-700 mb-2">{activeData.title}</h2>
                      <p className="text-slate-600">{activeData.description}</p>
                    </div>
                  </div>
                </div>
                
                <Tabs defaultValue="mecanismes" className="p-6">
                  <TabsList className="mb-6 bg-slate-100 p-1 rounded-lg">
                    <TabsTrigger 
                      value="mecanismes" 
                      className="data-[state=active]:bg-white data-[state=active]:text-violet-700 rounded-md"
                    >
                      <Dna className="mr-2 h-4 w-4" />
                      Mécanismes
                    </TabsTrigger>
                    <TabsTrigger 
                      value="solutions" 
                      className="data-[state=active]:bg-white data-[state=active]:text-violet-700 rounded-md"
                    >
                      <Lightbulb className="mr-2 h-4 w-4" />
                      Solutions
                    </TabsTrigger>
                    <TabsTrigger 
                      value="etudes" 
                      className="data-[state=active]:bg-white data-[state=active]:text-violet-700 rounded-md"
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Études scientifiques
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="mecanismes" className="space-y-6 animate-fadeIn">
                    <div>
                      <h3 className="text-xl font-medium mb-4 flex items-center text-violet-700">
                        <Dna className="mr-2 h-5 w-5 text-violet-600" />
                        Causes physiologiques
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {activeData.causes.map((cause, i) => (
                          <Card key={i} className="border-violet-100 hover:shadow-md transition-shadow">
                            <CardHeader className="pb-2 bg-gradient-to-r from-violet-50/50 to-transparent">
                              <CardTitle className="text-lg text-violet-700">{cause.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-slate-600">{cause.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                    
                    {activeData.pathway.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-medium flex items-center text-violet-700">
                            <TestTube className="mr-2 h-5 w-5 text-violet-600" />
                            Voie physiologique
                          </h3>
                          <Button 
                            variant="outline" 
                            onClick={toggleAnimation} 
                            size="sm"
                            className="text-violet-600 border-violet-200 hover:bg-violet-50"
                          >
                            {showAnimation ? "Pause" : "Animer"} le processus
                          </Button>
                        </div>
                        <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg p-6 relative">
                          <div className="flex flex-col items-center">
                            {activeData.pathway.map((step, i) => (
                              <div 
                                key={i} 
                                className={`relative z-10 transition-all duration-700 ${
                                  showAnimation ? (i === 0 ? 'opacity-100' : `opacity-${i < 2 ? '100' : '50'}`) 
                                  : 'opacity-100'
                                }`}
                                style={{
                                  transitionDelay: showAnimation ? `${i * 700}ms` : '0ms'
                                }}
                              >
                                <div className="bg-white border border-violet-100 rounded-lg p-4 mb-2 max-w-md shadow-md">
                                  <h4 className="font-medium text-violet-700">{step.label}</h4>
                                </div>
                                {i < activeData.pathway.length - 1 && (
                                  <div className="flex justify-center mb-2">
                                    <div className="bg-purple-100 rounded px-3 py-1 text-sm text-purple-600 flex items-center">
                                      {step.connection}
                                      <MoveRight className="text-purple-500 mx-1 animate-pulse" />
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="solutions" className="space-y-6 animate-fadeIn">
                    <div className="grid gap-6">
                      {activeData.solutions.map((solution, i) => (
                        <div 
                          key={i} 
                          className="border border-violet-100 rounded-xl overflow-hidden bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                        >
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/4 bg-gradient-to-r from-violet-50 to-purple-50 p-6 flex flex-col justify-center items-center text-center">
                              <h3 className="text-xl font-medium text-violet-700 mb-2">{solution.title}</h3>
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
                                    className="transition-all duration-1000"
                                  />
                                  <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                      <stop offset="0%" stopColor="#8B5CF6" />
                                      <stop offset="100%" stopColor="#6366F1" />
                                    </linearGradient>
                                  </defs>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-xl font-bold text-violet-700">{solution.efficacité}%</span>
                                </div>
                              </div>
                              <p className="text-sm text-slate-600">Efficacité</p>
                            </div>
                            <div className="p-6 md:w-3/4">
                              <p className="mb-4 text-slate-700">{solution.description}</p>
                              <div className="mb-4">
                                <h4 className="font-medium text-sm text-slate-500 mb-1">Dosage recommandé</h4>
                                <p className="bg-violet-50 inline-block px-3 py-1 rounded text-violet-700 font-medium">{solution.dosage}</p>
                              </div>
                              <div>
                                <h4 className="font-medium text-sm text-slate-500 mb-2">Études scientifiques</h4>
                                <ul className="space-y-2">
                                  {solution.études.map((etude, j) => (
                                    <li key={j} className="flex items-start">
                                      <ExternalLink className="h-4 w-4 text-violet-600 mr-2 mt-1 flex-shrink-0" />
                                      <span className="text-sm text-slate-700">
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
                  
                  <TabsContent value="etudes" className="animate-fadeIn">
                    <div className="bg-slate-50 rounded-lg p-6">
                      <div className="bg-white border rounded-lg p-4 mb-6">
                        <div className="flex items-center text-violet-700">
                          <Database className="h-5 w-5 mr-2" />
                          <h3 className="font-medium">Recherche scientifique sur {activeData.title.toLowerCase()}</h3>
                        </div>
                        <p className="mt-2 text-slate-600">
                          Cette section présente une synthèse des publications scientifiques récentes concernant {activeData.title.toLowerCase()} et les solutions proposées.
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        {activeData.solutions.flatMap(solution => 
                          solution.études.map((etude, i) => (
                            <div key={i} className="border rounded-lg bg-white p-4 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                              <h4 className="font-medium mb-2 text-violet-700">{etude.title}</h4>
                              <div className="flex flex-wrap gap-3 mb-2">
                                <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">{etude.journal}</Badge>
                                <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">{etude.year}</Badge>
                                <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">{solution.title}</Badge>
                              </div>
                              <p className="text-sm text-slate-600 mb-3">
                                Cette étude examine l'efficacité de {solution.title} dans le traitement de {activeData.title.toLowerCase()}.
                              </p>
                              <Button variant="outline" size="sm" className="text-violet-700 border-violet-200 hover:bg-violet-50" asChild>
                                <a href={etude.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                  <ExternalLink className="h-4 w-4 mr-1" />
                                  Consulter l'étude
                                </a>
                              </Button>
                            </div>
                          ))
                        )}
                      </div>
                      
                      {/* Nouvelle section pour poser des questions */}
                      <div className="mt-8 p-5 bg-gradient-to-r from-violet-100/50 to-purple-100/50 rounded-lg border border-violet-200">
                        <div className="flex items-start gap-4">
                          <div className="bg-white p-3 rounded-full shadow-sm">
                            <MessageCircle className="h-6 w-6 text-violet-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-violet-700 mb-1">Des questions sur cette recherche?</h4>
                            <p className="text-sm text-slate-600 mb-3">
                              Notre équipe scientifique peut répondre à vos interrogations concernant ces études et leurs implications.
                            </p>
                            <Button size="sm" className="bg-violet-600 hover:bg-violet-700 text-white">
                              Poser une question
                            </Button>
                          </div>
                        </div>
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
