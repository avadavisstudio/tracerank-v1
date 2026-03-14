import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-neutral-600 md:flex-row md:items-center md:justify-between md:px-10">
        <div>
          <p className="font-medium text-black">TraceRank</p>
          <p className="mt-1">
            Paid activation diagnostics for B2B SaaS and AI onboarding flows.
          </p>
        </div>

        <nav className="flex flex-wrap gap-4">
          <Link href="/specimen" className="hover:text-black">
            Specimen
          </Link>
          <Link href="/privacy" className="hover:text-black">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-black">
            Terms
          </Link>
          <Link href="/contact" className="hover:text-black">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
