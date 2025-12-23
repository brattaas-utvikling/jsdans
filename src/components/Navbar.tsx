import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon, MoonIcon, SunIcon } from "lucide-react";
import logo from "../assets/logo.svg";

// liten throttle for scroll
function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      window.setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

interface NavigationItem {
  label: string;
  href: string;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) return JSON.parse(saved) as boolean;
    return false;
  });

  const navbarRef = useRef<HTMLElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems: NavigationItem[] = useMemo(
    () => [
      { label: "Hjem", href: "/" },
      { label: "Om oss", href: "/om-oss" },
      { label: "Kurs", href: "/kurs" },
      { label: "Timeplan", href: "/timeplan" },
      { label: "Påmelding", href: "/registration" },
      { label: "Pris", href: "/priser" },
      { label: "Nyheter", href: "/nyheter" },
    ],
    [],
  );

  // beregn høyde på mobilmeny
  useEffect(() => {
    if (menuContentRef.current) {
      setMenuHeight(menuContentRef.current.scrollHeight);
    }
  }, [isMenuOpen, navigationItems]);

  // hide/show på mobil ved scroll
  const handleScrollBehavior = useCallback(() => {
    const header = navbarRef.current;
    if (!header) return;

    const currentScrollY = window.scrollY;

    // ikke gjem på desktop
    if (window.innerWidth >= 1024) {
      header.style.transform = "translateY(0)";
      return;
    }

    // ikke spam
    if (Math.abs(currentScrollY - lastScrollY) < 10) return;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      header.style.transform = "translateY(-100%)";
      setIsMenuOpen(false);
    } else {
      header.style.transform = "translateY(0)";
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  const throttledScrollHandler = useMemo(
    () => throttle(handleScrollBehavior, 16),
    [handleScrollBehavior],
  );

  useEffect(() => {
    window.addEventListener("scroll", throttledScrollHandler, { passive: true });
    return () => window.removeEventListener("scroll", throttledScrollHandler);
  }, [throttledScrollHandler]);

  // Dark mode
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  // lukk meny på route change (matcher prosjektet du liker)
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // klikk utenfor + lås body
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
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

  const handleNavClick = useCallback(
    (href: string) => {
      setIsMenuOpen(false);

      if (href === "/" && location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate(href);
      }
    },
    [location.pathname, navigate],
  );

  const isActiveRoute = useCallback(
    (href: string) => location.pathname === href,
    [location.pathname],
  );

  const handleNavHover = useCallback(
    (href: string) => {
      if (href.startsWith("/") && href !== location.pathname) {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.href = href;
        document.head.appendChild(link);
      }
    },
    [location.pathname],
  );

  const NavLinkItem = ({
    item,
    className,
    onClick,
    onMouseEnter,
  }: {
    item: NavigationItem;
    className: string;
    onClick: () => void;
    onMouseEnter?: () => void;
  }) => {
    const active = isActiveRoute(item.href);
    return (
      <Link
        to={item.href}
        className={`${className} ${
          active
            ? "text-brand-600 dark:text-white font-semibold"
            : "text-gray-700 dark:text-white/80 hover:text-brand-600 dark:hover:text-white"
        }`}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header
      ref={navbarRef}
      className="fixed top-0 left-0 right-0 z-50 
                bg-white/90 dark:bg-brand-600/90
                backdrop-blur-md 
                shadow-studio border-b border-gray-200/30 dark:border-brand-700/30
                transition-transform duration-300 ease-in-out"
    >
      <div className="w-full max-w-7xl mx-auto px-4 overflow-hidden">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo (IKKE motion) */}
          <button
            type="button"
            onClick={() => handleNavClick("/")}
            className="flex items-center gap-2 hover:opacity-90 transition-opacity 
                       focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded-lg"
            aria-label="Urban Studios - Gå til forsiden"
          >
            <img
              src={logo}
              alt="Urban Studios"
              className="h-12 lg:h-16 max-w-48 object-contain dark:invert"
              loading="eager"
            />
          </button>

          {/* Desktop navigation (animer kun items) */}
          <div className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <NavLinkItem
                  item={item}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 
                            focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 
                            dark:focus:ring-offset-brand-600"
                  onClick={() => handleNavClick(item.href)}
                  onMouseEnter={() => handleNavHover(item.href)}
                />
              </motion.div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Dark mode toggle (micro-feedback ok) */}
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDarkMode((prev) => !prev)}
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
                    {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                  </motion.div>
                </AnimatePresence>
              </Button>
            </motion.div>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <motion.div whileTap={{ scale: 0.98 }}>
                <Button
                  className="font-semibold rounded-full 
                            bg-brand-500 hover:bg-brand-600
                            dark:bg-white dark:hover:bg-gray-50
                            text-white dark:text-brand-600
                            dark:hover:text-brand-700
                            border-0 shadow hover:shadow-md transition-all duration-200 
                            focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 
                            dark:focus:ring-brand-500 dark:focus:ring-offset-brand-600"
                  onClick={() => handleNavClick("/kontakt")}
                  onMouseEnter={() => handleNavHover("/kontakt")}
                >
                  Kontakt oss
                </Button>
              </motion.div>
            </div>

            {/* Mobile toggle */}
            <motion.div whileTap={{ scale: 0.95 }}>
              <button
                type="button"
                className="lg:hidden rounded-full p-2
                          text-gray-600 dark:text-white/80
                          hover:text-brand-600 dark:hover:text-white
                          hover:bg-gray-100 dark:hover:bg-brand-700/50
                          transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2
                          dark:focus:ring-white/50 dark:focus:ring-offset-brand-600"
                onClick={() => setIsMenuOpen((p) => !p)}
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
                    {isMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
                  </motion.div>
                </AnimatePresence>
              </button>
            </motion.div>
          </div>
        </nav>
      </div>

      {/* Mobile nav */}
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
              className="text-center px-4 py-4 space-y-1 border-t border-gray-200/30 dark:border-brand-700/30"
            >
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <NavLinkItem
                    item={item}
                    className={`block px-4 py-3 rounded-lg text-base font-medium 
                               hover:bg-gray-100 dark:hover:bg-brand-700/50 
                               transition-all duration-200 focus:outline-none focus:ring-2 
                               focus:ring-brand-500 focus:ring-offset-2
                               dark:focus:ring-white/50 dark:focus:ring-offset-brand-600 ${
                                 isActiveRoute(item.href) ? "bg-brand-500/10 dark:bg-white/10" : ""
                               }`}
                    onClick={() => handleNavClick(item.href)}
                    onMouseEnter={() => handleNavHover(item.href)}
                  />
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.div
                className="pt-4 pb-2"
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.15 }}
              >
                <Button
                  className="w-full font-semibold rounded-full
                            bg-brand-500 hover:bg-brand-600
                            dark:bg-white dark:hover:bg-gray-50
                            text-white dark:text-brand-600
                            dark:hover:text-brand-700
                            border-0 shadow hover:shadow-md transition-all duration-200"
                  onClick={() => handleNavClick("/kontakt")}
                >
                  Kontakt oss
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
