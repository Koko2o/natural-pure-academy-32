
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Microscope, Search, BookOpen, FileText, Brain, HeartPulse, Dna, Apple, Moon } from 'lucide-react';
import ScientificHighlightedText from '@/components/ScientificHighlightedText';
import InstagramCTA from '@/components/InstagramCTA';

// Interface pour les études scientifiques
interface ScientificStudy {
  id: string;
  title: string;
  simplifiedTitle: string;
  originalAuthors: string;
  date: string;
  journal: string;
  simplifiedSummary: string;
  keyFinding: string;
  percentage?: number;
  category: string;
  tags: string[];
  difficulty: 'facile' | 'moyen' | 'avancé';
  sourceLink?: string;
}

// Catégories d'études
const categories = [
  { id: 'all', name: 'Toutes les catégories', icon: <Microscope className="h-4 w-4" /> },
  { id: 'immunity', name: 'Immunité', icon: <HeartPulse className="h-4 w-4" /> },
  { id: 'brain', name: 'Cerveau & Cognition', icon: <Brain className="h-4 w-4" /> },
  { id: 'nutrition', name: 'Nutrition', icon: <Apple className="h-4 w-4" /> },
  { id: 'sleep', name: 'Sommeil', icon: <Moon className="h-4 w-4" /> },
  { id: 'genetics', name: 'Génétique', icon: <Dna className="h-4 w-4" /> },
];

// Données des études (à remplacer par des données réelles)
const scientificStudies: ScientificStudy[] = [
  {
    id: '1',
    title: "Effets de la supplémentation en Maca (Lepidium meyenii) sur l'énergie et la fatigue perçues",
    simplifiedTitle: "La maca booste-t-elle vraiment l'énergie?",
    originalAuthors: "Gonzales GF, Córdova A, Vega K, et al.",
    date: "Janvier 2023",
    journal: "Journal of Ethnopharmacology",
    simplifiedSummary: "Cette étude a suivi 80 personnes pendant 8 semaines. Un groupe a pris 3g de maca par jour, l'autre un placebo (pilule sans effet). Les participants ne savaient pas quel groupe ils intégraient.",
    keyFinding: "La maca a augmenté l'énergie ressentie chez 70% des participants, avec des effets visibles dès la 2ème semaine de consommation",
    percentage: 70,
    category: "nutrition",
    tags: ["maca", "énergie", "fatigue", "adaptogène"],
    difficulty: "facile",
    sourceLink: "https://doi.org/10.1016/j.jep.2022.12.005"
  },
  {
    id: '2',
    title: "Impact de la vitamine D3 sur les infections respiratoires saisonnières chez les adultes en déficit",
    simplifiedTitle: "Vitamine D et rhumes : ce que dit la science",
    originalAuthors: "Martineau AR, Jolliffe DA, Hooper RL, et al.",
    date: "Février 2022",
    journal: "British Medical Journal",
    simplifiedSummary: "Une méta-analyse portant sur 11 321 participants de 25 essais cliniques. Les chercheurs ont analysé l'effet de la supplémentation quotidienne ou hebdomadaire en vitamine D sur les infections respiratoires.",
    keyFinding: "La supplémentation en vitamine D a réduit de 42% le risque d'infections respiratoires chez les personnes ayant un déficit sévère initial",
    percentage: 42,
    category: "immunity",
    tags: ["vitamine D", "immunité", "infections respiratoires", "hiver"],
    difficulty: "moyen",
    sourceLink: "https://doi.org/10.1136/bmj.n2559"
  },
  {
    id: '3',
    title: "Effets neuroprotecteurs des acides gras oméga-3 sur les fonctions cognitives dans le vieillissement normal",
    simplifiedTitle: "Oméga-3 et mémoire : le lien prouvé",
    originalAuthors: "Samieri C, Feart C, Letenneur L, et al.",
    date: "Mars 2022",
    journal: "Neurology",
    simplifiedSummary: "Étude de cohorte suivant 1 640 adultes de plus de 65 ans pendant 5 ans. La consommation d'oméga-3 a été mesurée par questionnaires alimentaires et analyses sanguines.",
    keyFinding: "Les participants avec les niveaux les plus élevés d'oméga-3 ont présenté un déclin cognitif 25% moins rapide que ceux ayant les niveaux les plus bas",
    percentage: 25,
    category: "brain",
    tags: ["oméga-3", "mémoire", "cognition", "vieillissement"],
    difficulty: "moyen",
    sourceLink: "https://doi.org/10.1212/WNL.0000000000013121"
  },
  {
    id: '4',
    title: "L'impact du magnésium sur la qualité du sommeil et les niveaux de cortisol nocturne",
    simplifiedTitle: "Le magnésium : allié du sommeil?",
    originalAuthors: "Abbasi B, Kimiagar M, Sadeghniiat K, et al.",
    date: "Avril 2023",
    journal: "Journal of Research in Medical Sciences",
    simplifiedSummary: "Essai clinique randomisé en double aveugle sur 46 personnes souffrant d'insomnie. Un groupe a reçu 500mg de magnésium par jour pendant 8 semaines, l'autre un placebo.",
    keyFinding: "Le groupe magnésium a constaté une amélioration de 63% de la qualité du sommeil et une réduction de 29% du temps d'endormissement",
    percentage: 63,
    category: "sleep",
    tags: ["magnésium", "sommeil", "insomnie", "stress"],
    difficulty: "facile",
    sourceLink: "https://doi.org/10.4103/jrms.JRMS_1358_21"
  },
  {
    id: '5',
    title: "Analyse génomique de la réponse aux polyphénols du thé vert selon les polymorphismes COMT",
    simplifiedTitle: "Pourquoi le thé vert fonctionne mieux chez certaines personnes",
    originalAuthors: "Hursel R, Janssens PL, Bouwman FG, et al.",
    date: "Mai 2022",
    journal: "American Journal of Clinical Nutrition",
    simplifiedSummary: "Cette étude a examiné 62 participants présentant différents profils génétiques de l'enzyme COMT, qui métabolise les catéchines du thé vert. Après 12 semaines de supplémentation standardisée, les chercheurs ont mesuré les effets métaboliques.",
    keyFinding: "Les personnes ayant le génotype COMT 'lent' ont montré une perte de poids 3,2 fois supérieure avec le même extrait de thé vert",
    percentage: 320,
    category: "genetics",
    tags: ["thé vert", "EGCG", "génétique", "métabolisme"],
    difficulty: "avancé",
    sourceLink: "https://doi.org/10.1093/ajcn/nqab195"
  },
];

