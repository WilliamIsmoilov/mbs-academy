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
}

export interface ISection {
  _id: string
  title: string
  position: number
}
