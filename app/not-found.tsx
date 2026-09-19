import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <main>
      <SiteHeader />
      <section id="page-content" className="status-page">
        <div className="shell">
          <div className="section-kicker">404 · PAGE NOT FOUND</div>
          <h1>This page isn&apos;t here.</h1>
          <p>The link may be out of date. Everything on the site is one step away below.</p>
          <div className="status-actions">
            <Link className="button button-gold" href="/">Back to home <ArrowRight /></Link>
            <Link className="text-link" href="/solar-calculator">Size your system <span>↘</span></Link>
          </div>
          <nav className="status-links" aria-label="Site sections">
            <Link href="/services">Services</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
