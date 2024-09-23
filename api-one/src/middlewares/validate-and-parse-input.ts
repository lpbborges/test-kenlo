import type { Request, Response, NextFunction } from 'express'
import type { ZodTypeAny } from 'zod'

export function validateAndParseInput<T extends ZodTypeAny>(schema: T) {
    return async (req: Request, _res: Response, next: NextFunction) => {
        try {
            const parsedData = schema.parse(req.body)
            req.body = parsedData
        } catch (err) {
            next(err)
        }

        next()
    }
}
