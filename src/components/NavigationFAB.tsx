"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Accueil", href: "#hero" },
  { name: "La Carte", href: "#menu" },
  { name: "L'Histoire", href: "#story" },
  { name: "Nos Événements", href: "#events" },
];

export default function NavigationFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const [isShivering, setIsShivering] = useState(false);
  
  const { scrollYProgress } = useScroll();
  // Map scroll progress [0, 1] to temperature [35, -5]
  const temperature = useTransform(scrollYProgress, [0, 1], [35, -5]);
  const tempString = useTransform(temperature, (val) => `${Math.round(val)}°C`);

  const emojiScale = useTransform(temperature, [35, -5], [0.85, 1.1]);
  const emojiOpacity = useTransform(temperature, [35, -5], [0.3, 1]);
  
  const textColor = useTransform(temperature, [35, 0, -5], ["#FFF0E0", "#FFFFFF", "#00E5FF"]);
  const textShadow = useTransform(temperature, [35, 0, -5], [
    "0px 0px 10px rgba(255,240,224,0.5)", 
    "0px 0px 10px rgba(255,255,255,0.5)", 
    "0px 0px 15px rgba(0,229,255,0.8)"
  ]);

  useMotionValueEvent(temperature, "change", (latest) => {
    setIsShivering(latest < 0);
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Liquid Splash Background Overlay */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isOpen ? 100 : 0, 
          opacity: isOpen ? 1 : 0 
        }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="fixed bottom-12 left-1/2 w-10 h-10 -ml-5 rounded-full bg-brand-cyan/95 z-40 pointer-events-none"
        style={{ originX: 0.5, originY: 0.5 }}
      />

      {/* Menu Links Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-10">
              {links.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    toggleMenu();
                  }}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                  className="text-4xl md:text-6xl font-extrabold font-montserrat text-brand-bg hover:text-white transition-colors duration-300 tracking-tight"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        onClick={toggleMenu}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(64,196,255,0.5)] transition-colors duration-500 ${
          isOpen ? "bg-brand-bg text-brand-cyan shadow-none" : "bg-brand-cyan text-brand-bg"
        }`}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4, ease: "backOut" }}
        >
          {isOpen ? <X size={32} strokeWidth={2.5} /> : <Menu size={32} strokeWidth={2.5} />}
        </motion.div>
      </motion.button>


      {/* Subzero Temperature Gauge (Dashboard Pill) */}
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="fixed bottom-10 left-4 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-6 lg:left-8 z-50 flex flex-col items-center gap-2 md:gap-3 py-3 md:py-4 px-2.5 md:px-3 rounded-full bg-white/[0.07] backdrop-blur-lg border border-white/[0.15] shadow-[0_4px_24px_rgba(0,229,255,0.15)] scale-90 md:scale-100 transition-shadow hover:shadow-[0_4px_30px_rgba(0,229,255,0.3)] cursor-pointer"
      >
        <motion.img 
          src="https://em-content.zobj.net/source/animated-noto-color-emoji/461/cold-face_1f976.gif" 
          alt="Shivering Emoji"
          style={{ scale: emojiScale, opacity: emojiOpacity }}
          animate={isShivering ? { x: [-1.5, 1.5, -1.5, 1.5, 0] } : { x: 0 }}
          transition={isShivering ? { repeat: Infinity, duration: 0.15 } : {}}
          className="w-10 h-10 md:w-12 md:h-12 object-contain"
        />
        <img 
          src="https://em-content.zobj.net/source/animated-noto-color-emoji/461/thermometer_1f321-fe0f.gif" 
          alt="Thermometer"
          className="w-8 h-8 md:w-10 md:h-10 object-contain"
        />
        <motion.span 
          style={{ color: textColor, textShadow }}
          className="text-lg md:text-2xl font-montserrat font-black w-full text-center tracking-tighter"
        >
          {tempString}
        </motion.span>
      </motion.div>
    </>
  );
}
