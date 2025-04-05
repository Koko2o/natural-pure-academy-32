import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Award,
  BookOpen,
  ExternalLink,
  Mail,
  ChevronRight,
  GraduationCap,
  FileText
} from "lucide-react";
import { Flask } from '@/components/ui/icons'; // Added import for Flask icon

const ScientificTeam = () => {
  const coreTeam = [
    {
      name: "Dr. Marie Dubois",
      role: "Fondatrice & Directrice Scientifique",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400",
      education: "PhD en Biochimie, Université de Paris",
      expertise: ["Nutrition clinique", "Micronutrition", "Biochimie"],
      bio: "Après 15 ans de recherche dans le domaine de la nutrition clinique et des compléments alimentaires, Dr. Dubois a fondé Natural Pure pour combler le fossé entre la recherche scientifique et les recommandations nutritionnelles accessibles au grand public.",
      publications: 27,
      citations: 1240,
      profiles: [
        { platform: "ResearchGate", url: "#" },
        { platform: "LinkedIn", url: "#" },
        { platform: "Google Scholar", url: "#" }
      ]
    },
    {
      name: "Prof. Jean Moreau",
      role: "Directeur de Recherche",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400",
      education: "PhD en Physiologie, Harvard University",
      expertise: ["Endocrinologie", "Métabolisme", "Maladies chroniques"],
      bio: "Le Professeur Moreau consacre ses recherches à comprendre comment les micronutriments influencent l'équilibre hormonal et le métabolisme. Ses travaux ont été publiés dans Nature et Science.",
      publications: 42,
      citations: 3120,
      profiles: [
        { platform: "ResearchGate", url: "#" },
        { platform: "LinkedIn", url: "#" },
        { platform: "Google Scholar", url: "#" }
      ]
    },
    {
      name: "Dr. Sophie Laurent",
      role: "Responsable des Études Cliniques",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400",
      education: "PhD en Épidémiologie, Université de Lyon",
      expertise: ["Études cliniques", "Biostatistiques", "Épidémiologie nutritionnelle"],
      bio: "Spécialiste en conception et analyse d'études cliniques, Dr. Laurent supervise tous les essais menés par notre laboratoire. Elle a développé des méthodologies innovantes pour mesurer l'impact des nutriments sur la santé.",
      publications: 18,
      citations: 920,
      profiles: [
        { platform: "ResearchGate", url: "#" },
        { platform: "LinkedIn", url: "#" }
      ]
    }
  ];

  const scientificAdvisors = [
    {
      name: "Prof. Robert Chen",
      role: "Conseiller Scientifique",
      affiliation: "Université de Stanford",
      expertise: "Microbiome intestinal",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
      name: "Dr. Olivia Martin",
      role: "Conseillère Scientifique",
      affiliation: "Institut Pasteur",
      expertise: "Immunité et nutrition",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
      name: "Prof. Thomas Wagner",
      role: "Conseiller Scientifique",
      affiliation: "ETH Zürich",
      expertise: "Nutriomique",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
      name: "Dr. Leila Bouaziz",
      role: "Conseillère Scientifique",
      affiliation: "INSERM",
      expertise: "Stress oxydatif",
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200&h=200"
    }
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="indigo" className="mb-2">
              <Users className="h-3 w-3 mr-1" />
              Expertise
            </Badge>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Notre Équipe Scientifique
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Découvrez les chercheurs et experts qui dirigent nos travaux scientifiques et garantissent 
              la rigueur de nos méthodes et recommandations.
            </p>
          </div>

          {/* Équipe principale */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {coreTeam.map((member, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200 hover:border-indigo-200 transition-all hover:shadow-lg"
              >
                <div className="relative h-64">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-5 text-white">
                      <h3 className="font-bold text-xl">{member.name}</h3>
                      <p className="text-white/80 text-sm">{member.role}</p>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <GraduationCap className="h-4 w-4 text-indigo-600 mr-2" />
                      <span className="text-sm font-medium text-slate-700">{member.education}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {member.expertise.map((skill, i) => (
                        <span 
                          key={i} 
                          className="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <p className="text-slate-600 text-sm mb-4">
                      {member.bio}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-slate-50 p-3 rounded-lg text-center">
                        <div className="text-indigo-700 font-bold text-xl">{member.publications}</div>
                        <div className="text-xs text-slate-500">Publications</div>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg text-center">
                        <div className="text-indigo-700 font-bold text-xl">{member.citations}</div>
                        <div className="text-xs text-slate-500">Citations</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {member.profiles.map((profile, i) => (
                      <Button 
                        key={i}
                        size="sm"
                        variant="outline"
                        className="text-xs"
                        asChild
                      >
                        <a href={profile.url} target="_blank" rel="noopener noreferrer">
                          {profile.platform}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </Button>
                    ))}
                    <Button 
                      size="sm"
                      variant="outline"
                      className="text-xs ml-auto"
                    >
                      <Mail className="h-3 w-3 mr-1" />
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Comité consultatif */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-slate-800 mb-6 text-center">
              Notre Comité Consultatif
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {scientificAdvisors.map((advisor, index) => (
                <div key={index} className="bg-white rounded-lg p-5 shadow-sm border border-slate-200 hover:border-indigo-200 transition-all text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src={advisor.image} 
                      alt={advisor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-medium text-slate-800 mb-1">{advisor.name}</h4>
                  <p className="text-indigo-600 text-sm mb-1">{advisor.role}</p>
                  <p className="text-slate-500 text-xs mb-2">{advisor.affiliation}</p>
                  <Badge variant="secondary" className="bg-slate-100">
                    {advisor.expertise}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Collaborations */}
          <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-8 mb-16 border border-indigo-100">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-slate-800 mb-3">
                Nos Collaborations Académiques
              </h3>
              <p className="text-slate-600">
                Nous collaborons avec plusieurs institutions académiques et centres de recherche internationaux.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {[
                { name: "Université de Lyon", logo: "https://via.placeholder.com/150x80?text=Lyon+University" },
                { name: "Institut Pasteur", logo: "https://via.placeholder.com/150x80?text=Institut+Pasteur" },
                { name: "Stanford University", logo: "https://via.placeholder.com/150x80?text=Stanford" },
                { name: "ETH Zürich", logo: "https://via.placeholder.com/150x80?text=ETH+Zurich" }
              ].map((institution, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-center h-24">
                  <img 
                    src={institution.logo} 
                    alt={institution.name}
                    className="max-h-16 max-w-full"
                  />
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button 
                variant="outline"
                className="text-indigo-700 border-indigo-200"
                asChild
              >
                <a href="#partnerships">
                  En savoir plus sur nos partenariats
                  <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Publications récentes */}
          <div className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-slate-800">
                Publications Récentes
              </h3>
              <Button 
                variant="ghost"
                className="text-indigo-700"
                asChild
              >
                <Link to="/publications">
                  Voir toutes les publications
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Comparative Bioavailability of Magnesium Forms: A Randomized Double-Blind Study",
                  authors: "Dubois M, Moreau J, Laurent S, et al.",
                  journal: "Journal of Nutritional Biochemistry",
                  year: 2023,
                  doi: "10.1016/j.jnutbio.2023.02.015"
                },
                {
                  title: "Impact of Gut Microbiome on Vitamin B Absorption: A Systematic Review and Meta-Analysis",
                  authors: "Laurent S, Dubois M, Chen R, et al.",
                  journal: "American Journal of Clinical Nutrition",
                  year: 2022,
                  doi: "10.1093/ajcn/nqac154"
                },
                {
                  title: "Long-term Effects of Polyphenol Supplementation on Inflammatory Markers: A 24-Month Follow-up Study",
                  authors: "Moreau J, Bouaziz L, Dubois M, et al.",
                  journal: "Nutrients",
                  year: 2022,
                  doi: "10.3390/nu14030589"
                }
              ].map((publication, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg p-5 shadow-sm border border-slate-200 hover:border-indigo-200 transition-all flex flex-col md:flex-row md:items-center gap-4"
                >
                  <div className="flex-shrink-0 bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-indigo-600" />
                  </div>

                  <div className="flex-grow">
                    <h4 className="font-medium text-slate-800 mb-1">{publication.title}</h4>
                    <p className="text-slate-600 text-sm mb-1">{publication.authors}</p>
                    <p className="text-slate-500 text-xs">
                      {publication.journal} ({publication.year}) • DOI: {publication.doi}
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    <Button 
                      size="sm"
                      variant="ghost"
                      className="text-indigo-700"
                      asChild
                    >
                      <a href={`https://doi.org/${publication.doi}`} target="_blank" rel="noopener noreferrer">
                        Lire l'article
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="max-w-2xl mx-auto mb-8">
              <h3 className="text-2xl font-semibold text-slate-800 mb-4">
                Basé sur la science, conçu pour vous
              </h3>
              <p className="text-slate-600">
                Notre équipe scientifique a développé un quiz personnalisé basé sur des années de recherche
                pour vous aider à identifier vos besoins spécifiques en micronutriments.
              </p>
            </div>

            <Button 
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
              asChild
            >
              <Link to="/quiz">
                Faire le test personnalisé
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScientificTeam;