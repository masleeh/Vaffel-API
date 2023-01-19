const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(403).json({msg: 'Authorization failed'})
        next()
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        console.log(`Payload is: ${payload}`)
        next()
    } catch (error) {
        res.status(403).json({msg: 'Authorization failed'})
    }
}

module.exports = auth