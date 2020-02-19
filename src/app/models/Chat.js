import mongoose from 'mongoose'
import { UserSchema } from './User'
import { MessageSchema } from './Message'

const ChatSchema = new mongoose.Schema(
    {
        users: [UserSchema],

        messages: [MessageSchema],
    },
    {
        timestamps: true,
    },
)

export default mongoose.model('Chat', ChatSchema)
