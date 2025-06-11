import { motion } from "framer-motion";
import logo from "../../assets/urban_studios_logo.svg";
import dancerSvg from "../../assets/urban_studio_dancer.svg";

export default function HeroSection() {
  return (
    <section 
      id="hero" 
      className="relative h-screen min-h-[600px] flex items-center overflow-hidden"
    >
      {/* Background logo with optimized animation */}
      <motion.div 
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0 z-0"
      >
        <img
          src={logo}
          alt="Urban Studios Logo"
          className="w-full h-full object-contain"
        />
        
        {/* Subtle gradient overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5"
        />
      </motion.div>

{/* Welcome floating element */}
      <motion.div
        initial={{ opacity: 0, y: 30, x: -30 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{
          delay: 1.2,
          duration: 1,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className="absolute top-16 left-16 md:top-20 md:left-20 z-10"
      >
        <motion.div
          animate={{
            y: [0, -8, 0],
            rotate: [0, 3, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
         
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-5 h-5"
            >
              {/* Light mode dancer (black) */}
              <img
                src={dancerSvg}
                alt="Dancer"
                className="w-full h-full object-contain dark:hidden"
                style={{
                  filter: 'brightness(0) saturate(100%) invert(0%)'
                }}
              />
              {/* Dark mode dancer (white) */}
              <img
                src={dancerSvg}
                alt="Dancer"
                className="w-full h-full object-contain hidden dark:block"
                style={{
                  filter: 'brightness(0) saturate(100%) invert(100%)'
                }}
              />
            </motion.div>
            <span className="text-gray-800 dark:text-gray-200 font-montserrat-medium text-sm md:text-base">
              Velkommen
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating dancers with specific colors */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          x: [0, 10, 0],
          rotate: [0, 15, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-1/4 right-16 md:right-20 z-10 w-14 h-14 md:w-16 md:h-16 opacity-60"
      >
        <img 
          src={dancerSvg} 
          alt="Floating Dancer" 
          className="w-full h-full object-contain"
          style={{ 
            filter: 'brightness(0) saturate(100%) invert(27%) sepia(98%) saturate(7490%) hue-rotate(211deg) brightness(100%) contrast(89%)'
          }}
        />
      </motion.div>

      <motion.div
        animate={{ 
          y: [0, 15, 0],
          x: [0, -15, 0],
          rotate: [0, -20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 3 
        }}
        className="absolute bottom-1/3 left-1/4 z-10 w-10 h-10 md:w-12 md:h-12 opacity-50"
      >
        <img 
          src={dancerSvg} 
          alt="Floating Dancer" 
          className="w-full h-full object-contain"
          style={{ 
            filter: 'brightness(0) saturate(100%) invert(20%) sepia(77%) saturate(7482%) hue-rotate(271deg) brightness(87%) contrast(86%)'
          }}
        />
      </motion.div>

      <motion.div
        animate={{ 
          y: [0, -25, 0],
          x: [0, 20, 0],
          rotate: [0, 25, 0],
          scale: [1, 0.9, 1]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 6 
        }}
        className="absolute top-2/3 right-1/3 z-10 w-12 h-12 md:w-14 md:h-14 opacity-40"
      >
        <img 
          src={dancerSvg} 
          alt="Floating Dancer" 
          className="w-full h-full object-contain"
          style={{ 
            filter: 'brightness(0) saturate(100%) invert(11%) sepia(100%) saturate(7080%) hue-rotate(321deg) brightness(90%) contrast(111%)'
          }}
        />
      </motion.div>

      {/* Optimized gradient orbs */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-32 right-32 w-24 h-24 md:w-32 md:h-32 rounded-full 
                   bg-gradient-to-br from-blue-400/20 to-purple-600/20 blur-xl 
                   hidden lg:block"
      />

      <motion.div
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.35, 0.15]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 3 
        }}
        className="absolute bottom-40 left-40 w-20 h-20 md:w-24 md:h-24 rounded-full 
                   bg-gradient-to-br from-pink-400/20 to-orange-500/20 blur-lg 
                   hidden md:block"
      />

      {/* Optimized floating particles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -80, 0],
            x: [0, Math.random() * 60 - 30, 0],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: 6 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 6,
            ease: "easeInOut"
          }}
          className="absolute w-1.5 h-1.5 bg-white/50 rounded-full hidden md:block"
          style={{
            left: `${25 + Math.random() * 50}%`,
            bottom: '15%'
          }}
        />
      ))}

      {/* Subtle ambient lighting effect */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 25% 75%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 75% 25%, rgba(147, 51, 234, 0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 25% 75%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)"
          ]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-5 pointer-events-none"
      />
    </section>
  );
}