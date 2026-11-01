import React from 'react'
import { title } from 'process'
import Image from 'next/image'

interface Props {
  title: string
  desc: string
}
const NoResult = ({ desc, title }: Props) => {
  return (
    <div className=' mt-10 flex w-full flex-col items-center justify-center'>
      <Image
        src='/assets/notfound.webp'
        width={270}
        height={270}
        className='block object-contain'
        alt='not found'
      />

      <h2 className='mt-8  font-spaceGrotesk text-2xl  font-bold'>{title}</h2>
      <p className='my-3.5  max-w-md text-center'>{desc}</p>
    </div>
  )
}

export default NoResult
