import socket from 'socket.io'
import MessageService from '../services/MessageService'
import app from '../../app'

class MessageController {
    async index(req, res) {
        const io = socket(app)

        const messageService = new MessageService(io)

        const messages = await messageService.getAllMessages()

        return res.json(messages)
    }

    async show(req, res) {
        const { id } = req.params

        const io = socket(app)

        const messageService = new MessageService(io)

        const messages = await messageService.getAllMessages(id)

        if (!messages)
            return res
                .status(404)
                .json({ error: true, message: 'Esse chat não existe.' })

        return res.json(messages)
    }

    // async store(req, res) {
    //     const { message: text, chatId } = req.body

    //     const io = socket(app)

    //     const messageService = new MessageService(io)

    //     const newMessage = await messageService.createMessage(
    //         {
    //             text,
    //             fromId: req.userId,
    //         },
    //         chatId,
    //     )

    //     return res.json(newMessage)
    // }
}

export default new MessageController()
