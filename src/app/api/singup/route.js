// import { supabase } from "@/app/lib/supabase";

// export async function POST(req,res) {
//   const { email, password } = await req.json();


//   // Create user in Supabase
//   const { data, error } = await supabase.auth.signUp({
//     email,
//     password,
//     options: {
//       data: { email_confirmed_at: null } // Track verification status
//     }
//   });

//   if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });

//   // Send OTP
//   const { error: otpError } = await supabase.auth.signInWithOtp({
//     email,
//     options: { shouldCreateUser: false }
//   });

//   if (otpError) return new Response(JSON.stringify({ error: otpError.message }), { status: 400 });

//   new Response(JSON.stringify({ message: "Check your email for the verification link." }), { status: 200 });
// } 




import { supabase } from '@/app/lib/supabase.js';

export default async function handler (req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return new Response(
      JSON.stringify({ error: `Method ${req.method} Not Allowed` }),
      { status: 405 }
    );
  }

  const { email, password } = req.body;         // Next.js parses JSON for you

  // 1 – create user (Supabase sends the confirmation link)
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
    }
  });

  if (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400 }
    );  
  }

  return new Response(
    JSON.stringify({ message: 'Check your email for the verification link.' }),
    { status: 200 }
  );
}
