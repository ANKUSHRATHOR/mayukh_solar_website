"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/track";

export default function MotionEffects(){
  const [showTop,setShowTop]=useState(false);
  const pathname=usePathname();
  useEffect(()=>{
    const nodes=Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target)}}),{threshold:.13});
    nodes.forEach(node=>observer.observe(node));
    const onScroll=()=>setShowTop(window.scrollY>520);
    onScroll();window.addEventListener("scroll",onScroll,{passive:true});

    // One delegated listener covers every outbound CTA on every page, so the
    // links themselves stay plain markup in Server Components.
    const onClick=(event:MouseEvent)=>{
      const link=(event.target as HTMLElement|null)?.closest?.("a");
      if(!(link instanceof HTMLAnchorElement))return;
      const href=link.getAttribute("href")??"";
      if(href.startsWith("https://wa.me/"))track("whatsapp_click",{page:pathname});
      else if(href.startsWith("tel:"))track("phone_click",{page:pathname});
      else if(href.startsWith("mailto:"))track("email_click",{page:pathname});
      else if(href.endsWith(".pdf"))track("profile_pdf_open",{page:pathname});
    };
    document.addEventListener("click",onClick);

    return()=>{observer.disconnect();window.removeEventListener("scroll",onScroll);document.removeEventListener("click",onClick)};
  },[pathname]);
  const scrollToTop=()=>{
    window.scrollTo(0,0);
    document.documentElement.scrollTop=0;
    document.body.scrollTop=0;
  };
  return <button type="button" className={`back-to-top ${showTop?"is-shown":""}`} onClick={scrollToTop} aria-label="Back to top"><ArrowUp/></button>;
}
