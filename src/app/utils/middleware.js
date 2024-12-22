// src/app/utils/middleware.js
import { NextResponse } from 'next/server';
import { supabase } from '@supabase-client';

export async function middleware(req) {
  const { data: user } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/mentorDashboard/:path*',
    '/menteeDashboard/:path*'
  ],
   // Protect dashboard routes
};
