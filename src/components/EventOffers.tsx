"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Check, Phone, X, Info, Star, ChevronRight, MessageCircle } from "lucide-react";
import Image from "next/image";

// Same Data Structures
const cocktailPacks = [
  {
    id: "pack-mojito",
    number: "1",
    title: "Pack Mojito 🍃",
    tagline: "Simple • Rapide • Populaire",
    conditions: [
      "Préparation simple et rapide",
      "Idéal pour mariages & grands événements",
      "Base fraîche: citron vert, menthe & eau gazeuse",
      "Verres et service au choix",
      "Formule rafraîchissante et populaire"
    ],
    cocktails: [
      { name: "Mojito Classic", desc: "citron, menthe, eau gazeuse" },
      { name: "Mojito Fraise", desc: "fraise, menthe, eau gazeuse" },
      { name: "Mojito Passion", desc: "passion, menthe, eau gazeuse" },
      { name: "Mojito Mangue", desc: "mangue, menthe, eau gazeuse" },
      { name: "Mojito Bleu", desc: "citron bleu, menthe, eau gazeuse" },
      { name: "Mojito Ananas", desc: "ananas, menthe, eau gazeuse" },
      { name: "Mojito Red", desc: "fruits rouges, menthe, eau gazeuse" },
      { name: "Mojito Signature", desc: "recette spéciale BROOD" }
    ]
  },
  {
    id: "pack-summer-mix",
    number: "2",
    title: "Pack Summer Mix 🍹",
    tagline: "Accessible • Plus mixé • Service au choix",
    conditions: [
      "Plus de variété que le Pack 1",
      "Cocktails mixés avec soin",
      "Service au choix",
      "Parfait pour soirées estivales"
    ],
    cocktails: [
      { name: "Mojito", desc: "citron, menthe, eau gazeuse" },
      { name: "Lune de Miel", desc: "pêche, orange, grenadine" },
      { name: "Moonlight Calada", desc: "ananas, coco, eau gazeuse" },
      { name: "Sweet Wedding", desc: "passion, orange" },
      { name: "Amour Fraise", desc: "fraise, menthe" }
    ]
  },
  {
    id: "pack-premium-vibs",
    number: "3",
    title: "Pack Premium Vibs ✨",
    tagline: "Équilibré • Gold Plus • Décoration bleue",
    conditions: [
      "Préparation Gold Plus avancée",
      "Décoration sur mesure des verres",
      "Bien préparé à l'avance",
      "Présentation soignée",
      "Service au choix",
      "Idéal pour événements premium"
    ],
    cocktails: [
      { name: "Mojito Signature", desc: "citron, menthe, eau gazeuse" },
      { name: "Lune de Miel", desc: "pêche, orange, greandine" },
      { name: "Moonlight Calada", desc: "ananas, coco, eau gazeuse" },
      { name: "Sweet Wedding", desc: "passion, orange" },
      { name: "Amour Fraise", desc: "fraise, menthe" },
      { name: "Pink Promis", desc: "lychee, ananas" },
      { name: "Sultan Fresh", desc: "citron, gingembre, menthe" }
    ]
  },
  {
    id: "pack-royal-vip",
    number: "4",
    title: "Pack Royal VIP Signature 👑",
    tagline: "Haut de Gamme • Expérience Royale • Sur mesure",
    conditions: [
      "Haut de gamme – expérience unique",
      "Décoration inédite & personnalisée",
      "Noms des mariés gravés sur les verres",
      "Cocktail signature exclusif inclus",
      "Service royal – verres premium",
      "La formule ultime pour vos mariages"
    ],
    cocktails: [
      { name: "Mojito Signature", desc: "citron, menthe, eau gazeuse" },
      { name: "Ocean Bleu", desc: "ananas, noix de coco, eau gazeuse" },
      { name: "Crystal Sunset", desc: "purée pêche, jus d'orange, fruits rouges" },
      { name: "Nuit Dorée", desc: "fruit de la passion, jus d'orange, vanille" },
      { name: "Rose Royal", desc: "rose, litchi, jus de citron" },
      { name: "Golden Bloom", desc: "mangue, vanille, glace vanille" },
      { name: "Éclat d'Amour", desc: "fraise, menthe, rose jasmin" },
      { name: "Ruby", desc: "fruit rouge, piment, jus tropical" },
      { name: "Royal Garden", desc: "kiwi, pomme verte, bubble fraise" },
      { name: "Pink Promis", desc: "lychee, fruit rouge" }
    ]
  }
];

