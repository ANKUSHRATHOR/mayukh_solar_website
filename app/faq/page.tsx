import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import SiteFooter from "@/components/SiteFooter";
import LeadForm from "@/components/LeadForm";
import { FAQS } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Solar FAQ | Subsidy, Net Metering & Timelines | Mayukh Solar",
  description: "Answers on PM Surya Ghar subsidy slabs, net metering, system sizing, timelines and maintenance for rooftop solar in Kota and the Hadoti region.",
  alternates: { canonical: "/faq" },
  openGraph: { title: "Solar FAQ | Subsidy, Net Metering & Timelines | Mayukh Solar", description: "Answers on PM Surya Ghar subsidy slabs, net metering, system sizing, timelines and maintenance for rooftop solar in Kota and the Hadoti region.", url: "/faq" },
};

// FAQPage structured data, generated from the same source as the page body.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function FaqPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageHero
        eyebrow="QUESTIONS & ANSWERS"
        title="Straight answers,"
        accent="before you commit."
        copy="Subsidy, net metering, timelines and maintenance — the things people actually ask us on the first call."
      />
      <section id="page-content" className="inner-section">
        <div className="shell faq-list">
          {FAQS.map(({ q, a }, i) => (
            <details key={q} className="faq-item" data-reveal open={i === 0}>
              <summary>
                <span>{q}</span>
                <i aria-hidden="true" />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
        <div className="shell faq-cta" data-reveal>
          <div>
            <span>STILL UNSURE?</span>
            <h2>Ask us the question that isn&apos;t here.</h2>
            <p>Send a recent bill and a roof photo and we will answer with an honest system size, not a sales pitch.</p>
          </div>
          <a
            className="button button-gold"
            href="https://wa.me/919782767546?text=Hello%20Mayukh%20Solar%2C%20I%20have%20a%20question%20about%20rooftop%20solar."
            target="_blank"
            rel="noopener noreferrer"
          >
            Ask on WhatsApp <ArrowRight />
          </a>
        </div>
        <div className="shell faq-form" data-reveal>
          <LeadForm source="faq" heading="Or have us call you" copy="Leave your number and our Kota team will call back with answers for your specific site." />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
