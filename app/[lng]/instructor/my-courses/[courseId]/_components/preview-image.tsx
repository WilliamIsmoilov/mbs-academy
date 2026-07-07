'use client'

import { ICourse } from '@/app.types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import useToggleEdit from '@/hooks/use-toggle-edit'
import { Edit2, X } from 'lucide-react'
import Image from 'next/image'
import { use } from 'react'

const PreviewImage = (course: ICourse) => {
  const { state, onToggle } = useToggleEdit()

  return (
    <Card>
      <CardContent className='relative p-6'>
        <div className='flex items-center justify-between'>
          <span className='text-lg font-medium'>Replace image</span>
          <div className=''>
            <Button size={'icon'} variant={'ghost'} onClick={onToggle}>
              {state ? <X /> : <Edit2 className='size-5' />}
            </Button>
          </div>
        </div>
        <Separator className='my-3' />
        {state ? (
          //   <Forms course={course} onToggle={onToggle} />
          <div>Forms</div>
        ) : (
          <div className='relative h-72 w-full'>
            <Image
              src={course.previewImage}
              alt={course.title}
              fill
              className='rounded-sm object-cover'
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default PreviewImage
