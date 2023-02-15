const express = require('express')

const router = express.Router()

const {
    createCategory,
    setDeleteCategory
} = require('../controllers/dishes')

router.route('/').post(createCategory)
router.route('/:id').delete(setDeleteCategory)

module.exports = router