import Header from '../../../_components/header'
import { Separator } from '@/components/ui/separator'
import { getSectionById, getSections } from '@/actions/section.action'
import { Button } from '@/components/ui/button'
import { ChevronLeft, MoveLeft, Settings, Settings2 } from 'lucide-react'
import Link from 'next/link'
import Action from './_components/action'
import SectionField from './_components/section-field'
import Lessons from './_components/lessons'
import { getLessons } from '@/actions/lesson.action'

const Page = async ({
  params,
}: {
  params: Promise<{ courseId: string; sectionId: string }>
}) => {
  const { courseId, sectionId } = await params

  const sectionJSON = await getSectionById(sectionId)
  const lessonsJSON = await getLessons(sectionId)

  const sections = JSON.parse(JSON.stringify(sectionJSON))
  const lessons = JSON.parse(JSON.stringify(lessonsJSON))

  return (
    <>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Link href={`/en/instructor/my-courses/${courseId}`}>
            <Button size={'icon'} variant={'outline'}>
              <ChevronLeft />
            </Button>
          </Link>
          <Header
            title={sections.title}
            description='Manage your course and see how it is performing'
          />
        </div>

        <Action {...sections} />
      </div>

      <Separator className='my-3 bg-muted-foreground' />

      <div className='grid grid-cols-2 gap-4'>
        <div className='flex flex-col space-y-2'>
          <div className='flex items-center gap-2'>
            <span className='font-medium text-3xl font-spaceGrotesk'>
              Lessons
            </span>
            <Settings2 />
          </div>
          <Lessons sections={sections} lessons={lessons} />
        </div>

        <div className='flex flex-col space-y-2'>
          <div className='flex items-center gap-2'>
            <span className='font-medium text-3xl font-spaceGrotesk'>
              Section field
            </span>
            <Settings />
          </div>
          <SectionField {...sections} />
        </div>
      </div>
    </>
  )
}

export default Page
