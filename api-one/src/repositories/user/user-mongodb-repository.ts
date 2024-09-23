import NodeCache from 'node-cache'
import {
    UserSchema,
    type Chat,
    type CreateUser,
    type InsertChat,
    type UpdateUser,
    type User,
} from '@/definitions'
import { UserModel } from '@/models/user-model'
import type { UserRepository } from './user-repository'

const cache = new NodeCache({ stdTTL: 600, checkperiod: 120, maxKeys: 20 })

export class UserMongoDbRepository implements UserRepository {
    async create(userData: CreateUser) {
        const user = await UserModel.create(userData)

        cache.del('users')

        return UserSchema.parse(user)
    }

    async delete(id: string) {
        UserModel.findByIdAndDelete(id).then(() => {
            cache.del('user_${id}')
        })
    }

    async find() {
        const cachedUsers = cache.get<User[]>('users')

        if (cachedUsers) {
            return cachedUsers
        }

        const users = await UserModel.find()
        const parsedUsers = users.map(user => {
            return UserSchema.parse(user)
        })

        cache.set('users', parsedUsers)
        return parsedUsers
    }

    async findByEmail(email: string) {
        const user = await UserModel.findOne({ email })

        if (!user) {
            return null
        }

        return UserSchema.parse(user)
    }

    async findById(id: string) {
        const cachedUser = cache.get<User>(`user_${id}`)

        if (cachedUser) {
            return cachedUser
        }

        const user = await UserModel.findById(id)

        if (!user) {
            return null
        }

        const parsedUser = UserSchema.parse(user)
        cache.set(`user_${id}`, parsedUser)

        return parsedUser
    }

    async update(id: string, userData: UpdateUser) {
        const user = await UserModel.findByIdAndUpdate({ _id: id }, userData, {
            new: true,
        })

        if (!user) {
            return null
        }

        const parsedUser = UserSchema.parse(user)
        cache.set(`user_${id}`, parsedUser)
        cache.del('users')

        return parsedUser
    }

    async insertChat(userId: string, chatData: InsertChat) {
        const user = await UserModel.findById({ _id: userId })

        if (!user) {
            return null
        }

        user.chats.push(chatData)
        const savedUser = await user.save()

        cache.set(`user_${userId}`, savedUser)
        cache.del('users')

        return chatData as Chat
    }
}
