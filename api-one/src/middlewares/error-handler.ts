import type { NextFunction, Request, Response } from 'express'
import { ZodError, type ZodIssue } from 'zod'

import { BaseError } from '@/errors'

export function errorHandlerMiddleware(
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    if (err instanceof ZodError) {
        const errors = err.flatten((issue: ZodIssue) => ({
            message: issue.message,
            errorCode: issue.code,
        })).fieldErrors

        return res.status(400).send({ errors })
    }

    if (err instanceof BaseError) {
        return res.status(err.code).send({
            error: {
                message: err.message,
            },
        })
    }

    return res.status(500).send({
        error: { message: 'Internal server error.' },
    })
}
