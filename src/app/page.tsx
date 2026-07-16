import Preloader from "@/components/Preloader";
import AmbientWatermarks from "@/components/AmbientWatermarks";
import NavigationFAB from "@/components/NavigationFAB";
import HeroSection from "@/components/HeroSection";
import MenuSection from "@/components/MenuSection";
import StorySection from "@/components/StorySection";
import CardsSection from "@/components/CardsSection";
import EventBookingWrapper from "@/components/EventBookingWrapper";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-[100dvh] bg-brand-bg w-full overflow-x-hidden">
      <Preloader />
      <AmbientWatermarks />
      <NavigationFAB />
      <HeroSection />
      <MenuSection />
      <StorySection />
      <CardsSection />
      <EventBookingWrapper />
      <Footer />
    </main>
  );
}
