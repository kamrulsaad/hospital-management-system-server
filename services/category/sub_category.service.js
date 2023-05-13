const SubCategory = require("../../models/categories/SubCategory");
const MainCategory = require("../../models/categories/MainCategory");

exports.createSubCategoryService = async (data) => {

    const subCategory = await SubCategory.create(data);

    await MainCategory.updateOne({ _id: data.mainCategory }, { $push: { subCategories: subCategory._id } })

    subCategory.save();
    return subCategory;
}

exports.allSubCategoryService = async () => {
    const subCategories = await SubCategory.find({}, { __v: 0, mainCategory: 0 })
    return subCategories;
}

exports.getSubCategoryByIdService = async (id) => {
    const subCategory = await SubCategory.findById(id, { __v: 0 }).populate('mainCategory', {
        __v: 0,
        subCategories: 0
    });
    return subCategory;
}

exports.updateSubCategoryService = async (id, data) => {
    return await SubCategory.updateOne({ _id: id }, { $set: data });
}

exports.deleteSubCategoryService = async (id) => {
    return await SubCategory.deleteOne({ _id: id });
}