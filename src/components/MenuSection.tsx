"use client";

import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const menuCategories = [
  {
    category: "Cocktails Classics",
    bgGradient: "from-cyan-900 via-slate-950 to-emerald-950",
    themeColor: "#00B0FF",
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
    bgGradient: "from-purple-950 via-slate-950 to-pink-950",
    themeColor: "#FFEE55",
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
    bgGradient: "from-rose-950 via-neutral-950 to-orange-950",
    themeColor: "#FF5252",
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
    bgGradient: "from-yellow-950 via-slate-950 to-amber-950",
    themeColor: "#FFB300",
    note: "6.5 DT (Tous les Smoothies)",
    items: [
      { name: "Frais au choix 🍎🍊", price: "6.5 DT", ingredients: "Pomme, Mangue, Ananas, Pêche, Abricot, Melon" }
    ]
  },
  {
    category: "Milkshakes",
    bgGradient: "from-blue-950 via-slate-950 to-violet-950",
    themeColor: "#29B6F6",
    note: "8 DT (Tous les Milkshakes)",
    items: [
      { name: "Glace crémeuse 🍦🍫", price: "8 DT", ingredients: "Chocolat, Café, Cookies, Caramel, Fraise, Citron" }
    ]
  },
  {
    category: "Sélection Ice Coffee",
    bgGradient: "from-neutral-900 via-stone-950 to-amber-950",
    themeColor: "#D7CCC8",
    items: [
      { name: "Spanish Ice Latte ☕", price: "7 DT", ingredients: "Expresso, Lait concentré sucré, Glace" },
      { name: "Ice Caramel Latte 🍯", price: "7.5 DT", ingredients: "Expresso, Lait frais, Nectar de Caramel" },
      { name: "Ice Mocha 🍫", price: "7.5 DT", ingredients: "Espresso fort, Chocolat noir, Lait glacé" },
      { name: "White Mocha ☁️", price: "7.5 DT", ingredients: "Espresso fort, Chocolat blanc premium, Lait glacé" },
      { name: "Ice Pistachio Latte 💚", price: "8 DT", ingredients: "Pâte de pistache pure, Lait, Double Espresso" },
      { name: "Ice Noisette Latte 🌰", price: "8 DT", ingredients: "Noisettes torréfiées broyées, Lait, Double Espresso" },
      { name: "Matcha Strawberry (Spéciale Brood) 🍵🍓", price: "11 DT", ingredients: "Matcha de cérémonie, Coulis de fraises fraîches, Lait" }
    ]
  },
  {
    category: "Boissons Healthy",
    bgGradient: "from-emerald-950 via-neutral-950 to-green-950",
    themeColor: "#66BB6A",
    items: [
      { name: "Detox 🥒", price: "9 DT", ingredients: "Concombre, Menthe, Épinards, Pomme" },
      { name: "Ginger Shot 🫚", price: "9 DT", ingredients: "Gingembre vert, Miel, Citron vert" },
      { name: "Anacarrot 🥕", price: "9 DT", ingredients: "Ananas, Carotte" },
      { name: "Banapeache 🍌🍑", price: "9 DT", ingredients: "Banane, Pêche, Amande" }
    ]
  },
  {
    category: "Brood Musclé",
    bgGradient: "from-zinc-900 via-neutral-950 to-slate-900",
    themeColor: "#F57C00",
    items: [
      { name: "Spéciale Brood Whey Protein 🐧💪", price: "14 DT", ingredients: "WPI Premium, Banane, Lait d'Amande" }
    ]
  }
];

