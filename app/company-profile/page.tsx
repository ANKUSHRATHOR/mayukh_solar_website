import type { Metadata } from "next";
import { ArrowDownToLine, Award, Building2, MapPinned, Users } from "lucide-react";
import PageHero from "@/components/PageHero";
import SiteFooter from "@/components/SiteFooter";
export const metadata: Metadata = {
  title: "Company Profile | VR Enterprises",
  description: "Download the VR Enterprises Mayukh Solar company profile and review key credentials, capacity and service footprint.",
  alternates: { canonical: "/company-profile" },
  openGraph: { title: "Company Profile | VR Enterprises", description: "Download the VR Enterprises Mayukh Solar company profile and review key credentials, capacity and service footprint.", url: "/company-profile" },
};
export default function ProfilePage(){return <main><PageHero eyebrow="COMPANY PROFILE" title="Credentials you can" accent="verify and share." copy="A concise view of our engineering capability, leadership, project record and service footprint."/><section id="page-content" className="inner-section"><div className="shell profile-layout"><div className="profile-cover" data-reveal><img src="/vr-logo-white.webp" alt="VR Enterprises Mayukh Solar" width={380} height={377} loading="lazy" decoding="async"/><span>POWERING A BRIGHTER TOMORROW</span><h2>Rooftop · Tin Shed · Ground-Mount Solar EPC</h2><a className="button button-gold" href="/VR-Enterprises-Company-Profile.pdf" target="_blank" rel="noopener noreferrer">Open company profile <ArrowDownToLine/></a></div><div className="profile-facts">{[[Award,"Authorised vendor","PM Surya Ghar registered with a commissioned PM KUSUM project."],[Building2,"5 MW installed","More than 1,000 installations since 2020."],[Users,"In-house team","12 engineering, technical, sales and operations staff."],[MapPinned,"Six districts","Kota, Baran, Bundi, Jhalawar, Bhilwara and Chittorgarh."]].map(([Icon,title,copy])=>{const C=Icon as typeof Award;return <article key={String(title)} data-reveal><C/><div><h3>{String(title)}</h3><p>{String(copy)}</p></div></article>})}</div></div></section><SiteFooter/></main>}
