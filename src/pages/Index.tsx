import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScientificHighlightedText from "@/components/ui/ScientificHighlightedText";
import ProblemRotator from "@/components/quiz/ProblemRotator";
import LabEffects from '@/components/quiz/LabEffects';
import { Beaker, Check, Microscope, Brain, BookOpen, Award, Leaf, ChevronRight, Calendar, HeartPulse, Dumbbell, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SEOHead from '@/components/SEOHead';
import QuickNavigationCards from '@/components/QuickNavigationCards';

// Images (à remplacer par vos propres images)
const labImage = "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=800&auto=format&fit=crop&q=80";
const nutritionImage = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80";
const researchImage = "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop&q=80";

const HomePage = () => {
  return (
    <>
      <SEOHead 
        title="Natural Pure Academy | Nutrition basée sur la science"
        description="Découvrez des approches naturelles pour votre santé basées sur des preuves scientifiques. Testez gratuitement votre profil nutritionnel."
      />

      <Navbar />

      <main className="overflow-hidden">
        {/* Hero Section avec animation */}
        <section className="relative bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 pt-20 pb-16 md:pb-24 md:pt-32 overflow-hidden">
          <LabEffects />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Solutions naturelles</span>
                    <br />validées par la science
                  </h1>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <p className="text-lg md:text-xl text-slate-700">
                    Découvrez votre profil nutritionnel personnalisé et des recommandations basées sur des preuves scientifiques.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Button asChild size="lg" className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-full px-8">
                    <Link to="/quiz">
                      Commencer votre test gratuit
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full border-slate-300 hover:bg-slate-100">
                    <Link to="/articles">
                      Explorer nos articles
                    </Link>
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex items-center gap-5 pt-2"
                >
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br ${
                        ['from-sky-400 to-blue-500', 'from-teal-400 to-green-500', 'from-purple-400 to-indigo-500', 'from-amber-400 to-orange-500'][i]
                      } flex items-center justify-center text-white text-xs font-medium`}>
                        {['JD', 'MR', 'AS', 'KL'][i]}
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-slate-600">
                    <strong>4,800+</strong> personnes ont déjà découvert leur profil nutritionnel
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="relative bg-white p-6 rounded-2xl shadow-xl overflow-hidden">
                  <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-teal-100 rounded-full opacity-60"></div>
                  <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-100 rounded-full opacity-60"></div>

                  <div className="relative z-10">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2">
                        <HeartPulse className="h-6 w-6 text-rose-500" />
                        <h3 className="text-lg font-semibold">Profil Nutritionnel</h3>
                      </div>
                      <div className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
                        Exemple
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Santé digestive</span>
                          <span className="text-sm font-medium">78%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Niveau d'énergie</span>
                          <span className="text-sm font-medium">63%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full" style={{ width: '63%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Qualité du sommeil</span>
                          <span className="text-sm font-medium">45%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <h4 className="font-medium mb-2">Recommandations personnalisées</h4>
                        <ul className="space-y-2">
                          {['Augmenter l\'apport en magnésium', 'Réduire la consommation de sucres raffinés', 'Intégrer plus d\'aliments riches en probiotiques'].map((rec, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600">
                        Découvrir mon profil
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
        </section>

        {/* Problèmes de santé - Conservé comme demandé */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Problèmes de santé que nous abordons
              </h2>
              <p className="text-lg text-slate-600">
                Des solutions naturelles, des résultats prouvés
              </p>
            </div>

            <ProblemRotator />

            <div className="mt-12 text-center">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/quiz">
                  Découvrez vos problèmes de santé cachés
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Notre approche - Redesign de la section méthodologie */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                  Notre approche
                </span>
                <h2 className="text-3xl font-bold mb-4">Une science accessible pour tous</h2>
                <p className="text-lg text-slate-600 mb-6">
                  Notre approche scientifique est rigoureuse mais accessible. Nous traduisons des recherches complexes en recommandations simples et pratiques.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                  {[
                    {
                      icon: <Microscope className="h-5 w-5 text-indigo-600" />,
                      title: "Recherche avancée",
                      desc: "Analyses rigoureuses des études scientifiques récentes"
                    },
                    {
                      icon: <BookOpen className="h-5 w-5 text-green-600" />,
                      title: "Simplicité",
                      desc: "Explications claires sans jargon compliqué"
                    },
                    {
                      icon: <Shield className="h-5 w-5 text-amber-600" />,
                      title: "Transparence",
                      desc: "Sources vérifiables et références scientifiques"
                    },
                    {
                      icon: <Award className="h-5 w-5 text-rose-600" />,
                      title: "Résultats prouvés",
                      desc: "Recommandations validées par des données concrètes"
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 items-start rounded-xl p-4 hover:bg-white hover:shadow-sm transition-all">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">{item.title}</h3>
                        <p className="text-sm text-slate-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/scientific-methodology" className="flex items-center gap-2">
                    Découvrir notre méthodologie 
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="md:w-1/2">
                <div className="relative">
                  <div className="absolute -top-5 -left-5 w-24 h-24 bg-blue-100 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-teal-100 rounded-full opacity-60"></div>

                  <img 
                    src={researchImage} 
                    alt="Notre approche scientifique" 
                    className="rounded-xl shadow-lg relative z-10 w-full h-80 object-cover"
                  />

                  <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow z-20">
                    <div className="flex gap-3 items-center">
                      <Brain className="h-8 w-8 text-indigo-500" />
                      <div>
                        <h4 className="font-semibold">Publications scientifiques</h4>
                        <p className="text-sm text-slate-600">Plus de 450 études analysées en 2025</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pourquoi faire notre test - Conservé comme demandé */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Pourquoi faire notre test ?
              </h2>
              <p className="text-lg text-slate-600">
                Un plan personnalisé basé sur votre profil unique
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Leaf className="h-10 w-10 text-green-500" />,
                  title: "Recommandations personnalisées",
                  desc: "Des conseils adaptés à vos besoins spécifiques, vos symptômes et votre mode de vie."
                },
                {
                  icon: <HeartPulse className="h-10 w-10 text-rose-500" />,
                  title: "Suivi de votre santé",
                  desc: "Visualisez vos progrès et ajustez vos habitudes en fonction de vos résultats."
                },
                {
                  icon: <Calendar className="h-10 w-10 text-blue-500" />,
                  title: "Plan d'action précis",
                  desc: "Des étapes concrètes et réalisables pour améliorer votre santé naturellement."
                }
              ].map((item, i) => (
                <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  <div className={`p-1 ${['bg-gradient-to-r from-green-100 to-teal-100', 'bg-gradient-to-r from-rose-100 to-pink-100', 'bg-gradient-to-r from-blue-100 to-indigo-100'][i]}`}>
                    <CardContent className="bg-white p-6 rounded-t-lg">
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${['bg-green-50', 'bg-rose-50', 'bg-blue-50'][i]}`}>
                          {item.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                        <p className="text-slate-600">{item.desc}</p>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/quiz">
                  Faire le test gratuitement
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Laboratoire - Conservé et amélioré avec image */}
        <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2 order-2 md:order-1">
                <div className="relative">
                  <div className="absolute -top-5 -right-5 w-24 h-24 bg-indigo-100 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-3 -left-3 w-16 h-16 bg-purple-100 rounded-full opacity-60"></div>

                  <img 
                    src={labImage} 
                    alt="Notre laboratoire" 
                    className="rounded-xl shadow-lg relative z-10 w-full h-80 object-cover"
                  />

                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm py-2 px-4 rounded-full shadow z-20">
                    <div className="flex gap-2 items-center">
                      <Beaker className="h-5 w-5 text-indigo-500" />
                      <p className="text-sm font-medium text-indigo-900">Laboratoire certifié</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2 order-1 md:order-2">
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
                  Notre laboratoire
                </span>
                <h2 className="text-3xl font-bold mb-4">Un laboratoire dédié à la science nutritionnelle</h2>
                <p className="text-lg text-slate-600 mb-6">
                  Notre équipe de chercheurs et nutritionnistes travaille sans relâche pour identifier les meilleures solutions naturelles appuyées par la science.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "Analyse de biodisponibilité des nutriments",
                    "Étude des interactions entre compléments",
                    "Validation des formulations par des essais cliniques",
                    "Optimisation des dosages pour des résultats optimaux"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="p-1 bg-indigo-100 rounded-full">
                        <Check className="h-5 w-5 text-indigo-600" />
                      </div>
                      <p className="text-slate-700">{item}</p>
                    </div>
                  ))}
                </div>

                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/labo-solutions" className="flex items-center gap-2">
                    Découvrir notre laboratoire
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Témoignages */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Ce que nos utilisateurs disent
              </h2>
              <p className="text-lg text-slate-600">
                Des résultats concrets qui changent des vies
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote: "Après des années de fatigue chronique, les recommandations personnalisées m'ont aidé à retrouver mon énergie en seulement 3 semaines.",
                  author: "Marie L.",
                  role: "Professeure, 42 ans",
                  avatar: "M"
                },
                {
                  quote: "Le test a identifié exactement mes déséquilibres nutritionnels. Les suppléments recommandés ont transformé ma digestion et mon sommeil.",
                  author: "Thomas R.",
                  role: "Ingénieur, 35 ans",
                  avatar: "T"
                },
                {
                  quote: "Enfin des conseils basés sur la science et non sur des tendances! J'ai pu résoudre mes problèmes d'inflammation en suivant leur approche.",
                  author: "Sophie G.",
                  role: "Kinésithérapeute, 38 ans",
                  avatar: "S"
                }
              ].map((item, i) => (
                <div key={i} className="bg-gradient-to-br from-slate-50 to-sky-50 p-6 rounded-xl shadow-sm">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-amber-400">★</span>
                      ))}
                    </div>

                    <p className="italic text-slate-700 flex-grow mb-6">"{item.quote}"</p>

                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium bg-gradient-to-br ${
                        ['from-teal-400 to-green-500', 'from-blue-400 to-indigo-500', 'from-rose-400 to-pink-500'][i]
                      }`}>
                        {item.avatar}
                      </div>
                      <div>
                        <p className="font-medium">{item.author}</p>
                        <p className="text-sm text-slate-500">{item.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Articles récents */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-green-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-10">
              <div>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-2">
                  Derniers articles
                </span>
                <h2 className="text-3xl font-bold">Nos conseils et recherches</h2>
              </div>

              <Button asChild variant="outline" className="hidden md:flex items-center gap-2">
                <Link to="/articles">
                  Tous nos articles
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "10 nutriments essentiels pour renforcer votre système immunitaire",
                  excerpt: "Découvrez les compléments scientifiquement prouvés pour soutenir vos défenses naturelles.",
                  image: nutritionImage,
                  category: "Nutrition",
                  date: "2 mai 2025"
                },
                {
                  title: "Comment le magnésium peut transformer votre sommeil",
                  excerpt: "Une étude récente révèle l'impact majeur de ce minéral sur la qualité du sommeil et l'énergie.",
                  image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&auto=format&fit=crop&q=80",
                  category: "Sommeil",
                  date: "28 avril 2025"
                },
                {
                  title: "Les probiotiques : guide complet pour la santé digestive",
                  excerpt: "Tout ce que vous devez savoir sur les bonnes bactéries et leur impact sur votre microbiome.",
                  image: "https://images.unsplash.com/photo-1612460627213-2d2d1cfb9fb8?w=800&auto=format&fit=crop&q=80",
                  category: "Digestion",
                  date: "15 avril 2025"
                }
              ].map((article, i) => (
                <Card key={i} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all">
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-teal-600">{article.category}</span>
                      <span className="text-xs text-slate-500">{article.date}</span>
                    </div>
                    <h3 className="font-semibold text-xl mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                    <Button asChild variant="link" className="p-0 h-auto">
                      <Link to="/articles" className="flex items-center gap-1 text-teal-600">
                        Lire l'article
                        <ChevronRight className="h-3 w-3" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Button asChild variant="outline">
                <Link to="/articles">
                  Voir tous nos articles
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-20 bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 max-w-3xl mx-auto">
              Découvrez votre profil nutritionnel personnalisé aujourd'hui
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Rejoignez plus de 4 800 personnes qui ont déjà transformé leur santé grâce à nos recommandations basées sur la science
            </p>
            <Button asChild size="lg" className="bg-white text-teal-600 hover:bg-slate-100 rounded-full px-8">
              <Link to="/quiz">
                Commencer le test gratuit
              </Link>
            </Button>
            <p className="text-sm opacity-80 mt-4">
              Test complet en moins de 3 minutes - Résultats immédiats
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default HomePage;