import { supabase } from "@/app/lib/supabase";

export default async function handler (req, res) {
  const { code } = req.query;           // `?code=…` comes from the email link

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);   // verifies + signs in
  }

  // Redirect to sign-in with a flag so your UI can show “Verified!”
  res.redirect(302, `/auth/sign-in?verified=1`);
}
