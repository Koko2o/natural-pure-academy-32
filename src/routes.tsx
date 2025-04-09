
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Index from './pages/Index';
import About from './pages/About';
import Articles from './pages/Articles';
import Article from './pages/Article';
import Quiz from './pages/Quiz';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import BibliothequeScientifique from './pages/BibliothequeScientifique';
import ProfileSante from './pages/ProfileSante';
import NosRecherches from './pages/NosRecherches';
import LaboSolutions from './pages/LaboSolutions';
import Nutrition from './pages/Nutrition';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Index /> },
      { path: 'about', element: <About /> },
      { path: 'articles', element: <Articles /> },
      { path: 'article/:articleId', element: <Article /> },
      { path: 'quiz', element: <Quiz /> },
      { path: 'contact', element: <Contact /> },
      { path: 'bibliotheque-scientifique', element: <BibliothequeScientifique /> },
      { path: 'profile-sante', element: <ProfileSante /> },
      { path: 'nos-recherches', element: <NosRecherches /> },
      { path: 'labo-solutions', element: <LaboSolutions /> },
      { path: 'nutrition', element: <Nutrition /> },
    ],
  },
]);

export default router;
