import { getLastLesson } from '@/actions/lesson.action'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

interface Props {
  params: Promise<{ lng: string; courseId: string }>
}
const Page = async ({ params }: Props) => {
  const { courseId, lng } = await params
  const { userId } = await auth()
  const { lessonId, sectionId } = await getLastLesson(userId!, courseId)

  return redirect(`/${lng}/dashboard/${courseId}/${lessonId}?s=${sectionId}`)
}

export default Page
