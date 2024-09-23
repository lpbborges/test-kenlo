import {
    UserSchema,
    type CreateUser,
    type InsertChat,
    type UpdateUser,
    type User,
} from '@/definitions'
import type { UserRepository } from './user-repository'
import { randomUUID } from 'node:crypto'

export class UserMockRepository implements UserRepository {
    private users: User[] = []

    async create(userData: CreateUser) {
        const user = UserSchema.parse({ ...userData, _id: randomUUID })
        this.users.push(user)

        return user
    }

    async delete(id: string) {
        this.users = this.users.filter(user => user._id !== id)
    }

    async find() {
        return this.users
    }

    async findByEmail(email: string) {
        const user = this.users.find(user => user.email === email)

        if (!user) {
            return null
        }

        return user
    }

    async findById(id: string) {
        const user = this.users.find(user => user._id === id)

        if (!user) {
            return null
        }

        return user
    }

    async insertChat(userId: string, chatData: InsertChat) {
        const user = this.users.find(user => user._id === userId)

        if (!user) {
            return null
        }

        const newChat = {
            message: chatData.message,
            response: chatData.response ?? '',
        }

        user.chats?.push(newChat)

        this.users = [...this.users.filter(user => user._id !== userId), user]

        return newChat
    }

    async update(id: string, user: UpdateUser) {
        const existentUser = this.users.find(user => user._id === id)

        if (!existentUser) {
            return null
        }

        const newUser = { ...existentUser, ...user }

        this.users = [...this.users.filter(user => user._id !== id), newUser]

        return newUser
    }
}
