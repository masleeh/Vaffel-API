const express = require('express')

const router = express.Router()

const {
    getAllSeasons,
    createSeason,
    deleteSeason,
    updateSeason
} = require('../controllers/seasons')

router.route('/').get(getAllSeasons).post(createSeason)
router.route('/:id').delete(deleteSeason).patch(updateSeason)

module.exports = router