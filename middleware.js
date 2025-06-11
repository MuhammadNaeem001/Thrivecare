import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  // Log the path to ensure the middleware is triggered
  console.log("Middleware triggered for path:", req.nextUrl.pathname);

  // Retrieve the token from cookies (to check if the user is authenticated)
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Log the token to check if it's being retrieved
  console.log("Token:", token);

  // Define restricted paths (where logged-in users should not go)
  const restrictedPaths = ['/auth/signin', '/auth/signup'];

  // If the user is authenticated and trying to access restricted paths
  if (token && restrictedPaths.includes(req.nextUrl.pathname)) {
    console.log("Redirecting to homepage... User is authenticated.");

    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

// Define which routes the middleware will handle
export const config = {
  matcher: ['/'], // Only match these paths for middleware
  // matcher: ['/auth/signin', '/auth/signup'], 
};