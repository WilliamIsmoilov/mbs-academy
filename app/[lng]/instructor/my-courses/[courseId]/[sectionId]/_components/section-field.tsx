'use client'

import { ISection } from '@/app.types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import useToggleEdit from '@/hooks/use-toggle-edit'
import { sectionFieldSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit2, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import FillLoading from '@/components/shared/fill-loading'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { updateSectionTitle } from '@/actions/section.action'

const SectionField = (section: ISection) => {
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
          <Forms section={section} onToggle={onToggle} />
        ) : (
          <div className='flex flex-col space-y-2'>
            <div className='flex items-center gap-2'>
              <span className='font-space-grotesk font-bold text-muted-foreground'>
                Title:
              </span>
              <span className='font-medium'>{section.title}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default SectionField

interface Props {
  section: ISection
  onToggle: () => void
}

function Forms({ section, onToggle }: Props) {
  const [isLoading, setIsLoading] = useState(false)

  const pathname = usePathname()

  const form = useForm<z.infer<typeof sectionFieldSchema>>({
    resolver: zodResolver(sectionFieldSchema),
    defaultValues: {
      title: section.title,
    },
  })

  const onSubmit = (data: z.infer<typeof sectionFieldSchema>) => {
    setIsLoading(true)
    const promise = updateSectionTitle(section._id, data.title, pathname)
      .then(() => onToggle())
      .finally(() => {
        setIsLoading(false)
      })

    toast.promise(promise, {
      loading: 'Loading...',
      success: 'Section title changed successfully',
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
