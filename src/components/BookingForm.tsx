"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, FormEvent } from "react";
import { ArrowRight, ArrowLeft, Check, Sparkles } from "lucide-react";
import Image from "next/image";

type EventType = "Mariage" | "Fête Privée" | "Corporate" | "";

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [eventType, setEventType] = useState<EventType>("");
  const [guests, setGuests] = useState(50);
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalSteps = 4;

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID || process.env.NEXT_PUBLIC_FORMSPREE_KEY || "placeholder-id";
    const data = { name, eventType, guests, phone };

    try {
      if (formId === "placeholder-id") {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } else {
        const response = await fetch(`https://formspree.io/f/${formId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Network error");
      }
      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Summer Particles for success animation
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    type: i % 2 === 0 ? "orange" : "ice",
    x: Math.random() * 100 - 50, 
    y: -(Math.random() * 100 + 50),
    rotation: Math.random() * 360,
  }));

  return (
    <section id="events" className="relative py-32 px-4 bg-transparent flex items-center justify-center overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 w-[100vw] h-[100vw] md:w-[60vw] md:h-[60vw] bg-[#00E5FF]/15 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 -translate-x-1/2" style={{ willChange: "transform" }} />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] md:w-[30vw] md:h-[30vw] bg-[#FFB703]/10 blur-[100px] rounded-full pointer-events-none translate-y-1/4 -translate-x-1/4" style={{ willChange: "transform" }} />

      {/* Floating 3D Ice */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div className="absolute top-[20%] left-[10%] w-16 h-16 md:w-24 md:h-24 opacity-60">
          <motion.div animate={{ rotate: -360, y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 16, ease: "linear" }} className="w-full h-full relative">
            <Image src="/assets/3d ice 1.png" alt="Ice" fill className="object-contain" />
          </motion.div>
        </motion.div>
        <motion.div className="absolute bottom-[15%] right-[10%] w-20 h-20 md:w-32 md:h-32 opacity-40 blur-[3px]">
          <motion.div animate={{ rotate: 180, x: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="w-full h-full relative">
            <Image src="/assets/3d ice 2.png" alt="Ice" fill className="object-contain" />
          </motion.div>
        </motion.div>
      </div>
      <div className="relative z-10 w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-16 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,119,182,0.3)]">
        
        {/* Progress Bar */}
        {!isSuccess && (
          <div className="w-full h-1 bg-white/20 rounded-full mb-12 overflow-hidden">
            <motion.div 
              className="h-full bg-[#FFB703]"
              initial={{ width: "0%" }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.form 
              key="form"
              onSubmit={step === totalSteps ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="min-h-[250px] flex flex-col justify-center"
            >
              <AnimatePresence mode="wait">
                {/* Step 1: Name */}
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-3xl md:text-4xl font-montserrat font-bold text-white text-center drop-shadow-sm">
                      Quel est votre nom ?
                    </h3>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Votre nom complet"
                      className="w-full bg-transparent border-b-2 border-white/30 px-4 py-4 text-2xl text-center text-white focus:outline-none focus:border-[#FFB703] transition-colors placeholder:text-white/40"
                    />
                  </motion.div>
                )}

                {/* Step 2: Event Type */}
                {step === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-8"
                  >
                    <h3 className="text-3xl md:text-4xl font-montserrat font-bold text-white text-center drop-shadow-sm">
                      Type d'événement ?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {["Mariage", "Fête Privée", "Corporate"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => {
                            setEventType(type as EventType);
                            setTimeout(nextStep, 300);
                          }}
                          className={`py-6 rounded-2xl border-2 transition-all duration-300 font-montserrat font-semibold text-lg ${
                            eventType === type 
                              ? "bg-[#FFB703] border-[#FFB703] text-white shadow-lg" 
                              : "border-white/30 text-white hover:border-[#FFB703] hover:bg-[#FFB703]/20"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Guests */}
                {step === 3 && (
                  <motion.div 
                    key="step3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-8 text-center"
                  >
                    <h3 className="text-3xl md:text-4xl font-montserrat font-bold text-white drop-shadow-sm">
                      Nombre d'invités estimé ?
                    </h3>
                    <div className="text-6xl font-bold font-montserrat text-[#FFB703] py-4 drop-shadow-lg">
                      {guests} <span className="text-2xl text-white/50">+</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="500" 
                      step="10"
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="w-full accent-[#FFB703] h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                    />
                  </motion.div>
                )}

                {/* Step 4: Phone */}
                {step === 4 && (
                  <motion.div 
                    key="step4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-3xl md:text-4xl font-montserrat font-bold text-white text-center drop-shadow-sm">
                      Votre numéro de téléphone ?
                    </h3>
                    <input 
                      type="tel" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+216 XX XXX XXX"
                      className="w-full bg-transparent border-b-2 border-white/30 px-4 py-4 text-2xl text-center text-white focus:outline-none focus:border-[#FFB703] transition-colors placeholder:text-white/40"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="flex justify-between mt-12">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/20"
                  >
                    <ArrowLeft size={24} />
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="submit"
                  disabled={
                    (step === 1 && !name) || 
                    (step === 2 && !eventType) || 
                    (step === 4 && !phone) || 
                    isSubmitting
                  }
                  className="px-8 py-4 bg-[#FFB703] text-white font-bold font-montserrat rounded-full flex items-center gap-2 hover:bg-[#FB8500] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_20px_rgba(255,183,3,0.3)]"
                >
                  {isSubmitting ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  ) : step === totalSteps ? (
                    <>Envoyer <Check size={20} /></>
                  ) : (
                    <>Suivant <ArrowRight size={20} /></>
                  )}
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-6"
            >
              <div className="w-24 h-24 bg-[#FFB703] rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(255,183,3,0.5)]">
                <Sparkles size={48} className="text-white" />
              </div>
              <h3 className="text-4xl font-montserrat font-bold text-white drop-shadow-sm">Merci, {name.split(' ')[0]} !</h3>
              <p className="text-white/90 text-lg">Nous avons reçu votre demande pour votre {eventType}. Nous vous contacterons très vite !</p>
              
              {/* Micro-interaction Particles */}
              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ 
                    opacity: 1, 
                    x: "50vw", 
                    y: "110vh",
                    rotate: 0,
                    scale: p.type === 'orange' ? 1 : 0.6
                  }}
                  animate={{ 
                    y: "-10vh", 
                    x: `${p.x}vw`,
                    rotate: p.rotation + 360,
                    opacity: [1, 1, 0]
                  }}
                  transition={{ 
                    duration: 2 + Math.random(), 
                    ease: "easeOut",
                    delay: Math.random() * 0.5
                  }}
                  className={`absolute z-50 pointer-events-none rounded-lg ${p.type === 'ice' ? 'bg-white/60 backdrop-blur-md shadow-lg border border-white' : 'bg-[#FFB703]/90 rounded-full border-2 border-[#FB8500]'}`}
                  style={{ width: p.type === 'ice' ? 30 : 40, height: p.type === 'ice' ? 30 : 40 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
