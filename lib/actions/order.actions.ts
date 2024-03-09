'use server'

import { CheckoutOrderParams, CreateOrderParams, GetOrdersByTrainingParams, GetOrdersByUserParams } from "../types";
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import Order from '../database/models/order.model';

export const checkoutOrder = async (order: CreateOrderParams) => {
}

export const createOrder = async (order: CreateOrderParams) => {
    try {
      await connectToDatabase();
  
      const newOrder = await Order.create({
        ...order,
        event: order.trainingId, // Assuming 'event' corresponds to 'training' in your schema
        buyer: order.buyerId,
      });
  
      console.log("success");
      return newOrder;
    } catch (error) {
      console.error(error);
      handleError(error);
      throw error;
    }
  };
export async function getOrdersByTraining({ searchString, trainingId }: GetOrdersByTrainingParams) {
}

export async function getOrdersByUser({ userId, limit = 3, page }: GetOrdersByUserParams) {
    const skipAmount = (page - 1) * limit;
    try {
      const orders = await Order.find({ buyer: userId })
        .limit(limit)
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .exec();
  
      return orders;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }
