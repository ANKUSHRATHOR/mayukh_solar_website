"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Projects", "/projects"],
  ["Solar Calculator", "/solar-calculator"],
  ["Company Profile", "/company-profile"],
  ["FAQ", "/faq"],
  ["Contact", "/contact"],
];

export default function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDetailsElement>(null);

  // Client-side navigation no longer reloads the document, so the <details>
  // menu has to be closed explicitly when the route changes.
  useEffect(() => {
    if (menuRef.current) menuRef.current.open = false;
  }, [pathname]);

  return (
    <header className={`site-header ${overlay ? "is-overlay" : "is-solid"}`}>
      <div className="top-strip">
        <div className="shell">
          <span>PM Surya Ghar authorised vendor · Serving 6 districts from Kota</span>
          <div>
            <a href="tel:+919782767546">+91 97827 67546</a>
            <a href="mailto:vrenterpriseskota@gmail.com">vrenterpriseskota@gmail.com</a>
          </div>
        </div>
      </div>
      <div className="main-nav shell">
        <Link className="brand-logo" href="/" aria-label="VR Enterprises Mayukh Solar home">
          <img src="/vr-logo-white.webp" alt="VR Enterprises Mayukh Solar" width={180} height={68} fetchPriority="high" />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>
              {label}
            </Link>
          ))}
        </nav>
        <a
          className="header-quote"
          href="https://wa.me/919782767546?text=Hello%20Mayukh%20Solar%2C%20I%20would%20like%20a%20solar%20site%20survey."
          target="_blank"
          rel="noopener noreferrer"
        >
          Free site survey <span>→</span>
        </a>
        <details className="mobile-menu" ref={menuRef}>
          <summary aria-label="Open navigation">
            <Menu className="open-icon" />
            <X className="close-icon" />
          </summary>
          <nav>
            {links.map(([label, href]) => (
              <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>
                {label}
              </Link>
            ))}
            <a href="tel:+919782767546"><Phone size={17} /> +91 97827 67546</a>
          </nav>
        </details>
      </div>
    </header>
  );
}
