import { connect } from 'http2'
import { ICreatedUser, IUpdateUser } from './types'
import { connectToDatabase } from '@/lib/mongoose'
import User from '@/database/user.model'

export async function createUser(user: ICreatedUser) {
  try {
    connectToDatabase()
    const { clerkId, email, fullName, picture } = user
    const isExist = await User.findOne({ clerkId })
    if (isExist) {
      const updatedUser = await User.findOneAndUpdate(
        { email },
        { fullName, picture, clerkId },
        { new: true },
      )

      return updatedUser
    }

    const newUser = await User.create(user)
    return newUser
  } catch (err) {
    throw new Error('Something went wrong createUser:')
  }
}

export async function updatedUser(data: IUpdateUser) {
  try {
    connectToDatabase()
    const { clerkId, updatedUser } = data
    const updated = await User.findOneAndUpdate({ clerkId }, updatedUser, {
      new: true,
    })
    return updatedUser
  } catch (err) {
    throw new Error('Something went wrong updatedUser:')
  }
}
