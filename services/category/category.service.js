const MainCategory = require("../../models/categories/MainCategory");
const SubCategory = require("../../models/categories/SubCategory");

exports.createCategoryService = async (data) => {

    const category = await MainCategory.create(data);
    category.save();
    return category;

}


exports.allCategoryService = async (pagination) => {

    const { startIndex, limit, key, value } = pagination

    const query = key ? {
        [key]: {
            $regex: value,
            $options: 'i'
        }
    } : {};

    const total = await MainCategory.find(query).countDocuments()

    const category = await MainCategory.find(query, { subCategories: 0 }).skip(startIndex).limit(limit);
    return { category, total };
}

exports.getCategoryByIdService = async (id) => {
    const category = await MainCategory.findById(id).populate({
        path: 'subCategories',
        select: '-__v -mainCategory'
    });
    return category;
}

exports.deleteCategoryService = async (id) => {

    await SubCategory.deleteMany({ mainCategory: id });

    const category = await MainCategory.deleteOne({ _id: id });
    return category;
}

exports.updateCategoryService = async (id, data) => {
    return await MainCategory.updateOne({ _id: id }, { $set: data })
}