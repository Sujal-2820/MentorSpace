// src/app/utils/middleware.js
import { NextResponse } from 'next/server';
import { supabase } from '@supabase-client';

export async function middleware(req) {
  const token = req.cookies.get('supabase-auth-token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], // Protect dashboard routes
};
