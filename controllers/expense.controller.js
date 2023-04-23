const { createExpenseCategoryService, getAllExpenseCategoriesService } = require("../services/expense.service")

exports.createExpenseCategory = async (req, res) => {
    try {
        if (!req.admin) return res.status(401).json({ status: "fail", message: "Unauthorized" })

        const expenseCategory = await createExpenseCategoryService(req.body)

        expenseCategory.save()

        res.status(200).json({
            status: "success",
            message: "Expense category created successfully",
            data: expenseCategory
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message
        })
    }
}

exports.getAllExpenseCategories = async (req, res) => {
    try {

        const { page } = req.pagination;
        
        const {expenseCategories, total} = await getAllExpenseCategoriesService(req.pagination)

        res.status(200).json({
            status: "success",
            message: "Expense categories fetched successfully",
            data: expenseCategories,
            total, page
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message
        })
    }
}