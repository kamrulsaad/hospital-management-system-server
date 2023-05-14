const { createTestNameService, updateTestNameService, deleteTestNameService } = require("../../services/category/test_name.service");

exports.createTestName = async (req, res) => {
    try {
        const testName = await createTestNameService(req.body);
        res.status(201).json({
            success: "success",
            message: "Test name created successfully",
            data: testName,
        });
    } catch (err) {
        res.status(400).json({
            success: "fail",
            error: err.message,
        })
    }
}

exports.updateTestName = async (req, res) => {
    try {
        const testName = await updateTestNameService(req.params.id, req.body);

        if (!testName) {
            return res.status(404).json({
                success: "fail",
                message: "Test name not found",
            });
        }

        if (testName.modifiedCount === 0) {
            return res.status(400).json({
                status: "fail",
                message: "Nothing to update",
            });
        }

        res.status(200).json({
            success: "success",
            message: "Test name updated successfully",
        });
    } catch (err) {
        res.status(400).json({
            success: "fail",
            error: err.message,
        })
    }
}

exports.deleteTestName = async (req, res) => {
    try {
        const testName = await deleteTestNameService(req.params.id);

        if (!testName) {
            return res.status(404).json({
                success: "fail",
                message: "Test name not found",
            });
        }

        if (testName.deletedCount === 0) {
            return res.status(400).json({
                status: "fail",
                message: "Test name not deleted",
            });
        }

        res.status(200).json({
            success: "success",
            message: "Test name deleted successfully",
        });
    } catch (err) {
        res.status(400).json({
            success: "fail",
            error: err.message,
        })
    }
}