const SubCategory = require("../../models/categories/SubCategory");
const MainCategory = require("../../models/categories/MainCategory");

exports.createSubCategoryService = async (data) => {

    const subCategory = await SubCategory.create(data);

    await MainCategory.updateOne({ _id: data.mainCategory }, { $push: { subCategories: subCategory._id } })

    subCategory.save();
    return subCategory;
}

exports.allSubCategoryService = async ( pagination) => {

    const { key, value } = pagination

    const query = key ? {
        [key]: {
            $regex: value,
            $options: 'i'
        }
    } : {};

    const total = await SubCategory.find(query).countDocuments()

    const subCategories = await SubCategory.find(query, { mainCategory: 0 });

    return {subCategories, total};
}