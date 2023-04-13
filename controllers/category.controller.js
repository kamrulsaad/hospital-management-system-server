const { createCategoryService, allCategoryService, deleteCategoryService, updateCategoryService } = require("../services/category.service")

exports.createCategory = async (req, res) => {
    try {

        if (!req?.admin) {
            return res.status(403).json({
                status: "fail",
                message: "You do not have access to this operation.",
            });
        }

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

exports.allCategory = async (req, res) => {
    try {
        const { categories, total } = await allCategoryService()

        res.status(200).json({
            status: "success",
            message: "All Categories",
            total,
            data: total > 0 ? categories : "No Categories Found",
        })

    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: error.message
        })
    }
}

exports.deleteCategory = async (req, res) => {
    try {

        if (!req?.admin) {
            return res.status(403).json({
                status: "fail",
                message: "You do not have access to this operation.",
            });
        }

        await deleteCategoryService(req.params.categoryId)

        res.status(200).json({
            status: "success",
            message: "Deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: error.message
        })
    }
}

exports.updateCategory = async (req, res) => {
    try {

        if (!req?.admin) {
            return res.status(403).json({
                status: "fail",
                message: "You do not have access to this operation.",
            });
        }

        await updateCategoryService(req.params.categoryId, req.body)

        res.status(200).json({
            status: "success",
            message: "Updated successfully"
        })

    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: error.message
        })
    }
}