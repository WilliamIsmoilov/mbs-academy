'use client'

import { ICourse } from '@/app.types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import useToggleEdit from '@/hooks/use-toggle-edit'
import { BadgePlus, Edit2, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { sectionFieldSchema } from '@/lib/validation'
import FillLoading from '@/components/shared/fill-loading'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { createSelection } from '@/actions/section.action'

interface Props {
  course: ICourse
}
const Sections = ({ course }: Props) => {
  const section = []
  const { state, onToggle } = useToggleEdit()
  return (
    <Card>
      <CardContent className='relative p-6'>
        <div className='flex items-center justify-between'>
          <span className='text-lg font-medium'>Sections</span>
          <Button size={'icon'} variant={'ghost'} onClick={onToggle}>
            {state ? <X /> : <BadgePlus />}
          </Button>
        </div>
        <Separator className='my-3' />

        {state ? (
          <Forms course={course} onToggle={onToggle} />
        ) : (
          <>
            {!section.length ? (
              <span className='text-muted-foreground'>No sections</span>
            ) : (
              <></>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default Sections

interface FormProps {
  course: ICourse
  onToggle: () => void
}
function Forms({ course, onToggle }: FormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const pathname = usePathname()

  const form = useForm<z.infer<typeof sectionFieldSchema>>({
    resolver: zodResolver(sectionFieldSchema),
    defaultValues: {
      title: '',
    },
  })

  const onSubmit = (data: z.infer<typeof sectionFieldSchema>) => {
    setIsLoading(true)
    const promise = createSelection(course._id, data.title, pathname)
      .then(() => onToggle())
      .finally(() => {
        setIsLoading(false)
      })

    toast.promise(promise, {
      loading: 'Loading...',
      success: 'Section created successfully',
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
          name='title'
          control={form.control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor='checkout-7j9-card-name-43j'>
                Section title
                <span className='text-red-500'>*</span>
              </FieldLabel>
              <Input
                disabled={isLoading}
                {...field}
                placeholder='e.g. Introduction to the course'
                className='bg-secondary'
              />
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
