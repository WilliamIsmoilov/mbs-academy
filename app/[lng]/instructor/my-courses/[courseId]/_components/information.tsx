'use client'

import { updateCourse } from '@/actions/course.action'
import { ICourse } from '@/app.types'
import FillLoading from '@/components/shared/fill-loading'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Field, FieldLabel } from '@/components/ui/field'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import useToggleEdit from '@/hooks/use-toggle-edit'
import { informationFieldSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit2, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

const Information = (course: ICourse) => {
  const { onToggle, state } = useToggleEdit()
  return (
    <Card>
      <CardContent className='relative p-6'>
        <div className='flex items-center justify-between'>
          <span className='text-lg font-medium'>Information</span>
          <Button size={'icon'} variant={'ghost'} onClick={onToggle}>
            {state ? <X /> : <Edit2 />}
          </Button>
        </div>
        <Separator className='my-3' />

        {state ? (
          <Forms course={course} onToggle={onToggle} />
        ) : (
          <div className='flex flex-col space-y-2'>
            <div className='grid grid-cols-3 gap-2'>
              <div className='col-span-1 font-space-grotesk font-bold text-muted-foreground'>
                Requirements:
              </div>
              <div className='col-span-2 line-clamp-3'>
                {course.requirements}
              </div>
            </div>
            <div className='grid grid-cols-3 gap-2'>
              <div className='col-span-1 font-space-grotesk font-bold text-muted-foreground'>
                Learning:
              </div>
              <div className='col-span-2 line-clamp-3'>{course.learning}</div>
            </div>
            <div className='grid grid-cols-3 gap-2'>
              <div className='col-span-1 font-space-grotesk font-bold text-muted-foreground'>
                Tags:
              </div>
              <div className='col-span-2 line-clamp-3'>{course.tags}</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default Information

interface FormProps {
  course: ICourse
  onToggle: () => void
}

function Forms({ course, onToggle }: FormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const pathname = usePathname()

  const form = useForm<z.infer<typeof informationFieldSchema>>({
    resolver: zodResolver(informationFieldSchema),
    defaultValues: {
      learning: course.learning,
      requirements: course.requirements,
      tags: course.tags,
    },
  })

  const onSubmit = (data: z.infer<typeof informationFieldSchema>) => {
    setIsLoading(true)
    const promise = updateCourse(course._id, data, pathname)
      .then(() => onToggle())
      .finally(() => {
        setIsLoading(false)
      })

    toast.promise(promise, {
      loading: 'Loading...',
      success: 'Course updated successfully',
      error: 'Something went wrong',
    })
  }
  return (
    <>
      {isLoading && <FillLoading />}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col space-y-3'
      >
        {' '}
        <Controller
          name='requirements'
          control={form.control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor='checkout-7j9-card-name-43j'>
                Requirements
              </FieldLabel>
              <Textarea disabled={isLoading} {...field} />
            </Field>
          )}
        />
        <Controller
          name='learning'
          control={form.control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor='checkout-7j9-card-name-43j'>
                Learning
              </FieldLabel>
              <Textarea disabled={isLoading} {...field} />
            </Field>
          )}
        />
        <Controller
          name='tags'
          control={form.control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor='checkout-7j9-card-name-43j'>Tags</FieldLabel>
              <Textarea disabled={isLoading} {...field} />
            </Field>
          )}
        />
        <Button disabled={isLoading} type='submit' className='self-end'>
          Save
        </Button>
      </form>
    </>
  )
}
