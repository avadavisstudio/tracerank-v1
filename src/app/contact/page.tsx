import SiteFooter from "@/components/site-footer";
import ContactForm from "@/components/contact-form";

export default function ContactPage() {
  return (
    <>
      <main className="min-h-screen bg-white text-black">
        <section className="border-b border-neutral-200">
          <div className="mx-auto max-w-5xl px-6 py-16 md:px-10">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
              Contact
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Contact TraceRank
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-700">
              Ask a question, request a sample review, or tell me about your
              product and activation flow.
            </p>
          </div>
        </section>

        <section>
          <div className="mx-auto grid max-w-5xl gap-10 px-6 py-14 md:px-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <ContactForm />
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-neutral-200 p-6">
                <p className="text-sm font-semibold text-neutral-900">
                  Best use cases
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-neutral-700">
                  <li>B2B SaaS onboarding breakdowns</li>
                  <li>AI tool activation friction</li>
                  <li>Verification and setup drop-off</li>
                  <li>Delayed first-value flows</li>
                </ul>
              </div>

              <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6">
                <p className="text-sm font-semibold text-neutral-900">
                  Direct contact
                </p>
                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  ava@avadavisstudio.com
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
