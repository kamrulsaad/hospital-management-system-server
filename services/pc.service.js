const PC = require("../models/PC");
const { findUserByEmailService } = require("./user.service");

exports.registerService = async (data, user) => {

    const { _id: addedBy } = await findUserByEmailService(user.email)

    return await PC.create({
        ...data,
        addedBy,
    });
}

exports.getAllService = async (pagination) => {
    const { startIndex, limit, key, value } = pagination

    const query = key ? {
        [key]: {
            $regex: value,
            $options: 'i'
        }
    } : {};

    const total = await PC.find(query).countDocuments()

    const pcs = await PC.find(query, {
        name: 1,
        phone: 1,
        location: 1,
        serialId: 1,
    }).skip(startIndex).limit(limit);

    return {pcs, total}

}