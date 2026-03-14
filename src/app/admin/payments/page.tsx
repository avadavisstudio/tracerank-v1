import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import { supabaseAdmin } from "@/lib/supabase/admin";

function formatDate(value: string | null) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString();
}

function formatAmount(amount: number | null, currency: string | null) {
  if (typeof amount !== "number") return "—";

  const normalizedCurrency = (currency || "usd").toUpperCase();
  return `${normalizedCurrency} ${(amount / 100).toFixed(2)}`;
}

export default async function AdminPaymentsPage() {
  const { data: payments, error } = await supabaseAdmin
    .from("payments")
    .select(
      `
      id,
      stripe_checkout_session_id,
      stripe_payment_intent_id,
      stripe_customer_email,
      status,
      amount_total,
      currency,
      paid_at,
      audit_id,
      created_at
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message || "Failed to load payments.");
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
              Payments
            </h1>
            <p className="mt-4 text-base leading-7 text-neutral-700">
              Internal view of checkout sessions, payment state, customer email,
              amount, and linked audits.
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
                    <th className="px-6 py-4 font-medium text-neutral-600">Status</th>
                    <th className="px-6 py-4 font-medium text-neutral-600">Customer email</th>
                    <th className="px-6 py-4 font-medium text-neutral-600">Amount</th>
                    <th className="px-6 py-4 font-medium text-neutral-600">Paid at</th>
                    <th className="px-6 py-4 font-medium text-neutral-600">Checkout session</th>
                    <th className="px-6 py-4 font-medium text-neutral-600">Payment intent</th>
                    <th className="px-6 py-4 font-medium text-neutral-600">Audit</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-neutral-200 bg-white">
                  {(payments || []).length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-8 text-neutral-600">
                        No payments found yet.
                      </td>
                    </tr>
                  ) : (
                    (payments || []).map((payment) => (
                      <tr key={payment.id}>
                        <td className="px-6 py-4 text-neutral-700">
                          {formatDate(payment.created_at)}
                        </td>
                        <td className="px-6 py-4 text-neutral-700">
                          {payment.status}
                        </td>
                        <td className="px-6 py-4 text-neutral-700">
                          {payment.stripe_customer_email || "—"}
                        </td>
                        <td className="px-6 py-4 text-neutral-700">
                          {formatAmount(payment.amount_total, payment.currency)}
                        </td>
                        <td className="px-6 py-4 text-neutral-700">
                          {formatDate(payment.paid_at)}
                        </td>
                        <td className="px-6 py-4 text-neutral-700">
                          <div className="max-w-[220px] truncate">
                            {payment.stripe_checkout_session_id || "—"}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-neutral-700">
                          <div className="max-w-[220px] truncate">
                            {payment.stripe_payment_intent_id || "—"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {payment.audit_id ? (
                            <Link
                              href={`/audit/${payment.audit_id}`}
                              className="font-medium text-black underline underline-offset-4"
                            >
                              Open audit
                            </Link>
                          ) : (
                            <span className="text-neutral-500">—</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex gap-4 text-sm">
              <Link
                href="/admin/audits"
                className="font-medium text-black underline underline-offset-4"
              >
                View audits
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
