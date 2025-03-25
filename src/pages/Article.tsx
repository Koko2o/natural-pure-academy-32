
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, ArrowRight, Calendar, User, Tag, Instagram, 
  Beaker, Clock, Users, Award, Microscope, PieChart, BookOpen, X, ChevronRight
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

const Article = () => {
  const { id } = useParams();
  const [isBlurred, setIsBlurred] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [quizPromptShown, setQuizPromptShown] = useState(false);
  const [showInstagramPopup, setShowInstagramPopup] = useState(false);
  const [isGraphDrawerOpen, setIsGraphDrawerOpen] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstagramPopup(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBlurred(true);
    }, 10000);
    
    const quizTimer = setTimeout(() => {
      if (!quizPromptShown) {
        setQuizPromptShown(true);
      }
    }, 15000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(quizTimer);
    };
  }, [quizPromptShown]);

  const handleShowStats = () => {
    setShowGraph(true);
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
      
      <main className="flex-grow">
        <div className="w-full h-[40vh] md:h-[50vh] relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30 z-10"></div>
          <img 
            src={article?.image} 
            alt={article?.title} 
            className="w-full h-full object-cover"
          />
          <div className="container mx-auto px-4 absolute inset-0 z-20 flex flex-col justify-end pb-8">
            <div className="flex flex-wrap gap-3 mb-4">
              <Badge variant="indigo" className="flex items-center gap-1">
                <Beaker className="h-3.5 w-3.5" />
                <span>Laboratoire Indépendant</span>
              </Badge>
              <Badge variant="pill" className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>Étude {article?.studyDuration}</span>
              </Badge>
              <Badge variant="pill" className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                <span>{article?.participants} participants</span>
              </Badge>
              <Badge variant="active" className="flex items-center gap-1">
                <Award className="h-3.5 w-3.5" />
                <span>{article?.keyInsight}</span>
              </Badge>
            </div>
            
            <Button variant="outline" size="sm" className="bg-white/90 w-fit mb-4" asChild>
              <Link to="/articles">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour aux articles
              </Link>
            </Button>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-4xl drop-shadow-md">
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
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 py-4 border-y border-indigo-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Microscope className="h-5 w-5 text-indigo-700 mr-2" />
                  <span className="text-sm font-medium text-indigo-900">Validé par notre laboratoire</span>
                </div>
                <div className="hidden md:flex items-center">
                  <BookOpen className="h-5 w-5 text-indigo-700 mr-2" />
                  <span className="text-sm font-medium text-indigo-900">Basé sur 3 études scientifiques</span>
                </div>
              </div>
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="pill" 
                      size="sm" 
                      className="text-indigo-700 border-indigo-200"
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
                            <Progress value={76} className="h-2" indicatorColor="bg-indigo-500" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Zinc</span>
                              <span className="text-sm font-medium">68%</span>
                            </div>
                            <Progress value={68} className="h-2" indicatorColor="bg-indigo-400" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Probiotiques</span>
                              <span className="text-sm font-medium">82%</span>
                            </div>
                            <Progress value={82} className="h-2" indicatorColor="bg-indigo-600" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4 bg-blue-50">
                        <h4 className="font-medium text-indigo-900 mb-2">Découverte exclusive</h4>
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
            <div 
              className={`prose prose-lg max-w-none ${isBlurred ? 'relative' : ''}`}
              dangerouslySetInnerHTML={{ __html: article?.content || '' }}
            />
            
            <Drawer open={isGraphDrawerOpen} onOpenChange={setIsGraphDrawerOpen}>
              <DrawerTrigger asChild>
                <div className="my-8 p-5 border rounded-lg bg-gradient-to-r from-indigo-50 to-blue-50 shadow-md hover:shadow-lg transition-all cursor-pointer">
                  <h3 className="text-xl font-semibold mb-4 text-indigo-900">Votre niveau de stress vs la norme</h3>
                  <div className="relative h-60 w-full bg-white rounded-lg p-4 overflow-hidden flex flex-col items-center justify-center border border-indigo-100">
                    <div className="text-2xl font-bold text-indigo-600 mb-3">Graphique interactif</div>
                    <p className="text-center text-sm text-muted-foreground mb-4">
                      Cliquez pour voir la visualisation détaillée de votre niveau de stress
                    </p>
                    <div className="relative w-2/3 h-12 bg-gray-100 rounded-full overflow-hidden">
                      <div className="absolute top-0 left-0 bottom-0 w-[65%] bg-gradient-to-r from-green-400 to-indigo-500 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button variant="purple" size="sm" onClick={(e) => {
                      e.stopPropagation(); // Empêcher l'ouverture du drawer
                      handleAnalyzeProfile();
                    }}>
                      <span>Analyser mon profil</span>
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </DrawerTrigger>
              <DrawerContent className="max-h-[85vh] overflow-y-auto">
                <div className="px-4 py-6 max-w-3xl mx-auto">
                  <h2 className="text-2xl font-bold text-indigo-800 mb-4">Analyse détaillée de votre niveau de stress</h2>
                  <div className="h-80 bg-indigo-50 rounded-lg p-6 mb-6 flex items-center justify-center">
                    <div className="text-center">
                      <div className="relative w-full h-40 bg-white rounded-lg shadow-inner p-4 mb-4">
                        <div className="absolute bottom-4 left-4 right-4 h-16 bg-gradient-to-r from-green-200 via-blue-300 to-indigo-400 rounded-md">
                          <div className="absolute bottom-full left-[65%] transform -translate-x-1/2 mb-2">
                            <div className="h-10 w-1 bg-indigo-600 mb-1 mx-auto"></div>
                            <div className="text-xs font-bold text-indigo-700">VOTRE<br />NIVEAU</div>
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
                      <p className="text-indigo-700 font-medium mb-2">Analyse basée sur 1,203 profils similaires</p>
                      <p className="text-sm text-gray-600">Votre niveau de stress est 35% plus élevé que la moyenne optimale</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="border rounded-lg p-4 bg-white shadow-sm">
                      <h3 className="font-semibold text-indigo-700 mb-2">Impact physiologique</h3>
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
                      <h3 className="font-semibold text-indigo-700 mb-2">Recommandations</h3>
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
                      className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white px-6 py-2.5"
                    >
                      Obtenir une analyse complète
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
            
            {quizPromptShown && (
              <div className="my-8 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-6 text-white shadow-lg animate-fade-in">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Découvrez Votre Profil Personnalisé en 2 Min 🧪</h3>
                    <p className="text-indigo-100 mb-4">
                      Basé sur les données de cette étude, notre algorithme peut déterminer vos besoins nutritionnels spécifiques.
                    </p>
                    <p className="text-xs text-indigo-200">Outil développé par notre équipe de chercheurs • Déjà utilisé par 1,234 membres</p>
                  </div>
                  <Button 
                    variant="gradient" 
                    size="lg" 
                    className="whitespace-nowrap"
                    asChild
                  >
                    <Link to="/quiz">
                      Faire le test maintenant
                      <ArrowRight className="ml-1 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}
            
            {isBlurred && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent h-96 flex flex-col justify-end items-center pb-8">
                <div className="bg-white border border-indigo-200 rounded-lg p-6 mb-6 max-w-md text-center shadow-xl">
                  <div className="inline-flex items-center justify-center p-2 bg-indigo-100 rounded-full mb-4">
                    <Microscope className="h-6 w-6 text-indigo-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Accédez à nos découvertes exclusives</h3>
                  <p className="text-slate-600 mb-4">
                    Suivez-nous sur Instagram pour accéder à l'intégralité de nos articles et recevoir des conseils personnalisés basés sur nos recherches scientifiques.
                  </p>
                  <Button asChild className="w-full bg-gradient-to-r from-[#0A66C2] to-[#4CAF50] hover:from-[#095fb3] hover:to-[#429a47]">
                    <a href="https://instagram.com/naturalandpure" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                      <Instagram className="mr-2 h-5 w-5" />
                      Suivre sur Instagram
                    </a>
                  </Button>
                  <p className="text-xs text-slate-500 mt-3">
                    Rejoignez plus de 10,000 lecteurs passionnés par la science de la nutrition
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <Badge variant="indigo" className="mb-2">
                <BookOpen className="h-3.5 w-3.5 mr-1.5" />
                Preuves scientifiques
              </Badge>
              <h2 className="text-2xl font-semibold text-indigo-900 mb-2">Soutenu par la recherche</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Nos recommandations sont basées sur des études cliniques rigoureuses et des recherches scientifiques récentes
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[1, 2, 3].map((index) => (
                <Card key={index} className="border-indigo-100 hover:border-indigo-300 transition-all hover:shadow-md cursor-pointer group">
                  <CardContent className="p-4 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-indigo-100 p-1.5 rounded-full">
                        <Microscope className="h-4 w-4 text-indigo-700" />
                      </div>
                      <span className="font-medium text-indigo-900">Découverte {index}</span>
                    </div>
                    
                    <div className="text-sm text-indigo-800 font-medium my-2">
                      {index === 1 ? "+72% d'efficacité immunitaire" : 
                       index === 2 ? "Réduction stress: 3x meilleur" : 
                       "Absorption optimisée: +68%"}
                    </div>
                    
                    <Badge variant="pill" className="self-start mb-3">{2020 + index}</Badge>
                    
                    <Button 
                      variant="pill" 
                      size="sm"
                      className="self-end mt-auto group-hover:bg-indigo-600 group-hover:text-white transition-colors"
                      onClick={() => handleViewStudy(index)}
                    >
                      Voir l'étude
                      <ChevronRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <Separator className="mb-12" />
          <InstagramCarousel />
        </div>
        
        {/* Nouvelle popup Instagram avec position fixe centrée */}
        {showInstagramPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-[90%] max-w-md bg-white rounded-xl shadow-2xl border border-indigo-100 transition-all duration-300">
              <div className="p-5 relative">
                <button 
                  onClick={() => setShowInstagramPopup(false)} 
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-100 p-1 z-10"
                  aria-label="Fermer"
                >
                  <X className="h-4 w-4" />
                </button>
                
                <div className="flex items-center justify-center">
                  <div className="bg-indigo-100 p-3 rounded-full mb-3">
                    <Microscope className="h-6 w-6 text-indigo-700" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-center">Accédez à nos découvertes exclusives</h3>
                
                <p className="text-sm text-gray-600 mb-5 text-center">
                  Suivez-nous sur Instagram pour accéder à l'intégralité de nos articles et recevoir des conseils personnalisés basés sur nos recherches scientifiques.
                </p>
                
                <Button asChild className="w-full bg-gradient-to-r from-[#0A66C2] to-[#4CAF50] hover:from-[#095fb3] hover:to-[#429a47]">
                  <a href="https://instagram.com/naturalandpure" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    <Instagram className="mr-2 h-5 w-5" />
                    Suivre sur Instagram
                  </a>
                </Button>
                
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Rejoignez plus de 10,000 lecteurs passionnés par la science de la nutrition
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Article;
