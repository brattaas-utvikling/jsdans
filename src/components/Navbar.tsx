import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon, MoonIcon, SunIcon } from "lucide-react";
import logo from "../assets/urban_studios_logo.svg";

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

// Navigation item interface
interface NavigationItem {
  label: string;
  href: string;
  type: "route" | "anchor";
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return JSON.parse(saved);
    // Standard til lys modus hvis ingen preferanse er lagret
    return false;
  });
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  
  const navbarRef = useRef<HTMLElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation items configuration - memoized to prevent re-renders
  const navigationItems: NavigationItem[] = useMemo(() => [
    { label: "Hjem", href: "/", type: "route" },
    { label: "Nyheter", href: "/nyheter", type: "route" },
    { label: "Om oss", href: "/om-oss", type: "route" },
    { label: "Kurs", href: "/kurs", type: "route" },
    { label: "Påmelding", href: "/registration", type: "route" },
    { label: "Pris", href: "/priser", type: "route" },
    { label: "Kontakt oss", href: "/kontakt", type: "route" }
  ], []);

  // Dynamic menu height calculation
  useEffect(() => {
    if (menuContentRef.current) {
      const height = menuContentRef.current.scrollHeight;
      setMenuHeight(height);
    }
  }, [isMenuOpen, navigationItems]);

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
    
    // Avoid excessive updates
    if (Math.abs(currentScrollY - lastScrollY) < 10) return;
    
    // Hide on scroll down, show on scroll up
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      navbar.style.transform = "translateY(-100%)";
      setIsMenuOpen(false); // Close menu when hiding navbar
    } else {
      navbar.style.transform = "translateY(0)";
    }
    
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  const throttledScrollHandler = useCallback(
    () => throttle(handleScroll, 16),
    [handleScroll]
  );

  // Setup scroll listener
  useEffect(() => {
    window.addEventListener("scroll", throttledScrollHandler, { passive: true });
    return () => window.removeEventListener("scroll", throttledScrollHandler);
  }, [throttledScrollHandler]);

  // Handle dark mode changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  // Handle click outside and body scroll lock
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

  // Handle escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [isMenuOpen]);

  // Simplified navigation handler
  const handleNavClick = useCallback((href: string, type: string) => {
    setIsMenuOpen(false);
    
    if (type === "route") {
      if (href === "/" && location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate(href);
      }
    } else if (type === "anchor") {
      // Handle anchor navigation
      if (location.pathname !== "/") {
        navigate("/");
        // Wait for navigation to complete
        setTimeout(() => {
          const element = document.querySelector(href);
          element?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.pathname, navigate]);

  // Setup intersection observer for active sections
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

  // Check if route/section is active
  const isActiveRoute = useCallback((href: string, type: string) => {
    if (type === "route") {
      return location.pathname === href;
    }
    return location.pathname === "/" && activeSection === href;
  }, [location.pathname, activeSection]);

  // Preload route on hover (performance optimization)
  const handleNavHover = useCallback((href: string) => {
    if (href.startsWith('/') && href !== location.pathname) {
      // This would work with route-based code splitting
      // import(`../pages${href}`).catch(() => {});
    }
  }, [location.pathname]);

  // NavLink component
  const NavLink = ({ 
    item, 
    className, 
    onClick,
    onMouseEnter 
  }: { 
    item: NavigationItem;
    className: string;
    onClick: () => void;
    onMouseEnter?: () => void;
  }) => {
    const isActive = isActiveRoute(item.href, item.type);
    const finalClassName = `${className} ${
      isActive 
        ? "text-blue-500 dark:text-pink-300 font-semibold" 
        : "text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-pink-300"
    }`;

    if (item.type === "route") {
      return (
        <Link
          to={item.href}
          className={finalClassName}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
        >
          {item.label}
        </Link>
      );
    } else {
      return (
        <button
          className={finalClassName}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
        >
          {item.label}
        </button>
      );
    }
  };

  return (
    <motion.header
      ref={navbarRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 
                bg-white/95 dark:bg-blue-800/95 
                backdrop-blur-md 
                shadow-studio border-b border-gray-200/20 dark:border-blue-700/30
                transition-all duration-300 ease-in-out"
    >
      <div className="w-full max-w-7xl mx-auto px-4 overflow-hidden">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <motion.button 
            onClick={() => handleNavClick("/", "route")}
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src={logo}
              alt="Urban Studios Logo"
              className="h-16 w-auto object-contain"
            />
          </motion.button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1 flex-1 justify-center">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <NavLink
                  item={item}
                  className="px-4 py-2 rounded-lg text-sm font-montserrat-medium transition-all duration-200 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                            dark:focus:ring-offset-blue-800"
                  onClick={() => handleNavClick(item.href, item.type)}
                  onMouseEnter={() => handleNavHover(item.href)}
                />
              </motion.div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            
            {/* Dark mode toggle */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDarkMode((prev: boolean) => !prev)}
                className="rounded-full text-blue-600 dark:text-pink-300 
                          hover:text-blue-600 dark:hover:text-blue-400 
                          hover:bg-blue-50 dark:hover:bg-blue-700/50
                          transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isDarkMode ? "sun" : "moon"}
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isDarkMode ? (
                      <SunIcon className="h-5 w-5" />
                    ) : (
                      <MoonIcon className="h-5 w-5" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </Button>
            </motion.div>

            {/* CTA Button */}
            <motion.div 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
              className="hidden md:block"
            >
              <Button 
                className="font-montserrat-semibold rounded-full 
                          bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 
                          hover:from-blue-600 hover:via-indigo-600 hover:to-pink-600 
                          text-white border-0 shadow transition-all duration-200 
                          hover:shadow-studio-lg 
                          focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => handleNavClick("/kurs", "route")}
                onMouseEnter={() => handleNavHover("/kurs")}
              >
                Se våre kurs
              </Button>
            </motion.div>

            {/* Mobile menu toggle */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-full text-gray-600 dark:text-gray-300 
                          hover:text-blue-600 dark:hover:text-blue-400 
                          hover:bg-blue-50 dark:hover:bg-blue-700/50
                          transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isMenuOpen ? "close" : "menu"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {isMenuOpen ? (
                      <XIcon className="h-5 w-5" />
                    ) : (
                      <MenuIcon className="h-5 w-5" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile menu with dynamic height */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: menuHeight, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
            aria-hidden={!isMenuOpen}
          >
            <div 
              ref={menuContentRef}
              className="text-center px-4 py-2 space-y-1 
                        bg-white/95 dark:bg-blue-800/95 backdrop-blur-md 
                          shadow-studio-lg border-t border-gray-200/20 dark:border-blue-700/30"
            >
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <NavLink
                    item={item}
                    className="block px-4 py-3 rounded-lg text-base font-montserrat-medium 
                              hover:bg-blue-50 dark:hover:bg-blue-700/50 
                              transition-all duration-200 focus:outline-none focus:ring-2 
                              focus:ring-blue-500 focus:ring-offset-2"
                    onClick={() => handleNavClick(item.href, item.type)}
                    onMouseEnter={() => handleNavHover(item.href)}
                  />
                </motion.div>
              ))}
              
              {/* Mobile CTA */}
              <motion.div 
                className="pt-3 pb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Button 
                  className="w-full font-montserrat-semibold rounded-full
                            bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 
                            hover:from-blue-700 hover:via-indigo-700 hover:to-pink-700 
                            text-white border-0 shadow-studio transition-all duration-200"
                  onClick={() => handleNavClick("/kurs", "route")}
                >
                  Se våre kurs
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}