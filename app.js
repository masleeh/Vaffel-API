// Basic setup
const express = require('express')
const app = express()
require('dotenv').config()
app.use(express.json())

// Security
const cors = require('cors')
app.use(cors())

// Middleware
const authMiddleware = require('./middleware/authentication')

// Connecting routers
const authRouter = require('./routes/auth')
const dishesRouter = require('./routes/dishes')
const categoryRouter = require('./routes/categories')
const categoryDishes = require('./routes/categorieswdishes')
const manageCategories = require('./routes/setCategories')
const managePromotions = require('./routes/promotions')
const manageSeasons = require('./routes/seasons')

// Using routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/dishes', authMiddleware, dishesRouter)
app.use('/api/v1/categories', authMiddleware, categoryRouter)
app.use('/api/v1/categorieswdishes', authMiddleware, categoryDishes)
app.use('/api/v1/setcategories', authMiddleware, manageCategories)
app.use('/api/v1/promotions', authMiddleware, managePromotions)
app.use('/api/v1/seasons', authMiddleware, manageSeasons)


// Running server
const port = 5000

const start = async () => {
    try {
        app.listen(port, () => {
            console.log(`Serveris listening on ${port}...`);
        })
    } catch (error) {
        console.log(error)
    }
}

start()