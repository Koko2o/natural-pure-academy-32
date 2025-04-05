
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
