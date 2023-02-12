const express = require('express')

const router = express.Router()

const {
    createCategory,
    setDeleteCategory
} = require('../controllers/dishes')

router.route('/').post(createCategory).delete(setDeleteCategory)

module.exports = router