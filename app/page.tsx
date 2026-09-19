import { ArrowRight, BadgeCheck, Building2, Factory, Leaf, ShieldCheck, Sun, Wrench } from "lucide-react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PowerFlow from "@/components/PowerFlow";

const services=[
  {icon:Sun,title:"Residential rooftop",label:"1–10 kW",copy:"On-grid systems with PM Surya Ghar registration, subsidy and net metering support."},
  {icon:Factory,title:"Commercial & industrial",label:"50 kW+",copy:"Engineered solar plants for tin sheds, RCC roofs, factories and warehouses."},
  {icon:Building2,title:"Ground-mount & PM KUSUM",label:"MW scale",copy:"Complete survey, civil, structure, evacuation, metering and commissioning."},
  {icon:Wrench,title:"Service & maintenance",label:"Long term",copy:"Cleaning, generation review, fault diagnosis, warranties and annual maintenance."},
];

export default function Home(){return <main>
  {/* The hero is the LCP element and loads from CSS, so the browser cannot
      discover it from markup — preload it explicitly. React hoists this. */}
  <link rel="preload" as="image" href="/solar-hero.webp" fetchPriority="high"/>
  <section className="hero home-hero"><div className="hero-image"/><div className="hero-shade"/><SiteHeader overlay/>
    <div className="hero-content shell" data-reveal><div className="eyebrow"><span/>PM Surya Ghar authorised vendor · PM KUSUM executed</div><h1>Powering a brighter<br/><em>tomorrow.</em></h1><p>In-house solar EPC for rooftops, tin sheds and ground-mount plants across Kota and the Hadoti region.</p><div className="hero-actions"><Link className="button button-gold" href="/solar-calculator">Calculate your solar need <ArrowRight/></Link><Link className="text-link" href="/projects">Explore projects <span>↘</span></Link></div><div className="hero-proof"><div><strong>1000+</strong><span><i>projects</i><i>completed</i></span></div><div><strong>5 MW</strong><span><i>capacity</i><i>installed</i></span></div><div><strong>1.47 MW</strong><span><i>PM KUSUM</i><i>delivered</i></span></div><div><strong>6</strong><span><i>districts</i><i>covered</i></span></div></div></div>
    <div className="hero-beam"/><div className="scroll-cue"><span/>EXPLORE MAYUKH SOLAR</div>
  </section>

  <section id="page-content" className="home-intro"><div className="shell split-heading" data-reveal><div><div className="section-kicker">ENGINEERED FOR 25 YEARS</div><h2>One team, from the first survey to the <span>last service call.</span></h2></div><div><p>We do not subcontract installations. Survey, structure, wiring, DISCOM liaison and after-sales service are handled by our own team in Kota.</p><Link className="inline-arrow" href="/about">Meet VR Enterprises <ArrowRight/></Link></div></div><div className="shell trust-row" data-reveal><div><ShieldCheck/><strong>In-house execution</strong><span>No shifting responsibility</span></div><div><BadgeCheck/><strong>Government registered</strong><span>PM Surya Ghar authorised</span></div><div><Leaf/><strong>Honest system sizing</strong><span>Based on real consumption</span></div></div></section>

  <section className="generation-section"><div className="shell generation-grid"><div data-reveal><div className="section-kicker light">ENERGY IN MOTION</div><h2>Watch sunlight become<br/><span>usable power.</span></h2><p>The live demo traces DC generation from the solar array through the inverter, into the property, and out to the grid when production exceeds demand.</p><Link className="button button-gold" href="/solar-calculator">Estimate your generation <ArrowRight/></Link></div><div data-reveal><PowerFlow/></div></div></section>

  <section className="home-services"><div className="shell"><div className="section-head" data-reveal><div><div className="section-kicker">COMPLETE SOLAR EPC</div><h2>Built for every<br/><span>kind of site.</span></h2></div><div><p>Residential roofs, industrial sheds and agricultural land each need a different engineering approach.</p><Link className="inline-arrow" href="/services">View all services <ArrowRight/></Link></div></div><div className="home-service-grid">{services.map(({icon:Icon,title,label,copy},i)=><Link href="/services" className="home-service-card" key={title} data-reveal><span>0{i+1}</span><Icon/><small>{label}</small><h3>{title}</h3><p>{copy}</p><b>Explore solution →</b></Link>)}</div></div></section>

  <section className="home-projects"><div className="shell"><div className="project-head" data-reveal><div><div className="section-kicker light">PROVEN IN THE FIELD</div><h2>Real systems.<br/><span>Real generation.</span></h2></div><Link className="button button-gold" href="/projects">See our project portfolio <ArrowRight/></Link></div><div className="project-grid"><article className="project-card" data-reveal><img src="/industrial-rooftop.webp" alt="Industrial rooftop solar installation" width={1450} height={637} loading="lazy" decoding="async"/><div className="project-overlay"><span>COMMERCIAL & INDUSTRIAL</span><h3>Industrial tin-shed rooftop</h3><p>Elevated array engineered around ventilation, walkways and local wind load.</p></div></article><article className="project-card" data-reveal><img src="/pm-kusum-plant.webp" alt="PM KUSUM ground mounted plant" width={1450} height={637} loading="lazy" decoding="async"/><div className="project-overlay"><span>FLAGSHIP · COMMISSIONED</span><h3>1.47 MW PM KUSUM plant</h3><p>Complete delivery from array layout and civil foundations to grid export.</p></div></article></div></div></section>

  <section className="home-cta"><div className="shell" data-reveal><div><span>YOUR BILL + ONE ROOF PHOTO</span><h2>That&apos;s enough to start.</h2></div><div><p>We&apos;ll return with an honest system size, expected generation and subsidy guidance.</p><a className="button button-dark" href="https://wa.me/919782767546" target="_blank" rel="noopener noreferrer">Send details on WhatsApp <ArrowRight/></a></div></div></section>
  <SiteFooter/>
</main>}
