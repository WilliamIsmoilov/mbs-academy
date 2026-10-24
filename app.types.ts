export interface ICourse {
  _id: string
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
  published: boolean
  slug: string
  tags: string
  instructor: IUser
  updatedAt: string
  totalLessons: number
  totalSections: number
  totalDuration: string
}

export interface ISection {
  _id: string
  title: string
  position: number
  course: string
}

export interface ILesson {
  _id: string
  title: string
  position: number
  content: string
  videoUrl: string
  duration: {
    hours: number
    minutes: number
    seconds: number
  }
  free: boolean
}

export interface SearchParamsProps {
  searchParams: Promise<{ [key: string]: string | undefined }>
}

export interface IUser {
  _id: string
  clerkId: string
  fullName: string
  email: string
  picture: string
  role: string
  bio: string
  phone: string
  job: string
  website: string
  linkedin: string
  github: string
  youtube: string
}
