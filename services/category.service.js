const Category = require("../models/Category")

exports.createCategoryService = async (data) => {
    return await Category.create(data)
}

exports.allCategoryService = async () => {
    const total = await Category.countDocuments()
    const categories = await Category.find({})
    return { categories, total }
}

exports.deleteCategoryService = async (_id) => {
    return await Category.deleteOne({_id})
}

exports.updateCategoryService = async(_id, data) => {
    return await Category.updateOne({_id}, {$set: data})
}