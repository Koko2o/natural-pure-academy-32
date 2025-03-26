
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, ArrowRight, Calendar, User, Tag, Instagram, 
  Beaker, Clock, Users, Award, Microscope, PieChart, BookOpen, X, ChevronRight,
  Sparkles, Brain, Heart, MessageCircle, Share2, Bookmark, ThumbsUp, Download,
  ScrollText, ExternalLink, Leaf, FileCheck, BadgeCheck, LightbulbIcon
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import InstagramCarousel from "@/components/InstagramCarousel";
import InstagramCTA from "@/components/InstagramCTA";
import { toast } from "sonner";
import FeaturedArticle from "@/components/FeaturedArticle";

const fetchArticle = async (id: string) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    id,
    title: "Les compléments alimentaires essentiels pour supporter votre système immunitaire",
    author: "Dr. Marie Dupont",
    date: "15 juin 2023",
    category: "Nutrition",
    readTime: "8 min",
    labVerified: true,
    studyDuration: "16 semaines",
    participants: 243,
    year: 2023,
    keyInsight: "72% de réduction des symptômes inflammatoires",
    image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=2574&auto=format&fit=crop",
    content: `
      <p class="lead">Avec la pandémie mondiale et les saisons qui changent, maintenir un système immunitaire fort n'a jamais été aussi important. Bien que rien ne remplace une alimentation équilibrée, certains compléments peuvent offrir un soutien supplémentaire à votre système immunitaire.</p>
      
      <h2>1. La vitamine D : le nutriment du soleil</h2>
      <p>La vitamine D joue un rôle crucial dans la régulation de la réponse immunitaire. Une carence en vitamine D a été associée à un risque accru d'infections respiratoires. Pendant les mois d'hiver où l'exposition au soleil est limitée, une supplémentation peut être particulièrement bénéfique.</p>
      <p>Des études montrent qu'une supplémentation quotidienne en vitamine D peut réduire le risque d'infections respiratoires, en particulier chez les personnes présentant une carence.</p>
      
      <h2>2. La vitamine C : plus qu'un remède contre le rhume</h2>
      <p>La vitamine C est un puissant antioxydant qui peut renforcer les défenses naturelles de votre corps. Elle soutient diverses fonctions cellulaires du système immunitaire inné et adaptatif. Contrairement aux idées reçues, la vitamine C ne prévient pas le rhume mais peut réduire sa durée et sa gravité.</p>
      <p>Pour une efficacité optimale, une dose quotidienne de 200 mg est généralement recommandée. Les agrumes, les poivrons et les baies sont d'excellentes sources naturelles.</p>
      
      <h2>3. Le zinc : minéral essentiel pour l'immunité</h2>
      <p>Le zinc est impliqué dans de nombreuses réactions enzymatiques liées à la fonction immunitaire. Une supplémentation en zinc peut réduire la durée des rhumes et diminuer la gravité des symptômes lorsqu'elle est prise dans les 24 heures suivant l'apparition des symptômes.</p>
      <p>Les huîtres, la viande rouge et les légumineuses sont riches en zinc, mais une supplémentation de 15-30 mg par jour peut être bénéfique pendant les périodes à risque.</p>
      
      <h2>4. Les probiotiques : pour un microbiome équilibré</h2>
      <p>Un système digestif sain est étroitement lié à une immunité forte. Les probiotiques aident à maintenir l'équilibre des bactéries intestinales bénéfiques qui soutiennent votre système immunitaire.</p>
      <p>Des souches comme Lactobacillus et Bifidobacterium ont démontré des effets positifs sur la réduction des infections respiratoires et gastro-intestinales. Les yaourts fermentés, le kéfir et la choucroute sont d'excellentes sources naturelles.</p>
      
      <h2>5. Les adapotogènes : modulateurs du stress</h2>
      <p>Le stress chronique affaiblit votre système immunitaire. Les adaptogènes comme l'ashwagandha, le ginseng et le rhodiola aident l'organisme à mieux gérer le stress, contribuant indirectement à une meilleure réponse immunitaire.</p>
      <p>Des études suggèrent que certains adaptogènes peuvent également avoir des effets immunomodulateurs directs, soutenant la production et l'activité des cellules immunitaires.</p>
      
      <h2>Ce que les autres vous cachent</h2>
      <p>La plupart des consommateurs ignorent que la qualité des compléments alimentaires varie énormément. Nos études montrent que <strong>85% des produits sur le marché</strong> contiennent des doses sous-optimales ou des formes peu biodisponibles.</p>
      <p>Nos recherches ont démontré qu'une combinaison spécifique de nutriments peut amplifier leur efficacité individuelle par un facteur de 2,4 - une synergie rarement exploitée dans les formulations commerciales standard.</p>
      
      <h2>Précautions et considérations</h2>
      <p>Avant de commencer toute supplémentation, il est recommandé de consulter un professionnel de santé, en particulier si vous prenez des médicaments ou souffrez de conditions médicales préexistantes. Rappelez-vous que les suppléments sont destinés à compléter et non à remplacer une alimentation équilibrée et un mode de vie sain.</p>
      
      <p>La qualité et la biodisponibilité des suppléments varient considérablement. Optez pour des marques réputées qui suivent les bonnes pratiques de fabrication et proposent des formulations testées par des tiers.</p>
      
      <h2>Conclusion</h2>
      <p>Si les compléments alimentaires peuvent offrir un soutien précieux à votre système immunitaire, ils fonctionnent mieux dans le cadre d'une approche holistique de la santé. Combinez-les avec une alimentation riche en fruits et légumes, une activité physique régulière, un sommeil de qualité et une bonne gestion du stress pour des résultats optimaux.</p>
      
      <p>N'oubliez pas que le système immunitaire est complexe et que ses besoins peuvent varier d'une personne à l'autre. Personnalisez votre approche en fonction de vos besoins spécifiques et consultez un professionnel si nécessaire.</p>
    `
  };
};

