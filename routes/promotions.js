const express = require('express')

const router = express.Router()

const {
    getAllPromotions,
    updatePromotion,
    deletePromotion,
    createPromotion,
} = require('../controllers/promotions')

router.route('/').get(getAllPromotions).post(createPromotion)
router.route('/:id').patch(updatePromotion).delete(deletePromotion)



module.exports = router