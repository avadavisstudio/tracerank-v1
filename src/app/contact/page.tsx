import SiteFooter from "@/components/site-footer";

export default function ContactPage() {
  return (
    <>
      <main className="min-h-screen bg-white text-black">
        <section className="border-b border-neutral-200">
          <div className="mx-auto max-w-4xl px-6 py-16 md:px-10">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
              Contact
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Contact TraceRank
            </h1>
            <p className="mt-4 text-base leading-7 text-neutral-700">
              For support, audit questions, or business inquiries, use the contact
              information below.
            </p>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-4xl space-y-8 px-6 py-14 text-base leading-8 text-neutral-800 md:px-10">
            <div className="rounded-3xl border border-neutral-200 p-6">
              <h2 className="text-2xl font-semibold">Support</h2>
              <p className="mt-3">ava@avadavisstudio.com</p>
            </div>

            <div className="rounded-3xl border border-neutral-200 p-6">
              <h2 className="text-2xl font-semibold">Business inquiries</h2>
              <p className="mt-3">Ava Davis Studio LLC</p>
              <p>Activation diagnostics and journey audit services</p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
