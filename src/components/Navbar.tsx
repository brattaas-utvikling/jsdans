import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon, MoonIcon, SunIcon } from "lucide-react";
import logo from "../assets/logo.svg";

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

// Simplified navigation item interface (kun routes)
interface NavigationItem {
  label: string;
  href: string;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return JSON.parse(saved);
    return false;
  });
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const navbarRef = useRef<HTMLElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Simplified navigation items (kun routes)
  const navigationItems: NavigationItem[] = useMemo(() => [
    { label: "Hjem", href: "/" },
    { label: "Om oss", href: "/om-oss" },
    { label: "Kurs", href: "/kurs" },
    { label: "Timeplan", href: "/timeplan" },
    { label: "Påmelding", href: "/registration" },
    { label: "Pris", href: "/priser" },
    { label: "Nyheter", href: "/nyheter" },
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
    if (window.innerWidth >= 1024) {
      navbar.style.transform = "translateY(0)";
      return;
    }
    
    // Avoid excessive updates
    if (Math.abs(currentScrollY - lastScrollY) < 10) return;
    
    // Hide on scroll down, show on scroll up
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      navbar.style.transform = "translateY(-100%)";
      setIsMenuOpen(false);
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

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Simplified navigation handler (kun routes)
  const handleNavClick = useCallback((href: string) => {
    setIsMenuOpen(false);
    
    if (href === "/" && location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(href);
    }
  }, [location.pathname, navigate]);

  // Check if route is active
  const isActiveRoute = useCallback((href: string) => {
    return location.pathname === href;
  }, [location.pathname]);

  // Preload route on hover
  const handleNavHover = useCallback((href: string) => {
    if (href.startsWith('/') && href !== location.pathname) {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
    }
  }, [location.pathname]);

  // Simplified NavLink component
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
    const isActive = isActiveRoute(item.href);
    const finalClassName = `${className} ${
      isActive 
        ? "text-brand-600 dark:text-white font-semibold" 
        : "text-gray-700 dark:text-white/80 hover:text-brand-600 dark:hover:text-white"
    }`;

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
  };

  return (
    <motion.header
      ref={navbarRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 
                bg-white/90 dark:bg-brand-600/90
                backdrop-blur-md 
                shadow-studio border-b border-gray-200/30 dark:border-brand-700/30
                transition-all duration-300 ease-in-out"
    >
      <div className="w-full max-w-7xl mx-auto px-4 overflow-hidden">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <motion.button
            onClick={() => handleNavClick("/")}
            className="flex items-center gap-2 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded-lg"
            whileTap={{ scale: 0.98 }}
            aria-label="Urban Studios - Gå til forsiden"
          >
            <img
              src={logo}
              alt="Urban Studios"
              className="h-12 lg:h-16 max-w-48 object-contain dark:invert"
              loading="eager"
            />
          </motion.button>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <NavLink
                  item={item}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 
                            focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 
                            dark:focus:ring-offset-brand-600"
                  onClick={() => handleNavClick(item.href)}
                  onMouseEnter={() => handleNavHover(item.href)}
                />
              </motion.div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            
            {/* Dark mode toggle */}
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDarkMode((prev: boolean) => !prev)}
                className="rounded-full 
                          text-gray-600 dark:text-white/80 
                          hover:text-brand-600 dark:hover:text-white 
                          hover:bg-gray-100 dark:hover:bg-brand-700/50
                          transition-all focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 
                          dark:focus:ring-white/50 dark:focus:ring-offset-brand-600"
                aria-label={isDarkMode ? "Bytt til lys modus" : "Bytt til mørk modus"}
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

            {/* Desktop CTA Button */}
            <motion.div 
              whileTap={{ scale: 0.98 }}
              className="hidden lg:block"
            >
              <Button 
                className="font-semibold rounded-full 
                          bg-brand-500 hover:bg-brand-600
                          dark:bg-white dark:hover:bg-gray-50
                          text-white dark:text-brand-600
                          dark:hover:text-brand-700
                          border-0 shadow hover:shadow-md transition-all duration-200 
                          focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 
                          dark:focus:ring-brand-500 dark:focus:ring-offset-brand-600"
                onClick={() => handleNavClick("/kurs")}
                onMouseEnter={() => handleNavHover("/kurs")}
              >
                Se våre kurs
              </Button>
            </motion.div>

            {/* Mobile menu toggle */}
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-full 
                          text-gray-600 dark:text-white/80 
                          hover:text-brand-600 dark:hover:text-white 
                          hover:bg-gray-100 dark:hover:bg-brand-700/50
                          transition-colors focus:ring-2 focus:ring-brand-500 focus:ring-offset-2
                          dark:focus:ring-white/50 dark:focus:ring-offset-brand-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? "Lukk meny" : "Åpne meny"}
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

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: menuHeight, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-white/90 dark:bg-brand-600/90 backdrop-blur-md"
          >
            <div 
              ref={menuContentRef}
              className="text-center px-4 py-4 space-y-1 
                        border-t border-gray-200/30 dark:border-brand-700/30"
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
                    className="block px-4 py-3 rounded-lg text-base font-medium 
                              hover:bg-gray-100 dark:hover:bg-brand-700/50 
                              transition-all duration-200 focus:outline-none focus:ring-2 
                              focus:ring-brand-500 focus:ring-offset-2
                              dark:focus:ring-white/50 dark:focus:ring-offset-brand-600"
                    onClick={() => handleNavClick(item.href)}
                    onMouseEnter={() => handleNavHover(item.href)}
                  />
                </motion.div>
              ))}
              
              {/* Mobile CTA */}
              <motion.div 
                className="pt-4 pb-2"
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Button 
                  className="w-full font-semibold rounded-full
                            bg-brand-500 hover:bg-brand-600
                            dark:bg-white dark:hover:bg-gray-50
                            text-white dark:text-brand-600
                            dark:hover:text-brand-700
                            border-0 shadow hover:shadow-md 
                            transition-all duration-200"
                  onClick={() => handleNavClick("/kurs")}
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