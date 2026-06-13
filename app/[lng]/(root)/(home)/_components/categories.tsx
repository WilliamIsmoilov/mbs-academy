'use client'

import CategoryCard from '@/components/cards/category.card'
import { categories } from '@/constants'
import useTranslate from '@/hooks/use-transalte'

const Categories = () => {
  const t = useTranslate()
  return (
    <div className='container mx-auto max-w-6xl py-12 max-md:px-4'>
      <div className='flex-col flex space-y-1'>
        <h1 className='font-spaceGrotesk text-3xl font-bold'>
          {t('topCategories')}
        </h1>
        <p className='text-sm text-muted-foreground'>
          {t('topCategoriesDescription')}
        </p>
      </div>

      <div className='grid mt-6 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {categories.map(item => (
          <CategoryCard key={item.label} {...item} />
        ))}
      </div>
    </div>
  )
}

export default Categories
