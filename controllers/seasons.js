const pool = require('../db/connectDB')

const getAllSeasons = async (req, res) => {
    try {
        const [seasons] = await pool.query(`SELECT * FROM vaffel_schema.seasons`)
        res.status(200).json(seasons)
    } catch (error) {
        res.status(404).json('Not found seasons')
    }
}

const updateSeason = async (req, res) => {
    try {

        const {id: id} = req.params
        const updateSeasons = req.body 
        const [respose] = await pool.query(`UPDATE vaffel_schema.seasons SET image_link = ? WHERE id = ?`, [updateSeasons.image_link, id])
        res.status(200).json('Successful update!')
    } catch (error) {
        res.status(401).json(`Cannot update seasons`)
    }
}

const deleteSeason = async (req, res) => {
    try {
        const {id: id} = req.params
        const [response] = await pool.query(`DELETE FROM vaffel_schema.seasons WHERE id = ?`, [id])
        res.status(200).json(`Successfully deleted!`)
    } catch (error) {
        res.status(401).json(`Deletion failed`)
    }
}

const createSeason = async (req, res) => {
    try {
        const newSeason = req.body
        const [response] = await pool.query(`INSERT INTO vaffel_schema.seasons (image_link) VALUES (?)`, [newSeason.image_link])
        res.status(201).json('Created new Season!')
    } catch (error) {
        res.status(401).json('Creating new season failed')
    }
}


module.exports = {
    getAllSeasons,
    updateSeason,
    deleteSeason,
    createSeason
}