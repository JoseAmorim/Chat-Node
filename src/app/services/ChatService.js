import Chat from '../models/Chat'
import User from '../models/User'

class ChatService {
    async createChat(userId, userToChatId) {
        // const checkChatExists = await Chat.findOne({
        //     'users.id': {
        //         $all: [userId, userToChatId],
        //     },
        // })

        // if (!checkChatExists) return null

        const user = await User.findById(userId)

        const userToChat = await User.findById(userToChatId)

        const chat = await Chat.create({ users: [user, userToChat] })

        return chat
    }

    async getAllChatsOfUser(userId) {
        const chats = await Chat.find(
            {
                'users._id': {
                    $all: [userId],
                },
            },
            {
                messages: false,
            },
        )

        return chats
    }
}

export default new ChatService()
