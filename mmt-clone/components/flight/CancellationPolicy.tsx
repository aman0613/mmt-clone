export default function CancellationPolicy() {
  return (
    <div className="mb-6 rounded-lg border p-6">
      <h2 className="mb-3 text-lg font-semibold">Cancellation Policy</h2>

      <ul className="ml-5 list-disc">
        <li>Free cancellation within 24 hours.</li>
        <li>50% cancellation charge afterwards.</li>
        <li>No refund within 4 hours of departure.</li>
      </ul>
    </div>
  );
}
