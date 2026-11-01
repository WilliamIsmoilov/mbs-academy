import { Button } from '@/components/ui/button'
import { formQueryUrl, removeKeysFromQuery } from '@/lib/utils'
import { Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { ChangeEvent } from 'react'
import { debounce } from 'lodash'

const GlobalSearch = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.toLocaleLowerCase()
    const isCoursePage = pathname.split('/').includes('courses')

    if (text && text.length > 2) {
      const newUrl = formQueryUrl({
        params: searchParams.toString(),
        key: 'q',
        value: text,
        toCourse: !isCoursePage,
      })
      router.push(newUrl)
    } else {
      const newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ['q'],
      })

      return router.push(newUrl)
    }
  }

  const debounceSearch = debounce(handleSearch, 300)
  return (
    <div className='search-box'>
      <Button size={'icon'} variant={'ghost'} className='btn-search'>
        <Search />
      </Button>

      <input
        type='text'
        className='input-search'
        placeholder='Type to Search...'
        onChange={debounceSearch}
      />
    </div>
  )
}

export default GlobalSearch
