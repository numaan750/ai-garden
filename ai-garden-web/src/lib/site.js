export const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.aisoulmatedrawings.com";

export function absoluteUrl(pathname = "/") {
  try {
    return new URL(pathname, SITE_URL).toString();
  } catch {
    return `${SITE_URL}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
  }
}

export const SUPPORT_EMAIL =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@aigardendesign.com";

  export const PUBLIC_PRICING = [
  {
    id: "yearly",
    name: "Yearly Plan",
    price: "$30.00",
    cadence: "per year",
    summary: "$2.50/month billed annually.",
    renewal: "Auto-renews yearly until cancelled.",
  },
  {
    id: "monthly",
    name: "Monthly Plan",
    price: "$11.95",
    cadence: "per month",
    summary: "Flexible monthly access.",
    renewal: "Auto-renews monthly until cancelled.",
  },
];

export function getPricingPlan(planId) {
  return PUBLIC_PRICING.find((plan) => plan.id === planId) || null;
}