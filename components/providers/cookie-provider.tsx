// components/shared/cookies-provider.tsx
'use client'
import { CookiesProvider } from 'react-cookie'

export default function CookiesProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <CookiesProvider>{children}</CookiesProvider>
}
