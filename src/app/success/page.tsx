export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-white text-black px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm tracking-[0.2em] uppercase text-neutral-500">
          Payment Complete
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Audit received
        </h1>
        <p className="mt-4 text-base text-neutral-700">
          Your upload and analysis flow will continue from here.
        </p>
      </div>
    </main>
  );
}
