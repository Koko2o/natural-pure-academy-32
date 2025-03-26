
import Navbar from "@/components/Navbar";
import FeaturedArticle from "@/components/FeaturedArticle";
import InstagramCTA from "@/components/InstagramCTA";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MoveRight, Microscope, Award, Users, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Index = () => {
  const [animatedCounter, setAnimatedCounter] = useState(963);
  const [analysesLeft, setAnalysesLeft] = useState(87);
  const [activeHeroProblem, setActiveHeroProblem] = useState(0);
  const heroProblemsCycle = [
    {
      title: "Stress et Fatigue",
      description: "Identifiez les micronutriments qui vous manquent réellement",
      bgColor: "from-indigo-600 to-blue-600"
    },
    {
      title: "Sommeil Perturbé",
      description: "Découvrez les solutions naturelles validées scientifiquement",
      bgColor: "from-blue-600 to-purple-600"
    },
    {
      title: "Problèmes Digestifs",
      description: "Révélez les causes profondes validées par notre laboratoire",
      bgColor: "from-emerald-600 to-teal-600"
    }
  ];
  
  useEffect(() => {
    // Automatically cycle through hero problems
    const problemInterval = setInterval(() => {
      setActiveHeroProblem(prev => (prev + 1) % heroProblemsCycle.length);
    }, 5000);
    
    const counterInterval = setInterval(() => {
      setAnimatedCounter(prev => {
        const increment = Math.floor(Math.random() * 3) + 1;
        return prev + increment;
      });
      
      setAnalysesLeft(prev => Math.max(12, prev - 1));
    }, 10000);
    
    const toastTimeout = setTimeout(() => {
      toast("Nouvelle étude scientifique disponible", {
        description: "72% des personnes testées ont vu une amélioration en 16 semaines",
        icon: <Microscope className="h-5 w-5" />,
      });
    }, 5000);
    
    return () => {
      clearInterval(counterInterval);
      clearInterval(problemInterval);
      clearTimeout(toastTimeout);
    };
  }, [heroProblemsCycle.length]);
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className={`bg-gradient-to-r ${heroProblemsCycle[activeHeroProblem].bgColor} text-white py-16 md:py-24 relative overflow-hidden transition-colors duration-1000`}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTIuNWEuNS41IDAgMDAtLjUtLjVoLTd2LTJoLTV2Mmgtd2EuNS41IDAgMDAtLjUuNVYyOGgydi02aDE0djZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
        
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse delay-300"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-2 bg-white/20 rounded-full backdrop-blur-sm mb-6 animate-fadeIn">
              <Microscope className="h-5 w-5 text-white mr-2" />
              <span className="text-white text-sm font-medium">Laboratoire Indépendant</span>
            </div>
            
            <div className="h-36 mb-6">
              {heroProblemsCycle.map((problem, index) => (
                <div 
                  key={index}
                  className={`transition-all duration-700 ${
                    activeHeroProblem === index 
                      ? 'opacity-100 translate-y-0 h-auto' 
                      : 'opacity-0 translate-y-8 h-0 overflow-hidden'
                  }`}
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fadeIn delay-100">
                    <span className="bg-white/20 px-3 py-1 rounded backdrop-blur-sm">
                      {problem.title}
                    </span><br />
                    <span className="mt-3 inline-block">
                      {problem.description}
                    </span>
                  </h1>
                </div>
              ))}
            </div>
            
            <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fadeIn delay-200">
              Basé sur une étude exclusive menée sur 243 participants.<br />
              Identifiez vos besoins réels en micronutriments.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 animate-fadeIn delay-300">
              <Button 
                asChild
                size="jumbo"
                variant="cta" 
                className="group relative z-10 shadow-lg pulse-animation"
              >
                <Link to="/quiz">
                  🧪 Démarrer Mon Test Gratuit
                  <MoveRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button 
                asChild
                size="jumbo"
                variant="outline"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
              >
                <Link to="/articles">
                  Voir les Études Scientifiques
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-3 animate-fadeIn delay-400">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 text-white flex items-center">
                <Users className="h-5 w-5 mr-2 text-amber-300" />
                <div>
                  <span className="font-bold text-2xl">{animatedCounter}</span>
                  <span className="text-sm ml-1">profils analysés</span>
                </div>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 text-white flex items-center">
                <Award className="h-5 w-5 mr-2 text-amber-300" />
                <span className="text-sm">72% d'efficacité prouvée</span>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 text-white flex items-center">
                <Microscope className="h-5 w-5 mr-2 text-amber-300" />
                <span className="text-sm">3 universités partenaires</span>
              </div>

              <div className="mt-2 sm:mt-0 bg-amber-500/30 backdrop-blur-sm rounded-xl px-4 py-3 text-white flex items-center border border-amber-500/50">
                <span className="text-sm">Analyses restantes aujourd'hui: <span className="font-bold">{analysesLeft}/100</span></span>
                <div className="w-full bg-white/20 h-1.5 rounded-full mt-1 ml-2">
                  <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: `${analysesLeft}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Problèmes de Santé Courants</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Nous avons identifié les solutions scientifiques à vos problèmes les plus courants grâce à notre équipe de chercheurs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Stress Chronique",
                description: "La science a identifié les nutriments exacts pour réduire vos hormones de stress",
                badge: "72% d'efficacité prouvée"
              },
              {
                title: "Troubles du Sommeil",
                description: "Des composés naturels peuvent améliorer votre sommeil de 71% sans effets secondaires",
                badge: "85% des participants ont vu une amélioration"
              },
              {
                title: "Fatigue Persistante",
                description: "Découvrez les 3 minéraux essentiels que 78% des adultes sous-consomment",
                badge: "91% de gain d'énergie en 3 semaines"
              },
              {
                title: "Défenses Immunitaires",
                description: "Notre étude sur 243 participants démontre l'efficacité des antioxydants spécifiques",
                badge: "68% moins de maladies saisonnières"
              },
              {
                title: "Problèmes Digestifs",
                description: "Identifiez les 5 composés naturels qui ont transformé la santé intestinale de nos participants",
                badge: "89% de satisfaction"
              },
              {
                title: "Performances Cognitives",
                description: "La combinaison optimale de nutriments pour votre cerveau validée par nos chercheurs",
                badge: "76% de gain de concentration"
              }
            ].map((problem, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all animate-fadeIn"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 text-indigo-900">{problem.title}</h3>
                  <p className="text-gray-600 mb-4">{problem.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full">
                      {problem.badge}
                    </span>
                    <Button 
                      asChild 
                      variant="ghost"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <Link to="/quiz">
                        Solution <MoveRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button 
              asChild
              variant="natural"
              size="lg"
              className="animate-pulse-slow"
            >
              <Link to="/quiz">
                Découvrir vos problèmes de santé cachés
                <MoveRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Pourquoi Faire Notre Test ?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Notre approche scientifique a déjà aidé des milliers de personnes à identifier leurs besoins réels.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Base Scientifique",
                description: "Nos recommandations sont basées sur des études cliniques réelles et des données validées",
                icon: <Microscope className="h-10 w-10 text-indigo-600" />
              },
              {
                title: "Personnalisation Complète",
                description: "Des résultats uniques adaptés à votre profil, vos symptômes et votre mode de vie",
                icon: <Users className="h-10 w-10 text-indigo-600" />
              },
              {
                title: "Solutions Garanties",
                description: "72% de nos utilisateurs rapportent une amélioration significative en 16 semaines",
                icon: <CheckCircle className="h-10 w-10 text-indigo-600" />
              }
            ].map((advantage, index) => (
              <div 
                key={index} 
                className="p-6 border border-slate-200 rounded-xl hover:border-indigo-200 transition-all animate-fadeIn"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-indigo-100 rounded-full mb-4">
                    {advantage.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-800">{advantage.title}</h3>
                  <p className="text-slate-600">{advantage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <FeaturedArticle 
        id="featured-article-1"
        title="Les Micronutriments Essentiels pour Combattre le Stress Chronique"
        excerpt="Découvrez les dernières avancées scientifiques sur le lien entre carence en magnésium et stress chronique."
        category="Bien-être"
        image="/lovable-uploads/181492cf-3c62-402e-b203-ee4b362e5d6c.png"
        date="15 mars 2024"
        readTime="8 min"
        keyInsight="72% d'efficacité prouvée"
      />
      <InstagramCTA />
      <Footer />
      
      <style jsx>{`
        @keyframes pulse-animation {
          0% {
            box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(79, 70, 229, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(79, 70, 229, 0);
          }
        }
        
        .pulse-animation {
          animation: pulse-animation 2s infinite;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s forwards;
        }
        
        .delay-100 {
          animation-delay: 0.1s;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-400 {
          animation-delay: 0.4s;
        }
        
        .animate-pulse-slow {
          animation: pulse-animation 3s infinite;
        }
      `}</style>
    </div>
  );
};

export default Index;
