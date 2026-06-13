import { clerkMiddleware } from '@clerk/nextjs/server'
import createMiddleware from 'next-intl/middleware'
import { NextRequest } from 'next/server'

const intlMiddleware = createMiddleware({
  locales: ['en', 'ru', 'uz', 'tr', 'kr'],
  defaultLocale: 'en',
})

export default clerkMiddleware(async (auth, req) => {
  return intlMiddleware(req as NextRequest)
})

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)',
    '/',
    '/(api|trpc)(.*)',
    '/__clerk/(.*)',
  ],
}
