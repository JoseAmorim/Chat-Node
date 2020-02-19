import User from '../models/User'

class UserService {
    async createUser(user) {
        const { id: _id, name } = user

        const checkUser = await this.getUserById(_id)

        if (checkUser) return null

        const newUser = await User.create({ _id, name })

        return newUser
    }

    async getAllUsers() {
        const users = await User.find(
            {},
            {
                _id: true,
                name: true,
            },
        )

        return users
    }

    async getUserById(id) {
        const user = await User.findById(id)

        return user
    }

    async checkUserExists(id) {
        const checkUser = await this.getUserById(id)

        if (!checkUser) return false

        return true
    }
}

export default new UserService()
