'use client'
import { ITraining } from '@/lib/database/models/events.model'
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import React from 'react'
import { Button } from '../button'
import Link from 'next/link'
import Checkout from './Checkout'

const CheckoutButton = ({training}:{training:ITraining}) => {
    const {user} = useUser()
    const userId = user?.publicMetadata.userId as string
    const hasTrainingFinished = new Date(training.endDateTime)< new Date()
  return (
    <div className='flex items-center gap-3'>
      {hasTrainingFinished?(
        <p className='p-2 text-red-400'>Sorry, Registrations are no longer available </p>
      ):(
        <>
        <SignedOut>
            <Button asChild className='button rounded-full' size='lg'>
                <Link href='/sign-in'>
                    Register Now!
                </Link>
            </Button>
        </SignedOut>
        <SignedIn>
            <Checkout training={training} userId={userId}/>
        </SignedIn>
        </>
      )}
    </div>
  )
}

export default CheckoutButton
