const express = require('express')

const router = express.Router()

const {
    getCategory,
    deleteCategory,
    addCategory,
    getAllCategories
} = require('../controllers/dishes')

router.route('/').post(addCategory).delete(deleteCategory).get(getAllCategories)
router.route('/:id').get(getCategory)

module.exports = router