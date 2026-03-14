import SiteFooter from "@/components/site-footer";
import AdminNav from "@/components/admin-nav";
import AdminFilterBar from "@/components/admin-filter-bar";
import { supabaseAdmin } from "@/lib/supabase/admin";

function formatDate(value: string | null) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString();
}

type AdminInquiriesPageProps = {
  searchParams: Promise<{
    q?: string;
    status?: string;
  }>;
};

export default async function AdminInquiriesPage({
  searchParams,
}: AdminInquiriesPageProps) {
  const params = await searchParams;
  const q = (params.q || "").trim();
  const status = (params.status || "").trim();

  let query = supabaseAdmin
    .from("inquiries")
    .select(
      `
      id,
      name,
      email,
      company,
      product_name,
      website,
      message,
      status,
      created_at
    `
    )
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  if (q) {
    query = query.or(
      `name.ilike.%${q}%,email.ilike.%${q}%,company.ilike.%${q}%,product_name.ilike.%${q}%`
    );
  }

  const { data: inquiries, error } = await query;

  if (error) {
    throw new Error(error.message || "Failed to load inquiries.");
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
              Inquiries
            </h1>
            <p className="mt-4 text-base leading-7 text-neutral-700">
              Internal view of inbound interest, company context, and requested help.
            </p>

            <div className="mt-8">
              <AdminNav current="inquiries" />
            </div>

            <div className="mt-6">
              <AdminFilterBar
                action="/admin/inquiries"
                searchPlaceholder="Search name, email, company, or product"
                defaultQuery={q}
                defaultStatus={status}
                statusOptions={["new", "contacted", "qualified", "closed"]}
              />
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-7xl px-6 py-14 md:px-10">
            <div className="mb-4 text-sm text-neutral-600">
              {(inquiries || []).length} result{(inquiries || []).length === 1 ? "" : "s"}
            </div>

            <div className="space-y-4">
              {(inquiries || []).length === 0 ? (
                <div className="rounded-3xl border border-neutral-200 p-6 text-neutral-600">
                  No inquiries found.
                </div>
              ) : (
                (inquiries || []).map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className="rounded-3xl border border-neutral-200 p-6"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <p className="text-lg font-semibold text-neutral-900">
                          {inquiry.name}
                        </p>
                        <p className="mt-1 text-sm text-neutral-700">
                          {inquiry.email}
                        </p>
                        <p className="mt-1 text-sm text-neutral-700">
                          {inquiry.company || "No company"}{" "}
                          {inquiry.product_name ? `• ${inquiry.product_name}` : ""}
                        </p>
                        <p className="mt-1 text-sm text-neutral-700">
                          {inquiry.website || "No website"}
                        </p>
                      </div>

                      <div className="text-sm text-neutral-600">
                        <p>Status: {inquiry.status}</p>
                        <p className="mt-1">{formatDate(inquiry.created_at)}</p>
                      </div>
                    </div>

                    <div className="mt-5 rounded-2xl bg-neutral-50 p-4">
                      <p className="text-sm leading-7 text-neutral-800">
                        {inquiry.message}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
