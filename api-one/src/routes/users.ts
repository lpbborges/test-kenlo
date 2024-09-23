import { Router } from 'express'

import { CreateUserSchema, UpdateUserSchema } from '@/definitions'
import { validateAndParseInput } from '@/middlewares'
import { makeUserController } from '@/factories/make-user-controller'

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

userRoutes.post('/:id/chat', (req, res, next) =>
    userController.newChat(req, res, next)
)

export { userRoutes }
