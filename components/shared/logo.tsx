import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href={'/'} className='flex items-center gap-2'>
      <Image width={50} height={50} src={'/logo.png'} alt='logo' />
      <h1 className='font-spaceGrotesk text-4xl font-bold'>MBS</h1>
    </Link>
  )
}

export default Logo
