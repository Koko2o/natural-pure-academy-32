
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturedArticle from '@/components/FeaturedArticle';
import ArticleCard from '@/components/ArticleCard';
import LabIntro from '@/components/LabIntro';
import InstagramCTA from '@/components/InstagramCTA';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MoveRight } from 'lucide-react';

const Index = () => {
  // Mock data for featured articles
  const featuredArticle = {
    id: "1",
    title: "Les antioxydants : comment ils protègent vos cellules et ralentissent le vieillissement",
    excerpt: "Une analyse approfondie des différents antioxydants, leur mécanisme d'action au niveau cellulaire et les preuves scientifiques de leur efficacité contre le stress oxydatif.",
    category: "Nutrition",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1200&h=900",
    date: "15 Juin 2023",
    readTime: "8 min de lecture"
  };

  // Mock data for recent articles
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
      path: "/articles?category=supplements"
    },
    {
      name: "Soins de la Peau",
      image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=400&h=400",
      path: "/articles?category=skincare"
    },
    {
      name: "Santé des Cheveux",
      image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=400&h=400",
      path: "/articles?category=haircare"
    },
    {
      name: "Bien-être",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400&h=400",
      path: "/articles?category=wellness"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-natural-50 to-white -z-10"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-natural-100/40 clip-path-slant -z-10"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-natural-100 text-natural-700 rounded-full text-sm font-medium mb-4 fade-in">
              Fondé sur la Science
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6 slide-up">
              La recherche naturelle <br />au service de votre santé
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 slide-up delay-100">
              Des articles scientifiques rigoureux et accessibles sur les compléments alimentaires, 
              les soins de la peau, et le bien-être global.
            </p>
            <div className="flex flex-wrap gap-4 slide-up delay-200">
              <Button className="group bg-gradient-to-r from-natural-500 to-natural-600 hover:from-natural-600 hover:to-natural-700" asChild>
                <Link to="/articles">
                  Explorez nos articles
                  <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" className="border-natural-200 hover:bg-natural-50" asChild>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  Suivre sur Instagram
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent -z-10"></div>
      </section>

      {/* Featured Article */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
            <h2 className="font-display text-3xl font-medium">Article à la Une</h2>
            <Link to="/articles" className="group text-natural-600 font-medium inline-flex items-center hover:text-natural-700 transition-colors mt-2 md:mt-0">
              Voir tous les articles
              <MoveRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <FeaturedArticle {...featuredArticle} />
        </div>
      </section>

      {/* Lab Introduction */}
      <LabIntro />

      {/* Recent Articles */}
      <section className="py-20 bg-natural-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
            <h2 className="font-display text-3xl font-medium">Articles Récents</h2>
            <Link to="/articles" className="group text-natural-600 font-medium inline-flex items-center hover:text-natural-700 transition-colors mt-2 md:mt-0">
              Voir tous les articles
              <MoveRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentArticles.map((article, index) => (
              <ArticleCard 
                key={article.id} 
                {...article} 
                className={`slide-up delay-${(index + 1) * 100}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-medium mb-4">Explorez par Catégorie</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez des articles scientifiques rigoureux organisés par domaines d'expertise pour faciliter votre recherche.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCategories.map((category, index) => (
              <Link 
                key={index} 
                to={category.path} 
                className={`group relative overflow-hidden rounded-lg aspect-square slide-up delay-${(index + 1) * 100}`}
              >
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-display text-xl font-medium">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <InstagramCTA />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
