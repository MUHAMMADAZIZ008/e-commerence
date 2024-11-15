import z from 'zod'
export const socialProfileSchema = z.object({
  user_id: z.number().int(),
  platform: z.string().min(1, 'Platform is required'),
  platform_user: z.string().min(1, 'Platform user is required')
});
