// pages/api/auth/verify-otp.ts

import { supabase } from "@/app/lib/supabase";

export async function POST(req, res) {

  const { email, otp } = await req.json();

  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: "email",
  });

  if (error) return res.status(400).json({ error: error.message });

  // Update email confirmation status
  await supabase.auth.updateUser({
    data: { email_confirmed_at: new Date().toISOString() }
  });

  res.status(200).json({ success: true });
}