
import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Microscope, BookOpen, Heart, PieChart, Brain, Users, Award, FileText } from "lucide-react";
import { useTranslation } from '@/contexts/LanguageContext';

const Sitemap = () => {
  const { t } = useTranslation();

  const siteStructure = [
    {
      title: t('Main Pages'),
      icon: <FileText className="h-4 w-4 text-indigo-600" />,
      links: [
        { name: t('Home'), path: '/' },
        { name: t('About Us'), path: '/about' },
        { name: t('Our Impact'), path: '/impact' },
        { name: t('Contact'), path: '/contact' },
        { name: t('Privacy Policy'), path: '/privacy-policy' },
      ]
    },
    {
      title: t('Research & Education'),
      icon: <Microscope className="h-4 w-4 text-indigo-600" />,
      links: [
        { name: t('Our Research'), path: '/nos-recherches' },
        { name: t('Scientific Publications'), path: '/bibliotheque-scientifique' },
        { name: t('Scientific Methodology'), path: '/scientific-methodology' },
        { name: t('Lab Solutions'), path: '/labo-solutions' },
      ]
    },
    {
      title: t('Health Resources'),
      icon: <Heart className="h-4 w-4 text-indigo-600" />,
      links: [
        { name: t('Articles'), path: '/articles' },
        { name: t('Nutrition'), path: '/nutrition' },
        { name: t('Health Profile'), path: '/profile-sante' },
        { name: t('Interactive Quiz'), path: '/quiz' },
      ]
    },
    {
      title: t('Scientific Team'),
      icon: <Users className="h-4 w-4 text-indigo-600" />,
      links: [
        { name: t('Team Members'), path: '/about#team' },
        { name: t('Research Partners'), path: '/about#partners' },
        { name: t('Scientific Advisory Board'), path: '/about#advisory-board' },
      ]
    },
  ];

  return (
    <section className="py-12 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <Badge variant="indigo" className="mb-2">
              <BookOpen className="h-3 w-3 mr-1" />
              {t('Site Navigation')}
            </Badge>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">{t('Site Map')}</h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {t('A comprehensive overview of our website structure to help you navigate our research and resources efficiently.')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {siteStructure.map((section, idx) => (
              <div key={idx} className="bg-slate-50 rounded-lg p-6 shadow-sm border border-slate-200">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-white rounded-full shadow-sm mr-3">{section.icon}</div>
                  <h2 className="text-xl font-semibold text-slate-800">{section.title}</h2>
                </div>
                <ul className="space-y-2">
                  {section.links.map((link, i) => (
                    <li key={i} className="group">
                      <Link 
                        to={link.path} 
                        className="flex items-center py-1.5 px-2 rounded-md text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-2 opacity-75 group-hover:bg-indigo-600 group-hover:opacity-100"></span>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 bg-indigo-50 rounded-lg border border-indigo-100">
            <h2 className="text-xl font-semibold text-indigo-800 mb-4 flex items-center">
              <Award className="h-5 w-5 mr-2" />
              {t('Looking for Specific Research?')}
            </h2>
            <p className="text-slate-700 mb-4">
              {t('Our Scientific Library contains all our published research organized by topic, date, and relevance to help you find exactly what you need.')}
            </p>
            <Link 
              to="/bibliotheque-scientifique" 
              className="inline-flex items-center text-indigo-700 hover:text-indigo-900 font-medium"
            >
              {t('Explore our Scientific Library')}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Sitemap;
