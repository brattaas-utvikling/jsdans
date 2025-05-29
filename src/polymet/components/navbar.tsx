import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon, MoonIcon, SunIcon } from "lucide-react";
import { STUDIO_INFO } from "@/polymet/data/dance-studio-data";

// Throttle utility function
function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navbarRef = useRef<HTMLElement>(null);

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    } else {
      // Check system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(systemPrefersDark);
    }
  }, []);

  // Handle scroll behavior with throttling
  const handleScroll = useCallback(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;
    
    const currentScrollY = window.scrollY;
    
    // Don't hide navbar on desktop
    if (window.innerWidth >= 768) {
      navbar.style.transform = "translateY(0)";
      return;
    }
    
    // Only apply transform if scrolled more than 10px to avoid jitter
    if (Math.abs(currentScrollY - lastScrollY) < 10) return;
    
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Scrolling down & past 100px → hide navbar
      navbar.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up → show navbar
      navbar.style.transform = "translateY(0)";
    }
    
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  // Throttled scroll handler
  const throttledScrollHandler = useCallback(
    throttle(handleScroll, 16), // ~60fps
    [handleScroll]
  );

  useEffect(() => {
    window.addEventListener("scroll", throttledScrollHandler, { passive: true });
    return () => window.removeEventListener("scroll", throttledScrollHandler);
  }, [throttledScrollHandler]);

  // Handle dark mode toggle and persistence
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [isMenuOpen]);

  const navigationItems = [
    { label: "Hjem", href: "#hero" },
    { label: "Om oss", href: "#about" },
    { label: "Kurs", href: "#classes" },
    { label: "Pris", href: "#pricing" },
    { label: "Kontakt oss", href: "#contact" }
  ];

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    
    // Smooth scroll to section
    if (href !== "#") {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      ref={navbarRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md transition-transform duration-300 ease-in-out"
    >
      <div className="w-full max-w-7xl mx-auto px-4 overflow-hidden">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a 
            href="#" 
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-md"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#");
            }}
          >
            <span className="font-bold text-lg text-zinc-900 dark:text-white transition-colors">
              {STUDIO_INFO.name}
            </span>
          </a>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1 flex-1 justify-center">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Dark mode toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDarkMode((prev) => !prev)}
              className="rounded-full text-zinc-700 dark:text-zinc-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </Button>

            {/* CTA Button */}
            <Button 
              className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              onClick={() => handleNavClick("#contact")}
            >
              Book et kurs
            </Button>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full text-zinc-700 dark:text-zinc-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <XIcon className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="px-4 py-2 space-y-1 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm shadow-lg border-t border-gray-200 dark:border-gray-700">
          {navigationItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-zinc-700 dark:text-zinc-200 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
            >
              {item.label}
            </a>
          ))}
          
          {/* Mobile CTA */}
          <div className="pt-2 pb-1">
            <Button 
              className="w-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all duration-200"
              onClick={() => handleNavClick("#contact")}
            >
              Book et kurs
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}