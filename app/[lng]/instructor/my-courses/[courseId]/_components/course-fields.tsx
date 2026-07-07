'use client'

import { updateCourse } from '@/actions/course.action'
import { ICourse } from '@/app.types'
import FillLoading from '@/components/shared/fill-loading'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Field, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import useToggleEdit from '@/hooks/use-toggle-edit'
import { courseFieldSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit2, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

const CourseFields = (course: ICourse) => {
  const { state, onToggle } = useToggleEdit()
  return (
    <Card>
      <CardContent className='relative p-6'>
        <div className='flex items-center justify-between'>
          <span className='text-lg font-medium'>Course Title</span>
          <Button size={'icon'} variant={'ghost'} onClick={onToggle}>
            {state ? <X /> : <Edit2 />}
          </Button>
        </div>
        <Separator className='my-3' />
        {state ? (
          <Forms course={course} onToggle={onToggle} />
        ) : (
          <div className='flex flex-col space-y-2'>
            <div className='flex items-center gap-2'>
              <span className='font-spaceGrotesk font-medium text-muted-foreground'>
                Title:
              </span>
              <span>{course.title}</span>
            </div>

            <div className='flex items-center gap-2'>
              <span className='font-spaceGrotesk font-medium text-muted-foreground'>
                Slug:
              </span>
              <span>{course.slug ?? 'Not configured'}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface FormProps {
  course: ICourse
  onToggle: () => void
}
function Forms({ course, onToggle }: FormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  const form = useForm<z.infer<typeof courseFieldSchema>>({
    resolver: zodResolver(courseFieldSchema),
    defaultValues: {
      title: course.title,
      slug: course.slug,
    },
  })

  const onSubmit = (data: z.infer<typeof courseFieldSchema>) => {
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
          name='title'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                disabled={isLoading}
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder='Course title'
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name='slug'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <Input
                disabled={isLoading}
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder='Course slug'
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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

export default CourseFields
