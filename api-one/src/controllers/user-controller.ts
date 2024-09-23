import type { Request, Response, NextFunction } from 'express'
import { FindByIdParamsSchema } from '@/definitions'
import { UserService } from '@/services/user-service'

export class UserController {
    constructor(private userService: UserService) {}

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.userService.create(req.body)

            return res
                .status(201)
                .location(`${req.baseUrl}/${user._id.toString()}`)
                .json({ message: 'User created.' })
        } catch (err) {
            next(err)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = FindByIdParamsSchema.parse(req.params)
            await this.userService.delete(id)

            return res.status(204).send()
        } catch (err) {
            next(err)
        }
    }

    async find(_req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this.userService.find()

            return res.status(200).json({ users })
        } catch (err) {
            next(err)
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = FindByIdParamsSchema.parse(req.params)
            const user = await this.userService.findById(id)

            return res.status(200).json({ user })
        } catch (err) {
            next(err)
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = FindByIdParamsSchema.parse(req.params)
            const user = await this.userService.update(id, req.body)

            return res.status(200).json({ user })
        } catch (err) {
            next(err)
        }
    }

    async newChat(req: Request, res: Response, next: NextFunction) {
        try {

            const { id } = FindByIdParamsSchema.parse(req.params)
            const chat = await this.userService.newChat(id, req.body)

            return res.status(200).json({ chat })
        } catch (err) {
            next(err)
        }
    }
}
