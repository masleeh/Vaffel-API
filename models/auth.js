const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(password, salt)
    return Promise.resolve(password)
}

const comparePassword = async (candidatePassword, dbPassword) => {
    const isMatch = await bcrypt.compare(candidatePassword, dbPassword)
    return isMatch
}

const createJWT = (name) => {
    return jwt.sign({name: name}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}

module.exports = {hashPassword, comparePassword, createJWT}