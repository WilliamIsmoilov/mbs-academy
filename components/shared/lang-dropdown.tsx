'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { Languages } from 'lucide-react'
import Image from 'next/image'
import { lngs } from '@/constants'
import Link from 'next/link'
import { LngParams } from '@/types/indeex'
import { cn } from '@/lib/utils'
import { useParams } from 'next/navigation'

const LangDropdown = () => {
  const { item } = useParams()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size={'icon'}>
          <Languages />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-52'>
        <DropdownMenuGroup>
          {lngs.map(lng => (
            <Link href={`/${lng.route}`} key={lng.route}>
              <DropdownMenuItem
                className={cn(item === lng.route && 'bg-secondary')}
              >
                <Image
                  src={`/assets/locales/${lng.route}.png`}
                  alt={lng.label}
                  width={30}
                  height={30}
                  className='w-auto'
                />
                <span className='ml-2 font-spaceGrotesk font-medium'>
                  {lng.label}
                </span>
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LangDropdown
