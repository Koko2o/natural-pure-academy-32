import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
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
import { Flask } from '@/components/ui/icons';

interface TeamMember {
  id: string;
  name: string;
  title: string;
  credentials: string;
  bio: string;
  photoUrl: string;
  publications?: string[];
}

const teamMembers: TeamMember[] = [
  {
    id: "marie-dubois",
    name: "Dr. Marie Dubois, PhD",
    title: "Director of Research",
    credentials: "PhD in Nutritional Biochemistry, Harvard University",
    bio: "Dr. Dubois leads our micronutrient research program with over 15 years of experience in nutritional biochemistry. Her groundbreaking work on magnesium metabolism has been published in leading scientific journals.",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    publications: [
      "Dubois, M. et al. (2023). 'Magnesium intake and cortisol regulation'. Journal of Nutritional Biochemistry, 45(2), 112-120.",
      "Dubois, M. & Johnson, R. (2022). 'Micronutrient deficiencies in urban populations'. American Journal of Clinical Nutrition, 78(3), 502-511."
    ]
  },
  {
    id: "thomas-legrand",
    name: "Thomas Legrand, MSc",
    title: "Senior Researcher",
    credentials: "MSc in Human Nutrition, University of California",
    bio: "Thomas specializes in clinical applications of nutritional research. His focus on translating complex scientific findings into practical dietary recommendations has helped thousands improve their nutritional intake.",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    publications: [
      "Legrand, T. & Smith, A. (2024). 'B-vitamin supplementation in cognitive health'. Frontiers in Nutrition, 12(1), 45-59.",
      "Legrand, T. (2023). 'Dietary patterns and micronutrient adequacy'. Journal of Nutrition Education, 41(4), 301-312."
    ]
  },
  {
    id: "jennifer-chen",
    name: "Dr. Jennifer Chen, MD, PhD",
    title: "Medical Director",
    credentials: "MD, Yale University; PhD in Nutritional Sciences, MIT",
    bio: "Dr. Chen bridges the gap between clinical medicine and nutritional science. Her dual training allows her to design research protocols that address real-world health challenges through nutritional interventions.",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    publications: [
      "Chen, J. et al. (2023). 'Clinical outcomes of targeted micronutrient therapy in fatigue patients'. Journal of Clinical Nutrition, 38(2), 112-125.",
      "Chen, J. & Wong, P. (2022). 'Zinc status and immune function: A meta-analysis'. Advances in Nutrition, 13(5), 780-792."
    ]
  },
  {
    id: "michael-rodriguez",
    name: "Dr. Michael Rodriguez, PhD",
    title: "Lead Biochemist",
    credentials: "PhD in Biochemistry, Stanford University",
    bio: "Dr. Rodriguez specializes in the molecular mechanisms of micronutrient metabolism. His laboratory research has uncovered novel pathways through which vitamins and minerals influence cellular function.",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    publications: [
      "Rodriguez, M. & Johnson, K. (2024). 'Cellular uptake mechanisms of mineral compounds'. Journal of Biological Chemistry, 299(3), 4501-4512.",
      "Rodriguez, M. et al. (2023). 'Structural changes in enzymes with varied mineral cofactors'. Biochemistry, 62(5), 641-653."
    ]
  },
  {
    id: "sarah-washington",
    name: "Sarah Washington, RD, MPH",
    title: "Director of Education",
    credentials: "Registered Dietitian; Master of Public Health, Johns Hopkins University",
    bio: "Sarah leads our educational initiatives, translating research findings into accessible content for healthcare professionals and the public. Her background in public health informs our community outreach programs.",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    publications: [
      "Washington, S. & Miller, J. (2023). 'Effectiveness of digital nutrition education platforms'. Journal of Nutrition Education and Behavior, 55(4), 410-418.",
      "Washington, S. (2022). 'Health literacy and nutrient adequacy in diverse populations'. Public Health Nutrition, 25(7), 1103-1112."
    ]
  }
];

// Scientific advisors data
const scientificAdvisors = [
  {
    name: "Prof. Robert Chen",
    role: "Scientific Advisor",
    affiliation: "Stanford University",
    expertise: "Gut Microbiome",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    name: "Dr. Olivia Martin",
    role: "Scientific Advisor",
    affiliation: "Pasteur Institute",
    expertise: "Immunity and Nutrition",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    name: "Prof. Thomas Wagner",
    role: "Scientific Advisor",
    affiliation: "ETH Zürich",
    expertise: "Nutriomics",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    name: "Dr. Leila Bouaziz",
    role: "Scientific Advisor",
    affiliation: "INSERM",
    expertise: "Oxidative Stress",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200&h=200"
  }
];

const ScientificTeam: React.FC = () => {
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
              Our Scientific Team
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Discover the researchers and experts who lead our scientific work and ensure 
              the rigor of our methods and recommendations.
            </p>
          </div>

          {/* Core Team */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {teamMembers.map((member, index) => (
              <Card 
                key={member.id} 
                className="overflow-hidden shadow-md border border-slate-200 hover:border-indigo-200 transition-all hover:shadow-lg"
              >
                <div className="relative h-64">
                  <img 
                    src={member.photoUrl} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-5 text-white">
                      <h3 className="font-bold text-xl">{member.name}</h3>
                      <p className="text-white/80 text-sm">{member.title}</p>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <GraduationCap className="h-4 w-4 text-indigo-600 mr-2" />
                      <span className="text-sm font-medium text-slate-700">{member.credentials}</span>
                    </div>
                    <p className="text-slate-600 text-sm mb-4">
                      {member.bio}
                    </p>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Selected Publications:</h4>
                      <ul className="text-sm text-gray-600 space-y-1 pl-5 list-disc">
                        {member.publications && member.publications.map((pub, index) => (
                          <li key={index}>{pub}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      asChild
                    >
                      <a href="#profile" target="_blank" rel="noopener noreferrer">
                        Profile
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </Button>
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
              </Card>
            ))}
          </div>

          {/* Advisory Committee */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-slate-800 mb-6 text-center">
              Our Advisory Committee
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

          {/* Academic Collaborations */}
          <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-8 mb-16 border border-indigo-100">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-slate-800 mb-3">
                Our Academic Collaborations
              </h3>
              <p className="text-slate-600">
                We collaborate with several academic institutions and international research centers.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {[
                { name: "University of Lyon", logo: "https://via.placeholder.com/150x80?text=Lyon+University" },
                { name: "Pasteur Institute", logo: "https://via.placeholder.com/150x80?text=Institut+Pasteur" },
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
                  Learn more about our partnerships
                  <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Recent Publications */}
          <div className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-slate-800">
                Recent Publications
              </h3>
              <Button 
                variant="ghost"
                className="text-indigo-700"
                asChild
              >
                <Link to="/bibliotheque-scientifique">
                  View all publications
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
                        Read the article
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
                Based on Science, Designed for You
              </h3>
              <p className="text-slate-600">
                Our scientific team has developed a personalized quiz based on years of research
                to help you identify your specific micronutrient needs.
              </p>
            </div>

            <Button 
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
              asChild
            >
              <Link to="/quiz">
                Take the personalized test
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