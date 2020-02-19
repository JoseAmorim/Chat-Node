import mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema(
    {
        _id: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
)

export default mongoose.model('User', UserSchema)
