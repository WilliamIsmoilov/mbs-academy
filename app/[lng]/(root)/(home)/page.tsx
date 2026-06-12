import { translation } from '@/i18n/server'
import { LngParams } from '@/types/indeex'

const HomePage = async ({ params }: LngParams) => {
  const { lng } = await params
  const { t } = await translation(lng)

  return <div className='mt-24'>{t('home')}</div>
}

export default HomePage
