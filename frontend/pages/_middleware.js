import { NextResponse } from 'next/server';

export function middleware(req) {
  const res = NextResponse.next();
  const { url } = req;
  const cookie = req.cookies?.user;

  if (url.includes('/dashboard')) {
    if (cookie === undefined) {
      return NextResponse.redirect(`${process.env.SITE_URL}/auth/login`);
    }
  }

  return res;
}
