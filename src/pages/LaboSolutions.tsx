
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { 
  Beaker, Search, Dna, Microscope, ChevronRight, ArrowUpRight, 
  GraduationCap, BookOpen, FileText, Award, FlaskConical, Leaf, 
  PieChart, Calculator, BarChart, Clock, Users, Star, CheckCircle2,
  Brain, ChevronDown, Filter, Heart, Activity, ThumbsUp, LayoutGrid,
  RefreshCw, ShieldCheck, VoteIcon, Sparkles, ExternalLink, UserRound,
  Download, Info
} from 'lucide-react';
import { 
  ClipboardList, ClipboardCheck, BarChart4, Factory, 
  Apple, PuzzlePiece, Lightbulb, List 
} from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";
import LabIntro from '@/components/LabIntro';
import { StudyData, studyData } from '@/components/labo/StudyData';
import { IngredientCard } from '@/components/labo/IngredientCard';
import { PublicationCard } from '@/components/labo/PublicationCard';
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";

// Nouvel ensemble de données d'ingrédients
const ingredientsData = [
  {
    id: 1,
    name: "Ashwagandha",
    scientificName: "Withania somnifera",
    description: "Adaptogène ayant démontré des effets significatifs sur la réduction du stress et de l'anxiété, particulièrement efficace pour améliorer la résilience au stress quotidien.",
    benefits: [
      "Réduction du cortisol (hormone du stress)",
      "Amélioration des fonctions cognitives",
      "Soutien du système immunitaire",
      "Augmentation de l'énergie et de l'endurance"
    ],
    activeCompounds: ["Withanolides", "Alcaloïdes", "Glycoprotéines"],
    dosage: "300-600mg par jour d'extrait standardisé",
    imageUrl: "/ashwagandha.jpg",
    category: "Adaptogènes"
  },
  {
    id: 2,
    name: "Curcuma",
    scientificName: "Curcuma longa",
    description: "Épice aux puissantes propriétés anti-inflammatoires et antioxydantes, utilisée depuis des millénaires dans la médecine ayurvédique et la cuisine traditionnelle.",
    benefits: [
      "Réduction de l'inflammation chronique",
      "Protection cellulaire contre le stress oxydatif",
      "Soutien de la santé articulaire",
      "Amélioration de la digestion"
    ],
    activeCompounds: ["Curcumine", "Déméthoxycurcumine", "Bisdeméthoxycurcumine"],
    dosage: "500-1000mg par jour avec de la pipérine pour l'absorption",
    imageUrl: "/curcuma.jpg",
    category: "Anti-inflammatoires"
  },
  {
    id: 3,
    name: "Spiruline",
    scientificName: "Arthrospira platensis",
    description: "Algue bleue-verte reconnue comme super-aliment riche en nutriments essentiels, contenant une concentration exceptionnelle de protéines, vitamines et minéraux.",
    benefits: [
      "Source complète de protéines végétales",
      "Riche en antioxydants (phycocyanine)",
      "Soutien du système immunitaire",
      "Détoxification naturelle"
    ],
    activeCompounds: ["Phycocyanine", "Chlorophylle", "Polysaccharides"],
    dosage: "3-5g par jour en poudre ou comprimés",
    imageUrl: "/spiruline.jpg",
    category: "Super-aliments"
  },
  {
    id: 4,
    name: "Rhodiola",
    scientificName: "Rhodiola rosea",
    description: "Adaptogène nordique qui améliore la résistance au stress et combat la fatigue, traditionnellement utilisé pour augmenter l'endurance physique et mentale.",
    benefits: [
      "Réduction de la fatigue mentale",
      "Amélioration des performances cognitives",
      "Équilibre des neurotransmetteurs",
      "Optimisation de la récupération après l'effort"
    ],
    activeCompounds: ["Rosavines", "Salidroside", "Rosines"],
    dosage: "200-600mg par jour d'extrait standardisé",
    imageUrl: "/rhodiola.jpg",
    category: "Adaptogènes"
  },
  {
    id: 5,
    name: "Magnésium",
    scientificName: "Mg",
    description: "Minéral essentiel impliqué dans plus de 300 réactions enzymatiques dans l'organisme, fondamental pour la santé nerveuse, musculaire et le métabolisme énergétique.",
    benefits: [
      "Relaxation musculaire et nerveuse",
      "Soutien du métabolisme énergétique",
      "Amélioration de la qualité du sommeil",
      "Régulation du rythme cardiaque"
    ],
    activeCompounds: ["Magnésium bisglycinate", "Magnésium citrate", "Magnésium malate"],
    dosage: "300-400mg par jour, idéalement en forme chélatée",
    imageUrl: "/magnesium.jpg",
    category: "Minéraux essentiels"
  },
  {
    id: 6,
    name: "Bacopa Monnieri",
    scientificName: "Bacopa monnieri",
    description: "Plante adaptogène reconnue pour ses propriétés nootropiques et sa capacité à améliorer les fonctions cognitives, la mémoire et la concentration.",
    benefits: [
      "Amélioration de la mémoire à court et long terme",
      "Soutien de la concentration et clarté mentale",
      "Réduction du stress et de l'anxiété",
      "Protection neuronale"
    ],
    activeCompounds: ["Bacosides", "Flavonoïdes", "Saponines"],
    dosage: "300-450mg par jour d'extrait standardisé à 50% de bacosides",
    imageUrl: "/bacopa.jpg",
    category: "Nootropiques"
  }
];

