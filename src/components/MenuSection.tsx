"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const menuCategories = [
  {
    category: "Cocktails Classics",
    items: [
      { name: "Mojito 🍃", price: "5 DT", ingredients: "Menthe, Citron vert, Soda" },
      { name: "Baba Colada 🥥", price: "7 DT", ingredients: "Coco, Ananas, Curaçao Bleu" },
      { name: "1 On The Beach 🍑", price: "7 DT", ingredients: "Pêche, Orange, Grenadine" },
      { name: "Betterfly 🦋", price: "7 DT", ingredients: "Fruits de bois, Ananas, Menthe" },
      { name: "Give Me Hug 🫂", price: "7 DT", ingredients: "Fruit de la passion, Orange, Vanille" }
    ]
  },
  {
    category: "Cocktails Signatures",
    items: [
      { name: "Red Lips 💋", price: "9 DT", ingredients: "Litchi, Fraise, Hibiscus, Ananas" },
      { name: "Coco Bon Goût 🥥✨", price: "8 DT", ingredients: "Amande, Coco, Bleu Magique" },
      { name: "MTA3 KBAR 2024 🌶️", price: "7 DT", ingredients: "Gingembre, Miel, Ananas, Basilic" },
      { name: "Green Survive 🥝", price: "8 DT", ingredients: "Kiwi asiatique, Menthe, Perles de mangue" },
      { name: "Erreur 404 ⚠️", price: "8 DT", ingredients: "Cacahuète torréfiée, Yuzu & Citron, Mousse froide" }
    ]
  },
  {
    category: "Cocktails Paradise",
    items: [
      { name: "Manga Paradise 🥭", price: "8.5 DT", ingredients: "Mangue, Vanille, Crème" },
      { name: "Ananas Paradise 🍍", price: "8.5 DT", ingredients: "Ananas, Vanille, Crème" },
      { name: "Passion Paradise 🧪", price: "8.5 DT", ingredients: "Fruits de la passion, Vanille, Crème" },
      { name: "Red Paradise 🍓", price: "8.5 DT", ingredients: "Fraise, Vanille, Crème" },
      { name: "Peach Paradise 🍑", price: "8.5 DT", ingredients: "Pêche, Vanille, Crème" }
    ]
  },
  {
    category: "Smoothies Fruits",
    note: "6.5 DT (Tous les Smoothies)",
    items: [
      { name: "Frais au choix 🍎🍊", price: "6.5 DT", ingredients: "Pomme, Mangue, Ananas, Pêche, Abricot, Melon" }
    ]
  },
  {
    category: "Milkshakes",
    note: "8 DT (Tous les Milkshakes)",
    items: [
      { name: "Glace crémeuse 🍦🍫", price: "8 DT", ingredients: "Chocolat, Café, Cookies, Caramel, Fraise, Citron" }
    ]
  },
  {
    category: "Sélection Ice Coffee",
    items: [
      { name: "Spanish Ice Latte ☕", price: "7 DT", ingredients: "Expresso, Lait concentré sucré, Glace" },
      { name: "Ice Caramel Latte 🍯", price: "7.5 DT", ingredients: "Expresso, Lait frais, Nectar de Caramel" },
      { name: "Ice Mocha 🍫", price: "7.5 DT", ingredients: "Espresso fort, Chocolat noir, Lait glacé" },
      { name: "White Mocha ☁️", price: "7.5 DT", ingredients: "Espresso fort, Chocolat blanc premium, Lait glacé" },
      { name: "Ice Pistachio Latte 💚", price: "8 DT", ingredients: "Pâte de pistache pure, Lait, Double Espresso" },
      { name: "Ice Noisette Latte 🌰", price: "8 DT", ingredients: "Noisettes torréfiées broyées, Lait, Double Espresso" },
      { name: "Matcha Strawberry 🍵🍓", price: "11 DT", ingredients: "Matcha de cérémonie, Coulis de fraises fraîches, Lait" }
    ]
  },
  {
    category: "Boissons Healthy",
    items: [
      { name: "Detox 🥒", price: "9 DT", ingredients: "Concombre, Menthe, Épinards, Pomme" },
      { name: "Ginger Shot 🫚", price: "9 DT", ingredients: "Gingembre vert, Miel, Citron vert" },
      { name: "Anacarrot 🥕", price: "9 DT", ingredients: "Ananas, Carotte" },
      { name: "Banapeache 🍌🍑", price: "9 DT", ingredients: "Banane, Pêche, Amande" }
    ]
  },
  {
    category: "Brood Musclé",
    items: [
      { name: "Spéciale Brood Whey Protein 🐧💪", price: "14 DT", ingredients: "WPI Premium, Banane, Lait d'Amande" }
    ]
  }
];

