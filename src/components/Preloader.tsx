"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [phase, setPhase] = useState<'heatwave' | 'critical' | 'shattered' | 'unmounted'>('heatwave');
  const count = useMotionValue(32);
  const rounded = useTransform(count, Math.round);
  
  // Disable body scroll when mounted, enable when shattered
  useEffect(() => {
    if (phase === 'heatwave' || phase === 'critical') {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100dvh";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.height = "auto";
    }
    
    return () => { 
      document.body.style.overflow = "unset"; 
      document.body.style.height = "auto"; 
    };
  }, [phase]);

  // 5000ms Global Failsafe Unmount
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      setPhase('unmounted');
      document.body.style.overflow = "unset";
      document.body.style.height = "auto";
    }, 5000);
    return () => clearTimeout(safetyTimer);
  }, []);

  // Animate temperature
  useEffect(() => {
    const controls = animate(count, 40, { 
      duration: 1.5, 
      ease: "easeOut",
      onComplete: () => {
        setPhase('critical');
      }
    });
    return () => controls.stop();
  }, [count]);

  const handleExitPreload = () => {
    if (phase !== 'critical') return;
    setPhase('shattered');
    
    // Clean up from DOM after animation completes
    setTimeout(() => {
      setPhase('unmounted');
    }, 1500); // 1.2s transition + buffer
  };

  // 4-Second Auto-Advance Failsafe
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (phase === 'critical') {
      timer = setTimeout(() => {
        handleExitPreload();
      }, 2500);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [phase]);

  if (phase === 'unmounted') return null;

  const isShattered = phase === 'shattered';
  const isCritical = phase === 'critical';

  return (
    <motion.div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100dvh',
        zIndex: 999999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        pointerEvents: isShattered ? 'none' : 'auto'
      }}
      initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      animate={{ 
        opacity: isShattered ? 0 : 1,
        scale: isShattered ? 1.05 : 1,
        filter: isShattered ? "blur(10px)" : "blur(0px)"
      }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className={phase === 'critical' ? 'cursor-pointer' : ''} 
      onClick={handleExitPreload}
    >
      
      {/* Living Heat Background - Moving Gradient */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(270deg, #4A0000, #FF4D15, #D32F2F, #4A0000)",
          backgroundSize: "400% 400%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
        }}
        transition={{
          duration: 10,
          ease: "linear",
          repeat: Infinity
        }}
      />

      {/* The Breathing Pulse Overlay */}
      <motion.div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, transparent 0%, rgba(20,0,0,0.8) 100%)"
        }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      />

      {/* SVG Noise Texture Overlay for tactile haze */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)"/>
        </svg>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30">
        <motion.div 
          className={`text-8xl md:text-[12rem] font-bold tracking-tighter transition-all duration-700 ${
            isCritical ? "text-[#00E5FF] drop-shadow-[0_0_20px_rgba(0,229,255,0.8)]" : "text-white drop-shadow-[0_0_40px_rgba(255,77,21,1)]"
          }`}
        >
          +<motion.span>{rounded}</motion.span>°C
        </motion.div>
        
        <div className="h-12 mt-8 flex items-center justify-center">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: isCritical ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="text-[#00E5FF] tracking-[0.2em] uppercase font-semibold animate-pulse"
          >
            [ Cliquer pour Rafraîchir ]
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
