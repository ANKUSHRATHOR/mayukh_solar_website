// Shared between the client form and the server action. Kept out of the
// "use server" module, which may only export async functions.
export const DISTRICTS = ["Kota", "Baran", "Bundi", "Jhalawar", "Bhilwara", "Chittorgarh", "Other"] as const;
export const SEGMENTS = ["residential", "commercial", "ground-mount", "service"] as const;

export type District = (typeof DISTRICTS)[number];
export type Segment = (typeof SEGMENTS)[number];

export const SEGMENT_LABELS: Record<Segment, string> = {
  residential: "Residential rooftop",
  commercial: "Commercial & industrial",
  "ground-mount": "Ground-mount / PM KUSUM",
  service: "Service & maintenance",
};

export const WHATSAPP_SURVEY_URL =
  "https://wa.me/919782767546?text=Hello%20Mayukh%20Solar%2C%20I%20would%20like%20a%20solar%20site%20survey.";

export type LeadField =
  | "name" | "phone" | "email" | "city" | "area" | "kNumber"
  | "segment" | "message" | "source" | "calcSnapshot" | "company";

export type LeadFieldErrors = Partial<Record<LeadField, string>>;
export type SubmitLeadResult =
  | { ok: true }
  | { ok: false; formError?: string; fieldErrors?: LeadFieldErrors };

// Written to leads.state — all six served districts are in Rajasthan, and this
// matches the value already used across the existing CRM rows.
export const LEAD_STATE = "Rajasthan";

// Tags website submissions so they are separable from the ~9,100 bulk-imported
// rows. leads.campaign already has a partial index on non-null values.
export const LEAD_CAMPAIGN = "website";

// The DISCOM consumer number printed on a Rajasthan electricity bill. Every
// existing value in the CRM is exactly 12 digits.
export const K_NUMBER_LENGTH = 12;
