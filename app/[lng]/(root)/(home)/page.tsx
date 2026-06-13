import { translation } from '@/i18n/server'
import { LngParams } from '@/types/indeex'
import Hero from './_components/hero'
import FeaturedCourses from './_components/featured-courses'
import Categories from './_components/categories'

const HomePage = () => {
  return (
    <>
      <Hero />
      <FeaturedCourses />
      <Categories />
    </>
  )
}

export default HomePage
