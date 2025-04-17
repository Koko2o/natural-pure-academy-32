import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface NavItemProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, children, className = '', onClick }) => (
  <Link
    to={to}
    className={`px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition ${className}`}
    onClick={onClick}
  >
    {children}
  </Link>
);

const Navbar: React.FC = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Change navbar appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm'
          : 'bg-white dark:bg-gray-900'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/favicon.ico"
            alt="Natural Pure Academy"
            className="w-8 h-8"
          />
          <span className="font-bold text-xl hidden sm:inline">
            Natural Pure Academy
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavItem to="/">{t('home')}</NavItem>
          <NavItem to="/articles">{t('articles')}</NavItem>
          <NavItem to="/labo-solutions">{t('labo_solutions')}</NavItem>
          <NavItem to="/quiz">{t('quiz')}</NavItem>
          <NavItem to="/profile-sante">{t('profile_sante')}</NavItem>
          <NavItem to="/about">{t('about')}</NavItem>
          <NavItem to="/contact">{t('contact')}</NavItem>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <LanguageSwitcher />

          <Button variant="outline" size="sm" className="hidden sm:flex">
            {t('sign_in')}
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
            aria-label={t('toggle_menu')}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <nav className="container mx-auto px-4 py-3 flex flex-col space-y-2">
            <NavItem to="/" onClick={closeMenu}>{t('home')}</NavItem>
            <NavItem to="/articles" onClick={closeMenu}>{t('articles')}</NavItem>
            <NavItem to="/labo-solutions" onClick={closeMenu}>{t('labo_solutions')}</NavItem>
            <NavItem to="/quiz" onClick={closeMenu}>{t('quiz')}</NavItem>
            <NavItem to="/profile-sante" onClick={closeMenu}>{t('profile_sante')}</NavItem>
            <NavItem to="/about" onClick={closeMenu}>{t('about')}</NavItem>
            <NavItem to="/contact" onClick={closeMenu}>{t('contact')}</NavItem>

            <div className="pt-2 border-t mt-2">
              <Button className="w-full" variant="default" size="sm">
                {t('sign_in')}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;