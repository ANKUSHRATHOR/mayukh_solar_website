import Link from "next/link";
import { Calculator, MessageCircle, Phone } from "lucide-react";
import { WHATSAPP_SURVEY_URL } from "@/lib/leads";

// Below 850px the header CTA is hidden, leaving phones with no visible way to
// act. This bar restores one; `body` gets matching padding so it never covers
// the footer.
export default function MobileCTABar() {
  return (
    <nav className="mobile-cta-bar" aria-label="Quick contact">
      <a href="tel:+919782767546"><Phone aria-hidden="true" />Call</a>
      <a href={WHATSAPP_SURVEY_URL} target="_blank" rel="noopener noreferrer">
        <MessageCircle aria-hidden="true" />WhatsApp
      </a>
      <Link href="/solar-calculator" className="is-primary">
        <Calculator aria-hidden="true" />Get estimate
      </Link>
    </nav>
  );
}
