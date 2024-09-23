import type { NextFunction, Request, Response } from 'express'
import { chat } from '../lib/openai'
import { CreateChatSchema } from '../definitions/chat'

export async function chatController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { message } = CreateChatSchema.parse(req.body)
        const response = await chat(message)

        return res.status(200).json({ response: response?.content })
    } catch (err) {
        next(err)
    }
}
