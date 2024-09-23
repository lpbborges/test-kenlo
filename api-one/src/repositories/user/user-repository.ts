import type {
    Chat,
    CreateUser,
    InsertChat,
    UpdateUser,
    User,
} from '@/definitions'

export interface UserRepository {
    create: (userData: CreateUser) => Promise<User>
    delete: (id: string) => Promise<void>
    find: () => Promise<User[]>
    findByEmail: (email: string) => Promise<User | null>
    findById: (id: string) => Promise<User | null>
    update: (id: string, user: UpdateUser) => Promise<User | null>
    insertChat: (userId: string, chatData: InsertChat) => Promise<Chat | null>
}
