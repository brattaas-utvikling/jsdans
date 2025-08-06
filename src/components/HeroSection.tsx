import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import dancerSvg from "../assets/urban_studio_dancer.svg";

export default function HeroSection() {
  const [svgsLoaded, setSvgsLoaded] = useState(false);

  // Preload SVGs
  useEffect(() => {
    const preloadSVGs = async () => {
      try {
        // Preload both SVGs
        const logoImg = new Image();
        const dancerImg = new Image();

        const logoPromise = new Promise((resolve, reject) => {
          logoImg.onload = resolve;
          logoImg.onerror = reject;
          logoImg.src = logo;
        });

        const dancerPromise = new Promise((resolve, reject) => {
          dancerImg.onload = resolve;
          dancerImg.onerror = reject;
          dancerImg.src = dancerSvg;
        });

        // Wait for both to load
        await Promise.all([logoPromise, dancerPromise]);
        setSvgsLoaded(true);
      } catch (error) {
        console.error("Error preloading SVGs:", error);
        // Still show content even if preload fails
        setSvgsLoaded(true);
      }
    };

    preloadSVGs();
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[600px] flex items-center overflow-hidden "
    >
      {/* Background logo with optimized animation */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{
          scale: svgsLoaded ? 1 : 1.05,
          opacity: svgsLoaded ? 1 : 0,
        }}
        transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0 z-0"
      >
        {svgsLoaded && (
          <>
            <img
              src={logo}
              alt="Urban Studios Logo"
              className={`mx-auto max-w-3xl w-full h-full object-contain container px-4 md:px-6
              ${svgsLoaded ? "visible" : "invisible"}
              dark:invert dark:brightness-0`}
            />
            {/* Subtle gradient overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.2 }}
              className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5"
            />
          </>
        )}
      </motion.div>

      {/* Subtle ambient lighting effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
        className="absolute inset-0 z-5 pointer-events-none"
      >
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 25% 75%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)",
              "radial-gradient(circle at 75% 25%, rgba(147, 51, 234, 0.08) 0%, transparent 50%)",
              "radial-gradient(circle at 25% 75%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="w-full h-full"
        />
      </motion.div>
    </section>
  );
}
