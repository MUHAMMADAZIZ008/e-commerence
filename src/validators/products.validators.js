import z from 'zod'

const tagSchema = z.array(z.string()).default(['phone'])

const discountTypeSchema = z.enum(['fixed', 'percentage']).default('fixed')

export const productsProfileSchema = z.object({
    category_id: z.number().optional(),
    title: z.string().min(1, "Title is required"),
    picture: z.string().optional(),
    summary: z.string().optional(),
    description: z.string().optional(),
    price: z.number().min(0, "Price cannot be negative"),
    discount_type: discountTypeSchema,
    discount_value: z.number().min(0, "Discount value cannot be negative").optional(),
    tags: tagSchema
})