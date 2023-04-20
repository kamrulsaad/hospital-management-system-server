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