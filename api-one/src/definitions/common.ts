import { z } from 'zod'

export const FindByIdParamsSchema = z.object({
    id: z.string(),
})

export type FindByIdParams = z.infer<typeof FindByIdParamsSchema>
