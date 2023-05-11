const { createSubCategoryService } = require("../../services/category/sub_category.service")

exports.createSubCategory = async (req, res) => {
    try {
        const subCategory = await createSubCategoryService(req.body)

        if (!subCategory) {
            return res.status(400).json({
                status: 'fail',
                message: 'Sub Category not created'
            })
        }

        res.status(201).json({
            status: 'success',
            message: 'Sub Category created successfully',
            data: subCategory
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: error.message
        })
    }
}