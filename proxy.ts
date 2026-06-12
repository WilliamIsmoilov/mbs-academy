import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import createMiddleware from 'next-intl/middleware'
import { NextRequest } from 'next/server'

const locales = ['en', 'uz', 'ru', 'kr', 'tr']

const handleI18nRouting = createMiddleware({
  locales,
  defaultLocale: 'en',
})

const isPublicRoute = createRouteMatcher(['/:lng', '/:lng/'])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
  return handleI18nRouting(req as NextRequest)
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/__clerk/:path*',
    '/(api|trpc)(.*)',
  ],
}