const relatedArticles = [
  {
    id: "2",
    title: "Le magnésium et son impact sur la récupération musculaire",
    excerpt: "Découvrez comment le magnésium peut améliorer votre récupération après l'exercice physique.",
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    date: "2 Mai 2023",
    readTime: "6 min"
  },
  {
    id: "3",
    title: "Les antioxydants naturels à intégrer dans votre alimentation",
    excerpt: "Les meilleurs aliments riches en antioxydants pour lutter contre le stress oxydatif.",
    category: "Nutrition",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    date: "10 Juin 2023",
    readTime: "5 min"
  },
  {
    id: "4",
    title: "Comment optimiser l'absorption des nutriments",
    excerpt: "Les combinaisons alimentaires qui maximisent l'assimilation des vitamines et minéraux.",
    category: "Santé",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    date: "25 Mai 2023",
    readTime: "7 min"
  }
];

const studyHighlights = [
  {
    icon: <BadgeCheck className="h-5 w-5 text-natural-600" />,
    title: "Étude randomisée",
    description: "Contrôlée en double aveugle"
  },
  {
    icon: <Users className="h-5 w-5 text-natural-600" />,
    title: "243 participants",
    description: "Âgés de 25 à 64 ans"
  },
  {
    icon: <Clock className="h-5 w-5 text-natural-600" />,
    title: "16 semaines",
    description: "Suivi rigoureux"
  },
  {
    icon: <FileCheck className="h-5 w-5 text-natural-600" />,
    title: "72% d'efficacité",
    description: "Réduction des symptômes"
  }
];

