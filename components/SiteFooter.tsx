import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

const explore = [
  ["Home", "/"],
  ["About us", "/about"],
  ["Services", "/services"],
  ["Projects", "/projects"],
  ["Solar calculator", "/solar-calculator"],
  ["FAQ", "/faq"],
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Link className="footer-logo" href="/">
            <img src="/vr-logo-white.webp" alt="VR Enterprises Mayukh Solar" width={180} height={68} loading="lazy" decoding="async" />
          </Link>
          <p>Rooftop, tin shed and ground-mount solar EPC across Kota and the Hadoti region since 2020.</p>
        </div>
        <div>
          <h3>Explore</h3>
          {explore.map(([label, href]) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
        </div>
        <div>
          <h3>Solutions</h3>
          <span>Residential rooftop</span>
          <span>Commercial &amp; industrial</span>
          <span>PM KUSUM ground-mount</span>
          <span>Operations &amp; maintenance</span>
        </div>
        <div>
          <h3>Contact</h3>
          <a href="tel:+919782767546"><Phone />+91 97827 67546</a>
          <a href="mailto:vrenterpriseskota@gmail.com"><Mail />vrenterpriseskota@gmail.com</a>
          <span><MapPin />K-14, IPIA, Road No. 7, Kota</span>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} VR Enterprises · Mayukh Solar</span>
        <span>Kota · Baran · Bundi · Jhalawar · Bhilwara · Chittorgarh</span>
      </div>
    </footer>
  );
}
