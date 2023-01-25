const pool = require('../db/connectDB')
const {hashPassword, comparePassword, createJWT} = require('../models/auth')

const register = async (req, res) => {
    try {
        let {name, password} = req.body
        password = await hashPassword(password)
        await pool.query(`INSERT INTO vaffel_schema.users (name, password) VALUES (?, ?);`, [name, password])
        res.status(201).json(`Successfully added user with name: ${name}, password: ${password}`)
    } catch (error) {
        res.status(400).json(error)
    }
}

const login = async (req, res) => {
    try {
        const {name, password} = req.body
        if (!name || !password) {
            return res.status(400).json('Wrong data, try again')
        } else {
            const [user] = await pool.query(`SELECT * FROM vaffel_schema.users WHERE name = ?`, [name])
            if (user.length === 0) {
                return res.status(401).json('Not found user')
            }
            const isPasswordCorrect = await comparePassword(password, user[0].password)
            if (!isPasswordCorrect) {
                return res.status(401).json('Password is not correct')
            }
            const token = createJWT(name)
            return res.status(200).json({user: user[0].name, token})
        }
    } catch (error) {
        res.status(401).json('Something went wrong, try again')
    }
}


module.exports = {login, register}