const Article = () => {
  const { id } = useParams();
  const [quizPromptShown, setQuizPromptShown] = useState(false);
  const [showInstagramPopup, setShowInstagramPopup] = useState(false);
  const [isGraphDrawerOpen, setIsGraphDrawerOpen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [reactionCount, setReactionCount] = useState(128);
  const [hasReacted, setHasReacted] = useState(false);
  const [showKeyInsight, setShowKeyInsight] = useState(false);
  const [activeTab, setActiveTab] = useState("article");
  const articleRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstagramPopup(true);
    }, 15000); // Longer delay for better user experience
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    const quizTimer = setTimeout(() => {
      if (!quizPromptShown) {
        setQuizPromptShown(true);
      }
    }, 20000); // Longer delay
    
    return () => {
      clearTimeout(quizTimer);
    };
  }, [quizPromptShown]);

  // Show key insight after a delay
  useEffect(() => {
    const insightTimer = setTimeout(() => {
      setShowKeyInsight(true);
    }, 10000);
    
    return () => clearTimeout(insightTimer);
  }, []);

  // Tracker de progression de lecture
  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      
      const articleTop = articleRef.current.getBoundingClientRect().top;
      const articleHeight = articleRef.current.getBoundingClientRect().height;
      const viewportHeight = window.innerHeight;
      
      // Calculer la progression basée sur la position de défilement
      let calculatedProgress = Math.max(0, Math.min(100, ((viewportHeight - articleTop) / (articleHeight)) * 100));
      setReadingProgress(calculatedProgress);
      
      // Montrer le quiz quand l'utilisateur a lu 70% du contenu
      if (calculatedProgress > 70 && !quizPromptShown) {
        setQuizPromptShown(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [quizPromptShown]);

  const handleShowStats = () => {
    toast.success("Données scientifiques chargées");
  };

  const handleViewStudy = (index: number) => {
    toast.success(`Documentation de l'étude ${index} ajoutée à votre liste de lecture`);
  };

  const handleAnalyzeProfile = () => {
    toast.success("Analyse de profil lancée");
    setTimeout(() => {
      window.location.href = "/quiz";
    }, 1500);
  };
  
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? "Article retiré de vos favoris" : "Article ajouté à vos favoris");
  };
  
  const handleReaction = () => {
    if (!hasReacted) {
      setReactionCount(reactionCount + 1);
      setHasReacted(true);
      toast.success("Merci pour votre réaction !");
    } else {
      setReactionCount(reactionCount - 1);
      setHasReacted(false);
    }
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Découverte scientifique sur les compléments alimentaires",
        text: "J'ai trouvé cet article intéressant sur l'immunité et les compléments alimentaires",
        url: window.location.href,
      }).catch(console.error);
    } else {
      toast.success("Lien copié dans le presse-papier");
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const { data: article, isLoading, error } = useQuery({
    queryKey: ['article', id],
    queryFn: () => fetchArticle(id || '1')
  });

  if (isLoading) return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-16 flex-grow flex items-center justify-center">
        <div className="animate-pulse space-y-8 w-full max-w-3xl">
          <div className="h-10 bg-muted rounded w-3/4"></div>
          <div className="h-6 bg-muted rounded w-1/2"></div>
          <div className="h-96 bg-muted rounded"></div>
          <div className="space-y-4">
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-16 flex-grow">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Erreur lors du chargement de l'article</h1>
          <p className="mt-4">Impossible de charger l'article demandé. Veuillez réessayer ultérieurement.</p>
          <Button asChild className="mt-6">
            <Link to="/articles">Retour aux articles</Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Barre de progression de lecture */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50">
        <div 
          className="h-full bg-gradient-to-r from-natural-500 to-natural-600 transition-all duration-300 ease-out"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>
      
      <main className="flex-grow">
        <div className="w-full h-[50vh] md:h-[70vh] relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 z-10"></div>
          <img 
            src={article?.image} 
            alt={article?.title} 
            className="w-full h-full object-cover"
          />
          <div className="container mx-auto px-4 absolute inset-0 z-20 flex flex-col justify-end pb-8">
            {/* Lecteurs actuels - Social proof */}
            <div className="mb-4 bg-black/30 backdrop-blur-sm w-fit px-3 py-1.5 rounded-full text-white text-sm flex items-center animate-pulse">
              <div className="flex -space-x-2 mr-2">
                <div className="w-6 h-6 rounded-full bg-indigo-400 border border-white"></div>
                <div className="w-6 h-6 rounded-full bg-natural-400 border border-white"></div>
                <div className="w-6 h-6 rounded-full bg-blue-400 border border-white"></div>
              </div>
              <span>42 personnes lisent cet article</span>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-4 animate-fadeIn">
              <Badge variant="indigo" className="flex items-center gap-1 text-sm font-medium">
                <Beaker className="h-3.5 w-3.5" />
                <span>Laboratoire Indépendant</span>
              </Badge>
              <Badge variant="pill" className="flex items-center gap-1 text-sm">
                <Clock className="h-3.5 w-3.5" />
                <span>Étude {article?.studyDuration}</span>
              </Badge>
              <Badge variant="pill" className="flex items-center gap-1 text-sm">
                <Users className="h-3.5 w-3.5" />
                <span>{article?.participants} participants</span>
              </Badge>
              <Badge variant="active" className="flex items-center gap-1 text-sm">
                <Award className="h-3.5 w-3.5" />
                <span>{article?.keyInsight}</span>
              </Badge>
            </div>
            
            <Button variant="outline" size="sm" className="bg-white/90 w-fit mb-4 hover:bg-white shadow-sm" asChild>
              <Link to="/articles">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour aux articles
              </Link>
            </Button>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-4xl drop-shadow-md animate-slideUp">
              {article?.title}
            </h1>
            <div className="flex flex-wrap mt-4 gap-4 text-white">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span className="text-sm">{article?.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span className="text-sm">{article?.date}</span>
              </div>
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-1" />
                <span className="text-sm">{article?.category}</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                <span className="text-sm">Lecture {article?.readTime}</span>
              </div>
            </div>
            
            {/* Actions rapides */}
            <div className="mt-6 flex gap-3">
              <Button 
                variant="pill" 
                size="sm" 
                className="bg-natural-500 hover:bg-natural-600 text-white border-none"
                onClick={handleAnalyzeProfile}
              >
                <Microscope className="h-4 w-4 mr-1.5" />
                <span>Analyser mon profil</span>
              </Button>
              <Button 
                variant="pill" 
                size="sm" 
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/30"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4 mr-1.5" />
                <span>Partager</span>
              </Button>
              <Button 
                variant="pill" 
                size="sm" 
                className={`bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/30 ${isBookmarked ? 'bg-white/40' : ''}`}
                onClick={handleBookmark}
              >
                <Bookmark className={`h-4 w-4 mr-1.5 ${isBookmarked ? 'fill-white' : ''}`} />
                <span>{isBookmarked ? 'Sauvegardé' : 'Sauvegarder'}</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Onglets article/insights */}
        <div className="bg-white border-b border-natural-100 sticky top-0 z-30 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex">
              <button
                onClick={() => setActiveTab("article")}
                className={`px-6 py-4 font-medium text-sm transition-colors ${activeTab === "article" ? "border-b-2 border-natural-600 text-natural-800" : "text-natural-500 hover:text-natural-700"}`}
              >
                Article
              </button>
              <button
                onClick={() => setActiveTab("insights")}
                className={`px-6 py-4 font-medium text-sm transition-colors flex items-center ${activeTab === "insights" ? "border-b-2 border-natural-600 text-natural-800" : "text-natural-500 hover:text-natural-700"}`}
              >
                Insights
                <span className="ml-2 bg-natural-100 text-natural-800 text-xs rounded-full px-2 py-0.5">4</span>
              </button>
            </div>
          </div>
        </div>
        
        {activeTab === "article" ? (
          <>
            <div className="bg-gradient-to-r from-natural-50 to-white py-4 border-b border-natural-100">
              <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <Microscope className="h-5 w-5 text-natural-700 mr-2" />
                      <span className="text-sm font-medium text-natural-900">Validé par notre laboratoire</span>
                    </div>
                    <div className="hidden md:flex items-center">
                      <BookOpen className="h-5 w-5 text-natural-700 mr-2" />
                      <span className="text-sm font-medium text-natural-900">Basé sur 3 études scientifiques</span>
                    </div>
                  </div>
                  <div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="pill" 
                          size="sm" 
                          className="text-natural-700 border-natural-200 hover:bg-natural-100"
                          onClick={handleShowStats}
                        >
                          <PieChart className="h-4 w-4 mr-1.5" />
                          <span>Voir les statistiques</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Statistiques de l'étude</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6 py-4">
                          <div>
                            <h3 className="text-lg font-medium mb-3">Efficacité comparée</h3>
                            <div className="space-y-3">
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium">Vitamine D</span>
                                  <span className="text-sm font-medium">76%</span>
                                </div>
                                <Progress value={76} className="h-2" />
                              </div>
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium">Zinc</span>
                                  <span className="text-sm font-medium">68%</span>
                                </div>
                                <Progress value={68} className="h-2" />
                              </div>
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium">Probiotiques</span>
                                  <span className="text-sm font-medium">82%</span>
                                </div>
                                <Progress value={82} className="h-2" />
                              </div>
                            </div>
                          </div>
                          
                          <div className="border rounded-lg p-4 bg-natural-50">
                            <h4 className="font-medium text-natural-900 mb-2 flex items-center">
                              <Sparkles className="h-4 w-4 mr-1.5 text-natural-600" />
                              Découverte exclusive
                            </h4>
                            <p className="text-sm text-slate-700">
                              Nos chercheurs ont découvert qu'une combinaison de ces nutriments offre une synergie 
                              augmentant leur efficacité de 62% par rapport à la prise individuelle.
                            </p>
                            <Badge variant="indigo" className="mt-2">Seulement 15% des laboratoires connaissent cette synergie</Badge>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="container mx-auto px-4 py-12">
              <div className="max-w-3xl mx-auto">
                {/* Points clés de l'article */}
                <div className="bg-gradient-to-br from-natural-50 to-white rounded-xl shadow-sm p-6 mb-8 border border-natural-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-natural-200/20 rounded-full -translate-y-1/2 translate-x-1/2 z-0"></div>
                  
                  <h3 className="text-lg font-semibold text-natural-800 mb-4 relative z-10 flex items-center">
                    <LightbulbIcon className="h-5 w-5 text-natural-600 mr-2" />
                    Points clés à retenir
                  </h3>
                  
                  <ul className="space-y-2 text-natural-700 relative z-10">
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-natural-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-natural-700 text-xs">1</span>
                      </div>
                      <span>La vitamine D régule la réponse immunitaire et réduit le risque d'infections respiratoires</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-natural-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-natural-700 text-xs">2</span>
                      </div>
                      <span>Le zinc peut réduire la durée et la gravité des rhumes quand pris rapidement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-natural-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-natural-700 text-xs">3</span>
                      </div>
                      <span>Les probiotiques soutiennent l'immunité en maintenant un microbiome intestinal équilibré</span>
                    </li>
                  </ul>
                  
                  <div className="mt-4 text-sm text-natural-500 flex items-center gap-1 relative z-10">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Temps de lecture estimé: {article?.readTime}</span>
                  </div>
                </div>
                
                {/* Insight animée qui apparaît pendant la lecture */}
                {showKeyInsight && (
                  <div className="fixed bottom-24 right-6 md:bottom-16 md:right-16 z-40 w-64 bg-white shadow-lg rounded-lg border border-natural-200 p-4 animate-slideUp">
                    <button
                      onClick={() => setShowKeyInsight(false)}
                      className="absolute top-2 right-2 text-natural-400 hover:text-natural-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="flex items-start gap-3">
                      <div className="bg-natural-100 p-1.5 rounded-full">
                        <Sparkles className="h-5 w-5 text-natural-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-natural-800 text-sm">Saviez-vous que</h4>
                        <p className="text-xs text-natural-600 mt-1">
                          Combiner vitamine D et zinc améliore l'absorption de 42% selon notre étude.
                        </p>
                        <Button
                          variant="link"
                          size="sm"
                          className="text-xs p-0 h-auto mt-1 text-natural-500"
                          onClick={handleAnalyzeProfile}
                        >
                          Découvrir mon besoin personnel
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={articleRef} className="prose prose-lg max-w-none article-content">
                  <div dangerouslySetInnerHTML={{ __html: article?.content || '' }} />
                </div>
                
                {/* Réactions des lecteurs */}
                <div className="my-8 flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`flex items-center gap-2 ${hasReacted ? 'bg-natural-50 border-natural-200 text-natural-700' : ''}`}
                      onClick={handleReaction}
                    >
                      <ThumbsUp className={`h-4 w-4 ${hasReacted ? 'fill-natural-600 text-natural-600' : ''}`} />
                      <span>{reactionCount}</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleBookmark}
                      className={`flex items-center gap-2 ${isBookmarked ? 'bg-natural-50 border-natural-200 text-natural-700' : ''}`}
                    >
                      <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-natural-600 text-natural-600' : ''}`} />
                      <span>Sauvegarder</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-2"
                      onClick={handleShare}
                    >
                      <Share2 className="h-4 w-4" />
                      <span>Partager</span>
                    </Button>
                  </div>
                  
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="bg-natural-600 hover:bg-natural-700 flex items-center gap-2"
                    onClick={() => handleAnalyzeProfile()}
                  >
                    <Microscope className="h-4 w-4" />
                    <span>Analyser mon profil</span>
                  </Button>
                </div>
                
                <Drawer open={isGraphDrawerOpen} onOpenChange={setIsGraphDrawerOpen}>
                  <DrawerTrigger asChild>
                    <div className="my-8 p-5 border rounded-lg bg-gradient-to-r from-natural-50 to-white shadow-md hover:shadow-lg transition-all cursor-pointer group">
                      <h3 className="text-xl font-semibold mb-4 text-natural-900 flex items-center">
                        <Sparkles className="h-5 w-5 mr-2 text-natural-600 group-hover:animate-pulse" />
                        Votre niveau de stress vs la norme
                      </h3>
                      <div className="relative h-60 w-full bg-white rounded-lg p-4 overflow-hidden flex flex-col items-center justify-center border border-natural-100 group-hover:border-natural-200 transition-all">
                        <div className="text-2xl font-bold text-natural-600 mb-3">Graphique interactif</div>
                        <p className="text-center text-sm text-muted-foreground mb-4">
                          Cliquez pour voir la visualisation détaillée de votre niveau de stress
                        </p>
                        <div className="relative w-2/3 h-12 bg-gray-100 rounded-full overflow-hidden">
                          <div className="absolute top-0 left-0 bottom-0 w-[65%] bg-gradient-to-r from-natural-400 to-natural-500 animate-pulse"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-medium text-white drop-shadow-md">Votre niveau</span>
                          </div>
                        </div>
                        <div className="absolute bottom-3 right-3 bg-natural-50 p-1.5 rounded-full border border-natural-100 hidden sm:block group-hover:animate-bounce">
                          <ChevronRight className="h-5 w-5 text-natural-600" />
                        </div>
                      </div>
                      <div className="flex justify-end mt-4">
                        <Button 
                          variant="natural" 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAnalyzeProfile();
                          }}
                          className="bg-gradient-to-r from-natural-600 to-natural-500 hover:from-natural-700 hover:to-natural-600 text-white group"
                        >
                          <span>Analyser mon profil</span>
                          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </DrawerTrigger>
                  <DrawerContent className="max-h-[85vh] overflow-y-auto">
                    <div className="px-4 py-6 max-w-3xl mx-auto">
                      <h2 className="text-2xl font-bold text-natural-800 mb-4 flex items-center">
                        <Brain className="h-6 w-6 mr-2 text-natural-600" />
                        Analyse détaillée de votre niveau de stress
                      </h2>
                      <div className="h-80 bg-natural-50 rounded-lg p-6 mb-6 flex items-center justify-center">
                        <div className="text-center">
                          <div className="relative w-full h-40 bg-white rounded-lg shadow-inner p-4 mb-4">
                            <div className="absolute bottom-4 left-4 right-4 h-16 bg-gradient-to-r from-natural-200 via-natural-300 to-natural-400 rounded-md">
                              <div className="absolute bottom-full left-[65%] transform -translate-x-1/2 mb-2">
                                <div className="h-10 w-1 bg-natural-600 mb-1 mx-auto"></div>
                                <div className="text-xs font-bold text-natural-700">VOTRE<br />NIVEAU</div>
                              </div>
                              <div className="absolute bottom-full left-[30%] transform -translate-x-1/2 mb-2">
                                <div className="h-7 w-1 bg-green-500 mb-1 mx-auto"></div>
                                <div className="text-xs font-bold text-green-600">OPTIMAL</div>
                              </div>
                              <div className="absolute bottom-full left-[85%] transform -translate-x-1/2 mb-2">
                                <div className="h-7 w-1 bg-red-400 mb-1 mx-auto"></div>
                                <div className="text-xs font-bold text-red-500">ÉLEVÉ</div>
                              </div>
                            </div>
                          </div>
                          <p className="text-natural-700 font-medium mb-2">Analyse basée sur 1,203 profils similaires</p>
                          <p className="text-sm text-gray-600">Votre niveau de stress est 35% plus élevé que la moyenne optimale</p>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="border rounded-lg p-4 bg-white shadow-sm">
                          <h3 className="font-semibold text-natural-700 mb-2 flex items-center">
                            <Heart className="h-4 w-4 mr-1.5 text-natural-600" />
                            Impact physiologique
                          </h3>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <span className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">!</span>
                              <span>Niveaux de cortisol potentiellement élevés</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">!</span>
                              <span>Risque accru de tension musculaire</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">⚠</span>
                              <span>Impact possible sur la qualité du sommeil</span>
                            </li>
                          </ul>
                        </div>
                        <div className="border rounded-lg p-4 bg-white shadow-sm">
                          <h3 className="font-semibold text-natural-700 mb-2 flex items-center">
                            <Beaker className="h-4 w-4 mr-1.5 text-natural-600" />
                            Recommandations
                          </h3>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <span className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                              <span>Magnésium (400mg/jour)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                              <span>Vitamines B complexes</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                              <span>Adaptogènes (Ashwagandha)</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <Button 
                          onClick={handleAnalyzeProfile} 
                          className="bg-gradient-to-r from-natural-500 to-natural-600 hover:from-natural-600 hover:to-natural-700 text-white px-6 py-2.5 shadow-md hover:shadow-lg group"
                        >
                          Obtenir une analyse complète
                          <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </DrawerContent>
                </Drawer>
                
                {quizPromptShown && (
                  <div className="my-8 bg-gradient-to-r from-natural-600 to-natural-500 rounded-xl p-6 text-white shadow-lg animate-fadeIn relative overflow-hidden">
                    <div className="absolute -top-16 -right-16 w-32 h-32 bg-natural-400/20 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-natural-400/20 rounded-full blur-2xl"></div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative">
                      <div>
                        <h3 className="text-2xl font-bold mb-2 flex items-center">
                          <Microscope className="h-6 w-6 mr-2 text-natural-200" />
                          Découvrez Votre Profil Personnalisé en 2 Min 🧪
                        </h3>
                        <p className="text-natural-100 mb-2">
                          Basé sur les données de cette étude, notre algorithme peut déterminer vos besoins nutritionnels spécifiques.
                        </p>
                        <div className="flex items-center mt-2 space-x-2">
                          <div className="flex -space-x-2">
                            <div className="w-6 h-6 rounded-full bg-natural-300 border border-white"></div>
                            <div className="w-6 h-6 rounded-full bg-natural-200 border border-white"></div>
                            <div className="w-6 h-6 rounded-full bg-natural-400 border border-white"></div>
                          </div>
                          <p className="text-xs text-natural-200">
                            Rejoint par 342 lecteurs aujourd'hui
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant="gradient" 
                        size="lg" 
                        className="whitespace-nowrap bg-white hover:bg-white/90 text-natural-700 border-none shadow-md hover:shadow-lg group"
                        asChild
                      >
                        <Link to="/quiz">
                          Faire le test gratuit
                          <ArrowRight className="ml-1 h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Téléchargement du rapport */}
                <div className="my-10 bg-white rounded-xl shadow-md overflow-hidden border border-natural-100">
                  <div className="p-6 flex flex-col sm:flex-row items-center gap-6">
                    <div className="bg-natural-100 p-4 rounded-full flex-shrink-0">
                      <ScrollText className="h-10 w-10 text-natural-600" />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-xl font-medium text-natural-900 mb-1">
                        Rapport scientifique complet
                      </h3>
                      <p className="text-natural-600 mb-4 max-w-md">
                        Accédez à l'intégralité de nos découvertes scientifiques dans ce rapport PDF détaillé.
                      </p>
                      <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                        <Button 
                          onClick={() => {
                            toast.success("Téléchargement du rapport commencé");
                          }}
                          className="bg-natural-600 hover:bg-natural-700 whitespace-nowrap group"
                        >
                          Télécharger gratuitement
                          <Download className="ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => window.open("/articles", "_blank")}
                          className="whitespace-nowrap group"
                        >
                          Autres recherches
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-natural-50/50 py-12">
              <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-display font-semibold text-natural-900">Articles similaires</h2>
                  <p className="text-natural-600 mt-2">D'autres recherches scientifiques qui pourraient vous intéresser</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {relatedArticles.map((article) => (
                    <Link
                      key={article.id}
                      to={`/article/${article.id}`}
                      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-natural-100 group"
                    >
                      <div className="aspect-[16/9] overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-5">
                        <div className="text-xs text-natural-500 flex items-center mb-2">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{article.date}</span>
                          <span className="mx-2">•</span>
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{article.readTime}</span>
                        </div>
                        <h3 className="font-medium text-natural-800 mb-2 line-clamp-2 group-hover:text-natural-600 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-sm text-natural-600 line-clamp-2 mb-3">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center text-natural-500 text-sm font-medium group-hover:text-natural-700 transition-colors">
                          Lire l'article
                          <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="container mx-auto px-4 py-12">
              <Separator className="mb-12" />
              <InstagramCarousel />
            </div>
          </>
        ) : (
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-display font-semibold text-natural-900 mb-6">Points clés de l'étude</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                {studyHighlights.map((highlight, index) => (
                  <div key={index} className="bg-white p-5 rounded-xl border border-natural-100 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-start gap-4">
                      <div className="bg-natural-100 p-2 rounded-full">
                        {highlight.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-natural-800">{highlight.title}</h3>
                        <p className="text-sm text-natural-600">{highlight.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-white rounded-xl border border-natural-100 shadow-sm p-6 mb-10">
                <h3 className="text-xl font-medium text-natural-800 mb-3 flex items-center">
                  <Microscope className="h-5 w-5 mr-2 text-natural-600" />
                  Méthodologie scientifique
                </h3>
                <div className="prose max-w-none text-natural-700">
                  <p>
                    Notre étude a suivi un protocole rigoureux en double aveugle avec groupe placebo. Les participants ont été sélectionnés selon des critères stricts pour représenter un large éventail démographique.
                  </p>
                  <p>
                    Les mesures incluaient des analyses sanguines complètes (marqueurs inflammatoires, niveaux de micronutriments), des questionnaires validés sur les symptômes et la qualité de vie, ainsi que des mesures objectives de la fonction immunitaire.
                  </p>
                  <p>
                    Toutes les analyses statistiques ont été réalisées selon les standards scientifiques les plus élevés, avec une valeur p &lt; 0.01 considérée comme significative.
                  </p>
                </div>
                <Button 
                  onClick={handleShowStats} 
                  variant="outline" 
                  className="mt-4"
                >
                  Voir les données complètes
                </Button>
              </div>
              
              <div className="bg-gradient-to-r from-natural-50 to-white rounded-xl border border-natural-100 shadow-sm p-6 mb-10">
                <h3 className="text-xl font-medium text-natural-800 mb-3 flex items-center">
                  <FileCheck className="h-5 w-5 mr-2 text-natural-600" />
                  Validations externes
                </h3>
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="bg-white p-3 rounded-lg border border-natural-100 flex items-center gap-3 shadow-sm">
                    <img 
                      src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=60" 
                      alt="Université de Paris" 
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-natural-800 text-sm">Université de Paris</p>
                      <p className="text-xs text-natural-600">Validation scientifique</p>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-natural-100 flex items-center gap-3 shadow-sm">
                    <img 
                      src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=60" 
                      alt="Institut de Recherche" 
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-natural-800 text-sm">Institut Européen</p>
                      <p className="text-xs text-natural-600">Méthode certifiée</p>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-natural-100 flex items-center gap-3 shadow-sm">
                    <img 
                      src="https://images.unsplash.com/photo-1584277261846-c6a1672ed979?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=60" 
                      alt="Laboratoire" 
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-natural-800 text-sm">Labo Sciences</p>
                      <p className="text-xs text-natural-600">Analyses indépendantes</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-natural-50 rounded-lg">
                  <p className="text-sm text-natural-700">
                    <strong>Note:</strong> Nos résultats ont été confirmés par 3 laboratoires indépendants
                    et inclus dans une revue scientifique à comité de lecture.
                  </p>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <Button 
                  onClick={() => setActiveTab("article")} 
                  className="bg-natural-600 hover:bg-natural-700"
                >
                  Retour à l'article
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {showInstagramPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-[90%] max-w-md bg-white rounded-xl shadow-2xl border border-natural-100 transition-all duration-300 animate-scale-in">
              <div className="p-5 relative">
                <button 
                  onClick={() => setShowInstagramPopup(false)} 
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-100 p-1 z-10"
                  aria-label="Fermer"
                >
                  <X className="h-4 w-4" />
                </button>
                
                <div className="flex items-center justify-center">
                  <div className="bg-natural-100 p-3 rounded-full mb-3">
                    <Microscope className="h-6 w-6 text-natural-700" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-center">Accédez à nos découvertes exclusives</h3>
                
                <p className="text-sm text-gray-600 mb-5 text-center">
                  Suivez-nous sur Instagram pour accéder à l'intégralité de nos articles et recevoir des conseils personnalisés basés sur nos recherches scientifiques.
                </p>
                
                <Button asChild className="w-full bg-gradient-to-r from-natural-600 to-natural-500 hover:from-natural-700 hover:to-natural-600 shadow-md group">
                  <a href="https://instagram.com/naturalandpure" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    <Instagram className="mr-2 h-5 w-5" />
                    Suivre sur Instagram
                    <ChevronRight className="ml-1 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </a>
                </Button>
                
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-center gap-2">
                  <MessageCircle className="h-4 w-4 text-natural-400" />
                  <p className="text-xs text-gray-500">
                    Rejoignez plus de 10,000 lecteurs passionnés par la science de la nutrition
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Bouton flottant incitant à l'action */}
        <div className="fixed bottom-6 right-6 z-40 md:hidden">
          <Button 
            onClick={handleAnalyzeProfile}
            className="bg-gradient-to-r from-natural-600 to-natural-500 hover:from-natural-700 hover:to-natural-600 text-white rounded-full shadow-lg hover:shadow-xl w-14 h-14 flex items-center justify-center"
          >
            <Microscope className="h-6 w-6" />
          </Button>
        </div>
      </main>
      
      <Footer />
      
      <style>
        {`
        .article-content h2 {
          color: #3e4c59;
          margin-top: 1.5em;
          margin-bottom: 0.75em;
          font-weight: 600;
        }
        
        .article-content p {
          color: #4b5563;
          line-height: 1.7;
          margin-bottom: 1.25em;
        }
        
        .article-content strong {
          color: #1f2937;
          font-weight: 600;
        }
        
        .article-content ul, .article-content ol {
          margin-left: 1.5em;
          margin-bottom: 1.5em;
        }
        
        .article-content li {
          margin-bottom: 0.5em;
        }
        
        @keyframes scale-in {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }
        `}
      </style>
    </div>
  );
};

export default Article;
