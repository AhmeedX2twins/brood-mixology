import Preloader from "@/components/Preloader";
import NavigationFAB from "@/components/NavigationFAB";
import HeroSection from "@/components/HeroSection";
import MenuSection from "@/components/MenuSection";
import StorySection from "@/components/StorySection";
import CardsSection from "@/components/CardsSection";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-brand-bg w-full overflow-x-hidden">
      <Preloader />
      <NavigationFAB />
      <HeroSection />
      <MenuSection />
      <StorySection />
      <CardsSection />
      <BookingForm />
      <Footer />
    </main>
  );
}
