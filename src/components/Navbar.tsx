
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Menu, X, Search, Instagram } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "glass py-2" : "bg-transparent py-4"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-display font-semibold bg-clip-text text-transparent bg-gradient-to-r from-natural-700 to-natural-500">
            Natural&Pure
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={cn("hover-underline text-sm font-medium transition-colors", 
            isActive('/') ? "text-natural-700" : "text-foreground/80")}>
            Accueil
          </Link>
          <Link to="/articles" className={cn("hover-underline text-sm font-medium transition-colors",
            isActive('/articles') ? "text-natural-700" : "text-foreground/80")}>
            Articles
          </Link>
          <Link to="/about" className={cn("hover-underline text-sm font-medium transition-colors",
            isActive('/about') ? "text-natural-700" : "text-foreground/80")}>
            À propos
          </Link>
          <Link to="/contact" className={cn("hover-underline text-sm font-medium transition-colors",
            isActive('/contact') ? "text-natural-700" : "text-foreground/80")}>
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Button className="bg-gradient-to-r from-natural-500 to-natural-600 hover:from-natural-600 hover:to-natural-700">
              <Instagram className="h-4 w-4 mr-2" />
              Suivre
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="glass md:hidden py-4 px-4 absolute top-full left-0 right-0 slide-up">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className={cn("text-lg font-medium", 
              isActive('/') ? "text-natural-700" : "text-foreground/80")}>
              Accueil
            </Link>
            <Link to="/articles" className={cn("text-lg font-medium", 
              isActive('/articles') ? "text-natural-700" : "text-foreground/80")}>
              Articles
            </Link>
            <Link to="/about" className={cn("text-lg font-medium", 
              isActive('/about') ? "text-natural-700" : "text-foreground/80")}>
              À propos
            </Link>
            <Link to="/contact" className={cn("text-lg font-medium", 
              isActive('/contact') ? "text-natural-700" : "text-foreground/80")}>
              Contact
            </Link>
            <div className="flex items-center pt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button className="w-full bg-gradient-to-r from-natural-500 to-natural-600 hover:from-natural-600 hover:to-natural-700">
                  <Instagram className="h-4 w-4 mr-2" />
                  Suivre sur Instagram
                </Button>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
