import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET });

  const restrictedPaths = ['/auth/signin', '/auth/signup'];


  if (token && restrictedPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', req.url));  
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/signin', '/auth/signup'], 
};
