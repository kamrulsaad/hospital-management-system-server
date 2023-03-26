module.exports = async (req, res, next) => {

    if (req.user.role === 'accountant') next()
    else res.status(403).json({
        status: 'fail',
        error: "You do not have required access."
    })

}