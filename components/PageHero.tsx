import { ArrowRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";

export default function PageHero({eyebrow,title,accent,copy}:{eyebrow:string;title:string;accent:string;copy:string}){return <><SiteHeader/><section className="page-hero"><div className="page-hero-glow"/><div className="shell"><div className="section-kicker light">{eyebrow}</div><h1>{title}<br/><span>{accent}</span></h1><p>{copy}</p><a href="#page-content">Explore <ArrowRight/></a></div></section></>}
