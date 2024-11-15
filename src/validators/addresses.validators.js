import z from 'zod'

export const addressessSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    create_at: z.date().default(() => new Date()),
    address_line_1: z.string().optional(),
    address_line_2: z.string().optional(),
    country: z.string().min(1, 'Country is required'),
    city: z.string().min(1, 'City is required'),
    postal_code: z.string().optional(),
    phone_number: z.string().optional(),
    landmark: z.string().optional(),
    user_id: z.number().optional()
  });