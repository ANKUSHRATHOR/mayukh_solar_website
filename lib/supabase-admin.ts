import "server-only";

import { createClient } from "@supabase/supabase-js";

// Service-role client. `public.leads` has no anon INSERT policy — every insert
// policy requires an authenticated staff role — so a public form can only write
// with the service role, which bypasses RLS.
//
// This module is server-only and must never be imported from a Client
// Component. The key is a full-access credential: never prefix it NEXT_PUBLIC_.
export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the environment."
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// Every website lead is attributed to this auth.users id, because
// leads.created_by_user_id is NOT NULL and references auth.users.
export function getLeadAuthorId() {
  const id = process.env.LEADS_CREATED_BY_USER_ID;
  if (!id) {
    throw new Error("LEADS_CREATED_BY_USER_ID is not set; leads.created_by_user_id cannot be null.");
  }
  return id;
}
