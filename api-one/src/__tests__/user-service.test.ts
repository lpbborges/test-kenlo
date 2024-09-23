import { UserService } from '../services/user-service'
import { UserMockRepository } from '../repositories/user/user-mock-repository'
import type { UserRepository } from '../repositories/user/user-repository'
import { BadRequestError } from '@/errors'

let userRepository: UserRepository
let userService: UserService

jest.mock('../env', () => ({
    env: {
        API_CHAT_GPT_BASE_URL: 'https://mock-api-url.com',
    },
}))

jest.mock('../api/api-chat-gpt', () => ({
    createChat: () => Promise.resolve({ response: 'Mocked response' }),
}))

describe('User Service', () => {
    beforeEach(() => {
        userRepository = new UserMockRepository()
        userService = new UserService(userRepository)
    })

    it('should be able to create a new user', async () => {
        const user = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            phone: '18123456700',
        }
        const newUser = await userService.create(user)
        expect(newUser).toHaveProperty('_id')
    })

    it('should not be able to create a new user with same email', async () => {
        userRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            phone: '18123456700',
        })

        const user = {
            name: 'John Doe 2',
            email: 'johndoe@example.com',
            phone: '99999999999',
        }

        await expect(() => userService.create(user)).rejects.toBeInstanceOf(
            BadRequestError
        )
    })

    it('should returns the user by id', async () => {
        const user = await userRepository.create({
            name: 'User 1',
            email: 'user1@example.com',
            phone: '18123456700',
        })
        userRepository.create({
            name: 'User 2',
            email: 'user2@example.com',
            phone: '18123456700',
        })

        const userExists = await userService.findById(user._id)

        expect(userExists.name).toEqual(user.name)
    })
})
