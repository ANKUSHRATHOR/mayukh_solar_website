import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import SiteFooter from "@/components/SiteFooter";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Contact Mayukh Solar | Kota",
  description: "Request a solar survey from VR Enterprises Mayukh Solar in Kota, Rajasthan.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact Mayukh Solar | Kota", description: "Request a solar survey from VR Enterprises Mayukh Solar in Kota, Rajasthan.", url: "/contact" },
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="CONTACT MAYUKH SOLAR"
        title="Send the bill."
        accent="We’ll size it honestly."
        copy="One recent electricity bill and a roof or shed photo are enough to begin."
      />
      <section id="page-content" className="inner-section">
        <div className="shell contact-page-grid">
          <div className="contact-primary" data-reveal>
            <span>FASTEST WAY TO START</span>
            <h2>Talk directly to our Kota team.</h2>
            <p>Share your bill and site photo on WhatsApp. We’ll review your usage, roof and likely subsidy eligibility before arranging a survey.</p>
            <a href="https://wa.me/919782767546?text=Hello%20Mayukh%20Solar%2C%20I%20would%20like%20a%20solar%20site%20survey." target="_blank" rel="noopener noreferrer">
              <MessageCircle />Start on WhatsApp <b>→</b>
            </a>
          </div>
          <div className="contact-details">
            <article data-reveal>
              <Phone />
              <div><span>PHONE</span><a href="tel:+919782767546">+91 97827 67546</a></div>
            </article>
            <article data-reveal>
              <Mail />
              <div><span>EMAIL</span><a href="mailto:vrenterpriseskota@gmail.com">vrenterpriseskota@gmail.com</a></div>
            </article>
            <article data-reveal>
              <MapPin />
              <div><span>OFFICE</span><p>K-14, IPIA, Road No. 7<br />Kota, Rajasthan</p></div>
            </article>
            <article data-reveal>
              <MapPin />
              <div><span>REGISTERED ADDRESS</span><p>20, Keshavpura, Sector 7<br />Kota, Rajasthan</p></div>
            </article>
            <article data-reveal>
              <Clock />
              <div><span>SERVICE AREA</span><p>Kota · Baran · Bundi · Jhalawar<br />Bhilwara · Chittorgarh</p></div>
            </article>
          </div>
        </div>
        <div className="shell contact-form-block" data-reveal>
          <LeadForm
            source="contact-form"
            heading="Or leave your details instead"
            copy="Prefer not to open WhatsApp? Fill this in and our Kota team will call you back."
          />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
