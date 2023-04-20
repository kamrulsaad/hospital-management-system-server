const { updateFileUrlService } = require("../services/test.service");

exports.uploadTestFile = async (req, res) => {
    try {

        const imageUrl = await updateFileUrlService(req);

        res.status(200).json({
            success: true,
            message: "File Uploaded Successfully",
            imageUrl
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
};