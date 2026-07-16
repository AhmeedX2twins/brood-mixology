"use client";

import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect, MouseEvent } from "react";

export default function StorySection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, mass: 0.1, stiffness: 200 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  
  const glareX = useTransform(springX, [-0.5, 0.5], [100, 0]);
  const glareY = useTransform(springY, [-0.5, 0.5], [100, 0]);
  const background = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.15) 0%, transparent 60%)`;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates from -0.5 to 0.5
    mouseX.set((x / rect.width) - 0.5);
    mouseY.set((y / rect.height) - 0.5);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    mouseX.set(0);
    mouseY.set(0);
  };

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
      
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Image Container with 3D Perspective */}
        <div style={{ perspective: 1000 }} className="w-full lg:w-1/2 max-w-md mx-auto">
          <motion.div 
            ref={cardRef}
            initial={{ opacity: 0, y: 50, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileTap={isMobile ? { scale: 1.02 } : {}}
            style={{ 
              rotateX: isMobile ? 0 : rotateX, 
              rotateY: isMobile ? 0 : rotateY 
            }}
            className="relative w-full aspect-[1170/1556] overflow-hidden rounded-3xl shadow-2xl border border-white/10 transform-gpu will-change-transform cursor-pointer"
          >
            <div className="absolute inset-0 bg-[#FFB703]/10 mix-blend-overlay z-10 pointer-events-none" />
            <motion.div 
              style={{ background }} 
              className="absolute inset-0 z-20 pointer-events-none mix-blend-soft-light" 
            />
            <Image 
              src="/assets/post-card.webp"
              alt="Bilel & Taki Chii - Animated Postcard"
              fill
              priority={true}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </div>

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
                <h4 className="text-white font-bold font-montserrat mb-1 text-lg">L'Éphémère de Soliman Plage 🌊</h4>
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
