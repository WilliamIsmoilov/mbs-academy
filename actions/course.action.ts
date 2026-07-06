'use server'

import Course from '@/database/course.model'
import { connectToDatabase } from '@/lib/mongoose'
import { ICreateCourse } from './types'
import { ICourse } from '@/app.types'
import { revalidatePath } from 'next/cache'
import User from '@/database/user.model'

export const createCourse = async (course: ICreateCourse, clerkId: string) => {
  try {
    await connectToDatabase()
    const user = await User.findOne({ clerkId })
    await Course.create({ ...course, instructor: user._id })
    return true
  } catch (error) {
    throw new Error('Something went wrong createCourse:', error as Error)
  }
}

export const getCourses = async (clerkId: string) => {
  try {
    await connectToDatabase()
    const user = await User.findOne({ clerkId })
    const courses = await Course.find({ instructor: user._id })
    return courses as ICourse[]
  } catch (error) {
    throw new Error('Something went wrong getCourse:', error as Error)
  }
}

export const getCourseById = async (id: string) => {
  try {
    await connectToDatabase()
    const course = await Course.findById(id)
    return course as ICourse
  } catch (err) {
    throw new Error('Something went wrong getCourseById:', err as Error)
  }
}

export const updateCourse = async (
  id: string,
  updateData: Partial<ICourse>,
  path: string,
) => {
  try {
    await connectToDatabase()
    const updatedCourse = await Course.findByIdAndUpdate(id, updateData)
    revalidatePath(path)
  } catch (err) {
    throw new Error('Something went wrong updateStatusCourse:', err as Error)
  }
}

export const deleteCourseById = async (id: string, path: string) => {
  try {
    await connectToDatabase()
    await Course.findByIdAndDelete(id)
    revalidatePath(path)
  } catch (err) {
    throw new Error('Something went wrong deleteCourseById:', err as Error)
  }
}
