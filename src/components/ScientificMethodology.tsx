import React from "react";
import { CheckCircle, Flask, Microscope, BookOpen, BarChart4, Dna } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const ScientificMethodology = () => {
  const methodologySteps = [
    {
      icon: <Flask className="h-12 w-12 text-indigo-600" />,
      title: "Formulation d'Hypothèses",
      description: "Nos chercheurs formulent des hypothèses basées sur la littérature scientifique existante et les données cliniques.",
      color: "bg-indigo-100 text-indigo-800"
    },
    {
      icon: <Microscope className="h-12 w-12 text-teal-600" />,
      title: "Expérimentations Contrôlées",
      description: "Nous conduisons des tests rigoureux avec des groupes contrôles pour valider l'efficacité des solutions proposées.",
      color: "bg-teal-100 text-teal-800"
    },
    {
      icon: <BarChart4 className="h-12 w-12 text-purple-600" />,
      title: "Analyse de Données",
      description: "Nos statisticiens analysent les résultats à l'aide de méthodes avancées pour garantir leur validité scientifique.",
      color: "bg-purple-100 text-purple-800"
    },
    {
      icon: <Dna className="h-12 w-12 text-blue-600" />,
      title: "Validation Biologique",
      description: "Nous vérifions les mécanismes d'action au niveau cellulaire et moléculaire pour comprendre les effets observés.",
      color: "bg-blue-100 text-blue-800"
    },
    {
      icon: <BookOpen className="h-12 w-12 text-emerald-600" />,
      title: "Revue par les Pairs",
      description: "Nos résultats sont soumis à la critique d'experts indépendants pour garantir leur qualité scientifique.",
      color: "bg-emerald-100 text-emerald-800"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-2">
            <CheckCircle className="h-3 w-3 mr-1" />
            Processus Scientifique Rigoureux
          </Badge>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Notre Méthodologie Scientifique</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Notre laboratoire suit une approche scientifique rigoureuse pour valider chaque recommandation et solution proposée.
          </p>
        </motion.div>

        <div className="relative">
          {/* Ligne de connexion */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-indigo-100 hidden md:block"></div>

          <div className="grid md:grid-cols-5 gap-6">
            {methodologySteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative z-10"
              >
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all h-full flex flex-col">
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 rounded-full ${step.color.split(' ')[0]} mb-4`}>
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-center text-gray-800">{step.title}</h3>
                  <p className="text-gray-600 text-center text-sm flex-grow">{step.description}</p>
                  <div className="flex justify-center mt-4">
                    <span className={`text-xs font-semibold inline-block py-1 px-2 rounded-full ${step.color}`}>
                      Étape {index + 1}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl max-w-3xl mx-auto border border-indigo-100"
          >
            <p className="text-gray-700 italic">
              "Notre engagement envers la rigueur scientifique garantit que chacune de nos recommandations est basée sur des preuves solides, et non sur des tendances passagères ou des anecdotes."
            </p>
            <p className="mt-2 font-semibold text-indigo-700">Dr. Martine Laurent, Directrice de Recherche</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ScientificMethodology;