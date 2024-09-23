import { z } from "zod";

export const CreateChatSchema = z.object({
    message: z.string(),
})
