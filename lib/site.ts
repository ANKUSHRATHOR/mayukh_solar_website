// Canonical origin for metadata, sitemap and structured data. Set
// NEXT_PUBLIC_SITE_URL to the live domain once it is pointed at the deployment;
// until then these URLs are placeholders and search engines cannot use them.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://mayukhsolar.com").replace(/\/$/, "");

export const BUSINESS = {
  name: "VR Enterprises · Mayukh Solar",
  legalName: "VR Enterprises",
  phone: "+91-97827-67546",
  email: "vrenterpriseskota@gmail.com",
  street: "K-14, IPIA, Road No. 7",
  locality: "Kota",
  region: "Rajasthan",
  postalCode: "324005",
  country: "IN",
  founded: "2020",
} as const;

export const SERVED_DISTRICTS = ["Kota", "Baran", "Bundi", "Jhalawar", "Bhilwara", "Chittorgarh"] as const;

export const ROUTES = [
  { path: "/", priority: 1.0 },
  { path: "/services", priority: 0.9 },
  { path: "/solar-calculator", priority: 0.9 },
  { path: "/projects", priority: 0.8 },
  { path: "/faq", priority: 0.8 },
  { path: "/about", priority: 0.7 },
  { path: "/company-profile", priority: 0.6 },
  { path: "/contact", priority: 0.8 },
] as const;
