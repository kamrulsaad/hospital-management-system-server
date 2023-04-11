const { createCategoryService } = require("../services/category.service")

exports.createCategory = async (req, res) => {
    try {

        const category = await createCategoryService(req.body)

        category.save()

        res.status(200).json({
            status: "success",
            message: 'Category Created',
            data: category
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: error.message
        })
    }
}