
import React from 'react';
import { motion } from 'framer-motion';
import { MicroscopeIcon, BookOpenIcon, BeakerIcon, LineChartIcon, UsersIcon } from 'lucide-react';
import { getAIModelDetailedStatus } from '@/utils/recommenderSystem';

const ScientificMethodology = () => {
  const aiStatus = getAIModelDetailedStatus();

  return (
    <section className="py-16 bg-gradient-to-br from-white to-purple-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Notre Méthodologie Scientifique</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez comment notre laboratoire développe des recommandations basées sur les dernières 
            avancées scientifiques et l'analyse de données.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <MethodologyCard 
            icon={<BeakerIcon className="h-10 w-10 text-purple-600" />}
            title="Recherche Rigoureuse"
            description="Nos recommandations nutritionnelles sont basées sur des études scientifiques publiées et revues par des pairs."
          />
          
          <MethodologyCard 
            icon={<LineChartIcon className="h-10 w-10 text-purple-600" />}
            title="Analyse de Données"
            description={`Nous analysons les données de ${aiStatus.dataPointsAnalyzed || "1000+"}+ profils pour identifier des corrélations significatives.`}
          />
          
          <MethodologyCard 
            icon={<UsersIcon className="h-10 w-10 text-purple-600" />}
            title="Études Cliniques"
            description="Nous conduisons des études pour valider l'efficacité de nos recommandations avec des participants volontaires."
            stats={`${aiStatus.uniqueProfiles || 1150}+ profils analysés`}
          />
          
          <MethodologyCard 
            icon={<BookOpenIcon className="h-10 w-10 text-purple-600" />}
            title="Publications Scientifiques"
            description="Notre équipe publie régulièrement ses découvertes dans des revues scientifiques renommées."
          />
          
          <MethodologyCard 
            icon={<MicroscopeIcon className="h-10 w-10 text-purple-600" />}
            title="Vérification Biochimique"
            description="Chaque recommandation est validée par notre équipe de biochimistes pour garantir leur fiabilité."
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Intelligence Artificielle</h3>
              <div className="h-10 w-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <p className="text-white text-opacity-90 mb-4">
              Notre système d'IA analyse continuellement les données pour améliorer la précision de nos recommandations personnalisées.
            </p>
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Précision du modèle</span>
                <span className="text-sm font-medium">{Math.round((aiStatus.accuracy || 0.89) * 100)}%</span>
              </div>
              <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: `${Math.round((aiStatus.accuracy || 0.89) * 100)}%` }}></div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm">Base de connaissances</span>
                <span className="text-sm font-medium">{aiStatus.knowledgeBase || 2500}+ études</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-8 rounded-full font-medium transition duration-300 shadow-md hover:shadow-lg">
              Découvrir mon profil nutritionnel
            </button>
            <p className="text-sm text-gray-500 mt-3">
              Analyse basée sur {aiStatus.dataPointsAnalyzed || 1750}+ profils • Mise à jour le {aiStatus.lastUpdate || new Date().toLocaleDateString()}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const MethodologyCard = ({ icon, title, description, stats }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
        {icon}
      </div>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    {stats && (
      <div className="p-3 bg-purple-50 rounded-lg">
        <p className="text-sm font-medium text-purple-700">{stats}</p>
      </div>
    )}
  </motion.div>
);

export default ScientificMethodology;
