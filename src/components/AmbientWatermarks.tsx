"use client";

/**
 * AmbientWatermarks — Ultra-Lightweight Background Ambience
 * 
 * PERFORMANCE NOTE: The previous implementation used 3 enormous blurred images
 * (up to 900px) with infinite Framer Motion animations on fixed-position elements.
 * This alone was responsible for ~30-40% of the frame drop.
 * 
 * This version uses CSS-only radial gradients with zero blur filters,
 * zero motion elements, and zero compositor layer promotions.
 */
export default function AmbientWatermarks() {
  return (
    <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden">
      {/* Subtle ambient glow zones using pure CSS radial gradients — zero GPU cost */}
      <div 
        className="absolute top-[5%] right-[-5%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, rgba(0,229,255,0.4) 0%, transparent 70%)" }}
      />
      <div 
        className="absolute top-[40%] left-[-10%] w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, rgba(0,119,182,0.5) 0%, transparent 70%)" }}
      />
      <div 
        className="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full opacity-[0.03]"
        style={{ background: "radial-gradient(circle, rgba(255,183,3,0.3) 0%, transparent 70%)" }}
      />
    </div>
  );
}
