import z from 'zod'
export const categoryProfileSchema = z.object({
    name: z.string()
        .min(1, 'name length must be greater than 2')
        .nonempty('name is required'),
    description: z.string()
        .max(1000, 'description must be less than 1000 in length'),
    tag: z.string()
        .nonempty('tag is required')
});
