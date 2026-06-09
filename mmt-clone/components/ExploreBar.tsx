import { exploreLinks } from "./data/exploreLinks";

export default function ExploreBar() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 pt-10 pb-20">
      <div className="flex flex-wrap items-center justify-around gap-6 rounded-full bg-white px-8 py-4 shadow-xl">
        {exploreLinks.map((item) => (
          <div
            key={item.title}
            className="flex cursor-pointer items-center gap-4 px-3"
          >
            <span className="text-4xl">{item.icon}</span>

            <div>
              <h4 className="text-sm leading-tight font-semibold">
                {item.title}
              </h4>

              <p className="text-xs text-gray-500">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
