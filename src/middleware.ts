import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { PAGE_URL } from './utils/helper'

export function middleware(request: NextRequest) {
    const userId = request.cookies.get('userId')?.value
    const { pathname } = request.nextUrl
    const isAuthPage = pathname === PAGE_URL.LOGIN || pathname === PAGE_URL.SIGNUP

    if (!userId && !isAuthPage) {
        // Not authenticated, redirect to login if not already there
        return NextResponse.redirect(new URL(PAGE_URL.LOGIN, request.url))
    }

    if (userId && isAuthPage) {
        // Authenticated users should not see login/signup
        return NextResponse.redirect(new URL(PAGE_URL.HOME, request.url))
    }

    // Continue to requested route
    return NextResponse.next()
}

export const config = {
    matcher: [
      '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
  }
  