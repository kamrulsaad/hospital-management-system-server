const { createExpenseCategoryService,
    getAllExpenseCategoriesService,
    getExpenseCategorybyIdService,
    updateExpenseCategoryService,
    deleteExpenseCategoryService,
    createExpenseService,
    getAllExpensesService,
    getExpenseByIdService,
    updateExpenseService,
    deleteExpenseService
} = require("../services/expense.service")

exports.createExpenseCategory = async (req, res) => {
    try {
        if (!req.admin) return res.status(401).json({ status: "fail", message: "Unauthorized" })

        const expenseCategory = await createExpenseCategoryService(req.body)

        expenseCategory.save()

        res.status(200).json({
            status: "success",
            message: "Expense category created successfully",
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

        const { expenseCategories, total } = await getAllExpenseCategoriesService(req.pagination)

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

exports.getExpenseCategorybyId = async (req, res) => {
    try {
        const expenseCategory = await getExpenseCategorybyIdService(req.params.expCatId)

        if (expenseCategory) {
            res.status(200).json({
                status: "success",
                message: "Expense category fetched successfully",
                data: expenseCategory
            })
        } else {
            res.status(404).json({
                status: "fail",
                message: "Expense category not found"
            })
        }

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message
        })
    }
}

exports.updateExpenseCategory = async (req, res) => {
    try {
        if (!req.admin) return res.status(401).json({ status: "fail", message: "Unauthorized" })

        const expenseCategory = await getExpenseCategorybyIdService(req.params.expCatId)

        if (expenseCategory) {
            const updatedExpenseCategory = await updateExpenseCategoryService(req.params.expCatId, req.body)

            if (updatedExpenseCategory.modifiedCount === 1) {
                res.status(200).json({
                    status: "success",
                    message: "Expense category updated successfully",
                })
            } else {
                res.status(400).json({
                    status: "fail",
                    message: "Expense category not updated"
                })
            }
        } else {
            res.status(404).json({
                status: "fail",
                message: "Expense category not found"
            })
        }

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message
        })
    }
}

exports.deleteExpenseCategory = async (req, res) => {
    try {
        if (!req.admin) return res.status(401).json({ status: "fail", message: "Unauthorized" })

        const expenseCategory = await getExpenseCategorybyIdService(req.params.expCatId)

        if (expenseCategory) {
            const deletedExpenseCategory = await deleteExpenseCategoryService(req.params.expCatId)

            if (deletedExpenseCategory.deletedCount === 1) {
                res.status(200).json({
                    status: "success",
                    message: "Expense category deleted successfully",
                })
            } else {
                res.status(400).json({
                    status: "fail",
                    message: "Expense category not deleted"
                })
            }
        } else {
            res.status(404).json({
                status: "fail",
                message: "Expense category not found"
            })
        }

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message
        })
    }
}

exports.createExpense = async (req, res) => {
    try {

        const expense = await createExpenseService(req.body)

        expense.save()

        res.status(200).json({
            status: "success",
            message: "Expense created successfully",
            data: expense
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message
        })
    }
}

exports.getAllExpenses = async (req, res) => {
    try {

        const { page } = req.pagination;

        const { expenses, total } = await getAllExpensesService(req.pagination)

        res.status(200).json({
            status: "success",
            message: "Expenses fetched successfully",
            data: expenses,
            total, page
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message
        })
    }
}

exports.getExpensebyId = async (req, res) => {
    try {
        const expense = await getExpenseByIdService(req.params.expId)

        if (expense) {
            res.status(200).json({
                status: "success",
                message: "Expense fetched successfully",
                data: expense
            })
        } else {
            res.status(404).json({
                status: "fail",
                message: "Expense not found"
            })
        }

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message
        })
    }
}

exports.updateExpense = async (req, res) => {
    try {

        if(!req.admin) return res.status(401).json({ status: "fail", message: "Unauthorized" })

        const expense = await getExpenseByIdService(req.params.expId)

        if (expense) {
            const updatedExpense = await updateExpenseService(req.params.expId, req.body)

            if (updatedExpense.modifiedCount === 1) {
                res.status(200).json({
                    status: "success",
                    message: "Expense updated successfully",
                })
            } else {
                res.status(400).json({
                    status: "fail",
                    message: "Expense not updated"
                })
            }
        } else {
            res.status(404).json({
                status: "fail",
                message: "Expense not found"
            })
        }

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message
        })
    }
}

exports.deleteExpense = async (req, res) => {
    try {
        if (!req.admin) return res.status(401).json({ status: "fail", message: "Unauthorized" })

        const expense = await getExpenseByIdService(req.params.expId)

        if (expense) {
            const deletedExpense = await deleteExpenseService(req.params.expId)

            if (deletedExpense.deletedCount === 1) {
                res.status(200).json({
                    status: "success",
                    message: "Expense deleted successfully",
                })
            } else {
                res.status(400).json({
                    status: "fail",
                    message: "Expense not deleted"
                })
            }
        } else {
            res.status(404).json({
                status: "fail",
                message: "Expense not found"
            })
        }

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message
        })
    }
}