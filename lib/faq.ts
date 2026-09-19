// Single source for the FAQ page and its FAQPage JSON-LD, so the structured
// data can never drift from what the page actually shows.
export const FAQS: { q: string; a: string }[] = [
  {
    q: "How much subsidy do I get under PM Surya Ghar?",
    a: "The central subsidy is slab-based on the sanctioned capacity: ₹30,000 for 1 kW, ₹60,000 for 2 kW, and ₹78,000 for 3 kW and above. It applies to residential connections only, and 3 kW is the cap — a 5 kW or 10 kW home system still receives ₹78,000. The amount is credited to your bank account after the system is installed, inspected and the net meter is commissioned.",
  },
  {
    q: "How long does the whole process take?",
    a: "For a typical residential rooftop in Kota, expect four to eight weeks from registration to net meter. Installation itself takes two to four days. Most of the elapsed time is DISCOM feasibility approval and the net meter appointment, which we file and follow up on for you.",
  },
  {
    q: "What size system do I need?",
    a: "As a rule of thumb, one kW generates about 120 units a month in the Kota region. Divide your average monthly consumption by 120 for an indicative size. We check that against your last twelve months of billing, your sanctioned load, and the usable shade-free roof area before quoting — roughly 80 to 100 sq ft per kW.",
  },
  {
    q: "What is net metering and how does it affect my bill?",
    a: "A net meter records both the units you draw from the grid and the surplus you export. You are billed only on the net difference, and unused export is typically carried forward within the settlement period. This is what lets a correctly sized system take a monthly bill close to the fixed charges alone.",
  },
  {
    q: "Will solar work on a tin shed or an industrial roof?",
    a: "Yes. Profiled metal roofs are very common in our commercial work. We use clamp-based, non-penetrative mounting so the sheet is not drilled and the roof warranty and waterproofing stay intact, and we design the structure around your ventilation, walkways and the local wind load.",
  },
  {
    q: "Do you help with the paperwork and bank loan?",
    a: "Yes. Portal registration, feasibility application, subsidy claim, net metering and the inspection are handled end to end by our team. For residential systems we also prepare the documentation banks ask for under the scheme's loan provisions.",
  },
  {
    q: "What maintenance does a solar plant need?",
    a: "Mainly cleaning. Dust on the modules is the single largest avoidable generation loss in this region, so panels should be washed regularly through the dry months. Beyond that, an annual check of connections, earthing and inverter health is enough. We offer AMC cover and respond to inverter faults locally rather than routing you to a manufacturer helpline.",
  },
  {
    q: "How long will the system last?",
    a: "Solar modules are typically warranted for 25 years of performance and inverters for five to ten, depending on the brand. The plant is a 25-year asset, which is why we size it against real consumption and keep service in-house — you will still be able to reach the same Kota office years after commissioning.",
  },
  {
    q: "Which areas do you serve?",
    a: "We work across six districts from our Kota office: Kota, Baran, Bundi, Jhalawar, Bhilwara and Chittorgarh. Our service radius is deliberately kept to a drive, so a fault call does not become a logistics problem.",
  },
  {
    q: "What do you need from me to start?",
    a: "One recent electricity bill and a photo of the roof or shed. That is enough for us to come back with an honest system size, an expected generation figure and your likely subsidy eligibility before anyone visits the site.",
  },
];
