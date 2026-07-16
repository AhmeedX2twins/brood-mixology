"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AmbientWatermarks() {
  const logoSrc = "/assets/500 500px official logo without a background.png";

  return (
    <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden">
      <motion.div
        className="absolute top-[5%] right-[-10%] w-[600px] h-[600px] md:w-[900px] md:h-[900px] opacity-[0.03] blur-2xl transform-gpu will-change-transform"
        animate={{
          y: [0, -40, 0],
          x: [0, 30, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 20,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <Image src={logoSrc} alt="Brood Ambient Logo" fill className="object-contain" />
      </motion.div>

      <motion.div
        className="absolute top-[35%] left-[-15%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] opacity-[0.06] blur-md transform-gpu will-change-transform"
        animate={{
          y: [0, 50, 0],
          x: [0, -25, 0],
          rotate: [0, -8, 0]
        }}
        transition={{
          duration: 16,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2
        }}
      >
        <Image src={logoSrc} alt="Brood Ambient Logo" fill className="object-contain" />
      </motion.div>

      <motion.div
        className="absolute bottom-[10%] right-[10%] w-[250px] h-[250px] md:w-[400px] md:h-[400px] opacity-[0.04] blur-[1px] transform-gpu will-change-transform"
        animate={{
          y: [0, -25, 0],
          x: [0, -20, 0],
          rotate: [0, 4, 0]
        }}
        transition={{
          duration: 18,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
          delay: 5
        }}
      >
        <Image src={logoSrc} alt="Brood Ambient Logo" fill className="object-contain" />
      </motion.div>
    </div>
  );
}