export default function MenuSection() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);

  const activeCategory = menuCategories[activeCategoryIndex];
  const activeColor = activeCategory.themeColor;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section
      id="menu"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen py-32 px-4 flex flex-col justify-center overflow-hidden bg-transparent"
    >
      {/* Dynamic Cursor Follower Orb */}
      <motion.div
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-0 opacity-20 blur-[120px]"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ backgroundColor: activeColor }}
        transition={{ duration: 0.8 }}
      />

      {/* Floating Fruits */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden transform-gpu">
        <motion.div className="absolute top-[20%] right-[10%] w-14 h-14 md:w-20 md:h-20 opacity-40">
          <motion.div animate={{ rotate: 360, y: [0, -30, 0] }} transition={{ repeat: Infinity, duration: 24, ease: "linear" }} className="w-full h-full relative will-change-transform">
            <Image src="/assets/500 500px mango (no bg).png" alt="Mango" fill className="object-contain" />
          </motion.div>
        </motion.div>
        <motion.div className="absolute bottom-[20%] left-[8%] w-12 h-12 md:w-16 md:h-16 opacity-30 blur-[1px]">
          <motion.div animate={{ rotate: -360, x: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="w-full h-full relative mix-blend-screen will-change-transform">
            <Image src="/assets/500 500px strawberry (no bg).png" alt="Strawberry" fill className="object-contain" />
          </motion.div>
        </motion.div>
      </div>
      
      <div className="max-w-4xl mx-auto w-full z-10 relative">
        <div className="mb-12 relative w-[100vw] left-1/2 -translate-x-1/2 overflow-hidden flex items-center py-4">
          {/* Subtle gradient fades on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#02040a] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#02040a] to-transparent z-10" />
          
          <motion.div 
            className="flex whitespace-nowrap items-center w-max will-change-transform transform-gpu"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-8 mx-4">
                <span 
                  className="text-6xl md:text-8xl lg:text-9xl font-black font-montserrat uppercase tracking-tighter transition-colors duration-500"
                  style={{ 
                    WebkitTextStroke: "2px rgba(255,255,255,0.1)", 
                    color: i % 2 === 0 ? "white" : "transparent"
                  }}
                >
                  {activeCategory.category}
                </span>
                <span className="text-3xl md:text-5xl" style={{ color: activeColor }}>✦</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Category Selector - Break out of containers to span full screen width */}
      <div className="w-[100vw] relative left-1/2 -translate-x-1/2 z-10 mb-8">
        <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar items-center justify-start xl:justify-center px-4 md:px-8">
          {menuCategories.map((cat, index) => (
            <button
              key={cat.category}
              onClick={() => {
                setActiveCategoryIndex(index);
                setActiveItemIndex(0);
              }}
              className={`whitespace-nowrap px-6 py-3 rounded-full font-montserrat text-sm transition-all duration-300 font-bold ${
                activeCategoryIndex === index
                  ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-105"
                  : "bg-[#050B18]/60 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full z-10 relative">

        {/* Category Note (if any) */}
        <AnimatePresence mode="wait">
          {activeCategory.note && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              key={`note-${activeCategoryIndex}`}
              className="text-center mb-6"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm tracking-wider font-inter border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                {activeCategory.note}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Elegant Vertical Accordion */}
        <div className="flex flex-col gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategoryIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4"
            >
              {activeCategory.items.map((item, index) => {
                const isActive = activeItemIndex === index;
                
                return (
                  <motion.div
                    key={item.name}
                    onMouseEnter={() => setActiveItemIndex(index)}
                    onClick={() => setActiveItemIndex(index)}
                    className={`relative cursor-pointer overflow-hidden rounded-2xl border transition-all duration-500 ${
                      isActive 
                        ? "bg-[#050B18]/80 border-white/40 shadow-2xl" 
                        : "bg-[#050B18]/40 border-white/10 hover:border-white/20"
                    } backdrop-blur-md`}
                  >
                    {/* Neon Glow line for active item */}
                    <motion.div 
                      className="absolute left-0 top-0 bottom-0 w-1 md:w-2"
                      animate={{ backgroundColor: isActive ? activeColor : "transparent" }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1 pl-4 md:pl-6">
                        <motion.h3 
                          className={`text-2xl md:text-3xl font-bold font-montserrat transition-colors duration-300 ${isActive ? "text-white" : "text-white/70"}`}
                          animate={{ color: isActive ? activeColor : "#ffffff" }}
                        >
                          {item.name}
                        </motion.h3>
                        
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: "easeOut" }}
                              className="overflow-hidden"
                            >
                              <p className="text-gray-300 font-inter leading-relaxed mt-4 text-lg md:text-xl font-light pr-4">
                                {item.ingredients}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="pl-4 md:pl-0 md:text-right mt-2 md:mt-0">
                        <span 
                          className={`font-mono text-xl md:text-2xl font-bold tracking-wider transition-colors duration-300`}
                          style={{ color: isActive ? activeColor : "rgba(255,255,255,0.5)" }}
                        >
                          {item.price}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
