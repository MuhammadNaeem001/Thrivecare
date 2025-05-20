// import supabase from "@/app/utils/supabase/server"
// import { NextResponse } from "next/server"

// export async function GET(request) {
//   const requestUrl = new URL(request.url)
//   const code = requestUrl.searchParams.get("token")
// console.log(code);

//   if (code) {
//     await supabase.auth.exchangeCodeForSession(code)
//   }

//   return NextResponse.redirect(new URL("/auth/signin", request.url))
// }


import supabase from '@/app/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const url = new URL(request.url)
  const token = url.searchParams.get('token')
  const type = url.searchParams.get('type')

  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 })
  }

  // Exchange token for session (Supabase method)
  const { data, error } = await supabase.auth.verifyEmail(token)

  if (error) {
    console.error('Verification error:', error.message)
    return NextResponse.redirect(new URL('/auth/signin?error=verification_failed', request.url))
  }

  // If needed, you can set cookies/session here

  // Redirect user after successful verification
  return NextResponse.redirect(new URL('/', request.url)) // or wherever you want
}
