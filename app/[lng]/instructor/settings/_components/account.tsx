'use client'

import { IUser } from '@/app.types'
import FillLoading from '@/components/shared/fill-loading'
import { Card, CardContent } from '@/components/ui/card'
import { Field, FieldLabel, FieldContent } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { profileSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { CandlestickChart } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { use, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FiGithub } from 'react-icons/fi'
import { FiYoutube } from 'react-icons/fi'
import { FaLinkedinIn } from 'react-icons/fa6'
import { z } from 'zod'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { updateUser } from '@/actions/user.actio'
import { toast } from 'sonner'

const Account = (user: IUser) => {
  const { bio, job, website, github, youtube, linkedin, phone } = user
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: { bio, job, website, github, youtube, linkedin, phone },
  })

  const onSubmit = (data: z.infer<typeof profileSchema>) => {
    setIsLoading(true)
    const promise = updateUser({
      clerkId: user.clerkId,
      updatedUser: data,
      path: pathname,
    }).finally(() => setIsLoading(false))

    toast.promise(promise, {
      loading: 'Loading...',
      success: 'Profile updated successfully',
      error: 'Something went wrong',
    })
  }
  return (
    <Card className='ml-6 max-w-4xl'>
      <CardContent className='relative p-6'>
        {isLoading && <FillLoading />}

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col space-y-3'
        >
          <div className='grid grid-cols-2 gap-4'>
            <Controller
              name='job'
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor='checkout-7j9-card-name-43j'>
                    Your Job
                    <span className='text-red-500'>*</span>
                  </FieldLabel>
                  <Input
                    disabled={isLoading}
                    {...field}
                    placeholder='e.g: Software Engineer'
                    className='bg-secondary'
                  />
                </Field>
              )}
            />

            <Controller
              name='phone'
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor='checkout-7j9-card-name-43j'>
                    Mobile Phone
                    <span className='text-red-500'>*</span>
                  </FieldLabel>
                  <Input
                    disabled={isLoading}
                    {...field}
                    placeholder='e.g: +1 234 567 890'
                    className='bg-secondary'
                  />
                </Field>
              )}
            />

            <Controller
              name='website'
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor='checkout-7j9-card-name-43j'>
                    Website
                    <span className='text-red-500'>*</span>
                  </FieldLabel>{' '}
                  <div className='flex items-center  pr-2 bg-secondary'>
                    <Input
                      disabled={isLoading}
                      {...field}
                      placeholder='e.g: www.example.com'
                      className='border-0 bg-secondary'
                    />
                    <CandlestickChart className='ml-2 text-muted-foreground' />
                  </div>
                </Field>
              )}
            />

            <Controller
              name='github'
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor='checkout-7j9-card-name-43j'>
                    Github
                    <span className='text-red-500'>*</span>
                  </FieldLabel>{' '}
                  <div className='flex items-center  pr-2 bg-secondary'>
                    <Input
                      disabled={isLoading}
                      {...field}
                      placeholder='e.g: www.github.com'
                      className='border-0 bg-secondary'
                    />
                    <FiGithub className='ml-2 text-muted-foreground size-6' />
                  </div>
                </Field>
              )}
            />

            <Controller
              name='youtube'
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor='checkout-7j9-card-name-43j'>
                    Youtube
                    <span className='text-red-500'>*</span>
                  </FieldLabel>{' '}
                  <div className='flex items-center  pr-2 bg-secondary'>
                    <Input
                      disabled={isLoading}
                      {...field}
                      placeholder='e.g: www.youtube.com'
                      className='border-0 bg-secondary'
                    />
                    <FiYoutube className='ml-2 text-muted-foreground size-6' />
                  </div>
                </Field>
              )}
            />

            <Controller
              name='linkedin'
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor='checkout-7j9-card-name-43j'>
                    LinkedIn
                    <span className='text-red-500'>*</span>
                  </FieldLabel>{' '}
                  <div className='flex items-center  pr-2 bg-secondary'>
                    <Input
                      disabled={isLoading}
                      {...field}
                      placeholder='e.g: '
                      className='border-0 bg-secondary'
                    />
                    <FaLinkedinIn className='ml-2 text-muted-foreground size-6' />
                  </div>
                </Field>
              )}
            />
          </div>
          <Controller
            name='bio'
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor='checkout-7j9-card-name-43j'>
                  Bio
                  <span className='text-red-500'>*</span>
                </FieldLabel>
                <Textarea
                  disabled={isLoading}
                  {...field}
                  placeholder='e.g. it is not a typo, it is a joke'
                  className='bg-secondary'
                />
              </Field>
            )}
          />

          <Button
            className='size-fit px-2 py-2'
            type='submit'
            disabled={isLoading}
          >
            Save
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default Account
