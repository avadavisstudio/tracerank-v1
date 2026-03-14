type AdminFilterBarProps = {
  action: string;
  searchPlaceholder: string;
  defaultQuery?: string;
  defaultStatus?: string;
  statusOptions: string[];
};

export default function AdminFilterBar({
  action,
  searchPlaceholder,
  defaultQuery = "",
  defaultStatus = "",
  statusOptions,
}: AdminFilterBarProps) {
  return (
    <form
      action={action}
      method="GET"
      className="flex flex-col gap-3 rounded-3xl border border-neutral-200 p-4 md:flex-row md:items-center"
    >
      <input
        type="text"
        name="q"
        defaultValue={defaultQuery}
        placeholder={searchPlaceholder}
        className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-black md:max-w-sm"
      />

      <select
        name="status"
        defaultValue={defaultStatus}
        className="rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-black"
      >
        <option value="">All statuses</option>
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <div className="flex gap-3">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          Apply
        </button>

        <a
          href={action}
          className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-5 py-3 text-sm font-medium text-black transition hover:bg-neutral-50"
        >
          Reset
        </a>
      </div>
    </form>
  );
}
