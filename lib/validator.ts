import * as z from 'zod';

export const TrainingFormSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  description: z.string().min(5, 'Description must be at least 5 characters.').max(400, 'Description must be less than 400.'),
  location: z.string().min(4, 'Location must be at least 4 characters').max(400, 'Location must be less than 400.'),
  imageUrl: z.string().url('Image URL must be a valid URL'),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().nullable().refine(value => !value || z.string().url().safeParse(value).success, {
    message: 'If provided, URL must be a valid URL',
  }),
});
