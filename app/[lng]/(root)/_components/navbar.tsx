import Logo from '@/components/shared/logo'
import ModeToggle from '@/components/shared/mode-toggle'
import { Button } from '@/components/ui/button'
import { navlinks } from '@/constants'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import GlobalSearch from './global-search'
import LangDropdown from '@/components/shared/lang-dropdown'
import {
  SignInButton,
  SignUpButton,
  UserButton,
  UserProfile,
} from '@clerk/nextjs'
import { Show } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <div className='fixed inset-0 z-40 h-20 bg-background/70 backdrop:blur-xl'>
      <div className='container mx-auto flex h-full max-w-7xl items-center justify-between border-b'>
        <div className='flex items-center gap-4'>
          <Logo />
          <div className='flex items-center gap-3 border-l pl-2'>
            {navlinks.map(link => (
              <Link
                href={`/${link.route}`}
                key={link.route}
                className='font-medium hover:text-blue-500 hover:underline transition-all'
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-2 border-r pr-3'>
            <GlobalSearch />
            <LangDropdown />
            <Button size={'icon'} variant={'ghost'}>
              <ShoppingCart />
            </Button>
            <ModeToggle />
          </div>

          <Show when={'signed-in'}>
            <UserButton />
          </Show>
          <Show when={'signed-out'}>
            <SignInButton mode='modal'>
              <Button size={'lg'} variant={'ghost'} rounded={'full'}>
                Log in
              </Button>
            </SignInButton>

            <SignUpButton mode='modal'>
              <Button rounded={'full'} size={'lg'}>
                Sign Up
              </Button>
            </SignUpButton>
          </Show>
        </div>
      </div>
    </div>
  )
}

export default Navbar
