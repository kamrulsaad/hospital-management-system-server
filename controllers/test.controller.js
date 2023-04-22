const { updateFileUrlService, findAllTestsService, findTestByIdService, findByIdAndDeleteService, removeFileService } = require("../services/test.service");

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

        const { tests, total } = await findAllTestsService(req.pagination);

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

exports.getTest = async (req, res) => {
    try {

        const test = await findTestByIdService(req.params.testId);

        res.status(200).json({
            status: "success",
            message: "Test",
            data: test
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: error.message
        })
    }
}

exports.deleteTest = async (req, res) => {
    try {

        if (!req.admin) {
            return res.status(403).json({
                status: "fail",
                error: "You are not authorized to perform this action"
            })
        }

        const test = await findByIdAndDeleteService(req);

        res.status(200).json({
            status: "success",
            message: `Test ${test?.serialId} Deleted Successfully`
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: error.message
        })
    }
}

exports.removeFile = async (req, res) => {
    try {

        const test = await removeFileService(req);

        if(!test?.modifiedCount) {
            return res.status(500).json({
                status: "fail",
                error: "Something went wrong"
            })
        }

        res.status(200).json({
            status: "success",
            message: "File Removed Successfully"
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: error.message
        })
    }
}