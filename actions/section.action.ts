'use server'

import Section from '@/database/section.modal'
import { connectToDatabase } from '@/lib/mongoose'
import { revalidatePath } from 'next/cache'
import { IUpdateSection } from './types'

export const createSelection = async (
  course: string,
  title: string,
  path: string,
) => {
  try {
    await connectToDatabase()
    const sections = await Section.find({ course })
    const position = sections.length + 1
    await Section.create({ course, title, position })
    revalidatePath(path)
  } catch (err) {
    throw new Error('Something went wrong createSelection:', err as Error)
  }
}

export const getSections = async (course: string) => {
  try {
    await connectToDatabase()
    return await Section.find({ course }).sort({ position: 1 })
  } catch (err) {
    throw new Error('Something went wrong getSection:', err as Error)
  }
}

export const updateSection = async (params: IUpdateSection) => {
  try {
    await connectToDatabase()
    const { lists, path } = params
    for (const item of lists) {
      await Section.findByIdAndUpdate(item._id, { position: item.position })
    }
    revalidatePath(path)
  } catch (error) {
    throw new Error('Something went wrong!')
  }
}
