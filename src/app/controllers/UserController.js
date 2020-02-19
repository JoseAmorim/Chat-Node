import UserService from '../services/UserService'

class UserController {
    async index(req, res) {
        const users = await UserService.getAllUsers()

        return res.status(200).json(users)
    }

    async store(req, res) {
        const { id, name } = req.body

        const user = await UserService.createUser({ id, name })

        if (!user)
            return res
                .status(401)
                .json({
                    error: true,
                    message: 'Já existe um usuário com esta identificação.',
                })

        return res.status(201).json(user)
    }
}

export default new UserController()
