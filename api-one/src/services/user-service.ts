import { createChat } from '@/api/api-chat-gpt'
import {
    type CreateChat,
    type CreateUser,
    type UpdateUser,
} from '@/definitions'
import { BadRequestError, NotFoundError } from '@/errors'
import type { UserRepository } from '@/repositories/user/user-repository'

export class UserService {
    constructor(private userRepository: UserRepository) {}

    async create(userData: CreateUser) {
        const userExists = await this.userRepository.findByEmail(userData.email)

        if (userExists) {
            throw new BadRequestError('User already exists.')
        }

        const user = await this.userRepository.create(userData)

        return user
    }

    async delete(id: string) {
        await this.userRepository.delete(id)
    }

    async find() {
        const users = await this.userRepository.find()

        return users
    }

    async findById(id: string) {
        const user = await this.userRepository.findById(id)

        if (!user) {
            throw new NotFoundError('User not found.')
        }

        return user
    }

    async update(id: string, userData: UpdateUser) {
        const user = await this.userRepository.findById(id)

        if (!user) {
            throw new NotFoundError('User not found')
        }

        if (userData.email && user.email !== userData.email) {
            const userExistsWithSameEmail =
                await this.userRepository.findByEmail(userData.email)

            if (userExistsWithSameEmail) {
                throw new BadRequestError('Email already in use.')
            }
        }

        const updatedUser = await this.userRepository.update(id, userData)

        return updatedUser
    }

    async newChat(userId: string, chatData: CreateChat) {
        const { response } = await createChat(chatData.message)

        const chat = await this.userRepository.insertChat(userId, {
            message: chatData.message,
            response,
        })

        if (!chat) {
            throw new BadRequestError('Failed to create chat.')
        }

        return chat
    }
}
