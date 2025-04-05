import Navbar from "@/components/Navbar";
import FeaturedArticle from "@/components/FeaturedArticle";
import InstagramCTA from "@/components/InstagramCTA";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MoveRight, Microscope, Award, Users, CheckCircle, Beaker, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import ScientificMethodology from "../components/ScientificMethodology";
import ScientificTeam from "../components/ScientificTeam";
import ScientificPublications from "../components/ScientificPublications";

const Index = () => {
  const [animatedCounter, setAnimatedCounter] = useState(963);
  const [analysesLeft, setAnalysesLeft] = useState(87);
  const [activeHeroProblem, setActiveHeroProblem] = useState(0);
  const isMobile = useIsMobile();

  const heroProblemsCycle = [
    {
      title: "Stress et Fatigue",
      description: "Identifiez les micronutriments qui vous manquent réellement",
      bgGradient: "from-indigo-600 via-purple-600 to-indigo-700"
    },
    {
      title: "Sommeil Perturbé",
      description: "Découvrez les solutions naturelles validées scientifiquement",
      bgGradient: "from-blue-600 via-violet-600 to-purple-700"
    },
    {
      title: "Problèmes Digestifs",
      description: "Révélez les causes profondes validées par notre laboratoire",
      bgGradient: "from-emerald-600 via-teal-600 to-emerald-700"
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

      <section className={`bg-gradient-to-r ${heroProblemsCycle[activeHeroProblem].bgGradient} text-white py-16 md:py-24 relative overflow-hidden transition-colors duration-1000`}>
        {/* Effet de particules pour un aspect laboratoire */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M36 34h-2v-4h2v4zm0-6h-2v-4h2v4zm0-6h-2v-4h2v4zm0-6h-2v-4h2v4zm0-6h-2v-4h2v4zm0-6h-2v-4h2v4z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '16px 16px'
        }}></div>

        {/* Cercles lumineux animés */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl animate-pulse delay-300"></div>
        <div className="absolute bottom-40 right-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse delay-700"></div>

        {/* Bulles de laboratoire qui flottent */}
        <div className="hidden md:block absolute top-40 left-10 w-16 h-16 rounded-full border-2 border-white/20 bg-white/5 backdrop-blur-sm animate-float"></div>
        <div className="hidden md:block absolute bottom-20 right-10 w-12 h-12 rounded-full border-2 border-white/20 bg-white/5 backdrop-blur-sm animate-float-delayed"></div>

        {/* Animation de molécules */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-6 h-6 bg-white/10 backdrop-blur-md rounded-full top-1/4 left-1/3 animate-molecule-1"></div>
          <div className="absolute w-4 h-4 bg-white/20 backdrop-blur-md rounded-full top-2/3 left-1/5 animate-molecule-2"></div>
          <div className="absolute w-8 h-8 bg-white/15 backdrop-blur-md rounded-full bottom-1/4 right-1/4 animate-molecule-3"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-2 bg-white/20 rounded-full backdrop-blur-sm mb-6 animate-fadeIn shadow-xl">
              <Beaker className="h-5 w-5 text-white mr-2" />
              <span className="text-white text-sm font-medium">Laboratoire Indépendant</span>
            </div>

            <div className="h-auto mb-6 relative">
              {heroProblemsCycle.map((problem, index) => (
                <div 
                  key={index}
                  className={`w-full transition-all duration-700 ${
                    activeHeroProblem === index 
                      ? 'opacity-100' 
                      : 'opacity-0 absolute inset-0 pointer-events-none'
                  }`}
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                    <span className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm inline-block mb-4">
                      {problem.title}
                    </span>
                  </h1>

                  <div className="mt-6 mb-8">
                    <h2 className="text-2xl md:text-3xl text-white/90 font-semibold mb-3">
                      {problem.description}
                    </h2>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fadeIn delay-200 max-w-3xl mx-auto">
              <span className="block mb-2">Basé sur une étude exclusive menée sur 243 participants.</span>
              <span className="block">Identifiez vos besoins réels en micronutriments.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 animate-fadeIn delay-300">
              <Button 
                asChild
                size="jumbo"
                className="group relative z-10 shadow-lg pulse-animation bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black border-0"
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
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 text-white flex items-center shadow-lg">
                <Users className="h-5 w-5 mr-2 text-amber-300" />
                <div>
                  <span className="font-bold text-2xl">{animatedCounter}</span>
                  <span className="text-sm ml-1">profils analysés</span>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 text-white flex items-center shadow-lg">
                <Award className="h-5 w-5 mr-2 text-amber-300" />
                <span className="text-sm">72% d'efficacité prouvée</span>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 text-white flex items-center shadow-lg">
                <Microscope className="h-5 w-5 mr-2 text-amber-300" />
                <span className="text-sm">3 universités partenaires</span>
              </div>

              <div className="mt-2 sm:mt-0 bg-amber-500/30 backdrop-blur-sm rounded-xl px-4 py-3 text-white flex items-center border border-amber-500/50 shadow-lg">
                <div className="w-full">
                  <span className="text-sm">Analyses restantes aujourd'hui: <span className="font-bold">{analysesLeft}/100</span></span>
                  <div className="w-full bg-white/20 h-1.5 rounded-full mt-1">
                    <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: `${analysesLeft}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Effet de motif scientifique en bas */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-white/0 via-white/20 to-white/0"></div>

        {/* Tubes à essai animés sur les côtés (visible uniquement sur desktop) */}
        <div className="hidden lg:block absolute bottom-10 left-5 w-24 h-96">
          <div className="absolute bottom-0 w-8 h-48 rounded-b-full rounded-t-lg overflow-hidden border-2 border-white/30 backdrop-blur-sm transform -rotate-12">
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-amber-300 to-amber-500 h-3/4 animate-bubble"></div>
          </div>
        </div>
        <div className="hidden lg:block absolute bottom-16 right-10 w-24 h-72">
          <div className="absolute bottom-0 w-8 h-36 rounded-b-full rounded-t-lg overflow-hidden border-2 border-white/30 backdrop-blur-sm transform rotate-6">
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-blue-300 to-blue-500 h-2/3 animate-bubble-delayed"></div>
          </div>
        </div>
      </section>

      {/* Notre méthodologie scientifique */}
      <ScientificMethodology />
      
      {/* Notre équipe scientifique */}
      <ScientificTeam />
      
      {/* Publications scientifiques */}
      <ScientificPublications />

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="indigo" className="mb-2">
              <Sparkles className="h-3 w-3 mr-1" /> 
              Validé Scientifiquement
            </Badge>
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
                badge: "72% d'efficacité prouvée",
                gradient: "from-amber-100 to-amber-50"
              },
              {
                title: "Troubles du Sommeil",
                description: "Des composés naturels peuvent améliorer votre sommeil de 71% sans effets secondaires",
                badge: "85% des participants ont vu une amélioration",
                gradient: "from-blue-100 to-blue-50"
              },
              {
                title: "Fatigue Persistante",
                description: "Découvrez les 3 minéraux essentiels que 78% des adultes sous-consomment",
                badge: "91% de gain d'énergie en 3 semaines",
                gradient: "from-orange-100 to-orange-50"
              },
              {
                title: "Défenses Immunitaires",
                description: "Notre étude sur 243 participants démontre l'efficacité des antioxydants spécifiques",
                badge: "68% moins de maladies saisonnières",
                gradient: "from-green-100 to-green-50"
              },
              {
                title: "Problèmes Digestifs",
                description: "Identifiez les 5 composés naturels qui ont transformé la santé intestinale de nos participants",
                badge: "89% de satisfaction",
                gradient: "from-red-100 to-red-50"
              },
              {
                title: "Performances Cognitives",
                description: "La combinaison optimale de nutriments pour votre cerveau validée par nos chercheurs",
                badge: "76% de gain de concentration",
                gradient: "from-purple-100 to-purple-50"
              }
            ].map((problem, index) => (
              <div 
                key={index} 
                className={`bg-gradient-to-br ${problem.gradient} rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all animate-fadeIn border border-slate-100`}
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
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-md hover:shadow-lg animate-pulse-slow"
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
            <Badge variant="indigo" className="mb-2">
              <Microscope className="h-3 w-3 mr-1" /> 
              Approche Scientifique
            </Badge>
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
                icon: <Microscope className="h-10 w-10 text-indigo-600" />,
                bgGradient: "from-indigo-50 to-blue-50"
              },
              {
                title: "Personnalisation Complète",
                description: "Des résultats uniques adaptés à votre profil, vos symptômes et votre mode de vie",
                icon: <Users className="h-10 w-10 text-indigo-600" />,
                bgGradient: "from-purple-50 to-indigo-50"
              },
              {
                title: "Solutions Garanties",
                description: "72% de nos utilisateurs rapportent une amélioration significative en 16 semaines",
                icon: <CheckCircle className="h-10 w-10 text-indigo-600" />,
                bgGradient: "from-blue-50 to-cyan-50"
              }
            ].map((advantage, index) => (
              <div 
                key={index} 
                className={`p-6 border border-slate-200 rounded-xl hover:border-indigo-200 transition-all animate-fadeIn bg-gradient-to-br ${advantage.bgGradient}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-white rounded-full mb-4 shadow-md">
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

      <style>
{`
@keyframes pulse-animation {
  0% {
    box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(251, 191, 36, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(251, 191, 36, 0);
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

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float 8s 1s ease-in-out infinite;
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

.delay-700 {
  animation-delay: 0.7s;
}

.animate-pulse-slow {
  animation: pulse-animation 3s infinite;
}

@keyframes bubble {
  0%, 100% {
    height: 75%;
  }
  50% {
    height: 78%;
  }
}

.animate-bubble {
  animation: bubble 5s ease-in-out infinite;
}

.animate-bubble-delayed {
  animation: bubble 7s ease-in-out infinite;
}

@keyframes molecule-1 {
  0% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(20px, 30px);
  }
  50% {
    transform: translate(-10px, 50px);
  }
  75% {
    transform: translate(-30px, 20px);
  }
  100% {
    transform: translate(0, 0);
  }
}

.animate-molecule-1 {
  animation: molecule-1 25s ease-in-out infinite;
}

@keyframes molecule-2 {
  0% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(-25px, -30px);
  }
  66% {
    transform: translate(35px, -15px);
  }
  100% {
    transform: translate(0, 0);
  }
}

.animate-molecule-2 {
  animation: molecule-2 30s ease-in-out infinite;
}

@keyframes molecule-3 {
  0% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(30px, 30px);
  }
  66% {
    transform: translate(-20px, 40px);
  }
  100% {
    transform: translate(0, 0);
  }
}

.animate-molecule-3 {
  animation: molecule-3 20s ease-in-out infinite;
}
`}
      </style>
    </div>
  );
};

export default Index;