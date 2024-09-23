import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ChatSchema = new Schema({
    message: String,
    response: String,
})

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true, maxLength: 11, minLength: 9 },
        chats: { type: [ChatSchema], default: () => [] },
    },
    {
        timestamps: true,
    }
)

export const UserModel = mongoose.model('User', UserSchema)
