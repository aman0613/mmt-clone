import { exploreLinks } from "./data/exploreLinks";

export default function ExploreBar() {
  return (
    <div className="mx-auto max-w-4xl px-4">
      <div className="flex items-center justify-around rounded-full bg-white px-6 py-3 shadow-xl">
        {exploreLinks.map((item) => (
          <div
            key={item.title}
            className="flex cursor-pointer items-center gap-2 px-2"
          >
            <span className="text-lg">{item.icon}</span>

            <div>
              <h4 className="text-xs leading-none font-semibold">
                {item.title}
              </h4>

              <p className="mt-1 text-[10px] text-gray-500">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
