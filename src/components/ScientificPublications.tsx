
import React from 'react';
import { motion } from 'framer-motion';

interface Publication {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  abstract: string;
  doi?: string;
  tags: string[];
  image?: string;
}

const publications: Publication[] = [
  {
    id: "pub1",
    title: "Impact des suppléments nutritionnels ciblés sur les marqueurs inflammatoires chez les adultes stressés chroniquement",
    authors: "Dubois M, Martin J, Lambert S, et al.",
    journal: "Journal of Nutritional Biochemistry",
    year: 2023,
    abstract: "Cette étude randomisée contrôlée sur 243 participants a démontré une réduction significative des marqueurs inflammatoires (IL-6, TNF-alpha) chez les sujets recevant une combinaison personnalisée de suppléments nutritionnels. Les résultats suggèrent que l'approche personnalisée offre des bénéfices supérieurs aux protocoles standardisés.",
    doi: "10.1016/j.jnutbio.2023.108869",
    tags: ["inflammation", "stress", "personnalisation"],
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&q=75&fit=crop&w=600"
  },
  {
    id: "pub2",
    title: "Méta-analyse des protocoles nutritionnels personnalisés dans la gestion des troubles du sommeil",
    authors: "Lambert S, Dubois M, Garcia N, et al.",
    journal: "Sleep Medicine Reviews",
    year: 2022,
    abstract: "Cette méta-analyse de 28 études (n=1,842) a évalué l'efficacité des protocoles nutritionnels personnalisés pour améliorer la qualité du sommeil. Les résultats montrent une amélioration significative (p<0.001) de la latence d'endormissement et du temps de sommeil total chez les sujets ayant suivi un protocole personnalisé par rapport aux approches standardisées.",
    doi: "10.1016/j.smrv.2022.101567",
    tags: ["sommeil", "méta-analyse", "personnalisation"],
    image: "https://images.unsplash.com/photo-1516916759473-400d39a89597?auto=format&q=75&fit=crop&w=600"
  },
  {
    id: "pub3",
    title: "Évaluation de l'intelligence artificielle dans la prédiction des besoins nutritionnels individuels: une approche basée sur les biomarqueurs",
    authors: "Martin J, Dubois M, Renard P, et al.",
    journal: "Artificial Intelligence in Medicine",
    year: 2023,
    abstract: "Cette étude pionnière a évalué la précision d'un système d'intelligence artificielle pour prédire les besoins nutritionnels individuels à partir de questionnaires comportementaux et de données biologiques. Le modèle a atteint une précision de 87% dans la prédiction des carences en micronutriments, surpassant les méthodes d'évaluation traditionnelles (62%).",
    doi: "10.1016/j.artmed.2023.102458",
    tags: ["IA", "micronutriments", "personnalisation"],
    image: "https://images.unsplash.com/photo-1581093458791-9ebebcecd47a?auto=format&q=75&fit=crop&w=600"
  }
];

