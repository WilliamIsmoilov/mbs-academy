'use client'

import useTranslate from '@/hooks/use-transalte'
import { Clock3 } from 'lucide-react'
import Image from 'next/image'
import { PiStudentBold } from 'react-icons/pi'
import dynamic from 'next/dynamic'
const ReactStars = dynamic(() => import('react-stars'), { ssr: false })

const Hero = () => {
  const t = useTranslate()
  return (
    <>
      <h1 className='font-spaceGrotesk text-4xl font-bold'>
        React full courses
      </h1>

      <p className='mt-4 text-muted-foreground'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, culpa
        debitis placeat repellat qui similique aperiam vitae reprehenderit
        corporis, ex quas tenetur quisquam delectus esse natus fugit quo
        voluptatibus. Iusto.
      </p>

      <div className='mt-4 flex flex-wrap items-center gap-6'>
        <div className='flex items-center gap-2'>
          <Image
            width={50}
            height={50}
            alt='author'
            src={
              'https://williamerhel.com/cdn/shop/files/affiche-art-thomas-shelby-peaky-blinders-illustration-1.webp?v=1745932973&width=1445'
            }
            className='rounded-full'
          />
          <p className='font-spaceGrotesk font-bold'>by Thomas Shelby</p>
        </div>

        <div className='flex items-center gap-2 font-spaceGrotesk'>
          <p className=' font-bold text-[#E59819]'>4.5</p>
          <ReactStars count={5} value={4.5} />
          <p className='font-bold'>(199)</p>
        </div>

        <div className='flex items-center gap-2'>
          <PiStudentBold className='size-6' />
          <p className='font-spaceGrotesk font-bold'>80 {t('students')}</p>
        </div>

        <div className='flex items-center gap-2'>
          <Clock3 className='size-6' />
          <p className='font-spaceGrotesk font-bold'>{t('lastUpdated')}</p>
        </div>
      </div>

      <Image
        src={
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSleazt45tsaop3k3xmsRsi1rsJlosQPD_7Aw&s'
        }
        alt='courses'
        width={1920}
        height={1080}
        className='mt-4 rounded-md object-cover'
      />
    </>
  )
}

export default Hero
