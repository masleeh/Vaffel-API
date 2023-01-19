const express = require('express')

const router = express.Router()

const {
    getAllDishes,
    getSingleDish,
    getCategory,
    createDish,
    updateDish,
    deleteCategory,
    addCategory
} = require('../controllers/dishes')

router.route('/').get(getAllDishes).post(createDish)
router.route('/:id').get(getSingleDish).patch(updateDish)

router.route('/category').post(addCategory).delete(deleteCategory)
router.route('/category/:id').get(getCategory)

module.exports = router