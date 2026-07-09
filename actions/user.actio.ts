'use server'

import { connectToDatabase } from '@/lib/mongoose'
import { ICreatedUser, IUpdateUser } from './types'
import User from '@/database/user.model'

export const createUser = async (data: ICreatedUser) => {
  try {
    await connectToDatabase()
    console.log('connected to db')

    const { clerkId, email, fullName, picture } = data
    const isExist = await User.findOne({ clerkId })

    if (isExist) {
      const updatedUser = await User.findOneAndUpdate(
        { email },
        { fullName, picture, clerkId },
        { new: true },
      )
      return updatedUser
    }

    const newUser = User.create(data)

    return newUser
  } catch (error) {
    throw new Error('Error creating user. Please try again.')
  }
}

export const updateUser = async (data: IUpdateUser) => {
  try {
    await connectToDatabase()

    console.log('connected to db')
    const { clerkId, updatedUser } = data
    const updateduser = await User.findOneAndUpdate({ clerkId }, updatedUser, {
      new: true,
    })
    return updateduser
  } catch (error) {
    throw new Error('Error updating user. Please try again.')
  }
}
