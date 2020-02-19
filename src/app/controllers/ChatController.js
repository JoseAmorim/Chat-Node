import ChatService from '../services/ChatService'

class ChatControlller {
    async index(req, res) {
        const { userId } = req

        const chats = await ChatService.getAllChatsOfUser(userId)

        return res.status(200).json(chats)
    }

    async store(req, res) {
        const { userId } = req
        const { userToChatId } = req.body

        const chat = await ChatService.createChat(userId, userToChatId)

        if (!chat)
            return res.status(401).json({
                error: true,
                message: 'Já existe um chat com esse usuário.',
            })

        return res.json(chat)
    }
}

export default new ChatControlller()
