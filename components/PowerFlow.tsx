"use client";
import { useEffect, useState } from "react";
import { BatteryCharging, Factory, Grid3X3, Home, Sun, Zap } from "lucide-react";

export default function PowerFlow(){
  const [output,setOutput]=useState(4.62);
  const [today,setToday]=useState(18.4);
  useEffect(()=>{const id=window.setInterval(()=>{const wave=Math.sin(Date.now()/2400);setOutput(Number((4.55+wave*.22+Math.random()*.08).toFixed(2)));setToday(v=>Number(Math.min(24.8,v+.01).toFixed(2)))},1100);return()=>window.clearInterval(id)},[]);
  return <div className="power-flow" aria-label="Animated solar electricity generation flow">
    <div className="flow-sky"><div className="flow-sun"><Sun/><i/><i/><i/></div><span>Sunlight</span></div>
    <div className="flow-line"><i/><i/><i/><i/><i/></div>
    <div className="flow-device panel-device"><Grid3X3/><span>Solar array<strong>5.0 kW</strong></span></div>
    <div className="flow-line"><i/><i/><i/><i/><i/></div>
    <div className="flow-device inverter-device"><Zap/><span>Live inverter<strong>{output.toFixed(2)} kW</strong></span></div>
    <div className="flow-split"><div className="flow-branch left"><i/><i/><i/></div><div className="flow-branch right"><i/><i/><i/></div></div>
    <div className="flow-consumers"><div className="flow-device"><Home/><span>Home load<strong>2.71 kW</strong></span></div><div className="flow-device export"><Factory/><span>Grid export<strong>{Math.max(0,output-2.71).toFixed(2)} kW</strong></span></div></div>
    <div className="flow-summary"><div><BatteryCharging/><span>Generated today<strong>{today.toFixed(2)} kWh</strong></span></div><div><Zap/><span>System status<strong><b/> Generating</strong></span></div></div>
  </div>
}
