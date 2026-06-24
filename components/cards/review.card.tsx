'use client'

import dynamic from 'next/dynamic'
const ReactStars = dynamic(() => import('react-stars'), { ssr: false })
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const ReviewCard = () => {
  return (
    <div className='mt-6 border-t border-t-secondary'>
      <div className='mt-8 flex gap-2'>
        <Avatar>
          <AvatarImage
            src={
              'https://blenderartists.org/uploads/default/original/4X/d/e/e/dee7e0927a623552d5ff659be913b3c12e1156f9.jpeg'
            }
          />
          <AvatarFallback className='uppercase'>SB</AvatarFallback>
        </Avatar>

        <div className='flex flex-col'>
          <div>John Doe</div>
          <div className='flex items-center gap-1'>
            <ReactStars value={4.5} edit={false} color2='#DD6B20' />
            <p className='text-sm opacity-50'>5 minut oldin</p>
          </div>
        </div>
      </div>

      <div className='mt-2'>Kurs prosta bomba 🔥</div>
    </div>
  )
}

export default ReviewCard
