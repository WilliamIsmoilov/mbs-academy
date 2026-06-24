import React from 'react'
import Header from '../_components/header'
import { Separator } from '@/components/ui/separator'
import InstructorReviewCard from '@/components/cards/instructor-review'

const Page = () => {
  return (
    <>
      <Header
        title='Reviews'
        description='Here you can see all the reviews of your courses'
      />

      <div className='mt-4 rounded-md bg-background p-4'>
        <h3 className='font-spaceGrotesk text-lg font-medium'> All Reviews</h3>
        <Separator className='my-3' />

        <div className='flex flex-col space-y-3'>
          <InstructorReviewCard />
          <InstructorReviewCard />
          <InstructorReviewCard />
        </div>
      </div>
    </>
  )
}

export default Page
