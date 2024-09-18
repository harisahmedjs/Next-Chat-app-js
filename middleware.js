import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'; 

const protectedRoutes = ["/home"];

export function middleware(req) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.startsWith('/static')) {
    return NextResponse.next();
  }

  const token = cookies().get('token')?.value;

  console.log(`Token: ${token}`);

  if (!token && protectedRoutes.some(route => pathname.startsWith(route))) {
    const loginUrl = new URL("/", req.nextUrl.origin); 

    console.log(`Redirecting to login: ${loginUrl.href}`);
    
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next(); // Allow the request to continue if token exists or route is not protected
}
