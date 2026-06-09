export default function Navbar() {
  return (
    <nav className="bg-[#0B2239] text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left */}

        <div className="flex items-center gap-8">
          <h1 className="font-bold text-2xl">MMT</h1>

          <div className="hidden md:flex gap-6 text-sm">
            <p>Flights</p>

            <p>Hotels</p>

            <p>Homestays</p>

            <p>Holiday Packages</p>

            <p>Trains</p>

            <p>Buses</p>
          </div>
        </div>

        {/* Right */}

        <div className="flex items-center gap-5">
          <button className="bg-blue-500 px-4 py-2 rounded-lg">Login</button>

          <p className="text-sm">India | ENG</p>
        </div>
      </div>
    </nav>
  );
}
