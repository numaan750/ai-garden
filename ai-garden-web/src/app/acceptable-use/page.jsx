import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { us } from "@/app/constants/us";
import { SUPPORT_EMAIL } from "@/lib/site";

export const metadata = {
  title: "Acceptable Use Policy – AI Garden Content Safety Rules",
  description:
    "Read the AI Garden acceptable use policy and content safety rules for AI-generated garden design and visualization tools.",
};

export default function AcceptableUsePage() {
  return (
    <>
      <Navbar navLinks={us.navLinks} country="us" />
      <main className="bg-white text-black">
        <div className="mycontainer py-18 md:py-20">
          <div className="max-w-4xl space-y-10">
            <header className="space-y-4 border-b border-black/10 pb-8">
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-black">
                Content Safety
              </p>
              <h1 className="text-[30px] sm:text-[40px] md:text-[48px] font-bold leading-tight">
                Acceptable Use Policy
              </h1>
              <p className="text-[16px] sm:text-[18px] leading-8 text-black/80">
                AI Garden is an independent AI-assisted design and visualization tool. It helps
                users explore creative garden layouts, landscape ideas, and AI-generated garden
                concepts based on user inputs. We are not affiliated with Apple or any third-party
                model provider.
              </p>
            </header>

            <section className="space-y-4">
              <h2 className="text-[24px] font-bold">Allowed Use</h2>
              <p className="text-[16px] leading-8 text-black">
                You may use AI Garden to generate garden design ideas, landscape concepts,
                backyard layouts, planting inspiration, and AI-assisted visualizations for
                personal or professional planning purposes.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[24px] font-bold">Prohibited Content</h2>
              <p className="text-[16px] leading-8 text-black">
                You may not use AI Garden to create, request, upload, or attempt to generate
                content that is sexually explicit, nude, sexually suggestive, pornographic,
                exploitative, or otherwise NSFW.
              </p>
              <p className="text-[16px] leading-8 text-black">
                You also may not use the product for illegal, harmful, deceptive, abusive, hateful,
                violent, harassing, or privacy-invasive purposes, including any attempt to generate
                content involving minors or non-consensual sexual material.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[24px] font-bold">Moderation and Enforcement</h2>
              <p className="text-[16px] leading-8 text-black">
                Generation requests are subject to automated safety checks. Requests that appear to
                target unsafe, explicit, or disallowed content may be blocked or refused. We may
                suspend access to accounts that attempt to bypass these safeguards.
              </p>
              <p className="text-[16px] leading-8 text-black">
                We reserve the right to review abuse reports, investigate suspicious activity, and
                remove content or disable accounts when necessary to protect users, payment partners,
                and the platform.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-[24px] font-bold">Questions</h2>
              <p className="text-[16px] leading-8 text-black">
                If you have questions about this policy or need support, contact us at{" "}
                <a href={`mailto:${SUPPORT_EMAIL}`} className="underline">
                  {SUPPORT_EMAIL}
                </a>
                .
              </p>

              <div className="flex flex-wrap gap-3 pt-2 text-sm font-semibold">
                <Link
                  href="/privecypolice"
                  className="rounded-full border border-[#34B23D] px-4 py-2 text-[#34B23D]"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/conditions"
                  className="rounded-full border border-[#34B23D] px-4 py-2 text-[#34B23D]"
                >
                  Terms & Conditions
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer footer={us.footer} country="us" supportEmail={SUPPORT_EMAIL} />
    </>
  );
}