import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './routes.tsx'
import './index.css'
import SEOHead from './components/SEOHead';

// Wrapper to ensure SEOHead has access to location context (This is a placeholder; actual implementation may require context)
const AppWithSEO = () => {
  return (
    <>
      <SEOHead isNonprofit={true} />
      <RouterProvider router={router} />
    </>
  );
};


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppWithSEO />
  </React.StrictMode>,
)