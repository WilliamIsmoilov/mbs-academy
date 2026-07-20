'use client'

import { deleteLessonById } from '@/actions/lesson.action'
import { ILesson } from '@/app.types'
import { Draggable } from '@hello-pangea/dnd'
import { Grip, Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { toast } from 'sonner'

interface Props {
  lesson: ILesson
  index: number
}

const LessonList = ({ lesson, index }: Props) => {
  const pathname = usePathname()

  const onDelete = () => {
    const isConfirmed = confirm('Are you sure you want to delete this lesson?')
    if (isConfirmed) {
      const promise = deleteLessonById(lesson._id, pathname)

      toast.promise(promise, {
        loading: 'Loading...',
        success: 'Lesson deleted successfully',
        error: 'Something went wrong',
      })
    }
  }

  return (
    <Draggable draggableId={lesson._id} index={index}>
      {provided => (
        <div
          className='mb-4 flex items-center gap-x-2 rounded-md border bg-secondary text-sm'
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={provided.draggableProps.style as React.CSSProperties}
        >
          <div
            className='rounded-l-md border-r border-r-background bg-background/50 px-2 py-3 transition hover:bg-background/80'
            {...provided.dragHandleProps}
          >
            <Grip className='size-5' />
          </div>
          <span>{lesson.title}</span>
          <div className='ml-auto flex items-center gap-x-2 pr-2'>
            <Pencil className='size-4 cursor-pointer transition hover:opacity-75' />
            <Trash2
              className='size-4 cursor-pointer transition hover:opacity-75'
              onClick={onDelete}
            />
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default LessonList
