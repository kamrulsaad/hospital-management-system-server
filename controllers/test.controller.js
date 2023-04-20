const { updateFileUrlService, findAllTestsService } = require("../services/test.service");

exports.uploadTestFile = async (req, res) => {
    try {

        const imageUrl = await updateFileUrlService(req);

        res.status(200).json({
            status: "success",
            message: "File Uploaded Successfully",
            imageUrl
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: error.message
        })
    }
};

exports.allTests = async (req, res) => {
    try {

        const { page, limit, startIndex, endIndex } = req.pagination;

        const {tests, total} = await findAllTestsService(req.pagination);

        res.status(200).json({
            status: "success",
            message: "All Tests",
            total, page, limit, startIndex, endIndex,
            data: tests
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: error.message
        })
    }
}