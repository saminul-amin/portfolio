import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // This middleware runs on the server
  // Client-side auth check is handled in dashboard layout
  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};