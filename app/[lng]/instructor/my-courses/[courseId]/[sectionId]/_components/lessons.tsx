'use client'

import { ILessonField } from '@/actions/types'
import { ILesson, ISection } from '@/app.types'
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
import {
  createLesson,
  editLesson,
  editLessonPosition,
} from '@/actions/lesson.action'
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd'
import LessonList from './lesson-list'
import { Editor } from '@tinymce/tinymce-react'
import { editorConfig } from '@/constants'
import { Checkbox } from '@/components/ui/checkbox'

interface Props {
  sections: ISection
  lessons: ILesson[]
}
const Lessons = ({ sections, lessons }: Props) => {
  const { state, onToggle } = useToggleEdit()
  const [isLoading, setIsLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [currentLesson, setCurrentLesson] = useState<ILessonField | null>(null)
  const [lessonId, setLessonId] = useState('')

  const path = usePathname()

  const onAdd = async (lesson: ILessonField) => {
    setIsLoading(true)
    return createLesson({ lesson, section: sections._id, path })
      .then(() => onToggle())
      .finally(() => setIsLoading(false))
  }

  const onStartEdit = (lesson: ILesson) => {
    setIsEdit(true)
    setLessonId(lesson._id)
    setCurrentLesson({
      title: lesson.title,
      content: lesson.content,
      videoUrl: lesson.videoUrl,
      hours: `${lesson.duration.hours}`,
      minutes: `${lesson.duration.minutes}`,
      seconds: `${lesson.duration.seconds}`,
      free: lesson.free,
    })
  }
  const onFinishEdit = () => {
    setIsEdit(false)
    setCurrentLesson(null)
    setLessonId('')
  }
  const onEdit = async (lesson: ILessonField) => {
    setIsLoading(true)
    return editLesson(lesson, lessonId, path)
      .then(() => onFinishEdit())
      .finally(() => setIsLoading(false))
  }

  const onReorder = (updateDate: { _id: string; position: number }[]) => {
    setIsLoading(true)
    const promise = editLessonPosition({
      lists: updateDate,
      path: path,
    }).finally(() => setIsLoading(false))

    toast.promise(promise, {
      loading: 'Loading...',
      success: 'Lesson updated successfully',
      error: 'Something went wrong',
    })
  }
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return null

    const items = Array.from(lessons)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    const startIndex = Math.min(result.source.index, result.destination.index)
    const endIndex = Math.max(result.source.index, result.destination.index)

    const updatedLessons = items.slice(startIndex, endIndex + 1)

    const bulkUpdatedData = updatedLessons.map(lesson => ({
      _id: lesson._id,
      position: items.findIndex(item => item._id === lesson._id),
      title: lesson.title,
    }))
    onReorder(bulkUpdatedData)
  }

  return (
    <Card>
      <CardContent className='relative p-6'>
        {isLoading && <FillLoading />}
        <div className='flex items-center justify-between'>
          <span className='text-lg font-medium'> Manage Chapters </span>
          {!isEdit && (
            <Button size={'icon'} variant={'ghost'} onClick={onToggle}>
              {state ? <X /> : <Edit2 />}
            </Button>
          )}
        </div>
        <Separator className='my-3' />

        {state ? (
          <Forms lesson={{} as ILessonField} handler={onAdd} />
        ) : isEdit ? (
          <Forms
            lesson={currentLesson as ILessonField}
            handler={onEdit}
            isEdit
            onClose={onFinishEdit}
          />
        ) : (
          <>
            {!lessons.length ? (
              <p className='text-muted-foreground'>No lessons</p>
            ) : (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='lessons'>
                  {provided => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {lessons.map((lesson, index) => (
                        <LessonList
                          key={lesson._id}
                          lesson={lesson}
                          index={index}
                          onStartEdit={() => onStartEdit(lesson)}
                        />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default Lessons

interface FormProps {
  lesson: ILessonField
  handler: (lesson: ILessonField) => Promise<void>
  isEdit?: boolean
  onClose?: () => void
}
function Forms({ handler, lesson, isEdit = false, onClose }: FormProps) {
  const { title, content, videoUrl, hours, minutes, seconds, free } = lesson

  const [isLoading, setIsLoading] = useState(false)

  const pathname = usePathname()

  const form = useForm<z.infer<typeof lessonFieldSchema>>({
    resolver: zodResolver(lessonFieldSchema),
    defaultValues: {
      title: title ?? '',
      content,
      videoUrl,
      hours: `${hours}`,
      minutes: `${minutes}`,
      seconds: `${seconds}`,
      free,
    },
  })

  const onSubmit = (data: z.infer<typeof lessonFieldSchema>) => {
    const promise = handler(data as ILessonField).finally(() => form.reset())

    toast.promise(promise, {
      loading: 'Loading...',
      success: ' Successfully',
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

              <Editor
                apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                init={editorConfig}
                onBlur={field.onBlur}
                initialValue={content}
                onEditorChange={content => field.onChange(content)}
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

        <Controller
          name='free'
          control={form.control}
          render={({ field }) => (
            <Field>
              <div className='flex items-center space-x-2'>
                <Checkbox
                  onCheckedChange={field.onChange}
                  checked={field.value}
                />
                <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                  Are you offering this lesson for free?
                </label>
              </div>
            </Field>
          )}
        />

        <div className='flex items-center gap-2'>
          <Button disabled={isLoading} type='submit' className='px-4 h-10'>
            Add
          </Button>
          {isEdit && (
            <Button
              disabled={isLoading}
              type='button'
              variant={'destructive'}
              className='px-4 h-10'
              onClick={onClose}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </>
  )
}
