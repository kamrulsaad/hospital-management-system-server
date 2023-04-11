const Category = require("../models/Category")

exports.createCategoryService = async (data) => {
    return await Category.create(data)
}