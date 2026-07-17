"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function CardsSection() {
  const cards = [
    {
      id: "beach",
      title: "L'Esprit Plage",
      subtitle: "Fait Maison • 100% Tunisien",
      src: "/assets/Brood store image.svg",
      color: "from-[#00E5FF]/60 to-transparent",
    },
    {
      id: "vice",
      title: "L'Énergie Nocturne",
      subtitle: "Events Levelled Up",
      src: "/assets/Brood GTA 6 poster.svg",
      color: "from-[#FF00FF]/50 to-transparent",
    }
  ];

  return (
    <section className="relative py-24 px-4 bg-transparent overflow-hidden">
      {/* Background Glow — radial gradient, zero blur cost */}
      <div className="absolute top-1/2 left-1/2 w-[60vw] h-[60vw] md:w-[35vw] md:h-[35vw] rounded-full pointer-events-none -translate-y-1/2 -translate-x-1/2 opacity-20" style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.5) 0%, transparent 70%)' }} />

      {/* Floating 3D Assets */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden transform-gpu">
        <motion.div className="absolute top-[30%] left-[5%] w-16 h-16 md:w-24 md:h-24 opacity-50">
          <motion.div animate={{ rotate: 180, y: [0, 25, 0] }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }} className="w-full h-full relative will-change-transform">
            <Image src="/assets/3d ice 2.png" alt="Ice" fill className="object-contain" />
          </motion.div>
        </motion.div>

        {/* Floating Fruits */}
        <motion.div className="absolute top-[10%] right-[15%] w-12 h-12 md:w-20 md:h-20 opacity-40">
          <motion.div animate={{ rotate: -90, x: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 21, ease: "linear" }} className="w-full h-full relative will-change-transform">
            <Image src="/assets/500 500px manga2 (no bg).png" alt="Manga" fill className="object-contain" />
          </motion.div>
        </motion.div>
        <motion.div className="absolute bottom-[20%] right-[5%] w-14 h-14 md:w-16 md:h-16 opacity-30 mix-blend-screen">
          <motion.div animate={{ rotate: 360, y: [0, -25, 0] }} transition={{ repeat: Infinity, duration: 18, ease: "linear" }} className="w-full h-full relative will-change-transform">
            <Image src="/assets/500 500px coconut (no bg).png" alt="Coconut" fill className="object-contain" />
          </motion.div>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-montserrat font-extrabold text-white mb-4 drop-shadow-md">
            L'Univers <span className="text-[#FFB703]">Brood</span>
          </h2>
          <p className="text-lg text-white/70 font-inter tracking-[0.2em] uppercase">
            Plus qu'un endroit, un état d'esprit.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-16 items-center justify-center max-w-5xl mx-auto">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative w-full aspect-[1170/1556] rounded-3xl overflow-hidden group shadow-[0_30px_60px_rgba(0,119,182,0.4)] cursor-pointer"
            >
              {/* Image */}
              <Image 
                src={card.src}
                alt={card.title}
                fill
                priority={true}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-t ${card.color} via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500`} />
              
              {/* Text Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="bg-[#023047]/80 p-6 rounded-3xl shadow-xl border border-white/20">
                  <h3 className="text-2xl font-montserrat font-bold text-white mb-1">
                    {card.title}
                  </h3>
                  <p className="text-[#FFB703] font-inter font-bold tracking-wider text-sm uppercase">
                    {card.subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
