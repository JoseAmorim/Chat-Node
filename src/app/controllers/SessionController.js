import UserService from '../services/UserService'
import SessionService from '../services/SessionService'

class SessionController {
    async store(req, res) {
        const { id } = req.body

        const checkUser = UserService.checkUserExists(id)

        if (!checkUser)
            return res.status(404).json({
                error: true,
                message: 'Usuário não encontrado no sistema.',
            })

        const token = SessionService.createToken(id)

        return res.status(200).json({ token })
    }
}

export default new SessionController()
