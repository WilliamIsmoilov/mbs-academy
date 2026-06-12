'use client'

import { ChildProps } from '@/types/indeex'
import { CookiesProvider } from 'react-cookie'

export default function CookieProviders({ children }: ChildProps) {
  return <CookiesProvider>{children}</CookiesProvider>
}
