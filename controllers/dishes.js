const { response } = require('express')
const pool = require('../db/connectDB')

const getAllDishes = async (req, res) => {
    try {
        const [dishes] = await pool.query(`SELECT * FROM vaffel_schema.dishes`)
        res.status(200).json(dishes)
    } catch (error) {
        res.status(404).json({msg: 'Not found dishes'})
    }
}

const getSingleDish = async (req, res) => {
    try {
        const {params: {id: dishId}} = req
        console.log(`What`)
        const [singleDish] = await pool.query(`SELECT * FROM vaffel_schema.dishes WHERE id = ?`, [dishId])
        res.status(200).json(singleDish) 
    } catch (error) {
        res.status(401).json('Something went wrong')
    }
}

const getAllCategories = async (req, res) => {
    try {
        const [categories] = await pool.query(`SELECT * from vaffel_schema.categories`)
        res.status(200).json(categories.sort((a, b) => a.order - b.order))
    } catch (error) {
        res.status(403).json({msg: `Not found categories`})
    }
}

const getCategory = async (req, res) => {
    try {
        const {params: {id: dishId}} = req
        const [categories] = await pool.query(`SELECT dc.dishes_id, c.* FROM vaffel_schema.dishes d left outer join vaffel_schema.dishes_categories dc on d.id = dc.dishes_id left outer join vaffel_schema.categories c on dc.category_id = c.id WHERE dishes_id = ?`, [dishId])
        res.status(200).json(categories.map(item => {
            return {
                name: item.name,
                dishes_id: item.dishes_id,
                category_id: item.id
            }
        }))
    } catch (error) {
        res.status(401).json(`Something went wrong`)
    }
}

const createDish = async (req, res) => {
    try {
        const newDish = req.body
        const [response] = await pool.query(`INSERT INTO vaffel_schema.dishes (name, description, price, discountprice, weight_big, weight_small, calories, proteins, fats, carbos, ingredient, image_link) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [newDish.name, newDish.description, newDish.price, newDish.discountprice, newDish.weight_big, newDish.weight_small, newDish.calories, newDish.proteins, newDish.fats, newDish.carbos, newDish.ingredient, newDish.image_link])
        res.status(201).send({id: response.insertId})
    } catch (error) {
        res.status(401).json(`Someting went wrong`)
    }
}

const updateDish = async (req, res) => {
    try {
        const {id: dishId} = req.params
        const updatedDish = req.body
        const [response] = await pool.query(`UPDATE vaffel_schema.dishes SET name = ?, description = ?, price = ?, discountprice = ?, weight_big = ?, weight_small = ?, calories = ?, proteins = ?, fats = ?, carbos = ?, ingredient = ?, image_link = ? WHERE id = ?`, [updatedDish.name, updatedDish.description, updatedDish.price, updatedDish.discountprice, updatedDish.weight_big, updatedDish.weight_small, updatedDish.calories, updatedDish.proteins, updatedDish.fats, updatedDish.carbos, updatedDish.ingredient, updatedDish.image_link, dishId])
        res.status(201).json(response)
    } catch (error) {
        res.status(401).json(`Something went wrong`)
    }
}

const deleteCategory = async (req, res) => {
    try {
        const {
            dish_id: dish_id,
            category_id: category_id
        } = req.body
        const [response] = await pool.query(`DELETE FROM vaffel_schema.dishes_categories WHERE dishes_id = ? AND category_id = ?`, [dish_id, category_id])

        res.status(200).json(response)
    } catch (error) {
        res.status(401).json(`Something went wrong`)
    }
}

const addCategory = async (req, res) => {
    try {
        const {
            dish_id: dish_id,
            category_id: category_id
        } = req.body
        const [response] = await pool.query(`INSERT INTO vaffel_schema.dishes_categories (dishes_id, category_id) VALUES (?, ?)`, [dish_id, category_id])
        res.status(201).json(response)
    } catch (error) {
        res.status(401).json(`Something went wrong`)
    }
}

const getDishesCategories = async (req, res) => {
    try {
        const [response] = await pool.query(`SELECT dc.dishes_id, c.* FROM vaffel_schema.dishes d left outer join vaffel_schema.dishes_categories dc on d.id=dc.dishes_id left outer join vaffel_schema.categories c on dc.category_id = c.id`)
        res.status(200).json(response)
    } catch (error) {
        res.status(401).json(`Something went wrong`)
    }
}

const deleteDish = async (req, res) => {
    try {
        const {id: dishId} = req.params
        const [response] = await pool.query(`DELETE FROM vaffel_schema.dishes WHERE id = ?`, [dishId])
        res.status(200).json(response)
    } catch (error) {
        res.status(401).json(`Something went wrong`)
    }
}

const createCategory = async (req, res) => {
    try {
        const {name: categoryName} = req.body
        const [response] = await pool.query(`INSERT INTO vaffel_schema.categories (name) VALUES (?)`, [categoryName])
        res.status(200).json(response)
    } catch (error) {
        res.status(403).json(`Something went wrong`)
    }
}

const setDeleteCategory = async (req, res) => {
    try {
        const {id: id} = req.params
        const [response] = await pool.query(`DELETE FROM vaffel_schema.categories WHERE id = ?`, [id])
        res.status(200).json(response)
    } catch (error) {
        res.status(403).json(`Something went wrong`)
    }
}

module.exports = {
    getAllDishes,
    getSingleDish,
    getCategory,
    createDish,
    updateDish,
    deleteCategory,
    addCategory,
    getAllCategories,
    getDishesCategories,
    deleteDish,
    createCategory,
    setDeleteCategory
}


// Previous getAllDishes

// const [categories] = await pool.query(`SELECT dc.dishes_id, c.* FROM vaffel_schema.dishes d left outer join vaffel_schema.dishes_categories dc on d.id = dc.dishes_id left outer join vaffel_schema.categories c on dc.category_id = c.id WHERE dishes_id = ?`, [dishId])
// SELECT * FROM vaffel_schema.dishes d left outer join vdishes_categoriesaffel_schema.dishes_categories dc on d.id=dc.dishes_id left outer join vaffel_schema.categories c on dc.category_id = c.id
// const [categories] = await pool.query(`SELECT dc.dishes_id,c.* FROM vaffel_schema.dishes d left outer join vaffel_schema.dishes_categories dc on d.id=dc.dishes_id left outer join vaffel_schema.categories c on dc.category_id = c.id`)
// const fullDishes = dishes.map((element, index) => {
//     const actualCategories = categories.filter(item => item.dishes_id === element.id)
//     if (categories.length === 0) {
//         return {...element, categories: []}
//     }
//     else {
//         return {...element, categories: actualCategories.map(item => item.name)}
//     }
// })