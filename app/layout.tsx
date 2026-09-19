import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import MotionEffects from "@/components/MotionEffects";
import Analytics from "@/components/Analytics";
import MobileCTABar from "@/components/MobileCTABar";
import { BUSINESS, SERVED_DISTRICTS, SITE_URL } from "@/lib/site";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

const TITLE = "VR Enterprises | Mayukh Solar | Kota";
const DESCRIPTION =
  "Rooftop, tin shed and ground-mount solar EPC across Kota and the Hadoti region. PM Surya Ghar authorised vendor and PM KUSUM project executor.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s" },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    type: "website",
    siteName: BUSINESS.name,
    locale: "en_IN",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/solar-hero.webp", width: 1672, height: 941, alt: "Rooftop solar installation by Mayukh Solar, Kota" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/solar-hero.webp"],
  },
};

// LocalBusiness data drives the map/knowledge panel for "solar in Kota"
// searches, which is the traffic this business actually competes for.
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: BUSINESS.name,
  legalName: BUSINESS.legalName,
  description: DESCRIPTION,
  url: SITE_URL,
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  foundingDate: BUSINESS.founded,
  image: `${SITE_URL}/solar-hero.webp`,
  logo: `${SITE_URL}/vr-logo-white.webp`,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.street,
    addressLocality: BUSINESS.locality,
    addressRegion: BUSINESS.region,
    postalCode: BUSINESS.postalCode,
    addressCountry: BUSINESS.country,
  },
  areaServed: SERVED_DISTRICTS.map((name) => ({ "@type": "City", name })),
  knowsAbout: [
    "Rooftop solar installation",
    "PM Surya Ghar Muft Bijli Yojana",
    "PM KUSUM",
    "Net metering",
    "Solar EPC",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }} />
        <a className="skip-link" href="#page-content">Skip to content</a>
        {children}
        <MobileCTABar />
        <MotionEffects />
        <Analytics />
      </body>
    </html>
  );
}
