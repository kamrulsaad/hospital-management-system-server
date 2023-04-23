const ExpenseCategory = require("../models/ExpenseCategories");

exports.createExpenseCategoryService = async (data) => {
    const expenseCategory = await ExpenseCategory.create(data);
    return expenseCategory;
};

exports.getAllExpenseCategoriesService = async (pagination) => {

    const query = pagination.key ? { [pagination.key]: { $regex: pagination.value, $options: "i" } } : {};

    const total = await ExpenseCategory.countDocuments(query);

    const expenseCategories = await ExpenseCategory.find(query, {
        __v: 0,
    })
        .skip(pagination.startIndex)
        .limit(pagination.limit);
    return { expenseCategories, total };
}
