const Test = require("../models/Test");
const fs = require('fs');
const path = require('path');

exports.findTestByIdService = async (testId) => {
    return await Test.findById(testId);
}

exports.updateFileUrlService = async (req) => {
    const { testId } = req.params;

    const test = await Test.findById(testId);

    if (test.file_url) {
        const previousFilePath = path.join(__dirname, '..', test.file_url.replace(`${req.protocol}://${req.get('host')}/`, ''));
        fs.unlink(previousFilePath, (err) => {
            if (err) {
                return err;
            }
        });
    }

    const url = `${req.protocol}://${req.get('host')}/${req.file.path}`

    await Test.updateOne({ _id: test._id }, { $set: { file_url: url, available: true } })

    return url
}

exports.findAllTestsService = async (pagination) => {

    const { startIndex, limit, key, value } = pagination

    const query = key ? {
        [key]: value
    } : {};

    const total = await Test.find(query).countDocuments()

    const tests = await Test.find(query).select("createdAt serialId available").populate([
        {
            path: "category",
            select: "name -_id"
        },
        {
            path: "patient",
            select: "name -_id"
        }
    ]).sort({serialId: -1}).skip(startIndex).limit(limit)

    return { tests, total}
}