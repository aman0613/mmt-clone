import Hero from "@/components/home/Hero";
import Offers from "@/components/home/Offers";
import Destinations from "@/components/Destinations";
import AppPromo from "@/components/AppPromo";
import QuickLinks from "@/components/QuickLinks";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f2f2f2]">
      <Hero />
      <QuickLinks />
      {/* Offers */}
      <div className="mt-14">
        <Offers />
      </div>
      <Destinations />
      <AppPromo />
      <Footer />
    </main>
  );
}
