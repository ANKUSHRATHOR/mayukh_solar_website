import type { Metadata } from "next";
import { ArrowRight, Building2, CircleCheck, Factory, Home, Wrench } from "lucide-react";
import PageHero from "@/components/PageHero";
import { BUSINESS, SERVED_DISTRICTS, SITE_URL } from "@/lib/site";
import SiteFooter from "@/components/SiteFooter";
import LeadForm from "@/components/LeadForm";
export const metadata: Metadata = {
  title: "Solar EPC Services | Mayukh Solar",
  description: "Residential rooftop, commercial tin-shed, PM KUSUM ground-mount and solar maintenance services in Rajasthan.",
  alternates: { canonical: "/services" },
  openGraph: { title: "Solar EPC Services | Mayukh Solar", description: "Residential rooftop, commercial tin-shed, PM KUSUM ground-mount and solar maintenance services in Rajasthan.", url: "/services" },
};
const offers=[{icon:Home,title:"Residential rooftop",tag:"1–10 kW · PM SURYA GHAR",copy:"Grid-connected rooftop systems for homes and housing societies, sized against consumption and managed through subsidy and net metering.",items:["Portal registration & feasibility","Bank loan documentation","Installation & net-meter commissioning"]},{icon:Factory,title:"Commercial & industrial",tag:"TIN SHED · RCC · WAREHOUSE",copy:"High-output systems for factories and commercial buildings with structures designed for the actual roof, wind load and operations.",items:["Clamp-based, non-penetrative mounting","HT/LT coordination","Generation and depreciation guidance"]},{icon:Building2,title:"Ground-mount & PM KUSUM",tag:"AGRICULTURAL · UTILITY",copy:"Land-based plants delivered from site study and civil design through evacuation, metering, testing and commissioning.",items:["Shadow analysis & array layout","Civil foundations & structures","Evacuation and commissioning"]},{icon:Wrench,title:"Operations & maintenance",tag:"PERFORMANCE · SERVICE",copy:"Local after-sales support that protects long-term generation and resolves component issues without passing responsibility.",items:["AMC and module cleaning","Inverter diagnosis & warranty","Generation reviewed against design"]}];

// One Service node per offering, tied back to the LocalBusiness in the layout.
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@graph": offers.map(({ title, copy }) => ({
    "@type": "Service",
    name: title,
    description: copy,
    serviceType: title,
    provider: { "@id": `${SITE_URL}/#business`, "@type": "LocalBusiness", name: BUSINESS.name },
    areaServed: SERVED_DISTRICTS.map((name) => ({ "@type": "City", name })),
  })),
};

export default function ServicesPage(){return <main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(serviceJsonLd)}}/><PageHero eyebrow="OUR SERVICES" title="One team." accent="Every solar segment." copy="Four integrated service lines, with engineering, paperwork, execution and after-sales under one roof."/><section id="page-content" className="inner-section"><div className="shell services-list">{offers.map(({icon:Icon,title,tag,copy,items},i)=><article key={title} data-reveal><div className="service-number">0{i+1}</div><div className="service-icon"><Icon/></div><div><span>{tag}</span><h2>{title}</h2><p>{copy}</p></div><ul>{items.map(item=><li key={item}><CircleCheck/>{item}</li>)}</ul></article>)}</div></section><section className="process-timeline"><div className="shell"><div className="section-head" data-reveal><div><div className="section-kicker">HOW A PROJECT RUNS</div><h2>Six steps,<br/><span>one team throughout.</span></h2></div><div><p>Nothing in this sequence is subcontracted. The people who survey your roof are the people who service it.</p></div></div><ol className="process-steps"><li key="Survey" data-reveal><span>01</span><h3>Survey</h3><p>We visit the site, measure usable shade-free area and review twelve months of billing and your sanctioned load.</p></li><li key="Design" data-reveal><span>02</span><h3>Design</h3><p>Array layout, structure and protection are engineered for your roof, its orientation and the local wind load.</p></li><li key="Approval" data-reveal><span>03</span><h3>Approval</h3><p>Portal registration, DISCOM feasibility and the subsidy claim are filed and followed up by our team.</p></li><li key="Installation" data-reveal><span>04</span><h3>Installation</h3><p>Our own crew installs the structure, modules, inverter, cabling and earthing — typically in two to four days.</p></li><li key="Net meter" data-reveal><span>05</span><h3>Net meter</h3><p>We coordinate the DISCOM inspection and net meter commissioning so export is credited from day one.</p></li><li key="Service" data-reveal><span>06</span><h3>Service</h3><p>Cleaning, generation review and fault response stay with the same Kota office for the life of the plant.</p></li></ol></div></section><section className="service-cta"><div className="shell" data-reveal><div><span>NOT SURE WHICH SYSTEM FITS?</span><h2>Send your bill and a site photo.</h2></div><a className="button button-gold" href="https://wa.me/919782767546" target="_blank" rel="noopener noreferrer">Get an honest recommendation <ArrowRight/></a></div></section><section className="service-form-section"><div className="shell" data-reveal><LeadForm source="services-cta" heading="Tell us about your site" copy="Pick the closest service line and our engineer will come back with the right approach."/></div></section><SiteFooter/></main>}
