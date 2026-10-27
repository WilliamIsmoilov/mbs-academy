'use client'

import { ICourse } from '@/app.types'
import CourseCard from '@/components/cards/course.card'
import Pagination from '@/components/shared/pagination'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { courseLanguage, filterCourses, filterLevels } from '@/constants'
import useTranslate from '@/hooks/use-transalte'
import { useRouter, useSearchParams } from 'next/navigation'
import page from '../page'
import { formQueryUrl } from '@/lib/utils'

interface Props {
  result: {
    courses: ICourse[]
    isNext: boolean
    totalCourses: number
  }
}
const AllCourses = ({ result }: Props) => {
  const t = useTranslate()

  const { courses, isNext, totalCourses } = result
  const searchParams = useSearchParams()
  const page = searchParams.get('page')

  const router = useRouter()

  const onUpdateParams = (value: string) => {
    const newUrl = formQueryUrl({
      value,
      key: 'filter',
      params: searchParams.toString(),
    })

    router.push(newUrl)
  }

  return (
    <div className='container mx-auto mt-12 max-w-6xl max-md:px-4'>
      <div className='flex items-center justify-between max-md:flex-col max-md:items-start max-md:space-y-2'>
        <h2 className='max-md:self-start'>
          {t('result1')}
          {'  '}
          <span className='font-spaceGrotesk font-bold'>{totalCourses}</span>
          {'  '}
          {t('result2')}
        </h2>

        <div className='flex items-center gap-2'>
          <p>{t('sortBy')}</p>

          <Select onValueChange={onUpdateParams}>
            <SelectTrigger className='w-[120px] bg-linear-to-r from-secondary to-background'>
              <SelectValue placeholder={t('filter')} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {filterCourses.map(item => (
                  <SelectItem key={item.name} value={item.name}>
                    {t(item.label)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={onUpdateParams}>
            <SelectTrigger className='w-[120px] bg-linear-to-l from-secondary via-secondary to-background'>
              <SelectValue placeholder={t('level')} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {filterLevels.map(item => (
                  <SelectItem key={item.name} value={item.name}>
                    {t(item.label)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={onUpdateParams}>
            <SelectTrigger className='w-[120px] bg-linear-to-l from-secondary to-background'>
              <SelectValue placeholder={t('language')} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {courseLanguage.map(item => (
                  <SelectItem key={item} value={item} className='capitalize'>
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {courses.map((item, index) => (
          <CourseCard key={index} {...item} />
        ))}
      </div>

      <div className='mt-10'>
        <Pagination isNext={isNext} pageNumber={page ? +page : 1} />
      </div>
    </div>
  )
}

export default AllCourses
