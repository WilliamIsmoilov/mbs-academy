import { getCourseById } from '@/actions/course.action'

import Header from '../../_components/header'
import Actions from './_components/actions'
import { Separator } from '@/components/ui/separator'
import { Gem, Images, LayoutPanelLeft, Settings } from 'lucide-react'
import CourseFields from './_components/course-fields'
import Description from './_components/description'
import Information from './_components/information'
import SelectFields from './_components/select-fields'
import Sections from './_components/sections'
import Price from './_components/price'
import PreviewImage from './_components/preview-image'

const CourseIdPage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>
}) => {
  const { courseId } = await params
  const courseJSON = await getCourseById(courseId)
  const course = JSON.parse(JSON.stringify(courseJSON))
  return (
    <>
      <div className='flex items-center justify-between'>
        <Header
          title={course.title}
          description='Manage your course and see how it is performing'
        />

        <Actions {...course} />
      </div>

      <Separator className='my-3 bg-muted-foreground' />

      <div className='mt-6 grid grid-cols-2 gap-6'>
        <div className='flex flex-col space-y-2'>
          <div className='flex items-center gap-2'>
            <span className='font-spaceGrotesk font-medium text-3xl'>
              Course Fields
            </span>
            <Settings />
          </div>
          <CourseFields {...course} />
          <Description {...course} />
          <Information {...course} />
          <SelectFields {...course} />
        </div>
        <div className='flex flex-col space-y-2'>
          <div className='flex items-center gap-2'>
            <span className='font-spaceGrotesk font-medium text-3xl'>
              Course Sections
            </span>
            <LayoutPanelLeft />
          </div>

          <Sections course={course} />

          <div className='flex items-center gap-2'>
            <span className='font-spaceGrotesk font-medium text-3xl'>
              Price
            </span>
            <Gem />
          </div>
          <Price {...course} />

          <div className='flex items-center gap-2'>
            <span className='font-spaceGrotesk font-medium text-3xl'>
              Preview Image
            </span>
            <Images />
          </div>
          <PreviewImage {...course} />
        </div>
      </div>
    </>
  )
}

export default CourseIdPage
