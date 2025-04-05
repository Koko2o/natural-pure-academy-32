
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  FileText, 
  ExternalLink, 
  Download, 
  Search, 
  ChevronRight,
  BarChart,
  Clock
} from "lucide-react";

interface ScientificPublicationsProps {
  limit?: number;
  showCta?: boolean;
}

const ScientificPublications: React.FC<ScientificPublicationsProps> = ({ 
  limit = 6,
  showCta = false 
}) => {
  const publications = [
    {
      title: "Comparative Bioavailability of Magnesium Forms: A Randomized Double-Blind Study",
      authors: "Dubois M, Moreau J, Laurent S, et al.",
      journal: "Journal of Nutritional Biochemistry",
      year: 2023,
      abstract: "Cette étude compare l'absorption et la biodisponibilité de différentes formes de magnésium (citrate, glycinate, oxyde) chez 120 participants en bonne santé, démontrant une supériorité significative du glycinate en termes de biodisponibilité et d'amélioration des symptômes de stress.",
      doi: "10.1016/j.jnutbio.2023.02.015",
      keywords: ["Magnésium", "Biodisponibilité", "Stress", "Sommeil"],
      impactFactor: 4.87,
      type: "Étude clinique",
      fullTextAvailable: true
    },
    {
      title: "Impact of Gut Microbiome on Vitamin B Absorption: A Systematic Review and Meta-Analysis",
      authors: "Laurent S, Dubois M, Chen R, et al.",
      journal: "American Journal of Clinical Nutrition",
      year: 2022,
      abstract: "Cette méta-analyse de 28 études incluant 2,340 participants explore la relation entre la composition du microbiome intestinal et l'absorption des vitamines B, révélant que certains profils microbiens sont associés à une réduction de 30% de l'absorption de la vitamine B12.",
      doi: "10.1093/ajcn/nqac154",
      keywords: ["Microbiome", "Vitamines B", "Absorption", "Nutrition"],
      impactFactor: 6.77,
      type: "Revue systématique",
      fullTextAvailable: true
    },
    {
      title: "Long-term Effects of Polyphenol Supplementation on Inflammatory Markers: A 24-Month Follow-up Study",
      authors: "Moreau J, Bouaziz L, Dubois M, et al.",
      journal: "Nutrients",
      year: 2022,
      abstract: "Cette étude longitudinale sur 24 mois avec 186 participants démontre que la supplémentation en polyphénols spécifiques réduit significativement les marqueurs inflammatoires systémiques (CRP, IL-6) chez les adultes souffrant d'inflammation chronique légère à modérée.",
      doi: "10.3390/nu14030589",
      keywords: ["Polyphénols", "Inflammation", "Antioxydants", "Suivi longitudinal"],
      impactFactor: 5.72,
      type: "Étude longitudinale",
      fullTextAvailable: true
    },
    {
      title: "Chrononutrition: Timing of Nutrient Intake and Its Impact on Metabolic Health",
      authors: "Dubois M, Wagner T, Martin O, et al.",
      journal: "Frontiers in Nutrition",
      year: 2021,
      abstract: "Cette revue explore l'impact du timing des apports nutritionnels sur la santé métabolique, démontrant que l'alignement des repas avec le rythme circadien améliore significativement la sensibilité à l'insuline et la gestion du poids.",
      doi: "10.3389/fnut.2021.00783",
      keywords: ["Chrononutrition", "Métabolisme", "Rythme circadien", "Jeûne intermittent"],
      impactFactor: 4.35,
      type: "Revue narrative",
      fullTextAvailable: true
    },
    {
      title: "Efficacy of Ashwagandha (Withania somnifera) on Stress and Sleep Quality: A Double-Blind Placebo-Controlled Trial",
      authors: "Laurent S, Bouaziz L, Dubois M, et al.",
      journal: "Journal of Ethnopharmacology",
      year: 2021,
      abstract: "Dans cet essai contrôlé contre placebo incluant 98 adultes souffrant de stress chronique, l'ashwagandha a démontré une réduction significative des niveaux de cortisol (-28%) et une amélioration de la qualité du sommeil mesurée par polysomnographie.",
      doi: "10.1016/j.jep.2021.113967",
      keywords: ["Ashwagandha", "Adaptogènes", "Stress", "Sommeil"],
      impactFactor: 4.28,
      type: "Essai clinique",
      fullTextAvailable: false
    },
    {
      title: "Vitamin D Status and Immune Function: A Cross-Sectional Analysis of 1,200 Adults",
      authors: "Moreau J, Chen R, Dubois M, et al.",
      journal: "Journal of Clinical Endocrinology & Metabolism",
      year: 2020,
      abstract: "Cette analyse transversale de 1,200 adultes révèle une forte corrélation entre les niveaux optimaux de vitamine D (>75 nmol/L) et plusieurs marqueurs de fonction immunitaire, incluant l'activité des cellules NK et la production de cytokines anti-inflammatoires.",
      doi: "10.1210/clinem/dgaa485",
      keywords: ["Vitamine D", "Immunité", "Inflammation", "Prévention"],
      impactFactor: 5.96,
      type: "Étude épidémiologique",
      fullTextAvailable: false
    },
    {
      title: "Omega-3 Fatty Acid Supplementation and Cognitive Function in Healthy Adults",
      authors: "Dubois M, Martin O, Laurent S, et al.",
      journal: "Neurology",
      year: 2020,
      abstract: "Cet essai randomisé de 12 mois chez 240 adultes en bonne santé montre que la supplémentation en acides gras oméga-3 à haute dose (2g EPA + DHA par jour) améliore significativement plusieurs domaines de la fonction cognitive, particulièrement la mémoire de travail et l'attention soutenue.",
      doi: "10.1212/WNL.0000000000009456",
      keywords: ["Oméga-3", "Cognition", "Mémoire", "Neuroprotection"],
      impactFactor: 8.77,
      type: "Essai clinique",
      fullTextAvailable: false
    },
    {
      title: "The Role of Zinc in Immune Resilience: Mechanisms and Clinical Applications",
      authors: "Chen R, Dubois M, Bouaziz L, et al.",
      journal: "Nutrients",
      year: 2019,
      abstract: "Cette revue complète des mécanismes d'action du zinc sur l'immunité détaille son rôle dans la signalisation cellulaire, la fonction des cellules T et la production d'anticorps, offrant des recommandations pratiques pour l'optimisation du statut en zinc.",
      doi: "10.3390/nu11102412",
      keywords: ["Zinc", "Immunité", "Oligoéléments", "Résistance"],
      impactFactor: 5.72,
      type: "Revue systématique",
      fullTextAvailable: true
    }
  ];

  const displayedPublications = limit ? publications.slice(0, limit) : publications;

  const publicationTypes = [
    { type: "Essai clinique", icon: <Users className="h-4 w-4" />, color: "bg-green-100 text-green-800" },
    { type: "Revue systématique", icon: <BookOpen className="h-4 w-4" />, color: "bg-blue-100 text-blue-800" },
    { type: "Étude longitudinale", icon: <Clock className="h-4 w-4" />, color: "bg-purple-100 text-purple-800" },
    { type: "Étude épidémiologique", icon: <BarChart className="h-4 w-4" />, color: "bg-orange-100 text-orange-800" },
    { type: "Revue narrative", icon: <FileText className="h-4 w-4" />, color: "bg-indigo-100 text-indigo-800" },
  ];

  const getTypeStyle = (type: string) => {
    const found = publicationTypes.find(t => t.type === type);
    return found ? found.color : "bg-slate-100 text-slate-800";
  };

  const getTypeIcon = (type: string) => {
    const found = publicationTypes.find(t => t.type === type);
    return found ? found.icon : <FileText className="h-4 w-4" />;
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="indigo" className="mb-2">
              <BookOpen className="h-3 w-3 mr-1" />
              Recherche
            </Badge>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Nos Publications Scientifiques
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Découvrez les études et publications réalisées par notre équipe scientifique dans les revues 
              internationales à comité de lecture.
            </p>
          </div>

          {/* Filtres */}
          {!limit && (
            <div className="mb-10 bg-slate-50 p-6 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Type d'étude</label>
                  <div className="flex flex-wrap gap-2">
                    {publicationTypes.map((type, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1 cursor-pointer hover:bg-slate-100">
                        {type.icon}
                        <span>{type.type}</span>
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Année</label>
                  <div className="flex flex-wrap gap-2">
                    {[2023, 2022, 2021, 2020, 2019].map((year) => (
                      <Badge key={year} variant="outline" className="cursor-pointer hover:bg-slate-100">
                        {year}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Mot-clé</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Rechercher un sujet..."
                      className="w-full pl-10 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Options</label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" />
                      Texte intégral disponible
                    </label>
                    <Button size="sm" variant="outline" className="ml-auto">
                      Réinitialiser
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Publications */}
          <div className="grid grid-cols-1 gap-6 mb-12">
            {displayedPublications.map((publication, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-sm border border-slate-200 hover:border-indigo-200 transition-all overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-wrap gap-3 mb-3">
                    <Badge className={`flex items-center gap-1 ${getTypeStyle(publication.type)}`}>
                      {getTypeIcon(publication.type)}
                      <span>{publication.type}</span>
                    </Badge>
                    
                    <Badge variant="outline" className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      <span>{publication.journal}</span>
                    </Badge>
                    
                    <Badge variant="outline" className="flex items-center gap-1">
                      <span>{publication.year}</span>
                    </Badge>
                    
                    {publication.fullTextAvailable && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Texte intégral disponible
                      </Badge>
                    )}
                    
                    <div className="ml-auto flex items-center">
                      <span className="text-xs text-slate-500 mr-2">Impact Factor:</span>
                      <Badge variant="secondary" className="bg-indigo-50 text-indigo-700">
                        {publication.impactFactor}
                      </Badge>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-slate-800 mb-2 hover:text-indigo-700 transition-colors">
                    <a href={`https://doi.org/${publication.doi}`} target="_blank" rel="noopener noreferrer">
                      {publication.title}
                    </a>
                  </h3>
                  
                  <p className="text-slate-600 text-sm mb-2">
                    <span className="font-medium">Auteurs:</span> {publication.authors}
                  </p>
                  
                  <p className="text-slate-600 mb-4">
                    {publication.abstract}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {publication.keywords.map((keyword, i) => (
                      <Badge key={i} variant="outline" className="cursor-pointer hover:bg-slate-100">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button size="sm" variant="outline" className="text-indigo-700" asChild>
                      <a href={`https://doi.org/${publication.doi}`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Voir sur l'éditeur
                      </a>
                    </Button>
                    
                    {publication.fullTextAvailable && (
                      <Button size="sm" variant="outline" className="text-indigo-700">
                        <Download className="h-4 w-4 mr-1" />
                        Télécharger PDF
                      </Button>
                    )}
                    
                    <Button size="sm" variant="ghost" className="text-slate-700">
                      Citer
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {showCta && (
            <div className="text-center">
              <Button 
                size="lg"
                variant="outline"
                className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                asChild
              >
                <Link to="/publications">
                  Voir toutes nos publications
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          )}
          
          {!limit && (
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Précédent
                </Button>
                <Button variant="outline" size="sm" className="bg-indigo-50 text-indigo-700">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <span>...</span>
                <Button variant="outline" size="sm">
                  8
                </Button>
                <Button variant="outline" size="sm">
                  Suivant
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ScientificPublications;
