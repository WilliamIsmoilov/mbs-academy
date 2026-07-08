'use server'

import Section from '@/database/section.modal'
import { connectToDatabase } from '@/lib/mongoose'
import { revalidatePath } from 'next/cache'

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
