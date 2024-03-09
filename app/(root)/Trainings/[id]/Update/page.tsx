import TrainingForm from '@/components/ui/shared/TrainingForm'
import { getTrainingById } from '@/lib/actions/training.actions';
import { auth } from '@clerk/nextjs';
import React from 'react'

type UpdateTrainingProps = {
  params:{
    id: string
  }
}
const UpdateTraining = async ({params:{id}}:UpdateTrainingProps) => {
    const {sessionClaims} = auth()
    const userId = sessionClaims?.userId as string
    const training = await getTrainingById(id)
  return (
    <>
    <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <h3 className='wrapper h3-bold text-center sm:text-left'>Update Training</h3>
    </section>
    <div className='wrapper my-8'>
        <TrainingForm type='Edit' training={training} trainingId={training._id} userId={userId}/>
    </div>
    </>
  )
}

export default UpdateTraining
