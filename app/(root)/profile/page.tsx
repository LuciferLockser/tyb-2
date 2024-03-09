import { Button } from '@/components/ui/button'
import Card from '@/components/ui/shared/Card'
import Collection from '@/components/ui/shared/Collection'
import { getOrdersByUser } from '@/lib/actions/order.actions'
import { getTrainingById, getTrainingsByUser } from '@/lib/actions/training.actions'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const ProfilePage = async () => {
  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string
  const organizedTrainings = await getTrainingsByUser({ userId, page: 1 })
  const organizedTrainingsOrder = await getOrdersByUser({ userId, page: 1 })

  const myOrdersDetails = [];


  for (const trainingOrder of organizedTrainingsOrder) {
    const trainingDetails = await getTrainingById(trainingOrder.event);
    myOrdersDetails.push(trainingDetails);
  }

  return (
    <>
      <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <div className='wrapper flex items-center justify-center sm:justify-between'>
          <h3 className='h3-bold text-center sm:text-left'>My Enrolled Trainings</h3>
          <Button asChild size='lg' className='button hidden sm:flex'>
            <Link href='/#Trainings'>
              Explore More Trainings
            </Link>
          </Button>
        </div>
      </section>

      <section className='wrapper my-8'>
        <Collection
          data={myOrdersDetails}
          emptyTitle='No trainings have been created yet'
          emptyStateSubtext='Go create some now!'
          collectionType='Trainings_Organized'
          limit={3}
          page={1}
          urlParamName='Order'
          totalPages={2}
        />
      </section>

      <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <div className='wrapper flex items-center justify-center sm:justify-between'>
          <h3 className='h3-bold text-center sm:text-left'>My Organized Trainings</h3>
          <Button asChild size='lg' className='button hidden sm:flex'>
            <Link href='/Trainings/Add'>
              Add New Training
            </Link>
          </Button>
        </div>
      </section>

      <section className='wrapper my-8'>
        <Collection
          data={organizedTrainings?.data}
          emptyTitle='No trainings have been created yet'
          emptyStateSubtext='Go create some now!'
          collectionType='Trainings_Organized'
          limit={3}
          page={1}
          urlParamName='Trainings'
          totalPages={2}
        />
      </section>
    </>
  )
}

export default ProfilePage
