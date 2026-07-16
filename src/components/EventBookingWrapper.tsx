"use client";

import { useState, useRef } from "react";
import EventOffers from "./EventOffers";
import BookingForm from "./BookingForm";

export default function EventBookingWrapper() {
  const [selectedFormula, setSelectedFormula] = useState("");
  const bookingFormRef = useRef<HTMLDivElement>(null);

  const handleSelectFormula = (formula: string) => {
    setSelectedFormula(formula);
    // Smooth scroll to the booking form
    if (bookingFormRef.current) {
      bookingFormRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full">
      <EventOffers onSelectFormula={handleSelectFormula} />
      <div ref={bookingFormRef}>
        <BookingForm 
          preSelectedFormula={selectedFormula} 
          onClearFormula={() => setSelectedFormula("")}
        />
      </div>
    </div>
  );
}
