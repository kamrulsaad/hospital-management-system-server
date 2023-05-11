const MainCategory = require("../../models/categories/MainCategory");

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