import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { us } from "@/app/constants/us";
import { SUPPORT_EMAIL } from "@/lib/site";

export const metadata = {
  title: "Manage AI Garden Subscription – Billing and Cancellation Help",
  description:
    "Manage or cancel your AI Garden subscription, access billing controls, and get support for your account and payments.",
};

export default function ManageSubscriptionPage() {
  return (
    <>
      <Navbar navLinks={us.navLinks} country="us" />
      <main className="bg-white text-black">
        <div className="mycontainer py-18 md:py-20">
          <div className="max-w-full space-y-10">
            <header className="space-y-4 border-b border-[#C4D0BB] pb-8">
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-black">
                Subscription Controls
              </p>
              <h1 className="text-[30px] sm:text-[40px] md:text-[48px] font-bold leading-tight">
                Manage or Cancel Your Subscription
              </h1>
              <p className="text-[16px] sm:text-[18px] leading-8 text-black">
                AI Garden makes subscription management simple and transparent.
                You can review your plan, manage billing details, and cancel
                your subscription anytime from your account dashboard.
              </p>
            </header>

            <section className="rounded-3xl border border-[#C4D0BB] bg-gradient-to-b from-[#34B23D]/30 to-[#164C1A]/30 p-6 md:p-8 space-y-5">
              <h2 className="text-2xl font-bold bg-gradient-to-b from-[#34B23D] to-[#164C1A] bg-clip-text text-transparent">
                For web subscriptions
              </h2>
              <p className="text-[16px] leading-8 text-black">
                Log in to your account dashboard to view your active plan, check
                payment history, update billing details, or manage renewal
                settings for your AI Garden subscription.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/login"
                  className="inline-flex rounded-full bg-gradient-to-b from-[#34B23D] to-[#164C1A] px-5 py-3 text-white font-medium hover:bg-gray-600 transition-colors"
                >
                  Open Dashboard Login
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex rounded-full border border-[#152b05] px-5 py-3 bg-gradient-to-b from-[#34B23D] to-[#164C1A] bg-clip-text text-transparent font-medium hover:text-white transition-colors"
                >
                  View Pricing Plans
                </Link>
              </div>
            </section>

            <section className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#34B23D]/30 to-[#164C1A]/30 p-6 space-y-3">
                <h2 className="text-2xl font-bold bg-gradient-to-b from-[#34B23D] to-[#164C1A] bg-clip-text text-transparent">
                  Need billing help?
                </h2>
                <p className="text-[16px] leading-8 text-black">
                  If you are unable to access your subscription or need help
                  identifying a payment, our support team is here to help.
                </p>

                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="inline-flex rounded-full border border-[#152b05] px-5 py-3 bg-gradient-to-b from-[#34B23D] to-[#164C1A] bg-clip-text text-transparent font-medium hover:text-white transition-colors"
                >
                  {SUPPORT_EMAIL}
                </a>
              </div>

              <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#34B23D]/30 to-[#164C1A]/30 p-6 space-y-3">
                <h2 className="text-2xl font-bold bg-gradient-to-b from-[#34B23D] to-[#164C1A] bg-clip-text text-transparent">
                  Before you cancel
                </h2>
                <p className="text-[16px] leading-8 text-black">
                  Cancelling stops future renewals, but your current plan
                  remains active until the end of the billing period.
                </p>
                <p className="text-[16px] leading-8 text-black">
                  If you cannot access your dashboard or need help matching a
                  payment, contact support using the email used at checkout.
                </p>

                <div className="flex flex-wrap gap-3 pt-2 text-sm font-semibold">
                  <Link
                    href="/pricing"
                    className="rounded-full border border-[#152b05] px-4 py-2 bg-gradient-to-b from-[#34B23D] to-[#164C1A] bg-clip-text text-transparent font-medium hover:text-white transition-colors"
                  >
                    Pricing Details
                  </Link>
                  <Link
                    href="/login"
                    className="rounded-full border border-[#152b05] px-4 py-2 bg-gradient-to-b from-[#34B23D] to-[#164C1A] bg-clip-text text-transparent font-medium hover:text-white transition-colors"
                  >
                    Open Dashboard
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer footer={us.footer} country="us" supportEmail={SUPPORT_EMAIL} />
    </>
  );
}
