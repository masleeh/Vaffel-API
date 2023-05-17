const express = require('express')

const router = express.Router()

const {
    getDishesByCategories
} = require('../controllers/catdishes')

router.route('/:category').get(getDishesByCategories)



module.exports = router