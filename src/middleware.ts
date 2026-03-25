import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Laisser passer la page de login et les API publiques
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Protéger toutes les routes /admin
  if (pathname.startsWith('/admin')) {
    const adminToken = request.cookies.get('admin_token')?.value;
    const validToken = process.env.ADMIN_SECRET ?? 'letampon2026admin';

    if (adminToken !== validToken) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
