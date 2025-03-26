
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturedArticle from '@/components/FeaturedArticle';
import ArticleCard from '@/components/ArticleCard';
import LabIntro from '@/components/LabIntro';
import InstagramCarousel from '@/components/InstagramCarousel';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { MoveRight, Leaf, Microscope, Beaker, ShieldCheck, Activity, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement pour permettre les animations d'entrée
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Mock data pour l'article vedette
  const featuredArticle = {
    id: "1",
    title: "Les antioxydants : comment ils protègent vos cellules et ralentissent le vieillissement",
    excerpt: "Une analyse approfondie des différents antioxydants, leur mécanisme d'action au niveau cellulaire et les preuves scientifiques de leur efficacité contre le stress oxydatif.",
    category: "Nutrition",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1200&h=900",
    date: "15 Juin 2023",
    readTime: "8 min de lecture"
  };

  // Mock data pour les articles récents
  const recentArticles = [
    {
      id: "2",
      title: "Vitamine D et immunité : pourquoi elle est essentielle en hiver",
      excerpt: "Découvrez comment la vitamine D joue un rôle crucial dans le renforcement du système immunitaire et comment optimiser vos niveaux en période hivernale.",
      category: "Compléments",
      image: "https://images.unsplash.com/photo-1616671276441-2f2d2c7a667b?auto=format&fit=crop&q=80&w=800&h=600",
      date: "2 Juin 2023",
      readTime: "6 min de lecture"
    },
    {
      id: "3",
      title: "Acides gras oméga-3 : guide complet pour choisir le bon supplément",
      excerpt: "Une comparaison scientifique des différentes sources d'oméga-3, leur biodisponibilité et les critères de qualité à vérifier avant d'acheter.",
      category: "Compléments",
      image: "https://images.unsplash.com/photo-1535185384036-28bbc8035f28?auto=format&fit=crop&q=80&w=800&h=600",
      date: "28 Mai 2023",
      readTime: "7 min de lecture"
    },
    {
      id: "4",
      title: "Routine anti-âge naturelle : les actifs prouvés scientifiquement",
      excerpt: "Quels ingrédients naturels ont démontré leur efficacité dans des études cliniques pour lutter contre les signes du vieillissement cutané?",
      category: "Soins de la Peau",
      image: "https://images.unsplash.com/photo-1596178060810-72f53ce9a65c?auto=format&fit=crop&q=80&w=800&h=600",
      date: "20 Mai 2023",
      readTime: "5 min de lecture"
    }
  ];

  const popularCategories = [
    {
      name: "Compléments Alimentaires",
      image: "https://images.unsplash.com/photo-1577086664693-894d853976a8?auto=format&fit=crop&q=80&w=400&h=400",
      path: "/articles?category=supplements",
      icon: <Beaker className="h-6 w-6" />
    },
    {
      name: "Soins de la Peau",
      image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=400&h=400",
      path: "/articles?category=skincare",
      icon: <Leaf className="h-6 w-6" />
    },
    {
      name: "Santé des Cheveux",
      image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=400&h=400",
      path: "/articles?category=haircare",
      icon: <Activity className="h-6 w-6" />
    },
    {
      name: "Bien-être",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400&h=400",
      path: "/articles?category=wellness",
      icon: <ShieldCheck className="h-6 w-6" />
    }
  ];

  const handleQuizClick = () => {
    toast.info("Lancez notre quiz scientifique pour découvrir vos besoins spécifiques en nutriments", {
      icon: <Microscope className="text-indigo-600" />,
      duration: 5000
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-natural-50 to-white">
        <div className="flex flex-col items-center">
          <Beaker className="h-16 w-16 text-natural-600 animate-pulse" />
          <p className="mt-4 text-natural-700 font-medium">Préparation des analyses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section Améliorée */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-natural-50 to-white -z-10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTIuNWEuNS41IDAgMDAtLjUtLjVoLTd2LTJoLTV2Mmgtd2EuNS41IDAgMDAtLjUuNVYyOGgydi02aDE0djZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-5"></div>
        
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl fade-in">
              <span className="inline-block px-3 py-1 bg-natural-100 text-natural-700 rounded-full text-sm font-medium mb-4">
                Laboratoire Natural&Pure
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
                La science naturelle à votre service
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Des solutions basées sur des recherches scientifiques rigoureuses pour améliorer votre santé et votre bien-être au quotidien.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="group bg-gradient-to-r from-natural-500 to-natural-600 hover:from-natural-600 hover:to-natural-700 shadow-md hover:shadow-lg" 
                  asChild
                  onClick={handleQuizClick}
                >
                  <Link to="/quiz">
                    Découvrir mon profil nutritionnel
                    <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button variant="outline" className="border-natural-200 hover:bg-natural-50 shadow-sm" asChild>
                  <Link to="/articles">
                    Explorer nos articles
                  </Link>
                </Button>
              </div>
              
              {/* Badges de confiance */}
              <div className="mt-8 flex flex-wrap gap-4 items-center">
                <div className="py-1 px-3 bg-white/80 shadow-sm rounded-full text-xs text-natural-700 border border-natural-100 flex items-center">
                  <BookOpen className="h-3 w-3 mr-2 text-natural-500" />
                  +120 articles scientifiques
                </div>
                <div className="py-1 px-3 bg-white/80 shadow-sm rounded-full text-xs text-natural-700 border border-natural-100 flex items-center">
                  <Microscope className="h-3 w-3 mr-2 text-natural-500" />
                  Validé par 3 universités
                </div>
                <div className="py-1 px-3 bg-white/80 shadow-sm rounded-full text-xs text-natural-700 border border-natural-100 flex items-center">
                  <ShieldCheck className="h-3 w-3 mr-2 text-natural-500" />
                  +10,000 profils analysés
                </div>
              </div>
            </div>
            
            <div className="relative hidden md:block">
              <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-natural-100/50 to-transparent rounded-2xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=500&h=700" 
                alt="Laboratoire et recherche naturelle" 
                className="rounded-2xl shadow-xl mx-auto transform -rotate-2 hover:rotate-0 transition-transform duration-500"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-3">
                <div className="flex items-center">
                  <div className="bg-natural-100 p-2 rounded-full">
                    <Beaker className="h-5 w-5 text-natural-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-natural-800">Étude scientifique</p>
                    <p className="text-xs text-natural-600">n=243 participants</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section des catégories populaires */}
      <section className="py-16 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-natural-200 to-transparent"></div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-medium mb-4">Solutions Ciblées</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explorez nos solutions scientifiques adaptées à vos besoins spécifiques
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCategories.map((category, index) => (
              <Link 
                key={index} 
                to={category.path} 
                className="group relative overflow-hidden rounded-xl h-64 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 z-10"></div>
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent z-20">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center">
                      <div className="bg-natural-100 rounded-full p-2">
                        {category.icon}
                      </div>
                      <h3 className="ml-3 text-natural-800 font-display text-lg font-medium">{category.name}</h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild variant="outline" className="bg-white shadow-sm">
              <Link to="/labo-solutions" className="group">
                Voir toutes nos solutions
                <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 bg-natural-50/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-natural-200 to-transparent"></div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-8">
            <h2 className="font-display text-3xl font-medium">Dernière découverte</h2>
            <Link to="/articles" className="group text-natural-600 font-medium inline-flex items-center hover:text-natural-700 transition-colors mt-2 md:mt-0">
              Voir tous les articles
              <MoveRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <FeaturedArticle {...featuredArticle} className="shadow-lg hover:shadow-xl transition-all duration-300" />
          
          {/* CTA Quiz sous l'article */}
          <div className="mt-10 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-md overflow-hidden">
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-6">
                <h3 className="font-display text-xl md:text-2xl font-medium mb-3 text-indigo-900">
                  Découvrez votre profil nutritionnel personnalisé
                </h3>
                <p className="text-indigo-700">
                  Notre quiz basé sur notre étude scientifique (n=243) révèle vos besoins spécifiques en nutriments.
                </p>
              </div>
              <Button 
                className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-lg"
                size="lg"
                asChild
              >
                <Link to="/quiz">
                  Commencer le quiz
                  <Microscope className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-8">
            <h2 className="font-display text-3xl font-medium">Articles Récents</h2>
            <Link to="/articles" className="group text-natural-600 font-medium inline-flex items-center hover:text-natural-700 transition-colors mt-2 md:mt-0">
              Tous les articles
              <MoveRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentArticles.map((article, index) => (
              <ArticleCard 
                key={article.id} 
                {...article} 
                className="shadow-md hover:shadow-lg transition-all duration-300 h-full"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lab Introduction avec léger redesign */}
      <LabIntro />

      {/* Instagram Carousel au lieu du CTA simple */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <InstagramCarousel />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
