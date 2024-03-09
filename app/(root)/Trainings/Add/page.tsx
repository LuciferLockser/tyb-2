import TrainingForm from '@/components/ui/shared/TrainingForm'
import { auth } from '@clerk/nextjs';
import React from 'react'

const AddTraining = () => {
    const {sessionClaims} = auth()
    const userId = sessionClaims?.userId as string
  return (
    <>
    <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <h3 className='wrapper h3-bold text-center sm:text-left'>Add Training</h3>
    </section>
    <div className='wrapper my-8'>
        <TrainingForm userId={userId} type='Add'/>
    </div>
    </>
  )
}

export default AddTraining
