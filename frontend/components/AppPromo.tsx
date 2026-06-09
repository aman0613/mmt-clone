import Image from "next/image";

export default function AppPromo() {
  return (
    <section className="mx-auto max-w-6xl py-10">
      <div className="flex flex-col items-center justify-between gap-8 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 px-10 py-10 text-white shadow-xl md:flex-row">
        <div>
          <p className="text-sm uppercase opacity-80">MakeMyTrip App</p>

          <h2 className="mt-2 text-4xl font-bold">Book Faster on Mobile</h2>

          <p className="mt-4 max-w-lg text-lg opacity-90">
            Get exclusive app-only offers, quicker booking, and instant travel
            updates.
          </p>

          <button className="mt-6 rounded-full bg-white px-6 py-3 font-semibold text-blue-600">
            Download App
          </button>
        </div>

        <Image
          src="/mobile.png"
          alt="app"
          width={260}
          height={500}
          className="object-contain"
        />
      </div>
    </section>
  );
}
