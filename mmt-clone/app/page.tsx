import Hero from "@/components/home/Hero";
import Offers from "@/components/home/Offers";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f2f2f2]">
      <Hero />

      {/* Offers */}
      <div className="mt-14">
        <Offers />
      </div>
    </main>
  );
}
