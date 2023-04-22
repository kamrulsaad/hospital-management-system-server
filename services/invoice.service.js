const Invoice = require("../models/Invoice")
const Patient = require("../models/Patient")
const Test = require("../models/Test")
const { findUserByEmailService } = require("./user.service")

exports.createInvoiceService = async (info, user, patient) => {

    const { _id: createdBy } = await findUserByEmailService(user.email)

    info = { ...info, createdBy, patient }

    const invoice = await Invoice.create(info)

    const categoryIds = invoice.payments.map((payment) => ({ category: payment }));

    const tests = await Promise.all(categoryIds.map(async (categoryId) => {
        const test = new Test({
            category: categoryId.category,
            patient,
            createdBy
        });
        await test.save();
        return test._id;
    }));

    await Patient.updateOne(
        { _id: patient },
        { $push: { tests: { $each: tests }, invoices: invoice._id } }
    );

    return invoice
}

exports.getAllInvoiceService = async (pagination) => {

    let { startIndex, limit, key, value } = pagination

    const query = key ? {
        [key]: (value === 'true' || value === 'false')
            ? value
            : {
                $regex: value,
                $options: 'i'
            }
    } : {};

    const total = await Invoice.find(query).countDocuments()

    const invoices = await Invoice.find(query).populate({
        path: 'patient',
        select: "serialId phone name"
    }).select("serialId sub_total createdAt paymentCompleted grand_total").sort({ "serialId": -1 }).skip(startIndex).limit(limit);

    return {
        invoices, total
    }
}

exports.invByIdService = async (id) => {
    return await Invoice.findById(id).populate([
        {
            path: "patient",
            select: "serialId phone name"
        },
        {
            path: "payments",
            select: "name amount "
        },
        {
            path: "createdBy",
            select: "phone email role firstName lastName"
        }
    ]).select("grand_total sub_total paymentCompleted createdAt tax discount serialId")
}

exports.deleteInvoiceService = async (_id) => {
    const invoice = await Invoice.findByIdAndDelete( _id )
    await Patient.updateOne({ _id: invoice.patient }, { $pull: { invoices: _id }})
}

exports.statusUpdateService = async (id) => {
    return await Invoice.updateOne({ _id: id }, { paymentCompleted: true })
}