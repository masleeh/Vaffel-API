const pool = require('../db/connectDB')

const getAllPromotions = async (req, res) => {
    try {
        const [promotions] = await pool.query(`SELECT * FROM vaffel_schema.promotions`)
        res.status(200).json(promotions)
    } catch (error) {
        res.status(404).json('Not found promotions')
    }
}

const updatePromotion = async (req, res) => {
    try {
        const {id: id} = req.params
        const updatePromotion = req.body 
        const [respose] = await pool.query(`UPDATE vaffel_schema.promotions SET title = ?, description = ?, image_link = ? WHERE id = ?`, [updatePromotion.title, updatePromotion.description, updatePromotion.image_link, id])
        res.status(200).json('Successful update!')
    } catch (error) {
        res.status(401).json(`Cannot update promotion`)
    }
}

const deletePromotion = async (req, res) => {
    try {
        const {id: id} = req.params
        const [response] = await pool.query(`DELETE FROM vaffel_schema.promotions WHERE id = ?`, [id])
        res.status(200).json(`Successfully deleted!`)
    } catch (error) {
        res.status(401).json(`Deletion failed`)
    }
}

const createPromotion = async (req, res) => {
    try {
        const newPromotion = req.body
        const [response] = await pool.query(`INSERT INTO vaffel_schema.promotions (title, description, image_link) VALUES (?, ?, ?)`, [newPromotion.title, newPromotion.description, newPromotion.image_link])
        res.status(201).json('Created new Promotion!')
    } catch (error) {
        res.status(401).json('Creating new promotion failed')
    }
}



module.exports = {
    getAllPromotions,
    updatePromotion,
    deletePromotion,
    createPromotion
}