import { Router } from 'express'
import MessageController from './app/controllers/MessageController'
import UserController from './app/controllers/UserController'

import authMiddleware from './app/middlewares/auth'
import SessionController from './app/controllers/SessionController'
import ChatController from './app/controllers/ChatController'

const routes = new Router()

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

routes.use(authMiddleware)

routes.get('/users', UserController.index)

routes.post('/chats', ChatController.store)
routes.get('/chats', ChatController.index)

routes.get('/messages/:id', MessageController.show)

export default routes
