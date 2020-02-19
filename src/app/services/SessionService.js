import authConfig from '../../config/auth'
import jwt from 'jsonwebtoken'

class SessionService {
    createToken(id) {
        const { secret, expiresIn } = authConfig

        return jwt.sign({ id }, secret, {
            expiresIn,
        })
    }
}

export default new SessionService()
