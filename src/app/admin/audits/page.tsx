import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import { supabaseAdmin } from "@/lib/supabase/admin";

function formatDate(value: string | null) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString();
}

export default async function AdminAuditsPage() {
  const { data: audits, error } = await supabaseAdmin
    .from("audits")
    .select(
      `
      id,
      email,
      company,
      product_name,
      status,
      upload_rows,
      first_value_event,
      created_at,
      payment_id
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message || "Failed to load audits.");
  }

  return (
    <>
      <main className="min-h-screen bg-white text-black">
        <section className="border-b border-neutral-200">
          <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
              Internal Admin
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Audits
            </h1>
            <p className="mt-4 text-base leading-7 text-neutral-700">
              Internal view of uploaded audits, status, payment linkage, and delivery state.
            </p>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-7xl px-6 py-14 md:px-10">
            <div className="overflow-hidden rounded-3xl border border-neutral-200">
              <table className="min-w-full divide-y divide-neutral-200 text-left text-sm">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-6 py-4 font-medium text-neutral-600">Created</th>
                    <th className="px-6 py-4 font-medium text-neutral-600">Product</th>
                    <th className="px-6 py-4 font-medium text-neutral-600">Email</th>
                    <th className="px-6 py-4 font-medium text-neutral-600">Company</th>
                    <th className="px-6 py-4 font-medium text-neutral-600">Status</th>
                    <th className="px-6 py-4 font-medium text-neutral-600">Rows</th>
                    <th className="px-6 py-4 font-medium text-neutral-600">First value event</th>
                    <th className="px-6 py-4 font-medium text-neutral-600">Payment linked</th>
                    <th className="px-6 py-4 font-medium text-neutral-600">Audit</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-neutral-200 bg-white">
                  {(audits || []).length === 0 ? (
                    <tr>
                      <td colSpan={9} className="px-6 py-8 text-neutral-600">
                        No audits found yet.
                      </td>
                    </tr>
                  ) : (
                    (audits || []).map((audit) => (
                      <tr key={audit.id}>
                        <td className="px-6 py-4 text-neutral-700">
                          {formatDate(audit.created_at)}
                        </td>
                        <td className="px-6 py-4 font-medium text-neutral-900">
                          {audit.product_name || "Untitled Product"}
                        </td>
                        <td className="px-6 py-4 text-neutral-700">{audit.email}</td>
                        <td className="px-6 py-4 text-neutral-700">
                          {audit.company || "—"}
                        </td>
                        <td className="px-6 py-4 text-neutral-700">{audit.status}</td>
                        <td className="px-6 py-4 text-neutral-700">
                          {audit.upload_rows ?? 0}
                        </td>
                        <td className="px-6 py-4 text-neutral-700">
                          {audit.first_value_event || "—"}
                        </td>
                        <td className="px-6 py-4 text-neutral-700">
                          {audit.payment_id ? "Yes" : "No"}
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            href={`/audit/${audit.id}`}
                            className="font-medium text-black underline underline-offset-4"
                          >
                            Open
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
