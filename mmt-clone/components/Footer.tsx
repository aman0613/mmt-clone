export default function Footer() {
  return (
    <footer className="mt-20 bg-[#0b2239] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <h3 className="mb-4 text-xl font-bold">About Us</h3>

          <p className="text-sm text-gray-300">
            MakeMyTrip clone built with Next.js and Tailwind. Book flights,
            hotels, buses and holidays easily.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-bold">Company</h3>

          <ul className="space-y-2 text-gray-300">
            <li>About</li>
            <li>Careers</li>
            <li>Investor Relations</li>
            <li>Press</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-bold">Support</h3>

          <ul className="space-y-2 text-gray-300">
            <li>Contact</li>
            <li>FAQs</li>
            <li>Cancellation</li>
            <li>Refund Policy</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-bold">Follow</h3>

          <div className="flex gap-4 text-3xl">
            <span>📘</span>
            <span>📷</span>
            <span>🐦</span>
            <span>▶️</span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 py-5 text-center text-sm text-gray-400">
        © 2026 MMT Clone. All rights reserved.
      </div>
    </footer>
  );
}
