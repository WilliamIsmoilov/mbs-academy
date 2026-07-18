'use client'

import { ILessonField } from '@/actions/types'
import { ISection } from '@/app.types'
import FillLoading from '@/components/shared/fill-loading'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import useToggleEdit from '@/hooks/use-toggle-edit'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit2, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import z from 'zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { lessonFieldSchema } from '@/lib/validation'
import { toast } from 'sonner'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createLesson } from '@/actions/lesson.action'

interface Props {
  section: ISection
}
const Lessons = ({ section }: Props) => {
  const { state, onToggle } = useToggleEdit()
  const [isLoading, setIsLoading] = useState(false)
  const path = usePathname()
  const lesson: any[] = []

  const onAdd = async (lesson: ILessonField) => {
    setIsLoading(true)
    return createLesson({ lesson, section: section._id, path })
      .then(() => onToggle())
      .finally(() => setIsLoading(false))
  }

  return (
    <Card>
      <CardContent className='relative p-6'>
        {isLoading && <FillLoading />}
        <div className='flex items-center justify-between'>
          <span className='text-lg font-medium'> Manage Chapters </span>
          <Button size={'icon'} variant={'ghost'} onClick={onToggle}>
            {state ? <X /> : <Edit2 />}
          </Button>
        </div>
        <Separator className='my-3' />

        {state ? (
          <Forms
            lesson={{} as ILessonField}
            handler={onAdd}
            section={section}
          />
        ) : (
          <>
            {!lesson.length ? (
              <p className='mt-2 text-sm text-muted-foreground'>
                No chapters have been added yet.
              </p>
            ) : (
              <p>Lessons</p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default Lessons

interface Props {
  lesson: ILessonField
  handler: (lesson: ILessonField) => Promise<void>
}
function Forms({ handler, lesson }: Props) {
  const { title, content, videoUrl, hours, minutes, seconds } = lesson

  const [isLoading, setIsLoading] = useState(false)

  const pathname = usePathname()

  const form = useForm<z.infer<typeof lessonFieldSchema>>({
    resolver: zodResolver(lessonFieldSchema),
    defaultValues: {
      title,
      content,
      videoUrl,
      hours: `${hours}`,
      minutes: `${minutes}`,
      seconds: `${seconds}`,
    },
  })

  const onSubmit = (data: z.infer<typeof lessonFieldSchema>) => {
    const promise = handler(data).finally(() => form.reset())

    toast.promise(promise, {
      loading: 'Loading...',
      success: 'Lesson created successfully',
      error: 'Something went wrong',
    })
  }
  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col space-y-3'
      >
        <Controller
          name='title'
          control={form.control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor='checkout-7j9-card-name-43j'>
                Lesson title
                <span className='text-red-500'>*</span>
              </FieldLabel>
              <Input
                disabled={isLoading}
                {...field}
                placeholder='e.g. What is Javascript'
                className='bg-secondary'
              />
            </Field>
          )}
        />

        <Controller
          name='videoUrl'
          control={form.control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor='checkout-7j9-card-name-43j'>
                Video URL
                <span className='text-red-500'>*</span>
              </FieldLabel>
              <Textarea
                disabled={isLoading}
                {...field}
                placeholder='e.g. Embed video url'
                className='bg-secondary'
              />
            </Field>
          )}
        />

        <Controller
          name='content'
          control={form.control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor='checkout-7j9-card-name-43j'>
                Content
                <span className='text-red-500'>*</span>
              </FieldLabel>
              <Textarea
                disabled={isLoading}
                {...field}
                placeholder='e.g. Content'
                className='bg-secondary'
              />
            </Field>
          )}
        />

        <div className='grid grid-cols-3 gap-2 '>
          <Controller
            name='hours'
            control={form.control}
            render={({ field }) => (
              <Field>
                <Input
                  disabled={isLoading}
                  {...field}
                  placeholder='Hours'
                  className='bg-secondary'
                  type='number'
                />
              </Field>
            )}
          />

          <Controller
            name='minutes'
            control={form.control}
            render={({ field }) => (
              <Field>
                <Input
                  disabled={isLoading}
                  {...field}
                  placeholder='Minutes'
                  className='bg-secondary'
                  type='number'
                />
              </Field>
            )}
          />

          <Controller
            name='seconds'
            control={form.control}
            render={({ field }) => (
              <Field>
                <Input
                  disabled={isLoading}
                  {...field}
                  placeholder='Seconds'
                  className='bg-secondary'
                  type='number'
                />
              </Field>
            )}
          />
        </div>

        <div className='flex items-center gap-2'>
          <Button disabled={isLoading} type='submit' className='px-4 h-10'>
            Add
          </Button>
        </div>
      </form>
    </>
  )
}
