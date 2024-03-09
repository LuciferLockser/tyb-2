'use client'

import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage,} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { TrainingFormSchema } from '@/lib/validator'
import * as z from 'zod'
import { trainingDefaultValues } from '@/constants'
import Dropdown from './Dropdown'
import { Textarea } from '../textarea'
import { FileUploader } from './FileUploader'
import Image from 'next/image'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Checkbox } from '../checkbox'
import  { useUploadThing } from '@/lib/uploadthing'
import { useRouter } from 'next/navigation'
import { createTraining, updateTraining } from '@/lib/actions/training.actions'
import { ITraining } from '@/lib/database/models/events.model'
type TrainingFormProps = {
    userId: string,
    type: 'Add'|'Edit'
    training?: ITraining
    trainingId?: string

}
const TrainingForm = ({userId,training,trainingId, type}:TrainingFormProps) => {
    const [files,setFiles] = useState<File[]>([])
    const initialValues = training && type ==='Edit' ? {...training,startDateTime:new Date(training.startDateTime),endDateTime:new Date(training.endDateTime)}: trainingDefaultValues
    const router = useRouter()
    const { startUpload } = useUploadThing('imageUploader')
    const form = useForm<z.infer<typeof TrainingFormSchema>>({
        resolver: zodResolver(TrainingFormSchema),
        defaultValues: initialValues
      })
     
      async function onSubmit(values: z.infer<typeof TrainingFormSchema>) {

        let uploadedImageUrl = values.imageUrl
        if (files.length>0){
          const uploadedImages = await startUpload(files)
          if(!uploadedImages){
            return
          }
          uploadedImageUrl = uploadedImages[0].url
        }
        if(type === 'Add'){
          try {
            const newTraining = await createTraining({
              training: {...values,imageUrl:uploadedImageUrl},
              userId,
              path: '/profile'
            })
            if(newTraining){
              form.reset()
              router.push(`/Trainings/${newTraining._id}`)
            }
          } catch (error) {
            console.log(error)
          }
        }
        if(type === 'Edit'){
          if(!trainingId){
            router.back()
            return;
          }
          try {
            const updatedTraining = await updateTraining({
              userId,
              training: { ...values, imageUrl: uploadedImageUrl, _id: trainingId},
              path: `/Trainings/${trainingId}`
          })
            if(updatedTraining){
              form.reset()
              router.push(`/Trainings/${updatedTraining._id}`)
            }
          } catch (error) {
            console.log(error)
          }
        }
      }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5'>
        <div className='flex flex-col gap-5 md:flex-row'>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className='w-full '>
              <FormControl>
                <Input placeholder='Training Title' {...field} className='input-field'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem className='w-full '>
              <FormControl>
                <Dropdown onChangeHandler={field.onChange} value= {field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className='flex flex-col gap-5 md:flex-row'>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className='w-full '>
              <FormControl className='h-72'>
              <Textarea placeholder='Description' {...field} value={field.value.toString()} className='textarea rounded-2xl' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className='w-full '>
              <FormControl className='h-72'>
              <FileUploader onFieldChange={field.onChange} imageUrl={field.value} setFiles={setFiles}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className='flex flex-col gap-5 md:flex-row'>
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className='w-full '>
              <FormControl>
                <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2'>
                <Image src='/assets/icons/location-grey.svg' alt='location' width={24} height={24}/>
                <Input placeholder='Training location or Online' {...field} className='input-field'/>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />        
        </div>
        <div className='flex flex-col gap-5 md:flex-row'>
        <FormField
          control={form.control}
          name="startDateTime"
          render={({ field }) => (
            <FormItem className='w-full '>
              <FormControl>
                <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2'>
                <Image src='/assets/icons/calendar.svg' alt='calendar' width={24} height={24} className='filter-grey'/>
                <p className='ml-3 whitespace-nowrap text-grey-600'>Start Date</p>
                <DatePicker selected={field.value} onChange={(date: Date) => field.onChange(date)}
                 showTimeSelect
                 timeInputLabel='Time:'
                 dateFormat='dd/MM/yyyy h:mm aa'
                 wrapperClassName='datePicker'
                 />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDateTime"
          render={({ field }) => (
            <FormItem className='w-full '>
              <FormControl>
                <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2'>
                <Image src='/assets/icons/calendar.svg' alt='calendar' width={24} height={24} className='filter-grey'/>
                <p className='ml-3 whitespace-nowrap text-grey-600'>End Date</p>
                <DatePicker selected={field.value} onChange={(date: Date) => field.onChange(date)}
                 showTimeSelect
                 timeInputLabel='Time:'
                 dateFormat='dd/MM/yyyy h:mm aa'
                 wrapperClassName='datePicker'
                 />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className='flex flex-col gap-5 md:flex-row'>
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className='w-full '>
              <FormControl>
                <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2'>
                <Image src='/assets/icons/money.svg' alt='money' width={24} height={24} className='filter-grey'/>
                <Input type='number' placeholder='Price' {...field } className='p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0'/>
                <FormField
            control={form.control}
            name="isFree"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='flex items-center'>
                  <label htmlFor='isFree' className='whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Free Ticket</label>
                  <Checkbox onCheckedChange={field.onChange} checked={field.value} id='isFree' className='mr-2 h-5 w-5 border-2 border-primary-500'/>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
          )}
        />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className='w-full '>
              <FormControl>
                <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2'>
                <Image src='/assets/icons/link.svg' alt='link' width={24} height={24}/>
                <Input placeholder='URL' {...field} value={field.value ?? ''} className='input-field' />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <Button type="submit" size='lg' disabled={form.formState.isSubmitting} className='button col-span-2 w-full'>{form.formState.isSubmitting? ('Submitting ...'):`${type} Training` }</Button>
      </form>
    </Form>
  )
}

export default TrainingForm
