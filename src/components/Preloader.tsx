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

  // Animate temperature rapidly (completing in 0.4s)
  useEffect(() => {
    const controls = animate(count, 40, { 
      duration: 0.4, 
      ease: "easeOut",
      onComplete: () => {
        setPhase('critical');
      }
    });
    return () => controls.stop();
  }, [count]);

  const handleExitPreload = () => {
    setPhase(prev => {
      if (prev === 'shattered' || prev === 'unmounted') return prev;
      
      // Clean up from DOM after animation completes (500ms duration)
      setTimeout(() => {
        setPhase('unmounted');
      }, 500);
      
      return 'shattered';
    });
  };

  // 1-Second (1000ms) Auto-Dismiss Timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      handleExitPreload();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
        zIndex: 9999999, // Topmost overlay
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        pointerEvents: isShattered ? 'none' : 'auto',
        touchAction: 'none' // Prevent pointer/gesture scrolling issues on mobile
      }}
      initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      animate={{ 
        opacity: isShattered ? 0 : 1,
        scale: isShattered ? 1.05 : 1,
        filter: isShattered ? "blur(10px)" : "blur(0px)"
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="cursor-pointer"
      onClick={handleExitPreload}
      onTouchEnd={handleExitPreload}
      onPointerDown={handleExitPreload}
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

      {/* Lightweight grain texture — CSS only, no SVG filter overhead */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.08]" style={{ backgroundImage: 'repeating-conic-gradient(rgba(255,255,255,0.03) 0% 25%, transparent 0% 50%)', backgroundSize: '4px 4px' }} />

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
            transition={{ duration: 0.3 }}
            className="text-[#00E5FF] tracking-[0.2em] uppercase font-semibold animate-pulse"
          >
            [ Cliquer pour Rafraîchir ]
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
