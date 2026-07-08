'use client'

import { updateCourse } from '@/actions/course.action'
import { ICourse } from '@/app.types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import useToggleEdit from '@/hooks/use-toggle-edit'
import { Edit2, X } from 'lucide-react'

import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { priceFieldSchema } from '@/lib/validation'
import FillLoading from '@/components/shared/fill-loading'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

const Price = (course: ICourse) => {
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
              <span className='font-space-grotesk font-bold text-muted-foreground'>
                Old price:
              </span>
              <span className='font-medium'>
                {course.oldPrice.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='font-space-grotesk font-bold text-muted-foreground'>
                Current price:
              </span>
              <span className='font-medium'>
                {course.currentPrice.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default Price

interface FormProps {
  course: ICourse
  onToggle: () => void
}

function Forms({ course, onToggle }: FormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  const form = useForm<z.infer<typeof priceFieldSchema>>({
    resolver: zodResolver(priceFieldSchema),
    defaultValues: {
      oldPrice: ` ${course.oldPrice}`,
      currentPrice: `${course.currentPrice}`,
    },
  })

  const onSubmit = (data: z.infer<typeof priceFieldSchema>) => {
    setIsLoading(true)
    const { currentPrice, oldPrice } = data
    const promise = updateCourse(
      course._id,
      { currentPrice: +currentPrice, oldPrice: +oldPrice },
      pathname,
    )
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
          name='oldPrice'
          control={form.control}
          render={({ field }) => (
            <Field>
              <FieldLabel>
                Old price<span className='text-red-500'>*</span>
              </FieldLabel>
              <Input disabled={isLoading} {...field} />
            </Field>
          )}
        />
        <Controller
          name='currentPrice'
          control={form.control}
          render={({ field }) => (
            <Field>
              <FieldLabel>
                Current Price<span className='text-red-500'>*</span>
              </FieldLabel>
              <Input disabled={isLoading} {...field} />
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
