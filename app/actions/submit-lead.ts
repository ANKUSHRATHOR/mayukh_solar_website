"use server";

import { z } from "zod";
import { getLeadAuthorId, getSupabaseAdmin } from "@/lib/supabase-admin";
import {
  DISTRICTS,
  K_NUMBER_LENGTH,
  LEAD_CAMPAIGN,
  LEAD_STATE,
  SEGMENTS,
  SEGMENT_LABELS,
  type LeadFieldErrors,
  type SubmitLeadResult,
} from "@/lib/leads";

// Indian mobile numbers are ten digits starting 6-9. Accept the shapes people
// actually type — +91 prefixes, a leading 0, spaces and dashes — then normalise.
const phoneSchema = z
  .string()
  .trim()
  .transform((value) => value.replace(/[\s()-]/g, "").replace(/^(\+?91|0)/, ""))
  .refine((value) => /^[6-9]\d{9}$/.test(value), "Enter a 10-digit Indian mobile number");

// Optional, but if given it must look like a real consumer number.
const kNumberSchema = z
  .string()
  .trim()
  .transform((value) => value.replace(/[\s-]/g, ""))
  .refine(
    (value) => value === "" || new RegExp(`^\\d{${K_NUMBER_LENGTH}}$`).test(value),
    `K number is ${K_NUMBER_LENGTH} digits — check your electricity bill`
  );

const leadSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80, "Name is too long"),
  phone: phoneSchema,
  email: z.union([z.string().trim().email("Enter a valid email"), z.literal("")]).optional(),
  city: z.enum(DISTRICTS).optional(),
  area: z.string().trim().max(160, "Please keep this shorter").optional(),
  kNumber: kNumberSchema.optional(),
  segment: z.enum(SEGMENTS).optional(),
  message: z.string().trim().max(1200, "Please keep this under 1200 characters").optional(),
  source: z.string().trim().min(1).max(40),
  calcSnapshot: z.string().max(2000).optional(),
  // `company` is a honeypot: hidden from real users, so any value means a bot.
  company: z.string().max(0, "Submission rejected").optional(),
});

type CalcSnapshot = {
  systemSizeKw?: number;
  monthlyUnits?: number;
  paybackYears?: number;
  netCostRupees?: number;
};

function parseSnapshot(raw: string | undefined): CalcSnapshot | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CalcSnapshot;
  } catch {
    return null;
  }
}

// The CRM has no segment or snapshot column, so everything the salesperson
// needs to open the conversation goes into notes as one readable line.
function composeNotes(
  input: { segment?: string; source: string; message?: string },
  snapshot: CalcSnapshot | null
) {
  const parts: string[] = [];

  if (input.segment && input.segment in SEGMENT_LABELS) {
    parts.push(SEGMENT_LABELS[input.segment as keyof typeof SEGMENT_LABELS]);
  }
  parts.push(`via website (${input.source})`);

  if (snapshot?.systemSizeKw) {
    const bits = [`est. ${snapshot.systemSizeKw} kW`];
    if (snapshot.monthlyUnits) bits.push(`~${snapshot.monthlyUnits} units/month`);
    if (snapshot.netCostRupees) bits.push(`net ₹${snapshot.netCostRupees.toLocaleString("en-IN")}`);
    if (snapshot.paybackYears) bits.push(`payback ~${snapshot.paybackYears} yrs`);
    parts.push(bits.join(", "));
  }

  if (input.message) parts.push(input.message);

  return parts.join(" · ");
}

export async function submitLead(input: unknown): Promise<SubmitLeadResult> {
  const parsed = leadSchema.safeParse(input);

  if (!parsed.success) {
    const fieldErrors: LeadFieldErrors = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof LeadFieldErrors | undefined;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    // A tripped honeypot is a bot, not a user with a correctable mistake.
    if (fieldErrors.company) return { ok: false, formError: "Submission rejected." };
    return { ok: false, fieldErrors };
  }

  const { company: _honeypot, ...lead } = parsed.data;
  void _honeypot;

  const snapshot = parseSnapshot(lead.calcSnapshot);
  const district = lead.city ?? "Kota";
  const area = lead.area?.trim();

  try {
    const supabase = getSupabaseAdmin();

    // Column names follow the existing CRM table, not the form field names.
    const { error } = await supabase.from("leads").insert({
      customer_name: lead.name,
      mobile: lead.phone,
      email: lead.email || null,
      district,
      state: LEAD_STATE,
      // village_city and address are NOT NULL; fall back to the district when
      // the visitor skips the optional area field.
      village_city: area || district,
      address: area || "Submitted via website",
      k_number: lead.kNumber || null,
      kw_interest: snapshot?.systemSizeKw ?? null,
      source: "website",
      campaign: LEAD_CAMPAIGN,
      notes: composeNotes(lead, snapshot) || null,
      created_by_user_id: getLeadAuthorId(),
      // status defaults to 'new'; assignment is left to the CRM team.
    });

    if (error) {
      console.error("Lead insert failed", { code: error.code, message: error.message });
      return {
        ok: false,
        formError: "We could not save your request. Please call or message us on WhatsApp instead.",
      };
    }

    return { ok: true };
  } catch (error) {
    console.error("Lead submission error", error);
    return {
      ok: false,
      formError: "We could not save your request. Please call or message us on WhatsApp instead.",
    };
  }
}
