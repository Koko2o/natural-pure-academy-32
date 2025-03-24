
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Beaker, Search, Dna, Microscope, ChevronRight, ArrowUpRight, GraduationCap } from 'lucide-react';
import { LabIntro } from '@/components/LabIntro';

const LaboSolutions = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section with Vibrant Gradient */}
        <section className="relative py-16 md:py-20 overflow-hidden bg-gradient-to-br from-natural-600 to-natural-400">
          <div className="absolute inset-0 bg-grid-white/5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center p-2 bg-white/10 rounded-full backdrop-blur-sm mb-6">
                <Beaker className="h-6 w-6 text-white" />
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
                {['Vitamine D', 'Magnésium', 'Oméga-3', 'Stress Oxydatif', 'Inflammation'].map((tag) => (
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
                </TabsList>
              </div>

              <TabsContent value="etudes" className="space-y-6">
                <h2 className="font-display text-2xl text-natural-800 text-center mb-6">Études Cliniques Récentes</h2>
                
                {/* Liste d'études avec style amélioré */}
                {[1, 2, 3].map((study) => (
                  <Card key={study} className="overflow-hidden hover:shadow-md transition-shadow group">
                    <CardHeader className="bg-natural-50 border-b border-natural-100 pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg font-medium">Effets du magnésium sur le stress et l'anxiété</CardTitle>
                          <CardDescription>Étude randomisée en double aveugle (2023)</CardDescription>
                        </div>
                        <span className="bg-natural-100 text-natural-700 text-xs font-medium px-3 py-1 rounded-full">Stress</span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-5">
                      <div className="space-y-3 text-concise">
                        <ul className="list-disc list-inside text-sm text-natural-700">
                          <li>Réduction significative des marqueurs de stress (-28%)</li>
                          <li>Amélioration de la qualité du sommeil (+45%)</li>
                          <li>Résultats visibles dès 2 semaines de supplémentation</li>
                        </ul>
                        <div className="flex justify-end">
                          <Button variant="ghost" size="sm" className="text-natural-600 hover:text-natural-800 group-hover:bg-natural-50">
                            <span>Voir l'étude complète</span>
                            <ArrowUpRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
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
                  {['Ashwagandha', 'Curcuma', 'Spiruline', 'Rhodiola'].map((ingredient) => (
                    <Card key={ingredient} className="overflow-hidden hover:shadow-md transition-shadow border-natural-200">
                      <CardHeader className="bg-gradient-to-r from-natural-100 to-natural-50 pb-4">
                        <CardTitle className="text-lg text-natural-800">{ingredient}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <ul className="list-disc list-inside text-sm text-natural-700 space-y-1">
                          <li>Origine naturelle et sourcing éthique</li>
                          <li>Concentration optimale d'actifs</li>
                          <li>Test de pureté et d'efficacité</li>
                        </ul>
                        <Button variant="link" className="text-natural-600 hover:text-natural-800 p-0 mt-2">
                          En savoir plus
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="processus" className="space-y-6">
                <h2 className="font-display text-2xl text-natural-800 text-center mb-6">Notre Processus R&D</h2>
                
                <div className="bg-natural-50 rounded-xl p-6">
                  <ol className="relative border-l border-natural-300">
                    {[
                      { title: "Identification", desc: "Recherche et sélection des actifs naturels" },
                      { title: "Formulation", desc: "Développement de formules synergiques" },
                      { title: "Tests cliniques", desc: "Validation scientifique par études indépendantes" },
                      { title: "Production", desc: "Fabrication selon les normes les plus strictes" }
                    ].map((step, index) => (
                      <li key={index} className="mb-6 ml-6">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-natural-200 rounded-full -left-4 ring-4 ring-white text-natural-700 font-medium">
                          {index + 1}
                        </span>
                        <h3 className="font-medium text-natural-800">{step.title}</h3>
                        <p className="text-sm text-natural-600">{step.desc}</p>
                      </li>
                    ))}
                  </ol>
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
                  { q: "Comment nos formules sont-elles testées?", 
                    a: "Nos formules subissent des tests rigoureux en laboratoire indépendant et des études cliniques pour garantir leur efficacité et leur sécurité." },
                  { q: "Quels sont les critères de sélection des ingrédients?", 
                    a: "Nous sélectionnons uniquement des ingrédients naturels, avec une concentration optimale d'actifs, provenant de sources durables et éthiques." },
                  { q: "Comment garantissez-vous la qualité de vos produits?", 
                    a: "Chaque lot de production est testé pour sa pureté, sa concentration en principes actifs et l'absence de contaminants." }
                ].map((faq, index) => (
                  <div key={index} className="bg-white rounded-lg p-5 border border-natural-200 shadow-sm">
                    <h3 className="font-medium text-natural-800 mb-2">{faq.q}</h3>
                    <p className="text-sm text-natural-600">{faq.a}</p>
                  </div>
                ))}
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
