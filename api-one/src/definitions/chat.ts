import { z } from 'zod'

export const ChatSchema = z.object({
    message: z.string(),
    response: z.string(),
})

export type Chat = z.infer<typeof ChatSchema>

export const CreateChatSchema = ChatSchema.omit({ response: true })

export type CreateChat = z.infer<typeof CreateChatSchema>

export const InsertChatSchema = ChatSchema.partial({ response: true })

export type InsertChat = z.infer<typeof InsertChatSchema>
