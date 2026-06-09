"use client";

type Props = {
  adults: number;
  children: number;
  infants: number;

  setAdults: React.Dispatch<React.SetStateAction<number>>;
  setChildren: React.Dispatch<React.SetStateAction<number>>;
  setInfants: React.Dispatch<React.SetStateAction<number>>;

  travelClass: string;
  setTravelClass: React.Dispatch<React.SetStateAction<string>>;

  onClose: () => void;
};

export default function TravellerPopup({
  adults,
  children,
  infants,
  setAdults,
  setChildren,
  setInfants,
  travelClass,
  setTravelClass,
  onClose,
}: Props) {
  const classes = ["Economy", "Premium Economy", "Business"];

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute top-full left-0 z-50 mt-2 w-80 rounded-2xl bg-white p-5 shadow-xl"
    >
      <div className="space-y-5">
        <Counter
          title="Adults"
          subtitle="12+ Years"
          value={adults}
          onMinus={() => adults > 1 && setAdults(adults - 1)}
          onPlus={() => setAdults(adults + 1)}
        />

        <Counter
          title="Children"
          subtitle="2-12 Years"
          value={children}
          onMinus={() => children > 0 && setChildren(children - 1)}
          onPlus={() => setChildren(children + 1)}
        />

        <Counter
          title="Infants"
          subtitle="0-2 Years"
          value={infants}
          onMinus={() => infants > 0 && setInfants(infants - 1)}
          onPlus={() => setInfants(infants + 1)}
        />

        <div>
          <p className="mb-3 font-semibold">Travel Class</p>

          <div className="flex flex-wrap gap-2">
            {classes.map((item) => (
              <button
                key={item}
                onClick={() => setTravelClass(item)}
                className={`cursor-pointer rounded-full border px-4 py-2 text-sm ${
                  travelClass === item ? "bg-blue-500 text-white" : ""
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full rounded-full bg-blue-500 py-3 text-white"
        >
          APPLY
        </button>
      </div>
    </div>
  );
}

type CounterProps = {
  title: string;
  subtitle: string;
  value: number;
  onMinus: () => void;
  onPlus: () => void;
};

function Counter({ title, subtitle, value, onMinus, onPlus }: CounterProps) {
  return (
    <div className="flex cursor-default items-center justify-between">
      <div>
        <h3 className="font-semibold">{title}</h3>

        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onMinus}
          className="h-8 w-8 cursor-pointer rounded-full border"
        >
          −
        </button>

        <span>{value}</span>

        <button
          onClick={onPlus}
          className="h-8 w-8 cursor-pointer rounded-full border"
        >
          +
        </button>
      </div>
    </div>
  );
}
