'use server'

import Course from '@/database/course.model'
import { connectToDatabase } from '@/lib/mongoose'
import { GetCourseParams, ICreateCourse } from './types'
import { ICourse, ILesson } from '@/app.types'
import { revalidatePath } from 'next/cache'
import User from '@/database/user.model'
import { cache } from 'react'
import path from 'path'
import Section from '@/database/section.modal'
import Lesson from '@/database/lesson.model'
import { calculateTotalDuration } from '@/lib/utils'

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

export const getCourses = async (params: GetCourseParams) => {
  try {
    await connectToDatabase()
    const { clerkId, page = 1, pageSize = 6 } = params
    const skipAmount = (page - 1) * pageSize
    const user = await User.findOne({ clerkId })
    const courses = await Course.find({ instructor: user._id })
      .skip(skipAmount)
      .limit(pageSize)

    const totalCourses = await Course.find({
      instructor: user._id,
    }).countDocuments()
    const isNext = totalCourses > skipAmount + courses.length
    return { courses, isNext, totalCourses }
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

export const getFeaturedCourses = cache(async () => {
  try {
    await connectToDatabase()
    const course = await Course.find({ published: true })
      .limit(6)
      .sort({ createdAt: -1 })
      .select('previewImage title slug  oldPrice currentPrice instructor')
      .populate({
        path: 'instructor',
        select: 'fullName picture',
        model: 'User',
      })

    return course
  } catch (error) {
    throw new Error('something went wrong in getFeaturedCourses')
  }
})

export const getDetailedCourse = cache(async (id: string) => {
  try {
    await connectToDatabase()
    const course = await Course.findById(id)
      .select(
        'title description instructor previewImage oldPrice currentPrice learning requirements tags updatedAt level category language',
      )
      .populate({
        path: 'instructor',
        select: 'fullName picture',
        model: 'User',
      })

    const sections = await Section.find({ course: id }).populate({
      path: 'lessons',
      model: Lesson,
    })

    const totalLessons: ILesson[] = sections
      .map(section => section.lessons)
      .flat()

    const data = {
      ...course._doc,
      totalLessons: totalLessons.length,
      totalSections: sections.length,
      totalDuration: calculateTotalDuration(totalLessons),
    }
    return data
  } catch (error) {
    throw new Error(
      'something went wrong in getdetailedCourses:',
      error as Error,
    )
  }
})
