import Link from "next/link";

type AdminNavProps = {
  current: "audits" | "payments";
};

export default function AdminNav({ current }: AdminNavProps) {
  const baseClass =
    "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition";
  const activeClass = "bg-black text-white";
  const inactiveClass = "border border-neutral-300 text-black hover:bg-neutral-50";

  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href="/admin/audits"
        className={`${baseClass} ${
          current === "audits" ? activeClass : inactiveClass
        }`}
      >
        Audits
      </Link>

      <Link
        href="/admin/payments"
        className={`${baseClass} ${
          current === "payments" ? activeClass : inactiveClass
        }`}
      >
        Payments
      </Link>

      <Link
        href="/"
        className={`${baseClass} ${inactiveClass}`}
      >
        Public site
      </Link>
    </div>
  );
}
