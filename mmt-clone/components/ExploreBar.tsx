import { exploreLinks } from "./data/exploreLinks";

export default function ExploreBar() {
  return (
    <div className="mx-auto max-w-5xl px-4">
      <div className="flex items-center justify-between rounded-full bg-white px-8 py-4 shadow-lg">
        {exploreLinks.map((item) => (
          <div key={item.title} className="flex items-center gap-3">
            <span className="text-2xl">{item.icon}</span>

            <div>
              <h4 className="text-sm font-semibold">{item.title}</h4>

              <p className="text-xs text-gray-500">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
