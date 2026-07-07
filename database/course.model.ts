import { model, models, Schema } from 'mongoose'

const CourseSchema = new Schema(
  {
    title: String,
    description: String,
    learning: String,
    requirements: String,
    category: String,
    language: String,
    level: String,
    oldPrice: Number,
    currentPrice: Number,
    previewImage: String,
    slug: String,
    tags: String,
    published: { type: Boolean, default: false },
    instructor: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
)

const Course = models.Course || model('Course', CourseSchema)
export default Course
