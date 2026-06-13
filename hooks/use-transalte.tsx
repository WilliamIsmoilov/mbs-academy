'use client'

import { useTranslation } from '@/i18n/client'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

const useTranslate = () => {
  const { lng } = useParams()
  const { t } = useTranslation(lng as string)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // mounted bo'lmagan holda key ni qaytaradi — server bilan mos keladi
  if (!mounted) return (key: string) => key

  return t
}

export default useTranslate