const juiceData = {
  basic_fresh: {
    title: "Basic - Fresh",
    description: "Frais, légers et rafraîchissants",
    items: [
      { name: "Citronnade", p1: 5, p5: 4, p10: 3.5 },
      { name: "Citronnade Amande", p1: 6.5, p5: 5.5, p10: 5 },
      { name: "Citronnade Menthe", p1: 5.5, p5: 4.5, p10: 4 },
      { name: "Fraise", p1: 7, p5: 6.5, p10: 6 },
      { name: "Kiwi", p1: 12, p5: 11, p10: 10 },
      { name: "Mangue", p1: 18, p5: 17, p10: 15 },
      { name: "Ananas", p1: 15, p5: 15, p10: 13 },
      { name: "Abricot", p1: 14, p5: 13, p10: 12 },
      { name: "Pêche", p1: 14, p5: 13, p10: 12 },
      { name: "Blueberry", p1: 25, p5: 24, p10: 22 },
      { name: "Redberry", p1: 25, p5: 24, p10: 22 },
      { name: "Pomme", p1: 10, p5: 9, p10: 7 }
    ]
  },
  premium_golden: {
    title: "Premium - Golden Mix",
    description: "Des saveurs raffinées pour sublimer votre réception",
    items: [
      { name: "Fraise Banane", p1: 12, p5: 11, p10: 10.5 },
      { name: "Kiwi Banane", p1: 15, p5: 14, p10: 13.5 },
      { name: "Mangue Orange", p1: 19, p5: 18, p10: 17.5 },
      { name: "Mangue Banane", p1: 20, p5: 19, p10: 18 },
      { name: "Pêche Banane", p1: 15, p5: 14, p10: 13.5 },
      { name: "Ananas Banane", p1: 18, p5: 17, p10: 16.5 },
      { name: "Abricot Pêche", p1: 14, p5: 13, p10: 12.5 },
      { name: "Fruits Rouges Mixés", p1: 25, p5: 24, p10: 23 }
    ]
  },
  royal_vip: {
    title: "Royal - VIP (Créations Signatures)",
    description: "Une expérience haut de gamme et élégante",
    items: [
      { name: "Amande", p1: 24, p5: null, p10: null },
      { name: "Pistache", p1: 26, p5: null, p10: null },
      { name: "Noisette", p1: 26, p5: null, p10: null }
    ]
  }
};

type Tab = "cocktails" | "jus";

interface EventOffersProps {
  onSelectFormula: (formula: string) => void;
}

