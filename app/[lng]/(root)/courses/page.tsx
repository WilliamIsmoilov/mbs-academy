import TopBar from '@/components/shared/top-bar'
import React from 'react'
import AllCourses from './_components/all-courses'

const page = () => {
  return (
    <>
      <TopBar label='allCourses' description='allCourseDescription' />
      <AllCourses />
    </>
  )
}

export default page
