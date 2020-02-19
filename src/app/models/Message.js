import mongoose from 'mongoose'

export const MessageSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
        from: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    },
)

const Message = mongoose.model('Message', MessageSchema)

export default Message
