'use client'

import { useTranslation } from '@/i18n/client'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { cookieName } from '@/i18n/settings'

const useTranslate = () => {
  const params = useParams()
  const lng = (params?.lng as string) || 'en'

  const { t, i18n } = useTranslation(lng)

  const [mounted, setMounted] = useState(false)
  const [cookies, setCookie] = useCookies([cookieName])

  // hydration safe
  useEffect(() => {
    setMounted(true)
  }, [])

  // sync cookie → i18n (ONLY ONCE)
  useEffect(() => {
    if (!mounted) return

    const cookieLng =
      cookies.i18next ||
      document.cookie
        .split('; ')
        .find(r => r.startsWith('i18next='))
        ?.split('=')[1]

    if (!cookieLng) return
    if (i18n.resolvedLanguage === cookieLng) return

    i18n.changeLanguage(cookieLng)
  }, [mounted])

  // sync i18n → cookie
  useEffect(() => {
    if (!mounted) return
    if (!i18n.resolvedLanguage) return

    if (cookies.i18next !== i18n.resolvedLanguage) {
      setCookie(cookieName, i18n.resolvedLanguage, { path: '/' })
    }
  }, [mounted, i18n.resolvedLanguage])

  return t
}

export default useTranslate
