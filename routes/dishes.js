const express = require('express')

const router = express.Router()

const {
    getAllDishes,
    getSingleDish,
    createDish,
    updateDish,
} = require('../controllers/dishes')

router.route('/').get(getAllDishes).post(createDish)
router.route('/:id').get(getSingleDish).patch(updateDish)



module.exports = router