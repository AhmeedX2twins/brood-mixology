"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);

  return (
    <footer ref={containerRef} className="relative w-full min-h-[70vh] md:min-h-[600px] overflow-hidden flex flex-col justify-end">
      {/* Parallax Background */}
      <motion.div style={{ y: bgY, scale: 1.1 }} className="absolute inset-0 z-0 origin-bottom">
        <Image 
          src="/assets/store-night-brand.png"
          alt="Brood Store at Night"
          fill
          className="object-cover object-bottom"
        />
        {/* Gradients for smooth blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-transparent to-[#02040a]/90" />
      </motion.div>

      {/* Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pb-24 pt-32 text-center text-white/80 font-inter flex flex-col items-center">
        <div className="relative w-48 h-48 md:w-56 md:h-56 mb-2">
          <Image 
            src="/assets/500 500px official logo without a background.png" 
            alt="Brood Mixology Official Logo" 
            fill 
            className="object-contain drop-shadow-2xl" 
          />
        </div>
        <p className="text-sm tracking-[0.3em] text-[#FFB703] uppercase mb-4 font-semibold drop-shadow-md">Soliman • Tunisie</p>
        
        {/* Added Footer Locations */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-6 mt-2">
          <div className="text-center">
            <h4 className="text-white font-bold font-montserrat text-sm mb-1 drop-shadow-md">📍 L'Atelier</h4>
            <p className="text-white/80 text-xs font-light">À côté du restaurant El Karwi</p>
          </div>
          <div className="text-center">
            <h4 className="text-white font-bold font-montserrat text-sm mb-1 drop-shadow-md">📍 L'Éphémère de Soliman Plage 🌊</h4>
            <p className="text-white/80 text-xs font-light">Rond-point de Soliman Plage</p>
          </div>
        </div>
        
        <p className="text-sm md:text-base font-inter text-white mb-6 border border-white/20 px-6 py-2 rounded-full backdrop-blur-sm bg-black/20">
          Ouvert tous les jours de <span className="font-bold text-white">16h00 à 02h00</span>
        </p>

        {/* Telephone Section */}
        <div className="text-sm text-white/80 font-inter mb-8">
          <span className="font-semibold text-white">📞 Contact : </span>
          <a href="tel:+21654791367" className="hover:text-[#00E5FF] transition-colors">54 791 367</a>
          <span> / </span>
          <a href="tel:+21653023739" className="hover:text-[#00E5FF] transition-colors">53 023 739</a>
        </div>

        <div className="flex justify-center gap-8 mb-8 font-medium relative z-50">
          <a href="https://www.instagram.com/brood_tn/" target="_blank" rel="noopener noreferrer" className="hover:text-[#00E5FF] hover:scale-105 transition-all duration-300 text-lg">
            Instagram
          </a>
          <a href="https://www.tiktok.com/@broodtunis24" target="_blank" rel="noopener noreferrer" className="hover:text-[#00E5FF] hover:scale-105 transition-all duration-300 text-lg">
            TikTok
          </a>
        </div>

        <p className="text-xs text-white/40 font-light mt-4">
          © {new Date().getFullYear()} Brood Mixology. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
