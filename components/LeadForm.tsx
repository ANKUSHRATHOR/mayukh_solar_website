"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle2, Loader2, MessageCircle, Send } from "lucide-react";
import { submitLead } from "@/app/actions/submit-lead";
import { track } from "@/lib/track";
import { DISTRICTS, K_NUMBER_LENGTH, SEGMENTS, SEGMENT_LABELS, WHATSAPP_SURVEY_URL, type LeadFieldErrors } from "@/lib/leads";

type Fields = {
  name: string;
  phone: string;
  email: string;
  city: string;
  area: string;
  kNumber: string;
  segment: string;
  message: string;
  company: string;
};

export default function LeadForm({
  source,
  defaultSegment,
  calcSnapshot,
  heading = "Request a free site survey",
  copy = "Share a few details and our Kota team will call you back with an honest system size.",
}: {
  source: string;
  defaultSegment?: (typeof SEGMENTS)[number];
  calcSnapshot?: string;
  heading?: string;
  copy?: string;
}) {
  const [done, setDone] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Fields>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      city: "Kota",
      area: "",
      kNumber: "",
      segment: defaultSegment ?? "residential",
      message: "",
      company: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    const result = await submitLead({ ...values, source, calcSnapshot });

    if (result.ok) {
      track("lead_submit", { source, segment: values.segment, city: values.city });
      setDone(true);
      return;
    }
    if (result.fieldErrors) {
      for (const [field, message] of Object.entries(result.fieldErrors as LeadFieldErrors)) {
        if (message) setError(field as keyof Fields, { type: "server", message });
      }
    }
    if (result.formError) setFormError(result.formError);
  });

  if (done) {
    return (
      <div className="lead-form is-done" role="status">
        <CheckCircle2 />
        <h3>Request received.</h3>
        <p>Our Kota team will call you back on the number you shared. If you would rather not wait, message us directly — it is the fastest way to get a system size.</p>
        <a className="lead-whatsapp" href={WHATSAPP_SURVEY_URL} target="_blank" rel="noopener noreferrer">
          <MessageCircle /> Continue on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={onSubmit} noValidate>
      <div className="lead-form-head">
        <h3>{heading}</h3>
        <p>{copy}</p>
      </div>

      <div className="lead-fields">
        <label className="lead-field">
          <span>Your name</span>
          <input
            type="text"
            autoComplete="name"
            aria-invalid={errors.name ? true : undefined}
            {...register("name", { required: "Enter your name" })}
          />
          {errors.name && <em>{errors.name.message}</em>}
        </label>

        <label className="lead-field">
          <span>Mobile number</span>
          <input
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="98765 43210"
            aria-invalid={errors.phone ? true : undefined}
            {...register("phone", { required: "Enter your mobile number" })}
          />
          {errors.phone && <em>{errors.phone.message}</em>}
        </label>

        <label className="lead-field">
          <span>Email <i>(optional)</i></span>
          <input
            type="email"
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
            {...register("email")}
          />
          {errors.email && <em>{errors.email.message}</em>}
        </label>

        <label className="lead-field">
          <span>District</span>
          <select {...register("city")}>
            {DISTRICTS.map((district) => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </label>

        <label className="lead-field">
          <span>Village / area <i>(optional)</i></span>
          <input
            type="text"
            autoComplete="address-level3"
            placeholder="Keshavpura, Sector 7"
            aria-invalid={errors.area ? true : undefined}
            {...register("area")}
          />
          {errors.area && <em>{errors.area.message}</em>}
        </label>

        <label className="lead-field">
          <span>K number <i>(optional)</i></span>
          <input
            type="text"
            inputMode="numeric"
            placeholder={"2".padEnd(K_NUMBER_LENGTH, "0")}
            aria-describedby="k-number-hint"
            aria-invalid={errors.kNumber ? true : undefined}
            {...register("kNumber")}
          />
          <small id="k-number-hint" className="lead-hint">
            The {K_NUMBER_LENGTH}-digit consumer number on your electricity bill. It lets us check your
            connection and sanctioned load before visiting.
          </small>
          {errors.kNumber && <em>{errors.kNumber.message}</em>}
        </label>

        <label className="lead-field lead-field-wide">
          <span>What do you need?</span>
          <select {...register("segment")}>
            {SEGMENTS.map((segment) => (
              <option key={segment} value={segment}>{SEGMENT_LABELS[segment]}</option>
            ))}
          </select>
        </label>

        <label className="lead-field lead-field-wide">
          <span>Anything else <i>(optional)</i></span>
          <textarea
            rows={3}
            placeholder="Monthly bill, roof type, sanctioned load…"
            aria-invalid={errors.message ? true : undefined}
            {...register("message")}
          />
          {errors.message && <em>{errors.message.message}</em>}
        </label>

        {/* Honeypot: hidden from users, catches bots that fill every input. */}
        <div className="lead-honeypot" aria-hidden="true">
          <label>
            Company
            <input type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
          </label>
        </div>
      </div>

      {formError && <p className="lead-form-error" role="alert">{formError}</p>}

      <div className="lead-form-actions">
        <button type="submit" className="lead-submit" disabled={isSubmitting}>
          {isSubmitting ? <><Loader2 className="lead-spin" /> Sending…</> : <><Send /> Request a call back</>}
        </button>
        <a className="lead-whatsapp-inline" href={WHATSAPP_SURVEY_URL} target="_blank" rel="noopener noreferrer">
          or message us on WhatsApp <span>→</span>
        </a>
      </div>

      {calcSnapshot && <p className="lead-form-note">Your calculator estimate is attached to this request.</p>}
    </form>
  );
}
