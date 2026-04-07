import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BOT_REGEX = /bot|crawl|spider|slurp|mediapartners-google|googlebot|bingbot|baiduspider|yandex|duckduck/i;

export function middleware(req: NextRequest) {
  const ua = (req.headers.get('user-agent') || '').toLowerCase();

  // If the user-agent looks like a crawler/bot, block it with 403
  if (BOT_REGEX.test(ua)) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  // run middleware for all routes (including API)
  matcher: '/:path*',
};
