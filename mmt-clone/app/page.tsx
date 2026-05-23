import Hero from "@/components/home/Hero";
import Offers from "@/components/home/Offers";
import ExploreBar from "@/components/ExploreBar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f2f2f2]">
      <Hero />

      <div className="relative z-20 -mt-2">
        <ExploreBar />
      </div>

      <div className="mt-10">
        <Offers />
      </div>
    </main>
  );
}
