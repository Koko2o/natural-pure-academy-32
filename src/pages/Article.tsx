
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Tag, Instagram } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import InstagramCarousel from "@/components/InstagramCarousel";

// Fonction fictive pour récupérer un article
const fetchArticle = async (id: string) => {
  // Simulation d'une requête API
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    id,
    title: "Les compléments alimentaires essentiels pour supporter votre système immunitaire",
    author: "Dr. Marie Dupont",
    date: "15 juin 2023",
    category: "Nutrition",
    readTime: "8 min",
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
  
  const { data: article, isLoading, error } = useQuery({
    queryKey: ['article', id],
    queryFn: () => fetchArticle(id || '1')
  });
  
  // Simuler un article partiellement visible (pour démonstration)
  useEffect(() => {
    const timer = setTimeout(() => {
      // Activer le flou après 10 secondes (simulation)
      setIsBlurred(true);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, []);

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
        {/* Hero section */}
        <div className="w-full h-[40vh] md:h-[50vh] relative">
          <div className="absolute inset-0 bg-black/30 z-10"></div>
          <img 
            src={article?.image} 
            alt={article?.title} 
            className="w-full h-full object-cover"
          />
          <div className="container mx-auto px-4 absolute inset-0 z-20 flex flex-col justify-end pb-8">
            <Button variant="outline" size="sm" className="bg-white w-fit mb-4" asChild>
              <Link to="/articles">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour aux articles
              </Link>
            </Button>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-4xl">
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
        
        {/* Article content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <div 
              className={`prose prose-lg max-w-none ${isBlurred ? 'relative' : ''}`}
              dangerouslySetInnerHTML={{ __html: article?.content || '' }}
            />
            
            {isBlurred && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent h-96 flex flex-col justify-end items-center pb-8">
                <div className="bg-primary/5 rounded-lg p-4 mb-6 max-w-md text-center">
                  <h3 className="text-xl font-semibold mb-2">Débloquez l'accès complet</h3>
                  <p className="text-muted-foreground mb-4">
                    Suivez-nous sur Instagram pour accéder à l'intégralité de nos articles et recevoir des conseils exclusifs.
                  </p>
                  <Button asChild className="bg-gradient-to-r from-[#0A66C2] to-[#4CAF50] hover:from-[#095fb3] hover:to-[#429a47]">
                    <a href="https://instagram.com/naturalandpure" target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <Instagram className="mr-2 h-5 w-5" />
                      Suivre sur Instagram
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Carousel Instagram */}
        <div className="container mx-auto px-4 mb-12">
          <Separator className="mb-12" />
          <InstagramCarousel />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Article;
