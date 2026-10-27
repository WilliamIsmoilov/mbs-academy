import TopBar from '@/components/shared/top-bar'
import AllCourses from './_components/all-courses'
import { getAllCourses } from '@/actions/course.action'
import { SearchParamsProps } from '@/app.types'

const page = async ({ searchParams }: SearchParamsProps) => {
  const params = await searchParams
  const resultJSON = await getAllCourses({
    page: params.page ? +params.page : 1,
    filter: params.filter,
    searchQuery: params.q,
  })
  const result = JSON.parse(JSON.stringify(resultJSON))

  return (
    <>
      <TopBar label='allCourses' description='allCourseDescription' />
      <AllCourses result={result} />
    </>
  )
}

export default page
