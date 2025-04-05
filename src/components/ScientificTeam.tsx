
import React from 'react';
import { motion } from 'framer-motion';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  publications?: string[];
  certifications?: string[];
}

const teamMembers: TeamMember[] = [
  {
    name: "Dr. Marie Dubois",
    role: "Fondatrice & Directrice Scientifique",
    bio: "Docteur en biochimie et nutritionniste, Marie a travaillé pendant 15 ans dans la recherche sur les compléments alimentaires avant de fonder Natural&Pure. Sa spécialité est l'étude des interactions entre les micronutriments et le métabolisme humain.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400",
    publications: [
      "Dubois M, et al. (2022). 'Impact of Targeted Nutrition on Cellular Energy Production', Journal of Nutritional Biochemistry",
      "Dubois M, Bernard P. (2020). 'Comparative Analysis of Supplement Bioavailability', European Journal of Clinical Nutrition"
    ],
    certifications: [
      "Doctorat en Biochimie, Université de Paris",
      "Certification en Nutrition Clinique Avancée",
      "Membre de l'Association Européenne de Nutrition"
    ]
  },
  {
    name: "Pr. Jean Martin",
    role: "Responsable Recherche & Développement",
    bio: "Professeur en neurosciences, Jean apporte son expertise en neuro-nutrition et dans l'étude des mécanismes biologiques des suppléments sur le système nerveux. Il supervise toutes les études cliniques du laboratoire.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400",
    publications: [
      "Martin J, Dubois M. (2023). 'Neural Impact of Essential Fatty Acids', Neuroscience Today",
      "Martin J, et al. (2021). 'Cognitive Enhancement Through Nutritional Intervention', Brain Research Bulletin"
    ],
    certifications: [
      "Doctorat en Neurosciences, Université de Lyon",
      "Professeur associé à l'Institut de Recherche Biomédicale",
      "Prix d'excellence en recherche nutritionnelle 2019"
    ]
  },
  {
    name: "Dr. Sophie Lambert",
    role: "Responsable des Études Cliniques",
    bio: "Médecin nutritionniste, Sophie conçoit et supervise les protocoles d'études cliniques du laboratoire. Son expertise permet de valider l'efficacité des recommandations à travers des essais rigoureux.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400",
    publications: [
      "Lambert S, et al. (2022). 'Clinical Validation of Personalized Supplement Protocols', Clinical Nutrition",
      "Lambert S, Dubois M. (2021). 'Long-term Effects of Adaptogenic Supplementation', Journal of Functional Foods"
    ],
    certifications: [
      "Doctorat en Médecine, Université de Strasbourg",
      "Spécialisation en Nutrition Clinique",
      "Certification en Conduite d'Essais Cliniques"
    ]
  },
  {
    name: "Thomas Legrand",
    role: "Responsable Vulgarisation Scientifique",
    bio: "Expert en communication scientifique, Thomas traduit les découvertes complexes du laboratoire en informations accessibles. Il veille à la précision et à la rigueur de tous les contenus éducatifs.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400",
    certifications: [
      "Master en Journalisme Scientifique, Sciences Po Paris",
      "Certification en Communication Médicale",
      "Ancien rédacteur pour Science & Vie"
    ]
  }
];

const ScientificTeam = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Notre Équipe Scientifique</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez les experts qui développent nos protocoles nutritionnels et conduisent 
            nos recherches pour des recommandations basées sur les preuves scientifiques.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} member={member} index={index} />
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Notre Engagement Scientifique</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-purple-50 p-6 rounded-xl">
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800">Indépendance</h4>
              <p className="text-gray-600">
                Aucun lien avec l'industrie des compléments alimentaires pour garantir des recommandations impartiales.
              </p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-xl">
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800">Rigueur Scientifique</h4>
              <p className="text-gray-600">
                Chaque recommandation est basée sur des études publiées dans des revues à comité de lecture.
              </p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-xl">
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800">Transparence</h4>
              <p className="text-gray-600">
                Toutes nos sources scientifiques sont citées et nos méthodologies sont entièrement documentées.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const TeamMemberCard = ({ member, index }: { member: TeamMember, index: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
  >
    <div className="relative h-64 overflow-hidden">
      <img 
        src={member.image} 
        alt={member.name} 
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
        <div className="p-4 text-white">
          <h3 className="text-xl font-bold">{member.name}</h3>
          <p className="text-sm text-white/80">{member.role}</p>
        </div>
      </div>
    </div>
    <div className="p-5">
      <p className="text-sm text-gray-600 mb-4">{member.bio}</p>
      
      {member.publications && member.publications.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">Publications récentes</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            {member.publications.map((pub, idx) => (
              <li key={idx} className="pl-3 border-l-2 border-purple-200">{pub}</li>
            ))}
          </ul>
        </div>
      )}
      
      {member.certifications && member.certifications.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-800 mb-2">Diplômes & Certifications</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            {member.certifications.map((cert, idx) => (
              <li key={idx} className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-purple-500 mt-0.5 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{cert}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </motion.div>
);

export default ScientificTeam;
