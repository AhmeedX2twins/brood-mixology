"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function StorySection() {
  return (
    <section id="story" className="relative py-32 px-6 bg-transparent overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] bg-[#00E5FF]/20 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 -translate-x-1/4" style={{ willChange: "transform" }} />
      <div className="absolute bottom-0 right-0 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-[#00E5FF]/10 blur-[100px] rounded-full pointer-events-none translate-y-1/4 translate-x-1/4" style={{ willChange: "transform" }} />

      {/* Floating 3D Assets (Ice & Fruits) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden transform-gpu">
        <motion.div className="absolute top-[15%] right-[15%] w-20 h-20 md:w-28 md:h-28 opacity-60">
          <motion.div animate={{ rotate: 360, y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 14, ease: "linear" }} className="w-full h-full relative will-change-transform">
            <Image src="/assets/3d ice 1.png" alt="Ice" fill className="object-contain" />
          </motion.div>
        </motion.div>
        <motion.div className="absolute bottom-[25%] left-[5%] w-16 h-16 md:w-24 md:h-24 opacity-50 blur-[2px]">
          <motion.div animate={{ rotate: -180, x: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 18, ease: "linear" }} className="w-full h-full relative will-change-transform">
            <Image src="/assets/3d ice 2.png" alt="Ice" fill className="object-contain" />
          </motion.div>
        </motion.div>

        {/* Floating Fruits */}
        <motion.div className="absolute top-[35%] left-[12%] w-12 h-12 md:w-16 md:h-16 opacity-40">
          <motion.div animate={{ rotate: 180, y: [0, 25, 0] }} transition={{ repeat: Infinity, duration: 22, ease: "linear" }} className="w-full h-full relative will-change-transform">
            <Image src="/assets/500 500px ananas (no bg).png" alt="Ananas" fill className="object-contain" />
          </motion.div>
        </motion.div>
        <motion.div className="absolute bottom-[10%] right-[8%] w-14 h-14 md:w-20 md:h-20 opacity-30 blur-[1px]">
          <motion.div animate={{ rotate: -90, x: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 19, ease: "linear" }} className="w-full h-full relative mix-blend-screen will-change-transform">
            <Image src="/assets/500 500px coconut (no bg).png" alt="Coconut" fill className="object-contain" />
          </motion.div>
        </motion.div>
      </div>

      {/* Background Sun Accents */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FFB703]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FFB703]/30 to-transparent" />
      
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Image Container */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full lg:w-1/2 aspect-[1170/1556] max-w-md mx-auto rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(251,133,0,0.15)]"
        >
          <div className="absolute inset-0 bg-[#FFB703]/10 mix-blend-overlay z-10" />
          <Image 
            src="/assets/founders.png"
            alt="Bilel & Taki Chii - Founders of Brood"
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="w-full lg:w-1/2 space-y-8"
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="h-[2px] w-12 bg-[#FFB703]"></div>
            <span className="text-[#FFB703] font-montserrat uppercase tracking-[0.3em] text-sm font-semibold">L'Histoire</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-extrabold text-white leading-tight">
            Bienvenue <br />
            <span className="text-[#FFB703] italic font-light">chez Brood.</span>
          </h2>
          
          <div className="space-y-6 text-white/90 font-inter text-lg leading-relaxed">
            <p>
              At Brood, every drink is crafted to inspire. We are a proudly Tunisian brand dedicated to creating vibrant juices, creative mocktails, and refreshing fruit blends made from carefully selected seasonal ingredients.
            </p>
            <p className="text-[#FFB703] font-bold tracking-[0.2em] uppercase text-xl">
              Explore Perfect Drink
            </p>
            <p className="text-white/80 font-medium border-l-4 border-[#FFB703] pl-5 py-2 italic text-xl">
              "Brood isn't just a drink. It's a fresh way of living."
            </p>
          </div>

          {/* Emplacements */}
          <div className="pt-6 space-y-4">
            <h3 className="text-[#00E5FF] font-montserrat uppercase tracking-[0.2em] text-sm font-semibold mb-4 flex items-center gap-2">
              <span className="text-xl">📍</span> Nos Emplacements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#050B18]/40 border border-white/10 rounded-2xl p-5 backdrop-blur-md hover:bg-[#050B18]/60 transition-all shadow-lg">
                <h4 className="text-white font-bold font-montserrat mb-1 text-lg">L'Atelier</h4>
                <p className="text-white/70 text-sm font-light mb-3">Situé juste à côté du restaurant El Karwi, Soliman.</p>
                <p className="text-[#FFB703] text-xs uppercase tracking-wider font-semibold">The craft kitchen where the magic is bottled.</p>
              </div>
              <div className="bg-[#050B18]/40 border border-white/10 rounded-2xl p-5 backdrop-blur-md hover:bg-[#050B18]/60 transition-all shadow-lg">
                <h4 className="text-white font-bold font-montserrat mb-1 text-lg">Le Bar de Plage</h4>
                <p className="text-white/70 text-sm font-light mb-3">Situé au rond-point de Soliman Plage (Soliman Chatt).</p>
                <p className="text-[#FFB703] text-xs uppercase tracking-wider font-semibold">The energetic, sunny beach setup right by the coast.</p>
              </div>
            </div>
          </div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block pt-6 w-full md:w-auto"
          >
            <a 
              href="#events" 
              className="inline-block text-center px-10 py-5 bg-gradient-to-r from-[#FFB703] to-[#FB8500] text-white font-bold font-montserrat tracking-widest uppercase text-sm rounded-full shadow-[0_0_20px_rgba(251,133,0,0.4)] hover:shadow-[0_0_30px_rgba(251,133,0,0.6)] transition-all duration-300 w-full md:w-auto"
            >
              Réserver pour votre événement
            </a>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
