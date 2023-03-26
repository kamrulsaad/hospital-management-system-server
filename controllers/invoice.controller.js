const { createInvoiceService, getAllInvoiceService, invByIdService } = require("../services/invoice.service")

exports.createInvoice = async (req, res) => {
    try {

        const invoice = await createInvoiceService(req.body, req.user, req.params.patientId)

        invoice.save()

        res.status(200).json({
            status: "success",
            message: 'Invoice Generated',
            data: invoice
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: error.message
        })
    }
}

exports.getAllInvoice = async (req, res) => {
    try {

        const { page, limit, startIndex, endIndex } = req.pagination;

        const {invoices , total}= await getAllInvoiceService(req.pagination)

        res.status(200).json({
            status: "success",
            message: 'All Invoices',
            data: invoices,
            page, limit, startIndex, endIndex, total
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: error.message
        })
    }
}

exports.findInvById = async (req, res) => {
    try {
        const invoice = await invByIdService(req.params.invId)

        res.status(200).json({
            status: "success",
            data: invoice
        })

    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error: error.message
        })
    }
}