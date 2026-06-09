interface Props {
  price: number;
}

export default function FareSummary({ price }: Props) {
  const taxes = 1200;

  return (
    <div className="mb-6 rounded-lg border p-6">
      <h2 className="mb-3 text-lg font-semibold">Fare Summary</h2>

      <p>Base Fare: ₹{price}</p>

      <p>Taxes & Fees: ₹{taxes}</p>

      <h3 className="mt-2 font-bold">Total: ₹{price + taxes}</h3>
    </div>
  );
}