const noiseSvg = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E`;

export default function MenuSection() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setOpenCategory(prev => prev === categoryId ? null : categoryId);
  };

  return (
    <section id="menu" className="relative z-40 -mt-16 md:-mt-24 min-h-[100dvh] pb-32 px-4 flex flex-col justify-start items-center overflow-hidden bg-transparent font-montserrat">
      
      {/* LOCAL STYLES FOR MARQUEE */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}} />

      <div className="w-full max-w-4xl mx-auto z-10 relative pt-12 md:pt-16">
        
        {/* AMBIENT 3D ASSETS (Anchored to the max-w container so they perfectly flank the menu) */}
        <motion.div 
          className="absolute top-28 left-[-10%] md:left-[-15%] z-40 pointer-events-none w-32 h-32 md:w-48 md:h-48 transform-gpu will-change-transform"
          animate={{ y: [0, -25, 0], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src="/assets/3d ice 1.png" alt="Floating Ice" fill className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]" />
        </motion.div>

        <motion.div 
          className="absolute top-[40%] right-[-10%] md:right-[-15%] z-0 pointer-events-none w-24 h-24 md:w-36 md:h-36 blur-md transform-gpu will-change-transform opacity-60"
          animate={{ y: [0, 30, 0], rotate: [0, -20, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <Image src="/assets/3d ice 2.png" alt="Background Ice" fill className="object-contain" />
        </motion.div>

        <motion.div 
          className="absolute bottom-10 left-[-5%] md:left-[-10%] z-20 pointer-events-none w-20 h-20 md:w-32 md:h-32 transform-gpu will-change-transform"
          animate={{ y: [0, -15, 0], rotate: [0, -30, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Image src="/assets/500 500px strawberry (no bg).png" alt="Strawberry" fill className="object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.6)]" />
        </motion.div>

        {/* TITLE AND MARQUEE WRAPPER */}
        <div className="relative text-center mb-10 md:mb-12 pointer-events-none select-none z-50">
          
          {/* THE KINETIC MARQUEE DIVIDER (Centered directly behind the title) */}
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[300vw] overflow-hidden z-0 pointer-events-none opacity-20 flex transform-gpu will-change-transform">
            <div className="animate-marquee whitespace-nowrap flex font-montserrat font-black text-7xl md:text-9xl tracking-tighter text-transparent stroke-text" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}>
              <span className="mx-8">FROID. FRAIS. BROOD. ✦ LA MIXOLOGIE CRÉATIVE ✦</span>
              <span className="mx-8">FROID. FRAIS. BROOD. ✦ LA MIXOLOGIE CRÉATIVE ✦</span>
              <span className="mx-8">FROID. FRAIS. BROOD. ✦ LA MIXOLOGIE CRÉATIVE ✦</span>
            </div>
          </div>

          <h2 className="relative z-50 text-5xl md:text-6xl lg:text-7xl font-black font-montserrat text-white uppercase tracking-widest drop-shadow-[0_0_20px_rgba(0,229,255,0.5)]">
            NOTRE MENU
          </h2>
        </div>

        <div className="flex flex-col gap-5">
          {menuCategories.map((cat) => {
            const isOpen = openCategory === cat.category;
            return (
              <div key={cat.category} className="flex flex-col w-full relative">
                
                {/* THE "FREEZER DOOR" CATEGORY HEADER (HYPER-REALISTIC GLASS) */}
                <button
                  onClick={() => toggleCategory(cat.category)}
                  className={`relative z-10 flex justify-between items-center w-full p-6 md:p-8 rounded-2xl transition-all duration-300 transform-gpu overflow-hidden
                    ${isOpen 
                      ? 'bg-gradient-to-br from-[#00E5FF]/20 to-[#00E5FF]/5 border-t border-l border-white/40 border-b border-r border-[#00E5FF]/50 shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),0_15px_30px_rgba(0,229,255,0.2)] rounded-b-none backdrop-blur-3xl' 
                      : 'bg-white/[0.03] border-t border-l border-white/20 border-b border-r border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_10px_20px_rgba(0,0,0,0.3)] hover:bg-white/[0.06] backdrop-blur-2xl'
                    }
                  `}
                >
                  {/* Glass Texture Overlay */}
                  <div 
                    className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
                    style={{ backgroundImage: `url("${noiseSvg}")` }} 
                  />

                  <span className="relative z-10 text-xl md:text-2xl font-black text-white uppercase tracking-widest text-left drop-shadow-md">
                    {cat.category}
                  </span>
                  
                  <span className={`relative z-10 text-[#00E5FF] transition-transform duration-500 ease-out transform-gpu drop-shadow-[0_0_8px_rgba(0,229,255,0.8)] ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                {/* THE 60FPS HEIGHT ANIMATION (CSS GRID) */}
                <div 
                  className={`grid transition-[grid-template-rows] duration-500 ease-out transform-gpu relative z-30
                    ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
                  `}
                >
                  <div className="overflow-hidden">
                    <div className="relative flex flex-col gap-6 p-6 md:p-8 bg-black/60 rounded-b-2xl border-x border-b border-white/10 shadow-[inset_0_20px_20px_-20px_rgba(0,0,0,0.5),0_30px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl">
                      
                      {/* Interior Glass Texture */}
                      <div 
                        className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none" 
                        style={{ backgroundImage: `url("${noiseSvg}")` }} 
                      />

                      {cat.note && (
                        <div className="text-center mb-2 relative z-10">
                          <span className="inline-block px-5 py-2 rounded-full bg-white/5 text-[#00E5FF] text-xs font-black tracking-widest uppercase border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                            {cat.note}
                          </span>
                        </div>
                      )}

                      {/* DRINK ITEMS (INTERIOR LAYOUT) */}
                      {cat.items.map((item, idx) => (
                        <div key={idx} className="flex flex-row justify-between items-center gap-4 relative z-10 hover:bg-white/[0.02] p-2 rounded-xl transition-colors">
                          {/* Left Side (Info) */}
                          <div className="flex flex-col items-start text-left flex-1">
                            <span className="text-white font-bold text-lg md:text-xl leading-tight drop-shadow-sm">
                              {item.name}
                            </span>
                            <span className="text-gray-400 text-xs italic mt-1 max-w-[85%] font-light">
                              {item.ingredients}
                            </span>
                          </div>
                          
                          {/* Right Side (Price) */}
                          <div className="text-right whitespace-nowrap pl-4">
                            <span className="text-[#00E5FF] font-black text-xl md:text-2xl drop-shadow-[0_0_10px_rgba(0,229,255,0.3)]">
                              {item.price}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
