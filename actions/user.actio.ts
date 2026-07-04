import { ICreatedUser, IUpdateUser } from './types'
import { connectToDatabase } from '@/lib/mongoose'
import User from '@/database/user.model'

export async function createUser(user: ICreatedUser) {
  try {
    await connectToDatabase()
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
    throw new Error('Something went wrong createUser:', err as Error)
  }
}

export async function updatedUser(data: IUpdateUser) {
  try {
    await connectToDatabase()
    const { clerkId, updatedUser } = data
    const updated = await User.findOneAndUpdate({ clerkId }, updatedUser, {
      new: true,
    })
    return updated
  } catch (err) {
    throw new Error('Something went wrong updatedUser:', err as Error)
  }
}