// Nouvelles données de publications
const publicationsData = [
  {
    id: 1,
    title: "Effets des polyphénols sur les marqueurs inflammatoires : une revue systématique",
    authors: "Dupont M, Martin S, et al.",
    journal: "Journal of Nutritional Biochemistry",
    year: "2023",
    type: "Revue systématique",
    abstract: "Cette revue examine l'impact des différents polyphénols végétaux sur les biomarqueurs de l'inflammation systémique et locale, démontrant des effets significatifs sur la réduction des cytokines pro-inflammatoires.",
    doi: "10.1016/j.jnutbio.2023.08.015"
  },
  {
    id: 2,
    title: "Mécanismes moléculaires des adaptogènes dans la modulation du stress oxydatif",
    authors: "Lefevre N, Rousseau P, et al.",
    journal: "Phytomedicine",
    year: "2022",
    type: "Article original",
    abstract: "Cette recherche identifie les voies de signalisation cellulaire impliquées dans l'effet protecteur des adaptogènes contre le stress oxydatif, avec un focus particulier sur l'activation de Nrf2 et la régulation des enzymes antioxydantes.",
    doi: "10.1016/j.phymed.2022.05.007"
  },
  {
    id: 3,
    title: "Impact de la supplémentation en zinc sur la fonction immune des adultes séniors",
    authors: "Bernard C, Nguyen T, et al.",
    journal: "European Journal of Clinical Nutrition",
    year: "2022",
    type: "Essai clinique",
    abstract: "Cet essai randomisé démontre l'effet d'une supplémentation optimisée en zinc sur plusieurs paramètres de l'immunité chez les personnes âgées de plus de 65 ans, révélant une amélioration significative de la fonction des cellules T et de la production d'anticorps.",
    doi: "10.1038/s41430-022-1157-8"
  },
  {
    id: 4,
    title: "Biodisponibilité comparée de différentes formes de magnésium",
    authors: "Lambert A, Schmidt B, et al.",
    journal: "Journal of Trace Elements in Medicine and Biology",
    year: "2021",
    type: "Étude comparative",
    abstract: "Cette étude compare la biodisponibilité et l'absorption de cinq formes différentes de magnésium, avec un focus particulier sur les effets neurophysiologiques et la capacité à traverser la barrière hémato-encéphalique.",
    doi: "10.1016/j.jtemb.2021.03.012"
  },
  {
    id: 5,
    title: "Effets synergiques de la combinaison curcumine-pipérine sur l'inflammation articulaire",
    authors: "Moreau F, Klein P, et al.",
    journal: "Journal of Functional Foods",
    year: "2023",
    type: "Essai clinique",
    abstract: "Cette étude clinique randomisée évalue l'efficacité d'une formulation optimisée de curcumine et pipérine sur les marqueurs inflammatoires et la mobilité articulaire chez des sujets souffrant d'arthrose légère à modérée.",
    doi: "10.1016/j.jff.2023.02.009"
  },
  {
    id: 6,
    title: "Impact du microbiote intestinal sur l'efficacité des compléments alimentaires",
    authors: "Richter M, Dubois E, et al.",
    journal: "Gut Microbiome Research",
    year: "2023",
    type: "Revue critique",
    abstract: "Cette analyse critique explore comment la composition du microbiote intestinal peut influencer significativement l'absorption et l'efficacité de différents compléments alimentaires, suggérant des approches personnalisées basées sur le profil microbien.",
    doi: "10.3390/microbiome2023.01.002"
  }
];

// Nouveaux tags pour le filtre de recherche
const searchTags = [
  { name: 'Stress', icon: <Brain className="h-3 w-3 mr-1" /> },
  { name: 'Sommeil', icon: <Clock className="h-3 w-3 mr-1" /> },
  { name: 'Inflammation', icon: <Activity className="h-3 w-3 mr-1" /> },
  { name: 'Énergie', icon: <Sparkles className="h-3 w-3 mr-1" /> },
  { name: 'Immunité', icon: <ShieldCheck className="h-3 w-3 mr-1" /> },
  { name: 'Mémoire', icon: <Brain className="h-3 w-3 mr-1" /> },
  { name: 'Articulations', icon: <Activity className="h-3 w-3 mr-1" /> },
  { name: 'Digestion', icon: <Activity className="h-3 w-3 mr-1" /> }
];

// Fausse fonction pour simuler l'envoi d'un email
const subscribeToNewsletter = (email) => {
  // Dans une vraie application, nous enverrions cette donnée à un serveur
  console.log("Email souscrit:", email);
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 1000);
  });
};

