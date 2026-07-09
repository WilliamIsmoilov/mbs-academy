'use client'

import { ICourse, ISection } from '@/app.types'
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
import { createSelection, updateSection } from '@/actions/section.action'
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd'
import SectionList from './section-lits'

interface Props {
  course: ICourse
  sections: ISection[]
}
const Sections = ({ course, sections }: Props) => {
  const { state, onToggle } = useToggleEdit()
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  const onReorder = (updateDate: { _id: string; position: number }[]) => {
    setIsLoading(true)
    const promise = updateSection({
      lists: updateDate,
      path: pathname,
    }).finally(() => setIsLoading(false))

    toast.promise(promise, {
      loading: 'Loading...',
      success: 'Section updated successfully',
      error: 'Something went wrong',
    })
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return null

    const items = Array.from(sections)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    const startIndex = Math.min(result.source.index, result.destination.index)
    const endIndex = Math.max(result.source.index, result.destination.index)

    const updatedSections = items.slice(startIndex, endIndex + 1)

    const bulkUpdatedData = updatedSections.map(section => ({
      _id: section._id,
      position: items.findIndex(item => item._id === section._id),
      title: section.title,
    }))
    onReorder(bulkUpdatedData)
  }

  return (
    <Card>
      <CardContent className='relative p-6'>
        {isLoading && <FillLoading />}
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
            {!sections.length ? (
              <span className='text-muted-foreground'>No sections</span>
            ) : (
              <>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId='sections'>
                    {provided => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {sections.map((section, index) => (
                          <SectionList
                            key={section._id}
                            section={section}
                            index={index}
                          />
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </>
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
