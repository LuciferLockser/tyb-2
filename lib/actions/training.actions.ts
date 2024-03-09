'use server'
import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '../database';
import Category from '../database/models/category.model';
import User from '../database/models/user.model';
import { handleError } from '../utils';
import { CreateTrainingParams, UpdateTrainingParams, DeleteTrainingParams, GetAllTrainingsParams, GetTrainingsByUserParams, GetRelatedTrainingsByCategoryParams } from './../types/index';
import Training from '../database/models/events.model';

const getCategoryByName = async (name: string) => {
    return Category.findOne({ name: { $regex: name, $options: 'i' } })
  }

const populateTraining = async (query:any) => {
    return query
    .populate({path:'organizer', model: User, select: '_id firstName lastName' })
    .populate({path:'category', model: Category, select: '_id name' })
}
export const createTraining = async ({ training ,userId,path}:CreateTrainingParams)=>{
try {
    await connectToDatabase()

    const organizer = await User.findById(userId)

    if(!organizer){
        throw new Error('Organizer not found')
    }

    const newTraining = await Training.create({...training, category:training.categoryId, organizer: userId})
    return JSON.parse(JSON.stringify(newTraining))
} catch (error) {
    handleError(error)
}
}
export const getTrainingById = async (trainingId: string)=> {
    try {
        await connectToDatabase()
        const training = await populateTraining(Training.findById(trainingId))
        if(!training){
            throw new Error('Training not found')
        }
        return JSON.parse(JSON.stringify(training)) 
    } catch (error) {
        handleError(error)
    }
}

export const getAllTrainings = async ({query, limit=6,page,category}:GetAllTrainingsParams)=> {
    try {
        await connectToDatabase()
        const conditions = {}
        const trainingsQuery = Training.find(conditions)
        .sort({createdAt: 'asc'})
        .skip(0)
        .limit(limit)

        const training = await populateTraining(trainingsQuery)
        const trainingsCount = await Training.countDocuments(conditions)
        return {
            data : JSON.parse(JSON.stringify(training)),
            totalPages: Math.ceil(trainingsCount/limit)
        } 
    } catch (error) {
        handleError(error)
    }
}

export const deleteTraining = async ({trainingId,path}:DeleteTrainingParams)=> {
    try {
        await connectToDatabase()
        const deletedTraining = await Training.findByIdAndDelete(trainingId)
        if(deletedTraining) revalidatePath(path)
    } catch (error) {
        handleError(error)
    }
}
export async function updateTraining({ userId, training, path }: UpdateTrainingParams) {
    try {
      await connectToDatabase()
  
      const trainingToUpdate = await Training.findById(training._id)
      if (!trainingToUpdate || trainingToUpdate.organizer.toHexString() !== userId) {
        throw new Error('Unauthorized or training not found')
      }
  
      const updatedTraining = await Training.findByIdAndUpdate(
        training._id,
        { ...training, category: training.categoryId },
        { new: true }
      )
      revalidatePath(path)
  
      return JSON.parse(JSON.stringify(updatedTraining))
    } catch (error) {
      handleError(error)
    }
  }
  export async function getTrainingsByUser({ userId, limit = 6, page }: GetTrainingsByUserParams) {
    try {
      await connectToDatabase()
  
      const conditions = { organizer: userId }
      const skipAmount = (page - 1) * limit
  
      const trainingsQuery = Training.find(conditions)
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(limit)
  
      const trainings = await populateTraining(trainingsQuery)
      const trainingsCount = await Training.countDocuments(conditions)
  
      return { data: JSON.parse(JSON.stringify(trainings)), totalPages: Math.ceil(trainingsCount / limit) }
    } catch (error) {
      handleError(error)
    }
  }
  
  export async function getRelatedTrainingsByCategory({
    categoryId,
    trainingId,
    limit = 3,
    page = 1,
  }: GetRelatedTrainingsByCategoryParams) {
    try {
      await connectToDatabase()
  
      const skipAmount = (Number(page) - 1) * limit
      const conditions = { $and: [{ category: categoryId }, { _id: { $ne: trainingId } }] }
  
      const trainingsQuery = Training.find(conditions)
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(limit)
  
      const trainings = await populateTraining(trainingsQuery)
      const trainingsCount = await Training.countDocuments(conditions)
  
      return { data: JSON.parse(JSON.stringify(trainings)), totalPages: Math.ceil(trainingsCount / limit) }
    } catch (error) {
      handleError(error)
    }
  }
