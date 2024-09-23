import { UserController } from '@/controllers/user-controller'
import { UserMongoDbRepository } from '@/repositories/user/user-mongodb-repository'
import { UserService } from '@/services/user-service'

export function makeUserController() {
    const userRepository = new UserMongoDbRepository()
    const userService = new UserService(userRepository)
    const userController = new UserController(userService)

    return userController
}
