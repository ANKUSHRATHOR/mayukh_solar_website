import type { Metadata } from "next";
import { CircleCheck } from "lucide-react";
import PageHero from "@/components/PageHero";
import SiteFooter from "@/components/SiteFooter";
import SolarCalculator from "@/components/SolarCalculator";
export const metadata: Metadata = {
  title: "Solar Capacity Calculator | Mayukh Solar",
  description: "Estimate rooftop solar capacity, monthly generation, roof area and PM Surya Ghar subsidy from your bill or monthly units.",
  alternates: { canonical: "/solar-calculator" },
  openGraph: { title: "Solar Capacity Calculator | Mayukh Solar", description: "Estimate rooftop solar capacity, monthly generation, roof area and PM Surya Ghar subsidy from your bill or monthly units.", url: "/solar-calculator" },
};
export default function CalculatorPage(){return <main><PageHero eyebrow="SOLAR CALCULATOR" title="Turn your electricity bill" accent="into a solar plan." copy="Get a quick indicative system size, generation estimate, roof area and residential subsidy."/><section id="page-content" className="calculator-page"><div className="shell"><SolarCalculator/><div className="calc-explainer" data-reveal><div><div className="section-kicker">HOW THE ESTIMATE WORKS</div><h2>Useful first answer.<br/><span>Engineering follows.</span></h2></div><div><p>The calculator uses an indicative Kota-region yield of four units per installed kW per day. Your final design is checked against the last twelve months of billing, sanctioned load, usable roof area, orientation and shade.</p><ul><li><CircleCheck/>Bill-based or unit-based sizing</li><li><CircleCheck/>Indicative 80–100 sq ft per kW</li><li><CircleCheck/>Current residential subsidy slabs shown with a clear disclaimer</li></ul></div></div></div></section><SiteFooter/></main>}