const LaboSolutions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStudy, setActiveStudy] = useState<StudyData | null>(null);
  const [showStudyDetails, setShowStudyDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('etudes');
  const [isLoading, setIsLoading] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [filteredIngredients, setFilteredIngredients] = useState(ingredientsData);
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [activeView, setActiveView] = useState('grid');
  const [animateHero, setAnimateHero] = useState(false);

  useEffect(() => {
    // Animation pour le hero section
    setAnimateHero(true);
    
    // Pour simuler un chargement initial des données
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  // Filtrer les études en fonction de la recherche
  const filteredStudies = searchQuery 
    ? studyData.filter(study => 
        study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        study.keyFindings.some(finding => finding.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : studyData;

  // Gérer le clic sur une étude
  const handleViewStudy = (study: StudyData) => {
    setActiveStudy(study);
    setShowStudyDetails(true);
    
    // Notification de succès
    toast({
      title: "Étude sélectionnée",
      description: "Vous consultez maintenant l'étude détaillée.",
    });
  };
  
  // Fermer les détails d'une étude
  const handleCloseStudyDetails = () => {
    setShowStudyDetails(false);
  };
  
  // Filtrer les ingrédients par catégorie
  useEffect(() => {
    if (activeCategory === 'Tous') {
      setFilteredIngredients(ingredientsData);
    } else {
      setFilteredIngredients(
        ingredientsData.filter(ingredient => ingredient.category === activeCategory)
      );
    }
  }, [activeCategory]);

  // Gérer la souscription à la newsletter
  const handleSubscribe = async () => {
    if (!emailInput || !emailInput.includes('@')) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez entrer une adresse email valide.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      await subscribeToNewsletter(emailInput);
      toast({
        title: "Inscription réussie!",
        description: "Vous recevrez bientôt nos dernières études et découvertes scientifiques.",
      });
      setEmailInput('');
    } catch (error) {
      toast({
        title: "Erreur lors de l'inscription",
        description: "Veuillez réessayer ultérieurement.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Gérer le clic sur un tag de recherche
  const handleTagClick = (tag) => {
    setSearchQuery(tag);
    
    // Notification visuelle
    toast({
      title: "Filtre appliqué",
      description: `Recherche filtrée par "${tag}"`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section avec animation et gradients améliorés */}
        <section className={`relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-natural-700 via-natural-600 to-natural-500 transition-all duration-700 ${animateHero ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-grid-white/5 bg-[size:32px_32px]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-natural-800/30"></div>
          
          {/* Cercles décoratifs animés */}
          <div className="absolute top-10 right-10 w-64 h-64 bg-natural-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-natural-300/20 rounded-full blur-3xl animate-pulse delay-300"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full backdrop-blur-sm mb-6 animate-slideUp">
                <FlaskConical className="h-6 w-6 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6 animate-slideUp delay-100">
                Laboratoire Natural Solutions
              </h1>
              <p className="text-natural-50 text-lg md:text-xl mb-8 leading-relaxed animate-slideUp delay-200">
                Explorez les avancées scientifiques derrière nos solutions naturelles, validées par 
                <span className="bg-natural-400/20 px-2 py-0.5 rounded mx-1">des études cliniques</span> rigoureuses.
              </p>
              <div className="relative max-w-xl mx-auto mb-8 animate-slideUp delay-300">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-natural-500" />
                </div>
                <Input
                  type="text"
                  placeholder="Rechercher des nutriments, études ou pathologies..."
                  className="bg-white/90 backdrop-blur-sm border-transparent pl-10 py-6 text-base shadow-lg focus:bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-natural-400"
                      onClick={() => setSearchQuery('')}
                    >
                      ×
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 justify-center animate-slideUp delay-400">
                {searchTags.map((tag) => (
                  <Button 
                    key={tag.name} 
                    variant="outline"
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30 text-xs flex items-center"
                    onClick={() => handleTagClick(tag.name)}
                  >
                    {tag.icon}
                    {tag.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Introduction du Labo avec style amélioré */}
        <section className="py-12 md:py-20 bg-gradient-to-b from-natural-50 to-white">
          <div className="container mx-auto px-4">
            <LabIntro />
            
            {/* Section de newsletter */}
            <div className="mt-12 max-w-3xl mx-auto p-6 bg-natural-100 rounded-xl border border-natural-200 shadow-sm">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-left space-y-2">
                  <h3 className="text-lg font-medium text-natural-800 flex items-center gap-2">
                    <Beaker className="h-5 w-5 text-natural-600" />
                    Recevez nos dernières études
                  </h3>
                  <p className="text-sm text-natural-600">
                    Inscrivez-vous pour recevoir en avant-première nos publications scientifiques et découvertes.
                  </p>
                </div>
                <div className="flex w-full md:w-auto gap-2">
                  <Input
                    type="email"
                    placeholder="Votre email"
                    className="max-w-xs"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                  />
                  <Button 
                    className="bg-natural-700 hover:bg-natural-800"
                    onClick={handleSubscribe}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      "S'inscrire"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Onglets Principaux avec design amélioré */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <Tabs 
              defaultValue="etudes" 
              className="max-w-5xl mx-auto"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <div className="flex justify-center mb-8">
                <TabsList className="bg-natural-100 p-1">
                  <TabsTrigger 
                    value="etudes" 
                    className="data-[state=active]:bg-white data-[state=active]:text-natural-800 data-[state=active]:shadow-sm"
                  >
                    <Microscope className="h-4 w-4 mr-2" />
                    Études Cliniques
                  </TabsTrigger>
                  <TabsTrigger 
                    value="ingredients" 
                    className="data-[state=active]:bg-white data-[state=active]:text-natural-800 data-[state=active]:shadow-sm"
                  >
                    <Beaker className="h-4 w-4 mr-2" />
                    Ingrédients Actifs
                  </TabsTrigger>
                  <TabsTrigger 
                    value="processus" 
                    className="data-[state=active]:bg-white data-[state=active]:text-natural-800 data-[state=active]:shadow-sm"
                  >
                    <Dna className="h-4 w-4 mr-2" />
                    Processus R&D
                  </TabsTrigger>
                  <TabsTrigger 
                    value="publications" 
                    className="data-[state=active]:bg-white data-[state=active]:text-natural-800 data-[state=active]:shadow-sm"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Publications
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Contenu de l'onglet Études Cliniques */}
              <TabsContent value="etudes" className="space-y-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="font-display text-2xl text-natural-800">
                    Études Cliniques <span className="text-sm text-natural-500 font-normal ml-2">({filteredStudies.length} résultats)</span>
                  </h2>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs border-natural-200"
                    >
                      <Filter className="h-3 w-3 mr-1" />
                      Filtrer
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs border-natural-200 bg-natural-50"
                    >
                      Récentes
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
                
                {/* Indicateur de chargement */}
                {isLoading && (
                  <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-natural-600"></div>
                  </div>
                )}
                
                {/* Affichage conditionnel pour les détails d'étude */}
                {showStudyDetails && activeStudy && (
                  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
                    <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white shadow-xl">
                      <CardHeader className="bg-natural-50 border-b border-natural-100 sticky top-0 z-10">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl font-medium">{activeStudy.title}</CardTitle>
                            <CardDescription className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {activeStudy.authors} ({activeStudy.year})
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            {activeStudy.tags.map(tag => (
                              <Badge key={tag} variant="natural" className="text-xs font-medium px-2 py-1">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-5 space-y-6">
                        <div>
                          <h3 className="font-medium text-natural-800 mb-2 flex items-center gap-2">
                            <FileText className="h-4 w-4 text-natural-500" />
                            Résumé de l'étude
                          </h3>
                          <p className="text-natural-600 bg-natural-50 p-4 rounded-lg border-l-2 border-natural-300">{activeStudy.description}</p>
                        </div>
                        
                        <div>
                          <h3 className="font-medium text-natural-800 mb-2 flex items-center gap-2">
                            <ClipboardList className="h-4 w-4 text-natural-500" />
                            Méthodologie
                          </h3>
                          <p className="text-natural-600 mb-2">{activeStudy.methodology}</p>
                          <div className="flex flex-wrap gap-4 mt-3">
                            <div className="bg-natural-50 p-3 rounded-lg flex-1 min-w-[150px] border border-natural-100">
                              <div className="text-xs uppercase text-natural-500 font-medium flex items-center gap-1">
                                <Users className="h-3 w-3" /> Participants
                              </div>
                              <div className="text-lg font-medium text-natural-800">{activeStudy.participants}</div>
                            </div>
                            <div className="bg-natural-50 p-3 rounded-lg flex-1 min-w-[150px] border border-natural-100">
                              <div className="text-xs uppercase text-natural-500 font-medium flex items-center gap-1">
                                <Clock className="h-3 w-3" /> Durée
                              </div>
                              <div className="text-lg font-medium text-natural-800">{activeStudy.duration}</div>
                            </div>
                            <div className="bg-natural-50 p-3 rounded-lg flex-1 min-w-[150px] border border-natural-100">
                              <div className="text-xs uppercase text-natural-500 font-medium flex items-center gap-1">
                                <ClipboardCheck className="h-3 w-3" /> Type d'étude
                              </div>
                              <div className="text-lg font-medium text-natural-800">{activeStudy.studyType}</div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium text-natural-800 mb-2 flex items-center gap-2">
                            <Star className="h-4 w-4 text-natural-500" />
                            Résultats clés
                          </h3>
                          <ul className="space-y-2 text-natural-600">
                            {activeStudy.keyFindings.map((finding, index) => (
                              <li key={index} className="flex items-start gap-2 bg-natural-50 p-2 rounded-lg border border-natural-100">
                                <CheckCircle2 className="h-4 w-4 text-natural-500 mt-0.5 flex-shrink-0" />
                                <span>{finding}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {activeStudy.charts && (
                          <div>
                            <h3 className="font-medium text-natural-800 mb-2 flex items-center gap-2">
                              <BarChart4 className="h-4 w-4 text-natural-500" />
                              Données statistiques
                            </h3>
                            <div className="flex items-center justify-center p-4 bg-natural-50 rounded-lg border border-natural-100">
                              <BarChart className="h-40 w-full text-natural-400" />
                              <p className="text-xs text-natural-500 mt-2 text-center">
                                Visualisation des données (cliquez pour voir le détail)
                              </p>
                            </div>
                          </div>
                        )}

                        <div className="border-t border-natural-100 pt-4 flex justify-between items-center">
                          {activeStudy.doi && (
                            <a 
                              href={`https://doi.org/${activeStudy.doi}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-natural-600 hover:text-natural-800 flex items-center text-sm group"
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              DOI: {activeStudy.doi}
                              <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                          )}
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              onClick={handleCloseStudyDetails}
                              className="border-natural-200"
                            >
                              Fermer
                            </Button>
                            <Button 
                              variant="default"
                              className="bg-natural-600 hover:bg-natural-700"
                            >
                              Télécharger PDF
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                
                {/* Liste d'études avec style amélioré */}
                {!isLoading && filteredStudies.length > 0 ? (
                  <div className="space-y-5">
                    {filteredStudies.map((study) => (
                      <Card 
                        key={study.id} 
                        className="overflow-hidden hover:shadow-md transition-shadow group border-natural-200 hover:border-natural-300"
                      >
                        <CardHeader className="bg-gradient-to-r from-natural-50 to-white border-b border-natural-100 pb-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg font-medium text-natural-800 group-hover:text-natural-600 transition-colors">{study.title}</CardTitle>
                              <CardDescription className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {study.authors} ({study.year})
                              </CardDescription>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {study.tags.map(tag => (
                                <Badge 
                                  key={tag} 
                                  variant="outline"
                                  className="bg-white/80 text-natural-700 text-xs font-medium px-2 py-0.5 border-natural-200"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-5">
                          <div className="space-y-3 text-concise">
                            <p className="text-sm text-natural-600 line-clamp-2">{study.description}</p>
                            <div className="flex flex-col md:flex-row gap-4 mt-2">
                              <div className="bg-natural-50 p-3 rounded-lg flex-1 border border-natural-100">
                                <div className="text-xs uppercase text-natural-500 font-medium mb-1">Points clés</div>
                                <ul className="space-y-2">
                                  {study.keyFindings.slice(0, 2).map((finding, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-natural-700">
                                      <CheckCircle2 className="h-3 w-3 text-natural-500 mt-1 flex-shrink-0" />
                                      <span>{finding}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="flex flex-col gap-2 justify-between md:w-1/3">
                                <div className="flex gap-2">
                                  <div className="bg-natural-50 p-2 rounded-lg flex-1 text-center border border-natural-100">
                                    <div className="text-xs text-natural-500 mb-1">Participants</div>
                                    <div className="font-medium text-natural-700">{study.participants}</div>
                                  </div>
                                  <div className="bg-natural-50 p-2 rounded-lg flex-1 text-center border border-natural-100">
                                    <div className="text-xs text-natural-500 mb-1">Durée</div>
                                    <div className="font-medium text-natural-700">{study.duration}</div>
                                  </div>
                                </div>
                                <Button 
                                  variant="default" 
                                  size="sm" 
                                  className="bg-natural-600 hover:bg-natural-700 mt-auto self-end"
                                  onClick={() => handleViewStudy(study)}
                                >
                                  <span>Voir l'étude</span>
                                  <ArrowUpRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : !isLoading && (
                  <div className="text-center py-12 bg-natural-50 rounded-lg border border-natural-100">
                    <div className="inline-flex items-center justify-center p-3 bg-white rounded-full mb-4 shadow-sm">
                      <Search className="h-5 w-5 text-natural-400" />
                    </div>
                    <p className="text-natural-500 mb-4">Aucune étude ne correspond à votre recherche.</p>
                    <Button 
                      variant="outline" 
                      className="border-natural-200" 
                      onClick={() => setSearchQuery('')}
                    >
                      Réinitialiser la recherche
                    </Button>
                  </div>
                )}
                
                <div className="text-center pt-6">
                  <Button 
                    variant="outline" 
                    className="border-natural-200 text-natural-700 hover:bg-natural-50 bg-white group"
                  >
                    <span>Voir toutes les études</span>
                    <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </div>
              </TabsContent>

              {/* Contenu de l'onglet Ingrédients */}
              <TabsContent value="ingredients" className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-display text-2xl text-natural-800">Ingrédients Clés</h2>
                  
                  <div className="flex items-center gap-2">
                    <div className="bg-natural-50 rounded-lg p-1 border border-natural-100 flex">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`p-1 h-8 w-8 ${activeView === 'grid' ? 'bg-white shadow-sm' : ''}`}
                        onClick={() => setActiveView('grid')}
                      >
                        <LayoutGrid className="h-4 w-4 text-natural-700" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`p-1 h-8 w-8 ${activeView === 'list' ? 'bg-white shadow-sm' : ''}`}
                        onClick={() => setActiveView('list')}
                      >
                        <List className="h-4 w-4 text-natural-700" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8 overflow-x-auto pb-2">
                  <div className="flex gap-2 min-w-max">
                    <Button 
                      variant={activeCategory === 'Tous' ? 'default' : 'outline'}
                      size="sm"
                      className={activeCategory === 'Tous' ? 'bg-natural-600 hover:bg-natural-700' : 'border-natural-200'}
                      onClick={() => setActiveCategory('Tous')}
                    >
                      Tous
                    </Button>
                    {['Adaptogènes', 'Anti-inflammatoires', 'Super-aliments', 'Nootropiques', 'Minéraux essentiels'].map(category => (
                      <Button 
                        key={category}
                        variant={activeCategory === category ? 'default' : 'outline'}
                        size="sm"
                        className={activeCategory === category ? 'bg-natural-600 hover:bg-natural-700' : 'border-natural-200'}
                        onClick={() => setActiveCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className={activeView === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
                  {filteredIngredients.map((ingredient) => (
                    <IngredientCard 
                      key={ingredient.id}
                      name={ingredient.name}
                      scientificName={ingredient.scientificName}
                      description={ingredient.description}
                      benefits={ingredient.benefits}
                      activeCompounds={ingredient.activeCompounds}
                      dosage={ingredient.dosage}
                      imageUrl={ingredient.imageUrl}
                    />
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-gradient-to-r from-natural-50 to-white rounded-xl border border-natural-200 shadow-sm">
                  <h3 className="font-medium text-natural-800 mb-4 text-center flex items-center justify-center gap-2">
                    <Beaker className="h-5 w-5 text-natural-600" />
                    Notre approche des ingrédients
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-natural-100 hover:border-natural-300 transition-colors">
                      <div className="flex items-center mb-2">
                        <div className="p-2 bg-natural-50 rounded-full mr-3">
                          <Microscope className="h-4 w-4 text-natural-600" />
                        </div>
                        <h4 className="font-medium">Analyse scientifique</h4>
                      </div>
                      <p className="text-sm text-natural-600">Nous étudions les mécanismes d'action et les synergies potentielles entre différents composés actifs.</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-natural-100 hover:border-natural-300 transition-colors">
                      <div className="flex items-center mb-2">
                        <div className="p-2 bg-natural-50 rounded-full mr-3">
                          <Leaf className="h-4 w-4 text-natural-600" />
                        </div>
                        <h4 className="font-medium">Sourcing éthique</h4>
                      </div>
                      <p className="text-sm text-natural-600">Nos ingrédients proviennent de cultures durables, écologiques et sans OGM, avec traçabilité complète.</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-natural-100 hover:border-natural-300 transition-colors">
                      <div className="flex items-center mb-2">
                        <div className="p-2 bg-natural-50 rounded-full mr-3">
                          <Calculator className="h-4 w-4 text-natural-600" />
                        </div>
                        <h4 className="font-medium">Dosage optimal</h4>
                      </div>
                      <p className="text-sm text-natural-600">Chaque ingrédient est dosé selon les données cliniques démontrant son efficacité et sa sécurité.</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Contenu de l'onglet Processus R&D */}
              <TabsContent value="processus" className="space-y-6">
                <h2 className="font-display text-2xl text-natural-800 text-center mb-6">Notre Processus R&D</h2>
                
                <div className="bg-gradient-to-b from-natural-50 to-white rounded-xl p-6 border border-natural-200 shadow-sm">
                  <ol className="relative border-l border-natural-300">
                    {[
                      { 
                        title: "Identification des besoins", 
                        desc: "Identification des problématiques de santé à partir de données épidémiologiques et des retours de notre communauté.",
                        details: "Notre équipe scientifique analyse les données épidémiologiques récentes, les enquêtes de santé publique et les retours de notre communauté pour identifier les besoins les plus pertinents.",
                        icon: <Search className="h-5 w-5 text-white" />
                      },
                      { 
                        title: "Recherche bibliographique", 
                        desc: "Analyse approfondie de la littérature scientifique récente sur les actifs naturels pertinents.",
                        details: "Notre équipe de chercheurs examinent plus de 500 publications scientifiques par mois, en se concentrant sur les études cliniques, revues systématiques et méta-analyses publiées dans des journaux à comité de lecture.",
                        icon: <BookOpen className="h-5 w-5 text-white" />
                      },
                      { 
                        title: "Développement de formules", 
                        desc: "Création de formulations synergiques basées sur l'efficacité et la biodisponibilité optimales.",
                        details: "Nous combinons des actifs qui agissent sur différentes voies métaboliques pour obtenir un effet synergique, tout en prenant en compte les interactions potentielles, la stabilité et la biodisponibilité des composés.",
                        icon: <Beaker className="h-5 w-5 text-white" />
                      },
                      { 
                        title: "Tests in vitro", 
                        desc: "Évaluation préliminaire de l'efficacité et de la sécurité des formulations en laboratoire.",
                        details: "Nous utilisons des modèles cellulaires et des techniques d'analyse avancées pour évaluer l'activité biologique, la toxicité potentielle et les mécanismes d'action de nos formulations.",
                        icon: <FlaskConical className="h-5 w-5 text-white" />
                      },
                      { 
                        title: "Essais cliniques pilotes", 
                        desc: "Tests sur petits groupes de volontaires pour valider l'efficacité et affiner les formulations.",
                        details: "Ces essais préliminaires nous permettent d'ajuster les dosages, d'identifier les biomarqueurs pertinents et de confirmer l'absence d'effets indésirables avant les études à plus grande échelle.",
                        icon: <Users className="h-5 w-5 text-white" />
                      },
                      { 
                        title: "Études cliniques", 
                        desc: "Validation scientifique par études contrôlées réalisées par des laboratoires indépendants.",
                        details: "Nos formulations sont testées dans des études cliniques randomisées en double aveugle contre placebo, menées par des établissements de recherche indépendants pour garantir l'objectivité des résultats.",
                        icon: <ClipboardCheck className="h-5 w-5 text-white" />
                      },
                      { 
                        title: "Production", 
                        desc: "Fabrication selon les normes les plus strictes avec contrôle qualité rigoureux à chaque étape.",
                        details: "Nos produits sont fabriqués dans des installations certifiées GMP (Good Manufacturing Practices) avec traçabilité complète, tests de pureté et d'activité sur chaque lot.",
                        icon: <Factory className="h-5 w-5 text-white" />
                      }
                    ].map((step, index) => (
                      <li key={index} className="mb-8 ml-6">
                        <span className="absolute flex items-center justify-center w-10 h-10 bg-natural-600 rounded-full -left-5 ring-4 ring-white text-white shadow-sm">
                          {step.icon}
                        </span>
                        <h3 className="font-medium text-natural-800 mb-1 flex items-center">
                          {step.title}
                          <Badge variant="outline" className="ml-2 bg-natural-50 text-natural-500 border-natural-200">
                            Étape {index + 1}
                          </Badge>
                        </h3>
                        <p className="text-sm text-natural-600 mb-2">{step.desc}</p>
                        <div className="bg-white p-3 rounded-lg text-xs text-natural-500 mt-2 border border-natural-100 hover:border-natural-300 transition-colors shadow-sm">
                          {step.details}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
                
                <div className="bg-natural-100 rounded-xl p-6 mt-8 border border-natural-200">
                  <h3 className="font-medium text-natural-800 mb-6 text-center flex items-center justify-center gap-2">
                    <GraduationCap className="h-5 w-5 text-natural-600" />
                    Notre équipe scientifique
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { role: "Directeur Scientifique", specialite: "Pharmacologie", icon: <GraduationCap className="h-6 w-6 text-natural-500" /> },
                      { role: "Biochimiste", specialite: "Métabolisme cellulaire", icon: <Dna className="h-6 w-6 text-natural-500" /> },
                      { role: "Phytothérapeute", specialite: "Pharmacognosie", icon: <Leaf className="h-6 w-6 text-natural-500" /> },
                      { role: "Nutritionniste", specialite: "Micronutrition", icon: <Apple className="h-6 w-6 text-natural-500" /> },
                    ].map((membre, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg text-center border border-natural-100 hover:border-natural-300 hover:shadow-md transition-all group">
                        <div className="w-16 h-16 bg-natural-50 rounded-full mx-auto mb-3 flex items-center justify-center group-hover:bg-natural-100 transition-colors">
                          {membre.icon}
                        </div>
                        <h4 className="font-medium text-natural-800">{membre.role}</h4>
                        <p className="text-xs text-natural-500">{membre.specialite}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Contenu de l'onglet Publications */}
              <TabsContent value="publications" className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-display text-2xl text-natural-800">Publications Scientifiques</h2>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs border-natural-200"
                    >
                      <Filter className="h-3 w-3 mr-1" />
                      Filtrer
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs border-natural-200 bg-natural-50"
                    >
                      Récentes
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex gap-3 mb-8 overflow-x-auto p-2 -mx-2">
                  {['Toutes', 'Revues à comité', 'Abstracts', 'Articles', 'Conférences'].map((category, index) => (
                    <Button 
                      key={category} 
                      variant={index === 0 ? 'default' : 'outline'}
                      size="sm"
                      className={index === 0 ? 'bg-natural-700' : 'border-natural-200'}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
                
                <div className="space-y-5">
                  {publicationsData.map((publication) => (
                    <PublicationCard
                      key={publication.id}
                      title={publication.title}
                      authors={publication.authors}
                      journal={publication.journal}
                      year={publication.year}
                      type={publication.type}
                      abstract={publication.abstract}
                      doi={publication.doi}
                    />
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-gradient-to-r from-natural-50 to-white rounded-xl border border-natural-200 shadow-sm">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Award className="h-6 w-6 text-natural-700" />
                    <h3 className="font-medium text-natural-800 text-lg">Collaborations académiques</h3>
                  </div>
                  <p className="text-natural-600 text-center max-w-2xl mx-auto">
                    Notre laboratoire collabore avec plusieurs institutions de recherche et universités pour 
                    faire avancer la connaissance scientifique dans le domaine de la nutrition et de la phytothérapie.
                  </p>
                  <div className="flex flex-wrap justify-center gap-8 mt-6">
                    {['Université Paris-Saclay', 'INSERM', 'CNRS', 'Institut Pasteur'].map((institution, index) => (
                      <div key={institution} className="text-center group">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm border border-natural-100 group-hover:border-natural-300 transition-colors">
                          <BookOpen className="h-6 w-6 text-natural-500" />
                        </div>
                        <p className="text-sm font-medium text-natural-700">{institution}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Section FAQ Améliorée */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-white to-natural-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-8">
                <GraduationCap className="h-5 w-5 text-natural-700" />
                <h2 className="font-display text-2xl text-center text-natural-800">Questions Fréquentes</h2>
              </div>
              
              <div className="space-y-4">
                {[
                  { 
                    q: "Comment nos formules sont-elles testées?", 
                    a: "Nos formules subissent des tests rigoureux en laboratoire indépendant et des études cliniques pour garantir leur efficacité et leur sécurité. Chaque formulation passe par des tests in vitro pour évaluer son activité biologique, puis par des essais cliniques sur des volontaires pour confirmer son efficacité et sa tolérance dans des conditions réelles d'utilisation.", 
                    icon: <ClipboardCheck className="h-5 w-5 text-natural-500" />
                  },
                  { 
                    q: "Quels sont les critères de sélection des ingrédients?", 
                    a: "Nous sélectionnons uniquement des ingrédients naturels, avec une concentration optimale d'actifs, provenant de sources durables et éthiques. Nos critères incluent l'efficacité démontrée par des études scientifiques, la pureté (absence de contaminants), la traçabilité et le respect de l'environnement. Nous privilégions les ingrédients biologiques lorsque c'est possible.", 
                    icon: <Filter className="h-5 w-5 text-natural-500" />
                  },
                  { 
                    q: "Comment garantissez-vous la qualité de vos produits?", 
                    a: "Chaque lot de production est testé pour sa pureté, sa concentration en principes actifs et l'absence de contaminants. Nous utilisons des méthodes analytiques avancées comme la chromatographie HPLC, la spectrométrie de masse et des tests microbiologiques. Les certificats d'analyse sont disponibles sur demande pour chaque lot de production.", 
                    icon: <ShieldCheck className="h-5 w-5 text-natural-500" />
                  },
                  { 
                    q: "Peut-on combiner plusieurs de vos produits?", 
                    a: "Oui, nos produits sont conçus pour fonctionner en synergie. Notre équipe scientifique évalue soigneusement les interactions potentielles entre les différents ingrédients actifs pour s'assurer qu'ils peuvent être utilisés ensemble en toute sécurité. Pour des conseils personnalisés, notre équipe de nutritionnistes est disponible pour vous guider.", 
                    icon: <PuzzlePiece className="h-5 w-5 text-natural-500" />
                  },
                  { 
                    q: "Comment distinguer un complément efficace d'un produit marketing?", 
                    a: "Un complément véritablement efficace s'appuie sur des études cliniques publiées, utilise des dosages thérapeutiques validés scientifiquement, et garantit une transparence totale sur ses ingrédients. Méfiez-vous des allégations miraculeuses, des témoignages non vérifiables et des formules propriétaires qui ne détaillent pas les dosages précis des actifs. Consultez notre guide d'évaluation scientifique des compléments pour en savoir plus.", 
                    icon: <Lightbulb className="h-5 w-5 text-natural-500" />
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-white rounded-lg p-5 border border-natural-200 shadow-sm hover:shadow-md transition-shadow group">
                    <h3 className="font-medium text-natural-800 mb-3 flex items-center">
                      <div className="p-2 bg-natural-50 rounded-lg mr-3 group-hover:bg-natural-100 transition-colors">
                        {faq.icon}
                      </div>
                      {faq.q}
                    </h3>
                    <p className="text-sm text-natural-600 pl-11">{faq.a}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 bg-gradient-to-r from-natural-100 to-natural-50 p-6 rounded-xl border border-natural-200 shadow-sm">
                <div className="text-center mb-4">
                  <h3 className="font-medium text-natural-800 text-lg">Vous avez d'autres questions?</h3>
                  <p className="text-sm text-natural-600">Notre équipe scientifique se fera un plaisir de vous répondre</p>
                </div>
                <div className="flex justify-center">
                  <Button className="bg-natural-700 hover:bg-natural-800 group">
                    Contacter nos experts
                    <ArrowUpRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Section témoignages */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <Badge variant="outline" className="mb-3 bg-natural-50 text-natural-700">Témoignages</Badge>
              <h2 className="font-display text-2xl md:text-3xl text-natural-800 mb-4">Ce que disent les professionnels</h2>
              <p className="text-natural-600">
                Des professionnels de santé témoignent de la qualité de nos formulations et des résultats observés.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  name: "Dr. Marie Laurent",
                  title: "Médecin nutritionniste",
                  quote: "Les formulations Natural Solutions sont parmi les rares que je recommande à mes patients. La rigueur scientifique et la transparence des dosages font toute la différence.",
                  avatar: <UserRound className="h-10 w-10 text-natural-600" />
                },
                {
                  name: "Prof. Thomas Mercier",
                  title: "Chercheur en pharmacologie",
                  quote: "J'ai été impliqué dans l'évaluation de certaines de leurs formules. La méthodologie employée est irréprochable et les résultats cliniques parlent d'eux-mêmes.",
                  avatar: <UserRound className="h-10 w-10 text-natural-600" />
                },
                {
                  name: "Dr. Sophie Durand",
                  title: "Médecin intégratif",
                  quote: "Ce qui me plaît particulièrement, c'est l'approche synergique des formulations. Les ingrédients sont combinés avec intelligence pour maximiser l'efficacité.",
                  avatar: <UserRound className="h-10 w-10 text-natural-600" />
                }
              ].map((testimonial, idx) => (
                <Card key={idx} className="border-natural-200 hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-natural-50 p-2 rounded-full">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <h4 className="font-medium text-natural-800">{testimonial.name}</h4>
                          <p className="text-xs text-natural-500">{testimonial.title}</p>
                        </div>
                      </div>
                      <div className="flex-grow">
                        <p className="text-natural-600 italic mb-4">"{testimonial.quote}"</p>
                      </div>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-natural-400 fill-natural-400" />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button variant="outline" className="border-natural-200 group">
                Voir plus de témoignages
                <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Section CTA */}
        <section className="py-16 bg-gradient-to-br from-natural-700 via-natural-600 to-natural-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 bg-[size:32px_32px]"></div>
          <div className="absolute top-10 right-10 w-64 h-64 bg-natural-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              <Badge variant="outline" className="mb-4 bg-white/10 text-white border-white/20">
                Prêt à découvrir la différence?
              </Badge>
              <h2 className="font-display text-3xl md:text-4xl mb-4">
                Des solutions naturelles basées sur la science
              </h2>
              <p className="text-natural-100 mb-8 text-lg">
                Explorez notre gamme de produits développés avec la plus grande rigueur scientifique
                pour répondre à vos besoins spécifiques en matière de santé et de bien-être.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-natural-800 hover:bg-natural-50">
                  Découvrir nos produits
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white/40 hover:bg-white/10">
                  Consulter nos études
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LaboSolutions;
