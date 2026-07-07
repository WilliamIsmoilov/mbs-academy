'use client'

import { updateCourse } from '@/actions/course.action'
import { ICourse } from '@/app.types'
import FillLoading from '@/components/shared/fill-loading'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Field, FieldLabel } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { courseCategory, courseLanguage, courseLevels } from '@/constants'
import useToggleEdit from '@/hooks/use-toggle-edit'
import { selectFieldsSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit2, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

const SelectFields = (course: ICourse) => {
  const { state, onToggle } = useToggleEdit()
  return (
    <Card>
      <CardContent className='relative p-6'>
        <div className='flex items-center justify-between'>
          <span className='text-lg font-medium'>Select Fields</span>
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
                Language:
              </span>
              <span className='font-medium'>{course.language}</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='font-space-grotesk font-bold text-muted-foreground'>
                Category:
              </span>
              <span className='font-medium'>{course.category}</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='font-space-grotesk font-bold text-muted-foreground'>
                Level:
              </span>
              <span className='font-medium'>{course.level}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default SelectFields

interface FormProps {
  course: ICourse
  onToggle: () => void
}

function Forms({ course, onToggle }: FormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const pathname = usePathname()

  const form = useForm<z.infer<typeof selectFieldsSchema>>({
    resolver: zodResolver(selectFieldsSchema),
    defaultValues: {
      language: course.language,
      category: course.category,
      level: course.level,
    },
  })

  const onSubmit = (data: z.infer<typeof selectFieldsSchema>) => {
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
        <Controller
          name='language'
          control={form.control}
          render={({ field }) => (
            <Field>
              <FieldLabel>
                Language<span className='text-red-500'>*</span>
              </FieldLabel>
              <Select
                value={field.value ?? ''}
                onValueChange={field.onChange}
                disabled={isLoading}
              >
                <SelectTrigger className='w-full bg-secondary'>
                  <SelectValue placeholder={'Select'} />
                </SelectTrigger>
                <SelectContent>
                  {courseLanguage.map(item => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <Controller
          name='category'
          control={form.control}
          render={({ field }) => (
            <Field>
              <FieldLabel>
                Category<span className='text-red-500'>*</span>
              </FieldLabel>
              <Select
                value={field.value ?? ''}
                onValueChange={field.onChange}
                disabled={isLoading}
              >
                <SelectTrigger className='w-full bg-secondary'>
                  <SelectValue placeholder={'Select'} />
                </SelectTrigger>
                <SelectContent>
                  {courseCategory.map(item => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <Controller
          name='level'
          control={form.control}
          render={({ field }) => (
            <Field>
              <FieldLabel>
                Level<span className='text-red-500'>*</span>
              </FieldLabel>
              <Select
                value={field.value ?? ''}
                onValueChange={field.onChange}
                disabled={isLoading}
              >
                <SelectTrigger className='w-full bg-secondary'>
                  <SelectValue placeholder={'Select'} />
                </SelectTrigger>
                <SelectContent>
                  {courseLevels.map(item => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
