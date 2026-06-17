'use client'

import { FaXTwitter } from 'react-icons/fa6'
import { SlSocialFacebook } from 'react-icons/sl'
import { FiLinkedin } from 'react-icons/fi'
import { PiTelegramLogoDuotone } from 'react-icons/pi'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { toast } from 'sonner'
import { Link2 } from 'lucide-react'

const ShareBtns = () => {
  const pathname = usePathname()
  const onCopy = () => {
    const link = process.env.NEXT_PUBLIC_BASE_URL + pathname
    navigator.clipboard
      .writeText(link)
      .then(() => toast.success('Link copied to clipboard'))
  }

  return (
    <div className='flex flex-col max-md:flex-row md:space-y-3 max-md:space-x-3 mt-4'>
      <Button variant={'outline'} size={'icon'} onClick={onCopy}>
        <FaXTwitter />
      </Button>
      <Button variant={'outline'} size={'icon'} onClick={onCopy}>
        <SlSocialFacebook />
      </Button>
      <Button variant={'outline'} size={'icon'} onClick={onCopy}>
        <FiLinkedin />
      </Button>
      <Button variant={'outline'} size={'icon'} onClick={onCopy}>
        <PiTelegramLogoDuotone />
      </Button>
      <Button variant={'outline'} size={'icon'} onClick={onCopy}>
        <Link2 />
      </Button>
    </div>
  )
}

export default ShareBtns
