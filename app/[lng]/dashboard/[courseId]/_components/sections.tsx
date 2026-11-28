'use client'

import { ILesson, ISection } from '@/app.types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { useAuth } from '@clerk/nextjs'
import { PlayCircle } from 'lucide-react'
import Link from 'next/link'
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation'
import { useEffect, useState } from 'react'
import { CheckedState } from '@radix-ui/react-checkbox'
import { completeLesson, unCompleteLesson } from '@/actions/course.action'
import SectionLoading from '@/components/shared/section-loading'

interface Props {
  sections: ISection[]
}
const Sections = ({ sections }: Props) => {
  const searchParam = useSearchParams()
  const sectionId = searchParam.get('s')
  const router = useRouter()
  const pathname = usePathname()
  const [mount, setMount] = useState(false)

  const onSelect = (text: string) => {
    const current = new URLSearchParams(Array.from(searchParam.entries()))

    if (!text) {
      current.delete('s')
    } else {
      current.set('s', text)
    }

    const search = current.toString()
    const query = search ? `?${search}` : ''

    router.push(`${pathname}${query}`)
  }

  useEffect(() => {
    if (sectionId) {
      setMount(true)
    }
  }, [sectionId])

  return mount ? (
    <Accordion
      type='single'
      collapsible
      className='mt-1'
      defaultValue={sectionId!}
      onValueChange={onSelect}
      value={sectionId!}
    >
      {sections.map(section => (
        <SectionList key={section._id} {...section} />
      ))}
    </Accordion>
  ) : (
    <div className='mt-4 flex flex-col space-y-2'>
      {Array.from({ length: sections.length }).map((_, i) => (
        <SectionLoading key={i} />
      ))}
    </div>
  )
}

export default Sections

const SectionList = (section: ISection) => {
  const searchParam = useSearchParams()
  const sectionId = searchParam.get('s')
  return (
    <AccordionItem value={section._id} className='mt-1'>
      <AccordionTrigger
        className={cn(
          ' text-left hover:no-underline hover:bg-neutral-50 hover:dark:bg-neutral-800 px-3 bg-neutral-100 dark:bg-black/20',
          sectionId === section._id && 'bg-white dark:bg-neutral-800',
        )}
      >
        {section.title}
      </AccordionTrigger>
      <AccordionContent>
        {section.lessons.map(lesson => (
          <LessonList
            key={lesson._id}
            lesson={lesson}
            sectionId={section._id}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  )
}

interface LessonProps {
  lesson: ILesson
  sectionId: string
}

const LessonList = ({ lesson, sectionId }: LessonProps) => {
  const { courseId, lessonId } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [mount, setMount] = useState(false)
  const { userId } = useAuth()
  const pathname = usePathname()

  const onCheck = (checked: CheckedState) => {
    setIsLoading(true)

    let promise
    if (checked) {
      promise = completeLesson(lesson._id, userId!, pathname)
    } else {
      promise = unCompleteLesson(lesson._id, pathname)
    }

    promise.finally(() => setIsLoading(false))
  }

  const isCompleted = lesson.userProgress
    .map(item => item.lessonId)
    .includes(lesson._id)

  useEffect(() => setMount(true), [])

  return (
    <Button
      asChild
      className={cn(
        'mx-auto flex h-12 w-[calc(100%-12px)] items-center justify-between gap-x-2 rounded-none p-0 px-2 text-sm  hover:bg-gray-200 hover:dark:bg-neutral-800  ',
        lessonId === lesson._id && 'bg-secondary',
      )}
      variant={'ghost'}
    >
      <div>
        <Link
          href={`/dashboard/${courseId}/${lesson._id}?s=${sectionId}`}
          className='flex size-full justify-start px-3 items-center no-underline'
        >
          <div className=' flex max-w-[90%] items-center gap-x-2'>
            <PlayCircle size={16} />
            {lesson.title.length > 30
              ? `${lesson.title.slice(0, 30)}...`
              : lesson.title}
          </div>
        </Link>
        <div className='w-[10%]'>
          {mount && (
            <Checkbox
              defaultChecked={isCompleted}
              checked={isCompleted}
              onCheckedChange={onCheck}
              disabled={isLoading}
              className={cn(isLoading && 'opacity-50 cursor-not-allowed')}
            />
          )}
        </div>
      </div>
    </Button>
  )
}
