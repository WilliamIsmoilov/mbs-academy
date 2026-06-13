'use client'

import Logo from '@/components/shared/logo'
import ModeToggle from '@/components/shared/mode-toggle'
import { Button } from '@/components/ui/button'
import { navlinks } from '@/constants'
import { LogIn, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import GlobalSearch from './global-search'
import LangDropdown from '@/components/shared/lang-dropdown'
import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { Show } from '@clerk/nextjs'
import UserBox from '@/components/shared/user-box'
import useTranslate from '@/hooks/use-transalte'
import Mobile from './mobile'

const Navbar = () => {
  const t = useTranslate()
  return (
    <div className='fixed inset-0 z-40 h-20 bg-background/70 backdrop:blur-xl px-4'>
      <div className='container mx-auto flex h-full max-w-7xl items-center justify-between border-b'>
        <div className='flex items-center gap-4'>
          <Logo />
          <div className='md:flex  hidden items-center gap-3 border-l pl-2'>
            {navlinks.map(link => (
              <Link
                href={`/${link.route}`}
                key={link.route}
                className='font-medium hover:text-blue-500 hover:underline transition-all'
              >
                {t(link.name)}
              </Link>
            ))}
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-2 md:border-r md:pr-3'>
            <div className='hidden md:flex'>
              <GlobalSearch />
              <LangDropdown />
              <Button size={'icon'} variant={'ghost'}>
                <ShoppingCart />
              </Button>
            </div>
            <Mobile />
            <ModeToggle />
          </div>

          <Show when={'signed-in'}>
            <UserBox />
          </Show>
          <Show when={'signed-out'}>
            <SignInButton mode='modal'>
              <Button
                size={'lg'}
                variant={'ghost'}
                rounded={'full'}
                className='md:flex hidden'
              >
                {t('logIn')}
              </Button>
            </SignInButton>

            <SignUpButton mode='modal'>
              <Button rounded={'full'} size={'lg'} className='md:flex hidden'>
                {t('signUp')}
              </Button>
            </SignUpButton>
            <SignInButton mode='modal'>
              <Button size={'icon'} variant={'ghost'} className='md:hidden'>
                <LogIn />
              </Button>
            </SignInButton>
          </Show>
        </div>
      </div>
    </div>
  )
}

export default Navbar
