const SubCategory = require("../../models/categories/SubCategory");

exports.createSubCategoryService = async (data) => {
    const subCategory = await SubCategory.create(data);
    subCategory.save();
    return subCategory;
}