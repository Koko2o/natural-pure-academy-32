import React, { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// Lazy-loaded route components
const Home = lazy(() => import('@/pages/Index'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const Articles = lazy(() => import('@/pages/Articles'));
const Article = lazy(() => import('@/pages/Article'));
const Quiz = lazy(() => import('@/pages/Quiz'));
const LaboSolutions = lazy(() => import('@/pages/LaboSolutions'));
const ProfileSante = lazy(() => import('@/pages/ProfileSante'));
const BibliothequeScientifique = lazy(() => import('@/pages/BibliothequeScientifique'));
const NosRecherches = lazy(() => import('@/pages/NosRecherches'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Routes definition
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/contact',
    element: <Contact />
  },
  {
    path: '/articles',
    element: <Articles />
  },
  {
    path: '/article/:id',
    element: <Article />
  },
  {
    path: '/quiz',
    element: <Quiz />
  },
  {
    path: '/labo-solutions',
    element: <LaboSolutions />
  },
  {
    path: '/profile-sante',
    element: <ProfileSante />
  },
  {
    path: '/bibliotheque-scientifique',
    element: <BibliothequeScientifique />
  },
  {
    path: '/nos-recherches',
    element: <NosRecherches />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;