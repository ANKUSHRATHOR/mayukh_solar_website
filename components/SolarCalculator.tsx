"use client";

import { useMemo, useState } from "react";
import { Calculator, IndianRupee, Ruler, Sun, Zap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeadForm from "@/components/LeadForm";
import { track } from "@/lib/track";

const formatNumber = (value: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value);

// Rupee figures read better as lakh once they pass six digits, which is where
// most whole-system costs land.
const formatRupees = (value: number) =>
  value >= 100000 ? `₹${(value / 100000).toFixed(2)} lakh` : `₹${formatNumber(value)}`;

const RESIDENTIAL_MAX_KW = 10;   // PM Surya Ghar is a residential scheme
const SYSTEM_LIFE_YEARS = 25;
const DEFAULT_TARIFF = 8;        // ₹/unit, used when sizing from units alone
const CO2_KG_PER_UNIT = 0.71;    // CEA grid emission factor, kg CO2 per kWh

export default function SolarCalculator() {
  const [mode, setMode] = useState("bill");
  const [showForm, setShowForm] = useState(false);
  const [monthlyBill, setMonthlyBill] = useState(3000);
  const [monthlyUnits, setMonthlyUnits] = useState(375);
  const [tariff, setTariff] = useState(8);

  const result = useMemo(() => {
    const units = mode === "bill" ? monthlyBill / Math.max(tariff, 1) : monthlyUnits;
    const systemSize = Math.min(100, Math.max(1, Math.ceil((units / 120) * 2) / 2));
    const monthlyGeneration = systemSize * 120;
    const annualGeneration = monthlyGeneration * 12;
    const roofMin = Math.round(systemSize * 80);
    const roofMax = Math.round(systemSize * 100);

    // PM Surya Ghar CFA is slab-based on whole sanctioned kW, not pro-rated:
    // 1 kW ₹30,000 · 2 kW ₹60,000 · 3 kW and above ₹78,000. Residential only.
    const isResidential = systemSize <= RESIDENTIAL_MAX_KW;
    const sanctionedKw = Math.min(3, Math.floor(systemSize));
    const subsidy = !isResidential
      ? 0
      : sanctionedKw >= 3
        ? 78000
        : sanctionedKw === 2
          ? 60000
          : sanctionedKw === 1
            ? 30000
            : 0;

    // Indicative installed cost. Larger systems cost less per kW.
    const ratePerKw = systemSize <= 3 ? 60000 : systemSize <= 10 ? 55000 : systemSize <= 50 ? 48000 : 42000;
    const grossCost = Math.round(systemSize * ratePerKw);
    const netCost = Math.max(0, grossCost - subsidy);

    // Savings are valued at the tariff the visitor pays, capped at what they
    // actually consume — exported surplus earns far less than it offsets.
    const effectiveTariff = mode === "bill" ? Math.max(tariff, 1) : DEFAULT_TARIFF;
    const offsetUnits = Math.min(monthlyGeneration, units);
    const monthlySaving = Math.round(offsetUnits * effectiveTariff);
    const annualSaving = monthlySaving * 12;
    const paybackYears = annualSaving > 0 ? netCost / annualSaving : 0;
    const lifetimeSaving = Math.round(annualSaving * SYSTEM_LIFE_YEARS - netCost);
    const co2TonnesPerYear = (annualGeneration * CO2_KG_PER_UNIT) / 1000;

    return {
      units, systemSize, monthlyGeneration, annualGeneration, roofMin, roofMax,
      subsidy, isResidential, grossCost, netCost, monthlySaving, annualSaving,
      paybackYears, lifetimeSaving, co2TonnesPerYear,
    };
  }, [mode, monthlyBill, monthlyUnits, tariff]);

  // Carry the computed estimate into both handoffs so nothing the visitor
  // entered has to be retyped or re-explained.
  const calcSnapshot = JSON.stringify({
    mode,
    monthlyBill: mode === "bill" ? monthlyBill : null,
    tariff: mode === "bill" ? tariff : null,
    monthlyUnits: mode === "units" ? monthlyUnits : Math.round(result.units),
    systemSizeKw: result.systemSize,
    monthlyGenerationUnits: result.monthlyGeneration,
    subsidyRupees: result.subsidy,
    netCostRupees: result.netCost,
    monthlySavingRupees: result.monthlySaving,
    paybackYears: Number(result.paybackYears.toFixed(1)),
  });

  const whatsappHref =
    "https://wa.me/919782767546?text=" +
    encodeURIComponent(
      `Hello Mayukh Solar, I used the solar calculator. It suggested a ${result.systemSize} kW system for about ${formatNumber(result.units)} units a month. I would like a site survey.`
    );

  return (
    <div className="calculator-card">
      <div className="calc-inputs">
        <div className="calc-title"><span><Calculator size={21}/></span><div><small>SOLAR REQUIREMENT ESTIMATOR</small><h3>Size your rooftop in seconds.</h3></div></div>
        <Tabs value={mode} onValueChange={setMode} className="calc-tabs">
          <TabsList className="calc-tab-list" aria-label="Choose calculation method">
            <TabsTrigger value="bill">By electricity bill</TabsTrigger>
            <TabsTrigger value="units">By monthly units</TabsTrigger>
          </TabsList>
          <TabsContent value="bill" className="calc-fields">
            <label><span>Average monthly bill</span><div className="input-wrap"><IndianRupee size={17}/><input type="number" min="500" max="200000" step="100" value={monthlyBill} onChange={(e)=>setMonthlyBill(Math.max(0, Number(e.target.value)))} aria-label="Average monthly electricity bill in rupees"/></div></label>
            <label><span>Average tariff</span><div className="input-wrap"><IndianRupee size={17}/><input type="number" min="1" max="30" step="0.5" value={tariff} onChange={(e)=>setTariff(Math.max(1, Number(e.target.value)))} aria-label="Average electricity tariff per unit"/><b>/ unit</b></div></label>
          </TabsContent>
          <TabsContent value="units" className="calc-fields single">
            <label><span>Average monthly consumption</span><div className="input-wrap"><Zap size={17}/><input type="number" min="50" max="12000" step="25" value={monthlyUnits} onChange={(e)=>setMonthlyUnits(Math.max(0, Number(e.target.value)))} aria-label="Average monthly electricity units"/><b>units</b></div></label>
          </TabsContent>
        </Tabs>
        <p className="calc-note">Uses an indicative yield of 4 units per kW per day. Final sizing depends on roof orientation, shade, sanctioned load and your 12-month consumption.</p>
      </div>
      <div className="calc-results" aria-live="polite">
        <small>RECOMMENDED ON-GRID CAPACITY</small>
        <div className="capacity"><strong>{result.systemSize}</strong><span>kW</span></div>
        <p>Designed to cover approximately <b>{formatNumber(result.units)} units</b> of average monthly consumption.</p>
        <div className="result-grid">
          <div><Sun/><span>Estimated generation<strong>{formatNumber(result.monthlyGeneration)} units / month</strong></span></div>
          <div><Zap/><span>Annual clean energy<strong>{formatNumber(result.annualGeneration)} units / year</strong></span></div>
          <div><Ruler/><span>Indicative roof area<strong>{formatNumber(result.roofMin)}–{formatNumber(result.roofMax)} sq ft</strong></span></div>
          <div><IndianRupee/><span>Central subsidy*<strong>{result.subsidy > 0 ? `Up to ₹${formatNumber(result.subsidy)}` : "Not applicable"}</strong></span></div>
        </div>

        <div className="calc-money">
          <div className="calc-money-head">
            <span>WHAT IT COSTS AND SAVES</span>
          </div>
          <div className="calc-money-grid">
            <div>
              <small>Indicative system cost</small>
              <strong>{formatRupees(result.grossCost)}</strong>
            </div>
            <div>
              <small>{result.subsidy > 0 ? "Net cost after subsidy" : "Net cost"}</small>
              <strong className="is-accent">{formatRupees(result.netCost)}</strong>
            </div>
            <div>
              <small>Estimated monthly saving</small>
              <strong>₹{formatNumber(result.monthlySaving)}</strong>
            </div>
            <div>
              <small>Payback period</small>
              <strong>{result.paybackYears > 0 ? `${result.paybackYears.toFixed(1)} years` : "—"}</strong>
            </div>
          </div>
          <p className="calc-money-note">
            Over {SYSTEM_LIFE_YEARS} years that is roughly <b>{formatRupees(result.lifetimeSaving)}</b> saved
            and <b>{result.co2TonnesPerYear.toFixed(1)} tonnes</b> of CO₂ avoided each year.
          </p>
        </div>
        <div className="calc-actions">
          <a className="calc-cta" href={whatsappHref} target="_blank" rel="noopener noreferrer">Send this estimate on WhatsApp <span>→</span></a>
          {!showForm && (
            <button type="button" className="calc-cta-secondary" onClick={() => {
                track("calculator_complete", { systemSizeKw: result.systemSize, units: Math.round(result.units) });
                setShowForm(true);
              }}>
              Request a call back instead
            </button>
          )}
        </div>
        <small className="calc-disclaimer">*Residential eligibility and subsidy are subject to current PM Surya Ghar rules and DISCOM approval. Costs and savings are indicative Kota-region figures that vary with structure, brand and roof conditions; savings assume your current tariff. This is an estimate, not a quotation.</small>
      </div>
      {showForm && (
        <div className="calc-lead-form">
          <LeadForm
            source="calculator"
            defaultSegment={result.systemSize <= 10 ? "residential" : "commercial"}
            calcSnapshot={calcSnapshot}
            heading={`Get a survey for your ${result.systemSize} kW estimate`}
            copy="We'll check this estimate against your last twelve months of billing, roof area and shade, then call you back."
          />
        </div>
      )}
    </div>
  );
}
