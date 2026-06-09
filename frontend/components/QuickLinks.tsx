const links = [
  { title: "Flights", icon: "✈️" },
  { title: "Hotels", icon: "🏨" },
  { title: "Buses", icon: "🚌" },
  { title: "Trains", icon: "🚆" },
  { title: "Holidays", icon: "🗺️" },
  { title: "Forex", icon: "💳" },
];

export default function QuickLinks() {
  return (
    <section className="mx-auto max-w-6xl py-10">
      <div className="grid grid-cols-2 gap-5 md:grid-cols-6">
        {links.map((item) => (
          <div
            key={item.title}
            className="cursor-pointer rounded-2xl bg-white p-6 text-center shadow-md transition-all hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-3xl">
              {item.icon}
            </div>

            <p className="mt-4 font-medium">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
