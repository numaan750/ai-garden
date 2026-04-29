import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { us } from "@/app/constants/us";
import { PUBLIC_PRICING, SUPPORT_EMAIL } from "@/lib/site";

export const metadata = {
  title: "AI Garden Pricing – AI Garden Design Subscription Plans",
  description:
    "Review AI Garden pricing, renewal terms, cancellation details, and subscription options for AI-powered garden design and landscape planning features.",
};

export default function PricingPage() {
  return (
    <>
      <Navbar navLinks={us.navLinks} country="us" />
      <main className="bg-white text-black">
        <div className="mycontainer py-18 md:py-20">
          <div className="space-y-10">
            <header className="space-y-4 border-b border-[#C4D0BB] pb-8">
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-black">
                Billing Transparency
              </p>
              <h1 className="text-[30px] sm:text-[40px] md:text-[48px] font-bold leading-tight">
                AI Garden Pricing
              </h1>
              <p className="text-[16px] sm:text-[18px] leading-8 text-black max-w-full">
                AI Garden offers transparent premium pricing for AI-powered garden
                design, landscape ideas, and outdoor space visualizations. Plans
                renew automatically until cancelled, and checkout plus subscription
                management are handled through our secure payment provider.
              </p>
            </header>

            <section className="grid gap-6 md:grid-cols-2">
              {PUBLIC_PRICING.map((plan) => (
                <article
                  key={plan.id}
                  className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#34B23D]/30 to-[#164C1A]/30 p-6 shadow-sm"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] bg-gradient-to-b from-[#34B23D] to-[#164C1A] bg-clip-text text-transparent">
                    {plan.name}
                  </p>
                  <div className="mt-4 space-y-2">
                    <h2 className="text-3xl font-bold bg-gradient-to-b from-[#34B23D] to-[#164C1A] bg-clip-text text-transparent">
                      {plan.price}
                    </h2>
                    <p className="text-black">{plan.cadence}</p>
                    <p className="text-black font-medium">{plan.summary}</p>
                    <p className="text-black">{plan.renewal}</p>
                  </div>
                </article>
              ))}
            </section>

            <section className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#34B23D]/30 to-[#164C1A]/30 p-6 space-y-4">
                <h2 className="text-2xl font-bold bg-gradient-to-b from-[#34B23D] to-[#164C1A] bg-clip-text text-transparent">Renewal and Cancellation</h2>
                <p className="text-[16px] leading-8 text-black">
                  Premium plans renew automatically on the same billing cycle
                  unless cancelled before the next renewal date.
                </p>
                <p className="text-[16px] leading-8 text-black">
                  You can manage your subscription anytime from your account dashboard,
                  including viewing billing history, updating payment methods, and
                  cancelling your plan.
                </p>

                <div className="flex flex-wrap gap-3 pt-2 text-sm font-semibold">
                  <Link
                    href="/manage-subscription"
                    className="rounded-full border border-[#34B23D] px-4 py-2 bg-gradient-to-b from-[#34B23D] to-[#164C1A] bg-clip-text text-transparent"
                  >
                    Manage Subscription
                  </Link>
                  <Link
                    href="/login"
                    className="rounded-full border border-[#34B23D] px-4 py-2 bg-gradient-to-b from-[#34B23D] to-[#164C1A] bg-clip-text text-transparent"
                  >
                    Account Login
                  </Link>
                  <Link
                    href="/blog"
                    className="rounded-full border border-[#34B23D] px-4 py-2 bg-gradient-to-b from-[#34B23D] to-[#164C1A] bg-clip-text text-transparent"
                  >
                    Read the Blog
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#34B23D]/30 to-[#164C1A]/30 p-6 space-y-4">
                <h2 className="text-2xl font-bold bg-gradient-to-b from-[#34B23D] to-[#164C1A] bg-clip-text text-transparent">Billing Support</h2>
                <p className="text-[16px] leading-8 text-black">
                  For billing questions, account access issues, or subscription support,
                  contact our support team anytime.
                </p>

                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="inline-flex rounded-full border border-[#34B23D] px-5 py-3 bg-gradient-to-b from-[#34B23D] to-[#164C1A] bg-clip-text text-transparent font-medium"
                >
                  {SUPPORT_EMAIL}
                </a>

                <p className="text-sm text-gray-500">
                  Final pricing, taxes, and currency conversion are shown at checkout
                  and may vary depending on your region and payment provider settings.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer footer={us.footer} country="us" supportEmail={SUPPORT_EMAIL} />
    </>
  );
}