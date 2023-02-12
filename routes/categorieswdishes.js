const express = require('express')

const router = express.Router()

const {
    getDishesCategories
} = require('../controllers/dishes')

router.route('/').get(getDishesCategories)

module.exports = router