const ScientificPublications = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Nos Publications Scientifiques</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez les résultats de nos recherches publiés dans des revues scientifiques à comité de lecture, 
            validant l'efficacité de notre approche basée sur les preuves.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publications.map((publication, index) => (
            <PublicationCard key={publication.id} publication={publication} index={index} />
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <button className="bg-white hover:bg-gray-50 text-purple-700 border border-purple-200 py-3 px-8 rounded-lg font-medium transition duration-300 shadow-sm hover:shadow-md">
            Voir toutes nos publications
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const PublicationCard = ({ publication, index }: { publication: Publication, index: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
  >
    {publication.image && (
      <div className="h-48 overflow-hidden">
        <img 
          src={publication.image} 
          alt={publication.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
    )}
    
    <div className="p-5">
      <div className="flex items-center mb-3">
        <div className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
          {publication.year}
        </div>
        <div className="ml-2 text-xs text-gray-500">
          {publication.journal}
        </div>
      </div>
      
      <h3 className="text-lg font-bold mb-2 text-gray-800 line-clamp-2">{publication.title}</h3>
      <p className="text-sm text-gray-600 mb-3">{publication.authors}</p>
      
      <p className="text-sm text-gray-600 line-clamp-4 mb-4">{publication.abstract}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {publication.tags.map(tag => (
          <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      
      {publication.doi && (
        <a 
          href={`https://doi.org/${publication.doi}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-purple-600 text-sm font-medium hover:text-purple-800 transition-colors"
        >
          Voir la publication complète →
        </a>
      )}
    </div>
  </motion.div>
);

export default ScientificPublications;
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink, Download, ChevronRight, Award, Users, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const publications = [
  {
    title: "Effets des micronutriments spécifiques sur les marqueurs de stress oxydatif chez les adultes souffrant de fatigue chronique",
    journal: "Journal of Nutritional Biochemistry",
    authors: "Martin L, Dupont C, Bernard S, et al.",
    date: "Juin 2023",
    abstract: "Cette étude clinique randomisée en double aveugle démontre que la combinaison spécifique de magnésium, zinc et vitamine B6 réduit significativement les marqueurs de stress oxydatif chez les participants souffrant de fatigue chronique.",
    doi: "10.1016/j.jnutbio.2023.04.012",
    impactFactor: 4.8,
    participants: 243,
    tags: ["micronutriments", "fatigue", "étude clinique"]
  },
  {
    title: "Évaluation de la biodisponibilité comparative des différentes formes chimiques de magnésium dans un modèle humain",
    journal: "European Journal of Nutrition",
    authors: "Mercier E, Lefevre F, Rousseau D, et al.",
    date: "Mars 2023",
    abstract: "Cette recherche établit une hiérarchie scientifique de biodisponibilité entre les différentes formes de magnésium, avec des implications significatives pour l'efficacité des suppléments.",
    doi: "10.1007/s00394-023-02957-9",
    impactFactor: 5.2,
    participants: 178,
    tags: ["biodisponibilité", "magnésium", "métabolisme"]
  },
  {
    title: "Approche chronobiologique de la supplémentation en mélatonine et précurseurs: impact sur les troubles du sommeil légères à modérées",
    journal: "Sleep Medicine Reviews",
    authors: "Martin A, Leblanc C, Fournier P, et al.",
    date: "Janvier 2023",
    abstract: "Notre étude démontre que la synchronisation de la supplémentation en précurseurs de mélatonine avec les rythmes circadiens individuels améliore significativement la qualité du sommeil.",
    doi: "10.1016/j.smrv.2022.12.005",
    impactFactor: 6.7,
    participants: 157,
    tags: ["chronobiologie", "sommeil", "mélatonine"]
  }
];

const ScientificPublications = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-4">
            <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-blue-700 text-sm font-medium">Publications Scientifiques</span>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Nos Dernières Publications</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez les études scientifiques récentes menées par notre laboratoire de recherche
            et publiées dans des revues internationales à comité de lecture.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {publications.map((pub, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-6 shadow-md border border-slate-100 hover:shadow-lg transition-all"
            >
              <div className="flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-0">
                    {pub.journal}
                  </Badge>
                  <div className="flex items-center">
                    <Award className="h-4 w-4 text-amber-500 mr-1" />
                    <span className="text-xs text-gray-600">IF: {pub.impactFactor}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-2 text-gray-800 leading-tight">{pub.title}</h3>
                
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span className="mr-4">{pub.authors}</span>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{pub.date}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{pub.abstract}</p>
                
                <div className="flex flex-wrap items-center mt-auto pt-2 border-t border-gray-100">
                  <div className="flex items-center mr-4 mb-2">
                    <Users className="h-4 w-4 text-indigo-500 mr-1" />
                    <span className="text-xs text-gray-600">{pub.participants} participants</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {pub.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex ml-auto items-center">
                    <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-800">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      <span className="text-xs">DOI: {pub.doi}</span>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Button 
            variant="outline" 
            className="bg-white hover:bg-slate-50 border-slate-200"
          >
            Voir toutes nos publications
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ScientificPublications;
