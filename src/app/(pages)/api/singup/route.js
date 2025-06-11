import supabase, { createClient } from "@/app/utils/supabase/server";




export async function POST (req, res) {
  
  const { email, password,fullName,contactNo } =await req.json();         // Next.js parses JSON for you

console.log(email,password,fullName,contactNo)  
  
// const supabase = createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `http://localhost:3000/api/callback`
    }
  });

  const saveToSupabseDatabase = await supabase.from("users").insert({
    email: email,
    password: password,
    fullName,
    phone:contactNo

  })

  console.log(saveToSupabseDatabase)


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
