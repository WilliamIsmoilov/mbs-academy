'use client'
import { Button } from '@/components/ui/button'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet'
import { AlignCenter, ShoppingCart } from 'lucide-react'
import Logo from '@/components/shared/logo'
import { Separator } from '@/components/ui/separator'
import { navlinks } from '@/constants'
import Link from 'next/link'
import useTranslate from '@/hooks/use-transalte'
import LangDropdown from '@/components/shared/lang-dropdown'
import GlobalSearch from './global-search'
import ModeToggle from '@/components/shared/mode-toggle'
const Mobile = () => {
  const t = useTranslate()
  return (
    <Sheet>
      <SheetTrigger asChild className='md:hidden'>
        <Button variant={'ghost'} size={'icon'}>
          <AlignCenter />
        </Button>
      </SheetTrigger>
      <SheetContent side='top'>
        <SheetHeader>
          <Logo />
          <Separator />
        </SheetHeader>
        <div className='mt-4 flex flex-col space-y-3 px-4'>
          {navlinks.map(link => (
            <Link
              href={`/${link.route}`}
              key={link.route}
              className='flex h-12 cursor-pointer items-center gap-2 rounded-sm px-3 transition-colors hover:bg-blue-400/20'
            >
              <link.icon className='size-5' />
              <span>{t(link.name)}</span>
            </Link>
          ))}
          <LangDropdown isMobile />
          <div className='flex items-center justify-center gap-4 py-2'>
            <Button size={'icon'} variant={'ghost'}>
              <ShoppingCart />
            </Button>
            <GlobalSearch />
            <ModeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default Mobile
