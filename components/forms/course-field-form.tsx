'use client'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { courseSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Field, FieldLabel } from '../ui/field'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { courseCategory, courseLanguage, courseLevels } from '@/constants'
import { Button } from '../ui/button'
import { createCourse } from '@/actions/course.action'
import { toast } from 'sonner'
import { useState } from 'react'
import { UploadButton } from '@/lib/uploadthing'
import { ImageDown } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

function CourseFieldsForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState('' as string)
  const [open, setOpen] = useState(false)

  const router = useRouter()

  const form = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: defaultVal,
  })

  function onSubmit(values: z.infer<typeof courseSchema>) {
    console.log(previewImage)
    if (!previewImage) {
      toast.error('Please upload a preview image')
      return
    }

    setIsLoading(true)

    const { oldPrice, currentPrice } = values
    const promise = createCourse({
      ...values,
      oldPrice: +oldPrice,
      currentPrice: +currentPrice,
      previewImage,
    })
      .then(() => {
        form.reset()
        setPreviewImage('')
        router.push('/en/instructor/my-courses')
      })
      .finally(() => setIsLoading(false))

    toast.promise(promise, {
      loading: 'Loading...',
      success: 'Course created successfully',
      error: 'Something went wrong',
    })
  }

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
        <Controller
          control={form.control}
          name='title'
          render={({ field }) => (
            <Field>
              <FieldLabel>
                Course title<span className='text-red-500'>*</span>
              </FieldLabel>
              <Input
                {...field}
                className='bg-secondary'
                placeholder='Learn ReactJS - from 0 to hero'
                disabled={isLoading}
              />
            </Field>
          )}
        />

        <Controller
          name='description'
          control={form.control}
          render={({ field }) => (
            <Field>
              <FieldLabel>
                Short description<span className='text-red-500'>*</span>
              </FieldLabel>
              <Textarea
                {...field}
                className='h-44 bg-secondary'
                placeholder='Description'
                disabled={isLoading}
              />
            </Field>
          )}
        />

        <div className='grid grid-cols-2 gap-4'>
          <Controller
            name='learning'
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>
                  What will students learn in your course?
                  <span className='text-red-500'>*</span>
                </FieldLabel>
                <Textarea
                  {...field}
                  className='bg-secondary'
                  disabled={isLoading}
                />
              </Field>
            )}
          />

          <Controller
            name='requirements'
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>
                  Requirements
                  <span className='text-red-500'>*</span>
                </FieldLabel>
                <Textarea
                  {...field}
                  className='bg-secondary'
                  disabled={isLoading}
                />
              </Field>
            )}
          />
        </div>

        <div className='grid grid-cols-3 gap-4'>
          <Controller
            name='level'
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>
                  Level<span className='text-red-500'>*</span>
                </FieldLabel>
                <Select
                  value={field.value ?? ''}
                  onValueChange={field.onChange}
                  disabled={isLoading}
                >
                  <SelectTrigger className='w-full bg-secondary'>
                    <SelectValue placeholder={'Select'} />
                  </SelectTrigger>
                  <SelectContent>
                    {courseLevels.map(item => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          />

          <Controller
            name='category'
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>
                  Category<span className='text-red-500'>*</span>
                </FieldLabel>
                <Select
                  value={field.value ?? ''}
                  onValueChange={field.onChange}
                  disabled={isLoading}
                >
                  <SelectTrigger className='w-full bg-secondary'>
                    <SelectValue placeholder={'Select'} />
                  </SelectTrigger>
                  <SelectContent>
                    {courseCategory.map(item => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          />

          <Controller
            name='language'
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>
                  Language<span className='text-red-500'>*</span>
                </FieldLabel>
                <Select
                  value={field.value ?? ''}
                  onValueChange={field.onChange}
                  disabled={isLoading}
                >
                  <SelectTrigger className='w-full bg-secondary'>
                    <SelectValue placeholder={'Select'} />
                  </SelectTrigger>
                  <SelectContent>
                    {courseLanguage.map(item => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          />

          <Controller
            name='oldPrice'
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>
                  Old price<span className='text-red-500'>*</span>
                </FieldLabel>
                <Input
                  {...field}
                  className='bg-secondary'
                  type='number'
                  disabled={isLoading}
                />
              </Field>
            )}
          />

          <Controller
            name='currentPrice'
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>
                  Current Price<span className='text-red-500'>*</span>
                </FieldLabel>
                <Input
                  {...field}
                  className='bg-secondary'
                  type='number'
                  disabled={isLoading}
                />
              </Field>
            )}
          />

          <Field>
            <FieldLabel>
              Preview image<span className='text-red-500'>*</span>
            </FieldLabel>
            <UploadButton
              className='bg-primary rounded-md'
              endpoint='imageUploader'
              config={{ appendOnPaste: true, mode: 'auto' }}
              onClientUploadComplete={res => {
                setPreviewImage(res[0].ufsUrl)
                toast.success('Image uploaded successfully')
              }}
            />

            {/* <Input className='bg-secondary' type='file' disabled={isLoading} /> */}
          </Field>
        </div>

        <div className='flex justify-end gap-4'>
          <Button
            type='button'
            size={'lg'}
            variant={'destructive'}
            onClick={() => form.reset()}
            disabled={isLoading}
          >
            Clear
          </Button>
          <Button type='submit' size={'lg'} disabled={isLoading}>
            Submit
          </Button>

          {previewImage && (
            <Button
              type='button'
              size={'lg'}
              variant={'outline'}
              onClick={() => setOpen(true)}
            >
              <span>Image</span>
              <ImageDown />
            </Button>
          )}
        </div>
      </form>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle></DialogTitle>
          <div className='relative h-72'>
            {previewImage && (
              <Image
                src={previewImage}
                alt='preview-image'
                fill
                className='object-cover'
              />
            )}
          </div>
          <Button
            className='w-fit'
            variant={'destructive'}
            onClick={() => {
              setPreviewImage('')
              setOpen(false)
            }}
          >
            Remove
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CourseFieldsForm

const defaultVal = {
  title: '',
  description: '',
  learning: '',
  requirements: '',
  level: '',
  category: '',
  language: '',
  oldPrice: '',
  currentPrice: '',
}
