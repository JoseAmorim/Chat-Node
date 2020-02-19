import Chat from '../models/Chat'

class MessageService {
    constructor(io) {
        this.io = io
    }

    initSocket() {
        this.io.on('connection', socket => {
            console.log('Usuário conectado')

            socket.on('joinChat', chatId => {
                socket.join(chatId, () => {
                    console.log(chatId)

                    this.createMessage(socket, chatId)
                })

                socket.on('leaveChat', chatToLeaveId => {
                    socket.leave(chatToLeaveId, () => {
                        console.log('Saiu')
                    })
                })
            })
        })

        this.io.on('close', () => {
            connection.removeAllListeners()
        })
    }

    async getAllMessages(chatId) {
        const chat = await Chat.find(
            {
                _id: chatId,
            },
            {
                _id: true,
                'messages._id': true,
                'messages.text': true,
                'messages.from': true,
                'messages.createdAt': true,
            },
        )

        if (!chat) return null

        return chat[0].messages
    }

    sendMessage = (message, chatId) => {
        console.log(message)

        this.io.emit('sendMessageToClient', message).to(chatId)
    }

    createMessage(socket, chatId) {
        socket
            .on('sendMessageToServer', async message => {
                console.log(message)

                const { text, fromId } = message

                const chat = await Chat.findOneAndUpdate(
                    { _id: chatId },
                    {
                        $push: {
                            messages: {
                                text,
                                from: Number(fromId),
                            },
                        },
                        read: true,
                    },
                    {
                        new: true,
                    },
                )

                const newMessage = chat.messages[chat.messages.length - 1]

                this.sendMessage(
                    {
                        _id: newMessage._id,
                        from: fromId,
                        text,
                        createdAt: newMessage.createdAt,
                    },
                    chatId,
                )
            })
            .in(chatId)
    }
}

export default MessageService
