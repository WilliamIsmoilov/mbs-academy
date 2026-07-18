export interface ICreateCourse {
  title: string
  description: string
  learning: string
  requirements: string
  category: string
  language: string
  level: string
  oldPrice: number
  currentPrice: number
  previewImage: string
}

export interface ICreatedUser {
  fullName: string
  clerkId: string
  email: string
  picture: string
}

export interface IUpdateUser {
  clerkId: string
  updatedUser: {
    fullName: string
    email: string
    picture: string
  }
}

export interface IUpdateSection {
  lists: { _id: string; position: number }[]
  path: string
}

export interface ILessonField {
  title: string
  content: string
  videoUrl: string
  hours: string
  minutes: string
  seconds: string
}

export interface ICreateLesson {
  lesson: ILessonField
  section: string
  path: string
}
