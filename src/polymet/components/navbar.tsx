import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon, MoonIcon, SunIcon } from "lucide-react";
import logo from "../../assets/urban_studios_logo.svg";

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
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(systemPrefersDark);
    }
  }, []);

  // Handle scroll behavior with throttling
  const handleScroll = useCallback(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;
    
    const currentScrollY = window.scrollY;
    
    if (window.innerWidth >= 768) {
      navbar.style.transform = "translateY(0)";
      return;
    }
    
    if (Math.abs(currentScrollY - lastScrollY) < 10) return;
    
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }
    
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  const throttledScrollHandler = useCallback(
    throttle(handleScroll, 16),
    [handleScroll]
  );

  useEffect(() => {
    window.addEventListener("scroll", throttledScrollHandler, { passive: true });
    return () => window.removeEventListener("scroll", throttledScrollHandler);
  }, [throttledScrollHandler]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

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
    { label: "Nyheter", href: "/nyheter", type: "route" },
    { label: "Om oss", href: "/om-oss", type: "route" },
    { label: "Kurs", href: "#classes", type: "anchor" },
    { label: "Påmelding", href: "/courses", type: "route" },
    { label: "Pris", href: "/priser", type: "route" },
    { label: "Kontakt oss", href: "/kontakt", type: "route" }
  ];

  const handleNavClick = (href: string, type: string) => {
    setIsMenuOpen(false);
    
    if (type === "route") {
      if (href === "/" && location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate(href);
      }
    } else if (type === "anchor") {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        if (href.startsWith("#")) {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    }
  };

  const [activeSection, setActiveSection] = useState("");

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
        rootMargin: "-80px 0px -80px 0px"
      }
    );

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
        ? "text-studio-blue-500 dark:text-studio-blue-400 font-semibold" 
        : "text-gray-700 dark:text-gray-200 hover:text-studio-blue-500 dark:hover:text-studio-blue-400"
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
      className="fixed top-0 left-0 right-0 z-50 
                bg-white/95 dark:bg-studio-blue-800/95 
                  backdrop-blur-md 
                  shadow-studio border-b border-gray-200/20 dark:border-studio-blue-700/30
                  transition-all duration-300 ease-in-out"
    >
      <div className="w-full max-w-7xl mx-auto px-4 overflow-hidden">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button 
            onClick={() => handleNavClick("/", "route")}
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <img
              src={logo}
              alt="Urban Studios Logo"
              className="h-16 w-auto object-contain"
            />
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1 flex-1 justify-center">
            {navigationItems.map((item) => (
              <NavLink
                key={item.label}
                item={item}
                className="px-4 py-2 rounded-lg text-sm font-montserrat-medium transition-all duration-200 
                          hover:bg-studio-blue-50 dark:hover:bg-studio-blue-700/50
                          focus:outline-none focus:ring-2 focus:ring-studio-blue-500 focus:ring-offset-2 
                          dark:focus:ring-offset-studio-blue-800"
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
              className="rounded-full text-gray-600 dark:text-gray-300 
                        hover:text-studio-blue-600 dark:hover:text-studio-blue-400 
                        hover:bg-studio-blue-50 dark:hover:bg-studio-blue-700/50
                        transition-colors focus:ring-2 focus:ring-studio-blue-500 focus:ring-offset-2"
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
              className="hidden md:block font-montserrat-semibold rounded-full 
                        bg-gradient-to-r from-studio-blue-500 via-studio-indigo-500 to-studio-pink-500 
                        hover:from-studio-blue-600 hover:via-studio-indigo-600 hover:to-studio-pink-600 
                        text-white border-0 shadow-studio transition-all duration-200 
                        hover:shadow-studio-lg 
                        focus:ring-2 focus:ring-studio-blue-500 focus:ring-offset-2"
              onClick={() => handleNavClick("#contact", "anchor")}
            >
              Book et kurs
            </Button>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full text-gray-600 dark:text-gray-300 
                        hover:text-studio-blue-600 dark:hover:text-studio-blue-400 
                        hover:bg-studio-blue-50 dark:hover:bg-studio-blue-700/50
                        transition-colors focus:ring-2 focus:ring-studio-blue-500 focus:ring-offset-2"
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
        <div className="text-center px-4 py-2 space-y-1 
                       bg-white/95 dark:bg-studio-blue-800/95 backdrop-blur-md 
                       shadow-studio-lg border-t border-gray-200/20 dark:border-studio-blue-700/30">
          {navigationItems.map((item) => (
            <NavLink
              key={item.label}
              item={item}
              className="block px-4 py-3 rounded-lg text-base font-montserrat-medium 
                        hover:bg-studio-blue-50 dark:hover:bg-studio-blue-700/50 
                        transition-all duration-200 focus:outline-none focus:ring-2 
                        focus:ring-studio-blue-500 focus:ring-offset-2"
              onClick={() => handleNavClick(item.href, item.type)}
            />
          ))}
          
          {/* Mobile CTA */}
          <div className="pt-2 pb-1">
            <Button 
              className="w-full font-montserrat-semibold rounded-full 
                        bg-gradient-to-r from-studio-blue-500 via-studio-indigo-500 to-studio-pink-500 
                        hover:from-studio-blue-600 hover:via-studio-indigo-600 hover:to-studio-pink-600 
                        text-white border-0 shadow-studio transition-all duration-200"
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