export default function EventOffers({ onSelectFormula }: EventOffersProps) {
  const [activeTab, setActiveTab] = useState<Tab>("cocktails");
  const [drawerPack, setDrawerPack] = useState<typeof cocktailPacks[0] | null>(null);
  const [isSurMesureSelected, setIsSurMesureSelected] = useState(false);

  const handleSelect = (formula: string) => {
    setDrawerPack(null);
    if (formula.includes("Sur-Mesure")) {
      setIsSurMesureSelected(true);
    } else {
      setIsSurMesureSelected(false);
    }
    onSelectFormula(formula);
  };

  return (
    <section className="relative py-24 px-4 bg-transparent overflow-hidden transform-gpu" id="event-offers">
      <div className="absolute top-1/4 right-0 w-[40vw] h-[40vw] bg-[#00E5FF]/10 blur-[120px] rounded-full pointer-events-none transform-gpu" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-[#FFEE55]/5 blur-[120px] rounded-full pointer-events-none transform-gpu" />

      {/* Interactive Floating GIF Background Particles */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Tropical Drink Particle 🍹 */}
        <motion.img 
          src="https://em-content.zobj.net/source/animated-noto-color-emoji/461/tropical-drink_1f379.gif"
          alt="Tropical Drink"
          animate={{ y: [-15, 15, -15] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-[15%] left-[5%] w-12 h-12 md:w-16 md:h-16 opacity-40 object-contain will-change-transform"
        />
        {/* Strawberry Particle 🍓 */}
        <motion.img 
          src="https://em-content.zobj.net/source/animated-noto-color-emoji/461/strawberry_1f353.gif"
          alt="Strawberry"
          animate={{ x: [-10, 10, -10], y: [15, -15, 15] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className="absolute bottom-[20%] left-[50%] md:left-[60%] w-12 h-12 md:w-16 md:h-16 opacity-50 object-contain will-change-transform"
        />
        {/* Snowflake Particle ❄️ */}
        <motion.img 
          src="https://em-content.zobj.net/source/animated-noto-color-emoji/461/snowflake_2744-fe0f.gif"
          alt="Snowflake"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="absolute top-[30%] right-[10%] w-12 h-12 md:w-16 md:h-16 opacity-35 object-contain will-change-transform"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-montserrat mb-4 text-white drop-shadow-md will-change-transform"
          >
            Nos <span className="text-[#FFEE55] italic font-light drop-shadow-[0_0_15px_rgba(255,238,85,0.6)]">Formules Événementielles 🥂</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/70 max-w-2xl mx-auto font-inter text-lg will-change-transform"
          >
            Mariages, Anniversaires, Soirées Privées ou Corporate... Découvrez nos packages clés en main et nos offres traiteur sur mesure pour des événements inoubliables en Tunisie 🇹🇳.
          </motion.p>
        </div>

        {/* Sliding Tab Switch (Neon Cyan & Electric Yellow) */}
        <div className="flex justify-center mb-12">
          <motion.div 
            whileHover={{ borderColor: "#00E5FF", boxShadow: "inset 0 0 12px rgba(0, 229, 255, 0.25), 0 8px 32px 0 rgba(5,11,24,0.37)" }}
            className="bg-white/[0.06] backdrop-blur-xl p-1.5 rounded-full border border-white/[0.12] flex relative shadow-[0_8px_32px_0_rgba(5,11,24,0.37)] transition-colors duration-300"
          >
            {(["cocktails", "jus"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative z-10 px-6 py-2.5 md:px-8 md:py-3.5 rounded-full font-montserrat font-bold text-sm md:text-base transition-colors duration-300 flex items-center gap-2 ${
                  activeTab === tab ? "text-[#050B18]" : "text-white hover:text-white/80"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabBackground"
                    className="absolute inset-0 bg-gradient-to-r from-[#00E5FF] to-[#00B0FF] rounded-full -z-10 shadow-[0_0_15px_rgba(0,229,255,0.4)] will-change-transform"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {tab === "cocktails" ? (
                  <><span>🍸</span> L'Atelier des Sens</>
                ) : (
                  <><span>🍹</span> Pressoir de Saison</>
                )}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="will-change-transform will-change-opacity"
          >
            {activeTab === "cocktails" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6 mb-8 max-w-4xl mx-auto">
                {/* Teaser Cards Pattern */}
                {cocktailPacks.map((pack, index) => (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ borderColor: "#00E5FF", boxShadow: "inset 0 0 12px rgba(0, 229, 255, 0.25), 0 8px 32px 0 rgba(5,11,24,0.37)" }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    key={pack.id} 
                    className="relative bg-white/[0.06] border border-white/[0.12] rounded-2xl p-5 md:p-6 backdrop-blur-xl flex flex-col transition-all duration-300 group cursor-pointer shadow-[0_8px_32px_0_rgba(5,11,24,0.37)] will-change-transform overflow-hidden"
                    onClick={() => setDrawerPack(pack)}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 shrink-0 rounded-full bg-gradient-to-br from-[#00E5FF] to-[#00B0FF] text-[#050B18] flex items-center justify-center font-black text-xl shadow-[0_0_15px_rgba(0,229,255,0.4)] group-hover:scale-110 transition-transform">
                        {pack.number}
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-extrabold font-montserrat text-white">{pack.title}</h3>
                        <p className="text-[#FFEE55] font-medium text-xs tracking-wide">{pack.tagline}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/10">
                      <div className="flex gap-2 text-white/50">
                        <Star size={16} className="text-[#00E5FF]" />
                        <Info size={16} className="text-[#00E5FF]" />
                        <Sparkles size={16} className="text-[#00E5FF]" />
                      </div>
                      <button className="ml-auto flex items-center gap-1 text-xs font-bold font-montserrat uppercase tracking-wider text-white group-hover:text-[#00E5FF] transition-colors">
                        Inspirer mon Événement ✨ <ChevronRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "jus" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
                {Object.entries(juiceData).map(([key, category], index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ borderColor: "#00E5FF", boxShadow: "inset 0 0 12px rgba(0, 229, 255, 0.25), 0 8px 32px 0 rgba(5,11,24,0.37)" }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    key={key}
                    className="bg-white/[0.06] border border-white/[0.12] rounded-2xl p-6 backdrop-blur-xl transition-colors group will-change-transform shadow-[0_8px_32px_0_rgba(5,11,24,0.37)]"
                  >
                    <div className="mb-5 border-b border-white/10 pb-4">
                      <h3 className="text-xl font-extrabold font-montserrat text-white mb-1 group-hover:text-[#00E5FF] transition-colors">{category.title}</h3>
                      <p className="text-[#FFEE55] text-xs font-light italic">{category.description}</p>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="text-[#00E5FF] text-[10px] uppercase tracking-wider border-b border-white/5">
                            <th className="pb-2 font-bold">Saveur</th>
                            <th className="pb-2 font-bold text-center">1L</th>
                            <th className="pb-2 font-bold text-center">5L</th>
                            <th className="pb-2 font-bold text-center">10L</th>
                          </tr>
                        </thead>
                        <tbody className="text-xs">
                          {category.items.map((item, i) => (
                            <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/10 transition-colors">
                              <td className="py-2.5 text-white/90 font-medium">{item.name}</td>
                              <td className="py-2.5 text-center text-white font-bold">{item.p1 ? `${item.p1} DT` : '-'}</td>
                              <td className="py-2.5 text-center text-white font-bold">{item.p5 ? `${item.p5} DT` : '-'}</td>
                              <td className="py-2.5 text-center text-white font-bold">{item.p10 ? `${item.p10} DT` : '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-5">
                       <button 
                        onClick={() => handleSelect(`Jus de Fruits - ${category.title}`)}
                        className="w-full py-3 rounded-lg font-bold font-montserrat uppercase tracking-wider text-[11px] transition-all duration-300 border border-[#00E5FF]/30 text-white hover:bg-[#00E5FF] hover:text-[#050B18] hover:shadow-[0_0_15px_rgba(0,229,255,0.4)]"
                      >
                        Inspirer mon Événement ✨
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Compact Sur-Mesure Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-2xl mx-auto rounded-2xl p-[2px] overflow-hidden will-change-transform group mt-4 shadow-[0_0_30px_rgba(0,229,255,0.2)]"
        >
          {/* Animated gradient border (Red, Blue, Green) */}
          <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0%,#FF0055_25%,#00E5FF_50%,#00FF88_75%,transparent_100%)] animate-[spin_4s_linear_infinite] opacity-100 group-hover:opacity-80 transition-opacity duration-300" />
          
          <div className="relative bg-white/10 rounded-[14px] p-6 h-full flex flex-col items-stretch gap-6 justify-between z-10 backdrop-blur-xl border border-white/20">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                  <Sparkles className="text-[#FFEE55]" size={18} />
                  <h3 className="text-xl font-extrabold font-montserrat text-white">Formule Sur-Mesure</h3>
                </div>
                <p className="text-white/70 font-light leading-relaxed text-xs">
                  Une carte 100% personnalisée. Contact direct avec Bilel & Taki Chii.
                </p>
              </div>
              
              <div className="w-full sm:w-auto shrink-0">
                <button 
                  onClick={() => handleSelect("Formule Sur-Mesure (Conseil Téléphonique)")}
                  className="w-full sm:w-auto px-6 py-3 bg-transparent border-2 border-[#FFEE55] hover:bg-[#FFEE55] text-[#FFEE55] hover:text-[#050B18] font-bold font-montserrat uppercase tracking-widest text-xs rounded-lg shadow-[0_0_15px_rgba(255,238,85,0.2)] hover:shadow-[0_0_25px_rgba(255,238,85,0.5)] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Phone size={14} />
                  Nous Contacter
                </button>
              </div>
            </div>

            {isSurMesureSelected && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 p-4 bg-white/5 rounded-xl border border-[#FFEE55]/30 space-y-3 text-center sm:text-left"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold text-[#FFEE55] mb-1">📞 Contact Direct :</p>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs font-mono text-white/90">
                      <a href="tel:+21654791367" className="hover:text-[#00E5FF] transition-colors font-bold">Bilel : 54 791 367</a>
                      <span className="hidden sm:inline text-white/30">|</span>
                      <a href="tel:+21653023739" className="hover:text-[#00E5FF] transition-colors font-bold">Taki : 53 023 739</a>
                    </div>
                  </div>
                  
                  <div className="shrink-0 flex justify-center">
                    <a 
                      href="https://wa.me/21654791367" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#1ebd55] text-white text-xs font-bold rounded-lg shadow-md transition-colors"
                    >
                      <MessageCircle size={14} />
                      WhatsApp Direct
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Drawer Overlay for Cocktail Packs */}
      <AnimatePresence>
        {drawerPack && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm p-2 sm:p-4 will-change-opacity"
            onClick={() => setDrawerPack(null)}
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              whileHover="hover"
              className="relative bg-[#050B18] border border-transparent w-full max-w-2xl max-h-[85vh] rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col shadow-[0_-20px_50px_rgba(0,0,0,0.5)] will-change-transform"
            >
              {/* Frost Border SVG for Drawer */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-t-3xl sm:rounded-3xl z-50" style={{ strokeWidth: 2 }}>
                <motion.rect
                  x="1" y="1" rx="23" ry="23"
                  width="calc(100% - 2px)" height="calc(100% - 2px)"
                  stroke="url(#frost-gradient-drawer)"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  variants={{ hover: { pathLength: 1, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } } }}
                />
                <defs>
                  <linearGradient id="frost-gradient-drawer" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                    <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Drawer Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00E5FF] to-[#00B0FF]" />
                <div>
                  <div className="inline-block px-2 py-1 bg-[#00E5FF]/20 text-[#00E5FF] rounded text-[10px] font-black tracking-widest uppercase mb-1">
                    Pack {drawerPack.number}
                  </div>
                  <h3 className="text-2xl font-extrabold font-montserrat text-white leading-none">{drawerPack.title}</h3>
                </div>
                <button 
                  onClick={() => setDrawerPack(null)}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="p-6 overflow-y-auto flex-1 space-y-8 custom-scrollbar">
                <div>
                  <h4 className="text-[#00E5FF] font-bold uppercase text-[11px] tracking-widest mb-3 flex items-center gap-2">
                    <Check size={14} /> Conditions & Détails
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {drawerPack.conditions.map((cond, i) => (
                      <li key={i} className="flex items-start gap-2 text-white/80 text-xs font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FFEE55] mt-1 shrink-0" />
                        <span>{cond}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[#00E5FF] font-bold uppercase text-[11px] tracking-widest mb-3 flex items-center gap-2">
                    <Star size={14} /> Menu des Cocktails ({drawerPack.cocktails.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {drawerPack.cocktails.map((cocktail, i) => (
                      <div key={i} className="bg-white/5 border border-white/5 rounded-md p-3">
                        <p className="text-white font-bold text-sm leading-none mb-1">{cocktail.name}</p>
                        <p className="text-white/50 text-[10px] italic leading-tight">{cocktail.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer Footer CTA */}
              <div className="p-6 border-t border-white/10 bg-white/5">
                <button 
                  onClick={() => handleSelect(drawerPack.title)}
                  className="w-full py-4 rounded-xl font-black font-montserrat uppercase tracking-wider text-sm transition-all duration-300 bg-gradient-to-r from-[#00E5FF] to-[#00B0FF] text-[#050B18] hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] flex items-center justify-center gap-2"
                >
                  Inspirer mon Événement ✨ <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
