const Bed = require("../models/Bed");
const BedCategory = require("../models/BedCategory");

exports.createBedCategoryService = async (data) => {
    return await BedCategory.create(data);
}

exports.getBedCategoryService = async (id) => {
    return await BedCategory.findById(id, { __v: 0 });
}

exports.getAllBedCategoriesService = async (pagination) => {

    const query = pagination.key ? { [pagination.key]: { $regex: pagination.value, $options: "i" } } : {};

    const total = await BedCategory.countDocuments(query);

    const bedCategories = await BedCategory.find(query, {
        __v: 0,
    })
        .skip(pagination.startIndex)
        .limit(pagination.limit);
    return { bedCategories, total };
}

exports.updateBedCategoryService = async (id, data) => {
    return await BedCategory.updateOne({ _id: id }, { $set: data })
}

exports.deleteBedCategoryService = async (id) => {
    return await BedCategory.findByIdAndDelete(id);
}

exports.createBedService = async (data) => {
    return await Bed.create(data);
}

exports.getBedService = async (id) => {
    return await Bed.findById(id, { __v: 0 })
        .populate('category', { __v: 0 })
        .populate('patient', { name: 1 });
}

exports.getAllBedsService = async (pagination) => {

    const { key, value } = pagination;

    const query = key ? {
        [key]: (value === 'true' || value === 'false')
            ? value
            : {
                $regex: value,
                $options: 'i'
            }
    } : {};

    const total = await Bed.countDocuments(query);

    const beds = await Bed.find(query, {
        __v: 0,
    })
        .populate('category', { __v: 0 })
        .populate('patient', { name: 1 })
        .sort({ "serialId": -1 })
        .skip(pagination.startIndex)
        .limit(pagination.limit);
    return { beds, total };
}

exports.updateBedService = async (id, data) => {
    return await Bed.updateOne({ _id: id }, { $set: data })
}

exports.deleteBedService = async (id) => {
    return await Bed.findByIdAndDelete(id);
}