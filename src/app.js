import 'dotenv/config'

import express from 'express'
import http from 'http'

import socket from 'socket.io'

import routes from './routes'
import MessageService from './app/services/MessageService'

import './database'

class App {
    constructor() {
        this.server = express()
        this.httpServer = http.createServer(this.server)

        this.middlewares()
        this.routes()
        this.initSocket()
    }

    middlewares() {
        this.server.use(express.json())
    }

    routes() {
        this.server.use(routes)
    }

    initSocket() {
        const io = socket(this.httpServer)

        const messageSocket = new MessageService(io)

        messageSocket.initSocket()
    }
}

export default new App().httpServer
