'use client'
import { contactSchema } from '@/lib/validation'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { Textarea } from '../ui/textarea'

import { Button } from '../ui/button'
import { Send } from 'lucide-react'
import { Field, FieldError } from '../ui/field'
import { toast } from 'sonner'
import { useState } from 'react'
import { Input } from '../ui/input'
import useTranslate from '@/hooks/use-transalte'

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const t = useTranslate()

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  function onSubmit(values: z.infer<typeof contactSchema>) {
    setIsLoading(true)
    const telegramBotId = process.env.NEXT_PUBLIC_TELEGRAM!
    const telegramChatId = process.env.NEXT_PUBLIC_CHATID!

    const promise = fetch(
      `https://api.telegram.org/bot${telegramBotId}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'cache-control': 'no-cache',
        },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: `Name: ${values.name}\nEmail: ${values.email}\nMessage: ${values.message}`,
        }),
      },
    )
      .then(() => form.reset())
      .finally(() => setIsLoading(false))

    toast.promise(promise, {
      loading: t('loading'),
      success: t('successfully'),
      error: t('error'),
    })
  }

  return (
    <div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col space-y-3'
      >
        <Controller
          name='message'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Textarea
                disabled={isLoading}
                className='resize-none h-32'
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder='Any question or just say Hi'
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name='email'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                disabled={isLoading}
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder='Email address'
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name='name'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                disabled={isLoading}
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder='Your name'
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button
          className='w-fit'
          size={'lg'}
          type='submit'
          disabled={isLoading}
          rounded={'full'}
        >
          <span>Send</span>
          <Send className='w-4 h-4 ml-2' />
        </Button>
      </form>
    </div>
  )
}

export default ContactForm
