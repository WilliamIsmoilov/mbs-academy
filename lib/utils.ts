import { enUS, koKR, trTR, ruRU } from '@clerk/localizations'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { uzUZ } from './uz-UZ'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function localization(lng: string) {
  if (lng === 'en') return enUS
  if (lng === 'kr') return koKR
  if (lng === 'tr') return trTR
  if (lng === 'ru') return ruRU
  if (lng === 'uz') return uzUZ
}

export function getCurrentLng(lng: string) {
  if (lng === 'en') return 'English'
  if (lng === 'ru') return 'Русский'
  if (lng === 'tr') return 'Türkçe'
  if (lng === 'uz') return 'O‘zbek'
  if (lng === 'kr') return '한국어'
}
