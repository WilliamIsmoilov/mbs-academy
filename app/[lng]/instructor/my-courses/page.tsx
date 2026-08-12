import { getCourses } from '@/actions/course.action'
import Header from '../_components/header'
import InstructorCourseCard from '@/components/cards/instructor-course'
import { auth } from '@clerk/nextjs/server'
import { SearchParamsProps } from '@/app.types'
import Pagination from '@/components/shared/pagination'

const CourseIntsructor = async ({ searchParams }: SearchParamsProps) => {
  const { userId } = await auth()

  const params = await searchParams
  const page = params.page ? +params.page : 1
  const result = await getCourses({ clerkId: userId!, page })

  return (
    <>
      <Header title='My courses' description='Here are your latest courses' />
      <div className='mt-4 grid grid-cols-3 gap-4'>
        {result.courses.map(item => (
          <InstructorCourseCard
            key={item._id}
            course={JSON.parse(JSON.stringify(item))}
          />
        ))}
      </div>
      <div className='mt-6'>
        <Pagination isNext={result.isNext} pageNumber={page} />
      </div>
    </>
  )
}

export default CourseIntsructor
