
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Beaker, Search, Dna, Microscope, ChevronRight, ArrowUpRight, 
  GraduationCap, BookOpen, FileText, Award, FlaskConical, Leaf, 
  PieChart, Calculator, BarChart 
} from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import LabIntro from '@/components/LabIntro';
import { StudyData, studyData } from '@/components/labo/StudyData';
import { IngredientCard } from '@/components/labo/IngredientCard';
import { PublicationCard } from '@/components/labo/PublicationCard';

const LaboSolutions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStudy, setActiveStudy] = useState<StudyData | null>(null);
  const [showStudyDetails, setShowStudyDetails] = useState(false);

  const filteredStudies = searchQuery 
    ? studyData.filter(study => 
        study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        study.keyFindings.some(finding => finding.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : studyData;

  const handleViewStudy = (study: StudyData) => {
    setActiveStudy(study);
    setShowStudyDetails(true);
  };

  const handleCloseStudyDetails = () => {
    setShowStudyDetails(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section with Vibrant Gradient */}
        <section className="relative py-16 md:py-20 overflow-hidden bg-gradient-to-br from-natural-600 via-natural-500 to-natural-400">
          <div className="absolute inset-0 bg-grid-white/5 bg-[size:32px_32px]"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center p-2 bg-white/10 rounded-full backdrop-blur-sm mb-6">
                <FlaskConical className="h-6 w-6 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-medium text-white mb-6">
                Laboratoire Natural Solutions
              </h1>
              <p className="text-natural-50 text-lg mb-8 leading-relaxed">
                Explorez les avancées scientifiques derrière nos solutions naturelles, testées et validées par des études cliniques rigoureuses.
              </p>
              <div className="relative max-w-xl mx-auto mb-8">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-natural-500" />
                </div>
                <Input
                  type="text"
                  placeholder="Rechercher des nutriments, études ou pathologies..."
                  className="bg-white/90 backdrop-blur-sm border-transparent pl-10 py-6 text-base shadow-lg focus:bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                {['Vitamine D', 'Magnésium', 'Oméga-3', 'Stress Oxydatif', 'Inflammation', 'Microbiote', 'Sommeil'].map((tag) => (
                  <Button 
                    key={tag} 
                    variant="outline"
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
                    onClick={() => setSearchQuery(tag)}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Introduction du Labo */}
        <section className="py-12 md:py-16 bg-natural-50">
          <div className="container mx-auto px-4">
            <LabIntro />
          </div>
        </section>

        {/* Onglets Principaux */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="etudes" className="max-w-4xl mx-auto">
              <div className="flex justify-center mb-8">
                <TabsList className="bg-natural-100 p-1">
                  <TabsTrigger value="etudes" className="data-[state=active]:bg-white data-[state=active]:text-natural-800">
                    <Microscope className="h-4 w-4 mr-2" />
                    Études Cliniques
                  </TabsTrigger>
                  <TabsTrigger value="ingredients" className="data-[state=active]:bg-white data-[state=active]:text-natural-800">
                    <Beaker className="h-4 w-4 mr-2" />
                    Ingrédients Actifs
                  </TabsTrigger>
                  <TabsTrigger value="processus" className="data-[state=active]:bg-white data-[state=active]:text-natural-800">
                    <Dna className="h-4 w-4 mr-2" />
                    Processus R&D
                  </TabsTrigger>
                  <TabsTrigger value="publications" className="data-[state=active]:bg-white data-[state=active]:text-natural-800">
                    <FileText className="h-4 w-4 mr-2" />
                    Publications
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="etudes" className="space-y-6">
                <h2 className="font-display text-2xl text-natural-800 text-center mb-6">Études Cliniques Récentes</h2>
                
                {/* Conditional rendering for study details modal */}
                {showStudyDetails && activeStudy && (
                  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                      <CardHeader className="bg-natural-50 border-b border-natural-100">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl font-medium">{activeStudy.title}</CardTitle>
                            <CardDescription>{activeStudy.authors} ({activeStudy.year})</CardDescription>
                          </div>
                          <div className="flex gap-2">
                            {activeStudy.tags.map(tag => (
                              <span key={tag} className="bg-natural-100 text-natural-700 text-xs font-medium px-3 py-1 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-5 space-y-6">
                        <div>
                          <h3 className="font-medium text-natural-800 mb-2">Résumé de l'étude</h3>
                          <p className="text-natural-600">{activeStudy.description}</p>
                        </div>
                        
                        <div>
                          <h3 className="font-medium text-natural-800 mb-2">Méthodologie</h3>
                          <p className="text-natural-600 mb-2">{activeStudy.methodology}</p>
                          <div className="flex flex-wrap gap-4 mt-3">
                            <div className="bg-natural-50 p-3 rounded-lg flex-1 min-w-[150px]">
                              <div className="text-xs uppercase text-natural-500 font-medium">Participants</div>
                              <div className="text-lg font-medium text-natural-800">{activeStudy.participants}</div>
                            </div>
                            <div className="bg-natural-50 p-3 rounded-lg flex-1 min-w-[150px]">
                              <div className="text-xs uppercase text-natural-500 font-medium">Durée</div>
                              <div className="text-lg font-medium text-natural-800">{activeStudy.duration}</div>
                            </div>
                            <div className="bg-natural-50 p-3 rounded-lg flex-1 min-w-[150px]">
                              <div className="text-xs uppercase text-natural-500 font-medium">Type d'étude</div>
                              <div className="text-lg font-medium text-natural-800">{activeStudy.studyType}</div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium text-natural-800 mb-2">Résultats clés</h3>
                          <ul className="list-disc list-inside text-natural-600 space-y-1">
                            {activeStudy.keyFindings.map((finding, index) => (
                              <li key={index}>{finding}</li>
                            ))}
                          </ul>
                        </div>

                        {activeStudy.charts && (
                          <div>
                            <h3 className="font-medium text-natural-800 mb-2">Données statistiques</h3>
                            <div className="flex items-center justify-center p-4 bg-natural-50 rounded-lg">
                              <BarChart className="h-40 w-full text-natural-400" />
                              <p className="text-xs text-natural-500 mt-2 text-center">
                                Visualisation des données (cliquez pour voir le détail)
                              </p>
                            </div>
                          </div>
                        )}

                        <div className="border-t border-natural-100 pt-4 flex justify-between items-center">
                          {activeStudy.doi && (
                            <a 
                              href={`https://doi.org/${activeStudy.doi}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-natural-600 hover:text-natural-800 flex items-center text-sm"
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              DOI: {activeStudy.doi}
                            </a>
                          )}
                          <Button variant="outline" onClick={handleCloseStudyDetails}>
                            Fermer
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                
                {/* Liste d'études avec style amélioré */}
                {filteredStudies.length > 0 ? (
                  filteredStudies.map((study) => (
                    <Card key={study.id} className="overflow-hidden hover:shadow-md transition-shadow group">
                      <CardHeader className="bg-natural-50 border-b border-natural-100 pb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg font-medium">{study.title}</CardTitle>
                            <CardDescription>{study.authors} ({study.year})</CardDescription>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {study.tags.map(tag => (
                              <span key={tag} className="bg-natural-100 text-natural-700 text-xs font-medium px-3 py-1 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-5">
                        <div className="space-y-3 text-concise">
                          <p className="text-sm text-natural-600 line-clamp-2">{study.description}</p>
                          <ul className="list-disc list-inside text-sm text-natural-700">
                            {study.keyFindings.slice(0, 3).map((finding, idx) => (
                              <li key={idx}>{finding}</li>
                            ))}
                          </ul>
                          <div className="flex justify-end">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-natural-600 hover:text-natural-800 group-hover:bg-natural-50"
                              onClick={() => handleViewStudy(study)}
                            >
                              <span>Voir l'étude complète</span>
                              <ArrowUpRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-natural-500">Aucune étude ne correspond à votre recherche.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4" 
                      onClick={() => setSearchQuery('')}
                    >
                      Réinitialiser la recherche
                    </Button>
                  </div>
                )}
                
                <div className="text-center pt-4">
                  <Button variant="outline" className="border-natural-200 text-natural-700 hover:bg-natural-50">
                    <span>Voir toutes les études</span>
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="ingredients" className="space-y-6">
                <h2 className="font-display text-2xl text-natural-800 text-center mb-6">Ingrédients Clés</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <IngredientCard 
                    name="Ashwagandha"
                    scientificName="Withania somnifera"
                    description="Adaptogène ayant démontré des effets significatifs sur la réduction du stress et de l'anxiété."
                    benefits={[
                      "Réduction du cortisol (hormone du stress)",
                      "Amélioration des fonctions cognitives",
                      "Soutien du système immunitaire"
                    ]}
                    activeCompounds={["Withanolides", "Alcaloïdes", "Glycoprotéines"]}
                    dosage="300-600mg par jour d'extrait standardisé"
                    imageUrl="/ashwagandha.jpg"
                  />
                  
                  <IngredientCard 
                    name="Curcuma"
                    scientificName="Curcuma longa"
                    description="Épice aux puissantes propriétés anti-inflammatoires et antioxydantes."
                    benefits={[
                      "Réduction de l'inflammation chronique",
                      "Protection cellulaire contre le stress oxydatif",
                      "Soutien de la santé articulaire"
                    ]}
                    activeCompounds={["Curcumine", "Déméthoxycurcumine", "Bisdeméthoxycurcumine"]}
                    dosage="500-1000mg par jour avec de la pipérine pour l'absorption"
                    imageUrl="/curcuma.jpg"
                  />
                  
                  <IngredientCard 
                    name="Spiruline"
                    scientificName="Arthrospira platensis"
                    description="Algue bleue-verte reconnue comme super-aliment riche en nutriments essentiels."
                    benefits={[
                      "Source complète de protéines végétales",
                      "Riche en antioxydants (phycocyanine)",
                      "Soutien du système immunitaire"
                    ]}
                    activeCompounds={["Phycocyanine", "Chlorophylle", "Polysaccharides"]}
                    dosage="3-5g par jour en poudre ou comprimés"
                    imageUrl="/spiruline.jpg"
                  />
                  
                  <IngredientCard 
                    name="Rhodiola"
                    scientificName="Rhodiola rosea"
                    description="Adaptogène nordique qui améliore la résistance au stress et combat la fatigue."
                    benefits={[
                      "Réduction de la fatigue mentale",
                      "Amélioration des performances cognitives",
                      "Équilibre des neurotransmetteurs"
                    ]}
                    activeCompounds={["Rosavines", "Salidroside", "Rosines"]}
                    dosage="200-600mg par jour d'extrait standardisé"
                    imageUrl="/rhodiola.jpg"
                  />
                </div>
                
                <div className="mt-8 p-6 bg-natural-50 rounded-xl">
                  <h3 className="font-medium text-natural-800 mb-4 text-center">Notre approche des ingrédients</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center mb-2">
                        <Microscope className="h-5 w-5 text-natural-600 mr-2" />
                        <h4 className="font-medium">Analyse scientifique</h4>
                      </div>
                      <p className="text-sm text-natural-600">Nous étudions les mécanismes d'action et les synergies potentielles entre différents composés actifs.</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center mb-2">
                        <Leaf className="h-5 w-5 text-natural-600 mr-2" />
                        <h4 className="font-medium">Sourcing éthique</h4>
                      </div>
                      <p className="text-sm text-natural-600">Nos ingrédients proviennent de cultures durables, écologiques et sans OGM, avec traçabilité complète.</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center mb-2">
                        <Calculator className="h-5 w-5 text-natural-600 mr-2" />
                        <h4 className="font-medium">Dosage optimal</h4>
                      </div>
                      <p className="text-sm text-natural-600">Chaque ingrédient est dosé selon les données cliniques démontrant son efficacité et sa sécurité.</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="processus" className="space-y-6">
                <h2 className="font-display text-2xl text-natural-800 text-center mb-6">Notre Processus R&D</h2>
                
                <div className="bg-natural-50 rounded-xl p-6">
                  <ol className="relative border-l border-natural-300">
                    {[
                      { 
                        title: "Identification des besoins", 
                        desc: "Identification des problématiques de santé à partir de données épidémiologiques et des retours de notre communauté.",
                        details: "Notre équipe scientifique analyse les données épidémiologiques récentes, les enquêtes de santé publique et les retours de notre communauté pour identifier les besoins les plus pertinents."
                      },
                      { 
                        title: "Recherche bibliographique", 
                        desc: "Analyse approfondie de la littérature scientifique récente sur les actifs naturels pertinents.",
                        details: "Notre équipe de chercheurs examinent plus de 500 publications scientifiques par mois, en se concentrant sur les études cliniques, revues systématiques et méta-analyses publiées dans des journaux à comité de lecture."
                      },
                      { 
                        title: "Développement de formules", 
                        desc: "Création de formulations synergiques basées sur l'efficacité et la biodisponibilité optimales.",
                        details: "Nous combinons des actifs qui agissent sur différentes voies métaboliques pour obtenir un effet synergique, tout en prenant en compte les interactions potentielles, la stabilité et la biodisponibilité des composés."
                      },
                      { 
                        title: "Tests in vitro", 
                        desc: "Évaluation préliminaire de l'efficacité et de la sécurité des formulations en laboratoire.",
                        details: "Nous utilisons des modèles cellulaires et des techniques d'analyse avancées pour évaluer l'activité biologique, la toxicité potentielle et les mécanismes d'action de nos formulations."
                      },
                      { 
                        title: "Essais cliniques pilotes", 
                        desc: "Tests sur petits groupes de volontaires pour valider l'efficacité et affiner les formulations.",
                        details: "Ces essais préliminaires nous permettent d'ajuster les dosages, d'identifier les biomarqueurs pertinents et de confirmer l'absence d'effets indésirables avant les études à plus grande échelle."
                      },
                      { 
                        title: "Études cliniques", 
                        desc: "Validation scientifique par études contrôlées réalisées par des laboratoires indépendants.",
                        details: "Nos formulations sont testées dans des études cliniques randomisées en double aveugle contre placebo, menées par des établissements de recherche indépendants pour garantir l'objectivité des résultats."
                      },
                      { 
                        title: "Production", 
                        desc: "Fabrication selon les normes les plus strictes avec contrôle qualité rigoureux à chaque étape.",
                        details: "Nos produits sont fabriqués dans des installations certifiées GMP (Good Manufacturing Practices) avec traçabilité complète, tests de pureté et d'activité sur chaque lot."
                      }
                    ].map((step, index) => (
                      <li key={index} className="mb-8 ml-6">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-natural-200 rounded-full -left-4 ring-4 ring-white text-natural-700 font-medium">
                          {index + 1}
                        </span>
                        <h3 className="font-medium text-natural-800 mb-1">{step.title}</h3>
                        <p className="text-sm text-natural-600 mb-2">{step.desc}</p>
                        <div className="bg-white p-3 rounded-lg text-xs text-natural-500 mt-2">
                          {step.details}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
                
                <div className="bg-natural-100 rounded-xl p-6 mt-8">
                  <h3 className="font-medium text-natural-800 mb-4 text-center">Notre équipe scientifique</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { role: "Directeur Scientifique", specialite: "Pharmacologie" },
                      { role: "Biochimiste", specialite: "Métabolisme cellulaire" },
                      { role: "Phytothérapeute", specialite: "Pharmacognosie" },
                      { role: "Nutritionniste", specialite: "Micronutrition" },
                    ].map((membre, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg text-center">
                        <div className="w-16 h-16 bg-natural-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                          <GraduationCap className="h-8 w-8 text-natural-500" />
                        </div>
                        <h4 className="font-medium text-natural-800">{membre.role}</h4>
                        <p className="text-xs text-natural-500">{membre.specialite}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="publications" className="space-y-6">
                <h2 className="font-display text-2xl text-natural-800 text-center mb-6">Publications Scientifiques</h2>
                
                <div className="flex gap-4 mb-8 overflow-x-auto p-2 -mx-2">
                  {['Toutes', 'Revues à comité', 'Abstracts', 'Articles', 'Conférences'].map((category) => (
                    <Button 
                      key={category} 
                      variant={category === 'Toutes' ? 'default' : 'outline'}
                      size="sm"
                      className={category === 'Toutes' ? 'bg-natural-700' : 'border-natural-200'}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <PublicationCard
                    title="Effets des polyphénols sur les marqueurs inflammatoires : une revue systématique"
                    authors="Dupont M, Martin S, et al."
                    journal="Journal of Nutritional Biochemistry"
                    year="2023"
                    type="Revue systématique"
                    abstract="Cette revue examine l'impact des différents polyphénols végétaux sur les biomarqueurs de l'inflammation systémique et locale."
                    doi="10.1016/j.jnutbio.2023.08.015"
                  />
                  
                  <PublicationCard
                    title="Mécanismes moléculaires des adaptogènes dans la modulation du stress oxydatif"
                    authors="Lefevre N, Rousseau P, et al."
                    journal="Phytomedicine"
                    year="2022"
                    type="Article original"
                    abstract="Cette recherche identifie les voies de signalisation cellulaire impliquées dans l'effet protecteur des adaptogènes contre le stress oxydatif."
                    doi="10.1016/j.phymed.2022.05.007"
                  />
                  
                  <PublicationCard
                    title="Impact de la supplémentation en zinc sur la fonction immune des adultes séniors"
                    authors="Bernard C, Nguyen T, et al."
                    journal="European Journal of Clinical Nutrition"
                    year="2022"
                    type="Essai clinique"
                    abstract="Cet essai randomisé démontre l'effet d'une supplémentation optimisée en zinc sur plusieurs paramètres de l'immunité chez les personnes âgées de plus de 65 ans."
                    doi="10.1038/s41430-022-1157-8"
                  />
                  
                  <PublicationCard
                    title="Biodisponibilité comparée de différentes formes de magnésium"
                    authors="Lambert A, Schmidt B, et al."
                    journal="Journal of Trace Elements in Medicine and Biology"
                    year="2021"
                    type="Étude comparative"
                    abstract="Cette étude compare la biodisponibilité et l'absorption de cinq formes différentes de magnésium, avec un focus particulier sur les effets neurophysiologiques."
                    doi="10.1016/j.jtemb.2021.03.012"
                  />
                </div>
                
                <div className="mt-8 p-6 bg-natural-50 rounded-xl">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Award className="h-6 w-6 text-natural-700" />
                    <h3 className="font-medium text-natural-800 text-lg">Collaborations académiques</h3>
                  </div>
                  <p className="text-natural-600 text-center max-w-2xl mx-auto">
                    Notre laboratoire collabore avec plusieurs institutions de recherche et universités pour 
                    faire avancer la connaissance scientifique dans le domaine de la nutrition et de la phytothérapie.
                  </p>
                  <div className="flex justify-center gap-8 mt-6">
                    {['Université Paris-Saclay', 'INSERM', 'CNRS', 'Institut Pasteur'].map((institution) => (
                      <div key={institution} className="text-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                          <BookOpen className="h-6 w-6 text-natural-500" />
                        </div>
                        <p className="text-sm font-medium text-natural-700">{institution}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16 bg-natural-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-8">
                <GraduationCap className="h-5 w-5 text-natural-700" />
                <h2 className="font-display text-2xl text-center text-natural-800">Questions Fréquentes</h2>
              </div>
              
              <div className="space-y-4">
                {[
                  { 
                    q: "Comment nos formules sont-elles testées?", 
                    a: "Nos formules subissent des tests rigoureux en laboratoire indépendant et des études cliniques pour garantir leur efficacité et leur sécurité. Chaque formulation passe par des tests in vitro pour évaluer son activité biologique, puis par des essais cliniques sur des volontaires pour confirmer son efficacité et sa tolérance dans des conditions réelles d'utilisation." 
                  },
                  { 
                    q: "Quels sont les critères de sélection des ingrédients?", 
                    a: "Nous sélectionnons uniquement des ingrédients naturels, avec une concentration optimale d'actifs, provenant de sources durables et éthiques. Nos critères incluent l'efficacité démontrée par des études scientifiques, la pureté (absence de contaminants), la traçabilité et le respect de l'environnement. Nous privilégions les ingrédients biologiques lorsque c'est possible." 
                  },
                  { 
                    q: "Comment garantissez-vous la qualité de vos produits?", 
                    a: "Chaque lot de production est testé pour sa pureté, sa concentration en principes actifs et l'absence de contaminants. Nous utilisons des méthodes analytiques avancées comme la chromatographie HPLC, la spectrométrie de masse et des tests microbiologiques. Les certificats d'analyse sont disponibles sur demande pour chaque lot de production." 
                  },
                  { 
                    q: "Peut-on combiner plusieurs de vos produits?", 
                    a: "Oui, nos produits sont conçus pour fonctionner en synergie. Notre équipe scientifique évalue soigneusement les interactions potentielles entre les différents ingrédients actifs pour s'assurer qu'ils peuvent être utilisés ensemble en toute sécurité. Pour des conseils personnalisés, notre équipe de nutritionnistes est disponible pour vous guider." 
                  },
                  { 
                    q: "Comment distinguer un complément efficace d'un produit marketing?", 
                    a: "Un complément véritablement efficace s'appuie sur des études cliniques publiées, utilise des dosages thérapeutiques validés scientifiquement, et garantit une transparence totale sur ses ingrédients. Méfiez-vous des allégations miraculeuses, des témoignages non vérifiables et des formules propriétaires qui ne détaillent pas les dosages précis des actifs. Consultez notre guide d'évaluation scientifique des compléments pour en savoir plus." 
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-white rounded-lg p-5 border border-natural-200 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-medium text-natural-800 mb-2">{faq.q}</h3>
                    <p className="text-sm text-natural-600">{faq.a}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-natural-100 p-6 rounded-xl">
                <div className="text-center mb-4">
                  <h3 className="font-medium text-natural-800">Vous avez d'autres questions?</h3>
                  <p className="text-sm text-natural-600">Notre équipe scientifique se fera un plaisir de vous répondre</p>
                </div>
                <div className="flex justify-center">
                  <Button className="bg-natural-700 hover:bg-natural-800">
                    Contacter nos experts
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LaboSolutions;
