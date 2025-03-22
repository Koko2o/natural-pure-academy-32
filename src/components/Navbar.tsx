
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMobile();

  const closeMenu = () => {
    setIsOpen(false);
  };

  const links = [
    { name: "Accueil", path: "/" },
    { name: "Articles", path: "/articles" },
    { name: "Quiz Nutrition", path: "/quiz" },
    { name: "Profil Santé", path: "/profil-sante" },
    { name: "Labo Solutions", path: "/labo-solutions" },
    { name: "Nutrition", path: "/nutrition" },
    { name: "À propos", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const renderLinks = () => {
    return links.map((link) => (
      <Link
        key={link.path}
        to={link.path}
        className="text-gray-700 hover:text-primary transition-colors"
        onClick={closeMenu}
      >
        {link.name}
      </Link>
    ));
  };

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-primary">
          NaturalPure
        </Link>

        {isMobile ? (
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                {renderLinks()}
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="flex gap-6">{renderLinks()}</div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
