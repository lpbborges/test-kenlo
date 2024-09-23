import { Router } from 'express'

import { CreateUserSchema, UpdateUserSchema } from '@/definitions'
import { env } from '@/env'
import { makeUserController } from '@/factories/make-user-controller'
import { validateAndParseInput } from '@/middlewares'
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: env.NODE_ENV === 'production' ? 10 : 100,
    message: 'Too many requests, please try again later.',
})

const userRoutes = Router()
const userController = makeUserController()

userRoutes.get('/', (req, res, next) => userController.find(req, res, next))

userRoutes.get('/:id', (req, res, next) =>
    userController.findById(req, res, next)
)

userRoutes.post(
    '/',
    validateAndParseInput(CreateUserSchema),
    (req, res, next) => userController.create(req, res, next)
)

userRoutes.put(
    '/:id',
    validateAndParseInput(UpdateUserSchema),
    (req, res, next) => userController.update(req, res, next)
)

userRoutes.delete('/:id', (req, res, next) =>
    userController.delete(req, res, next)
)

userRoutes.post('/:id/chat', limiter, (req, res, next) =>
    userController.newChat(req, res, next)
)

export { userRoutes }
