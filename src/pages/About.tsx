
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InstagramCTA from '@/components/InstagramCTA';
import { Beaker, Award, BookOpen, Users, CheckCircle, MessageCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  const teamMembers = [
    {
      name: "Dr. Marie Dubois",
      role: "Fondatrice & Directrice Scientifique",
      bio: "Docteur en biochimie et nutritionniste, Marie a travaillé pendant 15 ans dans la recherche sur les compléments alimentaires avant de fonder Natural&Pure.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      name: "Thomas Legrand",
      role: "Responsable SEO & Marketing Digital",
      bio: "Expert en stratégie de contenu et optimisation SEO, Thomas a pour mission de rendre la science accessible au plus grand nombre via des contenus optimisés.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400"
    }
  ];

  const values = [
    {
      icon: <Beaker className="h-8 w-8 text-natural-600" />,
      title: "Rigueur Scientifique",
      description: "Toutes nos affirmations sont basées sur des études publiées dans des revues scientifiques à comité de lecture."
    },
    {
      icon: <Award className="h-8 w-8 text-natural-600" />,
      title: "Qualité Premium",
      description: "Nous maintenons les plus hauts standards de qualité dans nos recherches et recommandations."
    },
    {
      icon: <BookOpen className="h-8 w-8 text-natural-600" />,
      title: "Accessibilité",
      description: "Nous rendons l'information scientifique complexe accessible à tous, sans sacrifier la précision."
    },
    {
      icon: <Users className="h-8 w-8 text-natural-600" />,
      title: "Communauté",
      description: "Nous créons une communauté active et engagée autour de la santé naturelle fondée sur des preuves."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-natural-50 to-white -z-10"></div>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 fade-in">
              <div className="inline-block px-3 py-1 bg-natural-100 text-natural-700 rounded-full text-sm font-medium mb-2">
                À propos de nous
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
                Notre mission: Démystifier la science du bien-être naturel
              </h1>
              <p className="text-lg text-muted-foreground">
                Natural&Pure est un laboratoire de recherche indépendant dédié à l'analyse scientifique des approches naturelles 
                pour la santé et le bien-être. Notre équipe transforme des données scientifiques complexes en informations 
                pratiques et accessibles.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-natural-100 rounded-full opacity-50 -z-10"></div>
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-natural-100 rounded-full opacity-50 -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=600&h=800" 
                alt="Laboratoire Natural&Pure" 
                className="rounded-lg shadow-lg slide-up w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-medium mb-6">Notre Histoire</h2>
            <p className="text-lg text-muted-foreground">
              Natural&Pure est né d'une vision simple mais puissante : créer un pont entre la recherche scientifique 
              rigoureuse et le grand public passionné de santé naturelle.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 slide-up">
              <h3 className="font-display text-2xl font-medium">De la frustration à l'innovation</h3>
              <p className="text-muted-foreground">
                En tant que chercheuse en biochimie, notre fondatrice Dr. Marie Dubois était frustrée par l'écart 
                entre les découvertes scientifiques et les informations disponibles au public sur les compléments 
                alimentaires et les soins naturels.
              </p>
              <p className="text-muted-foreground">
                Trop souvent, elle constatait que des affirmations non fondées ou des exagérations marketing prenaient 
                le pas sur les données scientifiques, laissant les consommateurs dans la confusion.
              </p>
              <p className="text-muted-foreground">
                En 2020, elle a décidé de changer cette situation en fondant Natural&Pure, un laboratoire dédié 
                à l'analyse objective et à la vulgarisation des recherches scientifiques dans le domaine de la santé naturelle.
              </p>
            </div>
            <div className="relative">
              <div className="p-2 bg-white shadow-lg rounded-lg rotate-3 absolute -top-4 -left-4 w-32 z-10">
                <img 
                  src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=200&h=200" 
                  alt="Recherche scientifique" 
                  className="rounded w-full"
                />
              </div>
              <div className="p-2 bg-white shadow-lg rounded-lg -rotate-2 absolute -bottom-4 -right-4 w-36 z-10">
                <img 
                  src="https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80&w=200&h=200" 
                  alt="Analyse en laboratoire" 
                  className="rounded w-full"
                />
              </div>
              <img 
                src="https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&q=80&w=600&h=700" 
                alt="Notre fondatrice" 
                className="rounded-lg shadow-xl slide-right w-full object-cover relative z-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-natural-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-medium mb-6">Nos Valeurs</h2>
            <p className="text-lg text-muted-foreground">
              Chez Natural&Pure, nos valeurs fondamentales guident chacune de nos actions et publications.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className={`glass rounded-lg p-8 text-center slide-up delay-${(index + 1) * 100}`}
              >
                <div className="inline-flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="font-display text-xl font-medium mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <img 
                src="https://images.unsplash.com/photo-1579165466741-7f35e4755183?auto=format&fit=crop&q=80&w=800&h=600" 
                alt="Notre approche" 
                className="rounded-lg shadow-lg slide-up"
              />
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <h2 className="font-display text-3xl md:text-4xl font-medium">Notre Approche</h2>
              <p className="text-muted-foreground">
                Nous croyons qu'une information précise et fondée sur des preuves est essentielle pour prendre 
                de bonnes décisions concernant sa santé. Notre méthode rigoureuse comprend :
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-natural-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Analyse approfondie des études</h4>
                    <p className="text-sm text-muted-foreground">
                      Nous examinons minutieusement la méthodologie, les échantillons et les résultats des études scientifiques.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-natural-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Contextualisation des découvertes</h4>
                    <p className="text-sm text-muted-foreground">
                      Nous plaçons les découvertes individuelles dans le contexte plus large de la recherche existante.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-natural-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Vulgarisation sans simplification excessive</h4>
                    <p className="text-sm text-muted-foreground">
                      Nous rendons l'information accessible sans sacrifier la nuance ou la précision scientifique.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-natural-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Transparence totale</h4>
                    <p className="text-sm text-muted-foreground">
                      Nous citons toujours nos sources et divulguons les limites des études présentées.
                    </p>
                  </div>
                </li>
              </ul>
              <div className="pt-4">
                <Button className="bg-gradient-to-r from-natural-500 to-natural-600 hover:from-natural-600 hover:to-natural-700" asChild>
                  <Link to="/articles">
                    Découvrir nos articles
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-natural-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-medium mb-6">Notre Équipe</h2>
            <p className="text-lg text-muted-foreground">
              Des professionnels passionnés qui transforment la science complexe en informations pratiques et accessibles.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {teamMembers.map((member, index) => (
              <div key={index} className={`glass rounded-lg overflow-hidden flex flex-col md:flex-row slide-up delay-${(index + 1) * 100}`}>
                <div className="md:w-1/3">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <h3 className="font-display text-xl font-medium mb-1">{member.name}</h3>
                  <p className="text-natural-600 text-sm mb-4">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-medium mb-6">Notre Vision d'Avenir</h2>
            <p className="text-lg text-muted-foreground">
              Nous envisageons un monde où chacun a accès à des informations scientifiques fiables pour 
              prendre des décisions éclairées concernant sa santé naturelle.
            </p>
          </div>
          <div className="glass rounded-xl p-8 md:p-12 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-display text-2xl font-medium mb-4">Application Mobile</h3>
                <p className="text-muted-foreground mb-4">
                  Nous développons une application mobile qui permettra à nos utilisateurs d'accéder à :
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-natural-600 mr-2 flex-shrink-0" />
                    <span className="text-sm">Des rappels personnalisés pour leur routine bien-être</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-natural-600 mr-2 flex-shrink-0" />
                    <span className="text-sm">Des conseils adaptatifs basés sur leur profil de santé</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-natural-600 mr-2 flex-shrink-0" />
                    <span className="text-sm">Un "Docteur AI" pour des recommandations personnalisées</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-natural-600 mr-2 flex-shrink-0" />
                    <span className="text-sm">Un accès exclusif à notre bibliothèque de ressources</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-display text-2xl font-medium mb-4">Expansion de la Recherche</h3>
                <p className="text-muted-foreground mb-4">
                  Nous prévoyons d'élargir nos domaines de recherche pour inclure :
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-natural-600 mr-2 flex-shrink-0" />
                    <span className="text-sm">Les innovations en médecine fonctionnelle</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-natural-600 mr-2 flex-shrink-0" />
                    <span className="text-sm">L'impact du microbiome sur la santé globale</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-natural-600 mr-2 flex-shrink-0" />
                    <span className="text-sm">Les approches intégratives pour la santé mentale</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-natural-600 mr-2 flex-shrink-0" />
                    <span className="text-sm">Les interactions entre nutrition et épigénétique</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto glass rounded-xl p-12 text-center">
            <h2 className="font-display text-3xl font-medium mb-6">Rejoignez-nous dans cette aventure</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Que vous soyez un professionnel de la santé, un passionné de bien-être ou simplement curieux, 
              nous vous invitons à faire partie de notre communauté.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                className="bg-gradient-to-r from-natural-500 to-natural-600 hover:from-natural-600 hover:to-natural-700"
                asChild
              >
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Nous suivre
                </a>
              </Button>
              <Button 
                variant="outline"
                className="border-natural-200 hover:bg-natural-50"
                asChild
              >
                <Link to="/contact">
                  <Mail className="h-5 w-5 mr-2" />
                  Nous contacter
                </Link>
              </Button>
            </div>
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

export default About;
