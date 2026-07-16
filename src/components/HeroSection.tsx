"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1000);
  
  useEffect(() => {
    setMounted(true);
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollY } = useScroll();
  // Smooth out the raw scroll value using a spring config for buttery 60fps
  const smoothY = useSpring(scrollY, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Dynamically calculate travel distances to prevent mobile overflow while keeping the "rest in corner" effect
  // Mobile travel distance adjusted to 650 so cups rest beside the "La Carte" title and don't overlap the menu cards
  const travelY = mounted ? (windowWidth > 768 ? 600 : 650) : 600;
  
  const cup1Y = useTransform(smoothY, [0, 800, 1600], [0, travelY, travelY]); 
  const cup1Scale = useTransform(smoothY, [0, 800, 1600], [1, 0.35, 0.35]);
  const cup1Rotate = useTransform(smoothY, [0, 800, 1600], [0, 15, 15]);
  const xOffsetRight = mounted ? (windowWidth > 768 ? windowWidth * 0.3 : windowWidth * 0.15) : 250;
  const cup1X = useTransform(smoothY, [0, 800, 1600], [0, xOffsetRight, xOffsetRight]);

  const cup2Y = useTransform(smoothY, [0, 800, 1600], [0, travelY, travelY]); 
  const cup2Scale = useTransform(smoothY, [0, 800, 1600], [1, 0.35, 0.35]);
  const cup2Rotate = useTransform(smoothY, [0, 800, 1600], [0, -15, -15]); 
  const xOffsetLeft = mounted ? (windowWidth > 768 ? -windowWidth * 0.3 : -windowWidth * 0.15) : -250;
  const cup2X = useTransform(smoothY, [0, 800, 1600], [0, xOffsetLeft, xOffsetLeft]);

  // Optimize Performance: Use simple translation
  const bgY = useTransform(smoothY, [0, 1000], [0, -200]);

  // Simplify particles for performance (remove backdrop-blur and heavy shadows)
  const flares = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    size: 15 + (i * 3) % 25,
    left: `${(i * 19) % 100}%`,
    duration: 5 + (i % 3),
    delay: (i % 4) * 0.5
  }));

  // Floating Ice Cubes Parallax
  const ice1Y = useTransform(smoothY, [0, 1000], [0, -150]);
  const ice2Y = useTransform(smoothY, [0, 1000], [0, -250]);
  const ice3Y = useTransform(smoothY, [0, 1000], [0, -350]);
  const ice4Y = useTransform(smoothY, [0, 1000], [0, -100]);
  const ice5Y = useTransform(smoothY, [0, 1000], [0, -200]);
  const ice6Y = useTransform(smoothY, [0, 1000], [0, -300]);

  return (
    <section 
      id="hero" 
      ref={containerRef}
      // Pulled everything to the top of the DOM to remove empty space and reveal more of the cups
      className="relative min-h-[100vh] w-full flex flex-col items-center justify-start pt-8 z-10 pointer-events-none transform-gpu"
    >
      {/* Optimized Glows: Reduced blur radius and used will-change */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[50vw] bg-[#00E5FF]/30 blur-[100px] rounded-full pointer-events-none" style={{ willChange: "transform" }} />
      <div className="absolute top-1/4 right-0 w-[50vw] h-[50vw] bg-[#FFB703]/20 blur-[80px] rounded-full pointer-events-none" style={{ willChange: "transform" }} />
      <div className="absolute top-1/3 left-0 w-[50vw] h-[50vw] bg-[#FF0055]/15 blur-[80px] rounded-full pointer-events-none" style={{ willChange: "transform" }} />

      {/* High Performance Particles */}
      {mounted && (
        <motion.div style={{ y: bgY, willChange: "transform" }} className="absolute inset-0 pointer-events-none">
          {flares.map((flare) => (
            <motion.div
              key={flare.id}
              initial={{ y: "110vh", opacity: 0 }}
              animate={{ y: "-10vh", opacity: [0, 0.4, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: flare.duration, 
                delay: flare.delay,
                ease: "linear"
              }}
              className="absolute rounded-full bg-white/20"
              style={{
                width: flare.size,
                height: flare.size,
                left: flare.left,
                willChange: "transform, opacity"
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Floating 3D Ice Cubes (Spammed around the screen) */}
      <motion.div style={{ y: ice1Y }} className="absolute top-[15%] left-[10%] w-20 h-20 md:w-32 md:h-32 z-30 pointer-events-none">
        <motion.div animate={{ rotate: 360, y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }} className="w-full h-full relative opacity-70">
          <Image src="/assets/3d ice 1.png" alt="Ice" fill className="object-contain" />
        </motion.div>
      </motion.div>
      
      <motion.div style={{ y: ice2Y }} className="absolute top-[25%] -right-4 md:right-[2%] w-16 h-16 md:w-24 md:h-24 z-50 pointer-events-none">
        <motion.div animate={{ rotate: -360, y: [0, 30, 0] }} transition={{ repeat: Infinity, duration: 12, ease: "linear" }} className="w-full h-full relative opacity-80">
          <Image src="/assets/3d ice 2.png" alt="Ice" fill className="object-contain" />
        </motion.div>
      </motion.div>

      <motion.div style={{ y: ice3Y }} className="absolute top-[60%] left-[5%] w-14 h-14 md:w-20 md:h-20 z-50 pointer-events-none hidden md:block">
        <motion.div animate={{ rotate: 180, x: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 18, ease: "linear" }} className="w-full h-full relative opacity-60 drop-shadow-xl">
          <Image src="/assets/3d ice 1.png" alt="Ice" fill className="object-contain" />
        </motion.div>
      </motion.div>

      <motion.div style={{ y: ice4Y }} className="absolute bottom-[25%] right-[15%] w-24 h-24 md:w-36 md:h-36 z-20 pointer-events-none">
        <motion.div animate={{ rotate: 270, y: [0, -25, 0] }} transition={{ repeat: Infinity, duration: 14, ease: "linear" }} className="w-full h-full relative opacity-50 blur-[2px]">
          <Image src="/assets/3d ice 2.png" alt="Ice" fill className="object-contain" />
        </motion.div>
      </motion.div>

      <motion.div style={{ y: ice5Y }} className="absolute top-[5%] right-[30%] w-12 h-12 md:w-16 md:h-16 z-50 pointer-events-none hidden lg:block">
        <motion.div animate={{ rotate: -180, y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }} className="w-full h-full relative opacity-90">
          <Image src="/assets/3d ice 1.png" alt="Ice" fill className="object-contain" />
        </motion.div>
      </motion.div>

      <motion.div style={{ y: ice6Y }} className="absolute bottom-[10%] left-[20%] w-16 h-16 md:w-28 md:h-28 z-40 pointer-events-none">
        <motion.div animate={{ rotate: 90, x: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 16, ease: "linear" }} className="w-full h-full relative opacity-75">
          <Image src="/assets/3d ice 2.png" alt="Ice" fill className="object-contain" />
        </motion.div>
      </motion.div>

      {/* Floating Fruits (Sun & Abricot) */}
      <motion.div style={{ y: ice1Y }} className="absolute top-[8%] right-[10%] w-12 h-12 md:w-20 md:h-20 z-0 pointer-events-none">
        <motion.div animate={{ rotate: 180, scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="w-full h-full relative opacity-40 mix-blend-screen">
          <Image src="/assets/500 500px sun (no bg).png" alt="Sun" fill className="object-contain" />
        </motion.div>
      </motion.div>

      <motion.div style={{ y: ice5Y }} className="absolute bottom-[40%] left-[8%] w-10 h-10 md:w-16 md:h-16 z-0 pointer-events-none">
        <motion.div animate={{ rotate: -180, y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 25, ease: "linear" }} className="w-full h-full relative opacity-50 blur-[1px]">
          <Image src="/assets/500 500px abricot (no bg).png" alt="Abricot" fill className="object-contain" />
        </motion.div>
      </motion.div>

      {/* Typography - Brought higher up and z-index increased */}
      <div className="z-[70] text-center px-4 max-w-5xl mx-auto mb-0 relative pointer-events-none">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold font-montserrat leading-[1.1] mb-2 text-white drop-shadow-lg"
          style={{ willChange: "transform, opacity" }}
        >
          La Mixologie Créative <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB703] via-[#FF0055] to-[#FB8500] drop-shadow-[0_0_20px_rgba(255,183,3,0.5)]">
            Tunisienne.
          </span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg md:text-2xl font-inter text-white font-medium tracking-[0.3em] uppercase mt-2 drop-shadow-md"
        >
          Frais. Glacé. <span className="font-bold text-[#FFB703] tracking-[0.3em]">Brood.</span>
        </motion.p>
      </div>

      {/* Double Parallax Product Shots - Pushed up with negative margin */}
      <div className="relative z-[60] w-full max-w-[600px] flex justify-center items-start mt-[-20px] md:mt-[-40px] h-[450px] md:h-[600px]">
        
        {/* Cup 2 (Red Cup) - Left */}
        <motion.div 
          style={{ y: cup2Y, scale: cup2Scale, rotate: cup2Rotate, x: cup2X, willChange: "transform" }}
          className="absolute w-[70%] max-w-[280px] md:max-w-[400px] aspect-[1080/1920] origin-top translate-x-[-15%]"
        >
          <Image 
            src="/assets/cup2.png"
            alt="Brood Red Drink"
            fill
            priority
            className="object-contain drop-shadow-[0_20px_40px_rgba(255,0,85,0.3)]"
          />
        </motion.div>

        {/* Cup 1 (Original Cup) - Right */}
        <motion.div 
          style={{ y: cup1Y, scale: cup1Scale, rotate: cup1Rotate, x: cup1X, willChange: "transform" }}
          className="absolute w-[75%] max-w-[300px] md:max-w-[420px] aspect-[1080/1920] origin-top translate-x-[15%] z-10"
        >
          <Image 
            src="/assets/product-shot.png"
            alt="Brood Premium Drink"
            fill
            priority
            className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
          />
        </motion.div>
        
      </div>
      
      {/* Bottom Gradient Fade blending into Menu section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0077B6] to-transparent z-10 pointer-events-none opacity-50" />
    </section>
  );
}