const BibliothequeScientifique = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [filteredStudies, setFilteredStudies] = useState<ScientificStudy[]>(scientificStudies);

  // Fonction pour filtrer les études
  useEffect(() => {
    const filtered = scientificStudies.filter((study) => {
      const matchesSearch = 
        searchTerm === '' || 
        study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        study.simplifiedTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        study.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || study.category === selectedCategory;
      
      const matchesDifficulty = 
        selectedDifficulty.length === 0 || 
        selectedDifficulty.includes(study.difficulty);
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
    
    setFilteredStudies(filtered);
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  // Gérer le changement de difficulté
  const handleDifficultyChange = (difficulty: string) => {
    setSelectedDifficulty(prevDifficulties => {
      if (prevDifficulties.includes(difficulty)) {
        return prevDifficulties.filter(d => d !== difficulty);
      } else {
        return [...prevDifficulties, difficulty];
      }
    });
  };

  // Réinitialiser les filtres
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedDifficulty([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white -z-10"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-2xl bg-indigo-100 flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-indigo-600" />
              </div>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">
              Bibliothèque Scientifique Simplifiée
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Des études scientifiques traduites en langage clair pour comprendre 
              facilement les bienfaits des actifs naturels sur la santé.
            </p>
            
            {/* Barre de recherche */}
            <div className="max-w-xl mx-auto relative">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Rechercher par actif, bénéfice ou terme scientifique..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="border-natural-200 hover:bg-natural-50"
                >
                  Réinitialiser
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contenu Principal */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar Filtres */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 glass rounded-lg p-6">
                <h2 className="font-display text-xl font-medium mb-4 flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Filtres
                </h2>
                
                {/* Catégories */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Catégories</h3>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant="ghost"
                        className={`justify-start w-full text-left ${
                          selectedCategory === category.id
                            ? "bg-natural-100 text-natural-700 hover:bg-natural-200"
                            : "hover:bg-natural-50"
                        }`}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <div className="flex items-center">
                          {category.icon}
                          <span className="ml-2">{category.name}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Niveau de complexité */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Niveau de complexité</h3>
                  <div className="space-y-2">
                    {['facile', 'moyen', 'avancé'].map((difficulty) => (
                      <div key={difficulty} className="flex items-center">
                        <input
                          type="checkbox"
                          id={difficulty}
                          checked={selectedDifficulty.includes(difficulty)}
                          onChange={() => handleDifficultyChange(difficulty)}
                          className="h-4 w-4 rounded border-natural-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor={difficulty} className="ml-2 text-sm text-natural-700 capitalize">
                          {difficulty}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Liste des Études */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h2 className="font-display text-2xl font-medium mb-1">Résultats</h2>
                <p className="text-muted-foreground">
                  {filteredStudies.length} étude{filteredStudies.length !== 1 ? 's' : ''} scientifique{filteredStudies.length !== 1 ? 's' : ''}
                </p>
              </div>
              
              {filteredStudies.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredStudies.map((study, index) => (
                    <motion.div
                      key={study.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-md transition-shadow border-natural-200 overflow-hidden">
                        <CardContent className="p-0">
                          {/* Bannière de catégorie */}
                          <div className={`h-2 w-full ${
                            study.category === 'immunity' ? 'bg-red-500' :
                            study.category === 'brain' ? 'bg-blue-500' :
                            study.category === 'nutrition' ? 'bg-green-500' :
                            study.category === 'sleep' ? 'bg-purple-500' :
                            'bg-amber-500'
                          }`}></div>
                          
                          <div className="p-5">
                            {/* Titre simplifié */}
                            <h3 className="font-semibold text-lg mb-2 text-natural-800">
                              {study.simplifiedTitle}
                            </h3>
                            
                            {/* Résultat clé */}
                            <div className="bg-natural-50 p-3 rounded-lg mb-3 border border-natural-100">
                              <p className="font-medium text-natural-700">
                                <ScientificHighlightedText text={study.keyFinding} />
                              </p>
                            </div>
                            
                            {/* Résumé simplifié */}
                            <p className="text-sm text-natural-600 mb-4">
                              {study.simplifiedSummary}
                            </p>
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mb-3">
                              {study.tags.map((tag, i) => (
                                <Badge
                                  key={i}
                                  variant="outline"
                                  className="bg-natural-50 border-natural-200 text-natural-700 font-normal"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            
                            {/* Méta-informations */}
                            <div className="flex items-center justify-between text-xs text-natural-500">
                              <span>
                                {study.date} • {study.journal}
                              </span>
                              <Badge
                                variant="outline"
                                className={`
                                  ${study.difficulty === 'facile' ? 'bg-green-50 border-green-200 text-green-700' : 
                                    study.difficulty === 'moyen' ? 'bg-amber-50 border-amber-200 text-amber-700' : 
                                    'bg-red-50 border-red-200 text-red-700'}
                                `}
                              >
                                {study.difficulty}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-natural-50 rounded-lg">
                  <Microscope className="h-12 w-12 text-natural-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-natural-700 mb-1">Aucune étude trouvée</h3>
                  <p className="text-natural-600 mb-4">Essayez de modifier vos critères de recherche</p>
                  <Button onClick={resetFilters}>Réinitialiser les filtres</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Guide de lecture */}
      <section className="py-16 bg-natural-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-center mb-8">
              Comment lire une étude scientifique?
            </h2>
            
            <Tabs defaultValue="pourquoi" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="pourquoi">Pourquoi c'est important</TabsTrigger>
                <TabsTrigger value="comment">Comment nous simplifions</TabsTrigger>
                <TabsTrigger value="termes">Glossaire scientifique</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pourquoi" className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-medium text-lg mb-3">Pourquoi lire les études sources?</h3>
                <p className="mb-4 text-natural-700">
                  Comprendre les recherches scientifiques vous permet de:
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs font-medium text-indigo-700">1</span>
                    </div>
                    <span className="text-natural-700">Faire des choix de santé basés sur des preuves et non des tendances marketing</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs font-medium text-indigo-700">2</span>
                    </div>
                    <span className="text-natural-700">Évaluer si un produit correspond vraiment à vos besoins spécifiques</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs font-medium text-indigo-700">3</span>
                    </div>
                    <span className="text-natural-700">Comprendre les mécanismes d'action des ingrédients naturels</span>
                  </li>
                </ul>
              </TabsContent>
              
              <TabsContent value="comment" className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-medium text-lg mb-3">Notre méthodologie de simplification</h3>
                <p className="mb-4 text-natural-700">
                  Chaque étude scientifique présentée ici a été:
                </p>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-green-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <span className="text-natural-700">Analysée par notre équipe scientifique pour garantir sa qualité et sa pertinence</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-green-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <span className="text-natural-700">Simplifiée sans dénaturer les conclusions ou exagérer les résultats</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-green-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <span className="text-natural-700">Contextualité pour donner une vision claire des conditions de l'étude</span>
                  </li>
                </ul>
              </TabsContent>
              
              <TabsContent value="termes" className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-medium text-lg mb-3">Comprendre les termes scientifiques</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-natural-800">Étude randomisée contrôlée</p>
                    <p className="text-sm text-natural-600">Un type d'étude où les participants sont répartis au hasard entre groupe test et groupe contrôle. C'est la référence en recherche clinique.</p>
                  </div>
                  <div>
                    <p className="font-medium text-natural-800">Double aveugle</p>
                    <p className="text-sm text-natural-600">Ni les participants ni les chercheurs ne savent qui reçoit le traitement actif ou le placebo, réduisant les biais.</p>
                  </div>
                  <div>
                    <p className="font-medium text-natural-800">Placebo</p>
                    <p className="text-sm text-natural-600">Substance inactive ayant l'apparence du traitement testé, utilisée comme point de comparaison.</p>
                  </div>
                  <div>
                    <p className="font-medium text-natural-800">Biodisponibilité</p>
                    <p className="text-sm text-natural-600">Proportion d'une substance qui atteint la circulation sanguine et peut exercer son effet.</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
      
      {/* Instagram CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <InstagramCTA />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default BibliothequeScientifique;
