
import { RouteObject } from 'react-router-dom';
import Index from '@/pages/Index';
import Quiz from '@/pages/Quiz';
import Articles from '@/pages/Articles';
import Article from '@/pages/Article';
import About from '@/pages/About';
import NotFound from '@/pages/NotFound';
import ProfileSante from '@/pages/ProfileSante';
import LaboSolutions from '@/pages/LaboSolutions';
import Nutrition from '@/pages/Nutrition';
import NosRecherches from '@/pages/NosRecherches';
import Contact from '@/pages/Contact';
import SiteMap from '@/pages/SiteMap';
import TermsOfUse from '@/pages/TermsOfUse';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import Accessibility from '@/pages/Accessibility';
import Support from '@/pages/Support';
import BibliothequeScientifique from '@/pages/BibliothequeScientifique';
import ScientificMethodology from '@/pages/ScientificMethodology';
import Volunteer from '@/pages/Volunteer';
import Impact from '@/pages/Impact';
import SocialRedirect from '@/pages/SocialRedirect';
import AISystem from '@/pages/AISystem';
import AILearningDashboard from '@/pages/AILearningDashboard';
import AIConfigurationDashboard from '@/pages/AIConfigurationDashboard';
import AdGrantCompliance from '@/pages/AdGrantCompliance';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Index />,
    index: true,
  },
  {
    path: '/quiz',
    element: <Quiz />
  },
  {
    path: '/articles',
    element: <Articles />
  },
  {
    path: '/article/:articleId',
    element: <Article />
  },
  {
    path: '/a-propos',
    element: <About />
  },
  {
    path: '/profil-sante',
    element: <ProfileSante />
  },
  {
    path: '/labo-solutions',
    element: <LaboSolutions />
  },
  {
    path: '/nutrition',
    element: <Nutrition />
  },
  {
    path: '/nos-recherches',
    element: <NosRecherches />
  },
  {
    path: '/contact',
    element: <Contact />
  },
  {
    path: '/plan-du-site',
    element: <SiteMap />
  },
  {
    path: '/conditions-utilisation',
    element: <TermsOfUse />
  },
  {
    path: '/politique-confidentialite',
    element: <PrivacyPolicy />
  },
  {
    path: '/accessibilite',
    element: <Accessibility />
  },
  {
    path: '/support',
    element: <Support />
  },
  {
    path: '/bibliotheque-scientifique',
    element: <BibliothequeScientifique />
  },
  {
    path: '/methodologie-scientifique',
    element: <ScientificMethodology />
  },
  {
    path: '/benevolat',
    element: <Volunteer />
  },
  {
    path: '/impact',
    element: <Impact />
  },
  {
    path: '/social/:network',
    element: <SocialRedirect />
  },
  {
    path: '/admin/ai-system',
    element: <AISystem />
  },
  {
    path: '/admin/ai-learning',
    element: <AILearningDashboard />
  },
  {
    path: '/admin/ai-configuration',
    element: <AIConfigurationDashboard />
  },
  {
    path: '/admin/adgrant-compliance',
    element: <AdGrantCompliance />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;
