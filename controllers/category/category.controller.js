const { createCategoryService, allCategoryService } = require("../../services/category/category.service")

exports.createCategory = async (req, res) => {
    try {
        const category = await createCategoryService(req.body)

        if (!category) {
            return res.status(400).json({
                status: 'fail',
                message: 'Category not created'
            })
        }

        res.status(201).json({
            status: 'success',
            message: 'Category created successfully',
            data: category
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: error.message
        })
    }
}

exports.allCategory = async (req, res) => {
    try {
        const {category, total} = await allCategoryService(req.pagination)

        if (!category) {
            return res.status(400).json({
                status: 'fail',
                message: 'Category not created'
            })
        }

        res.status(201).json({
            status: 'success',
            message: 'Category created successfully',
            data: category,
            total,
            page: req.pagination.page,
            count: req.pagination.limit
        })
    }
    catch (error) {
        res.status(400).json({
            status: 'fail',
            error: error.message
        })
    }
}