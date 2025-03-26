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
  ScrollText, ExternalLink, Leaf, FileCheck, BadgeCheck, LightbulbIcon,
  Zap, LucideArrowDownToLine, BookMarked, Star, Coffee
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
import { cn } from "@/lib/utils";

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
    <div className="min-h-screen flex flex-col bg-natural-50/30">
      <Navbar />
      
      {/* Barre de progression de lecture */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-natural-600 transition-all duration-300 ease-out"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>
      
      <main className="flex-grow">
        <div className="w-full h-[55vh] md:h-[75vh] relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40 z-10"></div>
          <img 
            src={article?.image} 
            alt={article?.title} 
            className="w-full h-full object-cover"
          />
          <div className="container mx-auto px-4 absolute inset-0 z-20 flex flex-col justify-end pb-10">
            {/* Lecteurs actuels - Social proof */}
            <div className="mb-4 bg-black/40 backdrop-blur-md w-fit px-3 py-1.5 rounded-full text-white text-sm flex items-center animate-pulse">
              <div className="flex -space-x-2 mr-2">
                <div className="w-6 h-6 rounded-full bg-indigo-400 border border-white"></div>
                <div className="w-6 h-6 rounded-full bg-natural-400 border border-white"></div>
                <div className="w-6 h-6 rounded-full bg-blue-400 border border-white"></div>
              </div>
              <span>42 personnes lisent cet article</span>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-5 animate-fadeIn">
              <Badge variant="indigo" className="flex items-center gap-1 text-sm font-medium py-1.5">
                <Beaker className="h-3.5 w-3.5" />
                <span>Laboratoire Indépendant</span>
              </Badge>
              <Badge variant="pill" className="flex items-center gap-1 text-sm py-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>Étude {article?.studyDuration}</span>
              </Badge>
              <Badge variant="pill" className="flex items-center gap-1 text-sm py-1.5">
                <Users className="h-3.5 w-3.5" />
                <span>{article?.participants} participants</span>
              </Badge>
              <Badge variant="active" className="flex items-center gap-1 text-sm py-1.5 bg-gradient-to-r from-indigo-500 to-indigo-600">
                <Award className="h-3.5 w-3.5" />
                <span>{article?.keyInsight}</span>
              </Badge>
            </div>
            
            <Button variant="outline" size="sm" className="bg-white/90 w-fit mb-5 hover:bg-white shadow-sm" asChild>
              <Link to="/articles">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour aux articles
              </Link>
            </Button>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white max-w-4xl drop-shadow-md animate-slideUp leading-tight font-display tracking-tight">
              {article?.title}
            </h1>
            
            <div className="flex flex-wrap mt-5 gap-5 text-white/90">
              <div className="flex items-center bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <User className="h-4 w-4 mr-2 text-indigo-300" />
                <span className="text-sm">{article?.author}</span>
              </div>
              <div className="flex items-center bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <Calendar className="h-4 w-4 mr-2 text-indigo-300" />
                <span className="text-sm">{article?.date}</span>
              </div>
              <div className="flex items-center bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <Tag className="h-4 w-4 mr-2 text-indigo-300" />
                <span className="text-sm">{article?.category}</span>
              </div>
              <div className="flex items-center bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-indigo-300"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                <span className="text-sm">Lecture {article?.readTime}</span>
              </div>
            </div>
            
            {/* Actions rapides */}
            <div className="mt-7 flex gap-3 flex-wrap">
              <Button 
                variant="pill" 
                size="sm" 
                className="bg-indigo-500 hover:bg-indigo-600 text-white border-none shadow-md hover:shadow-lg"
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
                className={`px-6 py-4 font-medium text-sm transition-colors ${activeTab === "article" ? "border-b-2 border-indigo-600 text-natural-800" : "text-natural-500 hover:text-natural-700"}`}
              >
                Article
              </button>
              <button
                onClick={() => setActiveTab("insights")}
                className={`px-6 py-4 font-medium text-sm transition-colors flex items-center ${activeTab === "insights" ? "border-b-2 border-indigo-600 text-natural-800" : "text-natural-500 hover:text-natural-700"}`}
              >
                Insights
                <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs rounded-full px-2 py-0.5">4</span>
              </button>
            </div>
          </div>
        </div>
        
        {activeTab === "article" ? (
          <>
            <div className="bg-gradient-to-r from-indigo-50/50 to-white py-4 border-b border-natural-100">
              <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <Microscope className="h-5 w-5 text-indigo-700 mr-2" />
                      <span className="text-sm font-medium text-natural-900">Validé par notre laboratoire</span>
                    </div>
                    <div className="hidden md:flex items-center">
                      <BookOpen className="h-5 w-5 text-indigo-700 mr-2" />
                      <span className="text-sm font-medium text-natural-900">Basé sur 3 études scientifiques</span>
                    </div>
                  </div>
                  <div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="pill" 
                          size="sm" 
                          className="text-indigo-700 border-indigo-200 hover:bg-indigo-100"
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
                            <div className="space-y-4">
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium">Vitamine D</span>
                                  <span className="text-sm font-medium">76%</span>
                                </div>
                                <Progress value={76} className="h-2.5 bg-indigo-100" indicatorColor="bg-indigo-600" />
                              </div>
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium">Zinc</span>
                                  <span className="text-sm font-medium">68%</span>
                                </div>
                                <Progress value={68} className="h-2.5 bg-indigo-100" indicatorColor="bg-indigo-600" />
                              </div>
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium">Probiotiques</span>
                                  <span className="text-sm font-medium">82%</span>
                                </div>
                                <Progress value={82} className="h-2.5 bg-indigo-100" indicatorColor="bg-indigo-600" />
                              </div>
                            </div>
                          </div>
                          
                          <div className="border rounded-lg p-4 bg-indigo-50/50">
                            <h4 className="font-medium text-natural-900 mb-2 flex items-center">
                              <Sparkles className="h-4 w-4 mr-1.5 text-indigo-600" />
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
                <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow-md p-6 mb-8 border border-natural-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-200/20 rounded-full -translate-y-1/2 translate-x-1/2 z-0"></div>
                  
                  <h3 className="text-xl font-semibold text-indigo-800 mb-4 relative z-10 flex items-center">
                    <LightbulbIcon className="h-5 w-5 text-indigo-600 mr-2" />
                    Points clés à retenir
                  </h3>
                  
                  <ul className="space-y-3 text-natural-700 relative z-10">
                    <li className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm border border-natural-100">
                      <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                        <span className="text-indigo-700 text-xs font-bold">1</span>
                      </div>
                      <span className="font-medium">La vitamine D régule la réponse immunitaire et réduit le risque d'infections respiratoires</span>
                    </li>
                    <li className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm border border-natural-100">
                      <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                        <span className="text-indigo-700 text-xs font-bold">2</span>
                      </div>
                      <span className="font-medium">Le zinc peut réduire la durée et la gravité des rhumes quand pris rapidement</span>
                    </li>
                    <li className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm border border-natural-100">
                      <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                        <span className="text-indigo-700 text-xs font-bold">3</span>
                      </div>
                      <span className="font-medium">Les probiotiques soutiennent l'immunité en maintenant un microbiome intestinal équilibré</span>
                    </li>
                  </ul>
                  
                  <div className="mt-5 text-sm text-natural-500 flex items-center gap-2 relative z-10 bg-white/80 w-fit px-3 py-1.5 rounded-full shadow-sm">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Temps de lecture estimé: {article?.readTime}</span>
                  </div>
                </div>
                
                {/* Insight animée qui apparaît pendant la lecture */}
                {showKeyInsight && (
                  <div className="fixed bottom-24 right-6 md:bottom-16 md:right-16 z-40 w-72 bg-white shadow-xl rounded-lg border border-indigo-200 p-4 animate-slideUp">
                    <button
                      onClick={() => setShowKeyInsight(false)}
                      className="absolute top-2 right-2 text-natural-400 hover:text-natural-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="flex items-start gap-3">
                      <div className="bg-indigo-100 p-2 rounded-full">
                        <Sparkles className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-natural-800 text-sm">Saviez-vous que</h4>
                        <p className="text-sm text-natural-600 mt-1">
                          Combiner vitamine D et zinc améliore l'absorption de 42% selon notre étude.
                        </p>
                        <Button
                          variant="link"
                          size="sm"
                          className="text-xs p-0 h-auto mt-1 text-indigo-500 font-medium"
                          onClick={handleAnalyzeProfile}
                        >
                          Découvrir mon besoin personnel →
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={articleRef} className="prose prose-lg max-w-none article-content">
                  <div dangerouslySetInnerHTML={{ __html: renderEnhancedContent(article?.content || '') }} />
                </div>
                
                {/* Réactions des lecteurs */}
                <div className="my-8 flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`flex items-center gap-2 ${hasReacted ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : ''}`}
                      onClick={handleReaction}
                    >
                      <ThumbsUp className={`h-4 w-4 ${hasReacted ? 'fill-indigo-600 text-indigo-600' : ''}`} />
                      <span>{reactionCount}</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleBookmark}
                      className={`flex items-center gap-2 ${isBookmarked ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : ''}`}
                    >
                      <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-indigo-600 text-indigo-600' : ''}`} />
                      <span>Sauvegarder</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
