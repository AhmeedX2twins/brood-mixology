"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Accueil", href: "#hero" },
  { name: "La Carte", href: "#menu" },
  { name: "L'Histoire", href: "#story" },
  { name: "Nos Événements", href: "#events" },
];

export default function NavigationFAB() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

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
                  onClick={toggleMenu}
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
        className={`fixed bottom-8 left-1/2 -ml-8 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(64,196,255,0.5)] transition-colors duration-500 ${
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
    </>
  );
}
