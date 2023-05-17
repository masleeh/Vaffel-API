const pool = require("../db/connectDB");

const getDishesByCategories = async (req, res) => {
    const { category } = req.params;
    const [response] = await pool.query(
        `SELECT  vaffel_schema.dishes.name, vaffel_schema.dishes.description, vaffel_schema.dishes.price, vaffel_schema.dishes.ingredient, vaffel_schema.dishes.image_link, vaffel_schema.dishes.weight_big, vaffel_schema.dishes.weight_small, vaffel_schema.dishes.discountprice FROM vaffel_schema.categories LEFT OUTER JOIN vaffel_schema.dishes_categories ON vaffel_schema.categories.id = vaffel_schema.dishes_categories.category_id LEFT OUTER JOIN vaffel_schema.dishes ON vaffel_schema.dishes.id = vaffel_schema.dishes_categories.dishes_id WHERE vaffel_schema.categories.name = ?`,
        [category]
    );
    res.status(200).json(response);
};

module.exports = { getDishesByCategories };
