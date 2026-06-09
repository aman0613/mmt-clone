import Image from "next/image";
const destinations = [
  {
    city: "Goa",
    type: "Beach Paradise",
    image: "/goa.jpg",
  },
  {
    city: "Manali",
    type: "Mountain Escape",
    image: "/manali.jpg",
  },
  {
    city: "Dubai",
    type: "Luxury Travel",
    image: "/dubai.jpg",
  },
  {
    city: "Kerala",
    type: "Nature Retreat",
    image: "/kerala.jpg",
  },
];

export default function Destinations() {
  return (
    <section className="mx-auto max-w-6xl py-14">
      <h2 className="mb-8 text-4xl font-bold">Popular Destinations</h2>

      <div className="grid gap-5 md:grid-cols-4">
        {destinations.map((item) => (
          <div
            key={item.city}
            className="cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md transition hover:scale-105"
          >
            <Image
              src={item.image}
              alt={item.city}
              width={400}
              height={200}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="font-bold">{item.city}</h3>

              <p className="text-gray-500">{item.type}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
