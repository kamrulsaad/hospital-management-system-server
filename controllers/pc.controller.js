const { registerService, getAllService } = require("../services/pc.service");

exports.register = async (req, res) => {
    try {

        const pc = await registerService(req.body, req.user);
        res.status(201).json({
            status: 'success',
            data: {
                pc,
            }
        });


    } catch (err) {
        res.status(500).json({
            status: 'fail',
            error: err.message,
        });
    }
}

exports.getAll = async (req, res) => {
    try {

        const {page, limit, key, value} = req.pagination

        const {pcs, total} = await getAllService(req.pagination);

        res.status(200).json({
            status: 'success',
            data: {
                pcs,
                page,
                total,
                count: limit,
                key,
                value,
            }
        });

    } catch (err) {
        res.status(500).json({
            status: 'fail',
            error: err.message,
        });
    }
}