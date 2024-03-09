import React from 'react'
import { ITraining } from '@/lib/database/models/events.model'
import Card from './Card'
type CollectionProps = {
    data: ITraining[],
    emptyTitle: string,
    emptyStateSubtext: string,
    collectionType?:'Trainings_Organized'|'My_EnrolledTrainings'|'All_Trainings',
    limit: number,
    page: number|string,
    totalPages?:number,
    urlParamName:string,
}
const Collection = ({data,emptyTitle,emptyStateSubtext,collectionType,limit,page,totalPages,urlParamName}:CollectionProps)=>{
  return (
      <>
      {data.length>0 ? (
        <div className='flex flex-col items-center gap-10'>
            <ul className='grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10' >
              {data.map((training)=> {
                const hasOrderLink = collectionType === 'Trainings_Organized'
                const hidePrice = collectionType === 'My_EnrolledTrainings'
                return (
                  <li key={training._id} className='flex justify-center'>
                    <Card training={training} hasOrderLink={hasOrderLink} hidePrice={hidePrice} url={urlParamName}/>
                  </li>
                )
              }
              )}
            </ul>
        </div> 
      ):(
        <div className='flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center'>
            <h3 className='p-bold-20 md:h5-bold'>{emptyTitle}</h3>
            <p className='p-regular-14'>{emptyStateSubtext}</p>
        </div>
      )
      }
      </>
  )
}

export default Collection
