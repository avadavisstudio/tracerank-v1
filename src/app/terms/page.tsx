import SiteFooter from "@/components/site-footer";

export default function TermsPage() {
  return (
    <>
      <main className="min-h-screen bg-white text-black">
        <section className="border-b border-neutral-200">
          <div className="mx-auto max-w-4xl px-6 py-16 md:px-10">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
              Terms
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Terms of Service
            </h1>
            <p className="mt-4 text-base leading-7 text-neutral-700">
              TraceRank provides paid diagnostic services based on customer-submitted
              journey data. Purchase of a founding audit grants one audit review for one
              submitted journey dataset unless otherwise stated.
            </p>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-4xl space-y-10 px-6 py-14 text-base leading-8 text-neutral-800 md:px-10">
            <div>
              <h2 className="text-2xl font-semibold">Service scope</h2>
              <p className="mt-3">
                TraceRank provides directional diagnostic analysis, not legal, financial,
                clinical, cybersecurity, or guaranteed business-performance advice.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold">Customer responsibility</h2>
              <p className="mt-3">
                You are responsible for the accuracy, legality, and right to submit the
                data you upload. Do not submit data you are not authorized to share.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold">Refunds</h2>
              <p className="mt-3">
                Because audits begin once intake is submitted and processing starts,
                refunds are not guaranteed after work has begun. Any exception is handled
                at company discretion.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold">Limitation</h2>
              <p className="mt-3">
                TraceRank is delivered as a best-effort diagnostic service. No guarantee
                is made that implementing recommendations will produce specific revenue,
                conversion, or product outcomes.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
