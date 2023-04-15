const Invoice = require("../models/Invoice")
const Patient = require("../models/Patient")
const { findUserByEmailService } = require("./user.service")

exports.createInvoiceService = async (info, user, patient) => {

    const {_id: createdBy} = await findUserByEmailService(user.email)

    info = {...info, createdBy, patient}

    const invoice =  await Invoice.create(info)

    await Patient.updateOne({_id: patient}, {$push: {invoices: invoice._id}})

    return invoice
} 

exports.getAllInvoiceService =  async (pagination) => {

    const { startIndex, limit } = pagination

    const total = await Invoice.countDocuments()

    const invoices =  await Invoice.find({}).populate({
        path: 'patient',
        select: "serialId phone"
    }).select("serialId payments sub_total grand_total").sort({"serialId" : -1}).skip(startIndex).limit(limit);

    return {
        invoices, total
    }
}

exports.invByIdService = async (id) => {
    return await Invoice.findById(id).populate({
        path: "patient",
        select: "serialId phone name"
    }).select("amount options serialId")
}

exports.deleteInvoiceService = async (_id) => {
    await Invoice.deleteOne({_id})
}