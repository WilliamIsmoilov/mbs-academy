'use server'

import { connectToDatabase } from '@/lib/mongoose'
import { ICreateLesson, ILessonField, IUpdatePosition } from './types'
import Section from '@/database/section.modal'
import Lesson from '@/database/lesson.model'
import { revalidatePath } from 'next/cache'
import { ILesson } from '@/app.types'
import UserProgress from '@/database/user-progress.model'

export const createLesson = async (params: ICreateLesson) => {
  try {
    await connectToDatabase()
    const { lesson, section, path } = params
    const duration = {
      hours: Number(lesson.hours),
      minutes: Number(lesson.minutes),
      seconds: Number(lesson.seconds),
    }

    const existSection = await Section.findById(section)
    const position = existSection.lessons.length

    const newLesson = await Lesson.create({
      ...lesson,
      position,
      duration,
      section,
    })
    existSection.lessons.push(newLesson._id)
    existSection.save()
    revalidatePath(path)
  } catch (error) {
    throw new Error('Something went wrong!')
  }
}

export const getLessons = async (section: string) => {
  try {
    await connectToDatabase()
    return await Lesson.find({ section }).sort({ position: 1 })
  } catch (error) {
    throw new Error('Something went wrong!')
  }
}

export const deleteLessonById = async (id: string, path: string) => {
  try {
    await connectToDatabase()
    const lesson = await Lesson.findById(id)
    const section = await Section.findById(lesson.section)
    section.lessons.pull(id)
    section.save()
    await Lesson.findByIdAndDelete(id)
    revalidatePath(path)
  } catch (error) {
    throw new Error('Something went wrong!')
  }
}

export const editLesson = async (
  lesson: ILessonField,
  lessonId: string,
  path: string,
) => {
  try {
    await connectToDatabase()
    const duration = {
      hours: Number(lesson.hours),
      minutes: Number(lesson.minutes),
      seconds: Number(lesson.seconds),
    }
    await Lesson.findByIdAndUpdate(lessonId, { ...lesson, duration })
    revalidatePath(path)
  } catch (error) {
    throw new Error('Something went wrong!')
  }
}

export const editLessonPosition = async (params: IUpdatePosition) => {
  try {
    await connectToDatabase()
    const { lists, path } = params
    for (const item of lists) {
      await Lesson.findByIdAndUpdate(item._id, { position: item.position })
    }
    revalidatePath(path)
  } catch (error) {
    throw new Error('Something went wrong!')
  }
}

export const getLesson = async (id: string) => {
  try {
    await connectToDatabase()
    return await Lesson.findById(id).select('title content videoUrl ')
  } catch (error) {
    throw new Error('Something went wrong', error as Error)
  }
}

export const getNextLesson = async (lessonId: string, courseId: string) => {
  try {
    await connectToDatabase()
    const sections = await Section.find({ course: courseId }).populate({
      path: 'lessons',
      options: { sort: { position: 1 } },
      model: Lesson,
    })

    const lesson: ILesson[] = sections.map(section => section.lessons).flat()

    const lessonIndex = lesson.findIndex(
      item => item._id.toString() === lessonId,
    )

    if (lessonIndex === lesson.length - 1) {
      return null
    }

    const nextLesson = lesson[lessonIndex + 1]

    const section = await Section.findOne({ lessons: nextLesson._id })

    return {
      lessonId: nextLesson._id.toString(),
      sectionId: section._id.toString(),
    }
  } catch (err) {
    throw new Error('Something went wrong in getnextLesson', err as Error)
  }
}

export const getLastLesson = async (clerkId: string, courseId: string) => {
  try {
    await connectToDatabase()
    const sections = await Section.find({ course: courseId })
      .sort({
        position: 1,
      })
      .populate({
        path: 'lessons',
        model: Lesson,
        select: 'userProgress',
        options: { sort: { position: 1 } },
      })

    const lessons: ILesson[] = sections.map(section => section.lessons).flat()

    const userProgress = await UserProgress.find({
      userId: clerkId,
      lessonId: { $in: lessons.map(lesson => lesson._id) },
      isCompleted: true,
    }).sort({ createdAt: -1 })

    const lastLesson = userProgress[userProgress.length - 1]

    if (!lastLesson) {
      return {
        sectionId: sections[0]._id,
        lessonId: sections[0].lessons[0]._id,
      }
    }

    const section = await Section.findOne({ lessons: lastLesson.lessonId })

    return {
      lessonId: lastLesson.lessonId,
      sectionId: section._id,
    }
  } catch (error) {
    throw new Error('someting went wrong', error as Error)
  }
}
