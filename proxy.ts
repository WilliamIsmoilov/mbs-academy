import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import createMiddleware from 'next-intl/middleware'
import { NextRequest } from 'next/server'

const intlMiddleware = createMiddleware({
  locales: ['en', 'ru', 'uz', 'tr', 'kr'],
  defaultLocale: 'en',
})

const isPublicRoute = createRouteMatcher([
  '/',
  '/:lng',
  '/:lng/courses',
  '/:lng/courses/:slug',
  '/:lng/blogs',
  '/:lng/blogs/:slug',
  '/:lng/contact',
  '/:lng/sign-in',
  '/:lng/sign-up',
  '/:lng/api/uploadthing',
])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
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
