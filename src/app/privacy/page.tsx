import SiteFooter from "@/components/site-footer";

export default function PrivacyPage() {
  return (
    <>
      <main className="min-h-screen bg-white text-black">
        <section className="border-b border-neutral-200">
          <div className="mx-auto max-w-4xl px-6 py-16 md:px-10">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
              Privacy
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-base leading-7 text-neutral-700">
              TraceRank collects limited information needed to process paid audits,
              including contact details, uploaded CSV event data, and related product
              context submitted through the intake flow.
            </p>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-4xl space-y-10 px-6 py-14 text-base leading-8 text-neutral-800 md:px-10">
            <div>
              <h2 className="text-2xl font-semibold">What we collect</h2>
              <p className="mt-3">
                We may collect your name, email, company, uploaded CSV files, event-log
                contents, and product information submitted for the purpose of performing
                an activation audit.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold">How we use it</h2>
              <p className="mt-3">
                Submitted data is used only to process, analyze, and deliver your paid
                TraceRank audit and related service communications.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold">Data handling</h2>
              <p className="mt-3">
                Uploaded data is stored in third-party infrastructure used to operate the
                service. Do not submit regulated, unlawful, or highly sensitive personal
                data that is not necessary for activation analysis.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold">Contact</h2>
              <p className="mt-3">
                For privacy-related questions, contact: ava@avadavisstudio.com
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
