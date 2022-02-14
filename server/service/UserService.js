const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mailService')
const tokenService = require('./TokenService')
const UserDto = require('../dto/UserDto')

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email })
    if (candidate) {
      throw new Error(`User with email ${email} already exists`)
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const activationLink = uuid.v4()

    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
    })
    await mailService.sendActivationMail(email, activationLink)

    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }

  async users() {
    return UserModel.find()
  }
}

module.exports = new UserService()