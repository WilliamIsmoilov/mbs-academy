'use client'

import React from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'
import { Flag } from 'lucide-react'
import dynamic from 'next/dynamic'
const ReactStars = dynamic(() => import('react-stars'), { ssr: false })

const InstructorReviewCard = () => {
  return (
    <div className='flex gap-4 border-b pb-4'>
      <div className='flex-1'>
        <div className='flex gap-3'>
          <Avatar>
            <AvatarFallback className='uppercase'>SB</AvatarFallback>
          </Avatar>

          <div className='flex flex-col'>
            <div className='font-spaceGrotesk text-sm'>
              John Doe
              <span className='text-xs text-muted-foreground'> 3 days ago</span>
            </div>
            <ReactStars value={4.5} edit={false} color2='#E59819' />

            <div className='font-spaceGrotesk font-bold'>
              Full Course Reactjs
            </div>
            <p className='text-sm text-muted-foreground'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
              amet reprehenderit tenetur voluptas nesciunt corrupti, omnis
              molestiae et expedita, accusantium at debitis adipisci illo odit
              error porro velit iusto. Nobis!
            </p>
          </div>
        </div>
      </div>

      <Button variant={'ghost'} className='self-start'>
        <Flag className='text-muted-foreground' />
      </Button>
    </div>
  )
}

export default InstructorReviewCard
