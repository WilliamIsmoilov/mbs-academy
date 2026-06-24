'use server'

import Course from '@/database/course.model'
import { connectToDatabase } from '@/lib/mongoose'
import { ICreateCourse } from './types'
import { ICourse } from '@/app.types'

export const createCourse = async (course: ICreateCourse) => {
  try {
    await connectToDatabase()
    await Course.create(course)
    return true
  } catch (error) {
    throw new Error('Something went wrong createCourse:')
  }
}

export const getCourses = async () => {
  try {
    await connectToDatabase()
    const courses = await Course.find()
    return courses as ICourse[]
  } catch (error) {
    throw new Error('Something went wrong getCourse:')
  }
}
