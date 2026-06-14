import { translation } from '@/i18n/server'
import { LngParams } from '@/types/indeex'
import Hero from './_components/hero'
import FeaturedCourses from './_components/featured-courses'
import Categories from './_components/categories'
import Instructor from './_components/instructor'
import LearningJourney from './_components/learning-journey'

const HomePage = () => {
  return (
    <>
      <Hero />
      <FeaturedCourses />
      <Categories />
      <Instructor />
      <LearningJourney />
    </>
  )
}

export default HomePage
