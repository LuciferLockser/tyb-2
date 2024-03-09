import React from 'react';
import { Button } from '../button';
import { createOrder } from '@/lib/actions/order.actions';
import { ITraining } from '../../../lib/database/models/events.model'
const Checkout = ({ training, userId }: { training: ITraining; userId: string }) => {
    const onCheckout = async () => {
        try {

      
          const order = await createOrder({
            trainingId: training._id,
            buyerId: userId,
            totalAmount: '02',
            createdAt: new Date(),
          });

        } catch (error) {
          console.error('Error creating order:', error);
        }
      };
      
      
      

  return (
    <form onSubmit={onCheckout} method="post">
      <Button type="submit" role="link" size="lg" className="button sm:w-fit">
        {training.isFree ? 'Register for free' : 'Reserve your place'}
      </Button>
    </form>
  );
};

export default Checkout;
