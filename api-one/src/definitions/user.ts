import { z } from 'zod'

export const UserSchema = z.object({
    _id: z.coerce.string(),
    name: z.string({ required_error: 'Name required' }).min(3, 'Min length 3'),
    email: z
        .string({ required_error: 'Email required.' })
        .min(5, 'Min length 5')
        .email('Invalid email format'),
    phone: z
        .string({ required_error: 'Phone required.' })
        .min(9, 'Min length 9')
        .max(11, 'Max length 11')
        .regex(/^\d+$/, 'Phone must contain only numbers'),
    chats: z
        .array(
            z.object({
                message: z.string(),
                response: z.string(),
            })
        )
        .optional(),
})

export type User = z.infer<typeof UserSchema>

export const CreateUserSchema = UserSchema.omit({ _id: true, chats: true })

export type CreateUser = z.infer<typeof CreateUserSchema>

export const UpdateUserSchema = CreateUserSchema.partial({
    name: true,
    email: true,
    phone: true,
})

export type UpdateUser = z.infer<typeof UpdateUserSchema>
