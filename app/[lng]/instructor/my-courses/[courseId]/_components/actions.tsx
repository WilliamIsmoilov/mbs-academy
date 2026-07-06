'use client'

import { deleteCourseById, updateCourse } from '@/actions/course.action'
import { ICourse } from '@/app.types'
import ConfirmDeleteModal from '@/components/modals/confirm-delete-modal'
import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'

const Actions = (course: ICourse) => {
  const pathname = usePathname()
  const router = useRouter()
  const onUpdateStatus = () => {
    let promise
    if (course.published) {
      promise = updateCourse(course._id, { published: false }, pathname)
    } else {
      promise = updateCourse(course._id, { published: true }, pathname)
    }

    toast.promise(promise, {
      loading: 'Loading...',
      success: 'Status updated successfully',
      error: 'Something went wrong',
    })
  }

  const onDelete = () => {
    const promise = deleteCourseById(
      course._id,
      '/en/instructor/my-courses',
    ).then(() => {
      router.push('/en/instructor/my-courses')
    })

    toast.promise(promise, {
      loading: 'Loading...',
      success: 'Course deleted successfully',
      error: 'Something went wrong',
    })
  }

  return (
    <div className='flex gap-2 self-end'>
      <Button onClick={onUpdateStatus}>
        {course.published ? 'Draft' : 'Publish'}
      </Button>
      <ConfirmDeleteModal onConfirm={onDelete}>
        <Button variant={'destructive'}>Delete</Button>
      </ConfirmDeleteModal>
    </div>
  )
}

export default Actions
