'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '../ui/button'
import { formQueryUrl } from '@/lib/utils'

interface Props {
  pageNumber: number
  isNext: boolean
}

const Pagination = ({ pageNumber, isNext }: Props) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  if (!isNext && pageNumber === 1) return null

  const onNavigate = (direction: 'prev' | 'next') => {
    const nextPageNumber =
      direction === 'prev' ? pageNumber - 1 : pageNumber + 1

    const newUrl = formQueryUrl({
      params: searchParams.toString(),
      key: 'page',
      value: nextPageNumber.toString(),
    })

    router.push(newUrl)
  }

  return (
    <div className='flex w-full justify-center items-center gap-2'>
      <Button onClick={() => onNavigate('prev')}>rev</Button>
      <div className='flex items-center justify-center'>{pageNumber}</div>
      <Button onClick={() => onNavigate('prev')}>Next</Button>
    </div>
  )
}

export default Pagination
