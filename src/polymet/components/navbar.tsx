import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MusicIcon, MenuIcon, XIcon, MoonIcon, SunIcon } from "lucide-react";
import { STUDIO_INFO } from "@/polymet/data/dance-studio-data";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <MusicIcon
              className={`h-6 w-6 ${isScrolled ? "text-purple-600 dark:text-purple-400" : "text-white"}`}
            />

            <span
              className={`font-bold text-lg ${isScrolled ? "text-gray-900 dark:text-white" : "text-white"}`}
            >
              {STUDIO_INFO.name.split(" ")[0]}
            </span>
          </a>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <a
              href="#"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isScrolled
                  ? "text-gray-700 hover:text-purple-600 dark:text-gray-200 dark:hover:text-purple-400"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Home
            </a>
            <a
              href="#about"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isScrolled
                  ? "text-gray-700 hover:text-purple-600 dark:text-gray-200 dark:hover:text-purple-400"
                  : "text-white/80 hover:text-white"
              }`}
            >
              About
            </a>
            <a
              href="#classes"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isScrolled
                  ? "text-gray-700 hover:text-purple-600 dark:text-gray-200 dark:hover:text-purple-400"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Classes
            </a>
            <a
              href="#testimonials"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isScrolled
                  ? "text-gray-700 hover:text-purple-600 dark:text-gray-200 dark:hover:text-purple-400"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isScrolled
                  ? "text-gray-700 hover:text-purple-600 dark:text-gray-200 dark:hover:text-purple-400"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Pricing
            </a>
            <a
              href="#contact"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isScrolled
                  ? "text-gray-700 hover:text-purple-600 dark:text-gray-200 dark:hover:text-purple-400"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Contact
            </a>
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center gap-2">
            {/* Dark mode toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className={`rounded-full ${
                isScrolled
                  ? "text-gray-700 hover:text-purple-600 hover:bg-purple-100/50 dark:text-gray-200 dark:hover:text-purple-400 dark:hover:bg-purple-900/30"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle dark mode</span>
            </Button>

            {/* CTA button */}
            <Button
              className={`rounded-full ${
                isScrolled
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                  : "bg-white/10 hover:bg-white/20 text-white border border-white/30"
              }`}
            >
              Book a Class
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className={`md:hidden rounded-full ${
                isScrolled
                  ? "text-gray-700 hover:bg-purple-100/50 dark:text-gray-200 dark:hover:bg-purple-900/30"
                  : "text-white hover:bg-white/10"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <XIcon className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-4 py-2 space-y-1 bg-white dark:bg-gray-900 shadow-lg">
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-100 hover:text-purple-600 dark:text-gray-200 dark:hover:bg-purple-900/30 dark:hover:text-purple-400"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </a>
          <a
            href="#about"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-100 hover:text-purple-600 dark:text-gray-200 dark:hover:bg-purple-900/30 dark:hover:text-purple-400"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </a>
          <a
            href="#classes"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-100 hover:text-purple-600 dark:text-gray-200 dark:hover:bg-purple-900/30 dark:hover:text-purple-400"
            onClick={() => setIsMenuOpen(false)}
          >
            Classes
          </a>
          <a
            href="#testimonials"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-100 hover:text-purple-600 dark:text-gray-200 dark:hover:bg-purple-900/30 dark:hover:text-purple-400"
            onClick={() => setIsMenuOpen(false)}
          >
            Testimonials
          </a>
          <a
            href="#pricing"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-100 hover:text-purple-600 dark:text-gray-200 dark:hover:bg-purple-900/30 dark:hover:text-purple-400"
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </a>
          <a
            href="#contact"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-100 hover:text-purple-600 dark:text-gray-200 dark:hover:bg-purple-900/30 dark:hover:text-purple-400"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}
