import ContactForm from '@/components/forms/contact-form'
import TopBar from '@/components/shared/top-bar'
import { translation } from '@/i18n/server'
import { Mail, Phone } from 'lucide-react'

const ContactPage = async ({
  params,
}: {
  params: Promise<{ lng: string }>
}) => {
  const { lng } = await params
  const { t } = await translation(lng)
  return (
    <>
      <TopBar label='contacts' />
      <iframe
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50619.55481148422!2d127.00191758174977!3d37.53804589346535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca50a915f665b%3A0xabeb10cd5efdfce2!2sLotte%20World%20Tower!5e0!3m2!1sru!2skr!4v1781677273234!5m2!1sru!2skr'
        loading='lazy'
        className='w-full h-92'
      />

      <div className='container  mx-auto max-w-6xl max-md:px-4'>
        <div className='mt-6 grid grid-cols-2 gap-4 max-md:grid-cols-1'>
          <div className='flex flex-col'>
            <h1 className='font-spaceGrotesk text-4xl font-bold'>
              {' '}
              {t('contactTitle')}
            </h1>
            <p className='text-muted-foreground mt-2'>
              {t('contactDescription')}
            </p>

            <div className='mt-12 flex items-center gap-3'>
              <Mail className='size-4' />
              <p className='text-sm'>info@william.ac </p>
            </div>
            <div className='mt-2 flex items-center gap-3'>
              <Phone className='size-4' />
              <p className='text-sm'> +82 010-3913-4666</p>
            </div>
          </div>

          <div>
            <h1 className='mb-2 font-spaceGrotesk text-4xl font-bold'>
              {t('contactForm')}
            </h1>
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactPage
