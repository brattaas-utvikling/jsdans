import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();
  const navigate = useNavigate();

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
    { label: "Hjem", href: "/", type: "route" },
    { label: "Om oss", href: "#about", type: "anchor" },
    { label: "Kurs", href: "#classes", type: "anchor" },
    { label: "Courses", href: "/courses", type: "route" },
    { label: "Pris", href: "/priser", type: "route" },
    { label: "Kontakt oss", href: "#contact", type: "anchor" }
  ];

  const handleNavClick = (href: string, type: string) => {
    setIsMenuOpen(false);
    
    if (type === "route") {
      if (href === "/" && location.pathname === "/") {
        // If already on home page and clicking "Hjem", scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // Navigate to different route
        navigate(href);
      }
    } else if (type === "anchor") {
      // Handle anchor links - href should be like "#about", "#contact" etc.
      if (location.pathname !== "/") {
        // If not on home page, navigate to home first then scroll
        navigate("/");
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        // If on home page, just scroll to the section
        if (href.startsWith("#")) {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    }
  };

  // Track which section is currently in view
  const [activeSection, setActiveSection] = useState("");

  // Intersection Observer to track active sections
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "-80px 0px -80px 0px" // Account for navbar height
      }
    );

    // Observe sections
    const sections = ["hero", "about", "classes", "contact"];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const isActiveRoute = (href: string, type: string) => {
    if (type === "route") {
      return location.pathname === href;
    }
    // For anchor links, check if this specific section is active
    return location.pathname === "/" && activeSection === href;
  };

  const NavLink = ({ item, className, onClick }: { 
    item: typeof navigationItems[0], 
    className: string,
    onClick: () => void 
  }) => {
    const isActive = isActiveRoute(item.href, item.type);
    const finalClassName = `${className} ${
      isActive 
        ? "text-blue-600 dark:text-blue-400 font-semibold" 
        : "text-zinc-700 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400"
    }`;

    if (item.type === "route") {
      return (
        <Link
          to={item.href}
          className={finalClassName}
          onClick={onClick}
        >
          {item.label}
        </Link>
      );
    } else {
      return (
        <button
          className={finalClassName}
          onClick={onClick}
        >
          {item.label}
        </button>
      );
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
          <button 
            onClick={() => handleNavClick("/", "route")}
            className="flex items-center gap-2"
          >
            <span className="font-bold text-lg text-zinc-900 dark:text-white transition-colors">
              {STUDIO_INFO.name}
            </span>
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1 flex-1 justify-center">
            {navigationItems.map((item) => (
              <NavLink
                key={item.label}
                item={item}
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => handleNavClick(item.href, item.type)}
              />
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Dark mode toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDarkMode((prev) => !prev)}
              className="rounded-full text-zinc-700 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
              className="hidden md:block rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 hover:from-blue-600 hover:via-indigo-600 hover:to-violet-600 text-white border-0 transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => handleNavClick("#contact", "anchor")}
            >
              Book et kurs
            </Button>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full text-zinc-700 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
            <NavLink
              key={item.label}
              item={item}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => handleNavClick(item.href, item.type)}
            />
          ))}
          
          {/* Mobile CTA */}
          <div className="pt-2 pb-1">
            <Button 
              className="w-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 hover:from-blue-600 hover:via-indigo-600 hover:to-violet-600 text-white border-0 transition-all duration-200"
              onClick={() => handleNavClick("#contact", "anchor")}
            >
              Book et kurs
            </Button>
            
          </div>
        </div>
      </div>
    </header>
  );
}